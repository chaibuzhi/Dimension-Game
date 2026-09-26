// ========== 内网个人中心数据 ==========
const intranetProfileData = {
    dingwenqian: {
        photo: 'image/profile_ding_01.webp',
        photoBroken: 'image/profile_ding_02.webp',
        accountLogs: [
            { time: '2026.07.15', action: '操作权限被管理员由 [最高级] 修改为 [普通级]', highlight: true },
            { time: '2026.07.14', action: '登录系统' },
            { time: '2026.06.15', action: '标记为外勤状态' },
            { time: '2026.03.17', action: '操作权限被管理员由 [高级] 修改为 [最高级]', highlight: true }
        ]
    }
};

function getIntranetProfileData() {
    const employeeId = localStorage.getItem('intranet_login') || 'dingwenqian';
    const user = intranetUserData.getCurrentUser();
    const profile = intranetProfileData[employeeId] || intranetProfileData.dingwenqian;

    return {
        photo: profile.photo,
        photoBroken: profile.photoBroken,
        accountLogs: profile.accountLogs,
        profileBasic: [
            { label: '工号', value: user.id },
            { label: '部门', value: user.dept },
            { label: '职位', value: user.title },
            { label: '性别', value: user.gender },
            { label: '生日', value: user.birthday },
            { label: '年龄', value: user.age }
        ],
        profileExtra: [
            { label: '入职时间', value: user.joinDate },
            { label: '权限等级', value: user.level }
        ],
        profileLogin: [
            { label: '上次登录时间', value: user.lastLoginTime },
            { label: '上次登录IP', value: '10.12.4.8' },
            { label: 'MAC地址', value: 'A4-8F-3C-22-9D-01' },
            { label: '登录协议', value: 'TQ-VPN-07' },
            { label: '当前状态', value: user.status }
        ]
    };
}