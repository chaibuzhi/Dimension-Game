


// ========== 首页 ==========
function renderDashboard() {
    const user = intranetUserData.getCurrentUser();
    const homeData = getIntranetHomeData();

    // 首页只展示前 4 条
    const topNotices = homeData.notices.slice(0, 4);

    // 动态计算未读数
    const unreadCount = topNotices.filter(n => n.unread && !isNoticeRead(user.id, n.id)).length;

    const noticeItems = topNotices.map(n => {
        const read = isNoticeRead(user.id, n.id);
        const showUnread = n.unread && !read;
        return `
            <div class="notice-item ${showUnread ? 'unread' : ''}" onclick="openNotice('${n.id}')">
                <span class="notice-tag ${n.tagType === 'danger' ? 'notice-tag-danger' : 'notice-tag-normal'}">${n.tag}</span>
                <div class="notice-content">
                    <div class="notice-title">${n.title}</div>
                </div>
                <span class="notice-date">${n.date}</span>
            </div>
        `;
    }).join('');

    const projectRows = homeData.workSummary.map(t => {
        const statusColors = {
            'warning': '#d97706',
            'active': '#1e4a8f',
            'done': '#059669',
            'danger': '#dc2626'
        };
        const color = statusColors[t.status] || '#1e4a8f';
        return `
            <div class="work-task">
                <div class="work-task-left">
                    <span class="work-task-code">${t.code}</span>
                    <span class="work-task-name">${t.name}</span>
                </div>
                <div class="work-task-right">
                    <div class="work-task-status-row">
                        <span class="work-task-label" style="background: ${t.status === 'danger' ? 'rgba(220,38,38,0.08)' : 'rgba(30,74,143,0.06)'}; color:${color};">${t.label}</span>
                        <span class="work-task-percent">${t.progress}%</span>
                    </div>
                    <div class="work-progress-bar">
                        <div class="work-progress-fill" style="width:${t.progress}%; background:${color};"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const quickNavItems = homeData.quickNav.map(q => `
        <div class="quick-card" onclick="switchModule('${q.id}')">
            <span class="quick-card-icon">${q.icon}</span>
            <span class="quick-card-label">${q.label}</span>
            <span class="quick-card-arrow">→</span>
        </div>
    `).join('');

    return `
        <div class="welcome-section">
            <p class="welcome-greeting">Welcome back</p>
            <h1 class="welcome-name">欢迎回来，${user.name}</h1>
            <p class="welcome-quote">${homeData.greeting.quote}——《${homeData.greeting.source}》</p>

            <div class="welcome-stats">
                <div class="welcome-stat-item">
                    <div class="welcome-stat-label">进行项目</div>
                    <div class="welcome-stat-value">3 <span class="welcome-stat-unit">项</span> <span class="welcome-stat-trend">↗</span></div>
                </div>
                <div class="welcome-stat-item">
                    <div class="welcome-stat-label">工作日志</div>
                    <div class="welcome-stat-value">106 <span class="welcome-stat-unit">篇</span> <span class="welcome-stat-trend">↗</span></div>
                </div>
                <div class="welcome-stat-item">
                    <div class="welcome-stat-label">未读通知</div>
                    <div class="welcome-stat-value">${unreadCount} <span class="welcome-stat-unit">条</span> <span class="welcome-stat-trend">↗</span></div>
                </div>
                <div class="welcome-stat-item">
                    <div class="welcome-stat-label">数据中心</div>
                    <div class="welcome-stat-value">74% <span class="welcome-stat-unit">已用</span> <span class="welcome-stat-trend">↗</span></div>
                </div>
            </div>
        </div>
        <div class="dashboard-columns">
            <div class="dashboard-col">
                <div class="card">
                    <div class="card-title"><span class="hex-icon">⬡</span> 内部通知</div>
                    ${noticeItems}
                </div>
            </div>
            <div class="dashboard-col">
                <div class="card">
                    <div class="card-title"><span class="hex-icon">⬡</span> ${user.dept}项目进度</div>
                    ${projectRows}
                </div>
            </div>
        </div>
        <div class="quick-cards">${quickNavItems}</div>
    `;
}