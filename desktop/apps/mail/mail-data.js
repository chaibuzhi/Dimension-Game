// ========== 邮件数据（单数据源 v10） ==========

// ========== 联系人数据 ==========
const contactsData = {
    'hanxiu': {
        name: '韩休',
        email: 'hanxiu@mail.com',
        avatar: '韩',
        color: '#2d708a',
        hidden: true
    },
    'dingwenqian': {
        name: '丁文倩',
        email: 'prof.wq.ding@mail.com',
        avatar: '丁',
        color: '#8e6e8e',
        hidden: false
    },
    'tq-security': {
        name: '天启科技安全合规部',
        email: 'security@revelation-tech.com',
        avatar: '天',
        color: '#1a3c6e',
        hidden: true
    },
    'tq-hr': {
        name: '天启科技人力资源部',
        email: 'hr@revelation-tech.com',
        avatar: '天',
        color: '#1a3c6e',
        hidden: true
    },    
    'xiyan-phys': {
        name: '西延中学物理教研组',
        email: 'physics@xiyan-high.edu.cn',
        avatar: '西',
        color: '#3d6b35',
        hidden: false
    },
    'xiyan-aca': {
        name: '西延中学教务处',
        email: 'academic@xiyan-high.edu.cn',
        avatar: '教',
        color: '#3d6b35',
        hidden: false
    },
    'lizhiming': {
        name: '李志明',
        email: 'lizhiming@xiyan-high.edu.cn',
        avatar: '李',
        color: '#e67e22',
        hidden: false
    },
    'wangrui': {
        name: '王睿',
        email: 'wangrui@xiyan-high.edu.cn',
        avatar: '王',
        color: '#8e44ad',
        hidden: false
    },
    'xingtu': {
        name: '星途旅行社',
        email: 'service@xingtu-travel.com',
        avatar: '星',
        color: '#d4721a',
        hidden: false
    },
    'chenguoliang': {
        name: '陈国良',
        email: 'chenguoliang@longhua-univ.edu.cn',
        avatar: '陈',
        color: '#5d6d7e',
        hidden: false
    },
    'life-energy': {
        name: '生命源能量科技',
        email: 'service@life-energy.com',
        avatar: '生',
        color: '#c0392b',
        hidden: true
    },
    'laoliu': {
        name: '能源老刘',
        email: 'laoliu@deepwater.com',
        avatar: '刘',
        color: '#c06014',
        hidden: false,
        unlockKey: 'mail_contact_unlocked',
        unlockField: 'laoliu'
    },
    'xiaozhou': {
        name: '周小舟',
        email: 'xiaozhou@xiyan-univ.edu.cn',
        avatar: '周',
        color: '#2e86c1',
        hidden: false,
        unlockKey: 'mail_contact_unlocked',
        unlockField: 'xiaozhou'
    }
};

// ========== 延时常量（全游戏唯一延时设置处） ==========
const DELAY_SHORT = 7000;          // 所有回复邮件统一延时：7秒

// ========== 消息池：所有邮件正文、主题、发件人、日期只在这里定义 ==========
const messagePool = {

    // ===== 天启科技 =====
    'tq-001': {
        id: 'tq-001',
        from: 'tq-security',
        date: '2026-07-15',
        subject: '关于丁文倩意外身故事宜的确认函',
        bodyHTML: `
            <div class="tianqi-mail">
                <div class="tq-brand">
                    <div class="tq-zh">天启科技</div>
                    <div class="tq-en">Revelation Technology</div>
                </div>
                <div class="tq-body">
                    <p>尊敬韩休先生：</p>
                    <p>我司谨对丁文倩教授的不幸离世致以深切哀悼。</p>
                    <p>丁文倩教授身故后的相关后续事宜，请查阅随附协议文件。</p>
                    <p><strong>若三日内未签署确认，我司将按照内部规定自行处理，不再另行通知。</strong></p>
                    <a class="attachment-link" href="javascript:void(0)" onclick="openFileWindow('dingagreement')">
                        📄 附件：关于丁文倩意外身故事宜的确认函.pdf
                    </a>
                    <p style="text-align:right; margin-top:20px; line-height:1.8;">
                        <span class="tq-zh">天启科技安全合规部</span><br>
                    </p>
                </div>
                <div class="tq-sign">
                    Revelation Technology Co., Ltd.<br>
                    西延市高新区天启科技大厦
                </div>
            </div>
        `
    },
    'tq-002': {
        id: 'tq-002',
        from: 'hanxiu',
        date: '2026-07-18',
        bodyHTML: `<p>已签订</p>`
    },
    'tq-003': {
        id: 'tq-003',
        from: 'tq-security',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'tianqi',
            timeKey: 'signedTime'
        },
        bodyHTML: `
            <div class="tianqi-mail">
                <div class="tq-brand">
                    <div class="tq-zh">天启科技</div>
                    <div class="tq-en">Revelation Technology</div>
                </div>
                <div class="tq-body">
                    <p>尊敬韩休先生：</p>
                    <p>我司已收到您签署的确认函。赔偿金将在30个工作日内转至指定账户。</p>
                    <br>
                    <p><strong>现将丁文倩教授葬礼安排如下：</strong></p>
                    <p>兹定于 2026 年 7 月 22 日上午 8:00，在西延市金陵墓园举行丁文倩教授告别仪式。</p>
                    <p>仪式全程由我司统筹筹备，现场流程、来宾接待及媒体对接均按公司内部标准执行。</p>
                    <p>为保障仪式有序进行，请您准时出席，服从现场工作人员指引。</p>
                    <p><strong>请勿接受任何媒体采访，请勿与现场人员谈论任何与丁文倩教授工作相关的内容。</strong></p>
                    <p>望您理解并予以配合。</p>
                    <p style="text-align:right; margin-top:20px; line-height:1.8;">
                        <span class="tq-zh">天启科技安全合规部</span><br>
                    </p>
                </div>
                <div class="tq-sign">
                    Revelation Technology Co., Ltd.<br>
                    西延市高新区天启科技大厦
                </div>
            </div>
        `
    },

    // ===== 天启科技招聘 =====
    'tq-hr-001': {
        id: 'tq-hr-001',
        from: 'tq-hr',
        date: '2026-07-18',
        subject: '[ 天启探索者 ] 综合能力评估邀请',
        arrivalRule: {
            type: 'delay',
            stateKey: 'tq-hr',
            timeKey: 'triggerTime'
        },
        bodyHTML: `
            <div class="tianqi-mail">
                <div class="tq-brand">
                    <div class="tq-zh">天启科技</div>
                    <div class="tq-en">Revelation Technology</div>
                </div>
                <div class="tq-body">
                    <p>韩休先生：</p>
                    <p><strong>您提交的「天启探索者」全球人才招聘申请已核验通过，现正式邀请您参加线上综合能力评估。</strong></p>
                    <p>本次评估为探索者计划核心筛选环节。所有题目均基于您的个人背景与岗位要求动态生成，请您在独立无干扰的环境下诚实作答。</p>
                    <br>
                    <p><strong>测试须知</strong></p>
                    <p>1. 测试全程不可退出，系统将自动记录全部操作行为；</p>
                    <p>2. 请确保网络环境稳定，中途断开将视为自动提交答卷；</p>
                    <p>3. 测试结果仅用于招聘评定，全程严格保密。</p>
                    <p>请您于 24 小时内点击下方链接进入测试，逾期视为自动放弃应聘资格。</p>
                    <div style="text-align:center; margin:32px 0 28px;">
                    <a class="exam-button" href="javascript:void(0)"
                    onclick="window.top.location.href = '../../../tianqi/exam.html';">
                            <span class="exam-btn-glow"></span>
                            <span class="exam-btn-scan"></span>
                            <span class="exam-btn-text">开 始 测 试</span>
                        </a>
                    </div>
                    <p style="text-align:right; margin-top:20px; line-height:1.8;">
                        <span class="tq-zh">天启科技人力资源部</span>
                    </p>
                </div>
                <div class="tq-sign">
                    Revelation Technology Co., Ltd.<br>
                    西延市高新区天启科技大厦
                </div>
            </div>
        `
    },    

    // ===== 西延中学慰问信 =====
    'xy-001': {
        id: 'xy-001',
        from: 'xiyan-phys',
        date: '2026-07-17',
        subject: '慰问信',
        bodyHTML: `
            <div class="school-mail">
                <div class="sch-title">
                    <div class="sch-zh">西延中学</div>
                    <div class="sch-en">Xiyan High School</div>
                </div>
                <hr class="sch-rule">
                <p>韩休老师：</p>
                <p><strong>惊悉您的爱人丁文倩女士不幸离世，我校全体同仁深感悲痛。</strong></p>
                <p>请您节哀顺变，保重身体。</p>
                <p>若有任何需要学校协助的地方，请随时与我们联系。</p>
                <div class="sch-sign">
                    西延中学物理教研组<br>
                    西延市育才路 88 号<br>
                </div>
            </div>
        `
    },

    // ===== 西延中学教务处：职称申请 =====
    'xy-title-out-001': {
        id: 'xy-title-out-001',
        from: 'hanxiu',
        date: '2026-06-28',
        subject: '中级职称申请材料提交',
        bodyHTML: `
            <p>教务处老师：</p>
            <p>您好，随信提交我的中级职称评审申请材料，请查收。</p>
            <p>若需补充其他材料，请随时告知。</p>
            <a class="attachment-link" href="javascript:void(0)" onclick="openFileWindow('titleevaluation', '韩休中级职称申请表.docx')">
                📄 附件：韩休中级职称申请表.docx
            </a>
        `
    },

    'xy-title-in-001': {
        id: 'xy-title-in-001',
        from: 'xiyan-aca',
        date: '2026-07-11',
        bodyHTML: `
            <div class="school-mail">
                <div class="sch-title">
                    <div class="sch-zh">西延中学</div>
                    <div class="sch-en">Xiyan High School</div>
                </div>
                <hr class="sch-rule">
                <p>韩休老师：</p>
                <p>您的职称申请已收悉，现已进入评审流程，请留意后续通知。</p>
                <p>评审期间如有补充材料，请及时提交至教务处。</p>
                <div class="sch-sign">
                    西延中学教务处<br>
                    西延市育才路 88 号<br>
                </div>
            </div>
        `
    },

    // ===== 李志明：高考志愿 =====
    'lzm-in-001': {
        id: 'lzm-in-001',
        from: 'lizhiming',
        date: '2026-07-02',
        subject: '高考成绩出来了！想请教志愿填报',
        bodyHTML: `
            <p><strong>韩老师：</strong></p>
            <p>我高考成绩出来了！627，物理92分！！</p>
            <p>第一时间就想告诉您，真的特别感谢您！我最喜欢上您的物理课，总算没辜负您的期待！我想报龙华大学的物理专业，但我爸觉得物理不好找工作，想让我学人工智能。</p>
            <p>想问问您，我这个分数，冲一冲龙华物理有希望吗？</p>
            <p>您有空的时候回我就行，谢谢老师！</p>
        `
    },
    'lzm-out-001': {
        id: 'lzm-out-001',
        from: 'hanxiu',
        date: '2026-07-03',
        bodyHTML: `
            <p>志明：</p>
            <p>你的基础一直很扎实，这个分数很争气。</p>
            <p>以你的分数冲龙华物理系是稳妥的。物理是基础学科，本科把底子打牢，未来往人工智能、材料、能源这些方向转都有优势。你爸爸的担心可以理解，但物理专业的出路远比想象中宽。</p>
            <p>如果真的喜欢物理，就大胆报。有任何问题随时来找我。</p>
        `
    },

    // ===== 星途旅行社：行程单 =====
    'xt-out-001': {
        id: 'xt-out-001',
        from: 'hanxiu',
        date: '2026-06-20',
        subject: '新西兰旅行行程安排',
        bodyHTML: `
            <p>您好，关于新西兰有两处细节想麻烦您协助安排：</p>
            <p>第一，8 月 3 日是我和妻子的四周年结婚纪念日，希望能在酒店安排私人晚宴，不需要繁复布置，氛围安静雅致就好。</p>
            <p>第二，我妻子睡眠偏浅，麻烦尽量安排位置僻静的房型，最好配有加厚遮光窗帘。</p>
            <p>辛苦费心协调，麻烦了！</p>
        `
    },
    'xt-in-001': {
        id: 'xt-in-001',
        from: 'xingtu',
        date: '2026-06-25',
        bodyHTML: `
            <div class="travel-mail">
                <div class="tr-brand">
                    <span class="tr-icon">✈️</span>
                    <div>
                        <div class="tr-name">星途旅行社</div>
                        <div class="tr-slogan">让每一次出发都值得期待</div>
                    </div>
                </div>
                <p>韩休先生，您好：</p>
                <p>感谢您选择星途旅行社。您预订的<strong>新西兰双人9天8晚深度游</strong>已确认出单。</p>
                <p>您备注的两项需求我们已为您妥善安排：</p>
                <p>1. 8 月 3 日的<strong>结婚纪念日私人晚宴</strong>，已安排；</p>
                <p>2. 房间已为您<strong>免费升级至海景套房，</strong>房型位置僻静并配备加厚遮光窗帘，充分保障休息环境。</p>
                <p>以上均无需额外支付费用，祝您和妻子拥有一段浪漫舒心的纪念日旅程。</p>
                <p>随附行程单，请您查收。</p>
                <a class="attachment-link" href="javascript:void(0)" onclick="openFileWindow('itinerary', '行程单_新西兰.pdf')">
                    📄 附件：新西兰行程单.pdf
                </a>
                <div class="tr-sign">
                    星途旅行社客户服务中心<br>
                    400-888-6666 · www.xingtu-travel.com<br>
                    2026年6月25日
                </div>
            </div>
        `
    },

    // ===== 王睿：辅导班 =====
    'wr-in-001': {
        id: 'wr-in-001',
        from: 'wangrui',
        date: '2026-06-16',
        subject: '韩老师，暑假能开个物理辅导班吗？',
        bodyHTML: `
            <p><strong>韩老师：</strong></p>
            <p>暑假快到了，您能开个物理辅导班不？我保证不睡觉了！</p>
            <p>自从您接了我们班，我物理终于及格了。</p>
            <p>我们班好几个同学都想报，已经凑了八个人了。您要是不答应，我们就只能去报校门口那个"三天提分班"了，听说那老师连牛顿三大定律都要翻书念。</p>
            <p>求求您了韩老师，您也不忍心看我们被坑吧？</p>
        `
    },
    'wr-out-001': {
        id: 'wr-out-001',
        from: 'hanxiu',
        date: '2026-06-17',
        bodyHTML: `
            <p>王睿：</p>
            <p>按学校规定，暑假不能组织有偿补课。你们先别急着报什么"三天提分班"，上课急功近利，基础打不牢。</p>
            <p>如果真想补一补，你期末物理要是能考上 75 分，我就安排几次暑期答疑课。</p>
        `
    },

    // ===== 陈国良：导师来信 =====
    'cgl-in-001': {
        id: 'cgl-in-001',
        from: 'chenguoliang',
        date: '2026-05-30',
        subject: '小韩：今年华都年会，若有暇可一聚',
        bodyHTML: `
            <p><strong>小韩：</strong></p>
            <p>许久未见，不知近况如何。</p>
            <p>师娘前日整理旧照，见你与文倩在实验室门口合影，笑说彼时你们尚是少年。</p>
            <p>文倩近来想必极忙。上月她寄来早春新茶，附信道"老师别来无恙"，寥寥数语，如其为人，算来她应又在外奔波。</p>
            <p>你若有暇，八月可来华都的天体物理学术研讨会一聚。组里师弟常问起你近况，我只说你如今教书育人，乐在其中。</p>
            <p>说来也怪，我这一生学生不多，但似你与文倩这般，一个肯沉下心做学问，一个敢往未知处行，已是难得。</p>
            <p>望你与文倩珍重。</p>
            <p>得闲了，再来家中吃茶。</p>
            <p style="color:#888; font-size:13px; text-align:right;">陈国良<br>2026年5月30日</p>
        `
    },
    'cgl-out-001': {
        id: 'cgl-out-001',
        from: 'hanxiu',
        date: '2026-05-31',
        bodyHTML: `
            <p>陈老师：</p>
            <p>来信收悉，劳您和师娘挂心。</p>
            <p>我与文倩一切都好，只是文倩工作忙碌，难得有闲。</p>
            <p>八月的研讨会我已记下，届时一定腾出时间，和文倩一同过去拜访您与师娘。</p>
            <p>前阵子托人收了两坛窖藏陈年花雕，今日一并寄出，您留意查收快递。</p>
            <p>小酌即可，别贪杯，不然师娘该念叨我了。</p>
            <p>入夏时节天气多变，您和师娘保重身体。</p>
            <p style="color:#888; font-size:13px; text-align:right;">韩休<br>2026年5月31日</p>
        `
    },

    // ===== 生命源能量科技：垃圾邮件 =====
    'le-in-001': {
        id: 'le-in-001',
        from: 'life-energy',
        date: '2026-05-24',
        subject: '【特惠】喝长生水，重启生命能量场',
        bodyHTML: `
            <div style="background:#fffdf5; border:3px solid #d80000; border-radius:4px; padding:0; overflow:hidden;">
                <div style="background: linear-gradient(135deg, #d80000 0%, #ff4400 50%, #d80000 100%); color:#fff; text-align:center; padding:10px 16px; font-size:14px; font-weight:700; letter-spacing:0.2em; border-bottom:2px dashed #ffcc00;">
                    ⚡ 限时特惠 · 前50名送能量手环 ⚡
                </div>
                <div style="padding:24px 20px; text-align:center;">
                    <div style="font-size:28px; font-weight:900; color:#d80000; line-height:1.3; margin-bottom:4px; letter-spacing:0.05em;">
                        生命源能量水
                    </div>
                    <div style="font-size:15px; font-weight:700; color:#ff6600; margin-bottom:16px;">
                        💧 让时间为您停留 💧
                    </div>
                    <div style="background:#fffbe0; border:2px solid #ffcc00; border-radius:6px; padding:14px; margin-bottom:16px;">
                        <div style="font-size:13px; color:#333; line-height:1.8;">
                            <strong style="color:#d80000;">最新研究表明：</strong><br>
                            人体衰老始于<strong>能量场紊乱</strong>！<br>
                            细胞共振频率降低，疾病疲劳随之而来！<br>
                            生命源能量水，注入<strong style="color:#0099ff;">高维活性因子</strong>，<br>
                            唤醒沉睡青春，重启生命能量场！
                        </div>
                    </div>
                    <div style="font-size:13px; color:#666; line-height:1.8; margin-bottom:16px;">
                        "喝完第三天，整个人都轻了，<br>广场舞都能多跳两小时！"<br>
                        <span style="font-size:12px; color:#999;">—— 一位不愿透露姓名的体验者</span>
                    </div>
                    <div style="background:linear-gradient(135deg, #ff4400, #ff6600); border-radius:6px; padding:12px; color:#fff; font-size:15px; font-weight:700; margin-bottom:12px;">
                        🔥 买三箱送一箱 · 再送定制能量手环 🔥
                    </div>
                    <div style="font-size:13px; color:#333; line-height:1.8; margin-bottom:8px;">
                        前五十名拨打电话者<br>
                        还可获得<strong style="color:#d80000;">免费能量检测</strong>一次！<br>
                        名额有限，先到先得！
                    </div>
                    <div style="background:#000; color:#fff; font-size:20px; font-weight:900; padding:10px 0; border-radius:4px; letter-spacing:0.08em; margin-bottom:8px;">
                        ☎ 400-444-444
                    </div>
                    <div style="font-size:12px; color:#999;">
                        生命源能量科技有限公司
                    </div>
                </div>
            </div>
        `
    },

    // ===== 老刘线程 · 第一封信 =====
    'll-out-1-cautious': {
        id: 'll-out-1-cautious',
        from: 'hanxiu',
        date: '2026-07-18',
        subject: '打听天启科技消息',
        bodyHTML: `
            <p>刘老师您好：</p>
            <p>一直看您公众号的文章，《三问天启科技》那篇写得很深入。</p>
            <p><strong>我对天启科技这家公司很好奇，想冒昧请教一下，方不方便聊聊这家公司？</strong></p>
            <p>打扰您了，盼复。</p>
        `
    },
    'll-out-1-half': {
        id: 'll-out-1-half',
        from: 'hanxiu',
        date: '2026-07-18',
        subject: '咨询天启科技求职问题',
        bodyHTML: `
            <p>刘老师您好：</p>
            <p>关注您很久了，您对能源行业的判断一直很准。</p>
            <p><strong>我最近想换工作，我对天启科技的研发方向很感兴趣。</strong></p>
            <p>看您在行业里资源很多，冒昧问一句，您这边有没有相关的门路？</p>
            <p>麻烦您了。</p>
        `
    },
    'll-out-1-reveal': {
        id: 'll-out-1-reveal',
        from: 'hanxiu',
        date: '2026-07-18',
        subject: '爆料天启科技事故',
        bodyHTML: `
            <p>刘老师您好：</p>
            <p>看了您写的《三问天启科技》，我知道您一直在调查这家公司。</p>
            <p><strong>我家里有人在天启科技工作，最近出事了，公司全程压消息，死因说法含糊，这事根本不对劲。</strong></p>
            <p>我手里有些情报，想跟您聊聊，不知道您有没有兴趣？</p>
        `
    },

    // ===== 老刘线程 · 第二封信（统一回复，time1 延时） =====
    'll-in-1': {
        id: 'll-in-1',
        from: 'laoliu',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'laoliu',
            timeKey: 'time1'
        },
        bodyHTML: `
            <p>你好，来信收到。</p>
            <p>恕我直言，来路不明的邮件我一般不回。</p>
            <p>你是谁？到底想干什么？</p>
            <p>直说，别绕弯子。</p>
        `,
        replyOptions: [
            {
                id: 'll-out-2-truth',
                label: '实话实说',
                onSent: () => {
                    setThreadState('laoliu', 'secondChoice', 'truth');
                    setThreadState('laoliu', 'time2', Date.now());
                    scheduleMailNotification('ll-in-2-truth');
                }
            },
            {
                id: 'll-out-2-half',
                label: '想换工作',
                onSent: () => {
                    setThreadState('laoliu', 'secondChoice', 'half');
                    setThreadState('laoliu', 'time2', Date.now());
                    scheduleMailNotification('ll-in-2-half');
                }
            },
            {
                id: 'll-out-2-inquiry',
                label: '谨慎打听',
                onSent: () => {
                    setThreadState('laoliu', 'secondChoice', 'inquiry');
                    setThreadState('laoliu', 'time2', Date.now());
                    scheduleMailNotification('ll-in-2-inquiry');
                }
            }
        ]
    },

    // ===== 老刘线程 · 第三封信（三选一） =====
    'll-out-2-truth': {
        id: 'll-out-2-truth',
        from: 'hanxiu',
        date: '2026-07-18',
        bodyHTML: `
            <p>不好意思，刘老师。</p>
            <p><strong>我叫韩休，我妻子叫丁文倩，是天启科技物理研究部的总监，几天前她在公司的勘探项目里出了意外。</strong></p>
            <p>公司压着所有的消息，只给了我一份保密协议，一句解释都没有。</p>
            <p>我想进入天启科技，查清楚她到底出了什么事，但他们招聘需要内推，我进不去。</p>
            <p>我知道您一直在挖天启的事，或许我们可以互相帮忙。</p>
        `
    },
    'll-out-2-half': {
        id: 'll-out-2-half',
        from: 'hanxiu',
        date: '2026-07-18',
        bodyHTML: `
            <p>刘老师，是我唐突了，我叫韩休，是西延本地的物理老师。</p>
            <p><strong>我对天启科技的能源研究方向很感兴趣，想跳槽去他们公司，但他们招聘卡得很死，没有内部推荐连简历都递不进去。</strong></p>
            <p>您对这家公司这么了解，想着您说不定有渠道，就冒昧问了。</p>
            <p>如果有办法的话，必有重谢。</p>
        `
    },
    'll-out-2-inquiry': {
        id: 'll-out-2-inquiry',
        from: 'hanxiu',
        date: '2026-07-18',
        bodyHTML: `
            <p>刘老师，您别误会。</p>
            <p>我就是能源科技方面的爱好者，看了您的文章，想多打听些这家公司的情况，没别的目的。</p>
        `
    },

    // ===== 老刘线程 · 第四封信（time2 延时，三分支） =====
    'll-in-2-truth': {
        id: 'll-in-2-truth',
        from: 'laoliu',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'laoliu',
            timeKey: 'time2'
        },
        bodyHTML: `
            <p>你说的丁文倩，我知道。</p>
            <p>他们南非项目的领队，学术上很有东西，没想到她居然出事了。</p>
            <p>天启科技的水，不是一般的深，节哀吧。</p>
            <p><strong>我跟你直说了吧，我确实和一位高管有些交情，应该能帮你拿到内推资格。</strong></p>
            <p>但我也有个条件：</p>
            <p><strong>你进去以后，要把你接触到的项目、研究、资料，第一时间同步给我。</strong></p>
            <p>公平交易，各取所需，你考虑清楚。</p>
        `,
        replyOptions: [
            {
                id: 'll-out-3-agree',
                label: '同意',
                onSent: () => {
                    setThreadState('laoliu', 'conditionChoice', 'agree');
                    setThreadState('laoliu', 'time3', Date.now());
                    scheduleMailNotification('ll-in-3-agree');
                    setMailCodeReady('laoliu', true);
                }
            },
            {
                id: 'll-out-3-disagree',
                label: '拒绝',
                onSent: () => {
                    setThreadState('laoliu', 'conditionChoice', 'disagree');
                    setThreadState('laoliu', 'time3', Date.now());
                    scheduleMailNotification('ll-in-3-disagree');
                }
            }
        ]
    },
    'll-in-2-half': {
        id: 'll-in-2-half',
        from: 'laoliu',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'laoliu',
            timeKey: 'time2'
        },
        bodyHTML: `
            <p>遮遮掩掩，没意思。</p>
            <p>不管你是真想找工作，还是有别的目的，都不关我的事。</p>
            <p><strong>我跟你明说，我确实和一位高管有些交情，应该能帮你拿到内推资格。</strong></p>
            <p><strong>但我也有个条件：你进去以后，要把你接触到的项目、研究、资料，第一时间同步给我。</strong></p>
            <p>公平交易，各取所需。你考虑清楚。</p>
        `,
        replyOptions: [
            {
                id: 'll-out-3-agree',
                label: '同意',
                onSent: () => {
                    setThreadState('laoliu', 'conditionChoice', 'agree');
                    setThreadState('laoliu', 'time3', Date.now());
                    scheduleMailNotification('ll-in-3-agree');
                    setMailCodeReady('laoliu', true);
                }
            },
            {
                id: 'll-out-3-disagree',
                label: '拒绝',
                onSent: () => {
                    setThreadState('laoliu', 'conditionChoice', 'disagree');
                    setThreadState('laoliu', 'time3', Date.now());
                    scheduleMailNotification('ll-in-3-disagree');
                }
            }
        ]
    },
    'll-in-2-inquiry': {
        id: 'll-in-2-inquiry',
        from: 'laoliu',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'laoliu',
            timeKey: 'time2'
        },
        bodyHTML: `
            <p>抱歉。</p>
            <p>我是做深度报道的，不提供打听服务，也没什么内部消息可以说。</p>
            <p>天启相关的内容，我会在公众号更新，感谢你的关注。</p>
            <p><strong>其他问题，恕我不再回复。</strong></p>
            <p>再见！</p>
        `
    },

    // ===== 老刘线程 · 第五封信（二选一） =====
    'll-out-3-agree': {
        id: 'll-out-3-agree',
        from: 'hanxiu',
        date: '2026-07-18',
        bodyHTML: `
            <p><strong>我同意你的条件。</strong></p>
            <p>只要能帮我拿到推荐资格，进去之后我会把接触到的信息，尽量发给你。</p>
        `
    },
    'll-out-3-disagree': {
        id: 'll-out-3-disagree',
        from: 'hanxiu',
        date: '2026-07-18',
        bodyHTML: `
            <p><strong>抱歉，这个条件我没法答应。</strong></p>
            <p>他们的保密协议那么厚，这事风险太大了。</p>
        `
    },

    // ===== 老刘线程 · 第六封信（time3 延时，二选一） =====
    'll-in-3-agree': {
        id: 'll-in-3-agree',
        from: 'laoliu',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'laoliu',
            timeKey: 'time3'
        },
        bodyHTML: `
            <p>行。</p>
            <p><strong>你等我消息，推荐信息我这边落实了发你邮箱。</strong></p>
            <p>记住我们的约定。</p>
        `
    },
    'll-in-3-disagree': {
        id: 'll-in-3-disagree',
        from: 'laoliu',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'laoliu',
            timeKey: 'time3'
        },
        bodyHTML: `
            <p>好。</p>
            <p>那就不多说了。</p>
        `
    },

    // ===== 老刘线程 · 第七封信（最终推荐码，codeTime 延时） =====
    'll-in-4-code': {
        id: 'll-in-4-code',
        from: 'laoliu',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'laoliu',
            timeKey: 'codeTime'
        },
        bodyHTML: `
            <p>韩休：</p>
            <p>推荐信息我帮你落实好了，你要是去了数据监测部他就是你的领导。</p>
            <div class="recommend-block">
                <hr>
                <div class="recommend-row"><span class="recommend-label">推荐人</span><span class="recommend-value">刘忙</span></div>
                <div class="recommend-row"><span class="recommend-label">推荐码</span><span class="recommend-value">REF#DAT-2026A05</span></div>
                <hr>
            </div>
            <p>你去天启科技官网招聘页，走内推通道提交就行，能不能过初筛看你自己。</p>
            <p>别忘了我们说好的事。</p>
        `
    },

    // ===== 小周线程 · 第一封信（二选一） =====
    'xz-out-1-work': {
        id: 'xz-out-1-work',
        from: 'hanxiu',
        date: '2026-07-18',
        subject: '想咨询有关天启科技的工作',
        bodyHTML: `
            <p>同学你好，</p>
            <p>我在西大论坛看到你入职天启的帖子，想问问天启科技的工作怎么样？方便聊聊吗？</p>
            <p>打扰了。</p>
        `
    },
    'xz-out-1-process': {
        id: 'xz-out-1-process',
        from: 'hanxiu',
        date: '2026-07-18',
        subject: '请教关于天启探索者招聘的事',
        bodyHTML: `
            <p>同学你好，</p>
            <p>看了你求职版发的天启探索者的帖子，我最近也在找工作。想问问关于"天启探索者"招聘流程的事。</p>
            <p>麻烦了。</p>
        `
    },

    // ===== 小周线程 · 第二封信（统一回复，time1 延时） =====
    'xz-in-1': {
        id: 'xz-in-1',
        from: 'xiaozhou',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'xiaozhou',
            timeKey: 'time1'
        },
        bodyHTML: `
            <p>同学，你好。</p>
            <p>不好意思，公司有相关规定，工作的事情我不方便透露。</p>
            <p><strong>如果是想投简历的话，官网有公开的招聘通道，你可以申请试试。</strong></p>
            <p>祝你求职顺利～</p>
        `,
        replyOptions: [
            {
                id: 'xz-out-2-job',
                label: '说想换工作求推荐',
                onSent: () => {
                    setThreadState('xiaozhou', 'secondChoice', 'job');
                    setThreadState('xiaozhou', 'time2', Date.now());
                    scheduleMailNotification('xz-in-2');
                    setMailCodeReady('xiaozhou', true);
                }
            },
            {
                id: 'xz-out-2-truth',
                label: '说出实情求推荐',
                onSent: () => {
                    setThreadState('xiaozhou', 'secondChoice', 'truth');
                    setThreadState('xiaozhou', 'time2', Date.now());
                    scheduleMailNotification('xz-in-2');
                    setMailCodeReady('xiaozhou', true);
                }
            }
        ]
    },

    // ===== 小周线程 · 第三封信（二选一） =====
    'xz-out-2-job': {
        id: 'xz-out-2-job',
        from: 'hanxiu',
        date: '2026-07-18',
        bodyHTML: `
            <p>小周同学，谢谢你的回复，是我唐突了。</p>
            <p><strong>其实我是西延本地的中学物理老师，我姓韩，最近打算换工作。</strong></p>
            <p>我看天启的社招只走内推通道，我没有相关人脉，实在没办法了才想问问你。</p>
            <p>方便的话，能不能帮我争取一个内推资格？</p>
        `
    },
    'xz-out-2-truth': {
        id: 'xz-out-2-truth',
        from: 'hanxiu',
        date: '2026-07-18',
        bodyHTML: `
            <p>小周同学，谢谢你的回复。</p>
            <p>抱歉之前没说明来意。</p>
            <p><strong>我叫韩休，我妻子叫丁文倩，在天启科技工作。上周她在南非项目中出了意外，公司始终没给出明确的说法。</strong></p>
            <p>我想入职公司查清真相，但社会招聘仅限内推，我没有别的路可走了。</p>
            <p>你能不能帮我争取一个内推资格？</p>
            <p>我知道这个请求很唐突，但还是想请你帮帮忙。</p>
        `
    },

    // ===== 小周线程 · 第四封信（统一回复，time2 延时） =====
    'xz-in-2': {
        id: 'xz-in-2',
        from: 'xiaozhou',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'xiaozhou',
            timeKey: 'time2'
        },
        bodyHTML: `
            <p>韩老师，您好，真的很抱歉。</p>
            <p>我也是靠家里亲戚推荐才进来的，刚入职没多久，就是最基层的实验员，还在试用期，根本没有内推权限。</p>
            <p>我挺想帮你的，但实在是无能为力，不好意思。</p>
        `
    },

    // ===== 小周线程 · 第五封信（沈曼推荐码，codeTime 延时） =====
    'xz-in-3': {
        id: 'xz-in-3',
        from: 'xiaozhou',
        date: '2026-07-18',
        arrivalRule: {
            type: 'delay',
            stateKey: 'xiaozhou',
            timeKey: 'codeTime'
        },
        bodyHTML: `
            <p>韩老师，您好，我是周小舟。</p>
            <p>之前没敢答应您，是因为公司的规矩特别严，我刚入职没多久，不敢乱说话。</p>
            <p>我和我亲戚提了您的情况，<strong>她说她认识您，也认识您的妻子丁文倩教授。她很理解您的遭遇和心情，愿意帮您做内部推荐，希望您能快点好起来。</strong></p>
            <div class="recommend-block">
                <hr>
                <div class="recommend-row"><span class="recommend-label">推荐人</span><span class="recommend-value">沈曼</span></div>
                <div class="recommend-row"><span class="recommend-label">推荐码</span><span class="recommend-value">REF#MAT-SM-A16</span></div>
                <hr>
            </div>
            <p>别再给我回邮件了，我怕被公司监测到，惹出不必要的麻烦。</p>
            <p>希望能帮到您，保重。</p>
        `
    },

    // ===== 丁文倩定时邮件 =====
    'dwq-final': {
        id: 'dwq-final',
        from: 'dingwenqian',
        date: '2026-07-18',
        subject: '韩休亲启',
        arrivalRule: {
            type: 'delay',
            stateKey: 'dingwenqian-mail',
            timeKey: 'triggerTime'
        },
        bodyHTML: `
            <div style="display:inline-block; background:rgba(192,57,43,0.06); border:1px solid rgba(192,57,43,0.2); border-radius:6px; padding:4px 10px; margin-bottom:16px; font-size:11px; color:#b85450; letter-spacing:0.02em;">
                此邮件为定时发送　编辑时间 [ 6月28日 23:53 ]
            </div>
            <p style="text-align:center; font-size:16px; margin:28px 0; color:#1d1d1f;"><strong>休，我是文倩，对不起。</strong></p>
            <a class="attachment-link" href="javascript:void(0)" onclick="openFileWindow('dwq-audio', '录音文件')">
                🎵 附件：20260628_dwq-recording.mp3
            </a>
        `
    }
};

// ========== 线程定义：只引用消息 ID 和逻辑 ==========
const threadsData = {
    'tianqi': {
        stateKey: 'tianqi',
        contactId: 'tq-security',
        messageIds: ['tq-001', 'tq-002', 'tq-003'],
        messageUnlock: {
            'tq-002': () => getThreadState('tianqi').signed === true,
            'tq-003': () => {
                const st = getThreadState('tianqi');
                return st.signed === true && Date.now() - st.signedTime >= DELAY_SHORT;
            }
        }
    },
    
    'tq-hr': {
        stateKey: 'tq-hr',
        contactId: 'tq-hr',
        messageIds: ['tq-hr-001'],
        messageUnlock: {
            'tq-hr-001': () => {
                const st = getThreadState('tq-hr');
                return st.triggerTime !== undefined && Date.now() - st.triggerTime >= DELAY_SHORT;
            }
        }
    },    

    'xiyan': {
        stateKey: 'xiyan',
        contactId: 'xiyan-phys',
        messageIds: ['xy-001']
    },

    'xiyan-title': {
        stateKey: 'xiyan-title',
        contactId: 'xiyan-aca',
        messageIds: ['xy-title-out-001', 'xy-title-in-001']
    },

    'lizhiming': {
        stateKey: 'lizhiming',
        contactId: 'lizhiming',
        messageIds: ['lzm-in-001', 'lzm-out-001']
    },

    'xingtu': {
        stateKey: 'xingtu',
        contactId: 'xingtu',
        messageIds: ['xt-out-001', 'xt-in-001']
    },

    'wangrui': {
        stateKey: 'wangrui',
        contactId: 'wangrui',
        messageIds: ['wr-in-001', 'wr-out-001']
    },

    'chenguoliang': {
        stateKey: 'chenguoliang',
        contactId: 'chenguoliang',
        messageIds: ['cgl-in-001', 'cgl-out-001']
    },

    'life-energy': {
        stateKey: 'life-energy',
        contactId: 'life-energy',
        messageIds: ['le-in-001']
    },

    'laoliu': {
        stateKey: 'laoliu',
        contactId: 'laoliu',
        outbox: [
            {
                id: 'll-out-1-cautious',
                unlock: () => getThreadState('laoliu').sent !== true &&
                                 localStorage.getItem('job_apply_attempted') === 'true',
                onSent: () => {
                    setThreadState('laoliu', 'sent', true);
                    setThreadState('laoliu', 'firstChoice', 'cautious');
                    setThreadState('laoliu', 'time1', Date.now());
                    scheduleMailNotification('ll-in-1');
                }
            },
            {
                id: 'll-out-1-half',
                unlock: () => getThreadState('laoliu').sent !== true &&
                                 localStorage.getItem('job_apply_attempted') === 'true',
                onSent: () => {
                    setThreadState('laoliu', 'sent', true);
                    setThreadState('laoliu', 'firstChoice', 'half');
                    setThreadState('laoliu', 'time1', Date.now());
                    scheduleMailNotification('ll-in-1');
                }
            },
            {
                id: 'll-out-1-reveal',
                unlock: () => getThreadState('laoliu').sent !== true &&
                                 localStorage.getItem('job_apply_attempted') === 'true',
                onSent: () => {
                    setThreadState('laoliu', 'sent', true);
                    setThreadState('laoliu', 'firstChoice', 'reveal');
                    setThreadState('laoliu', 'time1', Date.now());
                    scheduleMailNotification('ll-in-1');
                }
            }
        ],
        messageIds: [
            'll-out-1-cautious', 'll-out-1-half', 'll-out-1-reveal',
            'll-in-1',
            'll-out-2-truth', 'll-out-2-half', 'll-out-2-inquiry',
            'll-in-2-truth', 'll-in-2-half', 'll-in-2-inquiry',
            'll-out-3-agree', 'll-out-3-disagree',
            'll-in-3-agree', 'll-in-3-disagree',
            'll-in-4-code'
        ],
        messageUnlock: {
            'll-out-1-cautious': () => {
                const st = getThreadState('laoliu');
                return st.sent === true && st.firstChoice === 'cautious';
            },
            'll-out-1-half': () => {
                const st = getThreadState('laoliu');
                return st.sent === true && st.firstChoice === 'half';
            },
            'll-out-1-reveal': () => {
                const st = getThreadState('laoliu');
                return st.sent === true && st.firstChoice === 'reveal';
            },
            'll-in-1': () => {
                const st = getThreadState('laoliu');
                return st.sent === true && st.time1 !== undefined &&
                       Date.now() - st.time1 >= DELAY_SHORT;
            },
            'll-out-2-truth': () => getThreadState('laoliu').secondChoice === 'truth',
            'll-out-2-half': () => getThreadState('laoliu').secondChoice === 'half',
            'll-out-2-inquiry': () => getThreadState('laoliu').secondChoice === 'inquiry',
            'll-in-2-truth': () => {
                const st = getThreadState('laoliu');
                return st.secondChoice === 'truth' && st.time2 !== undefined &&
                       Date.now() - st.time2 >= DELAY_SHORT;
            },
            'll-in-2-half': () => {
                const st = getThreadState('laoliu');
                return st.secondChoice === 'half' && st.time2 !== undefined &&
                       Date.now() - st.time2 >= DELAY_SHORT;
            },
            'll-in-2-inquiry': () => {
                const st = getThreadState('laoliu');
                return st.secondChoice === 'inquiry' && st.time2 !== undefined &&
                       Date.now() - st.time2 >= DELAY_SHORT;
            },
            'll-out-3-agree': () => getThreadState('laoliu').conditionChoice === 'agree',
            'll-out-3-disagree': () => getThreadState('laoliu').conditionChoice === 'disagree',
            'll-in-3-agree': () => {
                const st = getThreadState('laoliu');
                return st.conditionChoice === 'agree' && st.time3 !== undefined &&
                       Date.now() - st.time3 >= DELAY_SHORT;
            },
            'll-in-3-disagree': () => {
                const st = getThreadState('laoliu');
                return st.conditionChoice === 'disagree' && st.time3 !== undefined &&
                       Date.now() - st.time3 >= DELAY_SHORT;
            },
            'll-in-4-code': () => {
                const st = getThreadState('laoliu');
                return st.conditionChoice === 'agree' && st.codeTime !== undefined &&
                       Date.now() - st.codeTime >= DELAY_SHORT;
            }
        }
    },

    'xiaozhou': {
        stateKey: 'xiaozhou',
        contactId: 'xiaozhou',
        outbox: [
            {
                id: 'xz-out-1-work',
                unlock: () => getThreadState('xiaozhou').sent !== true &&
                                 localStorage.getItem('job_apply_attempted') === 'true',
                onSent: () => {
                    setThreadState('xiaozhou', 'sent', true);
                    setThreadState('xiaozhou', 'firstChoice', 'work');
                    setThreadState('xiaozhou', 'time1', Date.now());
                    scheduleMailNotification('xz-in-1');
                }
            },
            {
                id: 'xz-out-1-process',
                unlock: () => getThreadState('xiaozhou').sent !== true &&
                                 localStorage.getItem('job_apply_attempted') === 'true',
                onSent: () => {
                    setThreadState('xiaozhou', 'sent', true);
                    setThreadState('xiaozhou', 'firstChoice', 'process');
                    setThreadState('xiaozhou', 'time1', Date.now());
                    scheduleMailNotification('xz-in-1');
                }
            }
        ],
        messageIds: [
            'xz-out-1-work', 'xz-out-1-process',
            'xz-in-1',
            'xz-out-2-job', 'xz-out-2-truth',
            'xz-in-2',
            'xz-in-3'
        ],
        messageUnlock: {
            'xz-out-1-work': () => {
                const st = getThreadState('xiaozhou');
                return st.sent === true && st.firstChoice === 'work';
            },
            'xz-out-1-process': () => {
                const st = getThreadState('xiaozhou');
                return st.sent === true && st.firstChoice === 'process';
            },
            'xz-in-1': () => {
                const st = getThreadState('xiaozhou');
                return st.sent === true && st.time1 !== undefined &&
                       Date.now() - st.time1 >= DELAY_SHORT;
            },
            'xz-out-2-job': () => getThreadState('xiaozhou').secondChoice === 'job',
            'xz-out-2-truth': () => getThreadState('xiaozhou').secondChoice === 'truth',
            'xz-in-2': () => {
                const st = getThreadState('xiaozhou');
                return (st.secondChoice === 'job' || st.secondChoice === 'truth') &&
                       st.time2 !== undefined &&
                       Date.now() - st.time2 >= DELAY_SHORT;
            },
            'xz-in-3': () => {
                const st = getThreadState('xiaozhou');
                return (st.secondChoice === 'job' || st.secondChoice === 'truth') &&
                       st.codeTime !== undefined &&
                       Date.now() - st.codeTime >= DELAY_SHORT;
            }
        }
    },

    'dingwenqian-mail': {
        stateKey: 'dingwenqian-mail',
        contactId: 'dingwenqian',
        messageIds: ['dwq-final'],
        messageUnlock: {
            'dwq-final': () => {
                const st = getThreadState('dingwenqian-mail');
                return st.triggerTime !== undefined && Date.now() - st.triggerTime >= DELAY_SHORT;
            }
        }
    }
};