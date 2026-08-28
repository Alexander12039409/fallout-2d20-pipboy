'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

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

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const DATA_DIR = process.env.DATA_DIR
    ? path.resolve(process.env.DATA_DIR, '..')
    : path.join(__dirname, 'data');
const OFFSET_FILE = path.join(DATA_DIR, 'telegram-offset');
const META_FILE = path.join(DATA_DIR, 'telegram.json');

function publicPlayBase() {
    return String(process.env.PIPBOY_PUBLIC_URL || 'http://89.125.90.225:8787').replace(/\/$/, '');
}

function playUrl(code) {
    const base = publicPlayBase() + '/play/';
    const id = String(code || '').trim().toUpperCase();
    return id ? (base + '?s=' + encodeURIComponent(id)) : base;
}

function webappUrl(code) {
    let w = String(process.env.TELEGRAM_WEBAPP_URL || '').trim();
    if (!w || !/^https:\/\//i.test(w)) return '';
    const hashAt = w.indexOf('#');
    const frag = hashAt >= 0 ? w.slice(hashAt) : '';
    if (hashAt >= 0) w = w.slice(0, hashAt);
    const qAt = w.indexOf('?');
    let path = qAt >= 0 ? w.slice(0, qAt) : w;
    const query = qAt >= 0 ? w.slice(qAt) : '';
    if (!path.endsWith('/')) path += '/';
    w = path + query + frag;
    const id = String(code || '').trim().toUpperCase();
    if (!id) return w;
    return w + (w.indexOf('?') >= 0 ? '&' : '?') + 's=' + encodeURIComponent(id);
}

function api(method, payload) {
    const body = JSON.stringify(payload || {});
    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'api.telegram.org',
            path: '/bot' + TOKEN + '/' + method,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        }, (res) => {
            const chunks = [];
            res.on('data', (c) => chunks.push(c));
            res.on('end', () => {
                const raw = Buffer.concat(chunks).toString('utf8');
                try { resolve(JSON.parse(raw)); }
                catch (e) { reject(new Error('telegram bad json')); }
            });
        });
        req.on('error', reject);
        req.setTimeout(120000, () => { req.destroy(new Error('telegram timeout')); });
        req.write(body);
        req.end();
    });
}

function readOffset() {
    try { return parseInt(fs.readFileSync(OFFSET_FILE, 'utf8'), 10) || 0; }
    catch (e) { return 0; }
}

function writeOffset(n) {
    try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
        fs.writeFileSync(OFFSET_FILE, String(n), 'utf8');
    } catch (e) {}
}

function writeMeta(me) {
    try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
        fs.writeFileSync(META_FILE, JSON.stringify({
            id: me.id,
            username: me.username || '',
            name: me.first_name || '',
            updatedAt: Date.now()
        }, null, 2), 'utf8');
    } catch (e) {}
}

function openMarkup(code) {
    const app = webappUrl(code);
    const btn = app
        ? { text: '📟 ОТКРЫТЬ PIP-BOY', web_app: { url: app } }
        : { text: '📟 ОТКРЫТЬ PIP-BOY', url: playUrl(code) };
    return { inline_keyboard: [[btn]] };
}

function startHtml(code) {
    if (code) {
        return '<b>ROBCO INDUSTRIES — PIP-BOY</b>\n\nСтол <code>' + code + '</code>\nОткройте терминал игрока. Если персонажа ещё нет — нажмите «Создать персонажа».';
    }
    return '<b>ROBCO INDUSTRIES — PIP-BOY</b>\n\nТерминал игрока.\nМастер пришлёт код стола. Нажмите кнопку — откроется стартовая страница Pip-Boy.';
}

function parseCode(text) {
    const raw = String(text || '').trim();
    const start = raw.match(/^\/start(?:@\w+)?(?:\s+(.+))?$/i);
    if (start) {
        const chunk = String(start[1] || '').toUpperCase();
        const m = chunk.match(/[A-HJ-NP-Z2-9]{6,8}/);
        return m ? m[0] : '';
    }
    if (/^\/help(?:@\w+)?$/i.test(raw)) return { help: true };
    const only = raw.toUpperCase();
    const m = only.match(/^[A-HJ-NP-Z2-9]{6,8}$/);
    return m ? m[0] : null;
}

async function sendStart(chatId, code) {
    await api('sendMessage', {
        chat_id: chatId,
        text: startHtml(code),
        parse_mode: 'HTML',
        reply_markup: openMarkup(code)
    });
}

async function handleMessage(msg) {
    if (!msg || !msg.chat || msg.chat.type !== 'private') return;
    const parsed = parseCode(msg.text || '');
    if (parsed && parsed.help) {
        await api('sendMessage', {
            chat_id: msg.chat.id,
            text: '<b>Как играть</b>\n1. Мастер создаёт стол в Pip-Boy.\n2. Вам приходит код или ссылка.\n3. Откройте терминал и создайте персонажа.\n\nМожно прислать боту код стола одним сообщением.',
            parse_mode: 'HTML',
            reply_markup: openMarkup('')
        });
        return;
    }
    if (parsed === null) {
        await api('sendMessage', {
            chat_id: msg.chat.id,
            text: 'Пришлите код стола (6 символов) или нажмите кнопку.',
            reply_markup: openMarkup('')
        });
        return;
    }
    await sendStart(msg.chat.id, parsed || '');
}

async function setup(me) {
    writeMeta(me);
    await api('setMyCommands', {
        commands: [
            { command: 'start', description: 'Открыть терминал игрока' },
            { command: 'help', description: 'Как подключиться к столу' }
        ]
    });
    const app = webappUrl('');
    if (app) {
        await api('setChatMenuButton', {
            menu_button: { type: 'web_app', text: 'Pip-Boy', web_app: { url: app } }
        });
    } else {
        await api('setChatMenuButton', { menu_button: { type: 'commands' } });
    }
}

async function loop() {
    await api('deleteWebhook', { drop_pending_updates: false });
    const me = await api('getMe');
    if (!me.ok) throw new Error((me.description || 'getMe failed'));
    console.log('Telegram bot @' + (me.result.username || '') + ' id=' + me.result.id);
    await setup(me.result);

    let offset = readOffset();
    if (!offset) {
        const skip = await api('getUpdates', { offset: -1, limit: 1, timeout: 0 });
        if (skip.ok && skip.result && skip.result[0]) offset = skip.result[0].update_id + 1;
        writeOffset(offset);
    }

    for (;;) {
        const data = await api('getUpdates', { offset: offset, timeout: 50, allowed_updates: ['message'] });
        if (!data.ok) {
            console.warn('getUpdates', data.description || data);
            await new Promise((r) => setTimeout(r, 3000));
            continue;
        }
        for (const upd of data.result || []) {
            offset = upd.update_id + 1;
            writeOffset(offset);
            try { await handleMessage(upd.message); }
            catch (e) { console.warn('update', e.message || e); }
        }
    }
}

if (!TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN не задан. Файл: pipboy-sync/telegram.env');
    process.exit(1);
}

loop().catch((err) => {
    console.error(err && err.stack || err);
    process.exit(1);
});
