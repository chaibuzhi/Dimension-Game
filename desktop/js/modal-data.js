// ========== 弹窗数据 ==========
// 弹窗以窗口形式打开，在任务栏显示图标

const modalData = {
    restart: {
        title: '重新开始',
        icon: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-2px;">
            <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M13.5 2v3.5h-3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        width: 380,
        height: 200,
        content: `
            <div class="restart-modal-body">
                <h2 class="restart-modal-title">重新开始游戏</h2>
                <p class="restart-modal-desc">所有游戏进度都将被重置，且无法恢复</p>
            </div>
        `,
        buttons: [
            { label: '取消', type: 'ghost', onClick: 'cancel' },
            { label: '确定', type: 'danger', onClick: 'restart' }
        ]
    },
};