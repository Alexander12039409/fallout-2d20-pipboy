function openSessionModal() {
    if (typeof closeSysMenu === 'function') closeSysMenu();
    const sm = document.getElementById('session-modal');
    if (sm) sm.classList.add('active');
}

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

function createSessionChar() {
    openCreateSessionChar();
}

function openCreateSessionChar() {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) {
        const sm = document.getElementById('session-modal');
        if (sm) sm.classList.add('active');
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
    if (!modal) return;
    const name = document.getElementById('session-char-name');
    const pin = document.getElementById('session-char-pin');
    if (name) name.value = '';
    if (pin) pin.value = '';
    modal.classList.add('active');
    if (name) name.focus();
}

function commitSessionChar(char) {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) return;
    const pin = char.pin || '';
    char._session = true;
    PipSession.state.characters[char.id] = Object.assign({}, char);
    PipSession.pushCharNow(char, pin).then(() => {
        try { localStorage.setItem('pipboy_claim_' + PipSession.sessionId, JSON.stringify({ id: char.id, pin: pin })); } catch (e) {}
        window.__unlockedCharId = char.id;
        renderChars();
        openChar(char.id);
    }).catch(err => alert(err.message || 'Не удалось создать'));
}

function confirmCreateSessionChar() {
    const name = (document.getElementById('session-char-name') && document.getElementById('session-char-name').value.trim()) || 'Выживший';
    const pin = (document.getElementById('session-char-pin') && document.getElementById('session-char-pin').value.trim()) || '';
    const modal = document.getElementById('session-char-modal');
    if (modal) modal.classList.remove('active');
    const char = blankSessionChar(name);
    char.pin = pin;
    commitSessionChar(char);
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
        if (typeof activeCharId !== 'undefined' && activeCharId && state && state.characters && state.characters[activeCharId] && typeof applyRemoteChar === 'function') {
            applyRemoteChar(state.characters[activeCharId]);
        }
        if (PIP_MODE === 'player' && PipSession.sessionId) enterPlayerApp();
    };
    PipSession.onChar = function (char) {
        if (typeof applyRemoteChar === 'function') applyRemoteChar(char);
        else {
            renderChars();
            if (activeCharId === char.id) {
                const keep = document.activeElement && document.activeElement.id;
                openChar(char.id);
                if (keep) {
                    const el = document.getElementById(keep);
                    if (el && el.focus) el.focus();
                }
            }
        }
    };
    PipSession.onCharDelete = function (id) {
        if (activeCharId === id) closeCharEditor();
        renderChars();
    };
    PipSession.onMap = function (map) { applySessionMap(map); };
    PipSession.onDb = function (db) { applySessionDb(db); };
    PipSession.onNotes = function (notes) { renderMasterNotes(notes); };
    PipSession.onSessionEnd = function () {
        updateSessionUi();
        renderChars();
        renderMasterNotes([]);
    };
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
        loadPublicConfig();
        const parsed = PipSession.parseMasterKey(location.href);
        if (parsed && parsed.sessionId && parsed.masterToken) {
            PipSession.connect(PipSession.defaultUrl(), parsed.sessionId, parsed.masterToken).then(() => {
                updateSessionUi();
                renderChars();
            }).catch(err => setSessionStatus(err.message || 'Не удалось открыть сессию', true));
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
    const idle = document.getElementById('session-idle-box');
    const join = document.getElementById('session-join-box');
    if (code) code.textContent = live ? PipSession.sessionId : '—';
    if (link) link.value = live ? PipSession.playUrl() : '';
    const tgLink = document.getElementById('session-tg-link');
    const tgWrap = document.getElementById('session-tg-wrap');
    const tgBtn = document.getElementById('session-tg-copy');
    const tgUrl = live ? telegramPlayUrl() : '';
    if (tgLink) tgLink.value = tgUrl;
    if (tgWrap) tgWrap.hidden = !tgUrl;
    if (tgBtn) tgBtn.hidden = !tgUrl;
    if (box) box.hidden = !live;
    if (idle) idle.hidden = live;
    if (join && live) join.hidden = true;
    const liveBtns = live && PipSession.connected;
    ['btn-session', 'btn-session-home'].forEach(function (id) {
        const btn = document.getElementById(id);
        if (btn) btn.classList.toggle('is-live', liveBtns);
    });
    const footer = document.getElementById('session-status-label');
    if (footer && !live) footer.textContent = '';
    const block = document.getElementById('session-block');
    if (block && PIP_MODE !== 'player') block.hidden = !live;
    refreshMasterKeyDownload();
    setSessionNotesTab(live);
    if (live) renderMasterNotes();
    else renderMasterNotes([]);
}

function setSessionNotesTab(live) {
    const tab = document.getElementById('nav-session-notes');
    if (tab) {
        if (live) tab.removeAttribute('hidden');
        else tab.setAttribute('hidden', '');
    }
    if (!live) {
        const view = document.getElementById('view-notes');
        if (view && view.classList.contains('active')) {
            const stat = document.querySelector('.nav-item[data-target="view-stat"]');
            if (stat) stat.click();
        }
    }
}

function masterNotesList() {
    if (typeof PipSession === 'undefined') return [];
    return Array.isArray(PipSession.state.masterNotes) ? PipSession.state.masterNotes : [];
}

function renderMasterNotes(list) {
    const host = document.getElementById('master-notes-list');
    if (!host) return;
    const notes = Array.isArray(list) ? list : masterNotesList();
    if (!notes.length) {
        host.innerHTML = '<div class="notes-empty">Нет заметок стола. Нажмите «+ Заметка».</div>';
        return;
    }
    const esc = (typeof escapePipHtml === 'function') ? escapePipHtml : function (s) {
        return String(s || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    };
    host.innerHTML = notes.map(n => {
        const title = esc(n.title || 'Заметка');
        const text = esc(n.text || '');
        return '<div class="note-card" onclick="openMasterNoteSheet(\'' + n.id + '\')">' +
            '<button type="button" class="note-card-del" onclick="event.stopPropagation(); deleteMasterNote(\'' + n.id + '\')">X</button>' +
            '<div class="note-card-title">' + title + '</div>' +
            '<div class="note-card-text">' + text + '</div></div>';
    }).join('');
}

function openMasterNoteSheet(noteId) {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) return;
    const note = noteId ? masterNotesList().find(n => n.id === noteId) : null;
    window.__noteSheetKind = 'master';
    window.__noteSheetId = note ? note.id : '';
    const titleEl = document.getElementById('note-modal-title');
    const title = document.getElementById('note-title');
    const text = document.getElementById('note-text');
    if (titleEl) titleEl.textContent = note ? 'ИЗМЕНИТЬ ЗАМЕТКУ' : 'НОВАЯ ЗАМЕТКА';
    if (title) title.value = note ? (note.title || '') : '';
    if (text) text.value = note ? (note.text || '') : '';
    const modal = document.getElementById('note-modal');
    if (modal) modal.classList.add('active');
    if (title) title.focus();
}

function saveMasterNote(noteId, title, text) {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) return;
    const notes = masterNotesList().map(n => Object.assign({}, n));
    if (noteId) {
        const note = notes.find(n => n.id === noteId);
        if (note) { note.title = title; note.text = text; }
        else notes.unshift({ id: noteId, title: title, text: text });
    } else {
        notes.unshift({
            id: 'note_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            title: title,
            text: text
        });
    }
    PipSession.state.masterNotes = notes;
    PipSession.pushNotes(notes);
    renderMasterNotes(notes);
}

function deleteMasterNote(noteId) {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) return;
    const notes = masterNotesList().filter(n => n.id !== noteId);
    PipSession.state.masterNotes = notes;
    PipSession.pushNotes(notes);
    renderMasterNotes(notes);
}

function copySessionCode() {
    const code = typeof PipSession !== 'undefined' && PipSession.sessionId;
    if (!code) return;
    const status = document.getElementById('session-copy-status');
    copyTextToClipboard(code).then(function () {
        if (status) status.textContent = 'Код стола скопирован';
    }).catch(function () {
        if (status) status.textContent = 'Не удалось скопировать код';
    });
}

function masterDeleteSession() {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) return;
    if (!confirm('Удалить стол ' + PipSession.sessionId + ' и всех персонажей навсегда?')) return;
    PipSession.deleteSession().then(function () {
        try { history.replaceState({}, '', location.pathname); } catch (e) {}
        hideMasterJoinForm();
        updateSessionUi();
        renderChars();
        renderMasterNotes([]);
        const copy = document.getElementById('session-copy-status');
        if (copy) copy.textContent = 'Стол удалён.';
        const modal = document.getElementById('session-modal');
        if (modal) modal.classList.add('active');
    }).catch(function (err) {
        setSessionStatus((err && err.message) || 'Не удалось удалить стол', true);
    });
}

function setSessionStatus(text, asError) {
    const el = document.getElementById('session-modal-status') || document.getElementById('session-join-status') || document.getElementById('session-copy-status');
    if (!el) return;
    el.textContent = text || '';
    el.style.color = asError ? 'var(--pip-red, #fe1414)' : '';
}

function showMasterJoinForm() {
    const join = document.getElementById('session-join-box');
    const idle = document.getElementById('session-idle-box');
    if (idle) idle.hidden = true;
    if (join) join.hidden = false;
    const inp = document.getElementById('session-join-key');
    if (inp) {
        inp.value = '';
        inp.focus();
    }
    setSessionStatus('');
}

function hideMasterJoinForm() {
    const join = document.getElementById('session-join-box');
    const idle = document.getElementById('session-idle-box');
    if (join) join.hidden = true;
    if (idle) idle.hidden = !!PipSession.sessionId ? true : false;
    if (!PipSession.sessionId && idle) idle.hidden = false;
    setSessionStatus('');
}

function rememberMasterUrl() {
    try {
        const next = new URL(PipSession.masterUrl() || location.href);
        history.replaceState({}, '', next.pathname + next.search);
    } catch (e) {}
}

async function masterCreateSession() {
    const url = (document.getElementById('session-url') && document.getElementById('session-url').value.trim()) || PipSession.defaultUrl();
    setSessionStatus('Создаю стол…');
    try {
        await PipSession.create(url, { map: customPOIs, db: masterDB });
        updateSessionUi();
        renderChars();
        rememberMasterUrl();
        const play = PipSession.playUrl();
        downloadMasterKey();
        const copy = document.getElementById('session-copy-status');
        if (play) {
            copyTextToClipboard(play).then(function () {
                if (copy) copy.textContent = 'Ссылка игрокам скопирована. Ключ скачан файлом.';
            }).catch(function () {
                if (copy) copy.textContent = 'Ключ скачан. Нажмите «Копировать ссылку».';
            });
        }
        const modal = document.getElementById('session-modal');
        if (modal) modal.classList.add('active');
    } catch (err) {
        setSessionStatus('Не удалось создать стол: ' + (err.message || err), true);
    }
}

async function masterJoinSession() {
    const raw = (document.getElementById('session-join-key') && document.getElementById('session-join-key').value) || '';
    const parsed = PipSession.parseMasterKey(raw);
    if (!parsed) {
        setSessionStatus('Вставьте ключ из файла или строку КОД-ТОКЕН.', true);
        return;
    }
    const url = (document.getElementById('session-url') && document.getElementById('session-url').value.trim()) || PipSession.defaultUrl();
    setSessionStatus('Подключаюсь…');
    try {
        await PipSession.connect(url, parsed.sessionId, parsed.masterToken);
        updateSessionUi();
        renderChars();
        rememberMasterUrl();
        setSessionStatus('Стол открыт.');
    } catch (err) {
        setSessionStatus(err.message || 'Не удалось подключиться', true);
    }
}

function masterLeaveSession() {
    PipSession.disconnect();
    try { history.replaceState({}, '', location.pathname); } catch (e) {}
    hideMasterJoinForm();
    updateSessionUi();
    renderChars();
}

function telegramPlayUrl() {
    const bot = window.__pipTelegramBot;
    if (!bot || typeof PipSession === 'undefined' || !PipSession.sessionId) return '';
    return 'https://t.me/' + bot + '?start=' + encodeURIComponent(PipSession.sessionId);
}

function copyTextToClipboard(text) {
    const value = String(text || '');
    if (!value) return Promise.reject(new Error('empty'));
    function execCopy() {
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:0;left:0;width:2em;height:2em;padding:0;border:none;outline:none;box-shadow:none;background:transparent;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        let ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        return ok;
    }
    if (execCopy()) return Promise.resolve(true);
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(value);
    }
    return Promise.reject(new Error('copy'));
}

function copyTelegramLink() {
    const link = telegramPlayUrl();
    const status = document.getElementById('session-copy-status');
    const input = document.getElementById('session-tg-link');
    if (!link) return;
    if (input) input.value = link;
    copyTextToClipboard(link).then(function () {
        if (status) status.textContent = 'Ссылка Telegram скопирована';
    }).catch(function () {
        if (input) { input.focus(); input.select(); }
        if (status) status.textContent = 'Не удалось скопировать — выделите строку вручную';
    });
}

function loadPublicConfig() {
    const base = (typeof PipSession !== 'undefined' && PipSession.defaultUrl()) || '';
    if (!base) return;
    fetch(base + '/api/public').then((r) => r.json()).then((data) => {
        window.__pipTelegramBot = (data && data.telegramBot) || '';
        updateSessionUi();
    }).catch(() => {});
}

function copyPlayLink() {
    const link = PipSession.playUrl();
    const status = document.getElementById('session-copy-status');
    const input = document.getElementById('session-play-link');
    if (!link) return;
    if (input) input.value = link;
    copyTextToClipboard(link).then(function () {
        if (status) status.textContent = 'Ссылка скопирована';
    }).catch(function () {
        if (input) { input.focus(); input.select(); }
        if (status) status.textContent = 'Не удалось скопировать — выделите строку вручную';
    });
}

function masterKeyFileBody() {
    const code = PipSession.sessionId;
    const key = PipSession.masterKey();
    const play = PipSession.playUrl();
    const tg = telegramPlayUrl();
    const lines = ['Fallout 2d20 Pip-Boy', 'Код: ' + code, 'Ключ: ' + key, 'Игроки: ' + play];
    if (tg) lines.push('Telegram: ' + tg);
    lines.push('');
    return lines.join('\n');
}

function refreshMasterKeyDownload() {
    const a = document.getElementById('session-key-dl');
    if (!a) return;
    if (a._blobUrl) {
        try { URL.revokeObjectURL(a._blobUrl); } catch (e) {}
        a._blobUrl = '';
    }
    if (typeof PipSession === 'undefined' || !PipSession.sessionId || !PipSession.masterToken) {
        a.removeAttribute('href');
        return;
    }
    const url = URL.createObjectURL(new Blob([masterKeyFileBody()], { type: 'text/plain;charset=utf-8' }));
    a._blobUrl = url;
    a.href = url;
    a.download = 'pipboy-' + PipSession.sessionId + '.txt';
}

function downloadMasterKey() {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) return;
    refreshMasterKeyDownload();
    const a = document.getElementById('session-key-dl');
    if (a && a.href && a.href.indexOf('blob:') === 0) {
        a.click();
        return;
    }
    const code = PipSession.sessionId;
    const blob = new Blob([masterKeyFileBody()], { type: 'text/plain;charset=utf-8' });
    const tmp = document.createElement('a');
    tmp.href = URL.createObjectURL(blob);
    tmp.download = 'pipboy-' + code + '.txt';
    document.body.appendChild(tmp);
    tmp.click();
    setTimeout(() => { URL.revokeObjectURL(tmp.href); tmp.remove(); }, 500);
}

function wireSessionKeyFile() {
    const file = document.getElementById('session-key-file');
    const area = document.getElementById('session-join-key');
    if (!file || file.dataset.bound) return;
    file.dataset.bound = '1';
    file.addEventListener('change', () => {
        const f = file.files && file.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => {
            if (area) area.value = String(reader.result || '');
            file.value = '';
        };
        reader.readAsText(f);
    });
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
    document.addEventListener('DOMContentLoaded', () => { wirePipSession(); wireSessionKeyFile(); });
} else {
    wirePipSession();
    wireSessionKeyFile();
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
