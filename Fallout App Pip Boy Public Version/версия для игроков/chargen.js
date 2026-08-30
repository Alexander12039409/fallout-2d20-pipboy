/* Пошаговое создание персонажа. Книга, стр. 50–59 и 74. */
(function () {
    const STEPS = ['name', 'origin', 'special', 'skills', 'perk'];
    const STEP_LABELS = ['ИМЯ', 'ПРОИСХОЖДЕНИЕ', 'SPECIAL', 'НАВЫКИ', 'ПЕРК'];
    const ATTRS = [
        { key: 'str', short: 'СИЛ', name: 'Сила' },
        { key: 'per', short: 'ВСП', name: 'Восприятие' },
        { key: 'end', short: 'ВЫН', name: 'Выносливость' },
        { key: 'cha', short: 'ХАР', name: 'Харизма' },
        { key: 'int', short: 'ИНТ', name: 'Интеллект' },
        { key: 'agi', short: 'ЛВК', name: 'Ловкость' },
        { key: 'luc', short: 'УДЧ', name: 'Удача' }
    ];
    const BOS_SKILLS = [
        { id: 'energy', name: 'Энерг. оружие' },
        { id: 'science', name: 'Наука' },
        { id: 'repair', name: 'Ремонт' }
    ];
    const TRAITS = [
        { id: 'educated', name: 'Образованный', pro: 'Дополнительный отмеченный навык.', con: 'Провал неотмеченного навыка даёт ГМ 1 ОД.' },
        { id: 'fastshot', name: 'Быстрый выстрел', pro: 'Второе основное на выстрел стоит 1 ОД вместо 2.', con: 'Нельзя прицеливаться.' },
        { id: 'gifted', name: 'Одарённый', pro: '+1 к двум атрибутам S.P.E.C.I.A.L.', con: 'Максимум очков удачи на 1 меньше УДЧ.' },
        { id: 'heavy', name: 'Тяжёлая рука', pro: '+1 БК к урону ближнего боя.', con: 'Осложнение ближнего на 19–20.' },
        { id: 'small', name: 'Миниатюрный', pro: 'Переброс 1d20 на проверки ЛОВ (баланс / гибкость).', con: 'Груз 150 + (5 × СИЛ) фунтов.' }
    ];
    const ORIGINS = [
        {
            id: 'Выживший',
            icon: 'origin/survivor.svg',
            narrative: 'Вы выжили на поверхности: поселение, караван, минитмены или бывший налётчик. Связи даются тяжело — пустошь не прощает доверчивых.',
            mechanic: 'Выберите две черты или одну черту и дополнительный перк. Каждая черта даёт плюс и минус.',
            maxLine: 'Все атрибуты ≤ 10'
        },
        {
            id: 'Братство Стали',
            icon: 'origin/brotherhood.svg',
            narrative: 'Рыцарь, писец или новобранец. Братство хранит довоенные технологии и требует субординации. Приказы старших — закон.',
            mechanic: 'Дополнительный отмеченный навык: энергооружие, наука или ремонт. Нарушение долга — изгнание.',
            maxLine: 'Все атрибуты ≤ 10'
        },
        {
            id: 'Гуль',
            icon: 'origin/ghoul.svg',
            narrative: 'Некротический постчеловек: кожа сходит, но радиация вас лечит. Вы почти не стареете и можете помнить Великую войну. Гладкокожие смотрят косо.',
            mechanic: 'Иммунитет к радиации, лечение от неё. Выживание всегда отмечено (+2). Проверки ХАР против предубеждённых сложнее.',
            maxLine: 'Все атрибуты ≤ 10'
        },
        {
            id: 'Супермутант',
            icon: 'origin/mutant.svg',
            narrative: 'F.E.V. сделал из вас двухметровую машину. Зелёная кожа, ярость, иммунитет к радиации и яду. Обычная броня на вас не лезет.',
            mechanic: 'СИЛ и ВЫН стартуют с 7, максимум 12. ИНТ и ХАР максимум 6. Навыки не выше 4. Только рейдерская броня.',
            maxLine: 'СИЛ/ВЫН ≤ 12 · ИНТ/ХАР ≤ 6 · остальные ≤ 10'
        },
        {
            id: 'Мистер Помощник',
            icon: 'origin/handy.svg',
            narrative: 'Робот General Atomics: три глаза, три манипулятора, реактивная тяга. Война стёрла программу дворецкого — осталась свободная воля.',
            mechanic: 'Робот: 360° сенсоры, иммунитет к радиации и яду. Не ест, не пьёт химию, не лечится отдыхом — только ремонт. Груз 150 фунтов.',
            maxLine: 'Все атрибуты ≤ 10'
        },
        {
            id: 'Выходец из Убежища',
            icon: 'origin/vault.svg',
            narrative: 'Волт-Тек спрятал вас за дверью. Чистая вода и автодок — ценой эксперимента, о котором вы узнаете слишком поздно.',
            mechanic: 'Дополнительный отмеченный навык на выбор. Проверки ВЫН против болезней легче. Раз в квест ГМ может ввести осложнение убежища — вы сразу получаете 1 удачу.',
            maxLine: 'Все атрибуты ≤ 10'
        }
    ];

    let ctx = '';
    let step = 0;
    let perkQuery = '';
    const state = emptyState();

    function emptyState() {
        return {
            name: '',
            pin: '',
            origin: '',
            bosSkill: '',
            traits: [],
            extraPerk: false,
            gifted: [],
            special: { str: 5, per: 5, end: 5, cha: 5, int: 5, agi: 5, luc: 5 },
            tagged: [],
            skills: {},
            perks: []
        };
    }

    function copyState(src) {
        const s = emptyState();
        Object.keys(src).forEach(k => {
            if (Array.isArray(src[k])) s[k] = src[k].slice();
            else if (src[k] && typeof src[k] === 'object') s[k] = Object.assign({}, src[k]);
            else s[k] = src[k];
        });
        return s;
    }

    function resetState() {
        const fresh = emptyState();
        Object.keys(state).forEach(k => { delete state[k]; });
        Object.assign(state, fresh);
        perkQuery = '';
        step = 0;
    }

    function htmlEsc(s) {
        if (typeof escapePipHtml === 'function') return escapePipHtml(s);
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    function glyph(rel) {
        if (typeof pipGlyph === 'function') return pipGlyph(rel, 'chargen-origin-glyph');
        return '';
    }

    function skillDefs() {
        return (typeof skillsDefs !== 'undefined' && skillsDefs) || [];
    }

    function originBase(origin) {
        const b = { str: 5, per: 5, end: 5, cha: 5, int: 5, agi: 5, luc: 5 };
        if (origin === 'Супермутант') { b.str = 7; b.end = 7; }
        (state.gifted || []).forEach(k => { if (b[k] != null) b[k] += 1; });
        return b;
    }

    function originMax(origin) {
        const m = { str: 10, per: 10, end: 10, cha: 10, int: 10, agi: 10, luc: 10 };
        if (origin === 'Супермутант') { m.str = 12; m.end = 12; m.cha = 6; m.int = 6; }
        return m;
    }

    function originMin(origin) {
        const raw = { str: 5, per: 5, end: 5, cha: 5, int: 5, agi: 5, luc: 5 };
        if (origin === 'Супермутант') { raw.str = 7; raw.end = 7; }
        const min = {};
        ATTRS.forEach(a => { min[a.key] = raw[a.key] === 5 ? 4 : raw[a.key]; });
        (state.gifted || []).forEach(k => { if (min[k] != null && raw[k] === 5) min[k] = 5; });
        return min;
    }

    function applyOriginSpecial() {
        const base = originBase(state.origin);
        const max = originMax(state.origin);
        const min = originMin(state.origin);
        const next = {};
        ATTRS.forEach(a => {
            let v = state.special[a.key];
            if (v == null) v = base[a.key];
            if ((state.gifted || []).indexOf(a.key) !== -1 && v < base[a.key]) v = base[a.key];
            if (v < min[a.key]) v = min[a.key];
            if (v > max[a.key]) v = max[a.key];
            next[a.key] = v;
        });
        state.special = next;
    }

    function specialTargetSum() {
        const b = originBase(state.origin);
        return ATTRS.reduce((n, a) => n + b[a.key], 0) + 5;
    }

    function specialCurrentSum() {
        return ATTRS.reduce((n, a) => n + (parseInt(state.special[a.key], 10) || 0), 0);
    }

    function specialRemaining() {
        return specialTargetSum() - specialCurrentSum();
    }

    function hasTrait(id) {
        return (state.traits || []).indexOf(id) !== -1;
    }

    function requiredTagCount() {
        let n = 3;
        if (state.origin === 'Братство Стали') n += 1;
        if (state.origin === 'Гуль') n += 1;
        if (state.origin === 'Выходец из Убежища') n += 1;
        if (hasTrait('educated')) n += 1;
        return n;
    }

    function lockedTags() {
        const lock = [];
        if (state.origin === 'Гуль') lock.push('survival');
        if (state.origin === 'Братство Стали' && state.bosSkill) lock.push(state.bosSkill);
        return lock;
    }

    function skillBudget() {
        return 9 + (parseInt(state.special.int, 10) || 5);
    }

    function skillStart(id) {
        return (state.tagged || []).indexOf(id) !== -1 ? 2 : 0;
    }

    function skillSpent() {
        let n = 0;
        skillDefs().forEach(def => {
            const id = def[1];
            const rank = parseInt(state.skills[id], 10) || 0;
            n += Math.max(0, rank - skillStart(id));
        });
        return n;
    }

    function skillRemaining() {
        return skillBudget() - skillSpent();
    }

    function ensureLockedTags() {
        const tagged = (state.tagged || []).slice();
        lockedTags().forEach(id => {
            if (tagged.indexOf(id) === -1) tagged.push(id);
        });
        state.tagged = tagged;
        tagged.forEach(id => {
            const start = 2;
            const cur = parseInt(state.skills[id], 10) || 0;
            if (cur < start) state.skills[id] = start;
        });
    }

    function derivedFromState() {
        const s = state.special;
        const str = s.str || 5, per = s.per || 5, end = s.end || 5, agi = s.agi || 5, luc = s.luc || 5;
        let melee = 0;
        if (str >= 11) melee = 3;
        else if (str >= 9) melee = 2;
        else if (str >= 7) melee = 1;
        if (hasTrait('heavy')) melee += 1;
        let carry = 150 + str * 10;
        if (state.origin === 'Мистер Помощник') carry = 150;
        else if (hasTrait('small')) carry = 150 + str * 5;
        const luckMax = hasTrait('gifted') ? Math.max(0, luc - 1) : luc;
        return {
            hp: end + luc,
            def: agi >= 9 ? 2 : 1,
            init: per + agi,
            melee: melee,
            carry: carry,
            luck: luckMax,
            ap: 6
        };
    }

    function perkAvailable(reqStr) {
        const fake = {
            'cs-lvl': 1,
            'cs-origin': state.origin,
            'cs-str': state.special.str,
            'cs-per': state.special.per,
            'cs-end': state.special.end,
            'cs-cha': state.special.cha,
            'cs-int': state.special.int,
            'cs-agi': state.special.agi,
            'cs-luc': state.special.luc
        };
        if (typeof perkMeetsChar === 'function') return perkMeetsChar(reqStr, fake);
        return chargenPerkMeets(reqStr, fake);
    }

    function chargenPerkMeets(reqStr, char) {
        if (!reqStr || reqStr === 'Нет' || /^none$/i.test(String(reqStr).trim())) return true;
        const origin = char['cs-origin'] || '';
        const isRobot = origin === 'Мистер Помощник';
        const parts = String(reqStr).split(',');
        for (let i = 0; i < parts.length; i++) {
            const r = parts[i].trim();
            if (!r) continue;
            if (/ранг/i.test(r)) continue;
            if (/не робот/i.test(r)) { if (isRobot) return false; continue; }
            if (/^робот$/i.test(r)) { if (!isRobot) return false; continue; }
            const lvl = r.match(/Уровень\s*(\d+)/i) || r.match(/Ур\.\s*(\d+)/i);
            if (lvl) {
                if ((parseInt(char['cs-lvl'], 10) || 1) < parseInt(lvl[1], 10)) return false;
                continue;
            }
            const map = [
                ['СИЛ', 'cs-str'], ['ВСП', 'cs-per'], ['ВОС', 'cs-per'],
                ['ВЫН', 'cs-end'], ['ХАР', 'cs-cha'], ['ИНТ', 'cs-int'], ['INT', 'cs-int'],
                ['ЛВК', 'cs-agi'], ['УДЧ', 'cs-luc']
            ];
            for (let j = 0; j < map.length; j++) {
                if (r.toUpperCase().indexOf(map[j][0]) !== -1) {
                    const n = parseInt(r.replace(/\D/g, ''), 10);
                    if ((parseInt(char[map[j][1]], 10) || 0) < n) return false;
                    break;
                }
            }
        }
        return true;
    }

    window.perkMeetsChar = chargenPerkMeets;

    function neededPerks() {
        return state.extraPerk ? 2 : 1;
    }

    function setHint(text, bad) {
        const el = document.getElementById('chargen-hint');
        if (!el) return;
        el.textContent = text || '';
        el.classList.toggle('is-bad', !!bad && !!text);
    }

    function openChoice(kind) {
        ctx = kind;
        const modal = document.getElementById('chargen-choice-modal');
        if (modal) modal.classList.add('active');
    }

    function closeChoice() {
        const modal = document.getElementById('chargen-choice-modal');
        if (modal) modal.classList.remove('active');
    }

    function closeWizard() {
        const modal = document.getElementById('chargen-modal');
        if (modal) modal.classList.remove('active');
        resetState();
    }

    window.closeChargenChoice = function () { closeChoice(); };
    window.closeChargenWizard = function () { closeWizard(); };

    window.openChargenChoice = function (kind) {
        openChoice(kind || 'master-vault');
    };

    window.chargenStartManual = function () {
        closeChoice();
        if (ctx === 'player-vault') {
            if (typeof playerCreateVaultCharImmediate === 'function') playerCreateVaultCharImmediate();
            else if (typeof playerCreateVaultChar === 'function') playerCreateVaultChar();
            return;
        }
        if (ctx === 'session') {
            if (typeof openCreateSessionCharForm === 'function') openCreateSessionCharForm();
            else if (typeof openCreateSessionChar === 'function') openCreateSessionChar();
            return;
        }
        if (typeof createCharImmediate === 'function') createCharImmediate();
        else if (typeof createChar === 'function') createChar();
    };

    window.chargenStartGuided = function () {
        closeChoice();
        resetState();
        const modal = document.getElementById('chargen-modal');
        if (!modal) return;
        modal.classList.add('active');
        renderWizard();
        const nameEl = document.getElementById('chargen-name');
        if (nameEl) setTimeout(() => nameEl.focus(), 50);
    };

    function renderWizard() {
        const stepsEl = document.getElementById('chargen-steps');
        if (stepsEl) {
            stepsEl.innerHTML = STEPS.map((id, i) => {
                const cls = i === step ? 'is-on' : (i < step ? 'is-done' : '');
                return '<button type="button" class="chargen-step ' + cls + '" data-step="' + i + '">' + (i + 1) + '. ' + STEP_LABELS[i] + '</button>';
            }).join('');
            stepsEl.querySelectorAll('.chargen-step').forEach(btn => {
                btn.onclick = () => {
                    const i = parseInt(btn.getAttribute('data-step'), 10);
                    if (i < step) { step = i; renderWizard(); }
                };
            });
        }
        const body = document.getElementById('chargen-body');
        if (!body) return;
        const id = STEPS[step];
        if (id === 'name') body.innerHTML = renderName();
        else if (id === 'origin') body.innerHTML = renderOrigin();
        else if (id === 'special') body.innerHTML = renderSpecial();
        else if (id === 'skills') body.innerHTML = renderSkills();
        else body.innerHTML = renderPerks();
        bindStep();
        const back = document.getElementById('chargen-back');
        const next = document.getElementById('chargen-next');
        if (back) back.hidden = step === 0;
        if (next) next.textContent = step === STEPS.length - 1 ? 'ГОТОВО' : 'ПРОДОЛЖИТЬ';
        setHint('');
    }

    function renderName() {
        const pin = ctx === 'session'
            ? '<label class="chargen-field">PIN (необязательно)<input type="text" id="chargen-pin" class="term-input" maxlength="8" value="' + htmlEsc(state.pin) + '" placeholder="PIN"></label>'
            : '';
        return '<p class="chargen-lead">Как вас зовут, выживший?</p>' +
            '<label class="chargen-field">Имя персонажа<input type="text" id="chargen-name" class="term-input" maxlength="40" value="' + htmlEsc(state.name) + '" placeholder="ИМЯ"></label>' +
            pin;
    }

    function renderOrigin() {
        const cards = ORIGINS.map(o => {
            const on = state.origin === o.id ? ' is-on' : '';
            return '<button type="button" class="chargen-origin-card' + on + '" data-origin="' + htmlEsc(o.id) + '">' +
                '<div class="chargen-origin-icon">' + glyph(o.icon) + '</div>' +
                '<div class="chargen-origin-copy">' +
                '<div class="chargen-origin-name">' + htmlEsc(o.id) + '</div>' +
                '<p class="chargen-origin-story">' + htmlEsc(o.narrative) + '</p>' +
                '<p class="chargen-origin-mech">' + htmlEsc(o.mechanic) + '</p>' +
                '<div class="chargen-origin-max">' + htmlEsc(o.maxLine) + '</div>' +
                '</div></button>';
        }).join('');
        let extra = '';
        if (state.origin === 'Братство Стали') {
            extra = '<div class="chargen-extra"><div class="chargen-extra-title">Дополнительный отмеченный навык</div><div class="chargen-chips">' +
                BOS_SKILLS.map(s => '<button type="button" class="chargen-chip' + (state.bosSkill === s.id ? ' is-on' : '') + '" data-bos="' + s.id + '">' + s.name + '</button>').join('') +
                '</div></div>';
        }
        if (state.origin === 'Выживший') {
            extra = '<div class="chargen-extra"><div class="chargen-extra-title">Черты: две или одна + дополнительный перк</div>' +
                '<label class="chargen-check"><input type="checkbox" id="chargen-extra-perk"' + (state.extraPerk ? ' checked' : '') + '> Вместо второй черты — дополнительный перк</label>' +
                '<div class="chargen-trait-list">' + TRAITS.map(t => {
                    const on = hasTrait(t.id) ? ' is-on' : '';
                    return '<button type="button" class="chargen-trait' + on + '" data-trait="' + t.id + '"><strong>' + t.name + '</strong><span>' + t.pro + '</span><em>' + t.con + '</em></button>';
                }).join('') + '</div></div>';
            if (hasTrait('gifted')) {
                extra += '<div class="chargen-extra"><div class="chargen-extra-title">Одарённый: два атрибута +1</div><div class="chargen-chips">' +
                    ATTRS.map(a => '<button type="button" class="chargen-chip' + (state.gifted.indexOf(a.key) !== -1 ? ' is-on' : '') + '" data-gift="' + a.key + '">' + a.short + '</button>').join('') +
                    '</div></div>';
            }
        }
        return '<p class="chargen-lead">Происхождение задаёт историю, пределы SPECIAL и отмеченные навыки.</p><div class="chargen-origin-grid">' + cards + '</div>' + extra;
    }

    function renderSpecial() {
        const d = derivedFromState();
        const rem = specialRemaining();
        const rows = ATTRS.map(a => {
            const max = originMax(state.origin)[a.key];
            const min = originMin(state.origin)[a.key];
            const val = state.special[a.key];
            return '<div class="chargen-spec-row">' +
                '<div class="chargen-spec-lab"><b>' + a.short + '</b> ' + a.name + '<small>мин ' + min + ' · макс ' + max + '</small></div>' +
                '<div class="chargen-stepper">' +
                '<button type="button" class="term-btn chargen-nudge" data-attr="' + a.key + '" data-d="-1">−</button>' +
                '<span class="chargen-spec-val">' + val + '</span>' +
                '<button type="button" class="term-btn chargen-nudge" data-attr="' + a.key + '" data-d="1">+</button>' +
                '</div></div>';
        }).join('');
        return '<p class="chargen-lead">Каждый атрибут стартует с 5 (происхождение может сдвинуть). Потратьте 5 очков, максимум 10. Можно опустить один атрибут с 5 до 4, чтобы взять очко в другое место.</p>' +
            '<div class="chargen-remain' + (rem === 0 ? ' is-ok' : '') + '">Осталось очков: <b>' + rem + '</b></div>' +
            '<div class="chargen-derived">' +
            '<div>ОЗ<span>' + d.hp + '</span></div>' +
            '<div>Защита<span>' + d.def + '</span></div>' +
            '<div>Иниц.<span>' + d.init + '</span></div>' +
            '<div>ОД<span>' + d.ap + '</span></div>' +
            '<div>Ближний<span>+' + d.melee + ' БК</span></div>' +
            '<div>Груз<span>' + d.carry + ' Ф.</span></div>' +
            '<div>Удача<span>' + d.luck + '</span></div>' +
            '</div>' +
            '<div class="chargen-spec-list">' + rows + '</div>';
    }

    function renderSkills() {
        ensureLockedTags();
        const rem = skillRemaining();
        const need = requiredTagCount();
        const have = (state.tagged || []).length;
        const lock = lockedTags();
        const rows = skillDefs().map(def => {
            const ru = def[0], id = def[1], attr = def[2];
            const tagged = (state.tagged || []).indexOf(id) !== -1;
            const locked = lock.indexOf(id) !== -1;
            const rank = parseInt(state.skills[id], 10) || 0;
            const attrVal = parseInt(state.special[attr], 10) || 0;
            const tn = attrVal + rank;
            return '<div class="chargen-skill-row">' +
                '<button type="button" class="skill-tag-dot' + (tagged ? ' is-on' : '') + (locked ? ' is-lock' : '') + '" data-tag="' + id + '" title="Отмеченный навык" aria-pressed="' + tagged + '"></button>' +
                '<div class="chargen-skill-name">' + htmlEsc(ru) + '</div>' +
                '<div class="chargen-stepper">' +
                '<button type="button" class="term-btn chargen-nudge" data-sk="' + id + '" data-d="-1">−</button>' +
                '<span class="chargen-spec-val">' + rank + '</span>' +
                '<button type="button" class="term-btn chargen-nudge" data-sk="' + id + '" data-d="1">+</button>' +
                '</div>' +
                '<span class="chargen-tn">[' + tn + ']</span>' +
                '</div>';
        }).join('');
        return '<p class="chargen-lead">Отметьте навыки (точка слева). Отмеченные стартуют с ранга 2. Затем потратьте 9 + ИНТ очков. На старте ранг не выше 3.</p>' +
            '<div class="chargen-remain' + (have === need ? ' is-ok' : '') + '">Отмечено: <b>' + have + '</b> / ' + need + '</div>' +
            '<div class="chargen-remain' + (rem === 0 ? ' is-ok' : '') + '">Очки навыков: <b>' + rem + '</b> из ' + skillBudget() + ' (9 + ИНТ ' + (state.special.int || 5) + ')</div>' +
            '<div class="chargen-skill-list">' + rows + '</div>';
    }

    function renderPerks() {
        const db = (typeof masterDB !== 'undefined' && masterDB.perks) || [];
        const q = (perkQuery || '').trim().toLowerCase();
        const need = neededPerks();
        const list = db.filter(p => {
            if (!perkAvailable(p.reqStr)) return false;
            if (!q) return true;
            return String(p.name || '').toLowerCase().indexOf(q) !== -1 || String(p.desc || '').toLowerCase().indexOf(q) !== -1;
        });
        const cards = list.map(p => {
            const on = state.perks.indexOf(p.name) !== -1 ? ' is-on' : '';
            return '<button type="button" class="chargen-perk-card' + on + '" data-perk="' + htmlEsc(p.name) + '">' +
                '<div class="chargen-perk-name">' + htmlEsc(p.name) + '</div>' +
                '<div class="chargen-perk-req">' + htmlEsc(p.reqStr || 'Нет') + '</div>' +
                '<div class="chargen-perk-desc">' + htmlEsc(p.desc || '') + '</div>' +
                '</button>';
        }).join('');
        return '<p class="chargen-lead">Первый перк на создании. Показаны только те, чьи требования вы уже выполняете.</p>' +
            '<div class="chargen-remain' + (state.perks.length === need ? ' is-ok' : '') + '>Выбрано: <b>' + state.perks.length + '</b> / ' + need + '</div>' +
            '<input type="text" id="chargen-perk-q" class="term-input" placeholder="ПОИСК ПЕРКА..." value="' + htmlEsc(perkQuery) + '">' +
            '<div class="chargen-perk-list">' + (cards || '<p class="chargen-empty">Нет доступных перков. Вернитесь и поднимите характеристики.</p>') + '</div>';
    }

    function bindStep() {
        const id = STEPS[step];
        if (id === 'name') {
            const nameEl = document.getElementById('chargen-name');
            const pinEl = document.getElementById('chargen-pin');
            if (nameEl) nameEl.oninput = () => { state.name = nameEl.value; };
            if (pinEl) pinEl.oninput = () => { state.pin = pinEl.value; };
            if (nameEl) nameEl.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); chargenNext(); } };
        }
        if (id === 'origin') {
            document.querySelectorAll('.chargen-origin-card').forEach(btn => {
                btn.onclick = () => {
                    const next = btn.getAttribute('data-origin');
                    if (state.origin !== next) {
                        state.origin = next;
                        state.bosSkill = '';
                        state.traits = [];
                        state.extraPerk = false;
                        state.gifted = [];
                        state.tagged = [];
                        state.skills = {};
                        state.perks = [];
                        state.special = originBase(next);
                    }
                    renderWizard();
                };
            });
            document.querySelectorAll('[data-bos]').forEach(btn => {
                btn.onclick = () => { state.bosSkill = btn.getAttribute('data-bos'); state.tagged = []; ensureLockedTags(); renderWizard(); };
            });
            const extra = document.getElementById('chargen-extra-perk');
            if (extra) extra.onchange = () => {
                state.extraPerk = extra.checked;
                if (state.extraPerk && state.traits.length > 1) state.traits = state.traits.slice(0, 1);
                renderWizard();
            };
            document.querySelectorAll('[data-trait]').forEach(btn => {
                btn.onclick = () => {
                    const tid = btn.getAttribute('data-trait');
                    const i = state.traits.indexOf(tid);
                    const max = state.extraPerk ? 1 : 2;
                    if (i >= 0) {
                        state.traits.splice(i, 1);
                        if (tid === 'gifted') state.gifted = [];
                    } else if (state.traits.length < max) {
                        state.traits.push(tid);
                    }
                    renderWizard();
                };
            });
            document.querySelectorAll('[data-gift]').forEach(btn => {
                btn.onclick = () => {
                    const k = btn.getAttribute('data-gift');
                    const i = state.gifted.indexOf(k);
                    if (i >= 0) state.gifted.splice(i, 1);
                    else if (state.gifted.length < 2) state.gifted.push(k);
                    state.special = originBase(state.origin);
                    renderWizard();
                };
            });
        }
        if (id === 'special') {
            document.querySelectorAll('.chargen-nudge[data-attr]').forEach(btn => {
                btn.onclick = () => nudgeSpecial(btn.getAttribute('data-attr'), parseInt(btn.getAttribute('data-d'), 10));
            });
        }
        if (id === 'skills') {
            document.querySelectorAll('[data-tag]').forEach(btn => {
                btn.onclick = () => toggleWizardTag(btn.getAttribute('data-tag'));
            });
            document.querySelectorAll('.chargen-nudge[data-sk]').forEach(btn => {
                btn.onclick = () => nudgeSkill(btn.getAttribute('data-sk'), parseInt(btn.getAttribute('data-d'), 10));
            });
        }
        if (id === 'perk') {
            const q = document.getElementById('chargen-perk-q');
            if (q) q.oninput = () => {
                perkQuery = q.value;
                const pos = q.selectionStart;
                renderWizard();
                const el = document.getElementById('chargen-perk-q');
                if (el) { el.focus(); try { el.setSelectionRange(pos, pos); } catch (e) {} }
            };
            document.querySelectorAll('.chargen-perk-card').forEach(btn => {
                btn.onclick = () => {
                    const name = btn.getAttribute('data-perk');
                    const i = state.perks.indexOf(name);
                    if (i >= 0) state.perks.splice(i, 1);
                    else if (state.perks.length < neededPerks()) state.perks.push(name);
                    renderWizard();
                };
            });
        }
    }

    function nudgeSpecial(key, d) {
        const min = originMin(state.origin)[key];
        const max = originMax(state.origin)[key];
        let v = (parseInt(state.special[key], 10) || 0) + d;
        if (v < min) v = min;
        if (v > max) v = max;
        if (d > 0 && specialRemaining() <= 0 && v > state.special[key]) return;
        state.special[key] = v;
        renderWizard();
    }

    function toggleWizardTag(id) {
        if (lockedTags().indexOf(id) !== -1) return;
        const i = state.tagged.indexOf(id);
        if (i >= 0) {
            state.tagged.splice(i, 1);
            state.skills[id] = 0;
        } else {
            if (state.tagged.length >= requiredTagCount()) {
                setHint('Нужно ровно ' + requiredTagCount() + ' отмеченных навыка.', true);
                return;
            }
            state.tagged.push(id);
            if ((parseInt(state.skills[id], 10) || 0) < 2) state.skills[id] = 2;
        }
        renderWizard();
    }

    function nudgeSkill(id, d) {
        const start = skillStart(id);
        let rank = parseInt(state.skills[id], 10) || 0;
        if (d > 0) {
            if (skillRemaining() <= 0) return;
            if (rank >= 3) return;
            rank += 1;
        } else {
            if (rank <= start) return;
            rank -= 1;
        }
        state.skills[id] = rank;
        renderWizard();
    }

    function canLeaveStep() {
        const id = STEPS[step];
        if (id === 'name') {
            const nameEl = document.getElementById('chargen-name');
            state.name = (nameEl && nameEl.value || state.name || '').trim();
            const pinEl = document.getElementById('chargen-pin');
            if (pinEl) state.pin = pinEl.value.trim();
            if (!state.name) { setHint('Введите имя персонажа.', true); return false; }
            return true;
        }
        if (id === 'origin') {
            if (!state.origin) { setHint('Выберите происхождение.', true); return false; }
            if (state.origin === 'Братство Стали' && !state.bosSkill) {
                setHint('Братство: выберите энергооружие, науку или ремонт.', true); return false;
            }
            if (state.origin === 'Выживший') {
                const need = state.extraPerk ? 1 : 2;
                if (state.traits.length !== need) {
                    setHint(state.extraPerk ? 'Выберите одну черту (вторая заменяется перком).' : 'Выберите две черты.', true);
                    return false;
                }
                if (hasTrait('gifted') && state.gifted.length !== 2) {
                    setHint('Одарённый: отметьте два атрибута для +1.', true); return false;
                }
            }
            applyOriginSpecial();
            ensureLockedTags();
            return true;
        }
        if (id === 'special') {
            if (specialRemaining() !== 0) {
                setHint('Раскидайте все очки SPECIAL. Осталось: ' + specialRemaining() + '.', true);
                return false;
            }
            return true;
        }
        if (id === 'skills') {
            ensureLockedTags();
            if ((state.tagged || []).length !== requiredTagCount()) {
                setHint('Отметьте ровно ' + requiredTagCount() + ' навыка. Сейчас: ' + state.tagged.length + '.', true);
                return false;
            }
            if (skillRemaining() !== 0) {
                setHint('Потратьте все очки навыков (9 + ИНТ). Осталось: ' + skillRemaining() + '.', true);
                return false;
            }
            return true;
        }
        if (id === 'perk') {
            if (state.perks.length !== neededPerks()) {
                setHint(neededPerks() === 2 ? 'Выберите два доступных перка.' : 'Выберите один доступный перк.', true);
                return false;
            }
            return true;
        }
        return true;
    }

    window.chargenBack = function () {
        if (step > 0) { step -= 1; renderWizard(); }
    };

    window.chargenNext = function () {
        if (!canLeaveStep()) return;
        if (step < STEPS.length - 1) {
            step += 1;
            if (STEPS[step] === 'special') applyOriginSpecial();
            if (STEPS[step] === 'skills') ensureLockedTags();
            renderWizard();
            const body = document.getElementById('chargen-body');
            if (body) body.scrollTop = 0;
            return;
        }
        finishChargen();
    };

    function finishChargen() {
        const d = derivedFromState();
        const id = 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
        const char = {
            id: id,
            'cs-name': state.name,
            'cs-lvl': 1,
            'cs-xp': '',
            'cs-origin': state.origin,
            'cs-str': state.special.str,
            'cs-per': state.special.per,
            'cs-end': state.special.end,
            'cs-cha': state.special.cha,
            'cs-int': state.special.int,
            'cs-agi': state.special.agi,
            'cs-luc': state.special.luc,
            'cs-hp-cur': d.hp,
            'cs-hp-max': d.hp,
            'cs-luck-cur': d.luck,
            caps: 0,
            inventory: [],
            perks: state.perks.slice(),
            notes: [],
            taggedSkills: state.tagged.slice(),
            survivorTraits: state.traits.slice(),
            extraPerk: !!state.extraPerk,
            giftedAttrs: state.gifted.slice(),
            bosTagSkill: state.bosSkill || ''
        };
        skillDefs().forEach(def => {
            char['cs-skill-' + def[1]] = parseInt(state.skills[def[1]], 10) || 0;
        });
        if (ctx === 'session' && state.pin) char.pin = state.pin;
        closeWizard();
        commitChargenChar(char);
    }

    function commitChargenChar(char) {
        if (ctx === 'player-vault') {
            delete char._session;
            char._vault = true;
            if (typeof vaultUpsert === 'function') vaultUpsert(char);
            window.__unlockedCharId = char.id;
            if (typeof renderPlayerHub === 'function') renderPlayerHub();
            if (typeof openChar === 'function') openChar(char.id);
            return;
        }
        if (ctx === 'session') {
            char._session = true;
            delete char._vault;
            if (typeof PIP_MODE !== 'undefined' && PIP_MODE === 'player' && typeof playerCreateAndOpenChar === 'function') {
                const sid = (typeof PipSession !== 'undefined' && PipSession.sessionId) || '';
                playerCreateAndOpenChar(sid, char['cs-name'], char.pin || '', char).catch(err => {
                    alert((err && err.message) || 'Не удалось создать');
                });
                return;
            }
            if (typeof commitSessionChar === 'function') {
                commitSessionChar(char);
                return;
            }
        }
        if (typeof masterChars !== 'undefined') {
            masterChars.push(char);
            try { localStorage.setItem('pipboy_master_chars', JSON.stringify(masterChars)); } catch (e) {}
        }
        if (typeof renderChars === 'function') renderChars();
        if (typeof openChar === 'function') openChar(char.id);
    }
})();
