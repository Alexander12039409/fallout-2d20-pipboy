function blankSessionChar(name) {
    return {
        id: 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        'cs-name': name || 'Новый Персонаж',
        'cs-lvl': 1, 'cs-xp': '', 'cs-origin': 'Выживший',
        'cs-str': 5, 'cs-per': 5, 'cs-end': 5, 'cs-cha': 5, 'cs-int': 5, 'cs-agi': 5, 'cs-luc': 5,
        'cs-hp-cur': 10, 'cs-hp-max': 10,
        inventory: [], perks: [], _session: true
    };
}

function createSessionChar() {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) {
        alert('Сначала создайте или откройте сессию.');
        return;
    }
    const name = prompt('Имя персонажа сессии:', 'Выживший');
    if (name === null) return;
    const char = blankSessionChar(name.trim() || 'Выживший');
    PipSession.state.characters[char.id] = char;
    PipSession.pushCharNow(char).then(() => {
        window.__unlockedCharId = char.id;
        renderChars();
        openChar(char.id);
    }).catch(err => alert(err.message || 'Не удалось создать'));
}

function openCreateSessionChar() {
    const modal = document.getElementById('session-char-modal');
    if (modal) {
        document.getElementById('session-char-name').value = '';
        document.getElementById('session-char-pin').value = '';
        modal.classList.add('active');
        return;
    }
    createSessionChar();
}

function confirmCreateSessionChar() {
    const name = (document.getElementById('session-char-name') && document.getElementById('session-char-name').value.trim()) || 'Выживший';
    const pin = (document.getElementById('session-char-pin') && document.getElementById('session-char-pin').value.trim()) || '';
    const modal = document.getElementById('session-char-modal');
    if (modal) modal.classList.remove('active');
    const char = blankSessionChar(name);
    char.pin = pin;
    PipSession.state.characters[char.id] = Object.assign({}, char);
    PipSession.pushCharNow(char, pin).then(() => {
        try { localStorage.setItem('pipboy_claim_' + PipSession.sessionId, JSON.stringify({ id: char.id, pin: pin })); } catch (e) {}
        window.__unlockedCharId = char.id;
        renderChars();
        openChar(char.id);
    }).catch(err => alert(err.message || 'Не удалось создать'));
}

function applySessionDb(db) {
    if (!db || PIP_MODE === 'master') return;
    if (db.weapons) masterDB.weapons = db.weapons;
    if (db.perks) masterDB.perks = db.perks;
    if (db.items) masterDB.items = db.items;
}

function applySessionMap(map) {
    if (!Array.isArray(map)) return;
    customPOIs = map.slice();
    if (typeof renderAllPOIs === 'function') renderAllPOIs();
}

function setPlayerGateStatus(text, asError) {
    const el = document.getElementById('player-gate-status');
    if (!el) return;
    el.textContent = text;
    el.style.color = asError ? 'var(--pip-red, #fe1414)' : '';
}

function enterPlayerApp() {
    document.body.classList.remove('player-gated', 'player-autolink');
    updateSessionUi();
    renderChars();
}

function wirePipSession() {
    if (typeof PipSession === 'undefined') return;
    PipSession.onHello = function (state) {
        if (state && state.db) applySessionDb(state.db);
        if (state && state.map) applySessionMap(state.map);
        renderChars();
        if (PIP_MODE === 'player' && PipSession.sessionId) enterPlayerApp();
    };
    PipSession.onChar = function (char) {
        renderChars();
        if (activeCharId === char.id) {
            const keep = document.activeElement && document.activeElement.id;
            openChar(char.id);
            if (keep) {
                const el = document.getElementById(keep);
                if (el && el.focus) el.focus();
            }
        }
    };
    PipSession.onCharDelete = function (id) {
        if (activeCharId === id) closeCharEditor();
        renderChars();
    };
    PipSession.onMap = function (map) { applySessionMap(map); };
    PipSession.onDb = function (db) { applySessionDb(db); };
    PipSession.onStatus = function () { updateSessionUi(); };

    const urlInp = document.getElementById('session-url');
    if (urlInp) urlInp.value = PipSession.defaultUrl();

    const q = new URLSearchParams(location.search);
    const sid = (q.get('s') || '').toUpperCase();
    const masterKey = q.get('k') || q.get('t') || '';

    if (PIP_MODE === 'player') {
        const codeInp = document.getElementById('player-join-code');
        if (sid && codeInp) codeInp.value = sid;
        if (sid) {
            document.body.classList.add('player-autolink');
            setPlayerGateStatus('ВХОД В СЕССИЮ ' + sid + '…');
            PipSession.connect(PipSession.defaultUrl(), sid, '').then(() => {
                enterPlayerApp();
            }).catch(() => {
                document.body.classList.remove('player-autolink');
                setPlayerGateStatus('СЕССИЯ НЕ НАЙДЕНА', true);
            });
            return;
        }
        setPlayerGateStatus('ВВЕДИТЕ КОД ИЛИ ОТКРОЙТЕ ССЫЛКУ МАСТЕРА');
        return;
    }
    if (PIP_MODE === 'master') {
        if (sid && masterKey) {
            PipSession.connect(PipSession.defaultUrl(), sid, masterKey).then(() => {
                updateSessionUi();
                renderChars();
            }).catch(err => alert(err.message || 'Не удалось открыть сессию'));
            return;
        }
        PipSession.tryRestore().then(ok => { updateSessionUi(); if (ok) renderChars(); });
    }
}

function updateSessionUi() {
    const live = typeof PipSession !== 'undefined' && !!PipSession.sessionId;
    const link = document.getElementById('session-play-link');
    const code = document.getElementById('session-code-val');
    const box = document.getElementById('session-live-box');
    if (code) code.textContent = live ? PipSession.sessionId : '—';
    if (link) link.value = live ? PipSession.playUrl() : '';
    const masterLink = document.getElementById('session-master-link');
    if (masterLink) masterLink.value = live ? (PipSession.masterUrl() || '') : '';
    if (box) box.hidden = !live;
    const btn = document.getElementById('btn-session');
    if (btn) btn.classList.toggle('is-live', live && PipSession.connected);
    const footer = document.getElementById('session-status-label');
    if (footer && !live) footer.textContent = '';
    const block = document.getElementById('session-block');
    if (block && PIP_MODE !== 'player') block.hidden = !live;
}

async function playerJoinFromLobby() {
    const id = (document.getElementById('player-join-code') && document.getElementById('player-join-code').value.trim()) || '';
    if (!id) {
        setPlayerGateStatus('ВВЕДИТЕ КОД СЕССИИ', true);
        return;
    }
    setPlayerGateStatus('ВХОД…');
    try {
        await PipSession.connect(PipSession.defaultUrl(), id, '');
        const url = new URL(location.href);
        url.searchParams.set('s', PipSession.sessionId);
        history.replaceState({}, '', url.pathname + url.search);
        enterPlayerApp();
    } catch (err) {
        setPlayerGateStatus('СЕССИЯ НЕ НАЙДЕНА', true);
    }
}

async function masterCreateSession() {
    const url = (document.getElementById('session-url') && document.getElementById('session-url').value.trim()) || PipSession.defaultUrl();
    try {
        await PipSession.create(url, { map: customPOIs, db: masterDB });
        updateSessionUi();
        renderChars();
        const play = PipSession.playUrl();
        if (play && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(play).catch(() => {});
        }
        const masterLink = PipSession.masterUrl();
        if (masterLink) {
            const next = new URL(masterLink);
            history.replaceState({}, '', next.pathname + next.search);
        }
    } catch (err) {
        alert('Не удалось создать сессию.\n' + (err.message || err));
    }
}

async function masterJoinSession() {
    const url = (document.getElementById('session-url') && document.getElementById('session-url').value.trim()) || PipSession.defaultUrl();
    const id = prompt('Код сессии:', '');
    if (!id) return;
    const token = prompt('Токен из вашей ссылки мастера (параметр k=):', '') || '';
    try {
        await PipSession.connect(url, id, token);
        updateSessionUi();
        renderChars();
    } catch (err) {
        alert(err.message || 'Не удалось подключиться');
    }
}

function masterLeaveSession() {
    PipSession.disconnect();
    updateSessionUi();
    renderChars();
}

function copyPlayLink() {
    const link = PipSession.playUrl();
    if (!link) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(() => alert('Ссылка скопирована')).catch(() => prompt('Скопируйте ссылку:', link));
    } else prompt('Скопируйте ссылку:', link);
}

async function playerOpenChar(id) {
    const char = sessionCharById(id);
    if (!char) { openChar(id); return; }
    let pin = '';
    try {
        const claim = JSON.parse(localStorage.getItem('pipboy_claim_' + PipSession.sessionId) || 'null');
        if (claim && claim.id === id) pin = claim.pin || '';
    } catch (e) {}
    try {
        await PipSession.unlockChar(id, pin);
        try { localStorage.setItem('pipboy_claim_' + PipSession.sessionId, JSON.stringify({ id: id, pin: pin })); } catch (e) {}
        window.__unlockedCharId = id;
        openChar(id);
    } catch (err) {
        const typed = prompt('PIN персонажа (если задан):', '');
        if (typed === null) return;
        try {
            await PipSession.unlockChar(id, typed);
            try { localStorage.setItem('pipboy_claim_' + PipSession.sessionId, JSON.stringify({ id: id, pin: typed })); } catch (e) {}
            window.__unlockedCharId = id;
            openChar(id);
        } catch (e2) {
            alert('Неверный PIN или нет доступа.');
        }
    }
}

function playerShowPanel(panel) {
    document.body.setAttribute('data-player-panel', panel);
    document.querySelectorAll('.nav-item[data-player]').forEach(n => n.classList.toggle('active', n.getAttribute('data-player') === panel));
    document.querySelectorAll('.nav-item[data-target="view-map"]').forEach(n => n.classList.remove('active'));
    if (panel === 'map') return;
    const views = document.querySelectorAll('.view-section');
    views.forEach(v => v.classList.remove('active'));
    const chars = document.getElementById('view-characters');
    if (chars) chars.classList.add('active');
    if (panel === 'inv') switchCharTab('inv');
    else if (panel === 'notes') switchCharTab('notes');
    else switchCharTab('perks');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wirePipSession);
} else {
    wirePipSession();
}

if (PIP_MODE === 'player') {
    document.querySelectorAll('.nav-item[data-player]').forEach(item => {
        item.addEventListener('click', () => {
            const panel = item.getAttribute('data-player');
            if (panel === 'map') {
                document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                item.classList.add('active');
                document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
                const mapView = document.getElementById('view-map');
                if (mapView) mapView.classList.add('active');
                document.body.setAttribute('data-player-panel', 'map');
                setFooterGeoVisible(true);
                setTimeout(() => { if (typeof map !== 'undefined') map.invalidateSize(); }, 150);
                return;
            }
            setFooterGeoVisible(false);
            playerShowPanel(panel);
        });
    });
    document.querySelectorAll('.nav-item[data-player-lobby]').forEach(item => {
        item.addEventListener('click', () => {
            const panel = item.getAttribute('data-player-lobby');
            document.querySelectorAll('#player-lobby-nav .nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
            if (panel === 'map') {
                const mapView = document.getElementById('view-map');
                if (mapView) mapView.classList.add('active');
                setFooterGeoVisible(true);
                setTimeout(() => { if (typeof map !== 'undefined') map.invalidateSize(); }, 150);
            } else {
                const chars = document.getElementById('view-characters');
                if (chars) chars.classList.add('active');
                setFooterGeoVisible(false);
            }
        });
    });
}
