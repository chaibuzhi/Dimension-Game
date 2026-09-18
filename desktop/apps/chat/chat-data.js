// ========== 天启通数据 ==========

// ========== 可调参数 ==========
// 神秘人对话结束后，锁定天启通的延时（毫秒）
const TQCHAT_LOCK_DELAY = 4000; // 测试用 5 秒，正式可调长

// ========== 当前登录用户（丁文倩） ==========
const currentUserProfile = {
    id: 'dingwenqian',
    name: '丁文倩',
    role: '物理研究部总监',
    empId: 'TQ-PHY-DWQ-A09',
    avatarImg: '../../../tianqi/image/bar/bar_dwq.webp',
    avatarText: '丁'
};

// 联系人列表
const chatContacts = [
    { id: 'notice',     name: '通知',     icon: '📢', avatarImg: null, type: 'system',  unlocked: true,  hasUnread: false, role: '系统消息' },
    { id: 'mystery',    name: '匿名',     icon: '⬡', avatarImg: null, type: 'mystery', unlocked: false, hasUnread: false, role: '未知' },
    { id: 'luojianli',  name: '罗建立',   icon: '👔', avatarImg: '../../../tianqi/image/bar/bar_ljl.webp', type: 'person',  unlocked: false, hasUnread: false, role: '首席运营官', empId: 'TQ-OFC-LJL-A05' },
    { id: 'shenman',    name: '沈曼',     icon: '🔬', avatarImg: '../../../tianqi/image/bar/bar_sm.webp',  type: 'person',  unlocked: false, hasUnread: false, role: '材料实验部', empId: 'TQ-MAT-SM-A16' },
    { id: 'wunianqing', name: '吴念清',   icon: '📋', avatarImg: '../../../tianqi/image/bar/bar_wnq.webp', type: 'person',  unlocked: false, hasUnread: false, role: '人力资源部', empId: 'TQ-HR-WNQ-C07' },
    { id: 'hexu',       name: '何旭',     icon: '🛡️', avatarImg: '../../../tianqi/image/bar/bar_hx.webp',  type: 'person',  unlocked: true,  hasUnread: false, role: '安全合规部' },
    { id: 'liumang',    name: '刘忙',     icon: '🔮', avatarImg: '../../../tianqi/image/bar/bar_lm.webp',  type: 'person',  unlocked: true,  hasUnread: false, role: '数据监测部' },
    { id: 'shidong',    name: '石冬',     icon: '⛰️', avatarImg: '../../../tianqi/image/bar/bar_sd.webp',  type: 'person',  unlocked: true,  hasUnread: false, role: '勘探行动部' }
];

// ========== 聊天消息 ==========
const chatMessages = {
    notice: [
        {
            id: 'notice-1',
            date: '2026-06-23',
            sender: 'system',
            type: 'card',
            title: '欢迎使用天启通',
            text: '本应用为内部通讯工具，聊天记录均受公司安全合规部监管'
        },
        {
            id: 'notice-2',
            date: '2026-07-18',
            sender: 'system',
            type: 'card',
            title: '通讯记录恢复指引',
            text: '本应用处于内测阶段，如通讯记录恢复失败，可尝试用以下方式手动恢复：\n<span class="notice-highlight">[ 1 ]</span> 点击搜索框右侧的 <span class="notice-highlight">[＋]</span> 按钮\n<span class="notice-highlight">[ 2 ]</span> 选择 <span class="notice-highlight">[ 同步记录 ]</span>\n<span class="notice-highlight">[ 3 ]</span> 输入您需要恢复记录的员工工号，例如：\n<span class="notice-highlight"> [ 人力资源部 吴念清 ] 则输入 TQ-HR-WNQ-C07 点击确定</span>'
        },
        {
            id: 'notice-friend-request',
            date: '2026-07-18',
            sender: 'system',
            type: 'friend-request',
            title: '',
            text: ''
        }        
    ],
    hexu: [
        { date: '2026-01-02', time: '10:17', sender: 'them', text: '丁教授，数据中心升级已完成' },
        { date: '2026-01-02', sender: 'them', text: '物理研究部的初始密码：TQ-PHY@#9xKp2Lm，请尽快修改' },        
        { date: '2026-01-02', sender: 'me', text: '收到，已修改' },
        { date: '2026-01-02', sender: 'them', text: '您记得与材料实验部沈曼总监同步，二位部门的资料需要互通' },
        { date: '2026-01-02', sender: 'me', text: '👌' },

        { date: '2026-03-17', time: '09:42', sender: 'them', text: '丁教授，遵照罗总指示，您的员工系统权限已调整为最高级' },
        { date: '2026-03-17', sender: 'them', text: '罗总为您配备了个人专属 masterkey，可绕过密码，访问公司后台系统的全部加密文件' },
        { date: '2026-03-17', sender: 'them', text: 'masterkey 将由罗总本人直接下发给您，请注意查收' },
        { date: '2026-03-17', sender: 'me', text: '知道了，谢谢' },

        { date: '2026-06-19', time: '07:02', sender: 'them', text: '丁教授，打扰了' },
        { date: '2026-06-19', sender: 'them', text: '在近期资料审查中，我们发现有物理研究部的部分文档被植入了异常数据，您的论文也在其中' },
        { date: '2026-06-19', sender: 'them', text: '想核实一下，您是否了解相关情况？' },
        { date: '2026-06-19', sender: 'me', text: '和实验数据有关吗？' },
        { date: '2026-06-19', sender: 'me', text: '我不太清楚' },
        { date: '2026-06-19', sender: 'them', text: '好的，目前安全合规部已开始调查。如果您有相关发现，请及时上报' },
        { date: '2026-06-19', sender: 'me', text: '👌' }
    ],
    shidong: [
        { date: '2026-03-16', time: '18:42', sender: 'me', text: '石队，麻烦把南非行动的资料和计划书发我一下' },
        { date: '2026-03-16', sender: 'them', text: '丁教授，你真的要带队？' },
        { date: '2026-03-16', sender: 'them', text: '勘探可不是坐在实验室里写报告' },
        { date: '2026-03-16', sender: 'me', text: '我知道，我会尽快熟悉流程' },
        { date: '2026-03-16', sender: 'them', text: '你没接受过户外作业训练，也没接触过目标采集流程，这些不是看几页计划书就能学会的' },
        { date: '2026-03-16', sender: 'them', text: '我不知道老大怎么想的，但我知道目标有多危险。你真的要当南非行动的领队吗？' },
        { date: '2026-03-16', sender: 'me', text: '石队，公司既然让我带队，我们就得合作，希望你能配合' },
        { date: '2026-03-16', sender: 'them', text: '我没别的意思，只是提醒你，一线没有容错率' },
        { date: '2026-03-16', sender: 'them', text: '资料我会发你邮箱' },
        { date: '2026-03-16', sender: 'them', text: '还有，请你按时参加前置训练，体能、安全、采集都不能落下' },
        { date: '2026-03-16', sender: 'me', text: '好，我知道了' },

        { date: '2026-03-30', time: '18:07', sender: 'them', text: '丁教授，这周三次训练你缺席了两次' },
        { date: '2026-03-30', sender: 'me', text: '抱歉石队，GEDS峰会的报告赶得紧，实在没来得及' },
        { date: '2026-03-30', sender: 'them', text: '报告多可以不当领队既然当了，就要有领队的样子' },
        { date: '2026-03-30', sender: 'me', text: '我知道了，后续训练不会缺席' },

        { date: '2026-04-18', time: '17:29', sender: 'them', text: '丁教授，今天会上我说得很清楚，我不赞成行动提前' },
        { date: '2026-04-18', sender: 'me', text: '时间提前目前只是意向，还没确定' },
        { date: '2026-04-18', sender: 'them', text: '钟明远都说了现在采集设备不达标，你会上不反对，还说帮他协调资源，等于把压力全甩给了工程部' },
        { date: '2026-04-18', sender: 'me', text: '我是想帮工程部解决问题' },
        { date: '2026-04-18', sender: 'them', text: '勘探行动采集目标是有标准流程的' },
        { date: '2026-04-18', sender: 'them', text: '前置训练、安全部署、设备校验、路线勘测、现场采样，每一步都要时间' },
        { date: '2026-04-18', sender: 'them', text: '现在压缩时间，流程就会缩水，哪一环出问题，都是要命的' },
        { date: '2026-04-18', sender: 'them', text: '目标周围的强电磁场会干扰采集设备。前期调试不到位，设备一旦失灵，可能直接导致目标解体' },
        { date: '2026-04-18', sender: 'them', text: '它释放的能量有多强，破坏力有多大，是按你四年前的论文计算的。会造成什么后果，你比我清楚' },
        { date: '2026-04-18', sender: 'me', text: '石队，任务总要推进的，你有什么更稳妥的方案？' },
        { date: '2026-04-18', sender: 'them', text: '我的方案就不能提前。要安全、要成功，该花的时间一天都不能少' },
        { date: '2026-04-18', sender: 'them', text: '丁教授，你是领队，你要知道，为你执行任务的都是活生生的人！' },

        { date: '2026-04-28', time: '10:25', sender: 'them', text: '【南非行动四月进度简报】\n- 采样设备：第三代采样设备系统核心模块良率低于预期，12台采集设备，目前仅1台通过测试\n- 训练情况：勘探训练进入第二阶段，队员平均达标率72%' },
        { date: '2026-04-28', sender: 'me', text: '收到' },
        { date: '2026-04-28', sender: 'me', text: '需要实验部或者研究部配合的话，随时提' },
        { date: '2026-04-28', sender: 'them', text: '不用' },

        { date: '2026-05-04', time: '11:12', sender: 'me', text: '石队，南非的数据很不稳定，可能等不到9月了' },
        { date: '2026-05-04', sender: 'me', text: '根据现在进度，你评估一下，如果行动提前，能提前多久？' },
        { date: '2026-05-04', sender: 'them', text: '按现在设备合格率和训练进度，没法提前' },
        { date: '2026-05-04', sender: 'me', text: '罗总的意思是不能错过窗口期' },
        { date: '2026-05-04', sender: 'them', text: '既然你跟老大都决定了，还问我干嘛？' },
        { date: '2026-05-04', sender: 'me', text: '石队，我是来跟你商量的，需要你的专业意见' },
        { date: '2026-05-04', sender: 'them', text: '这不是商量，是通知' },
        { date: '2026-05-04', sender: 'them', text: '我的判断是不行，有意义吗？' },
        { date: '2026-05-04', sender: 'them', text: '你们定好了就发通知，不用在这浪费时间' },
        { date: '2026-05-04', sender: 'me', text: '石冬，你能不能好好说话？' },
        { date: '2026-05-04', sender: 'me', text: '我已经尽力尊重你的意见了，我知道你不信任我，但这个领队也不是我要当的' },
        { date: '2026-05-04', sender: 'them', text: '丁文倩，你亲眼见过目标吗？' },
        { date: '2026-05-04', sender: 'them', text: '在你眼里，它是清洁能源，是学术成果' },
        { date: '2026-05-04', sender: 'them', text: '我见到的是怪物。它解体释放的能量，瞬间就能把人内脏震碎，人在它面前毫无招架之力' },
        { date: '2026-05-04', sender: 'them', text: '你和老大眼里只有任务和目标' },
        { date: '2026-05-04', sender: 'them', text: '你们不知道，设备没调好、训练不到位、采集有误差，都会让所有人死在那' },
        { date: '2026-05-04', sender: 'them', text: '你们可以只要结果，我得对人命负责' },
        { date: '2026-05-04', sender: 'me', text: '石冬，出了事，我也跑不掉' },
        { date: '2026-05-04', sender: 'me', text: '找到了目标，我和你都会站在最面' },
        { date: '2026-05-04', sender: 'me', text: '我跟你一样，想确保行动安全但时间不等人，我们得拿出方案，把风险控制到最小' },
        { date: '2026-05-04', sender: 'them', text: '希望你记住这句话' },
        { date: '2026-05-04', sender: 'me', text: '我先去和工程技术部沟通，具体方案今晚开会定' },

        { date: '2026-05-15', time: '10:06', sender: 'them', text: '【南非行动五月进度简报】\n- 采样设备：第三代采样设备核心模块良率依旧不佳，正在调试中，12台设备，3台通过测试\n- 训练进度：勘探训练进入第三阶段，队员平均达标率84%' },
        { date: '2026-05-15', sender: 'me', text: '知道了' },

        { date: '2026-05-21', time: '12:46', sender: 'them', text: '丁教授，在忙吗？' },
        { date: '2026-05-21', sender: 'them', text: '我有事想跟你说' },
        { date: '2026-05-21', sender: 'me', text: '怎么了，你说' },
        { date: '2026-05-21', sender: 'them', text: '之前是我态度不好，你别往心里去。后续行动我会全力配合' },
        { date: '2026-05-21', sender: 'me', text: '？？？' },
        { date: '2026-05-21', sender: 'me', text: '怎么突然说这个？' },
        { date: '2026-05-21', sender: 'them', text: '我昨天去找了老大，跟他吵了一架，他把我轰出来了' },
        { date: '2026-05-21', sender: 'them', text: '我才知道，很多事你私下跟他争取过，但没拗过他，也没告诉我' },
        { date: '2026-05-21', sender: 'me', text: '哈哈，不是你说的吗，领队就要有领队的样子' },
        { date: '2026-05-21', sender: 'them', text: '是我误会你了，你跟老大不一样' },
        { date: '2026-05-21', sender: 'me', text: '听石队说这话还真不习惯😁' },
        { date: '2026-05-21', sender: 'them', text: '极地行动的安排老大跟我交了底，我会配合你推进，资料稍后发你邮箱' },
        { date: '2026-05-21', sender: 'them', text: '有事随时找我' },

        { date: '2026-06-01', time: '14:42', sender: 'me', text: '石队，罗总想把南非行动提前到月底' },
        { date: '2026-06-01', sender: 'me', text: '时间很紧，你看怎么安排？' },
        { date: '2026-06-01', sender: 'them', text: '老大已经通知我了。根据工程部的测算，月底最多只有6台采集设备能达标，应急预案我会同步更新，稍晚发你' },
        { date: '2026-06-01', sender: 'them', text: '我正和副队开会碰加急训练的方案' },
        { date: '2026-06-01', sender: 'them', text: '现在时间压到极限，计划6月15到25号在罗布泊基地进行最后冲刺集训，你必须到场' },
        { date: '2026-06-01', sender: 'me', text: '好，我安排一下时间' }
    ],
    liumang: [
        { date: '2026-03-09', time: '11:26', sender: 'them', text: '老丁，听说你搞出大成果了！' },
        { date: '2026-03-09', sender: 'them', text: '罗建立跟我说你交了份报告，结论能震动整个业界' },
        { date: '2026-03-09', sender: 'them', text: '但他就是不给我看，说还在评估，等过了内审我可得好好拜读一下' },
        { date: '2026-03-09', sender: 'me', text: '刘博士消息真灵通啊' },
        { date: '2026-03-09', sender: 'them', text: '我就知道你早晚要搞个大的' },
        { date: '2026-03-09', sender: 'them', text: '你22年那篇论文，直接搭起了φ能量研究的基础框架，这次肯定更了不得' },
        { date: '2026-03-09', sender: 'me', text: '别捧杀了，报告刚交上去，罗总就布置作业了' },
        { date: '2026-03-09', sender: 'them', text: '讲真的，老丁！为你高兴！' },

        { date: '2026-03-20', time: '13:17', sender: 'them', text: '老丁，罗建立怎么让你去南非当领队？！' },
        { date: '2026-03-20', sender: 'them', text: '让物理研究部一把手去一线勘探？搞什么名堂！' },
        { date: '2026-03-20', sender: 'me', text: '哈哈，就当公费旅游了' },
        { date: '2026-03-20', sender: 'them', text: '少跟我打哈哈，罗建立给你什么好处了？' },
        { date: '2026-03-20', sender: 'me', text: 'masterkey' },
        { date: '2026-03-20', sender: 'them', text: '他算盘珠子都蹦你脸上了' },
        { date: '2026-03-20', sender: 'me', text: '😝' },
        { date: '2026-03-20', sender: 'them', text: '不过南非的数据很好，机会难得要是能找到目标，你这么多年的心血，也算没白费' },
        { date: '2026-03-20', sender: 'them', text: '不过目标有多危险，你心里有数，要小心啊' },
        { date: '2026-03-20', sender: 'me', text: '我知道' },
        { date: '2026-03-20', sender: 'me', text: '不过石冬好像情绪不太好' },
        { date: '2026-03-20', sender: 'them', text: '她是人直嘴笨，没坏心思，回头我跟她说说' },
        { date: '2026-03-20', sender: 'me', text: '那就麻烦刘博士啦，我去赶GEDS峰会的报告了' },
        { date: '2026-03-20', sender: 'them', text: '又当领队，又搞研究，他不该叫罗建立，要叫罗扒皮' },

        { date: '2026-05-04', time: '10:48', sender: 'them', text: '老丁，数据报告你看了没？' },
        { date: '2026-05-04', sender: 'me', text: '还没，我现在看' },
        { date: '2026-05-04', sender: 'them', text: '南非的能量指数爆发式增长，已经蹿到历史最高值了' },
        { date: '2026-05-04', sender: 'me', text: '你判断目标可能已经出现了？' },
        { date: '2026-05-04', sender: 'them', text: '很有可能，按这个增速，窗口期会非常短，等不到9月了我刚把报告发给老罗，他应该会找你' },
        { date: '2026-05-04', sender: 'me', text: '我现在就去找他' },
        { date: '2026-05-04', sender: 'them', text: '你注意点，别他一张嘴你就答应' },
        { date: '2026-05-04', sender: 'them', text: '南非那边条件复杂，来不及就别硬上，准备充分，安全第一' },

        { date: '2026-05-19', time: '12:05', sender: 'them', text: '老丁，昨天峰会的情况我知道了，你还好吧' },
        { date: '2026-05-19', sender: 'me', text: '我没事，有预期' },
        { date: '2026-05-19', sender: 'them', text: '那么高调的报告口径，肯定不是你的意思' },
        { date: '2026-05-19', sender: 'them', text: '你听我一句，罗建立心里只有公司，你心里得有自己' },
        { date: '2026-05-19', sender: 'them', text: '别把自己逼太紧，你还有家庭' },
        { date: '2026-05-19', sender: 'me', text: '放心吧，我有数' },

        { date: '2026-05-22', time: '15:05', sender: 'them', text: '丁文倩！极地行动你也要上？' },
        { date: '2026-05-22', sender: 'me', text: '嗯，通知已经发了' },
        { date: '2026-05-22', sender: 'them', text: '南非还没动身，又接极地，你到底是怎么想的？' },
        { date: '2026-05-22', sender: 'me', text: '我一个打工人，服从安排而已😄' },
        { date: '2026-05-22', sender: 'them', text: '老丁，你跟我说实话，是不是被罗建立逼你的？' },
        { date: '2026-05-22', sender: 'them', text: '他又收买你了？' },
        { date: '2026-05-22', sender: 'them', text: '丁文倩？' },
        { date: '2026-05-22', sender: 'me', text: '没你想的那么复杂' },
        { date: '2026-05-22', sender: 'them', text: '我们认识这么多年了，你最近很不对劲，一直被罗建立牵着鼻子走' },
        { date: '2026-05-22', sender: 'them', text: '你是不是有事瞒着我？' },
        { date: '2026-05-22', sender: 'me', text: '老刘，我知道你是关心我，我知道自己在做什么' },
        { date: '2026-05-22', sender: 'them', text: '老丁，你是一心奔着目标去的，但罗建立不一定，他是个商人' },
        { date: '2026-05-22', sender: 'them', text: '如果他对南非行动有什么特别的计划，你一定要告诉石冬，她才是在一线保护你的人' },
        { date: '2026-05-22', sender: 'me', text: '好' },

        { date: '2026-06-10', time: '12:08', sender: 'them', text: '听石冬说你要过来集训了？' },
        { date: '2026-06-10', sender: 'me', text: '嗯，15号到' },
        { date: '2026-06-10', sender: 'them', text: '准备得怎么样了？' },
        { date: '2026-06-10', sender: 'me', text: '石冬在，很放心' },
        { date: '2026-06-10', sender: 'them', text: '南非这次时间太紧了，我本来还压几天，但数据确实不等人' },
        { date: '2026-06-10', sender: 'them', text: '丁文倩，罗建立坚持让你当领队、把时间一次次提前，都是因为三月你交的那份报告吧' },
        { date: '2026-06-10', sender: 'them', text: '你不用回答我，无论罗建立对你有什么安排，你答应还是拒绝，我只想你顺顺利利的去，平平安安的回' },
        { date: '2026-06-10', sender: 'me', text: '老刘，我知道你在担心什么' },
        { date: '2026-06-10', sender: 'me', text: '罗总有他的想法，我也有我的私心' },
        { date: '2026-06-10', sender: 'me', text: '拿到 masterkey 以后，我把近三十年的保密实验、勘探记录都翻了一遍，包括许远峰教授的论文' },
        { date: '2026-06-10', sender: 'me', text: '我感觉，我已经很接近真相了' },
        { date: '2026-06-10', sender: 'them', text: '在人类未知的领域，你接近的真相，有时候是真理，有时候是灭亡' },
        { date: '2026-06-10', sender: 'them', text: '丁文倩，不管你研究出了什么了不得的东西，你要记得，不要成为第二个许远峰！' },
        { date: '2026-06-10', sender: 'me', text: '我知道，放心吧😊' },

        { date: '2026-06-30', time: '07:01', sender: 'them', text: '老丁，一路顺风' }
    ],
    wunianqing: [
        { date: '2026-05-22', time: '14:36', sender: 'me', text: '吴主管，麻烦你个事，物理研究部要新增一个岗位' },
        { date: '2026-05-22', sender: 'them', text: '丁教授，什么岗位？' },
        { date: '2026-05-22', sender: 'me', text: '总监B角' },
        { date: '2026-05-22', sender: 'them', text: '这个岗位之前没设过，是出什么事了吗？' },
        { date: '2026-05-22', sender: 'me', text: '没事，就是最近太忙了，我实在顾不过来' },
        { date: '2026-05-22', sender: 'me', text: '已经跟罗总沟通过，他同意了' },
        { date: '2026-05-22', sender: 'them', text: '我刚看通知，极地勘探也是您牵头，确实该添个副手了' },
        { date: '2026-05-22', sender: 'them', text: '我马上拟一版JD发您确认' },
        { date: '2026-05-22', sender: 'me', text: '不用了，就按物理研究部总监的同等级别标准来就行' },
        { date: '2026-05-22', sender: 'them', text: '明白，那您什么时候方便面试？' },
        { date: '2026-05-22', sender: 'me', text: '我都行，越快越好' },
        { date: '2026-05-22', sender: 'me', text: '对了，这个岗位后续和材料试验部协作很多，面试叫上沈总监一起把把关' },
        { date: '2026-05-22', sender: 'them', text: '好的，沈曼总监的工号是TQ-MAT-SM-A16，我同步备案，马上发起流程' },
        { date: '2026-05-22', sender: 'me', text: '辛苦你了，念清' },
        { date: '2026-05-22', sender: 'them', text: '客气什么，您多注意身体，别熬太狠！' },
        { date: '2026-05-22', sender: 'me', text: '好，谢谢' }
    ],
    shenman: [
        { date: '2026-01-02', time: '10:35', sender: 'me', text: '沈曼，数据中心物理研究部的密码我改了，和你同步' },
        { date: '2026-01-02', sender: 'me', text: '密码是：phi@+我们重大发现的日子' },
        { date: '2026-01-02', sender: 'them', text: '哈哈，秒懂了，谢谢丁教授' },

        { date: '2026-01-16', time: '15:44', sender: 'them', text: '文倩，第三实验组刚报了个异常' },
        { date: '2026-01-16', sender: 'them', text: '热激过后水体样本里的φ能量出现了激增，可能和储能机制有关！' },
        {
            date: '2026-01-16',
            sender: 'them',
            type: 'file',
            fileName: '《φ能量相变实验-第18轮-异常能量记录.data》',
            fileSize: '4.2 MB',
            fileKey: 'expired'
        },
        { date: '2026-01-16', sender: 'me', text: '我看看' },
        { date: '2026-01-16', sender: 'them', text: '我让他们重新跑了三次，趋势一致，不像是仪器漂移' },
        { date: '2026-01-16', sender: 'me', text: '你在实验室吗？' },
        { date: '2026-01-16', sender: 'them', text: '在' },
        { date: '2026-01-16', sender: 'me', text: '我马上过来' },

        { date: '2026-02-10', time: '20:53', sender: 'them', text: '文倩，能量激增复现实验做完了，跑了九轮，结果很稳！' },
        { date: '2026-02-10', sender: 'them', text: '应该能印证φ能量的储能与释放原理' },
        { date: '2026-02-10', sender: 'them', text: '还有一个大发现！' },
        { date: '2026-02-10', sender: 'them', text: '激增的曲线，和你那篇《φ能量起源假说》的推导曲线重合度很高！' },
        {
            date: '2026-02-10',
            sender: 'them',
            type: 'file',
            fileName: '《能量激增复现实验-第9轮-能谱对比.data》',
            fileSize: '6.8 MB',
            fileKey: 'expired'
        },
        { date: '2026-02-10', sender: 'me', text: '关键数值校准过吗？' },
        { date: '2026-02-10', sender: 'them', text: '校准了，误差在允许范围内' },
        { date: '2026-02-10', sender: 'me', text: '空白对照组呢？' },
        { date: '2026-02-10', sender: 'them', text: '同步跑了，污染和误差都已经排除了，你的推导可以被证实了！' },
        { date: '2026-02-10', sender: 'me', text: '我现在过去' },

        { date: '2026-03-07', time: '16:24', sender: 'me', text: '我刚刚把初步的报告发给罗总了' },
        { date: '2026-03-07', sender: 'them', text: '他怎么说？' },
        { date: '2026-03-07', sender: 'me', text: '这会是今年公司研究的战略方向' },
        { date: '2026-03-07', sender: 'them', text: '👍👍👍' },
        { date: '2026-03-07', sender: 'them', text: '之前你提出那篇假说的时候，他们都觉得太超前。这下好了，我们用实验证明了它！' },
        { date: '2026-03-07', sender: 'them', text: '这次比22年的发现还重磅，不仅会重新定义φ能量的研究方向，甚至会颠覆世界对φ能量和目标的认知' },
        { date: '2026-03-07', sender: 'me', text: '哈哈，别光顾着乐了，罗总布置作业了' },
        { date: '2026-03-07', sender: 'me', text: '你整理一份阶段性实验观察报告，我来把报告扩成专题稿，罗总想在5月的全球能源发展峰会上发布' },
        { date: '2026-03-07', sender: 'them', text: '遵命，丁教授' },
        { date: '2026-03-07', sender: 'them', text: '🎉🎉🎉🎉🎉🎉' },

        { date: '2026-03-16', time: '19:13', sender: 'them', text: '文倩，刚看到通知，南非行动领队换成你了？' },
        { date: '2026-03-16', sender: 'me', text: '嗯，公司看了我们的报告，觉得这次行动研究部得在场' },
        { date: '2026-03-16', sender: 'them', text: '可那都是无人区，目标危险又不稳定，你能行吗？' },
        { date: '2026-03-16', sender: 'me', text: '有石队在，没事的' },
        { date: '2026-03-16', sender: 'them', text: '我们研究目标这么多年，要是能采集到样本，就能验证核心理论了！' },
        { date: '2026-03-16', sender: 'me', text: '别高兴得太早，能不能找到还不好说' },
        { date: '2026-03-16', sender: 'them', text: '丁队长出马，肯定没问题！' },
        { date: '2026-03-16', sender: 'me', text: '哈哈，那就借沈总监吉言了' },

        { date: '2026-03-25', time: '21:39', sender: 'them', text: '文倩，峰会报告要的配套数据整理好了，发你邮箱了' },
        { date: '2026-03-25', sender: 'me', text: '谢谢' },
        { date: '2026-03-25', sender: 'them', text: '看你这阵子连轴转，带团队开会、赶报告，还要挤时间去训练，别熬太狠了' },
        { date: '2026-03-25', sender: 'them', text: '我买了冰美式和烟熏三文鱼，一会儿给你送过去' },
        { date: '2026-03-25', sender: 'me', text: '谢谢曼曼❤️' },
        { date: '2026-03-25', sender: 'me', text: '报告初稿你看了吗，怎么样？' },
        { date: '2026-03-25', sender: 'them', text: '挺好的，只放了阶段性的结论，没把底牌全亮出来，既有成果，又不激进，挑不出毛病' },
        { date: '2026-03-25', sender: 'me', text: '这次的发现太颠覆了，全部公开，业界怕是难以接受' },
        { date: '2026-03-25', sender: 'them', text: '丁教授深谋远虑！👍' },
        { date: '2026-03-25', sender: 'me', text: '好饿，你还有多久到' },
        { date: '2026-03-25', sender: 'them', text: '十分钟' },

        { date: '2026-04-30', time: '20:22', sender: 'them', text: '文倩，新稿子的补充数据发邮箱了，注意查收' },
        { date: '2026-04-30', sender: 'me', text: '好，谢了' },
        { date: '2026-04-30', sender: 'them', text: '这篇新稿子你也要在峰会上发表吗？' },
        { date: '2026-04-30', sender: 'me', text: '嗯，闭门会议，范围不大' },
        { date: '2026-04-30', sender: 'them', text: '我不想干涉你，但这个议题会不会太激进了？' },
        { date: '2026-04-30', sender: 'them', text: '我们手里只有实验数据，结论没法证伪。一旦公开发表，肯定会被大做文章的' },
        { date: '2026-04-30', sender: 'me', text: '曼曼，我知道你担心什么，没事的' },
        { date: '2026-04-30', sender: 'them', text: '你之前不是已经想好，只发表阶段性结论吗？' },
        { date: '2026-04-30', sender: 'them', text: '是罗总要求你这么做的吗？' },
        { date: '2026-04-30', sender: 'me', text: '曼曼，我们做了那么多轮实验，好不容易推导出了结果，现在把成果公开，也很好不是吗？' },
        { date: '2026-04-30', sender: 'them', text: '文倩，你真的想好了吗？' },
        { date: '2026-04-30', sender: 'me', text: '别怕，我有数' },
        { date: '2026-04-30', sender: 'them', text: '好吧，我只是担心你' },

        { date: '2026-05-19', time: '13:26', sender: 'them', text: '文倩，我听说了昨天峰会现场的事' },
        { date: '2026-05-19', sender: 'them', text: '别往心里去，咱们这次的发现本来就突破了框架，他们一时半会儿接受不了很正常。' },
        { date: '2026-05-19', sender: 'them', text: '我们还有机会，也有时间！' },
        { date: '2026-05-19', sender: 'me', text: '谢谢，我没事，别担心' },
        { date: '2026-05-19', sender: 'them', text: '嗯嗯，实验还在推进，数据会越来越扎实的！' },
        { date: '2026-05-19', sender: 'me', text: '好' },

        { date: '2026-05-24', time: '20:21', sender: 'them', text: '文倩，专访我看了，说得真好👍照片也拍得好看，像女明星' },
        { date: '2026-05-24', sender: 'me', text: '哈哈哈，小嘴真甜' },
        { date: '2026-05-24', sender: 'them', text: '刚看到通知，极地行动也挂你牵头？' },
        { date: '2026-05-24', sender: 'me', text: '就挂名而已，先把南非这边搞定再说' },
        { date: '2026-05-24', sender: 'them', text: '唉，你总这样，什么事都往自己身上揽' },
        { date: '2026-05-24', sender: 'them', text: '文倩，找到目标是很重要，可你也得顾好自己啊' },
        { date: '2026-05-24', sender: 'me', text: '❤️' },

        { date: '2026-06-07', time: '15:50', sender: 'them', text: '文倩，听说南非行动提前到月底了。时间这么赶，准备得过来吗？' },
        { date: '2026-06-07', sender: 'them', text: '实验室这边我会盯着，等你把样本带回来' },
        { date: '2026-06-07', sender: 'them', text: '注意安全，加油！' },
        { date: '2026-06-07', time: '18:21', sender: 'me', text: '嗯嗯' }
    ],
    luojianli: [
        { date: '2026-02-20', time: '18:14', sender: 'me', text: '罗总，沈总监的实验团队有重要进展，已经观测到φ能量的储能和释放机制' },
        { date: '2026-02-20', sender: 'them', text: '什么时候的事？' },
        { date: '2026-02-20', sender: 'me', text: '上周，已经跑了九轮复现实验，数据基本一致，基本能确立φ能量的储能与释放原理' },
        { date: '2026-02-20', sender: 'them', text: '👍干得不错' },
        { date: '2026-02-20', sender: 'me', text: '还有个意外发现，实验数据或许可以验证《φ能量起源假说》' },
        { date: '2026-02-20', sender: 'them', text: '丁教授，你说真的？' },
        { date: '2026-02-20', sender: 'me', text: '数据高度吻合' },
        { date: '2026-02-20', sender: 'them', text: '我现在订机票，明早回西延八点，我办公室见' },
        { date: '2026-02-20', sender: 'me', text: '好的' },

        { date: '2026-03-07', time: '15:43', sender: 'me', text: '罗总，这是根据前序研究的结果撰写的内部报告，请您审阅' },
        {
            date: '2026-03-07',
            sender: 'me',
            type: 'file',
            fileName: '《φ能量激增原理与多维空间溯源》.pdf',
            fileSize: '2.4 MB',
            fileKey: 'expired'
        },
        { date: '2026-03-07', sender: 'them', text: '丁教授，你这不是重要进展，这是φ能量领域最接近本质的发现' },
        { date: '2026-03-07', sender: 'them', text: '上一次拿出这种开创性成果的，还是当年的许远峰教授' },
        { date: '2026-03-07', sender: 'me', text: '罗总过奖了，目前实验数据基本自洽，但还需要更多验证' },
        { date: '2026-03-07', sender: 'them', text: '你先让沈曼先出一版阶段性观察结果，投核心期刊' },
        { date: '2026-03-07', sender: 'them', text: '你再把报告里核心的结论扩成专题，准备上5月的全球能源发展峰会' },
        { date: '2026-03-07', sender: 'me', text: '收到' },
        { date: '2026-03-07', sender: 'them', text: '这份报告就是今年公司研究的战略锚点' },
        { date: '2026-03-07', sender: 'them', text: '公开发表后，它肯定能改写整个φ能量领域的研究格局' },
        { date: '2026-03-07', sender: 'them', text: '丁教授，了不起！' },
        { date: '2026-03-07', sender: 'me', text: '谢谢罗总' },

        { date: '2026-03-10', time: '11:18', sender: 'them', text: '丁教授，南非的数据报告看了吗？' },
        { date: '2026-03-10', sender: 'me', text: '看了，指数涨得很快，目标出现概率很高' },
        { date: '2026-03-10', sender: 'them', text: '我在想，南非这次，你要不要试试亲自带队？' },
        { date: '2026-03-10', sender: 'me', text: '我吗？' },
        { date: '2026-03-10', sender: 'me', text: '罗总，我不是勘探出身，也没受过采集训练，石队经验丰富，我来带队不合适吧？' },
        { date: '2026-03-10', sender: 'them', text: '石冬懂勘探，但她不懂目标' },
        { date: '2026-03-10', sender: 'them', text: '现在最懂目标的人，全公司，乃至整个行业，恐怕只有丁教授你了' },
        { date: '2026-03-10', sender: 'me', text: '罗总过奖了，我只是个研究员，怕会拖后腿' },
        { date: '2026-03-10', sender: 'them', text: '丁教授，我们做了这么多年的研究，难道不想亲眼看看，目标到底是什么样子吗？' },
        { date: '2026-03-10', sender: 'them', text: '只要你愿意，我给你开公司最高权限，国内外所有加密的实验数据、历史勘探记录、封档事故报告，你都可以查阅' },
        { date: '2026-03-10', sender: 'them', text: '对你的研究，应该很有帮助' },
        { date: '2026-03-10', sender: 'me', text: '罗总，您这是给我一个很难拒绝的条件' },
        { date: '2026-03-10', sender: 'them', text: '丁教授，这不是条件，是你应有的待遇' },
        { date: '2026-03-10', sender: 'them', text: '有兴趣的话，我们办公室详谈' },
        { date: '2026-03-10', sender: 'me', text: '好，等我半小时' },
        { date: '2026-03-10', sender: 'them', text: '随时都在' },

        { date: '2026-03-17', time: '10:04', sender: 'them', text: '丁教授，这是你的masterkey：Master-DWQ-016' },
        { date: '2026-03-17', sender: 'them', text: '密钥修改入口：https://tqsecure.com/masterkey#016' },
        { date: '2026-03-17', sender: 'them', text: '密钥只能修改一次，改完后仅你本人知晓，务必妥善保存，不得外泄' },
        { date: '2026-03-17', sender: 'me', text: '收到，已修改' },
        { date: '2026-03-17', sender: 'them', text: '丁教授，天启保存着全球最完整的φ能量研究档案' },
        { date: '2026-03-17', sender: 'them', text: '从上世纪六十年代至今，包括许远峰、周岳维，几代人的心血都在其中，好好利用，别辜负它' },
        { date: '2026-03-17', sender: 'me', text: '谢谢罗总，我不会让您失望的' },

        { date: '2026-04-05', time: '21:58', sender: 'them', text: '丁教授，峰会的报告进度如何？' },
        { date: '2026-04-05', sender: 'me', text: '快收尾了，周五给您审核' },
        { date: '2026-04-05', sender: 'them', text: '好' },
        { date: '2026-04-05', sender: 'them', text: '你上次提交的内部报告，我已经上报国家能源研究院' },
        { date: '2026-04-05', sender: 'them', text: '上面非常重视，认为这是近几年能源物理领域的最具突破性的发现' },
        { date: '2026-04-05', sender: 'them', text: '这次全球能源发展峰会专门为我们开设了"新能源研发"专题板块，你代表天启出席，好好发挥' },
        { date: '2026-04-05', sender: 'me', text: '好的' },
        { date: '2026-04-05', sender: 'them', text: '另外，我让品牌部对接了《前沿物理评论》，在会后给你做个专访，记得留时间' },
        { date: '2026-04-05', sender: 'me', text: '专访？有必要吗？' },
        { date: '2026-04-05', sender: 'them', text: '丁教授，你的研究值得被更多人看见。不用有压力，你本来就是天启科技的核心' },

        { date: '2026-04-10', time: '16:21', sender: 'me', text: '罗总，全球能源发展峰会专题报告，请您审阅' },
        {
            date: '2026-04-10',
            sender: 'me',
            type: 'file',
            fileName: '《凝聚态φ能量：储能机制与可控释放》.pdf',
            fileSize: '5.8 MB',
            fileKey: 'expired'
        },
        { date: '2026-04-10', time: '19:01', sender: 'them', text: '丁教授，稿子我看了' },
        { date: '2026-04-10', sender: 'them', text: '太稳了' },
        { date: '2026-04-10', sender: 'them', text: '过于保守' },
        { date: '2026-04-10', sender: 'them', text: '为什么不把内部报告的核心成果放出来？' },
        { date: '2026-04-10', sender: 'me', text: '罗总，内部报告里的核心结论，目前还停留在理论推导与测算层面，没有实证支撑，公开发表风险太大' },
        { date: '2026-04-10', sender: 'me', text: '全球能源发展峰会是公开学术会议，现在这个尺度，分量应该足够了' },
        { date: '2026-04-10', sender: 'them', text: '丁教授，你手上有权限最高的资料库，结合你《φ能量起源假说》的推论，还有这次完整的实验数据，完全有能力把内部报告里的结论落地' },
        { date: '2026-04-10', sender: 'me', text: '罗总，学术研究讲究证伪，超前披露未实证的结论，会引发行业争议，影响公司舆情' },
        { date: '2026-04-10', sender: 'them', text: '我理解你的审慎，但公司需要这次机会' },
        { date: '2026-04-10', sender: 'them', text: '丁教授，你看这样行不行？' },
        { date: '2026-04-10', sender: 'them', text: '我去向组委会申请，会后加开一场闭门会议，仅限业内核心专家参与' },
        { date: '2026-04-10', sender: 'them', text: '你适度放开结论尺度，拿点真东西出来，只做内部学术探讨，不做公开发表' },
        { date: '2026-04-10', sender: 'them', text: '怎么样？' },
        { date: '2026-04-10', sender: 'me', text: '好吧，我明白了' },

        { date: '2026-04-29', time: '21:54', sender: 'me', text: '罗总，打扰了，这是闭门会讨论稿，请审阅' },
        {
            date: '2026-04-29',
            sender: 'me',
            type: 'file',
            fileName: '《φ能量维度跃迁行为观察（讨论稿）》.pdf',
            fileSize: '3.1 MB',
            fileKey: 'expired'
        },
        { date: '2026-04-29', sender: 'them', text: '好！好多了！👍' },
        { date: '2026-04-29', sender: 'them', text: '逻辑完整，结论有力' },
        { date: '2026-04-29', sender: 'them', text: '只是丁教授还是很谨慎啊，刻意规避了内部报告里最核心的结论' },
        { date: '2026-04-29', sender: 'me', text: '罗总，这已经是学术领域内能接受的最大尺度了' },
        { date: '2026-04-29', sender: 'me', text: '超出这个边界，他们该说我们天启科技不是做研究，是在编故事了' },
        { date: '2026-04-29', sender: 'them', text: '哈哈，我尊重丁教授的判断，只可惜你做出这么大的成果，不能被业界看见' },
        { date: '2026-04-29', sender: 'them', text: '就用这版上会，流程我来安排' },
        { date: '2026-04-29', sender: 'me', text: '好的' },
        { date: '2026-04-29', sender: 'them', text: '另外，南非行动准备得怎么样？' },
        { date: '2026-04-29', sender: 'me', text: '勘探队的训练石队盯得很紧，但采样设备目前只有1台通过测试，主要是时间不够' },
        { date: '2026-04-29', sender: 'them', text: '行，我去和工程部沟通。有任何困难，找我协调' },
        { date: '2026-04-29', sender: 'me', text: '好' },

        { date: '2026-05-18', time: '23:47', sender: 'them', text: '丁教授，你今天辛苦了' },
        { date: '2026-05-18', sender: 'them', text: '峰会上都是些守旧派，看到新理论、新成果，第一反应就是拒绝，这是行业的毛病，不是你的问题' },
        { date: '2026-05-18', sender: 'them', text: '等我们在南非找到目标，拿回样本，所有的质疑都会不攻自破' },
        { date: '2026-05-18', sender: 'me', text: '谢谢罗总，我没事' },
        { date: '2026-05-18', sender: 'them', text: '等南非行动结束以后，我准备提名你为天启科技的首席科学家，以后公司的实验、勘探、研发，都以你的研究方向为准' },
        { date: '2026-05-18', sender: 'them', text: '我相信以你的能力，一定能把φ能量从理论推向实证，改写研究格局' },
        { date: '2026-05-18', sender: 'me', text: '谢谢罗总的信任，我先把南非行动落地吧，头衔的事，以后再说' },
        { date: '2026-05-18', sender: 'them', text: '好，听你的，早点休息' },

        { date: '2026-05-21', time: '19:31', sender: 'them', text: '丁教授，极地的数据开始回升了，我想重启极地行动' },
        { date: '2026-05-21', sender: 'them', text: '还是你来牵头，OK吗？' },
        { date: '2026-05-21', sender: 'me', text: '罗总，南非行动还在筹备期，我精力实在有限，还是让石队上吧' },
        { date: '2026-05-21', sender: 'them', text: '南非窗口期太短，目标存续时间未知，极地是我们今年的第二备选' },
        { date: '2026-05-21', sender: 'them', text: '丁教授，你当领队的话，或许就有机会验证你内部报告里的结论' },
        { date: '2026-05-21', sender: 'me', text: '验证？怎么验证？' },
        { date: '2026-05-21', sender: 'them', text: '天启探索者的学员已经入职了，我打算让新人加入极地行动，或许他们可以帮你' },
        { date: '2026-05-21', sender: 'them', text: '你的结论一旦被证实，不仅会改变φ能量领域的研究格局，你还能成为继许远峰之后，国内乃至世界范围内这个领域的头号专家' },
        { date: '2026-05-21', sender: 'me', text: '罗总，您别说了' },
        { date: '2026-05-21', sender: 'me', text: '我们都很清楚，人类直接接触目标的代价是什么' },
        { date: '2026-05-21', sender: 'them', text: '哈哈，别紧张，丁教授' },
        { date: '2026-05-21', sender: 'them', text: '我只是和你探讨验证的可能性' },
        { date: '2026-05-21', sender: 'them', text: '我让你挂帅，是希望你的研究体系，不只停留在实验室，而是能真正站到行业顶端' },
        { date: '2026-05-21', sender: 'them', text: '于你，于天启科技，于整个能源领域，都是好事' },
        { date: '2026-05-21', sender: 'them', text: '你可以考虑看看' },
        { date: '2026-05-21', sender: 'me', text: '我明白您的意思了' },
        { date: '2026-05-21', sender: 'me', text: '极地行动我可以挂名，统筹科研方向' },
        { date: '2026-05-21', sender: 'me', text: '但部门得增设一名B角负责人，日常工作得有人盯着，我顾不过来' },
        { date: '2026-05-21', sender: 'them', text: '合理！' },
        { date: '2026-05-21', sender: 'them', text: '编制我会特批，你直接找吴念清，人选你定' },

        { date: '2026-06-01', time: '13:18', sender: 'them', text: '丁教授，我刚和刘忙博士通了电话' },
        { date: '2026-06-01', sender: 'them', text: '南非那边等不了了，目标大概率已经出现，得提前启程' },
        { date: '2026-06-01', sender: 'me', text: '提前多久？' },
        { date: '2026-06-01', sender: 'them', text: '窗口期只有60天左右，最晚月底必须出发' },
        { date: '2026-06-01', sender: 'me', text: '采集设备的调试怕是来不及' },
        { date: '2026-06-01', sender: 'them', text: '让工程部想办法克服，具体安排我电话跟你说' },
        { date: '2026-06-01', sender: 'me', text: '好' },

        { date: '2026-06-19', time: '14:02', sender: 'them', text: '丁教授，刚刚安全合规部说，你的论文被人为植入了异常数据' },
        { date: '2026-06-19', sender: 'them', text: '就是这篇，你看下' },
        {
            date: '2026-06-19',
            sender: 'them',
            type: 'file',
            fileName: '《φ能量起源假说》.pdf',
            fileSize: '2.4 MB',
            fileKey: 'phi-origin'
        },
        { date: '2026-06-19', time: '18:46', sender: 'me', text: '罗总，不好意思，下午在训练' },
        { date: '2026-06-19', sender: 'me', text: '我看到了，不知道是怎么回事' },
        { date: '2026-06-19', sender: 'them', text: '好，没事，我已经安排技术科把这篇锁了' },
        { date: '2026-06-19', sender: 'them', text: '你安心集训，回来再说' },
        { date: '2026-06-19', sender: 'me', text: '好' }
    ],
    mystery: [
        { step: 0, delay: 2500, sender: 'them', text: '韩休' },
        { step: 1, delay: 800, sender: 'them', text: '没想到你真的能走到这一步' },
        {
            step: 2,
            sender: 'choice',
            choices: [
                { label: '你是谁？', nextStep: 3 }
            ]
        },
        { step: 3, delay: 2000, sender: 'them', text: '我是谁不重要' },
        { step: 4, delay: 800, sender: 'them', text: '重要的是，你已经被发现了' },
        {
            step: 5,
            sender: 'choice',
            choices: [
                { label: '是你们害死了文倩！', nextStep: 6 },
                { label: '文倩到底是怎么死的？', nextStep: 6 }
            ]
        },
        { step: 6, delay: 2000, sender: 'them', text: '如果我说' },
        { step: 7, delay: 800, sender: 'them', text: '丁文倩还没死' },
        { step: 8, delay: 800, sender: 'them', text: '你信吗？' },
        {
            step: 9,
            sender: 'choice',
            choices: [
                { label: '真的吗？！文倩还活着？', nextStep: 10 },
                { label: '不可能…… 我不信', nextStep: 10 },
                { label: '……', nextStep: 10 }
            ]
        },
        {
            step: 10,
            delay: 2000,
            sender: 'them',
            type: 'image',
            text: '点击查看',
            imageUrl: '../../image/dind_die.webp',
            viewerAppId: 'photo-mystery'
        },
        {
            step: 11,
            sender: 'choice',
            choices: [
                { label: '你们对她做了什么？！', nextStep: 12 },
                { label: '她在哪里？！', nextStep: 12 }
            ]
        },
        { step: 12, delay: 1500, sender: 'me', text: '那不是一场意外吗？' },
        { step: 13, delay: 1500, sender: 'me', text: '你们为什么要这样对她！' },
        { step: 14, delay: 1200, sender: 'me', text: '把她还给我！' },
        { step: 15, delay: 1000, sender: 'me', text: '你说话啊！！！' },
        { step: 16, delay: 2000, sender: 'them', text: '韩休' },
        { step: 17, delay: 800, sender: 'them', text: '我没多少时间了' },
        { step: 18, delay: 800, sender: 'them', text: '现在只有你能救她' },
        {
            step: 19,
            sender: 'choice',
            choices: [
                { label: '我要怎么做？', nextStep: 20 }
            ]
        },
        { step: 20, delay: 2000, sender: 'them', text: '成为「天启探索者」' },
        { step: 21, delay: 2000, sender: 'them', text: '你知道该怎么做' },
        { step: 22, delay: 800, sender: 'them', text: '抓紧时间' },
        { step: 23, delay: 1000, sender: 'them', text: '再晚，就来不及了' }
    ]
};

// 登录凭证
const chatLoginCredential = {
    empId: 'TQ-PHY-DWQ-A09',
    password: '19960408'
};

// ========== 通知文案（供桌面通知系统读取） ==========
const chatNotificationContent = {
    friend_request: {
        title: '天启通',
        subtitle: '收到好友申请',
        icon: '💬',
        appId: 'chat'
    }
};