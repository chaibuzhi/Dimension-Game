// ========== 图片查看器 ==========
// 支持滚轮缩放、拖拽平移、工具栏按钮

const container = document.getElementById('viewerContainer');
const image = document.getElementById('viewerImage');
const zoomLevelEl = document.getElementById('zoomLevel');

let scale = 1;
let minScale = 1;
let maxScale = 6;
let translateX = 0;
let translateY = 0;

let isDragging = false;
let startX = 0;
let startY = 0;
let lastTranslateX = 0;
let lastTranslateY = 0;

// ========== 从 URL 参数获取图片地址 ==========
const params = new URLSearchParams(window.location.search);
let imageSrc = params.get('src') || '';

// 处理相对路径：app.src 是相对桌面根目录的，viewer 在 apps/viewer/ 下
if (imageSrc && !imageSrc.startsWith('/') && !imageSrc.startsWith('../') && !imageSrc.startsWith('http')) {
    imageSrc = '../../' + imageSrc;
}

if (imageSrc) {
    // 先隐藏图片（内联样式，优先级最高）
    image.style.visibility = 'hidden';
    image.style.opacity = '0';

    // 先绑定事件，再设置 src，避免竞态
    image.onload = function() {
        fitImageToWindow();
    };
    image.onerror = function() {
        container.innerHTML = '<div style="color:#999; font-size:14px;">图片加载失败</div>';
    };
    image.src = imageSrc;   // 最后设置 src
}

// ========== 适配窗口 ==========
function fitImageToWindow() {
    if (!image.naturalWidth || !image.naturalHeight) return;

    const containerW = container.clientWidth;
    const containerH = container.clientHeight;
    const imgW = image.naturalWidth;
    const imgH = image.naturalHeight;

    scale = Math.min(containerW / imgW, containerH / imgH);
    minScale = scale;
    translateX = 0;
    translateY = 0;
    applyTransform();
    // 适配完成后，让图片平滑显示
    image.style.visibility = 'visible';
    image.style.opacity = '1';
}

// ========== 应用变换 ==========
function applyTransform() {
    image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// ========== 更新缩放显示 ==========
function updateZoomDisplay() {
    const percent = Math.round(scale / minScale * 100);
    zoomLevelEl.textContent = percent + '%';
}

// ========== 限制平移范围 ==========
function clampTranslate() {
    const containerW = container.clientWidth;
    const containerH = container.clientHeight;
    const imgW = image.naturalWidth * scale;
    const imgH = image.naturalHeight * scale;

    const maxX = Math.max(0, (imgW - containerW) / 2);
    const maxY = Math.max(0, (imgH - containerH) / 2);

    translateX = Math.max(-maxX, Math.min(translateX, maxX));
    translateY = Math.max(-maxY, Math.min(translateY, maxY));
}

// ========== 滚轮缩放 ==========
container.addEventListener('wheel', function(e) {
    e.preventDefault();

    // 基于 deltaY 比例缩放，每格滚轮约 5%
    const delta = -(e.deltaY * 0.0005);
    const newScale = Math.max(minScale, Math.min(scale * (1 + delta), maxScale));

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - container.clientWidth / 2;
    const mouseY = e.clientY - rect.top - container.clientHeight / 2;

    const ratio = newScale / scale;
    translateX = mouseX - (mouseX - translateX) * ratio;
    translateY = mouseY - (mouseY - translateY) * ratio;

    scale = newScale;
    clampTranslate();
    applyTransform();
    updateZoomDisplay();
}, { passive: false });

// ========== 拖拽平移 ==========
container.addEventListener('pointerdown', function(e) {
    if (scale <= minScale) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    lastTranslateX = translateX;
    lastTranslateY = translateY;
    container.classList.add('dragging');
    container.setPointerCapture(e.pointerId);
});

container.addEventListener('pointermove', function(e) {
    if (!isDragging) return;
    translateX = lastTranslateX + (e.clientX - startX);
    translateY = lastTranslateY + (e.clientY - startY);
    clampTranslate();
    applyTransform();
});

container.addEventListener('pointerup', function(e) {
    isDragging = false;
    container.classList.remove('dragging');
    container.releasePointerCapture(e.pointerId);
});

container.addEventListener('pointercancel', function() {
    isDragging = false;
    container.classList.remove('dragging');
});

// ========== 双击重置 ==========
container.addEventListener('dblclick', function() {
    fitImageToWindow();
});

// ========== 工具栏按钮 ==========
document.getElementById('zoomIn').addEventListener('click', function() {
    const newScale = Math.min(scale + 0.25, maxScale);
    const ratio = newScale / scale;
    translateX = translateX * ratio;
    translateY = translateY * ratio;
    scale = newScale;
    clampTranslate();
    applyTransform();
    updateZoomDisplay();
});

document.getElementById('zoomOut').addEventListener('click', function() {
    const newScale = Math.max(scale - 0.25, minScale);
    const ratio = newScale / scale;
    translateX = translateX * ratio;
    translateY = translateY * ratio;
    scale = newScale;
    clampTranslate();
    applyTransform();
    updateZoomDisplay();
});

document.getElementById('zoomReset').addEventListener('click', function() {
    fitImageToWindow();
});

// ========== 窗口大小变化时重新适配 ==========
window.addEventListener('resize', function() {
    if (scale <= minScale) {
        fitImageToWindow();
    } else {
        clampTranslate();
        applyTransform();
    }
});