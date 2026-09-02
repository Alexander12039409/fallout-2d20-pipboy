// Механика стола: ОД, проверки, БК, рады, расходники, Псина, зоны робота, нечёткий поиск.
// Цифры — книга RC1 и db.js, не видеоигры.

function isGhoulOrigin(origin) {
    return /гуль/.test(typeof normOriginName === 'function' ? normOriginName(origin) : String(origin || '').toLowerCase());
}

function originRadImmune(origin) {
    return (typeof isRobotOrigin === 'function' && isRobotOrigin(origin)) ||
        (typeof isMutantOrigin === 'function' && isMutantOrigin(origin)) ||
        isGhoulOrigin(origin);
}

function originHealsFromRads(origin) {
    return isGhoulOrigin(origin);
}

function charHasPerk(char, name) {
    if (!char || !Array.isArray(char.perks)) return false;
    const want = String(name || '').toLowerCase().replace(/ё/g, 'е');
    return char.perks.some(function (p) {
        return String(p || '').toLowerCase().replace(/ё/g, 'е').indexOf(want) !== -1;
    });
}

function perkRankHint(char, name) {
    if (!charHasPerk(char, name)) return 0;
    const p = (typeof masterDB !== 'undefined' && masterDB.perks)
        ? masterDB.perks.find(function (x) { return x && String(x.name || '').indexOf(name) !== -1; })
        : null;
    const m = p && p.reqStr && String(p.reqStr).match(/Ранги\s+(\d+)/i);
    return m ? 1 : 1;
}

function extraApMaxFromParty() {
    let extra = 0;
    if (typeof PipSession === 'undefined' || !PipSession.state) return 6;
    Object.keys(PipSession.state.characters || {}).forEach(function (id) {
        const ch = PipSession.state.characters[id];
        if (charHasPerk(ch, 'Прирожденный лидер') || charHasPerk(ch, 'Прирождённый лидер')) extra = 1;
    });
    return 6 + extra;
}

function sessionPlayerCount() {
    if (typeof PipSession === 'undefined' || !PipSession.sessionId) return 1;
    const n = Object.keys((PipSession.state && PipSession.state.characters) || {}).length;
    return Math.max(1, n);
}

const HIT_LOCS_HUMAN = {
    head: { label: 'ГОЛОВА', title: 'ГОЛОВА (1-2)' },
    larm: { label: 'Л.РУКА', title: 'Л.РУКА (9-11)' },
    rarm: { label: 'П.РУКА', title: 'П.РУКА (12-14)' },
    torso: { label: 'ТОРС', title: 'ТОРС (3-8)' },
    lleg: { label: 'Л.НОГА', title: 'Л.НОГА (15-17)' },
    rleg: { label: 'П.НОГА', title: 'П.НОГА (18-20)' }
};
const HIT_LOCS_HANDY = {
    head: { label: 'ОПТИКА', title: 'ОПТИКА (1-2)', injury: 'голова' },
    torso: { label: 'КОРПУС', title: 'КОРПУС (3-8)', injury: 'торс' },
    larm: { label: 'РУКА 1', title: 'РУКА 1 (9-11)', injury: 'рука' },
    rarm: { label: 'РУКА 2', title: 'РУКА 2 (12-14)', injury: 'рука' },
    lleg: { label: 'РУКА 3', title: 'РУКА 3 (15-17)', injury: 'рука' },
    rleg: { label: 'ДВИГАТЕЛЬ', title: 'ДВИГАТЕЛЬ (18-20)', injury: 'нога' }
};

function hitLocKeyFromD20(n) {
    n = parseInt(n, 10) || 1;
    if (n <= 2) return 'head';
    if (n <= 8) return 'torso';
    if (n <= 11) return 'larm';
    if (n <= 14) return 'rarm';
    if (n <= 17) return 'lleg';
    return 'rleg';
}

function applyHitLocSheet(origin) {
    const handy = typeof isRobotOrigin === 'function' && isRobotOrigin(origin);
    const pack = handy ? HIT_LOCS_HANDY : HIT_LOCS_HUMAN;
    if (typeof HIT_LOCS === 'object') {
        Object.keys(pack).forEach(function (k) {
            if (!HIT_LOCS[k]) return;
            HIT_LOCS[k].label = pack[k].label;
            HIT_LOCS[k].title = pack[k].title;
        });
    }
    document.querySelectorAll('.cs-hit-loc[data-loc]').forEach(function (el) {
        const loc = el.getAttribute('data-loc');
        const meta = pack[loc];
        const name = el.querySelector('.loc-name');
        if (meta && name) name.textContent = meta.title;
    });
    const boy = document.getElementById('cs-vb-full');
    if (boy) {
        const rel = (typeof originIconRel === 'function')
            ? originIconRel(origin)
            : ((PIP_ICONS && PIP_ICONS.vaultFull) || 'vault boy full/vault.svg');
        const src = (typeof iconUrl === 'function') ? iconUrl(rel) : ('icons/' + rel);
        if (boy.getAttribute('src') !== src) boy.setAttribute('src', src);
        boy.removeAttribute('data-human-src');
    }
}

function effectiveHpMax(char, base) {
    base = parseInt(base, 10) || 0;
    if (!char) return base;
    const origin = typeof charOriginOf === 'function' ? charOriginOf(char) : (char['cs-origin'] || '');
    if (originRadImmune(origin)) return base;
    const rads = Math.max(0, parseInt(char.rads, 10) || 0);
    return Math.max(0, base - rads);
}

function applyRadiationToChar(char, amount, opts) {
    opts = opts || {};
    amount = parseInt(amount, 10) || 0;
    if (!char || amount <= 0) return { applied: 0, healed: 0, immune: false };
    const origin = typeof charOriginOf === 'function' ? charOriginOf(char) : (char['cs-origin'] || '');
    if (typeof isRobotOrigin === 'function' && isRobotOrigin(origin)) return { applied: 0, healed: 0, immune: true, reason: 'Робот не получает радиацию.' };
    if (typeof isMutantOrigin === 'function' && isMutantOrigin(origin)) return { applied: 0, healed: 0, immune: true, reason: 'Супермутант не получает радиацию.' };
    if (originHealsFromRads(origin)) {
        const heal = Math.floor(amount / 3);
        const cur = parseInt(char['cs-hp-cur'], 10) || 0;
        const max = parseInt(char['cs-hp-max'], 10) || cur;
        char['cs-hp-cur'] = Math.min(max, cur + heal);
        return { applied: 0, healed: heal, immune: true, reason: 'Гуль: ' + amount + ' рад. → +' + heal + ' ОЗ (1 за 3).' };
    }
    char.rads = Math.max(0, (parseInt(char.rads, 10) || 0) + amount);
    return { applied: amount, healed: 0, immune: false };
}

function healRadiationOnChar(char, amount) {
    amount = parseInt(amount, 10) || 0;
    if (!char || amount <= 0) return 0;
    const origin = typeof charOriginOf === 'function' ? charOriginOf(char) : (char['cs-origin'] || '');
    if (originRadImmune(origin)) return 0;
    const before = parseInt(char.rads, 10) || 0;
    const next = Math.max(0, before - amount);
    char.rads = next;
    return before - next;
}

function tallyCombatDice(values) {
    let damage = 0;
    let effects = 0;
    (values || []).forEach(function (v) {
        if (typeof v === 'number') {
            if (v === 1) damage += 1;
            else if (v === 2) damage += 2;
            else if (v === 5 || v === 6) { damage += 1; effects += 1; }
            return;
        }
        const k = String(v || '');
        if (k === 'one') damage += 1;
        else if (k === 'two') damage += 2;
        else if (k === 'effect') { damage += 1; effects += 1; }
    });
    return { damage: damage, effects: effects };
}

function extraDiceApCost(extra) {
    extra = Math.max(0, Math.min(3, parseInt(extra, 10) || 0));
    if (extra <= 0) return 0;
    if (extra === 1) return 1;
    if (extra === 2) return 3;
    return 6;
}

function evaluateSkillDice(values, tn, skillRank, tagged, complicationAt) {
    const dice = (values || []).map(function (v) { return parseInt(v, 10) || 0; });
    tn = parseInt(tn, 10) || 0;
    skillRank = parseInt(skillRank, 10) || 0;
    complicationAt = parseInt(complicationAt, 10) || 20;
    let successes = 0;
    let complications = 0;
    const detail = [];
    dice.forEach(function (die) {
        if (die >= complicationAt) {
            complications += 1;
            detail.push({ die: die, ok: 0, note: 'осложнение' });
            return;
        }
        if (die <= 0) return;
        const crit = !!(tagged && skillRank > 0 && die <= skillRank);
        if (die === 1 || crit || die <= tn) {
            const n = (die === 1 || crit) ? 2 : 1;
            successes += n;
            detail.push({ die: die, ok: n, note: crit ? 'крит' : (die === 1 ? '1→2' : 'успех') });
        } else {
            detail.push({ die: die, ok: 0, note: 'промах' });
        }
    });
    return { successes: successes, complications: complications, detail: detail, dice: dice };
}

function weaponSkillId(wData, item) {
    const cat = String((wData && wData.category) || '');
    const quals = ((wData && wData.qualities) || []).concat((item && item.qualities) || []).join(' ');
    if (/метательн/i.test(quals) || /метательн/i.test(cat)) return 'throwing';
    if (/энерг/i.test(cat)) return 'energy';
    if (/тяж[её]л/i.test(cat)) return 'bigguns';
    if (/взрыв/i.test(cat)) return 'explosives';
    if (/рукопаш/i.test(cat) || /без оружия/i.test(cat)) return 'unarmed';
    if (/холод|ближн/i.test(cat)) return 'melee';
    return 'smallguns';
}

function weaponIsMelee(wData) {
    const cat = String((wData && wData.category) || '');
    return /холод|ближн|рукопаш/i.test(cat);
}

function weaponSpendsMeleeAp(wData, quals) {
    return weaponIsMelee(wData) || weaponHasQual(quals, 'метательн');
}

function meleeDamageBonus(char) {
    if (!char) return 0;
    let str = parseInt(char['cs-str'], 10) || 5;
    if (typeof charHasPowerFrame === 'function' && charHasPowerFrame(char)) {
        str = (typeof POWER_FRAME_STR === 'number') ? POWER_FRAME_STR : 11;
    }
    let bonus = 0;
    if (str >= 11) bonus = 3;
    else if (str >= 9) bonus = 2;
    else if (str >= 7) bonus = 1;
    if (Array.isArray(char.survivorTraits) && char.survivorTraits.indexOf('heavy') !== -1) bonus += 1;
    return bonus;
}

function weaponHasQual(list, name) {
    const want = String(name || '').toLowerCase().replace(/ё/g, 'е');
    return (list || []).some(function (q) {
        const n = (typeof normalizeQualName === 'function' ? normalizeQualName(q) : String(q)).toLowerCase().replace(/ё/g, 'е');
        return n.indexOf(want) !== -1;
    });
}

function describeTriggeredQuals(quals, effectCount) {
    if (!effectCount) return [];
    const out = [];
    (quals || []).forEach(function (raw) {
        const name = typeof normalizeQualName === 'function' ? normalizeQualName(raw) : String(raw || '');
        const text = typeof getQualEffectText === 'function' ? getQualEffectText(name) : '';
        const n = name.toLowerCase();
        if (/жестокий|порочн|массирован|очередь|оглушающ|продолжит|стойк|устойчив|проникающ|разрушающ|радиоакт|радиацион|разброс/.test(n)) {
            out.push({ name: name, text: text, times: effectCount });
        }
    });
    return out;
}

function parseConsumableUse(item) {
    const title = String((item && (item.title || item.name || item.baseId)) || '');
    const cat = String((item && item.category) || '');
    const desc = String((item && item.desc) || '');
    const blob = title + ' ' + cat + ' ' + desc;
    const out = {
        title: title,
        cat: cat,
        kind: 'other',
        hp: 0,
        radsHeal: 0,
        ap: 0,
        irradiatedCd: 0,
        addiction: 0,
        addictionFamily: '',
        alcohol: false,
        clearAddictions: false,
        sceneLimit: '',
        robotBlocked: false,
        ghoulSkipRad: false,
        notes: desc
    };
    if (/еда/i.test(cat)) { out.kind = 'food'; out.sceneLimit = 'food'; out.robotBlocked = true; }
    else if (/напит/i.test(cat)) { out.kind = 'drink'; out.sceneLimit = 'drink'; out.robotBlocked = true; }
    else if (/препарат/i.test(cat)) { out.kind = 'chem'; out.robotBlocked = true; }
    else if (/аптечк/i.test(cat)) { out.kind = 'med'; }
    if (/алкогол/i.test(blob) || /пиво|бурбон|ром|водка|виски|вино|самогон|грязный обитатель/i.test(title)) {
        out.alcohol = true;
        out.kind = out.kind === 'other' ? 'drink' : out.kind;
        out.sceneLimit = out.sceneLimit || 'drink';
        out.robotBlocked = true;
    }
    const hpM = blob.match(/(?:исцеляет|лечит|\+)\s*(\d+)\s*ОЗ/i) || blob.match(/(\d+)\s*ОЗ/);
    if (hpM) out.hp = parseInt(hpM[1], 10) || 0;
    const radHeal = blob.match(/(?:снимает|лечит|исцеляет)\s*(\d+)\s*(?:очк\w*\s+)?(?:урона\s+от\s+)?рад/i);
    if (radHeal) out.radsHeal = parseInt(radHeal[1], 10) || 0;
    const apM = blob.match(/(?:сразу\s+\+|моментально[^\d]{0,20}|получите\s+\+|полчите\s+\+)(\d+)\s*ОД/i) || blob.match(/\+(\d+)\s*ОД/);
    if (apM && !/начале следующей|пул ОД группы \+1 до конца/i.test(blob)) out.ap = parseInt(apM[1], 10) || 0;
    if (/облуч/i.test(blob)) {
        const two = /2\s*БК/.test(blob);
        out.irradiatedCd = two ? 2 : 1;
    }
    const addM = blob.match(/зав(?:исимость|\.)\s*(\d+)/i);
    if (addM) out.addiction = parseInt(addM[1], 10) || 0;
    if (/аддиктол|снимает все зависимости/i.test(blob)) out.clearAddictions = true;
    if (/ментат/i.test(title)) out.addictionFamily = 'ментаты';
    else if (/винт|ультравинт|реактивное топливо|баффвинт|психовинт/i.test(title)) out.addictionFamily = 'винт';
    else if (/бафф/i.test(title)) out.addictionFamily = 'баффаут';
    else if (/психо/i.test(title)) out.addictionFamily = 'психо';
    else if (out.alcohol) out.addictionFamily = 'алкоголь';
    else if (out.addiction) out.addictionFamily = title;
    if (/рад-х|антирадин/i.test(title)) out.ghoulSkipRad = true;
    if (/стимпак|суперстимпак|целебн/i.test(title)) out.kind = out.kind === 'other' ? 'med' : out.kind;
    return out;
}

function canUseConsumable(char, parsed) {
    if (!char || !parsed) return 'Нет персонажа.';
    const origin = typeof charOriginOf === 'function' ? charOriginOf(char) : (char['cs-origin'] || '');
    if (parsed.robotBlocked && typeof isRobotOrigin === 'function' && isRobotOrigin(origin)) {
        return 'Мистер Помощник не ест, не пьёт и не принимает препараты на себя.';
    }
    if (typeof isRobotOrigin === 'function' && isRobotOrigin(origin) && parsed.hp && /стимпак|суперстимпак|целебн|мазь/i.test(parsed.title)) {
        return 'Робот не лечится стимпаком — только ремонт (ИНТ+Ремонт). Стимпак в инвентаре можно отдать другому.';
    }
    if (parsed.ghoulSkipRad && isGhoulOrigin(origin) && (parsed.radsHeal || /рад-х/i.test(parsed.title))) {
        return 'Рад-Х и Антирадин не действуют на гуля (иммунитет к радиации). Стимпак — можно.';
    }
    const sceneAt = (typeof PipSession !== 'undefined' && PipSession.state && PipSession.state.tableAP && PipSession.state.tableAP.sceneAt) || 0;
    if (parsed.sceneLimit === 'food' && char.sceneUse && char.sceneUse.food && char.sceneUseAt === sceneAt) {
        return 'Уже съели порцию в этой сцене (книга: одна еда за сцену, не в бою).';
    }
    if (parsed.sceneLimit === 'drink' && char.sceneUse && char.sceneUse.drink && char.sceneUseAt === sceneAt) {
        return 'Уже выпили в этой сцене (книга: один напиток за сцену).';
    }
    return '';
}

function dogmeatStatsForLevel(level) {
    level = Math.max(1, parseInt(level, 10) || 1);
    let body = 5;
    let mind = 4;
    let hp = 6 + (level - 1);
    let odd = 0;
    for (let lv = 3; lv <= level; lv += 2) {
        if (odd % 2 === 0) {
            body += 1;
            hp += 1;
        } else mind += 1;
        odd += 1;
    }
    let bite = 2;
    for (let lv = 5; lv <= level; lv += 5) bite += 1;
    return {
        body: body,
        mind: mind,
        melee: 2,
        other: 1,
        hpMax: hp,
        bite: bite,
        def: 1,
        carry: 50,
        tn: body + 2
    };
}

function ensureCompanion(char) {
    if (!char) return null;
    if (!charHasPerk(char, 'Псина')) {
        if (char.companion) char.companion = null;
        return null;
    }
    const lvl = parseInt(char['cs-lvl'], 10) || 1;
    const st = dogmeatStatsForLevel(lvl);
    if (!char.companion || typeof char.companion !== 'object') {
        char.companion = { name: 'Псина', hp: st.hpMax, armor: null };
    }
    char.companion.body = st.body;
    char.companion.mind = st.mind;
    char.companion.melee = st.melee;
    char.companion.hpMax = st.hpMax;
    char.companion.bite = st.bite;
    char.companion.def = st.def;
    char.companion.tn = st.tn;
    let hp = parseInt(char.companion.hp, 10);
    if (!Number.isFinite(hp)) hp = st.hpMax;
    if (hp > st.hpMax) hp = st.hpMax;
    if (hp < 0) hp = 0;
    char.companion.hp = hp;
    if (!char.companion.name) char.companion.name = 'Псина';
    return char.companion;
}

function pipFoldSearch(s) {
    return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/gi, '');
}

function pipLevenshtein(a, b) {
    a = String(a || '');
    b = String(b || '');
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    if (Math.abs(a.length - b.length) > 2) return 9;
    const row = [];
    for (let j = 0; j <= b.length; j++) row[j] = j;
    for (let i = 1; i <= a.length; i++) {
        let prev = i - 1;
        row[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const tmp = row[j];
            const cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
            row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
            prev = tmp;
        }
    }
    return row[b.length];
}

function pipFuzzyMatch(q, hay) {
    if (!q) return true;
    const nq = pipFoldSearch(q);
    const nh = pipFoldSearch(hay);
    if (nq && nh.indexOf(nq) !== -1) return true;
    const tokens = String(q).toLowerCase().replace(/ё/g, 'е').split(/\s+/).filter(Boolean);
    const hayLow = String(hay || '').toLowerCase().replace(/ё/g, 'е');
    if (tokens.length && tokens.every(function (t) {
        return hayLow.indexOf(t) !== -1 || nh.indexOf(pipFoldSearch(t)) !== -1;
    })) return true;
    const words = hayLow.split(/[^a-zа-я0-9]+/).filter(function (w) { return w.length >= 3; });
    return tokens.filter(function (t) { return t.length >= 4; }).every(function (t) {
        const ft = pipFoldSearch(t);
        const max = ft.length >= 6 ? 2 : 1;
        return words.some(function (w) { return pipLevenshtein(ft, pipFoldSearch(w)) <= max; });
    });
}
