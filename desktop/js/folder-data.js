// ========== 文件夹内容数据 ==========
// action: 'toast'   → 弹出提示，不可打开
//         'tab'     → 新标签页打开
//         'lightbox'→ 大图查看

const folderData = {
    album: {
        title: '📁 纪念日旅行',
        width: 560,
        height: 420,
        files: [
            {
                icon: '📄',
                name: '签证资料.pdf',
                action: 'none' 
            },
            {
                icon: '📄',
                name: '行程单-新西兰.pdf',
                action: 'app',
                appId: 'itinerary'
            },
            {
                icon: '📄',
                name: '酒店预订确认单.pdf',
                action: 'none' 
            },
            {
                icon: '📄',
                name: '航班信息.pdf',
                action: 'none' 
            },
            {
                icon: '🖼️',
                name: '2022婚礼01.jpg',
                action: 'app',
                appId: 'photo-marry-01',
                thumbnail: 'image/marry01.webp'
            },
            {
                icon: '🖼️',
                name: '2022婚礼02.jpg',
                action: 'app',
                appId: 'photo-marry-02',
                thumbnail: 'image/marry02.webp'
            },
            {
                icon: '🖼️',
                name: '2022婚礼03.jpg',
                action: 'app',
                appId: 'photo-marry-03',
                thumbnail: 'image/marry03.webp'
            },
            {
                icon: '🖼️',
                name: '海浪.jpg',
                action: 'app',
                appId: 'photo-marry-04',
                thumbnail: 'image/marry04.webp'
            },
            {
                icon: '🖼️',
                name: '皇后镇.jpg',
                action: 'app',
                appId: 'photo-marry-05',
                thumbnail: 'image/marry05.webp'
            }
        ]
    },

    teaching: {
        title: '📁 教案',
        width: 560,
        height: 440,
        files: [
            {
                icon: '📄',
                name: '高二物理教案-电场与电路.docx',
                action: 'toast',
                message: '现在没心情准备教案'
            },
            {
                icon: '📄',
                name: '高二物理教案-电磁感应.docx',
                action: 'toast',
                message: '现在没心情准备教案'
            },
            {
                icon: '📊',
                name: '牛顿运动定律复习课.ppt',
                action: 'toast',
                message: '现在没心情准备教案'
            },
            {
                icon: '📄',
                name: '高三一轮复习-力学专题.docx',
                action: 'toast',
                message: '现在没心情准备教案'
            },
            {
                icon: '📊',
                name: '动量与能量守恒.ppt',
                action: 'toast',
                message: '现在没心情准备教案'
            },
            {
                icon: '📄',
                name: '高三二轮复习-实验专题.docx',
                action: 'toast',
                message: '现在没心情准备教案'
            },
            {
                icon: '📊',
                name: '测电源电动势与内阻.ppt',
                action: 'toast',
                message: '现在没心情准备教案'
            },
            {
                icon: '📄',
                name: '热学与近代物理初步.docx',
                action: 'toast',
                message: '现在没心情准备教案'
            },
            {
                icon: '📝',
                name: '韩休中级职称申请表.docx',
                action: 'app',
                appId: 'titleevaluation'
            },
            {
                icon: '🖼️',
                name: '证件照.jpg',
                action: 'app',
                appId: 'photo-hanxiu',
                thumbnail: 'image/hanxiu.webp'
            }
        ]
    }
};