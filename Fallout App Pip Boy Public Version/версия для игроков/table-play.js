// UI стола: пул ОД, проверки игрока, расходники, рады, Псина, зоны робота.
(function () {
    const IS_PLAYER = !!(document.body && document.body.getAttribute('data-mode') === 'player');

    function esc(s) {
        return typeof escapePipHtml === 'function' ? escapePipHtml(s) : String(s || '').replace(/[&<>"]/g, function (c) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c];
        });
    }

    function live() {
        if (typeof liveChar === 'function') return liveChar();
        if (typeof findChar === 'function' && typeof activeCharId !== 'undefined') return findChar(activeCharId);
        return null;
    }

    function persist() {
        if (typeof persistLiveChar === 'function') persistLiveChar();
        else if (typeof saveActiveCharLive === 'function') saveActiveCharLive();
    }

    function diceSvg() {
        /* Диметрический куб: низкая крышка и высокие бока, чтобы не схлопывался в квадрат/шестиугольник. */
        return '<svg class="skill-roll-ico" viewBox="0 0 24 24" aria-hidden="true">' +
            '<path fill="currentColor" fill-opacity="0.34" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 2.4 L21.6 6.6 L12 10.8 L2.4 6.6 Z"/>' +
            '<path fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M2.4 6.6 L12 10.8 V21.4 L2.4 17.2 Z"/>' +
            '<path fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M21.6 6.6 L12 10.8 V21.4 L21.6 17.2 Z"/>' +
            '<g fill="currentColor">' +
            '<circle cx="12" cy="6.6" r="1.15"/>' +
            '<circle cx="6.6" cy="12.2" r="1.05"/>' +
            '<circle cx="7.7" cy="15.6" r="1.05"/>' +
            '<circle cx="6.6" cy="18.9" r="1.05"/>' +
            '<circle cx="16.5" cy="11.6" r="1"/>' +
            '<circle cx="17.7" cy="14.9" r="1"/>' +
            '<circle cx="16.4" cy="18.2" r="1"/>' +
            '</g></svg>';
    }

    /* ---------- ОД стола ---------- */
    function currentAp() {
        const ap = (typeof PipSession !== 'undefined' && PipSession.state && PipSession.state.tableAP) || { pool: 0, gm: 0, max: 6 };
        const max = (typeof extraApMaxFromParty === 'function') ? extraApMaxFromParty() : (ap.max || 6);
        return { pool: ap.pool || 0, gm: ap.gm || 0, max: max, sceneAt: ap.sceneAt || 0 };
    }

    function renderApBar() {
        const bar = document.getElementById('table-ap-bar');
        if (!bar) return;
        const liveSession = typeof PipSession !== 'undefined' && !!PipSession.sessionId;
        bar.hidden = !liveSession;
        if (!liveSession) return;
        const ap = currentAp();
        const poolEl = document.getElementById('table-ap-pool');
        const maxEl = document.getElementById('table-ap-max');
        const gmWrap = document.getElementById('table-ap-gm-wrap');
        const gmEl = document.getElementById('table-ap-gm');
        if (poolEl) poolEl.textContent = String(ap.pool);
        if (maxEl) maxEl.textContent = String(ap.max);
        if (gmWrap) gmWrap.hidden = IS_PLAYER;
        if (gmEl && !IS_PLAYER) gmEl.textContent = String(ap.gm);
    }

    function pushAp(payload) {
        if (typeof PipSession === 'undefined' || !PipSession.sessionId || typeof PipSession.pushAp !== 'function') return;
        PipSession.pushAp(payload).catch(function (err) {
            if (typeof pipNotify === 'function') pipNotify('ОД', (err && err.message) || 'Не удалось синхронизировать.', { kind: 'error' });
        });
    }

    window.nudgeTableAp = function (delta) {
        pushAp({ poolDelta: delta });
    };
    window.nudgeMasterAp = function (delta) {
        if (IS_PLAYER) return;
        pushAp({ gmDelta: delta });
    };
    window.startTableScene = function () {
        if (IS_PLAYER) return;
        const n = typeof sessionPlayerCount === 'function' ? sessionPlayerCount() : 1;
        pushAp({ scene: true, players: n, resetGm: false, max: typeof extraApMaxFromParty === 'function' ? extraApMaxFromParty() : 6 });
        if (typeof pipNotify === 'function') pipNotify('Сцена', 'Пул ОД группы = ' + n + ' (по числу персонажей стола). Излишек сверх максимума уйдёт мастеру.', { kind: 'ok' });
    };
    window.startTableSessionAp = function () {
        if (IS_PLAYER) return;
        const n = typeof sessionPlayerCount === 'function' ? sessionPlayerCount() : 1;
        pushAp({ scene: true, players: n, resetGm: true, max: typeof extraApMaxFromParty === 'function' ? extraApMaxFromParty() : 6 });
        if (typeof pipNotify === 'function') pipNotify('Сессия', 'Пул группы = ' + n + '. ОД мастера = ' + n + ' (1 за игрока, книга стр. 19).', { kind: 'ok' });
    };

    function spendGroupAp(cost, allowGiveGm) {
        cost = parseInt(cost, 10) || 0;
        if (cost <= 0) return { spent: 0, given: 0 };
        const ap = currentAp();
        let spent = Math.min(ap.pool, cost);
        let given = cost - spent;
        if (given && !allowGiveGm) {
            return { spent: 0, given: 0, blocked: true, need: cost, have: ap.pool };
        }
        if (spent) pushAp({ poolDelta: -spent });
        if (given) pushAp({ giveGm: given });
        return { spent: spent, given: given };
    }

    /* ---------- модалка проверки ---------- */
    function ensureCheckModal() {
        if (document.getElementById('check-modal')) return;
        const wrap = document.createElement('div');
        wrap.className = 'modal-overlay';
        wrap.id = 'check-modal';
        wrap.innerHTML = '<div class="terminal-modal check-sheet" role="dialog" aria-modal="true">' +
            '<div class="sheet-handle" aria-hidden="true"></div>' +
            '<div class="sheet-head"><h2 id="check-modal-title">ПРОВЕРКА</h2>' +
            '<button type="button" class="sheet-close" onclick="closeCheckSheet()" aria-label="Закрыть">X</button></div>' +
            '<div id="check-modal-body" class="custom-scrollbar"></div>' +
            '</div>';
        wrap.addEventListener('click', function (e) { if (e.target === wrap) closeCheckSheet(); });
        document.body.appendChild(wrap);
    }

    window.closeCheckSheet = function () {
        const m = document.getElementById('check-modal');
        if (m) m.classList.remove('active');
    };

    function openCheckSheet(title, html) {
        ensureCheckModal();
        document.getElementById('check-modal-title').textContent = title;
        document.getElementById('check-modal-body').innerHTML = html;
        document.getElementById('check-modal').classList.add('active');
    }

    function playTitle() {
        const el = document.getElementById('check-modal-title');
        return (el && el.textContent) || 'ПРОВЕРКА';
    }

    function dicePlayWait(wait) {
        if (!window.__dicePlay || typeof pipDiceReport !== 'function') return;
        pipDiceReport(
            '<div class="dice-report-kicker">' + esc(window.__dicePlayTitle || '') + '</div>' +
            '<p class="dice-report-wait">' + esc(wait || 'Бросок…') + '</p>'
        );
    }

    function liftDiceSheet(title, wait) {
        window.__dicePlay = true;
        window.__dicePlayTitle = title || playTitle();
        closeCheckSheet();
        const overlay = document.getElementById('dice-overlay');
        if (overlay) {
            overlay.classList.add('is-open', 'is-play', 'is-hud');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('dice-open');
        }
        if (typeof pipDicePlace === 'function') pipDicePlace();
        dicePlayWait(wait || 'Бросок…');
    }

    function finishDicePlay(html) {
        if (typeof pipDiceReport === 'function') pipDiceReport(html);
        window.__dicePlay = false;
    }

    function locMetaOf(key) {
        const m = (typeof HIT_LOCS !== 'undefined' && HIT_LOCS[key]) ? HIT_LOCS[key] : null;
        return { label: (m && (m.label || m.title)) || key, title: (m && (m.title || m.label)) || key };
    }

    function checkStep(id, val, minusFn, plusFn, costHtml) {
        return '<div class="check-ctrl"><span class="check-step-cost">' + (costHtml || '') + '</span>' +
            '<div class="check-step"><button type="button" class="caps-btn" onclick="' + minusFn + '">−</button>' +
            '<span class="check-step-val" id="' + id + '">' + val + '</span>' +
            '<button type="button" class="caps-btn" onclick="' + plusFn + '">+</button></div></div>';
    }

    function checkRow(label, note, controlHtml) {
        return '<div class="check-row"><div class="check-row-text"><div class="check-row-label">' + label + '</div>' +
            (note ? '<div class="check-row-note">' + note + '</div>' : '') +
            '</div>' + controlHtml + '</div>';
    }

    function reportHero(main, where, sub, ok) {
        return '<div class="dice-report-hero' + (ok ? ' is-ok' : ' is-bad') + '">' +
            '<div class="dice-report-hero-main">' + main + '</div>' +
            (where ? '<div class="dice-report-hero-where">' + where + '</div>' : '') +
            (sub ? '<div class="dice-report-hero-sub">' + sub + '</div>' : '') +
            '</div>';
    }

    function reportDetails(lines, extraHtml) {
        const mods = reportMods(lines);
        if (!mods && !extraHtml) return '';
        return '<div class="dice-report-details">' + (mods || '') + (extraHtml || '') + '</div>';
    }

    function skillDiceHtml(detail) {
        return '<div class="check-dice">' + (detail || []).map(function (d) {
            return '<span class="check-die' + (d.ok ? ' is-ok' : '') + (d.note === 'осложнение' ? ' is-bad' : '') + '" title="' + esc(d.note || '') + '">' + esc(String(d.die)) + '</span>';
        }).join('') + '</div>';
    }

    function cdDiceHtml(values) {
        const map = { one: '1', two: '2', blank: '—', effect: '5–6' };
        return '<div class="check-dice">' + (values || []).map(function (v) {
            const key = String(v);
            const label = map[key] || key;
            const hit = key === 'effect' || key === 'one' || key === 'two' || v === 1 || v === 2 || v === 5 || v === 6;
            return '<span class="check-die' + (hit ? ' is-ok' : '') + '">' + esc(label) + '</span>';
        }).join('') + '</div>';
    }

    function reportMods(lines) {
        const bits = (lines || []).filter(Boolean);
        if (!bits.length) return '';
        return '<ul class="dice-report-mods">' + bits.map(function (s) {
            return '<li>' + s + '</li>';
        }).join('') + '</ul>';
    }

    async function rollValues(type, count) {
        count = Math.max(0, parseInt(count, 10) || 0);
        if (!count) return [];
        const cap = type === 'd6' ? 10 : 5;
        const out = [];
        while (out.length < count) {
            const n = Math.min(cap, count - out.length);
            let chunk = [];
            if (typeof pipRollDice === 'function') {
                const r = await pipRollDice({
                    type: type,
                    count: n,
                    keepOpen: !!window.__dicePlay,
                    play: !!window.__dicePlay
                });
                if (r && r.values && r.values.length) chunk = r.values.slice();
            }
            while (chunk.length < n) {
                if (type === 'd6') chunk.push(['one', 'two', 'effect', 'effect', 'blank', 'blank'][Math.floor(Math.random() * 6)]);
                else chunk.push(1 + Math.floor(Math.random() * 20));
            }
            out.push.apply(out, chunk.slice(0, n));
        }
        return out.slice(0, count);
    }

    /* ---------- навык ---------- */
    function skillTn(id) {
        const el = document.getElementById('cs-tn-' + id);
        const t = el ? String(el.textContent || '') : '';
        const m = t.match(/(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
    }

    window.openSkillCheck = function (skillId, ruName) {
        if (!IS_PLAYER) return;
        const char = live();
        if (!char) return;
        const rank = parseInt(char['cs-skill-' + skillId], 10) || 0;
        const tn = skillTn(skillId);
        const tagged = typeof taggedSkillsOf === 'function' && taggedSkillsOf(char).indexOf(skillId) !== -1;
        const ap = currentAp();
        openCheckSheet('ПРОВЕРКА: ' + (ruName || skillId).toUpperCase(),
            '<div class="check-lead"><div class="check-lead-num"><div class="check-lead-tn">' + tn + '</div><div class="check-lead-lab">цель</div></div>' +
            '<div class="check-lead-meta"><div class="check-lead-name">ранг ' + rank + '</div>' +
            (tagged ? '<div class="check-row-note">отмеченный · крит ≤ ранга</div>' : '') +
            '</div></div>' +
            '<div class="check-block"><div class="check-block-title">Бросок</div>' +
            checkRow('Сложность', 'сколько успехов нужно', checkStep('check-diff', '1', 'checkAdjDiff(-1)', 'checkAdjDiff(1)')) +
            checkRow('Доп. d20', '1 / 3 / 6 ОД до броска', checkStep('check-extra', '0', 'checkAdjExtra(-1)', 'checkAdjExtra(1)',
                '<span id="check-extra-cost">0</span>&nbsp;ОД')) +
            '</div>' +
            '<div class="check-block check-block-muted">' +
            '<label class="check-opt"><input type="checkbox" id="check-give-gm"> Нехватку ОД отдать мастеру</label>' +
            '<p class="check-row-note">В пуле группы ' + ap.pool + ' ОД</p></div>' +
            '<div class="term-actions"><button class="term-btn danger" onclick="closeCheckSheet()">ОТМЕНА</button>' +
            '<button class="term-btn" onclick="runSkillCheck(\'' + skillId + '\')">БРОСИТЬ</button></div>');
        window.__checkDiff = 1;
        window.__checkExtra = 0;
    };

    window.checkAdjDiff = function (d) {
        window.__checkDiff = Math.max(0, Math.min(5, (window.__checkDiff || 1) + d));
        const el = document.getElementById('check-diff');
        if (el) el.textContent = String(window.__checkDiff);
    };
    window.checkAdjExtra = function (d) {
        window.__checkExtra = Math.max(0, Math.min(3, (window.__checkExtra || 0) + d));
        const el = document.getElementById('check-extra');
        const costEl = document.getElementById('check-extra-cost');
        if (el) el.textContent = String(window.__checkExtra);
        if (costEl) costEl.textContent = String(typeof extraDiceApCost === 'function' ? extraDiceApCost(window.__checkExtra) : 0);
    };

    window.runSkillCheck = async function (skillId) {
        const char = live();
        if (!char) return;
        const extra = window.__checkExtra || 0;
        const cost = typeof extraDiceApCost === 'function' ? extraDiceApCost(extra) : 0;
        const give = !!(document.getElementById('check-give-gm') && document.getElementById('check-give-gm').checked);
        const pay = spendGroupAp(cost, give);
        if (pay.blocked) {
            if (typeof pipNotify === 'function') pipNotify('Мало ОД', 'Нужно ' + pay.need + ', в пуле ' + pay.have + '. Отметьте «дать мастеру» или попросите ОД.', { kind: 'warn' });
            return;
        }
        const tn = skillTn(skillId);
        const rank = parseInt(char['cs-skill-' + skillId], 10) || 0;
        const tagged = typeof taggedSkillsOf === 'function' && taggedSkillsOf(char).indexOf(skillId) !== -1;
        const diff = window.__checkDiff || 1;
        const title = playTitle();
        liftDiceSheet(title, 'Проверка навыка…');
        const values = await rollValues('d20', 2 + extra);
        const ev = evaluateSkillDice(values, tn, rank, tagged, 20);
        const leftover = Math.max(0, ev.successes - diff);
        if (leftover) pushAp({ poolDelta: leftover });
        const pass = ev.successes >= diff;
        finishDicePlay(
            '<div class="dice-report-kicker">' + esc(title) + '</div>' +
            reportHero(
                pass ? 'УСПЕХ' : 'ПРОВАЛ',
                ev.successes + ' успех. · сл. ' + diff,
                leftover ? '+' + leftover + ' ОД в пул группы' : '',
                pass
            ) +
            (ev.complications ? '<p class="dice-report-warn">осложнений: ' + ev.complications + '</p>' : '') +
            reportDetails([
                'Цель ' + tn + ' · ранг ' + rank + (tagged ? ' · отмеченный' : ''),
                extra ? ('Доп. d20: ' + extra + ' · ' + cost + ' ОД' + (pay.given ? ' · мастеру ' + pay.given : '')) : '',
                pay.given ? 'Мастеру отдано ' + pay.given + ' ОД' : ''
            ], skillDiceHtml(ev.detail) + '<p class="check-hint">' + ev.detail.map(function (d) {
                return d.die + ' — ' + (d.note || '') + (d.ok ? ' ×' + d.ok : '');
            }).join(' · ') + '</p>')
        );
        renderApBar();
    };

    /* ---------- атака ---------- */
    window.openAttackCheck = function (invIndex) {
        if (!IS_PLAYER) return;
        const char = live();
        if (!char || !char.inventory || !char.inventory[invIndex]) return;
        const item = char.inventory[invIndex];
        const wData = typeof resolveWeaponData === 'function' ? resolveWeaponData(item) : null;
        if (!wData) return;
        let dmg = wData.baseDamage, fr = wData.fireRate, quals = (wData.qualities || []).slice(), rng = wData.range;
        for (let slot in (item.mods || {})) {
            if (wData.slots && wData.slots[slot] && wData.slots[slot][item.mods[slot]]) {
                const ef = wData.slots[slot][item.mods[slot]].effects || {};
                if (ef.dmg) dmg += ef.dmg;
                if (ef.isSetDmg) dmg = ef.dmg;
                if (ef.fr) fr += ef.fr;
                if (ef.addQ) quals.push.apply(quals, ef.addQ);
                if (ef.remQ) quals = quals.filter(function (q) { return ef.remQ.indexOf(q) < 0; });
            }
        }
        const skillId = weaponSkillId(wData, item);
        const melee = typeof weaponSpendsMeleeAp === 'function' ? weaponSpendsMeleeAp(wData, quals) : weaponIsMelee(wData);
        const gatling = weaponHasQual(quals, 'гатлинг');
        const inaccurate = weaponHasQual(quals, 'неточн');
        const accurate = weaponHasQual(quals, 'точн');
        const unreliable = weaponHasQual(quals, 'ненадеж');
        const ammoHave = parseInt(item.ammo, 10) || 0;
        const skillName = (typeof skillsDefs !== 'undefined' && skillsDefs.find(function (s) { return s[1] === skillId; })) || [skillId, skillId];
        const tn = skillTn(skillId);
        const strBonus = melee && typeof meleeDamageBonus === 'function' ? meleeDamageBonus(char) : 0;
        window.__atk = { idx: invIndex, dmg: dmg, fr: fr, quals: quals, melee: melee, gatling: gatling, inaccurate: inaccurate, accurate: accurate, unreliable: unreliable, skillId: skillId, ammo: ammoHave, strBonus: strBonus };
        const weaponName = typeof weaponDisplayName === 'function' ? weaponDisplayName(item) : (item.title || item.baseId);
        const locOpts = (typeof HIT_LOCS !== 'undefined' ? Object.keys(HIT_LOCS) : ['head', 'torso', 'larm', 'rarm', 'lleg', 'rleg']).map(function (k) {
            const meta = locMetaOf(k);
            return '<option value="' + k + '">' + esc(meta.title) + '</option>';
        }).join('');
        const ap = currentAp();
        const chips = ['<span class="check-chip">' + dmg + ' БК</span>']
            .concat(fr ? ['<span class="check-chip">СКР ' + fr + '</span>'] : [])
            .concat(melee ? ['<span class="check-chip">ближний</span>'] : ['<span class="check-chip">' + ammoHave + ' патр.</span>'])
            .concat(strBonus ? ['<span class="check-chip">СИЛ +' + strBonus + '</span>'] : [])
            .join('');
        openCheckSheet('АТАКА',
            '<div class="check-lead"><div class="check-lead-num"><div class="check-lead-tn">' + tn + '</div><div class="check-lead-lab">цель</div></div>' +
            '<div class="check-lead-meta"><div class="check-lead-name">' + esc(weaponName) + '</div>' +
            '<div class="check-lead-skill">' + esc(skillName[0]) + '</div>' +
            '<div class="check-chips">' + chips + '</div>' +
            (quals.length ? '<div class="check-lead-quals">' + esc(quals.join(' · ')) + '</div>' : '') +
            '</div></div>' +
            '<div class="check-block"><div class="check-block-title">Проверка</div>' +
            checkRow('Сложность', 'защита, дальность, укрытие', checkStep('check-diff', '1', 'checkAdjDiff(-1)', 'checkAdjDiff(1)')) +
            checkRow('Доп. d20', '1 / 3 / 6 ОД до броска', checkStep('check-extra', '0', 'checkAdjExtra(-1)', 'checkAdjExtra(1)',
                '<span id="check-extra-cost">0</span>&nbsp;ОД')) +
            '</div>' +
            '<div class="check-block"><div class="check-block-title">Урон</div>' +
            (melee
                ? checkRow('+БК за ОД', 'после попадания, макс. 3', checkStep('atk-melee', '0', 'atkAdjMelee(-1)', 'atkAdjMelee(1)'))
                : checkRow('Очередь СКР', gatling ? '10 патр. / очередь, +2 БК' : ('доп. патроны 0…' + fr), checkStep('atk-ammo', '0', 'atkAdjAmmo(-1)', 'atkAdjAmmo(1)'))) +
            '<label class="check-opt"><input type="checkbox" id="atk-aim"' + (inaccurate ? ' disabled' : '') + ' onchange="atkAimChanged()"> Прицеливание (+1 БК' + (accurate ? ', «Точное»)' : ')') + '</label>' +
            (accurate ? '<div id="atk-accurate-wrap" hidden>' +
                checkRow('ОД на БК', '«Точное», макс. 3', checkStep('atk-accurate', '0', 'atkAdjAccurate(-1)', 'atkAdjAccurate(1)')) +
                '</div>' : '') +
            '</div>' +
            '<div class="check-block"><div class="check-block-title">Зона</div>' +
            '<label class="check-opt"><input type="checkbox" id="atk-called"> Прицел в зону (+1 сл.)</label>' +
            '<select id="atk-loc" class="term-input check-loc"><option value="">Случайная зона (d20)</option>' + locOpts + '</select>' +
            '</div>' +
            '<div class="check-block check-block-muted">' +
            '<label class="check-opt"><input type="checkbox" id="check-give-gm"> Нехватку ОД на d20 отдать мастеру</label>' +
            '<p class="check-row-note">В пуле группы ' + ap.pool + ' ОД</p></div>' +
            '<div class="term-actions"><button class="term-btn danger" onclick="closeCheckSheet()">ОТМЕНА</button>' +
            '<button class="term-btn" onclick="runAttackCheck()">БРОСИТЬ</button></div>');
        window.__checkDiff = 1;
        window.__checkExtra = 0;
        window.__atkAmmo = 0;
        window.__atkMelee = 0;
        window.__atkAccurate = 0;
    };

    window.atkAdjAmmo = function (d) {
        const atk = window.__atk || {};
        window.__atkAmmo = Math.max(0, Math.min(atk.fr || 0, (window.__atkAmmo || 0) + d));
        const el = document.getElementById('atk-ammo');
        if (el) el.textContent = String(window.__atkAmmo);
    };
    window.atkAdjMelee = function (d) {
        window.__atkMelee = Math.max(0, Math.min(3, (window.__atkMelee || 0) + d));
        const el = document.getElementById('atk-melee');
        if (el) el.textContent = String(window.__atkMelee);
    };
    window.atkAdjAccurate = function (d) {
        window.__atkAccurate = Math.max(0, Math.min(3, (window.__atkAccurate || 0) + d));
        const el = document.getElementById('atk-accurate');
        if (el) el.textContent = String(window.__atkAccurate);
    };
    window.atkAimChanged = function () {
        const wrap = document.getElementById('atk-accurate-wrap');
        const aim = document.getElementById('atk-aim');
        if (wrap) wrap.hidden = !(aim && aim.checked);
        if (!(aim && aim.checked)) {
            window.__atkAccurate = 0;
            const el = document.getElementById('atk-accurate');
            if (el) el.textContent = '0';
        }
    };

    window.runAttackCheck = async function () {
        const char = live();
        const atk = window.__atk;
        if (!char || !atk) return;
        const item = char.inventory[atk.idx];
        if (!item) return;
        const extra = window.__checkExtra || 0;
        const give = !!(document.getElementById('check-give-gm') && document.getElementById('check-give-gm').checked);
        const aim = !!(document.getElementById('atk-aim') && document.getElementById('atk-aim').checked && !atk.inaccurate);
        const called = !!(document.getElementById('atk-called') && document.getElementById('atk-called').checked);
        const chosenLoc = ((document.getElementById('atk-loc') || {}).value || '');
        if (called && !chosenLoc) {
            if (typeof pipNotify === 'function') pipNotify('Зона', 'При прицеле в зону выберите область попадания.', { kind: 'warn' });
            return;
        }
        let diff = (window.__checkDiff || 1) + (called ? 1 : 0);
        let ammoExtra = window.__atkAmmo || 0;
        const meleeExtra = window.__atkMelee || 0;
        const accurateExtra = (aim && atk.accurate) ? (window.__atkAccurate || 0) : 0;
        if (accurateExtra) ammoExtra = 0;
        let ammoNeed = 0;
        let cdBonus = 0;
        if (atk.melee) {
            cdBonus = meleeExtra;
        } else if (atk.gatling) {
            ammoNeed = 10 * (1 + ammoExtra);
            cdBonus = ammoExtra * 2;
        } else {
            ammoNeed = 1 + ammoExtra;
            cdBonus = ammoExtra;
        }
        if (aim) cdBonus += 1;
        cdBonus += accurateExtra;
        cdBonus += atk.strBonus || 0;
        if (!atk.melee) {
            const have = parseInt(item.ammo, 10) || 0;
            if (have < ammoNeed) {
                if (typeof pipNotify === 'function') pipNotify('Нет патронов', 'Нужно ' + ammoNeed + ', есть ' + have + '.', { kind: 'warn' });
                return;
            }
        }
        const cost = typeof extraDiceApCost === 'function' ? extraDiceApCost(extra) : 0;
        const pay = spendGroupAp(cost, give);
        if (pay.blocked) {
            if (typeof pipNotify === 'function') pipNotify('Мало ОД', 'Нужно ' + pay.need + ' ОД на доп. кубы.', { kind: 'warn' });
            return;
        }
        const skillId = atk.skillId;
        const tn = skillTn(skillId);
        const rank = parseInt(char['cs-skill-' + skillId], 10) || 0;
        const tagged = typeof taggedSkillsOf === 'function' && taggedSkillsOf(char).indexOf(skillId) !== -1;
        const compAt = atk.unreliable ? 19 : 20;
        const title = 'АТАКА: ' + (typeof weaponDisplayName === 'function' ? weaponDisplayName(item) : (item.title || 'оружие'));
        liftDiceSheet(title, 'Проверка атаки…');
        const values = await rollValues('d20', 2 + extra);
        const ev = evaluateSkillDice(values, tn, rank, tagged, compAt);
        if (weaponHasQual(atk.quals, 'надеж') && ev.complications) {
            const sceneAt = currentAp().sceneAt;
            if (char.reliableUsedAt !== sceneAt) {
                ev.complications = Math.max(0, ev.complications - 1);
                char.reliableUsedAt = sceneAt;
            }
        }
        const pass = ev.successes >= diff;
        const leftover = pass ? Math.max(0, ev.successes - diff) : 0;
        if (leftover) pushAp({ poolDelta: leftover });
        let locLine = '';
        let locLabel = '';
        let locChips = '';
        let cdChips = '';
        let cdLine = '';
        let trigHtml = '';
        let trigSummary = '';
        let usedMelee = 0;
        let usedAccurate = 0;
        let meleeNote = '';
        let accNote = '';
        let dmgTotal = null;
        let effectsTotal = 0;
        if (pass) {
            if (meleeExtra) {
                const meleePay = spendGroupAp(meleeExtra, false);
                if (meleePay.blocked) {
                    cdBonus -= meleeExtra;
                    meleeNote = 'Не хватило ОД на доп. БК ближнего — бьём без них';
                    if (typeof pipNotify === 'function') pipNotify('ОД на БК', meleeNote + '. Генерировать ОД мастеру для этого нельзя.', { kind: 'warn' });
                } else usedMelee = meleeExtra;
            }
            if (accurateExtra) {
                const accPay = spendGroupAp(accurateExtra, false);
                if (accPay.blocked) {
                    cdBonus -= accurateExtra;
                    accNote = 'Не хватило ОД на «Точное» — без доп. кубов от ОД';
                    if (typeof pipNotify === 'function') pipNotify('ОД на БК', accNote + '.', { kind: 'warn' });
                } else usedAccurate = accurateExtra;
            }
            let locKey;
            if (called && chosenLoc) {
                locKey = chosenLoc;
                const meta = locMetaOf(locKey);
                locLabel = meta.label;
                locLine = 'Зона (прицел): ' + esc(meta.title);
            } else {
                dicePlayWait('Зона попадания…');
                const locRoll = await rollValues('d20', 1);
                const locN = parseInt(locRoll[0], 10) || 1;
                locKey = hitLocKeyFromD20(locN);
                const meta = locMetaOf(locKey);
                locLabel = meta.label;
                locChips = '<div class="check-dice"><span class="check-die">' + locN + '</span></div>';
                locLine = 'Зона: d20=' + locN + ' → ' + esc(meta.title);
            }
            const cdCount = Math.max(0, atk.dmg + cdBonus);
            if (cdCount) {
                dicePlayWait('Кубы урона · ' + cdCount + ' БК…');
                const cdVals = await rollValues('d6', cdCount);
                const tally = tallyCombatDice(cdVals);
                const trig = describeTriggeredQuals(atk.quals, tally.effects);
                dmgTotal = tally.damage;
                effectsTotal = tally.effects;
                cdChips = cdDiceHtml(cdVals);
                cdLine = 'БК ×' + cdCount + ': ' + tally.damage + ' урона' + (tally.effects ? ' + ' + tally.effects + ' эффект(ов)' : '');
                if (trig.length) {
                    trigSummary = trig.map(function (t) { return esc(t.name) + ' ×' + t.times; }).join(' · ');
                    trigHtml = '<ul class="check-quals">' + trig.map(function (t) {
                        return '<li><b>' + esc(t.name) + '</b> ×' + t.times + ': ' + esc(t.text) + '</li>';
                    }).join('') + '</ul>';
                }
            }
            if (ammoNeed) {
                item.ammo = Math.max(0, (parseInt(item.ammo, 10) || 0) - ammoNeed);
                persist();
                if (typeof renderInventoryAndPerks === 'function') renderInventoryAndPerks(char);
            }
        } else if (ammoNeed) {
            item.ammo = Math.max(0, (parseInt(item.ammo, 10) || 0) - ammoNeed);
            persist();
            if (typeof renderInventoryAndPerks === 'function') renderInventoryAndPerks(char);
        }
        const cdParts = ['оружие ' + atk.dmg + ' БК'];
        if (aim) cdParts.push('прицеливание +1');
        if (!atk.melee && ammoExtra) {
            if (atk.gatling) cdParts.push('гатлинг +' + (ammoExtra * 2) + ' БК (' + ammoExtra + ' доп. очередь)');
            else cdParts.push('скорострельность +' + ammoExtra + ' БК');
        }
        if (usedAccurate) cdParts.push('«Точное» +' + usedAccurate + ' БК');
        if (usedMelee) cdParts.push('ближний ОД +' + usedMelee + ' БК');
        if (atk.strBonus) cdParts.push('СИЛ +' + atk.strBonus + ' БК');
        let heroMain;
        let heroWhere = '';
        let heroSub = '';
        if (!pass) {
            heroMain = 'ПРОМАХ';
            heroSub = ev.successes + ' успех. · сл. ' + diff;
        } else {
            heroMain = dmgTotal != null ? (dmgTotal + ' урона') : 'ПОПАДАНИЕ';
            heroWhere = locLabel ? ('в ' + esc(locLabel)) : '';
            const subBits = [];
            if (effectsTotal) subBits.push(effectsTotal + ' эфф.');
            if (trigSummary) subBits.push(trigSummary);
            heroSub = subBits.join(' · ');
        }
        finishDicePlay(
            '<div class="dice-report-kicker">' + esc(title) + '</div>' +
            reportHero(heroMain, heroWhere, heroSub, pass) +
            (ev.complications ? '<p class="dice-report-warn">осложнений: ' + ev.complications + '</p>' : '') +
            reportDetails([
                pass ? 'Попадание: ' + ev.successes + ' успех. / сл. ' + diff : '',
                leftover ? '+' + leftover + ' ОД в пул группы' : '',
                'Цель ' + tn + ' · ранг ' + rank + (tagged ? ' · отмеченный' : '') + (atk.unreliable ? ' · осложнение с 19' : ''),
                extra ? ('Доп. d20: ' + extra + ' · ' + cost + ' ОД' + (pay.given ? ' · мастеру ' + pay.given : '')) : '',
                locLine,
                pass ? ('БК: ' + cdParts.join(' + ')) : '',
                cdLine,
                ammoNeed ? '−' + ammoNeed + ' патр.' : '',
                meleeNote,
                accNote
            ], skillDiceHtml(ev.detail) + (locChips || '') + (cdChips || '') + (trigHtml || '') +
                '<p class="check-hint">' + ev.detail.map(function (d) {
                    return d.die + ' — ' + (d.note || '') + (d.ok ? ' ×' + d.ok : '');
                }).join(' · ') + (pass ? '. Урон по цели лист не снимает — назовите зону и число мастеру. СУ зоны вычитается из урона.' : '') + '</p>')
        );
        renderApBar();
    };

    /* ---------- рады / Псина ---------- */
    function renderRadsUi(char) {
        const curEl = document.getElementById('cs-rad-cur');
        if (!curEl) return;
        const origin = char && (typeof charOriginOf === 'function' ? charOriginOf(char) : char['cs-origin']);
        const immune = origin && originRadImmune(origin);
        const n = immune ? 0 : (parseInt(char && char.rads, 10) || 0);
        curEl.textContent = immune ? '—' : String(n);
        const lab = document.getElementById('cs-rad-note');
        if (lab) {
            if (originHealsFromRads(origin)) lab.textContent = 'гуль: лечит';
            else if (immune) lab.textContent = 'иммунитет';
            else lab.textContent = 'режет макс. ОЗ';
        }
        const addEl = document.getElementById('cs-addictions');
        if (addEl) {
            const list = (char && Array.isArray(char.addictions) && char.addictions.length) ? char.addictions.join(', ') : '';
            addEl.hidden = !list;
            addEl.textContent = list ? ('Зависимости: ' + list) : '';
        }
    }

    window.nudgeRads = function (delta) {
        const char = live();
        if (!char) return;
        const origin = typeof charOriginOf === 'function' ? charOriginOf(char) : char['cs-origin'];
        if (originRadImmune(origin)) {
            if (typeof pipNotify === 'function') pipNotify('Радиация', 'Это происхождение радиацию как штраф к ОЗ не копит.', { kind: 'ok' });
            return;
        }
        char.rads = Math.max(0, (parseInt(char.rads, 10) || 0) + (parseInt(delta, 10) || 0));
        if (typeof updateDerivedStats === 'function') updateDerivedStats();
        renderRadsUi(char);
        persist();
    };

    function renderCompanion(char) {
        const box = document.getElementById('cs-companion');
        if (!box) return;
        const dog = typeof ensureCompanion === 'function' ? ensureCompanion(char) : null;
        if (!dog) { box.hidden = true; box.innerHTML = ''; return; }
        box.hidden = false;
        const armorName = dog.armor ? esc(dog.armor) : 'без брони';
        box.innerHTML = '<div class="cs-box-title">КОМПАНЬОН · ПСИНА</div>' +
            '<div class="companion-row"><label>ИМЯ <input class="term-input" id="cs-dog-name" value="' + esc(dog.name) + '"></label></div>' +
            '<div class="companion-stats">' +
            '<div>ОЗ <button type="button" class="hp-step" onclick="nudgeDogHp(-1)">−</button> <span id="cs-dog-hp">' + dog.hp + '</span>/<span id="cs-dog-hpmax">' + dog.hpMax + '</span> <button type="button" class="hp-step" onclick="nudgeDogHp(1)">+</button></div>' +
            '<div>ТЕЛО ' + dog.body + '</div><div>РАЗУМ ' + dog.mind + '</div>' +
            '<div>УКУС ' + dog.bite + ' БК порочный · ЗУ ' + dog.tn + '</div>' +
            '<div>ЗАЩИТА ' + dog.def + ' · броня: ' + armorName + '</div>' +
            '</div>' +
            '<p class="check-hint">Ходит сразу до или после вас. Приказ на основное действие — ваше основное. Собачья броня надевается с карточки в инвентаре.</p>';
        const nameEl = document.getElementById('cs-dog-name');
        if (nameEl) nameEl.addEventListener('change', function () {
            const c = live();
            if (c && c.companion) { c.companion.name = nameEl.value; persist(); }
        });
    }

    window.nudgeDogHp = function (delta) {
        const char = live();
        const dog = char && ensureCompanion(char);
        if (!dog) return;
        dog.hp = Math.max(0, Math.min(dog.hpMax, (parseInt(dog.hp, 10) || 0) + (parseInt(delta, 10) || 0)));
        const el = document.getElementById('cs-dog-hp');
        if (el) el.textContent = String(dog.hp);
        persist();
    };

    window.toggleDogArmor = function (idx) {
        const char = live();
        if (!char || !char.inventory || !char.inventory[idx]) return;
        const item = char.inventory[idx];
        const dog = ensureCompanion(char);
        if (!dog) {
            if (typeof pipNotify === 'function') pipNotify('Псина', 'Сначала возьмите перк «Псина».', { kind: 'warn' });
            return;
        }
        const name = item.title || item.baseId || 'собачья броня';
        if (dog.armor === name && item.dogWorn) {
            dog.armor = null;
            item.dogWorn = false;
        } else {
            (char.inventory || []).forEach(function (it) { if (it) it.dogWorn = false; });
            dog.armor = name;
            item.dogWorn = true;
            item.equipped = [];
        }
        persist();
        if (typeof renderInventoryAndPerks === 'function') renderInventoryAndPerks(char);
        renderCompanion(char);
    };

    /* ---------- расходники ---------- */
    window.useCharItem = async function (idx) {
        const char = live();
        if (!char || !char.inventory || !char.inventory[idx]) return;
        const item = char.inventory[idx];
        const parsed = parseConsumableUse(item);
        const origin = typeof charOriginOf === 'function' ? charOriginOf(char) : char['cs-origin'];
        const block = canUseConsumable(char, parsed);
        if (block) {
            if (typeof pipNotify === 'function') pipNotify('Нельзя', block, { kind: 'warn' });
            return;
        }
        if (isGhoulOrigin(origin) && parsed.ghoulSkipRad) {
            if (typeof pipNotify === 'function') pipNotify('Гуль', 'Рад-Х и Антирадин на гуля не действуют.', { kind: 'warn' });
            return;
        }
        if (item.qty != null && (parseInt(item.qty, 10) || 0) <= 0) {
            if (typeof pipNotify === 'function') pipNotify('Пусто', 'Количество 0.', { kind: 'warn' });
            return;
        }
        let log = [];
        if (parsed.hp) {
            let heal = parsed.hp;
            if (charHasPerk(char, 'Быстрый метаболизм') && parsed.kind !== 'rest') heal += 1;
            const cur = parseInt(char['cs-hp-cur'], 10) || 0;
            const max = parseInt(char['cs-hp-max'], 10) || cur;
            char['cs-hp-cur'] = Math.min(max, cur + heal);
            const hpEl = document.getElementById('cs-hp-cur');
            if (hpEl) hpEl.value = char['cs-hp-cur'];
            if (typeof updateCharVisualHP === 'function') updateCharVisualHP();
            log.push('+' + heal + ' ОЗ');
        }
        if (parsed.radsHeal) {
            const n = healRadiationOnChar(char, parsed.radsHeal);
            if (n) log.push('−' + n + ' рад.');
            else if (originRadImmune(origin)) log.push('радиацию это происхождение не копит');
        }
        if (parsed.ap) {
            pushAp({ poolDelta: parsed.ap });
            log.push('+' + parsed.ap + ' ОД в пул');
        }
        if (parsed.irradiatedCd && !originRadImmune(origin) && !charHasPerk(char, 'Свинцовое брюхо')) {
            const cd = await rollValues('d6', parsed.irradiatedCd);
            const t = tallyCombatDice(cd);
            if (t.effects) {
                const r = applyRadiationToChar(char, t.effects, { ignoreArmor: true });
                if (r.healed) log.push('облучённая еда: гуль +' + r.healed + ' ОЗ');
                else if (r.applied) log.push('облучённая: +' + r.applied + ' рад. (игнор брони)');
            } else log.push('облучённая: БК без эффекта');
        }
        if (parsed.clearAddictions) {
            char.addictions = [];
            log.push('зависимости сняты');
        }
        if (parsed.addiction || parsed.alcohol) {
            const fam = parsed.addictionFamily || parsed.title;
            if (!char.chemDoses) char.chemDoses = {};
            char.chemDoses[fam] = (parseInt(char.chemDoses[fam], 10) || 0) + 1;
            const need = parsed.alcohol ? 2 : (parsed.addiction || 0);
            if (need) {
                const nDice = char.chemDoses[fam];
                const cd = await rollValues('d6', nDice);
                const t = tallyCombatDice(cd);
                if (t.effects >= need) {
                    if (!Array.isArray(char.addictions)) char.addictions = [];
                    if (char.addictions.indexOf(fam) < 0) char.addictions.push(fam);
                    log.push('зависимость: ' + fam);
                } else log.push('зависимость не сработала (' + t.effects + '/' + need + ')');
            }
        }
        const sceneAt = currentAp().sceneAt;
        if (!char.sceneUse) char.sceneUse = {};
        char.sceneUseAt = sceneAt;
        if (parsed.sceneLimit === 'food') char.sceneUse.food = 1;
        if (parsed.sceneLimit === 'drink') char.sceneUse.drink = 1;
        if (item.qty != null) {
            item.qty = Math.max(0, (parseInt(item.qty, 10) || 0) - 1);
        }
        if (typeof updateDerivedStats === 'function') updateDerivedStats();
        renderRadsUi(char);
        persist();
        if (typeof renderInventoryAndPerks === 'function') renderInventoryAndPerks(char);
        if (typeof pipNotify === 'function') pipNotify(parsed.title || 'Расходник', log.join(' · ') || 'Использовано.', { kind: 'ok' });
    };

    /* ---------- иконки на листе ---------- */
    function enhanceSkillRows() {
        if (!IS_PLAYER) return;
        document.querySelectorAll('#cs-skills-list .cs-skill-row').forEach(function (row) {
            if (row.querySelector('.skill-roll-btn')) return;
            const id = row.getAttribute('data-skill');
            const name = (row.querySelector('.cs-skill-name') || {}).textContent || id;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'skill-roll-btn';
            btn.title = 'Проверка ' + name;
            btn.setAttribute('aria-label', 'Бросить проверку ' + name);
            btn.innerHTML = diceSvg();
            btn.onclick = function (e) { e.preventDefault(); e.stopPropagation(); openSkillCheck(id, name); };
            const inputs = row.querySelector('.cs-skill-inputs');
            if (inputs) row.insertBefore(btn, inputs);
            else row.appendChild(btn);
        });
    }

    function enhanceInvCards(char) {
        const list = document.getElementById('cs-inv-list');
        if (!list || !char) return;
        (char.inventory || []).forEach(function (item, index) {
            const card = list.querySelector('[data-inv="' + index + '"]');
            if (!card) return;
            const isWep = typeof resolveWeaponData === 'function' && resolveWeaponData(item);
            const isUse = item && !isWep && (function () {
                const p = parseConsumableUse(item);
                return p.kind === 'food' || p.kind === 'drink' || p.kind === 'chem' || p.kind === 'med' || p.hp || p.radsHeal || p.ap || p.alcohol;
            })();
            const isDog = typeof isDogArmorItem === 'function' && isDogArmorItem(item);
            if (IS_PLAYER && isWep && !card.querySelector('.wep-roll-btn')) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'pip-ico-btn wep-roll-btn';
                btn.title = 'Атака';
                btn.setAttribute('aria-label', 'Бросить атаку');
                btn.innerHTML = diceSvg();
                btn.onclick = function (e) { e.preventDefault(); e.stopPropagation(); openAttackCheck(index); };
                const actions = card.querySelector('.wep-header-actions');
                if (actions) actions.insertBefore(btn, actions.firstChild);
            }
            if (isUse && !card.querySelector('.use-item-btn')) {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 'term-btn use-item-btn';
                b.textContent = parsedUseLabel(item);
                b.onclick = function (e) { e.stopPropagation(); useCharItem(index); };
                const body = card.querySelector('.cs-inv-body') || card.querySelector('.wep-info-v2');
                if (body) body.appendChild(b);
            }
            if (isDog) {
                const actions = card.querySelector('.cs-inv-actions');
                if (!actions) return;
                const old = actions.querySelector('button');
                if (old) {
                    old.textContent = item.dogWorn ? 'СНЯТЬ С ПСИНЫ' : 'НА ПСИНУ';
                    old.setAttribute('onclick', 'toggleDogArmor(' + index + ')');
                }
            }
        });
    }

    function parsedUseLabel(item) {
        const p = parseConsumableUse(item);
        if (p.kind === 'food') return 'СЪЕСТЬ';
        if (p.kind === 'drink' || p.alcohol) return 'ВЫПИТЬ';
        if (p.kind === 'chem') return 'УКОЛОТЬ';
        if (p.kind === 'med') return 'ИСПОЛЬЗОВАТЬ';
        return 'ИСПОЛЬЗОВАТЬ';
    }

    function hookInventoryRender() {
        if (typeof renderInventoryAndPerks !== 'function') return;
        if (renderInventoryAndPerks.__tablePlay) return;
        const orig = renderInventoryAndPerks;
        window.renderInventoryAndPerks = function (char) {
            orig(char);
            enhanceInvCards(char || live());
            renderCompanion(char || live());
        };
        window.renderInventoryAndPerks.__tablePlay = true;
    }

    function hookDerived() {
        if (typeof calcCharSecondary !== 'function') return;
        if (calcCharSecondary.__tablePlay) return;
        const orig = calcCharSecondary;
        window.calcCharSecondary = function () {
            orig();
            const char = live();
            const origin = char && (typeof charOriginOf === 'function' ? charOriginOf(char) : char['cs-origin']);
            if (typeof applyHitLocSheet === 'function') applyHitLocSheet(origin);
            renderRadsUi(char);
            renderCompanion(char);
            const maxEl = document.getElementById('cs-hp-max');
            if (maxEl && typeof effectiveHpMax === 'function' && char) {
                const base = parseInt(maxEl.value, 10) || 0;
                const eff = effectiveHpMax(char, base);
                maxEl.value = eff;
                const curEl = document.getElementById('cs-hp-cur');
                if (curEl && (parseInt(curEl.value, 10) || 0) > eff) {
                    curEl.value = eff;
                    char['cs-hp-cur'] = eff;
                }
            }
            if (typeof updateCharVisualHP === 'function') updateCharVisualHP();
        };
        window.calcCharSecondary.__tablePlay = true;
        window.updateDerivedStats = window.calcCharSecondary;
    }

    function hookOpenChar() {
        if (typeof openChar !== 'function') return;
        if (openChar.__tablePlay) return;
        const orig = openChar;
        window.openChar = function (id) {
            orig(id);
            const char = live();
            if (char) {
                if (typeof applyHitLocSheet === 'function') applyHitLocSheet(char['cs-origin']);
                renderRadsUi(char);
                renderCompanion(char);
                enhanceSkillRows();
            }
        };
        window.openChar.__tablePlay = true;
    }

    function hookOriginChange() {
        document.addEventListener('change', function (e) {
            if (e.target && e.target.id === 'cs-origin') {
                const char = live();
                applyHitLocSheet(e.target.value);
                if (char && originRadImmune(e.target.value)) char.rads = 0;
                renderRadsUi(char);
            }
        });
    }

    function hookSession() {
        if (typeof PipSession === 'undefined') return;
        const prev = PipSession.onAp;
        PipSession.onAp = function (ap) {
            if (typeof prev === 'function') prev(ap);
            renderApBar();
        };
        const prevHello = PipSession.onHello;
        PipSession.onHello = function (state) {
            if (typeof prevHello === 'function') prevHello(state);
            renderApBar();
        };
        const prevStatus = PipSession.onStatus;
        PipSession.onStatus = function (text, live) {
            if (typeof prevStatus === 'function') prevStatus(text, live);
            renderApBar();
        };
        const sceneBtn = document.getElementById('btn-table-scene');
        const sessBtn = document.getElementById('btn-table-session-ap');
        if (sceneBtn) sceneBtn.hidden = IS_PLAYER;
        if (sessBtn) sessBtn.hidden = IS_PLAYER;
    }

    function init() {
        enhanceSkillRows();
        hookInventoryRender();
        hookDerived();
        hookOpenChar();
        hookOriginChange();
        hookSession();
        renderApBar();
        const char = live();
        if (char) {
            applyHitLocSheet(char['cs-origin']);
            renderRadsUi(char);
            renderCompanion(char);
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else setTimeout(init, 0);
})();
