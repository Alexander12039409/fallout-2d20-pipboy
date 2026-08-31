'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

function loadEnvFile(file) {
    try {
        if (!fs.existsSync(file)) return;
        fs.readFileSync(file, 'utf8').split(/\n/).forEach((line) => {
            const t = line.trim();
            if (!t || t.startsWith('#')) return;
            const i = t.indexOf('=');
            if (i < 1) return;
            const k = t.slice(0, i).trim();
            let v = t.slice(i + 1).trim();
            if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
            if (process.env[k] == null || process.env[k] === '') process.env[k] = v;
        });
    } catch (e) {}
}
loadEnvFile(path.join(__dirname, 'telegram.env'));

const PORT = parseInt(process.env.PORT || '8787', 10);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = path.resolve(__dirname, '..');
const MASTER_DIR = path.join(ROOT, 'Fallout App Pip Boy Public Version', 'версия для мастера');
const PLAY_DIR = path.join(ROOT, 'Fallout App Pip Boy Public Version', 'версия для игроков');
const DATA_DIR = process.env.DATA_DIR
    ? path.resolve(process.env.DATA_DIR)
    : path.join(__dirname, 'data', 'sessions');
const createHits = new Map();

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2'
};

const sessions = new Map();
const streams = new Map();

function ensureDirs() {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

function sessionFile(id) {
    return path.join(DATA_DIR, id + '.json');
}

function loadAll() {
    ensureDirs();
    for (const name of fs.readdirSync(DATA_DIR)) {
        if (!name.endsWith('.json')) continue;
        try {
            const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf8'));
            if (data && data.id) sessions.set(data.id, data);
        } catch (e) { /* skip broken */ }
    }
}

function clipStr(s, n) {
    return String(s == null ? '' : s).slice(0, n);
}
function clipInt(n, min, max) {
    n = parseInt(n, 10);
    if (!Number.isFinite(n)) n = 0;
    return Math.max(min, Math.min(max, n));
}
function sanitizeFoeGear(g) {
    if (!g || typeof g !== 'object') return null;
    const type = ['weapon', 'armor', 'item'].includes(g.type) ? g.type : 'item';
    const mods = {};
    if (g.mods && typeof g.mods === 'object') {
        Object.keys(g.mods).slice(0, 12).forEach((k) => {
            mods[clipStr(k, 40)] = clipInt(g.mods[k], 0, 40);
        });
    }
    return {
        type,
        baseId: clipStr(g.baseId || g.title, 80),
        title: clipStr(g.title || g.baseId, 120),
        desc: clipStr(g.desc, 200),
        qty: g.qty == null ? undefined : clipInt(g.qty, 0, 99),
        mods
    };
}
function sanitizeFoe(f) {
    if (!f || typeof f !== 'object') return null;
    const kind = f.kind === 'character' ? 'character' : 'creature';
    const rank = ['ordinary', 'powerful', 'known', 'legendary', 'major'].includes(f.rank) ? f.rank : 'ordinary';
    const special = (f.special && typeof f.special === 'object') ? {
        str: clipInt(f.special.str, 0, 12),
        per: clipInt(f.special.per, 0, 12),
        end: clipInt(f.special.end, 0, 12),
        cha: clipInt(f.special.cha, 0, 12),
        int: clipInt(f.special.int, 0, 12),
        agi: clipInt(f.special.agi, 0, 12),
        luc: clipInt(f.special.luc, 0, 12)
    } : undefined;
    const skills = {};
    if (f.skills && typeof f.skills === 'object') {
        Object.keys(f.skills).slice(0, 20).forEach((k) => {
            skills[clipStr(k, 24)] = clipInt(f.skills[k], 0, 6);
        });
    }
    const dr = (f.dr && typeof f.dr === 'object') ? {
        phys: clipInt(f.dr.phys, 0, 99),
        energy: clipInt(f.dr.energy, 0, 99),
        rad: clipInt(f.dr.rad, 0, 99),
        tox: clipInt(f.dr.tox, 0, 99)
    } : { phys: 0, energy: 0, rad: 0, tox: 0 };
    return {
        id: clipStr(f.id, 80) || ('foe_' + Date.now()),
        templateId: clipStr(f.templateId, 40),
        name: clipStr(f.name, 80) || 'Противник',
        group: f.group === 'human' ? 'human' : 'monster',
        kind,
        rank,
        level: clipInt(f.level, 1, 30),
        xp: clipInt(f.xp, 0, 9999),
        hp: clipInt(f.hp, 0, 999),
        hpMax: clipInt(f.hpMax, 0, 999),
        body: f.body == null ? undefined : clipInt(f.body, 0, 12),
        mind: f.mind == null ? undefined : clipInt(f.mind, 0, 12),
        melee: f.melee == null ? undefined : clipInt(f.melee, 0, 6),
        ranged: f.ranged == null ? undefined : clipInt(f.ranged, 0, 6),
        other: f.other == null ? undefined : clipInt(f.other, 0, 6),
        special,
        skills,
        tagged: Array.isArray(f.tagged) ? f.tagged.slice(0, 6).map((s) => clipStr(s, 24)) : [],
        def: clipInt(f.def, 0, 5),
        init: clipInt(f.init, 0, 40),
        meleeBonus: clipInt(f.meleeBonus, 0, 5),
        luckPts: clipInt(f.luckPts, 0, 12),
        wealth: clipInt(f.wealth, 0, 10),
        size: clipStr(f.size, 16),
        dr,
        immune: Array.isArray(f.immune) ? f.immune.slice(0, 6).map((s) => clipStr(s, 16)) : [],
        traits: Array.isArray(f.traits) ? f.traits.slice(0, 8).map((s) => clipStr(s, 80)) : [],
        attacks: Array.isArray(f.attacks) ? f.attacks.slice(0, 8).map((a) => ({
            name: clipStr(a && a.name, 80),
            tn: clipInt(a && a.tn, 0, 30),
            dmg: clipInt(a && a.dmg, 0, 30),
            extra: clipStr(a && a.extra, 120)
        })) : [],
        gear: Array.isArray(f.gear) ? f.gear.slice(0, 16).map(sanitizeFoeGear).filter(Boolean) : []
    };
}
function sanitizeMasterNotes(list) {
    return (Array.isArray(list) ? list : []).slice(0, 80).map((n) => {
        if (!n || typeof n !== 'object') return null;
        const id = clipStr(n.id, 80) || ('note_' + Date.now());
        if (n.kind === 'encounter') {
            return {
                id,
                kind: 'encounter',
                title: clipStr(n.title, 80) || 'Группа противников',
                foes: Array.isArray(n.foes) ? n.foes.slice(0, 24).map(sanitizeFoe).filter(Boolean) : []
            };
        }
        const title = clipStr(n.title, 80);
        const text = clipStr(n.text, 8000);
        if (!title && !text) return null;
        return { id, title, text };
    }).filter(Boolean);
}

function saveSession(sess) {
    ensureDirs();
    const copy = Object.assign({}, sess);
    fs.writeFileSync(sessionFile(sess.id), JSON.stringify(copy, null, 2), 'utf8');
}

function publicState(sess, req) {
    const chars = {};
    Object.keys(sess.characters || {}).forEach(id => {
        const c = Object.assign({}, sess.characters[id]);
        delete c.pin;
        chars[id] = c;
    });
    const out = {
        id: sess.id,
        createdAt: sess.createdAt,
        map: sess.map || [],
        db: sess.db || null,
        characters: chars,
        isMaster: !!(req && isMaster(req, sess))
    };
    if (out.isMaster) out.masterNotes = Array.isArray(sess.masterNotes) ? sess.masterNotes : [];
    return out;
}

function alphabet() { return 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; }

function randomCode(len) {
    const a = alphabet();
    let s = '';
    for (let i = 0; i < len; i++) s += a[Math.floor(Math.random() * a.length)];
    return s;
}

function newSessionId() {
    for (let i = 0; i < 20; i++) {
        const id = randomCode(6);
        if (!sessions.has(id)) return id;
    }
    return randomCode(8);
}

function send(res, code, body, headers) {
    const payload = typeof body === 'string' ? body : JSON.stringify(body);
    res.writeHead(code, Object.assign({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Master-Token, X-Client-Id',
        'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
        'Cache-Control': 'no-store'
    }, headers || {}));
    res.end(payload);
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        let size = 0;
        req.on('data', c => {
            size += c.length;
            if (size > 8 * 1024 * 1024) {
                reject(new Error('too large'));
                req.destroy();
                return;
            }
            chunks.push(c);
        });
        req.on('end', () => {
            const raw = Buffer.concat(chunks).toString('utf8');
            if (!raw) return resolve({});
            try { resolve(JSON.parse(raw)); } catch (e) { reject(e); }
        });
        req.on('error', reject);
    });
}

function broadcast(sessionId, event, data, exceptClient) {
    const set = streams.get(sessionId);
    if (!set) return;
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const client of set) {
        if (exceptClient && client.clientId === exceptClient) continue;
        try { client.res.write(payload); } catch (e) { set.delete(client); }
    }
}

function isMaster(req, sess) {
    const token = req.headers['x-master-token'] || '';
    return !!(sess && token && token === sess.masterToken);
}

function safeJoin(root, urlPath) {
    const decoded = decodeURIComponent(String(urlPath || '').split('?')[0]);
    const clean = path.normalize(decoded).replace(/^[/\\]+/, '').replace(/^(\.\.[/\\])+/, '');
    const full = path.resolve(root, clean);
    const rootResolved = path.resolve(root) + path.sep;
    if (full !== path.resolve(root) && !full.startsWith(rootResolved)) return null;
    return full;
}

function serveFile(res, filePath) {
    fs.stat(filePath, (err, st) => {
        if (err || !st.isFile()) {
            send(res, 404, { error: 'not found' });
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
            'Content-Type': MIME[ext] || 'application/octet-stream',
            'Cache-Control': ext === '.html' || ext === '.js' || ext === '.css' ? 'no-store' : 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(filePath).pipe(res);
    });
}

function serveDir(res, reqPath, root, urlPath) {
    let rel = urlPath;
    if (rel.endsWith('/')) rel += 'index.html';
    if (!path.extname(rel)) {
        const asFile = safeJoin(root, rel);
        if (asFile && fs.existsSync(asFile) && fs.statSync(asFile).isFile()) {
            serveFile(res, asFile);
            return;
        }
        rel = rel.replace(/\/?$/, '/index.html');
    }
    const file = safeJoin(root, rel);
    if (!file) return send(res, 403, { error: 'forbidden' });
    serveFile(res, file);
}

async function handleApi(req, res, u) {
    const parts = u.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
    // /api/...
    if (req.method === 'GET' && parts[1] === 'health') {
        return send(res, 200, { ok: true, sessions: sessions.size });
    }

    if (req.method === 'GET' && parts[1] === 'public') {
        let bot = String(process.env.TELEGRAM_BOT_USERNAME || '').replace(/^@/, '');
        try {
            const meta = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'telegram.json'), 'utf8'));
            if (meta && meta.username) bot = String(meta.username).replace(/^@/, '');
        } catch (e) {}
        return send(res, 200, {
            telegramBot: bot || null
        });
    }

    if (req.method === 'POST' && parts[1] === 'sessions' && parts.length === 2) {
        if (!allowCreate(req)) return send(res, 429, { error: 'too many sessions' });
        const body = await readBody(req);
        const id = newSessionId();
        const sess = {
            id,
            masterToken: randomCode(12),
            createdAt: Date.now(),
            map: Array.isArray(body.map) ? body.map : [],
            db: body.db || null,
            characters: {},
            masterNotes: []
        };
        sessions.set(id, sess);
        saveSession(sess);
        return send(res, 200, {
            id,
            masterToken: sess.masterToken,
            playPath: '/play/?s=' + id
        });
    }

    if (parts[1] === 'sessions' && parts[2]) {
        const id = parts[2].toUpperCase();
        const sess = sessions.get(id);
        if (!sess) return send(res, 404, { error: 'session not found' });

        if (req.method === 'DELETE' && parts.length === 3) {
            if (!isMaster(req, sess)) return send(res, 403, { error: 'master only' });
            broadcast(id, 'session-end', { id: id });
            const live = streams.get(id);
            if (live) {
                live.forEach((client) => { try { client.res.end(); } catch (e) {} });
                streams.delete(id);
            }
            sessions.delete(id);
            try { fs.unlinkSync(sessionFile(id)); } catch (e) {}
            return send(res, 200, { ok: true });
        }

        if (req.method === 'GET' && parts.length === 3) {
            return send(res, 200, publicState(sess, req));
        }

        if (req.method === 'GET' && parts[3] === 'stream') {
            const clientId = u.searchParams.get('client') || randomCode(8);
            if (req.socket && typeof req.socket.setTimeout === 'function') req.socket.setTimeout(0);
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache, no-store',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'X-Accel-Buffering': 'no'
            });
            res.write(`event: hello\ndata: ${JSON.stringify({ clientId, state: publicState(sess) })}\n\n`);
            if (!streams.has(id)) streams.set(id, new Set());
            const client = { res, clientId };
            streams.get(id).add(client);
            const ping = setInterval(() => {
                try { res.write(`event: ping\ndata: {}\n\n`); } catch (e) { clearInterval(ping); }
            }, 20000);
            req.on('close', () => {
                clearInterval(ping);
                const set = streams.get(id);
                if (set) set.delete(client);
            });
            return;
        }

        if (req.method === 'POST' && parts[3] === 'map') {
            if (!isMaster(req, sess)) return send(res, 403, { error: 'master only' });
            const body = await readBody(req);
            sess.map = Array.isArray(body.map) ? body.map : [];
            saveSession(sess);
            broadcast(id, 'map', { map: sess.map, from: req.headers['x-client-id'] || '' });
            return send(res, 200, { ok: true });
        }

        if (req.method === 'POST' && parts[3] === 'db') {
            if (!isMaster(req, sess)) return send(res, 403, { error: 'master only' });
            const body = await readBody(req);
            sess.db = body.db || null;
            saveSession(sess);
            broadcast(id, 'db', { db: sess.db, from: req.headers['x-client-id'] || '' });
            return send(res, 200, { ok: true });
        }

        if (req.method === 'POST' && parts[3] === 'notes') {
            if (!isMaster(req, sess)) return send(res, 403, { error: 'master only' });
            const body = await readBody(req);
            const list = Array.isArray(body.notes) ? body.notes : [];
            sess.masterNotes = sanitizeMasterNotes(list);
            saveSession(sess);
            broadcast(id, 'notes', { notes: sess.masterNotes, from: req.headers['x-client-id'] || '' });
            return send(res, 200, { ok: true });
        }

        if (req.method === 'POST' && parts[3] === 'chars') {
            const body = await readBody(req);
            const char = body.char;
            if (!char || !char.id) return send(res, 400, { error: 'char required' });
            const existing = sess.characters[char.id];
            const masterOk = isMaster(req, sess);
            if (existing && existing.pin && !masterOk) {
                if (String(body.pin || '') !== String(existing.pin)) {
                    return send(res, 403, { error: 'bad pin' });
                }
            }
            const pin = existing ? existing.pin : (body.pin || char.pin || '');
            const stored = Object.assign({}, char, {
                pin,
                _session: true,
                updatedAt: Date.now()
            });
            sess.characters[char.id] = stored;
            saveSession(sess);
            const pub = Object.assign({}, stored);
            delete pub.pin;
            broadcast(id, 'char', { char: pub, from: req.headers['x-client-id'] || '' });
            return send(res, 200, { ok: true });
        }

        if (req.method === 'DELETE' && parts[3] === 'chars' && parts[4]) {
            const char = sess.characters[parts[4]];
            if (!char) return send(res, 404, { error: 'char not found' });
            const masterOk = isMaster(req, sess);
            if (!masterOk) {
                const body = await readBody(req).catch(() => ({}));
                if (char.pin && String((body && body.pin) || '') !== String(char.pin)) {
                    return send(res, 403, { error: 'bad pin' });
                }
            }
            delete sess.characters[parts[4]];
            saveSession(sess);
            broadcast(id, 'char-delete', { id: parts[4], from: req.headers['x-client-id'] || '' });
            return send(res, 200, { ok: true });
        }

        if (req.method === 'POST' && parts[3] === 'unlock') {
            const body = await readBody(req);
            const char = sess.characters[body.charId];
            if (!char) return send(res, 404, { error: 'char not found' });
            if (char.pin && String(body.pin || '') !== String(char.pin) && !isMaster(req, sess)) {
                return send(res, 403, { error: 'bad pin' });
            }
            const pub = Object.assign({}, char);
            delete pub.pin;
            return send(res, 200, { ok: true, char: pub });
        }
    }

    send(res, 404, { error: 'unknown api' });
}

const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, X-Master-Token, X-Client-Id',
            'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS'
        });
        res.end();
        return;
    }

    const u = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));

    try {
        if (u.pathname.startsWith('/api/')) {
            await handleApi(req, res, u);
            return;
        }
    } catch (err) {
        send(res, 400, { error: err.message || 'bad request' });
        return;
    }

    if (u.pathname === '/' || u.pathname === '/index.html') {
        res.writeHead(302, { Location: '/master/' });
        res.end();
        return;
    }

    if (u.pathname === '/play' || u.pathname === '/master') {
        res.writeHead(308, { Location: u.pathname + '/' + (u.search || '') });
        res.end();
        return;
    }

    if (u.pathname.startsWith('/master')) {
        const rel = u.pathname.replace(/^\/master\/?/, '/');
        serveDir(res, req.url, MASTER_DIR, rel === '/' ? '/index.html' : rel);
        return;
    }

    if (u.pathname.startsWith('/play')) {
        const rel = u.pathname.replace(/^\/play\/?/, '/');
        serveDir(res, req.url, PLAY_DIR, rel === '/' || rel === '' ? '/index.html' : rel);
        return;
    }

    send(res, 404, { error: 'not found' });
});

function clientIp(req) {
    const fwd = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    return fwd || (req.socket && req.socket.remoteAddress) || 'unknown';
}

function allowCreate(req) {
    const ip = clientIp(req);
    const now = Date.now();
    const hits = (createHits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
    if (hits.length >= 20) {
        createHits.set(ip, hits);
        return false;
    }
    hits.push(now);
    createHits.set(ip, hits);
    return true;
}

loadAll();
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;
server.listen(PORT, HOST, () => {
    const ifaces = osNetwork();
    console.log('');
    console.log('  Pip-Boy session server');
    console.log('  ----------------------');
    console.log('  Мастер:  http://localhost:' + PORT + '/master/');
    ifaces.forEach(ip => {
        console.log('  В сети:  http://' + ip + ':' + PORT + '/master/');
    });
    console.log('  Игроки получают ссылку из окна «Сессия» у мастера.');
    console.log('  Сессии:  ' + DATA_DIR);
    console.log('');
});

function osNetwork() {
    const os = require('os');
    const out = [];
    const nets = os.networkInterfaces();
    Object.keys(nets).forEach(name => {
        (nets[name] || []).forEach(n => {
            if (n.family === 'IPv4' && !n.internal) out.push(n.address);
        });
    });
    return out;
}
