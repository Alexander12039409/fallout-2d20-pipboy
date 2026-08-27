const PLAYER_HUB_KEY = 'pipboy_player_hub';
let hubExpandedId = '';

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

function loadPlayerHub() {
    try {
        const data = JSON.parse(localStorage.getItem(PLAYER_HUB_KEY) || 'null');
        if (data && Array.isArray(data.sessions)) return data;
    } catch (e) {}
    return { sessions: [] };
}

function savePlayerHub(data) {
    try { localStorage.setItem(PLAYER_HUB_KEY, JSON.stringify(data)); } catch (e) {}
}

function hubPreviewFromChar(char, pin) {
    return {
        id: char.id,
        name: char['cs-name'] || 'Без имени',
        origin: char['cs-origin'] || 'Выживший',
        lvl: char['cs-lvl'] || 1,
        hpCur: char['cs-hp-cur'] || 0,
        hpMax: char['cs-hp-max'] || 10,
        pin: pin || char.pin || ''
    };
}

function hubUpsertSession(sessionId) {
    const id = String(sessionId || '').toUpperCase();
    if (!id) return null;
    const data = loadPlayerHub();
    let rec = data.sessions.find(s => s.id === id);
    if (!rec) {
        rec = { id: id, lastAt: Date.now(), chars: [] };
        data.sessions.unshift(rec);
    } else {
        rec.lastAt = Date.now();
    }
    data.sessions.sort((a, b) => (b.lastAt || 0) - (a.lastAt || 0));
    savePlayerHub(data);
    return rec;
}

function hubRememberChar(char, pin) {
    if (!char || !char.id) return;
    const sid = (typeof PipSession !== 'undefined' && PipSession.sessionId) || char._hubSession || '';
    if (!sid) return;
    const data = loadPlayerHub();
    let rec = data.sessions.find(s => s.id === sid);
    if (!rec) {
        rec = { id: sid, lastAt: Date.now(), chars: [] };
        data.sessions.unshift(rec);
    }
    rec.lastAt = Date.now();
    const preview = hubPreviewFromChar(char, pin);
    const idx = rec.chars.findIndex(c => c.id === char.id);
    if (idx === -1) rec.chars.push(preview);
    else rec.chars[idx] = Object.assign({}, rec.chars[idx], preview);
    savePlayerHub(data);
}

function hubFindChar(sessionId, charId) {
    const rec = loadPlayerHub().sessions.find(s => s.id === sessionId);
    return rec ? rec.chars.find(c => c.id === charId) : null;
}

function hubHasSession(sessionId) {
    return loadPlayerHub().sessions.some(s => s.id === String(sessionId || '').toUpperCase());
}

function migrateOldClaim(sessionId) {
    try {
        const claim = JSON.parse(localStorage.getItem('pipboy_claim_' + sessionId) || 'null');
        if (!claim || !claim.id) return;
        if (hubFindChar(sessionId, claim.id)) return;
        hubRememberChar({
            id: claim.id,
            'cs-name': 'Персонаж',
            'cs-origin': 'Выживший',
            'cs-lvl': 1,
            'cs-hp-cur': 10,
            'cs-hp-max': 10,
            _hubSession: sessionId
        }, claim.pin || '');
    } catch (e) {}
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
    try { if (typeof renderAllPOIs === 'function') renderAllPOIs(); } catch (e) { console.warn('session map', e); }
}

function setPlayerGateStatus(text, asError) {
    const el = document.getElementById('player-gate-status');
    if (!el) return;
    el.textContent = text || '';
    el.style.color = asError ? 'var(--pip-red, #fe1414)' : '';
}

function escapeHub(text) {
    return String(text || '').replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

function renderPlayerHub() {
    const host = document.getElementById('player-hub-sessions');
    if (!host) return;
    const data = loadPlayerHub();
    if (!data.sessions.length) {
        host.innerHTML = '<div class="player-hub-empty">Нет сохранённых сессий.<br>Подключитесь по коду от мастера.</div>';
        return;
    }
    host.innerHTML = data.sessions.map(sess => {
        const open = hubExpandedId === sess.id ? ' open' : '';
        const count = (sess.chars || []).length;
        const cards = (sess.chars || []).map(ch => {
            const max = parseInt(ch.hpMax, 10) || 10;
            const cur = parseInt(ch.hpCur, 10) || 0;
            const pct = Math.max(0, Math.min(100, max ? (cur / max) * 100 : 0));
            return '<div class="hub-char-card" onclick="event.stopPropagation(); playerOpenHubChar(\'' + sess.id + '\',\'' + ch.id + '\')">' +
                '<div class="hub-char-name">' + escapeHub(ch.name || 'Без имени') + '</div>' +
                '<div class="hub-char-info">УР ' + escapeHub(ch.lvl || 1) + ' · ' + escapeHub(ch.origin || 'Выживший') + ' · HP ' + cur + '/' + max + '</div>' +
                '<div class="hub-char-hp"><span style="width:' + pct + '%"></span></div></div>';
        }).join('');
        const addBtn = '<button class="term-btn" type="button" onclick="event.stopPropagation(); playerAddCharToSession(\'' + sess.id + '\')">СОЗДАТЬ ПЕРСОНАЖА</button>';
        return '<div class="hub-session' + open + '" data-sid="' + sess.id + '">' +
            '<div class="hub-session-head" onclick="toggleHubSession(\'' + sess.id + '\')">' +
            '<div><div class="hub-session-code">' + escapeHub(sess.id) + '</div>' +
            '<div class="hub-session-meta">' + count + ' перс.</div></div>' +
            '<div class="hub-session-chevron">▶</div></div>' +
            '<div class="hub-session-body">' + (cards || '<div class="player-hub-empty">В этом столе пока нет вашего персонажа</div>') + addBtn + '</div></div>';
    }).join('');
}

function toggleHubSession(id) {
    hubExpandedId = hubExpandedId === id ? '' : id;
    renderPlayerHub();
}

function togglePlayerJoinForm() {
    const form = document.getElementById('player-gate-form');
    if (!form) return;
    form.hidden = false;
    const inp = document.getElementById('player-join-code');
    if (inp) {
        inp.focus();
        if (inp.scrollIntoView) inp.scrollIntoView({ block: 'nearest' });
    }
}

function showPlayerHub(opts) {
    const keepSession = !!(opts && opts.keepSession);
    if (typeof closeSysMenu === 'function') closeSysMenu();
    else if (typeof closeNavDrawer === 'function') closeNavDrawer();
    window.__unlockedCharId = null;
    document.body.classList.remove('player-playing', 'nav-open', 'sys-open', 'player-gated', 'player-autolink');
    document.body.classList.add('player-hub');
    document.body.setAttribute('data-player-panel', 'main');
    const drawer = document.getElementById('char-drawer');
    if (drawer) drawer.classList.remove('open');
    const vc = document.getElementById('view-characters');
    if (vc) { vc.classList.remove('sheet-open'); vc.classList.add('active'); }
    document.querySelectorAll('.view-section').forEach(v => {
        if (v.id !== 'view-characters') v.classList.remove('active');
    });
    if (typeof setFooterGeoVisible === 'function') setFooterGeoVisible(false);
    if (!keepSession && typeof PipSession !== 'undefined' && PipSession.sessionId) PipSession.disconnect();
    if (!keepSession) setPlayerGateStatus('ТЕРМИНАЛ ИГРОКА');
    renderPlayerHub();
}

function playerExitToHub() {
    if (typeof saveActiveCharLive === 'function' && typeof activeCharId !== 'undefined' && activeCharId) {
        saveActiveCharLive();
        activeCharId = null;
    }
    showPlayerHub({ keepSession: true });
}

function enterPlayerPlay() {
    const drawer = document.getElementById('char-drawer');
    if (!drawer || !drawer.classList.contains('open')) {
        showPlayerHub({ keepSession: true });
        return;
    }
    const already = document.body.classList.contains('player-playing');
    document.body.classList.remove('player-hub', 'player-gated', 'player-autolink', 'nav-open', 'sys-open');
    document.body.classList.add('player-playing');
    if (already) return;
    const chars = document.getElementById('view-characters');
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    if (chars) chars.classList.add('active');
    playerShowPanel('main');
}

async function ensurePlayerSession(sessionId) {
    const id = String(sessionId || '').trim().toUpperCase();
    if (!id) throw new Error('Нет кода сессии');
    if (typeof PipSession !== 'undefined' && PipSession.sessionId === id && PipSession.connected) return;
    await PipSession.connect(PipSession.defaultUrl(), id, '');
}

function setPlayUrl(sessionId) {
    try {
        const url = new URL(location.href);
        url.searchParams.set('s', sessionId);
        history.replaceState({}, '', url.pathname + url.search);
    } catch (e) {}
}

async function enterPlayerSession(sessionId, statusText) {
    const id = String(sessionId || '').trim().toUpperCase();
    if (!id) throw new Error('Нет кода сессии');
    setPlayerGateStatus(statusText || ('Стол ' + id));
    await ensurePlayerSession(id);
    hubUpsertSession(id);
    hubExpandedId = id;
    setPlayUrl(id);
    showPlayerHub({ keepSession: true });
    setPlayerGateStatus('Стол ' + id + ' · создайте персонажа или откройте свой лист');
}

async function playerCreateAndOpenChar(sessionId, name, pin) {
    const sid = String(sessionId || (PipSession && PipSession.sessionId) || '').toUpperCase();
    const char = blankSessionChar(name || 'Выживший');
    if (pin) char.pin = pin;
    PipSession.state.characters[char.id] = Object.assign({}, char);
    await PipSession.pushCharNow(char, pin || '');
    try { localStorage.setItem('pipboy_claim_' + sid, JSON.stringify({ id: char.id, pin: pin || '' })); } catch (e) {}
    hubRememberChar(Object.assign({}, char, { _hubSession: sid }), pin || '');
    window.__unlockedCharId = char.id;
    if (typeof openChar === 'function') openChar(char.id);
}

async function playerJoinFromLobby() {
    const raw = (document.getElementById('player-join-code') && document.getElementById('player-join-code').value.trim()) || '';
    const id = raw.toUpperCase();
    if (!id) {
        setPlayerGateStatus('Введите код стола', true);
        return;
    }
    try {
        await enterPlayerSession(id, 'Подключаюсь к ' + id + '…');
    } catch (err) {
        setPlayerGateStatus((err && err.message) || 'Стол не найден', true);
        showPlayerHub();
    }
}

async function playerAddCharToSession(sessionId) {
    try {
        await ensurePlayerSession(sessionId);
        hubUpsertSession(sessionId);
        setPlayUrl(sessionId);
        openCreateSessionChar();
    } catch (err) {
        setPlayerGateStatus((err && err.message) || 'Не удалось открыть стол', true);
    }
}

function openCreateSessionChar() {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) {
        setPlayerGateStatus('Сначала откройте стол', true);
        return;
    }
    const modal = document.getElementById('session-char-modal');
    if (!modal) {
        playerCreateAndOpenChar(PipSession.sessionId);
        return;
    }
    const name = document.getElementById('session-char-name');
    const pin = document.getElementById('session-char-pin');
    if (name) name.value = '';
    if (pin) pin.value = '';
    modal.classList.add('active');
    if (name) name.focus();
}

function confirmCreateSessionChar() {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) return;
    const name = (document.getElementById('session-char-name') && document.getElementById('session-char-name').value.trim()) || 'Выживший';
    const pin = (document.getElementById('session-char-pin') && document.getElementById('session-char-pin').value.trim()) || '';
    const modal = document.getElementById('session-char-modal');
    if (modal) modal.classList.remove('active');
    setPlayerGateStatus('Создаю персонажа…');
    playerCreateAndOpenChar(PipSession.sessionId, name, pin).catch(err => {
        setPlayerGateStatus((err && err.message) || 'Не удалось создать', true);
        showPlayerHub({ keepSession: true });
    });
}

async function playerOpenHubChar(sessionId, charId) {
    setPlayerGateStatus('ЗАГРУЗКА…');
    try {
        await ensurePlayerSession(sessionId);
        hubUpsertSession(sessionId);
        setPlayUrl(sessionId);
        const live = sessionCharById(charId);
        if (live) hubRememberChar(Object.assign({}, live, { _hubSession: sessionId }), (hubFindChar(sessionId, charId) || {}).pin);
        await playerOpenChar(charId);
    } catch (err) {
        setPlayerGateStatus((err && err.message) || 'СЕССИЯ НЕ НАЙДЕНА', true);
        showPlayerHub({ keepSession: !!(PipSession && PipSession.sessionId) });
    }
}

function enterPlayerApp() {
    showPlayerHub({ keepSession: true });
}

function wirePipSession() {
    if (typeof PipSession === 'undefined') return;
    PipSession.onHello = function (state) {
        if (state && state.db) applySessionDb(state.db);
        if (state && state.map) applySessionMap(state.map);
        if (state && state.characters && PipSession.sessionId) {
            const rec = loadPlayerHub().sessions.find(s => s.id === PipSession.sessionId);
            (rec && rec.chars || []).forEach(ch => {
                const live = state.characters[ch.id];
                if (live) hubRememberChar(Object.assign({}, live, { _hubSession: PipSession.sessionId }), ch.pin);
            });
        }
        if (typeof renderChars === 'function') renderChars();
    };
    PipSession.onChar = function (char) {
        if (char && PipSession.sessionId && hubFindChar(PipSession.sessionId, char.id)) {
            hubRememberChar(Object.assign({}, char, { _hubSession: PipSession.sessionId }));
        }
        if (typeof renderChars === 'function') renderChars();
        if (typeof activeCharId !== 'undefined' && activeCharId === char.id) {
            const keep = document.activeElement && document.activeElement.id;
            openChar(char.id);
            if (keep) {
                const el = document.getElementById(keep);
                if (el && el.focus) el.focus();
            }
        }
    };
    PipSession.onCharDelete = function (id) {
        if (typeof activeCharId !== 'undefined' && activeCharId === id) {
            activeCharId = null;
            showPlayerHub({ keepSession: true });
        }
        if (typeof renderChars === 'function') renderChars();
    };
    PipSession.onMap = function (map) { applySessionMap(map); };
    PipSession.onDb = function (db) { applySessionDb(db); };
    PipSession.onStatus = function () { updateSessionUi(); };

    const urlInp = document.getElementById('session-url');
    if (urlInp) urlInp.value = PipSession.defaultUrl();

    const q = new URLSearchParams(location.search);
    const sid = (q.get('s') || '').toUpperCase();

    if (PIP_MODE === 'player') {
        const codeInp = document.getElementById('player-join-code');
        if (sid && codeInp) codeInp.value = sid;
        if (sid) migrateOldClaim(sid);
        renderPlayerHub();
        if (sid) {
            enterPlayerSession(sid, 'Подключаюсь к ' + sid + '…').catch((err) => {
                setPlayerGateStatus((err && err.message) || 'Стол не найден', true);
                const form2 = document.getElementById('player-gate-form');
                if (form2) form2.hidden = false;
            });
            return;
        }
        setPlayerGateStatus('Введите код стола или откройте ссылку мастера');
        return;
    }
}

function updateSessionUi() {
    const live = typeof PipSession !== 'undefined' && !!PipSession.sessionId;
    const footer = document.getElementById('session-status-label');
    if (footer && !live) footer.textContent = '';
}

let pinModalResolver = null;
function askPinModal() {
    return new Promise((resolve) => {
        const modal = document.getElementById('pin-modal');
        const inp = document.getElementById('pin-modal-input');
        const err = document.getElementById('pin-modal-err');
        if (err) err.textContent = '';
        if (inp) inp.value = '';
        if (!modal) {
            resolve(window.prompt('PIN персонажа (если задан):', ''));
            return;
        }
        pinModalResolver = resolve;
        modal.classList.add('active');
        if (inp) {
            inp.onkeydown = (e) => { if (e.key === 'Enter') submitPinModal(); };
            inp.focus();
        }
    });
}
function cancelPinModal() {
    const modal = document.getElementById('pin-modal');
    if (modal) modal.classList.remove('active');
    if (pinModalResolver) pinModalResolver(null);
    pinModalResolver = null;
}
function submitPinModal() {
    const inp = document.getElementById('pin-modal-input');
    const modal = document.getElementById('pin-modal');
    if (modal) modal.classList.remove('active');
    const val = inp ? inp.value : '';
    if (pinModalResolver) pinModalResolver(val);
    pinModalResolver = null;
}

async function playerOpenChar(id) {
    const char = sessionCharById(id);
    if (!char) { openChar(id); return; }
    const sid = PipSession.sessionId;
    let pin = '';
    const saved = hubFindChar(sid, id);
    if (saved) pin = saved.pin || '';
    if (!pin) {
        try {
            const claim = JSON.parse(localStorage.getItem('pipboy_claim_' + sid) || 'null');
            if (claim && claim.id === id) pin = claim.pin || '';
        } catch (e) {}
    }
    try {
        await PipSession.unlockChar(id, pin);
        try { localStorage.setItem('pipboy_claim_' + sid, JSON.stringify({ id: id, pin: pin })); } catch (e) {}
        window.__unlockedCharId = id;
        openChar(id);
    } catch (err) {
        const typed = await askPinModal();
        if (typed === null) return;
        try {
            await PipSession.unlockChar(id, typed);
            try { localStorage.setItem('pipboy_claim_' + sid, JSON.stringify({ id: id, pin: typed })); } catch (e) {}
            hubRememberChar(Object.assign({}, char, { _hubSession: sid }), typed);
            window.__unlockedCharId = id;
            openChar(id);
        } catch (e2) {
            setPlayerGateStatus('Неверный PIN', true);
            showPlayerHub({ keepSession: true });
        }
    }
}

function playerShowPanel(panel) {
    if (panel === 'exit') {
        playerExitToHub();
        return;
    }
    document.body.setAttribute('data-player-panel', panel);
    document.querySelectorAll('.nav-item[data-player]').forEach(n => n.classList.toggle('active', n.getAttribute('data-player') === panel));
    if (typeof closeSysMenu === 'function') closeSysMenu();
    else if (typeof closeNavDrawer === 'function') closeNavDrawer();
    if (panel === 'map') {
        document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
        const mapView = document.getElementById('view-map');
        if (mapView) mapView.classList.add('active');
        if (typeof setFooterGeoVisible === 'function') setFooterGeoVisible(true);
        setTimeout(() => { if (typeof map !== 'undefined' && map && map.invalidateSize) map.invalidateSize(); }, 150);
        return;
    }
    if (typeof setFooterGeoVisible === 'function') setFooterGeoVisible(false);
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
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
            playerShowPanel(item.getAttribute('data-player'));
        });
    });
    renderPlayerHub();
}
