const PLAYER_HUB_KEY = 'pipboy_player_hub';
const LAST_SESSION_KEY = 'pipboy_last_session';
let hubExpandedId = '';

function blankSessionChar(name) {
    return {
        id: 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        'cs-name': name || 'Новый Персонаж',
        'cs-lvl': 1, 'cs-xp': '', 'cs-origin': 'Выживший',
        'cs-str': 5, 'cs-per': 5, 'cs-end': 5, 'cs-cha': 5, 'cs-int': 5, 'cs-agi': 5, 'cs-luc': 5,
        'cs-hp-cur': 10, 'cs-hp-max': 10,
        'cs-luck-cur': 5, caps: 0,
        inventory: [], perks: [], notes: [], taggedSkills: [], survivorTraits: [], _session: true
    };
}

function flushPlayerCloud() {
    try { if (typeof window.pipFlushTelegramCloud === 'function') window.pipFlushTelegramCloud(); } catch (e) {}
}

function rememberLastSession(sessionId) {
    const id = String(sessionId || '').toUpperCase();
    if (!id) return;
    try { localStorage.setItem(LAST_SESSION_KEY, JSON.stringify({ id: id, at: Date.now() })); } catch (e) {}
    flushPlayerCloud();
}

function forgetLastSession(sessionId) {
    const want = String(sessionId || '').toUpperCase();
    try {
        const rec = JSON.parse(localStorage.getItem(LAST_SESSION_KEY) || 'null');
        if (!want || (rec && String(rec.id || '').toUpperCase() === want)) {
            localStorage.removeItem(LAST_SESSION_KEY);
        }
    } catch (e) {
        try { localStorage.removeItem(LAST_SESSION_KEY); } catch (e2) {}
    }
    try {
        const saved = JSON.parse(localStorage.getItem('pipboy_session_player') || 'null');
        if (saved && (!want || String(saved.sessionId || '').toUpperCase() === want)) {
            localStorage.removeItem('pipboy_session_player');
        }
    } catch (e) {}
    const data = loadPlayerHub();
    if (!want || data.lastSessionId === want) {
        data.lastSessionId = '';
        savePlayerHub(data);
    } else {
        flushPlayerCloud();
    }
}

function readLastSessionId() {
    try {
        const rec = JSON.parse(localStorage.getItem(LAST_SESSION_KEY) || 'null');
        if (rec && rec.id) return String(rec.id).toUpperCase();
    } catch (e) {}
    try {
        const saved = JSON.parse(localStorage.getItem('pipboy_session_player') || 'null');
        if (saved && saved.sessionId) return String(saved.sessionId).toUpperCase();
    } catch (e) {}
    const data = loadPlayerHub();
    if (data.lastSessionId) return String(data.lastSessionId).toUpperCase();
    return '';
}

function isHubSessionChar(charId) {
    const id = String(charId || '');
    if (!id) return false;
    return loadPlayerHub().sessions.some(s => (s.chars || []).some(c => c && c.id === id));
}

function pruneHubInPlace(data) {
    if (!data) return false;
    const ids = Object.create(null);
    (data.sessions || []).forEach(s => (s.chars || []).forEach(c => { if (c && c.id) ids[c.id] = true; }));
    const before = (data.vault || []).length;
    data.vault = (data.vault || []).filter(c => c && c.id && !ids[c.id]);
    return data.vault.length !== before;
}

function loadPlayerHub() {
    try {
        const data = JSON.parse(localStorage.getItem(PLAYER_HUB_KEY) || 'null');
        if (data && Array.isArray(data.sessions)) {
            if (!Array.isArray(data.vault)) data.vault = [];
            if (pruneHubInPlace(data)) {
                try { localStorage.setItem(PLAYER_HUB_KEY, JSON.stringify(data)); } catch (e) {}
                flushPlayerCloud();
            }
            return data;
        }
    } catch (e) {}
    return { sessions: [], vault: [] };
}

function savePlayerHub(data) {
    if (!data) return;
    data.savedAt = Date.now();
    try { localStorage.setItem(PLAYER_HUB_KEY, JSON.stringify(data)); } catch (e) {}
    flushPlayerCloud();
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
    data.lastSessionId = id;
    data.sessions.sort((a, b) => (b.lastAt || 0) - (a.lastAt || 0));
    savePlayerHub(data);
    rememberLastSession(id);
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
    data.lastSessionId = sid;
    const preview = hubPreviewFromChar(char, pin);
    const idx = rec.chars.findIndex(c => c.id === char.id);
    if (idx === -1) rec.chars.push(preview);
    else rec.chars[idx] = Object.assign({}, rec.chars[idx], preview);
    savePlayerHub(data);
    rememberLastSession(sid);
}

function hubFindChar(sessionId, charId) {
    const rec = loadPlayerHub().sessions.find(s => s.id === sessionId);
    return rec ? rec.chars.find(c => c.id === charId) : null;
}

function hubRemoveChar(sessionId, charId) {
    const data = loadPlayerHub();
    const rec = data.sessions.find(s => s.id === String(sessionId || '').toUpperCase());
    if (!rec) return;
    rec.chars = (rec.chars || []).filter(c => c.id !== charId);
    savePlayerHub(data);
}

function hubRemoveSession(sessionId) {
    const id = String(sessionId || '').toUpperCase();
    const data = loadPlayerHub();
    data.sessions = data.sessions.filter(s => s.id !== id);
    if (data.lastSessionId === id) data.lastSessionId = (data.sessions[0] && data.sessions[0].id) || '';
    savePlayerHub(data);
    forgetLastSession(id);
    try { localStorage.removeItem('pipboy_claim_' + id); } catch (e) {}
    if (hubExpandedId === id) hubExpandedId = '';
}

function vaultList() {
    return loadPlayerHub().vault || [];
}
let vaultMem = [];
function vaultFind(id) {
    if (!id) return null;
    const cached = vaultMem.find(c => c && c.id === id);
    if (cached) return cached;
    const fromDisk = (loadPlayerHub().vault || []).find(c => c && c.id === id) || null;
    if (fromDisk) vaultMem.push(fromDisk);
    return fromDisk;
}
function vaultUpsert(char) {
    if (!char || !char.id) return;
    if (char._session || isHubSessionChar(char.id)) return;
    const data = loadPlayerHub();
    if (!Array.isArray(data.vault)) data.vault = [];
    const stored = JSON.parse(JSON.stringify(char));
    stored._vault = true;
    delete stored._session;
    char._vault = true;
    delete char._session;
    const idx = data.vault.findIndex(c => c.id === char.id);
    if (idx === -1) data.vault.unshift(stored);
    else data.vault[idx] = Object.assign({}, data.vault[idx], stored);
    savePlayerHub(data);
    const memIdx = vaultMem.findIndex(c => c && c.id === char.id);
    if (memIdx === -1) vaultMem.unshift(char);
    else vaultMem[memIdx] = char;
}
function vaultRemove(id) {
    const data = loadPlayerHub();
    data.vault = (data.vault || []).filter(c => c.id !== id);
    savePlayerHub(data);
    vaultMem = vaultMem.filter(c => c && c.id !== id);
}

function playerCreateVaultChar() {
    if (typeof openChargenChoice === 'function') {
        openChargenChoice('player-vault');
        return;
    }
    playerCreateVaultCharImmediate();
}
function playerCreateVaultCharImmediate() {
    const char = blankSessionChar('Новый Персонаж');
    delete char._session;
    char._vault = true;
    vaultUpsert(char);
    window.__unlockedCharId = char.id;
    renderPlayerHub();
    if (typeof openChar === 'function') openChar(char.id);
}
function playerOpenVaultChar(charId) {
    window.__unlockedCharId = charId;
    if (typeof openChar === 'function') openChar(charId);
}
function playerDeleteVaultChar(charId) {
    pipConfirm('Удалить персонажа?', 'Он не на столе мастера. Лист будет стёрт навсегда.').then(function (ok) {
        if (!ok) return;
        if (typeof activeCharId !== 'undefined' && activeCharId === charId) {
            activeCharId = null;
            const drawer = document.getElementById('char-drawer');
            if (drawer) drawer.classList.remove('open');
            const vc = document.getElementById('view-characters');
            if (vc) vc.classList.remove('sheet-open');
            showPlayerHub({ keepSession: true });
        }
        vaultRemove(charId);
        renderPlayerHub();
    });
}

let attachCharId = '';
function openAttachModal(charId) {
    attachCharId = charId;
    const list = document.getElementById('attach-session-list');
    const status = document.getElementById('attach-modal-status');
    if (status) status.textContent = '';
    const sessions = loadPlayerHub().sessions || [];
    if (list) {
        if (!sessions.length) {
            list.innerHTML = '<div class="player-hub-empty">Нет столов в списке. Введите код ниже.</div>';
        } else {
            list.innerHTML = sessions.map(s => {
                const n = (s.chars || []).length;
                return '<button type="button" class="term-btn attach-session-btn" onclick="playerAttachVaultToSession(\'' + attachCharId + '\',\'' + s.id + '\')">' +
                    escapeHub(s.id) + ' · ' + n + ' перс.</button>';
            }).join('');
        }
    }
    const code = document.getElementById('attach-join-code');
    if (code) {
        code.value = '';
        code.onkeydown = function (e) {
            if (e.key === 'Enter') { e.preventDefault(); playerAttachVaultFromCode(); }
        };
        code.focus();
    }
    const modal = document.getElementById('attach-modal');
    if (modal) modal.classList.add('active');
    if (code) code.focus();
}
function closeAttachModal() {
    const modal = document.getElementById('attach-modal');
    if (modal) modal.classList.remove('active');
    attachCharId = '';
}
function setAttachStatus(text, asError) {
    const el = document.getElementById('attach-modal-status');
    if (!el) return;
    el.textContent = text || '';
    el.style.color = asError ? 'var(--pip-red, #fe1414)' : '';
}
async function playerAttachVaultFromCode() {
    const raw = (document.getElementById('attach-join-code') && document.getElementById('attach-join-code').value.trim()) || '';
    const id = raw.toUpperCase();
    if (!id) {
        setAttachStatus('Введите код стола', true);
        return;
    }
    await playerAttachVaultToSession(attachCharId, id);
}
async function playerAttachVaultToSession(charId, sessionId) {
    const id = String(sessionId || '').trim().toUpperCase();
    const src = vaultFind(charId);
    if (!src || !id) return;
    setAttachStatus('Добавляю на стол ' + id + '…');
    try {
        await ensurePlayerSession(id);
        hubUpsertSession(id);
        const copy = JSON.parse(JSON.stringify(src));
        copy.id = 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
        copy._session = true;
        delete copy._vault;
        const pin = copy.pin || '';
        if (!PipSession.state.characters) PipSession.state.characters = {};
        PipSession.state.characters[copy.id] = copy;
        await PipSession.pushCharNow(copy, pin);
        hubRememberChar(Object.assign({}, copy, { _hubSession: id }), pin);
        closeAttachModal();
        hubExpandedId = id;
        setPlayUrl(id);
        setPlayerGateStatus('Персонаж добавлен на стол ' + id);
        renderPlayerHub();
    } catch (err) {
        setAttachStatus((err && err.message) || 'Не удалось добавить на стол', true);
        setPlayerGateStatus((err && err.message) || 'Стол не найден', true);
    }
}

async function playerDeleteHubChar(sessionId, charId) {
    const ok = await pipConfirm('Удалить персонажа?', 'Лист будет стёрт навсегда.');
    if (!ok) return;
    const pin = ((hubFindChar(sessionId, charId) || {}).pin) || '';
    try {
        await ensurePlayerSession(sessionId);
        await PipSession.deleteChar(charId, pin);
        if (PipSession.state && PipSession.state.characters) delete PipSession.state.characters[charId];
    } catch (err) {
        if (!(err && err.status === 404)) {
            setPlayerGateStatus((err && err.message) || 'Не удалось удалить персонажа', true);
        }
    }
    hubRemoveChar(sessionId, charId);
    if (typeof activeCharId !== 'undefined' && activeCharId === charId) {
        activeCharId = null;
        const drawer = document.getElementById('char-drawer');
        if (drawer) drawer.classList.remove('open');
    }
    renderPlayerHub();
}

async function playerDeleteHubSession(sessionId) {
    const id = String(sessionId || '').toUpperCase();
    if (!id) return;
    const ok = await pipConfirm('Убрать стол ' + id + '?', 'Персонажи в вашем списке тоже будут удалены. Сам стол останется, пока мастер его не удалит.');
    if (!ok) return;
    const rec = loadPlayerHub().sessions.find(s => s.id === id);
    const chars = ((rec && rec.chars) || []).slice();
    try {
        await ensurePlayerSession(id);
        for (let i = 0; i < chars.length; i++) {
            try { await PipSession.deleteChar(chars[i].id, chars[i].pin || ''); } catch (e) {}
        }
    } catch (e) {}
    if (typeof PipSession !== 'undefined' && PipSession.sessionId === id) {
        PipSession.disconnect();
        try {
            const url = new URL(location.href);
            url.searchParams.delete('s');
            history.replaceState({}, '', url.pathname + url.search);
        } catch (e) {}
    }
    hubRemoveSession(id);
    setPlayerGateStatus('Стол убран из списка');
    renderPlayerHub();
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
    mergeIncomingCatalog(db);
}

function mergeIncomingCatalog(db) {
    if (!masterDB.weapons) masterDB.weapons = {};
    if (!Array.isArray(masterDB.items)) masterDB.items = [];
    if (!Array.isArray(masterDB.perks)) masterDB.perks = [];
    if (typeof weaponDB !== 'undefined' && weaponDB.weapons) {
        Object.keys(weaponDB.weapons).forEach(name => {
            if (!masterDB.weapons[name]) {
                masterDB.weapons[name] = weaponDB.weapons[name];
                return;
            }
            const src = weaponDB.weapons[name];
            const dst = masterDB.weapons[name];
            if (!src || !dst || !src.slots || !dst.slots) return;
            Object.keys(src.slots).forEach(slot => {
                (src.slots[slot] || []).forEach(m => {
                    if (!m || !m.name || m.prefix == null) return;
                    const existing = dst.slots[slot] && dst.slots[slot].find(x => x && x.name === m.name);
                    if (existing && existing.prefix !== m.prefix) existing.prefix = m.prefix;
                });
            });
        });
    }
    if (typeof dbItems !== 'undefined' && Array.isArray(dbItems)) {
        const have = new Set(masterDB.items.map(i => i && i.name));
        dbItems.forEach(it => {
            if (it && it.name && !have.has(it.name)) {
                masterDB.items.push(it);
                have.add(it.name);
            }
        });
    }
    if (typeof dbPerks !== 'undefined' && Array.isArray(dbPerks)) {
        const haveP = new Set(masterDB.perks.map(p => p && p.name));
        dbPerks.forEach(p => {
            if (p && p.name && !haveP.has(p.name)) {
                masterDB.perks.push(p);
                haveP.add(p.name);
            }
        });
    }
    if (db && db.weapons) {
        Object.keys(db.weapons).forEach(name => {
            if (!masterDB.weapons[name]) masterDB.weapons[name] = db.weapons[name];
        });
    }
    if (db && Array.isArray(db.items)) {
        const have = new Set(masterDB.items.map(i => i && i.name));
        db.items.forEach(it => {
            if (it && it.name && !have.has(it.name)) {
                masterDB.items.push(it);
                have.add(it.name);
            }
        });
    }
    if (db && Array.isArray(db.perks)) {
        const haveP = new Set(masterDB.perks.map(p => p && p.name));
        db.perks.forEach(p => {
            if (p && p.name && !haveP.has(p.name)) {
                masterDB.perks.push(p);
                haveP.add(p.name);
            }
        });
    }
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
    if (host) {
        const data = loadPlayerHub();
        if (!data.sessions.length) {
            host.innerHTML = '<div class="player-hub-empty">Нет сохранённых сессий.<br>Подключитесь по коду от мастера.</div>';
        } else {
            host.innerHTML = data.sessions.map(sess => {
                const open = hubExpandedId === sess.id ? ' open' : '';
                const count = (sess.chars || []).length;
                const cards = (sess.chars || []).map(ch => {
                    const max = parseInt(ch.hpMax, 10) || 10;
                    const cur = parseInt(ch.hpCur, 10) || 0;
                    const pct = Math.max(0, Math.min(100, max ? (cur / max) * 100 : 0));
                    return '<div class="hub-char-card" onclick="event.stopPropagation(); playerOpenHubChar(\'' + sess.id + '\',\'' + ch.id + '\')">' +
                        '<button type="button" class="hub-del hub-char-del" onclick="event.stopPropagation(); playerDeleteHubChar(\'' + sess.id + '\',\'' + ch.id + '\')">X</button>' +
                        '<div class="hub-char-name">' + escapeHub(ch.name || 'Без имени') + '</div>' +
                        '<div class="hub-char-info">УР ' + escapeHub(ch.lvl || 1) + ' · ' + escapeHub(ch.origin || 'Выживший') + ' · HP ' + cur + '/' + max + '</div>' +
                        '<div class="hub-char-hp"><span style="width:' + pct + '%"></span></div></div>';
                }).join('');
                const addBtn = '<button class="term-btn" type="button" onclick="event.stopPropagation(); playerAddCharToSession(\'' + sess.id + '\')">СОЗДАТЬ ПЕРСОНАЖА</button>';
                const delSess = '<button class="term-btn danger" type="button" onclick="event.stopPropagation(); playerDeleteHubSession(\'' + sess.id + '\')">УДАЛИТЬ СТОЛ ИЗ СПИСКА</button>';
                return '<div class="hub-session' + open + '" data-sid="' + sess.id + '">' +
                    '<div class="hub-session-head" onclick="toggleHubSession(\'' + sess.id + '\')">' +
                    '<div><div class="hub-session-code">' + escapeHub(sess.id) + '</div>' +
                    '<div class="hub-session-meta">' + count + ' перс.</div></div>' +
                    '<div class="hub-session-tools"><span class="hub-session-chevron">▶</span></div></div>' +
                    '<div class="hub-session-body">' + (cards || '<div class="player-hub-empty">В этом столе пока нет вашего персонажа</div>') + addBtn + delSess + '</div></div>';
            }).join('');
        }
    }
    renderPlayerVault();
}

function renderPlayerVault() {
    const host = document.getElementById('player-hub-vault');
    if (!host) return;
    const vault = vaultList();
    const cards = vault.map(ch => {
        const max = parseInt(ch['cs-hp-max'], 10) || 10;
        const cur = parseInt(ch['cs-hp-cur'], 10) || 0;
        const pct = Math.max(0, Math.min(100, max ? (cur / max) * 100 : 0));
        return '<div class="hub-char-card vault-card" onclick="playerOpenVaultChar(\'' + ch.id + '\')">' +
            '<button type="button" class="hub-del hub-char-attach" title="Добавить в стол" aria-label="Добавить в стол" onclick="event.stopPropagation(); openAttachModal(\'' + ch.id + '\')">СТОЛ</button>' +
            '<button type="button" class="hub-del hub-char-del" onclick="event.stopPropagation(); playerDeleteVaultChar(\'' + ch.id + '\')">X</button>' +
            '<div class="hub-char-name">' + escapeHub(ch['cs-name'] || 'Без имени') + '</div>' +
            '<div class="hub-char-info">УР ' + escapeHub(ch['cs-lvl'] || 1) + ' · ' + escapeHub(ch['cs-origin'] || 'Выживший') + ' · HP ' + cur + '/' + max + '</div>' +
            '<div class="hub-char-hp"><span style="width:' + pct + '%"></span></div></div>';
    }).join('');
    host.innerHTML = (cards || '<div class="player-hub-empty">Нет персонажей вне стола.<br>Создайте лист, даже если мастер не ведёт стол в приложении.</div>') +
        '<button class="term-btn" type="button" onclick="playerCreateVaultChar()">СОЗДАТЬ ПЕРСОНАЖА</button>';
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
    if (typeof closeDiceOverlay === 'function') closeDiceOverlay(true);
    if (typeof closePlayerDice === 'function') closePlayerDice();
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

async function playerCreateAndOpenChar(sessionId, name, pin, preset) {
    const sid = String(sessionId || (PipSession && PipSession.sessionId) || '').toUpperCase();
    let char;
    if (preset && typeof preset === 'object') {
        char = Object.assign({}, preset);
        char['cs-name'] = name || char['cs-name'] || 'Выживший';
        if (pin) char.pin = pin;
        char._session = true;
        delete char._vault;
        if (!char.id) char.id = 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    } else {
        char = blankSessionChar(name || 'Выживший');
        if (pin) char.pin = pin;
    }
    PipSession.state.characters[char.id] = Object.assign({}, char);
    await PipSession.pushCharNow(char, pin || char.pin || '');
    try { localStorage.setItem('pipboy_claim_' + sid, JSON.stringify({ id: char.id, pin: pin || char.pin || '' })); } catch (e) {}
    hubRememberChar(Object.assign({}, char, { _hubSession: sid }), pin || char.pin || '');
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
    if (typeof openChargenChoice === 'function') {
        openChargenChoice('session');
        return;
    }
    openCreateSessionCharForm();
}

function openCreateSessionCharForm() {
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
        if (typeof activeCharId !== 'undefined' && activeCharId && state && state.characters && state.characters[activeCharId] && typeof applyRemoteChar === 'function') {
            applyRemoteChar(state.characters[activeCharId]);
        }
    };
    PipSession.onChar = function (char) {
        if (char && PipSession.sessionId && hubFindChar(PipSession.sessionId, char.id)) {
            hubRememberChar(Object.assign({}, char, { _hubSession: PipSession.sessionId }));
        }
        if (typeof applyRemoteChar === 'function') applyRemoteChar(char);
        else if (typeof renderChars === 'function') renderChars();
    };
    PipSession.onCharDelete = function (id) {
        if (PipSession.sessionId) hubRemoveChar(PipSession.sessionId, id);
        if (typeof activeCharId !== 'undefined' && activeCharId === id) {
            activeCharId = null;
            showPlayerHub({ keepSession: true });
        }
        if (typeof renderChars === 'function') renderChars();
        renderPlayerHub();
    };
    PipSession.onMap = function (map) { applySessionMap(map); };
    PipSession.onDb = function (db) { applySessionDb(db); };
    PipSession.onStatus = function () { updateSessionUi(); };
    PipSession.onSessionEnd = function (sid) {
        if (sid) hubRemoveSession(sid);
        setPlayerGateStatus('Стол закрыт мастером', true);
        showPlayerHub();
    };

    const urlInp = document.getElementById('session-url');
    if (urlInp) urlInp.value = PipSession.defaultUrl();

    const q = new URLSearchParams(location.search);
    const sid = ((typeof pipTelegramStartCode === 'function' && pipTelegramStartCode()) || q.get('s') || '').toUpperCase();

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
        const last = readLastSessionId();
        if (last) {
            migrateOldClaim(last);
            if (codeInp) codeInp.value = last;
            enterPlayerSession(last, 'Возвращаюсь к столу ' + last + '…').catch((err) => {
                forgetLastSession(last);
                if (err && err.status === 404 && typeof hubRemoveSession === 'function') hubRemoveSession(last);
                setPlayerGateStatus((err && err.message) || 'Последний стол не найден. Введите код.', true);
                const form2 = document.getElementById('player-gate-form');
                if (form2) form2.hidden = false;
                renderPlayerHub();
            });
            return;
        }
        setPlayerGateStatus('Введите код стола или создайте персонажа без стола');
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
            pipNotify('Нет доступа', 'Неверный PIN или нет доступа.', { kind: 'error' });
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
