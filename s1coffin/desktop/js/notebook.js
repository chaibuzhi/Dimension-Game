// ========== 备忘录 · 渲染 + 状态 + 通知 ==========

(function() {
    let lastContentKey = '';            // 上一次渲染的内容快照
    let pendingScrollToBottom = false;  // 有待滚动到底部    
    const STATE_KEY = 'notebook_state';
    // 便签刷新 与 通知弹出 共用的延时（改这一个值即可同步两边）
    const UPDATE_DELAY = 3000;
    let renderTimer = null;

    function scheduleRender() {
        if (renderTimer) return;
        renderTimer = setTimeout(() => {
            renderTimer = null;
            render();
        }, UPDATE_DELAY);
    }    

    function getState() {
        try { return JSON.parse(localStorage.getItem(STATE_KEY) || '{}'); }
        catch { return {}; }
    }

    function saveState(s) {
        localStorage.setItem(STATE_KEY, JSON.stringify(s));
    }

    // ========== 生成"内容指纹"——用于检测是否有新笔记/子提示 ==========
    function getContentKey(notes) {
        return notes.map(n =>
            n.id + ':' + n.hints.map(h => h.id).join(',')
        ).join('|');
    }

    // ========== 计算当前所有笔记状态 ==========
    function computeNotes() {
        const gs = getNotebookGlobalState();
        const ns = getState();

        ns.appears = ns.appears || {};
        ns.dones = ns.dones || {};
        ns.subAppears = ns.subAppears || {};
        ns.subDones = ns.subDones || {};
        ns.seen = ns.seen || {};
        ns.notified = ns.notified || {};

        let needNotify = false;

        const notes = [];

        NOTEBOOK_NOTES.forEach(def => {
            if (!def.appear(gs)) return;

            // 首次出现：记录时间 + 判断是否"出现时已完成"
            if (!ns.appears[def.id]) {
                ns.appears[def.id] = Date.now();
                ns.silent = ns.silent || {};

                const alreadyDone = def.done(gs);
                if (alreadyDone) {
                    // 出现时就已经完成 → 静默：不通知、不高亮
                    ns.silent[def.id] = true;
                    ns.dones[def.id] = Date.now();
                    ns.notified[def.id + '-appear'] = true;
                } else {
                    const nKey = def.id + '-appear';
                    if (!ns.notified[nKey]) {
                        ns.notified[nKey] = true;
                        if (!def.noNotify) {
                            needNotify = true;
                        }
                    }
                }
            }

            // 完成检测（非静默笔记的正常路径）
            const isDone = def.done(gs);
            if (isDone && !ns.dones[def.id]) {
                ns.dones[def.id] = Date.now();
            }

            // 子提示
            const hints = [];
            def.hints.forEach(h => {
                if (!h.appear(gs)) return;

                if (!ns.subAppears[h.id]) {
                    ns.subAppears[h.id] = Date.now();

                    const hintAlreadyDone = h.done(gs);
                    if (hintAlreadyDone) {
                        // 子提示出现时已完成 → 静默
                        ns.silent = ns.silent || {};
                        ns.silent[h.id] = true;
                        ns.subDones[h.id] = Date.now();
                        ns.notified[h.id + '-appear'] = true;
                    } else {
                        const nKey = h.id + '-appear';
                        if (!ns.notified[nKey]) {
                            ns.notified[nKey] = true;
                            if (!def.noNotify) {
                                needNotify = true;
                            }
                        }
                    }
                }

                const hintDone = h.done(gs);
                if (hintDone && !ns.subDones[h.id]) {
                    ns.subDones[h.id] = Date.now();
                }

                const hintSilent = ns.silent && ns.silent[h.id];

                // 标记 alwaysHighlight 的子提示：永远高亮
                const alwaysHi = h.alwaysHighlight === true;
                const isNew = alwaysHi ? true : (!ns.seen[h.id] && !hintSilent && !hintDone);

                hints.push({
                    id: h.id,
                    text: h.text,
                    isDone: hintDone,
                    isNew: isNew,
                    alwaysHighlight: alwaysHi
                });
            });

            const isSilent = ns.silent && ns.silent[def.id];

            notes.push({
                id: def.id,
                lines: def.lines,
                hints: hints,
                badge: def.badge || null,
                appearTime: ns.appears[def.id],
                doneTime: ns.dones[def.id] || null,
                isDone: isDone,
                isNew: !ns.seen['note_' + def.id] && !isSilent && !isDone
            });
        });

        saveState(ns);

        if (needNotify) pushNotification();

        return sortNotes(notes);
    }

    // ========== 排序：已完成的在上（按完成时间升序），未完成的在下（按出现时间升序） ==========
    function sortNotes(notes) {
        const done = notes.filter(n => n.isDone).sort((a, b) => a.doneTime - b.doneTime);
        const pending = notes.filter(n => !n.isDone).sort((a, b) => a.appearTime - b.appearTime);
        return done.concat(pending);
    }

    // ========== 推送通知 ==========
    function pushNotification() {
        // 收起状态下不推送通知
        const ns = getState();
        if (ns.collapsed) return;

        const queue = JSON.parse(localStorage.getItem('scheduled_notifications') || '[]');
        const eventId = 'notebook_update_' + Date.now();
        queue.push({ eventId: eventId, showAt: Date.now() });
        localStorage.setItem('scheduled_notifications', JSON.stringify(queue));
    }

    // ========== 工具 ==========
    function formatTime(ts) {
        const d = new Date(ts);
        return String(d.getHours()).padStart(2, '0') + ':' +
               String(d.getMinutes()).padStart(2, '0');
    }

    function escapeHtml(text) {
        return text.replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    // ========== 尝试滚到底部（页面前台时才滚） ==========
    function tryScrollToBottom() {
        if (!pendingScrollToBottom) return;
        if (document.hidden) return;   // 页面在后台，等回到前台再滚

        const body = document.getElementById('notebookBody');
        if (!body) return;

        requestAnimationFrame(() => {
            body.scrollTop = body.scrollHeight;
            pendingScrollToBottom = false;
        });
    }

    // ========== 渲染 ==========
    function render() {
        const body = document.getElementById('notebookBody');
        if (!body) return;

        const ns = getState();

        if (ns.collapsed) {
            document.getElementById('notebook').classList.add('hidden');
            document.getElementById('notebookIcon').classList.remove('hidden');
            computeNotes();
            return;
        }

        document.getElementById('notebook').classList.remove('hidden');
        document.getElementById('notebookIcon').classList.add('hidden');

        const notes = computeNotes();

        if (notes.length === 0) {
            body.innerHTML = '<div class="notebook-empty">暂无记录</div>';
            return;
        }

        let html = '';
        notes.forEach(note => {
            const newCls = note.isNew ? ' is-new' : '';
            const doneCls = note.isDone ? ' is-done' : '';

            html += `<div class="notebook-entry${doneCls}${newCls}" data-note-id="${note.id}">`;
            html += `<div class="notebook-time">${formatTime(note.appearTime)}</div>`;
            html += `<div class="notebook-lines">`;
            note.lines.forEach(line => {
                html += `<div class="notebook-line">${escapeHtml(line)}</div>`;
            });
            html += `</div>`;

            if (note.hints.length > 0) {
                html += `<div class="notebook-hints">`;
                note.hints.forEach(hint => {
                    const hDone = hint.isDone ? ' is-done' : '';
                    const hNew = hint.isNew ? ' is-new' : '';
                    const hAlways = hint.alwaysHighlight ? ' is-always-highlight' : '';
                    html += `<div class="notebook-hint${hDone}${hNew}${hAlways}" data-hint-id="${hint.id}">
                        <span class="notebook-arrow">▸</span>
                        <span class="notebook-hint-text">${escapeHtml(hint.text)}</span>
                    </div>`;
                });
                html += `</div>`;
            }

            if (note.badge) {
                html += `<div class="notebook-badge">${escapeHtml(note.badge)}</div>`;
            }

            html += `</div>`;
        });

        body.innerHTML = html;

        // 点击任意位置 → 整条（心里话 + 所有子提示）一起清除高亮
        body.querySelectorAll('.notebook-entry').forEach(el => {
            el.addEventListener('click', () => {
                const ns = getState();
                ns.seen = ns.seen || {};

                // 父条目标记 seen
                ns.seen['note_' + el.dataset.noteId] = true;

                // 它的所有子提示也一起 seen
                el.querySelectorAll('.notebook-hint').forEach(h => {
                    ns.seen[h.dataset.hintId] = true;
                });

                saveState(ns);
                render();
            });
        });

        // 内容变化检测
        const contentKey = getContentKey(notes);
        if (lastContentKey === '') {
            // 首次渲染 → 需要滚到底部
            pendingScrollToBottom = true;
        } else if (contentKey !== lastContentKey) {
            // 有新笔记或新子提示 → 需要滚到底部
            pendingScrollToBottom = true;
        }
        lastContentKey = contentKey;

        tryScrollToBottom();

        // 如果确认层开着，重新定位（header 高度可能变）
        const confirmEl = document.getElementById('notebookConfirm');
        if (confirmEl && !confirmEl.classList.contains('hidden')) {
            positionConfirmLayer();
        }
    }

    function markSeen(key) {
        const ns = getState();
        ns.seen = ns.seen || {};
        if (!ns.seen[key]) {
            ns.seen[key] = true;
            saveState(ns);
            if (renderTimer) {
                clearTimeout(renderTimer);
                renderTimer = null;
            }
            render();
        }
    }

    // ========== 打开 / 关闭 ==========
    window.openNotebook = function() {
        const ns = getState();
        ns.collapsed = false;
        saveState(ns);
        pendingScrollToBottom = true;
        if (renderTimer) {
            clearTimeout(renderTimer);
            renderTimer = null;
        }
        render();
    };

    // ========== 关闭确认 ==========
    function positionConfirmLayer() {
        // 确认层从 header 底部开始——动态量 header 高度
        const header = document.querySelector('.notebook-header');
        const confirmEl = document.getElementById('notebookConfirm');
        if (header && confirmEl) {
            confirmEl.style.top = header.offsetHeight + 'px';
        }
    }

    window.handleCloseClick = function() {
        const confirmEl = document.getElementById('notebookConfirm');
        const bodyEl = document.getElementById('notebookBody');
        if (!confirmEl || !bodyEl) return;

        if (confirmEl.classList.contains('hidden')) {
            const ns = getState();

            // 已经警告过 → 直接关闭
            if (ns.closeWarned) {
                closeNotebook();
                return;
            }

            // 第一次 → 记录 + 弹出确认层
            ns.closeWarned = true;
            saveState(ns);

            positionConfirmLayer();
            confirmEl.classList.remove('hidden');
            bodyEl.classList.add('blurred');
        } else {
            // 已在确认状态 → 取消
            confirmEl.classList.add('hidden');
            bodyEl.classList.remove('blurred');
        }
    };

    window.cancelCloseNotebook = function() {
        const confirmEl = document.getElementById('notebookConfirm');
        const bodyEl = document.getElementById('notebookBody');
        if (confirmEl) confirmEl.classList.add('hidden');
        if (bodyEl) bodyEl.classList.remove('blurred');
    };

    window.confirmCloseNotebook = function() {
        const confirmEl = document.getElementById('notebookConfirm');
        const bodyEl = document.getElementById('notebookBody');
        if (confirmEl) confirmEl.classList.add('hidden');
        if (bodyEl) bodyEl.classList.remove('blurred');
        closeNotebook();
    };

    window.closeNotebook = function() {
        const ns = getState();
        ns.collapsed = true;
        saveState(ns);
        if (renderTimer) {
            clearTimeout(renderTimer);
            renderTimer = null;
        }
        render();
    };

    // ========== 需要监听的键 ==========
    const WATCHED_KEYS = [
        'mail_state', 'tqchat_state', 'intranet_state',
        'notebook_triggers', 'mail_code_ready',
        'agreement_signed', 'intranet_login',
        'dingwenqian_locked', 'tqchat_locked',
        'job_apply_attempted', 'exam_answers',
        'post_ending_mode'
    ];

    // ========== 快照：把关注的键拼成字符串，用于比较变化 ==========
    function getWatchedSnapshot() {
        return WATCHED_KEYS.map(k => localStorage.getItem(k) || '').join('::');
    }

    let lastWatchedSnapshot = '';

    // ========== storage 事件（如果浏览器派发，最快响应） ==========
    window.addEventListener('storage', (e) => {
        if (WATCHED_KEYS.includes(e.key)) {
            lastWatchedSnapshot = getWatchedSnapshot();
            scheduleRender();
        }
    });

    // ========== 兜底轮询：每 500ms 检查一次变化 ==========
    // 只做字符串比较——没有变化就什么都不做，开销极小
    setInterval(() => {
        const current = getWatchedSnapshot();
        if (current !== lastWatchedSnapshot) {
            lastWatchedSnapshot = current;
            scheduleRender();
        }
    }, 500);

    // ========== 从其他标签页切回桌面时，检查是否有待滚动 ==========
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            tryScrollToBottom();
        }
    });

    // ========== 启动 ==========
    document.addEventListener('DOMContentLoaded', () => {
        const ns = getState();
        if (ns.collapsed === undefined) {
            // 首次进桌面 → 默认展开
            ns.collapsed = false;
            saveState(ns);
        }

        lastWatchedSnapshot = getWatchedSnapshot();   // 初始化快照
        render();
    });
})();