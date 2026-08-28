(function () {
    const PREFIX = 'pipboy_';
    const CHUNK = '__c';
    const HEADER = '~C';
    const MAX_CHARS = 3500;
    const native = window.localStorage;
    const mem = Object.create(null);
    const pending = Object.create(null);
    const chunkCounts = Object.create(null);
    let saveTimer = null;
    let saving = false;
    let patched = false;

    function isMiniApp() {
        const tg = window.Telegram && window.Telegram.WebApp;
        if (!tg || !tg.initData || !tg.CloudStorage) return false;
        if (typeof tg.isVersionAtLeast === 'function' && !tg.isVersionAtLeast('6.9')) return false;
        return true;
    }

    function ours(key) {
        return String(key || '').indexOf(PREFIX) === 0;
    }

    function cloudCall(method, args) {
        return new Promise((resolve, reject) => {
            const cs = window.Telegram.WebApp.CloudStorage;
            const fn = cs[method];
            if (typeof fn !== 'function') {
                reject(new Error('no ' + method));
                return;
            }
            const list = args.slice();
            list.push(function (err, result) {
                if (err) reject(typeof err === 'string' ? new Error(err) : err);
                else resolve(result);
            });
            try { fn.apply(cs, list); }
            catch (e) { reject(e); }
        });
    }

    function chunkCountFromHeader(header) {
        const m = String(header == null ? '' : header).match(/^~C(\d+)$/);
        return m ? (parseInt(m[1], 10) || 0) : 0;
    }

    function pack(value) {
        const str = String(value);
        if (str.length <= MAX_CHARS) return { header: str, parts: [] };
        const parts = [];
        for (let i = 0; i < str.length; i += MAX_CHARS) parts.push(str.slice(i, i + MAX_CHARS));
        return { header: HEADER + String(parts.length), parts: parts };
    }

    function unpack(header, partMap, base) {
        const h = header == null ? '' : String(header);
        const n = chunkCountFromHeader(h);
        if (!n) return h;
        let out = '';
        for (let i = 0; i < n; i++) out += partMap[base + CHUNK + i] || '';
        return out;
    }

    async function loadCloud() {
        const keys = await cloudCall('getKeys', []);
        const list = (keys || []).filter(function (k) { return ours(k); });
        const map = Object.create(null);
        for (let i = 0; i < list.length; i += 8) {
            const batch = list.slice(i, i + 8);
            const values = await cloudCall('getItems', [batch]);
            Object.keys(values || {}).forEach(function (k) { map[k] = values[k]; });
        }
        const bases = {};
        Object.keys(map).forEach(function (k) {
            const at = k.indexOf(CHUNK);
            if (at > 0 && /__c\d+$/.test(k)) return;
            bases[k] = true;
        });
        const out = Object.create(null);
        Object.keys(bases).forEach(function (base) {
            chunkCounts[base] = chunkCountFromHeader(map[base]);
            out[base] = unpack(map[base], map, base);
        });
        return out;
    }

    function nativePipboy() {
        const out = Object.create(null);
        try {
            for (let i = 0; i < native.length; i++) {
                const k = native.key(i);
                if (ours(k)) out[k] = native.getItem(k);
            }
        } catch (e) {}
        return out;
    }

    async function removeMany(keys) {
        for (let i = 0; i < keys.length; i += 8) {
            const batch = keys.slice(i, i + 8);
            if (!batch.length) continue;
            try { await cloudCall('removeItems', [batch]); }
            catch (e) {
                for (let j = 0; j < batch.length; j++) {
                    try { await cloudCall('removeItem', [batch[j]]); } catch (e2) {}
                }
            }
        }
    }

    async function writeKey(key, value) {
        const packed = pack(value);
        const oldN = chunkCounts[key] || 0;
        await cloudCall('setItem', [key, packed.header]);
        for (let i = 0; i < packed.parts.length; i++) {
            await cloudCall('setItem', [key + CHUNK + i, packed.parts[i]]);
        }
        const extra = [];
        for (let i = packed.parts.length; i < oldN; i++) extra.push(key + CHUNK + i);
        if (extra.length) await removeMany(extra);
        chunkCounts[key] = packed.parts.length;
    }

    async function deleteKey(key) {
        const n = chunkCounts[key] || 0;
        const keys = [key];
        for (let i = 0; i < n; i++) keys.push(key + CHUNK + i);
        await removeMany(keys);
        delete chunkCounts[key];
    }

    function flushSoon() {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(flushNow, 400);
    }

    function flushNow() {
        if (saving) { flushSoon(); return; }
        const keys = Object.keys(pending);
        if (!keys.length) return;
        saving = true;
        const job = keys.map(function (k) {
            const op = pending[k];
            delete pending[k];
            if (op === null) return deleteKey(k);
            return writeKey(k, op);
        });
        Promise.all(job).catch(function (e) { console.warn('telegram cloud', e); }).then(function () {
            saving = false;
            if (Object.keys(pending).length) flushSoon();
        });
    }

    function queueSet(key, value) {
        pending[key] = value;
        flushSoon();
    }

    function queueDel(key) {
        pending[key] = null;
        flushSoon();
    }

    function patchLocalStorage() {
        if (patched) return;
        patched = true;
        const proto = Storage.prototype;
        const getItem = proto.getItem;
        const setItem = proto.setItem;
        const removeItem = proto.removeItem;
        proto.getItem = function (key) {
            if (this === native && ours(key) && Object.prototype.hasOwnProperty.call(mem, key)) return mem[key];
            return getItem.call(this, key);
        };
        proto.setItem = function (key, value) {
            const str = String(value);
            if (this === native && ours(key)) {
                mem[key] = str;
                queueSet(key, str);
            }
            try { setItem.call(this, key, str); } catch (e) {}
        };
        proto.removeItem = function (key) {
            if (this === native && ours(key)) {
                delete mem[key];
                queueDel(key);
            }
            try { removeItem.call(this, key); } catch (e) {}
        };
        function wrapGet(key) {
            if (ours(key) && Object.prototype.hasOwnProperty.call(mem, key)) return mem[key];
            return getItem.call(native, key);
        }
        function wrapSet(key, value) {
            const str = String(value);
            if (ours(key)) {
                mem[key] = str;
                queueSet(key, str);
            }
            try { setItem.call(native, key, str); } catch (e) {}
        }
        function wrapDel(key) {
            if (ours(key)) {
                delete mem[key];
                queueDel(key);
            }
            try { removeItem.call(native, key); } catch (e) {}
        }
        try {
            Object.defineProperty(native, 'getItem', { configurable: true, writable: true, value: wrapGet });
            Object.defineProperty(native, 'setItem', { configurable: true, writable: true, value: wrapSet });
            Object.defineProperty(native, 'removeItem', { configurable: true, writable: true, value: wrapDel });
        } catch (e) {}
        function onHide() {
            clearTimeout(saveTimer);
            flushNow();
        }
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') onHide();
        });
        window.addEventListener('pagehide', onHide);
        const tg = window.Telegram && window.Telegram.WebApp;
        try { if (tg && typeof tg.onEvent === 'function') tg.onEvent('deactivated', onHide); } catch (e) {}
    }

    function applyLoaded(cloud) {
        const local = nativePipboy();
        Object.keys(cloud).forEach(function (k) { mem[k] = cloud[k]; });
        Object.keys(local).forEach(function (k) {
            if (!Object.prototype.hasOwnProperty.call(mem, k) && local[k] != null) {
                mem[k] = local[k];
                queueSet(k, local[k]);
            }
        });
        Object.keys(mem).forEach(function (k) {
            try { native.setItem(k, mem[k]); } catch (e) {}
        });
        patchLocalStorage();
        window.pipUsingTelegramCloud = true;
    }

    function withTimeout(promise, ms) {
        return new Promise(function (resolve, reject) {
            const t = setTimeout(function () { reject(new Error('timeout')); }, ms);
            promise.then(function (v) { clearTimeout(t); resolve(v); }, function (e) { clearTimeout(t); reject(e); });
        });
    }

    function bootCloud() {
        try { window.Telegram.WebApp.ready(); } catch (e) {}
        if (!isMiniApp()) {
            window.pipUsingTelegramCloud = false;
            return Promise.resolve();
        }
        return withTimeout(loadCloud(), 6000).then(applyLoaded).catch(function (err) {
            console.warn('telegram cloud load', err);
            window.pipUsingTelegramCloud = false;
        });
    }

    window.pipStorageReady = new Promise(function (resolve) {
        setTimeout(function () { bootCloud().then(resolve, resolve); }, 0);
    });
})();
