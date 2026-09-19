// ========== 云数据中心数据 ==========
const intranetFilesData = {
    // 通知数据（Hero右侧使用）
    notices: [
        {
            id: 'security-warning',
            title: '2026-06-19 · 异常数据安全警告',
            sender: '安全合规部技术科',
            modalTitle: '异常数据安全警告',
            modalMeta: '安全合规部技术科 · 2026年06月19日',
            modalContent: `
                <p>在近期的档案审查中，<span style="color:#dc2626; font-weight:600;">发现部分内部资料被人为植入 [ 异常数据 ] 代码。</span>现已启动全面安全排查程序。</p>
                <p>如员工发现<span style="color:#dc2626; font-weight:600;"> [ 异常数据 ] </span>标记，<strong>请立即上报安全合规部，严禁复制、传播或尝试解码</strong>。</p>
                <p style="color:#6b7a8f; font-size:13px;">详情见《关于在科研文献中发现 [ 异常数据 ] 的安全通告》</p>
            `
        },
        {
            id: 'upgrade',
            title: '2026-01-02 · 云数据中心升级完成通知',
            sender: '安全合规部技术科',
            modalTitle: '云数据中心升级完成通知',
            modalMeta: '安全合规部技术科 · 2026年01月02日',
            modalContent: `
                <p>云数据中心已于1月1日完成系统升级，并重新调整访问权限。</p>
                <p>部门目录密码已重置并交由各部门总监。</p>
                <p><br>权限说明：</p>
                <p><strong>普通级：</strong>输入密码可访问<strong> [本人所属部门] </strong>资料<br>
                <strong>高级：</strong>输入密码可访问<strong> [所有部门] </strong>资料<br>
                <strong>最高级：</strong>可访问<strong> [所有] </strong>资料</p>
            `
        }
    ],

    // 根目录文件夹
    rootFolders: [
        { id: 'physics', name: '物理研究部', files: 1792, locked: false, icon: '📁' },
        { id: 'materials', name: '材料试验部', files: 2847, locked: true, icon: '📁' },
        { id: 'engineering', name: '工程技术部', files: 3162, locked: true, icon: '📁' },
        { id: 'exploration', name: '勘探行动部', files: 5234, locked: true, icon: '📁' },
        { id: 'security', name: '安全合规部', files: 1286, locked: true, icon: '📁' },
        { id: 'hr', name: '人力资源部', files: 943, locked: true, icon: '📁' },
        { id: 'finance', name: '财务部', files: 2318, locked: true, icon: '📁' }
    ],

    // 物理研究部快速访问入口
    quickAccess: [
        { id: 'recent', name: '最近阅读', icon: '🕐', count: 26, unit: '篇' },
        { id: 'collab', name: '协作文档', icon: '👥', count: 8, unit: '篇' },
        { id: 'favorites', name: '我的收藏', icon: '⭐', count: 69, unit: '篇' },
        { id: 'trash', name: '回收站', icon: '🗑️', count: 12, unit: '项' }
    ],

    // ========== 物理研究部资料库（平铺数组，靠 category 字段区分） ==========
    // category   - 文件类别：'literature' 资料文献 / 'reports' 研究报告
    // date       - 日期，格式 YYYY.MM.DD 或 YYYY.MM（用于排序和展示）
    // title      - 文件标题
    // author     - 作者（多人用“、”连接）
    // status     - 状态：'public' 公开 / 'encrypted' 加密
    // openable   - 是否可打开：true / false
    // target     - 点击后跳转地址，'#' 表示占位无跳转
    // showInCard - 是否显示在文件夹卡片中：true / false
    // searchable - 是否可被索引搜索：true / false
    // keywords   - 严格匹配的搜索关键词数组（不支持模糊搜索）
    // highlight  - 悬停高亮颜色：缺省为蓝色 'blue'，特殊标记 'red'

    physicsLibrary: [

        // ════════════════════════════════════
        // 资料文献（category: 'literature'）
        // ════════════════════════════════════

        // —— 格陵兰地球研究 ——
        {
            category: 'literature',
            date: '2024.12',
            title: '全球φ能量监测网络现状与展望',
            author: '格陵兰地球研究',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: true,
            searchable: true,
            keywords: ['全球φ能量监测网络现状与展望', '格陵兰地球研究', 'φ能量']
        },

        // —— 北大西洋深地能源研究组 ——
        {
            category: 'literature',
            date: '2018.05',
            title: '深水φ能量探测技术路线详解',
            author: '北大西洋深地能源研究组',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: true,
            searchable: true,
            keywords: ['多维实体探测技术路线图', '北大西洋深地能源研究组', 'φ能量']
        },
        // —— 亚历山大·沃斯曼 ——
        {
            category: 'literature',
            date: '2002.11',
            title: '全球多维实体研究格局与战略评估',
            author: '亚历山大·沃斯曼',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['全球多维实体研究格局与战略评估', '亚历山大·沃斯曼', '多维实体', '目标']
        },

        // —— 康斯坦丁·V·别列斯特涅夫 ——
        {
            category: 'literature',
            date: '1994.03',
            title: 'φ能量：理论框架与实证路径',
            author: '康斯坦丁·V·别列斯特涅夫',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: true,
            searchable: true,
            keywords: ['φ能量：理论框架与实证路径', '康斯坦丁', 'φ能量']
        },

        // —— 周岳维 ——
        {
            category: 'literature',
            date: '1986.10',
            title: '罗布泊地区异常水文记录',
            author: '周岳维',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['罗布泊地区异常水文记录', '周岳维', '罗布泊', 'φ能量']
        },
        {
            category: 'literature',
            date: '1988.10',
            title: '封闭水体中异常能量富集现象的初步观察',
            author: '周岳维 许远峰',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['封闭水体中异常能量富集现象的初步观察', '周岳维', '许远峰', 'φ能量']
        },
        {
            category: 'literature',
            date: '1992.04',
            title: 'φ能量相变与多维实体形成临界条件探讨',
            author: '周岳维',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['φ能量相变与多维实体形成临界条件探讨', '周岳维', 'φ能量', '多维实体', '目标', '临界条件']
        },
        {
            category: 'literature',
            date: '2001.09',
            title: '多维实体解体后水体的异常电磁反应',
            author: '周岳维',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['多维实体解体后水体的异常电磁反应', '周岳维', '多维实体', '目标', '水体', '电磁反应']
        },

        // —— 哈里森·F·惠特莫尔 ——
        {
            category: 'literature',
            date: '1978.05',
            title: '未知水下能源现象初步考察报告',
            author: '哈里森·F·惠特莫尔',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['未知水下能源现象初步考察报告', '哈里森', 'φ能量']
        },

        // —— 苏联地质部考察队 ——
        {
            category: 'literature',
            date: '1969.03',
            title: '东西伯利亚异常自然现象记录 [翻译件]',
            author: '苏联地质部考察队',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: true,
            searchable: true,
            keywords: ['东西伯利亚异常自然现象记录', '苏联地质部考察队', '异常自然现象']
        },
    
        // —— 许远峰 ——
        {
            category: 'literature',
            date: '未知',
            title: '多维实体：人类意识与存在',
            author: '许远峰',
            status: 'encrypted',
            openable: true,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['多维实体：人类意识与存在', '许远峰', '多维实体', '目标', '人类意识']
        },
        {
            category: 'literature',
            date: '2012.06',
            title: '多维实体 [ 目标 ] 概述：技术特性',
            author: '许远峰',
            status: 'public',               // 例外：这篇公开可打开
            openable: true,
            target: 'paper.html?id=entity-overview',
            showInCard: false,
            searchable: true,
            highlight: 'red',
            keywords: ['多维实体 [ 目标 ] 概述：技术特性', '多维实体概述', '许远峰', '多维实体', '目标', '技术特性', 'masterkey']
        },
        {
            category: 'literature',
            date: '2011.05',
            title: '多维实体目击与接触事件汇编[1969—2011]',
            author: '许远峰',
            status: 'encrypted',
            openable: true,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['多维实体目击与接触事件汇编', '许远峰', '多维实体', '目标', '目击', '接触事件']
        },
        {
            category: 'literature',
            date: '2007.08',
            title: '周岳维接触事件相关记录研判',
            author: '许远峰',
            status: 'encrypted',
            openable: true,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['周岳维触事件相关记录研判', '许远峰', '周岳维', '目标', '接触事件']
        },
        {
            category: 'literature',
            date: '2000.11',
            title: '多维实体能源化前景评估',
            author: '许远峰',
            status: 'encrypted',
            openable: true,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['多维实体能源化前景评估', '许远峰', '多维实体', '目标', '能源化']
        },

        // —— 罗建立 ——
        {
            category: 'literature',
            date: '2015.08',
            title: '[ 目标 ] 研究纪实档案 · 天启科技汇编',
            author: '罗建立',
            status: 'public',
            openable: true,
            target: 'paper.html?id=chronicle',
            showInCard: true,
            searchable: true,
            highlight: 'red',
            keywords: ['纪实档案', '研究纪实档案', '罗建立', '多维实体', '目标', 'masterkey']

        },
        // —— 异常 ——
        {
            category: 'literature',
            date: '2026.06',
            title: '关于在科研文献中发现 [ 异常数据 ] 的安全通告',
            author: '安全合规部',
            status: 'public',
            openable: true,
            target: 'paper.html?id=security-notice',
            showInCard: false,
            searchable: true,
            highlight: 'red',
            keywords: ['异常', '异常数据', '安全通告', 'masterkey', '关于在科研文献中发现 [ 异常数据 ] 的安全通告']
        },        

        // ════════════════════════════════════
        // 研究报告（category: 'reports'）
        // ════════════════════════════════════
        // —— 丁文倩 ——
        {
            category: 'reports',
            date: '2026.04',
            title: 'φ能量******讨论稿',
            author: '丁文倩',
            status: 'encrypted',
            openable: true,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['φ能量维度跃迁行为实验', '丁文倩', '目标']
        },
        {
            category: 'reports',
            date: '2026.04',
            title: '凝聚态φ能量：储能机制与可控释放',
            author: '丁文倩',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['凝聚态φ能量：储能机制与可控释放', '丁文倩', '储能机制']
        },
        {
            category: 'reports',
            date: '2026.03',
            title: 'φ能量******溯源',
            author: '丁文倩 沈曼',
            status: 'encrypted',
            openable: true,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['φ能量激增原理与多维空间溯源', '丁文倩', '沈曼', 'φ能量']
        }, 
        {
            category: 'reports',
            date: '2024.06',
            title: 'φ能量起源假说',
            author: '丁文倩',
            status: 'public',
            openable: true,
            target: 'paper.html?id=phi-energy-storage',
            showInCard: false,
            searchable: true,
            highlight: 'red',
            keywords: ['φ能量起源假说', '丁文倩', 'φ能量', 'masterkey']
        },
        {
            category: 'reports',
            date: '2022.08',
            title: 'φ能量理论储能极限',
            author: '丁文倩 沈曼',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['φ能量理论储能极限', '丁文倩', '沈曼', 'φ能量']
        },       
        // —— 沈曼 ——
        {
            category: 'reports',
            date: '2026.07',
            title: '高浓度φ能量对生物细胞活性的影响',
            author: '沈曼',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: true,
            searchable: true,
            keywords: ['高浓度φ能量对生物细胞活性的影响', '沈曼', 'φ能量']
        },
        {
            category: 'reports',
            date: '2025.08',
            title: '不同压力环境下φ能量释放速率比较',
            author: '沈曼 温子衡',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: false,
            keywords: ['不同压力环境下φ能量释放速率比较', '沈曼', '温子衡', 'φ能量']
        },
        {
            category: 'reports',
            date: '2025.02',
            title: 'φ能量水体储能稳定性与温度相关性研究',
            author: '沈曼 陈一苇',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['φ能量水体储能稳定性与温度相关性研究', '沈曼', '陈一苇', 'φ能量']
        },
        {
            category: 'reports',
            date: '2024.07',
            title: '高浓度φ能量水样微晶析出记录与分析',
            author: '沈曼',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['高浓度φ能量水样微晶析出记录与分析', '沈曼', 'φ能量']
        },
        {
            category: 'reports',
            date: '2023.02',
            title: '高浓度φ水体样本保存与实验操作规范',
            author: '沈曼 邵然',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['高浓度φ水体样本保存与实验操作规范', '沈曼', '邵然', 'φ能量']
        },              
        {
            category: 'reports',
            date: '2026.03',
            title: 'φ能量在水体中的储存稳定性研究',
            author: '方婧',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: true,
            searchable: true,
            keywords: ['φ能量在水体中的储存稳定性研究', '方婧', 'φ能量']
        },
        
        // —— 刘忙 ——
        {
            category: 'reports',
            date: '2026.04',
            title: 'φ能量活动与地磁异常的同步观测',
            author: '罗玉琦',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: true,
            searchable: true,
            keywords: ['φ能量活动与地磁异常的同步观测', '罗玉琦', '地磁场', 'φ能量']
        },
        {
            category: 'reports',
            date: '2026.01',
            title: '全球水体φ能量分区域统计',
            author: '刘忙',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: true,
            searchable: true,
            keywords: ['全球水体φ能量分区域统计', '刘忙', '水体样本', 'φ能量']
        },
        {
            category: 'reports',
            date: '2024.08',
            title: '罗布泊深层水体样本φ能量浓度年度分析',
            author: '刘忙 罗玉琦',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['罗布泊深层水体样本φ能量浓度年度分析', '刘忙', '罗布泊', '罗玉琦', '深层水体', 'φ能量']
        },
        {
            category: 'reports',
            date: '2022.12',
            title: 'φ能量全球监测网络节点灵敏度升级报告',
            author: '刘忙',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['φ能量全球监测网络节点灵敏度升级报告', '刘忙', 'φ能量', '监测网络', '灵敏度']
        },
        {
            category: 'reports',
            date: '2021.05',
            title: '罗布泊地区φ能量基础浓度年度报告',
            author: '刘忙',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['罗布泊地区φ能量基础浓度年度报告', '刘忙', '罗布泊', 'φ能量', '基础浓度']
        },
        {
            category: 'reports',
            date: '2019.07',
            title: '监测点异常信号捕捉与校验方法',
            author: '刘忙 秦朗',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['监测点异常信号捕捉与校验方法', '刘忙', '秦朗', '监测点', '异常信号', '校验']
        },

        // —— 钟明远 ——
        {
            category: 'reports',
            date: '2025.12',
            title: '探测设备干扰与材料损坏记录',
            author: '钟明远 许程',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: true,
            searchable: true,
            keywords: ['探测设备干扰与材料损坏记录', '钟明远', '探测设备']
        },
                {
            category: 'reports',
            date: '2025.08',
            title: '特种采集设备长周期稳定性测试记录',
            author: '钟明远',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['特种采集设备长周期稳定性测试记录', '钟明远', '特种采集设备', '稳定性测试']
        },
        {
            category: 'reports',
            date: '2025.04',
            title: '第三代采集设备极寒环境适应性测试报告',
            author: '钟明远 许程',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['第三代采集设备极寒环境适应性测试报告', '钟明远', '许程', '第三代采集设备', '极寒环境']
        },
        {
            category: 'reports',
            date: '2024.06',
            title: '目标近场环境下设备失效模式与防护优化',
            author: '钟明远',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['目标近场环境下设备失效模式与防护优化', '钟明远', '目标近场环境', '设备失效', '防护优化']
        },
        {
            category: 'reports',
            date: '2024.01',
            title: '第二代采集设备雨林环境适应性测试报告',
            author: '钟明远 许程',
            status: 'public',
            openable: false,
            target: '#',
            showInCard: false,
            searchable: true,
            keywords: ['第二代采集设备雨林环境适应性测试报告', '钟明远', '许程', '第二代采集设备', '雨林环境']
        },
        // —— 异常 ——
        {
            category: 'reports',
            date: '2026.06',
            title: '关于在科研文献中发现 [ 异常数据 ] 的安全通告',
            author: '安全合规部',
            status: 'public',
            openable: true,
            target: 'paper.html?id=security-notice',
            showInCard: false,
            searchable: true,
            highlight: 'red',
            keywords: ['异常', '异常数据', '安全通告', 'masterkey', '关于在科研文献中发现 [ 异常数据 ] 的安全通告']
        },        
    ]
};