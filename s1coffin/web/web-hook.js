// ========== 外部网页浏览追踪 ==========
// 6 个外部网页各引入一次，通过 data-page 声明自己的页面键
(function() {
    const script = document.currentScript;
    if (!script) return;
    const pageKey = script.dataset.page;
    if (!pageKey) return;

    let seen = {};
    try {
        seen = JSON.parse(localStorage.getItem('explore_seen') || '{}');
    } catch {
        seen = {};
    }
    seen.webpages = seen.webpages || [];
    if (!seen.webpages.includes(pageKey)) {
        seen.webpages.push(pageKey);
        localStorage.setItem('explore_seen', JSON.stringify(seen));
    }
})();