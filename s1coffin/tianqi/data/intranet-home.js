// ========== 内网首页数据 ==========
const intranetHomeData = {
    dingwenqian: {
        greeting: {
            quote: '上下四方曰宇，往古来今曰宙。',
            source: '庄子·庚桑楚'
        },

        notices: [
            {
                id: 'notice-south-africa-close',
                tag: '项目',
                tagType: 'normal',
                title: '南非行动项目结案流程启动',
                sender: '项目管理中心',
                date: '2026.07.16',
                important: false,
                unread: true,
                content: `
                    <p>南非行动项目结案流程已发起。<br>
                    <strong>项目相关数据文件及现场记录均已上传至项目中心。</strong><br>
                    请项目组成员于7月20日前前往项目中心完成结案报告。</p>
                `
            },
            {
                id: 'notice-ding-death',
                tag: '公告',
                tagType: 'danger',
                title: '关于丁文倩教授身故事宜的内部通知',
                sender: '安全合规部',
                date: '2026.07.15',
                important: true,
                unread: true,
                content: `
                    <p><strong>致全体员工：</p>
                    <p>关于丁文倩教授在南非行动中身故一事，现作以下通知：</strong></p>
                    <p>一、该事件相关信息由公司统一发布。任何员工不得在内部通讯、外部媒体及任何公开渠道讨论、传播。</p>
                    <p>二、涉及南非行动的一切数据、报告与文件，均不得向外部人员透露。</p>
                    <p>三、如遇外部人员询问，统一回复“不知情”。<br><br>
                    <strong>违反上述规定者，将按保密协议及公司规章制度处理。</strong></p>
                `
            },
            {
                id: 'notice-cloud-archive',
                tag: '数据',
                tagType: 'normal',
                title: '云数据中心归档工作提醒',
                sender: '云数据管理中心',
                date: '2026.07.11',
                important: false,
                unread: true,
                content: `
                    <p>近期因存储成本上涨，云数据中心空间紧张。<br>请各部门于7月30日前，按照《天启科技云数据归档管理办法》<strong>对数据中心的文件进行归档与清理。</strong></p><br>
                    <p>逾期未完成的部门，将按公司规定扣除七月部门绩效奖金。</p>
                `
            },
            {
                id: 'notice-profile-confirm',
                tag: '人力',
                tagType: 'normal',
                title: '员工个人信息确认的通知',
                sender: '人力资源部',
                date: '2026.07.06',
                important: false,
                unread: true,
                content: `
                    <p>个人中心板块已改版。
                    <br>请各位员工尽快登录个人中心，确认个人基本信息、部门归属及权限状态。</p>
                    <p><strong>如信息有误，可在天启通上联系HR吴念清进行修订。</strong></p>
                `
            }
        ],

        workSummary: [
            { code: 'TQ/EXP-2026-P0-SA', name: '南非行动', lead: '丁文倩', progress: 72, status: 'danger', label: '已终止' },
            { code: 'TQ/RD-2022-P1-PHI', name: 'φ能量原理研究', lead: '丁文倩 沈曼 刘忙', progress: 54, status: 'active', label: '进行中' },
            { code: 'TQ/EXP-2025-P2-PL', name: '极地行动', lead: '石冬', progress: 11, status: 'active', label: '进行中' }
        ],

        quickNav: [
            { id: 'projects', label: '项目中心', icon: '◈' },
            { id: 'logs', label: '工作日志', icon: '▣' },
            { id: 'comm', label: '内部通讯', icon: '✉' },
            { id: 'files', label: '云数据', icon: '▢' }
        ]
    }
};

function getIntranetHomeData() {
    const employeeId = localStorage.getItem('intranet_login') || 'dingwenqian';
    const home = intranetHomeData[employeeId] || intranetHomeData.dingwenqian;
    return home;
}