'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = parseInt(process.env.PORT || '8787', 10);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = path.resolve(__dirname, '..');
const MASTER_DIR = path.join(ROOT, 'adaptive-v3');
const PLAY_DIR = path.join(ROOT, 'adaptive-v3-player');
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

function saveSession(sess) {
    ensureDirs();
    const copy = Object.assign({}, sess);
    fs.writeFileSync(sessionFile(sess.id), JSON.stringify(copy, null, 2), 'utf8');
}

function publicState(sess) {
    const chars = {};
    Object.keys(sess.characters || {}).forEach(id => {
        const c = Object.assign({}, sess.characters[id]);
        delete c.pin;
        chars[id] = c;
    });
    return {
        id: sess.id,
        createdAt: sess.createdAt,
        map: sess.map || [],
        db: sess.db || null,
        characters: chars
    };
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
            characters: {}
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

        if (req.method === 'GET' && parts.length === 3) {
            return send(res, 200, publicState(sess));
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
            if (!isMaster(req, sess)) return send(res, 403, { error: 'master only' });
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
