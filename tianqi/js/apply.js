// ========== 招聘报名页逻辑 ==========

// 推荐码映射
const referralMap = {
    'REF#DAT-2026A05': '刘忙',
    'REF#MAT-SM-A16': '沈曼'
};

// ========== 标准答案（所有校验值统一在这里修改） ==========
const correctAnswers = {
    // 文本输入（exact: 完全匹配 / includes: 包含关键词即可）
    email: { value: 'hanxiu@mail.com', match: 'exact' },
    school: { value: '龙华大学', match: 'exact' },
    major: { value: '物理', match: 'includes' },
    // 下拉菜单
    birthYear: '1995年',
    birthMonth: '7月',
    birthDay: '15日',
    graduationYear: '2022年',
    education: '博士'
};

// 下拉菜单实例集合
const selectInstances = [];

// ========== 自定义下拉菜单类 ==========
class CustomSelect {
    constructor(containerId, options, defaultValue, onChange) {
        this.container = document.getElementById(containerId);
        this.trigger = this.container.querySelector('.select-trigger');
        this.valueEl = this.trigger.querySelector('.select-value');
        this.dropdown = this.container.querySelector('.select-dropdown');
        this.options = options;
        this.value = defaultValue;
        this.onChange = onChange;
        this.isOpen = false;

        this.renderOptions();
        this.setValue(defaultValue);
        this.bindEvents();

        selectInstances.push(this);
    }

    renderOptions() {
        let html = '<ul style="list-style:none;padding:4px;margin:0;">';
        this.options.forEach(opt => {
            const selected = opt === this.value ? ' selected' : '';
            html += `<li class="select-option${selected}" data-value="${opt}">${opt}</li>`;
        });
        html += '</ul>';
        this.dropdown.innerHTML = html;
    }

    setValue(value) {
        this.value = value;
        this.valueEl.textContent = value;

        // 更新选项选中态
        const optionEls = this.dropdown.querySelectorAll('.select-option');
        optionEls.forEach(el => {
            if (el.dataset.value === value) {
                el.classList.add('selected');
            } else {
                el.classList.remove('selected');
            }
        });

        if (this.onChange) this.onChange(value);
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.closeAllOthers();
        this.isOpen = true;
        this.container.classList.add('open');
        this.dropdown.classList.remove('hidden');
    }

    close() {
        this.isOpen = false;
        this.container.classList.remove('open');
        this.dropdown.classList.add('hidden');
    }

    closeAllOthers() {
        selectInstances.forEach(sel => {
            if (sel !== this) sel.close();
        });
    }

    bindEvents() {
        // 触发器点击
        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // 选项点击
        this.dropdown.addEventListener('click', (e) => {
            const option = e.target.closest('.select-option');
            if (option) {
                this.setValue(option.dataset.value);
                this.close();
                hideError();
            }
        });

        // 点击外部关闭
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.close();
            }
        });

        // ESC 关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    initPage();
});

function initPage() {
    // 检查是否已提交过
    if (localStorage.getItem('job_apply_done') === 'true') {
        showSuccessState();
        return;
    }

    // 初始化下拉菜单
    initSelects();

    // 监听信息来源选择
    const sourceRadios = document.querySelectorAll('input[name="source"]');
    sourceRadios.forEach(radio => {
        radio.addEventListener('change', toggleReferralFields);
    });

    // 提交按钮
    document.getElementById('submitBtn').addEventListener('click', handleSubmit);

    // 表单输入时隐藏错误
    document.getElementById('applyForm').addEventListener('input', hideError);
}

function initSelects() {
    // 出生年份（默认2000年）
    const birthYears = [];
    for (let y = 1970; y <= 2005; y++) birthYears.push(y + '年');
    new CustomSelect('birthYear', birthYears, '2000年');

    // 出生月份（默认1月）
    const birthMonths = [];
    for (let m = 1; m <= 12; m++) birthMonths.push(m + '月');
    new CustomSelect('birthMonth', birthMonths, '1月');

    // 出生日（默认1日）
    const birthDays = [];
    for (let d = 1; d <= 31; d++) birthDays.push(d + '日');
    new CustomSelect('birthDay', birthDays, '1日');

    // 毕业年份（默认2026年）
    const graduationYears = [];
    for (let y = 2000; y <= 2026; y++) graduationYears.push(y + '年');
    new CustomSelect('graduationYear', graduationYears, '2026年');

    // 学历（默认本科）
    new CustomSelect('education', ['本科', '硕士', '博士'], '本科');
}

// ========== 获取表单值 ==========
function getSelectValue(containerId) {
    const instance = selectInstances.find(s => s.container.id === containerId);
    return instance ? instance.value : '';
}

// 切换内推字段显示
function toggleReferralFields() {
    const selectedSource = document.querySelector('input[name="source"]:checked').value;
    const referralFields = document.getElementById('referralFields');

    if (selectedSource === '内部推荐') {
        referralFields.classList.remove('hidden');
    } else {
        referralFields.classList.add('hidden');
    }
    hideError();
}

// ========== 提交处理 ==========
function handleSubmit() {
    hideError();

    // 1. 检查是否勾选声明
    const agreeCheck = document.getElementById('agreeCheck');
    if (!agreeCheck.checked) {
        showError('未勾选候选人声明，申请无法提交。');
        return;
    }

    // 2. 检查必填字段是否完整
    const requiredInputs = [
        document.getElementById('name'),
        document.getElementById('gender'),
        document.getElementById('email'),
        document.getElementById('city'),
        document.getElementById('school'),
        document.getElementById('major')
    ];

    for (const input of requiredInputs) {
        if (!input.value.trim()) {
            showError('信息填写不完整，请补全后重新提交。');
            return;
        }
    }

    // 检查下拉菜单是否有值
    const selectValues = [
        getSelectValue('birthYear'),
        getSelectValue('birthMonth'),
        getSelectValue('birthDay'),
        getSelectValue('graduationYear'),
        getSelectValue('education')
    ];
    for (const val of selectValues) {
        if (!val) {
            showError('信息填写不完整，请补全后重新提交。');
            return;
        }
    }

    // 检查内推字段
    const selectedSource = document.querySelector('input[name="source"]:checked').value;
    if (selectedSource === '内部推荐') {
        const referrerName = document.getElementById('referrerName').value.trim();
        const referralCode = document.getElementById('referralCode').value.trim();
        if (!referrerName || !referralCode) {
            showError('信息填写不完整，请补全后重新提交。');
            return;
        }
    }

    // 3. 信息校验
    // 下拉菜单
    if (getSelectValue('birthYear') !== correctAnswers.birthYear ||
        getSelectValue('birthMonth') !== correctAnswers.birthMonth ||
        getSelectValue('birthDay') !== correctAnswers.birthDay) {
        showError('您的个人信息校验未通过，请核对后重新提交。');
        return;
    }
    if (getSelectValue('graduationYear') !== correctAnswers.graduationYear) {
        showError('您的个人信息校验未通过，请核对后重新提交。');
        return;
    }
    if (getSelectValue('education') !== correctAnswers.education) {
        showError('您的个人信息校验未通过，请核对后重新提交。');
        return;
    }

    // 文本字段
    const dataCorrectFields = [
        { el: document.getElementById('email'), answer: correctAnswers.email },
        { el: document.getElementById('school'), answer: correctAnswers.school },
        { el: document.getElementById('major'), answer: correctAnswers.major }
    ];
    for (const field of dataCorrectFields) {
        const inputValue = field.el.value.trim();
        const expectedValue = field.answer.value;
        const matchType = field.answer.match;

        let isValid = false;
        if (matchType === 'includes') {
            isValid = inputValue.includes(expectedValue);
        } else {
            isValid = inputValue === expectedValue;
        }

        if (!isValid) {
            showError('您的个人信息校验未通过，请核对后重新提交。');
            return;
        }
    }

    // 4. 同意书检查
    if (localStorage.getItem('agreement_signed') !== 'true') {
        showError('系统检测申请人与本公司存在<strong>「待处理纠纷」</strong>，申请暂时无法受理。<br><strong>请处理完相关事宜后再提交申请。</strong>');
        return;
    }

    // 5. 内推检查
    if (selectedSource !== '内部推荐') {
        // 玩家看到此提示后，解锁老刘和小周的写邮件内容
        localStorage.setItem('job_apply_attempted', 'true');
        showError('本招聘仅受理应届毕业生申请，社会应聘人员须通过<strong>「内部推荐」</strong>渠道申报<br>请在「信息来源」中选择「内部推荐」，并填写<strong>「推荐人」</strong>及<strong>「推荐码」</strong>');
        return;
    }

    // 6. 推荐码校验
    const referrerName = document.getElementById('referrerName').value.trim();
    const referralCode = document.getElementById('referralCode').value.trim();
    const expectedName = referralMap[referralCode];

    if (!expectedName || expectedName !== referrerName) {
        // 玩家已经看到了内推要求，解锁写邮件内容
        localStorage.setItem('job_apply_attempted', 'true');
        showError('推荐人身份或推荐码校验失败，请核实后重新填写。');
        return;
    }

    // 7. 提交成功
    localStorage.setItem('job_apply_done', 'true');
    localStorage.setItem('recommendation_source', referralCode);
    localStorage.setItem('job_apply_time', String(Date.now()));
    showSuccessState();
}

// 显示错误
function showError(message) {
    const error = document.getElementById('formError');
    document.getElementById('formErrorText').innerHTML = message;
    error.classList.remove('hidden');
    error.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 隐藏错误
function hideError() {
    const error = document.getElementById('formError');
    if (!error.classList.contains('hidden')) {
        error.classList.add('hidden');
    }
}

// 切换到成功状态
function showSuccessState() {
    document.getElementById('applyFormSection').classList.add('hidden');
    document.getElementById('applySuccess').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}