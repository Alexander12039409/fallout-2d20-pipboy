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
    api.state = { characters: {}, map: [], db: null };
    api.onChar = null;
    api.onMap = null;
    api.onDb = null;
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
        api.state = state || api.state;
        if (state && state.db && typeof api.onDb === 'function') api.onDb(state.db);
        if (state && state.map && typeof api.onMap === 'function') api.onMap(state.map);
        if (typeof api.onHello === 'function') api.onHello(state);
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
        es.onerror = () => setStatus('СЕССИЯ ' + api.sessionId + ' · СВЯЗЬ…', false);
    }

    api.playUrl = function () {
        if (!api.sessionId) return '';
        return api.syncUrl + '/play/?s=' + api.sessionId;
    };

    api.masterUrl = function () {
        if (!api.sessionId || !api.masterToken) return '';
        return api.syncUrl + '/master/?s=' + api.sessionId + '&k=' + encodeURIComponent(api.masterToken);
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
        const state = await req('GET', '/api/sessions/' + api.sessionId);
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
        api.state = { characters: {}, map: [], db: null };
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

    api.unlockChar = async function (charId, pin) {
        return req('POST', '/api/sessions/' + api.sessionId + '/unlock', { charId: charId, pin: pin || '' });
    };

    api.deleteChar = async function (charId) {
        return fetch(api.syncUrl + '/api/sessions/' + api.sessionId + '/chars/' + encodeURIComponent(charId), {
            method: 'DELETE',
            headers: headers()
        }).then(r => r.json());
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
