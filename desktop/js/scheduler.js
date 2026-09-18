// ========== 中央调度器 ==========
// 职责：监听跨系统事件键 → 更新 mail_state → 写入 scheduled_notifications
// 不包含任何用户可读文案（通知文案统一从 data 文件获取）

const Scheduler = (function() {

    // ========== 延时常量（统一管理） ==========
    const LL_CODE_EXTRA_DELAY = 10000;  // 老刘推荐码额外延时
    const XZ_CODE_EXTRA_DELAY = 20000;  // 小周推荐码额外延时
    const FRIEND_REQUEST_DELAY = 60000; // 好友申请延时
    const MAIL_UNLOCK_DELAY = 3000;     // 可发送邮件解锁通知延时

    // ========== 读取 mail_state ==========
    function getMailState() {
        try {
            return JSON.parse(localStorage.getItem('mail_state') || '{}');
        } catch {
            return {};
        }
    }

    function getMailThreadState(threadKey) {
        const state = getMailState();
        return (state.threads && state.threads[threadKey]) ? state.threads[threadKey] : {};
    }

    function setMailThreadState(threadKey, key, value) {
        const state = getMailState();
        if (!state.threads) state.threads = {};
        if (!state.threads[threadKey]) state.threads[threadKey] = {};
        state.threads[threadKey][key] = value;
        localStorage.setItem('mail_state', JSON.stringify(state));
    }

    // ========== 写入通知队列（只含 eventId 和 showAt） ==========
    function scheduleNotification(eventId, showAt) {
        const queue = JSON.parse(localStorage.getItem('scheduled_notifications') || '[]');
        if (!queue.some(item => item.eventId === eventId)) {
            queue.push({ eventId: eventId, showAt: showAt });
            localStorage.setItem('scheduled_notifications', JSON.stringify(queue));
        }
    }

    // ========== 检查推荐码条件 ==========
    // 条件：tqchat_locked 已设置 + mail_code_ready 中对应标记为 true
    function checkRecommendationCodes() {
        const isLocked = localStorage.getItem('tqchat_locked') === 'true';
        if (!isLocked) return;

        let ready = {};
        try { ready = JSON.parse(localStorage.getItem('mail_code_ready') || '{}'); } catch {}

        // 老刘：同意条件 + 天启通已锁定
        if (ready.laoliu === true) {
            const st = getMailThreadState('laoliu');
            if (!st.codeTime) {
                setMailThreadState('laoliu', 'codeTime', Date.now() + LL_CODE_EXTRA_DELAY);
                scheduleNotification('ll-in-4-code', Date.now() + LL_CODE_EXTRA_DELAY + DELAY_SHORT);
            }
        }

        // 小周：已走到请求推荐步骤 + 天启通已锁定
        if (ready.xiaozhou === true) {
            const st = getMailThreadState('xiaozhou');
            if (!st.codeTime) {
                setMailThreadState('xiaozhou', 'codeTime', Date.now() + XZ_CODE_EXTRA_DELAY);
                scheduleNotification('xz-in-3', Date.now() + XZ_CODE_EXTRA_DELAY + DELAY_SHORT);
            }
        }
    }

    // ========== 邮件可发送解锁通知 ==========
    // 条件：job_apply_attempted = true 且 对应联系人已解锁
    // 双向依赖：先加联系人或先解锁都可，任一变化都触发
    const MAIL_UNLOCK_NOTIFIED_KEY = 'mail_unlock_notified';

    function getMailUnlockNotified() {
        try {
            return JSON.parse(localStorage.getItem(MAIL_UNLOCK_NOTIFIED_KEY) || '{}');
        } catch {
            return {};
        }
    }

    function setMailUnlockNotified(person) {
        const data = getMailUnlockNotified();
        data[person] = true;
        localStorage.setItem(MAIL_UNLOCK_NOTIFIED_KEY, JSON.stringify(data));
    }

    function checkMailUnlockNotifications() {
        // 未解锁可发送内容 → 不处理
        if (localStorage.getItem('job_apply_attempted') !== 'true') return;

        // 读取联系人解锁状态
        let unlocked = {};
        try {
            unlocked = JSON.parse(localStorage.getItem('mail_contact_unlocked') || '{}');
        } catch {}

        const notified = getMailUnlockNotified();

        if (unlocked.laoliu === true && !notified.laoliu) {
            scheduleNotification('mail-unlock-laoliu', Date.now() + MAIL_UNLOCK_DELAY);
            setMailUnlockNotified('laoliu');
        }

        if (unlocked.xiaozhou === true && !notified.xiaozhou) {
            scheduleNotification('mail-unlock-xiaozhou', Date.now() + MAIL_UNLOCK_DELAY);
            setMailUnlockNotified('xiaozhou');
        }
    }

    // ========== 处理跨系统事件 ==========
    function handleEvent(eventKey, eventValue) {
        switch (eventKey) {

            // 签署确认函 → 天启科技回执邮件
            case 'agreement_signed':
                if (eventValue === 'true') {
                    const st = getMailThreadState('tianqi');
                    if (!st.signedTime) {
                        setMailThreadState('tianqi', 'signed', true);
                        setMailThreadState('tianqi', 'signedTime', Date.now());
                        scheduleNotification('tq-003', Date.now() + DELAY_SHORT);
                    }
                }
                break;

            // 员工后台锁定 → 丁文倩定时邮件
            case 'dingwenqian_locked':
                if (eventValue === 'true') {
                    const st = getMailThreadState('dingwenqian-mail');
                    if (!st.triggerTime) {
                        setMailThreadState('dingwenqian-mail', 'triggerTime', Date.now());
                        scheduleNotification('dwq-final', Date.now() + DELAY_SHORT);
                    }
                }
                break;

            // 天启通锁定 → 检查推荐码
            case 'tqchat_locked':
                if (eventValue === 'true') {
                    checkRecommendationCodes();
                }
                break;

            // 推荐码条件变化 → 检查推荐码
            case 'mail_code_ready':
                checkRecommendationCodes();
                break;

            // 录音打开 → 60秒后好友申请
            case 'dwq_audio_opened_time':
                if (eventValue) {
                    const openedTime = parseInt(eventValue);
                    if (!isNaN(openedTime)) {
                        scheduleNotification('friend_request', openedTime + FRIEND_REQUEST_DELAY);
                    }
                }
                break;

            // 招聘申请提交 → 面试邀请邮件
            case 'job_apply_time':
                if (eventValue) {
                    const st = getMailThreadState('tq-hr');
                    if (!st.triggerTime) {
                        setMailThreadState('tq-hr', 'triggerTime', Date.now());
                        scheduleNotification('tq-hr-001', Date.now() + DELAY_SHORT);
                    }
                }
                break;
        }
    }

    // ========== 初始化 ==========
    function init() {
        // 监听 storage 事件（来自其他 iframe）
        window.addEventListener('storage', function(e) {
            if (e.key === 'agreement_signed' ||
                e.key === 'dingwenqian_locked' ||
                e.key === 'tqchat_locked' ||
                e.key === 'mail_code_ready' ||
                e.key === 'job_apply_time' ||
                e.key === 'dwq_audio_opened_time') {
                handleEvent(e.key, e.newValue);
            }

            // 邮件可发送解锁通知（双向依赖）
            if (e.key === 'job_apply_attempted' ||
                e.key === 'mail_contact_unlocked') {
                checkMailUnlockNotifications();
            }
        });

        // 检查已有键（处理桌面加载时事件已存在的情况）
        if (localStorage.getItem('agreement_signed') === 'true') {
            handleEvent('agreement_signed', 'true');
        }
        if (localStorage.getItem('dingwenqian_locked') === 'true') {
            handleEvent('dingwenqian_locked', 'true');
        }
        if (localStorage.getItem('tqchat_locked') === 'true') {
            handleEvent('tqchat_locked', 'true');
        }
        if (localStorage.getItem('mail_code_ready')) {
            handleEvent('mail_code_ready', null);
        }
        if (localStorage.getItem('job_apply_time')) {
            handleEvent('job_apply_time', localStorage.getItem('job_apply_time'));
        }        
        const dwqTime = localStorage.getItem('dwq_audio_opened_time');
        if (dwqTime) {
            handleEvent('dwq_audio_opened_time', dwqTime);
        }

        // ========== 初始邮件通知（邮件窗口从未打开过时） ==========
        const initialMailNotified = localStorage.getItem('initial_mail_notified') === 'true';
        if (!initialMailNotified) {
            const mailState = getMailState();
            if (mailState.initialized !== true) {
                scheduleNotification('tq-001', Date.now() + 3000);
                scheduleNotification('xy-001', Date.now() + 6000);
                localStorage.setItem('initial_mail_notified', 'true');
            }
        }

        // ========== 邮件可发送解锁初始检查 ==========
        checkMailUnlockNotifications();
    }

    return {
        init: init,
        scheduleNotification: scheduleNotification
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    Scheduler.init();
});