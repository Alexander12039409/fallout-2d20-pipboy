(function () {
    function inTelegram() {
        const tg = window.Telegram && window.Telegram.WebApp;
        if (tg && (tg.initData || (tg.initDataUnsafe && (tg.initDataUnsafe.user || tg.initDataUnsafe.start_param)))) return true;
        return /Telegram/i.test((typeof navigator !== 'undefined' && navigator.userAgent) || '');
    }

    function boot() {
        if (!inTelegram()) return;
        document.documentElement.classList.add('telegram-webapp');
        if (document.body) document.body.classList.add('telegram-webapp');
        const tg = window.Telegram && window.Telegram.WebApp;
        if (!tg) return;
        try { tg.ready(); } catch (e) {}
        try { tg.expand(); } catch (e) {}
        try { if (tg.setHeaderColor) tg.setHeaderColor('#031203'); } catch (e) {}
        try { if (tg.setBackgroundColor) tg.setBackgroundColor('#000000'); } catch (e) {}
        try { if (tg.disableVerticalSwipes) tg.disableVerticalSwipes(); } catch (e) {}
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
})();
