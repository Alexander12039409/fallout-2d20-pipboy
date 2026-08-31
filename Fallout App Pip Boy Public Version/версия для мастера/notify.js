(function (global) {
    var HIDE_MS = 3000;
    var hostEl = null;
    var current = null;
    var hideTimer = null;
    var confirmResolver = null;
    var layoutBound = false;

    function clearHideTimer() {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
    }

    function layoutHost() {
        var el = hostEl || document.getElementById('pip-push-host');
        if (!el) return;
        var crt = document.querySelector('.crt-monitor');
        if (!crt) {
            el.style.left = '0';
            el.style.top = '0';
            el.style.width = '100%';
            return;
        }
        var r = crt.getBoundingClientRect();
        el.style.left = r.left + 'px';
        el.style.top = r.top + 'px';
        el.style.width = r.width + 'px';
    }

    function bindLayout() {
        if (layoutBound) return;
        layoutBound = true;
        global.addEventListener('resize', layoutHost);
        global.addEventListener('orientationchange', layoutHost);
        if (global.visualViewport) {
            global.visualViewport.addEventListener('resize', layoutHost);
            global.visualViewport.addEventListener('scroll', layoutHost);
        }
    }

    function ensureHost() {
        if (hostEl && hostEl.parentNode) {
            layoutHost();
            return hostEl;
        }
        var el = document.getElementById('pip-push-host');
        if (!el) {
            el = document.createElement('div');
            el.id = 'pip-push-host';
            el.className = 'pip-push-host';
            el.setAttribute('aria-live', 'polite');
            (document.body || document.documentElement).appendChild(el);
        }
        hostEl = el;
        bindLayout();
        layoutHost();
        return el;
    }

    function settleConfirm(ok) {
        var resolve = confirmResolver;
        confirmResolver = null;
        if (resolve) resolve(!!ok);
    }

    function removeCard(card, animated) {
        if (!card) return;
        if (!animated) {
            if (card.parentNode) card.parentNode.removeChild(card);
            return;
        }
        card.classList.add('is-out');
        setTimeout(function () {
            if (card.parentNode) card.parentNode.removeChild(card);
        }, 200);
    }

    function tearDown(animated) {
        clearHideTimer();
        var card = current;
        current = null;
        removeCard(card, animated);
    }

    function dismiss(ok, animated) {
        settleConfirm(ok);
        tearDown(animated !== false);
    }

    function bindSwipe(card) {
        var startX = 0;
        var startY = 0;
        var dx = 0;
        var dy = 0;
        var tracking = false;

        function fromControl(t) {
            return t && t.closest && (t.closest('.pip-push-x') || t.closest('.pip-push-actions'));
        }

        card.addEventListener('pointerdown', function (e) {
            if (e.button && e.button !== 0) return;
            if (fromControl(e.target)) return;
            tracking = true;
            dx = 0;
            dy = 0;
            startX = e.clientX;
            startY = e.clientY;
            card.classList.add('is-dragging');
            try { card.setPointerCapture(e.pointerId); } catch (err) {}
        });

        card.addEventListener('pointermove', function (e) {
            if (!tracking) return;
            dx = e.clientX - startX;
            dy = e.clientY - startY;
            card.style.transform = 'translate(' + dx + 'px,' + Math.min(0, dy) + 'px)';
            var dist = Math.max(Math.abs(dx), Math.abs(Math.min(0, dy)));
            card.style.opacity = String(Math.max(0.25, 1 - dist / 160));
        });

        function finish() {
            if (!tracking) return;
            tracking = false;
            card.classList.remove('is-dragging');
            if (Math.abs(dx) > 64 || dy < -48) {
                settleConfirm(false);
                clearHideTimer();
                current = null;
                var flyX = dx === 0 ? 0 : (dx > 0 ? 160 : -160);
                var flyY = dy < -20 ? -90 : 0;
                card.style.transition = 'transform 0.18s ease, opacity 0.18s ease';
                card.style.transform = 'translate(' + flyX + 'px,' + flyY + 'px)';
                card.style.opacity = '0';
                setTimeout(function () {
                    if (card.parentNode) card.parentNode.removeChild(card);
                }, 180);
                return;
            }
            card.style.transform = '';
            card.style.opacity = '';
        }

        card.addEventListener('pointerup', finish);
        card.addEventListener('pointercancel', finish);
    }

    function showCard(opts) {
        settleConfirm(false);
        tearDown(false);
        if (opts.resolver) confirmResolver = opts.resolver;
        ensureHost();
        while (hostEl.firstChild) hostEl.removeChild(hostEl.firstChild);

        var kind = opts.kind || 'info';
        var card = document.createElement('div');
        card.className = 'pip-push pip-push-' + kind + (opts.confirm ? ' pip-push-confirm' : '');
        card.setAttribute('role', opts.confirm ? 'alertdialog' : 'status');

        var body = document.createElement('div');
        body.className = 'pip-push-body';

        var title = document.createElement('div');
        title.className = 'pip-push-title';
        title.textContent = opts.title || 'Уведомление';
        body.appendChild(title);

        if (opts.subtitle) {
            var sub = document.createElement('div');
            sub.className = 'pip-push-sub';
            sub.textContent = opts.subtitle;
            body.appendChild(sub);
        }
        card.appendChild(body);

        var close = document.createElement('button');
        close.type = 'button';
        close.className = 'pip-push-x';
        close.setAttribute('aria-label', 'Закрыть');
        close.textContent = 'X';
        close.addEventListener('click', function (e) {
            e.stopPropagation();
            dismiss(false, true);
        });
        card.appendChild(close);

        if (opts.confirm) {
            var actions = document.createElement('div');
            actions.className = 'pip-push-actions';

            var no = document.createElement('button');
            no.type = 'button';
            no.className = 'term-btn danger';
            no.textContent = opts.cancelLabel || 'НЕТ';
            no.addEventListener('click', function (e) {
                e.stopPropagation();
                dismiss(false, true);
            });

            var yes = document.createElement('button');
            yes.type = 'button';
            yes.className = 'term-btn';
            yes.textContent = opts.okLabel || 'ДА';
            yes.addEventListener('click', function (e) {
                e.stopPropagation();
                settleConfirm(true);
                tearDown(true);
            });

            actions.appendChild(no);
            actions.appendChild(yes);
            card.appendChild(actions);
        }

        hostEl.appendChild(card);
        current = card;
        bindSwipe(card);
        layoutHost();
        void card.offsetWidth;
        card.classList.add('is-in');

        if (!opts.confirm) {
            hideTimer = setTimeout(function () { dismiss(false, true); }, opts.ms || HIDE_MS);
        } else {
            setTimeout(function () {
                try { close.focus(); } catch (err) {}
            }, 30);
        }
    }

    function pipNotify(title, subtitle, opts) {
        opts = opts || {};
        showCard({
            title: title || 'Уведомление',
            subtitle: subtitle || '',
            kind: opts.kind || 'info',
            ms: opts.ms || HIDE_MS
        });
    }

    function pipConfirm(title, subtitle, opts) {
        opts = opts || {};
        return new Promise(function (resolve) {
            showCard({
                title: title || 'Подтвердите',
                subtitle: subtitle || '',
                kind: opts.kind || 'warn',
                confirm: true,
                okLabel: opts.okLabel,
                cancelLabel: opts.cancelLabel,
                resolver: resolve
            });
        });
    }

    function onKey(e) {
        if (!current) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            dismiss(false, true);
        }
    }

    function patchTelegram() {
        var tg = global.Telegram && global.Telegram.WebApp;
        if (!tg) return;
        tg.showAlert = function (message, cb) {
            pipNotify('Внимание', String(message || ''), { kind: 'warn' });
            if (typeof cb === 'function') setTimeout(cb, 0);
        };
        tg.showConfirm = function (message, cb) {
            pipConfirm('Подтвердите', String(message || '')).then(function (ok) {
                if (typeof cb === 'function') cb(!!ok);
            });
        };
    }

    global.pipNotify = pipNotify;
    global.pipPush = pipNotify;
    global.pipConfirm = pipConfirm;
    global.alert = function (msg) {
        pipNotify('Внимание', String(msg == null ? '' : msg), { kind: 'warn' });
    };

    document.addEventListener('keydown', onKey);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            ensureHost();
            patchTelegram();
        });
    } else {
        ensureHost();
        patchTelegram();
    }
    setTimeout(patchTelegram, 0);
})(window);
