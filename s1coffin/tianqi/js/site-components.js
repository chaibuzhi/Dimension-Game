// ========== 天启科技站点公共组件 ==========

// ========== 公共 CSS ==========
const sitePublicCSS = `
:root {
    --background: #070a14;
    --card: #12121a;
    --secondary: #161621;
    --foreground: #f5f5f7;
    --muted-foreground: #a0a0b0;
    --border: #2a2a3a;
    --primary: #0071e3;
    --primary-foreground: #ffffff;
    --accent: #00c8ff;
    --purple: #8b5cf6;
    --radius: 16px;
    --font: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font);
}

body {
    background: var(--background);
    color: var(--foreground);
    overflow-x: hidden;
}

.hidden {
    display: none !important;
}

/* ========== 顶部导航栏 ========== */
.site-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    border-bottom: 1px solid var(--border);
    background: rgba(10, 10, 15, 0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

/* 页面内容需要补偿顶部导航栏高度 */
body {
    padding-top: 64px;
}
.site-header .nav {
    max-width: 1200px;
    margin: 0 auto;
    height: 64px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.site-header .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: var(--foreground);
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
}
.site-header .logo svg {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
}
.site-header .nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
    list-style: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.site-header .nav-links a {
    color: var(--muted-foreground);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
}
.site-header .nav-links a:hover {
    color: var(--foreground);
}
.site-header .login-btn {
    border: 1px solid var(--border);
    border-radius: 50px;
    padding: 6px 20px;
    font-size: 14px;
    color: var(--foreground);
    background: transparent;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
    white-space: nowrap;
}
.site-header .login-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
}

/* ========== 页脚 ========== */
.site-footer {
    background: var(--secondary);
    color: var(--muted-foreground);
    padding: 48px 24px;
}
.site-footer .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
}
.site-footer .footer-cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    margin-bottom: 40px;
}
.site-footer .footer-col h3 {
    font-size: 12px;
    font-weight: 600;
    color: var(--foreground);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
}
.site-footer .footer-col ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.site-footer .footer-col a {
    font-size: 13px;
    color: var(--muted-foreground);
    text-decoration: none;
    transition: color 0.2s;
}
.site-footer .footer-col a:hover {
    color: var(--foreground);
}
.site-footer .footer-bottom {
    border-top: 1px solid var(--border);
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    font-size: 12px;
}
.site-footer .footer-bottom .legal {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
.site-footer .footer-bottom .legal a {
    color: var(--muted-foreground);
    text-decoration: none;
    transition: color 0.2s;
}
.site-footer .footer-bottom .legal a:hover {
    color: var(--foreground);
}

/* ========== 员工登录弹窗 ========== */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.modal {
    background: #1a1a2e;
    border-radius: 16px;
    padding: 32px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    position: relative;
    border: 1px solid var(--border);
}
.modal h2 {
    margin-bottom: 20px;
    color: var(--foreground);
    font-size: 1.2rem;
}
.modal input {
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 12px;
    background: #0a0a15;
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--foreground);
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
}
.modal input:focus {
    border-color: var(--accent);
}
.modal .btn-login {
    width: 100%;
    padding: 12px;
    background: var(--accent);
    color: #0a0a0f;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    transition: opacity 0.2s;
}
.modal .btn-login:hover {
    opacity: 0.85;
}
.modal .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--muted-foreground);
    transition: color 0.2s;
}
.modal .close-btn:hover {
    color: var(--foreground);
}
.modal .login-error {
    color: #c0392b;
    font-size: 13px;
    margin-top: 8px;
    text-align: center;
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
    .site-header .nav-links {
        display: none;
    }
}
@media (max-width: 600px) {
    .site-footer .footer-cols {
        grid-template-columns: 1fr;
    }
    .site-footer .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
    }
}
`;

// ========== 注入公共 CSS ==========
function injectSiteCSS() {
    const styleEl = document.createElement('style');
    styleEl.textContent = sitePublicCSS;
    document.head.appendChild(styleEl);
}

// ========== 导航栏 HTML ==========
function getSiteHeaderHTML() {
    return `
        <header class="site-header">
            <nav class="nav">
                <a href="home.html" class="logo">
                    <svg viewBox="0 0 24 24" fill="none">
                        <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" stroke="#38bdf8" stroke-width="1.2" opacity="0.8" />
                        <polygon points="12,6 17,8.5 17,15.5 12,18 7,15.5 7,8.5" stroke="#2563eb" stroke-width="1" opacity="0.6" />
                        <circle cx="12" cy="12" r="2" fill="#38bdf8" opacity="0.8" />
                    </svg>
                    天启科技 · Revelation Technology
                </a>
				<ul class="nav-links">
				    <li><a href="home.html">首页</a></li>
				    <li><a href="home.html#research">服务</a></li>
                    <li><a href="home.html#network">版图</a></li>
				    <li><a href="news.html">新闻</a></li>
				    <li><a href="home.html#team">团队</a></li>
				    <li><a href="home.html#join">招聘</a></li>
				</ul>
                <button class="login-btn" onclick="openLogin()">员工登录</button>
            </nav>
        </header>
    `;
}

// ========== 页脚 HTML ==========
function getSiteFooterHTML() {
    return `
        <footer class="site-footer">
            <div class="footer-inner">
                <div class="footer-cols">
                    <div class="footer-col">
                        <h3>研究</h3>
                        <ul>
                            <li><a href="home.html#research">能源勘探</a></li>
                            <li><a href="home.html#research">设备研发</a></li>
                            <li><a href="home.html#research">能源材料</a></li>
                            <li><a href="home.html#research">天启计划</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>机构</h3>
                        <ul>
                            <li><a href="javascript:void(0)">关于天启</a></li>
                            <li><a href="home.html#team">团队介绍</a></li>
                            <li><a href="javascript:void(0)">实验室</a></li>
                            <li><a href="javascript:void(0)">学术合作</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>资源</h3>
                        <ul>
                            <li><a href="javascript:void(0)">论文库</a></li>
                            <li><a href="javascript:void(0)">开放数据</a></li>
                            <li><a href="javascript:void(0)">学术活动</a></li>
                            <li><a href="javascript:void(0)">科普专栏</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>我们</h3>
                        <ul>
                            <li><a href="home.html#join">招聘计划</a></li>
                            <li><a href="javascript:void(0)">参观申请</a></li>
                            <li><a href="javascript:void(0)" onclick="openLogin()">员工登录</a></li>
                            <li><a href="javascript:void(0)">联系我们</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>版权所有 © 2026 天启科技（Revelation Technology Co.,Ltd.）保留一切权利。</p>
                    <div class="legal">
                        <a href="javascript:void(0)">隐私政策</a>
                        <a href="javascript:void(0)">使用条款</a>
                        <a href="javascript:void(0)">法律信息</a>
                        <a href="javascript:void(0)">网站地图</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// ========== 登录弹窗 HTML ==========
function getLoginModalHTML() {
    return `
        <div class="modal-overlay hidden" id="loginModal">
            <div class="modal">
                <button class="close-btn" onclick="closeLogin()">×</button>
                <h2>天启科技员工登录</h2>
                <form id="loginForm" onsubmit="event.preventDefault(); login(); return false;">
                    <input type="text" id="empId" placeholder="工号" autocomplete="username">
                    <input type="password" id="empPwd" placeholder="密码" autocomplete="current-password">
                    <button type="submit" class="btn-login">登录</button>
                </form>
                <div class="login-error" id="loginError"></div>
            </div>
        </div>
    `;
}

// ========== 登录相关函数 ==========
function openLogin() {
    document.getElementById('loginModal').classList.remove('hidden');

    const loginError = document.getElementById('loginError');
    if (loginError) {
        loginError.textContent = '';
        loginError.classList.remove('login-error-locked');
    }
}

function closeLogin() {
    document.getElementById('loginModal').classList.add('hidden');
}

// ========== 员工账号表 ==========
const employeeAccounts = [
    {
        id: 'dingwenqian',
        name: '丁文倩',
        empId: 'TQ-PHY-DWQ-A09',
        password: 'onlytruth',
        role: '首席科学家',
        level: '二级'
    }
    // 以后新增账号在这里添加
];

function login() {
    const empId = document.getElementById('empId').value.trim();
    const pwd = document.getElementById('empPwd').value.trim();
    const loginError = document.getElementById('loginError');

    // 1. 检查工号是否存在
    const account = employeeAccounts.find(a => a.empId === empId);

    if (!account) {
        loginError.textContent = '工号不存在，请核对后重试。';
        return;
    }

    // 2. 检查密码是否正确
    if (account.password !== pwd) {
        loginError.textContent = '密码错误，请重新输入。';
        return;
    }

    // 3. 密码正确后，检查账号是否被锁定
    if (empId === 'TQ-PHY-DWQ-A09' && localStorage.getItem('dingwenqian_locked') === 'true') {
        loginError.textContent = '该账号已被锁定';
        return;
    }

    // 4. 登录成功
    localStorage.setItem('intranet_login', account.id);
    loginError.textContent = '';
    window.location.href = 'intranet.html';
}

// ========== 记录：玩家进入过天启科技官网 ==========
function markTianqiHomeVisited() {
    const triggers = JSON.parse(localStorage.getItem('notebook_triggers') || '{}');
    if (!triggers.visited_tianqi_home) {
        triggers.visited_tianqi_home = Date.now();
        localStorage.setItem('notebook_triggers', JSON.stringify(triggers));
    }
}

// ========== 初始化站点公共组件 ==========
function initSiteComponents() {
    // 记录官网访问（备忘录进度用）
    markTianqiHomeVisited();

    // 注入公共 CSS
    injectSiteCSS();

    // 注入导航栏
    const headerContainer = document.getElementById('siteHeader');
    if (headerContainer) {
        headerContainer.innerHTML = getSiteHeaderHTML();
    }

    // 注入页脚
    const footerContainer = document.getElementById('siteFooter');
    if (footerContainer) {
        footerContainer.innerHTML = getSiteFooterHTML();
    }

    // 注入登录弹窗
    const modalContainer = document.getElementById('loginModalContainer');
    if (modalContainer) {
        modalContainer.innerHTML = getLoginModalHTML();
        // 绑定点击遮罩关闭
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.addEventListener('click', function(e) {
                if (e.target === this) closeLogin();
            });
        }
    }
}

// 页面加载时自动初始化
document.addEventListener('DOMContentLoaded', initSiteComponents);