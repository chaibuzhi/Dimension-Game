// ========== 天启通 · 音效模块（Web Audio 合成） ==========

const ChatSFX = (function() {
    let ctx = null;

    function init() {
        if (ctx) return;
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            ctx = new AC();
        } catch (e) {
            console.warn('Web Audio 不可用');
        }
    }

    function ensureResume() {
        if (!ctx) return;
        if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }
    }

    function tone(opts) {
        if (!ctx) return;
        const delay = opts.delay || 0;
        const now = ctx.currentTime + delay;
        const dur = opts.dur || 0.2;
        const vol = opts.vol || 0.12;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = opts.type || 'sine';
        osc.frequency.setValueAtTime(opts.freq, now);
        if (opts.freqEnd) {
            osc.frequency.exponentialRampToValueAtTime(opts.freqEnd, now + dur);
        }

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(vol, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + dur + 0.05);
    }

    // ===== 导入成功：上行双音，明亮 =====
    function importSuccess() {
        init(); ensureResume();
        tone({ freq: 1046.5, type: 'triangle', delay: 0,    dur: 0.14, vol: 0.10 });
        tone({ freq: 1568.0, type: 'triangle', delay: 0.10, dur: 0.35, vol: 0.12 });
        tone({ freq: 2093.0, type: 'sine',     delay: 0.20, dur: 0.40, vol: 0.04 });
    }

    // ===== 导入失败 / 各种错误：下行双音，低沉 =====
    function importFail() {
        init(); ensureResume();
        tone({ freq: 440.0, type: 'triangle', delay: 0,    dur: 0.15, vol: 0.10 });
        tone({ freq: 293.7, type: 'triangle', delay: 0.12, dur: 0.40, vol: 0.11 });
        tone({ freq: 220.0, type: 'sine',     delay: 0.12, dur: 0.40, vol: 0.05 });
    }

    // ===== 剧情锁定弹窗：低沉持续，压迫感 =====
    function lockWarning() {
        init(); ensureResume();
        tone({ freq: 110.0, type: 'sawtooth', delay: 0,    dur: 0.90, vol: 0.07 });
        tone({ freq: 164.8, type: 'triangle', delay: 0.06, dur: 1.00, vol: 0.06 });
        tone({ freq: 220.0, type: 'sine',     delay: 0.18, dur: 0.85, vol: 0.05 });
    }

    return { importSuccess, importFail, lockWarning };
})();


// ========== 天启通 · 神秘人背景音乐 ==========

const ChatMusic = (function() {
    let audio = null;
    let started = false;
    const TARGET_VOLUME = 0.28;
    const FADE_IN_MS = 2000;
    const FADE_OUT_MS = 1500;

    let fadeRaf = null;

    function load() {
        if (audio) return audio;
        audio = new Audio('/music/mystery.mp3');
        audio.loop = true;
        audio.volume = 0;
        return audio;
    }

    function fadeTo(target, duration, onDone) {
        const a = load();
        if (fadeRaf) cancelAnimationFrame(fadeRaf);

        const start = a.volume;
        const delta = target - start;
        const startTime = performance.now();

        function step(now) {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = t * t * (3 - 2 * t);
            a.volume = Math.max(0, Math.min(1, start + delta * eased));
            if (t < 1) {
                fadeRaf = requestAnimationFrame(step);
            } else {
                fadeRaf = null;
                if (onDone) onDone();
            }
        }
        fadeRaf = requestAnimationFrame(step);
    }

    function start() {
        const a = load();
        if (started && !a.paused) return;

        started = true;
        a.play().then(() => {
            fadeTo(TARGET_VOLUME, FADE_IN_MS);
        }).catch(() => {
            const resume = () => {
                a.play().then(() => fadeTo(TARGET_VOLUME, FADE_IN_MS)).catch(() => {});
                document.removeEventListener('click', resume);
            };
            document.addEventListener('click', resume);
        });
    }

    function stop() {
        if (!audio || !started) return;
        fadeTo(0, FADE_OUT_MS, () => {
            audio.pause();
            audio.currentTime = 0;
            started = false;
        });
    }

    function resumeFromState() {
        let state = {};
        try {
            state = JSON.parse(localStorage.getItem('tqchat_state') || '{}');
        } catch (e) {}
        if (state.mysteryUnlocked === true && state.locked !== true) {
            start();
        }
    }

    return { start, stop, resumeFromState };
})();