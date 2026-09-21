// ========== 浏览记录追踪 ==========
// 被 5 个地方调用：图片窗口、新闻详情、外部网页、项目详情、论文页
// 只往 explore_seen 里加东西，不做任何判断

function markExplore(type, id) {
    let seen = {};
    try {
        seen = JSON.parse(localStorage.getItem('explore_seen') || '{}');
    } catch {
        seen = {};
    }
    seen[type] = seen[type] || [];
    if (!seen[type].includes(id)) {
        seen[type].push(id);
        localStorage.setItem('explore_seen', JSON.stringify(seen));
    }
}

window.markExplore = markExplore;