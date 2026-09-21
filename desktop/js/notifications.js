// ========== 桌面通知系统 ==========

// ========== 通知音效（Web Audio 生成，Gmail 风格） ==========
const NotificationSound = (function() {
    let ctx = null;

    function init() {
        if (ctx) return;
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            ctx = new AC();
        } catch (e) {
            console.warn('Web Audio 不可用');
        }
    }

    // 单音 bell：基频 + 泛音，三角波带来温暖感
    function bell(freq, startDelay, dur, vol) {
        if (!ctx) return;
        const now = ctx.currentTime + startDelay;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, now);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2.76, now);   // 泛音，钟声特征

        const gain2 = ctx.createGain();
        gain2.gain.setValueAtTime(0.25, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(vol, now + 0.008);   // 8ms 快起
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        osc1.connect(gain);
        osc2.connect(gain2);
        gain2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + dur + 0.05);
        osc2.stop(now + dur + 0.05);
    }

    function play() {
        init();
        if (!ctx) return;
        if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }

        // Gmail 式双音：下行小三度，钟声
        bell(1175, 0,    0.55, 0.18);   // D6
        bell(988,  0.14, 0.65, 0.16);   // B5
    }

    return { play };
})();

const Notifications = (function() {
    const MAX_VISIBLE_CARDS = 3;
    const CARD_DURATION = 10000;
    const STORAGE_KEY = 'notifications';

    let cardStack = [];
    let panelOpen = false;

    // ========== 提取邮件摘要 ==========
    function extractMailPreview(bodyHTML, maxLength) {
        maxLength = maxLength || 18;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = bodyHTML;
        let text = tempDiv.textContent || tempDiv.innerText || '';
        text = text.replace(/\s+/g, ' ').trim();
        if (text.length > maxLength) {
            text = text.substring(0, maxLength) + '...';
        }
        return text;
    }

    // ========== 从 data 文件获取通知文案 ==========
    function getNotificationContent(eventId) {
        // 邮件类通知
        if (eventId && typeof messagePool !== 'undefined' && messagePool[eventId]) {
            const msg = messagePool[eventId];
            const contact = (typeof contactsData !== 'undefined' && contactsData[msg.from])
                ? contactsData[msg.from]
                : { name: msg.from || '未知' };

            // 初始未读邮件用特殊标题
            const isInitialMail = (eventId === 'tq-001' || eventId === 'xy-001');

            return {
                icon: '📧',
                title: isInitialMail ? '未读邮件提醒' : '收到新的邮件',
                subtitle: contact.name,
                preview: extractMailPreview(msg.bodyHTML),
                appId: 'mail'
            };
        }

        // 天启通好友申请
        if (eventId === 'friend_request' && typeof chatNotificationContent !== 'undefined') {
            const content = chatNotificationContent.friend_request || {};
            return {
                icon: content.icon || '💬',
                title: content.title || '天启通',
                subtitle: content.subtitle || '收到好友申请',
                appId: content.appId || 'chat'
            };
        }

        // 邮件可发送解锁：能源老刘
        if (eventId === 'mail-unlock-laoliu') {
            return {
                icon: '📩',
                title: '有邮件可以发送',
                subtitle: '联系人 · 能源老刘',
                appId: 'mail'
            };
        }

        // 邮件可发送解锁：周小舟
        if (eventId === 'mail-unlock-xiaozhou') {
            return {
                icon: '📩',
                title: '有邮件可以发送',
                subtitle: '联系人 · 周小舟',
                appId: 'mail'
            };
        }

        // 备忘录更新
        if (eventId && eventId.startsWith('notebook_update_')) {
            return {
                icon: '📒',
                title: '备忘录已更新',
                subtitle: '',
                appId: null
            };
        }

        // 成就系统提示
        if (eventId === 'achievement_hint') {
            return {
                icon: '🏆',
                title: '成就已更新',
                subtitle: '前往桌面查看',
                appId: 'achievement'
            };
        }           
             
        // 默认
        return {
            icon: '📩',
            title: '通知',
            subtitle: '',
            appId: null
        };
    }

    // ========== 历史管理 ==========
    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch {
            return [];
        }
    }

    function saveHistory(history) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }

    // ========== 显示通知卡片 ==========
    function showCard(notification) {
        const stack = document.getElementById('noticeStack');
        if (!stack) return;

        NotificationSound.play();

        const card = document.createElement('div');
        card.className = 'notice-card';
        card.dataset.notificationId = notification.id;
        card.innerHTML = `
            <div class="notice-icon">${notification.icon}</div>
            <div class="notice-body">
                <div class="notice-title">${notification.title}</div>
                <div class="notice-subtitle">${notification.subtitle}</div>
                ${notification.preview ? `<div class="notice-preview">${notification.preview}</div>` : ''}
            </div>
            <button class="notice-close" title="关闭">×</button>
        `;

        card.addEventListener('click', function(e) {
            if (e.target.closest('.notice-close')) return;
            if (notification.appId) {
                WindowManager.openApp(notification.appId);
            }
            markNotificationRead(notification.id);
            dismissCard(card);
        });

        card.querySelector('.notice-close').addEventListener('click', function(e) {
            e.stopPropagation();
            dismissCard(card);
        });

        stack.appendChild(card);
        cardStack.push(card);

        while (cardStack.length > MAX_VISIBLE_CARDS) {
            const oldest = cardStack.shift();
            if (oldest) dismissCard(oldest, true);
        }

        requestAnimationFrame(() => {
            card.classList.add('visible');
        });

        card._dismissTimer = setTimeout(() => {
            dismissCard(card);
        }, CARD_DURATION);
    }

    function dismissCard(card, immediate) {
        if (!card || !card.parentElement || card._dismissed) return;
        card._dismissed = true;
        clearTimeout(card._dismissTimer);

        card.classList.remove('visible');
        card.classList.add('hiding');

        setTimeout(() => {
            if (card.parentElement) card.remove();
            const idx = cardStack.indexOf(card);
            if (idx !== -1) cardStack.splice(idx, 1);
        }, immediate ? 0 : 300);
    }

    // ========== 未读红点 ==========
    function updateUnreadBadge() {
        const badge = document.getElementById('notificationBadge');
        if (!badge) return;
        const history = getHistory();
        const hasUnread = history.some(n => !n.read);
        badge.textContent = '';
        badge.classList.toggle('hidden', !hasUnread);
    }

    function markAllRead() {
        const history = getHistory();
        history.forEach(n => n.read = true);
        saveHistory(history);
        updateUnreadBadge();
    }

    function markNotificationRead(notificationId) {
        const history = getHistory();
        const notif = history.find(n => n.id === notificationId);
        if (notif && !notif.read) {
            notif.read = true;
            saveHistory(history);
            updateUnreadBadge();
        }
    }

    // ========== 通知中心面板 ==========
    function togglePanel() {
        if (panelOpen) closePanel();
        else openPanel();
    }

    function openPanel() {
        const panel = document.getElementById('noticePanel');
        if (!panel) return;

        panelOpen = true;
        renderPanel();
        panel.classList.remove('hidden');
        void panel.offsetWidth;
        panel.classList.add('visible');
        markAllRead();
    }

    function closePanel() {
        const panel = document.getElementById('noticePanel');
        if (!panel) return;

        panelOpen = false;
        panel.classList.remove('visible');
        setTimeout(() => {
            panel.classList.add('hidden');
        }, 300);
    }

    function renderPanel() {
        const list = document.getElementById('noticePanelList');
        if (!list) return;

        const history = getHistory();

        if (history.length === 0) {
            list.innerHTML = '<div style="text-align:center;color:#70708a;font-size:12px;padding:40px 16px;">暂无通知</div>';
            return;
        }

        let html = '';
        history.forEach(notification => {
            const timeStr = formatNotifyTime(notification.timestamp);
            html += `
                <div class="notice-panel-item" data-app-id="${notification.appId || ''}">
                    <div class="notice-panel-icon">${notification.icon}</div>
                    <div class="notice-panel-body">
                        <div class="notice-panel-item-title">${notification.title}</div>
                        <div class="notice-panel-item-subtitle">${notification.subtitle}</div>
                        ${notification.preview ? `<div class="notice-panel-item-preview">${notification.preview}</div>` : ''}
                        <div class="notice-panel-item-time">${timeStr}</div>
                    </div>
                </div>
            `;
        });
        list.innerHTML = html;
        requestAnimationFrame(() => {
            list.scrollTop = list.scrollHeight;
        });

        list.querySelectorAll('.notice-panel-item').forEach(item => {
            item.addEventListener('click', function() {
                const appId = this.dataset.appId;
                if (appId) WindowManager.openApp(appId);
                closePanel();
            });
        });
    }

    function formatNotifyTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return Math.floor(diff / 60000) + ' 分钟前';
        if (diff < 86400000) return Math.floor(diff / 3600000) + ' 小时前';

        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${month}月${day}日 ${hour}:${min}`;
    }

    // ========== 检查计划通知 ==========
    function checkScheduledNotifications() {
        const schedule = JSON.parse(localStorage.getItem('scheduled_notifications') || '[]');
        if (schedule.length === 0) return;

        const now = Date.now();
        const due = [];
        const remaining = [];

        schedule.forEach(item => {
            if (item.showAt <= now) due.push(item);
            else remaining.push(item);
        });

        if (due.length > 0) {
            localStorage.setItem('scheduled_notifications', JSON.stringify(remaining));
            const history = getHistory();

            due.forEach(item => {
                // 去重：历史中已存在相同 eventId 则跳过
                if (history.some(n => n.eventId === item.eventId)) return;

                const content = getNotificationContent(item.eventId);
                const notification = {
                    id: Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                    eventId: item.eventId,
                    icon: content.icon,
                    title: content.title,
                    subtitle: content.subtitle,
                    preview: content.preview || '',
                    appId: content.appId,
                    timestamp: Date.now(),
                    read: false
                };
                history.push(notification);
                showCard(notification);
            });

            if (history.length > 50) history.splice(0, history.length - 50);
            saveHistory(history);
            updateUnreadBadge();
            if (panelOpen) renderPanel();
        }
    }

    // ========== 初始化 ==========
    function init() {
        updateUnreadBadge();

        const bell = document.getElementById('taskbarNotificationArea');
        if (bell) {
            bell.addEventListener('click', function(e) {
                e.stopPropagation();
                togglePanel();
            });
        }

        document.addEventListener('click', function(e) {
            if (panelOpen) {
                const panel = document.getElementById('noticePanel');
                if (panel && !panel.contains(e.target) && !e.target.closest('#taskbarNotificationArea')) {
                    closePanel();
                }
            }
        });

        // 每 2 秒检查一次计划通知
        setInterval(checkScheduledNotifications, 2000);
    }

    return {
        init: init,
        togglePanel: togglePanel,
        closePanel: closePanel,
        updateUnreadBadge: updateUnreadBadge
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    Notifications.init();
});