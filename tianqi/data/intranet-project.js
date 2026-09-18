// ========== 内网项目中心数据 ==========
const intranetProjectData = {
    tianqiProject: {
        id: 'tianqi',
        name: '天启计划',
        password: 'onlytruth',
        status: 'locked',
        statusText: '二级权限',
        summary: '天启科技最高等级项目，内容已加密。',
        detail: {
            period: '长期 · 核心机密',
            leader: '丁文倩',
            goal: '寻找并研究多维实体，验证人类意识与高维空间之间的联系。',
            desc: '（该项目信息页暂未开放）'
        }
    },
    projects: [
        //右
        {
            id: 'australia',
            name: '信息安全防控',
            category: '风控',          // 新增
            period: '2026.03 - 至今',
            leader: '待定',
            status: 'active',
            statusText: '进行中',
            goal: '……',
            desc: '……'
        },
        //右下
        {
            id: 'mexico',
            name: '采集设备4.0研发',
            category: '设备',        // 新增
            period: '2026.07 - 2026.09',
            leader: '工程技术部',
            status: 'active',
            statusText: '进行中',
            goal: '……',
            desc: '……'
        },
        //左下
        {
            id: 'phi-research',
            name: 'φ能量原理研究',
            category: '实验',
            projectNo: 'TQ/RD-2022-P1-PHI',
            location: '西延总部 / 罗布泊监测站',
            classification: '三级',
            period: '2022.09 - 至今',
            leader: '丁文倩',
            dept: '物理研究部',
            status: 'active',
            statusText: '进行中',
            detail: {
                participants: '物理研究部 材料实验部 数据监测部',
                overview: `
                    <p>本项目为「天启计划」核心项目之一，旨在探明φ能量与「目标」的本质规律，最终实现安全可控利用。</p>
                `,
                currentStatus: `
                    <div class="status-left">进行中</div>
                    <div class="status-divider"></div>
                    <div class="status-right">该项目自2021年启动，持续进行至今，当前研究重点集中在φ能量的相变与解体机制。</div>
                `,                
                researchDirections: [
                    { num: '01', title: '储能原理', desc: 'φ 能量<br>核心储存原理' },
                    { num: '02', title: '释放原理', desc: 'φ 能量<br>从水体中释放' },
                    { num: '03', title: '相变机制', desc: 'φ 能量水体<br>转化为「目标」' },
                    { num: '04', title: '解体机制', desc: '「目标」解体<br>能量释放规律' }
                ],
                researchMethods: [
                    { title: '全球监测', desc: '数据监测部持续监测全球各地水体的φ能量指数，锁定「目标」可能出现的区域。' },
                    { title: '现场采样', desc: '勘探行动部前往目标区域采集「目标」。目前尚未成功获取「目标」样本，仅采集到「目标」形成前后的水体样本。' },
                    { title: '实验分析', desc: '材料实验部对水体样本展开对照实验，观测能量响应与异常现象。' },
                    { title: '理论推导', desc: '物理研究部基于实验数据开展数值计算与理论推导，构建理论模型，逐步揭开φ能量与「目标」的底层规律。' }
                ]
            }
        },
        //左
        {
            id: 'luobupo',
            name: '全球监测网络',
            category: '监测',          // 新增
            period: '长期运行',
            leader: '刘忙',
            status: 'active',
            statusText: '进行中',
            goal: '持续监测全球φ能量波动，为各勘探行动提供数据支持与异常预警。',
            desc: '天启科技全球监测网络的核心节点，位于罗布泊前哨站。'
        },
        //左上
    {
        id: 'south-africa',
        name: '南非行动',
        category: '勘探',
        projectNo: 'TQ/EXP-2026-P0-SA',
        location: '南非 · 北开普省 28°35′S, 23°10′E',
        classification: '三级',
        period: '2026.02 - 2026.07',
        leader: '丁文倩',
        dept: '物理研究部',
        status: 'ended',
        statusText: '已终止',
        detail: {
            overview: `
                <p>2026年1月，罗布泊监测站在全球能量监测网络中发现，南非区域能量指数出现强烈波动，「目标」出现概率极大。经公司年度工作会议决议，发起「南非行动」。</p>
                <p>行动原计划于2026年9月执行，因南非区域能量指数迅速增长提前至6月底。</p>
            `,
            objectives: [
                { text: '监测数据锁定并找到「目标」', status: 'done' },
                { text: '使用第三期探测设备获取「目标」样本', status: 'failed' },
                { text: '评估高能量环境下持续作业的生理耐受性', status: 'failed' }
            ],
            currentStatus: `
                <div class="status-left">已终止</div>
                <div class="status-divider"></div>
                <div class="status-right">因行动期间<strong> 队员违反行动安全协定，导致「目标」解体，造成人员死亡。</strong>相关数据与样本、实验体已封存。行动档案移交安全合规部处理。</div>
            `,
            tracking: [
                {
                    date: '2026.07.14',
                    type: '事故',
                    title: 'TQ/EXP-2026-P0-SA 行动终止事故报告.pdf',
                    typeClass: 'red',
                    isAccident: true
                },
                {
                    date: '2026.07.13',
                    type: '勘探',
                    title: '勘探进度-R0103',
                    summary: '方案已获批，爆破装置部署完毕，计划于14日上午6:00进行爆破，随后进入山体内部获取「目标」。',
                    reportor: '勘探行动部',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.07.08',
                    type: '勘探',
                    title: '勘探进度-R0102',
                    summary: '已确认「目标」位置，信号来自山体内部，需进行爆破作业；爆破方案已提交当地部门，需安全合规部配合催办审批流程。',
                    reportor: '勘探行动部',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.07.04',
                    type: '勘探',
                    title: '勘探进度-R0101',
                    summary: '队伍已抵达南非目标区域，全员就位并开展地面全域勘测，以确认「目标」具体位置。',
                    reportor: '勘探行动部',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.06.07',
                    type: '通知',
                    title: '行动时间二次调整',
                    summary: '总裁办再次发布行动时间调整通知，由8月提前至6月30日。',
                    reportor: '总裁办',
                    typeClass: 'red'
                },
                {
                    date: '2026.06.01',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年6月 监测站发布窗口期预警，南非区域能量指数已越过临界阈值，「目标」可能已经出现，窗口期可能缩短至60天左右。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.05.10',
                    type: '通知',
                    title: '行动时间调整',
                    summary: '总裁办临时发布时间调整通知，南非行动时间由9月提前至8月。',
                    reportor: '总裁办',
                    typeClass: 'red'
                },
                {
                    date: '2026.05.04',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年5月 南非区域能量指数呈爆发式增长，已达到该区域的历史最高值，「目标」或已出现。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.04.18',
                    type: '会议',
                    title: '南非行动第三次筹备会议',
                    reportor: '项目组',
                    typeClass: 'purple',
                    expandable: true,
                    content: `
                        <div class="meeting-section">
                            <span class="meeting-tag">与会人员</span>
                            <div class="meeting-attendees-text">
                                <span class="meeting-person">总裁办 罗建立</span>
                                <span class="meeting-person">物理研究部 丁文倩</span>
                                <span class="meeting-person">勘探行动部 石冬</span>
                                <span class="meeting-person">工程技术部 钟明远</span>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">会议摘要</span>
                            <div class="meeting-body">
                                <p>罗建立在会上提出，南非数据上升明显，<strong>若「目标」提前出现，行动须同步前置。</strong></p>
                                <p>钟明远汇报，第三期探测设备尚在调试，当前无法满足直接接触「目标」的技术标准。</p>
                                <p>丁文倩表示可协调实验室样本资源，优先保障设备测试。</p>
                                <p>会议决定，各部门立即进入高强度筹备状态。</p>
                                <p><strong>后续项目进度直接向罗建立单独汇报，不再组织会议。</strong></p>
                            </div>
                        </div>
                    `
                },
                {
                    date: '2026.04.05',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年4月 南非区域能量指数增速大幅上升，已超出预警水平，「目标」可能提前出现。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.03.16',
                    type: '会议',
                    title: '南非行动第二次筹备会议',
                    reportor: '项目组',
                    typeClass: 'purple',
                    expandable: true,
                    content: `
                        <div class="meeting-section">
                            <span class="meeting-tag">与会人员</span>
                            <div class="meeting-attendees-text">
                                <span class="meeting-person">总裁办 罗建立</span>
                                <span class="meeting-person">物理研究部 丁文倩</span>
                                <span class="meeting-person">勘探行动部 石冬</span>
                                <span class="meeting-person">工程技术部 钟明远</span>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">会议摘要</span>
                            <div class="meeting-body">
                                <p>罗建立临时宣布调整南非行动组织架构：</p>
                                <p><strong>改由物理研究部牵头，丁文倩担任行动领队，新增三号科研任务目标。</strong>石冬提出异议。</p>
                                <p>罗建立回应，实验室已验证丁文倩《φ能量起源假说》的核心结论，研究取得突破性进展。</p>
                                <p><strong>「目标」并非单纯的采样对象，南非行动需要物理研究部深度介入。</strong></p>
                                <p>钟明远汇报，第三期探测设备已投入生产。</p>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">附件</span>
                            <div class="meeting-attachment-block">
                                <span class="attachment-card">
                                    <span class="attachment-icon">📄</span>
                                    <span class="attachment-name">关于调整南非行动组织架构的通知.pdf</span>
                                </span>
                            </div>
                        </div>
                    `
                },
                {
                    date: '2026.03.08',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年3月 南非区域能量指数持续攀升，接近预警水平。同期南极区域能量指数上升，两地关联性暂未探明。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.02.14',
                    type: '会议',
                    title: '南非行动第一次筹备会议',
                    reportor: '项目组',
                    typeClass: 'purple',
                    expandable: true,
                    content: `
                        <div class="meeting-section">
                            <span class="meeting-tag">与会人员</span>
                            <div class="meeting-attendees-text">
                                <span class="meeting-person">总裁办 罗建立</span>
                                <span class="meeting-person">勘探行动部 石冬</span>
                                <span class="meeting-person">工程技术部 钟明远</span>
                                <span class="meeting-person">人力资源部 吴念清</span>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">会议摘要</span>
                            <div class="meeting-body">
                                <p>《南非行动计划书》经审批通过，项目正式立项。</p>
                                <p>会议明确：工程技术部与勘探行动部同步启动设备调试与人员训练。</p>
                                <p>石冬提出增补6名外勤队员。</p>
                                <p><strong>吴念清确认将提前启动「天启探索者」专项招聘计划。</strong></p>
                                <p>罗建立要求所有新入职人员于5月前完成考核与岗前培训。</p>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">附件</span>
                            <div class="meeting-attachment-block">
                                <span class="attachment-card">
                                    <span class="attachment-icon">📄</span>
                                    <span class="attachment-name">TQ/EXP-2026-P0-SA 南非行动计划.pdf</span>
                                </span>
                            </div>
                        </div>
                    `
                },
                {
                    date: '2026.02.03',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年2月 南非区域能量指数稳定增长，建议维持现有监测频率。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.01.10',
                    type: '会议',
                    title: '年度工作部署会议',
                    reportor: '项目组',
                    typeClass: 'purple',
                    expandable: true,
                    content: `
                        <div class="meeting-section">
                            <span class="meeting-tag">与会人员</span>
                            <div class="meeting-attendees-text">
                                <span class="meeting-person">总裁办 罗建立</span>
                                <span class="meeting-person">各部门总监</span>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">会议摘要</span>
                            <div class="meeting-body">
                                <p>天启科技年度工作部署会议于1月10日召开。</p>
                                <p>刘忙就全球φ能量监测数据作汇报，<strong>指出南非区域能量波动异常强烈，「目标」年内出现概率极高。</strong></p>
                                <p>罗建立要求勘探行动部立即启动前期筹备，于2月中旬前提交正式行动计划书。</p>
                                <p>刘忙建议暂缓立项，观察一月再行决策，罗建立未予采纳。</p>
                            </div>
                        </div>
                    `
                },
                {
                    date: '2026.01.06',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年1月 全球φ能量监测网数据显示，南非区域能量指数显著抬升，峰值环比增长约20%，已列入重点监测区域。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                }
            ]
        }
    },
        //右上
    {
        id: 'polar',
        name: '极地行动',
        category: '勘探',
        projectNo: 'TQ/EXP-2025-P2-PL',
        location: '南极洲 · 西部 75°30′S, 135°00′W',
        classification: '三级',
        period: '2025.06 - 至今',
        leader: '石冬',
        dept: '勘探行动部',
        status: 'active',
        statusText: '进行中',
        detail: {
            overview: `
                <p>2025年6月，罗布泊监测站在全球φ能量监测网络中发现，南极区域φ能量指数上升，公司据此启动「极地行动」项目。立项后，南极区域数据持续下跌，导致行动搁置。</p>
                <p>2026年3月，南极区域能量指数回升并持续增长，项目重启。因同期南非行动已进入关键阶段，前期筹备工作由安全合规部先行推进。</p>
            `,
            objectives: [],
            currentStatus: `
                <div class="status-left">进行中</div>
                <div class="status-divider"></div>
                <div class="status-right">该项目已重新启动，处于前期筹备阶段，尚未确认行动计划与目标。</div>
            `,
            tracking: [
                {
                    date: '2026.07.15',
                    type: '通知',
                    title: '极地行动负责人调整通知',
                    summary: '总裁办发布通知，极地行动改由勘探行动部负责，石冬担任领队。暂定7月25日召开筹备会议。',
                    reportor: '总裁办',
                    typeClass: 'red'
                },
                {
                    date: '2026.07.05',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年7月 南极区域能量指数保持上升，增速稳定。预计2027年2月可能达到「目标」出现水平。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.06.05',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年6月 南极区域能量指数保持上升，增速稳定。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.05.22',
                    type: '会议',
                    title: '极地行动重启会议',
                    reportor: '项目组',
                    typeClass: 'purple',
                    expandable: true,
                    content: `
                        <div class="meeting-section">
                            <span class="meeting-tag">与会人员</span>
                            <div class="meeting-attendees-text">
                                <span class="meeting-person">总裁办 罗建立</span>
                                <span class="meeting-person">物理研究部 丁文倩</span>
                                <span class="meeting-person">勘探行动部 石冬</span>
                                <span class="meeting-person">工程技术部 钟明远</span>
                                <span class="meeting-person">安全合规部 何旭</span>
                                <span class="meeting-person">人力资源部 吴念清</span>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">会议摘要</span>
                            <div class="meeting-body">
                                <p>根据3月至5月的监测报告，<strong>罗建立决定再次启动《极地行动》，由物理研究部牵头，丁文倩担任领队。</strong></p>
                                <p>鉴于南非行动正在执行中，要求何旭先与南极科考站对接，提前办理相关手续。</p>
                                <p>人力资源部加大招聘力度，其余部门在南非行动结束后再全面启动筹备工作。</p>
                            </div>
                        </div>
                    `
                },
                {
                    date: '2026.05.04',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年5月 南极区域能量指数增长速度加剧，已达到预警水平。按当前增速，预计2027年2月将达到「目标」出现水平。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.04.05',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年4月 南极区域能量指数稳定上升，建议继续观察，暂不提高监测等级。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2026.03.08',
                    type: '报告',
                    title: '监测报告',
                    summary: '2026年3月 南极区域能量指数有波动，呈上升趋势，参考该区域历史规律，建议保持观察。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2025.11.12',
                    type: '通知',
                    title: '南极科考站合作通知',
                    summary: '总裁办发布通知，天启科技与南极科考站正式达成合作，联合启动《南极冰盖环境适应性测试项目》，由工程技术部钟明远负责。',
                    reportor: '总裁办',
                    typeClass: 'red'
                },
                {
                    date: '2025.10.16',
                    type: '会议',
                    title: '极地行动第二次筹备会议',
                    reportor: '项目组',
                    typeClass: 'purple',
                    expandable: true,
                    content: `
                        <div class="meeting-section">
                            <span class="meeting-tag">与会人员</span>
                            <div class="meeting-attendees-text">
                                <span class="meeting-person">总裁办 罗建立</span>
                                <span class="meeting-person">数据监测部 刘忙</span>
                                <span class="meeting-person">物理研究部 丁文倩</span>
                                <span class="meeting-person">勘探行动部 石冬</span>
                                <span class="meeting-person">工程技术部 钟明远</span>
                                <span class="meeting-person">安全合规部 何旭</span>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">会议摘要</span>
                            <div class="meeting-body">
                                <p>刘忙汇报：<strong>南极区域的能量指数持续回落，已跌出参考范围，建议行动暂缓。</strong></p>
                                <p>何旭指出目前已与南极科考站达成合作意向，若此时取消合作，会影响未来合作基础。</p>
                                <p>罗建立同意暂缓行动，但不想丢失与科考站的合作窗口。</p>
                                <p><strong>丁文倩提议：将合作方向调整为设备环境测试，待指数回升时可快速启动行动。</strong></p>
                                <p>钟明远附议，建议于年底赴南极开展设备适应性测试。</p>
                                <p>罗建立认可，要求何旭调整合作方向，继续推进与科考站的对接。</p>
                            </div>
                        </div>
                    `
                },
                {
                    date: '2025.09.06',
                    type: '报告',
                    title: '监测报告',
                    summary: '2025年9月 南极区域能量指数回落，建议暂时观察。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2025.08.14',
                    type: '会议',
                    title: '极地行动第一次筹备会议',
                    reportor: '项目组',
                    typeClass: 'purple',
                    expandable: true,
                    content: `
                        <div class="meeting-section">
                            <span class="meeting-tag">与会人员</span>
                            <div class="meeting-attendees-text">
                                <span class="meeting-person">总裁办 罗建立</span>
                                <span class="meeting-person">物理研究部 丁文倩</span>
                                <span class="meeting-person">勘探行动部 石冬</span>
                                <span class="meeting-person">工程技术部 钟明远</span>
                                <span class="meeting-person">安全合规部 何旭</span>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">会议摘要</span>
                            <div class="meeting-body">
                                <p>《极地行动计划书》经罗建立审批通过，<strong>《极地行动》项目正式立项。</strong></p>
                                <p>会议部署如下：</p>
                                <p>石冬即刻启动极地环境专项训练；</p>
                                <p>钟明远针对极地环境着手研发第三期探测设备，物理研究部配合提供相应数据；</p>
                                <p>何旭负责对接南极科考站，协调相关手续。</p>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">附件</span>
                            <div class="meeting-attachment-block">
                                <span class="attachment-card">
                                    <span class="attachment-icon">📄</span>
                                    <span class="attachment-name">TQ/EXP-2025-P2-PL 极地行动计划书.pdf</span>
                                </span>
                            </div>
                        </div>
                    `
                },
                {
                    date: '2025.08.05',
                    type: '报告',
                    title: '监测报告',
                    summary: '2025年8月 南极区域指数持续上升，按当前增速，预计2026年3月将达到「目标」出现水平。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2025.07.18',
                    type: '会议',
                    title: '勘探行动部月度工作会',
                    reportor: '项目组',
                    typeClass: 'purple',
                    expandable: true,
                    content: `
                        <div class="meeting-section">
                            <span class="meeting-tag">与会人员</span>
                            <div class="meeting-attendees-text">
                                <span class="meeting-person">总裁办 罗建立</span>
                                <span class="meeting-person">勘探行动部 石冬</span>
                            </div>
                        </div>
                        <div class="meeting-section">
                            <span class="meeting-tag">会议摘要</span>
                            <div class="meeting-body">
                                <p><strong>石冬在会上提出，南极区域出现「目标」的概率提升，建议提前启动筹备。</strong></p>
                                <p>罗建立表示认可，并要求工程技术部提前介入开展设备评估。</p>
                            </div>
                        </div>
                    `
                },
                {
                    date: '2025.07.06',
                    type: '报告',
                    title: '监测报告',
                    summary: '2025年7月 南极区域能量指数增长超过常规水平，已列入重点监测区域。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                },
                {
                    date: '2025.06.05',
                    type: '报告',
                    title: '监测报告',
                    summary: '2025年6月 全球φ能量监测数据显示，南极区域能量指数出现上升，已纳入观察范围。',
                    reportor: '罗布泊监测站',
                    typeClass: 'cyan'
                }
            ]
        }
    }
    ]
};