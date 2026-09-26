// ========== 通知弹窗 ==========
function openNotice(noticeId) {
    const user = intranetUserData.getCurrentUser();
    const homeData = getIntranetHomeData();          // 新增：获取首页数据
    const notice = homeData.notices.find(n => n.id === noticeId);

    if (!notice) return;

    document.getElementById('noticeModalTitle').textContent = notice.title;
    document.getElementById('noticeModalMeta').textContent = `${notice.sender} · ${notice.date}`;
    document.getElementById('noticeModalBody').innerHTML = notice.content;
    document.getElementById('noticeModalOverlay').classList.remove('hidden');

    markNoticeRead(user.id, noticeId);
    renderModule(currentModule);
}

function closeNotice() {
    document.getElementById('noticeModalOverlay').classList.add('hidden');
}

// ========== 系统提示弹窗 ==========
function showAlertModal(message, icon = '⚠️', title = '系统提示') {
    const existing = document.getElementById('alertModalOverlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'alert-modal-overlay';
    overlay.id = 'alertModalOverlay';
    overlay.innerHTML = `
        <div class="alert-modal">
            <div class="alert-modal-icon">${icon}</div>
            <div class="alert-modal-title">${title}</div>
            <div class="alert-modal-message">${message}</div>
            <button class="alert-modal-btn" onclick="closeAlertModal()">确 定</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

function closeAlertModal() {
    const overlay = document.getElementById('alertModalOverlay');
    if (overlay) overlay.remove();
}

// ========== 正式通知弹窗 ==========
function showNoticeModal(title, meta, contentHtml) {
    document.getElementById('noticeModalTitle').textContent = title;

    const metaEl = document.getElementById('noticeModalMeta');
    const titleEl = document.getElementById('noticeModalTitle');

    if (meta) {
        metaEl.textContent = meta;
        metaEl.classList.remove('hidden');
        titleEl.classList.remove('no-meta');
    } else {
        metaEl.textContent = '';
        metaEl.classList.add('hidden');
        titleEl.classList.add('no-meta');
    }

    document.getElementById('noticeModalBody').innerHTML = contentHtml;
    document.getElementById('noticeModalOverlay').classList.remove('hidden');
}

// ========== 云数据中心通知 ==========
function openCloudNotice(id) {
    const notice = intranetFilesData.notices.find(n => n.id === id);
    if (!notice) return;

    // 标记：打开过云数据中心的异常数据通知
    if (id === 'security-warning') {
        const triggers = JSON.parse(localStorage.getItem('notebook_triggers') || '{}');
        if (!triggers.opened_data_notice) {
            triggers.opened_data_notice = Date.now();
            localStorage.setItem('notebook_triggers', JSON.stringify(triggers));
        }
    }

    // 标记为已读（成就"公告猎人"需要）
    const user = intranetUserData.getCurrentUser();
    markNoticeRead(user.id, id);

    showNoticeModal(
        notice.modalTitle,
        notice.modalMeta,
        notice.modalContent
    );
}

// ========== 锁定提示 ==========
function showLockedAlert() {
    const msg = document.createElement('div');
    msg.style.cssText = 'position:fixed; top:20%; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.8); color:#f39c12; padding:12px 24px; border-radius:8px; z-index:1000; font-size:14px; border:1px solid rgba(243,156,18,0.4);';
    msg.textContent = '🔒 需要密码解锁';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 1500);
}

function showComingSoon() {
    const msg = document.createElement('div');
    msg.style.cssText = 'position:fixed; top:20%; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.8); color:#00c8ff; padding:12px 24px; border-radius:8px; z-index:1000; font-size:14px;';
    msg.textContent = '后续章节开放';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 1500);
}

// ========== 浮层提示（Toast） ==========
function showToast(message) {
    // 移除已有提示
    const existing = document.getElementById('filesToast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'filesToast';
    toast.className = 'files-toast';
    toast.innerHTML = `⚠️ ${message}`;
    document.body.appendChild(toast);

    // 动画结束后移除
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 1000);
}

// ========== 备忘录触发：点击"申请恢复" ==========
function markRestoreClicked() {
    const triggers = JSON.parse(localStorage.getItem('notebook_triggers') || '{}');
    if (!triggers.clicked_restore) {
        triggers.clicked_restore = Date.now();
        localStorage.setItem('notebook_triggers', JSON.stringify(triggers));
    }
}