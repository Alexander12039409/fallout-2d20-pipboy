// Клиент живой сессии: REST + Server-Sent Events.
// Мастер и игроки подключаются к одному pipboy-sync.

const PipSession = (function () {
    const api = {};
    api.role = (typeof document !== 'undefined' && document.body && document.body.getAttribute('data-mode') === 'player')
        ? 'player' : 'master';
    api.connected = false;
    api.sessionId = '';
    api.masterToken = '';
    api.syncUrl = '';
    api.clientId = 'c' + Math.random().toString(36).slice(2, 10);
    api.state = { characters: {}, map: [], db: null, masterNotes: [], tableAP: { pool: 0, gm: 0, max: 6, sceneAt: 0 } };
    api.onChar = null;
    api.onMap = null;
    api.onDb = null;
    api.onNotes = null;
    api.onAp = null;
    api.onSessionEnd = null;
    api.onHello = null;
    api.onStatus = null;

    let es = null;
    let charTimer = null;
    let mapTimer = null;
    let pendingChar = null;
    let pendingMap = null;

    function originUrl() {
        if (typeof window !== 'undefined' && window.PIPBOY_SYNC) return String(window.PIPBOY_SYNC).replace(/\/$/, '');
        if (typeof location !== 'undefined' && (location.protocol === 'http:' || location.protocol === 'https:')) {
            return location.origin;
        }
        try {
            const saved = localStorage.getItem('pipboy_sync_url');
            if (saved) return saved.replace(/\/$/, '');
        } catch (e) {}
        return 'http://localhost:8787';
    }

    function setStatus(text, live) {
        api.connected = !!live;
        if (typeof api.onStatus === 'function') api.onStatus(text, !!live);
        const el = document.getElementById('session-status-label');
        if (el) {
            el.textContent = text;
            el.classList.toggle('is-live', !!live);
        }
    }

    function headers(extra) {
        const h = { 'Content-Type': 'application/json', 'X-Client-Id': api.clientId };
        if (api.masterToken) h['X-Master-Token'] = api.masterToken;
        return Object.assign(h, extra || {});
    }

    async function req(method, path, body) {
        const res = await fetch(api.syncUrl + path, {
            method,
            headers: headers(),
            body: body ? JSON.stringify(body) : undefined
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            const err = new Error(data.error || ('HTTP ' + res.status));
            err.status = res.status;
            throw err;
        }
        return data;
    }

    function credsKey() {
        return api.role === 'player' ? 'pipboy_session_player' : 'pipboy_session_master';
    }

    function persistCreds() {
        try {
            localStorage.setItem(credsKey(), JSON.stringify({
                syncUrl: api.syncUrl,
                sessionId: api.sessionId,
                masterToken: api.role === 'master' ? api.masterToken : '',
                role: api.role
            }));
            localStorage.setItem('pipboy_sync_url', api.syncUrl);
            localStorage.removeItem('pipboy_session');
        } catch (e) {}
    }

    function applyHello(state) {
        if (!state) return;
        const keepNotes = api.state && api.state.masterNotes;
        const keepGm = api.state && api.state.tableAP && api.state.tableAP.gm;
        api.state = state;
        if (!Array.isArray(state.masterNotes) && keepNotes) api.state.masterNotes = keepNotes;
        if (state.tableAP && state.tableAP.gm == null && keepGm != null) {
            api.state.tableAP = Object.assign({}, state.tableAP, { gm: keepGm });
        }
        try { if (state.db && typeof api.onDb === 'function') api.onDb(state.db); } catch (e) { console.warn('session db', e); }
        try { if (state.map && typeof api.onMap === 'function') api.onMap(state.map); } catch (e) { console.warn('session map', e); }
        try { if (Array.isArray(api.state.masterNotes) && typeof api.onNotes === 'function') api.onNotes(api.state.masterNotes); } catch (e) { console.warn('session notes', e); }
        try { if (api.state.tableAP && typeof api.onAp === 'function') api.onAp(api.state.tableAP); } catch (e) { console.warn('session ap', e); }
        try { if (typeof api.onHello === 'function') api.onHello(state); } catch (e) { console.warn('session hello', e); }
    }

    function openStream() {
        if (es) { try { es.close(); } catch (e) {} es = null; }
        const url = api.syncUrl + '/api/sessions/' + api.sessionId + '/stream?client=' + encodeURIComponent(api.clientId);
        es = new EventSource(url);
        es.addEventListener('hello', (ev) => {
            const data = JSON.parse(ev.data);
            if (data.clientId) api.clientId = data.clientId;
            applyHello(data.state);
            setStatus('СЕССИЯ ' + api.sessionId + ' · LIVE', true);
        });
        es.addEventListener('char', (ev) => {
            const data = JSON.parse(ev.data);
            if (!data.char) return;
            api.state.characters[data.char.id] = data.char;
            if (data.from === api.clientId) return;
            if (typeof api.onChar === 'function') api.onChar(data.char);
        });
        es.addEventListener('char-delete', (ev) => {
            const data = JSON.parse(ev.data);
            delete api.state.characters[data.id];
            if (typeof api.onCharDelete === 'function') api.onCharDelete(data.id);
        });
        es.addEventListener('map', (ev) => {
            const data = JSON.parse(ev.data);
            api.state.map = data.map || [];
            if (data.from === api.clientId) return;
            if (typeof api.onMap === 'function') api.onMap(api.state.map);
        });
        es.addEventListener('db', (ev) => {
            const data = JSON.parse(ev.data);
            api.state.db = data.db;
            if (data.from === api.clientId) return;
            if (typeof api.onDb === 'function') api.onDb(data.db);
        });
        es.addEventListener('notes', (ev) => {
            const data = JSON.parse(ev.data);
            api.state.masterNotes = data.notes || [];
            if (data.from === api.clientId) return;
            if (typeof api.onNotes === 'function') api.onNotes(api.state.masterNotes);
        });
        es.addEventListener('ap', (ev) => {
            const data = JSON.parse(ev.data);
            const prevGm = api.state.tableAP && api.state.tableAP.gm;
            api.state.tableAP = {
                pool: data.pool || 0,
                max: data.max || 6,
                sceneAt: data.sceneAt || 0,
                gm: data.gm != null ? data.gm : prevGm
            };
            if (data.from === api.clientId) {
                if (typeof api.onAp === 'function') api.onAp(api.state.tableAP);
                return;
            }
            if (typeof api.onAp === 'function') api.onAp(api.state.tableAP);
        });
        es.addEventListener('session-end', () => {
            const sid = api.sessionId;
            if (typeof api.onSessionEnd === 'function') api.onSessionEnd(sid);
            api.disconnect();
        });
        es.onerror = () => setStatus('СЕССИЯ ' + api.sessionId + ' · СВЯЗЬ…', false);
    }

    api.playUrl = function () {
        if (!api.sessionId) return '';
        return api.syncUrl + '/play/?s=' + api.sessionId;
    };

    api.masterKey = function () {
        if (!api.sessionId || !api.masterToken) return '';
        return api.sessionId + '-' + api.masterToken;
    };

    api.parseMasterKey = function (raw) {
        const text = String(raw || '').replace(/\r/g, '').trim();
        if (!text) return null;
        const splitCombined = (value) => {
            const t = String(value || '').trim().toUpperCase().replace(/\s+/g, '');
            const m = t.match(/^([A-HJ-NP-Z2-9]{6,8})-([A-HJ-NP-Z2-9]{8,16})$/);
            if (!m) return null;
            return { sessionId: m[1], masterToken: m[2] };
        };
        const decode = (value) => {
            try { return decodeURIComponent(String(value || '')); } catch (e) { return String(value || ''); }
        };
        const queryK = text.match(/[?&#](?:k|t|mk)=([^&\s#]+)/i);
        if (queryK) {
            const combined = splitCombined(decode(queryK[1]));
            if (combined) return combined;
        }
        const queryS = text.match(/[?&]s=([A-HJ-NP-Z2-9]{6,8})/i);
        if (queryS && queryK) {
            return { sessionId: queryS[1].toUpperCase(), masterToken: decode(queryK[1]).toUpperCase() };
        }
        const urlMatch = text.match(/https?:\/\/[^\s]+/i);
        if (urlMatch && typeof URL === 'function') {
            try {
                const u = new URL(urlMatch[0]);
                const sid = (u.searchParams.get('s') || '').toUpperCase();
                const k = u.searchParams.get('k') || u.searchParams.get('t') || u.searchParams.get('mk') || '';
                const combined = splitCombined(k);
                if (combined) return combined;
                if (sid && k) return { sessionId: sid, masterToken: k };
            } catch (e) {}
        }
        const keyLine = text.match(/(?:ключ|key)\s*[:：]\s*([A-HJ-NP-Z2-9-]{10,})/i);
        if (keyLine) {
            const combined = splitCombined(keyLine[1]);
            if (combined) return combined;
        }
        const codeLine = text.match(/(?:код|code|стол)\s*[:：]\s*([A-HJ-NP-Z2-9]{6,8})/i);
        const tokenLine = text.match(/(?:токен|token)\s*[:：]\s*([A-HJ-NP-Z2-9]{8,16})/i);
        if (codeLine && tokenLine) {
            return { sessionId: codeLine[1].toUpperCase(), masterToken: tokenLine[1].toUpperCase() };
        }
        return splitCombined(text) || splitCombined(text.split(/\s|\n/).filter(Boolean).pop());
    };

    api.masterUrl = function () {
        const key = api.masterKey();
        if (!key) return '';
        return api.syncUrl + '/master/?k=' + encodeURIComponent(key);
    };

    api.create = async function (syncUrl, snapshot) {
        api.syncUrl = (syncUrl || originUrl()).replace(/\/$/, '');
        const data = await req('POST', '/api/sessions', {
            map: snapshot && snapshot.map || [],
            db: snapshot && snapshot.db || null
        });
        api.sessionId = data.id;
        api.masterToken = data.masterToken;
        persistCreds();
        openStream();
        return data;
    };

    api.connect = async function (syncUrl, sessionId, masterToken) {
        api.syncUrl = (syncUrl || originUrl()).replace(/\/$/, '');
        api.sessionId = String(sessionId || '').trim().toUpperCase();
        api.masterToken = masterToken || '';
        let state;
        try {
            state = await req('GET', '/api/sessions/' + api.sessionId);
        } catch (err) {
            api.sessionId = '';
            api.masterToken = '';
            throw err;
        }
        if (api.role === 'master' && state && state.isMaster === false) {
            api.sessionId = '';
            api.masterToken = '';
            throw new Error('Неверный ключ мастера');
        }
        applyHello(state);
        persistCreds();
        openStream();
        return state;
    };

    api.disconnect = function () {
        if (es) { try { es.close(); } catch (e) {} es = null; }
        api.connected = false;
        api.sessionId = '';
        api.masterToken = '';
        api.state = { characters: {}, map: [], db: null, masterNotes: [], tableAP: { pool: 0, gm: 0, max: 6, sceneAt: 0 } };
        try {
            localStorage.removeItem(credsKey());
            localStorage.removeItem('pipboy_session');
        } catch (e) {}
        setStatus('НЕТ СЕССИИ', false);
    };

    api.pushChar = function (char, pin) {
        if (!api.sessionId || !char) return;
        pendingChar = { char: Object.assign({}, char, { _session: true }), pin: pin || char.pin || '' };
        clearTimeout(charTimer);
        charTimer = setTimeout(async () => {
            const payload = pendingChar;
            pendingChar = null;
            try { await req('POST', '/api/sessions/' + api.sessionId + '/chars', payload); }
            catch (e) { console.warn('session char', e); }
        }, 280);
    };

    api.pushCharNow = async function (char, pin) {
        if (!api.sessionId || !char) return;
        clearTimeout(charTimer);
        pendingChar = null;
        return req('POST', '/api/sessions/' + api.sessionId + '/chars', {
            char: Object.assign({}, char, { _session: true }),
            pin: pin || char.pin || ''
        });
    };

    api.pushMap = function (map) {
        if (!api.sessionId || api.role !== 'master') return;
        pendingMap = map;
        clearTimeout(mapTimer);
        mapTimer = setTimeout(async () => {
            const m = pendingMap;
            pendingMap = null;
            try { await req('POST', '/api/sessions/' + api.sessionId + '/map', { map: m }); }
            catch (e) { console.warn('session map', e); }
        }, 200);
    };

    api.pushDb = async function (db) {
        if (!api.sessionId || api.role !== 'master') return;
        return req('POST', '/api/sessions/' + api.sessionId + '/db', { db: db });
    };

    api.pushNotes = function (notes) {
        if (!api.sessionId || api.role !== 'master') return;
        api.state.masterNotes = Array.isArray(notes) ? notes : [];
        return req('POST', '/api/sessions/' + api.sessionId + '/notes', { notes: api.state.masterNotes });
    };

    api.pushAp = function (payload) {
        if (!api.sessionId) return Promise.resolve();
        return req('POST', '/api/sessions/' + api.sessionId + '/ap', payload || {}).then(function (data) {
            if (data) {
                const prevGm = api.state.tableAP && api.state.tableAP.gm;
                api.state.tableAP = {
                    pool: data.pool || 0,
                    max: data.max || 6,
                    sceneAt: data.sceneAt || 0,
                    gm: data.gm != null ? data.gm : prevGm
                };
                if (typeof api.onAp === 'function') api.onAp(api.state.tableAP);
            }
            return data;
        });
    };

    api.deleteSession = async function () {
        if (!api.sessionId || api.role !== 'master') return;
        const id = api.sessionId;
        await req('DELETE', '/api/sessions/' + id, {});
        api.disconnect();
        return { ok: true, id: id };
    };

    api.unlockChar = async function (charId, pin) {
        return req('POST', '/api/sessions/' + api.sessionId + '/unlock', { charId: charId, pin: pin || '' });
    };

    api.deleteChar = async function (charId, pin) {
        return req('DELETE', '/api/sessions/' + api.sessionId + '/chars/' + encodeURIComponent(charId), { pin: pin || '' });
    };

    api.charsList = function () {
        return Object.keys(api.state.characters || {}).map(id => api.state.characters[id]);
    };

    api.tryRestore = async function () {
        let saved = null;
        try { saved = JSON.parse(localStorage.getItem(credsKey()) || 'null'); } catch (e) {}
        if (!saved || !saved.sessionId) return false;
        if (api.role === 'master' && !saved.masterToken) return false;
        try {
            await api.connect(saved.syncUrl, saved.sessionId, saved.masterToken || '');
            return true;
        } catch (e) {
            return false;
        }
    };

    api.defaultUrl = originUrl;
    return api;
})();
