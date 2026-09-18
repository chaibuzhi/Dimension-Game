// ========== 天启通 下载/安装流程 ==========

// 打开安全升级通知弹窗
function openTqchatNotice() {
    const overlay = document.createElement('div');
    overlay.className = 'alert-modal-overlay';
    overlay.id = 'tqchatNoticeOverlay';
    overlay.innerHTML = `
        <div class="alert-modal" style="max-width: 400px;">
            <div class="alert-modal-title">关于天启科技内部通讯系统安全升级的通知</div>
            <div class="alert-modal-message" style="text-align:left; line-height:1.8;">
                为提升内部通讯安全等级，安全合规部技术科已开发更安全的即时通讯工具 <strong>“天启通”</strong>，现已进入内测阶段。<br><br>
                ✓ 支持点对点加密<br>
                ✓ 支持记录备份与恢复<br>
                ✓ 支持多设备同步
            </div>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button class="windows-btn" onclick="closeTqchatOverlay('tqchatNoticeOverlay')">取消</button>
                <button class="windows-btn primary" onclick="startTqchatDownload()">立即下载</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

// 开始下载（模拟）
function startTqchatDownload() {
    closeTqchatOverlay('tqchatNoticeOverlay');

    const overlay = document.createElement('div');
    overlay.className = 'windows-overlay';
    overlay.id = 'tqchatDownloadOverlay';
    overlay.innerHTML = `
        <div class="windows-window" style="max-width: 420px;">
            <div class="windows-titlebar">
                <span class="windows-title-text">⬇️ 下载</span>
                <button class="windows-close" onclick="closeTqchatOverlay('tqchatDownloadOverlay')">×</button>
            </div>
            <div class="windows-body" style="padding: 20px 24px;">
                <div class="windows-download-icon">📥</div>
                <p class="windows-download-name">天启通（内测版）</p>
                <p class="windows-download-desc">正在从公司服务器下载安装包...</p>
                <div class="windows-progress-bar">
                    <div class="windows-progress-fill" id="tqchatDownloadProgress" style="width: 0%;"></div>
                </div>
                <p class="windows-progress-text" id="tqchatDownloadText">0%</p>
                <div class="windows-actions" id="tqchatDownloadActions" style="display: none;">
                    <button class="windows-btn" onclick="closeTqchatOverlay('tqchatDownloadOverlay')">取消</button>
                    <button class="windows-btn primary" onclick="startTqchatInstall()">立即安装</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    let progress = 0;
    const downloadInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(downloadInterval);
            document.getElementById('tqchatDownloadText').textContent = '下载完成';
            document.getElementById('tqchatDownloadActions').style.display = 'flex';
        }
        document.getElementById('tqchatDownloadProgress').style.width = progress + '%';
        if (progress < 100) {
            document.getElementById('tqchatDownloadText').textContent = progress + '%';
        }
    }, 200);
}

// 开始安装
function startTqchatInstall() {
    closeTqchatOverlay('tqchatDownloadOverlay');

    // 检查是否已经安装过
    if (localStorage.getItem('tqchat_installed') === 'true') {
        showTqchatAlreadyInstalled();
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'windows-overlay';
    overlay.id = 'tqchatInstallOverlay';
    overlay.innerHTML = `
        <div class="windows-window" style="max-width: 540px;">
            <div class="windows-titlebar">
                <span class="windows-title-text">📦 安装向导</span>
                <button class="windows-close" onclick="closeTqchatOverlay('tqchatInstallOverlay')">×</button>
            </div>
            <div class="windows-body" style="padding: 20px 24px;">
                <!-- 三步流程条 -->
                <div class="windows-steps">
                    <div class="windows-step active">
                        <span class="step-dot">1</span>
                        <span class="step-label">许可协议</span>
                    </div>
                    <div class="windows-step-line"></div>
                    <div class="windows-step">
                        <span class="step-dot">2</span>
                        <span class="step-label">安装</span>
                    </div>
                    <div class="windows-step-line"></div>
                    <div class="windows-step">
                        <span class="step-dot">3</span>
                        <span class="step-label">完成</span>
                    </div>
                </div>

                <div class="windows-app-info">
                    <div class="windows-app-icon">💬</div>
                    <div>
                        <p class="windows-app-name">天启通</p>
                        <p class="windows-app-version">版本 0.9.0（内测版） · Apocalypse Tech</p>
                    </div>
                </div>
                <div class="windows-license-box">
                    <p><strong>天启通 内测版用户许可协议</strong><br>
                    版本号：V0.9.0 2026年6月</p>
                    <p>在使用本软件前，请仔细阅读以下条款。点击“同意”即视为您已完全接受本协议全部内容。</p>
                    <p><strong>第一条：所有权声明</strong><br>
                    天启通（以下简称“本软件”）的一切知识产权及技术所有权归天启科技所有。您仅获得内测期间的非独占、不可转让、可随时撤销的有限使用权。</p>
                    <p><strong>第二条：数据监控与归属</strong><br>
                    通过本软件传输、存储的信息，包括但不限于聊天记录、文件、图片、位置信息、设备信息、操作日志，均属于公司资产。公司有权对上述信息进行实时监控、审查、复制、备份及删除，无需另行通知。</p>
                    <p><strong>第三条：使用限制</strong><br>
                    本软件仅限公司内部授权人员使用。严禁向外部人员披露软件内容、传播安装包、截图或导出数据。违规行为将被视为违反保密协议。</p>
                    <p><strong>第四条：账号管理</strong><br>
                    账号由公司统一分配，账号与工号、设备MAC地址及登录IP绑定，操作将被记录并同步至安全合规部。公司有权随时收回、停用或重置账号。</p>
                    <p><strong>第五条：违规处理</strong><br>
                    违反本协议任一条款，将立即触发安全合规部审查程序，并可能面临纪律处分、解雇及法律追责。如涉及泄密，将依法追究刑事责任。</p>
                    <p>点击<strong>“同意”</strong>即表示您已阅读、理解并同意本协议。不得以未阅读、未理解或非本人操作为由拒绝履行。</p>
                </div>
                <div class="windows-checkbox-row">
                    <input type="checkbox" id="tqchatAgreeCheckbox" onchange="toggleInstallButton()">
                    <label for="tqchatAgreeCheckbox">我已阅读并同意以上协议</label>
                </div>
                <div class="windows-path-row">
                    <span>安装路径：</span>
                    <span class="windows-path-input">C:\Program Files\Apocalypse\TQChat</span>
                </div>
                <div class="windows-actions">
                    <button class="windows-btn" onclick="closeTqchatOverlay('tqchatInstallOverlay')">取消</button>
                    <button class="windows-btn primary" id="tqchatInstallBtn" disabled onclick="runTqchatInstall()">开始安装</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function toggleInstallButton() {
    const checkbox = document.getElementById('tqchatAgreeCheckbox');
    const installBtn = document.getElementById('tqchatInstallBtn');
    if (installBtn) {
        installBtn.disabled = !checkbox.checked;
    }
}

// 执行安装（模拟进度）
function runTqchatInstall() {
    const overlay = document.getElementById('tqchatInstallOverlay');
    if (!overlay) return;

    overlay.innerHTML = `
        <div class="windows-window" style="max-width: 540px;">
            <div class="windows-titlebar">
                <span class="windows-title-text">📦 安装向导</span>
                <button class="windows-close" onclick="closeTqchatOverlay('tqchatInstallOverlay')">×</button>
            </div>
            <div class="windows-body" style="padding: 20px 24px;">
                <div class="windows-steps">
                    <div class="windows-step completed">
                        <span class="step-dot">✓</span>
                        <span class="step-label">许可协议</span>
                    </div>
                    <div class="windows-step-line"></div>
                    <div class="windows-step active">
                        <span class="step-dot">2</span>
                        <span class="step-label">安装</span>
                    </div>
                    <div class="windows-step-line"></div>
                    <div class="windows-step">
                        <span class="step-dot">3</span>
                        <span class="step-label">完成</span>
                    </div>
                </div>
                <p class="windows-download-desc">正在安装组件，请稍候...</p>
                <div class="windows-progress-bar">
                    <div class="windows-progress-fill" id="tqchatInstallProgress" style="width: 0%;"></div>
                </div>
                <p class="windows-progress-text" id="tqchatInstallText">0%</p>
            </div>
        </div>
    `;

    let progress = 0;
    const installInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 6) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(installInterval);
            finishTqchatInstall();
        }
        const fill = document.getElementById('tqchatInstallProgress');
        const text = document.getElementById('tqchatInstallText');
        if (fill) fill.style.width = progress + '%';
        if (text) text.textContent = progress + '%';
    }, 150);
}

// 安装完成
function finishTqchatInstall() {
    localStorage.setItem('tqchat_installed', 'true');

    const overlay = document.getElementById('tqchatInstallOverlay');
    if (!overlay) return;

    overlay.innerHTML = `
        <div class="windows-window" style="max-width: 540px;">
            <div class="windows-titlebar">
                <span class="windows-title-text">📦 安装向导</span>
                <button class="windows-close" onclick="closeTqchatOverlay('tqchatInstallOverlay')">×</button>
            </div>
            <div class="windows-body" style="padding: 20px 24px;">
                <div class="windows-steps">
                    <div class="windows-step completed">
                        <span class="step-dot">✓</span>
                        <span class="step-label">许可协议</span>
                    </div>
                    <div class="windows-step-line"></div>
                    <div class="windows-step completed">
                        <span class="step-dot">✓</span>
                        <span class="step-label">安装</span>
                    </div>
                    <div class="windows-step-line"></div>
                    <div class="windows-step completed">
                        <span class="step-dot">✓</span>
                        <span class="step-label">完成</span>
                    </div>
                </div>
                <div class="windows-install-success">
                    <div class="windows-app-icon" style="margin: 0 auto 14px;">💬</div>
                    <h3>安装完成</h3>
                    <p>已为您在桌面创建快捷方式</p>
                    <div class="windows-actions" style="justify-content: center;">
                        <button class="windows-btn primary" onclick="closeTqchatOverlay('tqchatInstallOverlay')">确 定</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 已安装提示
function showTqchatAlreadyInstalled() {
    const overlay = document.createElement('div');
    overlay.className = 'windows-overlay';
    overlay.id = 'tqchatAlreadyInstalledOverlay';
    overlay.innerHTML = `
        <div class="windows-window" style="max-width: 420px;">
            <div class="windows-titlebar">
                <span class="windows-title-text">💬 天启通</span>
                <button class="windows-close" onclick="closeTqchatOverlay('tqchatAlreadyInstalledOverlay')">×</button>
            </div>
            <div class="windows-body" style="padding: 24px 28px; text-align: center;">
                <div class="windows-app-icon" style="margin: 0 auto 14px;">💬</div>
                <h3 style="font-size: 16px; font-weight: 700; color: #1a2233; margin-bottom: 8px;">天启通（内测版）已安装</h3>
                <p style="font-size: 13px; color: #6b7a8f; line-height: 1.8; margin-bottom: 18px;">
                    请从桌面点击天启通图标登录使用
                </p>
                <div class="windows-actions" style="justify-content: center;">
                    <button class="windows-btn primary" onclick="closeTqchatOverlay('tqchatAlreadyInstalledOverlay')">确 定</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}


// 关闭通用窗口
function closeTqchatOverlay(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.remove();
}