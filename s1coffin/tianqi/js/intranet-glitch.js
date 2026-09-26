// ========== 入侵序列音效 ==========
const InvasionAudio = (function() {
    let ctx = null;
    let glitchAudio = null;

    function init() {
        if (ctx) return;
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            ctx = new AC();
        } catch (e) { console.warn('Web Audio 不可用'); }
    }

    function resumeCtx() {
        if (ctx && ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }
    }

    function tone(freq, dur, type, vol, slide) {
        if (!ctx) return;
        type = type || 'sine';
        vol = vol === undefined ? 0.06 : vol;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(freq, now);
        if (slide) osc.frequency.exponentialRampToValueAtTime(slide, now + dur);
        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + dur + 0.05);
    }

    function noise(dur, vol) {
        if (!ctx) return;
        dur = dur || 0.2;
        vol = vol === undefined ? 0.04 : vol;
        const len = Math.floor(ctx.sampleRate * dur);
        const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < len; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.3));
        }
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.value = vol;
        src.connect(gain);
        gain.connect(ctx.destination);
        src.start();
    }

    // ===== 完整录制的 glitch 音频：从头播到尾，不循环、不淡入淡出 =====
    function playGlitch() {
        if (glitchAudio) return;
        glitchAudio = new Audio('/music/glitch.mp3');
        glitchAudio.loop = false;
        glitchAudio.volume = 0.75;
        glitchAudio.play().catch(() => {});
    }

    function stopGlitch() {
        if (!glitchAudio) return;
        glitchAudio.pause();
        glitchAudio = null;
    }

    // ===== 警告尖叫（保留） =====
    function warningScreech() {
        init(); resumeCtx();
        if (!ctx) return;
        tone(2600, 0.5, 'sawtooth', 0.055, 2000);
        tone(3400, 0.4, 'square', 0.035, 2800);
        tone(55, 0.7, 'sawtooth', 0.08);
        noise(0.35, 0.06);
        setTimeout(() => tone(140, 0.55, 'square', 0.05, 60), 100);
        setTimeout(() => noise(0.25, 0.04), 200);
    }

    return { playGlitch, stopGlitch, warningScreech };
})();

// ===== 键盘刷新拦截（入侵动画期间） =====
function blockRefreshKeys(e) {
    // F5
    if (e.key === 'F5' || e.keyCode === 116) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    // Ctrl+R / Cmd+R / Ctrl+Shift+R / Cmd+Shift+R
    if ((e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R' || e.keyCode === 82)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}

// ========== 完整入侵动画 ==========

function startFullInvasion(onComplete) {
    // ===== 开始：反色闪烁 + 终端乱码 + glitch.mp3（完整音频，从头播到尾） =====
    document.body.classList.add('invert-flicker');
    document.body.classList.add('lock-cursor');
    startTerminalScroll();
    InvasionAudio.playGlitch();

    // 锁定键盘刷新（18 秒后移除）
    document.addEventListener('keydown', blockRefreshKeys, true);

    // 阶段1内 2 次横条故障纹理：2000ms 和 4800ms
    setTimeout(() => {
        showGlitchScanlines();
    }, 2000);

    setTimeout(() => {
        showGlitchScanlines();
    }, 4800);

    // ===== 阶段2：7秒后画面切除，进入多维实体星空（音频继续） =====
    setTimeout(() => {
        stopTerminalScroll();
        document.body.classList.remove('invert-flicker');
        showHexEntity();
    }, 7000);

    // ===== 阶段3：两次绿色故障闪屏 + 画面震动 =====
    setTimeout(() => {
        showGlitchWarningFlash(true);
    }, 7200);

    setTimeout(() => {
        showGlitchWarningFlash(false);
    }, 9000);

    // ===== 阶段4：18秒后恢复 + 记录锁定状态 =====
    setTimeout(() => {
        // 记录锁定状态（此后刷新会被重定向）
        localStorage.setItem('dingwenqian_locked', 'true');

        // 解除键盘拦截
        document.removeEventListener('keydown', blockRefreshKeys, true);

        hideHexEntity();
        document.body.classList.remove('lock-cursor');
        if (onComplete && typeof onComplete === 'function') {
            onComplete();
        }
    }, 18000);
}

// ===== 横条故障纹理 =====
function showGlitchScanlines() {
    let el = document.getElementById('glitchScanlines');
    if (!el) {
        el = document.createElement('div');
        el.id = 'glitchScanlines';
        el.className = 'glitch-scanlines-overlay';
        document.body.appendChild(el);
    }
    el.classList.remove('active');
    void el.offsetWidth;
    el.classList.add('active');
}

// ===== 绿色故障闪屏 + 画面震动 =====
function showGlitchWarningFlash(isWeak) {
    let el = document.getElementById('glitchWarning');
    if (!el) {
        el = document.createElement('div');
        el.id = 'glitchWarning';
        el.className = 'glitch-warning-flash';
        document.body.appendChild(el);
    }
    el.classList.remove('active', 'weak');
    void el.offsetWidth;
    if (isWeak) el.classList.add('weak');
    el.classList.add('active');

    // 弱闪屏 → 小震动；强闪屏 → 大震动
    const shakeClass = isWeak ? 'screen-shake-weak' : 'screen-shake';
    document.body.classList.add(shakeClass);
    setTimeout(() => document.body.classList.remove(shakeClass), isWeak ? 400 : 600);

    InvasionAudio.warningScreech();
}

// ========== 终端乱码滚动 ==========
let terminalInterval = null;
let terminalHeightInterval = null;

function startTerminalScroll() {
    const overlay = document.createElement('div');
    overlay.className = 'glitch-terminal-overlay';
    overlay.id = 'glitchTerminalOverlay';
    document.body.appendChild(overlay);

    let currentHeight = 0;

    terminalHeightInterval = setInterval(() => {
        currentHeight += 1 + Math.random() * 2.5;
        if (currentHeight >= 100) {
            currentHeight = 100;
            clearInterval(terminalHeightInterval);
        }
        overlay.style.height = currentHeight + '%';
    }, 100);

    terminalInterval = setInterval(() => {
        const lines = generateGlitchLine(60 + Math.random() * 40);
        const line = document.createElement('div');
        line.className = 'glitch-terminal-line';
        line.textContent = lines;
        overlay.appendChild(line);

        while (overlay.children.length > 50) {
            overlay.removeChild(overlay.firstChild);
        }
    }, 150);
}

function stopTerminalScroll() {
    if (terminalInterval) {
        clearInterval(terminalInterval);
        terminalInterval = null;
    }
    if (terminalHeightInterval) {
        clearInterval(terminalHeightInterval);
        terminalHeightInterval = null;
    }

    const overlay = document.getElementById('glitchTerminalOverlay');
    if (overlay) overlay.remove();
}

function generateGlitchLine(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

// ========== 多维实体星空 ==========
function showHexEntity() {
    const overlay = document.createElement('div');
    overlay.className = 'hex-entity-overlay';
    overlay.id = 'hexEntityOverlay';

    const starsContainer = document.createElement('div');
    starsContainer.className = 'hex-stars';
    overlay.appendChild(starsContainer);

    const starCount = 140;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'hex-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        const size = 0.8 + Math.random() * 2.4;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = (1.2 + Math.random() * 2.5) + 's';
        star.style.animationDelay = (Math.random() * 3) + 's';
        starsContainer.appendChild(star);
    }

    const center = document.createElement('div');
    center.className = 'hex-entity-center';
    center.innerHTML = `
        <svg viewBox="-20 -20 140 140" fill="none" class="hex-entity-main" preserveAspectRatio="xMidYMid meet">
            <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                    stroke="#ffffff" stroke-width="15" />
        </svg>
    `;
    overlay.appendChild(center);

    const bgHexCount = 26;
    for (let i = 0; i < bgHexCount; i++) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '-20 -20 140 140');
        svg.setAttribute('class', 'hex-entity-bg-hex');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.left = Math.random() * 90 + '%';
        svg.style.top = Math.random() * 90 + '%';

        const size = 26 + Math.random() * 56;
        svg.style.width = size + 'px';
        svg.style.height = size + 'px';

        svg.style.animationDelay = (Math.random() * 1.8) + 's';
        svg.style.animationDuration = (2.2 + Math.random() * 2.8) + 's';

        svg.innerHTML = `
            <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                     stroke="rgba(255,255,255,0.3)" stroke-width="8" fill="none" />
        `;
        overlay.appendChild(svg);
    }

    // ===== 左上角小终端（透明，无背景无边框） =====
        const miniTerminal = document.createElement('div');
        miniTerminal.className = 'mini-terminal';
        miniTerminal.id = 'miniTerminal';

        const miniTerminalContent = document.createElement('div');
        miniTerminalContent.className = 'mini-terminal-content';
        miniTerminal.appendChild(miniTerminalContent);
        overlay.appendChild(miniTerminal);

        document.body.appendChild(overlay);

        // 传入内容元素直接启动滚动，避免 DOM 查询时机问题
        startMiniTerminalScroll(miniTerminalContent);
    }

function hideHexEntity() {
    stopMiniTerminalScroll();
    const overlay = document.getElementById('hexEntityOverlay');
    if (overlay) overlay.remove();
}

// ========== 小终端乱码滚动 ==========
let miniTerminalInterval = null;

function startMiniTerminalScroll(contentEl) {
    if (miniTerminalInterval) return;
    if (!contentEl) return;

    miniTerminalInterval = setInterval(() => {
        const line = document.createElement('div');
        line.className = 'mini-terminal-line';
        line.textContent = generateGlitchLine(30 + Math.random() * 30);
        contentEl.appendChild(line);

        const maxLines = 6;
        while (contentEl.children.length > maxLines) {
            contentEl.removeChild(contentEl.firstChild);
        }
    }, 110);
}

function stopMiniTerminalScroll() {
    if (miniTerminalInterval) {
        clearInterval(miniTerminalInterval);
        miniTerminalInterval = null;
    }
}

// ========== 入侵警告弹窗 ==========
function showSecurityWarning(onExit) {
    const overlay = document.createElement('div');
    overlay.className = 'security-warning-overlay';
    overlay.id = 'securityWarningOverlay';
    overlay.innerHTML = `
        <div class="security-warning-box">
            <div class="security-warning-header">
                <span class="security-warning-title">安全警告</span>
            </div>
            <div class="security-warning-detect">检测到异常登录行为</div>
            <div class="security-warning-message">
                本次操作已被全程记录，我司将依法追究法律责任
            </div>
            <button class="security-warning-btn" id="securityWarningBtn">退 出</button>
        </div>
    `;
    document.body.appendChild(overlay);

    // 弹窗出现音效（与绿色闪屏同款）
    InvasionAudio.warningScreech();

    document.getElementById('securityWarningBtn').addEventListener('click', function() {
        overlay.remove();
        if (onExit && typeof onExit === 'function') {
            onExit();
        }
    });
}

// ========== 整体入侵流程 ==========
function triggerIntrusionSequence() {
    startFullInvasion(() => {
        showSecurityWarning(() => {
            InvasionAudio.stopGlitch();
            // 锁定状态已在 18 秒时记录，此处只需跳转
            window.location.href = 'home.html';
        });
    });
}