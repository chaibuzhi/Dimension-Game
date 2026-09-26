// ========== 天启通 · 神秘人对话模块 ==========

let mysteryStep = 0;
let mysteryTimer = null;
let friendRequestPending = false;

// ========== 初始化：恢复持久化状态 ==========
function initMysteryState() {
    const state = getTqchatState();

    friendRequestPending = state.friendRequestPending === true;
    if (friendRequestPending) {
        const noticeContact = chatContacts.find(c => c.id === 'notice');
        if (noticeContact) noticeContact.hasUnread = true;
    }

    if (state.mysteryUnlocked === true) {
        const mystery = chatContacts.find(c => c.id === 'mystery');
        if (mystery) mystery.unlocked = true;
    }

    mysteryStep = state.mysteryStep || 0;
    const choices = state.mysteryChoices || {};
    const messages = chatMessages.mystery || [];
    messages.forEach(msg => {
        if (msg.sender === 'choice' && choices[msg.step]) {
            msg.chosen = choices[msg.step];
        }
    });
}

// ========== 持久化：保存完整状态 ==========
function saveMysteryState() {
    const messages = chatMessages.mystery || [];
    const choices = {};

    messages.forEach(msg => {
        if (msg.sender === 'choice' && msg.chosen) {
            choices[msg.step] = msg.chosen;
        }
    });

    setTqchatState('mysteryStep', mysteryStep);
    setTqchatState('mysteryChoices', choices);
}

// ========== 清除：剧情强制重置时调用 ==========
function resetMysteryState() {
    mysteryStep = 0;
    friendRequestPending = false;
    if (mysteryTimer) clearTimeout(mysteryTimer);

    const messages = chatMessages.mystery || [];
    messages.forEach(msg => {
        if (msg.sender === 'choice') msg.chosen = null;
    });

    setTqchatState('mysteryStep', 0);
    setTqchatState('mysteryChoices', {});
    setTqchatState('mysteryUnlocked', false);
    setTqchatState('friendRequestPending', false);
}

// ========== 触发好友申请 ==========
function triggerFriendRequest() {
    friendRequestPending = true;
    setTqchatState('friendRequestPending', true);

    const noticeContact = chatContacts.find(c => c.id === 'notice');
    if (noticeContact) noticeContact.hasUnread = true;

    renderContactList();

    if (currentChatId === 'notice') {
        renderMessages('notice');
    }
}

// ========== 同意好友申请 ==========
function acceptFriendRequest() {
    friendRequestPending = false;
    setTqchatState('friendRequestPending', false);

    const noticeContact = chatContacts.find(c => c.id === 'notice');
    if (noticeContact) noticeContact.hasUnread = false;

    const mystery = chatContacts.find(c => c.id === 'mystery');
    if (mystery) mystery.unlocked = true;
    setTqchatState('mysteryUnlocked', true);

    // 神秘人音乐：从这一刻起循环播放
    if (typeof ChatMusic !== 'undefined') {
        ChatMusic.start();
    }

    updateInputLockState();

    renderContactList();
    selectContact('mystery');

    mysteryStep = 0;
    saveMysteryState();
    document.getElementById('chatMessages').innerHTML = '';
    document.getElementById('choiceButtons').classList.add('hidden');

    if (mysteryTimer) clearTimeout(mysteryTimer);
    mysteryTimer = setTimeout(function() {
        showMysteryStep(0);
    }, 2500);
}

// ========== 神秘人消息推进 ==========
function showMysteryStep(stepIndex) {
    const messages = chatMessages.mystery;
    if (!messages || stepIndex >= messages.length) return;

    const msg = messages[stepIndex];

    if (msg.sender === 'choice') {
        renderChoiceButtons(msg.choices, function(clickedChoice) {
            handleMysteryChoice(msg, clickedChoice);
        });
        return;
    }

    renderSingleMysteryMessage(msg);
    mysteryStep = stepIndex + 1;
    saveMysteryState();

    // 如果对话已结束，调度锁定
    if (mysteryStep >= messages.length) {
        scheduleTqchatLock();
        return;
    }

    if (msg.type === 'image') return;

    const nextMsg = messages[mysteryStep];
    if (!nextMsg) return;

    if (nextMsg.sender === 'choice') {
        showMysteryStep(mysteryStep);
    } else {
        const delay = nextMsg.delay || 2000;
        if (mysteryTimer) clearTimeout(mysteryTimer);
        mysteryTimer = setTimeout(function() {
            showMysteryStep(mysteryStep);
        }, delay);
    }
}

// ========== 玩家选择处理 ==========
function handleMysteryChoice(choiceMsg, clickedChoice) {
    document.getElementById('choiceButtons').classList.add('hidden');

    choiceMsg.chosen = clickedChoice.label;

    const playerText = clickedChoice.label.replace(/^我：/, '');
    appendPlayerMessage(playerText);

    mysteryStep = clickedChoice.nextStep;
    saveMysteryState();

    if (mysteryTimer) clearTimeout(mysteryTimer);
    mysteryTimer = setTimeout(function() {
        showMysteryStep(mysteryStep);
    }, 2000);
}

// ========== 渲染单条神秘人消息 ==========
function renderSingleMysteryMessage(msg) {
    const container = document.getElementById('chatMessages');
    const contact = chatContacts.find(c => c.id === 'mystery');

    if (msg.sender === 'them') {
        if (msg.type === 'image') {
            const imageHTML = `
                <div class="msg-row them">
                    ${renderAvatar(contact, 'msg-avatar', '⬡')}
                    <img class="msg-image" src="${msg.imageUrl}" alt="${msg.text}"
                         onclick="openMysteryImageAndShowChoices('${msg.viewerAppId}')">
                </div>
            `;
            container.insertAdjacentHTML('beforeend', imageHTML);
        } else {
            const bubbleHTML = `
                <div class="msg-row them">
                    ${renderAvatar(contact, 'msg-avatar', '⬡')}
                    <div class="msg-bubble">${msg.text}</div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', bubbleHTML);
        }
    } else if (msg.sender === 'me') {
        appendPlayerMessage(msg.text);
    }

    container.scrollTop = container.scrollHeight;
}

// ========== 打开神秘人图片并显示后续选项 ==========
function openMysteryImageAndShowChoices(viewerAppId) {
    if (window.parent && window.parent.WindowManager) {
        window.parent.WindowManager.openApp(viewerAppId);
    }

    const messages = chatMessages.mystery;
    const nextMsg = messages[mysteryStep];
    if (nextMsg && nextMsg.sender === 'choice') {
        renderChoiceButtons(nextMsg.choices, function(clickedChoice) {
            handleMysteryChoice(nextMsg, clickedChoice);
        });
    }
}

// ========== 渲染神秘人对话历史 ==========
function renderMysteryHistory() {
    const container = document.getElementById('chatMessages');
    const messages = chatMessages.mystery || [];
    const contact = chatContacts.find(c => c.id === 'mystery');

    if (messages.length === 0) {
        container.innerHTML = '<div style="text-align:center; color:var(--text-muted); font-size:12px; padding:40px 0;">暂无通讯记录</div>';
        document.getElementById('choiceButtons').classList.add('hidden');
        return;
    }

    let html = '';

    for (let i = 0; i < mysteryStep && i < messages.length; i++) {
        const msg = messages[i];

        if (msg.sender === 'choice') {
            if (msg.chosen) {
                html += buildPlayerMessageHTML(msg.chosen.replace(/^我：/, ''));
            }
            continue;
        }

        if (msg.sender === 'them') {
            if (msg.type === 'image') {
                html += `
                    <div class="msg-row them">
                        ${renderAvatar(contact, 'msg-avatar', '⬡')}
                        <img class="msg-image" src="${msg.imageUrl}" alt="${msg.text}"
                             onclick="openMysteryImageAndShowChoices('${msg.viewerAppId}')">
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
        } else if (msg.sender === 'me') {
            html += buildPlayerMessageHTML(msg.text);
        }
    }

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;

    const currentMsg = messages[mysteryStep];

    if (currentMsg && currentMsg.sender === 'choice') {
        renderChoiceButtons(currentMsg.choices, function(clickedChoice) {
            handleMysteryChoice(currentMsg, clickedChoice);
        });
    } else if (currentMsg) {
        document.getElementById('choiceButtons').classList.add('hidden');
        const delay = currentMsg.delay || 2000;
        if (mysteryTimer) clearTimeout(mysteryTimer);
        mysteryTimer = setTimeout(function() {
            showMysteryStep(mysteryStep);
        }, delay);
    } else {
        document.getElementById('choiceButtons').classList.add('hidden');
        // 对话已结束，确保锁定计时器启动
        scheduleTqchatLock();
    }
}

// ========== 辅助：构建玩家消息 HTML ==========
function buildPlayerMessageHTML(text) {
    return `
        <div class="msg-row me">
            ${renderAvatar(currentUserProfile, 'msg-avatar', '丁')}
            <div class="msg-bubble">${text}</div>
        </div>
    `;
}

// ========== 辅助：追加玩家消息到当前聊天区 ==========
function appendPlayerMessage(text) {
    const container = document.getElementById('chatMessages');
    container.insertAdjacentHTML('beforeend', buildPlayerMessageHTML(text));
    container.scrollTop = container.scrollHeight;
}