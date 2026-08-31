const PIP_MODE = (document.body && document.body.getAttribute('data-mode')) || 'master';

function sessionCharById(id) {
    if (typeof PipSession === 'undefined' || !id) return null;
    return (PipSession.state && PipSession.state.characters && PipSession.state.characters[id]) || null;
}
function findChar(id) {
    const session = sessionCharById(id);
    if (session) return session;
    if (PIP_MODE === 'player' && typeof vaultFind === 'function') {
        const vault = vaultFind(id);
        if (vault) return vault;
    }
    return (masterChars || []).find(c => c.id === id) || null;
}
function applyRemoteChar(char) {
    if (!char || !char.id) return;
    if (typeof PipSession !== 'undefined' && PipSession.state && PipSession.state.characters) {
        PipSession.state.characters[char.id] = char;
    }
    if (typeof renderChars === 'function') renderChars();
    if (typeof activeCharId === 'undefined' || activeCharId !== char.id) return;
    const drawer = document.getElementById('char-drawer');
    if (!drawer || !drawer.classList.contains('open')) return;
    const focused = document.activeElement;
    const keepFocusId = (focused && drawer.contains(focused) && focused.id) ? focused.id : '';
    const keepTabBtn = document.querySelector('.cs-tab-btn.active');
    const keepTabId = keepTabBtn && keepTabBtn.id ? keepTabBtn.id.replace(/^btn-tab-/, '') : '';
    const keepPanel = document.body.getAttribute('data-player-panel');
    const skip = { inventory: 1, perks: 1, notes: 1, drBase: 1, pin: 1, _session: 1, _vault: 1, updatedAt: 1, caps: 1, 'cs-luck-cur': 1, taggedSkills: 1, survivorTraits: 1, extraPerk: 1, giftedAttrs: 1, bosTagSkill: 1 };
    for (const key in char) {
        if (skip[key]) continue;
        const el = document.getElementById(key);
        if (!el || el.id === keepFocusId) continue;
        const next = char[key] == null ? '' : String(char[key]);
        if (el.value !== next) el.value = char[key] == null ? '' : char[key];
    }
    const titleEl = document.getElementById('cs-editor-title');
    if (titleEl) titleEl.textContent = char['cs-name'] || 'ПЕРСОНАЖ';
    if (char.inventory) char.inventory.forEach(it => {
        if (typeof normalizeArmorItem === 'function' && typeof isArmorItem === 'function' && isArmorItem(it)) normalizeArmorItem(it);
    });
    if (typeof ensureDrBase === 'function') ensureDrBase(char);
    if (typeof applyEquippedArmor === 'function') applyEquippedArmor(char, false);
    if (typeof renderInventoryAndPerks === 'function') renderInventoryAndPerks(char);
    if (typeof migrateCharNotes === 'function') migrateCharNotes(char);
    if (typeof renderCharNotes === 'function') renderCharNotes(char);
    if (typeof calcCharSecondary === 'function') calcCharSecondary();
    if (typeof updateLuckUi === 'function') updateLuckUi();
    if (typeof syncSkillTagDots === 'function') syncSkillTagDots(char);
    if (keepTabId && typeof switchCharTab === 'function') switchCharTab(keepTabId);
    if (PIP_MODE === 'player' && keepPanel && keepPanel !== 'main' && typeof playerShowPanel === 'function') {
        playerShowPanel(keepPanel);
    }
    if (keepFocusId) {
        const el = document.getElementById(keepFocusId);
        if (el && el.focus) el.focus();
    }
}
function isLiveSessionChar() {
    return !!(activeCharId && sessionCharById(activeCharId));
}

function persistMap() {
    if (PIP_MODE !== 'player') {
        try { localStorage.setItem('pipboy_pois_dc_yandex', JSON.stringify(customPOIs)); } catch (e) {}
    }
    if (typeof PipSession !== 'undefined' && PipSession.role === 'master' && PipSession.sessionId) {
        PipSession.pushMap(customPOIs);
    }
    if (typeof updateMasterStatus === 'function') updateMasterStatus();
}

function persistLiveChar() {
    const char = typeof liveChar === 'function' ? liveChar() : null;
    if (!char) {
        if (PIP_MODE !== 'player') {
            try { localStorage.setItem('pipboy_master_chars', JSON.stringify(masterChars)); } catch (e) {}
        }
        return;
    }
    if (char._session || sessionCharById(char.id) || (typeof isHubSessionChar === 'function' && isHubSessionChar(char.id))) {
        if (typeof PipSession !== 'undefined' && PipSession.sessionId) PipSession.pushChar(char, char.pin);
        if (PIP_MODE === 'player' && typeof hubRememberChar === 'function') hubRememberChar(char);
        return;
    }
    if (PIP_MODE === 'player' && typeof vaultUpsert === 'function' && (char._vault || (typeof vaultFind === 'function' && vaultFind(char.id)))) {
        vaultUpsert(char);
        if (typeof renderPlayerHub === 'function') renderPlayerHub();
        return;
    }
    if (PIP_MODE === 'player') return;
    try { localStorage.setItem('pipboy_master_chars', JSON.stringify(masterChars)); } catch (e) {}
}

// ==========================================================================
// 1. ИМПОРТ И ЭКСПОРТ (JS) БАЗ ДАННЫХ И КАРТЫ
// ==========================================================================
function updateMasterStatus() {
    if(typeof masterDB !== 'undefined') {
        const w = document.getElementById('db-weapons-status');
        const p = document.getElementById('db-perks-status');
        const i = document.getElementById('db-items-status');
        if (w) w.innerText = `Загружено: ${Object.keys(masterDB.weapons || {}).length} видов`;
        if (p) p.innerText = `Загружено: ${(masterDB.perks || []).length} перков`;
        if (i) i.innerText = `Загружено: ${(masterDB.items || []).length} предметов/брони`;
    }
    const mapStatus = document.getElementById('db-map-status');
    if (mapStatus) {
        try {
            mapStatus.innerText = `Загружено: ${customPOIs.length} меток`;
        } catch (e) { /* карта ещё не инициализирована */ }
    }
    const charsStatus = document.getElementById('db-chars-status');
    if (charsStatus && typeof masterChars !== 'undefined') {
        charsStatus.innerText = `Загружено: ${masterChars.length} персонажей`;
    }
}
setTimeout(updateMasterStatus, 500);

function exportModuleJS(moduleName) {
    const dataStr = `window.__pipBoyModLoaded = ${JSON.stringify(masterDB[moduleName], null, 2)};`;
    const blob = new Blob([dataStr], { type: "text/javascript" });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); 
    a.download = `fallout_db_${moduleName}.js`; a.click();
}

function importModuleJS(event, moduleName) {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const script = document.createElement('script'); script.textContent = e.target.result; document.body.appendChild(script);
            setTimeout(() => {
                if (window.__pipBoyModLoaded) {
                    masterDB[moduleName] = window.__pipBoyModLoaded; saveMasterDB();
                    pipNotify('База обновлена', 'Модуль «' + moduleName + '» загружен.', { kind: 'ok' });
                    delete window.__pipBoyModLoaded; document.body.removeChild(script);
                } else { pipNotify('Нет данных', 'В файле нет корректных данных.', { kind: 'error' }); }
            }, 50);
        } catch (err) { pipNotify('Ошибка файла', 'Не удалось обработать JS-файл.', { kind: 'error' }); }
    };
    reader.readAsText(file); event.target.value = '';
}

function exportCharsJS() {
    const dataStr = `window.__pipBoyCharsLoaded = ${JSON.stringify(masterChars, null, 2)};`;
    const blob = new Blob([dataStr], { type: "text/javascript" });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `fallout_db_chars.js`; a.click();
}

function importCharsJS(event) {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const script = document.createElement('script'); script.textContent = e.target.result; document.body.appendChild(script);
            setTimeout(() => {
                if (window.__pipBoyCharsLoaded) {
                    masterChars = window.__pipBoyCharsLoaded;
                    localStorage.setItem('pipboy_master_chars', JSON.stringify(masterChars));
                    closeCharEditor();
                    renderChars();
                    updateMasterStatus();
                    pipNotify('База обновлена', 'Персонажи успешно загружены.', { kind: 'ok' });
                    delete window.__pipBoyCharsLoaded; document.body.removeChild(script);
                } else { pipNotify('Нет данных', 'В файле нет корректных данных.', { kind: 'error' }); }
            }, 50);
        } catch (err) { pipNotify('Ошибка файла', 'Не удалось обработать JS-файл.', { kind: 'error' }); }
    };
    reader.readAsText(file); event.target.value = '';
}

function exportMapPOIs() {
    const dataStr = `window.__pipBoyMapLoaded = ${JSON.stringify(customPOIs, null, 2)};`;
    const blob = new Blob([dataStr], { type: "text/javascript" });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); 
    a.download = `fallout_db_map.js`; a.click();
}

function importMapPOIs(event) {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const script = document.createElement('script'); script.textContent = e.target.result; document.body.appendChild(script);
            setTimeout(() => {
                    if (window.__pipBoyMapLoaded) {
                    customPOIs = window.__pipBoyMapLoaded; 
                    persistMap();
                    renderAllPOIs(); updateMasterStatus();
                    pipNotify('База обновлена', 'Метки карты успешно загружены.', { kind: 'ok' });
                    delete window.__pipBoyMapLoaded; document.body.removeChild(script);
                } else { pipNotify('Нет данных', 'В файле нет корректных данных.', { kind: 'error' }); }
            }, 50);
        } catch (err) { pipNotify('Ошибка файла', 'Не удалось обработать JS-файл.', { kind: 'error' }); }
    };
    reader.readAsText(file); event.target.value = '';
}

function exportGlobal() {
    const exportData = { db: masterDB, chars: masterChars, map: customPOIs };
    const dataStr = `window.__pipBoyGlobalLoaded = ${JSON.stringify(exportData, null, 2)};`;
    const blob = new Blob([dataStr], { type: "text/javascript" });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); 
    a.download = `fallout_full_system.js`; a.click();
}

const globalImportEl = document.getElementById('global-import');
if (globalImportEl) globalImportEl.addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return; const reader = new FileReader();
    reader.onload = (event) => { 
        try { 
            const script = document.createElement('script'); script.textContent = event.target.result; document.body.appendChild(script);
            setTimeout(() => {
                const data = window.__pipBoyGlobalLoaded;
                if (data) {
                    if(data.db) { masterDB = data.db; saveMasterDB(); }
                    if(data.chars) { masterChars = data.chars; localStorage.setItem('pipboy_master_chars', JSON.stringify(masterChars)); renderChars(); }
                    if(data.map) { customPOIs = data.map; persistMap(); renderAllPOIs(); }
                    pipNotify('База обновлена', 'Глобальные данные успешно загружены.', { kind: 'ok' }); delete window.__pipBoyGlobalLoaded;
                    updateMasterStatus();
                }
                document.body.removeChild(script);
            }, 50);
        } catch(err) { pipNotify('Ошибка файла', 'Не удалось прочитать JS-файл.', { kind: 'error' }); } 
        e.target.value = ''; 
    }; reader.readAsText(file);
});

// ==========================================================================
// 2. БАЗОВЫЙ ИНТЕРФЕЙС И ВРЕМЯ
// ==========================================================================
setInterval(() => {
    const now = new Date();
    const timeEl = document.getElementById('real-time');
    const dateEl = document.getElementById('real-date');
    if (timeEl) timeEl.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()].map(n => String(n).padStart(2, '0')).join(':');
    if (dateEl) dateEl.textContent = [now.getDate(), now.getMonth() + 1].map(n => String(n).padStart(2, '0')).join('.') + '.' + now.getFullYear();
}, 1000);

const navItems = document.querySelectorAll('.nav-item[data-target]');
const views = document.querySelectorAll('.view-section');
function closeSysMenu() {
    document.body.classList.remove('sys-open');
}
function toggleSysMenu() {
    document.body.classList.toggle('sys-open');
}
function closeNavDrawer() { closeSysMenu(); }
function toggleNavDrawer() { toggleSysMenu(); }
function setNavTitle(text) {
    const el = document.getElementById('nav-current-title');
    if (el && text) el.textContent = text;
}
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target'); if(!targetId) return;
        navItems.forEach(nav => nav.classList.remove('active')); item.classList.add('active');
        views.forEach(view => view.classList.remove('active')); document.getElementById(targetId).classList.add('active');
        closeSysMenu();
        if (targetId !== 'view-characters') closeCharEditor();
        if (targetId !== 'view-map') {
            closeDrawerMap();
            closeSearchPanel();
            setFooterGeoVisible(false);
        } else {
            setFooterGeoVisible(true);
            setTimeout(() => { if (map && map.invalidateSize) map.invalidateSize(); }, 150);
        }
        if (typeof closeHelpNav === 'function') closeHelpNav();
        closeAllModals();
    });
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSysMenu();
});

// ==========================================================================
// 3. МЕНЕДЖЕР ПЕРСОНАЖЕЙ (MASTER OS)
// ==========================================================================
let masterChars = JSON.parse(localStorage.getItem('pipboy_master_chars')) || [];
let activeCharId = null;

const skillsDefs = [
    ["Атлетика", "athletics", "str"], ["Без оружия", "unarmed", "str"], ["Хол. оружие", "melee", "str"], 
    ["Тяж. оружие", "bigguns", "end"], ["Выживание", "survival", "end"], ["Восприятие", "perception_skill", "per"],
    ["Взрывчатка", "explosives", "per"], ["Взлом", "lockpick", "per"], ["Пилотирование", "pilot", "per"], 
    ["Энерг. оружие", "energy", "per"], ["Легкое оружие", "smallguns", "agi"], ["Скрытность", "sneak", "agi"],
    ["Метательное", "throwing", "agi"], ["Медицина", "medicine", "int"], ["Наука", "science", "int"], 
    ["Ремонт", "repair", "int"], ["Бартер", "barter", "cha"], ["Красноречие", "speech", "cha"]
];

const skillsContainer = document.getElementById('cs-skills-list');
if (skillsContainer) skillsDefs.forEach(skill => {
    const [ruName, id, attr] = skill;
    skillsContainer.innerHTML += `<div class="cs-skill-row" data-skill="${id}"><button type="button" class="skill-tag-dot" data-skill="${id}" title="Отмеченный навык" aria-pressed="false" onclick="toggleSkillTag('${id}')"></button><span class="cs-skill-name">${ruName}</span><div class="cs-skill-inputs"><input type="number" id="cs-skill-${id}" class="term-input cs-skill-val" data-attr="${attr}" value="0" min="0" max="6"><span class="cs-tn" id="cs-tn-${id}">[0]</span></div></div>`;
});

function taggedSkillsOf(char) {
    return Array.isArray(char && char.taggedSkills) ? char.taggedSkills : [];
}
function syncSkillTagDots(char) {
    const tagged = taggedSkillsOf(char);
    document.querySelectorAll('#cs-skills-list .skill-tag-dot').forEach(btn => {
        const id = btn.getAttribute('data-skill');
        const on = tagged.indexOf(id) !== -1;
        btn.classList.toggle('is-on', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
}
function toggleSkillTag(id) {
    const char = typeof liveChar === 'function' ? liveChar() : (typeof findChar === 'function' ? findChar(activeCharId) : null);
    if (!char || !id) return;
    if (!Array.isArray(char.taggedSkills)) char.taggedSkills = [];
    const i = char.taggedSkills.indexOf(id);
    if (i >= 0) char.taggedSkills.splice(i, 1);
    else char.taggedSkills.push(id);
    syncSkillTagDots(char);
    if (typeof vaultUpsert === 'function' && (char._vault || (typeof vaultFind === 'function' && vaultFind(char.id)))) {
        vaultUpsert(char);
        return;
    }
    if (typeof persistLiveChar === 'function') persistLiveChar();
}

function renderChars() {
    if (PIP_MODE === 'player') {
        if (typeof renderPlayerHub === 'function') renderPlayerHub();
        if (typeof updateMasterStatus === 'function') updateMasterStatus();
        return;
    }
    const grid = document.getElementById('char-grid');
    if (!grid) return;
    grid.innerHTML = '';
    masterChars.forEach(char => {
        const card = document.createElement('div'); card.className = 'char-card';
        card.innerHTML = charCardHtml(char, false);
        card.onclick = () => openChar(char.id); grid.appendChild(card);
    });
    const addCard = document.createElement('div'); addCard.className = 'char-card add-char-card';
    addCard.innerHTML = '<div style="font-size: 3rem;">+</div><div>СОЗДАТЬ ПЕРСОНАЖА</div>';
    addCard.onclick = createChar; grid.appendChild(addCard);
    renderSessionCharGrid();
    if (typeof updateMasterStatus === 'function') updateMasterStatus();
}

function charCardHtml(char, session) {
    let skillsHtml = '';
    skillsDefs.forEach(skill => {
        let val = parseInt(char['cs-skill-' + skill[1]]) || 0;
        if (val > 0) skillsHtml += '<span style="display:inline-block; margin:2px; padding:2px 4px; border:1px solid var(--theme-dim); background:rgba(20,254,20,0.1); border-radius:3px; font-size:0.85rem;">' + skill[0] + ' [' + val + ']</span>';
    });
    const extra = skillsHtml ? '<div style="margin-top: 5px; border-top: 1px dashed var(--theme-dim); padding-top: 5px; display: flex; flex-wrap: wrap;">' + skillsHtml + '</div>' : '';
    const mine = !(session && PIP_MODE === 'player') || (typeof hubFindChar === 'function' && PipSession.sessionId && hubFindChar(PipSession.sessionId, char.id));
    const del = mine ? '<button class="char-card-del" onclick="deleteChar(event, \'' + char.id + '\')">X</button>' : '';
    return del + '<div class="char-card-name">' + (char['cs-name'] || 'БЕЗ ИМЕНИ') + '</div><div class="char-card-info">' + (session ? 'СЕССИЯ · ' : '') + 'УР: ' + (char['cs-lvl'] || 1) + ' | ' + (char['cs-origin'] || 'ВЫЖИВШИЙ') + '</div><div class="char-card-special"><span><span class="sp-lab">сил</span>' + ((typeof effectiveCharStr === 'function') ? effectiveCharStr(char) : (char['cs-str']||5)) + '</span><span><span class="sp-lab">восп</span>' + (char['cs-per']||5) + '</span><span><span class="sp-lab">вын</span>' + (char['cs-end']||5) + '</span><span><span class="sp-lab">хар</span>' + (char['cs-cha']||5) + '</span><span><span class="sp-lab">инт</span>' + (char['cs-int']||5) + '</span><span><span class="sp-lab">лов</span>' + (char['cs-agi']||5) + '</span><span><span class="sp-lab">уд</span>' + (char['cs-luc']||5) + '</span></div>' + extra;
}

function renderSessionCharGrid() {
    const block = document.getElementById('session-block');
    const sgrid = document.getElementById('session-char-grid');
    const idEl = document.getElementById('session-block-id');
    const live = typeof PipSession !== 'undefined' && !!PipSession.sessionId;
    if (PIP_MODE === 'player') {
        if (block) block.hidden = true;
    } else {
        if (block) block.hidden = !live;
        if (idEl && live) idEl.textContent = PipSession.sessionId;
    }
    const host = PIP_MODE === 'player' ? document.getElementById('char-grid') : sgrid;
    if (!host) return;
    host.innerHTML = '';
    if (!live) {
        if (PIP_MODE === 'player') {
            host.innerHTML = '<div class="player-wait">Нет активной сессии. Откройте ссылку от мастера или введите код выше.</div>';
        }
        return;
    }
    PipSession.charsList().forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card session-card';
        card.innerHTML = charCardHtml(char, true);
        card.onclick = () => openChar(char.id);
        host.appendChild(card);
    });
    const addCard = document.createElement('div'); addCard.className = 'char-card add-char-card';
    if (PIP_MODE === 'player') {
        addCard.innerHTML = '<div style="font-size: 3rem;">+</div><div>НОВЫЙ ПЕРСОНАЖ</div>';
        addCard.onclick = () => { if (typeof openCreateSessionChar === 'function') openCreateSessionChar(); };
    } else {
        addCard.innerHTML = '<div style="font-size: 2rem;">+</div><div>ПЕРСОНАЖ В СЕССИЮ</div>';
        addCard.onclick = () => { if (typeof openCreateSessionChar === 'function') openCreateSessionChar(); else if (typeof createSessionChar === 'function') createSessionChar(); };
    }
    host.appendChild(addCard);
}

function createChar() {
    if (typeof openChargenChoice === 'function') {
        openChargenChoice(PIP_MODE === 'player' ? 'player-vault' : 'master-vault');
        return;
    }
    createCharImmediate();
}
function createCharImmediate() {
    const newChar = {
        id: 'char_' + Date.now(), 'cs-name': 'Новый Персонаж', 'cs-lvl': 1, 'cs-xp': '', 'cs-origin': 'Выживший',
        'cs-str': 5, 'cs-per': 5, 'cs-end': 5, 'cs-cha': 5, 'cs-int': 5, 'cs-agi': 5, 'cs-luc': 5, 'cs-hp-cur': 10, 'cs-hp-max': 10,
        'cs-luck-cur': 5, caps: 0,
        inventory: [], perks: [], notes: [], taggedSkills: [], survivorTraits: []
    };
    masterChars.push(newChar); localStorage.setItem('pipboy_master_chars', JSON.stringify(masterChars));
    renderChars(); openChar(newChar.id);
}

function deleteChar(e, id) {
    e.stopPropagation();
    pipConfirm('Удалить персонажа?', 'Лист будет стёрт навсегда.').then(function (ok) {
        if (!ok) return;
        if (activeCharId === id) closeCharEditor();
        if (PIP_MODE === 'player' && typeof vaultFind === 'function' && vaultFind(id) && !sessionCharById(id)) {
            vaultRemove(id);
            renderChars();
            return;
        }
        if (sessionCharById(id)) {
            const pin = (PIP_MODE === 'player' && typeof hubFindChar === 'function' && PipSession.sessionId)
                ? ((hubFindChar(PipSession.sessionId, id) || {}).pin || '')
                : '';
            if (typeof PipSession !== 'undefined') PipSession.deleteChar(id, pin).then(() => {
                delete PipSession.state.characters[id];
                if (PIP_MODE === 'player' && typeof hubRemoveChar === 'function') hubRemoveChar(PipSession.sessionId, id);
                renderChars();
            }).catch((err) => pipNotify('Не удалось удалить', (err && err.message) || 'Попробуйте ещё раз.', { kind: 'error' }));
            return;
        }
        masterChars = masterChars.filter(c => c.id !== id);
        localStorage.setItem('pipboy_master_chars', JSON.stringify(masterChars));
        renderChars();
        updateMasterStatus();
    });
}

function openChar(id) {
    if (PIP_MODE === 'player' && sessionCharById(id) && window.__unlockedCharId !== id && typeof playerOpenChar === 'function') {
        playerOpenChar(id);
        return;
    }
    const char = findChar(id);
    if (!char) return;
    activeCharId = id;
    const titleEl = document.getElementById('cs-editor-title');
    if (titleEl) titleEl.textContent = (char['cs-name'] || 'ПЕРСОНАЖ');
    document.querySelectorAll('#char-drawer .term-input, #char-drawer .term-textarea, #char-drawer .cs-skill-val').forEach(el => {
        if(el.type === 'number') { el.value = el.hasAttribute('min') ? el.min : 0; } else if(el.tagName === 'SELECT') el.selectedIndex = 0; else el.value = '';
    });
    for (const key in char) {
        const el = document.getElementById(key);
        if (!el) continue;
        if (el.tagName === 'SPAN' || el.tagName === 'DIV' || el.tagName === 'BUTTON') continue;
        el.value = char[key];
    }
    const drawer = document.getElementById('char-drawer');
    const vc = document.getElementById('view-characters');
    if (drawer) drawer.classList.add('open');
    if (vc) vc.classList.add('sheet-open');
    const scrollBody = document.querySelector('#char-drawer .cs-scroll-body');
    if (scrollBody) scrollBody.scrollTop = 0;
    if (char.inventory) char.inventory.forEach(it => { if (typeof normalizeArmorItem === 'function' && isArmorItem(it)) normalizeArmorItem(it); });
    ensureDrBase(char);
    enforceCharLimits();
    applyEquippedArmor(char, false);
    switchCharTab('perks'); renderInventoryAndPerks(char);
    migrateCharNotes(char);
    renderCharNotes(char);
    document.querySelectorAll('#char-drawer .term-textarea').forEach(ta => { autoResize.call(ta); });
    if (typeof syncSkillTagDots === 'function') syncSkillTagDots(char);
    if (PIP_MODE === 'player' && typeof enterPlayerPlay === 'function') enterPlayerPlay();
    if (PIP_MODE === 'player') {
        const keepPanel = document.body.getAttribute('data-player-panel');
        if (keepPanel && keepPanel !== 'main' && typeof playerShowPanel === 'function') playerShowPanel(keepPanel);
    }
}

function closeCharEditor() {
    saveActiveCharLive(); activeCharId = null;
    const drawer = document.getElementById('char-drawer');
    if (drawer) drawer.classList.remove('open');
    const vc = document.getElementById('view-characters');
    if (vc) vc.classList.remove('sheet-open');
    if (PIP_MODE === 'player' && typeof playerExitToHub === 'function') {
        playerExitToHub();
    }
}

function saveActiveCharLive() {
    if(!activeCharId) return;
    const prev = findChar(activeCharId);
    if (!prev) return;
    const charData = Object.assign({}, prev, {
        id: activeCharId,
        inventory: prev.inventory || [],
        perks: prev.perks || [],
        drBase: prev.drBase || null,
        notes: Array.isArray(prev.notes) ? prev.notes : []
    });
    document.querySelectorAll('#char-drawer .term-input, #char-drawer .term-textarea, #char-drawer .cs-skill-val').forEach(el => {
        if (el.id) charData[el.id] = el.value;
    });
    if (typeof charHasPowerFrame === 'function' && charHasPowerFrame(charData)) {
        charData['cs-str'] = prev['cs-str'];
    } else {
        const strEl = document.getElementById('cs-str');
        if (strEl && strEl.readOnly) charData['cs-str'] = prev['cs-str'];
    }
    charData.caps = parseInt(prev.caps, 10) || 0;
    if (prev['cs-luck-cur'] != null) charData['cs-luck-cur'] = prev['cs-luck-cur'];
    if (sessionCharById(activeCharId) || prev._session) {
        charData._session = true;
        if (typeof PipSession !== 'undefined') PipSession.state.characters[activeCharId] = charData;
        persistLiveChar();
        renderChars();
        return;
    }
    if (PIP_MODE === 'player' && typeof vaultUpsert === 'function' && (prev._vault || vaultFind(activeCharId))) {
        charData._vault = true;
        delete charData._session;
        vaultUpsert(charData);
        renderChars();
        return;
    }
    const charIndex = masterChars.findIndex(c => c.id === activeCharId);
    if (charIndex === -1) return;
    masterChars[charIndex] = charData;
    persistLiveChar();
    renderChars();
}

const charDrawerEl = document.getElementById('char-drawer');
if (charDrawerEl) {
    charDrawerEl.addEventListener('input', handleCharEdit);
    charDrawerEl.addEventListener('change', handleCharEdit);
}

function handleCharEdit(e) {
    if(e.target.classList.contains('term-input') || e.target.classList.contains('term-textarea') || e.target.classList.contains('cs-skill-val')) {
        if (e.target.id === 'cs-str' && e.target.readOnly) {
            e.target.value = (typeof POWER_FRAME_STR === 'number') ? POWER_FRAME_STR : 11;
            return;
        }
        if(e.target.id.startsWith('cs-') && !e.target.id.startsWith('cs-skill') && !e.target.id.startsWith('cs-dr') && !e.target.id.startsWith('cs-text')) enforceCharLimits();
        if(e.target.id === 'cs-hp-cur' || e.target.id === 'cs-hp-max') updateCharVisualHP();
        if(e.target.classList.contains('cs-skill-val')) calcCharTNs();
        if(e.target.id && e.target.id.startsWith('cs-dr-')) updateDrBaseFromInput(e.target);
        saveActiveCharLive();
    }
}

function enforceCharLimits() {
    const origin = document.getElementById('cs-origin').value;
    const attrs = ['str', 'per', 'end', 'cha', 'int', 'agi', 'luc'];
    const live = typeof liveChar === 'function' ? liveChar() : findChar(activeCharId);
    const framed = typeof charHasPowerFrame === 'function' && charHasPowerFrame(live);
    attrs.forEach(a => document.getElementById('cs-' + a).max = 10);
    if (origin === 'Супермутант') {
        document.getElementById('cs-str').max = 12; document.getElementById('cs-end').max = 12;
        document.getElementById('cs-int').max = 6; document.getElementById('cs-cha').max = 6;
        if (parseInt(document.getElementById('cs-int').value) > 6) document.getElementById('cs-int').value = 6;
        if (parseInt(document.getElementById('cs-cha').value) > 6) document.getElementById('cs-cha').value = 6;
    }
    if (framed) {
        const strEl = document.getElementById('cs-str');
        if (strEl) strEl.max = (typeof POWER_FRAME_STR === 'number') ? POWER_FRAME_STR : 11;
    }
    attrs.forEach(a => {
        if (a === 'str' && framed) return;
        let el = document.getElementById('cs-' + a); let max = parseInt(el.max) || 10; let val = parseInt(el.value) || 5; if (val > max) el.value = max;
    });
    calcCharSecondary();
}

function calcCharSecondary() {
    let lvl = parseInt(document.getElementById('cs-lvl').value) || 1;
    let str = parseInt(document.getElementById('cs-str').value) || 5;
    let per = parseInt(document.getElementById('cs-per').value) || 5;
    let end = parseInt(document.getElementById('cs-end').value) || 5;
    let agi = parseInt(document.getElementById('cs-agi').value) || 5;
    let lck = parseInt(document.getElementById('cs-luc').value) || 5;
    let origin = document.getElementById('cs-origin').value;
    const live = findChar(activeCharId);
    if (typeof charHasPowerFrame === 'function' && charHasPowerFrame(live)) {
        str = (typeof POWER_FRAME_STR === 'number') ? POWER_FRAME_STR : 11;
    }
    document.getElementById('cs-stat-init').textContent = per + agi; document.getElementById('cs-stat-def').textContent = agi >= 9 ? 2 : 1; document.getElementById('cs-hp-max').value = end + lck + (lvl > 1 ? lvl - 1 : 0);
    let meleeBonus = 0; if (str >= 11) meleeBonus = 3; else if (str >= 9) meleeBonus = 2; else if (str >= 7) meleeBonus = 1;
    if (live && Array.isArray(live.survivorTraits) && live.survivorTraits.indexOf('heavy') !== -1) meleeBonus += 1;
    document.getElementById('cs-stat-melee').textContent = "+" + meleeBonus + " БК";
    let carryWeight = 150 + (str * 10);
    if (origin === 'Мистер Помощник') carryWeight = 150;
    else if (live && Array.isArray(live.survivorTraits) && live.survivorTraits.indexOf('small') !== -1) carryWeight = 150 + (str * 5);
    if (live && typeof getEquippedCarryBonus === 'function') carryWeight += getEquippedCarryBonus(live.inventory);
    document.getElementById('cs-stat-carry').textContent = carryWeight + " Ф.";
    calcCharTNs(); updateCharVisualHP();
    if (typeof updateLuckUi === 'function') updateLuckUi();
}

function calcCharTNs() {
    const live = findChar(activeCharId);
    const framed = typeof charHasPowerFrame === 'function' && charHasPowerFrame(live);
    const frameStr = (typeof POWER_FRAME_STR === 'number') ? POWER_FRAME_STR : 11;
    document.querySelectorAll('.cs-skill-val').forEach(input => {
        const attrKey = input.getAttribute('data-attr');
        let attrValue = parseInt(document.getElementById(`cs-${attrKey}`).value) || 0;
        if (framed && attrKey === 'str') attrValue = frameStr;
        input.nextElementSibling.textContent = `[${attrValue + (parseInt(input.value) || 0)}]`;
    });
}

function updateCharVisualHP() {
    let cur = parseInt(document.getElementById('cs-hp-cur').value) || 0; let max = parseInt(document.getElementById('cs-hp-max').value) || 1;
    if (max < 1) max = 1; if (cur > max) cur = max; if (cur < 0) cur = 0;
    document.getElementById('cs-hp-cur').value = cur;
    const percentage = (cur / max) * 100; const fillUi = document.getElementById('cs-hp-ui'); fillUi.style.width = percentage + '%';
    if(percentage <= 25) { fillUi.style.background = '#ff2121'; fillUi.style.boxShadow = '0 0 8px rgba(255, 33, 33, 0.6)'; } 
    else { fillUi.style.background = 'var(--pip-green)'; fillUi.style.boxShadow = 'var(--theme-glow)'; }
    updateCharAvatar(cur, max);
}

function nudgeHp(delta) {
    const el = document.getElementById('cs-hp-cur');
    if (!el) return;
    const max = parseInt(document.getElementById('cs-hp-max').value) || 1;
    let cur = (parseInt(el.value) || 0) + (parseInt(delta, 10) || 0);
    if (cur < 0) cur = 0;
    if (cur > max) cur = max;
    el.value = cur;
    updateCharVisualHP();
    saveActiveCharLive();
}

function luckMaxFromChar(char) {
    let lck;
    const lucEl = document.getElementById('cs-luc');
    if (lucEl && lucEl.value !== '') lck = parseInt(lucEl.value, 10) || 0;
    else lck = parseInt(char && char['cs-luc'], 10) || 0;
    if (char && Array.isArray(char.survivorTraits) && char.survivorTraits.indexOf('gifted') !== -1) lck = Math.max(0, lck - 1);
    return Math.max(0, lck);
}
function ensureLuck(char) {
    if (!char) return 0;
    const max = luckMaxFromChar(char);
    let cur = parseInt(char['cs-luck-cur'], 10);
    if (!Number.isFinite(cur)) cur = max;
    if (cur < 0) cur = 0;
    if (cur > max) cur = max;
    char['cs-luck-cur'] = cur;
    return cur;
}
function updateLuckUi() {
    const char = typeof liveChar === 'function' ? liveChar() : null;
    const maxEl = document.getElementById('cs-luck-max');
    const curEl = document.getElementById('cs-luck-cur');
    if (!maxEl || !curEl) return;
    const max = luckMaxFromChar(char);
    maxEl.textContent = String(max);
    if (char) curEl.textContent = String(ensureLuck(char));
    else curEl.textContent = String(max);
}
function nudgeLuck(delta) {
    const char = typeof liveChar === 'function' ? liveChar() : null;
    if (!char) return;
    const max = luckMaxFromChar(char);
    let cur = ensureLuck(char) + (parseInt(delta, 10) || 0);
    if (cur < 0) cur = 0;
    if (cur > max) cur = max;
    char['cs-luck-cur'] = cur;
    updateLuckUi();
    persistLiveChar();
}

function changeCaps(delta) {
    const char = typeof liveChar === 'function' ? liveChar() : null;
    if (!char) return;
    let n = (parseInt(char.caps, 10) || 0) + (parseInt(delta, 10) || 0);
    if (n < 0) n = 0;
    char.caps = n;
    persistLiveChar();
    const el = document.getElementById('caps-val');
    if (el) el.textContent = String(n);
}

function changeCustomQty(idx, delta) {
    const char = typeof liveChar === 'function' ? liveChar() : null;
    if (!char || !char.inventory || !char.inventory[idx]) return;
    let n = (parseInt(char.inventory[idx].qty, 10) || 0) + (parseInt(delta, 10) || 0);
    if (n < 0) n = 0;
    char.inventory[idx].qty = n;
    persistLiveChar();
    const el = document.getElementById('custom-qty-' + idx);
    if (el) el.textContent = String(n);
}

function updateCharAvatar(cur, max) {
    const img = document.getElementById('cs-avatar-img');
    if (!img || typeof avatarRelFromHp !== 'function') return;
    const rel = avatarRelFromHp(cur, max);
    if (img.dataset.rel === rel) return;
    const nextSrc = iconUrl(rel);
    img.classList.add('is-switching');
    img.dataset.rel = rel;
    setTimeout(() => {
        img.src = nextSrc;
        img.classList.remove('is-switching');
    }, 160);
}

function newNoteId() {
    return 'note_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
}
function migrateCharNotes(char) {
    if (!char) return [];
    if (!Array.isArray(char.notes)) char.notes = [];
    const legacy = String(char['cs-text-notes'] || '').trim();
    if (legacy && !char.notes.length) {
        char.notes.push({ id: newNoteId(), title: 'Заметка', text: legacy });
        char['cs-text-notes'] = '';
    }
    return char.notes;
}
function renderCharNotes(char) {
    const host = document.getElementById('cs-notes-list');
    if (!host) return;
    const notes = migrateCharNotes(char);
    if (!notes.length) {
        host.innerHTML = '<div class="notes-empty">Нет заметок. Нажмите «+ Заметка».</div>';
        return;
    }
    host.innerHTML = notes.map(n => {
        const title = escapePipHtml(n.title || 'Заметка');
        const text = escapePipHtml(n.text || '');
        return '<div class="note-card" onclick="openCharNoteSheet(\'' + n.id + '\')">' +
            '<button type="button" class="note-card-del" onclick="event.stopPropagation(); deleteCharNote(\'' + n.id + '\')">X</button>' +
            '<div class="note-card-title">' + title + '</div>' +
            '<div class="note-card-text">' + text + '</div></div>';
    }).join('');
}
function openCharNoteSheet(noteId) {
    const char = (typeof liveChar === 'function' && liveChar()) || findChar(activeCharId);
    if (!char) return;
    migrateCharNotes(char);
    const note = noteId ? char.notes.find(n => n.id === noteId) : null;
    window.__noteSheetKind = 'char';
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
function closeNoteSheet() {
    const modal = document.getElementById('note-modal');
    if (modal) modal.classList.remove('active');
}
function saveNoteSheet() {
    const title = (document.getElementById('note-title') && document.getElementById('note-title').value.trim()) || '';
    const text = (document.getElementById('note-text') && document.getElementById('note-text').value) || '';
    if (!title && !String(text).trim()) { closeNoteSheet(); return; }
    if (window.__noteSheetKind === 'master' && typeof saveMasterNote === 'function') {
        saveMasterNote(window.__noteSheetId, title, text);
    } else {
        saveCharNote(window.__noteSheetId, title, text);
    }
    closeNoteSheet();
}
function saveCharNote(noteId, title, text) {
    const char = (typeof liveChar === 'function' && liveChar()) || findChar(activeCharId);
    if (!char) return;
    migrateCharNotes(char);
    if (noteId) {
        const note = char.notes.find(n => n.id === noteId);
        if (note) { note.title = title; note.text = text; }
    } else {
        char.notes.unshift({ id: newNoteId(), title: title, text: text });
    }
    persistLiveChar();
    renderCharNotes(char);
}
function deleteCharNote(noteId) {
    const char = (typeof liveChar === 'function' && liveChar()) || findChar(activeCharId);
    if (!char) return;
    migrateCharNotes(char);
    char.notes = char.notes.filter(n => n.id !== noteId);
    persistLiveChar();
    renderCharNotes(char);
}

function switchCharTab(tabId) {
    const tab = document.getElementById('tab-' + tabId);
    const btn = document.getElementById('btn-tab-' + tabId);
    if (!tab || !btn) return;
    document.querySelectorAll('.cs-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.cs-tab-btn').forEach(b => b.classList.remove('active'));
    tab.classList.add('active');
    btn.classList.add('active');
    const char = typeof liveChar === 'function' ? liveChar() : findChar(activeCharId);
    if (tabId === 'notes' && char) {
        migrateCharNotes(char);
        renderCharNotes(char);
    }
    if ((tabId === 'inv' || tabId === 'perks') && char && typeof renderInventoryAndPerks === 'function') {
        renderInventoryAndPerks(char);
    }
}

function autoResize() { this.style.height = 'auto'; this.style.height = (this.scrollHeight) + 'px'; }
document.querySelectorAll('textarea.term-textarea').forEach(ta => { ta.addEventListener('input', autoResize, false); });

// ==========================================================================
// 4. ИНВЕНТАРЬ, ОРУЖИЕ (V2) И ПЕРКИ (КОНТЕКСТ)
// ==========================================================================

function getWeaponCategoryIcon(cat, name) {
    return pipGlyph(weaponIconRel(name, cat));
}

function getIconForSlot(slotName) {
    return pipGlyph(modIconRel(slotName));
}

function escapePipHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function getEffectTooltip(qualities) {
    return renderQualities(qualities);
}

function renderQualities(qualities) {
    if (!qualities || qualities.length === 0) return 'Нет';
    const uniq = [];
    qualities.forEach(q => {
        const name = String(q || '').trim();
        if (name && uniq.indexOf(name) === -1) uniq.push(name);
    });
    if (!uniq.length) return 'Нет';
    return uniq.map(q => {
        return `<button type="button" class="pip-qual" data-qual="${escapePipHtml(q)}">${escapePipHtml(q)}</button>`;
    }).join(', ');
}

function openQualSheet(rawName) {
    const modal = document.getElementById('qual-modal');
    const title = document.getElementById('qual-title');
    const body = document.getElementById('qual-body');
    if (!modal || !title || !body) return;
    const name = (typeof normalizeQualName === 'function') ? normalizeQualName(rawName) : String(rawName || '');
    const text = (typeof getQualEffectText === 'function') ? getQualEffectText(rawName) : '';
    title.textContent = name || 'СВОЙСТВО';
    body.textContent = text;
    modal.classList.add('active');
}
function closeQualSheet() {
    document.getElementById('qual-modal').classList.remove('active');
}

function liveChar() {
    return findChar(activeCharId);
}

function emptyDrBase() {
    const o = {};
    Object.keys(HIT_LOCS).forEach(loc => { o[loc] = { phys: 0, eng: 0, rad: 0 }; });
    return o;
}

function ensureDrBase(char) {
    if (!char) return;
    if (char.drBase) {
        Object.keys(HIT_LOCS).forEach(loc => {
            if (!char.drBase[loc]) char.drBase[loc] = { phys: 0, eng: 0, rad: 0 };
        });
        return;
    }
    char.drBase = emptyDrBase();
    Object.keys(HIT_LOCS).forEach(loc => {
        HIT_LOCS[loc].fields.forEach((fid, i) => {
            const el = document.getElementById(fid);
            char.drBase[loc][DR_TYPES[i]] = el ? (parseInt(el.value, 10) || 0) : 0;
        });
    });
}

function updateDrBaseFromInput(el) {
    const char = liveChar();
    if (!char || !el || !el.id) return;
    const m = el.id.match(/^cs-dr-(head|larm|rarm|torso|lleg|rleg)-(phys|eng|rad)$/);
    if (!m) return;
    ensureDrBase(char);
    const loc = m[1], type = m[2];
    const gear = (typeof computeLocationDrFromGear === 'function') ? computeLocationDrFromGear(char.inventory) : {};
    const bonus = (gear[loc] && gear[loc][type]) || 0;
    const shown = parseInt(el.value, 10) || 0;
    char.drBase[loc][type] = shown - bonus;
}

function applyEquippedArmor(char, persist) {
    if (!char) return;
    ensureDrBase(char);
    const gear = (typeof computeLocationDrFromGear === 'function') ? computeLocationDrFromGear(char.inventory) : {};
    Object.keys(HIT_LOCS).forEach(loc => {
        const box = document.querySelector(`.cs-hit-loc[data-loc="${loc}"]`);
        const wornEl = document.getElementById('loc-worn-' + loc);
        const names = (typeof wornNamesForLoc === 'function') ? wornNamesForLoc(char.inventory, loc) : [];
        if (wornEl) wornEl.textContent = names.join(' · ');
        if (box) box.classList.toggle('is-worn', names.length > 0);
        HIT_LOCS[loc].fields.forEach((fid, i) => {
            const t = DR_TYPES[i];
            const el = document.getElementById(fid);
            if (!el) return;
            const base = (char.drBase[loc] && char.drBase[loc][t]) || 0;
            const bonus = (gear[loc] && gear[loc][t]) || 0;
            el.value = base + bonus;
        });
    });
    if (typeof syncPowerFrameUi === 'function') syncPowerFrameUi(char);
    calcCharSecondary();
    if (persist !== false) persistLiveChar();
}

function invalidateArmorUpgrade(item) {
    const def = getArmorDef(item);
    if (!def || !def.mods || def.mods.indexOf('upgrade') === -1) return;
    const u = ARMOR_UPGRADES[armorModIndex(item, 'upgrade')];
    if (u && u.name !== 'Нет' && !upgradeApplies(u, def, item.equipped)) item.mods.upgrade = 0;
}

function syncPowerFrameUi(char) {
    const framed = typeof charHasPowerFrame === 'function' && charHasPowerFrame(char);
    const hint = document.getElementById('cs-power-frame-hint');
    if (hint) hint.hidden = !framed;
    const strEl = document.getElementById('cs-str');
    if (strEl) {
        const box = strEl.closest('.cs-special-box');
        const frameStr = (typeof POWER_FRAME_STR === 'number') ? POWER_FRAME_STR : 11;
        if (framed) {
            strEl.value = frameStr;
            strEl.readOnly = true;
            strEl.max = String(frameStr);
            strEl.title = 'СИЛ каркаса силовой брони';
            if (box) box.classList.add('is-frame-locked');
        } else {
            strEl.readOnly = false;
            strEl.title = '';
            if (box) box.classList.remove('is-frame-locked');
            if (char && char['cs-str'] != null) strEl.value = char['cs-str'];
        }
    }
    const melee = document.getElementById('cs-stat-melee');
    const carry = document.getElementById('cs-stat-carry');
    if (melee) melee.classList.toggle('is-frame-locked', framed);
    if (carry) carry.classList.toggle('is-frame-locked', framed);
}

function unequipPowerArmorPieces(char) {
    if (!char) return;
    (char.inventory || []).forEach(it => {
        if (typeof isPowerArmorPiece === 'function' && isPowerArmorPiece(it) && it.equipped && it.equipped.length) {
            it.equipped = [];
        }
    });
}

function unequipConflicts(char, incoming, slots) {
    const kind = occupyingKind(incoming);
    (char.inventory || []).forEach(it => {
        if (it === incoming || !isArmorItem(it) || !it.equipped || !it.equipped.length) return;
        if (occupyingKind(it) !== kind) return;
        if (it.equipped.some(s => slots.indexOf(s) !== -1)) it.equipped = [];
    });
}

function confirmEquipArmor(idx, chosenLimb) {
    const char = liveChar();
    if (!char) return;
    const item = char.inventory[idx];
    if (!item || !isArmorItem(item)) return;
    normalizeArmorItem(item);
    const def = getArmorDef(item) || inferArmorDef(item);
    if (!def) return;
    const origin = document.getElementById('cs-origin') && document.getElementById('cs-origin').value;
    if (origin === 'Супермутант' && def.family !== 'raider' && def.family !== 'clothes') {
        pipNotify('Нельзя надеть', 'Супермутанты могут носить только рейдерскую броню.', { kind: 'warn' });
        return;
    }
    if (typeof isPowerArmorPiece === 'function' && isPowerArmorPiece(item) && !charHasPowerFrame(char)) {
        pipNotify('Нет каркаса', 'Нельзя надеть элемент силовой брони без надетого каркаса.', { kind: 'warn' });
        return;
    }
    const slots = resolveCoverageSlots(def, chosenLimb);
    if (!slots.length) return;
    unequipConflicts(char, item, slots);
    item.equipped = slots;
    invalidateArmorUpgrade(item);
    document.getElementById('equip-slot-modal').classList.remove('active');
    applyEquippedArmor(char);
    renderInventoryAndPerks(char);
}

function unequipArmor(idx) {
    const char = liveChar();
    if (!char) return;
    const item = char.inventory[idx];
    if (!item) return;
    const wasFrame = typeof isPowerArmorFrame === 'function' && isPowerArmorFrame(item);
    item.equipped = [];
    if (wasFrame) unequipPowerArmorPieces(char);
    applyEquippedArmor(char);
    renderInventoryAndPerks(char);
}

function startEquipArmor(idx) {
    const char = liveChar();
    if (!char) return;
    const item = char.inventory[idx];
    if (!item || !isArmorItem(item)) return;
    normalizeArmorItem(item);
    const def = getArmorDef(item) || inferArmorDef(item);
    if (!def) return;
    if (item.equipped && item.equipped.length) {
        unequipArmor(idx);
        return;
    }
    if (typeof isPowerArmorPiece === 'function' && isPowerArmorPiece(item) && !charHasPowerFrame(char)) {
        pipNotify('Нет каркаса', 'Нельзя надеть элемент силовой брони без надетого каркаса.', { kind: 'warn' });
        return;
    }
    const limbChoices = {
        limb: [['larm', 'Л. РУКА'], ['rarm', 'П. РУКА'], ['lleg', 'Л. НОГА'], ['rleg', 'П. НОГА']],
        arm: [['larm', 'Л. РУКА'], ['rarm', 'П. РУКА']],
        leg: [['lleg', 'Л. НОГА'], ['rleg', 'П. НОГА']]
    };
    const choices = limbChoices[def.coverage];
    if (choices) {
        const body = document.getElementById('equip-slot-body');
        body.innerHTML = '';
        choices.forEach(pair => {
            const btn = document.createElement('button');
            btn.className = 'term-btn';
            btn.textContent = pair[1];
            btn.onclick = () => confirmEquipArmor(idx, pair[0]);
            body.appendChild(btn);
        });
        document.getElementById('equip-slot-modal').classList.add('active');
        return;
    }
    confirmEquipArmor(idx, null);
}

function migrateWeaponAmmo(item) {
    if (!item || item.type !== 'weapon') return false;
    let changed = false;
    const extra = parseInt(item.totalAmmo, 10) || 0;
    if (extra > 0) {
        item.ammo = (parseInt(item.ammo, 10) || 0) + extra;
        item.totalAmmo = 0;
        changed = true;
    }
    if (item.ammo == null || item.ammo === undefined) { item.ammo = 0; changed = true; }
    if (item.ammo < 0) { item.ammo = 0; changed = true; }
    return changed;
}

function syncWeaponMagazine(item) {
    return migrateWeaponAmmo(item);
}

function changeAmmo(idx, delta) {
    const char = liveChar();
    let item = char.inventory[idx];
    migrateWeaponAmmo(item);
    item.ammo = (parseInt(item.ammo, 10) || 0) + delta;
    if (item.ammo < 0) item.ammo = 0;
    persistLiveChar();
    const val = document.getElementById(`ammo-val-${idx}`);
    if (val) val.innerText = item.ammo;
}

function reloadWeapon(idx) {
    changeAmmo(idx, 0);
}

function updateAmmoTotal(idx, val) {
    const char = liveChar();
    if (!char || !char.inventory[idx]) return;
    char.inventory[idx].ammo = Math.max(0, parseInt(val, 10) || 0);
    char.inventory[idx].totalAmmo = 0;
    persistLiveChar();
    const shown = document.getElementById(`ammo-val-${idx}`);
    if (shown) shown.innerText = char.inventory[idx].ammo;
}

let selectedInvIcon = '';

function invIconChoices() {
    const list = [];
    if (typeof PIP_ICONS === 'undefined') return list;
    Object.keys(PIP_ICONS.gun || {}).forEach(k => list.push(PIP_ICONS.gun[k]));
    Object.keys(PIP_ICONS.inventory || {}).forEach(k => list.push(PIP_ICONS.inventory[k]));
    if (PIP_ICONS.armor) list.push(PIP_ICONS.armor);
    list.push('map/569.svg');
    const uniq = [];
    list.forEach(p => { if (p && uniq.indexOf(p) === -1) uniq.push(p); });
    return uniq;
}
function defaultInvIcon(kind) {
    if (typeof PIP_ICONS === 'undefined') return 'inventory/отмычки.svg';
    if (kind === 'weapon-energy') return PIP_ICONS.gun.energy;
    if (kind === 'weapon-melee') return PIP_ICONS.gun.machete;
    if (kind === 'weapon-heavy') return PIP_ICONS.gun.minigun;
    if (kind === 'weapon-explosive') return PIP_ICONS.gun.mine;
    if (String(kind).indexOf('weapon') === 0) return PIP_ICONS.gun.pistol;
    if (kind === 'armor') return PIP_ICONS.armor;
    if (kind === 'ammo') return PIP_ICONS.inventory.ammo;
    if (kind === 'med') return PIP_ICONS.inventory.medkit;
    if (kind === 'chem') return PIP_ICONS.inventory.drugs;
    if (kind === 'food') return PIP_ICONS.inventory.food;
    return PIP_ICONS.inventory.lockpick;
}
function renderInvIconGrid() {
    const grid = document.getElementById('inv-icon-grid');
    if (!grid) return;
    if (!selectedInvIcon) selectedInvIcon = defaultInvIcon((document.getElementById('inv-kind') || {}).value || 'item');
    grid.innerHTML = '';
    invIconChoices().forEach(rel => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'inv-icon-pick' + (rel === selectedInvIcon ? ' active' : '');
        btn.innerHTML = pipGlyph(rel);
        btn.onclick = () => { selectedInvIcon = rel; renderInvIconGrid(); };
        grid.appendChild(btn);
    });
}
function syncInvKindFields() {
    const kindEl = document.getElementById('inv-kind');
    const kind = kindEl ? kindEl.value : 'item';
    const wep = document.getElementById('inv-weapon-fields');
    const arm = document.getElementById('inv-armor-fields');
    const qty = document.getElementById('inv-qty-fields');
    const isWep = String(kind).indexOf('weapon-') === 0;
    const isMelee = kind === 'weapon-melee';
    if (wep) wep.hidden = !isWep;
    if (arm) arm.hidden = kind !== 'armor';
    if (qty) qty.hidden = isWep || kind === 'armor';
    const ammoRow = document.getElementById('inv-wep-ammo-row');
    if (ammoRow) ammoRow.hidden = isMelee;
    if (isMelee) {
        const range = document.getElementById('inv-wep-range');
        if (range) range.value = 'Вплотную';
    }
    selectedInvIcon = defaultInvIcon(kind);
    renderInvIconGrid();
}
function openInvModal() {
    const title = document.getElementById('inv-title');
    const desc = document.getElementById('inv-desc');
    const kind = document.getElementById('inv-kind');
    if (title) title.value = '';
    if (desc) desc.value = '';
    if (kind) kind.value = 'item';
    const qty = document.getElementById('inv-qty');
    if (qty) qty.value = '1';
    const dmg = document.getElementById('inv-wep-dmg');
    if (dmg) dmg.value = '4';
    const fr = document.getElementById('inv-wep-fr');
    if (fr) fr.value = '2';
    const ammo = document.getElementById('inv-wep-ammo');
    if (ammo) ammo.value = '0';
    const ammoType = document.getElementById('inv-wep-ammo-type');
    if (ammoType) ammoType.value = '';
    const qual = document.getElementById('inv-wep-qual');
    if (qual) qual.value = '';
    ['inv-arm-phys', 'inv-arm-eng', 'inv-arm-rad'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '0';
    });
    selectedInvIcon = defaultInvIcon('item');
    syncInvKindFields();
    document.getElementById('inv-modal').classList.add('active');
}
function closeInvModal() { document.getElementById('inv-modal').classList.remove('active'); }
function customWeaponCategory(kind) {
    if (kind === 'weapon-energy') return 'Энергетическое';
    if (kind === 'weapon-melee') return 'Холодное';
    if (kind === 'weapon-heavy') return 'Тяжелое';
    if (kind === 'weapon-explosive') return 'Взрывчатка';
    return 'Стрелковое';
}
function saveInvItem() {
    if (!activeCharId) return;
    const title = (document.getElementById('inv-title').value || '').trim();
    const desc = (document.getElementById('inv-desc').value || '').trim();
    if (!title) return;
    const char = liveChar();
    if (!char) { closeInvModal(); return; }
    if (!char.inventory) char.inventory = [];
    const kind = (document.getElementById('inv-kind') || {}).value || 'item';
    const iconRel = selectedInvIcon || defaultInvIcon(kind);
    let packed;
    if (String(kind).indexOf('weapon-') === 0) {
        const quals = String((document.getElementById('inv-wep-qual') || {}).value || '').split(',').map(s => s.trim()).filter(Boolean);
        packed = {
            type: 'weapon', custom: true, id: Date.now().toString(),
            title, baseId: title, desc, iconRel,
            category: customWeaponCategory(kind),
            baseDamage: parseInt((document.getElementById('inv-wep-dmg') || {}).value, 10) || 0,
            fireRate: parseInt((document.getElementById('inv-wep-fr') || {}).value, 10) || 0,
            dmgType: (document.getElementById('inv-wep-type') || {}).value || 'Физический',
            range: (document.getElementById('inv-wep-range') || {}).value || 'Ближняя',
            ammoType: (document.getElementById('inv-wep-ammo-type') || {}).value || '',
            ammo: parseInt((document.getElementById('inv-wep-ammo') || {}).value, 10) || 0,
            qualities: quals, mods: {}, slots: {}
        };
    } else if (kind === 'armor') {
        packed = {
            type: 'armor', custom: true, id: Date.now().toString(),
            title, baseId: title, desc, iconRel, category: 'Броня',
            phys: parseInt((document.getElementById('inv-arm-phys') || {}).value, 10) || 0,
            eng: parseInt((document.getElementById('inv-arm-eng') || {}).value, 10) || 0,
            rad: parseInt((document.getElementById('inv-arm-rad') || {}).value, 10) || 0,
            mods: {}, equipped: []
        };
    } else {
        const catMap = { ammo: 'Боеприпасы', med: 'Аптечка', chem: 'Препараты', food: 'Еда', item: 'Разное' };
        packed = {
            type: kind === 'ammo' ? 'ammo' : 'custom',
            kind, custom: true, id: Date.now().toString(),
            title, desc, iconRel,
            category: catMap[kind] || 'Разное',
            qty: parseInt((document.getElementById('inv-qty') || {}).value, 10) || 0
        };
    }
    char.inventory.push(packed);
    persistLiveChar();
    renderInventoryAndPerks(char);
    closeInvModal();
}

function resolveWeaponData(item) {
    if (!item || item.type !== 'weapon') return null;
    if (item.custom) {
        const quals = Array.isArray(item.qualities)
            ? item.qualities.slice()
            : String(item.qualities || '').split(',').map(s => s.trim()).filter(Boolean);
        return {
            category: item.category || 'Стрелковое',
            baseDamage: parseInt(item.baseDamage, 10) || 0,
            fireRate: parseInt(item.fireRate, 10) || 0,
            type: item.dmgType || 'Физический',
            range: item.range || 'Ближняя',
            qualities: quals,
            slots: item.slots || {},
            ammoType: item.ammoType || '',
            aliases: item.aliases || []
        };
    }
    const found = (typeof findWeaponByName === 'function')
        ? findWeaponByName(item.baseId || item.title)
        : (typeof masterDB !== 'undefined' && masterDB.weapons && masterDB.weapons[item.baseId]);
    return found || null;
}

function deleteCharItem(idx) {
    const char = liveChar();
    if (!char || !char.inventory) return;
    const item = char.inventory[idx];
    const wasWorn = item && item.equipped && item.equipped.length;
    const wasFrame = wasWorn && typeof isPowerArmorFrame === 'function' && isPowerArmorFrame(item);
    char.inventory.splice(idx, 1);
    if (wasFrame) unequipPowerArmorPieces(char);
    if (wasWorn) applyEquippedArmor(char, false);
    persistLiveChar();
    renderInventoryAndPerks(char);
}
function deleteCharPerk(idx) { const char = liveChar(); if(char && char.perks) { char.perks.splice(idx, 1); persistLiveChar(); renderInventoryAndPerks(char); } }

let dbPickerMode = 'inv';
let activeDbTab = 'Все';
const dbTabsConfig = {
    'inv': ["Все", "Стрелковое", "Энерго", "Холодное", "Тяжелое", "Взрывчатка", "Броня", "Аптечка", "Препараты", "Еда", "Патроны", "Прочее"],
    'perks': ["Все", "СИЛ", "ВСП", "ВЫН", "ХАР", "ИНТ", "ЛВК", "УДЧ"]
};

function resetDbPickerFilters() {
    activeDbTab = 'Все';
    const search = document.getElementById('db-picker-search');
    if (search) search.value = '';
}

function closeDbPicker() {
    const modal = document.getElementById('db-picker-modal');
    if (modal) modal.classList.remove('active');
    resetDbPickerFilters();
}

function openMasterInvModal() {
    dbPickerMode = 'inv';
    resetDbPickerFilters();
    document.getElementById('db-picker-title').innerText = 'БАЗА: ПРЕДМЕТЫ И ОРУЖИЕ';
    document.getElementById('db-picker-modal').classList.add('active');
    renderDbTabs(); filterDbPicker();
}

function openContextPerks() {
    dbPickerMode = 'perks';
    resetDbPickerFilters();
    document.getElementById('db-picker-title').innerText = 'БАЗА: ПЕРКИ';
    document.getElementById('db-picker-modal').classList.add('active');
    renderDbTabs(); filterDbPicker();
}

function renderDbTabs() {
    const container = document.getElementById('db-tabs-container'); container.innerHTML = '';
    dbTabsConfig[dbPickerMode].forEach(tab => {
        const btn = document.createElement('button');
        btn.className = `cs-tab-btn ${tab === activeDbTab ? 'active' : ''}`;
        btn.innerText = tab;
        btn.onclick = () => { activeDbTab = tab; renderDbTabs(); filterDbPicker(); };
        container.appendChild(btn);
    });
}

function checkRequirements(reqStr, char) {
    if (typeof perkMeetsChar === 'function') return perkMeetsChar(reqStr, char);
    if (!reqStr || reqStr === "Нет") return true;
    let reqs = reqStr.split(','); let pass = true;
    reqs.forEach(r => {
        if(r.includes('СИЛ') && char['cs-str'] < parseInt(r.replace(/\D/g,''))) pass = false;
        if(r.includes('ВСП') && char['cs-per'] < parseInt(r.replace(/\D/g,''))) pass = false;
        if(r.includes('ВЫН') && char['cs-end'] < parseInt(r.replace(/\D/g,''))) pass = false;
        if(r.includes('ХАР') && char['cs-cha'] < parseInt(r.replace(/\D/g,''))) pass = false;
        if(r.includes('ИНТ') && char['cs-int'] < parseInt(r.replace(/\D/g,''))) pass = false;
        if(r.includes('ЛВК') && char['cs-agi'] < parseInt(r.replace(/\D/g,''))) pass = false;
        if(r.includes('УДЧ') && char['cs-luc'] < parseInt(r.replace(/\D/g,''))) pass = false;
        if((r.includes('Ур.') || /Уровень/i.test(r)) && char['cs-lvl'] < parseInt(r.replace(/\D/g,''))) pass = false;
        if(/не робот/i.test(r) && char['cs-origin'] === 'Мистер Помощник') pass = false;
    });
    return pass;
}

function pickerNorm(s) {
    return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/gi, '');
}

function findWeaponByName(name) {
    if (typeof masterDB === 'undefined' || !masterDB.weapons) return null;
    if (name && masterDB.weapons[name]) return masterDB.weapons[name];
    const compact = pickerNorm(name);
    if (!compact) return null;
    const keys = Object.keys(masterDB.weapons);
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const w = masterDB.weapons[k];
        if (!w) continue;
        if (pickerNorm(k) === compact) return w;
        const aliases = w.aliases || [];
        for (let a = 0; a < aliases.length; a++) {
            if (pickerNorm(aliases[a]) === compact) return w;
        }
    }
    return null;
}

function pickerQueryMatch(q, parts) {
    if (!q) return true;
    const hay = String(parts || '');
    const nq = pickerNorm(q);
    if (nq && pickerNorm(hay).indexOf(nq) !== -1) return true;
    const tokens = String(q).toLowerCase().replace(/ё/g, 'е').split(/\s+/).filter(Boolean);
    const hayLow = hay.toLowerCase().replace(/ё/g, 'е');
    return tokens.length > 0 && tokens.every(t => hayLow.indexOf(t) !== -1 || pickerNorm(hayLow).indexOf(pickerNorm(t)) !== -1);
}

function weaponPickerHaystack(wKey, w) {
    const ammo = (typeof getWeaponAmmoType === 'function') ? getWeaponAmmoType(wKey, null) : (w && w.ammoType) || '';
    return [wKey, (w && w.aliases || []).join(' '), w && w.category, w && w.type, ((w && w.qualities) || []).join(' '), ammo].join(' ');
}

function itemPickerHaystack(i) {
    return [i && i.name, i && i.category, i && i.desc, i && i.type].join(' ');
}

function filterDbPicker() {
    const searchEl = document.getElementById('db-picker-search');
    const q = searchEl ? searchEl.value.trim().toLowerCase() : '';
    const list = document.getElementById('db-picker-list');
    if (!list) return;
    list.innerHTML = '';
    const char = liveChar();
    if (typeof masterDB === 'undefined') { list.innerHTML = 'База данных не подключена'; return; }
    const useTab = !q;
    let shown = 0;

    function addStatus(text) {
        const meta = document.createElement('div');
        meta.className = 'db-picker-status';
        meta.textContent = text;
        list.appendChild(meta);
    }

    try {
        if (dbPickerMode === 'inv') {
            Object.keys(masterDB.weapons || {}).forEach(wKey => {
                try {
                    const w = masterDB.weapons[wKey];
                    if (!w) return;
                    const cat = w.category || '';
                    let matchTab = !useTab || activeDbTab === 'Все' ||
                                   (activeDbTab === 'Стрелковое' && cat === 'Стрелковое') ||
                                   (activeDbTab === 'Энерго' && cat === 'Энергетическое') ||
                                   (activeDbTab === 'Холодное' && (cat === 'Холодное' || cat === 'Рукопашное' || cat === 'Оружие ближнего боя')) ||
                                   (activeDbTab === 'Тяжелое' && cat === 'Тяжелое') ||
                                   (activeDbTab === 'Взрывчатка' && cat === 'Взрывчатка');
                    if (!(matchTab && pickerQueryMatch(q, weaponPickerHaystack(wKey, w)))) return;
                    let div = document.createElement('div');
                    div.className = 'db-item-row';
                    const catLabel = (cat || 'Оружие').toUpperCase();
                    div.innerHTML = `${pipGlyph(weaponIconRel(wKey, cat), 'db-item-glyph')}<span>[${catLabel}] ${wKey}</span>`;
                    div.onclick = () => {
                        if (!char) { pipNotify('Нет листа', 'Откройте лист персонажа, чтобы добавить предмет.', { kind: 'warn' }); return; }
                        let newWep = { type: 'weapon', baseId: wKey, mods: {}, ammo: 0, totalAmmo: 0 };
                        for (let s in (w.slots || {})) newWep.mods[s] = 0;
                        if (!char.inventory) char.inventory = [];
                        char.inventory.push(newWep); persistLiveChar();
                        closeDbPicker(); renderInventoryAndPerks(char);
                    };
                    list.appendChild(div);
                    shown++;
                } catch (e) { console.warn('picker weapon', wKey, e); }
            });
            (Array.isArray(masterDB.items) ? masterDB.items : []).forEach(i => {
                try {
                    if (!i || !i.name) return;
                    const cat = i.category || '';
                    let matchTab = !useTab || activeDbTab === 'Все' ||
                                   (activeDbTab === 'Броня' && (i.type === 'armor' || /одежд|брон|шлем|комбинезон|обмундир|силов|голов|собак|робот|охранник|волт/i.test(cat))) ||
                                   (activeDbTab === 'Аптечка' && cat === 'Аптечка') ||
                                   (activeDbTab === 'Препараты' && cat === 'Препараты') ||
                                   (activeDbTab === 'Еда' && (cat === 'Еда' || cat === 'Напитки')) ||
                                   (activeDbTab === 'Патроны' && cat === 'Боеприпасы') ||
                                   (activeDbTab === 'Прочее' && (cat === 'Разное' || cat === 'Расходники' || !cat));
                    if (!(matchTab && pickerQueryMatch(q, itemPickerHaystack(i)))) return;
                    let div = document.createElement('div');
                    div.className = 'db-item-row';
                    div.innerHTML = `${pipGlyph(itemIconRel(i), 'db-item-glyph')}<span>[${(cat || 'Предмет').toUpperCase()}] ${i.name}</span>`;
                    div.onclick = () => {
                        if (!char) { pipNotify('Нет листа', 'Откройте лист персонажа, чтобы добавить предмет.', { kind: 'warn' }); return; }
                        if (!char.inventory) char.inventory = [];
                        const isArm = i.type === 'armor' || (typeof getArmorDef === 'function' && getArmorDef({ title: i.name }));
                        const packed = isArm
                            ? { type: 'armor', baseId: i.name, title: i.name, desc: i.desc, itemType: 'armor', category: i.category, mods: { lining: 0, material: 0, upgrade: 0 }, equipped: [] }
                            : { type:'db_item', title: i.name, desc: i.desc, itemType: i.type, category: i.category };
                        char.inventory.push(packed); persistLiveChar();
                        closeDbPicker(); renderInventoryAndPerks(char);
                    };
                    list.appendChild(div);
                    shown++;
                } catch (e) { console.warn('picker item', i && i.name, e); }
            });
        } else {
            (Array.isArray(masterDB.perks) ? masterDB.perks : []).forEach(p => {
                try {
                    if (!p || !p.name) return;
                    let matchTab = !useTab || activeDbTab === 'Все' || (p.reqStr || '').includes(activeDbTab.replace('ВСПР', 'ВСП'));
                    if (!(matchTab && pickerQueryMatch(q, [p.name, p.desc, p.reqStr].join(' ')))) return;
                    const isPass = char ? checkRequirements(p.reqStr, char) : false;
                    let div = document.createElement('div');
                    div.className = 'db-perk-card' + (isPass ? ' is-ready' : ' is-locked');
                    const badge = isPass ? 'ДОСТУПНО' : (p.reqStr || 'НЕДОСТУПНО');
                    div.innerHTML = `<div class="db-perk-head"><b class="db-perk-name ${isPass ? 'req-pass' : 'req-fail'}">${escapePipHtml(p.name)}</b><span class="db-perk-badge ${isPass ? 'req-pass' : 'req-fail'}">${escapePipHtml(badge)}</span></div><div class="db-perk-desc">${escapePipHtml(p.desc || '')}</div>`;
                    div.onclick = () => {
                        if (!char) { pipNotify('Нет листа', 'Откройте лист персонажа, чтобы добавить перк.', { kind: 'warn' }); return; }
                        if (!char.perks) char.perks = [];
                        if (!char.perks.includes(p.name)) { char.perks.push(p.name); persistLiveChar(); renderInventoryAndPerks(char);}
                        closeDbPicker();
                    };
                    list.appendChild(div);
                    shown++;
                } catch (e) { console.warn('picker perk', p && p.name, e); }
            });
        }
    } catch (e) {
        console.warn('filterDbPicker', e);
        addStatus('Ошибка фильтра. Откройте вкладку «Все» или очистите поиск.');
        return;
    }
    if (!shown) addStatus(q ? 'Ничего не найдено. Попробуйте другое слово или вкладку «Все».' : 'Каталог пуст.');
    else {
        const meta = document.createElement('div');
        meta.className = 'db-picker-status';
        meta.textContent = shown + ' позиций' + (q ? ' по поиску' : '');
        list.insertBefore(meta, list.firstChild);
    }
}

function fillModRows(body, entries, activeIdx, onPick) {
    body.innerHTML = '';
    entries.forEach((m, idx) => {
        const div = document.createElement('div');
        const selected = idx === activeIdx;
        div.className = `db-item-row ${selected ? 'active' : ''}`;
        div.style.flexDirection = 'column'; div.style.gap = '5px';
        if (selected) { div.style.borderColor = 'var(--pip-green)'; div.style.background = 'rgba(20,254,20,0.1)'; }
        const iconSlot = m.iconSlot || m.slot || '';
        div.innerHTML = `<div style="display:flex; gap:10px; align-items:flex-start; width:100%;">${pipGlyph(modIconRel(iconSlot), 'db-item-glyph')}<div style="display:flex; flex-direction:column; gap:5px; min-width:0;"><b>${escapePipHtml(m.name)}</b><span style="font-size:0.9rem">${escapePipHtml(m.hint || '')}</span></div></div>`;
        div.onclick = () => onPick(idx, m);
        body.appendChild(div);
    });
}

function openModPicker(itemIdx, slot) {
    const char = liveChar();
    if (!char) return;
    const item = char.inventory[itemIdx];
    const modal = document.getElementById('mod-modal');
    const body = document.getElementById('mod-modal-body');

    if (item && isArmorItem(item)) {
        normalizeArmorItem(item);
        const def = getArmorDef(item);
        const choices = getArmorModChoices(item, slot);
        if (!choices.length) { pipNotify('Слот недоступен', 'Для этой брони этот слот недоступен.', { kind: 'warn' }); return; }
        document.getElementById('mod-modal-title').innerText = `СЛОТ: ${(ARMOR_SLOT_LABELS && ARMOR_SLOT_LABELS[slot]) || slot}`;
        let activeIdx = 0;
        if (slot === 'upgrade') {
            const stored = ARMOR_UPGRADES[armorModIndex(item, 'upgrade')];
            activeIdx = Math.max(0, choices.findIndex(c => stored && c.name === stored.name));
        } else {
            activeIdx = armorModIndex(item, slot);
        }
        fillModRows(body, choices.map(c => Object.assign({ iconSlot: slot }, c)), activeIdx, (idx, m) => {
            if (slot === 'upgrade') {
                const real = ARMOR_UPGRADES.findIndex(u => u.name === m.name);
                item.mods.upgrade = real >= 0 ? real : 0;
            } else {
                item.mods[slot] = idx;
            }
            persistLiveChar();
            if (item.equipped && item.equipped.length) applyEquippedArmor(char, false);
            modal.classList.remove('active');
            renderInventoryAndPerks(char);
            saveActiveCharLive();
        });
        modal.classList.add('active');
        return;
    }

    if (!masterDB.weapons || !masterDB.weapons[item.baseId] || !masterDB.weapons[item.baseId].slots[slot]) {
        pipNotify('Нет слота', 'Слот не найден в базе данных.', { kind: 'error' });
        return;
    }
    const mods = masterDB.weapons[item.baseId].slots[slot];
    const activeMod = item.mods[slot] || 0;
    document.getElementById('mod-modal-title').innerText = `СЛОТ: ${slot}`;
    fillModRows(body, mods.map(m => Object.assign({ iconSlot: slot }, m)), activeMod, (idx) => {
        item.mods[slot] = idx;
        persistLiveChar();
        modal.classList.remove('active');
        renderInventoryAndPerks(char);
    });
    modal.classList.add('active');
}

function renderInventoryAndPerks(char) {
    const invList = document.getElementById('cs-inv-list');
    invList.innerHTML = '';
    const caps = parseInt(char.caps, 10) || 0;
    invList.insertAdjacentHTML('beforeend', `
        <div class="cs-inv-card caps-card">
            <div class="cs-inv-icon">${pipGlyph('map/569.svg')}</div>
            <div class="cs-inv-body">
                <div class="cs-inv-title">Крышки</div>
                <div class="caps-controls">
                    <button type="button" class="caps-btn" onclick="event.stopPropagation(); changeCaps(-10)">-10</button>
                    <button type="button" class="caps-btn" onclick="event.stopPropagation(); changeCaps(-1)">−</button>
                    <span class="caps-val" id="caps-val">${caps}</span>
                    <button type="button" class="caps-btn" onclick="event.stopPropagation(); changeCaps(1)">+</button>
                    <button type="button" class="caps-btn" onclick="event.stopPropagation(); changeCaps(10)">+10</button>
                </div>
            </div>
        </div>`);
    let magDirty = false;
    if (char.inventory) {
        char.inventory.forEach((item, index) => {
            try {
            const wData = resolveWeaponData(item);
            if (wData) {
                let cDmg = wData.baseDamage, cFr = wData.fireRate, cQual = [...(wData.qualities || [])], cRng = wData.range;
                
                for (let slot in (item.mods || {})) {
                    if (wData.slots && wData.slots[slot]) {
                        const modIdx = item.mods[slot];
                        if (modIdx !== undefined && wData.slots[slot][modIdx]) {
                            const modEf = wData.slots[slot][modIdx].effects;
                            if (modEf.dmg) cDmg += modEf.dmg;
                            if (modEf.isSetDmg) cDmg = modEf.dmg;
                            if (modEf.fr) cFr += modEf.fr;
                            if (modEf.addQ) cQual.push(...modEf.addQ);
                            if (modEf.remQ) cQual = cQual.filter(q => !modEf.remQ.includes(q));
                            if (modEf.type) { /* damage type override unused in UI type field */ }
                        }
                    }
                }
                if (syncWeaponMagazine(item)) magDirty = true;
                const ammoType = item.ammoType || ((typeof getWeaponAmmoType === 'function') ? getWeaponAmmoType(item.baseId, item) : '') || wData.ammoType || '';
                
                let isMelee = (wData.category === 'Холодное' || wData.category === 'Рукопашное' || wData.category === 'Оружие ближнего боя');
                let ammoHtml = (isMelee && !ammoType) ? '' : `
                    <div class="wep-ammo-panel">
                        <div class="ammo-controls"><span style="font-size: 0.9rem; opacity: 0.8;">КОЛ-ПАТРОН:</span><button class="ammo-btn" onclick="changeAmmo(${index}, -1)">-</button><span class="ammo-text" id="ammo-val-${index}">${item.ammo || 0}</span><button class="ammo-btn" onclick="changeAmmo(${index}, 1)">+</button></div>
                        ${ammoType ? `<div class="ammo-type-label">ТИП: ${escapePipHtml(ammoType)}</div>` : ''}
                    </div>`;

                const wepIcon = pipGlyph(item.iconRel || weaponIconRel(item.baseId || item.title, wData.category));
                let html = `
                    <div class="wep-card-v2">
                        <div class="wep-top-v2">
                            <div class="wep-img-box">${wepIcon}</div>
                            <div class="wep-info-v2">
                                <div class="wep-header-v2">
                                    <div><h2 class="wep-title-v2">${escapePipHtml((typeof weaponDisplayName === 'function' ? weaponDisplayName(item) : null) || item.title || item.baseId)}</h2><p class="wep-cat-v2">${escapePipHtml(wData.category)}</p></div>
                                    <button class="term-btn danger" style="padding: 2px 5px;" onclick="deleteCharItem(${index})">X</button>
                                </div>
                                <div class="wep-stats-grid">
                                    <div class="wep-stat-box"><span class="wep-stat-label">УРОН</span><span class="wep-stat-val ${cDmg !== wData.baseDamage ? 'modified':''}">${cDmg} БК</span></div>
                                    <div class="wep-stat-box"><span class="wep-stat-label">ТИП</span><span class="wep-stat-val">${escapePipHtml(wData.type)}</span></div>
                                    <div class="wep-stat-box"><span class="wep-stat-label">СКОРОСТР.</span><span class="wep-stat-val ${cFr !== wData.fireRate ? 'modified':''}">${cFr}</span></div>
                                    <div class="wep-stat-box"><span class="wep-stat-label">ДИСТАНЦИЯ</span><span class="wep-stat-val">${escapePipHtml(cRng)}</span></div>
                                </div>
                                <div class="wep-qualities">Свойства: ${renderQualities(cQual)}</div>
                            </div>
                        </div>
                        ${ammoHtml}`;
                
                let slotsInner = '';
                for (let slot in (wData.slots || {})) {
                    const modsArray = wData.slots[slot];
                    if (!modsArray || modsArray.length === 0) continue;
                    const modIdx = (item.mods && item.mods[slot] !== undefined && item.mods[slot] < modsArray.length) ? item.mods[slot] : 0;
                    const mData = modsArray[modIdx];
                    slotsInner += `<div class="slot-card-v2 ${modIdx > 0 ? 'active' : ''}" onclick="openModPicker(${index}, '${slot}')">
                                <div class="slot-icon-v2">${getIconForSlot(slot)}</div>
                                <div class="slot-title-v2">${escapePipHtml(slot)}</div>
                                <div class="slot-desc-v2">${modIdx > 0 && mData ? escapePipHtml(mData.name) : '<i>Нажмите для выбора</i>'}</div>
                             </div>`;
                }
                if (slotsInner) html += `<div class="wep-slots-v2">${slotsInner}</div>`;
                html += `</div>`;
                invList.insertAdjacentHTML('beforeend', html);
            } else if (typeof isArmorItem === 'function' && isArmorItem(item)) {
                normalizeArmorItem(item);
                const def = getArmorDef(item);
                const tot = getArmorTotals(item);
                const worn = item.equipped && item.equipped.length;
                const wornLabel = worn ? item.equipped.map(s => (HIT_LOCS[s] && HIT_LOCS[s].label) || s).join(', ') : '';
                let slotsHtml = '';
                if (def && def.mods) {
                    def.mods.forEach(slot => {
                        const choices = getArmorModChoices(item, slot);
                        if (!choices.length) return;
                        let selectedName = '';
                        if (slot === 'upgrade') {
                            const u = ARMOR_UPGRADES[armorModIndex(item, 'upgrade')];
                            selectedName = (u && u.name && u.name !== 'Нет') ? u.name : '';
                        } else {
                            const arr = slot === 'lining' ? getArmorLiningMods(def) : getArmorMaterialMods(def);
                            const m = arr[armorModIndex(item, slot)];
                            selectedName = (m && m.name && m.name !== 'Нет') ? m.name : '';
                        }
                        const label = (ARMOR_SLOT_LABELS && ARMOR_SLOT_LABELS[slot]) || slot;
                        slotsHtml += `<div class="slot-card-v2 ${selectedName ? 'active' : ''}" onclick="openModPicker(${index}, '${slot}')">
                                <div class="slot-icon-v2">${getIconForSlot(label)}</div>
                                <div class="slot-title-v2">${escapePipHtml(label)}</div>
                                <div class="slot-desc-v2">${selectedName ? escapePipHtml(selectedName) : '<i>Нажмите для выбора</i>'}</div>
                             </div>`;
                    });
                }
                const specialHtml = tot.special
                    ? `<div class="wep-qualities">${escapePipHtml(tot.special)}</div>`
                    : '';
                invList.insertAdjacentHTML('beforeend', `
                    <div class="wep-card-v2 armor-card ${worn ? 'is-equipped' : ''}">
                        <div class="wep-top-v2">
                            <div class="wep-img-box">${pipGlyph(itemIconRel(item))}</div>
                            <div class="wep-info-v2">
                                <div class="wep-header-v2">
                                    <div><h2 class="wep-title-v2">${escapePipHtml(item.title || item.baseId)}</h2><p class="wep-cat-v2">${escapePipHtml(item.category || 'Броня')}</p></div>
                                    <button class="term-btn danger" style="padding: 2px 5px;" onclick="deleteCharItem(${index})">X</button>
                                </div>
                                <div class="wep-stats-grid">
                                    <div class="wep-stat-box"><span class="wep-stat-label">ФИЗ</span><span class="wep-stat-val">${tot.phys}</span></div>
                                    <div class="wep-stat-box"><span class="wep-stat-label">ЭНГ</span><span class="wep-stat-val">${tot.eng}</span></div>
                                    <div class="wep-stat-box"><span class="wep-stat-label">РАД</span><span class="wep-stat-val">${tot.rad}</span></div>
                                </div>
                                ${worn ? `<div class="armor-worn">НАДЕТО: ${escapePipHtml(wornLabel)}</div>` : ''}
                                ${specialHtml}
                                <div class="cs-inv-actions">
                                    <button class="term-btn" onclick="startEquipArmor(${index})">${worn ? 'СНЯТЬ' : 'НАДЕТЬ'}</button>
                                </div>
                            </div>
                        </div>
                        ${slotsHtml ? `<div class="wep-slots-v2">${slotsHtml}</div>` : ''}
                    </div>`);
            } else {
                invList.insertAdjacentHTML('beforeend', `<div class="cs-inv-card"><button class="cs-inv-del" onclick="deleteCharItem(${index})">X</button><div class="cs-inv-icon">${pipGlyph(itemIconRel(item))}</div><div class="cs-inv-body"><div class="cs-inv-title">${escapePipHtml(item.title || item.name || item.baseId)}</div><div class="cs-inv-desc">${escapePipHtml(item.desc || '')}</div>${item.qty != null ? `<div class="caps-controls"><button type="button" class="caps-btn" onclick="event.stopPropagation(); changeCustomQty(${index}, -1)">−</button><span class="caps-val" id="custom-qty-${index}">${parseInt(item.qty, 10) || 0}</span><button type="button" class="caps-btn" onclick="event.stopPropagation(); changeCustomQty(${index}, 1)">+</button></div>` : ''}</div></div>`);
            }
            } catch (invErr) {
                console.warn('inv card', index, invErr);
                invList.insertAdjacentHTML('beforeend', `<div class="cs-inv-card"><button class="cs-inv-del" onclick="deleteCharItem(${index})">X</button><div class="cs-inv-body"><div class="cs-inv-title">${escapePipHtml((item && (item.title || item.name || item.baseId)) || 'Предмет')}</div><div class="cs-inv-desc">Карточка не собралась — предмет на листе сохранён.</div></div></div>`);
            }
        });
    }
    if (magDirty) persistLiveChar();

    const perksList = document.getElementById('cs-perks-list'); perksList.innerHTML = '';
    if (char.perks) {
        char.perks.forEach((pName, index) => {
            const pData = (masterDB.perks && Array.isArray(masterDB.perks)) ? masterDB.perks.find(p => p.name === pName) : null;
            const req = (pData && pData.reqStr && pData.reqStr !== 'Нет') ? `<div class="perk-card-req">${escapePipHtml(pData.reqStr)}</div>` : '';
            const desc = pData ? `<div class="perk-card-desc">${escapePipHtml(pData.desc || '')}</div>` : '';
            perksList.insertAdjacentHTML('beforeend', `<div class="perk-card"><div class="perk-card-head"><div class="perk-card-title">${escapePipHtml(pName)}</div><button type="button" class="perk-card-del" onclick="deleteCharPerk(${index})" aria-label="Удалить">X</button></div>${req}${desc}</div>`);
        });
    }
}
renderChars();

document.getElementById('cs-inv-list').addEventListener('click', (e) => {
    const btn = e.target.closest('.pip-qual');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    openQualSheet(btn.getAttribute('data-qual'));
});

// ==========================================================================
// 5. КАРТА
// ==========================================================================
function pipNoopMap() {
    return {
        on: function () { return this; },
        off: function () { return this; },
        invalidateSize: function () {},
        removeLayer: function () { return this; },
        addLayer: function () { return this; },
        flyTo: function () { return this; },
        setView: function () { return this; },
        distance: function () { return 0; }
    };
}
let map = pipNoopMap();
try {
    if (typeof L === 'undefined') throw new Error('leaflet unavailable');
    const mapEl = document.getElementById('map-area');
    if (!mapEl) throw new Error('map container missing');
    map = L.map(mapEl, { crs: L.CRS.EPSG3395, zoomControl: false, attributionControl: false, maxZoom: 17 }).setView([38.8951, -77.0364], 12);
    L.tileLayer('https://core-sat.maps.yandex.net/tiles?l=sat&x={x}&y={y}&z={z}', { maxZoom: 19, className: 'yandex-sat-base' }).addTo(map);
    L.tileLayer('https://core-renderer-tiles.maps.yandex.net/tiles?l=skl&x={x}&y={y}&z={z}&scale=1&lang=ru_RU', { maxZoom: 19, className: 'yandex-roads-overlay' }).addTo(map);
} catch (e) {
    map = pipNoopMap();
}

const geoScanner = document.getElementById('geo-scanner'); let hoverTimer = null; let searchMarker = null;
const GEO_NAME_MAX = 22;
function setFooterGeoVisible(on) {
    const el = document.getElementById('footer-geo');
    if (el) el.classList.toggle('is-visible', !!on);
}
function setGeoScanner(message, asLocation) {
    if (!geoScanner) return;
    let text = String(message || 'НЕИЗВЕСТНО').toUpperCase();
    if (asLocation) {
        if (text.length > GEO_NAME_MAX) text = text.slice(0, GEO_NAME_MAX - 1) + '...';
        text = 'ЛОКАЦИЯ: ' + text;
    } else if (text.length > 28) {
        text = text.slice(0, 27) + '...';
    }
    geoScanner.textContent = text;
}
function syncMapScrim() {
    const mapView = document.getElementById('view-map');
    if (!mapView) return;
    const drawerOpen = !!(document.getElementById('info-drawer') && document.getElementById('info-drawer').classList.contains('open'));
    const compact = (typeof isCompactUI === 'function') ? isCompactUI() : window.matchMedia('(max-width: 860px)').matches;
    const searchOpen = compact && document.getElementById('search-panel') && document.getElementById('search-panel').classList.contains('active');
    mapView.classList.toggle('sheet-open', !!(drawerOpen || searchOpen));
}
function closeSearchPanel() {
    const panel = document.getElementById('search-panel');
    const btn = document.getElementById('toggle-search');
    const input = document.getElementById('search-input');
    if (!panel) return;
    panel.classList.remove('active');
    if (btn) btn.classList.remove('active');
    if (input) input.value = '';
    if (typeof searchMarker !== 'undefined' && searchMarker) { map.removeLayer(searchMarker); searchMarker = null; }
    syncMapScrim();
}
function closeMapOverlays() {
    closeDrawerMap();
    closeSearchPanel();
}
map.on('mousemove', (e) => {
    if (document.getElementById('footer-geo') && !document.getElementById('footer-geo').classList.contains('is-visible')) return;
    clearTimeout(hoverTimer);
    setGeoScanner('СКАНИРОВАНИЕ...', false);
    hoverTimer = setTimeout(async () => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&accept-language=ru`);
            const data = await res.json();
            if (data && data.display_name) {
                const parts = data.display_name.split(', ');
                setGeoScanner(`${parts[0]}${parts[1] ? ', ' + parts[1] : ''}`, true);
            } else {
                setGeoScanner('ПУСТОШЬ', true);
            }
        } catch (err) {
            setGeoScanner('ОШИБКА СВЯЗИ', false);
        }
    }, 1000);
});

const toggleSearchBtn = document.getElementById('toggle-search'); const searchPanel = document.getElementById('search-panel'); const searchInput = document.getElementById('search-input'); const closeSearchBtn = document.getElementById('close-search');
if (toggleSearchBtn) toggleSearchBtn.addEventListener('click', () => {
    if (isEditorActive && toggleEditorBtn) toggleEditorBtn.click();
    if (isRulerActive && toggleRulerBtn) toggleRulerBtn.click();
    const drawer = document.getElementById('info-drawer');
    const willOpen = !searchPanel.classList.contains('active');
    if (willOpen && drawer && drawer.classList.contains('open')) closeDrawerMap();
    searchPanel.classList.toggle('active', willOpen);
    toggleSearchBtn.classList.toggle('active', willOpen);
    if (willOpen) searchInput.focus();
    else {
        searchInput.value = '';
        if (searchMarker) { map.removeLayer(searchMarker); searchMarker = null; }
    }
    syncMapScrim();
});
closeSearchBtn && closeSearchBtn.addEventListener('click', () => closeSearchPanel());
if (searchInput) searchInput.addEventListener('keypress', async (e) => { if (e.key === 'Enter' && searchInput.value.trim()) { const query = searchInput.value.trim(); const originalPlaceholder = searchInput.placeholder; searchInput.value = ''; searchInput.placeholder = 'СКАНИРОВАНИЕ...'; try { const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=ru`); const data = await res.json(); if (data && data.length > 0) { map.flyTo([data[0].lat, data[0].lon], 14, { duration: 1.5 }); if (searchMarker) map.removeLayer(searchMarker); if (typeof L !== 'undefined') { searchMarker = L.circleMarker([data[0].lat, data[0].lon], { radius: 8, color: '#14fe14', weight: 2, fillOpacity: 0.2 }).bindTooltip('ЦЕЛЬ', { className: 'pip-tooltip', direction: 'auto', offset: [0, -10] }).addTo(map); searchMarker.openTooltip(); } if (isCompactUI()) closeSearchPanel(); } else searchInput.placeholder = 'ОШИБКА БАЗЫ'; } catch (err) { searchInput.placeholder = 'ОБРЫВ СВЯЗИ'; } setTimeout(() => searchInput.placeholder = originalPlaceholder, 1500); } });

const toggleRulerBtn = document.getElementById('toggle-ruler'); const mapContainer = document.getElementById('map-area'); let isRulerActive = false; let rulerPoints = []; let rulerLine = null; let rulerMarkers = [];
function clearRuler() { if (rulerLine) map.removeLayer(rulerLine); rulerMarkers.forEach(m => map.removeLayer(m)); rulerPoints = []; rulerMarkers = []; }
if (toggleRulerBtn) toggleRulerBtn.addEventListener('click', () => { if(isEditorActive && toggleEditorBtn) toggleEditorBtn.click(); if(searchPanel && searchPanel.classList.contains('active') && closeSearchBtn) closeSearchBtn.click(); isRulerActive = !isRulerActive; toggleRulerBtn.classList.toggle('active', isRulerActive); if (mapContainer) mapContainer.classList.toggle('crosshair-cursor', isRulerActive); if(!isRulerActive) clearRuler(); });
function handleRulerPointClick(latlng) { if (typeof L === 'undefined') return; if (rulerPoints.length === 2) clearRuler(); rulerPoints.push(latlng); const m = L.circleMarker(latlng, { radius: 4, color: '#14fe14', weight: 2, fillColor: '#000', fillOpacity: 1 }).addTo(map); rulerMarkers.push(m); if (rulerPoints.length === 2) { rulerLine = L.polyline(rulerPoints, { color: '#14fe14', weight: 2, dashArray: '6, 6' }).addTo(map); const dist = map.distance(rulerPoints[0], rulerPoints[1]); rulerLine.bindTooltip(`ДИСТАНЦИЯ: ${dist > 1000 ? (dist/1000).toFixed(2)+' КМ' : Math.round(dist)+' М'}`, { permanent: true, className: 'pip-tooltip', direction: 'auto', offset: [0, -10] }).openTooltip(); } }

const toggleEditorBtn = document.getElementById('toggle-editor'); const palette = document.getElementById('editor-palette'); const markerModal = document.getElementById('marker-modal'); const drawerMap = document.getElementById('info-drawer');
let isEditorActive = false; let selectedIconType = null; let pendingLatLng = null; let editingPoiId = null; let renderLayers = {}; 
        
let customPOIs = JSON.parse(localStorage.getItem('pipboy_pois_dc_yandex'));
if (!customPOIs || customPOIs.length === 0) { customPOIs = [ { id: '1', type: 'vault', lat: 38.9611, lng: -77.1843, title: 'УБЕЖИЩЕ 101', desc: 'Дом. Здесь ты родился, здесь ты и умрешь.' }, { id: '2', type: 'settlement', lat: 38.9431, lng: -77.1581, title: 'МЕГАТОННА', desc: 'Город, построенный вокруг неразорвавшейся атомной бомбы.' } ]; localStorage.setItem('pipboy_pois_dc_yandex', JSON.stringify(customPOIs)); }

const svgs = { vault: `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`, settlement: `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`, poi: `<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>` };
function getIcon(type) {
    if (typeof PIP_ICONS !== 'undefined' && PIP_ICONS.mapIds.indexOf(String(type)) !== -1) {
        return L.divIcon({ className: 'custom-fallout-icon', html: pipGlyph('map/' + type + '.svg'), iconSize: [34, 34], iconAnchor: [17, 17] });
    }
    const extraClass = type === 'poi' ? ' poi-red' : '';
    return L.divIcon({ className: 'custom-fallout-icon' + extraClass, html: svgs[type] || svgs['poi'], iconSize: [34, 34], iconAnchor: [17, 17] });
}

function addPaletteButton(type, html, red) {
    if (!palette) return;
    const btn = document.createElement('button');
    btn.className = red ? 'palette-btn red-btn' : 'palette-btn';
    btn.innerHTML = html;
    btn.title = type;
    btn.onclick = () => {
        document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedIconType = type;
    };
    palette.appendChild(btn);
}
if (palette && PIP_MODE !== 'player') {
    Object.keys(svgs).forEach(key => addPaletteButton(key, svgs[key], key === 'poi'));
    PIP_ICONS.mapIds.forEach(id => addPaletteButton(id, pipGlyph('map/' + id + '.svg'), false));
}
if (toggleEditorBtn && palette && PIP_MODE !== 'player') toggleEditorBtn.addEventListener('click', () => { if(isRulerActive) toggleRulerBtn.click(); if(searchPanel.classList.contains('active')) closeSearchBtn.click(); isEditorActive = !isEditorActive; toggleEditorBtn.classList.toggle('active', isEditorActive); palette.classList.toggle('active', isEditorActive); mapContainer.classList.toggle('crosshair-cursor', isEditorActive); if(!isEditorActive) { document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('selected')); selectedIconType = null; } });
        
map.on('click', (e) => { 
    if (isRulerActive) { handleRulerPointClick(e.latlng); return; } 
    if (PIP_MODE === 'player') return;
    if (isEditorActive && selectedIconType) { pendingLatLng = e.latlng; editingPoiId = null; openMarkerModal(); } 
});

function openMarkerModal(existingPoi = null) { document.getElementById('poi-title').value = existingPoi ? existingPoi.title : ''; document.getElementById('poi-desc').value = existingPoi ? existingPoi.desc : ''; markerModal.classList.add('active'); }
if (document.getElementById('modal-cancel')) document.getElementById('modal-cancel').onclick = () => markerModal.classList.remove('active');
if (document.getElementById('modal-save')) document.getElementById('modal-save').onclick = () => { const title = document.getElementById('poi-title').value.trim() || 'НЕИЗВЕСТНЫЙ ОБЪЕКТ'; const desc = document.getElementById('poi-desc').value.trim() || 'Нет данных'; if (editingPoiId) { const poi = customPOIs.find(p => p.id === editingPoiId); if(poi) { poi.title = title; poi.desc = desc; } } else { customPOIs.push({ id: Date.now().toString(), type: selectedIconType, lat: pendingLatLng.lat, lng: pendingLatLng.lng, title: title, desc: desc }); } persistMap(); markerModal.classList.remove('active'); if(drawerMap && drawerMap.classList.contains('open')) closeDrawerMap(); renderAllPOIs(); };
if (document.getElementById('drawer-close')) document.getElementById('drawer-close').onclick = closeDrawerMap;
function closeDrawerMap() {
    const drawer = document.getElementById('info-drawer');
    if (drawer) drawer.classList.remove('open');
    syncMapScrim();
}
document.getElementById('drawer-edit-btn').onclick = () => { const id = drawerMap.dataset.currentId; const poi = customPOIs.find(p => p.id === id); if(poi) { editingPoiId = id; openMarkerModal(poi); } };
if (document.getElementById('drawer-delete-btn')) document.getElementById('drawer-delete-btn').onclick = () => { const id = drawerMap.dataset.currentId; customPOIs = customPOIs.filter(p => p.id !== id); persistMap(); closeDrawerMap(); renderAllPOIs(); };
function openDrawerForPoi(poi) {
    closeSearchPanel();
    document.getElementById('drawer-title').textContent = poi.title;
    document.getElementById('drawer-desc').textContent = poi.desc;
    drawerMap.dataset.currentId = poi.id;
    drawerMap.classList.add('open');
    syncMapScrim();
}

function renderAllPOIs() {
    if (typeof L === 'undefined') { updateMasterStatus(); return; }
    Object.values(renderLayers).forEach(layer => map.removeLayer(layer)); renderLayers = {};
    (customPOIs || []).forEach(poi => {
        const lat = Number(poi && poi.lat);
        const lng = Number(poi && poi.lng);
        if (!isFinite(lat) || !isFinite(lng)) return;
        const descText = poi.desc || 'Нет данных';
        let marker;
        try { marker = L.marker([lat, lng], { icon: getIcon(poi.type) }).addTo(map); }
        catch (e) { return; }
        const shortDesc = descText.length > 60 ? descText.substring(0, 60) + '...' : descText;
        marker.bindTooltip(`<b>${poi.title}</b><br><span style="opacity:0.7; font-size: 0.85em; display: inline-block; margin-top: 4px; line-height: 1.15;">${shortDesc}</span>`, { className: 'pip-tooltip', direction: 'auto', offset: [0, -15] });
        marker.on('click', (e) => { L.DomEvent.stopPropagation(e); const el = marker.getElement(); if(el) { el.classList.remove('animating'); void el.offsetWidth; el.classList.add('animating'); setTimeout(() => el.classList.remove('animating'), 200); } if (isRulerActive) { handleRulerPointClick(marker.getLatLng()); } else { openDrawerForPoi(poi); } });
        marker.on('dblclick', (e) => { L.DomEvent.stopPropagation(e); if (isRulerActive) { toggleRulerBtn.click(); openDrawerForPoi(poi); } });
        renderLayers[poi.id] = marker;
    });
    updateMasterStatus();
}
renderAllPOIs();

// ==========================================================================
// 6. ЛОГИКА РАДИО
// ==========================================================================
const stationListContainer = document.getElementById('station-list');
if (stationListContainer) {
const stations = [
    { id: 'rad1', title: 'Новости Галактики', desc: 'Джаз, свинг и лаунж 50-х', url: 'https://ice1.somafm.com/illstreet-128-mp3' },
    { id: 'rad2', title: 'Секретный Агент', desc: 'Шпионские саундтреки 60-х', url: 'https://ice1.somafm.com/secretagent-128-mp3' },
    { id: 'rad3', title: 'Своя Волна (Локальная)', desc: 'Настройте локальную папку или сетевой поток', url: '', isCustom: true }
];

const audioPlayer = document.getElementById('pip-audio'); const btnPlayPause = document.getElementById('btn-play-pause'); const iconPlay = document.getElementById('icon-play'); const iconPause = document.getElementById('icon-pause'); const npTitle = document.getElementById('np-title'); const visualizer = document.getElementById('radio-visualizer');
let currentStationId = null; let customPlaylistFiles = []; let tempCustomFiles = []; let currentCustomTrackIndex = 0; let currentObjectUrl = null;
const radioModal = document.getElementById('radio-modal'); const btnBrowseAudio = document.getElementById('btn-browse-audio'); const inputFiles = document.getElementById('local-audio-upload'); const inputUrl = document.getElementById('stream-url-input');

function renderStations() {
    stationListContainer.innerHTML = '';
    stations.forEach(station => {
        const btn = document.createElement('button'); btn.className = `radio-station-btn ${currentStationId === station.id ? 'playing' : ''}`;
        if (station.isCustom) { btn.innerHTML = `<div style="display:flex; justify-content: space-between; align-items: center; width: 100%; pointer-events: none;"><div style="display:flex; flex-direction: column; gap: 5px; flex-grow: 1;"><span class="station-title">${station.title}</span><span class="station-desc">${station.desc}</span></div><div style="pointer-events: auto;"><button class="term-btn edit-custom-btn" style="font-size: 1rem; padding: 5px 10px;">НАСТРОЙКА</button></div></div>`; } 
        else { btn.innerHTML = `<span class="station-title">${station.title}</span><span class="station-desc">${station.desc}</span>`; }
        btn.onclick = (e) => {
            if (station.isCustom) {
                if (e.target.closest('.edit-custom-btn')) { radioModal.classList.add('active'); return; }
                if (currentStationId !== station.id) { if (customPlaylistFiles.length > 0) playCustomFile(0); else if (station.url) playCustomStream(); else radioModal.classList.add('active'); } else { togglePlay(); }
            } else {
                if (currentStationId === station.id) togglePlay();
                else { currentStationId = station.id; audioPlayer.src = station.url; npTitle.textContent = station.title; renderStations(); audioPlayer.play(); }
            }
        };
        stationListContainer.appendChild(btn);
    });
}

document.getElementById('radio-modal-cancel').onclick = () => { radioModal.classList.remove('active'); tempCustomFiles = []; inputFiles.value = ''; inputUrl.value = ''; btnBrowseAudio.textContent = 'ВЫБРАТЬ ПАПКУ'; };
btnBrowseAudio.onclick = () => inputFiles.click();
inputFiles.onchange = (e) => { tempCustomFiles = Array.from(e.target.files).filter(f => f.type.startsWith('audio/') || f.name.toLowerCase().endsWith('.mp3') || f.name.toLowerCase().endsWith('.wav') || f.name.toLowerCase().endsWith('.ogg')); if (tempCustomFiles.length > 0) { btnBrowseAudio.textContent = `НАЙДЕНО ТРЕКОВ: ${tempCustomFiles.length}`; inputUrl.value = ''; } else { btnBrowseAudio.textContent = 'АУДИО НЕ НАЙДЕНО'; pipNotify('Нет аудио', 'В выбранной папке нет поддерживаемых аудиофайлов.', { kind: 'warn' }); } };
inputUrl.addEventListener('input', () => { if (inputUrl.value.trim() !== '') { tempCustomFiles = []; btnBrowseAudio.textContent = 'ВЫБРАТЬ ПАПКУ'; inputFiles.value = ''; } });
document.getElementById('radio-modal-save').onclick = () => { if (tempCustomFiles.length > 0) { customPlaylistFiles = tempCustomFiles; stations.find(s => s.id === 'rad3').url = ''; stations.find(s => s.id === 'rad3').desc = `Локальный плейлист (${customPlaylistFiles.length} треков)`; playCustomFile(0); } else if (inputUrl.value.trim() !== '') { customPlaylistFiles = []; stations.find(s => s.id === 'rad3').url = inputUrl.value.trim(); stations.find(s => s.id === 'rad3').desc = 'Пользовательский сетевой поток'; playCustomStream(); } else { pipNotify('Нет источника', 'Выберите папку или введите URL.', { kind: 'warn' }); return; } radioModal.classList.remove('active'); };

function playCustomFile(index) { if (index >= customPlaylistFiles.length) index = 0; currentCustomTrackIndex = index; const file = customPlaylistFiles[index]; if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl); currentObjectUrl = URL.createObjectURL(file); currentStationId = 'rad3'; audioPlayer.src = currentObjectUrl; npTitle.textContent = file.name.replace(/\.[^/.]+$/, "").toUpperCase(); renderStations(); audioPlayer.play(); }
function playCustomStream() { currentStationId = 'rad3'; const station = stations.find(s => s.id === 'rad3'); audioPlayer.src = station.url; npTitle.textContent = "ПОЛЬЗОВАТЕЛЬСКИЙ ПОТОК"; renderStations(); audioPlayer.play(); }
audioPlayer.addEventListener('ended', () => { if (currentStationId === 'rad3' && customPlaylistFiles.length > 0) playCustomFile(currentCustomTrackIndex + 1); });
function togglePlay() { if (!currentStationId) return; if (audioPlayer.paused) audioPlayer.play(); else audioPlayer.pause(); }
btnPlayPause.addEventListener('click', togglePlay);
audioPlayer.addEventListener('play', () => { iconPlay.style.display = 'none'; iconPause.style.display = 'block'; visualizer.classList.add('active'); });
audioPlayer.addEventListener('pause', () => { iconPlay.style.display = 'block'; iconPause.style.display = 'none'; visualizer.classList.remove('active'); });
audioPlayer.addEventListener('error', () => { npTitle.textContent = 'ОШИБКА СИГНАЛА'; iconPlay.style.display = 'block'; iconPause.style.display = 'none'; visualizer.classList.remove('active'); });
renderStations();
}

// ==========================================================================
// 7. АДАПТИВ: ШТОРКИ, ЖЕСТЫ, OVERLAY
// ==========================================================================
function isCompactUI() {
    return window.matchMedia('(max-width: 860px)').matches;
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(el => el.classList.remove('active'));
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target !== overlay) return;
        if (overlay.id === 'radio-modal') {
            const cancel = document.getElementById('radio-modal-cancel');
            if (cancel) cancel.click();
            else overlay.classList.remove('active');
        } else if (overlay.id === 'db-picker-modal' && typeof closeDbPicker === 'function') {
            closeDbPicker();
        }
        else overlay.classList.remove('active');
    });
});

function bindSheetSwipe(sheet, onClose) {
    if (!sheet) return;
    let startY = 0, currentY = 0, dragging = false, startOnHandle = false;
    const threshold = 72;

    const begin = (clientY, target) => {
        if (!isCompactUI()) return;
        startOnHandle = !!(target && target.closest && target.closest('.sheet-handle, .sheet-head, .cs-header, .drawer-header, .search-sheet-title'));
        if (!startOnHandle) return;
        dragging = true;
        startY = clientY;
        currentY = 0;
        sheet.style.transition = 'none';
    };
    const move = (clientY) => {
        if (!dragging) return;
        currentY = Math.max(0, clientY - startY);
        sheet.style.transform = `translateY(${currentY}px)`;
    };
    const end = () => {
        if (!dragging) return;
        dragging = false;
        sheet.style.transition = '';
        if (currentY > threshold) {
            sheet.style.transform = '';
            if (PIP_MODE === 'player' && document.body.classList.contains('player-playing')) return;
            onClose();
        } else {
            sheet.style.transform = '';
        }
    };

    sheet.addEventListener('touchstart', (e) => begin(e.touches[0].clientY, e.target), { passive: true });
    sheet.addEventListener('touchmove', (e) => move(e.touches[0].clientY), { passive: true });
    sheet.addEventListener('touchend', end);
}

bindSheetSwipe(document.getElementById('char-drawer'), closeCharEditor);
bindSheetSwipe(document.getElementById('info-drawer'), closeDrawerMap);
bindSheetSwipe(document.getElementById('search-panel'), closeSearchPanel);
document.querySelectorAll('.modal-overlay .terminal-modal').forEach(modal => {
    const overlay = modal.parentElement;
    bindSheetSwipe(modal, () => {
        if (overlay.id === 'radio-modal') {
            const cancel = document.getElementById('radio-modal-cancel');
            if (cancel) cancel.click();
            else overlay.classList.remove('active');
        } else if (overlay.id === 'db-picker-modal' && typeof closeDbPicker === 'function') {
            closeDbPicker();
        }
        else overlay.classList.remove('active');
    });
});

function isPipFullscreen() {
    return document.body.classList.contains('pip-fill-window');
}
function syncFullscreenIcon() {
    const on = isPipFullscreen();
    const expand = document.querySelector('.fs-icon-expand');
    const collapse = document.querySelector('.fs-icon-collapse');
    const btn = document.getElementById('btn-fullscreen');
    if (expand) expand.style.display = on ? 'none' : '';
    if (collapse) collapse.style.display = on ? '' : 'none';
    if (btn) btn.title = on ? 'Свернуть в окно' : 'Развернуть на весь экран';
}
function togglePipFullscreen() {
    if (window.matchMedia('(max-width: 860px)').matches) return;
    document.body.classList.toggle('pip-fill-window');
    try { localStorage.setItem('pipboy_fill_window', isPipFullscreen() ? '1' : '0'); } catch (e) {}
    syncFullscreenIcon();
    setTimeout(function () { try { if (map && map.invalidateSize) map.invalidateSize(); } catch (e) {} }, 150);
}
(function bootFillWindow() {
    try {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (document.fullscreenElement && exit) exit.call(document);
    } catch (e) {}
    try {
        if (localStorage.getItem('pipboy_fill_window') === '1' && !window.matchMedia('(max-width: 860px)').matches) {
            document.body.classList.add('pip-fill-window');
        }
    } catch (e) {}
    syncFullscreenIcon();
})();
