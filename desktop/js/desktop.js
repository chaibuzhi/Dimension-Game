// ========== 桌面核心逻辑 ==========
document.addEventListener('DOMContentLoaded', function() {

    // ========== 通关后模式：应用浅色主题 ==========
    if (localStorage.getItem('post_ending_mode') === 'true') {
        document.body.classList.add('post-ending');
    }

    // ========== 成就系统：记录首次打开时间 ==========
    (function() {
        const KEY = 'achievements_state';
        let state = {};
        try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch {}
        if (!state.first_open) {
            state.first_open = Date.now();
            localStorage.setItem(KEY, JSON.stringify(state));
        }
    })();    

    // ========== 成就系统：扫描 + 桌面提示 ==========
    (function() {
        // 扫描一次（写入 unlocked）
        if (typeof window.scanAchievements === 'function') {
            window.scanAchievements();
        }

        // 检查是否有待发的"成就已更新"提示
        if (localStorage.getItem('achievement_hint_pending') === 'true') {
            localStorage.removeItem('achievement_hint_pending');
            const queue = JSON.parse(localStorage.getItem('scheduled_notifications') || '[]');
            queue.push({ eventId: 'achievement_hint', showAt: Date.now() + 3000 });
            localStorage.setItem('scheduled_notifications', JSON.stringify(queue));
        }
    })();
    
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        const count = 60;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (8 + Math.random() * 12) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.width = (1 + Math.random() * 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = (0.3 + Math.random() * 0.4).toFixed(2);
            container.appendChild(particle);
        }
    }
    createParticles();

    // ========== 渲染桌面图标 ==========
    function renderDesktopIcons() {
        const container = document.getElementById('desktopIcons');
        if (!container) return;
        let html = '';
        appsRegistry.forEach(app => {
            if (app.desktopIcon === false) return;
            if (app.unlockKey && localStorage.getItem(app.unlockKey) !== 'true') return;
            html += `
                <div class="desktop-icon" data-app-id="${app.id}" title="${app.name}">
                    <span class="icon-img">${app.icon}</span>
                    <span class="icon-label">${app.name}</span>
                </div>
            `;
        });
        container.innerHTML = html;
        container.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                container.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                WindowManager.openApp(this.dataset.appId);
            });
        });
    }
    renderDesktopIcons();

    // ========== 监听 localStorage 变化，实时更新桌面图标 ==========
    window.addEventListener('storage', function(e) {
        // 当天启通安装状态变化时，重新渲染桌面图标
        if (e.key === 'tqchat_installed') {
            renderDesktopIcons();
        }
    });    

    // 点击桌面空白取消选中
    document.getElementById('desktop').addEventListener('click', function(e) {
        if (e.target === this || e.target.id === 'desktopIcons') {
            document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        }
    });

    // ========== 时钟 ==========
    function updateTime() {
        const now = new Date();
        const timeEl = document.getElementById('taskbarTime');
        if (timeEl) {
            const dateStr = document.body.classList.contains('post-ending')
                ? '2026年7月22日'
                : '2026年7月18日';
            timeEl.innerHTML = dateStr + '<br>' +
                String(now.getHours()).padStart(2, '0') + ':' +
                String(now.getMinutes()).padStart(2, '0');
        }
    }
    updateTime();
    setInterval(updateTime, 1000);

    // 点击时间区域最小化所有窗口
    const timeEl = document.getElementById('taskbarTime');
    if (timeEl) {
        timeEl.style.cursor = 'pointer';
        timeEl.addEventListener('click', function(e) {
            e.stopPropagation();
            WindowManager.minimizeAll();
        });
    }

    // ========== 开始菜单 ==========
    function renderStartMenu() {
        const menu = document.getElementById('startMenu');
        if (!menu) return;
        menu.innerHTML = `
            <div class="start-menu-item" data-action="about">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M8 7.5V11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                    <circle cx="8" cy="5" r="0.8" fill="currentColor"/>
                </svg>
                关于游戏
            </div>
            <div class="start-menu-item" data-action="achievement">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="8,1.5 14,5 14,11 8,14.5 2,11 2,5" stroke="currentColor" stroke-width="1.1" fill="none" stroke-linejoin="round"/>
                    <polygon points="8,4.5 11.5,6.5 11.5,9.5 8,11.5 4.5,9.5 4.5,6.5" stroke="currentColor" stroke-width="0.6" fill="none" stroke-linejoin="round" opacity="0.5"/>
                </svg>
                查看成就
            </div>
            <div class="start-menu-divider"></div>
            <div class="start-menu-item" data-action="restart">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                </svg>
                重新开始
            </div>
        `;
        menu.querySelectorAll('.start-menu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const action = this.dataset.action;
                if (action === 'restart') WindowManager.showModal('restart');
                else if (action === 'about') WindowManager.openApp('about');
                else if (action === 'achievement') WindowManager.openApp('achievement');
                menu.classList.add('hidden');
            });
        });
    }
    renderStartMenu();

    document.getElementById('startButton').addEventListener('click', function(e) {
        e.stopPropagation();
        document.getElementById('startMenu').classList.toggle('hidden');
    });

    document.addEventListener('click', function(e) {
        const menu = document.getElementById('startMenu');
        if (menu && !menu.classList.contains('hidden')
            && !e.target.closest('.start-menu')
            && !e.target.closest('.start-button')) {
            menu.classList.add('hidden');
        }
    });

});