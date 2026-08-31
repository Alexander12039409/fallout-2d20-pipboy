/* Дополнение каталога еды с fallout-2d20.ru. Не подменяет позиции основной книги. */
(function (root) {
  root.SITE_FOOD_PACK = {
    items: [],
    aliases: {
      'Печёный дутень': ['Запеченный дутень', 'Запечённый дутень'],
      'Мозгогриб': ['Мозговой гриб', 'Мозговой Гриб'],
      'Отбивные из собачатины': ['Отбивные из дворняги'],
      'Омлет из яйца когтя смерти': ['Омлет из яиц Когтя смерти', 'Омлет из яиц когтя смерти'],
      'Стейк из матки болотников': ['Стейк из матки болотника', 'Стейк из Матки Болотника'],
      'Идеально сохранившийся пирог': ['Идеально сохравнившийся пирог'],
      'Наливные яблоки': ['Яблоки Денди Бой'],
      'Чашка с лапшой': ['Лапша в стаканчике'],
      'Собачьи консервы': ['Консервированный собачий корм'],
      'Тыква': ['Тыковка']
    }
  };

  function foodNorm(s) {
    return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/gi, '');
  }

  function findItem(list, name) {
    const n = foodNorm(name);
    if (!n || !list) return null;
    for (let i = 0; i < list.length; i++) {
      const it = list[i];
      if (it && foodNorm(it.name) === n) return it;
    }
    return null;
  }

  root.applySiteFoodPack = function applySiteFoodPack() {
    const pack = root.SITE_FOOD_PACK;
    if (!pack || typeof dbItems === 'undefined') return;
    (pack.items || []).forEach(function (it) {
      if (!it || !it.name || findItem(dbItems, it.name)) return;
      dbItems.push({
        name: it.name,
        type: 'consumable',
        category: it.category || 'Еда',
        desc: it.desc || '',
        aliases: it.aliases || []
      });
    });
    Object.keys(pack.aliases || {}).forEach(function (name) {
      const it = findItem(dbItems, name);
      if (!it) return;
      it.aliases = it.aliases || [];
      (pack.aliases[name] || []).forEach(function (al) {
        if (al && it.aliases.indexOf(al) === -1) it.aliases.push(al);
      });
    });
  };
})(typeof window !== 'undefined' ? window : this);
