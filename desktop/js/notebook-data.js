// ========== 备忘录 · 数据定义 ==========
// 12 条笔记

const NOTEBOOK_NOTES = [
    {
        id: 1,
        lines: ['那个天启科技的人让我查收邮件'],
        appear: (s) => true,
        done: (s) => s.mailState.loggedIn === 'hanxiu',
        noNotify: true,   // 首次出现时不推送通知（游戏刚进来）
        hints: [
            { id: '1-1', text: '登录邮箱',
              appear: (s) => true,
              done: (s) => s.mailState.loggedIn === 'hanxiu' }
        ]
    },
    {
        id: 2,
        lines: ['文倩在天启科技工作了五年，但从来不跟我谈起工作，她到底在做什么？'],
        appear: (s) => s.agreementSigned,
        done: (s) => !!s.triggers.visited_ding_id,
        hints: [
            { id: '2-1', text: '搜搜这家公司',
              appear: (s) => true,
              done: (s) => !!s.triggers.visited_ding_id }
        ]
    },
    {
        id: 3,
        lines: ['有了文倩的工号应该就能进入员工系统，我得找到密码'],
        appear: (s) => !!s.triggers.visited_ding_id,
        done: (s) => !!s.intranetLogin,
        hints: [
            { id: '3-1', text: '调查密码',
              appear: (s) => true,
              done: (s) => !!s.intranetLogin }
        ]
    },
    {
        id: 4,
        lines: [
            'onlytruth——唯有真相',
            '文倩寻找的真相究竟是什么？'
        ],
        appear: (s) => !!s.intranetLogin,
        done: (s) => !!s.triggers.clicked_restore,
        hints: [
            { id: '4-1', text: '调查员工系统',
              appear: (s) => true,
              done: (s) => !!s.triggers.clicked_restore }
        ]
    },
    {
        id: 5,
        lines: [
            '事故报告被锁了,文倩到底出了什么事？结果肯定就在这份报告里！'
        ],
        appear: (s) => !!s.triggers.opened_accident_modal,
        done: (s) => s.dingwenqianLocked,
        hints: [
            { id: '5-1', text: '找到密钥',
              appear: (s) => true,
              done: (s) => s.dingwenqianLocked },
            { id: '5-2', text: 'masterkey会是秘钥吗？',
              appear: (s) => !!s.triggers.hexu_viewed_complete,
              done: (s) => s.dingwenqianLocked }
        ]
    },
    {
        id: 6,
        lines: ['他们几乎把文倩的痕迹全部清除了，他们到底想干什么？'],
        appear: (s) => !!s.triggers.clicked_restore,
        done: (s) => s.tqchatState.synced === true,
        hints: [
            { id: '6-1', text: '寻找丁文倩的痕迹',
              appear: (s) => true,
              done: (s) => s.tqchatState.synced === true }
        ]
    },
    {
        id: 7,
        lines: ['异常数据？那是什么，和文倩有关吗？'],
        appear: (s) => !!s.triggers.opened_data_notice,
        done: (s) => s.intranetState.physicsFolderUnlocked === true,
        hints: [
            { id: '7-1', text: '进入物理研究部',
              appear: (s) => true,
              done: (s) => s.intranetState.physicsFolderUnlocked === true }
        ]
    },
    {
        id: 8,
        lines: [
            '我应该好好看看物理研究部的资料，或许能找到什么线索。特别是他们提到的 [异常数据]'
        ],
        appear: (s) => s.intranetState.physicsFolderUnlocked === true,
        done: (s) => s.dingwenqianLocked,
        hints: [
            { id: '8-1', text: '找到并破解异常数据',
              appear: (s) => true,
              done: (s) => s.dingwenqianLocked }
        ]
    },
    {
        id: 9,
        lines: [
            'Masterkey是happybirthday',
            '文倩，是你留给我的吗',
            '这是祝福，还是你的遗言？'
        ],
        appear: (s) => s.dingwenqianLocked,
        done: (s) => s.tqchatLocked,
        hints: [
            { id: '9-1', text: '找到丁文倩',
              appear: (s) => true,
              done: (s) => s.tqchatLocked }
        ]
    },
    {
        id: 10,
        lines: [
            '它是谁？为什么要帮我？',
            '管不了那么多了',
            '文倩就在那，我得去救她！'
        ],
        appear: (s) => s.tqchatLocked,
        done: (s) => s.jobApplyAttempted,
        hints: [
            { id: '10-1', text: '去官网看看招聘',
              appear: (s) => true,
              done: (s) => s.jobApplyAttempted }
        ]
    },
    {
        id: 11,
        lines: ['想要参加招聘，只能走内部推荐，得去找人才行'],
        appear: (s) => s.jobApplyAttempted,
        done: (s) => s.hasReadCode,
        hints: [
            { id: '11-1', text: '找到能帮忙的人',
              appear: (s) => true,
              done: (s) => !!(s.mailContactUnlocked.laoliu || s.mailContactUnlocked.xiaozhou) },
            { id: '11-2', text: '获得推荐码',
              appear: (s) => !!(s.mailContactUnlocked.laoliu || s.mailContactUnlocked.xiaozhou),
              done: (s) => s.hasReadCode }
        ]
    },
    {
        id: 12,
        lines: [
            '不管要付出什么代价，我都要找到她'
        ],
        appear: (s) => s.hasReadCode,
        done: (s) => !!s.examAnswers,
        hints: [
            { id: '12-1', text: '成为天启探索者',
              appear: (s) => true,
              done: (s) => !!s.examAnswers }
        ]
    },
    {
        id: 13,
        lines: [
            '文倩，我来了',
            '等我'
        ],
        appear: (s) => s.postEndingMode,
        done: () => false,
        badge: '- END -',
        hints: [
            { id: '13-1', text: '入职天启科技',
              appear: (s) => true,
              done: () => false,
              alwaysHighlight: true }
        ]
    }
];

// ========== 读取全局状态 ==========
function getNotebookGlobalState() {
    const safeJSON = (key) => {
        try { return JSON.parse(localStorage.getItem(key) || '{}'); }
        catch { return {}; }
    };
    const mailState = safeJSON('mail_state');
    const readState = mailState.readState || {};

    // 玩家是否已经"读过"推荐码邮件（老刘或小周任一）
    const hasReadCode =
        readState.laoliu === 'll-in-4-code' ||
        readState.xiaozhou === 'xz-in-3';

    return {
        mailState: mailState,
        tqchatState: safeJSON('tqchat_state'),
        intranetState: safeJSON('intranet_state'),
        triggers: safeJSON('notebook_triggers'),
        mailCodeReady: safeJSON('mail_code_ready'),
        mailContactUnlocked: safeJSON('mail_contact_unlocked'),
        agreementSigned: localStorage.getItem('agreement_signed') === 'true',
        intranetLogin: localStorage.getItem('intranet_login'),
        dingwenqianLocked: localStorage.getItem('dingwenqian_locked') === 'true',
        tqchatLocked: localStorage.getItem('tqchat_locked') === 'true',
        jobApplyAttempted: localStorage.getItem('job_apply_attempted') === 'true',
        examAnswers: localStorage.getItem('exam_answers'),
        hasReadCode: hasReadCode,
        postEndingMode: localStorage.getItem('post_ending_mode') === 'true'
    };
}