/* Генератор групп противников. Книга, гл. 10 + формулы уровня/типа. Только мастер. */
(function () {
    const XP_ORD = [0, 10, 17, 24, 31, 38, 45, 52, 60, 67, 74, 81, 88, 95, 102, 109, 116, 123, 130, 137, 144];
    const RANK_MULT = { ordinary: 1, powerful: 2, known: 2, legendary: 3, major: 3 };
    const RANK_VAL = { ordinary: 0, powerful: 1, known: 1, legendary: 2, major: 2 };
    const HUMAN_RANKS = [
        { id: 'ordinary', label: 'ОБЫЧНЫЙ', sub: 'Рядовой. Без очков удачи.' },
        { id: 'known', label: 'ИЗВЕСТНЫЙ', sub: 'Лейтенант / ветеран. ×2 XP, +УДЧ ОЗ.' },
        { id: 'major', label: 'ГЛАВНЫЙ', sub: 'Лидер. ×3 XP, умирает как игрок.' }
    ];
    const MONSTER_RANKS = [
        { id: 'ordinary', label: 'ОБЫЧНОЕ', sub: 'Базовое существо главы 10.' },
        { id: 'powerful', label: 'МОЩНОЕ', sub: 'Вожак стаи. ×2 ОЗ и XP, +2 к Телу.' },
        { id: 'legendary', label: 'ЛЕГЕНДАРНОЕ', sub: 'Редкий мутант. ×3 ОЗ и XP.' }
    ];
    const ATTRS = [
        { key: 'str', short: 'СИЛ' }, { key: 'per', short: 'ВСП' }, { key: 'end', short: 'ВЫН' },
        { key: 'cha', short: 'ХАР' }, { key: 'int', short: 'ИНТ' }, { key: 'agi', short: 'ЛВК' },
        { key: 'luc', short: 'УДЧ' }
    ];

    function C(o) { o.group = 'monster'; o.kind = o.kind || 'creature'; o.bookRank = o.bookRank || 'ordinary'; return o; }
    function H(o) { o.group = 'human'; o.kind = 'character'; o.bookRank = o.bookRank || 'ordinary'; return o; }

    const TEMPLATES = [
        H({ id: 'raider', name: 'Рейдер', bookLevel: 2, faction: 'raider', bump: 'str',
            special: { str: 6, per: 5, end: 6, cha: 4, int: 5, agi: 6, luc: 4 },
            tagged: ['melee', 'smallguns'],
            skills: { medicine: 1, sneak: 1, melee: 2, survival: 1, repair: 1, throwing: 1, smallguns: 2, unarmed: 2 },
            hp: 8, def: 1, init: 11, wealth: 1, traits: ['Агрессивный'],
            dr: { phys: 1, energy: 2, rad: 0, tox: 0 } }),
        H({ id: 'wastelander', name: 'Житель пустоши', bookLevel: 2, faction: 'wasteland', bump: 'str',
            special: { str: 7, per: 6, end: 7, cha: 4, int: 5, agi: 6, luc: 4 },
            tagged: ['smallguns', 'survival'],
            skills: { athletics: 1, smallguns: 2, barter: 1, speech: 1, melee: 2, survival: 2, repair: 1, unarmed: 1 },
            hp: 8, def: 1, init: 11, wealth: 1, traits: [],
            dr: { phys: 1, energy: 1, rad: 0, tox: 0 } }),
        H({ id: 'bos-knight', name: 'Рыцарь Братства', bookLevel: 7, faction: 'bos', bump: 'per',
            special: { str: 6, per: 6, end: 7, cha: 5, int: 5, agi: 6, luc: 4 },
            tagged: ['energy', 'science'],
            skills: { athletics: 1, science: 3, bigguns: 1, smallguns: 1, energy: 4, speech: 2, pilot: 1, unarmed: 2, repair: 2 },
            hp: 14, def: 1, init: 12, wealth: 2, traits: ['Хорошее владение'],
            dr: { phys: 2, energy: 2, rad: 1, tox: 0 } }),
        H({ id: 'bos-scribe', name: 'Скриптор Братства', bookLevel: 4, faction: 'bos-scribe', bump: 'int',
            special: { str: 5, per: 6, end: 5, cha: 5, int: 7, agi: 5, luc: 4 },
            tagged: ['science', 'repair'],
            skills: { science: 3, repair: 3, energy: 2, medicine: 2, speech: 1, unarmed: 1 },
            hp: 9, def: 1, init: 11, wealth: 1, traits: [],
            dr: { phys: 1, energy: 2, rad: 2, tox: 0 } }),
        H({ id: 'minuteman', name: 'Минитмен', bookLevel: 7, faction: 'minuteman', bump: 'per',
            special: { str: 6, per: 7, end: 5, cha: 7, int: 5, agi: 5, luc: 4 },
            tagged: ['energy', 'speech'],
            skills: { energy: 3, speech: 3, survival: 2, smallguns: 2, athletics: 1, unarmed: 1 },
            hp: 12, def: 1, init: 12, wealth: 1, traits: [],
            dr: { phys: 1, energy: 1, rad: 0, tox: 0 } }),
        H({ id: 'gunner', name: 'Стрелок', bookLevel: 6, faction: 'gunner', bump: 'agi',
            special: { str: 5, per: 6, end: 6, cha: 5, int: 5, agi: 7, luc: 4 },
            tagged: ['smallguns', 'sneak'],
            skills: { smallguns: 3, sneak: 2, explosives: 2, unarmed: 2, athletics: 1, survival: 1 },
            hp: 12, def: 1, init: 13, wealth: 2, traits: [],
            dr: { phys: 2, energy: 2, rad: 2, tox: 0 } }),
        H({ id: 'merc', name: 'Наёмник', bookLevel: 6, faction: 'merc', bump: 'str',
            special: { str: 6, per: 6, end: 6, cha: 5, int: 5, agi: 6, luc: 4 },
            tagged: ['smallguns', 'melee'],
            skills: { smallguns: 3, melee: 2, unarmed: 2, survival: 2, sneak: 1, barter: 1 },
            hp: 12, def: 1, init: 12, wealth: 2, traits: [],
            dr: { phys: 2, energy: 2, rad: 0, tox: 0 } }),
        H({ id: 'coa', name: 'Дитя Атома', bookLevel: 6, faction: 'coa', bump: 'cha',
            special: { str: 5, per: 5, end: 6, cha: 8, int: 5, agi: 5, luc: 5 },
            tagged: ['speech', 'energy'],
            skills: { speech: 3, energy: 2, survival: 2, medicine: 1, unarmed: 1 },
            hp: 12, def: 1, init: 10, wealth: 1, traits: ['Иммунитет к радиации'],
            immune: ['rad'], dr: { phys: 1, energy: 1, rad: 2, tox: 0 } }),
        H({ id: 'railroad', name: 'Агент «Подземки»', bookLevel: 7, faction: 'railroad', bump: 'agi',
            special: { str: 6, per: 7, end: 5, cha: 7, int: 5, agi: 5, luc: 4 },
            tagged: ['sneak', 'speech'],
            skills: { sneak: 3, speech: 3, smallguns: 2, lockpick: 2, unarmed: 1 },
            hp: 12, def: 1, init: 12, wealth: 1, traits: [],
            dr: { phys: 1, energy: 1, rad: 0, tox: 0 } }),
        H({ id: 'scientist', name: 'Учёный Института', bookLevel: 7, faction: 'institute', bump: 'int',
            special: { str: 4, per: 8, end: 5, cha: 5, int: 8, agi: 5, luc: 4 },
            tagged: ['science', 'energy'],
            skills: { science: 4, energy: 2, medicine: 2, repair: 2, unarmed: 1 },
            hp: 12, def: 1, init: 13, wealth: 2, traits: [],
            dr: { phys: 0, energy: 0, rad: 0, tox: 0 } }),
        H({ id: 'trader', name: 'Торговец', bookLevel: 4, faction: 'trader', bump: 'cha', bookRank: 'known',
            special: { str: 5, per: 6, end: 6, cha: 9, int: 8, agi: 5, luc: 5 },
            tagged: ['barter', 'speech', 'survival'],
            skills: { barter: 4, speech: 3, survival: 2, smallguns: 2, repair: 1, unarmed: 1 },
            hp: 15, def: 1, init: 13, wealth: 3, traits: [],
            dr: { phys: 1, energy: 2, rad: 0, tox: 0 } }),
        H({ id: 'vault', name: 'Выходец из убежища', bookLevel: 7, faction: 'vault', bump: 'end',
            special: { str: 5, per: 6, end: 7, cha: 6, int: 6, agi: 6, luc: 5 },
            tagged: ['science', 'smallguns'],
            skills: { science: 2, smallguns: 2, medicine: 2, repair: 2, speech: 2, unarmed: 1, athletics: 1 },
            hp: 14, def: 1, init: 12, wealth: 1, traits: [],
            dr: { phys: 1, energy: 1, rad: 2, tox: 0 } }),

        C({ id: 'bloodbug', name: 'Гнус', bookLevel: 5, size: 'small', bump: 'body',
            body: 6, mind: 5, melee: 1, ranged: 0, other: 2, hp: 9, init: 11, def: 2,
            immune: ['rad', 'tox'], dr: { phys: 0, energy: 0, rad: 99, tox: 99 },
            attacks: [{ name: 'Хоботок', skill: 'melee', dmg: 5, extra: 'Физический' }],
            traits: ['Полёт', 'Маленькое'] }),
        C({ id: 'bloatfly', name: 'Дутень', bookLevel: 2, size: 'small', bump: 'body',
            body: 5, mind: 4, melee: 1, ranged: 2, other: 2, hp: 6, init: 9, def: 2,
            immune: ['rad'], dr: { phys: 0, energy: 0, rad: 99, tox: 0 },
            attacks: [{ name: 'Дротик-личинка', skill: 'ranged', dmg: 4, extra: 'Радиоактивный, физ., дист. С' }],
            traits: ['Полёт', 'Маленькое'] }),
        C({ id: 'brahmin', name: 'Брамин', bookLevel: 3, size: 'large', bump: 'body',
            body: 6, mind: 4, melee: 1, ranged: 0, other: 2, hp: 9, init: 10, def: 1,
            immune: ['rad'], dr: { phys: 1, energy: 0, rad: 99, tox: 0 },
            attacks: [{ name: 'Удар рогами', skill: 'melee', dmg: 4, extra: 'Радиационный, физ.' }],
            traits: ['Большое'] }),
        C({ id: 'deathclaw', name: 'Коготь смерти', bookLevel: 11, size: 'large', bump: 'body',
            body: 9, mind: 5, melee: 5, ranged: 0, other: 3, hp: 20, init: 14, def: 2,
            immune: ['rad'], dr: { phys: 6, energy: 9, rad: 99, tox: 9 },
            attacks: [{ name: 'Когти', skill: 'melee', dmg: 6, extra: 'Проникающий 1, физ.' }],
            traits: ['Большое'] }),
        C({ id: 'dog', name: 'Собака', bookLevel: 3, bump: 'body',
            body: 5, mind: 5, melee: 3, ranged: 0, other: 2, hp: 8, init: 10, def: 1,
            dr: { phys: 0, energy: 0, rad: 0, tox: 0 },
            attacks: [{ name: 'Укус', skill: 'melee', dmg: 4, extra: 'Физический' }],
            traits: ['Острые чувства'] }),
        C({ id: 'mirelurk-hatchling', name: 'Детёныш болотника', bookLevel: 1, size: 'small', bump: 'body',
            body: 4, mind: 4, melee: 1, ranged: 0, other: 1, hp: 5, init: 8, def: 2,
            immune: ['rad'], dr: { phys: 0, energy: 0, rad: 99, tox: 0 },
            attacks: [{ name: 'Клешни', skill: 'melee', dmg: 3, extra: 'Физический' }],
            traits: ['Маленькое'] }),
        C({ id: 'mirelurk', name: 'Болотник', bookLevel: 7, bump: 'body',
            body: 7, mind: 5, melee: 4, ranged: 0, other: 3, hp: 14, init: 12, def: 1,
            immune: ['rad'], dr: { phys: 4, energy: 2, rad: 99, tox: 4 },
            attacks: [{ name: 'Клешни', skill: 'melee', dmg: 6, extra: 'Физический' }],
            traits: ['Панцирь: слабое место — лицо'] }),
        C({ id: 'mirelurk-hunter', name: 'Болотник-охотник', bookLevel: 12, bump: 'body',
            body: 8, mind: 6, melee: 5, ranged: 0, other: 4, hp: 20, init: 14, def: 1,
            immune: ['rad'], dr: { phys: 4, energy: 2, rad: 99, tox: 4 },
            attacks: [{ name: 'Клешни', skill: 'melee', dmg: 9, extra: 'Физический' }],
            traits: ['Панцирь: слабое место — лицо'] }),
        C({ id: 'mirelurk-queen', name: 'Королева болотников', bookLevel: 19, size: 'large', bump: 'body',
            body: 12, mind: 6, melee: 5, ranged: 0, other: 4, hp: 50, init: 18, def: 1,
            immune: ['rad'], dr: { phys: 10, energy: 7, rad: 99, tox: 9 },
            attacks: [{ name: 'Клешни', skill: 'melee', dmg: 12, extra: 'Физический' }],
            traits: ['Большое'] }),
        C({ id: 'molerat', name: 'Кротокрыс', bookLevel: 2, bump: 'body',
            body: 5, mind: 4, melee: 2, ranged: 0, other: 2, hp: 7, init: 9, def: 1,
            immune: ['rad'], dr: { phys: 1, energy: 0, rad: 99, tox: 0 },
            attacks: [{ name: 'Укус', skill: 'melee', dmg: 4, extra: 'Физический' }],
            traits: ['Дикий'] }),
        C({ id: 'mutt', name: 'Гончая-мутант', bookLevel: 4, bump: 'body',
            body: 9, mind: 5, melee: 3, ranged: 0, other: 1, hp: 10, init: 10, def: 1,
            immune: ['rad', 'tox'], dr: { phys: 1, energy: 1, rad: 99, tox: 99 },
            attacks: [{ name: 'Укус', skill: 'melee', dmg: 3, extra: 'Физический' }],
            traits: ['Дикий', 'Агрессивный'] }),
        C({ id: 'radroach', name: 'Радтаракан', bookLevel: 1, size: 'small', bump: 'body',
            body: 5, mind: 4, melee: 1, ranged: 0, other: 2, hp: 6, init: 9, def: 2,
            immune: ['rad', 'tox'], dr: { phys: 0, energy: 0, rad: 99, tox: 99 },
            attacks: [{ name: 'Укус', skill: 'melee', dmg: 1, extra: 'Радиоактивный, физ.' }],
            traits: ['Маленькое', 'Дикий'] }),
        C({ id: 'radscorpion', name: 'Радскорпион', bookLevel: 7, size: 'large', bump: 'body',
            body: 7, mind: 5, melee: 5, ranged: 0, other: 3, hp: 21, init: 12, def: 1,
            immune: ['rad', 'tox'], dr: { phys: 4, energy: 3, rad: 99, tox: 99 },
            attacks: [{ name: 'Клешня', skill: 'melee', dmg: 4, extra: 'Жестокий, физ.' }],
            traits: ['Большое'] }),
        C({ id: 'radstag', name: 'Рад-олень', bookLevel: 5, bump: 'body',
            body: 5, mind: 5, melee: 3, ranged: 0, other: 2, hp: 10, init: 10, def: 1,
            immune: ['rad'], dr: { phys: 1, energy: 0, rad: 99, tox: 0 },
            attacks: [{ name: 'Удар рогами', skill: 'melee', dmg: 5, extra: 'Проникающий 1, физ.' }],
            traits: [] }),
        C({ id: 'stingwing', name: 'Жалокрыл', bookLevel: 5, size: 'small', bump: 'body',
            body: 6, mind: 5, melee: 3, ranged: 0, other: 2, hp: 9, init: 11, def: 2,
            immune: ['rad', 'tox'], dr: { phys: 0, energy: 0, rad: 99, tox: 99 },
            attacks: [{ name: 'Жало', skill: 'melee', dmg: 2, extra: 'Продолжительный (токсический), физ.' }],
            traits: ['Полёт', 'Маленькое'] }),
        C({ id: 'yaoguai', name: 'Яо-гуай', bookLevel: 14, size: 'large', bump: 'body',
            body: 9, mind: 6, melee: 5, ranged: 0, other: 4, hp: 37, init: 15, def: 1,
            immune: ['rad'], dr: { phys: 2, energy: 1, rad: 99, tox: 2 },
            attacks: [{ name: 'Когти', skill: 'melee', dmg: 9, extra: 'Жестокий, физ.' }],
            traits: ['Большое', 'Агрессивный'] }),
        C({ id: 'feral-ghoul', name: 'Дикий гуль', bookLevel: 3, bump: 'body',
            body: 5, mind: 5, melee: 3, ranged: 0, other: 2, hp: 8, init: 10, def: 1,
            immune: ['rad'], dr: { phys: 0, energy: 0, rad: 99, tox: 2 },
            attacks: [{ name: 'Атака руками', skill: 'melee', dmg: 3, extra: 'Радиоактивный, физ.' }],
            traits: ['Дикий'] }),
        C({ id: 'glowing-one', name: 'Светящийся гуль', bookLevel: 9, bump: 'body',
            body: 8, mind: 5, melee: 5, ranged: 0, other: 3, hp: 21, init: 12, def: 1,
            immune: ['rad', 'tox'], dr: { phys: 4, energy: 3, rad: 99, tox: 99 },
            attacks: [{ name: 'Атака руками', skill: 'melee', dmg: 3, extra: 'Радиоактивный, физ.' }],
            traits: ['Дикий', 'Свечение'] }),
        C({ id: 'sentry', name: 'Штурмотрон', bookLevel: 13, bump: 'body',
            body: 9, mind: 6, melee: 5, ranged: 5, other: 4, hp: 22, init: 15, def: 1,
            immune: ['rad', 'tox'], dr: { phys: 3, energy: 3, rad: 99, tox: 99 },
            attacks: [{ name: 'Лазер / когти', skill: 'ranged', dmg: 9, extra: 'Энерг. или физ.' }],
            traits: ['Робот'] }),
        C({ id: 'eyebot', name: 'Робоглаз', bookLevel: 2, size: 'small', bump: 'mind',
            body: 5, mind: 4, melee: 0, ranged: 3, other: 1, hp: 5, init: 9, def: 2,
            immune: ['rad', 'tox'], dr: { phys: 2, energy: 2, rad: 99, tox: 99 },
            attacks: [{ name: 'Лазер', skill: 'ranged', dmg: 4, extra: 'Жестокий, энерг., дист. С' }],
            traits: ['Робот', 'Маленькое', 'Полёт'] }),
        C({ id: 'protectron', name: 'Протектрон', bookLevel: 3, bump: 'body',
            body: 5, mind: 5, melee: 2, ranged: 2, other: 2, hp: 8, init: 10, def: 1,
            immune: ['rad', 'tox'], dr: { phys: 4, energy: 3, rad: 99, tox: 99 },
            attacks: [{ name: 'Клешни', skill: 'melee', dmg: 3, extra: 'Физический' }],
            traits: ['Робот'] }),
        C({ id: 'sentrybot', name: 'Робот-охранник', bookLevel: 15, size: 'large', bump: 'body',
            body: 10, mind: 6, melee: 4, ranged: 5, other: 4, hp: 40, init: 16, def: 1,
            immune: ['rad', 'tox'], dr: { phys: 6, energy: 5, rad: 99, tox: 99 },
            attacks: [{ name: 'Миниган / ракеты', skill: 'ranged', dmg: 8, extra: 'Жестокий, физ.' }],
            traits: ['Робот', 'Большое'] }),
        C({ id: 'supermutant', name: 'Супермутант', bookLevel: 5, kind: 'character', faction: 'mutant', bump: 'str',
            special: { str: 9, per: 5, end: 7, cha: 4, int: 4, agi: 5, luc: 4 },
            tagged: ['melee', 'bigguns'],
            skills: { melee: 3, bigguns: 2, unarmed: 3, survival: 1 },
            hp: 12, def: 1, init: 10, wealth: 1, traits: ['Иммунитет к радиации и яду'],
            immune: ['rad', 'tox'], dr: { phys: 2, energy: 2, rad: 99, tox: 99 } }),
        C({ id: 'behemoth', name: 'Супермутант-бегемот', bookLevel: 18, size: 'large', bump: 'body',
            body: 12, mind: 5, melee: 5, ranged: 0, other: 4, hp: 48, init: 17, def: 1,
            immune: ['rad', 'tox'], dr: { phys: 8, energy: 5, rad: 99, tox: 8 },
            attacks: [{ name: 'Пожарный гидрант', skill: 'melee', dmg: 11, extra: 'Жестокий, разрушающий, физ.' }],
            traits: ['Большое'] }),
        C({ id: 'synth', name: 'Синт 1-го поколения', bookLevel: 4, bump: 'body',
            body: 6, mind: 5, melee: 2, ranged: 2, other: 2, hp: 10, init: 11, def: 1,
            immune: ['rad', 'tox'], dr: { phys: 2, energy: 3, rad: 99, tox: 99 },
            attacks: [{ name: 'Лазер Института', skill: 'ranged', dmg: 4, extra: 'Жестокий, массированный, энерг.' }],
            traits: ['Робот'] }),
        C({ id: 'turret-mg', name: 'Пулемётная турель', bookLevel: 5, bump: 'body',
            body: 6, mind: 5, melee: 0, ranged: 3, other: 0, hp: 11, init: 11, def: 1,
            immune: ['rad', 'tox'], dr: { phys: 1, energy: 1, rad: 99, tox: 99 },
            attacks: [{ name: 'Пулемёт', skill: 'ranged', dmg: 5, extra: 'Разброс, скоростр. 3, дист. С' }],
            traits: ['Робот', 'Стационарная'] }),
        C({ id: 'turret-laser', name: 'Лазерная турель', bookLevel: 5, size: 'small', bump: 'mind',
            body: 6, mind: 5, melee: 0, ranged: 3, other: 0, hp: 9, init: 11, def: 2,
            immune: ['rad', 'tox'], dr: { phys: 1, energy: 2, rad: 99, tox: 99 },
            attacks: [{ name: 'Лазер', skill: 'ranged', dmg: 4, extra: 'Массированный, проникающий 1, энерг.' }],
            traits: ['Робот', 'Маленькое', 'Стационарная'] })
    ];

    const BY_ID = {};
    TEMPLATES.forEach(t => { BY_ID[t.id] = t; });

    function esc(s) {
        if (typeof escapePipHtml === 'function') return escapePipHtml(s);
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }
    function clamp(n, a, b) { n = parseInt(n, 10) || 0; return Math.max(a, Math.min(b, n)); }
    function nid(prefix) { return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6); }
    function copy(o) { return JSON.parse(JSON.stringify(o)); }

    function xpFor(level, rank) {
        level = clamp(level, 1, 30);
        let base = level <= 20 ? XP_ORD[level] : 144 + (level - 20) * 7;
        return base * (RANK_MULT[rank] || 1);
    }
    function meleeBonus(str) {
        str = parseInt(str, 10) || 0;
        if (str >= 11) return 3;
        if (str >= 9) return 2;
        if (str >= 7) return 1;
        return 0;
    }
    function defenseOf(agi, size) {
        let d = (parseInt(agi, 10) || 0) >= 9 ? 2 : 1;
        if (size === 'small') d += 1;
        if (size === 'large') d = Math.max(1, d - 1);
        return d;
    }
    function weaponsDb() {
        if (typeof weaponDB !== 'undefined' && weaponDB.weapons) return weaponDB.weapons;
        if (typeof masterDB !== 'undefined' && masterDB.weapons) return masterDB.weapons;
        return {};
    }
    function weaponRarity(name) {
        const w = weaponsDb()[name];
        return w && w.rarity != null ? parseInt(w.rarity, 10) || 0 : 0;
    }
    function pickByRarity(names, level) {
        const maxR = level <= 2 ? 0 : level <= 4 ? 1 : level <= 7 ? 2 : level <= 11 ? 3 : level <= 16 ? 4 : 5;
        const minR = level <= 3 ? 0 : level <= 6 ? 0 : level <= 10 ? 1 : level <= 14 ? 2 : 3;
        const db = weaponsDb();
        const ok = names.filter(n => db[n]);
        if (!ok.length) return names[0] || '';
        let best = ok[0], bestScore = 99;
        ok.forEach(n => {
            const r = weaponRarity(n);
            if (r > maxR + 1) return;
            const score = r < minR ? (minR - r) + 2 : (r > maxR ? r - maxR : 0);
            if (score < bestScore || (score === bestScore && Math.abs(r - maxR) < Math.abs(weaponRarity(best) - maxR))) {
                best = n; bestScore = score;
            }
        });
        const inBand = ok.filter(n => { const r = weaponRarity(n); return r >= minR && r <= maxR; });
        if (inBand.length) return inBand[inBand.length - 1];
        return best;
    }
    function perkGate(hint) {
        const h = String(hint || '');
        if (/Фанатик оружия 4|Бронник 4|Кузнец 3/.test(h)) return 4;
        if (/Фанатик оружия 3|Бронник 3|Кузнец 3/.test(h)) return 3;
        if (/Фанатик оружия 2|Бронник 2|Кузнец 2/.test(h)) return 2;
        if (/Фанатик оружия 1|Бронник 1|Кузнец 1/.test(h)) return 1;
        return 0;
    }
    function allowedPerk(level) {
        if (level >= 12) return 4;
        if (level >= 8) return 3;
        if (level >= 5) return 2;
        if (level >= 3) return 1;
        return 0;
    }
    function attachMods(baseId, level) {
        const w = weaponsDb()[baseId];
        const mods = {};
        if (!w || !w.slots) return mods;
        const want = Math.min(3, Math.floor(level / 2));
        if (want <= 0) return mods;
        const cap = allowedPerk(level);
        const slots = Object.keys(w.slots);
        let placed = 0;
        for (let s = 0; s < slots.length && placed < want; s++) {
            const slot = slots[s];
            const arr = w.slots[slot] || [];
            let idx = -1;
            for (let i = arr.length - 1; i >= 1; i--) {
                const m = arr[i];
                if (!m || m.name === 'Стандартный') continue;
                if (perkGate(m.hint) > cap) continue;
                idx = i; break;
            }
            if (idx > 0) { mods[slot] = idx; placed++; }
        }
        return mods;
    }
    function gearItem(type, baseId, extra) {
        const it = Object.assign({ type: type, baseId: baseId, title: baseId }, extra || {});
        if (type === 'weapon' && typeof weaponDisplayName === 'function') {
            it.title = weaponDisplayName(it) || baseId;
        }
        return it;
    }
    function armorSet(style, level) {
        const band = level <= 3 ? 0 : level <= 6 ? 1 : level <= 10 ? 2 : level <= 14 ? 3 : 4;
        const sets = {
            raider: [
                ['Рейдерский нагрудник', 'Рейдерский понож', 'Рейдерский наруч', 'Дорожная кожа'],
                ['Кожаный нагрудник', 'Кожаный понож', 'Кожаный наруч'],
                ['Металлический нагрудник', 'Металлический понож', 'Металлический наруч', 'Металлический шлем'],
                ['Нагрудник силовой брони рейдеров', 'Понож силовой брони рейдеров', 'Наруч силовой брони рейдеров', 'Шлем силовой брони рейдеров', 'Каркас силовой брони']
            ],
            leather: [
                ['Дорожная кожа'],
                ['Кожаный нагрудник', 'Кожаный понож', 'Кожаный наруч'],
                ['Металлический нагрудник', 'Металлический понож', 'Металлический наруч'],
                ['Боевой нагрудник', 'Боевой понож', 'Боевой наруч', 'Боевой шлем']
            ],
            combat: [
                ['Прочная одежда'],
                ['Кожаный нагрудник', 'Кожаный понож'],
                ['Боевой нагрудник', 'Боевой понож', 'Боевой наруч', 'Боевой шлем'],
                ['Нагрудник силовой брони T-45', 'Понож силовой брони T-45', 'Наруч силовой брони T-45', 'Шлем силовой брони T-45', 'Каркас силовой брони']
            ],
            bos: [
                ['Униформа Братства Стали'],
                ['Доспехи писца Братства'],
                ['Боевой нагрудник', 'Боевой понож', 'Боевой наруч', 'Боевой шлем', 'Униформа Братства Стали'],
                ['Нагрудник силовой брони T-60', 'Понож силовой брони T-60', 'Наруч силовой брони T-60', 'Шлем силовой брони T-60', 'Каркас силовой брони']
            ],
            vault: [['Комбинезон Убежища'], ['Комбинезон Убежища', 'Кожаный нагрудник'], ['Комбинезон Убежища', 'Нагрудник охранника Волт-Тек', 'Понож охранника Волт-Тек']],
            lab: [['Лабораторный халат'], ['Лабораторный халат'], ['Лабораторный халат', 'Шлем синтов']],
            mutant: [[], ['Шипастая броня'], ['Шипастая броня'], ['Шипастая броня']]
        };
        const ladder = sets[style] || sets.leather;
        const idx = Math.min(band, ladder.length - 1);
        return (ladder[idx] || []).map(name => gearItem('armor', name, { desc: '' }));
    }
    function consumablesFor(level, faction) {
        const out = [];
        if (level >= 2) out.push(gearItem('item', 'Стимпак', { qty: 1 + Math.floor(level / 5), desc: 'Исцеляет 4 ОЗ' }));
        if (faction === 'raider' && level >= 4) out.push(gearItem('item', 'Винт', { qty: 1, desc: 'Доп. действия дешевле' }));
        if (faction === 'raider' && level >= 7) out.push(gearItem('item', 'Психо', { qty: 1, desc: '+2 БК и +3 Физ.СУ' }));
        if (level >= 6 && faction !== 'scientist') out.push(gearItem('weapon', level >= 12 ? 'Осколочная граната' : 'Коктейль Молотова', { qty: 1 }));
        if (level >= 10) out.push(gearItem('item', 'Стимпак', { qty: 2, desc: 'запас' }));
        return out;
    }
    const FACTION_GUNS = {
        raider: ['Кустарный пистолет', 'Кустарный револьвер', '10-мм пистолет', 'Двуствольный дробовик', 'Боевой дробовик', 'Охотничий карабин', '.44 Револьвер', 'Штурмовой карабин'],
        wasteland: ['Кустарный карабин', '10-мм пистолет', 'Охотничий карабин', 'Лазерный мушкет', 'Боевой карабин'],
        bos: ['Лазерный пистолет', 'Лазерный мушкет', 'Лазерный пистолет', 'Гатлинг-лазер'],
        'bos-scribe': ['Лазерный пистолет', '10-мм пистолет'],
        minuteman: ['Лазерный мушкет', 'Охотничий карабин', 'Лазерный пистолет'],
        gunner: ['10-мм пистолет', 'Боевой карабин', 'Штурмовой карабин', 'Боевой дробовик'],
        merc: ['10-мм пистолет', 'Боевой карабин', 'Охотничий карабин'],
        coa: ['Сигнальный пистолет', 'Гамма-пушка', 'Лазерный мушкет'],
        railroad: ['10-мм пистолет', 'Кустарный пистолет', '.44 Револьвер'],
        institute: ['Лазер Института', 'Лазерный пистолет'],
        trader: ['10-мм пистолет', 'Кустарный пистолет'],
        vault: ['10-мм пистолет', 'Лазерный пистолет'],
        mutant: ['Дрын', 'Бейсбольная бита', 'Кувалда', 'Миниган']
    };
    const FACTION_MELEE = {
        raider: ['Монтировка', 'Мачете', 'Бейсбольная бита', 'Кувалда'],
        wasteland: ['Монтировка', 'Боевой нож', 'Дрын'],
        bos: ['Боевой нож'],
        'bos-scribe': ['Боевой нож'],
        minuteman: ['Боевой нож'],
        gunner: ['Боевой нож', 'Мачете'],
        merc: ['Мачете', 'Боевой нож'],
        coa: ['Трость'],
        railroad: ['Выкидной нож', 'Боевой нож'],
        institute: ['Боевой нож'],
        trader: ['Боевой нож'],
        vault: ['Боевой нож'],
        mutant: ['Дрын', 'Кувалда', 'Суперкувалда']
    };
    const FACTION_ARMOR = {
        raider: 'raider', wasteland: 'leather', bos: 'bos', 'bos-scribe': 'bos',
        minuteman: 'leather', gunner: 'combat', merc: 'combat', coa: 'leather',
        railroad: 'leather', institute: 'lab', trader: 'leather', vault: 'vault', mutant: 'mutant'
    };

    function buildGear(tpl, level) {
        if (tpl.kind === 'creature' && !tpl.faction) return [];
        const fac = tpl.faction || 'wasteland';
        const gun = pickByRarity(FACTION_GUNS[fac] || FACTION_GUNS.wasteland, level);
        const melee = pickByRarity(FACTION_MELEE[fac] || FACTION_MELEE.wasteland, Math.max(1, level - 1));
        const gear = [];
        if (gun) {
            const mods = attachMods(gun, level);
            gear.push(gearItem('weapon', gun, { mods: mods }));
        }
        if (melee && melee !== gun) gear.push(gearItem('weapon', melee, { mods: attachMods(melee, Math.max(1, level - 2)) }));
        gear.push.apply(gear, armorSet(FACTION_ARMOR[fac] || 'leather', level));
        gear.push.apply(gear, consumablesFor(level, fac));
        return gear;
    }

    function skillForWeapon(baseId) {
        const w = weaponsDb()[baseId];
        const cat = (w && w.category) || '';
        if (cat === 'Энергетическое') return { attr: 'per', skill: 'energy' };
        if (cat === 'Тяжелое') return { attr: 'end', skill: 'bigguns' };
        if (cat === 'Холодное') return { attr: 'str', skill: 'melee' };
        if (cat === 'Рукопашное') return { attr: 'str', skill: 'unarmed' };
        if (cat === 'Взрывчатка') return { attr: 'per', skill: 'explosives' };
        return { attr: 'agi', skill: 'smallguns' };
    }
    function weaponDmg(baseId, mods, str) {
        const w = weaponsDb()[baseId];
        let dmg = w ? (w.baseDamage || 0) : 0;
        const slots = w && w.slots || {};
        Object.keys(mods || {}).forEach(slot => {
            const arr = slots[slot] || [];
            const m = arr[mods[slot]];
            if (!m || !m.effects) return;
            if (m.effects.isSetDmg) dmg = m.effects.dmg;
            else dmg += m.effects.dmg || 0;
        });
        const cat = (w && w.category) || '';
        if (cat === 'Холодное' || cat === 'Рукопашное') dmg += meleeBonus(str);
        return Math.max(1, dmg);
    }
    function characterAttacks(foe) {
        const attacks = [{
            name: 'Безоружная',
            tn: (foe.special.str || 0) + (foe.skills.unarmed || 0),
            dmg: 2 + meleeBonus(foe.special.str),
            extra: 'Физический'
        }];
        (foe.gear || []).forEach(g => {
            if (g.type !== 'weapon') return;
            const map = skillForWeapon(g.baseId);
            const attr = foe.special[map.attr] || 0;
            const sk = foe.skills[map.skill] || 0;
            attacks.push({
                name: g.title || g.baseId,
                tn: attr + sk,
                dmg: weaponDmg(g.baseId, g.mods, foe.special.str),
                extra: ''
            });
        });
        return attacks;
    }
    function creatureAttacks(src, deltaLv, body, mind) {
        return (src.attacks || []).map(a => {
            const sk = a.skill === 'ranged' ? (src.ranged || 0) : a.skill === 'other' ? (src.other || 0) : (src.melee || 0);
            const attr = a.skill === 'ranged' || a.skill === 'other' ? mind : body;
            const extraDmg = Math.max(0, Math.floor(deltaLv / 2));
            return { name: a.name, tn: attr + sk, dmg: (a.dmg || 0) + extraDmg, extra: a.extra || '' };
        });
    }

    function scaleSpecial(spec, fromLv, toLv, bump) {
        const out = Object.assign({}, spec);
        const gained = toLv - fromLv;
        if (gained === 0) return out;
        const key = bump && out[bump] != null ? bump : 'str';
        const oddSteps = (a, b) => {
            let n = 0;
            const step = b > a ? 1 : -1;
            for (let lv = a + step; step > 0 ? lv <= b : lv >= b; lv += step) {
                if (Math.abs(lv) % 2 === 1) n += step;
            }
            return n;
        };
        out[key] = clamp(out[key] + oddSteps(fromLv, toLv), 4, 12);
        return out;
    }

    function generate(templateId, level, rank) {
        const src = BY_ID[templateId];
        if (!src) return null;
        level = clamp(level, 1, 21);
        rank = rank || 'ordinary';
        const delta = level - src.bookLevel;
        const foe = {
            id: nid('foe'),
            templateId: src.id,
            name: src.name,
            group: src.group,
            kind: src.kind,
            rank: rank,
            level: level,
            size: src.size || '',
            traits: (src.traits || []).slice(),
            immune: (src.immune || []).slice(),
            wealth: (src.wealth || 1) + Math.max(0, Math.floor((level - src.bookLevel) / 3)),
            gear: [],
            attacks: [],
            notes: ''
        };

        if (src.kind === 'character') {
            foe.special = scaleSpecial(src.special, src.bookLevel, level, src.bump);
            foe.skills = Object.assign({}, src.skills || {});
            foe.tagged = (src.tagged || []).slice();
            const bumpSkill = foe.tagged[0] || 'smallguns';
            foe.skills[bumpSkill] = clamp((foe.skills[bumpSkill] || 0) + delta, 0, 5);
            const luckPts = rank === 'major' ? (foe.special.luc || 0)
                : rank === 'known' ? Math.ceil((foe.special.luc || 0) / 2) : 0;
            foe.luckPts = luckPts;
            let hp = (src.hp || 0) + delta;
            const fromR = RANK_VAL[src.bookRank || 'ordinary'] || 0;
            const toR = RANK_VAL[rank] || 0;
            if (toR > fromR) {
                const luc = foe.special.luc || 0;
                hp += (toR === 2 && fromR === 0) ? luc * 2 : luc;
            }
            foe.hpMax = Math.max(1, hp);
            foe.hp = foe.hpMax;
            foe.def = defenseOf(foe.special.agi, src.size);
            foe.init = (foe.special.per || 0) + (foe.special.agi || 0)
                + (rank === 'known' ? 2 : rank === 'major' ? 4 : 0);
            foe.meleeBonus = meleeBonus(foe.special.str);
            foe.dr = Object.assign({ phys: 0, energy: 0, rad: 0, tox: 0 }, src.dr || {});
            const drSteps = Math.max(0, Math.floor(delta / 2));
            foe.dr.phys += drSteps;
            foe.gear = buildGear(src, level);
            foe.attacks = characterAttacks(foe);
        } else {
            foe.body = clamp((src.body || 4) + (delta > 0 ? Math.ceil(delta / 2) : Math.floor(delta / 2)), 4, 12);
            foe.mind = clamp(src.mind || 4, 4, 12);
            foe.melee = clamp((src.melee || 0), 0, 5);
            foe.ranged = src.ranged == null ? 0 : src.ranged;
            foe.other = src.other || 0;
            if (src.bump === 'mind') foe.mind = clamp(foe.mind + (delta > 0 ? Math.ceil(delta / 2) : 0), 4, 12);
            let hp = (src.hp || (foe.body + src.bookLevel)) + delta * (src.size === 'large' ? 2 : 1);
            if (src.size === 'small') hp = foe.body + Math.ceil(level / 2);
            const want = RANK_VAL[rank] || 0;
            const had = RANK_VAL[src.bookRank || 'ordinary'] || 0;
            const extra = Math.max(0, want - had);
            if (extra >= 1) {
                foe.body = clamp(foe.body + 2, 4, 12);
                hp = hp * 2;
            }
            if (extra >= 2) {
                foe.mind = clamp(foe.mind + 2, 4, 12);
                hp = Math.round(hp * 1.5);
            }
            foe.hpMax = Math.max(1, hp);
            foe.hp = foe.hpMax;
            foe.def = src.def || defenseOf(foe.body, src.size);
            if (src.size === 'small') foe.def = Math.max(foe.def, 2);
            foe.init = foe.body + foe.mind;
            foe.dr = Object.assign({ phys: 0, energy: 0, rad: 0, tox: 0 }, src.dr || {});
            const drSteps = Math.max(0, Math.floor(delta / 2));
            foe.dr.phys += drSteps;
            foe.attacks = creatureAttacks(src, delta, foe.body, foe.mind);
            foe.meleeBonus = 0;
            foe.luckPts = 0;
        }
        foe.xp = xpFor(level, rank);
        return foe;
    }

    function recalc(foe) {
        if (!foe) return;
        if (foe.kind === 'character' && foe.special) {
            foe.def = defenseOf(foe.special.agi, foe.size);
            foe.init = (foe.special.per || 0) + (foe.special.agi || 0)
                + (foe.rank === 'known' ? 2 : foe.rank === 'major' ? 4 : 0);
            foe.meleeBonus = meleeBonus(foe.special.str);
            foe.attacks = characterAttacks(foe);
        } else {
            foe.init = (foe.body || 0) + (foe.mind || 0);
        }
        foe.xp = xpFor(foe.level, foe.rank);
    }

    function rankLabel(rank, kind) {
        if (kind === 'character' || rank === 'known' || rank === 'major') {
            return rank === 'major' ? 'Главный' : rank === 'known' ? 'Известный' : 'Обычный';
        }
        return rank === 'legendary' ? 'Легендарное' : rank === 'powerful' ? 'Мощное' : 'Обычное';
    }

    /* ---------- persistence / render ---------- */
    function notesList() {
        if (typeof PipSession === 'undefined') return [];
        return Array.isArray(PipSession.state.masterNotes) ? PipSession.state.masterNotes : [];
    }
    function persist(list, doRender) {
        if (typeof PipSession === 'undefined' || !PipSession.sessionId) return;
        PipSession.state.masterNotes = list;
        PipSession.pushNotes(list);
        if (doRender !== false && typeof renderMasterNotes === 'function') renderMasterNotes(list);
    }
    function findGroup(id) { return notesList().find(n => n && n.id === id); }
    function findFoe(groupId, foeId) {
        const g = findGroup(groupId);
        if (!g || !Array.isArray(g.foes)) return { group: g, foe: null };
        return { group: g, foe: g.foes.find(f => f.id === foeId) || null };
    }

    window.createEncounterGroup = function () {
        if (typeof PipSession === 'undefined' || !PipSession.sessionId) {
            pipNotify('Нет стола', 'Сначала откройте сессию — заметки привязаны к столу.', { kind: 'error' });
            return;
        }
        const notes = notesList().map(n => n);
        notes.unshift({
            id: nid('enc'),
            kind: 'encounter',
            title: 'Группа противников',
            foes: []
        });
        persist(notes);
        pipNotify('Группа создана', 'Добавьте противника карточкой внутри группы.', { kind: 'ok' });
    };

    window.npcRenameGroup = function (groupId, title) {
        const notes = notesList().map(n => n);
        const g = notes.find(n => n.id === groupId);
        if (!g) return;
        g.title = String(title || '').slice(0, 80) || 'Группа противников';
        persist(notes, false);
    };

    window.npcDeleteGroup = function (groupId) {
        pipConfirm('Удалить группу противников?', 'Карточки внутри тоже исчезнут.').then(function (ok) {
            if (!ok) return;
            persist(notesList().filter(n => n.id !== groupId));
        });
    };

    window.npcDeleteFoe = function (groupId, foeId) {
        const notes = notesList().map(n => n);
        const g = notes.find(n => n.id === groupId);
        if (!g) return;
        g.foes = (g.foes || []).filter(f => f.id !== foeId);
        persist(notes);
    };

    window.npcAdj = function (groupId, foeId, field, delta, ev) {
        if (ev) ev.stopPropagation();
        const notes = notesList().map(n => n);
        const g = notes.find(n => n.id === groupId);
        const foe = g && (g.foes || []).find(f => f.id === foeId);
        if (!foe) return;
        if (field === 'hp' || field === 'hpMax') {
            foe[field] = Math.max(0, (parseInt(foe[field], 10) || 0) + delta);
            if (field === 'hpMax' && foe.hp > foe.hpMax) foe.hp = foe.hpMax;
        } else if (field === 'body' || field === 'mind' || field === 'melee' || field === 'ranged' || field === 'other') {
            foe[field] = clamp((parseInt(foe[field], 10) || 0) + delta, 0, 12);
            recalc(foe);
        } else if (ATTRS.some(a => a.key === field)) {
            foe.special = foe.special || {};
            foe.special[field] = clamp((parseInt(foe.special[field], 10) || 0) + delta, 4, 12);
            recalc(foe);
        }
        persist(notes);
    };

    window.npcToggleFoe = function (groupId, foeId, ev) {
        if (ev) ev.stopPropagation();
        const el = document.querySelector('[data-foe="' + foeId + '"]');
        if (el) el.classList.toggle('is-open');
    };

    function stepper(groupId, foeId, field, val) {
        return '<div class="enc-step">' +
            '<button type="button" class="caps-btn" onclick="npcAdj(\'' + groupId + '\',\'' + foeId + '\',\'' + field + '\',-1,event)">−</button>' +
            '<span class="enc-step-val">' + esc(String(val)) + '</span>' +
            '<button type="button" class="caps-btn" onclick="npcAdj(\'' + groupId + '\',\'' + foeId + '\',\'' + field + '\',1,event)">+</button>' +
            '</div>';
    }
    function drText(foe) {
        const d = foe.dr || {};
        const imm = foe.immune || [];
        const rad = imm.indexOf('rad') >= 0 ? 'иммун' : (d.rad == null ? '0' : d.rad);
        const tox = imm.indexOf('tox') >= 0 ? 'иммун' : (d.tox == null ? '0' : d.tox);
        return 'Физ ' + (d.phys || 0) + ' · Энерг ' + (d.energy || 0) + ' · Рад ' + rad + ' · Токс ' + tox;
    }
    function gearLine(g) {
        const q = g.qty ? ' ×' + g.qty : '';
        return esc((g.title || g.baseId || '') + q);
    }

    window.renderEncounterCard = function (n) {
        const foes = Array.isArray(n.foes) ? n.foes : [];
        const xpSum = foes.reduce((s, f) => s + (parseInt(f.xp, 10) || 0), 0);
        const foesHtml = foes.map(f => {
            const open = ' is-open';
            const atk = (f.attacks || []).map(a =>
                esc(a.name) + ' ТЧ ' + a.tn + ' · ' + a.dmg + ' БК' + (a.extra ? ' (' + esc(a.extra) + ')' : '')
            ).join('<br>');
            const gear = (f.gear || []).map(gearLine).join('<br>') || '—';
            let stats = '';
            if (f.kind === 'character' && f.special) {
                stats = '<div class="enc-attr-grid">' + ATTRS.map(a =>
                    '<div class="enc-attr"><span>' + a.short + '</span>' + stepper(n.id, f.id, a.key, f.special[a.key] || 0) + '</div>'
                ).join('') + '</div>';
            } else {
                stats = '<div class="enc-attr-grid">' +
                    '<div class="enc-attr"><span>ТЕЛО</span>' + stepper(n.id, f.id, 'body', f.body || 0) + '</div>' +
                    '<div class="enc-attr"><span>РАЗУМ</span>' + stepper(n.id, f.id, 'mind', f.mind || 0) + '</div>' +
                    '<div class="enc-attr"><span>ББ</span>' + stepper(n.id, f.id, 'melee', f.melee || 0) + '</div>' +
                    '<div class="enc-attr"><span>ДБ</span>' + stepper(n.id, f.id, 'ranged', f.ranged || 0) + '</div>' +
                    '</div>';
            }
            return '<div class="enc-foe' + open + '" data-foe="' + f.id + '">' +
                '<button type="button" class="note-card-del" onclick="event.stopPropagation(); npcDeleteFoe(\'' + n.id + '\',\'' + f.id + '\')">X</button>' +
                '<div class="enc-foe-head" onclick="npcToggleFoe(\'' + n.id + '\',\'' + f.id + '\',event)">' +
                '<div class="enc-foe-name">' + esc(f.name) + '</div>' +
                '<div class="enc-foe-meta">Ур. ' + f.level + ' · ' + esc(rankLabel(f.rank, f.kind)) + ' · ' + f.xp + ' XP</div>' +
                '</div>' +
                '<div class="enc-hp-row"><span class="enc-label">ОЗ</span>' +
                stepper(n.id, f.id, 'hp', f.hp) + '<span class="enc-hp-max">/ ' + stepper(n.id, f.id, 'hpMax', f.hpMax) + '</span>' +
                '<span class="enc-derived">ЗАЩ ' + (f.def || 1) + ' · ИНИЦ ' + (f.init || 0) +
                (f.meleeBonus ? ' · БЛИЖ +' + f.meleeBonus + ' БК' : '') +
                (f.luckPts ? ' · УДАЧА ' + f.luckPts : '') + '</span></div>' +
                '<div class="enc-foe-body">' + stats +
                '<div class="enc-dr">' + esc(drText(f)) + '</div>' +
                (f.traits && f.traits.length ? '<div class="enc-traits">' + esc(f.traits.join(' · ')) + '</div>' : '') +
                '<div class="enc-block"><div class="enc-block-title">Атаки</div><div class="enc-block-text">' + (atk || '—') + '</div></div>' +
                '<div class="enc-block"><div class="enc-block-title">Снаряжение</div><div class="enc-block-text">' + gear + '</div></div>' +
                '</div></div>';
        }).join('');
        return '<div class="enc-card" data-enc="' + n.id + '">' +
            '<button type="button" class="note-card-del" onclick="event.stopPropagation(); npcDeleteGroup(\'' + n.id + '\')">X</button>' +
            '<div class="enc-card-head">' +
            '<input type="text" class="enc-title-input" maxlength="80" value="' + esc(n.title || 'Группа противников') +
            '" onblur="npcRenameGroup(\'' + n.id + '\', this.value)" onclick="event.stopPropagation()">' +
            '<div class="enc-card-xp">' + foes.length + ' бойц. · ' + xpSum + ' XP</div></div>' +
            '<div class="enc-foe-list">' + foesHtml +
            '<button type="button" class="enc-add-foe" onclick="npcOpenWizard(\'' + n.id + '\')">' +
            '<span class="enc-add-plus">+</span><span>ДОБАВИТЬ ПРОТИВНИКА В ГРУППУ</span></button>' +
            '</div></div>';
    };

    /* ---------- wizard ---------- */
    const wiz = { groupId: '', step: 0, level: 4, klass: 'human', rank: 'ordinary', templateId: '' };
    const STEPS = ['level', 'type', 'who'];
    const STEP_LABELS = ['УРОВЕНЬ', 'ТИП', 'КТО'];

    function filteredTemplates() {
        return TEMPLATES.filter(t => t.group === (wiz.klass === 'human' ? 'human' : 'monster'));
    }
    function ranksForClass() { return wiz.klass === 'human' ? HUMAN_RANKS : MONSTER_RANKS; }

    function renderWiz() {
        const stepsEl = document.getElementById('npc-steps');
        const body = document.getElementById('npc-body');
        const hint = document.getElementById('npc-hint');
        const back = document.getElementById('npc-back');
        const next = document.getElementById('npc-next');
        if (!body) return;
        if (stepsEl) {
            stepsEl.innerHTML = STEP_LABELS.map((lab, i) =>
                '<button type="button" class="chargen-step' + (i === wiz.step ? ' is-on' : i < wiz.step ? ' is-done' : '') +
                '" onclick="npcWizGoto(' + i + ')">' + lab + '</button>'
            ).join('');
        }
        if (back) back.disabled = wiz.step === 0;
        if (next) next.textContent = wiz.step === 2 ? 'ДОБАВИТЬ' : 'ПРОДОЛЖИТЬ';
        if (hint) { hint.textContent = ''; hint.classList.remove('is-bad'); }

        if (wiz.step === 0) {
            body.innerHTML = '<p class="chargen-lead">Уровень противника по книге. Обитатели локации обычно ±2 от уровня места.</p>' +
                '<div class="enc-level-row">' + stepperWiz() + '<span class="enc-level-num">УР. ' + wiz.level + '</span></div>' +
                '<div class="chargen-chips">' + [1, 2, 3, 4, 5, 7, 8, 10, 12, 14, 16, 18, 21].map(lv =>
                    '<button type="button" class="chargen-chip' + (wiz.level === lv ? ' is-on' : '') + '" onclick="npcWizSetLevel(' + lv + ')">' + lv + '</button>'
                ).join('') + '</div>';
        } else if (wiz.step === 1) {
            body.innerHTML = '<p class="chargen-lead">Сначала человек или чудовище, затем ранг из главы 10.</p>' +
                '<div class="chargen-chips" style="margin-bottom:12px;">' +
                '<button type="button" class="chargen-chip' + (wiz.klass === 'human' ? ' is-on' : '') + '" onclick="npcWizSetKlass(\'human\')">ЧЕЛОВЕК</button>' +
                '<button type="button" class="chargen-chip' + (wiz.klass === 'monster' ? ' is-on' : '') + '" onclick="npcWizSetKlass(\'monster\')">ЧУДОВИЩЕ</button>' +
                '</div>' +
                ranksForClass().map(r =>
                    '<button type="button" class="chargen-choice-btn' + (wiz.rank === r.id ? ' is-on' : '') + '" onclick="npcWizSetRank(\'' + r.id + '\')">' +
                    '<span class="chargen-choice-title">' + r.label + '</span>' +
                    '<span class="chargen-choice-sub">' + r.sub + '</span></button>'
                ).join('');
        } else {
            const list = filteredTemplates();
            body.innerHTML = '<p class="chargen-lead">' + (wiz.klass === 'human'
                ? 'Какой это человек. Снаряжение возьмётся из каталога по уровню.'
                : 'Какое это чудовище. Статы — профиль книги, уровень и ранг масштабируют карточку.') + '</p>' +
                '<div class="npc-who-list">' + list.map(t =>
                    '<button type="button" class="chargen-origin-card' + (wiz.templateId === t.id ? ' is-on' : '') +
                    '" onclick="npcWizSetWho(\'' + t.id + '\')"><div><div class="chargen-origin-name">' + esc(t.name) +
                    '</div><div class="chargen-origin-max">книга: ур. ' + t.bookLevel +
                    (t.kind === 'character' ? ' · персонаж' : ' · существо') + '</div></div></button>'
                ).join('') + '</div>';
        }
    }
    function stepperWiz() {
        return '<div class="enc-step">' +
            '<button type="button" class="caps-btn" onclick="npcWizSetLevel(' + Math.max(1, wiz.level - 1) + ')">−</button>' +
            '<span class="enc-step-val">' + wiz.level + '</span>' +
            '<button type="button" class="caps-btn" onclick="npcWizSetLevel(' + Math.min(21, wiz.level + 1) + ')">+</button></div>';
    }

    window.npcOpenWizard = function (groupId) {
        wiz.groupId = groupId;
        wiz.step = 0;
        wiz.level = 4;
        wiz.klass = 'human';
        wiz.rank = 'ordinary';
        wiz.templateId = '';
        const modal = document.getElementById('npc-modal');
        renderWiz();
        if (modal) modal.classList.add('active');
    };
    window.closeNpcWizard = function () {
        const modal = document.getElementById('npc-modal');
        if (modal) modal.classList.remove('active');
    };
    window.npcWizGoto = function (i) {
        if (i < 0 || i > wiz.step) return;
        wiz.step = i;
        renderWiz();
    };
    window.npcWizSetLevel = function (lv) { wiz.level = clamp(lv, 1, 21); renderWiz(); };
    window.npcWizSetKlass = function (k) {
        wiz.klass = k;
        const allowed = ranksForClass().map(r => r.id);
        if (allowed.indexOf(wiz.rank) < 0) wiz.rank = 'ordinary';
        wiz.templateId = '';
        renderWiz();
    };
    window.npcWizSetRank = function (r) { wiz.rank = r; renderWiz(); };
    window.npcWizSetWho = function (id) { wiz.templateId = id; renderWiz(); };
    window.npcWizBack = function () { if (wiz.step > 0) { wiz.step--; renderWiz(); } };
    window.npcWizNext = function () {
        const hint = document.getElementById('npc-hint');
        function bad(msg) { if (hint) { hint.textContent = msg; hint.classList.add('is-bad'); } }
        if (wiz.step === 0) { wiz.step = 1; renderWiz(); return; }
        if (wiz.step === 1) { wiz.step = 2; renderWiz(); return; }
        if (!wiz.templateId) { bad('Выберите, кто это.'); return; }
        const foe = generate(wiz.templateId, wiz.level, wiz.rank);
        if (!foe) { bad('Не удалось собрать карточку.'); return; }
        const notes = notesList().map(n => n);
        const g = notes.find(n => n.id === wiz.groupId);
        if (!g) { bad('Группа не найдена.'); return; }
        if (!Array.isArray(g.foes)) g.foes = [];
        g.foes.push(foe);
        persist(notes);
        closeNpcWizard();
        pipNotify(foe.name, 'Ур. ' + foe.level + ' · ' + foe.hpMax + ' ОЗ · ' + foe.xp + ' XP', { kind: 'ok' });
    };

    window.NpcGen = { templates: TEMPLATES, generate: generate, xpFor: xpFor };
})();
