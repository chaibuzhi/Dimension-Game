// ========== 窗口管理器 ==========
// 统一管理：应用窗口、文件夹窗口、弹窗（作为窗口打开）、Toast、Lightbox

const WindowManager = (function() {
    const windows = {};
    let zIndexCounter = 100;
    let activeWindowId = null;

    // ========== 通用辅助 ==========
    function getAppById(id) {
        return appsRegistry.find(app => app.id === id);
    }

    function getFolderDataById(id) {
        return folderData[id];
    }

    function getModalDataById(id) {
        return modalData[id];
    }

    // ========== 更新窗口容器状态 ==========
    function updateContainerState() {
        const container = document.getElementById('windowsContainer');
        if (!container) return;
        // 容器永远不拦截点击，窗口自身处理事件
        container.style.pointerEvents = 'none';
    }

    // ========== 创建窗口（通用核心） ==========
    function createWindow(options) {
        const {
            windowId,
            title,
            icon,
            width,
            height,
            contentHTML,
            iframeSrc,
            folderId,
            single,
            resizable,
            minWidth,
            minHeight
        } = options;

        // 单例检查
        if (single && windows[windowId]) {
            // 如果窗口已最小化，先恢复再聚焦
            if (windows[windowId].minimized) {
                restoreWindow(windowId);
            } else {
                focusWindow(windowId);
            }
            return;
        }

        const w = Math.min(width || 500, window.innerWidth - 40);
        const h = Math.min(height || 400, window.innerHeight - 80);
        const left = Math.max(10, (window.innerWidth - w) / 2 + (Object.keys(windows).length * 20));
        const top = Math.max(10, (window.innerHeight - h) / 2 + (Object.keys(windows).length * 14));

        const windowEl = document.createElement('div');
        windowEl.className = 'app-window' + (options.darkWindow ? ' dark-window' : '');
        windowEl.dataset.windowId = windowId;
        windowEl.style.cssText = `
            left: ${left}px;
            top: ${top}px;
            width: ${w}px;
            height: ${h}px;
            z-index: ${++zIndexCounter};
        `;

        // 构建窗口内部 HTML
        let bodyHTML = '';
        if (options.imageSrc) {
            bodyHTML = `
                <div style="flex:1; display:flex; align-items:center; justify-content:center; background:#f0f0f3; overflow:hidden;">
                    <img src="${options.imageSrc}" alt="${title}" style="max-width:100%; max-height:100%; object-fit:contain;">
                </div>
            `;
        } else if (iframeSrc) {
            bodyHTML = `<iframe src="${iframeSrc}"></iframe>`;
        } else if (folderId) {
            const folder = getFolderDataById(folderId);
            bodyHTML = renderFolderContent(folderId, folder);
        } else if (contentHTML) {
            bodyHTML = `<div style="display:flex; flex-direction:column; height:100%; width:100%; overflow:hidden;">${contentHTML}</div>`;
        }

        if (options.customTitlebar) {
            windowEl.classList.add('custom-titlebar-window');
            windowEl.innerHTML = `
                <div class="window-body" style="flex:1;">${bodyHTML}</div>
            `;
        } else {
            windowEl.innerHTML = `
                <div class="window-titlebar" data-drag-handle>
                    <span class="window-title">${icon ? icon + ' ' : ''}${title}</span>
                    <div class="window-controls">
                        <button class="win-btn win-min" title="最小化">
                            <svg class="btn-symbol" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="2" y1="5" x2="8" y2="5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="win-btn win-close" title="关闭">
                            <svg class="btn-symbol" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="2.5" y1="2.5" x2="7.5" y2="7.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                                <line x1="7.5" y1="2.5" x2="2.5" y2="7.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="window-body">${bodyHTML}</div>
            `;
        }

        // 可拉伸窗口：右下角加 resize handle（无视觉提示，仅 cursor）
        if (resizable && !options.customTitlebar) {
            const handle = document.createElement('div');
            handle.className = 'window-resize-handle';
            windowEl.appendChild(handle);
        }

        document.getElementById('windowsContainer').appendChild(windowEl);
        updateContainerState();

        windows[windowId] = {
            el: windowEl,
            windowId: windowId,
            title: title,
            icon: icon || '',
            minimized: false,
            isModal: !!contentHTML
        };

        // 绑定按钮事件
        bindWindowEvents(windowId, windowEl);

        // 如果可拉伸，绑定 resize（可传自定义最小值）
        if (resizable && !options.customTitlebar) {
            bindResize(windowEl, options.minWidth, options.minHeight);
        }

        // 如果是文件夹，绑定文件点击
        if (folderId) {
            bindFolderFileEvents(windowId, windowEl, folderId);
        }

        // 如果是弹窗，绑定弹窗底部按钮
        if (contentHTML && options.buttons) {
            bindModalButtons(windowId, windowEl, options.buttons);
        }

        focusWindow(windowId);
    }

    // ========== 渲染文件夹内容 ==========
    function renderFolderContent(folderId, folder) {
        return `
            <div class="folder-content">
                <div class="folder-grid">
                    ${folder.files.map((file, index) => `
                        <div class="folder-item" data-folder="${folderId}" data-file-index="${index}">
                            ${file.thumbnail
                                ? `<img class="file-thumbnail" src="${file.thumbnail}" alt="${file.name}"
                                       onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                   <span class="file-icon" style="display:none;">${file.icon}</span>`
                                : `<span class="file-icon">${file.icon}</span>`
                            }
                            <span class="file-name">${file.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // ========== 绑定文件夹文件事件 ==========
    function bindFolderFileEvents(windowId, windowEl, folderId) {
        windowEl.querySelectorAll('.folder-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const fileIndex = parseInt(this.dataset.fileIndex);
                const file = folderData[folderId].files[fileIndex];
                handleFileAction(file);
            });
        });
    }

    // ========== 处理文件点击 ==========
    function handleFileAction(file) {
        if (!file) return;
        switch (file.action) {
            case 'toast':
                showToast(file.message || '无法打开此文件');
                break;
            case 'tab':
                window.open(file.target, '_blank');
                break;
            case 'lightbox':
                openLightbox(file.image);
                break;
            case 'app':
                openApp(file.appId, { titleOverride: file.name });
                break;
            case 'none':
                break;
        }
    }

    // ========== 绑定弹窗底部按钮 ==========
    function bindModalButtons(windowId, windowEl, buttons) {
        const footer = windowEl.querySelector('.modal-footer');
        if (!footer) return;
        footer.innerHTML = buttons.map((btn, index) => `
            <button class="modal-btn ${btn.type || 'ghost'}" data-btn-index="${index}">${btn.label}</button>
        `).join('');
        footer.querySelectorAll('[data-btn-index]').forEach(btnEl => {
            btnEl.addEventListener('click', function(e) {
                e.stopPropagation();
                const btn = buttons[parseInt(this.dataset.btnIndex)];
                if (btn.onClick === 'restart') {
                    localStorage.clear();
                    window.location.href = '../index.html';
                } else {
                    closeWindow(windowId);
                }
            });
        });
    }

    // ========== 绑定窗口事件 ==========
    function bindWindowEvents(windowId, windowEl) {
        // 聚焦
        windowEl.addEventListener('mousedown', function(e) {
            focusWindow(windowId);
        });

        // 关闭按钮
        const closeBtn = windowEl.querySelector('.win-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                closeWindow(windowId);
            });
        }

        // 最小化按钮
        const minBtn = windowEl.querySelector('.win-min');
        if (minBtn) {
            minBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                minimizeWindow(windowId);
            });
        }

        // 拖动（排除按钮区域）
        const titlebar = windowEl.querySelector('[data-drag-handle]');
        if (titlebar) {
            bindDrag(windowId, windowEl, titlebar);
        }
    }

    // ========== 窗口拖动 ==========
    function bindDrag(windowId, windowEl, handle) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        handle.addEventListener('pointerdown', function(e) {
            // 如果点击的是按钮，不启动拖动
            if (e.target.closest('.window-controls') || e.target.closest('.win-btn')) {
                return;
            }
            isDragging = true;
            offsetX = e.clientX - windowEl.offsetLeft;
            offsetY = e.clientY - windowEl.offsetTop;
            handle.setPointerCapture(e.pointerId);
            focusWindow(windowId);
            e.preventDefault();
        });

        handle.addEventListener('pointermove', function(e) {
            if (!isDragging) return;
            const newX = Math.max(-windowEl.offsetWidth + 80, Math.min(e.clientX - offsetX, window.innerWidth - 80));
            const newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - 100));
            windowEl.style.left = newX + 'px';
            windowEl.style.top = newY + 'px';
        });

        const stopDrag = function(e) {
            if (isDragging) {
                isDragging = false;
                handle.releasePointerCapture(e.pointerId);
            }
        };
        handle.addEventListener('pointerup', stopDrag);
        handle.addEventListener('pointercancel', stopDrag);
    }

    // ========== 窗口拉伸 ==========
    function bindResize(windowEl, minW, minH) {
        const handle = windowEl.querySelector('.window-resize-handle');
        if (!handle) return;

        const MIN_W = minW || 320;
        const MIN_H = minH || 240;

        let isResizing = false;
        let startX = 0, startY = 0;
        let startW = 0, startH = 0;
        let pendingW = 0, pendingH = 0;
        let rafId = null;

        handle.addEventListener('pointerdown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startW = windowEl.offsetWidth;
            startH = windowEl.offsetHeight;
            handle.setPointerCapture(e.pointerId);
            windowEl.classList.add('resizing');
        });

        handle.addEventListener('pointermove', function(e) {
            if (!isResizing) return;
            const dw = e.clientX - startX;
            const dh = e.clientY - startY;
            pendingW = Math.max(MIN_W, startW + dw);
            pendingH = Math.max(MIN_H, startH + dh);

            if (!rafId) {
                rafId = requestAnimationFrame(() => {
                    windowEl.style.width = pendingW + 'px';
                    windowEl.style.height = pendingH + 'px';
                    rafId = null;
                });
            }
        });

        const stopResize = (e) => {
            if (!isResizing) return;
            isResizing = false;
            if (e && e.pointerId !== undefined) {
                try { handle.releasePointerCapture(e.pointerId); } catch (err) {}
            }
            windowEl.classList.remove('resizing');
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        };

        handle.addEventListener('pointerup', stopResize);
        handle.addEventListener('pointercancel', stopResize);
    }

    // ========== 打开应用 ==========
    function openApp(appId, options) {
        options = options || {};
        const app = getAppById(appId);
        if (!app) return;

        if (app.type === 'tab') {
            window.open(app.target, '_blank');
            return;
        }

        if (app.type === 'folder') {
            createWindow({
                windowId: app.id,
                title: folderData[app.folderId].title,
                icon: '',   // folderData 的 title 已含 emoji，不再重复
                width: folderData[app.folderId].width || 560,
                height: folderData[app.folderId].height || 420,
                folderId: app.folderId,
                single: app.single,
                resizable: app.resizable
            });
            return;
        }

        if (app.type === 'window') {
            let winWidth = app.width || 600;
            let winHeight = app.height || 400;
            let iframeSrc = app.src;

            // ========== 动态窗口尺寸处理 ==========
            if (app.dynamicSize) {
                let isAlt = false;

                // 如果指定了 jsonKey，从 JSON 键中解析（如 tqchat_state 中的 loggedIn）
                if (app.dynamicSize.jsonKey) {
                    try {
                        const raw = localStorage.getItem(app.dynamicSize.key) || '{}';
                        const state = JSON.parse(raw);

                        // 如果账号被锁定，强制使用小尺寸（登录页）
                        if (app.dynamicSize.lockedKey && state[app.dynamicSize.lockedKey] === true) {
                            isAlt = false;
                        } else {
                            isAlt = state[app.dynamicSize.jsonKey] === true;
                        }
                    } catch {
                        isAlt = false;
                    }
                } else {
                    // 普通键：直接判断 'true'
                    isAlt = localStorage.getItem(app.dynamicSize.key) === 'true';
                }

                // 根据登录状态选择窗口尺寸
                if (isAlt && app.dynamicSize.widthAlt && app.dynamicSize.heightAlt) {
                    winWidth = app.dynamicSize.widthAlt;
                    winHeight = app.dynamicSize.heightAlt;
                }

                // 把初始尺寸和动态尺寸都通过 URL 参数传给 iframe
                const separator = iframeSrc.includes('?') ? '&' : '?';
                iframeSrc += separator
                    + 'initialWidth=' + (app.width || 600)
                    + '&initialHeight=' + (app.height || 400)
                    + '&altWidth=' + app.dynamicSize.widthAlt
                    + '&altHeight=' + app.dynamicSize.heightAlt;
            }

            createWindow({
                windowId: app.id,
                title: options.titleOverride || app.name,
                icon: app.icon,
                width: winWidth,
                height: winHeight,
                iframeSrc: iframeSrc,
                single: app.single,
                darkWindow: app.darkWindow || false,
                resizable: app.resizable,
                minWidth: app.minWidth,
                minHeight: app.minHeight
            });
            return;
        }

        if (app.type === 'image') {
            openImageWindow(app, options);
            return;
        }

        if (app.type === 'audio') {
            openAudioWindow(app, options);
            return;
        }
    }        

    // ========== 打开图片窗口（自适应比例 + 查看器） ==========
    function openImageWindow(app, options) {
        options = options || {};
        // 单例检查
        if (app.single && windows[app.id]) {
            focusWindow(app.id);
            return;
        }

        // 记录浏览（成就系统）——玩家点开就算，不等图片加载
        if (typeof markExplore === 'function') {
            markExplore('photos', app.id);
        } else {
            console.warn('[成就系统] markExplore 未加载，照片浏览未记录。检查 explore-tracker.js 的加载顺序。');
        }

        // 先加载图片获取真实尺寸
        const img = new Image();
        img.onload = function() {

            const maxWidth = app.width || 560;
            const maxHeight = app.height || 480;
            const imgRatio = img.naturalWidth / img.naturalHeight;

            let winWidth = maxWidth;
            let winHeight = winWidth / imgRatio;

            if (winHeight > maxHeight) {
                winHeight = maxHeight;
                winWidth = winHeight * imgRatio;
            }

            createWindow({
                windowId: app.id,
                title: options.titleOverride || app.name,
                icon: app.icon,
                width: Math.round(winWidth),
                height: Math.round(winHeight),
                iframeSrc: 'apps/viewer/viewer.html?src=' + encodeURIComponent(app.src),
                single: app.single,
                resizable: app.resizable
            });
        };

        img.onerror = function() {
            createWindow({
                windowId: app.id,
                title: options.titleOverride || app.name,
                icon: app.icon,
                width: app.width || 560,
                height: app.height || 480,
                iframeSrc: 'apps/viewer/viewer.html?src=' + encodeURIComponent(app.src),
                single: app.single,
                resizable: app.resizable
            });
        };

        img.src = app.src;
    }

    // ========== 打开音频窗口 ==========
    function openAudioWindow(app, options) {
        options = options || {};

        // 单例检查
        if (app.single && windows[app.id]) {
            focusWindow(app.id);
            return;
        }

        // 窗口标题固定为「播放器」
        // 页面内标题通过 URL 参数传递注册表中的 name
        createWindow({
            windowId: app.id,
            title: '播放器',
            icon: app.icon,
            width: app.width || 420,
            height: app.height || 320,
            iframeSrc: 'apps/audio/audio.html?src=' + encodeURIComponent(app.src) +
                       '&name=' + encodeURIComponent(app.name),
            single: app.single,
            darkWindow: app.darkWindow || false
        });
    }

    // ========== 打开弹窗（作为窗口） ==========
    function showModal(modalId) {
        const modal = getModalDataById(modalId);
        if (!modal) return;

        const contentHTML = `
            <div class="modal-body" style="flex:1; padding:16px 20px 0; overflow-y:auto; font-size:13px; color:#333; line-height:1.8;">
                ${modal.content}
            </div>
            <div class="modal-footer" style="display:flex; justify-content:center; gap:10px; padding:12px 16px 16px; border-top:none; flex-shrink:0; background:transparent;">
                <!-- 按钮由 bindModalButtons 填充 -->
            </div>
        `;

        createWindow({
            windowId: 'modal_' + modalId,
            title: modal.title,
            icon: modal.icon,
            width: modal.width || 380,
            height: modal.height || 300,
            contentHTML: contentHTML,
            buttons: modal.buttons,
            single: false
        });
    }

    function closeModal() {
        // 兼容旧调用，弹窗现在以窗口形式存在
        Object.keys(windows).forEach(id => {
            if (id.startsWith('modal_')) {
                closeWindow(id);
            }
        });
    }

    // ========== 关闭窗口 ==========
    function closeWindow(windowId) {
        const win = windows[windowId];
        if (!win) return;
        win.el.remove();
        delete windows[windowId];
        if (activeWindowId === windowId) activeWindowId = null;
        updateTaskbarButtons();
    }

    // ========== 最小化 ==========
    function minimizeWindow(windowId) {
        const win = windows[windowId];
        if (!win) return;
        win.minimized = true;
        win.el.classList.add('hidden');
        if (activeWindowId === windowId) activeWindowId = null;
        updateTaskbarButtons();
    }

    // ========== 恢复 ==========
    function restoreWindow(windowId) {
        const win = windows[windowId];
        if (!win) return;
        win.minimized = false;
        win.el.classList.remove('hidden');
        focusWindow(windowId);
        updateTaskbarButtons();
    }

    // ========== 聚焦 ==========
    function focusWindow(windowId) {
        const win = windows[windowId];
        if (!win || win.minimized) return;
        win.el.style.zIndex = ++zIndexCounter;
        activeWindowId = windowId;
        updateTaskbarButtons();
    }

    // ========== 更新任务栏按钮 ==========
    function updateTaskbarButtons() {
        const container = document.getElementById('taskbarWindows');
        if (!container) return;
        const windowIds = Object.keys(windows);
        if (windowIds.length === 0) {
            container.innerHTML = '';
            return;
        }
        let html = '';
        windowIds.forEach(id => {
            const win = windows[id];
            const label = win.icon ? win.icon + ' ' + win.title : win.title;
            const isActive = id === activeWindowId && !win.minimized;
            html += `
                <div class="taskbar-window-btn ${isActive ? 'active' : ''} ${win.minimized ? 'minimized' : ''}"
                     data-window-id="${id}" onclick="WindowManager.toggleWindow('${id}')">
                    <span class="taskbar-btn-label">${label}</span>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    // ========== 切换 ==========
    function toggleWindow(windowId) {
        const win = windows[windowId];
        if (!win) return;
        if (win.minimized) restoreWindow(windowId);
        else if (activeWindowId === windowId) minimizeWindow(windowId);
        else focusWindow(windowId);
    }

    // ========== 调整窗口大小 ==========
    function resizeWindow(windowId, width, height) {
        const win = windows[windowId];
        if (!win) return;

        const w = Math.min(width || 500, window.innerWidth - 40);
        const h = Math.min(height || 400, window.innerHeight - 80);

        // 以窗口中心为基准调整
        const el = win.el;
        const currentLeft = parseInt(el.style.left) || 0;
        const currentTop = parseInt(el.style.top) || 0;
        const currentWidth = el.offsetWidth || 0;
        const currentHeight = el.offsetHeight || 0;

        const newLeft = Math.max(10, currentLeft - (w - currentWidth) / 2);
        const newTop = Math.max(10, currentTop - (h - currentHeight) / 2);

        el.style.width = w + 'px';
        el.style.height = h + 'px';
        el.style.left = newLeft + 'px';
        el.style.top = newTop + 'px';
    }

    // ========== 最小化所有窗口 ==========
    function minimizeAll() {
        Object.keys(windows).forEach(id => {
            if (!windows[id].minimized) {
                windows[id].minimized = true;
                windows[id].el.classList.add('hidden');
            }
        });
        activeWindowId = null;
        updateTaskbarButtons();
    }

    // ========== Toast ==========
    function showToast(message) {
        // 使用固定容器，每次替换内容，避免堆叠
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        // 清除旧的 toast
        container.innerHTML = '';

        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        container.appendChild(toast);

        // 清除之前的计时器，重新计时
        if (container._toastTimer) clearTimeout(container._toastTimer);
        container._toastTimer = setTimeout(() => {
            toast.remove();
        }, 1600);
    }

    // ========== Lightbox ==========
    function openLightbox(imageSrc) {
        const lightbox = document.getElementById('lightbox');
        document.getElementById('lightboxImg').src = imageSrc;
        lightbox.classList.remove('hidden');
    }

    function closeLightbox() {
        document.getElementById('lightbox').classList.add('hidden');
    }

    // ========== 公开 API ==========
    return {
        openApp: openApp,
        showModal: showModal,
        closeModal: closeModal,
        closeWindow: closeWindow,
        minimizeWindow: minimizeWindow,
        restoreWindow: restoreWindow,
        focusWindow: focusWindow,
        toggleWindow: toggleWindow,
        minimizeAll: minimizeAll,
        resizeWindow: resizeWindow,
        showToast: showToast,
        openLightbox: openLightbox,
        closeLightbox: closeLightbox,
        openAudioWindow: openAudioWindow
        
    };
})();

// ========== 安全警告音效（桌面级，Web Audio 合成） ==========
function playSecurityAlertSound() {
    let ctx = null;
    try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        return;
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});

    const now = ctx.currentTime;

    // 两声短促的警报：880Hz 方波
    [0, 0.2].forEach(delay => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now + delay);

        gain.gain.setValueAtTime(0.0001, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.08, now + delay + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.17);
    });

    // 低频垫底：增加压迫感
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = 'sawtooth';
    bass.frequency.setValueAtTime(110, now);

    bassGain.gain.setValueAtTime(0.0001, now);
    bassGain.gain.exponentialRampToValueAtTime(0.04, now + 0.02);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.start(now);
    bass.stop(now + 0.55);
}


// ========== 全局安全警告弹窗（与天启通弹窗统一） ==========
function showGlobalSecurityAlert() {
    if (document.getElementById('globalSecurityOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'globalSecurityOverlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
    `;

    overlay.innerHTML = `
        <div style="
            width: 90%;
            max-width: 360px;
            background: linear-gradient(135deg, rgba(255, 95, 87, 0.06) 0%, transparent 40%), rgba(18, 28, 48, 0.9);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 95, 87, 0.25);
            border-radius: 12px;
            padding: 24px 20px;
            box-shadow:
                0 8px 40px rgba(0, 0, 0, 0.6),
                0 0 24px rgba(255, 95, 87, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.03);
            text-align: center;
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        ">
            <div style="
                font-size: 15px;
                font-weight: 700;
                color: #ff5f57;
                margin-bottom: 12px;
            ">安全警告</div>
            <div style="
                font-size: 14px;
                color: #8a9bb5;
                text-align: center;
                line-height: 1.7;
                margin-bottom: 6px;
            ">监测到非本人登录</div>

            <div style="
                font-size: 18px;
                font-weight: 800;
                color: #ff5f57;
                text-align: center;
                letter-spacing: 0.08em;
                margin-bottom: 20px;
                line-height: 1.4;
            ">你不是丁文倩</div>
            <div style="
                display: flex;
                gap: 10px;
                justify-content: center;
            ">
                <button onclick="window.location.href='../ending/e2detective.html'" style="
                    padding: 8px 22px;
                    border-radius: 6px;
                    font-size: 12px;
                    cursor: pointer;
                    border: 1px solid rgba(255, 95, 87, 0.3);
                    background: rgba(255, 95, 87, 0.12);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    color: #ff5f57;
                    font-weight: 600;
                    transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
                    font-family: inherit;
                " onmouseover="this.style.background='rgba(255, 95, 87, 0.2)'; this.style.borderColor='rgba(255, 95, 87, 0.5)'; this.style.boxShadow='0 0 16px rgba(255, 95, 87, 0.15)';"
                   onmouseout="this.style.background='rgba(255, 95, 87, 0.12)'; this.style.borderColor='rgba(255, 95, 87, 0.3)'; this.style.boxShadow='none';">
                    确 认
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // 安全警告音效
    playSecurityAlertSound();

    // 阻止点击穿透
    overlay.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });

    // 阻止 ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
        }
    }, { capture: true });
}

// 监听天启通的安全警报消息
window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'tqchat-security-alert') {
        showGlobalSecurityAlert();
    }
});

// 挂载到 window，供 iframe 中的代码访问
window.WindowManager = WindowManager;
