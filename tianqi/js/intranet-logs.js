// ========== 工作日志 ==========
function renderLogs() {
    return `
        <div class="log-page">
            <div class="log-stats-row">
                <div class="log-stat-item">
                    <span class="log-stat-num">106</span>
                    <span class="log-stat-label">总记录数</span>
                </div>
                <div class="log-stat-divider"></div>
                <div class="log-stat-item">
                    <span class="log-stat-num">0</span>
                    <span class="log-stat-label">可见记录</span>
                </div>
                <div class="log-stat-divider"></div>
                <div class="log-stat-item">
                    <span class="log-stat-num">106</span>
                    <span class="log-stat-label">已清除</span>
                </div>
            </div>

            <div class="log-table-card">
                <div class="log-table-header">
                    <span class="log-col-date">时间</span>
                    <span class="log-col-title">标题</span>
                    <span class="log-col-author">提交人</span>
                    <span class="log-col-created">创建日期</span>
                    <span class="log-col-modified">修改日期</span>
                </div>
                <div class="log-table-body">
                    <div class="log-empty-row">
                        <p>此部分内容已于 <strong>2026年7月15日</strong> 被手动清除。</p>
                        <p>如需恢复，请联系安全合规部技术科。</p>
                        <button class="log-restore-btn" onclick="showToast('当前账号权限不足')">申请恢复</button>
                        <p class="log-restore-hint" id="logRestoreHint"></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}