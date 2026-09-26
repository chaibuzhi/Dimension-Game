// ========== 成就系统 · 主逻辑 ==========
// 负责：渲染、tab 切换、主题色、500ms 轮询
// 数据源：achievements-data.js（ALL_ACHIEVEMENTS / scanAchievements）

// ============================================================
// 图标渲染
// ============================================================

const COLOR_LOCKED = '#c8cdd6';

function hexBase(color) {
    return `
        <polygon points="32,2 59,17.5 59,46.5 32,62 5,46.5 5,17.5"
                 fill="none" stroke="${color}" stroke-width="1.3"
                 stroke-linejoin="round" opacity="0.95"/>
        <polygon points="32,7 54,20 54,44 32,57 10,44 10,20"
                 fill="none" stroke="${color}" stroke-width="0.55"
                 stroke-linejoin="round" opacity="0.4"
                 stroke-dasharray="1.5 2.5"/>
    `;
}

const ICONS = {

    // ===== 主线 =====

    target: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round">
            <circle cx="32" cy="32" r="10" stroke-width="1.3"/>
            <circle cx="32" cy="32" r="2" fill="${c}" stroke="none"/>
            <line x1="32" y1="14" x2="32" y2="20" stroke-width="1.3"/>
            <line x1="32" y1="44" x2="32" y2="50" stroke-width="1.3"/>
            <line x1="14" y1="32" x2="20" y2="32" stroke-width="1.3"/>
            <line x1="44" y1="32" x2="50" y2="32" stroke-width="1.3"/>
        </g>
    `,

    ring: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-width="1.3">
            <circle cx="27" cy="34" r="7"/>
            <circle cx="37" cy="34" r="7"/>
        </g>
    `,

    signature: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 18,44 Q 25,36 32,41 T 46,38" stroke-width="1.4"/>
            <circle cx="42" cy="22" r="1.4" fill="${c}" stroke="none"/>
            <path d="M 42,22 Q 40,32 44,36" stroke-width="1.1"/>
        </g>
    `,

    eye: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <path d="M 14,32 Q 32,20 50,32 Q 32,44 14,32 Z" stroke-width="1.3"/>
            <circle cx="32" cy="32" r="4.5" stroke-width="1.1"/>
            <circle cx="32" cy="32" r="1.6" fill="${c}" stroke="none"/>
        </g>
    `,

    folder: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <path d="M 18,26 L 28,26 L 30,29 L 46,29 L 46,42 L 18,42 Z" stroke-width="1.3"/>
            <line x1="18" y1="33" x2="46" y2="33" stroke-width="0.6" opacity="0.4"/>
        </g>
    `,

    waveform: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" stroke-width="1.5" stroke-linecap="round">
            <line x1="17" y1="30" x2="17" y2="34"/>
            <line x1="22" y1="26" x2="22" y2="38"/>
            <line x1="27" y1="22" x2="27" y2="42"/>
            <line x1="32" y1="17" x2="32" y2="47"/>
            <line x1="37" y1="22" x2="37" y2="42"/>
            <line x1="42" y1="26" x2="42" y2="38"/>
            <line x1="47" y1="30" x2="47" y2="34"/>
        </g>
    `,

    key: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round" stroke-linecap="round">
            <circle cx="24" cy="28" r="5" stroke-width="1.3"/>
            <line x1="28" y1="32" x2="40" y2="44" stroke-width="1.3"/>
            <line x1="35" y1="39" x2="38" y2="36" stroke-width="1.1"/>
            <line x1="38" y1="42" x2="41" y2="39" stroke-width="1.1"/>
        </g>
    `,

    voice: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round">
            <circle cx="32" cy="32" r="4.5" stroke-width="1.3"/>
            <path d="M 22,32 Q 22,42 32,42" stroke-width="1.1"/>
            <path d="M 42,32 Q 42,42 32,42" stroke-width="1.1"/>
            <line x1="32" y1="42" x2="32" y2="46" stroke-width="1.1"/>
            <line x1="28" y1="46" x2="36" y2="46" stroke-width="1.1"/>
        </g>
    `,

    ticket: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <path d="M 16,28 L 48,28 L 48,36 L 16,36 Z" stroke-width="1.3"/>
            <line x1="32" y1="28" x2="32" y2="36" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.6"/>
            <circle cx="32" cy="26" r="1.8" fill="${c}" stroke="none" opacity="0.5"/>
        </g>
    `,

    quiz: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 26,26 Q 26,20 32,20 Q 38,20 38,26 Q 38,30 32,32 L 32,36" stroke-width="1.5"/>
            <circle cx="32" cy="42" r="1.3" fill="${c}" stroke="none"/>
        </g>
    `,

    hexagon: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <polygon points="32,16 44,23 44,41 32,48 20,41 20,23" stroke-width="1.4"/>
            <polygon points="32,24 38,27.5 38,36.5 32,40 26,36.5 26,27.5" stroke-width="0.9" opacity="0.7"/>
            <circle cx="32" cy="32" r="1.2" fill="${c}" stroke="none"/>
        </g>
    `,

    gate: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round">
            <path d="M 18,24 L 46,24" stroke-width="1.5"/>
            <path d="M 22,33 L 42,33" stroke-width="1.5"/>
            <path d="M 27,42 L 37,42" stroke-width="1.5"/>
        </g>
    `,

    // ===== 探索 =====

    mailbox: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <rect x="17" y="22" width="30" height="22" rx="1.5" stroke-width="1.3"/>
            <path d="M 17,23.5 L 32,35 L 47,23.5" stroke-width="1.3" stroke-linecap="round"/>
        </g>
    `,

    photo: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <rect x="16" y="24" width="32" height="20" rx="1.5" stroke-width="1.3"/>
            <circle cx="23" cy="30" r="2" stroke-width="1"/>
            <path d="M 16,40 L 24,33 L 32,38 L 40,31 L 48,40" stroke-width="1.2" stroke-linecap="round"/>
        </g>
    `,

    news: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <path d="M 17,22 L 45,22 L 45,44 L 20,44 Q 17,44 17,41 Z" stroke-width="1.3"/>
            <line x1="22" y1="27" x2="40" y2="27" stroke-width="1"/>
            <line x1="22" y1="32" x2="40" y2="32" stroke-width="0.8" opacity="0.7"/>
            <line x1="22" y1="36" x2="40" y2="36" stroke-width="0.8" opacity="0.7"/>
            <line x1="22" y1="40" x2="34" y2="40" stroke-width="0.8" opacity="0.7"/>
        </g>
    `,

    radar: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round">
            <circle cx="32" cy="32" r="3" stroke-width="1.2"/>
            <circle cx="32" cy="32" r="8" stroke-width="1" opacity="0.7"/>
            <circle cx="32" cy="32" r="13" stroke-width="0.8" opacity="0.45"/>
            <line x1="32" y1="32" x2="44" y2="20" stroke-width="1.1"/>
            <circle cx="32" cy="32" r="1.4" fill="${c}" stroke="none"/>
        </g>
    `,

    archive: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <rect x="18" y="22" width="28" height="7" rx="1" stroke-width="1.3"/>
            <rect x="18" y="31" width="28" height="13" rx="1" stroke-width="1.3"/>
            <line x1="28" y1="35" x2="36" y2="35" stroke-width="1"/>
            <line x1="28" y1="40" x2="36" y2="40" stroke-width="1"/>
        </g>
    `,

    book: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round" stroke-linecap="round">
            <path d="M 32,22 L 32,44" stroke-width="1.2"/>
            <path d="M 32,22 Q 24,20 16,23 L 16,42 Q 24,39 32,44" stroke-width="1.3"/>
            <path d="M 32,22 Q 40,20 48,23 L 48,42 Q 40,39 32,44" stroke-width="1.3"/>
        </g>
    `,

    chat: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <path d="M 16,25 L 40,25 Q 43,25 43,28 L 43,39 Q 43,42 40,42 L 24,42 L 18,46 L 18,42 Q 16,42 16,39 Z" stroke-width="1.3"/>
            <circle cx="24" cy="34" r="1.1" fill="${c}" stroke="none"/>
            <circle cx="30" cy="34" r="1.1" fill="${c}" stroke="none"/>
            <circle cx="36" cy="34" r="1.1" fill="${c}" stroke="none"/>
        </g>
    `,

    handshake: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round" stroke-linecap="round">
            <path d="M 16,30 L 24,26 L 30,30 L 34,30 L 40,26 L 48,30" stroke-width="1.3"/>
            <path d="M 24,26 L 26,34 L 32,36 L 38,34 L 40,26" stroke-width="1.2"/>
        </g>
    `,

    check: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 20,33 L 28,41 L 44,23" stroke-width="2"/>
        </g>
    `,

    // ===== 结局 =====

    coffin: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <polygon points="32,18 40,24 40,46 24,46 24,24" stroke-width="1.4"/>
            <line x1="24" y1="32" x2="40" y2="32" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.5"/>
            <circle cx="29" cy="23" r="0.7" fill="${c}" stroke="none"/>
            <circle cx="35" cy="23" r="0.7" fill="${c}" stroke="none"/>
        </g>
    `,

    magnifier: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round">
            <circle cx="29" cy="28" r="9" stroke-width="1.4"/>
            <line x1="36" y1="35" x2="45" y2="44" stroke-width="1.6"/>
        </g>
    `,

    chain: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round">
            <circle cx="24" cy="32" r="5" stroke-width="1.3"/>
            <circle cx="32" cy="32" r="5" stroke-width="1.3"/>
            <circle cx="40" cy="32" r="5" stroke-width="1.3"/>
        </g>
    `,

    loop: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 32,32 L 22,42 L 22,22 Z" stroke-width="1.3"/>
            <path d="M 32,32 L 42,22 L 42,42 Z" stroke-width="1.3"/>
        </g>
    `,

    path: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="43" r="2.4" fill="${c}" stroke="none"/>
            <path d="M 18,43 Q 24,30 32,32 T 46,20" stroke-width="1.4"/>
            <circle cx="46" cy="18" r="3.4" stroke-width="1.4"/>
            <circle cx="46" cy="18" r="1.2" fill="${c}" stroke="none" opacity="0.6"/>
        </g>
    `,

    all: (c) => `
        ${hexBase(c)}
        <g stroke="${c}" fill="none" stroke-linejoin="round">
            <polygon points="32,17 35,28 46,28 37,35 40,46 32,39 24,46 27,35 18,28 29,28" stroke-width="1.3"/>
        </g>
    `
};

function renderIcon(name, isUnlocked, palette) {
    const color = isUnlocked ? palette.primary : COLOR_LOCKED;
    const fn = ICONS[name];
    if (!fn) {
        return `<svg viewBox="0 0 64 64" fill="none">${hexBase(color)}</svg>`;
    }
    return `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${fn(color)}
    </svg>`;
}

// ============================================================
// 主题色
// ============================================================

const PALETTES = {
    home:    { primary: '#b8945a', particle: '#d8b880' },
    main:    { primary: '#b8945a', particle: '#d8b880' },
    explore: { primary: '#4a8fc8', particle: '#7ab8e8' },
    ending:  { primary: '#a05a7a', particle: '#c88aa8' }
};

const PAGE_LABELS = {
    main:    { zh: '主线成就', en: 'MAIN ACHIEVEMENTS' },
    explore: { zh: '探索成就', en: 'EXPLORE ACHIEVEMENTS' },
    ending:  { zh: '结局成就', en: 'ENDING ACHIEVEMENTS' }
};

function updatePageLabel(tab) {
    const labels = PAGE_LABELS[tab];
    if (!labels) return;

    const grouped = getGroupedAchievements();
    const list = grouped[tab] || [];
    const unlocked = getUnlockedSet();
    const count = list.filter(a => unlocked.has(a.id)).length;

    document.getElementById('pageLabelZh').textContent = labels.zh;
    document.getElementById('pageLabelEn').textContent = labels.en;
    document.getElementById('pageLabelCount').textContent = count + ' / ' + list.length;
}

// ============================================================
// 数据分组
// ============================================================

function getGroupedAchievements() {
    const all = window.ALL_ACHIEVEMENTS || [];
    return {
        main:    all.filter(a => a.id.startsWith('main_')),
        explore: all.filter(a => a.id.startsWith('explore_')),
        ending:  all.filter(a => a.id.startsWith('ending_'))
    };
}

function getUnlockedSet() {
    const state = window.getAchievementsState();
    return new Set(state.unlocked || []);
}

// ============================================================
// DOM 引用
// ============================================================

const homeView = document.getElementById('homeView');
const detailView = document.getElementById('detailView');
const wallEl = document.getElementById('wall');
const postcardEl = document.getElementById('postcard');
const tabEls = document.querySelectorAll('.tab');

let currentTab = 'home';
let currentId = null;

// ============================================================
// 首页
// ============================================================

function renderHome() {
    const grouped = getGroupedAchievements();
    const unlocked = getUnlockedSet();

    let total = 0, unlockedCount = 0;
    const catStats = [];

    ['main', 'explore', 'ending'].forEach(key => {
        const list = grouped[key] || [];
        const catTotal = list.length;
        const catUnlocked = list.filter(a => unlocked.has(a.id)).length;
        total += catTotal;
        unlockedCount += catUnlocked;

        const labelMap = { main: '主 线', explore: '探 索', ending: '结 局' };
        catStats.push({
            key,
            name: labelMap[key],
            unlocked: catUnlocked,
            total: catTotal,
            percent: catTotal > 0 ? (catUnlocked / catTotal) : 0
        });
    });

    // 环形进度
    const ring = document.getElementById('ringFill');
    const num = document.getElementById('ringNum');
    const totalEl = document.getElementById('ringTotal');
    const CIRC = 408;

    num.textContent = unlockedCount;
    totalEl.textContent = `/ ${total} 已解锁`;

    ring.style.strokeDashoffset = CIRC;
    requestAnimationFrame(() => {
        const percent = total > 0 ? unlockedCount / total : 0;
        setTimeout(() => {
            ring.style.strokeDashoffset = CIRC * (1 - percent);
        }, 100);
    });

    // 登录时间 / 游玩时长
    let firstOpen = Date.now();
    try {
        const state = window.getAchievementsState();
        if (state.first_open) firstOpen = state.first_open;
    } catch {}

    const d = new Date(firstOpen);
    const dateStr =
        `${d.getFullYear()} / ${String(d.getMonth() + 1).padStart(2, '0')} / ${String(d.getDate()).padStart(2, '0')}`;
    document.getElementById('statFirstOpen').textContent = dateStr;

    // 时长（调用独立函数，方便轮询刷新）
    updateDurationDisplay();

    // 分类进度条
    const catsEl = document.getElementById('homeCats');
    catsEl.innerHTML = catStats.map(cat => `
        <div class="home-cat-row" data-cat="${cat.key}">
            <div class="home-cat-header">
                <span class="home-cat-name">${cat.name}</span>
                <span class="home-cat-num">${cat.unlocked} / ${cat.total}</span>
            </div>
            <div class="home-cat-bar">
                <div class="home-cat-fill" data-percent="${cat.percent}"></div>
            </div>
        </div>
    `).join('');

    requestAnimationFrame(() => {
        setTimeout(() => {
            catsEl.querySelectorAll('.home-cat-fill').forEach(el => {
                el.style.width = (parseFloat(el.dataset.percent) * 100) + '%';
            });
        }, 100);
    });
}

// ============================================================
// 时长显示（独立更新，不重渲染首页）
// ============================================================

function updateDurationDisplay() {
    const el = document.getElementById('statDuration');
    if (!el) return;

    let playtime = {};
    try { playtime = JSON.parse(localStorage.getItem('playtime_state') || '{}'); } catch {}

    const totalMs = (playtime.total || 0)
        + (playtime.session_start ? (Date.now() - playtime.session_start) : 0);

    const totalMinutes = Math.floor(totalMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const durationStr =
        String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');

    el.textContent = durationStr;
}

// ============================================================
// 粒子
// ============================================================

function spawnParticles(wrapEl, particleColor) {
    const old = wrapEl.querySelector('.icon-particles');
    if (old) old.remove();

    const layer = document.createElement('div');
    layer.className = 'icon-particles';

    const count = 6;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'icon-particle';
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
        const dist = 22 + Math.random() * 10;
        p.style.setProperty('--tx', (Math.cos(angle) * dist).toFixed(1) + 'px');
        p.style.setProperty('--ty', (Math.sin(angle) * dist).toFixed(1) + 'px');
        p.style.background = particleColor;
        p.style.boxShadow = `0 0 6px ${particleColor}, 0 0 12px ${particleColor}`;
        p.style.animationDelay = (-Math.random() * 2.6).toFixed(2) + 's';
        layer.appendChild(p);
    }

    wrapEl.appendChild(layer);
}

// ============================================================
// 明信片
// ============================================================

function renderDetail(item) {
    if (!item) {
        postcardEl.innerHTML = '';
        return;
    }

    const isLocked = !getUnlockedSet().has(item.id);
    const palette = PALETTES[currentTab] || PALETTES.main;

    postcardEl.classList.add('fading');

    setTimeout(() => {
        postcardEl.classList.toggle('locked', isLocked);

        if (isLocked) {
            // 未解锁：只显示图标 + 一个问号
            postcardEl.innerHTML = `
                <div class="postcard-icon">
                    ${renderIcon(item.icon, false, palette)}
                </div>
                <div class="postcard-locked-mark">？</div>
            `;
        } else {
            // 已解锁：图标 → 名称 → 关键词 → 描述 → 解锁条件 → 回顾按钮
            const keywordHTML = item.keyword
                ? (item.keywordLink
                    ? `<a class="postcard-keyword postcard-keyword-link" href="${item.keywordLink}" target="_blank" rel="noopener">${item.keyword}</a>`
                    : `<div class="postcard-keyword">${item.keyword}</div>`)
                : '';

            const conditionHTML = item.condition
                ? `<div class="postcard-condition">${item.condition}</div>`
                : '';

            const buttonHTML = item.reviewUrl
                ? `<a class="postcard-btn" href="${item.reviewUrl}" target="_blank" rel="noopener">回 顾</a>`
                : '';

            postcardEl.innerHTML = `
                <div class="postcard-icon">
                    ${renderIcon(item.icon, true, palette)}
                </div>
                <div class="postcard-title">${item.name}</div>
                ${keywordHTML}
                <div class="postcard-desc">${item.desc}</div>
                ${conditionHTML}
                ${buttonHTML}
                <div class="postcard-footer"></div>
            `;
        }
        postcardEl.classList.remove('fading');
    }, 200);
}

// ============================================================
// 图标墙
// ============================================================

function renderWall() {
    const grouped = getGroupedAchievements();
    const list = grouped[currentTab] || [];
    const palette = PALETTES[currentTab] || PALETTES.main;
    const unlocked = getUnlockedSet();

    wallEl.innerHTML = '';

    list.forEach(item => {
        const isUnlocked = unlocked.has(item.id);
        const el = document.createElement('div');
        el.className = 'wall-item '
            + (isUnlocked ? 'unlocked' : 'locked')
            + (item.id === currentId ? ' active' : '');
        el.dataset.id = item.id;

        const wrap = document.createElement('div');
        wrap.className = 'wall-icon-wrap';

        const iconEl = document.createElement('div');
        iconEl.className = 'wall-icon';
        iconEl.innerHTML = renderIcon(item.icon, isUnlocked, palette);
        wrap.appendChild(iconEl);

        if (isUnlocked && item.id === currentId) {
            spawnParticles(wrap, palette.particle);
        }

        el.appendChild(wrap);

        const nameEl = document.createElement('div');
        nameEl.className = 'wall-name';
        nameEl.textContent = isUnlocked ? item.name : '？';
        el.appendChild(nameEl);

        el.addEventListener('click', () => {
            currentId = item.id;
            renderWall();
            renderDetail(item);
        });

        wallEl.appendChild(el);
    });
}

// ============================================================
// Tab 切换
// ============================================================

function switchTab(tab) {
    currentTab = tab;
    tabEls.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));

    document.body.dataset.theme = (tab === 'home') ? 'main' : tab;

    if (tab === 'home') {
        homeView.classList.add('active');
        detailView.classList.remove('active');
        renderHome();
        return;
    }

    homeView.classList.remove('active');
    detailView.classList.add('active');
    detailView.dataset.tab = tab;

    // 更新左上角标题
    updatePageLabel(tab);

    const grouped = getGroupedAchievements();
    const list = grouped[tab] || [];
    const unlocked = getUnlockedSet();

    // 优先选中已解锁的，否则第一个
    const first = list.find(a => unlocked.has(a.id)) || list[0];
    currentId = first ? first.id : null;

    renderWall();
    renderDetail(first);
}

tabEls.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

// ============================================================
// 背景粒子
// ============================================================

(function initParticles() {
    const container = document.getElementById('bgParticles');
    const count = 24;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'bg-particle';
        p.style.left = Math.random() * 100 + '%';
        const size = (2 + Math.random() * 3).toFixed(1) + 'px';
        p.style.width = size;
        p.style.height = size;
        const dur = 14 + Math.random() * 16;
        p.style.animationDuration = dur + 's';
        p.style.animationDelay = (-Math.random() * dur) + 's';
        container.appendChild(p);
    }
})();

// ============================================================
// 扫描 + 轮询
// ============================================================

const WATCHED_KEYS = [
    'game_started', 'watercell_visited',
    'mail_state', 'intranet_state', 'tqchat_state',
    'agreement_signed', 'intranet_login',
    'dingwenqian_locked', 'endings_unlocked',
    'explore_seen', 'exam_passed', 'exam_answers',
    'exam_first_result', 'dwq_audio_opened_time'
];

function getSnapshot() {
    return WATCHED_KEYS.map(k => localStorage.getItem(k) || '').join('::');
}

let lastSnapshot = '';

function checkForUpdates() {
    const current = getSnapshot();
    if (current === lastSnapshot) return;
    lastSnapshot = current;

    window.scanAchievements();

    // 重新渲染当前视图
    if (currentTab === 'home') {
        renderHome();
    } else {
        updatePageLabel(currentTab);
        renderWall();
        const grouped = getGroupedAchievements();
        const list = grouped[currentTab] || [];
        const currentItem = list.find(a => a.id === currentId);
        if (currentItem) renderDetail(currentItem);
    }
}

// ============================================================
// 启动
// ============================================================

window.scanAchievements();
lastSnapshot = getSnapshot();
switchTab('home');

setInterval(checkForUpdates, 500);

// 时长独立刷新（每 10 秒，仅在首页时）
setInterval(function() {
    if (currentTab === 'home') {
        updateDurationDisplay();
    }
}, 10000);