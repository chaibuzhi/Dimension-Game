// ========== 天启通 · 核心逻辑 ==========
// 负责：登录、连接动画、同步流程、联系人列表、普通消息渲染、导入记录、添加好友、通用弹窗

// ========== 从 URL 参数读取窗口尺寸（由桌面外壳传入） ==========
const urlParams = new URLSearchParams(window.location.search);
const chatInitialWidth = parseInt(urlParams.get('initialWidth')) || 360;
const chatInitialHeight = parseInt(urlParams.get('initialHeight')) || 600;
const chatAltWidth = parseInt(urlParams.get('altWidth')) || 900;
const chatAltHeight = parseInt(urlParams.get('altHeight')) || 640;

// ========== 全局状态 ==========
let currentChatId = null;
let importedContacts = [];
let hasSynced = false;
let syncInProgress = false;
let isLoggedIn = false;
let tqchatLockTimer = null;
let isSyncFailModalOpen = false;
let isSyncConfirmModalOpen = false;

// ========== 状态管理（单一键 tqchat_state） ==========

function getTqchatState() {
    try {
        return JSON.parse(localStorage.getItem('tqchat_state') || '{}');
    } catch {
        return {};
    }
}

function setTqchatState(key, value) {
    const state = getTqchatState();
    state[key] = value;
    localStorage.setItem('tqchat_state', JSON.stringify(state));
}

// ========== 统一成就系统：结局解锁 ==========
function unlockEnding(key) {
    let data = {};
    try {
        data = JSON.parse(localStorage.getItem('endings_unlocked') || '{}');
    } catch (e) {
        data = {};
    }
    if (!data[key]) {
        data[key] = true;
        localStorage.setItem('endings_unlocked', JSON.stringify(data));
    }
}

// ========== 检查录音打开后的好友申请触发 ==========
let dwqAudioCheckTimer = null;

function checkDwqAudioTrigger() {
    const openedTime = parseInt(localStorage.getItem('dwq_audio_opened_time') || '0');
    if (!openedTime) return;

    const elapsed = Date.now() - openedTime;
    const WAIT_MS = 60000;

    if (elapsed >= WAIT_MS) {
        const st = getTqchatState();
        if (!st.mysteryUnlocked && !st.friendRequestPending) {
            triggerFriendRequest(); // 只设置状态，不负责通知
        }
        localStorage.removeItem('dwq_audio_opened_time');
    } else {
        if (dwqAudioCheckTimer) clearTimeout(dwqAudioCheckTimer);
        dwqAudioCheckTimer = setTimeout(checkDwqAudioTrigger, WAIT_MS - elapsed + 500);
    }
}

// ========== 锁定天启通 ==========
function scheduleTqchatLock() {
    // 已锁定或已调度则不再重复
    if (getTqchatState().locked === true || tqchatLockTimer) return;

    tqchatLockTimer = setTimeout(() => {
        lockTqchat();
    }, TQCHAT_LOCK_DELAY);
}

function lockTqchat() {
    if (tqchatLockTimer) {
        clearTimeout(tqchatLockTimer);
        tqchatLockTimer = null;
    }

    // 设置锁定状态，并强制登出
    setTqchatState('locked', true);
    setTqchatState('loggedIn', false);
    localStorage.setItem('tqchat_locked', 'true');

    // 停背景音乐 + 播放锁定音效
    if (typeof ChatMusic !== 'undefined') ChatMusic.stop();
    ChatSFX.lockWarning();

    // 显示锁定遮罩
    const overlay = document.getElementById('lockOverlay');
    if (overlay) overlay.classList.remove('hidden');
}

function exitLockedChat() {
    // 关闭天启通窗口
    if (window.parent && window.parent.WindowManager) {
        window.parent.WindowManager.closeWindow('chat');
    }
}

// ========== 统一头像渲染 ==========
function renderAvatar(profile, className, fallbackText) {
    const isMystery = profile && profile.id === 'mystery';
    const cls = isMystery ? `${className} mystery-avatar` : className;
    const fallback = profile ? (profile.avatarText || profile.icon || fallbackText || '?') : (fallbackText || '?');

    if (profile && profile.avatarImg) {
        return `<span class="${cls}"><img src="${profile.avatarImg}" alt="${fallback}" onerror="this.style.display='none'; this.parentElement.textContent='${fallback}';"></span>`;
    } else {
        return `<span class="${cls}">${fallback}</span>`;
    }
}

// ========== 渲染登录人区域 ==========
function renderSidebarUser() {
    const container = document.getElementById('sidebarUser');
    if (!container) return;

    container.innerHTML = `
        <div class="sidebar-avatar-wrap">
            ${renderAvatar(currentUserProfile, 'sidebar-avatar', '丁')}
        </div>
        <div class="sidebar-user-info">
            <div class="sidebar-user-topline">
                <span class="sidebar-user-name">${currentUserProfile.name}</span>
                <span class="sidebar-user-role">${currentUserProfile.role}</span>
            </div>
            <div class="sidebar-user-id">${currentUserProfile.empId}</div>
        </div>
    `;
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    
    const state = getTqchatState();
    hasSynced = state.synced === true;
    importedContacts = state.importedContacts || [];
    isLoggedIn = state.loggedIn === true;

    // 恢复神秘人状态
    initMysteryState();

    // 检查录音打开后的好友申请触发
    checkDwqAudioTrigger();

    // 神秘人音乐：刷新后若未锁定则继续播放（防御性判断）
    if (typeof ChatMusic !== 'undefined') {
        ChatMusic.resumeFromState();
    }

    // 如果账号已被锁定，强制显示登录页，不自动进入聊天
    if (getTqchatState().locked === true) {
        isLoggedIn = false;
        // 确保显示登录页
        document.getElementById('chatView').classList.add('hidden');
        document.getElementById('loginView').classList.remove('hidden');
        document.getElementById('loginForm').classList.remove('fade-out');
        document.getElementById('loginLoading').classList.add('hidden');
        document.getElementById('loginError').textContent = '';
        return;
    }

    // 自动进入聊天页（如果已登录）
    if (isLoggedIn) {
        showChatView();
    }
});

// ========== 登录 ==========
document.getElementById('loginBtn').addEventListener('click', function() {
    const empId = document.getElementById('loginEmpId').value.trim();
    const pwd = document.getElementById('loginPassword').value.trim();
    const errorEl = document.getElementById('loginError');

    // 检查账号是否已被锁定
    if (getTqchatState().locked === true) {
        errorEl.textContent = '该账号已被锁定';
        return;
    }

    // 先检查工号是否存在
    if (empId !== chatLoginCredential.empId) {
        errorEl.textContent = '工号不存在，请核对后重试。';
        return;
    }

    if (pwd !== chatLoginCredential.password) {
        errorEl.textContent = '密码错误，初始密码为本人出生日期。';
        return;
    }

    errorEl.textContent = '';
    showConnecting();
});

document.getElementById('loginPassword').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('loginBtn').click();
});
document.getElementById('loginEmpId').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('loginBtn').click();
});

// ========== 连接动画 ==========
function showConnecting() {
    document.getElementById('loginForm').classList.add('fade-out');
    document.getElementById('loginLoading').classList.remove('hidden');
    document.getElementById('loginError').textContent = '';

    setTimeout(function() {
        isLoggedIn = true;
        setTqchatState('loggedIn', true);

        if (window.parent && window.parent.WindowManager) {
            window.parent.WindowManager.resizeWindow('chat', chatAltWidth, chatAltHeight);
        }

        showChatView();
    }, 2400);
}

// ========== 显示聊天界面 ==========
function showChatView() {
    renderSidebarUser();
    document.getElementById('loginView').classList.add('hidden');
    document.getElementById('chatView').classList.remove('hidden');

    if (!hasSynced) {
        renderEmptyContacts();
        showSyncConfirmDialog();
    } else {
        renderContactList();
        if (!currentChatId) selectContact('notice');
    }

    updateInputLockState();
}

// ========== 空联系人列表 ==========
function renderEmptyContacts() {
    document.getElementById('contactList').innerHTML = `
        <div style="text-align:center; color:var(--text-muted); font-size:12px; padding:40px 16px; line-height:1.8;">
            暂无联系人<br>请先同步聊天记录
        </div>
    `;
    document.getElementById('chatHeaderName').textContent = '联系人';
    document.getElementById('chatHeaderRole').textContent = '';
    document.getElementById('chatHeaderAvatar').textContent = '👤';
    document.getElementById('chatMessages').innerHTML = '';
}

// ========== 同步确认弹窗 ==========
function showSyncConfirmDialog() {
    isSyncConfirmModalOpen = true;
    showModal({
        title: '同步通讯记录',
        content: '<p>登录成功，是否立即同步通讯记录</p>',
        actions: [
            { label: '取消', type: 'ghost', onClick: function() {
                isSyncConfirmModalOpen = false;
                closeModal();
            }},
            { label: '开始同步', type: 'primary', onClick: function() {
                isSyncConfirmModalOpen = false;
                closeModal();
                startSyncProcess();
            }}
        ]
    });
}

// ========== 同步过程 ==========
function startSyncProcess() {
    if (syncInProgress) return;
    syncInProgress = true;

    let progress = 0;
    const slowStart = 38;
    const maxProgress = 47;

    showSyncInChat(progress);

    const interval = setInterval(function() {
        if (progress < slowStart) {
            progress += Math.random() * 2 + 1.5;
        } else {
            progress += Math.random() * 0.06 + 0.04;
        }

        if (progress >= maxProgress) {
            progress = maxProgress;
            clearInterval(interval);
            syncInProgress = false;
            updateSyncProgress(progress);
            setTimeout(showSyncFailDialog, 600);
        } else {
            updateSyncProgress(progress);
        }
    }, 80);
}

function showSyncInChat(progress) {
    document.getElementById('chatMessages').innerHTML = `
        <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;">
            <div class="connecting-spinner"></div>
            <div style="font-size:13px; color:var(--text-dim);">正在同步通讯记录</div>
            <div style="width:260px; height:4px; background:rgba(255,255,255,0.08); border-radius:50px; overflow:hidden;">
                <div id="syncFill" style="height:100%; width:0%; background:linear-gradient(90deg, var(--accent-dim), var(--accent)); border-radius:50px; transition:width 0.1s;"></div>
            </div>
            <div id="syncPercent" style="font-size:12px; color:var(--accent); font-weight:600;">0%</div>
        </div>
    `;
}

function updateSyncProgress(progress) {
    const fill = document.getElementById('syncFill');
    const percent = document.getElementById('syncPercent');
    if (fill) fill.style.width = progress + '%';
    if (percent) percent.textContent = Math.floor(progress) + '%';
}

function showSyncFailDialog() {
    ChatSFX.importFail();
    isSyncFailModalOpen = true;
    showModal({
        title: '同步失败',
        content: '<p style="color:var(--danger);">同步出现错误，部分通讯记录未能恢复</p>',
        actions: [
            { label: '确认', type: 'primary', onClick: function() {
                isSyncFailModalOpen = false;
                closeModal();
                hasSynced = true;
                setTqchatState('synced', true);
                renderContactList();
                selectContact('notice');
            }}
        ]
    });
}

// ========== 联系人列表渲染 ==========
function renderContactList() {
    const container = document.getElementById('contactList');
    const unlockedContacts = chatContacts.filter(c => c.unlocked || importedContacts.includes(c.id));

    if (unlockedContacts.length === 0) {
        renderEmptyContacts();
        return;
    }

    let html = '';
    unlockedContacts.forEach(contact => {
        html += `
            <div class="contact-item ${contact.id === currentChatId ? 'active' : ''}" data-contact-id="${contact.id}" onclick="selectContact('${contact.id}')">
                ${renderAvatar(contact, 'contact-avatar')}
                <div class="contact-info">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-role">${contact.role}</div>
                </div>
                ${contact.hasUnread ? '<span class="contact-badge"></span>' : ''}
            </div>
        `;
    });
    container.innerHTML = html;
}

// ========== 选择联系人 ==========
function selectContact(contactId) {
    const prevId = currentChatId;
    currentChatId = contactId;

    // 玩家从何旭切到别的联系人 → 认为"看完了"
    if (prevId === 'hexu' && contactId !== 'hexu') {
        const triggers = JSON.parse(localStorage.getItem('notebook_triggers') || '{}');
        if (!triggers.hexu_viewed_complete) {
            triggers.hexu_viewed_complete = Date.now();
            localStorage.setItem('notebook_triggers', JSON.stringify(triggers));
        }
    }

    renderContactList();

    if (contactId === 'mystery') {
        renderMysteryHistory();
    } else {
        renderMessages(contactId);
    }

    const contact = chatContacts.find(c => c.id === contactId);

    document.getElementById('chatHeaderName').textContent = contact ? contact.name : '联系人';
    document.getElementById('chatHeaderRole').textContent = contact ? contact.role : '';
    const headerAvatar = document.getElementById('chatHeaderAvatar');
    headerAvatar.innerHTML = renderAvatar(contact, 'chat-header-avatar', '👤');

    updateInputLockState();
}

// ========== 渲染普通消息 ==========
function renderMessages(contactId) {
    const container = document.getElementById('chatMessages');
    const messages = chatMessages[contactId] || [];
    const contact = chatContacts.find(c => c.id === contactId);

    if (messages.length === 0) {
        container.innerHTML = '<div style="text-align:center; color:var(--text-muted); font-size:12px; padding:40px 0;">暂无聊天记录</div>';
        document.getElementById('choiceButtons').classList.add('hidden');
        return;
    }

    let html = '';
    let currentDate = null;

    messages.forEach(msg => {
        if (msg.time) {
            const dateTimeKey = msg.date + ' ' + msg.time;
            if (dateTimeKey !== currentDate) {
                currentDate = dateTimeKey;
                const anchorId = 'date-' + msg.date + '-' + msg.time.replace(':', '');
                html += `<div class="date-divider" id="${anchorId}">${formatDateTime(msg.date, msg.time)}</div>`;
            }
        }

        if (msg.sender === 'system' && msg.type === 'card') {
            html += `
                <div class="msg-row system"><div class="msg-bubble"><div class="msg-system-title">${msg.title}</div><div class="msg-system-body">${msg.text}</div></div></div>
            `;
        } else if (msg.sender === 'system' && msg.type === 'friend-request' && friendRequestPending) {
            html += `
                <div class="msg-row system">
                    <div class="msg-bubble friend-request-bubble">
                        <div class="friend-request-avatar">⬡</div>
                        <div class="friend-request-info">
                            <div class="friend-request-text">匿名 请求添加您为好友</div>
                            <button class="friend-request-agree" onclick="acceptFriendRequest()">同意</button>
                        </div>
                    </div>
                </div>
            `;
        } else if (msg.sender === 'me') {
            if (msg.type === 'file') {
                html += `
                    <div class="msg-row me">
                        ${renderAvatar(currentUserProfile, 'msg-avatar', '丁')}
                        <div class="msg-file-card me" data-file-key="${msg.fileKey || 'none'}" onclick="handleChatFileClick('${msg.fileKey || 'none'}')">
                            <span class="msg-file-icon">📄</span>
                            <div class="msg-file-info">
                                <div class="msg-file-name">${msg.fileName}</div>
                                <div class="msg-file-size">${msg.fileSize || '1.0 MB'}</div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="msg-row me">
                        ${renderAvatar(currentUserProfile, 'msg-avatar', '丁')}
                        <div class="msg-bubble">${msg.text}</div>
                    </div>
                `;
            }
        } else if (msg.sender === 'them') {
            if (msg.type === 'file') {
                html += `
                    <div class="msg-row them">
                        ${renderAvatar(contact, 'msg-avatar', '⬡')}
                        <div class="msg-file-card" data-file-key="${msg.fileKey || 'none'}" onclick="handleChatFileClick('${msg.fileKey || 'none'}')">
                            <span class="msg-file-icon">📄</span>
                            <div class="msg-file-info">
                                <div class="msg-file-name">${msg.fileName}</div>
                                <div class="msg-file-size">${msg.fileSize || '1.0 MB'}</div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="msg-row them">
                        ${renderAvatar(contact, 'msg-avatar', '⬡')}
                        <div class="msg-bubble">${msg.text}</div>
                    </div>
                `;
            }
        }
    });

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
    document.getElementById('choiceButtons').classList.add('hidden');
}

// ========== 对话选项按钮渲染 ==========
function renderChoiceButtons(choices, onChoose) {
    const container = document.getElementById('choiceButtons');
    if (choices && choices.length > 0) {
        container.classList.remove('hidden');
        container.innerHTML = '';
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.label;
            btn.addEventListener('click', function() {
                if (onChoose) {
                    onChoose(choice);
                }
            });
            container.appendChild(btn);
        });
    } else {
        container.classList.add('hidden');
    }
}

// ========== 添加下拉菜单 ==========
document.getElementById('addBtn').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('addDropdown').classList.toggle('hidden');
});

document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('addDropdown');
    if (!dropdown.classList.contains('hidden')
        && !e.target.closest('.sidebar-add-btn')
        && !e.target.closest('.add-dropdown')) {
        dropdown.classList.add('hidden');
    }
});

document.getElementById('addDropdown').querySelectorAll('.add-dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        const action = this.dataset.action;
        document.getElementById('addDropdown').classList.add('hidden');
        if (action === 'import') showImportDialog();
        else if (action === 'addfriend') showAddFriendDialog();
    });
});

// ========== 导入记录弹窗 ==========
function showImportDialog() {
    showModal({
        title: '同步记录',
        content: `
            <p>请输入对方工号，同步聊天记录。</p>
            <input type="text" id="importEmpIdInput" placeholder="输入工号" autocomplete="off">
        `,
        actions: [
            { label: '取消', type: 'ghost', onClick: closeModal },
            { label: '确认同步', type: 'primary', onClick: confirmImport }
        ]
    });
}

function confirmImport() {
    const empId = document.getElementById('importEmpIdInput').value.trim();
    const contact = chatContacts.find(c => c.empId === empId && !c.unlocked);

    if (!contact) {
        ChatSFX.importFail();
        closeModal();
        showToast('未找到匹配的工号');
        return;
    }

    const titleEl = document.getElementById('modalTitle');
    const contentEl = document.getElementById('modalContent');
    const actionsEl = document.getElementById('modalActions');

    titleEl.textContent = '同步记录';
    contentEl.innerHTML = `
        <p>正在下载聊天记录...</p>
        <div class="modal-progress-track">
            <div class="modal-progress-fill" id="importProgressFill"></div>
        </div>
        <div class="modal-progress-label" id="importProgressLabel">0%</div>
    `;
    actionsEl.innerHTML = '';

    let progress = 0;
    const interval = setInterval(function() {
        progress += Math.random() * 8 + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            document.getElementById('importProgressFill').style.width = '100%';
            document.getElementById('importProgressLabel').textContent = '100%';

            actionsEl.innerHTML = `<button class="modal-btn primary" data-complete-import="true">确认</button>`;
            actionsEl.querySelector('[data-complete-import]').addEventListener('click', function() {
                ChatSFX.importSuccess();
                importedContacts.push(contact.id);
                setTqchatState('importedContacts', importedContacts);
                closeModal();
                renderContactList();
                selectContact(contact.id);
            });
        } else {
            document.getElementById('importProgressFill').style.width = progress + '%';
            document.getElementById('importProgressLabel').textContent = Math.floor(progress) + '%';
        }
    }, 100);
}

// ========== 添加好友弹窗 ==========
function showAddFriendDialog() {
    showModal({
        title: '添加好友',
        content: `
            <p>请输入对方工号，发送好友申请。</p>
            <input type="text" id="addFriendInput" placeholder="输入工号" autocomplete="off">
        `,
        actions: [
            { label: '取消', type: 'ghost', onClick: closeModal },
            { label: '发送申请', type: 'primary', onClick: confirmAddFriend }
        ]
    });
}

function confirmAddFriend() {
    const empId = document.getElementById('addFriendInput').value.trim();
    const contact = chatContacts.find(c => c.empId === empId);
    closeModal();

    if (empId === '520') {
        setTimeout(function() {
            triggerFriendRequest();
        }, 600);
        return;
    }

    if (contact) {
        ChatSFX.importFail();
        showToast('你已添加对方为好友');
    } else {
        ChatSFX.importFail();
        showToast('未找到匹配的工号');
    }
}

// ========== 真实发送（触发 end02） ==========
document.getElementById('sendBtn').addEventListener('click', function() {
    if (isInputLocked()) return;

    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (!text) return;

    const container = document.getElementById('chatMessages');
    const bubble = document.createElement('div');
    bubble.className = 'msg-row me';
    bubble.style.alignSelf = 'flex-end';
    bubble.innerHTML = `${renderAvatar(currentUserProfile, 'msg-avatar', '丁')}<div class="msg-bubble">${text}</div>`;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
    input.value = '';

    unlockEnding('end02');
    setTqchatState('end02Triggered', true);

    setTimeout(function() {
        if (window.parent) {
            window.parent.postMessage({
                type: 'tqchat-security-alert'
            }, '*');
        }
    }, 1200);
});

document.getElementById('messageInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('sendBtn').click();
});

// ========== 主动登出（保留同步记录） ==========
document.getElementById('logoutBtn').addEventListener('click', forceLogout);

function forceLogout() {
    isLoggedIn = false;
    currentChatId = null;
    setTqchatState('loggedIn', false);

    document.getElementById('chatView').classList.add('hidden');
    document.getElementById('loginView').classList.remove('hidden');
    document.getElementById('loginForm').classList.remove('fade-out');
    document.getElementById('loginLoading').classList.add('hidden');
    document.getElementById('loginEmpId').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginError').textContent = '';

    if (window.parent && window.parent.WindowManager) {
        window.parent.WindowManager.resizeWindow('chat', chatInitialWidth, chatInitialHeight);
    }
}

// ========== 通用弹窗 ==========
function showModal(options) {
    const overlay = document.getElementById('modalOverlay');
    const titleEl = document.getElementById('modalTitle');
    const contentEl = document.getElementById('modalContent');
    const actionsEl = document.getElementById('modalActions');

    titleEl.textContent = options.title || '提示';
    contentEl.innerHTML = options.content || '';

    if (options.actions && options.actions.length > 0) {
        actionsEl.innerHTML = options.actions.map((action, index) => `
            <button class="modal-btn ${action.type || 'ghost'}" data-action-index="${index}">${action.label}</button>
        `).join('');
        actionsEl.querySelectorAll('[data-action-index]').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = options.actions[parseInt(this.dataset.actionIndex)];
                if (action.onClick) action.onClick();
            });
        });
    } else {
        actionsEl.innerHTML = `<button class="modal-btn primary" onclick="closeModal()">确定</button>`;
    }

    overlay.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
}

// ========== 日期时间格式化 ==========
function formatDateTime(date, time) {
    if (!date) return '';
    const parts = date.split('-');
    if (parts.length !== 3) return date;
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    return `${year}年${month}月${day}日${time ? ' ' + time : ''}`;
}

// ========== 日期索引功能 ==========
document.getElementById('dateSearchBtn').addEventListener('click', function(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('dateDropdown');

    if (!dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
        return;
    }

    renderDateDropdown(currentChatId);
    dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('dateDropdown');
    if (!dropdown.classList.contains('hidden')
        && !e.target.closest('.chat-date-search-btn')
        && !e.target.closest('.date-dropdown')) {
        dropdown.classList.add('hidden');
    }
});

function renderDateDropdown(contactId) {
    const dropdown = document.getElementById('dateDropdown');
    const messages = chatMessages[contactId] || [];

    const groups = [];
    messages.forEach(msg => {
        if (msg.time) {
            groups.push({
                date: msg.date,
                time: msg.time,
                anchorId: 'date-' + msg.date + '-' + msg.time.replace(':', '')
            });
        }
    });

    if (groups.length === 0) {
        dropdown.innerHTML = '<div style="padding:10px 14px; font-size:11px; color:var(--text-muted);">暂无日期索引</div>';
        return;
    }

    const seenDates = {};
    const uniqueGroups = [];
    groups.forEach(g => {
        if (!seenDates[g.date]) {
            seenDates[g.date] = true;
            uniqueGroups.push(g);
        }
    });

    const byYear = {};
    uniqueGroups.forEach(g => {
        const year = g.date.split('-')[0];
        if (!byYear[year]) byYear[year] = [];
        byYear[year].push(g);
    });

    let html = '';
    Object.keys(byYear).forEach(year => {
        html += `<div class="date-dropdown-year">${year}年</div>`;
        byYear[year].forEach(g => {
            const parts = g.date.split('-');
            const month = parseInt(parts[1], 10);
            const day = parseInt(parts[2], 10);
            html += `
                <div class="date-dropdown-item" data-anchor="${g.anchorId}" onclick="jumpToDate('${g.anchorId}')">
                    ${month}月${day}日
                </div>
            `;
        });
    });

    dropdown.innerHTML = html;
}

function jumpToDate(anchorId) {
    document.getElementById('dateDropdown').classList.add('hidden');
    const target = document.getElementById(anchorId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ========== Toast ==========
function showToast(message) {
    const container = document.querySelector('.chat-main') || document.body;
    const toast = document.createElement('div');

    toast.style.cssText = 'position:absolute; top:40%; left:50%; transform:translate(-50%, -50%); background:rgba(0,0,0,0.85); color:#fff; padding:10px 22px; border-radius:8px; z-index:999; font-size:13px; pointer-events:none; white-space:nowrap;';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 1600);
}

// ========== 联系人搜索 ==========
document.getElementById('contactSearch').addEventListener('input', function() {
    const keyword = this.value.toLowerCase();
    const items = document.querySelectorAll('.contact-item');
    items.forEach(item => {
        const name = item.querySelector('.contact-name').textContent.toLowerCase();
        item.style.display = name.includes(keyword) ? '' : 'none';
    });
});

// ========== 点击弹窗外部关闭 ==========
// 点击弹窗外部关闭（同步确认弹窗和同步失败弹窗不允许点击遮罩关闭）
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (isSyncConfirmModalOpen || isSyncFailModalOpen) return; // 禁止遮罩关闭
    if (e.target === this) closeModal();
});

// ========== 聊天记录中文件点击处理 ==========
function handleChatFileClick(fileKey) {
    switch (fileKey) {
        case 'phi-origin':
            if (window.parent && window.parent.WindowManager) {
                window.parent.WindowManager.openApp('paper-phi-origin');
            }
            break;
        case 'expired':
            showToast('文件已过期');
            break;
        default:
            break;
    }
}

// ========== 检查输入框是否被锁定 ==========
function isInputLocked() {
    const st = getTqchatState();
    if (st.end02Triggered === true) return true;
    if (st.mysteryUnlocked === true) return true;
    return false;
}

// ========== 更新输入框锁定状态 ==========
function updateInputLockState() {
    const input = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');

    if (!input || !sendBtn) return;

    const locked = isInputLocked();

    input.disabled = locked;
    sendBtn.disabled = locked;

    if (locked) {
        input.placeholder = '当前状态无法发送消息';
    } else {
        input.placeholder = '输入消息...';
    }
}

// ========== storage 事件监听（仅处理跨系统键） ==========
window.addEventListener('storage', function(e) {
    if (e.key === 'dwq_audio_opened_time') {
        checkDwqAudioTrigger();
        return;
    }

    if (e.key === 'tqchat_locked' && e.newValue === 'true') {
        setTqchatState('locked', true);
        return;
    }

    if (e.key === 'endings_unlocked') {
        try {
            const data = JSON.parse(e.newValue || '{}');
            if (data.end02) {
                setTqchatState('end02Triggered', true);
            }
        } catch (err) {}
        return;
    }
});