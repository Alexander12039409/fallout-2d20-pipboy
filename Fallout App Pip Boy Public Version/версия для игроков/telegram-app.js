(function () {
    function inTelegram() {
        const tg = window.Telegram && window.Telegram.WebApp;
        if (tg && (tg.initData || (tg.initDataUnsafe && (tg.initDataUnsafe.user || tg.initDataUnsafe.start_param)))) return true;
        return /Telegram/i.test((typeof navigator !== 'undefined' && navigator.userAgent) || '');
    }

    function lockTabsHorizontal() {
        const nav = document.getElementById('player-play-nav');
        if (!nav || nav.dataset.panLock) return;
        nav.dataset.panLock = '1';
        let x0 = 0, y0 = 0, axis = '';
        nav.addEventListener('touchstart', function (e) {
            if (!e.touches[0]) return;
            x0 = e.touches[0].clientX;
            y0 = e.touches[0].clientY;
            axis = '';
        }, { passive: true });
        nav.addEventListener('touchmove', function (e) {
            if (!e.touches[0]) return;
            const dx = e.touches[0].clientX - x0;
            const dy = e.touches[0].clientY - y0;
            if (!axis) {
                if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
                axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
            }
            if (axis !== 'x') e.preventDefault();
        }, { passive: false });
    }

    function boot() {
        if (!inTelegram()) return;
        document.documentElement.classList.add('telegram-webapp');
        if (document.body) document.body.classList.add('telegram-webapp');
        const tg = window.Telegram && window.Telegram.WebApp;
        if (tg) {
            try { tg.ready(); } catch (e) {}
            try { tg.expand(); } catch (e) {}
            try { if (tg.setHeaderColor) tg.setHeaderColor('#031203'); } catch (e) {}
            try { if (tg.setBackgroundColor) tg.setBackgroundColor('#000000'); } catch (e) {}
            try { if (tg.disableVerticalSwipes) tg.disableVerticalSwipes(); } catch (e) {}
        }
        lockTabsHorizontal();
    }

    window.pipTelegramStartCode = function () {
        const q = new URLSearchParams(location.search);
        const fromQ = q.get('s') || q.get('startapp') || q.get('tgWebAppStartParam') || '';
        const tg = window.Telegram && window.Telegram.WebApp;
        const fromTg = tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param;
        const raw = String(fromTg || fromQ || '').toUpperCase();
        const m = raw.match(/[A-HJ-NP-Z2-9]{6,8}/);
        return m ? m[0] : '';
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();

    function keepKeyboard(el) {
        let n = el;
        if (n && n.nodeType === 3) n = n.parentElement;
        if (!n || !n.closest) return false;
        return !!n.closest('input, textarea, select, button, a, label, [contenteditable="true"]');
    }

    function focusedField() {
        const ae = document.activeElement;
        if (!ae) return null;
        const tag = (ae.tagName || '').toUpperCase();
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || ae.isContentEditable) return ae;
        return null;
    }

    function dismissKeyboard() {
        const field = focusedField();
        if (!field) return;
        try { field.blur(); } catch (e) {}
        const tg = window.Telegram && window.Telegram.WebApp;
        try { if (tg && typeof tg.hideKeyboard === 'function') tg.hideKeyboard(); } catch (e) {}
    }

    function onBackgroundTap(e) {
        if (keepKeyboard(e.target)) return;
        dismissKeyboard();
    }

    document.addEventListener('pointerdown', onBackgroundTap, true);
    document.addEventListener('touchend', onBackgroundTap, { capture: true, passive: true });
})();
