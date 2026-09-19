// ========== 邮件应用逻辑（v9） ==========

let currentUser = null;
let currentFolder = 'inbox';
let composeMode = false;
let selectedContactId = null;
let selectedOutboxOptionId = null;
let selectedReplyOptionId = null;
let currentDetailThreadId = null;
let scheduledRefreshTimers = [];

// ========== 全局邮件状态（单一键 mail_state） ==========
function getMailState() {
    try {
        return JSON.parse(localStorage.getItem('mail_state') || '{}');
    } catch {
        return {};
    }
}

function setMailState(key, value) {
    const state = getMailState();
    state[key] = value;
    localStorage.setItem('mail_state', JSON.stringify(state));
}

// ========== 线程状态 ==========

function getThreadState(threadKey) {
    const state = getMailState();
    return state.threads && state.threads[threadKey] ? state.threads[threadKey] : {};
}

function setThreadState(threadKey, key, value) {
    const state = getMailState();
    if (!state.threads) state.threads = {};
    if (!state.threads[threadKey]) state.threads[threadKey] = {};
    state.threads[threadKey][key] = value;
    localStorage.setItem('mail_state', JSON.stringify(state));
}

// ========== 设置推荐码就绪标记 ==========
function setMailCodeReady(person, value) {
    const key = 'mail_code_ready';
    let data = {};
    try { data = JSON.parse(localStorage.getItem(key) || '{}'); } catch {}
    data[person] = value;
    localStorage.setItem(key, JSON.stringify(data));
}

function getStateKeyByThreadId(threadId) {
    const thread = threadsData[threadId];
    return thread && thread.stateKey ? thread.stateKey : threadId;
}

// ========== 已读状态（单一键 mail_read_state） ==========

function getMailReadState() {
    const state = getMailState();
    return state.readState || {};
}

function setMailReadState(threadKey, messageId) {
    const state = getMailState();
    if (!state.readState) state.readState = {};
    state.readState[threadKey] = messageId;
    localStorage.setItem('mail_state', JSON.stringify(state));
}

// ========== 初始化 ==========

function initMailReadState() {
    const state = getMailState();

    // 已初始化则跳过后续
    if (state.initialized === true) return;

    // 初始已读线程
    const initiallyReadThreads = {
        'xiyan-title': 'xy-title-in-001',
        'lizhiming': 'lzm-in-001',
        'xingtu': 'xt-in-001',
        'wangrui': 'wr-in-001',
        'chenguoliang': 'cgl-in-001',
        'life-energy': 'le-in-001'
    };

    if (!state.readState) state.readState = {};
    Object.keys(initiallyReadThreads).forEach(threadKey => {
        if (!state.readState[threadKey]) {
            state.readState[threadKey] = initiallyReadThreads[threadKey];
        }
    });

    state.initialized = true;
    localStorage.setItem('mail_state', JSON.stringify(state));
}


// ========== 工具函数 ==========

function extractSummary(bodyHTML, maxLength) {
    maxLength = maxLength || 30;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = bodyHTML;
    let text = tempDiv.textContent || tempDiv.innerText || '';
    text = text.replace(/\s+/g, ' ').trim();
    if (text.length > maxLength) {
        text = text.substring(0, maxLength) + '...';
    }
    return text;
}

function extractPlainText(bodyHTML) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = bodyHTML;
    let text = tempDiv.textContent || tempDiv.innerText || '';
    // 对每一行去除首尾空白，消除模板字符串带来的缩进不一致
    text = text
        .split('\n')
        .map(line => line.trim())
        .join('\n');
    // 把连续空行压缩为单个空行
    text = text.replace(/\n{3,}/g, '\n\n').trim();
    return text;
}

function autoResizeTextarea(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function getContact(contactId) {
    return contactsData[contactId] || {
        name: contactId,
        email: '',
        avatar: contactId.charAt(0),
        color: '#888888'
    };
}

// ========== 安排邮件桌面通知 ==========
function scheduleMailNotification(msgId, extraDelayMs) {
    const msg = messagePool[msgId];
    if (!msg) return;

    const delay = DELAY_SHORT + (extraDelayMs || 0);

    const schedule = JSON.parse(localStorage.getItem('scheduled_notifications') || '[]');
    if (!schedule.some(item => item.eventId === msgId)) {
        schedule.push({
            eventId: msgId,
            showAt: Date.now() + delay
        });
        localStorage.setItem('scheduled_notifications', JSON.stringify(schedule));
    }
}

function getLastMessage(thread) {
    return thread.messages[thread.messages.length - 1] || null;
}

function getLastOtherMessage(thread) {
    for (let i = thread.messages.length - 1; i >= 0; i--) {
        if (thread.messages[i].from !== 'hanxiu') {
            return thread.messages[i];
        }
    }
    return null;
}

function getMessageArrivalTime(message) {
    if (message.arrivalRule && message.arrivalRule.type === 'delay') {
        const rule = message.arrivalRule;
        const state = getThreadState(rule.stateKey);
        const triggerTime = state[rule.timeKey] || 0;
        return triggerTime + DELAY_SHORT;
    }
    return new Date(message.date + 'T00:00:00').getTime();
}

function getThreadSortValue(thread) {
    const lastOther = getLastOtherMessage(thread);
    if (lastOther) return getMessageArrivalTime(lastOther);
    return 0;
}

function getThreadPreview(thread) {
    // 优先显示最后一条对方发来的消息的摘要
    const lastOther = getLastOtherMessage(thread);
    if (lastOther) return extractSummary(lastOther.bodyHTML, 30);

    const last = getLastMessage(thread);
    if (last) return extractSummary(last.bodyHTML, 30);
    return '';
}

function getThreadDisplaySender(thread) {
    // 优先显示最后一条对方发来的消息的发件人，而不是韩休自己
    const lastOther = getLastOtherMessage(thread);
    if (lastOther) return getContact(lastOther.from).name;
    return getContact(thread.contactId).name;
}

function getThreadDisplayDate(thread) {
    const lastOther = getLastOtherMessage(thread);
    if (lastOther) return lastOther.date;
    const last = getLastMessage(thread);
    return last ? last.date : '';
}

function isThreadUnread(threadId, thread) {
    const lastOther = getLastOtherMessage(thread);
    if (!lastOther) return false;
    const stateKey = getStateKeyByThreadId(threadId);
    const readState = getMailReadState();
    return readState[stateKey] !== lastOther.id;
}

function isThreadActionRequired(threadId, thread) {
    const lastOther = getLastOtherMessage(thread);
    if (!lastOther) return false;

    // 签署确认函：tq-001 未签署前一直高亮
    if (lastOther.id === 'tq-001') {
        return localStorage.getItem('agreement_signed') !== 'true';
    }

    // 面试邀请：未点击开始测试前一直高亮
    if (lastOther.id === 'tq-hr-001') {
        return localStorage.getItem('exam_started') !== 'true';
    }    

    // 有回复选项的邮件：回复选项还没被使用
    if (lastOther.replyOptions && lastOther.replyOptions.length > 0) {
        // 如果最后一条消息就是有 replyOptions 的对方消息，说明还没回复
        const last = getLastMessage(thread);
        return last && last.id === lastOther.id;
    }

    return false;
}

function markThreadSeen(threadId, thread) {
    const lastOther = getLastOtherMessage(thread);
    if (lastOther) {
        const stateKey = getStateKeyByThreadId(threadId);
        setMailReadState(stateKey, lastOther.id);
    }
}

function getActiveThreads() {
    const activeThreads = {};
    Object.keys(threadsData).forEach(threadId => {
        const thread = threadsData[threadId];
        const messages = thread.messageIds
            .map(msgId => messagePool[msgId])
            .filter(msg => {
                if (!msg) return false;
                const unlockFn = thread.messageUnlock && thread.messageUnlock[msg.id];
                if (unlockFn && !unlockFn()) return false;
                return true;
            });

        const firstMessage = messages.find(m => m && m.subject);
        activeThreads[threadId] = {
            contactId: thread.contactId,
            subject: firstMessage ? firstMessage.subject : '',
            outbox: thread.outbox ? thread.outbox.slice() : undefined,
            messages: messages
        };
    });
    return activeThreads;
}

// ========== 延时刷新定时器 ==========
function scheduleRefresh(delayMs) {
    const timer = setTimeout(() => {
        // 定时器触发后，统一走集中调度，处理刷新、通知和未来调度
        refreshAndScheduleNext();
        const idx = scheduledRefreshTimers.indexOf(timer);
        if (idx !== -1) scheduledRefreshTimers.splice(idx, 1);
    }, delayMs);
    scheduledRefreshTimers.push(timer);
}

// ========== 延时刷新 ==========
function refreshAndScheduleNext() {
    refreshCurrentView();

    const now = Date.now();
    const refreshTimes = new Set();

    Object.keys(threadsData).forEach(threadId => {
        const thread = threadsData[threadId];
        thread.messageIds.forEach(msgId => {
            const msg = messagePool[msgId];
            if (!msg || !msg.arrivalRule || msg.arrivalRule.type !== 'delay') return;
            const rule = msg.arrivalRule;
            const threadState = getThreadState(rule.stateKey);
            const triggerTime = threadState[rule.timeKey];
            if (!triggerTime) return;
            const unlockTime = triggerTime + DELAY_SHORT;
            if (unlockTime > now) refreshTimes.add(unlockTime + 500);
        });
    });

    refreshTimes.forEach(time => {
        const delay = time - Date.now();
        if (delay > 0) scheduleRefresh(delay);
    });
}

function refreshCurrentView() {
    if (composeMode) {
        renderContactList();
        if (selectedContactId) {
            renderComposeForm(selectedContactId);
        } else {
            renderComposePlaceholder();
        }
        return;
    }

    if (currentFolder === 'inbox') {
        renderInboxList(true);
        if (currentDetailThreadId) {
            showThreadDetail(currentDetailThreadId, null, false);
        }
    } else if (currentFolder === 'sent') {
        renderSentList(true);
        if (currentDetailThreadId) {
            showThreadDetail(currentDetailThreadId, null, false);
        }
    }
}

// ========== 登录 ==========

function loginMail() {
    const addr = document.getElementById('mailAddress').value.trim().toLowerCase();
    const pwd = document.getElementById('mailPassword').value.trim();
    const errorEl = document.getElementById('loginError');

    // 第一步：检查邮箱地址
    if (addr !== 'hanxiu@mail.com') {
        errorEl.textContent = '请输入正确的邮箱地址';
        return;
    }

    // 第二步：检查密码
    if (pwd !== '20220803') {
        errorEl.textContent = '密码错误，请输入正确密码';
        return;
    }

    // 通过
    errorEl.textContent = '';
    currentUser = 'hanxiu';
    enterMailbox('韩休 &lt;hanxiu@mail.com&gt;');
}

function enterMailbox(userInfo) {
    initMailReadState();

    document.getElementById('loginView').style.display = 'none';
    document.getElementById('mailView').classList.add('active');
    document.getElementById('mailUserInfo').innerHTML = userInfo;
    setMailState('loggedIn', currentUser);
    showFolder('inbox', document.getElementById('navInbox'));
    refreshAndScheduleNext();
}

function logoutMail() {
    currentUser = null;
    composeMode = false;
    selectedContactId = null;
    selectedOutboxOptionId = null;
    selectedReplyOptionId = null;
    currentDetailThreadId = null;
    if (scheduledRefreshTimers.length > 0) {
        scheduledRefreshTimers.forEach(t => clearTimeout(t));
        scheduledRefreshTimers = [];
    }
    setMailState('loggedIn', null);
    document.getElementById('mailView').classList.remove('active');
    document.getElementById('loginView').style.display = 'flex';
    document.getElementById('mailAddress').value = '';
    document.getElementById('mailPassword').value = '';
    document.getElementById('loginError').textContent = '';
}

// ========== 文件夹 ==========

function showFolder(folder, el) {
    if (folder === 'drafts' || folder === 'trash') return;

    currentFolder = folder;
    composeMode = false;
    selectedContactId = null;
    selectedOutboxOptionId = null;
    selectedReplyOptionId = null;
    currentDetailThreadId = null;

    document.querySelectorAll('.nav-folder').forEach(f => f.classList.remove('active'));
    document.getElementById('navCompose').classList.remove('active');
    if (el) el.classList.add('active');

    if (folder === 'inbox') renderInboxList(false);
    else if (folder === 'sent') renderSentList(false);
}

// ========== 写邮件 ==========

function showComposeMode() {
    composeMode = true;
    currentFolder = 'compose';
    selectedContactId = null;
    selectedOutboxOptionId = null;
    selectedReplyOptionId = null;
    currentDetailThreadId = null;

    document.querySelectorAll('.nav-folder').forEach(f => f.classList.remove('active'));
    document.getElementById('navCompose').classList.add('active');

    renderContactList();
    renderComposePlaceholder();
}

function renderContactList() {
    const panel = document.getElementById('mailListPanel');
    const priorityOrder = ['laoliu', 'xiaozhou'];

    const visibleContacts = Object.keys(contactsData)
        .filter(id => !contactsData[id].hidden)
        .filter(id => {
            const contact = contactsData[id];
            if (contact.unlockKey) {
                let unlocked = {};
                try { unlocked = JSON.parse(localStorage.getItem(contact.unlockKey) || '{}'); } catch {}
                return unlocked[contact.unlockField] === true;
            }
            return true;
        })
        .sort((a, b) => {
            const aPriority = priorityOrder.indexOf(a);
            const bPriority = priorityOrder.indexOf(b);
            if (aPriority !== -1 || bPriority !== -1) {
                if (aPriority === -1) return 1;
                if (bPriority === -1) return -1;
                return aPriority - bPriority;
            }
            return 0;
        });

    if (visibleContacts.length === 0) {
        panel.innerHTML = `<div style="padding:40px;text-align:center;color:#999;font-size:14px;">暂无可用联系人</div>`;
        return;
    }

    let html = '';
    visibleContacts.forEach(contactId => {
        const contact = contactsData[contactId];
        html += `
            <div class="contact-list-item" data-contact-id="${contactId}" onclick="selectContact('${contactId}', this)">
                <div class="contact-avatar" style="background:${contact.color};">${contact.avatar}</div>
                <div class="contact-info">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-email">${contact.email}</div>
                </div>
            </div>
        `;
    });
    panel.innerHTML = html;
}

function renderComposePlaceholder() {
    document.getElementById('mailDetailPanel').innerHTML = `<div class="mail-detail-placeholder"><p>请选择左侧联系人</p></div>`;
}

function selectContact(contactId, el) {
    selectedContactId = contactId;
    selectedOutboxOptionId = null;
    document.querySelectorAll('.contact-list-item').forEach(item => item.classList.remove('active'));
    if (el) el.classList.add('active');
    renderComposeForm(contactId);
}

function renderComposeForm(contactId) {
    const contact = contactsData[contactId];
    const panel = document.getElementById('mailDetailPanel');

    let options = [];
    Object.keys(threadsData).forEach(threadId => {
        const thread = threadsData[threadId];
        if (thread.contactId === contactId && thread.outbox) {
            options = thread.outbox.filter(opt => !opt.unlock || opt.unlock())
                .map(opt => {
                    const pooled = messagePool[opt.id];
                    return {
                        id: opt.id,
                        subject: pooled ? pooled.subject : opt.id,
                        unlock: opt.unlock,
                        onSent: opt.onSent
                    };
                });
        }
    });

    const isEmpty = options.length === 0;

    let optionsHTML = '';
    if (isEmpty) {
        optionsHTML = `<div class="compose-empty-state">✉️ 暂时没有可以发送的内容</div>`;
    } else {
        optionsHTML = `<div class="compose-options" id="composeOptions">`;
        options.forEach(opt => {
            optionsHTML += `
                <div class="option-bubble" data-option-id="${opt.id}" onclick="selectOutboxOption('${opt.id}', this)">
                    <span class="bubble-dot"></span>
                    <span class="option-label">${opt.subject}</span>
                </div>
            `;
        });
        optionsHTML += `</div>`;
    }

    panel.innerHTML = `
        <div class="compose-form">
            <div class="compose-field">
                <label>收件人</label>
                <input type="text" readonly value="${contact.name} <${contact.email}>">
            </div>
            <div class="compose-field">
                <label>主题</label>
                <input type="text" readonly id="composeSubject" value="" placeholder="${isEmpty ? '暂无主题' : ''}">
            </div>
            <div class="compose-field">
                <label>选择要发送的内容</label>
                ${optionsHTML}
            </div>
            <div class="compose-field">
                <label>正文预览</label>
                <textarea id="composeBody" readonly placeholder="${isEmpty ? '暂无可发送内容' : ''}"></textarea>
            </div>
            <div class="compose-actions">
                <button type="button" class="send-btn" id="composeSendBtn" disabled onclick="sendComposeMail()">发送邮件</button>
                <button type="button" class="btn-ghost" ${isEmpty ? 'disabled' : ''} onclick="clearComposeForm()">清空内容</button>
            </div>
        </div>
    `;

    const body = document.getElementById('composeBody');
    if (body) autoResizeTextarea(body);
}

function selectOutboxOption(optionId, el) {
    selectedOutboxOptionId = optionId;
    document.querySelectorAll('.option-bubble').forEach(item => item.classList.remove('selected'));
    if (el) el.classList.add('selected');

    let foundOption = null;
    Object.keys(threadsData).forEach(threadId => {
        const thread = threadsData[threadId];
        if (thread.contactId === selectedContactId && thread.outbox) {
            const opt = thread.outbox.find(o => o.id === optionId);
            if (opt) foundOption = opt;
        }
    });

    if (foundOption) {
        const pooled = messagePool[foundOption.id];
        if (!pooled) return;

        document.getElementById('composeSubject').value = pooled.subject || foundOption.id;
        const bodyTextarea = document.getElementById('composeBody');
        bodyTextarea.value = extractPlainText(pooled.bodyHTML);
        document.getElementById('composeSendBtn').disabled = false;
        autoResizeTextarea(bodyTextarea);
    }
}

function clearComposeForm() {
    selectedOutboxOptionId = null;
    document.querySelectorAll('.option-bubble').forEach(item => item.classList.remove('selected'));
    const subjectInput = document.getElementById('composeSubject');
    const bodyTextarea = document.getElementById('composeBody');
    if (subjectInput) subjectInput.value = '';
    if (bodyTextarea) {
        bodyTextarea.value = '';
        autoResizeTextarea(bodyTextarea);
    }
    const sendBtn = document.getElementById('composeSendBtn');
    if (sendBtn) sendBtn.disabled = true;
}

function sendComposeMail() {
    if (!selectedContactId || !selectedOutboxOptionId) return;

    let foundOption = null;
    Object.keys(threadsData).forEach(threadId => {
        const thread = threadsData[threadId];
        if (thread.contactId === selectedContactId && thread.outbox) {
            const opt = thread.outbox.find(o => o.id === selectedOutboxOptionId);
            if (opt) foundOption = opt;
        }
    });

    if (!foundOption) return;
    if (foundOption.onSent) foundOption.onSent();

    showMailToast('邮件已发送');
    renderContactList();
    if (selectedContactId) renderComposeForm(selectedContactId);
    refreshAndScheduleNext();
}

// ========== 通用邮件列表渲染 ==========

function renderMailList(filterType, keepDetail) {
    const activeThreads = getActiveThreads();
    const panel = document.getElementById('mailListPanel');

    const threadIds = Object.keys(activeThreads).sort((a, b) => {
        return getThreadSortValue(activeThreads[b]) - getThreadSortValue(activeThreads[a]);
    });

    const visibleThreadIds = threadIds.filter(id => {
        const thread = activeThreads[id];
        if (filterType === 'inbox') {
            return thread.messages.some(m => m.from !== 'hanxiu');
        } else if (filterType === 'sent') {
            return thread.messages.some(m => m.from === 'hanxiu');
        }
        return true;
    });

    if (visibleThreadIds.length === 0) {
        const emptyText = filterType === 'inbox' ? '收件箱为空' : '发件箱为空';
        panel.innerHTML = `<div style="padding:40px;text-align:center;color:#999;font-size:14px;">${emptyText}</div>`;
        return;
    }

    let html = '';
    visibleThreadIds.forEach(threadId => {
        const thread = activeThreads[threadId];
        const isUnread = isThreadUnread(threadId, thread);
        const isActive = threadId === currentDetailThreadId;

        const isActionRequired = isThreadActionRequired(threadId, thread);
        html += `
            <div class="mail-list-item ${isUnread ? 'unread' : ''} ${isActive ? 'active' : ''} ${isActionRequired ? 'action-required' : ''}" data-thread-id="${threadId}" onclick="showThreadDetail('${threadId}', this)">
                <div class="mail-list-top">
                    <span class="mail-sender">${getThreadDisplaySender(thread)}</span>
                    <span class="mail-date-group">
                        ${isActionRequired ? '<span class="action-badge">待处理</span>' : ''}
                        <span class="mail-date">${getThreadDisplayDate(thread)}</span>
                    </span>
                </div>
                <div class="mail-subject">${thread.subject}</div>
                <div class="mail-preview">${getThreadPreview(thread)}</div>
            </div>
        `;
    });
    panel.innerHTML = html;

    if (!keepDetail) {
        document.getElementById('mailDetailPanel').innerHTML = `<div class="mail-detail-placeholder"><p>选择一封邮件查看内容</p></div>`;
    }
}

function renderInboxList(keepDetail) {
    renderMailList('inbox', keepDetail);
}

function renderSentList(keepDetail) {
    renderMailList('sent', keepDetail);
}

// ========== 详情 ==========

function showThreadDetail(threadId, el, markSeen) {
    if (markSeen === undefined) markSeen = true;
    if (el) {
        document.querySelectorAll('.mail-list-item').forEach(item => item.classList.remove('active'));
        el.classList.add('active');
    }

    currentDetailThreadId = threadId;
    const activeThreads = getActiveThreads();
    const thread = activeThreads[threadId];
    if (!thread) return;

    if (markSeen) markThreadSeen(threadId, thread);
    updateListPanelActiveState(threadId, markSeen);

    const panel = document.getElementById('mailDetailPanel');
    const contact = getContact(thread.contactId);
    const sortedMessages = thread.messages.slice();
    const lastMessage = getLastMessage(thread);

    let html = `
        <div class="mail-detail-content">
            <div class="thread-header">
                <div class="thread-subject">${thread.subject}</div>
                <div class="thread-contact">联系人：${contact.name} &lt;${contact.email}&gt;</div>
            </div>
    `;

    sortedMessages.forEach((message, index) => {
        const msgContact = getContact(message.from);
        const isCollapsed = index !== sortedMessages.length - 1;
        const summary = extractSummary(message.bodyHTML, 30);
        const isOriginalLast = message.id === lastMessage.id;
        const isFromOther = message.from !== 'hanxiu';
        const hasReplyOptions = message.replyOptions && message.replyOptions.length > 0;

        let replyAreaHTML = '';
        if (isOriginalLast && isFromOther) {
            replyAreaHTML = hasReplyOptions ? renderReplyArea(message) : renderDisabledReplyArea();
        }

        html += `
            <div class="thread-message ${isCollapsed ? 'collapsed' : ''}" id="threadMsg-${message.id}">
                <div class="thread-message-header" onclick="toggleMessage('${message.id}')">
                    <div class="contact-avatar" style="background:${msgContact.color};">${msgContact.avatar}</div>
                    <div class="thread-message-sender">${msgContact.name} <span class="sender-email">&lt;${msgContact.email}&gt;</span></div>
                    <div class="thread-message-date">${message.date}</div>
                </div>
                <div class="thread-message-summary" onclick="toggleMessage('${message.id}')">${summary}</div>
                <div class="thread-message-body">${message.bodyHTML}${replyAreaHTML}</div>
            </div>
        `;
    });

    html += `</div>`;
    panel.innerHTML = html;
}

function updateListPanelActiveState(activeThreadId, clearUnread) {
    document.querySelectorAll('.mail-list-item').forEach(item => {
        if (item.dataset.threadId === activeThreadId) {
            item.classList.add('active');
            if (clearUnread) item.classList.remove('unread');
        }
    });
}

// ========== 回复 ==========

function renderReplyArea(message) {
    const options = message.replyOptions || [];
    let optionsHTML = '';
    options.forEach(opt => {
        optionsHTML += `
            <div class="option-bubble" data-reply-option-id="${opt.id}" onclick="selectReplyOption('${opt.id}', '${message.id}', this)">
                <span class="bubble-dot"></span>
                <span class="option-label">${opt.label}</span>
            </div>
        `;
    });

    return `
        <div class="reply-area" id="replyArea-${message.id}">
            <div class="reply-area-title">快速回复</div>
            <div class="reply-input-box">${optionsHTML}</div>
            <div class="reply-actions">
                <button class="send-btn" id="replySendBtn-${message.id}" disabled onclick="sendReply('${message.id}')">发送</button>
            </div>
        </div>
    `;
}

function renderDisabledReplyArea() {
    return `
        <div class="reply-area disabled">
            <div class="reply-area-title">快速回复</div>
            <div class="reply-input-box disabled">
                <div class="reply-placeholder-text">请输入回复内容</div>
            </div>
            <div class="reply-actions">
                <button class="send-btn" disabled>发送</button>
            </div>
        </div>
    `;
}

function toggleMessage(messageId) {
    const msgEl = document.getElementById('threadMsg-' + messageId);
    if (msgEl) msgEl.classList.toggle('collapsed');
}

function selectReplyOption(optionId, messageId, el) {
    selectedReplyOptionId = optionId;
    document.querySelectorAll('.option-bubble').forEach(item => item.classList.remove('selected'));
    if (el) el.classList.add('selected');
    const btn = document.getElementById('replySendBtn-' + messageId);
    if (btn) btn.disabled = false;
}

function sendReply(messageId) {
    if (!selectedReplyOptionId) return;

    let foundOption = null;
    Object.keys(threadsData).forEach(threadId => {
        const thread = threadsData[threadId];
        const msg = thread.messageIds
            .map(id => messagePool[id])
            .find(m => m && m.id === messageId);
        if (msg && msg.replyOptions) {
            const opt = msg.replyOptions.find(o => o.id === selectedReplyOptionId);
            if (opt) foundOption = opt;
        }
    });

    if (!foundOption) return;
    if (foundOption.onSent) foundOption.onSent();

    showMailToast('邮件已发送');
    selectedReplyOptionId = null;
    showThreadDetail(currentDetailThreadId);
    refreshAndScheduleNext();
}

// ========== 其他 ==========

function showMailToast(message) {
    const toast = document.createElement('div');
    toast.className = 'mail-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1600);
}

function openFileWindow(appId, titleOverride) {
    if (window.parent && window.parent.WindowManager) {
        window.parent.WindowManager.openApp(appId, { titleOverride: titleOverride });
    }
}

// ========== 事件 ==========

document.getElementById('mailPassword').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') loginMail();
});
document.getElementById('mailAddress').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') loginMail();
});

document.addEventListener('DOMContentLoaded', function() {
    const savedUser = getMailState().loggedIn;
    if (savedUser === 'hanxiu') {
        currentUser = 'hanxiu';
        enterMailbox('韩休 &lt;hanxiu@mail.com&gt;');
    }
});

window.addEventListener('storage', function(e) {
    if (currentUser !== 'hanxiu') return;

    // 调度器更新了 mail_state（如 triggerTime / signedTime / codeTime）
    if (e.key === 'mail_state') {
        refreshAndScheduleNext();
        return;
    }

    if (e.key && e.key.startsWith('mail_')) {
        if (composeMode) {
            renderContactList();
            if (selectedContactId) renderComposeForm(selectedContactId);
            else renderComposePlaceholder();
        } else if (currentFolder === 'inbox') {
            renderInboxList(false);
        } else if (currentFolder === 'sent') {
            renderSentList(false);
        }
        return;
    }

    const watchedComposeKeys = [
        'mail_contact_unlocked',
        'job_apply_attempted'
    ];

    if (watchedComposeKeys.includes(e.key)) {
        if (composeMode) {
            renderContactList();
            if (selectedContactId) renderComposeForm(selectedContactId);
            else renderComposePlaceholder();
        }
        return;
    }
});