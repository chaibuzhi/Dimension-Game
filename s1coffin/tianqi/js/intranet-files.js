// ========== 云数据中心模块 ==========

// 当前视图：'root' 表示根目录，'physics' 表示物理研究部内部
let filesCurrentView = 'root';

// 物理研究部访问密码
const PHYSICS_FOLDER_PASSWORD = 'phi@20220823';

// 检查物理研究部是否已解锁
function isPhysicsFolderUnlocked() {
    return getIntranetStateField('physicsFolderUnlocked', false) === true;
}

// 渲染云数据中心主入口
function renderFiles() {
    if (filesCurrentView === 'physics') {
        return renderPhysicsFolder();
    } else {
        return renderFilesRoot();
    }
}

// ========== 工具函数：展平文件列表并按日期降序排列 ==========
// 物理研究部数据按“类别 -> 作者分组 -> 文件数组”组织，需要展平以便排序和渲染
function getFlattenedFiles(category) {
    const allFiles = intranetFilesData.physicsLibrary || [];
    return allFiles
        .filter(f => f.category === category)
        .map(f => ({ ...f }))
        .sort((a, b) => b.date.localeCompare(a.date));
}

// 获取用于卡片展示的文件（showInCard 为 true，取前 5 条）
function getCardFiles(category) {
    return getFlattenedFiles(category)
        .filter(f => f.showInCard)
        .slice(0, 5);
}

// ========== 渲染根目录 ==========
function renderFilesRoot() {
    // 通知条目（Hero 右侧）
    const noticeItems = intranetFilesData.notices.map((n) => `
        <div class="files-notice-item" onclick="openCloudNotice('${n.id}')">
            <div class="files-notice-item-title">${n.title}</div>
            <div class="files-notice-item-meta">${n.sender}</div>
        </div>
    `).join('');

    // 左侧部门目录树
    const treeItems = intranetFilesData.rootFolders.map(f => `
        <div class="files-tree-item ${f.id === 'physics' ? '' : 'locked'}" 
             onclick="${f.locked ? "showToast('当前账号权限不足')" : "openPhysicsFolderPassword()"}">
            <span class="tree-icon">📁</span>
            <span>${f.name}</span>
        </div>
    `).join('');

    // 右侧文件夹卡片
    const folderCards = intranetFilesData.rootFolders.map(f => `
        <div class="files-folder-card ${f.locked ? 'locked' : ''}" 
             onclick="${f.locked ? "showToast('当前账号权限不足')" : "openPhysicsFolderPassword()"}">
            <div class="files-folder-top">
                <div class="files-folder-icon">📁</div>
                <div>
                    <div class="files-folder-name">${f.name}</div>
                    <div class="files-folder-count">${f.files} 个文件</div>
                </div>
            </div>
            <div class="files-folder-status ${f.locked ? 'locked-status' : 'accessible'}">
                ${f.locked ? '访问受限' : '可访问'}
            </div>
        </div>
    `).join('');

    return `
        <div class="files-page">
            <!-- Hero 区域 -->
            <div class="files-hero">
                <div class="files-hero-layout">
                    <div class="files-hero-main">
                        <h1 class="files-hero-title">天启科技 · 数据存储与团队协作平台</h1>
                        <div class="files-hero-status-row">
                            <span class="files-hero-status-label">连接状态</span>
                            <span class="files-hero-status-value">
                                <span class="status-indicator"></span>
                                正常
                                <span class="files-hero-status-extra">延时 52ms</span>
                            </span>
                        </div>
                        <div class="files-hero-status-row">
                            <span class="files-hero-status-label">当前节点</span>
                            <span class="files-hero-status-value">西延总部</span>
                        </div>
                        <div class="files-hero-status-row">
                            <span class="files-hero-status-label">平台版本</span>
                            <span class="files-hero-status-value">TQ-Cloud V2.6.0</span>
                        </div>
                    </div>
                    <div class="files-hero-side">
                        <div class="files-side-section">
                            <span class="files-side-title">通知</span>
                            ${noticeItems}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 面包屑 -->
            <div class="files-breadcrumb">
                <span class="crumb-current">云数据中心</span>
                <span class="crumb-sep">/</span>
                <span class="crumb-current">根目录</span>
            </div>

            <!-- 目录树 + 文件夹网格 -->
            <div class="files-layout">
                <div class="files-tree">
                    <div class="files-tree-title">部门目录</div>
                    ${treeItems}
                </div>
                <div class="files-content">
                    <div class="files-folder-grid">${folderCards}</div>
                </div>
            </div>
        </div>
    `;
}

// ========== 渲染物理研究部内部 ==========
function renderPhysicsFolder() {
    // 左侧部门目录树（物理研究部高亮）
    const treeItems = intranetFilesData.rootFolders.map(f => `
        <div class="files-tree-item ${f.id === 'physics' ? 'active' : 'locked'}" 
             onclick="${f.id === 'physics' ? '' : "showToast('当前账号权限不足')"}">
            <span class="tree-icon">📁</span>
            <span>${f.name}</span>
        </div>
    `).join('');

    // 数据看板样式
    const quickAccessHtml = intranetFilesData.quickAccess.map(item => `
        <div class="quick-access-dashboard-item" onclick="showQuickAccessModal('${item.id}', '${item.name}')">
            <div class="dashboard-item-label">${item.name}</div>
            <div>
                <span class="dashboard-item-number">${item.count || 0}</span>
                <span class="dashboard-item-unit">${item.unit || '篇'}</span>
            </div>
        </div>
    `).join('');

    // 两张文件夹卡片
    const literatureCard = renderFolderCard('literature', '资料文献', 'Literature');
    const reportsCard = renderFolderCard('reports', '研究报告', 'Research Reports');

    return `
        <div class="files-page">
            <!-- 面包屑 -->
            <div class="files-breadcrumb">
                <span class="crumb-link" onclick="filesCurrentView='root'; renderModule('files');">云数据中心</span>
                <span class="crumb-sep">/</span>
                <span class="crumb-current">物理研究部</span>
            </div>

            <div class="files-layout">
                <!-- 左侧目录树 -->
                <div class="files-tree">
                    <div class="files-tree-title">部门目录</div>
                    ${treeItems}
                </div>

                <!-- 右侧内容 -->
                <div class="files-content">
                    <!-- 第一部分：数据看板 -->
                    <div class="quick-access-dashboard">
                        ${quickAccessHtml}
                    </div>

                    <!-- 第二部分：两张资料卡片 -->
                    <div class="folder-cards-row">
                        ${literatureCard}
                        ${reportsCard}
                    </div>

                    <!-- 第三部分：资料索引 -->
                    <div class="folder-card search-card">
                        <div class="folder-card-tab">
                            <span class="folder-card-tab-name">资料索引</span>
                            <span class="folder-card-tab-en">Search Index</span>
                        </div>
                        <div class="folder-card-body">
                            <div class="files-index-controls">
                                <select class="index-select" id="indexTypeSelect">
                                    <option value="literature">资料文献</option>
                                    <option value="reports">研究报告</option>
                                </select>
                                <input type="text" class="index-input" id="indexKeywordInput" placeholder="输入作者或资料标题" onkeydown="if(event.key==='Enter') performIndexSearch()">
                                <button class="index-btn" onclick="performIndexSearch()">索引</button>
                                <button class="index-clear-btn" onclick="clearIndexSearch()">清除</button>
                            </div>
                            <div id="indexResultArea">
                                <div class="index-hint">
                                    <p class="index-hint-title">数据中心现已支持部门内部索引功能</p>
                                    <p class="index-hint-text">操作指南：</p>
                                    <p class="index-hint-text">[ 1 ] 请先选择索引类型：资料文献 / 研究报告</p>
                                    <p class="index-hint-text">[ 2 ] 输入作者或资料标题</p>
                                    <p class="index-hint-text">[ 3 ] 单次索引结果默认显示前 5 条</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ========== 渲染单张资料卡片 ==========
function renderFolderCard(category, title, titleEn) {
    const files = getCardFiles(category);

    const fileItems = files.map(file => {
        const dateShort = file.date.length > 7 ? file.date.substring(0, 7) : file.date;
        const clickHandler = file.openable ? `onclick="openFileEntry('${file.title}', '${category}')"` : '';
        const highlightClass = file.highlight === 'red' ? 'highlight-red' : 'highlight-blue';
        return `
            <div class="folder-card-file ${highlightClass} ${file.openable ? 'openable' : ''}" ${clickHandler}>
                <span class="folder-card-file-icon">📄</span>
                <div class="folder-card-file-info">
                    <span class="folder-card-file-date">${dateShort}</span>
                    <span class="folder-card-file-title">${file.title}</span>
                    <span class="folder-card-file-author">${file.author}</span>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="folder-card">
            <div class="folder-card-tab">
                <span class="folder-card-tab-name">${title}</span>
                <span class="folder-card-tab-en">${titleEn}</span>
            </div>
            <div class="folder-card-body">
                ${fileItems}
            </div>
            <div class="folder-card-more">
                <a href="#" onclick="return false;">查看更多 →</a>
            </div>
        </div>
    `;
}

// ========== 打开文件（统一入口） ==========
function openFileEntry(title, category) {
    const files = getFlattenedFiles(category);
    const file = files.find(f => f.title === title);
    if (!file) return;

    if (!file.openable) return;

    if (file.status === 'encrypted') {
        showToast('当前账号权限不足');
    } else if (file.target && file.target !== '#') {
        let targetUrl = file.target;

        // 《φ能量起源假说》从云数据中心打开时加锁定参数
        if (file.title === 'φ能量起源假说') {
            targetUrl += (targetUrl.includes('?') ? '&' : '?') + 'mode=sealed';
        }

        window.open(targetUrl, '_blank');
    }
}

// ========== 快速访问弹窗 ==========
function showQuickAccessModal(id, name) {
    showNoticeModal(
        name,
        '',
        `<p style="color: var(--danger); text-align: center;">${name} 数据已被清除</p>`
    );
}

// ========== 资料索引搜索 ==========
function performIndexSearch() {
    const typeSelect = document.getElementById('indexTypeSelect');
    const keywordInput = document.getElementById('indexKeywordInput');
    const resultArea = document.getElementById('indexResultArea');

    if (!typeSelect || !keywordInput || !resultArea) return;

    const category = typeSelect.value;
    const keyword = keywordInput.value.trim();
    if (!keyword) return;

    // 获取展平后的文件，严格匹配 keywords 数组中的任意一项
    const allFiles = getFlattenedFiles(category);
    const results = allFiles.filter(f => {
        if (!f.searchable) return false;
        return f.keywords.some(k => k === keyword);
    }).slice(0, 5);   // 默认只取前 5 条

    if (results.length === 0) {
        resultArea.innerHTML = `<div class="index-no-result">未找到匹配的索引结果</div>`;
        return;
    }

    const resultItems = results.map(file => {
        const statusLabel = file.status === 'encrypted' ? '加密' : '公开';
        const statusClass = file.status === 'encrypted' ? 'status-encrypted' : 'status-public';
        const clickHandler = file.openable ? `onclick="openFileEntry('${file.title}', '${category}')"` : '';
        const highlightClass = file.highlight === 'red' ? 'highlight-red' : 'highlight-blue';
        return `
            <div class="index-result-item ${highlightClass} ${file.openable ? 'openable' : ''}" ${clickHandler}>
                <span class="index-result-icon">📄</span>
                <div class="index-result-info">
                    <span class="index-result-title">${file.title}</span>
                    <span class="index-result-meta">${file.author}　·　${file.date}</span>
                </div>
                <span class="index-result-status ${statusClass}">${statusLabel}</span>
            </div>
        `;
    }).join('');

    resultArea.innerHTML = `
        <div class="index-result-list">
            ${resultItems}
        </div>
        <div class="index-more-btn">
            <a href="#" onclick="return false;">更多索引结果 →</a>
        </div>
    `;
}

// ========== 清除索引结果 ==========
function clearIndexSearch() {
    const keywordInput = document.getElementById('indexKeywordInput');
    const resultArea = document.getElementById('indexResultArea');

    if (keywordInput) keywordInput.value = '';
    if (resultArea) {
        resultArea.innerHTML = `
            <div class="index-hint">
                <p class="index-hint-title">数据中心现已支持部门内部索引功能</p>
                <p class="index-hint-text">操作指南：</p>
                <p class="index-hint-text">[ 1 ] 请先选择索引类型：资料文献 / 研究报告</p>
                <p class="index-hint-text">[ 2 ] 输入作者或资料标题</p>
                <p class="index-hint-text">[ 3 ] 单次索引结果默认显示前5条</p>
            </div>
        `;
    }
}
// ========== 物理研究部密码弹窗 ==========
function openPhysicsFolderPassword() {
    if (isPhysicsFolderUnlocked()) {
        filesCurrentView = 'physics';
        renderModule('files');
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'project-password-modal';
    overlay.id = 'physicsPwdModal';
    overlay.innerHTML = `
        <div class="project-password-box">
            <h3>物理研究部</h3>
            <p class="pwd-hint">该目录受到保护，请输入密码</p>
            <input type="password" id="physicsPwdInput" placeholder="请输入密码" onkeydown="if(event.key==='Enter') confirmPhysicsPassword()">
            <div class="pwd-error" id="physicsPwdError"></div>
            <div class="pwd-actions">
                <button class="pwd-btn" onclick="closePhysicsPwdModal()">取消</button>
                <button class="pwd-btn primary" onclick="confirmPhysicsPassword()">确认</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => document.getElementById('physicsPwdInput').focus(), 50);
}

function closePhysicsPwdModal() {
    const modal = document.getElementById('physicsPwdModal');
    if (modal) modal.remove();
}

function confirmPhysicsPassword() {
    const input = document.getElementById('physicsPwdInput');
    const error = document.getElementById('physicsPwdError');
    if (!input) return;

    if (input.value.trim() === PHYSICS_FOLDER_PASSWORD) {
        closePhysicsPwdModal();
        setIntranetStateField('physicsFolderUnlocked', true);
        filesCurrentView = 'physics';
        renderModule('files');
    } else {
        error.textContent = '密码错误，请重新输入';
        input.value = '';
        input.focus();
    }
}