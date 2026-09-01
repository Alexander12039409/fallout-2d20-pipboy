/* Мостик: мини-панель Pip-Boy + полноэкранный бросок из /dice/dice-roller.js */
(function () {
    const DICE_SRC = '/dice/dice-roller.js';
    const prefs = { count: 2, type: 'd6' };
    const PIP_THEME = {
        pip: true,
        dice: '#1ec81e',
        number: '#021402',
        background: '#031203',
        emissive: '#0a5a0a',
        emissiveIntensity: 0.2,
        fontFamily: '"Anonymous Pro", monospace'
    };
    let app = null;
    let loading = null;
    let closeTimer = null;

    function compact() {
        return window.matchMedia('(max-width: 860px)').matches;
    }
    function miniHtml() {
        return '<div class="dice-mini">' +
            '<div class="dice-mini-title">БРОСИТЬ КУБИК</div>' +
            '<div class="dice-mini-row">' +
            '<div class="dice-mini-group"><span class="dice-mini-label">Кубики</span>' +
            '<div class="dice-mini-step">' +
            '<button type="button" data-dice="dec" aria-label="Меньше">−</button>' +
            '<span data-dice="count">2</span>' +
            '<button type="button" data-dice="inc" aria-label="Больше">+</button>' +
            '</div></div>' +
            '<div class="dice-mini-group"><span class="dice-mini-label">Тип</span>' +
            '<div class="dice-mini-types">' +
            '<button type="button" data-dice-type="d6" class="is-on">D6</button>' +
            '<button type="button" data-dice-type="d20">D20</button>' +
            '<button type="button" data-dice-type="d20hit">D20 HIT</button>' +
            '</div></div></div>' +
            '<button type="button" class="term-btn dice-mini-roll" data-dice="roll">БРОСИТЬ</button>' +
            '</div>';
    }
    function syncChrome() {
        document.querySelectorAll('[data-dice="count"]').forEach(function (el) {
            el.textContent = String(prefs.count);
        });
        document.querySelectorAll('[data-dice-type]').forEach(function (btn) {
            btn.classList.toggle('is-on', btn.getAttribute('data-dice-type') === prefs.type);
        });
        const hit = prefs.type === 'd20hit';
        document.querySelectorAll('[data-dice="dec"]').forEach(function (b) {
            b.disabled = hit || prefs.count <= 1;
        });
        document.querySelectorAll('[data-dice="inc"]').forEach(function (b) {
            b.disabled = hit || prefs.count >= 10;
        });
    }
    function fillHosts() {
        document.querySelectorAll('[data-dice-host]').forEach(function (el) {
            if (!el.getAttribute('data-filled')) {
                el.innerHTML = miniHtml();
                el.setAttribute('data-filled', '1');
            }
        });
        syncChrome();
        bindDiceSheetSwipe();
    }
    function bindDiceSheetSwipe() {
        const sheet = document.getElementById('dice-sheet');
        if (!sheet || sheet.getAttribute('data-swipe')) return;
        sheet.setAttribute('data-swipe', '1');
        let startY = 0, currentY = 0, dragging = false;
        const begin = function (clientY, target) {
            if (!compact()) return;
            if (!(target && target.closest && target.closest('.sheet-handle, .cs-header'))) return;
            dragging = true;
            startY = clientY;
            currentY = 0;
            sheet.style.transition = 'none';
        };
        const move = function (clientY) {
            if (!dragging) return;
            currentY = Math.max(0, clientY - startY);
            sheet.style.transform = 'translateY(' + currentY + 'px)';
        };
        const end = function () {
            if (!dragging) return;
            dragging = false;
            sheet.style.transition = '';
            sheet.style.transform = '';
            if (currentY > 72) window.closePlayerDice();
        };
        sheet.addEventListener('touchstart', function (e) { begin(e.touches[0].clientY, e.target); }, { passive: true });
        sheet.addEventListener('touchmove', function (e) { move(e.touches[0].clientY); }, { passive: true });
        sheet.addEventListener('touchend', end);
    }
    function closeMenus() {
        if (typeof closeSysMenu === 'function') closeSysMenu();
        document.body.classList.remove('dice-pop-open', 'dice-sheet-open');
    }
    function nextFrame() {
        return new Promise(function (resolve) {
            requestAnimationFrame(function () { requestAnimationFrame(resolve); });
        });
    }
    function fontsReady() {
        if (!document.fonts || !document.fonts.load) return Promise.resolve();
        return document.fonts.load('700 48px "Anonymous Pro"').then(function () {}, function () {});
    }
    async function ensureApp() {
        if (app) return app;
        if (loading) return loading;
        const root = document.getElementById('dice-overlay-root');
        if (!root) throw new Error('Нет контейнера кубиков');
        loading = fontsReady().then(function () { return import(DICE_SRC); }).then(function (mod) {
            const mount = mod.mountDiceRoller || (mod.default && mod.default.mount);
            app = mount(root, {
                count: prefs.count,
                type: prefs.type,
                bindKeys: true,
                theme: PIP_THEME,
                onChange: function (s) {
                    prefs.count = s.count;
                    prefs.type = s.type;
                    syncChrome();
                },
                onSettled: function (payload) {
                    if (window.__pipDiceSettled) window.__pipDiceSettled(payload);
                }
            });
            if (app.ready) return Promise.resolve(app.ready).then(function () { return app; });
            return app;
        });
        try {
            return await loading;
        } catch (err) {
            loading = null;
            throw err;
        }
    }

    window.openDiceOverlay = async function (doRoll) {
        const overlay = document.getElementById('dice-overlay');
        if (!overlay) return;
        if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
        }
        closeMenus();
        overlay.classList.add('is-open');
        overlay.classList.remove('is-hud');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('dice-open');
        await nextFrame();
        try {
            const a = await ensureApp();
            a.setType(prefs.type);
            if (prefs.type !== 'd20hit') a.setCount(prefs.count);
            if (a.layout) a.layout();
            await nextFrame();
            await new Promise(function (r) { setTimeout(r, 40); });
            overlay.classList.add('is-hud');
            if (doRoll) a.roll();
        } catch (err) {
            console.warn('DiceRoller', err);
            if (typeof pipNotify === 'function') {
                pipNotify('Кубики', 'Не удалось загрузить модуль броска.', { kind: 'error' });
            }
            closeDiceOverlay(true);
        }
    };

    function localDiceValues(type, count) {
        const values = [];
        const n = Math.max(1, Math.min(10, count || 1));
        for (let i = 0; i < n; i++) {
            if (type === 'd6') {
                values.push(['one', 'two', 'effect', 'effect', 'blank', 'blank'][Math.floor(Math.random() * 6)]);
            } else {
                values.push(1 + Math.floor(Math.random() * 20));
            }
        }
        return { type: type, values: values };
    }

    window.pipRollDice = async function (opts) {
        opts = opts || {};
        const type = opts.type || 'd20';
        const count = type === 'd20hit' ? 1 : Math.max(1, Math.min(10, parseInt(opts.count, 10) || 2));
        const fallback = function () { return localDiceValues(type, count); };
        try {
            prefs.type = type;
            prefs.count = count;
            const overlay = document.getElementById('dice-overlay');
            if (!overlay) return fallback();
            if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
            closeMenus();
            overlay.classList.add('is-open');
            overlay.classList.remove('is-hud');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('dice-open');
            await nextFrame();
            const a = await ensureApp();
            a.setType(type);
            if (type !== 'd20hit') a.setCount(count);
            if (a.layout) a.layout();
            await nextFrame();
            overlay.classList.add('is-hud');
            const settled = new Promise(function (resolve) {
                const timer = setTimeout(function () {
                    if (window.__pipDiceSettled === onDone) window.__pipDiceSettled = null;
                    resolve(fallback());
                }, 6000);
                function onDone(payload) {
                    clearTimeout(timer);
                    if (window.__pipDiceSettled === onDone) window.__pipDiceSettled = null;
                    resolve(payload || fallback());
                }
                window.__pipDiceSettled = onDone;
            });
            const rolled = a.roll();
            if (rolled && typeof rolled.then === 'function') {
                const fromApp = await Promise.race([rolled, settled]);
            const payload = fromApp && fromApp.values ? fromApp : fallback();
            setTimeout(function () { window.closeDiceOverlay(); }, 700);
            return payload;
            }
            return await settled;
        } catch (err) {
            console.warn('pipRollDice', err);
            return fallback();
        }
    };

    function teardownDice() {
        const overlay = document.getElementById('dice-overlay');
        if (overlay) {
            overlay.classList.remove('is-open', 'is-hud');
            overlay.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('dice-open');
        if (app && app.destroy) app.destroy();
        app = null;
        loading = null;
        const root = document.getElementById('dice-overlay-root');
        if (root) root.innerHTML = '';
    }

    window.closeDiceOverlay = function (immediate) {
        const overlay = document.getElementById('dice-overlay');
        if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
        }
        if (!overlay || immediate || !overlay.classList.contains('is-open')) {
            teardownDice();
            return;
        }
        overlay.classList.remove('is-hud');
        closeTimer = setTimeout(function () {
            closeTimer = null;
            teardownDice();
        }, 400);
    };

    window.togglePlayerDice = function (ev) {
        if (ev) ev.stopPropagation();
        if (document.getElementById('dice-overlay') && document.getElementById('dice-overlay').classList.contains('is-open')) return;
        if (compact()) {
            const open = document.body.classList.toggle('dice-sheet-open');
            document.body.classList.remove('dice-pop-open');
            if (open && typeof closeSysMenu === 'function') closeSysMenu();
        } else {
            const open = document.body.classList.toggle('dice-pop-open');
            document.body.classList.remove('dice-sheet-open');
            if (open && typeof closeSysMenu === 'function') closeSysMenu();
        }
        syncChrome();
    };
    window.closePlayerDice = function () {
        document.body.classList.remove('dice-pop-open', 'dice-sheet-open');
    };

    document.addEventListener('click', function (e) {
        const typeBtn = e.target.closest('[data-dice-type]');
        const actBtn = e.target.closest('[data-dice]');
        if (typeBtn) {
            e.preventDefault();
            e.stopPropagation();
            prefs.type = typeBtn.getAttribute('data-dice-type');
            if (prefs.type === 'd20hit') prefs.count = 1;
            else if (prefs.count < 1) prefs.count = 2;
            syncChrome();
            return;
        }
        if (actBtn) {
            e.preventDefault();
            e.stopPropagation();
            const act = actBtn.getAttribute('data-dice');
            if (act === 'dec' && prefs.type !== 'd20hit') prefs.count = Math.max(1, prefs.count - 1);
            if (act === 'inc' && prefs.type !== 'd20hit') prefs.count = Math.min(10, prefs.count + 1);
            if (act === 'roll') openDiceOverlay(true);
            syncChrome();
            return;
        }
        if (document.body.classList.contains('dice-pop-open')) {
            if (!e.target.closest('#player-dice-pop, .dice-nav-btn, .header-dice')) closePlayerDice();
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        const overlay = document.getElementById('dice-overlay');
        if (overlay && overlay.classList.contains('is-open')) {
            e.stopPropagation();
            closeDiceOverlay();
            return;
        }
        closePlayerDice();
    }, true);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fillHosts);
    } else fillHosts();
})();
