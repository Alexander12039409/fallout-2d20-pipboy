// Иконки лежат в папке icons/ и подключаются по пути.
// Цвет pip-green задаётся CSS-фильтром (.pip-glyph), поэтому исходники не дублируются в коде.
const PIP_ICONS = {
    avatars: {
        healthy: 'vault boy avatar/здоров.svg',
        light: 'vault boy avatar/легкое ранение.svg',
        wounded: 'vault boy avatar/ранен.svg',
        heavy: 'vault boy avatar/тяжелое ранение.svg',
        dead: 'vault boy avatar/убит.svg'
    },
    vaultFull: 'vault boy full/vault.svg',
    logo: 'logo/icons8-fallout.svg',
    mapIds: ['039', '047', '108', '110', '115', '124', '126', '128', '132', '272', '305', '307', '314', '345', '353', '356', '381', '382', '384', '515', '552', '569', '607', '666', '728'],
    gun: {
        pistol: 'gun/пистолет.svg',
        shotgun: 'gun/дробовик.svg',
        minigun: 'gun/миниган.svg',
        energy: 'gun/лазерное и гаусс оружие.svg',
        machete: 'gun/мачете.svg',
        hammer: 'gun/кувалда.svg',
        knuckles: 'gun/кастет.svg',
        mine: 'gun/мина.svg'
    },
    armor: 'armor/броня.svg',
    origin: {
        'Выживший': 'vault boy full/vault.svg',
        'Братство Стали': 'origin/Братство стали.svg',
        'Гуль': 'origin/Гуль.svg',
        'Супермутант': 'origin/Супермутант.svg',
        'Мистер Помощник': 'origin/Мистер помощник.svg',
        'Выходец из Убежища': 'origin/Выходец из убежища.svg'
    },
    inventory: {
        stimpak: 'inventory/стимпак.svg',
        medkit: 'inventory/аптечка.svg',
        chems: 'inventory/химикаты.svg',
        drugs: 'inventory/таблетки наркотики.svg',
        food: 'inventory/еда.svg',
        ammo: 'inventory/патроны.svg',
        caps: 'inventory/крышки валюта.svg',
        lockpick: 'inventory/отмычки.svg'
    },
    mod: {
        muzzle: 'modification/дуло или глушитель.svg',
        sight: 'modification/прицел.svg',
        other: 'modification/остальные модификации.svg'
    }
};

function iconUrl(relPath) {
    return 'icons/' + String(relPath).split('/').map(encodeURIComponent).join('/');
}

function originIconRel(origin) {
    const map = (PIP_ICONS && PIP_ICONS.origin) || {};
    if (origin && map[origin]) return map[origin];
    const want = String(origin || '').toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();
    if (!want) return PIP_ICONS.vaultFull;
    const key = Object.keys(map).find(function (k) {
        return String(k).toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim() === want;
    });
    return (key && map[key]) || PIP_ICONS.vaultFull;
}

function pipGlyph(relPath, extraClass) {
    return `<img class="pip-glyph${extraClass ? ' ' + extraClass : ''}" src="${iconUrl(relPath)}" alt="" draggable="false">`;
}

function avatarRelFromHp(cur, max) {
    cur = parseInt(cur, 10);
    max = parseInt(max, 10);
    if (!Number.isFinite(cur)) cur = 0;
    if (!Number.isFinite(max) || max < 1) max = 1;
    if (cur <= 0) return PIP_ICONS.avatars.dead;
    if (cur >= max) return PIP_ICONS.avatars.healthy;
    const pct = (cur / max) * 100;
    if (pct < 30) return PIP_ICONS.avatars.heavy;
    if (pct < 50) return PIP_ICONS.avatars.wounded;
    return PIP_ICONS.avatars.light;
}

function weaponIconRel(name, category) {
    const n = `${name || ''} ${category || ''}`.toLowerCase();
    if (/гаусс|лазер|плазм|гамма|энерг|институт|мушкет/.test(n)) return PIP_ICONS.gun.energy;
    if (/дробовик/.test(n)) return PIP_ICONS.gun.shotgun;
    if (/мина|гранат|взрывчат|молотов|коктейль/.test(n)) return PIP_ICONS.gun.mine;
    if (/кастет|безоруж|кулак|рукоят|перчатк|камень|рукопаш/.test(n)) return PIP_ICONS.gun.knuckles;
    if (/мачет|меч|нож|потрошит|шиш|клинок|лезв/.test(n)) return PIP_ICONS.gun.machete;
    if (/кувалд|бит|труб|ключ|кий|скалк|дубинк|монтиров|трост|дрын/.test(n)) return PIP_ICONS.gun.hammer;
    if (/миниган|гатлинг|толстяк|огнемет|инсинератор|хламотрон|пусков/.test(n)) return PIP_ICONS.gun.minigun;
    if (/пистолет|револьвер|карабин|томпсон|гвоздем|инъекц|сигнальн|пп /.test(n)) return PIP_ICONS.gun.pistol;
    if ((category || '').includes('Энергетическое')) return PIP_ICONS.gun.energy;
    if ((category || '').includes('Тяжелое')) return PIP_ICONS.gun.minigun;
    if ((category || '').includes('Холодное') || (category || '').includes('Рукопаш')) return PIP_ICONS.gun.machete;
    return PIP_ICONS.gun.pistol;
}

function itemIconRel(item) {
    if (!item) return PIP_ICONS.inventory.lockpick;
    if (item.iconRel) return item.iconRel;
    if (item.type === 'weapon') return weaponIconRel(item.baseId || item.title || item.name, item.category);
    const type = `${item.itemType || item.type || ''}`.toLowerCase();
    const cat = `${item.category || ''}`.toLowerCase();
    const n = `${item.title || item.name || ''}`.toLowerCase();
    if (type === 'armor' || /брон|одежд|шлем|нагрудн|понож|наруч|комбинезон|халат|пальто|форма|рейдер|кожан|металл|синтов|силов|каркас|капюшон|противогаз|каска|обмундир|обшивк|рам[аы]|охранник|волт/.test(n + ' ' + cat)) return PIP_ICONS.armor;
    if (cat.includes('боеприпас') || type === 'ammo' || /^(патрон|заряд плазм|ядерн|ракет|шприц|гвозд|гамма-патрон|2-мм|топливо для|сигнальн)/.test(n)) {
        return PIP_ICONS.inventory.ammo;
    }
    if (/стимпак|стимул/.test(n)) return PIP_ICONS.inventory.stimpak;
    if (cat.includes('препарат') || /психо|винт|баффаут|ментат|мед-х|ярость|глюконафт|успокоин|перегруз|ультравинт|шик\b|баффвинт|бафтаты|x-клетк|слюна скито|реактивное топливо/.test(n)) return PIP_ICONS.inventory.drugs;
    if (cat.includes('еда') || cat.includes('напит') || /кола|пиво|виски|вода|сок |стейк|мясо|кекс|омлет|консерв|кукуруз|срам/.test(n)) return PIP_ICONS.inventory.food;
    if (cat.includes('аптеч') || /антибиот|рад-х|антирад|аддиктол|целебн|мазь|суперстим/.test(n)) return PIP_ICONS.inventory.medkit;
    if (/крышк|валют|монет/.test(n) && !/мина/.test(n)) return PIP_ICONS.inventory.caps;
    if (/отмыч|взлом|замок|ремонтн|журнал|стелс/.test(n) || cat.includes('разное')) return /стелс/.test(n) ? PIP_ICONS.inventory.chems : PIP_ICONS.inventory.lockpick;
    if (/химикат/.test(n)) return PIP_ICONS.inventory.chems;
    if (type === 'consumable') {
        if (cat.includes('аптеч')) return PIP_ICONS.inventory.medkit;
        if (cat.includes('препарат')) return PIP_ICONS.inventory.drugs;
        if (cat.includes('еда') || cat.includes('напит')) return PIP_ICONS.inventory.food;
        return PIP_ICONS.inventory.lockpick;
    }
    return PIP_ICONS.inventory.lockpick;
}

function modIconRel(slotName) {
    const sl = String(slotName || '').toLowerCase();
    if (/прицел/.test(sl)) return PIP_ICONS.mod.sight;
    if (/ствол|насадка|дуло|глушит|компенсатор|тормоз|тарелка|сопло|форсун|антенн/.test(sl)) return PIP_ICONS.mod.muzzle;
    if (/клинок|меч|цепь|лезв|коготь/.test(sl)) return PIP_ICONS.gun.machete;
    if (/боёк|боек|кувалд/.test(sl)) return PIP_ICONS.gun.hammer;
    if (/кастет|перчат/.test(sl)) return PIP_ICONS.gun.knuckles;
    if (/магазин/.test(sl)) return PIP_ICONS.gun.pistol;
    if (/конденсатор|ресивер/.test(sl)) return PIP_ICONS.gun.energy;
    if (/топлив|бак/.test(sl)) return PIP_ICONS.gun.minigun;
    if (/материал|подклад|слой|lining/.test(sl)) return PIP_ICONS.armor;
    if (/апгрейд|улучш|приклад|рукоять/.test(sl)) return PIP_ICONS.mod.other;
    return PIP_ICONS.mod.other;
}
