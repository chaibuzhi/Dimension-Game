// ========== 音频播放器 ==========

const audio = document.getElementById('audioElement');
const playBtn = document.getElementById('btnPlay');
const rewindBtn = document.getElementById('btnRewind');
const forwardBtn = document.getElementById('btnForward');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const canvas = document.getElementById('waveformCanvas');
const ctx = canvas.getContext('2d');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

// ========== 播放/暂停图标切换 ==========
function setPlayIcon(isPlaying) {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// ========== 音频文件路径 ==========
// 播放器位于 desktop/apps/audio/ 下，音频文件的 src 是相对桌面根目录的
const params = new URLSearchParams(window.location.search);
let audioSrc = params.get('src') || '';

// 把桌面根目录的相对路径转换为播放器目录的相对路径
if (audioSrc && !audioSrc.startsWith('/') && !audioSrc.startsWith('http')) {
    audioSrc = '../../' + audioSrc;
}

audio.src = audioSrc;
audio.load();

// ========== 波形动画 ==========
let isPlaying = false;
let waveBars = [];
const BAR_COUNT = 48;

function initWaveBars() {
    waveBars = [];
    for (let i = 0; i < BAR_COUNT; i++) {
        waveBars.push({
            baseHeight: 0.15 + Math.random() * 0.5,
            speed: 1.5 + Math.random() * 3,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function drawWaveform() {
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // 横向渐变：暗蓝 → 暗紫 → 暗青
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, 'rgba(70, 90, 160, 0.7)');
    gradient.addColorStop(0.5, 'rgba(100, 70, 160, 0.6)');
    gradient.addColorStop(1, 'rgba(0, 170, 210, 0.6)');

    const barWidth = w / BAR_COUNT;
    const centerY = h / 2;

    waveBars.forEach((bar, index) => {
        let heightFactor = bar.baseHeight;

        if (isPlaying) {
            heightFactor = bar.baseHeight * (0.6 + 0.5 * Math.abs(Math.sin(Date.now() / 300 * bar.speed + bar.phase)));
        }

        const barHeight = heightFactor * h * 0.8;
        const x = index * barWidth;
        const y = centerY - barHeight / 2;

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x + barWidth * 0.15, y, barWidth * 0.7, barHeight, 2);
        ctx.fill();
    });

    requestAnimationFrame(drawWaveform);
}

function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    initWaveBars();
}

// ========== 字幕数据 ==========
const subtitles = [
    { start: 1.520, end: 2.880, text: '休' },
    { start: 2.880, end: 4.840, text: '如果你收到这封邮件' },
    { start: 5.160, end: 8.160, text: '说明我已经离开这个世界了' },
    { start: 8.200, end: 9.600, text: '很抱歉' },
    { start: 9.600, end: 12.240, text: '答应你的四周年旅行' },
    { start: 12.240, end: 13.680, text: '我不能去了' },
    { start: 14.080, end: 17.080, text: '我真的很想和你再去一次海边' },
    { start: 17.200, end: 18.720, text: '可是' },
    { start: 18.720, end: 20.400, text: '我没有时间了' },
    { start: 21.360, end: 22.640, text: '我们的结婚戒指' },
    { start: 22.640, end: 24.000, text: '我没有带走' },
    { start: 24.000, end: 26.000, text: '就在书房的抽屉里' },
    { start: 26.320, end: 27.720, text: '和你结婚' },
    { start: 27.720, end: 30.200, text: '是我做过最幸福的决定' },
    { start: 30.560, end: 32.000, text: '别为我难过' },
    { start: 32.000, end: 33.480, text: '好不好' },
    { start: 34.000, end: 36.000, text: '不要去问真相' },
    { start: 36.000, end: 37.880, text: '也不要来找我' },
    { start: 37.880, end: 39.720, text: '按公司说的做吧' },
    { start: 40.120, end: 41.640, text: '我应该' },
    { start: 41.640, end: 44.320, text: '去到了我想去的地方' },
    { start: 44.600, end: 46.520, text: '对不起 休' },
    { start: 46.840, end: 48.680, text: '原谅我的自私' },
    { start: 48.680, end: 50.200, text: '永远爱你的' },
    { start: 50.200, end: 51.360, text: '文倩' }
];

// ========== 时间格式化 ==========
function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}

// ========== 字幕显示 ==========
function updateSubtitle(currentTime) {
    const overlay = document.getElementById('subtitleOverlay');
    if (!overlay) return;

    const subtitle = subtitles.find(s => currentTime >= s.start && currentTime < s.end);

    if (subtitle) {
        overlay.textContent = subtitle.text;
        overlay.classList.add('visible');
    } else {
        overlay.classList.remove('visible');
    }
}

// ========== 播放/暂停 ==========
playBtn.addEventListener('click', function() {
    if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setPlayIcon(true);
                isPlaying = true;
            }).catch(err => {
                console.error('音频播放失败:', err);
                setPlayIcon(false);
                isPlaying = false;
                showPlaybackError();
            });
        }
    } else {
        audio.pause();
        setPlayIcon(false);
        isPlaying = false;
    }
});

function showPlaybackError() {
    const title = document.getElementById('audioTitle');
    if (title) {
        title.textContent = '⚠️ 音频文件加载失败';
        title.style.color = '#ff6b6b';
    }
}

// ========== 回到开头 ==========
rewindBtn.addEventListener('click', function() {
    audio.currentTime = 0;
    const overlay = document.getElementById('subtitleOverlay');
    if (overlay) overlay.classList.remove('visible');
});

// ========== 跳到结尾 ==========
forwardBtn.addEventListener('click', function() {
    audio.currentTime = audio.duration || 0;
});

// ========== 进度条 ==========
progressBar.addEventListener('input', function() {
    const duration = audio.duration;
    if (!duration) return;
    const newTime = (parseFloat(progressBar.value) / 100) * duration;
    audio.currentTime = newTime;
});

audio.addEventListener('timeupdate', function() {
    const duration = audio.duration;
    if (duration) {
        const percent = (audio.currentTime / duration) * 100;
        progressBar.value = percent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
    updateSubtitle(audio.currentTime);
});

audio.addEventListener('loadedmetadata', function() {
    totalTimeEl.textContent = formatTime(audio.duration);
    const title = document.getElementById('audioTitle');
    if (title) {
        title.textContent = '🎵 录音文件';
        title.style.color = '';
    }
});

audio.addEventListener('ended', function() {
    setPlayIcon(false);
    isPlaying = false;
    progressBar.value = 100;
    currentTimeEl.textContent = formatTime(audio.duration);
    const overlay = document.getElementById('subtitleOverlay');
    if (overlay) overlay.classList.remove('visible');
});

// ========== 初始化 ==========
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
drawWaveform();

// ========== 打开录音时记录时间戳（用于天启通好友申请） ==========
if (!localStorage.getItem('dwq_audio_opened_time')) {
    const openedTime = Date.now();
    localStorage.setItem('dwq_audio_opened_time', String(openedTime));
    // 通知由中央调度器负责
}