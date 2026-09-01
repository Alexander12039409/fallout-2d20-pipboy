// Обыск гл. 5: таблицы 2d20 / 3d20. Имена как в книге, резолв через каталог.
(function () {
    function d20() { return 1 + Math.floor(Math.random() * 20); }
    function roll2() { return d20() + d20(); }
    function roll3() { return d20() + d20() + d20(); }
    function rollCd(n) {
        let dmg = 0;
        for (let i = 0; i < n; i++) {
            const f = ['one', 'two', 'effect', 'effect', 'blank', 'blank'][Math.floor(Math.random() * 6)];
            if (f === 'one' || f === 'effect') dmg += 1;
            else if (f === 'two') dmg += 2;
        }
        return dmg;
    }
    function qty(base, cd) { return (base || 0) + rollCd(cd || 0); }

    function fill(from, to, val) {
        const o = {};
        for (let i = from; i <= to; i++) o[i] = val;
        return o;
    }
    function merge() {
        const o = {};
        for (let a = 0; a < arguments.length; a++) {
            const src = arguments[a];
            Object.keys(src).forEach(function (k) { o[k] = src[k]; });
        }
        return o;
    }

    const AMMO = merge(
        fill(2, 4, { name: '2-мм ЭК', base: 6, cd: 3 }),
        { 5: { name: 'Заряд плазмы', base: 10, cd: 5 }, 6: { name: 'Ракета', base: 2, cd: 1, special: 'hauler1' }, 7: { name: 'Ядерный блок', base: 1, cd: 0, noHauler: true } },
        fill(8, 9, { name: 'Патроны 5-мм', base: 12, cd: 6, times: 10 }),
        fill(10, 11, { name: 'Патроны .50', base: 4, cd: 2 }),
        fill(12, 13, { name: 'Шприцы', base: 4, cd: 2 }),
        { 14: { name: 'Гамма-патрон', base: 4, cd: 2 } },
        fill(15, 16, { name: 'Топливо для огнемёта', base: 12, cd: 6 }),
        fill(17, 18, { name: 'Патроны .45', base: 9, cd: 4 }),
        fill(19, 20, { name: 'Патроны 10-мм', base: 8, cd: 4 }),
        fill(21, 22, { name: 'Патроны .38', base: 10, cd: 5 }),
        { 23: { name: 'Сигнальная ракета', base: 2, cd: 1 }, 24: { name: 'Патроны .308', base: 6, cd: 3 } },
        fill(25, 26, { name: 'Патроны дробовика', base: 6, cd: 3 }),
        fill(27, 28, { name: 'Ядерная батарея', base: 14, cd: 7 }),
        fill(29, 30, { name: 'Железнодорожный гвоздь', base: 6, cd: 3 }),
        fill(31, 32, { name: 'Патроны .44 Магнум', base: 4, cd: 2 }),
        fill(33, 34, { name: 'Патроны 5.56-мм', base: 8, cd: 4 }),
        { 35: { name: 'Ракета', base: 2, cd: 1, special: 'hauler1' }, 36: { name: 'Ядерный блок', base: 1, cd: 0, noHauler: true }, 37: { name: 'Заряд плазмы', base: 10, cd: 5 } },
        fill(38, 40, { name: 'Ядерный минизаряд', base: 1, cd: 1, noHauler: true })
    );

    const ARMOR = merge(
        fill(2, 4, 'X-01 Элемент силовой брони'),
        fill(5, 6, 'Каркас силовой брони'),
        fill(7, 8, 'T-60 Элемент силовой брони'),
        fill(9, 10, 'Тяжёлая собачья броня'),
        { 11: 'Прочная Боевая Броня', 12: 'Тяжёлая Металлическая Броня', 13: 'Элемент силовой брони рейдеров', 14: 'Средняя собачья броня', 15: 'Прочная Металлическая Броня', 16: 'Тяжёлая Рейдерская Броня', 17: 'Броня охранника Волт-Тек', 18: 'Прочная Рейдерская Броня', 19: 'Кожаная Броня', 21: 'Рейдерская Броня', 23: 'Металлическая Броня', 24: 'Лёгкая собачья броня', 25: 'Прочная Кожаная Броня', 26: 'Боевая Броня' },
        fill(20, 20, 'Прочная Рейдерская Броня'),
        fill(22, 22, 'Прочная Рейдерская Броня'),
        { 27: 'T-45 Элемент силовой брони', 28: 'Тяжёлая Кожаная Броня', 29: 'Броня Синтов', 30: 'T-51 Элемент силовой брони' },
        fill(31, 32, 'Тяжёлая Боевая Броня'),
        fill(33, 34, 'Прочная Броня Синтов'),
        { 35: 'Прочная Рейдерская Броня' },
        fill(36, 37, 'Каркас силовой брони'),
        fill(38, 40, 'Тяжёлая Броня Синтов')
    );

    const CLOTHES = merge(
        { 2: 'Облачение Братства Стали', 3: 'Щиток сварщика', 4: 'Шляпа писца Братства', 5: 'Капюшон Братства Стали', 6: 'Доспехи писца Братства', 7: 'Униформа Братства Стали', 8: 'Каска', 9: 'Армейский шлем' },
        fill(10, 11, 'Лабораторный халат'),
        fill(12, 13, 'Броня инженера'),
        fill(14, 15, 'Дорожная кожа'),
        fill(16, 17, 'Повседневная одежда'),
        fill(18, 19, 'Шкура'),
        fill(20, 21, 'Портупея'),
        fill(22, 23, 'Капюшон из мешковины'),
        fill(24, 25, 'Военная форма'),
        fill(26, 27, 'Прочная одежда'),
        fill(28, 29, 'Плотное пальто'),
        fill(30, 31, 'Рабочий комбинезон'),
        { 32: 'Обычная шляпа', 33: 'Капюшон', 34: 'Комбинезон Убежища' },
        fill(35, 36, 'Формальная одежда'),
        { 37: 'Формальная шляпа', 38: 'Противогаз', 39: 'Бойцовская броня', 40: 'Защитный костюм' }
    );

    const FOOD = merge(
        { 2: 'Макароны с сыром Бламко', 3: 'Идеально сохранившийся пирог', 4: 'Дыня (не облученная)', 5: 'Морковь (не облученная)', 6: 'Продуктовый набор института', 7: 'Сахарные бомбочки', 8: 'Мутафрукт (не облучённый)', 9: 'Кексы «Весёлые ребята» (сохранившиеся)', 10: 'Сладкий рулет', 11: 'Бритвозлак', 12: 'Кусочки игуаны', 13: 'Макароны с сыром Бламко (сохранившиеся)', 14: 'Морковь', 15: 'Смоляника', 16: 'Сахарные бомбочки', 17: 'Консервированное мясо', 18: 'Свинина с бобами', 19: 'Пюре быстрого приготовления', 20: 'Наливные яблоки', 21: 'Собачьи консервы', 22: 'Кексы «Весёлые ребята»', 23: 'Жевательные пастилки', 24: 'Мутафрукт', 25: 'Картофельные чипсы', 26: 'СРАМ', 27: 'Стейк солсбери', 28: 'Мозгогриб', 29: 'Кукуруза', 30: 'Тыква', 31: 'Дыня', 32: 'Илофасоль', 33: 'Тошка', 34: 'Пюре б/п (сохранившиеся)', 35: 'Стейк солсбери (сохранившийся)', 36: 'Пищевая паста', 37: 'Чашка лапши', 38: 'Кукуруза (не облученная)', 39: 'Фаршированные яйца «Ням-ням»', 40: 'Смоляника' }
    );

    const DRINK = merge(
        fill(2, 3, 'Вино'),
        fill(4, 5, 'Виски'),
        fill(6, 8, 'Вишнёвая Нюка-Кола'),
        fill(9, 11, 'Нюка-Кола'),
        fill(12, 14, 'Бурбон'),
        fill(15, 18, 'Пиво'),
        fill(19, 23, 'Грязная вода'),
        fill(24, 27, 'Очищенная вода'),
        fill(28, 30, 'Молоко брамина'),
        fill(31, 33, 'Ром'),
        fill(34, 36, 'Самогон'),
        fill(37, 38, 'Водка'),
        fill(39, 40, 'Вино')
    );

    const CHEM = merge(
        { 2: 'Суперстимпак', 3: 'Успокоин', 4: 'Глюконафт', 5: 'Аддиктол' },
        fill(6, 7, 'Стимпак'),
        fill(8, 9, 'Антирадин'),
        fill(10, 11, 'Психо'),
        fill(12, 13, 'Мед-Х'),
        fill(14, 15, 'Шик'),
        fill(16, 17, 'Рад-Х (разбавленный)'),
        fill(18, 19, 'Целебная мазь'),
        fill(20, 22, 'Грязная вода'),
        fill(23, 24, 'Стимпак (разбавленный)'),
        fill(25, 26, 'Антирадин (разбавленный)'),
        fill(27, 28, 'Баффаут'),
        fill(29, 30, 'Винт'),
        fill(31, 32, 'Ментаты'),
        fill(33, 34, 'Рад-Х'),
        fill(35, 36, 'Стимпак'),
        { 37: 'Антибиотики', 38: 'Перегрузка', 39: 'Ярость', 40: 'X-клетка' }
    );

    const RANGED = merge(
        fill(2, 3, 'Толстяк'),
        fill(4, 5, 'Пусковая установка'),
        { 6: 'Гвоздемет', 7: 'Хламотрон', 8: 'Огнемет', 9: 'Плазменный пистолет', 10: 'Кустарный карабин', 11: 'Лазер Института', 12: 'Инъекционный карабин', 13: 'Охотничий карабин', 14: 'Боевой карабин', 15: 'Лазерный мушкет', 16: 'ПП Томпсона', 17: '10-мм пистолет', 18: 'Кустарный карабин', 19: 'Кустарный пистолет', 20: 'Кустарная винтовка', 21: 'Кустарный пистолет', 22: 'Кустарный пистолет', 23: 'Кустарный револьвер', 24: 'Кустарный карабин', 25: '10-мм пистолет', 26: 'Двуствольный дробовик', 27: '.44 Револьвер', 28: 'Боевой карабин', 29: 'Охотничий карабин', 30: 'Боевой дробовик', 31: 'Лазер Института', 32: 'Лазерный пистолет', 33: 'Миниган', 34: 'Плазменная винтовка', 35: 'Гатлинг-лазер', 36: 'Карабин Гаусса', 37: 'Тяжелый инсинератор', 38: 'Тяжелый инсинератор', 39: 'Гамма-пушка', 40: 'Гамма-пушка' }
    );

    const MELEE = merge(
        { 2: 'Перчатка когтя смерти', 3: 'Шиш-кебаб', 4: 'Шиш-кебаб' },
        fill(5, 6, 'Кувалда'),
        fill(7, 8, 'Потрошитель'),
        fill(9, 10, 'Боксёрская перчатка'),
        fill(11, 12, 'Телескопическая дубинка'),
        fill(13, 14, 'Мачете'),
        fill(15, 16, 'Трость'),
        fill(17, 18, 'Кий'),
        fill(19, 20, 'Выкидной нож'),
        fill(21, 22, 'Дрын'),
        fill(23, 24, 'Свинцовая труба'),
        fill(25, 26, 'Скалка'),
        fill(27, 28, 'Разводной ключ'),
        fill(29, 30, 'Кастет'),
        fill(31, 32, 'Монтировка'),
        fill(33, 34, 'Меч'),
        fill(35, 36, 'Алюминиевая бейсбольная бита'),
        fill(37, 38, 'Силовой кастет'),
        fill(39, 40, 'Суперкувалда')
    );

    const THROW = merge(
        { 2: { name: 'Ядерная граната', n: 1 }, 3: { name: 'Импульсная мина', n: 1 }, 4: { name: 'Импульсная мина', n: 1 }, 5: { name: 'Плазменная мина', n: 1 }, 6: { name: 'Плазменная мина', n: 1 } },
        fill(7, 9, { name: 'Крышко-мина', n: 1 }),
        fill(10, 12, { name: 'Осколочная граната', base: 2, cd: 1 }),
        fill(13, 14, { name: 'Коктейль Молотова', base: 2, cd: 1 }),
        fill(15, 19, { name: 'Дротик', base: 2, cd: 1 }),
        fill(20, 22, { name: 'Метательный нож', base: 4, cd: 2 }),
        fill(23, 27, { name: 'Бейсбольная граната', base: 2, cd: 1 }),
        fill(28, 29, { name: 'Коктейль Молотова', base: 2, cd: 1 }),
        fill(30, 32, { name: 'Томагавк', base: 2, cd: 1 }),
        fill(33, 35, { name: 'Осколочная мина', n: 1 }),
        fill(36, 37, { name: 'Плазменная граната', n: 1 }),
        fill(38, 39, { name: 'Импульсная граната', n: 1 }),
        { 40: { name: 'Ядерная мина', n: 1 } }
    );

    const VALUE = merge(
        fill(3, 4, 'Поле регенерации'),
        { 5: 'Довоенные деньги (5d20 крышек)', 6: 'Довоенные деньги (3d20 крышек)', 7: '5d20 крышек', 8: '5d20 крышек', 9: '5d20 крышек', 10: 'Поле невидимости', 11: 'Разведсенсоры', 12: 'Диагностический модуль', 13: 'Счётчик Гейгера', 14: 'Докторский саквояж', 15: 'Журнал', 16: '4d20 крышек', 17: '4d20 крышек', 18: 'Контейнер', 19: 'Модуль обнаружения опасностей', 20: 'Радио', 21: 'Набор отмычек', 22: 'Проигрыватель голозаписей', 23: 'Большой рюкзак', 24: 'Довоенные деньги (5d20 крышек)', 25: '3d20 крышек', 26: 'Внутренний бойлер', 27: 'Сигнальные ракеты', 28: 'Довоенные деньги (2d20 крышек)', 29: '2d20 крышек', 30: 'Заколки', 31: '1d20 крышек', 32: 'Довоенные деньги (1d20 крышек)', 33: 'Заколки', 34: 'Маленький рюкзак', 35: 'Факел', 36: 'Записка или голозапись', 37: 'Заколки', 38: 'Ремкомплект для роботов', 39: 'Аптечка первой помощи', 40: 'Фонарь', 41: 'Мультитул', 42: 'Модуль хакинга', 43: 'Модуль взлома замков', 44: 'Закрытый контейнер', 45: 'Заколки', 46: 'Стелс-бой', 47: 'Элитный набор инструментов', 48: 'Фонарик', 49: 'Модуль поведенческого анализа', 50: 'Радиационные катушки', 51: 'Массив сенсоров', 52: 'Ключ', 53: 'Ключ', 54: 'Ключ', 55: 'Заколки', 56: 'Заколки', 57: 'Заколки', 58: 'Распылитель стимпака', 59: 'Распылитель стимпака', 60: 'Катушки Тесла' }
    );

    const PLACES = {
        corpse: {
            label: 'Труп',
            cats: { ammo: [1, 2], junk: [0, 1], chem: [0, 1], ranged: [0, 1], melee: [0, 1], drink: [0, 1] }
        },
        crate: {
            label: 'Ящик / сейф',
            cats: { junk: [1, 2], ammo: [0, 2], value: [0, 1], chem: [0, 1], food: [0, 1] }
        },
        house: {
            label: 'Дом / поселение',
            cats: { clothes: [1, 2], food: [2, 4], drink: [1, 3], junk: [2, 6], ranged: [0, 1], ammo: [0, 1], chem: [0, 1] }
        },
        shop: {
            label: 'Магазин',
            cats: { food: [2, 5], drink: [2, 4], junk: [1, 4], ammo: [0, 2], clothes: [0, 2], chem: [0, 1] }
        },
        military: {
            label: 'Военный объект',
            cats: { ammo: [2, 4], ranged: [0, 2], armor: [0, 1], chem: [0, 1], junk: [1, 3] }
        },
        raider: {
            label: 'Рейдерский лагерь',
            cats: { junk: [2, 5], ammo: [1, 3], chem: [0, 2], ranged: [0, 1], melee: [0, 1], food: [0, 2], drink: [1, 2] }
        },
        nuka: {
            label: 'Автомат Нюка-Колы',
            cats: { nuka: [1, 1] }
        },
        wild: {
            label: 'Дикая местность',
            cats: { forage: [1, 1] }
        }
    };

    const VALUE_TIER = {
        junk: { label: 'Мелочь', extra: 0, skip: { ranged: 1, melee: 1, armor: 1, value: 1 }, junkOnlyMin: true },
        common: { label: 'Обычно', extra: 0 },
        good: { label: 'Ценно', extra: 0.5 },
        great: { label: 'Очень ценно', extra: 1, bonusValue: true }
    };

    const FORAGE = { 1: 'Мозгогриб', 2: 'Мозгогриб', 3: 'Морковь', 4: 'Морковь', 5: 'Кукуруза', 6: 'Кукуруза', 7: 'Тыква', 8: 'Тыква', 9: 'Дыня', 10: 'Дыня', 11: 'Мутафрукт', 12: 'Мутафрукт', 13: 'Мутафрукт', 14: 'Бритвозлак', 15: 'Бритвозлак', 16: 'Илофасоль', 17: 'Илофасоль', 18: 'Тошка', 19: 'Тошка', 20: 'Тошка' };
    const NUKA = { 1: 'пусто', 2: 'пусто', 3: 'пусто', 4: 'пусто', 5: 'пусто', 6: 'пусто', 7: 'пусто', 8: 'пусто', 9: 'стеклянные бутылки (хлам ×2 материала)', 10: 'стеклянные бутылки', 11: 'стеклянные бутылки', 12: 'стеклянные бутылки', 13: 'Нюка-Кола ×1', 14: 'Нюка-Кола ×1', 15: 'Нюка-Кола ×1', 16: 'Нюка-Кола ×2', 17: 'Нюка-Кола ×2', 18: 'Нюка-Кола + Вишнёвая Нюка-Кола', 19: 'Нюка-Кола ×2 + Вишнёвая', 20: 'Квантовая Нюка-Кола' };

    function pickTable(table, roll) {
        if (table[roll]) return table[roll];
        const keys = Object.keys(table).map(Number).sort(function (a, b) { return a - b; });
        for (let i = 0; i < keys.length; i++) if (roll <= keys[i]) return table[keys[i]];
        return table[keys[keys.length - 1]];
    }

    function lineFrom(cat, roll) {
        if (cat === 'ammo') {
            const a = pickTable(AMMO, roll);
            let n = qty(a.base, a.cd);
            if (a.times) n = n * a.times;
            return a.name + ' ×' + n;
        }
        if (cat === 'armor') return String(pickTable(ARMOR, roll));
        if (cat === 'clothes') return String(pickTable(CLOTHES, roll));
        if (cat === 'food') return String(pickTable(FOOD, roll));
        if (cat === 'drink') return String(pickTable(DRINK, roll));
        if (cat === 'chem') return String(pickTable(CHEM, roll));
        if (cat === 'ranged') return String(pickTable(RANGED, roll));
        if (cat === 'melee') return String(pickTable(MELEE, roll));
        if (cat === 'throw') {
            const t = pickTable(THROW, roll);
            const n = t.n != null ? t.n : qty(t.base, t.cd);
            return t.name + (n > 1 ? ' ×' + n : '');
        }
        if (cat === 'value') return String(pickTable(VALUE, roll));
        if (cat === 'junk') return 'Хлам ×' + roll + ' (вес 2, 2 крышки/шт при торговле)';
        if (cat === 'forage') return String(pickTable(FORAGE, d20()));
        if (cat === 'nuka') return 'Автомат: ' + NUKA[d20()] + '; ' + NUKA[d20()];
        return 'предмет';
    }

    function rollsFor(minMax, extraFrac) {
        const min = minMax[0] || 0;
        const max = minMax[1] || min;
        const extra = Math.round((max - min) * (extraFrac || 0));
        return Math.max(0, min + extra);
    }

    function runLoot(placeId, tierId) {
        const place = PLACES[placeId] || PLACES.house;
        const tier = VALUE_TIER[tierId] || VALUE_TIER.common;
        const lines = [];
        Object.keys(place.cats).forEach(function (cat) {
            if (tier.skip && tier.skip[cat]) return;
            const n = rollsFor(place.cats[cat], tier.junkOnlyMin ? 0 : tier.extra);
            for (let i = 0; i < n; i++) {
                const roll = cat === 'value' ? roll3() : (cat === 'junk' ? roll2() : roll2());
                lines.push('• [' + catLabel(cat) + '] ' + lineFrom(cat, roll));
            }
        });
        if (tier.bonusValue) lines.push('• [ценность] ' + lineFrom('value', roll3()));
        if (!lines.length) lines.push('• пусто (мелочь не дала бросков — попробуйте «обычно»)');
        return { title: 'ОБЫСК · ' + place.label.toUpperCase() + ' · ' + tier.label.toUpperCase(), lines: lines };
    }

    function catLabel(c) {
        return ({ ammo: 'патроны', armor: 'броня', clothes: 'одежда', food: 'еда', drink: 'напитки', chem: 'химия', ranged: 'ствол', melee: 'ближний', throw: 'метательное', value: 'ценность', junk: 'хлам', forage: 'дикорос', nuka: 'нюка' })[c] || c;
    }

    window.openLootSheet = function () {
        if (document.body.getAttribute('data-mode') === 'player') return;
        const modal = document.getElementById('loot-modal');
        if (!modal) return;
        modal.classList.add('active');
    };
    window.closeLootSheet = function () {
        const modal = document.getElementById('loot-modal');
        if (modal) modal.classList.remove('active');
    };
    window.runLootSearch = function () {
        const place = (document.getElementById('loot-place') || {}).value || 'house';
        const tier = (document.getElementById('loot-tier') || {}).value || 'common';
        const res = runLoot(place, tier);
        const note = {
            id: 'loot_' + Date.now(),
            title: res.title,
            text: 'Проверка обыска: ВСП + Выживание, сложность по степени локации (нетронутая 0 … хорошо исследована 3). Ниже — броски таблиц 2d20 книги, стр. 200–207.\n\n' + res.lines.join('\n')
        };
        if (typeof PipSession !== 'undefined' && PipSession.sessionId) {
            const list = Array.isArray(PipSession.state.masterNotes) ? PipSession.state.masterNotes.slice() : [];
            list.unshift(note);
            PipSession.state.masterNotes = list;
            if (typeof PipSession.pushNotes === 'function') PipSession.pushNotes(list);
            if (typeof renderMasterNotes === 'function') renderMasterNotes();
        } else if (typeof pipNotify === 'function') {
            pipNotify('Нет стола', 'Обыск пишется в заметки сессии. Создайте стол.', { kind: 'warn' });
        }
        closeLootSheet();
        if (typeof pipNotify === 'function') pipNotify(res.title, res.lines.length + ' находок в заметках стола.', { kind: 'ok' });
    };
})();
