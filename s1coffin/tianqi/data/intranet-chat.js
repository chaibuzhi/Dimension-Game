// ========== 内网内部通讯数据 ==========
const intranetChatData = {
    contacts: [
        { id: 'luo', name: '罗建立', avatar: '👤' },
        { id: 'liu', name: '刘忙', avatar: '🧙' },
        { id: 'shi', name: '石冬', avatar: '🧗' }
    ],
    messages: {
        luo: [
            { from: 'luo', text: '丁教授，南非行动的设备清单我已经确认过了。' },
            { from: 'luo', text: '关于你在会议上提出的直接接触方案，我会再和董事会沟通。' },
            { from: 'ding', text: '谢谢罗总。南非目标点的数据我重新复核过，确实符合模型预测。' },
            { from: 'luo', text: '我知道。但石冬那边似乎有不同意见。' },
            { from: 'ding', text: '石冬有她的立场。我会和她说清楚。' }
        ],
        liu: [
            { from: 'liu', text: '老丁，南非的观测设备我都校准完了。' },
            { from: 'liu', text: '那套能量监测探头我加了层屏蔽，数据会稳很多。' },
            { from: 'ding', text: '多谢。矿场那边的异常磁暴记录你看了吗？' },
            { from: 'liu', text: '看了。比罗布泊那次更强，你这次去了，别急着碰。' },
            { from: 'liu', text: '石头那家伙这几天把自己关在训练场，你小心点。' }
        ],
        shi: [
            { from: 'shi', text: '丁文倩，南非目标点的读数，和你以前遇到的都不一样。' },
            { from: 'shi', text: '你要自己去，那我问你：韩休怎么办？' },
            { from: 'ding', text: '石冬，有些事我必须亲自确认。' },
            { from: 'shi', text: '你最好真的知道自己要干什么。' }
        ]
    }
};