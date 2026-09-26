// ========== 个人中心 ==========
function renderProfile() {
    const user = intranetUserData.getCurrentUser();
    const profileData = getIntranetProfileData();

    // 检查异常照片是否已替换
    const photoBrokenActivated = getIntranetStateField('profilePhotoBroken', false) === true;
    const displayPhoto = photoBrokenActivated ? profileData.photoBroken : profileData.photo;

    const leftColumnRows = profileData.profileBasic.slice(0, 3).map(i => `
        <div class="profile-info-row">
            <span class="profile-info-label">${i.label}</span>
            <span class="profile-info-value">${i.value}</span>
        </div>
    `).join('');

    const rightColumnRows = profileData.profileBasic.slice(3).map(i => `
        <div class="profile-info-row">
            <span class="profile-info-label">${i.label}</span>
            <span class="profile-info-value">${i.value}</span>
        </div>
    `).join('');

    const extraRows = profileData.profileExtra.map(i => `
        <div class="profile-info-row">
            <span class="profile-info-label">${i.label}</span>
            <span class="profile-info-value">${i.value}</span>
        </div>
    `).join('');

    const loginRows = profileData.profileLogin.map(i => `
        <div class="profile-login-row">
            <span class="profile-login-label">${i.label}</span>
            <span class="profile-login-value">${i.value}</span>
        </div>
    `).join('');

    const logs = profileData.accountLogs.map(log => `
        <div class="account-log-item ${log.highlight ? 'danger' : ''}">
            <span class="account-log-time">${log.time}</span>
            <span class="account-log-action">${log.action}</span>
        </div>
    `).join('');

    setTimeout(() => {
        startProfileGlitch();
    }, 100);

    // 设置照片容器的 ID，方便特效替换
    return `
        <div class="profile-page">
            <div class="profile-main-card">
                <div class="profile-photo-side">
                    <div class="profile-photo-placeholder" id="profilePhotoDisplay">
                        <img src="${displayPhoto}" alt="丁文倩" id="profilePhotoImg">
                    </div>
                </div>
                <div class="profile-info-side">
                    <div class="profile-name-block">
                        <h2 class="profile-name">${user.name}</h2>
                        <p class="profile-name-en">${user.nameEn}</p>
                    </div>
                    <div class="profile-info-columns">
                        <div class="profile-info-column">${leftColumnRows}</div>
                        <div class="profile-info-column">${rightColumnRows}</div>
                    </div>
                    <div class="profile-info-divider"></div>
                    <div class="profile-info-extra">${extraRows}</div>
                </div>
            </div>
            <div class="profile-bottom-grid">
                <div class="card profile-log-card">
                    <div class="card-title"><span class="hex-icon">⬡</span> 账号操作记录</div>
                    <div class="account-log-list">${logs}</div>
                </div>
                <div class="card profile-login-card">
                    <div class="card-title"><span class="hex-icon">⬡</span> 登录信息</div>
                    <div class="profile-login-list">${loginRows}</div>
                </div>
            </div>
        </div>
    `;
}

// ========== 个人中心异常特效（仅反色闪烁 + 照片替换） ==========

let profileGlitchRunning = false;
let profileGlitchTimers = [];

function startProfileGlitch() {
    // ========== 正式模式：只触发一次 ==========
    if (getIntranetStateField('profileGlitchDone', false) === true) return;
    

    // 如果动画已经在运行，直接返回
    if (profileGlitchRunning) return;
    profileGlitchRunning = true;

    // 清空旧定时器
    profileGlitchTimers.forEach(t => clearTimeout(t));
    profileGlitchTimers = [];

    const profileData = getIntranetProfileData();   // ← 必须在这里声明，供后面使用

    // ===== 阶段1：3s - 反色闪烁2次 + 左上角少量乱码，照片临时变为图片2 =====
    const t1 = setTimeout(() => {
        if (!profileGlitchRunning) return;

        // 锁定鼠标并开始闪烁
        document.body.classList.add('lock-cursor');
        document.body.classList.add('invert-flicker-4');

        // 叠加横条故障纹理
        showProfileScanline();

        // 临时切换为损坏照片
        setProfilePhoto(profileData.photoBroken, false);

        showCornerGlitch('small');

        const t2 = setTimeout(() => {
            if (!profileGlitchRunning) return;
            document.body.classList.remove('invert-flicker-4');
        }, 300);
        profileGlitchTimers.push(t2);

        // 闪烁结束后，恢复为正常照片
        const t3 = setTimeout(() => {
            if (!profileGlitchRunning) return;
            hideCornerGlitch();
            setProfilePhoto(profileData.photo, false);
        }, 300);
        profileGlitchTimers.push(t3);
    }, 3000);
    profileGlitchTimers.push(t1);

    // ===== 阶段2：6s - 反色闪烁2次 + 左上角更多乱码，闪烁中替换为图片2并保持 =====
    const t4 = setTimeout(() => {
        if (!profileGlitchRunning) return;

        document.body.classList.add('invert-flicker-4');

        // 叠加横条故障纹理（更强烈）
        showProfileScanline();

        showCornerGlitch('medium');

        // 闪烁过程中替换为损坏照片，并持久保持
        replaceProfilePhoto();
        setIntranetStateField('profileGlitchDone', true);

        const t5 = setTimeout(() => {
            if (!profileGlitchRunning) return;

            document.body.classList.remove('invert-flicker-4');
            hideCornerGlitch();

            // 解锁鼠标
            document.body.classList.remove('lock-cursor');
            profileGlitchRunning = false;
        }, 300);
        profileGlitchTimers.push(t5);
    }, 6000);
    profileGlitchTimers.push(t4);
}

function stopProfileGlitch() {
    if (!profileGlitchRunning) return;

    // 清除所有定时器
    profileGlitchTimers.forEach(t => clearTimeout(t));
    profileGlitchTimers = [];

    // 移除所有动画类
    document.body.classList.remove('lock-cursor');
    document.body.classList.remove('invert-flicker-4');
    document.body.classList.remove('invert-flicker-2');
    document.body.classList.remove('invert-flicker');

    // 隐藏角落乱码
    hideCornerGlitch();

    // 重置运行状态
    profileGlitchRunning = false;
}

// ========== 左上角乱码块 ==========

function showCornerGlitch(intensity) {
    const existing = document.getElementById('cornerGlitchBlock');
    if (existing) existing.remove();

    const block = document.createElement('div');
    block.className = 'corner-glitch-block';
    block.id = 'cornerGlitchBlock';

    const lines = intensity === 'small' ? 3 : 6;
    for (let i = 0; i < lines; i++) {
        const line = document.createElement('div');
        line.className = 'corner-glitch-line';
        line.textContent = generateGlitchLine(30 + Math.random() * 20);
        block.appendChild(line);
    }

    document.body.appendChild(block);
}

function hideCornerGlitch() {
    const existing = document.getElementById('cornerGlitchBlock');
    if (existing) existing.remove();
}

function generateGlitchLine(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

// ========== 横条故障纹理 ==========

function showProfileScanline() {
    let el = document.getElementById('profile-scanline');
    if (!el) {
        el = document.createElement('div');
        el.id = 'profile-scanline';
        document.body.appendChild(el);
    }
    // 重启动画
    el.classList.remove('active');
    void el.offsetWidth;
    el.classList.add('active');
}

// ========== 照片替换 ==========

function replaceProfilePhoto() {
    setIntranetStateField('profilePhotoBroken', true);

    const profileData = getIntranetProfileData();
    setProfilePhoto(profileData.photoBroken, false);
}

function setProfilePhoto(src, broken) {
    const img = document.getElementById('profilePhotoImg');
    if (img) {
        img.src = src;
    }
    const container = document.getElementById('profilePhotoDisplay');
    if (container) {
        if (broken) {
            container.classList.add('profile-photo-broken-effect');
        } else {
            container.classList.remove('profile-photo-broken-effect');
        }
    }
}