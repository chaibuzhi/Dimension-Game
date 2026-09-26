const newsData = [
    {
        id: 'news01',
        title: '天启科技携手南极科考站，开启极地能源新篇章',
        date: '2026.07.15',
        tag: '政企合作',
        summary: '天启科技与南极科考站签署深化合作协议，全球能源勘探网络正式延伸至南极大陆。',
        content: `
            <p class="article-lead">
                7月15日，天启科技与南极科考站签署深化合作协议，双方将在极地装备测试、能源监测及勘探项目等领域开展深度合作。
            </p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news01_1.webp" alt="中国南极科考站">
                </div>
            </div>

            <p>天启科技将依托南极科考站的基础设施，开展新一代能源探测设备的极地环境适应性测试。双方将联合部署能源监测系统，对冰盖区域的水体进行长期追踪。</p>

            <p><strong>公司计划在近期启动「极地勘探项目」</strong>开展系列能源实验，系统评估极地能源的开发潜力。</p>

            <p>本次合作是公司全球能源网络布局的重要里程碑，将进一步提升公司的勘探作业能力，为人类探索更清洁高效的能源提供坚实的支撑。</p>
        `
    },
    {
        id: 'news02',
        title: '天启科技南非勘探行动正式启程',
        date: '2026.06.30',
        tag: '勘探行动',
        summary: '天启科技南非勘探团队正式启程，丁文倩教授带队，深入深层地下水系采集样本。',
        content: `
            <p class="article-lead">
                6月30日，天启科技南非勘探团队在总部完成集结，正式启程前往南非。
            </p>

            <p>天启科技全球能源监测网络于 2025 年捕捉到该区域水体能量指数的显著波动，经科研团队长达一年的多轮论证，最终判定该区域具备极高的战略勘探价值。</p>

            <p>本次行动将深入此前尚无人类涉足的深层地下水系，采集高纯度水体样本，为新型能源材料研发获取一手研究数据。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news02_1.webp" alt="勘探队出发合影">
                </div>
                <figcaption>勘探队集结完毕</figcaption>
            </div>

            <p><strong>本次行动打破传统模式，由物理研究部总监丁文倩教授带队，担任现场总指挥。</strong>随行配备第三代深水采样系统、高灵敏度电磁场探测阵列，以及专为极端环境设计的便携式能源分析终端。</p>

            <div class="article-quote">
                <div class="quote-speaker">公司总裁罗建立：</div>
                <div class="quote-text">“丁文倩教授是公司科研体系中不可替代的中坚力量。由物理研究部主导本次行动，彰显了公司推动前沿理论研究与实地勘探深度融合的战略决心。”</div>
            </div>

            <div class="figure">
                <div class="figure-img figure-id-zone">
                    <img src="image/news02_2.webp" alt="丁文倩于罗建立合影">
                    <div class="id-hotspot" onclick="openIdLightbox()" title="点击查看工牌细节"></div>
                </div>
                <figcaption>罗建立（左）丁文倩（右）出发前的合影</figcaption>
            </div>

            <div class="article-quote">
                <div class="quote-speaker">物理研究部总监丁文倩</div>
                <div class="quote-text">“针对这次行动，我们团队做了充分的前期准备，相信一定会有突破性的发现。”</div>
            </div>

            <p>本次行动开始前，已获得南非矿产资源与能源部官方许可，我司安全合规部也制定了详尽的安全预案。目前，勘探队已启程。</p>

            <p>天启科技将持续跟进行动进展，在确保信息安全的前提下，适时向公众披露阶段性研究成果。</p>
        `
    },
    {
        id: 'news03',
        title: '勘探队安全保障体系全面升级',
        date: '2026.06.07',
        tag: '安全保障',
        summary: '天启科技完成勘探队安全保障体系全面升级，涵盖四大维度，确保一线人员安全。',
        content: `
            <p class="article-lead">
                6月7日，天启科技宣布完成勘探队安全保障体系全面升级，涵盖四大维度，进一步筑牢极端环境下一线勘探人员的安全防线。
            </p>

            <p class="strong-para">从战场到旷野：一位指挥官的安全执念</p>

            <p>本次升级由勘探行动部总监石冬主导。石冬毕业于专业军事院校，曾在特种作战旅长时期执行多项极端环境下的作战任务，2023年退役后加入天启科技。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news03_1.webp" alt="勘探队训练照片">
                </div>
            </div>

            <div class="article-quote">
                <div class="quote-speaker">勘探行动部总监 石冬</div>
                <div class="quote-text">“勘探和作战没有本质区别，把人带出去、一个不少地带回来，是我的第一准则。”</div>
            </div>

            <p class="strong-para">四大维度升级 全方位筑牢安全屏障</p>

            <p class="no-indent"><strong>单兵装备迭代升级。</strong>公司为全体勘探队员配发最新研制的集成式单兵监测设备，实时回传位置、心率、血氧等核心数据，体征异常自动触发预警，保障第一时间响应。</p>

            <p class="no-indent"><strong>应急预案常态演练。</strong>勘探行动部已建立高原、荒漠、深海、极地等多类极端环境的应急预案，明确极端事件下的处置流程与责任分工。</p>

            <p class="no-indent"><strong>家属专线全天值守。</strong>正式开通 24 小时家属联络专线，保障家属随时获取队员最新状态，为勘探队员解除后顾之忧。</p>

            <p class="no-indent"><strong>医疗网络全球协作。</strong>天启科技已与全球各勘探区域所在地的医疗机构、救援队签署合作协议，确保意外发生时医疗救援能在最短时间内抵达现场。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news03_2.webp" alt="勘探队训练照片">
                </div>
            </div>
            <p class="strong-para">每一名队员都必须平安回家</p>

            <p>石冬表示，勘探行动部已将"人员安全"纳入每一次任务评估的核心指标。"任务可以延期，目标可以调整，但每一名队员都必须平安回家，这是我对团队的承诺。"</p>

            <p><strong>天启科技向来将员工安全视为公司最高准则。我们探索未知，但对待生命，必须确定且已知的，没有什么比员工的生命更重要。</strong></p>
        `
    },
    {
        id: 'news04',
        title: '丁文倩教授受邀出席全球能源发展峰会',
        date: '2026.05.19',
        tag: '学术交流',
        summary: '丁文倩教授出席2026全球能源发展峰会，就新型水体能源研究成果发表专题报告。',
        content: `
            <p class="article-lead">
                5月18日，第十五届全球能源发展峰会在西延开幕。天启科技物理研究部总监丁文倩教授受邀出席，并在“新能源研发”板块作专题报告。
            </p>
            <p><strong>全球能源发展峰会（Global Energy Development Summit，GEDS）</strong>由国际能源合作组织与多国能源部门联合发起，自2011年创办以来，已连续举办十五届，是全球能源领域最具代表性的对话平台之一。</p>
            <p><strong>丁文倩教授的报告《凝聚态φ能量：储能机制与可控释放》受到与会学者高度关注。</strong>报告结束后，多位学者围绕 φ 能量的理论框架与实验路径现场交流。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news04_1.webp" alt="丁文倩教授在峰会作专题报告">
                </div>
                <figcaption>丁文倩教授在峰会作专题报告</figcaption>
            </div>

            <p>会议闭幕后，组委会针对丁文倩教授的报告，组织了小范围闭门讨论会，围绕报告未公开研究数据展开深度交流，会议不对媒体开放。据参会人员反馈，研讨中各方观点交锋充分，多位专家就 φ 能量的理论框架提出建设性意见。</p>

            <p>天启科技长期支持科研团队参与国际学术交流，推动前沿能源研究进入更广泛的对话空间，为全球能源科学发展贡献力量。</p>
        `
    },
    {
        id: 'news05',
        title: '天启科技获评 「国家能源科技创新示范企业」',
        date: '2026.04.22',
        tag: '荣誉奖项',
        summary: '天启科技凭借在极端环境能源勘探、特种探测装备及新型储能材料领域的技术积累成功入选。',
        content: `
            <p class="article-lead">
                国家能源局与科技部联合公布 「国家能源科技创新示范企业」 评选结果。
            </p>

            <p>该评选面向全国能源科技领域重点企业与科研机构，评审围绕技术创新能力、科研成果转化、行业影响力及国家能源战略贡献度四大维度开展。</p>

            <p>天启科技凭借在能源勘探、探测装备及新型储能材料领域的技术积累成功入选，并获得评审专家组高度肯定。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news05_1.webp" alt="罗建立代表公司领奖">
                </div>
                <figcaption>总裁罗建立发表感言</figcaption>
            </div>

            <p>天启科技总裁罗建立现场表示：天启科技将依托政策与资源支持，持续加大核心领域研发投入，以服务国家能源战略为己任，扎实推进前沿研究与技术转化，为国家能源安全贡献切实力量。</p>
        `
    },
    {
        id: 'news06',
        title: '新型水体能源研究取得关键进展',
        date: '2026.03.15',
        tag: '科研成果',
        summary: '天启科技在新型水体能源方向取得关键进展。',
        content: `
            <p class="article-lead">
            2026年天启科技在新型水体能源方向上再次取得关键进展。
            </p>

            <p><strong> 物理研究部 与 材料实验部 </strong>长期深耕 φ 能量研究领域。<strong> 2022年8月23日，双方团队通过实验验证与理论推导，联合发表《φ 能量理论储能极限》，</strong>建立起该领域的核心研究框架。</p>
    
            <p>近期团队围绕 φ 能量储能与释放机制，完成新一轮系统性实验验证，相关成果已形成学术论文，提交至专业期刊进入同行评审阶段。</p>

            <p><strong>φ能量是一种存在于水体中的新型能量，理论储能密度远超传统化学能源。</strong>若实现可控激发，有望成为全新清洁能源形式，为能源领域开辟全新发展空间。</p>
            
            <div class="figure">
                <div class="figure-img">
                    <img src="image/news06_1.webp" alt="丁文倩教授与沈曼教授合影">
                </div>
                <figcaption>丁文倩教授（左）与沈曼教授（右）在材料实验室</figcaption>
            </div>

            <div class="article-quote">
                <div class="quote-speaker">物理研究部总监 丁文倩</div>
                <div class="quote-text">“五年来我们和材料实验部并肩攻坚，从理论到实证。我们始终认为，理解能量的本质，是一切应用的前提。”</div>
            </div>

            <p>该项研究仍处于研究阶段，公司将持续投入资源，支持此方向的长期探索。</p>
        `
    },
    {
        id: 'news07',
        title: '罗布泊全球能源监测站完成第三期扩建',
        date: '2026.03.06',
        tag: '设备升级',
        summary: '天启科技罗布泊全球能源监测站第三期扩建工程正式竣工投用，数据监测与样本存储能力显著提升。',
        content: `
            <p class="article-lead">
                3月6日，天启科技罗布泊全球能源监测站第三期扩建工程正式竣工投用。
            </p>

            <p>本次扩建新增多套高精度监测单元与能源实验室，全站数据监测、分析与样本存储能力实现显著提升。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news07_1.webp" alt="罗布泊基地全景">
                </div>
                <figcaption>天启科技罗布泊全球能源监测站全景</figcaption>
            </div>

            <p class="strong-para">罗布泊能源监测站的历史长达近四十年</p>

            <div class="article-timeline">
                <div class="timeline-item">
                    <span class="timeline-year">1986年</span>
                    <p>在该区域首次记录到非正常的水体能量，此后便成为我国能源科学研究的重点关注区域。</p>
                </div>
                <div class="timeline-item">
                    <span class="timeline-year">2007年</span>
                    <p>天启能源研究所在此建立首个固定监测基地，开启了系统化、常态化的能量追踪工作。</p>
                </div>
                <div class="timeline-item">
                    <span class="timeline-year">2026年</span>
                    <p>第三期扩建完成，罗布泊已发展为具备监测、采集、实验多维度综合性科研设施。</p>
                </div>
            </div>

            <p>罗布泊监测站的负责人是刘忙博士，他毕业于清华大学物理系，后在剑桥大学卡文迪许实验室获电磁学博士学位，2014年加入天启科技，主导建立天启科技全球能源监测网络。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news07_2.webp" alt="刘忙博士在第三期实验室门前">
                </div>
                <figcaption>刘忙博士在第三期实验室门前</figcaption>
            </div>

            <div class="article-quote">
                <div class="quote-speaker">数据监测部总监 刘忙</div>
                <div class="quote-text">“监测站扩建完成后，可以捕捉到更微弱的能源波动，能源实验室的投用，意味着我们能在更接近原始状态的环境下保存和分析新能源样本。”</div>
            </div>

            <p>罗布泊监测站是天启科技全球能源监测网络的中心节点，已覆盖中亚、南美、东南亚、南非、澳大利亚、南极等区域。天启科技将持续加码监测基础设施投入，为全球能源科研提供坚实的数据支撑。</p>
        `
    },
    {
        id: 'news08',
        title: '2026 年「天启探索者」全球人才招聘启动',
        date: '2026.02.25',
        tag: '人才招聘',
        summary: '天启科技正式启动 2026 年度「天启探索者」全球人才招聘计划，聚焦六大核心研发方向。',
        content: `
            <p class="article-lead">
                2月25日，天启科技正式启动 2026 年度「天启探索者」全球人才招聘计划，聚焦六大核心研发方向，面向全球吸纳优秀科研与技术人才。
            </p>

            <p class="strong-para">国家级前沿平台 全球化科研布局</p>
            <p>天启科技长期深耕能源勘探与新型材料领域，拥有覆盖全球主要能源区域的监测与勘探网络，与多国科研机构、国际能源组织建立深度合作。加入天启科技，即可站在世界前沿科研平台，与全球顶尖能源专家并肩工作。</p>

            <p class="strong-para">有竞争力的回报 看得见的未来</p>
            <p>公司提供具备市场竞争力的薪酬体系、项目绩效奖金与清晰的职业晋升通道；设立专项科研基金，支持员工自主申报前沿课题。</p>
            <p>入选者将接受系统化入职培训，覆盖核心技术体系、野外作业安全规范与前沿科研方法论，优秀者可直接进入一线项目组，参与全球范围的实地勘探与技术攻关。</p>

            <p class="strong-para">面向全球  欢迎跨界</p>
            <p>本次招聘不限国籍与地域，欢迎具备跨学科背景的人才加入。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news08_1.webp" alt="2025届「天启探索者」合影">
                </div>
                <figcaption>2025届「天启探索者」合影</figcaption>
            </div>

            <p class="strong-para">六大领域开放 覆盖研发全链条</p>
            <table class="news-simple-table">
                <thead>
                    <tr>
                        <th style="width: 110px;">岗位方向</th>
                        <th>研究方向</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>物理学</strong></td>
                        <td>新型能源基础理论研究</td>
                    </tr>
                    <tr>
                        <td><strong>资源勘探</strong></td>
                        <td>全球能源聚点实地勘探、地质评估与现场技术保障</td>
                    </tr>
                    <tr>
                        <td><strong>机械工程</strong></td>
                        <td>能源探测设备、采样系统及特种分析终端研发</td>
                    </tr>
                    <tr>
                        <td><strong>材料科学</strong></td>
                        <td>储能材料、非晶态合金等能源材料的实验与工程化</td>
                    </tr>
                    <tr>
                        <td><strong>能源化学</strong></td>
                        <td>能量与物质耦合机制研究，探索新型储能路径</td>
                    </tr>
                    <tr>
                        <td><strong>人工智能</strong></td>
                        <td>全球能源监测网络数据体系搭建</td>
                    </tr>
                </tbody>
            </table>

            <p class="no-indent"><strong>招聘者可通过天启科技官网提交申请，公司将分批组织线上笔试，录用结果将于 4 月中旬公布。</strong></p>
        `
    },
    {
        id: 'news09',
        title: '天启科技三十周年：从实验室到探索者',
        date: '2026.01.08',
        tag: '企业文化',
        summary: '天启科技迎来成立三十周年。从一间小型物理实验室起步，如今已发展为覆盖能源、材料与勘探的综合性科技公司。',
        content: `
            <p class="article-lead">
                2026 年，天启科技迎来成立三十周年。
            </p>
            <p class="article-lead">
                三十年步履不停，天启科技始终行走在能源探索的无人地带，把一个个 “不可能” 逐步变成可研究、可验证、可落地的科学成果。
            </p>

            <p class="strong-para">1996・启幕：远郊的实验室</p>
            <p>1996 年，天启能源研究所在西延远郊成立。没有成熟的团队，没有标准化的实验场地，十余位科研人员靠着几台早期监测设备，启动了国内重点水域的能量追踪工作。</p>
            <p>没人知道这条路能走远，但每一组信号都被归档，成为后续研究的基石。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news09_1.webp" alt="天启能源研究所大门（1998年拍摄）">
                </div>
                <figcaption>天启能源研究所大门（1998年拍摄）</figcaption>
            </div>

            <p class="strong-para">2007・扎根：罗布泊根据地</p>
            <p>经过十余年辗转多地的流动监测，2007 年，天启能源研究所罗布泊监测基地建成，科研人员终于能在同一站点展开长期的观测与样本积累。新基地的投用，标志着公司正式迈入系统能源研究领域。</p>
            <p>基地留存的第一批长期观测样本，至今仍是公司核心数据库的重要组成部分。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news09_2.webp" alt="罗布泊2号实验室（2010年拍摄）">
                </div>
                <figcaption>罗布泊2号实验室（2010年拍摄）</figcaption>
            </div>

            <p class="strong-para">2012・织网：从监测到出征</p>
            <p>2012 年，天启能源研究所完成企业化改制，正式更名为天启科技。</p>
            <p>同年，第一支能源勘探队组建成功，奔赴无人区。天启科技完成从 “被动监测” 到 “主动勘探” 的关键转型。</p>
            <p>勘探队带回的不只有样本，更建立起一套系统的科研模式：用监测网络指引实地勘探，用野外结果验证实验室结论，为后续的技术突破打下了核心基础。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news09_3.webp" alt="天启科技总部大楼（2013年拍摄）">
                </div>
                <figcaption>天启科技总部大楼（2013年拍摄）</figcaption>
            </div>

            <p class="strong-para">2015・拓界：勘探足迹跨越山海</p>
            <p>以罗布泊为核心原点，天启科技的勘探边界持续向外延伸。2015年前后，公司陆续在中亚、南美、东南亚、非洲等地布局监测点，全球能源监测网络从蓝图变为现实。</p>
            <p>天启科技也完成了从单一研究机构到全球化能源科技企业的转型，探索的视野从国内拓展到全球。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news09_4.webp" alt="罗布泊监测站扩建前（2015年拍摄）">
                </div>
                <figcaption>罗布泊监测站扩建前 （2015年拍摄）</figcaption>
            </div>

            <p class="strong-para">2026・而立：极境探索再启新程</p>
            <p>时至 2026 年，天启科技已具备在极地、深海等极端环境下开展系统性能源勘探的能力，监测与勘探网络覆盖中亚、南美、东南亚、南非、澳大利亚、墨西哥、南极七大核心区域，技术能力与布局规模均达到历史峰值。</p>

            <div class="figure">
                <div class="figure-img">
                    <img src="image/news09_5.webp" alt="天启科技园区主楼 （2021年拍摄）">
                </div>
                <figcaption>天启科技园区主楼 （2021年拍摄）</figcaption>
            </div>

            <p>三十年回望，从实验室到罗布泊，从罗布泊到全球，天启科技始终扎根在少有人涉足的前沿能源领域。</p>

            <div class="article-centered-quote">
                <p class="centered-quote-text">“支撑天启走过三十年的，从来不是坦途，而是敢闯的勇气，我们是从无人区里长出来的公司。”</p>
                <p class="centered-quote-author">——天启科技总裁罗建立</p>
            </div>
        `
    }
];