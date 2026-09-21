// ========== 桌面图标注册表 ==========
// type: 'tab'     → 新标签页打开
//       'window'  → iframe 窗口
//       'folder'  → 文件夹窗口（读取 folder-data.js）

const appsRegistry = [
    {
        id: 'search',
        name: '搜索引擎',
        icon: '🌐',
        type: 'tab',
        target: '../search/search.html'
    },
    {
        id: 'mail',
        name: '邮件',
        icon: '📧',
        type: 'window',
        src: 'apps/mail/mail.html',
        width: 1000,
        height: 750,
        single: true,
        resizable: true
    },
    {
        id: 'album',
        name: '纪念日旅行',
        icon: '📁',
        type: 'folder',
        folderId: 'album',
        single: true,
        resizable: true
    },
    {
        id: 'teaching',
        name: '教案',
        icon: '📁',
        type: 'folder',
        folderId: 'teaching',
        single: true,
        resizable: true
    },
    {
        id: 'notepad',
        name: '记事本',
        icon: '📔',
        type: 'window',
        src: 'apps/notepad/notepad.html',
        width: 520,
        height: 500,
        single: true,
        resizable: true
    },        
    {
        id: 'chat',
        name: '天启通',
        icon: '💬',
        type: 'window',
        src: 'apps/chat/chat.html',
        width: 360,
        height: 600,
        single: true,
        darkWindow: true,
        unlockKey: 'tqchat_installed',
        dynamicSize: {
        key: 'tqchat_state',      // 检查的 localStorage key
        jsonKey: 'loggedIn',
        lockedKey: 'locked',
            widthAlt: 900,                 // 已登录时的宽度
            heightAlt: 680                 // 已登录时的高度
        }
    },
    // ════════════════════════════════════
    // file/ 目录下的文件（不在桌面显示，通过其他入口打开）
    // ════════════════════════════════════
    {
        id: 'dingagreement',
        name: '关于丁文倩意外身故事宜的确认函.pdf',
        icon: '📄',
        type: 'window',
        src: 'file/dingagreement.html',
        width: 800,
        height: 620,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    {
        id: 'itinerary',
        name: '行程单',
        icon: '📄',
        type: 'window',
        src: 'file/itinerary.html',
        width: 900,
        height: 750,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    {
        id: 'titleevaluation',
        name: '职称申请书',
        icon: '📝',
        type: 'window',
        src: 'file/titleevaluation.html',
        width: 900,
        height: 750,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    {
        id: 'achievement',
        name: '查看成就',
        icon: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-2px;"><polygon points="8,1.5 14,5 14,11 8,14.5 2,11 2,5" stroke="currentColor" stroke-width="1.1" fill="none" stroke-linejoin="round"/><polygon points="8,4.5 11.5,6.5 11.5,9.5 8,11.5 4.5,9.5 4.5,6.5" stroke="currentColor" stroke-width="0.6" fill="none" stroke-linejoin="round" opacity="0.5"/></svg>',
        type: 'window',
        src: 'apps/achievement/achievement.html',
        width: 700,
        height: 560,
        single: true,
        desktopIcon: false,
        resizable: false
    },
    {
        id: 'about',
        name: '关于游戏',
        icon: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-2px;"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 7.5V11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="5" r="0.8" fill="currentColor"/></svg>',
        type: 'window',
        src: 'file/about.html',
        width: 710,
        height: 560,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    {
        id: 'paper-phi-origin',
        name: 'φ能量起源假说',
        icon: '📄',
        type: 'window',
        src: '../tianqi/paper.html?id=phi-energy-storage',
        width: 900,
        height: 700,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    // ════════════════════════════════════
    // 照片（不在桌面显示，通过文件夹打开）
    // ════════════════════════════════════
    {
        id: 'photo-marry-01',
        name: '婚礼照片 01',
        icon: '🖼️',
        type: 'image',
        src: 'image/marry01.webp',
        width: 1000,
        height: 700,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    {
        id: 'photo-marry-02',
        name: '婚礼照片 02',
        icon: '🖼️',
        type: 'image',
        src: 'image/marry02.webp',
        width: 1000,
        height: 700,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    {
        id: 'photo-marry-03',
        name: '婚礼照片 03',
        icon: '🖼️',
        type: 'image',
        src: 'image/marry03.webp',
        width: 1000,
        height: 700,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    {
        id: 'photo-marry-04',
        name: '婚礼照片 04',
        icon: '🖼️',
        type: 'image',
        src: 'image/marry04.webp',
        width: 1000,
        height: 700,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    {
        id: 'photo-marry-05',
        name: '婚礼照片 05',
        icon: '🖼️',
        type: 'image',
        src: 'image/marry05.webp',
        width: 1000,
        height: 700,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    {
        id: 'photo-hanxiu',
        name: '韩休证件照',
        icon: '🖼️',
        type: 'image',
        src: 'image/hanxiu.webp',
        width: 400,
        height: 800,
        single: true,
        resizable: true,
        desktopIcon: false
    },    
    {
        id: 'photo-mystery',
        name: '丁文倩的照片',
        icon: '🖼️',
        type: 'image',
        src: 'image/dind_die.webp',
        width: 1000,
        height: 700,
        single: true,
        resizable: true,
        desktopIcon: false
    },
    // 未来添加更多照片，继续在此追加：
    // {
    //     id: 'photo-xxx',
    //     name: '照片名',
    //     icon: '🖼️',
    //     type: 'image',
    //     src: '../image/xxx.webp',
    //     width: 560,
    //     height: 480,
    //     single: true,
    //     desktopIcon: false
    // },

    // ════════════════════════════════════
    // 音频（不在桌面显示，通过文件夹打开）
    // ════════════════════════════════════
    {
        id: 'dwq-audio',
        name: '20260628_dwq-recording.mp3',
        icon: '🎵',
        type: 'audio',
        src: '../music/dwq-recording.mp3',
        width: 420,
        height: 320,
        single: true,
        darkWindow: true,
        desktopIcon: false
    }
];
