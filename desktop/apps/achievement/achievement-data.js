// ========== 成就系统 · 数据定义与扫描逻辑 ==========
// 本文件是成就系统的唯一数据源，包含：
//   1. ALL_ACHIEVEMENTS —— 25 条成就的定义（含 check 判定函数）
//   2. getAchievementsState / saveAchievementsState —— 状态读写
//   3. scanAchievements —— 扫描并记录新解锁的成就
//
// 引用者：
//   - desktop/js/desktop.js         （桌面加载时调 scanAchievements）
//   - apps/achievement/achievement.js（读取 ALL_ACHIEVEMENTS 渲染）

// ========== 内部工具 ==========
function achRead(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || '{}');
    } catch {
        return {};
    }
}

// ========== 状态读写 ==========
const ACHIEVEMENTS_STATE_KEY = 'achievements_state';

function getAchievementsState() {
    return achRead(ACHIEVEMENTS_STATE_KEY);
}

function saveAchievementsState(state) {
    localStorage.setItem(ACHIEVEMENTS_STATE_KEY, JSON.stringify(state));
}

// ========== 25 条成就定义 ==========
//
// 字段说明：
//   id        唯一标识
//   icon      图标名（对应 achievement.js 里的 ICONS 对象）
//   name      成就名称
//   condition 解锁条件（灰色小字）
//   keyword   关键词（大字，仅主线有；探索 / 结局不写此字段）
//   desc      描述文字
//   check()   判定函数，返回 true / false，必须无副作用

const ALL_ACHIEVEMENTS = [

    // ════════════════════════════════════════════════
    // 主线 12 条
    // ════════════════════════════════════════════════
    {
        id: 'main_start',
        icon: 'target',
        name: '开始旅程',
        condition: '开始游戏',
        keyword: '该点哪里？',
        desc: '你带着一丝迷茫开始这场未知的冒险',
        check: () => localStorage.getItem('game_started') === 'true'
    },
    {
        id: 'main_anniversary',
        icon: 'ring',
        name: '纪念日',
        condition: '使用结婚纪念日登录韩休邮箱',
        keyword: '2022.08.03',
        desc: '你用最重要的日子当做密码，但重要的人已经不在了',
        check: () => achRead('mail_state').loggedIn === 'hanxiu'
    },
    {
        id: 'main_sign',
        icon: 'signature',
        name: '签署协议',
        condition: '签署遗体处理同意书',
        keyword: '同意',
        desc: '你把她的后事和你们的爱情，一并交给了天启科技',
        check: () => localStorage.getItem('agreement_signed') === 'true'
    },
    {
        id: 'main_truth',
        icon: 'eye',
        name: '唯有真相',
        condition: '登录丁文倩的员工后台',
        keyword: 'Only Truth',
        desc: '找到她的信条，进入她的世界',
        check: () => !!localStorage.getItem('intranet_login')
    },
    {
        id: 'main_archive',
        icon: 'folder',
        name: '云室档案',
        condition: '进入物理研究部云数据中心',
        keyword: 'φ 能量',
        desc: '你推开了那扇门，触碰她穷尽一切追寻的目标',
        check: () => achRead('intranet_state').physicsFolderUnlocked === true
    },
    {
        id: 'main_echo',
        icon: 'waveform',
        name: '通讯回声',
        condition: '恢复所有天启通聊天记录',
        keyword: '丁教授，在吗？',
        desc: '你用一条条聊天记录，拼出了她没对你提起的另一半人生',
        check: () => {
            const imported = achRead('tqchat_state').importedContacts || [];
            return ['luojianli', 'shenman', 'wunianqing'].every(id => imported.includes(id));
        }
    },
    {
        id: 'main_key',
        icon: 'key',
        name: '祝福密钥',
        condition: '解码异常数据，打开事故报告',
        keyword: 'Happy Birthday',
        desc: '她为你留下的祝福，成了你接近真相的钥匙',
        check: () => localStorage.getItem('dingwenqian_locked') === 'true'
    },
    {
        id: 'main_farewell',
        icon: 'voice',
        name: '迟来的告别',
        condition: '听完丁文倩的录音邮件',
        keyword: '休，对不起',
        desc: '最后一封信，她劝你停下，可你已经无法回头',
        check: () => !!localStorage.getItem('dwq_audio_opened_time')
    },
    {
        id: 'main_referral',
        icon: 'ticket',
        name: '引荐入局',
        condition: '得到任一推荐码',
        keyword: '内推名额',
        desc: '你拿到入场的门票，自愿成为局中的棋子',
        check: () => {
            const r = achRead('mail_state').readState || {};
            return r.laoliu === 'll-in-4-code' || r.xiaozhou === 'xz-in-3';
        }
    },
    {
        id: 'main_quiz',
        icon: 'quiz',
        name: '灵魂答卷',
        condition: '完成笔试题目，走到最终抉择',
        keyword: '开始测试',
        desc: '你以为的入职测试，其实是一场无声的审讯',
        check: () => !!localStorage.getItem('exam_first_result')
    },
    {
        id: 'main_explorer',
        icon: 'hexagon',
        name: '天启探索者',
        condition: '通过最终测试',
        keyword: '欢迎加入天启科技',
        desc: '棺木内空无一物，你知道，她在等你',
        check: () => achRead('endings_unlocked').end05 === true
    },
    {
        id: 'main_continue',
        icon: 'gate',
        name: '继续前行',
        condition: '选择继续前行',
        keyword: '水牢',
        keywordLink: '../../../ending/prelude-watercell.html?review=true',
        desc: '前路并非坦途，可你依旧决然启程',
        check: () => localStorage.getItem('watercell_visited') === 'true'
    },

    // ════════════════════════════════════════════════
    // 探索 9 条
    // ════════════════════════════════════════════════
    {
        id: 'explore_mail',
        icon: 'mailbox',
        name: '邮件普查员',
        condition: '阅读完邮箱中所有历史邮件',
        desc: '收件箱被你翻了个底朝天，陈年旧讯无一遗漏',
        check: () => {
            const seen = achRead('explore_seen').mails || [];
            const initialThreads = [
                'tianqi', 'xiyan', 'xiyan-title', 'lizhiming',
                'xingtu', 'wangrui', 'chenguoliang', 'life-energy'
            ];
            return initialThreads.every(k => seen.includes(k));
        }
    },
    {
        id: 'explore_photo',
        icon: 'photo',
        name: '鉴影达人',
        condition: '打开桌面上所有的照片',
        desc: '细细审视每张照片，细节捕捉能力已达像素级',
        check: () => {
            const seen = achRead('explore_seen').photos || [];
            const target = [
                'photo-marry-01', 'photo-marry-02', 'photo-marry-03',
                'photo-marry-04', 'photo-marry-05', 'photo-hanxiu'
            ];
            return target.every(id => seen.includes(id));
        }
    },
    {
        id: 'explore_news',
        icon: 'news',
        name: '天启侧写人',
        condition: '阅读完天启科技官网的全部新闻',
        desc: '全面掌握天启公开动态，宣传口径烂熟于心',
        check: () => {
            const seen = achRead('explore_seen').news || [];
            const target = [
                'news01', 'news02', 'news03', 'news04', 'news05',
                'news06', 'news07', 'news08', 'news09'
            ];
            return target.every(id => seen.includes(id));
        }
    },
    {
        id: 'explore_intel',
        icon: 'radar',
        name: '情报专家',
        condition: '阅读完网络上关于天启科技的消息',
        desc: '不轻易放过任何消息，情报能力堪称一流',
        check: () => {
            const seen = achRead('explore_seen').webpages || [];
            const target = [
                'accident', 'geds', 'interview',
                '3questions', 'list', 'job'
            ];
            return target.every(id => seen.includes(id));
        }
    },
    {
        id: 'explore_projects',
        icon: 'archive',
        name: '天启探秘者',
        condition: '阅读完天启计划项目计划书',
        desc: '览遍核心项目档案，天启计划了然于胸',
        check: () => {
            const seen = achRead('explore_seen').projects || [];
            const target = ['south-africa', 'polar', 'phi-research'];
            return target.every(id => seen.includes(id));
        }
    },
    {
        id: 'explore_scholar',
        icon: 'book',
        name: '顶级学者',
        condition: '花大量时间阅读文献',
        desc: '啃完核心文献，已成为 φ 能量领域顶级专家',
        check: () => {
            const seen = achRead('explore_seen').papers || [];
            const target = ['phi-energy-storage', 'entity-overview', 'chronicle'];
            return target.every(id => seen.includes(id));
        }
    },
    {
        id: 'explore_social',
        icon: 'chat',
        name: '社交达人',
        condition: '分别给能源老刘和周小舟发送过邮件',
        desc: '双线并行，主动出击，堪称西延人脉王',
        check: () => {
            const t = achRead('mail_state').threads || {};
            return t.laoliu?.sent === true && t.xiaozhou?.sent === true;
        }
    },
    {
        id: 'explore_negotiator',
        icon: 'handshake',
        name: '谈判专家',
        condition: '获得能源老刘和周小舟两个人的推荐码',
        desc: '获得双份推荐码，话术专业情商超高',
        check: () => {
            const r = achRead('mail_state').readState || {};
            return r.laoliu === 'll-in-4-code' && r.xiaozhou === 'xz-in-3';
        }
    },
    {
        id: 'explore_exam',
        icon: 'check',
        name: '天启做题家',
        condition: '第一次测试就通过',
        desc: '评估一次性通过，智商实力均已超过作者 99%',
        check: () => localStorage.getItem('exam_first_result') === 'true'
    },

    // ════════════════════════════════════════════════
    // 结局 6 条
    // ════════════════════════════════════════════════
    {
        id: 'ending_01',
        icon: 'coffin',
        name: '平凡的一生',
        desc: '你选择了退场，让她的离开成为唯一的答案',
        reviewUrl: '../../../ending/e1ordinary.html?review=end01',
        check: () => achRead('endings_unlocked').end01 === true
    },
    {
        id: 'ending_02',
        icon: 'magnifier',
        name: '不谨慎的侦探',
        desc: '你触碰了不该触碰的边界，被他们发现了',
        reviewUrl: '../../../ending/e2detective.html?review=end02',
        check: () => achRead('endings_unlocked').end02 === true
    },
    {
        id: 'ending_03',
        icon: 'chain',
        name: '听话的丈夫',
        desc: '你听了她的话，按她说的做，活成了她希望你活的样子',
        reviewUrl: '../../../ending/e3funeral.html?review=end03',
        check: () => achRead('endings_unlocked').end03 === true
    },
    {
        id: 'ending_04',
        icon: 'loop',
        name: '没有终点的调查',
        desc: '你看见了真相的一角，却永远走不到尽头',
        reviewUrl: '../../../ending/e3funeral.html?review=end04',
        check: () => achRead('endings_unlocked').end04 === true
    },
    {
        id: 'ending_05',
        icon: 'path',
        name: '通往真相的路',
        desc: '你走上了那条路，代价是再也无法回头',
        reviewUrl: '../../../ending/e3funeral.html?review=end05',
        check: () => achRead('endings_unlocked').end05 === true
    },
    {
        id: 'ending_all',
        icon: 'all',
        name: '遍尝终局',
        desc: '你见证了所有可能的结局，看清了每一种选择的重量',
        check: () => {
            const e = achRead('endings_unlocked');
            return e.end01 === true && e.end02 === true && e.end03 === true
                && e.end04 === true && e.end05 === true;
        }
    }
];

// ========== 扫描并记录新解锁的成就 ==========
// 幂等：已解锁的跳过，只做补充，不删除
function scanAchievements() {
    const state = getAchievementsState();
    const unlocked = new Set(state.unlocked || []);
    let changed = false;

    ALL_ACHIEVEMENTS.forEach(def => {
        if (unlocked.has(def.id)) return;
        if (def.check()) {
            unlocked.add(def.id);
            changed = true;
        }
    });

    if (changed) {
        state.unlocked = [...unlocked];
        saveAchievementsState(state);
    }
}

// ========== 暴露给其他文件 ==========
window.ALL_ACHIEVEMENTS = ALL_ACHIEVEMENTS;
window.scanAchievements = scanAchievements;
window.getAchievementsState = getAchievementsState;
window.saveAchievementsState = saveAchievementsState;