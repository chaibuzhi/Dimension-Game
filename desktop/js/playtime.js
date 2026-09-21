// ========== 游玩时长统计 ==========
//
// 被以下页面引入（都是"同标签页跳转"的主流程页面）：
//   - desktop/index-hanxiu.html
//   - tianqi/exam.html
//   - ending/e1ordinary.html
//   - ending/e2detective.html
//   - ending/e3funeral.html
//   - ending/prelude-watercell.html
//
// 不引入的页面（新标签页打开，会和桌面同时运行）：
//   - tianqi/home.html 及官网其他页面
//   - web/*.html 外部网页
//
// 回顾模式（?review=...）不参与计时，因为是从成就面板新标签页打开的

(function() {
    // 回顾模式不参与计时
    const isReview = new URLSearchParams(window.location.search).get('review');
    if (isReview) return;

    const KEY = 'playtime_state';

    function readState() {
        try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
    }
    function saveState(s) {
        localStorage.setItem(KEY, JSON.stringify(s));
    }

    // 初始化：先补结算上次未结算的时间，再开启新会话
    let state = readState();
    if (!state.total) state.total = 0;
    if (state.session_start) {
        // 上次异常关闭（beforeunload 未触发），补结算
        // 超过 6 小时认为不可信，丢弃
        const gap = Date.now() - state.session_start;
        const MAX_GAP = 6 * 60 * 60 * 1000;
        if (gap < MAX_GAP) {
            state.total += gap;
        }
    }
    state.session_start = Date.now();
    saveState(state);

    // 每 5 秒结算
    setInterval(function() {
        const s = readState();
        if (!s.session_start) return;
        const now = Date.now();
        s.total = (s.total || 0) + (now - s.session_start);
        s.session_start = now;
        saveState(s);
    }, 5000);

    // 关闭前结算
    window.addEventListener('beforeunload', function() {
        const s = readState();
        if (!s.session_start) return;
        s.total = (s.total || 0) + (Date.now() - s.session_start);
        s.session_start = null;
        saveState(s);
    });
})();