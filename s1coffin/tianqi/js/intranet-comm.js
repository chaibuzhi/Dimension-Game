// ========== 内部通讯 ==========
function renderComm() {
    const contacts = [
        { id: 'luo',   name: '罗建立', title: '总裁',       avatar: '👤', avatarImg: 'image/bar/bar_ljl.webp' },
        { id: 'liu',   name: '刘忙',   title: '数据监测部', avatar: '🧙', avatarImg: 'image/bar/bar_lm.webp' },
        { id: 'shi',   name: '石冬',   title: '勘探行动部', avatar: '🧗', avatarImg: 'image/bar/bar_sd.webp' },
        { id: 'shen',  name: '沈曼',   title: '材料实验部', avatar: '🔬', avatarImg: 'image/bar/bar_sm.webp' },
        { id: 'zhong', name: '钟明远', title: '工程技术部', avatar: '🔧', avatarImg: 'image/bar/bar_zmy.webp' },
        { id: 'wu',    name: '吴念清', title: '人力资源部', avatar: '📋', avatarImg: 'image/bar/bar_wnq.webp' }
    ];

    const contactItems = contacts.map(c => `
        <div class="comm-contact-item" data-name="${c.name}" onclick="selectCommContact(this, '${c.name}')">
            <div class="comm-contact-avatar">
                ${c.avatarImg ? `<img src="${c.avatarImg}" alt="${c.name}">` : c.avatar}
            </div>
            <div class="comm-contact-info">
                <div class="comm-contact-name">${c.name}</div>
                <div class="comm-contact-title">${c.title}</div>
            </div>
            <span class="comm-contact-empty"></span>
        </div>
    `).join('');

    return `
        <div class="comm-page">
            <div class="comm-announcement" onclick="openTqchatNotice()">
                <span class="comm-announcement-tag">重要</span>
                <div class="comm-announcement-scroll">
                    <span class="comm-announcement-text">关于天启科技内部通讯系统安全升级的通知　2026年6月24日</span>
                </div>
                <span class="comm-announcement-arrow">→</span>
            </div>
            <div class="comm-app">
                <div class="comm-app-sidebar">
                    <div class="comm-search-box">
                        <input type="text" placeholder="搜索联系人..." disabled>
                    </div>
                    <div class="comm-contact-list">
                        ${contactItems}
                    </div>
                </div>
                <div class="comm-app-chat">
                    <div class="comm-app-chat-header" id="commChatHeader">请选择联系人</div>
                    <div class="comm-app-chat-body" id="commChatBody">
                        <div class="comm-cleared-message">
                            <p>内部通讯记录已于 <strong>2026年7月15日</strong> 被手动清除。</p>
                            <p>如需恢复，请联系安全合规部技术科。</p>
                            <button class="comm-restore-btn" onclick="markRestoreClicked(); showToast('当前账号权限不足')">申请恢复</button>
                            <p class="comm-restore-hint" id="commRestoreHint"></p>
                        </div>
                    </div>
                    <div class="comm-app-chat-input">
                        <input type="text" placeholder="输入消息..." disabled>
                        <button disabled>发送</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function selectCommContact(el, name) {
    document.querySelectorAll('.comm-contact-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');

    const header = document.getElementById('commChatHeader');
    const body = document.getElementById('commChatBody');
    if (header) header.textContent = name;
    if (body) {
        body.innerHTML = `
            <div class="comm-cleared-message">
                <p>与 <strong>${name}</strong> 的通讯记录已于 <strong>2026年7月15日</strong> 被手动清除。</p>
                <p>如需恢复，请联系安全合规部技术科。</p>
                <button class="comm-restore-btn" onclick="markRestoreClicked(); showToast('当前账号权限不足')">申请恢复</button>
                <p class="comm-restore-hint" id="commRestoreHint"></p>
            </div>
        `;
    }
}