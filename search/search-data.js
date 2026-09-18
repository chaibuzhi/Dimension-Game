// ========== 搜索数据库 ==========
// 字段说明：
//   title    - 标题
//   url      - 显示在结果中的网址
//   source   - 来源站点名称
//   desc     - 描述文字
//   keywords - 触发该结果的关键词数组（多个关键词可触发同一条）
//   target   - 点击后跳转的 URL（实际链接）
//   fuzzy    - 是否支持模糊搜索。true=模糊匹配（查询词包含关键词或关键词包含查询词）
//              false=精确匹配（必须完全相等）
//   priority - 排序优先级 1~5，1 最前。同一优先级内随机排序。
//              当前仅 2~5，priority 1 由开发者手动指定。
//   hidden   - ture=不参与搜索，false=参与搜索

const searchDatabase = [

    // ════════════════════════════════════
    // 天启科技官网
    // ════════════════════════════════════
    {
        title: '天启科技 - 探索能源，启迪未来',
        url: 'www.revelation-tech.com',
        source: '天启科技',
        desc: '天启科技，专注于能源勘探、特种装备与能源材料领域，致力于全球能源探索。',
        keywords: ['天启科技','罗建立'],
        target: '../tianqi/home.html',
        fuzzy: true,
        priority: 1
    },
    {
        title: '天启科技携手南极科考站，开启极地能源新篇章',
        url: 'www.revelation-tech.com/news',
        source: '天启科技',
        desc: '天启科技与南极科考站签署深化合作协议，全球能源勘探网络正式延伸至南极大陆。',
        keywords: ['天启科技', '南极'],
        target: '../tianqi/news-detail.html?id=news01',
        fuzzy: true,
        priority: 3
    },
    {
        title: '天启科技南非勘探行动正式启程',
        url: 'www.revelation-tech.com/news',
        source: '天启科技',
        desc: '天启科技南非勘探团队正式启程，丁文倩教授带队，深入深层地下水系采集样本。',
        keywords: ['天启科技', '南非', '勘探', '丁文倩'],
        target: '../tianqi/news-detail.html?id=news02',
        fuzzy: true,
        hidden: true,
        priority: 3
    },
    {
        title: '天启科技全面强化勘探队安全保障体系',
        url: 'www.revelation-tech.com/news',
        source: '天启科技',
        desc: '天启科技完成勘探队安全保障体系全面升级，涵盖四大维度，确保一线人员安全。',
        keywords: ['天启科技', '石冬'],
        target: '../tianqi/news-detail.html?id=news03',
        fuzzy: true,
        hidden: true,
        priority: 4
    },
    {
        title: '丁文倩教授受邀出席 2026 国际能源论坛',
        url: 'www.revelation-tech.com/news',
        source: '天启科技',
        desc: '丁文倩教授出席2026国际能源论坛，就新型水体能源研究成果发表专题报告，获高度关注。',
        keywords: ['丁文倩', '全球能源发展峰会', 'GEDS', '能源论坛'],
        target: '../tianqi/news-detail.html?id=news04',
        fuzzy: true,
        priority: 3
    },
    {
        title: '天启科技获评"国家能源科技创新示范企业"',
        url: 'www.revelation-tech.com/news',
        source: '天启科技',
        desc: '天启科技凭借在极端环境能源勘探、特种探测装备及新型储能材料领域的技术积累成功入选。',
        keywords: ['天启科技', '国家能源','罗建立'],
        target: '../tianqi/news-detail.html?id=news05',
        fuzzy: false,
        priority: 4
    },
    {
        title: '新型水体能源研究取得关键进展',
        url: 'www.revelation-tech.com/news',
        source: '天启科技',
        desc: '天启科技物理研究部在新型水体能源方向取得关键进展，相关成果已提交至《凝聚态物理学报》。',
        keywords: ['φ能量', '沈曼', '丁文倩'],
        target: '../tianqi/news-detail.html?id=news06',
        fuzzy: true,
        priority: 4
    },
    {
        title: '罗布泊全球能源监测站完成第三期扩建',
        url: 'www.revelation-tech.com/news',
        source: '天启科技',
        desc: '天启科技罗布泊全球能源监测站第三期扩建工程正式竣工投用，数据监测与样本存储能力显著提升。',
        keywords: ['天启科技', '罗布泊','刘忙'],
        target: '../tianqi/news-detail.html?id=news07',
        fuzzy: true,
        hidden: true,
        priority: 4
    },
    {
        title: '2026年「天启探索者」全球人才招聘启动',
        url: 'www.revelation-tech.com/news',
        source: '天启科技',
        desc: '天启科技正式启动 2026 年度「天启探索者」全球人才招聘计划，聚焦六大核心研发方向。',
        keywords: ['天启科技', '天启探索者', '招聘'],
        target: '../tianqi/news-detail.html?id=news08',
        fuzzy: true,
        priority: 2
    },
    {
        title: '天启科技三十周年：从实验室到探索者',
        url: 'www.revelation-tech.com/news',
        source: '天启科技',
        desc: '天启科技迎来成立三十周年。从一间小型物理实验室起步，如今已发展为覆盖能源、材料与勘探的综合性科技公司。',
        keywords: ['天启科技','探索者','罗建立'],
        target: '../tianqi/news-detail.html?id=news09',
        fuzzy: true,
        hidden: true,
        priority: 3
    },

    // ════════════════════════════════════
    // 能源观察网
    // ════════════════════════════════════
    {
        title: 'GEDS观察：天启科技专题报告引质疑',
        url: 'www.energy-watch.cn/geds/2026-05-24',
        source: '能源观察',
        desc: '5月18日，全球能源发展峰会在西延举行。天启科技丁文倩教授就《φ能量的储能特性与理论极限》作专题报告，遭多位学者质疑。',
        keywords: ['全球能源发展峰会','GEDS','丁文倩','凝聚态φ能量：储能机制与可控释放'],
        target: '../web/nygc/geds.html',
        fuzzy: false,
        priority: 2
    },

    // ════════════════════════════════════
    // 前沿物理评论
    // ════════════════════════════════════
    {
        title: '丁文倩：边缘之上，唯有真相',
        url: 'www.frontier-physics-review.cn/people/dingwenqian',
        source: '前沿物理评论',
        desc: 'GEDS峰会结束后，本刊在西延酒店对丁文倩教授进行专访。她谈及φ能量研究、加入天启科技的原因，以及即将启程的南非勘探行动。',
        keywords: ['前沿物理评论'],
        target: '../web/qywl/interview.html',
        fuzzy: false,
        priority: 2
    },

    // ════════════════════════════════════
    // 地勘前沿
    // ════════════════════════════════════
    {
        title: '南非北开普省能源勘探项目发生人员伤亡',
        url: 'www.geofrontier.cn/accident/2026-07-17',
        source: '地勘前沿',
        desc: '7月中旬，南非北开普省一处能源勘探项目发生人员伤亡事故，涉事企业为天启科技。公司未披露死亡人数与死因。',
        keywords: ['天启科技', '南非', '事故', '勘探', '伤亡'],
        target: '../web/dkqy/accident.html',
        fuzzy: true,
        priority: 2
    },

    // ════════════════════════════════════
    // 深水财经（微信公众号）
    // ════════════════════════════════════
    {
        title: '三问天启科技：不回答、不表态、不负责。',
        url: 'mp.weixin.qq.com/s/deepwater-finance',
        source: '深水财经',
        desc: '国内能源科技行业，有一家公司很"特别"。它上一款被市场记住的产品停留在2018年，烧钱速度却从未停滞。',
        keywords: ['天启科技', '天启探索者', '三问', '深水财经', 'φ能量'],
        target: '../web/wechat/3questions.html',
        fuzzy: true,
        priority: 2
    },

    // ════════════════════════════════════
    // 国家能源局
    // ════════════════════════════════════
    {
        title: '国家能源科技重点合作机构名单（2021年度）',
        url: 'www.nea.gov.cn/kjzb/2021-12-18',
        source: '国家能源局',
        desc: '根据《国家能源科技创新发展规划》有关要求，现将2021年度国家能源科技重点合作机构名单予以公示。天启科技位列其中。',
        keywords: ['国家能源局', '天启科技'],
        target: '../web/nea/list.html',
        fuzzy: true,
        priority: 3
    },

    // ════════════════════════════════════
    // 西延大学校园论坛
    // ════════════════════════════════════
    {
        title: '求职求助！天启探索者计划值得去吗？',
        url: 'bbs.xiyan-univ.edu.cn/thread-20260225',
        source: '西延大学校园论坛',
        desc: '化学系硕士在线破防：天启科技"天启探索者"值得去吗？从笔试、面试到拿到offer，楼主最终留下一句"本帖不再回复"后消失。',
        keywords: ['天启科技', '天启探索者', '招聘', '求职', '西延大学'],
        target: '../web/xybbs/job.html',
        fuzzy: true,
        priority: 3
    },

    // ════════════════════════════════════
    // 外部工具站
    // ════════════════════════════════════
    {
        title: 'Base64 在线编码解码工具',
        url: 'base64.iexam.mobi',
        source: '在线工具站',
        desc: '免费在线 Base64 编码解码工具，支持文本、图片、文件双向转换。无需下载，即开即用。',
        keywords: ['base64', '异常', '数据', '解码'],
        target: 'https://base64.iexam.mobi/',
        fuzzy: true,
        priority: 1
    }
];