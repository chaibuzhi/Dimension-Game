// ========== intranet_state 状态管理 ==========
const INTRANET_STATE_KEY = 'intranet_state';

function getIntranetState() {
    try {
        return JSON.parse(localStorage.getItem(INTRANET_STATE_KEY) || '{}');
    } catch {
        return {};
    }
}

function setIntranetStateField(key, value) {
    const state = getIntranetState();
    state[key] = value;
    localStorage.setItem(INTRANET_STATE_KEY, JSON.stringify(state));
}

function getIntranetStateField(key, fallback) {
    const state = getIntranetState();
    return state[key] !== undefined ? state[key] : fallback;
}

// ========== 全局状态 ==========
const navOrder = [
    { id: 'dashboard', label: '首页', icon: '⬡' },
    { id: 'projects', label: '项目中心', icon: '◈' },
    { id: 'logs', label: '工作日志', icon: '▣' },
    { id: 'comm', label: '内部通讯', icon: '✉' },
    { id: 'files', label: '云数据', icon: '▢' },
    { id: 'profile', label: '个人中心', icon: '⬡' }
];

let currentModule = 'dashboard';

// ========== 通知已读状态（存于 intranet_state.noticesRead） ==========
function isNoticeRead(userId, noticeId) {
    const list = getIntranetStateField('noticesRead', []);
    return list.includes(noticeId);
}

function markNoticeRead(userId, noticeId) {
    const list = getIntranetStateField('noticesRead', []);
    if (!list.includes(noticeId)) {
        list.push(noticeId);
        setIntranetStateField('noticesRead', list);
    }
}

// ========== 时间显示 ==========
function updateHeaderTime() {
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    document.getElementById('contentHeaderTime').textContent = '2026年7月18日 ' + timeStr;
}

updateHeaderTime();
setInterval(updateHeaderTime, 1000);

// ========== 渲染用户卡片 ==========
function renderUserCard() {
    const user = intranetUserData.getCurrentUser();
    document.getElementById('userCard').innerHTML = `
        <div class="user-card">
            <div class="user-avatar">
                <img src="${user.avatar}" alt="${user.name}">
            </div>
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-dept">${user.dept}</div>
                <div class="user-id">${user.id}</div>
            </div>
        </div>
    `;
}

// ========== 渲染导航 ==========
function renderSidebarNav() {
    let html = '';
    navOrder.forEach(item => {
        html += `
            <button class="nav-item ${item.id === currentModule ? 'active' : ''}" data-module="${item.id}" onclick="switchModule('${item.id}', this)">
                <span class="nav-icon">${item.icon}</span>
                <span class="nav-label">${item.label}</span>
            </button>
        `;
    });
    document.getElementById('sidebarNav').innerHTML = html;
}

// ========== 渲染侧边栏底部 ==========
function renderSidebarFooter() {
    const user = intranetUserData.getCurrentUser();
    document.getElementById('sidebarFooter').innerHTML = `
        <div class="network-status-row">
            <span class="net-label">网络状态</span>
            <span class="net-value">
                <span class="net-indicator"></span>
                稳定
            </span>
        </div>
        <div class="network-status-row">
            <span class="net-label">上次登录</span>
            <span class="net-value-date">${user.lastLoginTime}</span>
        </div>
        <button class="btn-logout" onclick="logout()">退出登录</button>
    `;
}

// ========== 模块页眉映射 ==========
const moduleHeaders = {
    dashboard: { title: '首页', sub: 'HOME' },
    projects: { title: '项目中心', sub: 'PROJECT CENTER' },
    logs: { title: '工作日志', sub: 'WORK LOGS' },
    comm: { title: '内部通讯', sub: 'INTERNAL COMMS' },
    files: { title: '云数据', sub: 'CLOUD DATA' },
    profile: { title: '个人中心', sub: 'PROFILE' }
};

// ========== 模块切换 ==========
function switchModule(moduleName, el) {
    // 如果离开个人中心，停止个人中心动画
    if (currentModule === 'profile' && moduleName !== 'profile') {
        if (typeof stopProfileGlitch === 'function') {
            stopProfileGlitch();
        }
    }
    currentModule = moduleName;
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (el) el.classList.add('active');

    const header = moduleHeaders[moduleName];
    if (header) {
        document.getElementById('contentHeaderTitle').textContent = header.title;
        document.getElementById('contentHeaderSub').textContent = header.sub;
    }

    renderModule(moduleName);

    const mainArea = document.getElementById('intranetMain');
    if (mainArea) mainArea.scrollTop = 0;
}

// ========== 渲染各模块 ==========
function renderModule(moduleName) {
    const container = document.getElementById('moduleContainer');

    switch (moduleName) {
        case 'dashboard':
            container.innerHTML = renderDashboard();
            break;
        case 'projects':
            renderProjects();
            return;
        case 'logs':
            container.innerHTML = renderLogs();
            break;
        case 'comm':
            container.innerHTML = renderComm();
            break;
        case 'files':
            container.innerHTML = renderFiles();
            break;
        case 'profile':
            container.innerHTML = renderProfile();
            break;
    }

    const mainArea = document.getElementById('intranetMain');
    if (mainArea) mainArea.scrollTop = 0;
}

// ========== 退出登录 ==========
function logout() {
    localStorage.removeItem('intranet_login');
    // physicsFolderUnlocked 清掉（保持退出时重置物理研究部权限的语义）
    const state = getIntranetState();
    delete state.physicsFolderUnlocked;
    localStorage.setItem(INTRANET_STATE_KEY, JSON.stringify(state));
    window.location.href = 'home.html';
}

// ========== 初始化 ==========
function initIntranet() {
    const currentEmployee = localStorage.getItem('intranet_login');

    if (!currentEmployee) {
        window.location.href = 'home.html';
        return;
    }

    // 若账号已被锁定（入侵序列已触发过），直接跳回首页
    if (localStorage.getItem('dingwenqian_locked') === 'true') {
        window.location.href = 'home.html';
        return;
    }

    renderUserCard();
    renderSidebarNav();
    renderSidebarFooter();
    renderModule(currentModule);
}

initIntranet();