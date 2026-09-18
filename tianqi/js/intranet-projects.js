// ========== 项目中心 ==========
let currentProjectDetail = null;

function renderProjects() {
    currentProjectDetail = null;
    const container = document.getElementById('moduleContainer');

    const accessibleProjects = ['south-africa', 'polar', 'phi-research'];

    const hexButtons = intranetProjectData.projects.map((p, index) => {
        let dotClass = 'dot-green';
        if (p.status === 'ended') dotClass = 'dot-red';
        else if (p.status === 'preparing') dotClass = 'dot-yellow';

        const clickHandler = accessibleProjects.includes(p.id)
            ? `onclick="showProjectDetail('${p.id}')"`
            : `onclick="showToast('当前账号权限不足')"`;

        return `
            <button class="hex-btn hex-small hex-pos-${index + 1}" ${clickHandler}>
                <div class="hex-btn-inner">
                    <span class="hex-btn-category">${p.category}</span>
                    <span class="hex-btn-name">${p.name}</span>
                    <span class="hex-btn-status-row">
                        <span class="status-dot ${dotClass}"></span>
                        <span class="hex-btn-status">${p.statusText}</span>
                    </span>
                </div>
            </button>
        `;
    }).join('');

    container.innerHTML = `
        <div class="project-page">
            <div class="project-bg-grid"></div>
            <div class="project-hex-layout">
                <button class="hex-btn hex-center" onclick="showToast('当前账号权限不足')">
                    <div class="hex-btn-inner">
                        <span class="hex-btn-name">天启计划</span>
                        <span class="hex-btn-subtitle">Project Revelation</span>
                    </div>
                </button>
                ${hexButtons}
            </div>
        </div>
    `;
}

function showProjectDetail(projectId) {
    currentProjectDetail = projectId;
    const container = document.getElementById('moduleContainer');

    let project = null;
    let isTianqi = false;

    if (projectId === 'tianqi') {
        project = intranetProjectData.tianqiProject;
        isTianqi = true;
    } else {
        project = intranetProjectData.projects.find(p => p.id === projectId);
    }

    if (!project) return;

    const detail = project.detail || {};
    const name = project.name || '未命名项目';
    const category = project.category || '综合';
    const projectNo = project.projectNo || '暂无编号';
    const location = project.location || '暂无地点';
    const classification = project.classification || '公开';
    const leader = project.leader || '未知';
    const dept = project.dept || '';
    const statusText = project.statusText || '未知状态';
    const statusClass = (isTianqi || project.status === 'ended') ? 'danger' : 'normal';

    const overview = detail.overview || `<p>${project.desc || '暂无详细信息'}</p>`;
    const objectives = detail.objectives || [];
    const currentStatus = detail.currentStatus || `<p>${statusText}</p>`;
    const tracking = detail.tracking || [];

    const objectivesHtml = objectives.length > 0
        ? objectives.map((obj, i) => `
            <li class="objective-item ${obj.status}">
                <div class="objective-status-icon">
                    ${obj.status === 'done' ? '✓' : '✗'}
                </div>
                <div class="objective-text-box">
                    <span class="objective-text">${obj.text}</span>
                    <span class="objective-label">${obj.status === 'done' ? '完成' : '失败'}</span>
                </div>
            </li>
        `).join('')
        : `<li class="objective-item normal">
            <div class="objective-text-box">
                <span class="objective-text objective-text-empty">暂未确认目标</span>
            </div>
        </li>`;

    const trackingHtml = tracking.map(item => renderTrackingItem(item)).join('');

    container.innerHTML = `
        <div class="plan-detail-wrapper">
            <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
                <button class="btn-back-project" onclick="renderProjects()">← 返回项目中心</button>
            </div>

            <div class="plan-hero">
                <span class="plan-category-badge">${category}</span>
                <div class="plan-title-row">
                    <h2 class="plan-project-name">${name}</h2>
                </div>
                <div class="plan-meta-grid">
                    <div class="plan-meta-item">
                        <span class="plan-meta-label">项目编号</span>
                        <span class="plan-meta-value">${projectNo}</span>
                    </div>
                    <div class="plan-meta-item">
                        <span class="plan-meta-label">${detail.participants ? '参与部门' : '项目负责人'}</span>
                        <span class="plan-meta-value">${detail.participants || (dept ? dept + ' ' : '') + leader}</span>
                    </div>
                    <div class="plan-meta-item">
                        <span class="plan-meta-label">项目地点</span>
                        <span class="plan-meta-value">${location}</span>
                    </div>
                    <div class="plan-meta-item">
                        <span class="plan-meta-label">保密等级</span>
                        <span class="plan-meta-value">${classification}</span>
                    </div>
                </div>
            </div>

            <!-- 当前状态 -->
            <div class="plan-current-status ${statusClass}">
                ${currentStatus}
            </div>

            <div class="plan-section">
                <h3 class="plan-section-title">项目概述</h3>
                <div class="plan-section-content">${overview}</div>
            </div>

            ${detail.researchDirections && detail.researchMethods ? `
                <!-- 研究方向 -->
                <div class="plan-section">
                    <h3 class="plan-section-title">研究方向</h3>
                    <div class="research-directions-grid">
                        ${detail.researchDirections.map((d, i) => {
                            // 前两个为基础完成项，后两个为当前重点
                            const cardClass = i < 2 ? 'completed' : 'focus';
                            return `
                                <div class="research-direction-card ${cardClass}">
                                    <span class="research-direction-num">${d.num}</span>
                                    <h4 class="research-direction-title">${d.title}</h4>
                                    <p class="research-direction-desc">${d.desc}</p>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- 研究方法 -->
                <div class="plan-section">
                    <h3 class="plan-section-title">研究方法</h3>
                    <div class="research-methods-timeline">
                        ${detail.researchMethods.map(m => `
                            <div class="research-method-item">
                                <h4 class="research-method-title">${m.title}</h4>
                                <p class="research-method-desc">${m.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : `
                <!-- 原有：项目目标 -->
                <div class="plan-section">
                    <h3 class="plan-section-title">项目目标</h3>
                    <ul class="plan-objectives">${objectivesHtml}</ul>
                </div>

                <!-- 原有：项目跟踪 -->
                <div class="plan-section tracking-card">
                    <h3 class="plan-section-title">项目跟踪</h3>
                    <div class="tracking-list">${trackingHtml}</div>
                </div>
            `}
        </div>
    `;

    document.getElementById('intranetMain').scrollTop = 0;
}

function renderTrackingItem(item) {
    const typeClassMap = {
        '会议': 'meeting',
        '报告': 'report',
        '勘探': 'explore',
        '通知': 'notice',
        '事故': 'accident'
    };
    const typeClass = typeClassMap[item.type] || 'report';

    if (item.isAccident) {
        return `
            <div class="tracking-item tracking-accident" onclick="openAccidentReport()">
                <div class="tracking-top-row">
                    <div class="tracking-top-left">
                        <span class="tracking-type tracking-type-${typeClass}">${item.type}</span>
                        <span class="tracking-title">📄 ${item.title}</span>
                    </div>
                    <span class="tracking-date">${item.date}</span>
                </div>
            </div>
        `;
    }

    if (item.expandable) {
        return `
            <div class="tracking-item tracking-expandable" onclick="toggleTracking(this)">
                <div class="tracking-top-row">
                    <div class="tracking-top-left">
                        <span class="tracking-type tracking-type-${typeClass}">${item.type}</span>
                        <span class="tracking-title">${item.title}</span>
                    </div>
                    <span class="tracking-date">${item.date}</span>
                </div>
                <div class="tracking-bottom-row">
                    <div class="tracking-summary"></div>
                    <span class="tracking-reportor">${item.reportor}</span>
                </div>
                <div class="tracking-item-content">
                    ${item.content}
                </div>
            </div>
        `;
    }
    return `
        <div class="tracking-item">
            <div class="tracking-top-row">
                <div class="tracking-top-left">
                    <span class="tracking-type tracking-type-${typeClass}">${item.type}</span>
                    <span class="tracking-title">${item.title}</span>
                </div>
                <span class="tracking-date">${item.date}</span>
            </div>
            <div class="tracking-bottom-row">
                <div class="tracking-summary">${item.summary || ''}</div>
                <span class="tracking-reportor">${item.reportor || ''}</span>
            </div>
        </div>
    `;
}

function toggleTracking(el) {
    el.classList.toggle('expanded');
}

function openAccidentReport() {
    const modal = document.createElement('div');
    modal.className = 'project-password-modal';
    modal.id = 'accidentModal';
    modal.innerHTML = `
        <div class="project-password-box">
            <h3>TQ/EXP-2026-P0-SA 事故报告</h3>
            <p class="pwd-hint">该文件已被单独锁定</p>
            <input type="password" id="accidentPasswordInput" placeholder="请输入密钥" onkeydown="if(event.key==='Enter') confirmAccidentPassword()">
            <div class="pwd-error" id="accidentPasswordError"></div>
            <div class="pwd-actions">
                <button class="pwd-btn" onclick="closeAccidentModal()">取消</button>
                <button class="pwd-btn primary" onclick="confirmAccidentPassword()">确认</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => document.getElementById('accidentPasswordInput').focus(), 50);
}

function closeAccidentModal() {
    const modal = document.getElementById('accidentModal');
    if (modal) modal.remove();
}

function confirmAccidentPassword() {
    const input = document.getElementById('accidentPasswordInput');
    const error = document.getElementById('accidentPasswordError');
    if (!input) return;

    if (input.value.trim() === 'happybirthday') {
        closeAccidentModal();
        triggerIntrusionSequence();
    } else {
        error.textContent = '密钥错误，请重新输入';
        input.value = '';
        input.focus();
    }
}