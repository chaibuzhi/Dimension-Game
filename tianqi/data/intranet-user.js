// ========== 内网基础用户信息 ==========
const intranetUserData = {
    users: {
        dingwenqian: {
            name: '丁文倩',
            id: 'TQ-PHY-DWQ-A09',
            avatar: 'image/bar/bar_dwq.webp',
            title: '物理研究部总监',
            dept: '物理研究部',
            level: '普通级',
            status: '在线',
            nameEn: 'Ding WenQian',
            gender: '女',
            birthday: '1996年4月8日',
            age: '30岁',
            joinDate: '2021年6月',
            lastLoginTime: '2026.07.14 21:33',
            lastLoginIP: '内部局域网'
        }
        // 未来添加其他用户...
    },

    getCurrentUser() {
        const employeeId = localStorage.getItem('intranet_login') || 'dingwenqian';
        return this.users[employeeId] || this.users.dingwenqian;
    }
};