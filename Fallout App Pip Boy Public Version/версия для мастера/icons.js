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
    inventory: {
        stimpak: 'inventory/стимпак.svg',
        medkit: 'inventory/аптечка.svg',
        chems: 'inventory/химикаты.svg',
        drugs: 'inventory/таблетки наркотики.svg',
        food: 'inventory/еда.svg',
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
    if (/мина|гранат|взрывчат/.test(n)) return PIP_ICONS.gun.mine;
    if (/кастет|безоруж|кулак|рукоят/.test(n)) return PIP_ICONS.gun.knuckles;
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
    if (!item) return PIP_ICONS.inventory.medkit;
    if (item.type === 'weapon') return weaponIconRel(item.baseId, item.category);
    const type = `${item.itemType || item.type || ''}`.toLowerCase();
    const cat = `${item.category || ''}`.toLowerCase();
    const n = `${item.title || item.name || ''} ${item.desc || ''} ${cat} ${type}`.toLowerCase();
    if (type === 'armor' || /брон|одежд|шлем|нагрудн|понож|наруч|комбинезон|халат|пальто|форма|рейдер|кожан|металл|синтов/.test(n)) return PIP_ICONS.armor;
    if (/стимул|стимпак/.test(n)) return PIP_ICONS.inventory.stimpak;
    if (/крышк|валют|монет/.test(n)) return PIP_ICONS.inventory.caps;
    if (/отмыч|взлом|замок/.test(n)) return PIP_ICONS.inventory.lockpick;
    if (/психо|винт|баффаут|нарк|таблет|препарат|аддикт/.test(n)) return PIP_ICONS.inventory.drugs;
    if (/химикат/.test(n)) return PIP_ICONS.inventory.chems;
    if (/еда|пищ|вода|напит|голод/.test(n)) return PIP_ICONS.inventory.food;
    if (/аптеч|антибиот|рад-х|радх|антирад|медик|лечен|травм/.test(n)) return PIP_ICONS.inventory.medkit;
    if (type === 'consumable' || cat.includes('расход')) return PIP_ICONS.inventory.medkit;
    return PIP_ICONS.inventory.medkit;
}

function modIconRel(slotName) {
    const sl = String(slotName || '').toLowerCase();
    if (/прицел/.test(sl)) return PIP_ICONS.mod.sight;
    if (/ствол|насадка|дуло|глушит|компенсатор|тормоз|тарелка/.test(sl)) return PIP_ICONS.mod.muzzle;
    if (/подклад|слой|lining/.test(sl)) return PIP_ICONS.mod.other;
    if (/материал/.test(sl)) return PIP_ICONS.armor;
    if (/апгрейд|улучш/.test(sl)) return PIP_ICONS.mod.other;
    return PIP_ICONS.mod.other;
}
