// Данные из «Pravila_Fallout (3)»: эффекты, боеприпасы, броня и её моды.
// Список оружия в db.js не меняется — здесь только справочник поверх базы.

const RULES_EFFECTS = {
    'Жестокий': 'За каждые выпавшие 5–6 на БК атака наносит +1 урона.',
    'Жестокая': 'За каждые выпавшие 5–6 на БК атака наносит +1 урона.',
    'Массированный': 'За каждые выпавшие 5–6 атака поражает одну дополнительную цель на ближней дистанции от основной. На каждую доп. цель тратится 1 ед. боеприпасов.',
    'Оглушающий': 'Если 5–6 выпадает хотя бы раз, цель не может совершить Обычное действие в свой следующий ход. ОД на доп. действия тратить можно.',
    'Продолжительный': 'Если 5–6 выпадает, цель снова получает урон оружия в конце следующих ходов (число ходов = число 5–6). Досрочно снять: Основное действие и проверка со сложностью, равной числу 5–6.',
    'Проникающий': 'Игнорируйте указанное число пунктов СУ цели за каждую выпавшую 5–6.',
    'Проникающий 1': 'Игнорируйте 1 пункт СУ цели за каждую выпавшую 5–6.',
    'Разрушающий': 'За каждые 5–6 укрытие цели навсегда теряет 1 СУ. Без укрытия вместо этого −1 СУ области попадания для этого типа урона.',
    'Радиоактивный': 'За каждые 5–6 цель также получает 1 очко радиационного урона (суммируется и применяется отдельно после обычного урона).',
    'Радиационный': 'За каждые 5–6 цель также получает 1 очко радиационного урона (суммируется и применяется отдельно после обычного урона).',
    'Разброс': 'За каждые 5–6 атака наносит ещё одно попадание. Доп. попадание — половина урона (вниз) в случайную область.',
    'Точное': 'После малого действия «Прицеливание» можно потратить до 3 ОД: +1 БК за каждое ОД. Тогда нельзя тратить боеприпасы на доп. урон. Не сочетается с «Неточное».',
    'Неточное': 'Прицеливание не даёт пользы. Не сочетается с «Точное».',
    'Надежное': 'В каждом столкновении игнорирует первое Осложнение при проверке с этим оружием. Не сочетается с «Ненадежное».',
    'Ненадежное': 'При атаке вероятность Осложнения увеличивается на 1. Не сочетается с «Надежное».',
    'Двуручное': 'Нужно держать двумя руками. Атака одной рукой: сложность +2.',
    'Бой вплотную': 'Нет штрафов за стрельбу, когда враг находится вплотную.',
    'Вплотную': 'Нет штрафов за стрельбу, когда враг находится вплотную.',
    'Тихое': 'Если враг не знает о вас, он не заметит атаку, пока не станет целью или не пройдёт ВСП+Выживание (сложность 2).',
    'Скрытное': 'Враги не заметят оружие, пока оно не в руках или пока тщательно не обыщут (ВСП+Выживание, сложность 2).',
    'Ослабляющее': 'Сложность лечения травм, нанесённых этим оружием, +1.',
    'Взрыв': 'Цель — точка, не существо. Проверка сложности 2 (с дальностью). Успех: все в зоне получают урон. Провал: половина БК, свойства урона игнорируются.',
    'Гатлинг': 'Атака только очередью из 10 выстрелов: тратится 10 патронов вместо 1. Доп. очереди (по 10 шт.) дают +2 БК, не +1. Скорострельность = сколько очередей за раз.',
    'Ночное видение': 'При прицеливании игнорируется рост сложности атаки из‑за темноты.',
    'Парирование': 'Против атаки ближнего боя можно потратить 1 ОД, чтобы получить +1 Защиты против этой атаки.',
    'Разведка': 'Малое действие «Прицелиться»: пометьте цель. Следующий союзник, атакующий её, может перебросить d20.',
    'Метательное': 'Можно метнуть. Метательное (Б) — ближняя дистанция, (С) — средняя. Проверка ЛВК + Метание.',
    'Мина': 'При срабатывании наносит урон всем вплотную (и дополнительно, если есть «Взрыв»).',
    'Как у оружия': 'Как у оружия, которым наносится удар.'
};

const QUAL_ALIASES = {
    'Массив.': 'Массированный',
    'Продолж.': 'Продолжительный',
    'Разруш.': 'Разрушающий',
    'Радиоакт.': 'Радиоактивный',
    'Бой вплотную': 'Бой вплотную',
    'Очередь': 'Массированный',
    'Порочный': 'Жестокий',
    'Порочн.': 'Жестокий',
    'Стойкий': 'Продолжительный',
    'Устойчивый': 'Продолжительный',
    'Изнуряющий': 'Ослабляющее'
};

function normalizeQualName(raw) {
    let s = String(raw || '').trim();
    if (QUAL_ALIASES[s]) return QUAL_ALIASES[s];
    s = s.replace(/^“|”|"$/g, '');
    return s;
}

function getQualEffectText(raw) {
    const name = normalizeQualName(raw);
    if (RULES_EFFECTS[name]) return RULES_EFFECTS[name];
    if (typeof dbEffectsDict !== 'undefined' && dbEffectsDict[name]) return dbEffectsDict[name];
    const stripped = name.replace(/\s*\d+\s*$/, '').trim();
    if (stripped !== name && RULES_EFFECTS[stripped]) return RULES_EFFECTS[stripped];
    return 'Особое свойство по правилам сцены. Уточните у Мастера, если формулировка нестандартная.';
}

const HIT_LOCS = {
    head: { label: 'ГОЛОВА', title: 'ГОЛОВА (1-2)', fields: ['cs-dr-head-phys', 'cs-dr-head-eng', 'cs-dr-head-rad'] },
    larm: { label: 'Л.РУКА', title: 'Л.РУКА (9-11)', fields: ['cs-dr-larm-phys', 'cs-dr-larm-eng', 'cs-dr-larm-rad'] },
    rarm: { label: 'П.РУКА', title: 'П.РУКА (12-14)', fields: ['cs-dr-rarm-phys', 'cs-dr-rarm-eng', 'cs-dr-rarm-rad'] },
    torso: { label: 'ТОРС', title: 'ТОРС (3-8)', fields: ['cs-dr-torso-phys', 'cs-dr-torso-eng', 'cs-dr-torso-rad'] },
    lleg: { label: 'Л.НОГА', title: 'Л.НОГА (15-17)', fields: ['cs-dr-lleg-phys', 'cs-dr-lleg-eng', 'cs-dr-lleg-rad'] },
    rleg: { label: 'П.НОГА', title: 'П.НОГА (18-20)', fields: ['cs-dr-rleg-phys', 'cs-dr-rleg-eng', 'cs-dr-rleg-rad'] }
};
const DR_TYPES = ['phys', 'eng', 'rad'];
const BODY_COVER = {
    clothes: ['torso', 'larm', 'rarm', 'lleg', 'rleg'],
    torso: ['torso'],
    head: ['head'],
    limb: null,
    arm: null,
    leg: null
};

const WEAPON_AMMO = {
    '.44 Револьвер': { type: '.44 Магнум', mag: 4 },
    '10-мм пистолет': { type: '10-мм', mag: 8 },
    'Сигнальный пистолет': { type: 'Сигнальная ракета', mag: 2 },
    'Штурмовой карабин': { type: '5.56-мм', mag: 8 },
    'Боевой карабин': { type: '.45', mag: 8 },
    'Карабин Гаусса': { type: '2-мм ЭК', mag: 6 },
    'Охотничий карабин': { type: '.308', mag: 6 },
    'ПП Томпсона': { type: '.45', mag: 8 },
    'Боевой дробовик': { type: 'Патрон дробовика', mag: 6 },
    'Двуствольный дробовик': { type: 'Патрон дробовика', mag: 2 },
    'Кустарный карабин': { type: '.308', mag: 6 },
    'Кустарный пистолет': { type: '.38', mag: 10 },
    'Кустарный револьвер': { type: '.45', mag: 6 },
    'Гвоздемет': { type: 'Железнодорожный гвоздь', mag: 6 },
    'Инъекционный карабин': { type: 'Шприцы', mag: 4 },
    'Лазер Института': { type: 'Ядерная батарея', mag: 14 },
    'Гамма-пушка': { type: 'Гамма-патрон', mag: 4 },
    'Лазерный мушкет': { type: 'Ядерная батарея', mag: 1 },
    'Лазерный пистолет': { type: 'Ядерная батарея', mag: 14 },
    'Плазменный пистолет': { type: 'Заряд плазмы', mag: 10 },
    'Толстяк': { type: 'Ядерный выстрел', mag: 1 },
    'Огнемет': { type: 'Топливо для огнемета', mag: 12 },
    'Гатлинг-лазер': { type: 'Ядерная батарея', mag: 70 },
    'Тяжелый инсинератор': { type: 'Топливо для огнемета', mag: 12 },
    'Хламотрон': { type: 'Хлам', mag: 6 },
    'Миниган': { type: '5-мм', mag: 120 },
    'Пусковая установка': { type: 'Ракета', mag: 2 },
    'Бейсбольная граната': { type: 'Граната', mag: 1 },
    'Осколочная граната': { type: 'Граната', mag: 1 },
    'Коктейль Молотова': { type: 'Коктейль', mag: 1 },
    'Ядерная граната': { type: 'Граната', mag: 1 },
    'Плазменная граната': { type: 'Граната', mag: 1 },
    'Импульсная граната': { type: 'Граната', mag: 1 },
    'Крышко-мина': { type: 'Мина', mag: 1 },
    'Осколочная мина': { type: 'Мина', mag: 1 },
    'Ядерная мина': { type: 'Мина', mag: 1 },
    'Плазменная мина': { type: 'Мина', mag: 1 },
    'Импульсная мина': { type: 'Мина', mag: 1 },
    'Камень': { type: 'Камень', mag: 1 }
};

const LINING_MODS = [
    { name: 'Нет', hint: 'Без подкладки', phys: 0, eng: 0, rad: 0 },
    { name: 'Пуленепробиваемый слой', hint: '+2 Физ.СУ, +2 Энерг.СУ', phys: 2, eng: 2, rad: 0 },
    { name: 'Пуленепробиваемый слой MK II', hint: '+3 Физ.СУ, +3 Энерг.СУ · Бронник', phys: 3, eng: 3, rad: 0 },
    { name: 'Пуленепробиваемый слой MK III', hint: '+4 Физ.СУ, +4 Энерг.СУ · Бронник 2', phys: 4, eng: 4, rad: 0 },
    { name: 'Пуленепробиваемый слой MK IV', hint: '+5 Физ.СУ, +5 Энерг.СУ · Бронник 3', phys: 5, eng: 5, rad: 0 },
    { name: 'Пуленепробиваемый слой MK V', hint: '+6 Физ.СУ, +6 Энерг.СУ · Бронник 4', phys: 6, eng: 6, rad: 0 }
];

const ARMOR_MATERIALS = {
    raider: [
        { name: 'Нет', hint: 'Стандартный материал', phys: 0, eng: 0, rad: 0 },
        { name: 'Сварная', hint: '+1 Физ / +1 Энерг', phys: 1, eng: 1, rad: 0 },
        { name: 'Закаленная', hint: '+2 Физ / +2 Энерг', phys: 2, eng: 2, rad: 0 },
        { name: 'Укрепленная', hint: '+3 Физ / +3 Энерг · Бронник 1', phys: 3, eng: 3, rad: 0 },
        { name: 'Усиленная', hint: '+4 Физ / +4 Энерг · Бронник 1', phys: 4, eng: 4, rad: 0 }
    ],
    leather: [
        { name: 'Нет', hint: 'Стандартный материал', phys: 0, eng: 0, rad: 0 },
        { name: 'Вываренная', hint: '+1 Физ / +1 Энерг', phys: 1, eng: 1, rad: 0 },
        { name: 'Расшитая', hint: '+2 Физ / +2 Энерг', phys: 2, eng: 2, rad: 0 },
        { name: 'Дубленая', hint: '+3 Физ / +3 Энерг · Бронник 1', phys: 3, eng: 3, rad: 0 },
        { name: 'Темная', hint: '+3 Физ / +3 Энерг, см. Темная броня · Бронник 1', phys: 3, eng: 3, rad: 0, dark: true },
        { name: 'Клепанная', hint: '+4 Физ / +4 Энерг · Бронник 1', phys: 4, eng: 4, rad: 0 }
    ],
    metal: [
        { name: 'Нет', hint: 'Стандартный материал', phys: 0, eng: 0, rad: 0 },
        { name: 'Окрашенная', hint: '+1 Физ / +1 Энерг', phys: 1, eng: 1, rad: 0 },
        { name: 'Эмалированная', hint: '+2 Физ / +2 Энерг · Бронник 1', phys: 2, eng: 2, rad: 0 },
        { name: 'Темная', hint: '+2 Физ / +2 Энерг, см. Темная броня · Бронник 1', phys: 2, eng: 2, rad: 0, dark: true },
        { name: 'Легированная', hint: '+3 Физ / +3 Энерг · Бронник 1', phys: 3, eng: 3, rad: 0 },
        { name: 'Полированная', hint: '+4 Физ / +4 Энерг · Бронник 2', phys: 4, eng: 4, rad: 0 }
    ],
    combat: [
        { name: 'Нет', hint: 'Стандартный материал', phys: 0, eng: 0, rad: 0 },
        { name: 'Усиленная', hint: '+1 Физ / +1 Энерг', phys: 1, eng: 1, rad: 0 },
        { name: 'Темная', hint: '+1 Физ / +1 Энерг, см. Темная броня · Бронник 1', phys: 1, eng: 1, rad: 0, dark: true },
        { name: 'Стекловолоконная', hint: '+2 Физ / +2 Энерг · Бронник 1', phys: 2, eng: 2, rad: 0 },
        { name: 'Полимерная', hint: '+3 Физ / +3 Энерг · Бронник 1', phys: 3, eng: 3, rad: 0 },
        { name: 'Баллистическая', hint: '+4 Физ / +4 Энерг · Бронник 2', phys: 4, eng: 4, rad: 0 }
    ],
    synth: [
        { name: 'Нет', hint: 'Стандартный материал', phys: 0, eng: 0, rad: 0 },
        { name: 'Ламинированная', hint: '+1 Физ / +1 Энерг', phys: 1, eng: 1, rad: 0 },
        { name: 'Прорезиненная', hint: '+2 Физ / +2 Энерг · Бронник 1', phys: 2, eng: 2, rad: 0 },
        { name: 'Карбоновая', hint: '+3 Физ / +3 Энерг · Бронник 1', phys: 3, eng: 3, rad: 0 },
        { name: 'Нановолоконная', hint: '+4 Физ / +4 Энерг · Бронник 1', phys: 4, eng: 4, rad: 0 }
    ]
};

const ARMOR_UPGRADES = [
    { name: 'Нет', hint: 'Без апгрейда', where: 'any' },
    { name: 'Легкие материалы', hint: 'Снижает вес детали на 1', where: 'any' },
    { name: 'Карманы', hint: 'Грузоподъёмность +10 (торс) / +5 (конечность)', where: 'any', carryTorso: 10, carryLimb: 5 },
    { name: 'Глубокие карманы', hint: 'Грузоподъёмность +20 (торс) / +10 (конечность) · Бронник 2', where: 'any', carryTorso: 20, carryLimb: 10 },
    { name: 'Свинцовая подкладка', hint: '+3 Рад.СУ · Бронник 2', where: 'any', rad: 3 },
    { name: 'Сверхлегкие материалы', hint: 'Снижает вес детали на 3 · Бронник 3', where: 'any' },
    { name: 'Подбой', hint: '+2 ко всему СУ против оружия с «Взрыв»', where: 'torso' },
    { name: 'Асбест', hint: '+3 Энерг.СУ; игнор. энергетический «Продолжительный» · Бронник 1', where: 'torso', eng: 3 },
    { name: 'Взрывозащита', hint: '+4 ко всему СУ против оружия с «Взрыв» · Бронник 3', where: 'torso' },
    { name: 'Биосеть', hint: 'Препараты длятся вдвое дольше · Бронник 4, Наука! 2', where: 'torso' },
    { name: 'Пневматика', hint: '«Оглушающий» требует двух 5–6 на БК · Бронник 4', where: 'torso' },
    { name: 'Утяжеление', hint: 'Атаки без оружия +1 БК · Бронник 1', where: 'arm' },
    { name: 'Укрепление', hint: '+2 ко всем СУ против ближнего боя · Бронник 1', where: 'arm' },
    { name: 'Стабилизация', hint: '+1 БК к урону при прицеливании в дальнюю атаку · Бронник 2', where: 'arm' },
    { name: 'Аэродинамика', hint: 'До 4 ОД на доп. урон в ближнем бою · Бронник 3', where: 'arm' },
    { name: 'Шипование', hint: 'Ближний бой и без оружия получают «Проникающий 1» · Бронник 4', where: 'arm' },
    { name: 'Смягчение', hint: '+2 Физ.СУ против урона от падения · Бронник 1', where: 'leg' },
    { name: 'Приглушение', hint: 'Переброс 1d20 в проверках Скрытности · Бронник 2', where: 'leg' }
];

const ARMOR_CATALOG = {
    'Повседневная одежда': { family: 'clothes', coverage: 'clothes', phys: 0, eng: 0, rad: 0, mods: ['lining'], special: 'Переброс 1d20 одной проверки СИЛ или ЛВК за сцену.' },
    'Военная форма': { family: 'clothes', coverage: 'clothes', phys: 0, eng: 0, rad: 0, mods: ['lining'], special: 'Переброс 1d20 одной проверки СИЛ или ЛВК за сцену.' },
    'Лабораторный халат': { family: 'clothes', coverage: 'clothes', phys: 0, eng: 0, rad: 0, mods: ['lining'], special: 'Переброс 1d20 одной проверки ИНТ за сцену.' },
    'Рабочий комбинезон': { family: 'clothes', coverage: 'clothes', phys: 0, eng: 0, rad: 0, mods: ['lining'], special: 'Макс. вес +5.', carry: 5 },
    'Тяжелое пальто': { family: 'clothes', coverage: 'clothes', phys: 0, eng: 0, rad: 0, mods: ['lining'], special: 'Переброс 1d20 одной проверки ВЫН за сцену.' },
    'Рейдерский нагрудник': { family: 'raider', coverage: 'torso', phys: 1, eng: 1, rad: 0, mods: ['material', 'upgrade'] },
    'Рейдерский понож/наруч': { family: 'raider', coverage: 'limb', phys: 1, eng: 1, rad: 0, mods: ['material', 'upgrade'] },
    'Кожаный нагрудник': { family: 'leather', coverage: 'torso', phys: 1, eng: 2, rad: 0, mods: ['material', 'upgrade'] },
    'Кожаный понож/наруч': { family: 'leather', coverage: 'limb', phys: 1, eng: 2, rad: 0, mods: ['material', 'upgrade'] },
    'Металлический шлем': { family: 'metal', coverage: 'head', phys: 2, eng: 1, rad: 0, mods: ['material'] },
    'Металлический нагрудник': { family: 'metal', coverage: 'torso', phys: 2, eng: 1, rad: 0, mods: ['material', 'upgrade'] },
    'Боевой шлем': { family: 'combat', coverage: 'head', phys: 2, eng: 2, rad: 0, mods: ['material'] },
    'Боевой нагрудник': { family: 'combat', coverage: 'torso', phys: 2, eng: 2, rad: 0, mods: ['material', 'upgrade'] },
    'Шлем синтов': { family: 'synth', coverage: 'head', phys: 2, eng: 3, rad: 0, mods: ['material'] },
    'Нагрудник синтов': { family: 'synth', coverage: 'torso', phys: 2, eng: 3, rad: 0, mods: ['material', 'upgrade'] }
};

[
    ['Рейдерский понож', 'raider', 'leg', 1, 1, 0],
    ['Рейдерский наруч', 'raider', 'arm', 1, 1, 0],
    ['Прочный Рейдерский нагрудник', 'raider', 'torso', 2, 2, 0],
    ['Прочный Рейдерский понож', 'raider', 'leg', 2, 2, 0],
    ['Прочный Рейдерский наруч', 'raider', 'arm', 2, 2, 0],
    ['Тяжелый Рейдерский нагрудник', 'raider', 'torso', 3, 3, 0],
    ['Тяжелый Рейдерский понож', 'raider', 'leg', 3, 3, 0],
    ['Тяжелый Рейдерский наруч', 'raider', 'arm', 3, 3, 0],
    ['Кожаный понож', 'leather', 'leg', 1, 2, 0],
    ['Кожаный наруч', 'leather', 'arm', 1, 2, 0],
    ['Прочный Кожаный нагрудник', 'leather', 'torso', 2, 3, 0],
    ['Прочный Кожаный понож', 'leather', 'leg', 2, 3, 0],
    ['Прочный Кожаный наруч', 'leather', 'arm', 2, 3, 0],
    ['Тяжелый Кожаный нагрудник', 'leather', 'torso', 3, 4, 0],
    ['Тяжелый Кожаный понож', 'leather', 'leg', 3, 4, 0],
    ['Тяжелый Кожаный наруч', 'leather', 'arm', 3, 4, 0],
    ['Металлический понож', 'metal', 'leg', 2, 1, 0],
    ['Металлический наруч', 'metal', 'arm', 2, 1, 0],
    ['Прочный Металлический шлем', 'metal', 'head', 3, 2, 0],
    ['Прочный Металлический нагрудник', 'metal', 'torso', 3, 2, 0],
    ['Прочный Металлический понож', 'metal', 'leg', 3, 2, 0],
    ['Прочный Металлический наруч', 'metal', 'arm', 3, 2, 0],
    ['Тяжелый Металлический шлем', 'metal', 'head', 4, 3, 0],
    ['Тяжелый Металлический нагрудник', 'metal', 'torso', 4, 3, 0],
    ['Тяжелый Металлический понож', 'metal', 'leg', 4, 3, 0],
    ['Тяжелый Металлический наруч', 'metal', 'arm', 4, 3, 0],
    ['Боевой понож', 'combat', 'leg', 2, 2, 0],
    ['Боевой наруч', 'combat', 'arm', 2, 2, 0],
    ['Прочный Боевой шлем', 'combat', 'head', 3, 3, 0],
    ['Прочный Боевой нагрудник', 'combat', 'torso', 3, 3, 0],
    ['Прочный Боевой понож', 'combat', 'leg', 3, 3, 0],
    ['Прочный Боевой наруч', 'combat', 'arm', 3, 3, 0],
    ['Тяжелый Боевой шлем', 'combat', 'head', 4, 4, 0],
    ['Тяжелый Боевой нагрудник', 'combat', 'torso', 4, 4, 0],
    ['Тяжелый Боевой понож', 'combat', 'leg', 4, 4, 0],
    ['Тяжелый Боевой наруч', 'combat', 'arm', 4, 4, 0],
    ['Понож синтов', 'synth', 'leg', 2, 3, 0],
    ['Наруч синтов', 'synth', 'arm', 2, 3, 0]
].forEach(row => {
    const mods = row[2] === 'head' ? ['material'] : ['material', 'upgrade'];
    ARMOR_CATALOG[row[0]] = { family: row[1], coverage: row[2], phys: row[3], eng: row[4], rad: row[5], mods };
});

function normArmorName(s) {
    return String(s || '')
        .toLowerCase()
        .replace(/ё/g, 'е')
        .replace(/\u00a0/g, ' ')
        .replace(/[«»"'“”]/g, '')
        .replace(/\s*\/\s*/g, '/')
        .replace(/\s+/g, ' ')
        .trim();
}

function compactArmorName(s) {
    return normArmorName(s).replace(/[\s/-]+/g, '');
}

const ARMOR_LOOKUP = {};
const ARMOR_LOOKUP_COMPACT = {};
Object.keys(ARMOR_CATALOG).forEach(name => {
    const def = ARMOR_CATALOG[name];
    const k = normArmorName(name);
    ARMOR_LOOKUP[k] = def;
    ARMOR_LOOKUP_COMPACT[compactArmorName(name)] = def;
});
ARMOR_LOOKUP['прочный металл. шлем'] = ARMOR_CATALOG['Прочный Металлический шлем'];
ARMOR_LOOKUP['прочный металл. нагрудник'] = ARMOR_CATALOG['Прочный Металлический нагрудник'];
ARMOR_LOOKUP['прочный металл. понож'] = ARMOR_CATALOG['Прочный Металлический понож'];
ARMOR_LOOKUP['прочный металл. наруч'] = ARMOR_CATALOG['Прочный Металлический наруч'];
Object.keys(ARMOR_LOOKUP).forEach(k => { ARMOR_LOOKUP_COMPACT[compactArmorName(k)] = ARMOR_LOOKUP[k]; });

function inferArmorDef(item) {
    const raw = [(item && (item.baseId || item.title || item.name)) || '', item && item.category || '', item && item.desc || ''].join(' ');
    const n = normArmorName(raw);
    const desc = String((item && item.desc) || '');
    let family = 'leather';
    if (/рейдер/.test(n)) family = 'raider';
    else if (/синтов|\bсинт/.test(n)) family = 'synth';
    else if (/силов|x-01|t-45|t-51|t-60/.test(n)) family = 'combat';
    else if (/боев/.test(n)) family = 'combat';
    else if (/металл/.test(n)) family = 'metal';
    else if (/кожан/.test(n)) family = 'leather';
    else if (/одежд|халат|форма|комбинезон|пальто|портупея|шкура|костюм|облачен|доспех писца|бродяг|инженер|защитн/.test(n)) family = 'clothes';
    let coverage = 'torso';
    if (/шлем|голов|капюшон|маска/.test(n) || /обл:\s*голов/i.test(desc)) coverage = 'head';
    else if (/понож\s*\/\s*наруч|нога\s*\/\s*рука/.test(n) || /обл:\s*нога\/рука/i.test(desc)) coverage = 'limb';
    else if ((/наруч/.test(n) && !/понож/.test(n)) || /обл:\s*рука/i.test(desc)) coverage = 'arm';
    else if (/понож/.test(n) || /обл:\s*нога/i.test(desc)) coverage = 'leg';
    else if (/нагрудн/.test(n) || /обл:\s*торс/i.test(desc)) coverage = 'torso';
    else if (family === 'clothes' || /торс,\s*рук/i.test(desc)) coverage = 'clothes';
    let phys = 0, eng = 0, rad = 0;
    const pm = desc.match(/физ:?\s*(\d+)/i); if (pm) phys = parseInt(pm[1], 10);
    const em = desc.match(/энерг:?\s*(\d+)/i); if (em) eng = parseInt(em[1], 10);
    const rm = desc.match(/рад:?\s*(\d+)/i); if (rm) rad = parseInt(rm[1], 10);
    const mods = family === 'clothes' ? ['lining'] : (coverage === 'head' ? ['material'] : ['material', 'upgrade']);
    return { family, coverage, phys, eng, rad, mods, inferred: true };
}

function looksLikeArmor(item) {
    if (!item) return false;
    if (item.type === 'weapon' || item.itemType === 'weapon') return false;
    if (item.type === 'armor' || item.itemType === 'armor') return true;
    const cat = String(item.category || '');
    if (cat === 'Одежда' || /брон/i.test(cat)) return true;
    const raw = (item.baseId || item.title || item.name || '');
    if (ARMOR_CATALOG[raw] || ARMOR_LOOKUP[normArmorName(raw)] || ARMOR_LOOKUP_COMPACT[compactArmorName(raw)]) return true;
    return false;
}

function getArmorDef(item) {
    const raw = (item && (item.baseId || item.title || item.name)) || '';
    if (ARMOR_CATALOG[raw]) return ARMOR_CATALOG[raw];
    const k = normArmorName(raw);
    if (ARMOR_LOOKUP[k]) return ARMOR_LOOKUP[k];
    const compact = compactArmorName(raw);
    if (ARMOR_LOOKUP_COMPACT[compact]) return ARMOR_LOOKUP_COMPACT[compact];
    if (looksLikeArmor(item)) return inferArmorDef(item);
    return null;
}

function isArmorItem(item) {
    return looksLikeArmor(item);
}

function resolveCoverageSlots(def, chosen) {
    if (!def) return [];
    if (def.coverage === 'limb' || def.coverage === 'arm' || def.coverage === 'leg') {
        return chosen ? [chosen] : [];
    }
    if (def.coverage === 'clothes') return BODY_COVER.clothes.slice();
    if (BODY_COVER[def.coverage]) return BODY_COVER[def.coverage].slice();
    return [];
}

function limbKind(slot) {
    if (slot === 'larm' || slot === 'rarm') return 'arm';
    if (slot === 'lleg' || slot === 'rleg') return 'leg';
    if (slot === 'torso') return 'torso';
    if (slot === 'head') return 'head';
    return '';
}

function getArmorMaterialMods(def) {
    if (!def || !def.mods || !def.mods.includes('material')) return [];
    return ARMOR_MATERIALS[def.family] || [];
}

function getArmorUpgradeMods(def, equippedSlots) {
    if (!def || !def.mods || !def.mods.includes('upgrade')) return [];
    const kinds = new Set();
    if (equippedSlots && equippedSlots.length) {
        equippedSlots.forEach(s => kinds.add(limbKind(s)));
    } else if (def.coverage === 'limb') {
        kinds.add('arm'); kinds.add('leg');
    } else if (def.coverage === 'arm') kinds.add('arm');
    else if (def.coverage === 'leg') kinds.add('leg');
    else if (def.coverage === 'torso') kinds.add('torso');
    else if (def.coverage === 'head') kinds.add('head');
    else if (def.coverage === 'clothes') { kinds.add('torso'); kinds.add('arm'); kinds.add('leg'); }
    return ARMOR_UPGRADES.filter(u => u.where === 'any' || kinds.has(u.where));
}

function getArmorLiningMods(def) {
    if (!def || !def.mods || !def.mods.includes('lining')) return [];
    return LINING_MODS;
}

const ARMOR_SLOT_LABELS = {
    lining: 'Подкладка',
    material: 'Материал',
    upgrade: 'Апгрейд'
};

const AMMO_MAG = {
    '.38': 10,
    '10-мм': 8,
    '.308': 6,
    'Сигнальная ракета': 2,
    'Патрон дробовика': 6,
    '.45': 8,
    'Топливо для огнемета': 12,
    'Ядерная батарея': 14,
    'Гамма-патрон': 4,
    'Железнодорожный гвоздь': 6,
    'Шприцы': 4,
    '.44 Магнум': 4,
    '.50': 4,
    '5.56-мм': 8,
    '5-мм': 12,
    'Ядерный блок': 1,
    'Ракета': 2,
    'Заряд плазмы': 10,
    '2-мм ЭК': 6,
    'Ядерный выстрел': 1,
    'Хлам': 6
};

function armorModIndex(item, slot) {
    if (!item.mods) item.mods = {};
    const v = parseInt(item.mods[slot], 10);
    return Number.isFinite(v) ? v : 0;
}

function armorDisplayName(item) {
    return (item && (item.baseId || item.title || item.name)) || 'Броня';
}

function occupyingKind(item) {
    const def = getArmorDef(item);
    if (!def) return 'armor';
    if (def.coverage === 'head') return 'head';
    if (def.family === 'clothes') return 'clothes';
    return 'armor';
}

function upgradeApplies(u, def, equippedSlots) {
    if (!u || u.name === 'Нет') return false;
    const kinds = new Set();
    if (equippedSlots && equippedSlots.length) {
        equippedSlots.forEach(s => kinds.add(limbKind(s)));
    } else if (def) {
        if (def.coverage === 'limb') { kinds.add('arm'); kinds.add('leg'); }
        else if (def.coverage === 'clothes') { kinds.add('torso'); kinds.add('arm'); kinds.add('leg'); }
        else if (def.coverage) kinds.add(def.coverage);
    }
    return u.where === 'any' || kinds.has(u.where);
}

function getArmorTotals(item) {
    const def = getArmorDef(item);
    const out = { phys: 0, eng: 0, rad: 0, carry: 0, special: '', name: armorDisplayName(item) };
    if (!def) return out;
    out.phys = def.phys || 0;
    out.eng = def.eng || 0;
    out.rad = def.rad || 0;
    out.carry = def.carry || 0;
    out.special = def.special || '';
    const mats = getArmorMaterialMods(def);
    const m = mats[armorModIndex(item, 'material')];
    if (m) { out.phys += m.phys || 0; out.eng += m.eng || 0; out.rad += m.rad || 0; }
    const lin = getArmorLiningMods(def)[armorModIndex(item, 'lining')];
    if (lin) { out.phys += lin.phys || 0; out.eng += lin.eng || 0; out.rad += lin.rad || 0; }
    const u = ARMOR_UPGRADES[armorModIndex(item, 'upgrade')];
    if (u && def.mods && def.mods.includes('upgrade') && upgradeApplies(u, def, item.equipped)) {
        out.phys += u.phys || 0;
        out.eng += u.eng || 0;
        out.rad += u.rad || 0;
        const slots = item.equipped && item.equipped.length
            ? item.equipped
            : (def.coverage === 'torso' ? ['torso'] : []);
        slots.forEach(s => {
            if (s === 'torso') out.carry += u.carryTorso || 0;
            else if (limbKind(s) === 'arm' || limbKind(s) === 'leg') out.carry += u.carryLimb || 0;
        });
    }
    return out;
}

function normalizeArmorItem(item) {
    if (!item || !isArmorItem(item)) return item;
    item.type = 'armor';
    if (!item.baseId) item.baseId = item.title || item.name;
    if (!item.title) item.title = item.baseId;
    if (!item.mods) item.mods = {};
    ['lining', 'material', 'upgrade'].forEach(s => {
        if (item.mods[s] === undefined || item.mods[s] === null) item.mods[s] = 0;
    });
    if (!Array.isArray(item.equipped)) item.equipped = [];
    return item;
}

function getArmorModChoices(item, slot) {
    const def = getArmorDef(item);
    if (!def) return [];
    if (slot === 'lining') return getArmorLiningMods(def);
    if (slot === 'material') return getArmorMaterialMods(def);
    if (slot === 'upgrade') return getArmorUpgradeMods(def, item.equipped);
    return [];
}

function computeLocationDrFromGear(inventory) {
    const out = {};
    Object.keys(HIT_LOCS).forEach(loc => {
        out[loc] = { phys: 0, eng: 0, rad: 0, clothes: null, armor: null };
    });
    (inventory || []).forEach(it => {
        if (!isArmorItem(it) || !it.equipped || !it.equipped.length) return;
        const totals = getArmorTotals(it);
        const src = { phys: totals.phys, eng: totals.eng, rad: totals.rad, name: armorDisplayName(it) };
        const clothes = occupyingKind(it) === 'clothes';
        it.equipped.forEach(loc => {
            if (!out[loc]) return;
            if (clothes) out[loc].clothes = src;
            else out[loc].armor = src;
        });
    });
    Object.keys(out).forEach(loc => {
        const c = out[loc].clothes || { phys: 0, eng: 0, rad: 0 };
        const a = out[loc].armor || { phys: 0, eng: 0, rad: 0 };
        out[loc].phys = Math.max(c.phys || 0, a.phys || 0);
        out[loc].eng = Math.max(c.eng || 0, a.eng || 0);
        out[loc].rad = Math.max(c.rad || 0, a.rad || 0);
    });
    return out;
}

function getEquippedCarryBonus(inventory) {
    let n = 0;
    (inventory || []).forEach(it => {
        if (!isArmorItem(it) || !it.equipped || !it.equipped.length) return;
        n += getArmorTotals(it).carry || 0;
    });
    return n;
}

function wornNamesForLoc(inventory, loc) {
    const names = [];
    (inventory || []).forEach(it => {
        if (isArmorItem(it) && it.equipped && it.equipped.indexOf(loc) !== -1) {
            names.push(armorDisplayName(it));
        }
    });
    return names;
}

function weaponAmmoInfo(name) {
    return WEAPON_AMMO[name] || null;
}

function caliberFromModText(text) {
    const s = String(text || '');
    if (/\.50/.test(s)) return '.50';
    if (/\.308/.test(s)) return '.308';
    if (/\.45/.test(s)) return '.45';
    if (/\.44/.test(s)) return '.44 Магнум';
    if (/\.38/.test(s)) return '.38';
    if (/5\.56/.test(s)) return '5.56-мм';
    if (/10-мм|10мм/.test(s)) return '10-мм';
    return '';
}

function getWeaponAmmoType(name, item) {
    let type = (WEAPON_AMMO[name] && WEAPON_AMMO[name].type) || '';
    if (!item || !item.mods || typeof masterDB === 'undefined' || !masterDB.weapons || !masterDB.weapons[name]) return type;
    const slots = masterDB.weapons[name].slots || {};
    Object.keys(item.mods).forEach(slot => {
        const mod = slots[slot] && slots[slot][item.mods[slot]];
        if (!mod) return;
        const found = caliberFromModText((mod.name || '') + ' ' + (mod.hint || ''));
        if (found) type = found;
    });
    return type;
}

function computeWeaponMagSize(name, fireRate, qualities, item) {
    const ammoType = getWeaponAmmoType(name, item);
    const info = WEAPON_AMMO[name];
    let mag;
    if (info && info.mag) mag = info.mag;
    else if (AMMO_MAG[ammoType]) mag = AMMO_MAG[ammoType];
    else mag = Math.max(1, 1 + (parseInt(fireRate, 10) || 0));
    if (info && ammoType && ammoType !== info.type && AMMO_MAG[ammoType]) mag = AMMO_MAG[ammoType];
    const q = (qualities || []).join(' ').toLowerCase();
    const fr = parseInt(fireRate, 10) || 0;
    if (/гатлинг/.test(q) && name === 'Миниган') mag = 120;
    if (/гатлинг/.test(q) && name === 'Гатлинг-лазер') mag = 10 * (1 + fr);
    if (item && item.mods && typeof masterDB !== 'undefined' && masterDB.weapons && masterDB.weapons[name]) {
        const slots = masterDB.weapons[name].slots || {};
        Object.keys(item.mods).forEach(slot => {
            const mod = slots[slot] && slots[slot][item.mods[slot]];
            if (mod && /больш/i.test(mod.name || '')) mag = Math.ceil(mag * 1.5);
        });
    }
    return Math.max(1, mag);
}
