/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const ge = "srgb", zn = "srgb-linear", Vi = "linear", Jt = "srgb";
const ts = "300 es";
class Gn {
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e);
  }
  hasEventListener(t, e) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[t] !== void 0 && n[t].indexOf(e) !== -1;
  }
  removeEventListener(t, e) {
    if (this._listeners === void 0) return;
    const r = this._listeners[t];
    if (r !== void 0) {
      const s = r.indexOf(e);
      s !== -1 && r.splice(s, 1);
    }
  }
  dispatchEvent(t) {
    if (this._listeners === void 0) return;
    const n = this._listeners[t.type];
    if (n !== void 0) {
      t.target = this;
      const r = n.slice(0);
      for (let s = 0, a = r.length; s < a; s++)
        r[s].call(this, t);
      t.target = null;
    }
  }
}
const de = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], qi = Math.PI / 180, br = 180 / Math.PI;
function Vn() {
  const i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (de[i & 255] + de[i >> 8 & 255] + de[i >> 16 & 255] + de[i >> 24 & 255] + "-" + de[t & 255] + de[t >> 8 & 255] + "-" + de[t >> 16 & 15 | 64] + de[t >> 24 & 255] + "-" + de[e & 63 | 128] + de[e >> 8 & 255] + "-" + de[e >> 16 & 255] + de[e >> 24 & 255] + de[n & 255] + de[n >> 8 & 255] + de[n >> 16 & 255] + de[n >> 24 & 255]).toLowerCase();
}
function ue(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Ga(i, t) {
  return (i % t + t) % t;
}
function Yi(i, t, e) {
  return (1 - e) * i + e * t;
}
function Zn(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Me(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class ct {
  constructor(t = 0, e = 0) {
    ct.prototype.isVector2 = !0, this.x = t, this.y = e;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, e) {
    return this.x = t, this.y = e, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, r = t.elements;
    return this.x = r[0] * e + r[3] * n + r[6], this.y = r[1] * e + r[4] * n + r[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(ue(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y;
    return e * e + n * n;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this;
  }
  rotateAround(t, e) {
    const n = Math.cos(e), r = Math.sin(e), s = this.x - t.x, a = this.y - t.y;
    return this.x = s * n - a * r + t.x, this.y = s * r + a * n + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class zt {
  constructor(t, e, n, r, s, a, o, l, u) {
    zt.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, e, n, r, s, a, o, l, u);
  }
  set(t, e, n, r, s, a, o, l, u) {
    const c = this.elements;
    return c[0] = t, c[1] = r, c[2] = o, c[3] = e, c[4] = s, c[5] = l, c[6] = n, c[7] = a, c[8] = u, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const e = t.elements;
    return this.set(
      e[0],
      e[4],
      e[8],
      e[1],
      e[5],
      e[9],
      e[2],
      e[6],
      e[10]
    ), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, r = e.elements, s = this.elements, a = n[0], o = n[3], l = n[6], u = n[1], c = n[4], f = n[7], h = n[2], p = n[5], g = n[8], x = r[0], m = r[3], d = r[6], T = r[1], C = r[4], v = r[7], F = r[2], b = r[5], w = r[8];
    return s[0] = a * x + o * T + l * F, s[3] = a * m + o * C + l * b, s[6] = a * d + o * v + l * w, s[1] = u * x + c * T + f * F, s[4] = u * m + c * C + f * b, s[7] = u * d + c * v + f * w, s[2] = h * x + p * T + g * F, s[5] = h * m + p * C + g * b, s[8] = h * d + p * v + g * w, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], u = t[7], c = t[8];
    return e * a * c - e * o * u - n * s * c + n * o * l + r * s * u - r * a * l;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], u = t[7], c = t[8], f = c * a - o * u, h = o * l - c * s, p = u * s - a * l, g = e * f + n * h + r * p;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const x = 1 / g;
    return t[0] = f * x, t[1] = (r * u - c * n) * x, t[2] = (o * n - r * a) * x, t[3] = h * x, t[4] = (c * e - r * l) * x, t[5] = (r * s - o * e) * x, t[6] = p * x, t[7] = (n * l - u * e) * x, t[8] = (a * e - n * s) * x, this;
  }
  transpose() {
    let t;
    const e = this.elements;
    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const e = this.elements;
    return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
  }
  setUvTransform(t, e, n, r, s, a, o) {
    const l = Math.cos(s), u = Math.sin(s);
    return this.set(
      n * l,
      n * u,
      -n * (l * a + u * o) + a + t,
      -r * u,
      r * l,
      -r * (-u * a + l * o) + o + e,
      0,
      0,
      1
    ), this;
  }
  //
  scale(t, e) {
    return this.premultiply(Zi.makeScale(t, e)), this;
  }
  rotate(t) {
    return this.premultiply(Zi.makeRotation(-t)), this;
  }
  translate(t, e) {
    return this.premultiply(Zi.makeTranslation(t, e)), this;
  }
  // for 2D Transforms
  makeTranslation(t, e) {
    return t.isVector2 ? this.set(
      1,
      0,
      t.x,
      0,
      1,
      t.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      t,
      0,
      1,
      e,
      0,
      0,
      1
    ), this;
  }
  makeRotation(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      -n,
      0,
      n,
      e,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(t, e) {
    return this.set(
      t,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let r = 0; r < 9; r++)
      if (e[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const Zi = /* @__PURE__ */ new zt();
function oa(i) {
  for (let t = i.length - 1; t >= 0; --t)
    if (i[t] >= 65535) return !0;
  return !1;
}
function zi(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Va() {
  const i = zi("canvas");
  return i.style.display = "block", i;
}
const es = {};
function ei(i) {
  i in es || (es[i] = !0, console.warn(i));
}
function Ha(i, t, e) {
  return new Promise(function(n, r) {
    function s() {
      switch (i.clientWaitSync(t, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          r();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(s, e);
          break;
        default:
          n();
      }
    }
    setTimeout(s, e);
  });
}
function ka(i) {
  const t = i.elements;
  t[2] = 0.5 * t[2] + 0.5 * t[3], t[6] = 0.5 * t[6] + 0.5 * t[7], t[10] = 0.5 * t[10] + 0.5 * t[11], t[14] = 0.5 * t[14] + 0.5 * t[15];
}
function Wa(i) {
  const t = i.elements;
  t[11] === -1 ? (t[10] = -t[10] - 1, t[14] = -t[14]) : (t[10] = -t[10], t[14] = -t[14] + 1);
}
const qt = {
  enabled: !0,
  workingColorSpace: zn,
  /**
   * Implementations of supported color spaces.
   *
   * Required:
   *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
   *	- whitePoint: reference white [ x y ]
   *	- transfer: transfer function (pre-defined)
   *	- toXYZ: Matrix3 RGB to XYZ transform
   *	- fromXYZ: Matrix3 XYZ to RGB transform
   *	- luminanceCoefficients: RGB luminance coefficients
   *
   * Optional:
   *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }
   *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
   *
   * Reference:
   * - https://www.russellcottrell.com/photo/matrixCalculator.htm
   */
  spaces: {},
  convert: function(i, t, e) {
    return this.enabled === !1 || t === e || !t || !e || (this.spaces[t].transfer === Jt && (i.r = Ke(i.r), i.g = Ke(i.g), i.b = Ke(i.b)), this.spaces[t].primaries !== this.spaces[e].primaries && (i.applyMatrix3(this.spaces[t].toXYZ), i.applyMatrix3(this.spaces[e].fromXYZ)), this.spaces[e].transfer === Jt && (i.r = On(i.r), i.g = On(i.g), i.b = On(i.b))), i;
  },
  fromWorkingColorSpace: function(i, t) {
    return this.convert(i, this.workingColorSpace, t);
  },
  toWorkingColorSpace: function(i, t) {
    return this.convert(i, t, this.workingColorSpace);
  },
  getPrimaries: function(i) {
    return this.spaces[i].primaries;
  },
  getTransfer: function(i) {
    return i === "" ? Vi : this.spaces[i].transfer;
  },
  getLuminanceCoefficients: function(i, t = this.workingColorSpace) {
    return i.fromArray(this.spaces[t].luminanceCoefficients);
  },
  define: function(i) {
    Object.assign(this.spaces, i);
  },
  // Internal APIs
  _getMatrix: function(i, t, e) {
    return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ);
  },
  _getDrawingBufferColorSpace: function(i) {
    return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
  },
  _getUnpackColorSpace: function(i = this.workingColorSpace) {
    return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
  }
};
function Ke(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function On(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const ns = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], is = [0.2126, 0.7152, 0.0722], rs = [0.3127, 0.329], ss = /* @__PURE__ */ new zt().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), as = /* @__PURE__ */ new zt().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
qt.define({
  [zn]: {
    primaries: ns,
    whitePoint: rs,
    transfer: Vi,
    toXYZ: ss,
    fromXYZ: as,
    luminanceCoefficients: is,
    workingColorSpaceConfig: { unpackColorSpace: ge },
    outputColorSpaceConfig: { drawingBufferColorSpace: ge }
  },
  [ge]: {
    primaries: ns,
    whitePoint: rs,
    transfer: Jt,
    toXYZ: ss,
    fromXYZ: as,
    luminanceCoefficients: is,
    outputColorSpaceConfig: { drawingBufferColorSpace: ge }
  }
});
let Cn;
class Xa {
  static getDataURL(t) {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u")
      return t.src;
    let e;
    if (t instanceof HTMLCanvasElement)
      e = t;
    else {
      Cn === void 0 && (Cn = zi("canvas")), Cn.width = t.width, Cn.height = t.height;
      const n = Cn.getContext("2d");
      t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = Cn;
    }
    return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
  }
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const e = zi("canvas");
      e.width = t.width, e.height = t.height;
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const r = n.getImageData(0, 0, t.width, t.height), s = r.data;
      for (let a = 0; a < s.length; a++)
        s[a] = Ke(s[a] / 255) * 255;
      return n.putImageData(r, 0, 0), e;
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++)
        e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(Ke(e[n] / 255) * 255) : e[n] = Ke(e[n]);
      return {
        data: e,
        width: t.width,
        height: t.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}
let qa = 0;
class la {
  constructor(t = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: qa++ }), this.uuid = Vn(), this.data = t, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.images[this.uuid] !== void 0)
      return t.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let a = 0, o = r.length; a < o; a++)
          r[a].isDataTexture ? s.push($i(r[a].image)) : s.push($i(r[a]));
      } else
        s = $i(r);
      n.url = s;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function $i(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Xa.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Ya = 0;
class ve extends Gn {
  constructor(t = ve.DEFAULT_IMAGE, e = ve.DEFAULT_MAPPING, n = 1001, r = 1001, s = 1006, a = 1008, o = 1023, l = 1009, u = ve.DEFAULT_ANISOTROPY, c = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Ya++ }), this.uuid = Vn(), this.name = "", this.source = new la(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = u, this.format = o, this.internalFormat = null, this.type = l, this.offset = new ct(0, 0), this.repeat = new ct(1, 1), this.center = new ct(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new zt(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = c, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.textures[this.uuid] !== void 0)
      return t.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== 300) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1)
      switch (this.wrapS) {
        case 1e3:
          t.x = t.x - Math.floor(t.x);
          break;
        case 1001:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
          break;
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case 1e3:
          t.y = t.y - Math.floor(t.y);
          break;
        case 1001:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
          break;
      }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
}
ve.DEFAULT_IMAGE = null;
ve.DEFAULT_MAPPING = 300;
ve.DEFAULT_ANISOTROPY = 1;
class se {
  constructor(t = 0, e = 0, n = 0, r = 1) {
    se.prototype.isVector4 = !0, this.x = t, this.y = e, this.z = n, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, e, n, r) {
    return this.x = t, this.y = e, this.z = n, this.w = r, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setW(t) {
    return this.w = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, r = this.z, s = this.w, a = t.elements;
    return this.x = a[0] * e + a[4] * n + a[8] * r + a[12] * s, this.y = a[1] * e + a[5] * n + a[9] * r + a[13] * s, this.z = a[2] * e + a[6] * n + a[10] * r + a[14] * s, this.w = a[3] * e + a[7] * n + a[11] * r + a[15] * s, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const e = Math.sqrt(1 - t.w * t.w);
    return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, n, r, s;
    const l = t.elements, u = l[0], c = l[4], f = l[8], h = l[1], p = l[5], g = l[9], x = l[2], m = l[6], d = l[10];
    if (Math.abs(c - h) < 0.01 && Math.abs(f - x) < 0.01 && Math.abs(g - m) < 0.01) {
      if (Math.abs(c + h) < 0.1 && Math.abs(f + x) < 0.1 && Math.abs(g + m) < 0.1 && Math.abs(u + p + d - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const C = (u + 1) / 2, v = (p + 1) / 2, F = (d + 1) / 2, b = (c + h) / 4, w = (f + x) / 4, P = (g + m) / 4;
      return C > v && C > F ? C < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(C), r = b / n, s = w / n) : v > F ? v < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(v), n = b / r, s = P / r) : F < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(F), n = w / s, r = P / s), this.set(n, r, s, e), this;
    }
    let T = Math.sqrt((m - g) * (m - g) + (f - x) * (f - x) + (h - c) * (h - c));
    return Math.abs(T) < 1e-3 && (T = 1), this.x = (m - g) / T, this.y = (f - x) / T, this.z = (h - c) / T, this.w = Math.acos((u + p + d - 1) / 2), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this.w = Math.max(t, Math.min(e, this.w)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Za extends Gn {
  constructor(t = 1, e = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = t, this.height = e, this.depth = 1, this.scissor = new se(0, 0, t, e), this.scissorTest = !1, this.viewport = new se(0, 0, t, e);
    const r = { width: t, height: e, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: 1006,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const s = new ve(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    s.flipY = !1, s.generateMipmaps = n.generateMipmaps, s.internalFormat = n.internalFormat, this.textures = [];
    const a = n.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = !0;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(t) {
    this.textures[0] = t;
  }
  setSize(t, e, n = 1) {
    if (this.width !== t || this.height !== e || this.depth !== n) {
      this.width = t, this.height = e, this.depth = n;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = t, this.textures[r].image.height = e, this.textures[r].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
    for (let n = 0, r = t.textures.length; n < r; n++)
      this.textures[n] = t.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0;
    const e = Object.assign({}, t.texture.image);
    return this.texture.source = new la(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class xn extends Za {
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), this.isWebGLRenderTarget = !0;
  }
}
class ca extends ve {
  constructor(t = null, e = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: t, width: e, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class $a extends ve {
  constructor(t = null, e = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: t, width: e, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class ze {
  constructor(t = 0, e = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = t, this._y = e, this._z = n, this._w = r;
  }
  static slerpFlat(t, e, n, r, s, a, o) {
    let l = n[r + 0], u = n[r + 1], c = n[r + 2], f = n[r + 3];
    const h = s[a + 0], p = s[a + 1], g = s[a + 2], x = s[a + 3];
    if (o === 0) {
      t[e + 0] = l, t[e + 1] = u, t[e + 2] = c, t[e + 3] = f;
      return;
    }
    if (o === 1) {
      t[e + 0] = h, t[e + 1] = p, t[e + 2] = g, t[e + 3] = x;
      return;
    }
    if (f !== x || l !== h || u !== p || c !== g) {
      let m = 1 - o;
      const d = l * h + u * p + c * g + f * x, T = d >= 0 ? 1 : -1, C = 1 - d * d;
      if (C > Number.EPSILON) {
        const F = Math.sqrt(C), b = Math.atan2(F, d * T);
        m = Math.sin(m * b) / F, o = Math.sin(o * b) / F;
      }
      const v = o * T;
      if (l = l * m + h * v, u = u * m + p * v, c = c * m + g * v, f = f * m + x * v, m === 1 - o) {
        const F = 1 / Math.sqrt(l * l + u * u + c * c + f * f);
        l *= F, u *= F, c *= F, f *= F;
      }
    }
    t[e] = l, t[e + 1] = u, t[e + 2] = c, t[e + 3] = f;
  }
  static multiplyQuaternionsFlat(t, e, n, r, s, a) {
    const o = n[r], l = n[r + 1], u = n[r + 2], c = n[r + 3], f = s[a], h = s[a + 1], p = s[a + 2], g = s[a + 3];
    return t[e] = o * g + c * f + l * p - u * h, t[e + 1] = l * g + c * h + u * f - o * p, t[e + 2] = u * g + c * p + o * h - l * f, t[e + 3] = c * g - o * f - l * h - u * p, t;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(t) {
    this._w = t, this._onChangeCallback();
  }
  set(t, e, n, r) {
    return this._x = t, this._y = e, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
  }
  setFromEuler(t, e = !0) {
    const n = t._x, r = t._y, s = t._z, a = t._order, o = Math.cos, l = Math.sin, u = o(n / 2), c = o(r / 2), f = o(s / 2), h = l(n / 2), p = l(r / 2), g = l(s / 2);
    switch (a) {
      case "XYZ":
        this._x = h * c * f + u * p * g, this._y = u * p * f - h * c * g, this._z = u * c * g + h * p * f, this._w = u * c * f - h * p * g;
        break;
      case "YXZ":
        this._x = h * c * f + u * p * g, this._y = u * p * f - h * c * g, this._z = u * c * g - h * p * f, this._w = u * c * f + h * p * g;
        break;
      case "ZXY":
        this._x = h * c * f - u * p * g, this._y = u * p * f + h * c * g, this._z = u * c * g + h * p * f, this._w = u * c * f - h * p * g;
        break;
      case "ZYX":
        this._x = h * c * f - u * p * g, this._y = u * p * f + h * c * g, this._z = u * c * g - h * p * f, this._w = u * c * f + h * p * g;
        break;
      case "YZX":
        this._x = h * c * f + u * p * g, this._y = u * p * f + h * c * g, this._z = u * c * g - h * p * f, this._w = u * c * f - h * p * g;
        break;
      case "XZY":
        this._x = h * c * f - u * p * g, this._y = u * p * f - h * c * g, this._z = u * c * g + h * p * f, this._w = u * c * f + h * p * g;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return e === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(t, e) {
    const n = e / 2, r = Math.sin(n);
    return this._x = t.x * r, this._y = t.y * r, this._z = t.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t) {
    const e = t.elements, n = e[0], r = e[4], s = e[8], a = e[1], o = e[5], l = e[9], u = e[2], c = e[6], f = e[10], h = n + o + f;
    if (h > 0) {
      const p = 0.5 / Math.sqrt(h + 1);
      this._w = 0.25 / p, this._x = (c - l) * p, this._y = (s - u) * p, this._z = (a - r) * p;
    } else if (n > o && n > f) {
      const p = 2 * Math.sqrt(1 + n - o - f);
      this._w = (c - l) / p, this._x = 0.25 * p, this._y = (r + a) / p, this._z = (s + u) / p;
    } else if (o > f) {
      const p = 2 * Math.sqrt(1 + o - n - f);
      this._w = (s - u) / p, this._x = (r + a) / p, this._y = 0.25 * p, this._z = (l + c) / p;
    } else {
      const p = 2 * Math.sqrt(1 + f - n - o);
      this._w = (a - r) / p, this._x = (s + u) / p, this._y = (l + c) / p, this._z = 0.25 * p;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(ue(this.dot(t), -1, 1)));
  }
  rotateTowards(t, e) {
    const n = this.angleTo(t);
    if (n === 0) return this;
    const r = Math.min(1, e / n);
    return this.slerp(t, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t = this.length();
    return t === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, e) {
    const n = t._x, r = t._y, s = t._z, a = t._w, o = e._x, l = e._y, u = e._z, c = e._w;
    return this._x = n * c + a * o + r * u - s * l, this._y = r * c + a * l + s * o - n * u, this._z = s * c + a * u + n * l - r * o, this._w = a * c - n * o - r * l - s * u, this._onChangeCallback(), this;
  }
  slerp(t, e) {
    if (e === 0) return this;
    if (e === 1) return this.copy(t);
    const n = this._x, r = this._y, s = this._z, a = this._w;
    let o = a * t._w + n * t._x + r * t._y + s * t._z;
    if (o < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, o = -o) : this.copy(t), o >= 1)
      return this._w = a, this._x = n, this._y = r, this._z = s, this;
    const l = 1 - o * o;
    if (l <= Number.EPSILON) {
      const p = 1 - e;
      return this._w = p * a + e * this._w, this._x = p * n + e * this._x, this._y = p * r + e * this._y, this._z = p * s + e * this._z, this.normalize(), this;
    }
    const u = Math.sqrt(l), c = Math.atan2(u, o), f = Math.sin((1 - e) * c) / u, h = Math.sin(e * c) / u;
    return this._w = a * f + this._w * h, this._x = n * f + this._x * h, this._y = r * f + this._y * h, this._z = s * f + this._z * h, this._onChangeCallback(), this;
  }
  slerpQuaternions(t, e, n) {
    return this.copy(t).slerp(e, n);
  }
  random() {
    const t = 2 * Math.PI * Math.random(), e = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(
      r * Math.sin(t),
      r * Math.cos(t),
      s * Math.sin(e),
      s * Math.cos(e)
    );
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  fromArray(t, e = 0) {
    return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
  }
  fromBufferAttribute(t, e) {
    return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class L {
  constructor(t = 0, e = 0, n = 0) {
    L.prototype.isVector3 = !0, this.x = t, this.y = e, this.z = n;
  }
  set(t, e, n) {
    return n === void 0 && (n = this.z), this.x = t, this.y = e, this.z = n, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  multiplyVectors(t, e) {
    return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
  }
  applyEuler(t) {
    return this.applyQuaternion(os.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(os.setFromAxisAngle(t, e));
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * e + s[3] * n + s[6] * r, this.y = s[1] * e + s[4] * n + s[7] * r, this.z = s[2] * e + s[5] * n + s[8] * r, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements, a = 1 / (s[3] * e + s[7] * n + s[11] * r + s[15]);
    return this.x = (s[0] * e + s[4] * n + s[8] * r + s[12]) * a, this.y = (s[1] * e + s[5] * n + s[9] * r + s[13]) * a, this.z = (s[2] * e + s[6] * n + s[10] * r + s[14]) * a, this;
  }
  applyQuaternion(t) {
    const e = this.x, n = this.y, r = this.z, s = t.x, a = t.y, o = t.z, l = t.w, u = 2 * (a * r - o * n), c = 2 * (o * e - s * r), f = 2 * (s * n - a * e);
    return this.x = e + l * u + a * f - o * c, this.y = n + l * c + o * u - s * f, this.z = r + l * f + s * c - a * u, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * e + s[4] * n + s[8] * r, this.y = s[1] * e + s[5] * n + s[9] * r, this.z = s[2] * e + s[6] * n + s[10] * r, this.normalize();
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, e) {
    const n = t.x, r = t.y, s = t.z, a = e.x, o = e.y, l = e.z;
    return this.x = r * l - s * o, this.y = s * a - n * l, this.z = n * o - r * a, this;
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    return Ki.copy(this).projectOnVector(t), this.sub(Ki);
  }
  reflect(t) {
    return this.sub(Ki.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(ue(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y, r = this.z - t.z;
    return e * e + n * n + r * r;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, e, n) {
    const r = Math.sin(e) * t;
    return this.x = r * Math.sin(n), this.y = Math.cos(e) * t, this.z = r * Math.cos(n), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, e, n) {
    return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this;
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(), r = this.setFromMatrixColumn(t, 2).length();
    return this.x = e, this.y = n, this.z = r, this;
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2, e = Math.random() * 2 - 1, n = Math.sqrt(1 - e * e);
    return this.x = n * Math.cos(t), this.y = e, this.z = n * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Ki = /* @__PURE__ */ new L(), os = /* @__PURE__ */ new ze();
class ui {
  constructor(t = new L(1 / 0, 1 / 0, 1 / 0), e = new L(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = t, this.max = e;
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3)
      this.expandByPoint(De.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++)
      this.expandByPoint(De.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++)
      this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = De.copy(e).multiplyScalar(0.5);
    return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
  }
  setFromObject(t, e = !1) {
    return this.makeEmpty(), this.expandByObject(t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.min.copy(t.min), this.max.copy(t.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  expandByPoint(t) {
    return this.min.min(t), this.max.max(t), this;
  }
  expandByVector(t) {
    return this.min.sub(t), this.max.add(t), this;
  }
  expandByScalar(t) {
    return this.min.addScalar(-t), this.max.addScalar(t), this;
  }
  expandByObject(t, e = !1) {
    t.updateWorldMatrix(!1, !1);
    const n = t.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (e === !0 && s !== void 0 && t.isInstancedMesh !== !0)
        for (let a = 0, o = s.count; a < o; a++)
          t.isMesh === !0 ? t.getVertexPosition(a, De) : De.fromBufferAttribute(s, a), De.applyMatrix4(t.matrixWorld), this.expandByPoint(De);
      else
        t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), di.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), di.copy(n.boundingBox)), di.applyMatrix4(t.matrixWorld), this.union(di);
    }
    const r = t.children;
    for (let s = 0, a = r.length; s < a; s++)
      this.expandByObject(r[s], e);
    return this;
  }
  containsPoint(t) {
    return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
  }
  containsBox(t) {
    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
  }
  getParameter(t, e) {
    return e.set(
      (t.x - this.min.x) / (this.max.x - this.min.x),
      (t.y - this.min.y) / (this.max.y - this.min.y),
      (t.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(t) {
    return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z;
  }
  intersectsSphere(t) {
    return this.clampPoint(t.center, De), De.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e, n;
    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty())
      return !1;
    this.getCenter($n), pi.subVectors(this.max, $n), yn.subVectors(t.a, $n), En.subVectors(t.b, $n), Tn.subVectors(t.c, $n), Qe.subVectors(En, yn), tn.subVectors(Tn, En), cn.subVectors(yn, Tn);
    let e = [
      0,
      -Qe.z,
      Qe.y,
      0,
      -tn.z,
      tn.y,
      0,
      -cn.z,
      cn.y,
      Qe.z,
      0,
      -Qe.x,
      tn.z,
      0,
      -tn.x,
      cn.z,
      0,
      -cn.x,
      -Qe.y,
      Qe.x,
      0,
      -tn.y,
      tn.x,
      0,
      -cn.y,
      cn.x,
      0
    ];
    return !Ji(e, yn, En, Tn, pi) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Ji(e, yn, En, Tn, pi)) ? !1 : (mi.crossVectors(Qe, tn), e = [mi.x, mi.y, mi.z], Ji(e, yn, En, Tn, pi));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, De).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(De).length() * 0.5), t;
  }
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  applyMatrix4(t) {
    return this.isEmpty() ? this : (Xe[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), Xe[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), Xe[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), Xe[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), Xe[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), Xe[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), Xe[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), Xe[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(Xe), this);
  }
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
}
const Xe = [
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L()
], De = /* @__PURE__ */ new L(), di = /* @__PURE__ */ new ui(), yn = /* @__PURE__ */ new L(), En = /* @__PURE__ */ new L(), Tn = /* @__PURE__ */ new L(), Qe = /* @__PURE__ */ new L(), tn = /* @__PURE__ */ new L(), cn = /* @__PURE__ */ new L(), $n = /* @__PURE__ */ new L(), pi = /* @__PURE__ */ new L(), mi = /* @__PURE__ */ new L(), un = /* @__PURE__ */ new L();
function Ji(i, t, e, n, r) {
  for (let s = 0, a = i.length - 3; s <= a; s += 3) {
    un.fromArray(i, s);
    const o = r.x * Math.abs(un.x) + r.y * Math.abs(un.y) + r.z * Math.abs(un.z), l = t.dot(un), u = e.dot(un), c = n.dot(un);
    if (Math.max(-Math.max(l, u, c), Math.min(l, u, c)) > o)
      return !1;
  }
  return !0;
}
const Ka = /* @__PURE__ */ new ui(), Kn = /* @__PURE__ */ new L(), ji = /* @__PURE__ */ new L();
class Dr {
  constructor(t = new L(), e = -1) {
    this.isSphere = !0, this.center = t, this.radius = e;
  }
  set(t, e) {
    return this.center.copy(t), this.radius = e, this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : Ka.setFromPoints(t).getCenter(n);
    let r = 0;
    for (let s = 0, a = t.length; s < a; s++)
      r = Math.max(r, n.distanceToSquared(t[s]));
    return this.radius = Math.sqrt(r), this;
  }
  copy(t) {
    return this.center.copy(t.center), this.radius = t.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, e) {
    const n = this.center.distanceToSquared(t);
    return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
  }
  getBoundingBox(t) {
    return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  applyMatrix4(t) {
    return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
  }
  translate(t) {
    return this.center.add(t), this;
  }
  expandByPoint(t) {
    if (this.isEmpty())
      return this.center.copy(t), this.radius = 0, this;
    Kn.subVectors(t, this.center);
    const e = Kn.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(Kn, r / n), this.radius += r;
    }
    return this;
  }
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === !0 ? this.radius = Math.max(this.radius, t.radius) : (ji.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(Kn.copy(t.center).add(ji)), this.expandByPoint(Kn.copy(t.center).sub(ji))), this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const qe = /* @__PURE__ */ new L(), Qi = /* @__PURE__ */ new L(), gi = /* @__PURE__ */ new L(), en = /* @__PURE__ */ new L(), tr = /* @__PURE__ */ new L(), _i = /* @__PURE__ */ new L(), er = /* @__PURE__ */ new L();
class Ja {
  constructor(t = new L(), e = new L(0, 0, -1)) {
    this.origin = t, this.direction = e;
  }
  set(t, e) {
    return this.origin.copy(t), this.direction.copy(e), this;
  }
  copy(t) {
    return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
  }
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t);
  }
  lookAt(t) {
    return this.direction.copy(t).sub(this.origin).normalize(), this;
  }
  recast(t) {
    return this.origin.copy(this.at(t, qe)), this;
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const n = e.dot(this.direction);
    return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const e = qe.subVectors(t, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(t) : (qe.copy(this.origin).addScaledVector(this.direction, e), qe.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, n, r) {
    Qi.copy(t).add(e).multiplyScalar(0.5), gi.copy(e).sub(t).normalize(), en.copy(this.origin).sub(Qi);
    const s = t.distanceTo(e) * 0.5, a = -this.direction.dot(gi), o = en.dot(this.direction), l = -en.dot(gi), u = en.lengthSq(), c = Math.abs(1 - a * a);
    let f, h, p, g;
    if (c > 0)
      if (f = a * l - o, h = a * o - l, g = s * c, f >= 0)
        if (h >= -g)
          if (h <= g) {
            const x = 1 / c;
            f *= x, h *= x, p = f * (f + a * h + 2 * o) + h * (a * f + h + 2 * l) + u;
          } else
            h = s, f = Math.max(0, -(a * h + o)), p = -f * f + h * (h + 2 * l) + u;
        else
          h = -s, f = Math.max(0, -(a * h + o)), p = -f * f + h * (h + 2 * l) + u;
      else
        h <= -g ? (f = Math.max(0, -(-a * s + o)), h = f > 0 ? -s : Math.min(Math.max(-s, -l), s), p = -f * f + h * (h + 2 * l) + u) : h <= g ? (f = 0, h = Math.min(Math.max(-s, -l), s), p = h * (h + 2 * l) + u) : (f = Math.max(0, -(a * s + o)), h = f > 0 ? s : Math.min(Math.max(-s, -l), s), p = -f * f + h * (h + 2 * l) + u);
    else
      h = a > 0 ? -s : s, f = Math.max(0, -(a * h + o)), p = -f * f + h * (h + 2 * l) + u;
    return n && n.copy(this.origin).addScaledVector(this.direction, f), r && r.copy(Qi).addScaledVector(gi, h), p;
  }
  intersectSphere(t, e) {
    qe.subVectors(t.center, this.origin);
    const n = qe.dot(this.direction), r = qe.dot(qe) - n * n, s = t.radius * t.radius;
    if (r > s) return null;
    const a = Math.sqrt(s - r), o = n - a, l = n + a;
    return l < 0 ? null : o < 0 ? this.at(l, e) : this.at(o, e);
  }
  intersectsSphere(t) {
    return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0)
      return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(t.normal) + t.constant) / e;
    return n >= 0 ? n : null;
  }
  intersectPlane(t, e) {
    const n = this.distanceToPlane(t);
    return n === null ? null : this.at(n, e);
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    return e === 0 || t.normal.dot(this.direction) * e < 0;
  }
  intersectBox(t, e) {
    let n, r, s, a, o, l;
    const u = 1 / this.direction.x, c = 1 / this.direction.y, f = 1 / this.direction.z, h = this.origin;
    return u >= 0 ? (n = (t.min.x - h.x) * u, r = (t.max.x - h.x) * u) : (n = (t.max.x - h.x) * u, r = (t.min.x - h.x) * u), c >= 0 ? (s = (t.min.y - h.y) * c, a = (t.max.y - h.y) * c) : (s = (t.max.y - h.y) * c, a = (t.min.y - h.y) * c), n > a || s > r || ((s > n || isNaN(n)) && (n = s), (a < r || isNaN(r)) && (r = a), f >= 0 ? (o = (t.min.z - h.z) * f, l = (t.max.z - h.z) * f) : (o = (t.max.z - h.z) * f, l = (t.min.z - h.z) * f), n > l || o > r) || ((o > n || n !== n) && (n = o), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, e);
  }
  intersectsBox(t) {
    return this.intersectBox(t, qe) !== null;
  }
  intersectTriangle(t, e, n, r, s) {
    tr.subVectors(e, t), _i.subVectors(n, t), er.crossVectors(tr, _i);
    let a = this.direction.dot(er), o;
    if (a > 0) {
      if (r) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    en.subVectors(this.origin, t);
    const l = o * this.direction.dot(_i.crossVectors(en, _i));
    if (l < 0)
      return null;
    const u = o * this.direction.dot(tr.cross(en));
    if (u < 0 || l + u > a)
      return null;
    const c = -o * en.dot(er);
    return c < 0 ? null : this.at(c / a, s);
  }
  applyMatrix4(t) {
    return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class ne {
  constructor(t, e, n, r, s, a, o, l, u, c, f, h, p, g, x, m) {
    ne.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, e, n, r, s, a, o, l, u, c, f, h, p, g, x, m);
  }
  set(t, e, n, r, s, a, o, l, u, c, f, h, p, g, x, m) {
    const d = this.elements;
    return d[0] = t, d[4] = e, d[8] = n, d[12] = r, d[1] = s, d[5] = a, d[9] = o, d[13] = l, d[2] = u, d[6] = c, d[10] = f, d[14] = h, d[3] = p, d[7] = g, d[11] = x, d[15] = m, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new ne().fromArray(this.elements);
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this;
  }
  copyPosition(t) {
    const e = this.elements, n = t.elements;
    return e[12] = n[12], e[13] = n[13], e[14] = n[14], this;
  }
  setFromMatrix3(t) {
    const e = t.elements;
    return this.set(
      e[0],
      e[3],
      e[6],
      0,
      e[1],
      e[4],
      e[7],
      0,
      e[2],
      e[5],
      e[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(t, e, n) {
    return this.set(
      t.x,
      e.x,
      n.x,
      0,
      t.y,
      e.y,
      n.y,
      0,
      t.z,
      e.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(t) {
    const e = this.elements, n = t.elements, r = 1 / An.setFromMatrixColumn(t, 0).length(), s = 1 / An.setFromMatrixColumn(t, 1).length(), a = 1 / An.setFromMatrixColumn(t, 2).length();
    return e[0] = n[0] * r, e[1] = n[1] * r, e[2] = n[2] * r, e[3] = 0, e[4] = n[4] * s, e[5] = n[5] * s, e[6] = n[6] * s, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const e = this.elements, n = t.x, r = t.y, s = t.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(r), u = Math.sin(r), c = Math.cos(s), f = Math.sin(s);
    if (t.order === "XYZ") {
      const h = a * c, p = a * f, g = o * c, x = o * f;
      e[0] = l * c, e[4] = -l * f, e[8] = u, e[1] = p + g * u, e[5] = h - x * u, e[9] = -o * l, e[2] = x - h * u, e[6] = g + p * u, e[10] = a * l;
    } else if (t.order === "YXZ") {
      const h = l * c, p = l * f, g = u * c, x = u * f;
      e[0] = h + x * o, e[4] = g * o - p, e[8] = a * u, e[1] = a * f, e[5] = a * c, e[9] = -o, e[2] = p * o - g, e[6] = x + h * o, e[10] = a * l;
    } else if (t.order === "ZXY") {
      const h = l * c, p = l * f, g = u * c, x = u * f;
      e[0] = h - x * o, e[4] = -a * f, e[8] = g + p * o, e[1] = p + g * o, e[5] = a * c, e[9] = x - h * o, e[2] = -a * u, e[6] = o, e[10] = a * l;
    } else if (t.order === "ZYX") {
      const h = a * c, p = a * f, g = o * c, x = o * f;
      e[0] = l * c, e[4] = g * u - p, e[8] = h * u + x, e[1] = l * f, e[5] = x * u + h, e[9] = p * u - g, e[2] = -u, e[6] = o * l, e[10] = a * l;
    } else if (t.order === "YZX") {
      const h = a * l, p = a * u, g = o * l, x = o * u;
      e[0] = l * c, e[4] = x - h * f, e[8] = g * f + p, e[1] = f, e[5] = a * c, e[9] = -o * c, e[2] = -u * c, e[6] = p * f + g, e[10] = h - x * f;
    } else if (t.order === "XZY") {
      const h = a * l, p = a * u, g = o * l, x = o * u;
      e[0] = l * c, e[4] = -f, e[8] = u * c, e[1] = h * f + x, e[5] = a * c, e[9] = p * f - g, e[2] = g * f - p, e[6] = o * c, e[10] = x * f + h;
    }
    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(ja, t, Qa);
  }
  lookAt(t, e, n) {
    const r = this.elements;
    return Ce.subVectors(t, e), Ce.lengthSq() === 0 && (Ce.z = 1), Ce.normalize(), nn.crossVectors(n, Ce), nn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ce.x += 1e-4 : Ce.z += 1e-4, Ce.normalize(), nn.crossVectors(n, Ce)), nn.normalize(), vi.crossVectors(Ce, nn), r[0] = nn.x, r[4] = vi.x, r[8] = Ce.x, r[1] = nn.y, r[5] = vi.y, r[9] = Ce.y, r[2] = nn.z, r[6] = vi.z, r[10] = Ce.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, r = e.elements, s = this.elements, a = n[0], o = n[4], l = n[8], u = n[12], c = n[1], f = n[5], h = n[9], p = n[13], g = n[2], x = n[6], m = n[10], d = n[14], T = n[3], C = n[7], v = n[11], F = n[15], b = r[0], w = r[4], P = r[8], y = r[12], M = r[1], R = r[5], q = r[9], G = r[13], k = r[2], j = r[6], H = r[10], nt = r[14], V = r[3], ot = r[7], dt = r[11], St = r[15];
    return s[0] = a * b + o * M + l * k + u * V, s[4] = a * w + o * R + l * j + u * ot, s[8] = a * P + o * q + l * H + u * dt, s[12] = a * y + o * G + l * nt + u * St, s[1] = c * b + f * M + h * k + p * V, s[5] = c * w + f * R + h * j + p * ot, s[9] = c * P + f * q + h * H + p * dt, s[13] = c * y + f * G + h * nt + p * St, s[2] = g * b + x * M + m * k + d * V, s[6] = g * w + x * R + m * j + d * ot, s[10] = g * P + x * q + m * H + d * dt, s[14] = g * y + x * G + m * nt + d * St, s[3] = T * b + C * M + v * k + F * V, s[7] = T * w + C * R + v * j + F * ot, s[11] = T * P + C * q + v * H + F * dt, s[15] = T * y + C * G + v * nt + F * St, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[4], r = t[8], s = t[12], a = t[1], o = t[5], l = t[9], u = t[13], c = t[2], f = t[6], h = t[10], p = t[14], g = t[3], x = t[7], m = t[11], d = t[15];
    return g * (+s * l * f - r * u * f - s * o * h + n * u * h + r * o * p - n * l * p) + x * (+e * l * p - e * u * h + s * a * h - r * a * p + r * u * c - s * l * c) + m * (+e * u * f - e * o * p - s * a * f + n * a * p + s * o * c - n * u * c) + d * (-r * o * c - e * l * f + e * o * h + r * a * f - n * a * h + n * l * c);
  }
  transpose() {
    const t = this.elements;
    let e;
    return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
  }
  setPosition(t, e, n) {
    const r = this.elements;
    return t.isVector3 ? (r[12] = t.x, r[13] = t.y, r[14] = t.z) : (r[12] = t, r[13] = e, r[14] = n), this;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], u = t[7], c = t[8], f = t[9], h = t[10], p = t[11], g = t[12], x = t[13], m = t[14], d = t[15], T = f * m * u - x * h * u + x * l * p - o * m * p - f * l * d + o * h * d, C = g * h * u - c * m * u - g * l * p + a * m * p + c * l * d - a * h * d, v = c * x * u - g * f * u + g * o * p - a * x * p - c * o * d + a * f * d, F = g * f * l - c * x * l - g * o * h + a * x * h + c * o * m - a * f * m, b = e * T + n * C + r * v + s * F;
    if (b === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const w = 1 / b;
    return t[0] = T * w, t[1] = (x * h * s - f * m * s - x * r * p + n * m * p + f * r * d - n * h * d) * w, t[2] = (o * m * s - x * l * s + x * r * u - n * m * u - o * r * d + n * l * d) * w, t[3] = (f * l * s - o * h * s - f * r * u + n * h * u + o * r * p - n * l * p) * w, t[4] = C * w, t[5] = (c * m * s - g * h * s + g * r * p - e * m * p - c * r * d + e * h * d) * w, t[6] = (g * l * s - a * m * s - g * r * u + e * m * u + a * r * d - e * l * d) * w, t[7] = (a * h * s - c * l * s + c * r * u - e * h * u - a * r * p + e * l * p) * w, t[8] = v * w, t[9] = (g * f * s - c * x * s - g * n * p + e * x * p + c * n * d - e * f * d) * w, t[10] = (a * x * s - g * o * s + g * n * u - e * x * u - a * n * d + e * o * d) * w, t[11] = (c * o * s - a * f * s - c * n * u + e * f * u + a * n * p - e * o * p) * w, t[12] = F * w, t[13] = (c * x * r - g * f * r + g * n * h - e * x * h - c * n * m + e * f * m) * w, t[14] = (g * o * r - a * x * r - g * n * l + e * x * l + a * n * m - e * o * m) * w, t[15] = (a * f * r - c * o * r + c * n * l - e * f * l - a * n * h + e * o * h) * w, this;
  }
  scale(t) {
    const e = this.elements, n = t.x, r = t.y, s = t.z;
    return e[0] *= n, e[4] *= r, e[8] *= s, e[1] *= n, e[5] *= r, e[9] *= s, e[2] *= n, e[6] *= r, e[10] *= s, e[3] *= n, e[7] *= r, e[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, n, r));
  }
  makeTranslation(t, e, n) {
    return t.isVector3 ? this.set(
      1,
      0,
      0,
      t.x,
      0,
      1,
      0,
      t.y,
      0,
      0,
      1,
      t.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      t,
      0,
      1,
      0,
      e,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      e,
      -n,
      0,
      0,
      n,
      e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      -n,
      0,
      0,
      n,
      e,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(t, e) {
    const n = Math.cos(e), r = Math.sin(e), s = 1 - n, a = t.x, o = t.y, l = t.z, u = s * a, c = s * o;
    return this.set(
      u * a + n,
      u * o - r * l,
      u * l + r * o,
      0,
      u * o + r * l,
      c * o + n,
      c * l - r * a,
      0,
      u * l - r * o,
      c * l + r * a,
      s * l * l + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(t, e, n) {
    return this.set(
      t,
      0,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(t, e, n, r, s, a) {
    return this.set(
      1,
      n,
      s,
      0,
      t,
      1,
      a,
      0,
      e,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(t, e, n) {
    const r = this.elements, s = e._x, a = e._y, o = e._z, l = e._w, u = s + s, c = a + a, f = o + o, h = s * u, p = s * c, g = s * f, x = a * c, m = a * f, d = o * f, T = l * u, C = l * c, v = l * f, F = n.x, b = n.y, w = n.z;
    return r[0] = (1 - (x + d)) * F, r[1] = (p + v) * F, r[2] = (g - C) * F, r[3] = 0, r[4] = (p - v) * b, r[5] = (1 - (h + d)) * b, r[6] = (m + T) * b, r[7] = 0, r[8] = (g + C) * w, r[9] = (m - T) * w, r[10] = (1 - (h + x)) * w, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
  }
  decompose(t, e, n) {
    const r = this.elements;
    let s = An.set(r[0], r[1], r[2]).length();
    const a = An.set(r[4], r[5], r[6]).length(), o = An.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), t.x = r[12], t.y = r[13], t.z = r[14], Ue.copy(this);
    const u = 1 / s, c = 1 / a, f = 1 / o;
    return Ue.elements[0] *= u, Ue.elements[1] *= u, Ue.elements[2] *= u, Ue.elements[4] *= c, Ue.elements[5] *= c, Ue.elements[6] *= c, Ue.elements[8] *= f, Ue.elements[9] *= f, Ue.elements[10] *= f, e.setFromRotationMatrix(Ue), n.x = s, n.y = a, n.z = o, this;
  }
  makePerspective(t, e, n, r, s, a, o = 2e3) {
    const l = this.elements, u = 2 * s / (e - t), c = 2 * s / (n - r), f = (e + t) / (e - t), h = (n + r) / (n - r);
    let p, g;
    if (o === 2e3)
      p = -(a + s) / (a - s), g = -2 * a * s / (a - s);
    else if (o === 2001)
      p = -a / (a - s), g = -a * s / (a - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = u, l[4] = 0, l[8] = f, l[12] = 0, l[1] = 0, l[5] = c, l[9] = h, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = p, l[14] = g, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(t, e, n, r, s, a, o = 2e3) {
    const l = this.elements, u = 1 / (e - t), c = 1 / (n - r), f = 1 / (a - s), h = (e + t) * u, p = (n + r) * c;
    let g, x;
    if (o === 2e3)
      g = (a + s) * f, x = -2 * f;
    else if (o === 2001)
      g = s * f, x = -1 * f;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = 2 * u, l[4] = 0, l[8] = 0, l[12] = -h, l[1] = 0, l[5] = 2 * c, l[9] = 0, l[13] = -p, l[2] = 0, l[6] = 0, l[10] = x, l[14] = -g, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let r = 0; r < 16; r++)
      if (e[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t;
  }
}
const An = /* @__PURE__ */ new L(), Ue = /* @__PURE__ */ new ne(), ja = /* @__PURE__ */ new L(0, 0, 0), Qa = /* @__PURE__ */ new L(1, 1, 1), nn = /* @__PURE__ */ new L(), vi = /* @__PURE__ */ new L(), Ce = /* @__PURE__ */ new L(), ls = /* @__PURE__ */ new ne(), cs = /* @__PURE__ */ new ze();
class Ge {
  constructor(t = 0, e = 0, n = 0, r = Ge.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = e, this._z = n, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, e, n, r = this._order) {
    return this._x = t, this._y = e, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, e = this._order, n = !0) {
    const r = t.elements, s = r[0], a = r[4], o = r[8], l = r[1], u = r[5], c = r[9], f = r[2], h = r[6], p = r[10];
    switch (e) {
      case "XYZ":
        this._y = Math.asin(ue(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-c, p), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(h, u), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-ue(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(l, u)) : (this._y = Math.atan2(-f, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(ue(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(-f, p), this._z = Math.atan2(-a, u)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-ue(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(h, p), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, u));
        break;
      case "YZX":
        this._z = Math.asin(ue(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-c, u), this._y = Math.atan2(-f, s)) : (this._x = 0, this._y = Math.atan2(o, p));
        break;
      case "XZY":
        this._z = Math.asin(-ue(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(h, u), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-c, p), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return this._order = e, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, e, n) {
    return ls.makeRotationFromQuaternion(t), this.setFromRotationMatrix(ls, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return cs.setFromEuler(this), this.setFromQuaternion(cs, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Ge.DEFAULT_ORDER = "XYZ";
class ua {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = (1 << t | 0) >>> 0;
  }
  enable(t) {
    this.mask |= 1 << t | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= 1 << t | 0;
  }
  disable(t) {
    this.mask &= ~(1 << t | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  isEnabled(t) {
    return (this.mask & (1 << t | 0)) !== 0;
  }
}
let to = 0;
const us = /* @__PURE__ */ new L(), bn = /* @__PURE__ */ new ze(), Ye = /* @__PURE__ */ new ne(), xi = /* @__PURE__ */ new L(), Jn = /* @__PURE__ */ new L(), eo = /* @__PURE__ */ new L(), no = /* @__PURE__ */ new ze(), hs = /* @__PURE__ */ new L(1, 0, 0), fs = /* @__PURE__ */ new L(0, 1, 0), ds = /* @__PURE__ */ new L(0, 0, 1), ps = { type: "added" }, io = { type: "removed" }, wn = { type: "childadded", child: null }, nr = { type: "childremoved", child: null };
class he extends Gn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: to++ }), this.uuid = Vn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = he.DEFAULT_UP.clone();
    const t = new L(), e = new Ge(), n = new ze(), r = new L(1, 1, 1);
    function s() {
      n.setFromEuler(e, !1);
    }
    function a() {
      e.setFromQuaternion(n, void 0, !1);
    }
    e._onChange(s), n._onChange(a), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: {
        value: new ne()
      },
      normalMatrix: {
        value: new zt()
      }
    }), this.matrix = new ne(), this.matrixWorld = new ne(), this.matrixAutoUpdate = he.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = he.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new ua(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, e) {
    return bn.setFromAxisAngle(t, e), this.quaternion.multiply(bn), this;
  }
  rotateOnWorldAxis(t, e) {
    return bn.setFromAxisAngle(t, e), this.quaternion.premultiply(bn), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(hs, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(fs, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(ds, t);
  }
  translateOnAxis(t, e) {
    return us.copy(t).applyQuaternion(this.quaternion), this.position.add(us.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(hs, t);
  }
  translateY(t) {
    return this.translateOnAxis(fs, t);
  }
  translateZ(t) {
    return this.translateOnAxis(ds, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(Ye.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    t.isVector3 ? xi.copy(t) : xi.set(t, e, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Jn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Ye.lookAt(Jn, xi, this.up) : Ye.lookAt(xi, Jn, this.up), this.quaternion.setFromRotationMatrix(Ye), r && (Ye.extractRotation(r.matrixWorld), bn.setFromRotationMatrix(Ye), this.quaternion.premultiply(bn.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++)
        this.add(arguments[e]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(ps), wn.child = t, this.dispatchEvent(wn), wn.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(io), nr.child = t, this.dispatchEvent(nr), nr.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), Ye.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), Ye.multiply(t.parent.matrixWorld)), t.applyMatrix4(Ye), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(ps), wn.child = t, this.dispatchEvent(wn), wn.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const a = this.children[n].getObjectByProperty(t, e);
      if (a !== void 0)
        return a;
    }
  }
  getObjectsByProperty(t, e, n = []) {
    this[t] === e && n.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++)
      r[s].getObjectsByProperty(t, e, n);
    return n;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Jn, t, eo), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Jn, no, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
  }
  raycast() {
  }
  traverse(t) {
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++)
      e[n].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++)
      e[n].traverseVisible(t);
  }
  traverseAncestors(t) {
    const e = this.parent;
    e !== null && (t(e), e.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++)
      e[n].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, e) {
    const n = this.parent;
    if (t === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), e === !0) {
      const r = this.children;
      for (let s = 0, a = r.length; s < a; s++)
        r[s].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string", n = {};
    e && (t = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.visibility = this._visibility, r.active = this._active, r.bounds = this._bounds.map((o) => ({
      boxInitialized: o.boxInitialized,
      boxMin: o.box.min.toArray(),
      boxMax: o.box.max.toArray(),
      sphereInitialized: o.sphereInitialized,
      sphereRadius: o.sphere.radius,
      sphereCenter: o.sphere.center.toArray()
    })), r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.geometryCount = this._geometryCount, r.matricesTexture = this._matricesTexture.toJSON(t), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (r.boundingSphere = {
      center: r.boundingSphere.center.toArray(),
      radius: r.boundingSphere.radius
    }), this.boundingBox !== null && (r.boundingBox = {
      min: r.boundingBox.min.toArray(),
      max: r.boundingBox.max.toArray()
    }));
    function s(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(t.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l))
          for (let u = 0, c = l.length; u < c; u++) {
            const f = l[u];
            s(t.shapes, f);
          }
        else
          s(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(t.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let l = 0, u = this.material.length; l < u; l++)
          o.push(s(t.materials, this.material[l]));
        r.material = o;
      } else
        r.material = s(t.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++)
        r.children.push(this.children[o].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        r.animations.push(s(t.animations, l));
      }
    }
    if (e) {
      const o = a(t.geometries), l = a(t.materials), u = a(t.textures), c = a(t.images), f = a(t.shapes), h = a(t.skeletons), p = a(t.animations), g = a(t.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), u.length > 0 && (n.textures = u), c.length > 0 && (n.images = c), f.length > 0 && (n.shapes = f), h.length > 0 && (n.skeletons = h), p.length > 0 && (n.animations = p), g.length > 0 && (n.nodes = g);
    }
    return n.object = r, n;
    function a(o) {
      const l = [];
      for (const u in o) {
        const c = o[u];
        delete c.metadata, l.push(c);
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, e = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), e === !0)
      for (let n = 0; n < t.children.length; n++) {
        const r = t.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
he.DEFAULT_UP = /* @__PURE__ */ new L(0, 1, 0);
he.DEFAULT_MATRIX_AUTO_UPDATE = !0;
he.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const Ie = /* @__PURE__ */ new L(), Ze = /* @__PURE__ */ new L(), ir = /* @__PURE__ */ new L(), $e = /* @__PURE__ */ new L(), Rn = /* @__PURE__ */ new L(), Ln = /* @__PURE__ */ new L(), ms = /* @__PURE__ */ new L(), rr = /* @__PURE__ */ new L(), sr = /* @__PURE__ */ new L(), ar = /* @__PURE__ */ new L(), or = /* @__PURE__ */ new se(), lr = /* @__PURE__ */ new se(), cr = /* @__PURE__ */ new se();
class Ne {
  constructor(t = new L(), e = new L(), n = new L()) {
    this.a = t, this.b = e, this.c = n;
  }
  static getNormal(t, e, n, r) {
    r.subVectors(n, e), Ie.subVectors(t, e), r.cross(Ie);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(t, e, n, r, s) {
    Ie.subVectors(r, e), Ze.subVectors(n, e), ir.subVectors(t, e);
    const a = Ie.dot(Ie), o = Ie.dot(Ze), l = Ie.dot(ir), u = Ze.dot(Ze), c = Ze.dot(ir), f = a * u - o * o;
    if (f === 0)
      return s.set(0, 0, 0), null;
    const h = 1 / f, p = (u * l - o * c) * h, g = (a * c - o * l) * h;
    return s.set(1 - p - g, g, p);
  }
  static containsPoint(t, e, n, r) {
    return this.getBarycoord(t, e, n, r, $e) === null ? !1 : $e.x >= 0 && $e.y >= 0 && $e.x + $e.y <= 1;
  }
  static getInterpolation(t, e, n, r, s, a, o, l) {
    return this.getBarycoord(t, e, n, r, $e) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, $e.x), l.addScaledVector(a, $e.y), l.addScaledVector(o, $e.z), l);
  }
  static getInterpolatedAttribute(t, e, n, r, s, a) {
    return or.setScalar(0), lr.setScalar(0), cr.setScalar(0), or.fromBufferAttribute(t, e), lr.fromBufferAttribute(t, n), cr.fromBufferAttribute(t, r), a.setScalar(0), a.addScaledVector(or, s.x), a.addScaledVector(lr, s.y), a.addScaledVector(cr, s.z), a;
  }
  static isFrontFacing(t, e, n, r) {
    return Ie.subVectors(n, e), Ze.subVectors(t, e), Ie.cross(Ze).dot(r) < 0;
  }
  set(t, e, n) {
    return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
  }
  setFromPointsAndIndices(t, e, n, r) {
    return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[r]), this;
  }
  setFromAttributeAndIndices(t, e, n, r) {
    return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return Ie.subVectors(this.c, this.b), Ze.subVectors(this.a, this.b), Ie.cross(Ze).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return Ne.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return Ne.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getInterpolation(t, e, n, r, s) {
    return Ne.getInterpolation(t, this.a, this.b, this.c, e, n, r, s);
  }
  containsPoint(t) {
    return Ne.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return Ne.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    Rn.subVectors(r, n), Ln.subVectors(s, n), rr.subVectors(t, n);
    const l = Rn.dot(rr), u = Ln.dot(rr);
    if (l <= 0 && u <= 0)
      return e.copy(n);
    sr.subVectors(t, r);
    const c = Rn.dot(sr), f = Ln.dot(sr);
    if (c >= 0 && f <= c)
      return e.copy(r);
    const h = l * f - c * u;
    if (h <= 0 && l >= 0 && c <= 0)
      return a = l / (l - c), e.copy(n).addScaledVector(Rn, a);
    ar.subVectors(t, s);
    const p = Rn.dot(ar), g = Ln.dot(ar);
    if (g >= 0 && p <= g)
      return e.copy(s);
    const x = p * u - l * g;
    if (x <= 0 && u >= 0 && g <= 0)
      return o = u / (u - g), e.copy(n).addScaledVector(Ln, o);
    const m = c * g - p * f;
    if (m <= 0 && f - c >= 0 && p - g >= 0)
      return ms.subVectors(s, r), o = (f - c) / (f - c + (p - g)), e.copy(r).addScaledVector(ms, o);
    const d = 1 / (m + x + h);
    return a = x * d, o = h * d, e.copy(n).addScaledVector(Rn, a).addScaledVector(Ln, o);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const ha = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, rn = { h: 0, s: 0, l: 0 }, Mi = { h: 0, s: 0, l: 0 };
function ur(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
}
class kt {
  constructor(t, e, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, n);
  }
  set(t, e, n) {
    if (e === void 0 && n === void 0) {
      const r = t;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(t, e, n);
    return this;
  }
  setScalar(t) {
    return this.r = t, this.g = t, this.b = t, this;
  }
  setHex(t, e = ge) {
    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, qt.toWorkingColorSpace(this, e), this;
  }
  setRGB(t, e, n, r = qt.workingColorSpace) {
    return this.r = t, this.g = e, this.b = n, qt.toWorkingColorSpace(this, r), this;
  }
  setHSL(t, e, n, r = qt.workingColorSpace) {
    if (t = Ga(t, 1), e = ue(e, 0, 1), n = ue(n, 0, 1), e === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + e) : n + e - n * e, a = 2 * n - s;
      this.r = ur(a, s, t + 1 / 3), this.g = ur(a, s, t), this.b = ur(a, s, t - 1 / 3);
    }
    return qt.toWorkingColorSpace(this, r), this;
  }
  setStyle(t, e = ge) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(t)) {
      let s;
      const a = r[1], o = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              e
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              e
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              e
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + t);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(t)) {
      const s = r[1], a = s.length;
      if (a === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          e
        );
      if (a === 6)
        return this.setHex(parseInt(s, 16), e);
      console.warn("THREE.Color: Invalid hex color " + t);
    } else if (t && t.length > 0)
      return this.setColorName(t, e);
    return this;
  }
  setColorName(t, e = ge) {
    const n = ha[t.toLowerCase()];
    return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this;
  }
  copySRGBToLinear(t) {
    return this.r = Ke(t.r), this.g = Ke(t.g), this.b = Ke(t.b), this;
  }
  copyLinearToSRGB(t) {
    return this.r = On(t.r), this.g = On(t.g), this.b = On(t.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = ge) {
    return qt.fromWorkingColorSpace(pe.copy(this), t), Math.round(ue(pe.r * 255, 0, 255)) * 65536 + Math.round(ue(pe.g * 255, 0, 255)) * 256 + Math.round(ue(pe.b * 255, 0, 255));
  }
  getHexString(t = ge) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = qt.workingColorSpace) {
    qt.fromWorkingColorSpace(pe.copy(this), e);
    const n = pe.r, r = pe.g, s = pe.b, a = Math.max(n, r, s), o = Math.min(n, r, s);
    let l, u;
    const c = (o + a) / 2;
    if (o === a)
      l = 0, u = 0;
    else {
      const f = a - o;
      switch (u = c <= 0.5 ? f / (a + o) : f / (2 - a - o), a) {
        case n:
          l = (r - s) / f + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - n) / f + 2;
          break;
        case s:
          l = (n - r) / f + 4;
          break;
      }
      l /= 6;
    }
    return t.h = l, t.s = u, t.l = c, t;
  }
  getRGB(t, e = qt.workingColorSpace) {
    return qt.fromWorkingColorSpace(pe.copy(this), e), t.r = pe.r, t.g = pe.g, t.b = pe.b, t;
  }
  getStyle(t = ge) {
    qt.fromWorkingColorSpace(pe.copy(this), t);
    const e = pe.r, n = pe.g, r = pe.b;
    return t !== ge ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(t, e, n) {
    return this.getHSL(rn), this.setHSL(rn.h + t, rn.s + e, rn.l + n);
  }
  add(t) {
    return this.r += t.r, this.g += t.g, this.b += t.b, this;
  }
  addColors(t, e) {
    return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
  }
  addScalar(t) {
    return this.r += t, this.g += t, this.b += t, this;
  }
  sub(t) {
    return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
  }
  multiply(t) {
    return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
  }
  multiplyScalar(t) {
    return this.r *= t, this.g *= t, this.b *= t, this;
  }
  lerp(t, e) {
    return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
  }
  lerpColors(t, e, n) {
    return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this;
  }
  lerpHSL(t, e) {
    this.getHSL(rn), t.getHSL(Mi);
    const n = Yi(rn.h, Mi.h, e), r = Yi(rn.s, Mi.s, e), s = Yi(rn.l, Mi.l, e);
    return this.setHSL(n, r, s), this;
  }
  setFromVector3(t) {
    return this.r = t.x, this.g = t.y, this.b = t.z, this;
  }
  applyMatrix3(t) {
    const e = this.r, n = this.g, r = this.b, s = t.elements;
    return this.r = s[0] * e + s[3] * n + s[6] * r, this.g = s[1] * e + s[4] * n + s[7] * r, this.b = s[2] * e + s[5] * n + s[8] * r, this;
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, e = 0) {
    return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
  }
  fromBufferAttribute(t, e) {
    return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const pe = /* @__PURE__ */ new kt();
kt.NAMES = ha;
let ro = 0;
class Hn extends Gn {
  static get type() {
    return "Material";
  }
  get type() {
    return this.constructor.type;
  }
  set type(t) {
  }
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: ro++ }), this.uuid = Vn(), this.name = "", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new kt(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== void 0)
      for (const e in t) {
        const n = t[e];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        const r = this[e];
        if (r === void 0) {
          console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[e] = n;
      }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    e && (t = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(s) {
      const a = [];
      for (const o in s) {
        const l = s[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (e) {
      const s = r(t.textures), a = r(t.images);
      s.length > 0 && (n.textures = s), a.length > 0 && (n.images = a);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
    const e = t.clippingPlanes;
    let n = null;
    if (e !== null) {
      const r = e.length;
      n = new Array(r);
      for (let s = 0; s !== r; ++s)
        n[s] = e[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class Ur extends Hn {
  static get type() {
    return "MeshBasicMaterial";
  }
  constructor(t) {
    super(), this.isMeshBasicMaterial = !0, this.color = new kt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ge(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}
const ae = /* @__PURE__ */ new L(), Si = /* @__PURE__ */ new ct();
class Fe {
  constructor(t, e, n = !1) {
    if (Array.isArray(t))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = 35044, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  setUsage(t) {
    return this.usage = t, this;
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
  }
  copyAt(t, e, n) {
    t *= this.itemSize, n *= e.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[t + r] = e.array[n + r];
    return this;
  }
  copyArray(t) {
    return this.array.set(t), this;
  }
  applyMatrix3(t) {
    if (this.itemSize === 2)
      for (let e = 0, n = this.count; e < n; e++)
        Si.fromBufferAttribute(this, e), Si.applyMatrix3(t), this.setXY(e, Si.x, Si.y);
    else if (this.itemSize === 3)
      for (let e = 0, n = this.count; e < n; e++)
        ae.fromBufferAttribute(this, e), ae.applyMatrix3(t), this.setXYZ(e, ae.x, ae.y, ae.z);
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ae.fromBufferAttribute(this, e), ae.applyMatrix4(t), this.setXYZ(e, ae.x, ae.y, ae.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ae.fromBufferAttribute(this, e), ae.applyNormalMatrix(t), this.setXYZ(e, ae.x, ae.y, ae.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ae.fromBufferAttribute(this, e), ae.transformDirection(t), this.setXYZ(e, ae.x, ae.y, ae.z);
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return this.normalized && (n = Zn(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = Me(n, this.array)), this.array[t * this.itemSize + e] = n, this;
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = Zn(e, this.array)), e;
  }
  setX(t, e) {
    return this.normalized && (e = Me(e, this.array)), this.array[t * this.itemSize] = e, this;
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = Zn(e, this.array)), e;
  }
  setY(t, e) {
    return this.normalized && (e = Me(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = Zn(e, this.array)), e;
  }
  setZ(t, e) {
    return this.normalized && (e = Me(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = Zn(e, this.array)), e;
  }
  setW(t, e) {
    return this.normalized && (e = Me(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
  }
  setXY(t, e, n) {
    return t *= this.itemSize, this.normalized && (e = Me(e, this.array), n = Me(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, r) {
    return t *= this.itemSize, this.normalized && (e = Me(e, this.array), n = Me(n, this.array), r = Me(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = r, this;
  }
  setXYZW(t, e, n, r, s) {
    return t *= this.itemSize, this.normalized && (e = Me(e, this.array), n = Me(n, this.array), r = Me(r, this.array), s = Me(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = r, this.array[t + 3] = s, this;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (t.name = this.name), this.usage !== 35044 && (t.usage = this.usage), t;
  }
}
class fa extends Fe {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class da extends Fe {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class Re extends Fe {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let so = 0;
const Ae = /* @__PURE__ */ new ne(), hr = /* @__PURE__ */ new he(), Pn = /* @__PURE__ */ new L(), ye = /* @__PURE__ */ new ui(), jn = /* @__PURE__ */ new ui(), ce = /* @__PURE__ */ new L();
class Ve extends Gn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: so++ }), this.uuid = Vn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (oa(t) ? da : fa)(t, 1) : this.index = t, this;
  }
  setIndirect(t) {
    return this.indirect = t, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, e) {
    return this.attributes[t] = e, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, e, n = 0) {
    this.groups.push({
      start: t,
      count: e,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, e) {
    this.drawRange.start = t, this.drawRange.count = e;
  }
  applyMatrix4(t) {
    const e = this.attributes.position;
    e !== void 0 && (e.applyMatrix4(t), e.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new zt().getNormalMatrix(t);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(t), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return Ae.makeRotationFromQuaternion(t), this.applyMatrix4(Ae), this;
  }
  rotateX(t) {
    return Ae.makeRotationX(t), this.applyMatrix4(Ae), this;
  }
  rotateY(t) {
    return Ae.makeRotationY(t), this.applyMatrix4(Ae), this;
  }
  rotateZ(t) {
    return Ae.makeRotationZ(t), this.applyMatrix4(Ae), this;
  }
  translate(t, e, n) {
    return Ae.makeTranslation(t, e, n), this.applyMatrix4(Ae), this;
  }
  scale(t, e, n) {
    return Ae.makeScale(t, e, n), this.applyMatrix4(Ae), this;
  }
  lookAt(t) {
    return hr.lookAt(t), hr.updateMatrix(), this.applyMatrix4(hr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Pn).negate(), this.translate(Pn.x, Pn.y, Pn.z), this;
  }
  setFromPoints(t) {
    const e = this.getAttribute("position");
    if (e === void 0) {
      const n = [];
      for (let r = 0, s = t.length; r < s; r++) {
        const a = t[r];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new Re(n, 3));
    } else {
      for (let n = 0, r = e.count; n < r; n++) {
        const s = t[n];
        e.setXYZ(n, s.x, s.y, s.z || 0);
      }
      t.length > e.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), e.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new ui());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new L(-1 / 0, -1 / 0, -1 / 0),
        new L(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), e)
        for (let n = 0, r = e.length; n < r; n++) {
          const s = e[n];
          ye.setFromBufferAttribute(s), this.morphTargetsRelative ? (ce.addVectors(this.boundingBox.min, ye.min), this.boundingBox.expandByPoint(ce), ce.addVectors(this.boundingBox.max, ye.max), this.boundingBox.expandByPoint(ce)) : (this.boundingBox.expandByPoint(ye.min), this.boundingBox.expandByPoint(ye.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Dr());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new L(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (ye.setFromBufferAttribute(t), e)
        for (let s = 0, a = e.length; s < a; s++) {
          const o = e[s];
          jn.setFromBufferAttribute(o), this.morphTargetsRelative ? (ce.addVectors(ye.min, jn.min), ye.expandByPoint(ce), ce.addVectors(ye.max, jn.max), ye.expandByPoint(ce)) : (ye.expandByPoint(jn.min), ye.expandByPoint(jn.max));
        }
      ye.getCenter(n);
      let r = 0;
      for (let s = 0, a = t.count; s < a; s++)
        ce.fromBufferAttribute(t, s), r = Math.max(r, n.distanceToSquared(ce));
      if (e)
        for (let s = 0, a = e.length; s < a; s++) {
          const o = e[s], l = this.morphTargetsRelative;
          for (let u = 0, c = o.count; u < c; u++)
            ce.fromBufferAttribute(o, u), l && (Pn.fromBufferAttribute(t, u), ce.add(Pn)), r = Math.max(r, n.distanceToSquared(ce));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, e = this.attributes;
    if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = e.position, r = e.normal, s = e.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Fe(new Float32Array(4 * n.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let P = 0; P < n.count; P++)
      o[P] = new L(), l[P] = new L();
    const u = new L(), c = new L(), f = new L(), h = new ct(), p = new ct(), g = new ct(), x = new L(), m = new L();
    function d(P, y, M) {
      u.fromBufferAttribute(n, P), c.fromBufferAttribute(n, y), f.fromBufferAttribute(n, M), h.fromBufferAttribute(s, P), p.fromBufferAttribute(s, y), g.fromBufferAttribute(s, M), c.sub(u), f.sub(u), p.sub(h), g.sub(h);
      const R = 1 / (p.x * g.y - g.x * p.y);
      isFinite(R) && (x.copy(c).multiplyScalar(g.y).addScaledVector(f, -p.y).multiplyScalar(R), m.copy(f).multiplyScalar(p.x).addScaledVector(c, -g.x).multiplyScalar(R), o[P].add(x), o[y].add(x), o[M].add(x), l[P].add(m), l[y].add(m), l[M].add(m));
    }
    let T = this.groups;
    T.length === 0 && (T = [{
      start: 0,
      count: t.count
    }]);
    for (let P = 0, y = T.length; P < y; ++P) {
      const M = T[P], R = M.start, q = M.count;
      for (let G = R, k = R + q; G < k; G += 3)
        d(
          t.getX(G + 0),
          t.getX(G + 1),
          t.getX(G + 2)
        );
    }
    const C = new L(), v = new L(), F = new L(), b = new L();
    function w(P) {
      F.fromBufferAttribute(r, P), b.copy(F);
      const y = o[P];
      C.copy(y), C.sub(F.multiplyScalar(F.dot(y))).normalize(), v.crossVectors(b, y);
      const R = v.dot(l[P]) < 0 ? -1 : 1;
      a.setXYZW(P, C.x, C.y, C.z, R);
    }
    for (let P = 0, y = T.length; P < y; ++P) {
      const M = T[P], R = M.start, q = M.count;
      for (let G = R, k = R + q; G < k; G += 3)
        w(t.getX(G + 0)), w(t.getX(G + 1)), w(t.getX(G + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Fe(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let h = 0, p = n.count; h < p; h++)
          n.setXYZ(h, 0, 0, 0);
      const r = new L(), s = new L(), a = new L(), o = new L(), l = new L(), u = new L(), c = new L(), f = new L();
      if (t)
        for (let h = 0, p = t.count; h < p; h += 3) {
          const g = t.getX(h + 0), x = t.getX(h + 1), m = t.getX(h + 2);
          r.fromBufferAttribute(e, g), s.fromBufferAttribute(e, x), a.fromBufferAttribute(e, m), c.subVectors(a, s), f.subVectors(r, s), c.cross(f), o.fromBufferAttribute(n, g), l.fromBufferAttribute(n, x), u.fromBufferAttribute(n, m), o.add(c), l.add(c), u.add(c), n.setXYZ(g, o.x, o.y, o.z), n.setXYZ(x, l.x, l.y, l.z), n.setXYZ(m, u.x, u.y, u.z);
        }
      else
        for (let h = 0, p = e.count; h < p; h += 3)
          r.fromBufferAttribute(e, h + 0), s.fromBufferAttribute(e, h + 1), a.fromBufferAttribute(e, h + 2), c.subVectors(a, s), f.subVectors(r, s), c.cross(f), n.setXYZ(h + 0, c.x, c.y, c.z), n.setXYZ(h + 1, c.x, c.y, c.z), n.setXYZ(h + 2, c.x, c.y, c.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++)
      ce.fromBufferAttribute(t, e), ce.normalize(), t.setXYZ(e, ce.x, ce.y, ce.z);
  }
  toNonIndexed() {
    function t(o, l) {
      const u = o.array, c = o.itemSize, f = o.normalized, h = new u.constructor(l.length * c);
      let p = 0, g = 0;
      for (let x = 0, m = l.length; x < m; x++) {
        o.isInterleavedBufferAttribute ? p = l[x] * o.data.stride + o.offset : p = l[x] * c;
        for (let d = 0; d < c; d++)
          h[g++] = u[p++];
      }
      return new Fe(h, c, f);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new Ve(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const l = r[o], u = t(l, n);
      e.setAttribute(o, u);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const l = [], u = s[o];
      for (let c = 0, f = u.length; c < f; c++) {
        const h = u[c], p = t(h, n);
        l.push(p);
      }
      e.morphAttributes[o] = l;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const u = a[o];
      e.addGroup(u.start, u.count, u.materialIndex);
    }
    return e;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const u in l)
        l[u] !== void 0 && (t[u] = l[u]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null && (t.data.index = {
      type: e.array.constructor.name,
      array: Array.prototype.slice.call(e.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const u = n[l];
      t.data.attributes[l] = u.toJSON(t.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const u = this.morphAttributes[l], c = [];
      for (let f = 0, h = u.length; f < h; f++) {
        const p = u[f];
        c.push(p.toJSON(t.data));
      }
      c.length > 0 && (r[l] = c, s = !0);
    }
    s && (t.data.morphAttributes = r, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (t.data.boundingSphere = {
      center: o.center.toArray(),
      radius: o.radius
    }), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const e = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone(e));
    const r = t.attributes;
    for (const u in r) {
      const c = r[u];
      this.setAttribute(u, c.clone(e));
    }
    const s = t.morphAttributes;
    for (const u in s) {
      const c = [], f = s[u];
      for (let h = 0, p = f.length; h < p; h++)
        c.push(f[h].clone(e));
      this.morphAttributes[u] = c;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let u = 0, c = a.length; u < c; u++) {
      const f = a[u];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const o = t.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const gs = /* @__PURE__ */ new ne(), hn = /* @__PURE__ */ new Ja(), Ci = /* @__PURE__ */ new Dr(), _s = /* @__PURE__ */ new L(), yi = /* @__PURE__ */ new L(), Ei = /* @__PURE__ */ new L(), Ti = /* @__PURE__ */ new L(), fr = /* @__PURE__ */ new L(), Ai = /* @__PURE__ */ new L(), vs = /* @__PURE__ */ new L(), bi = /* @__PURE__ */ new L();
class Ee extends he {
  constructor(t = new Ve(), e = new Ur()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const r = e[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  getVertexPosition(t, e) {
    const n = this.geometry, r = n.attributes.position, s = n.morphAttributes.position, a = n.morphTargetsRelative;
    e.fromBufferAttribute(r, t);
    const o = this.morphTargetInfluences;
    if (s && o) {
      Ai.set(0, 0, 0);
      for (let l = 0, u = s.length; l < u; l++) {
        const c = o[l], f = s[l];
        c !== 0 && (fr.fromBufferAttribute(f, t), a ? Ai.addScaledVector(fr, c) : Ai.addScaledVector(fr.sub(e), c));
      }
      e.add(Ai);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Ci.copy(n.boundingSphere), Ci.applyMatrix4(s), hn.copy(t.ray).recast(t.near), !(Ci.containsPoint(hn.origin) === !1 && (hn.intersectSphere(Ci, _s) === null || hn.origin.distanceToSquared(_s) > (t.far - t.near) ** 2)) && (gs.copy(s).invert(), hn.copy(t.ray).applyMatrix4(gs), !(n.boundingBox !== null && hn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(t, e, hn)));
  }
  _computeIntersections(t, e, n) {
    let r;
    const s = this.geometry, a = this.material, o = s.index, l = s.attributes.position, u = s.attributes.uv, c = s.attributes.uv1, f = s.attributes.normal, h = s.groups, p = s.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let g = 0, x = h.length; g < x; g++) {
          const m = h[g], d = a[m.materialIndex], T = Math.max(m.start, p.start), C = Math.min(o.count, Math.min(m.start + m.count, p.start + p.count));
          for (let v = T, F = C; v < F; v += 3) {
            const b = o.getX(v), w = o.getX(v + 1), P = o.getX(v + 2);
            r = wi(this, d, t, n, u, c, f, b, w, P), r && (r.faceIndex = Math.floor(v / 3), r.face.materialIndex = m.materialIndex, e.push(r));
          }
        }
      else {
        const g = Math.max(0, p.start), x = Math.min(o.count, p.start + p.count);
        for (let m = g, d = x; m < d; m += 3) {
          const T = o.getX(m), C = o.getX(m + 1), v = o.getX(m + 2);
          r = wi(this, a, t, n, u, c, f, T, C, v), r && (r.faceIndex = Math.floor(m / 3), e.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(a))
        for (let g = 0, x = h.length; g < x; g++) {
          const m = h[g], d = a[m.materialIndex], T = Math.max(m.start, p.start), C = Math.min(l.count, Math.min(m.start + m.count, p.start + p.count));
          for (let v = T, F = C; v < F; v += 3) {
            const b = v, w = v + 1, P = v + 2;
            r = wi(this, d, t, n, u, c, f, b, w, P), r && (r.faceIndex = Math.floor(v / 3), r.face.materialIndex = m.materialIndex, e.push(r));
          }
        }
      else {
        const g = Math.max(0, p.start), x = Math.min(l.count, p.start + p.count);
        for (let m = g, d = x; m < d; m += 3) {
          const T = m, C = m + 1, v = m + 2;
          r = wi(this, a, t, n, u, c, f, T, C, v), r && (r.faceIndex = Math.floor(m / 3), e.push(r));
        }
      }
  }
}
function ao(i, t, e, n, r, s, a, o) {
  let l;
  if (t.side === 1 ? l = n.intersectTriangle(a, s, r, !0, o) : l = n.intersectTriangle(r, s, a, t.side === 0, o), l === null) return null;
  bi.copy(o), bi.applyMatrix4(i.matrixWorld);
  const u = e.ray.origin.distanceTo(bi);
  return u < e.near || u > e.far ? null : {
    distance: u,
    point: bi.clone(),
    object: i
  };
}
function wi(i, t, e, n, r, s, a, o, l, u) {
  i.getVertexPosition(o, yi), i.getVertexPosition(l, Ei), i.getVertexPosition(u, Ti);
  const c = ao(i, t, e, n, yi, Ei, Ti, vs);
  if (c) {
    const f = new L();
    Ne.getBarycoord(vs, yi, Ei, Ti, f), r && (c.uv = Ne.getInterpolatedAttribute(r, o, l, u, f, new ct())), s && (c.uv1 = Ne.getInterpolatedAttribute(s, o, l, u, f, new ct())), a && (c.normal = Ne.getInterpolatedAttribute(a, o, l, u, f, new L()), c.normal.dot(n.direction) > 0 && c.normal.multiplyScalar(-1));
    const h = {
      a: o,
      b: l,
      c: u,
      normal: new L(),
      materialIndex: 0
    };
    Ne.getNormal(yi, Ei, Ti, h.normal), c.face = h, c.barycoord = f;
  }
  return c;
}
class kn extends Ve {
  constructor(t = 1, e = 1, n = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: e,
      depth: n,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const l = [], u = [], c = [], f = [];
    let h = 0, p = 0;
    g("z", "y", "x", -1, -1, n, e, t, a, s, 0), g("z", "y", "x", 1, -1, n, e, -t, a, s, 1), g("x", "z", "y", 1, 1, t, n, e, r, a, 2), g("x", "z", "y", 1, -1, t, n, -e, r, a, 3), g("x", "y", "z", 1, -1, t, e, n, r, s, 4), g("x", "y", "z", -1, -1, t, e, -n, r, s, 5), this.setIndex(l), this.setAttribute("position", new Re(u, 3)), this.setAttribute("normal", new Re(c, 3)), this.setAttribute("uv", new Re(f, 2));
    function g(x, m, d, T, C, v, F, b, w, P, y) {
      const M = v / w, R = F / P, q = v / 2, G = F / 2, k = b / 2, j = w + 1, H = P + 1;
      let nt = 0, V = 0;
      const ot = new L();
      for (let dt = 0; dt < H; dt++) {
        const St = dt * R - G;
        for (let X = 0; X < j; X++) {
          const lt = X * M - q;
          ot[x] = lt * T, ot[m] = St * C, ot[d] = k, u.push(ot.x, ot.y, ot.z), ot[x] = 0, ot[m] = 0, ot[d] = b > 0 ? 1 : -1, c.push(ot.x, ot.y, ot.z), f.push(X / w), f.push(1 - dt / P), nt += 1;
        }
      }
      for (let dt = 0; dt < P; dt++)
        for (let St = 0; St < w; St++) {
          const X = h + St + j * dt, lt = h + St + j * (dt + 1), N = h + (St + 1) + j * (dt + 1), J = h + (St + 1) + j * dt;
          l.push(X, lt, J), l.push(lt, N, J), V += 6;
        }
      o.addGroup(p, V, y), p += V, h += nt;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new kn(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
function Bn(i) {
  const t = {};
  for (const e in i) {
    t[e] = {};
    for (const n in i[e]) {
      const r = i[e][n];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[e][n] = null) : t[e][n] = r.clone() : Array.isArray(r) ? t[e][n] = r.slice() : t[e][n] = r;
    }
  }
  return t;
}
function me(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = Bn(i[e]);
    for (const r in n)
      t[r] = n[r];
  }
  return t;
}
function oo(i) {
  const t = [];
  for (let e = 0; e < i.length; e++)
    t.push(i[e].clone());
  return t;
}
function pa(i) {
  const t = i.getRenderTarget();
  return t === null ? i.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : qt.workingColorSpace;
}
const lo = { clone: Bn, merge: me };
var co = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, uo = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class on extends Hn {
  static get type() {
    return "ShaderMaterial";
  }
  constructor(t) {
    super(), this.isShaderMaterial = !0, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = co, this.fragmentShader = uo, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, t !== void 0 && this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = Bn(t.uniforms), this.uniformsGroups = oo(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.glslVersion = this.glslVersion, e.uniforms = {};
    for (const r in this.uniforms) {
      const a = this.uniforms[r].value;
      a && a.isTexture ? e.uniforms[r] = {
        type: "t",
        value: a.toJSON(t).uuid
      } : a && a.isColor ? e.uniforms[r] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? e.uniforms[r] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? e.uniforms[r] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? e.uniforms[r] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? e.uniforms[r] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? e.uniforms[r] = {
        type: "m4",
        value: a.toArray()
      } : e.uniforms[r] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (e.extensions = n), e;
  }
}
class ma extends he {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ne(), this.projectionMatrix = new ne(), this.projectionMatrixInverse = new ne(), this.coordinateSystem = 2e3;
  }
  copy(t, e) {
    return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(t, e) {
    super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const sn = /* @__PURE__ */ new L(), xs = /* @__PURE__ */ new ct(), Ms = /* @__PURE__ */ new ct();
class we extends ma {
  constructor(t = 50, e = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(t) {
    const e = 0.5 * this.getFilmHeight() / t;
    this.fov = br * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const t = Math.tan(qi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / t;
  }
  getEffectiveFOV() {
    return br * 2 * Math.atan(
      Math.tan(qi * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   */
  getViewBounds(t, e, n) {
    sn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(sn.x, sn.y).multiplyScalar(-t / sn.z), sn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(sn.x, sn.y).multiplyScalar(-t / sn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(t, e) {
    return this.getViewBounds(t, xs, Ms), e.subVectors(Ms, xs);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(t, e, n, r, s, a) {
    this.aspect = t / e, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = this.near;
    let e = t * Math.tan(qi * 0.5 * this.fov) / this.zoom, n = 2 * e, r = this.aspect * n, s = -0.5 * r;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, u = a.fullHeight;
      s += a.offsetX * r / l, e -= a.offsetY * n / u, r *= a.width / l, n *= a.height / u;
    }
    const o = this.filmOffset;
    o !== 0 && (s += t * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, e, e - n, t, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
  }
}
const Dn = -90, Un = 1;
class ho extends he {
  constructor(t, e, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new we(Dn, Un, t, e);
    r.layers = this.layers, this.add(r);
    const s = new we(Dn, Un, t, e);
    s.layers = this.layers, this.add(s);
    const a = new we(Dn, Un, t, e);
    a.layers = this.layers, this.add(a);
    const o = new we(Dn, Un, t, e);
    o.layers = this.layers, this.add(o);
    const l = new we(Dn, Un, t, e);
    l.layers = this.layers, this.add(l);
    const u = new we(Dn, Un, t, e);
    u.layers = this.layers, this.add(u);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem, e = this.children.concat(), [n, r, s, a, o, l] = e;
    for (const u of e) this.remove(u);
    if (t === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (t === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const u of e)
      this.add(u), u.updateMatrixWorld();
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, l, u, c] = this.children, f = t.getRenderTarget(), h = t.getActiveCubeFace(), p = t.getActiveMipmapLevel(), g = t.xr.enabled;
    t.xr.enabled = !1;
    const x = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, t.setRenderTarget(n, 0, r), t.render(e, s), t.setRenderTarget(n, 1, r), t.render(e, a), t.setRenderTarget(n, 2, r), t.render(e, o), t.setRenderTarget(n, 3, r), t.render(e, l), t.setRenderTarget(n, 4, r), t.render(e, u), n.texture.generateMipmaps = x, t.setRenderTarget(n, 5, r), t.render(e, c), t.setRenderTarget(f, h, p), t.xr.enabled = g, n.texture.needsPMREMUpdate = !0;
  }
}
class ga extends ve {
  constructor(t, e, n, r, s, a, o, l, u, c) {
    t = t !== void 0 ? t : [], e = e !== void 0 ? e : 301, super(t, e, n, r, s, a, o, l, u, c), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class fo extends xn {
  constructor(t = 1, e = {}) {
    super(t, t, e), this.isWebGLCubeRenderTarget = !0;
    const n = { width: t, height: t, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new ga(r, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : !1, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : 1006;
  }
  fromEquirectangularTexture(t, e) {
    this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new kn(5, 5, 5), s = new on({
      name: "CubemapFromEquirect",
      uniforms: Bn(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    s.uniforms.tEquirect.value = e;
    const a = new Ee(r, s), o = e.minFilter;
    return e.minFilter === 1008 && (e.minFilter = 1006), new ho(1, 10, this).update(t, a), e.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(t, e, n, r) {
    const s = t.getRenderTarget();
    for (let a = 0; a < 6; a++)
      t.setRenderTarget(this, a), t.clear(e, n, r);
    t.setRenderTarget(s);
  }
}
const dr = /* @__PURE__ */ new L(), po = /* @__PURE__ */ new L(), mo = /* @__PURE__ */ new zt();
class mn {
  constructor(t = new L(1, 0, 0), e = 0) {
    this.isPlane = !0, this.normal = t, this.constant = e;
  }
  set(t, e) {
    return this.normal.copy(t), this.constant = e, this;
  }
  setComponents(t, e, n, r) {
    return this.normal.set(t, e, n), this.constant = r, this;
  }
  setFromNormalAndCoplanarPoint(t, e) {
    return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
  }
  setFromCoplanarPoints(t, e, n) {
    const r = dr.subVectors(n, e).cross(po.subVectors(t, e)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, t), this;
  }
  copy(t) {
    return this.normal.copy(t.normal), this.constant = t.constant, this;
  }
  normalize() {
    const t = 1 / this.normal.length();
    return this.normal.multiplyScalar(t), this.constant *= t, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
  }
  intersectLine(t, e) {
    const n = t.delta(dr), r = this.normal.dot(n);
    if (r === 0)
      return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
    const s = -(t.start.dot(this.normal) + this.constant) / r;
    return s < 0 || s > 1 ? null : e.copy(t.start).addScaledVector(n, s);
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
    return e < 0 && n > 0 || n < 0 && e > 0;
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, e) {
    const n = e || mo.getNormalMatrix(t), r = this.coplanarPoint(dr).applyMatrix4(t), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(s), this;
  }
  translate(t) {
    return this.constant -= t.dot(this.normal), this;
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const fn = /* @__PURE__ */ new Dr(), Ri = /* @__PURE__ */ new L();
class Ir {
  constructor(t = new mn(), e = new mn(), n = new mn(), r = new mn(), s = new mn(), a = new mn()) {
    this.planes = [t, e, n, r, s, a];
  }
  set(t, e, n, r, s, a) {
    const o = this.planes;
    return o[0].copy(t), o[1].copy(e), o[2].copy(n), o[3].copy(r), o[4].copy(s), o[5].copy(a), this;
  }
  copy(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++)
      e[n].copy(t.planes[n]);
    return this;
  }
  setFromProjectionMatrix(t, e = 2e3) {
    const n = this.planes, r = t.elements, s = r[0], a = r[1], o = r[2], l = r[3], u = r[4], c = r[5], f = r[6], h = r[7], p = r[8], g = r[9], x = r[10], m = r[11], d = r[12], T = r[13], C = r[14], v = r[15];
    if (n[0].setComponents(l - s, h - u, m - p, v - d).normalize(), n[1].setComponents(l + s, h + u, m + p, v + d).normalize(), n[2].setComponents(l + a, h + c, m + g, v + T).normalize(), n[3].setComponents(l - a, h - c, m - g, v - T).normalize(), n[4].setComponents(l - o, h - f, m - x, v - C).normalize(), e === 2e3)
      n[5].setComponents(l + o, h + f, m + x, v + C).normalize();
    else if (e === 2001)
      n[5].setComponents(o, f, x, C).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0)
      t.boundingSphere === null && t.computeBoundingSphere(), fn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), fn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(fn);
  }
  intersectsSprite(t) {
    return fn.center.set(0, 0, 0), fn.radius = 0.7071067811865476, fn.applyMatrix4(t.matrixWorld), this.intersectsSphere(fn);
  }
  intersectsSphere(t) {
    const e = this.planes, n = t.center, r = -t.radius;
    for (let s = 0; s < 6; s++)
      if (e[s].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  intersectsBox(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = e[n];
      if (Ri.x = r.normal.x > 0 ? t.max.x : t.min.x, Ri.y = r.normal.y > 0 ? t.max.y : t.min.y, Ri.z = r.normal.z > 0 ? t.max.z : t.min.z, r.distanceToPoint(Ri) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++)
      if (e[n].distanceToPoint(t) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function _a() {
  let i = null, t = !1, e = null, n = null;
  function r(s, a) {
    e(s, a), n = i.requestAnimationFrame(r);
  }
  return {
    start: function() {
      t !== !0 && e !== null && (n = i.requestAnimationFrame(r), t = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), t = !1;
    },
    setAnimationLoop: function(s) {
      e = s;
    },
    setContext: function(s) {
      i = s;
    }
  };
}
function go(i) {
  const t = /* @__PURE__ */ new WeakMap();
  function e(o, l) {
    const u = o.array, c = o.usage, f = u.byteLength, h = i.createBuffer();
    i.bindBuffer(l, h), i.bufferData(l, u, c), o.onUploadCallback();
    let p;
    if (u instanceof Float32Array)
      p = i.FLOAT;
    else if (u instanceof Uint16Array)
      o.isFloat16BufferAttribute ? p = i.HALF_FLOAT : p = i.UNSIGNED_SHORT;
    else if (u instanceof Int16Array)
      p = i.SHORT;
    else if (u instanceof Uint32Array)
      p = i.UNSIGNED_INT;
    else if (u instanceof Int32Array)
      p = i.INT;
    else if (u instanceof Int8Array)
      p = i.BYTE;
    else if (u instanceof Uint8Array)
      p = i.UNSIGNED_BYTE;
    else if (u instanceof Uint8ClampedArray)
      p = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + u);
    return {
      buffer: h,
      type: p,
      bytesPerElement: u.BYTES_PER_ELEMENT,
      version: o.version,
      size: f
    };
  }
  function n(o, l, u) {
    const c = l.array, f = l.updateRanges;
    if (i.bindBuffer(u, o), f.length === 0)
      i.bufferSubData(u, 0, c);
    else {
      f.sort((p, g) => p.start - g.start);
      let h = 0;
      for (let p = 1; p < f.length; p++) {
        const g = f[h], x = f[p];
        x.start <= g.start + g.count + 1 ? g.count = Math.max(
          g.count,
          x.start + x.count - g.start
        ) : (++h, f[h] = x);
      }
      f.length = h + 1;
      for (let p = 0, g = f.length; p < g; p++) {
        const x = f[p];
        i.bufferSubData(
          u,
          x.start * c.BYTES_PER_ELEMENT,
          c,
          x.start,
          x.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), t.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = t.get(o);
    l && (i.deleteBuffer(l.buffer), t.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const c = t.get(o);
      (!c || c.version < o.version) && t.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const u = t.get(o);
    if (u === void 0)
      t.set(o, e(o, l));
    else if (u.version < o.version) {
      if (u.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(u.buffer, o, l), u.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
class Wn extends Ve {
  constructor(t = 1, e = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: e,
      widthSegments: n,
      heightSegments: r
    };
    const s = t / 2, a = e / 2, o = Math.floor(n), l = Math.floor(r), u = o + 1, c = l + 1, f = t / o, h = e / l, p = [], g = [], x = [], m = [];
    for (let d = 0; d < c; d++) {
      const T = d * h - a;
      for (let C = 0; C < u; C++) {
        const v = C * f - s;
        g.push(v, -T, 0), x.push(0, 0, 1), m.push(C / o), m.push(1 - d / l);
      }
    }
    for (let d = 0; d < l; d++)
      for (let T = 0; T < o; T++) {
        const C = T + u * d, v = T + u * (d + 1), F = T + 1 + u * (d + 1), b = T + 1 + u * d;
        p.push(C, v, b), p.push(v, F, b);
      }
    this.setIndex(p), this.setAttribute("position", new Re(g, 3)), this.setAttribute("normal", new Re(x, 3)), this.setAttribute("uv", new Re(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Wn(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
var _o = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, vo = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, xo = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, Mo = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, So = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Co = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, yo = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Eo = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, To = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, Ao = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, bo = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, wo = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Ro = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, Lo = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, Po = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Do = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, Uo = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Io = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, No = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Fo = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Oo = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Bo = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, zo = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, Go = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Vo = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Ho = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, ko = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Wo = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Xo = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, qo = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Yo = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Zo = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, $o = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Ko = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Jo = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, jo = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Qo = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, tl = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, el = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, nl = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, il = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, rl = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, sl = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, al = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, ol = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, ll = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, cl = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, ul = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, hl = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, fl = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, dl = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, pl = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, ml = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, gl = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, _l = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, vl = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, xl = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Ml = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Sl = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Cl = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, yl = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, El = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Tl = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, Al = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, bl = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, wl = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Rl = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Ll = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Pl = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Dl = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, Ul = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Il = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Nl = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Fl = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Ol = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Bl = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, zl = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Gl = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Vl = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Hl = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, kl = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Wl = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Xl = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, ql = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Yl = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Zl = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, $l = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Kl = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Jl = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, jl = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, Ql = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, tc = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, ec = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, nc = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, ic = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, rc = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, sc = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, ac = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, oc = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, lc = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, cc = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, uc = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, hc = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, fc = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, dc = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, pc = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, mc = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const gc = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, _c = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, vc = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, xc = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Mc = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Sc = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Cc = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, yc = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, Ec = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, Tc = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, Ac = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, bc = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, wc = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Rc = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Lc = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, Pc = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Dc = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Uc = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Ic = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Nc = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Fc = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Oc = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, Bc = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, zc = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Gc = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Vc = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Hc = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, kc = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Wc = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Xc = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, qc = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Yc = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Zc = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, $c = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Vt = {
  alphahash_fragment: _o,
  alphahash_pars_fragment: vo,
  alphamap_fragment: xo,
  alphamap_pars_fragment: Mo,
  alphatest_fragment: So,
  alphatest_pars_fragment: Co,
  aomap_fragment: yo,
  aomap_pars_fragment: Eo,
  batching_pars_vertex: To,
  batching_vertex: Ao,
  begin_vertex: bo,
  beginnormal_vertex: wo,
  bsdfs: Ro,
  iridescence_fragment: Lo,
  bumpmap_pars_fragment: Po,
  clipping_planes_fragment: Do,
  clipping_planes_pars_fragment: Uo,
  clipping_planes_pars_vertex: Io,
  clipping_planes_vertex: No,
  color_fragment: Fo,
  color_pars_fragment: Oo,
  color_pars_vertex: Bo,
  color_vertex: zo,
  common: Go,
  cube_uv_reflection_fragment: Vo,
  defaultnormal_vertex: Ho,
  displacementmap_pars_vertex: ko,
  displacementmap_vertex: Wo,
  emissivemap_fragment: Xo,
  emissivemap_pars_fragment: qo,
  colorspace_fragment: Yo,
  colorspace_pars_fragment: Zo,
  envmap_fragment: $o,
  envmap_common_pars_fragment: Ko,
  envmap_pars_fragment: Jo,
  envmap_pars_vertex: jo,
  envmap_physical_pars_fragment: cl,
  envmap_vertex: Qo,
  fog_vertex: tl,
  fog_pars_vertex: el,
  fog_fragment: nl,
  fog_pars_fragment: il,
  gradientmap_pars_fragment: rl,
  lightmap_pars_fragment: sl,
  lights_lambert_fragment: al,
  lights_lambert_pars_fragment: ol,
  lights_pars_begin: ll,
  lights_toon_fragment: ul,
  lights_toon_pars_fragment: hl,
  lights_phong_fragment: fl,
  lights_phong_pars_fragment: dl,
  lights_physical_fragment: pl,
  lights_physical_pars_fragment: ml,
  lights_fragment_begin: gl,
  lights_fragment_maps: _l,
  lights_fragment_end: vl,
  logdepthbuf_fragment: xl,
  logdepthbuf_pars_fragment: Ml,
  logdepthbuf_pars_vertex: Sl,
  logdepthbuf_vertex: Cl,
  map_fragment: yl,
  map_pars_fragment: El,
  map_particle_fragment: Tl,
  map_particle_pars_fragment: Al,
  metalnessmap_fragment: bl,
  metalnessmap_pars_fragment: wl,
  morphinstance_vertex: Rl,
  morphcolor_vertex: Ll,
  morphnormal_vertex: Pl,
  morphtarget_pars_vertex: Dl,
  morphtarget_vertex: Ul,
  normal_fragment_begin: Il,
  normal_fragment_maps: Nl,
  normal_pars_fragment: Fl,
  normal_pars_vertex: Ol,
  normal_vertex: Bl,
  normalmap_pars_fragment: zl,
  clearcoat_normal_fragment_begin: Gl,
  clearcoat_normal_fragment_maps: Vl,
  clearcoat_pars_fragment: Hl,
  iridescence_pars_fragment: kl,
  opaque_fragment: Wl,
  packing: Xl,
  premultiplied_alpha_fragment: ql,
  project_vertex: Yl,
  dithering_fragment: Zl,
  dithering_pars_fragment: $l,
  roughnessmap_fragment: Kl,
  roughnessmap_pars_fragment: Jl,
  shadowmap_pars_fragment: jl,
  shadowmap_pars_vertex: Ql,
  shadowmap_vertex: tc,
  shadowmask_pars_fragment: ec,
  skinbase_vertex: nc,
  skinning_pars_vertex: ic,
  skinning_vertex: rc,
  skinnormal_vertex: sc,
  specularmap_fragment: ac,
  specularmap_pars_fragment: oc,
  tonemapping_fragment: lc,
  tonemapping_pars_fragment: cc,
  transmission_fragment: uc,
  transmission_pars_fragment: hc,
  uv_pars_fragment: fc,
  uv_pars_vertex: dc,
  uv_vertex: pc,
  worldpos_vertex: mc,
  background_vert: gc,
  background_frag: _c,
  backgroundCube_vert: vc,
  backgroundCube_frag: xc,
  cube_vert: Mc,
  cube_frag: Sc,
  depth_vert: Cc,
  depth_frag: yc,
  distanceRGBA_vert: Ec,
  distanceRGBA_frag: Tc,
  equirect_vert: Ac,
  equirect_frag: bc,
  linedashed_vert: wc,
  linedashed_frag: Rc,
  meshbasic_vert: Lc,
  meshbasic_frag: Pc,
  meshlambert_vert: Dc,
  meshlambert_frag: Uc,
  meshmatcap_vert: Ic,
  meshmatcap_frag: Nc,
  meshnormal_vert: Fc,
  meshnormal_frag: Oc,
  meshphong_vert: Bc,
  meshphong_frag: zc,
  meshphysical_vert: Gc,
  meshphysical_frag: Vc,
  meshtoon_vert: Hc,
  meshtoon_frag: kc,
  points_vert: Wc,
  points_frag: Xc,
  shadow_vert: qc,
  shadow_frag: Yc,
  sprite_vert: Zc,
  sprite_frag: $c
}, ut = {
  common: {
    diffuse: { value: /* @__PURE__ */ new kt(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new zt() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new zt() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new zt() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new zt() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new zt() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new zt() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new zt() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new zt() },
    normalScale: { value: /* @__PURE__ */ new ct(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new zt() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new zt() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new zt() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new zt() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new kt(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new kt(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new zt() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new zt() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new kt(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new ct(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new zt() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new zt() },
    alphaTest: { value: 0 }
  }
}, Be = {
  basic: {
    uniforms: /* @__PURE__ */ me([
      ut.common,
      ut.specularmap,
      ut.envmap,
      ut.aomap,
      ut.lightmap,
      ut.fog
    ]),
    vertexShader: Vt.meshbasic_vert,
    fragmentShader: Vt.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ me([
      ut.common,
      ut.specularmap,
      ut.envmap,
      ut.aomap,
      ut.lightmap,
      ut.emissivemap,
      ut.bumpmap,
      ut.normalmap,
      ut.displacementmap,
      ut.fog,
      ut.lights,
      {
        emissive: { value: /* @__PURE__ */ new kt(0) }
      }
    ]),
    vertexShader: Vt.meshlambert_vert,
    fragmentShader: Vt.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ me([
      ut.common,
      ut.specularmap,
      ut.envmap,
      ut.aomap,
      ut.lightmap,
      ut.emissivemap,
      ut.bumpmap,
      ut.normalmap,
      ut.displacementmap,
      ut.fog,
      ut.lights,
      {
        emissive: { value: /* @__PURE__ */ new kt(0) },
        specular: { value: /* @__PURE__ */ new kt(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Vt.meshphong_vert,
    fragmentShader: Vt.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ me([
      ut.common,
      ut.envmap,
      ut.aomap,
      ut.lightmap,
      ut.emissivemap,
      ut.bumpmap,
      ut.normalmap,
      ut.displacementmap,
      ut.roughnessmap,
      ut.metalnessmap,
      ut.fog,
      ut.lights,
      {
        emissive: { value: /* @__PURE__ */ new kt(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Vt.meshphysical_vert,
    fragmentShader: Vt.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ me([
      ut.common,
      ut.aomap,
      ut.lightmap,
      ut.emissivemap,
      ut.bumpmap,
      ut.normalmap,
      ut.displacementmap,
      ut.gradientmap,
      ut.fog,
      ut.lights,
      {
        emissive: { value: /* @__PURE__ */ new kt(0) }
      }
    ]),
    vertexShader: Vt.meshtoon_vert,
    fragmentShader: Vt.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ me([
      ut.common,
      ut.bumpmap,
      ut.normalmap,
      ut.displacementmap,
      ut.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Vt.meshmatcap_vert,
    fragmentShader: Vt.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ me([
      ut.points,
      ut.fog
    ]),
    vertexShader: Vt.points_vert,
    fragmentShader: Vt.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ me([
      ut.common,
      ut.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Vt.linedashed_vert,
    fragmentShader: Vt.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ me([
      ut.common,
      ut.displacementmap
    ]),
    vertexShader: Vt.depth_vert,
    fragmentShader: Vt.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ me([
      ut.common,
      ut.bumpmap,
      ut.normalmap,
      ut.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Vt.meshnormal_vert,
    fragmentShader: Vt.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ me([
      ut.sprite,
      ut.fog
    ]),
    vertexShader: Vt.sprite_vert,
    fragmentShader: Vt.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new zt() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Vt.background_vert,
    fragmentShader: Vt.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new zt() }
    },
    vertexShader: Vt.backgroundCube_vert,
    fragmentShader: Vt.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Vt.cube_vert,
    fragmentShader: Vt.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Vt.equirect_vert,
    fragmentShader: Vt.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ me([
      ut.common,
      ut.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new L() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Vt.distanceRGBA_vert,
    fragmentShader: Vt.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ me([
      ut.lights,
      ut.fog,
      {
        color: { value: /* @__PURE__ */ new kt(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Vt.shadow_vert,
    fragmentShader: Vt.shadow_frag
  }
};
Be.physical = {
  uniforms: /* @__PURE__ */ me([
    Be.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new zt() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new zt() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new ct(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new zt() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new zt() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new zt() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new kt(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new zt() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new zt() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new zt() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new ct() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new zt() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new kt(0) },
      specularColor: { value: /* @__PURE__ */ new kt(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new zt() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new zt() },
      anisotropyVector: { value: /* @__PURE__ */ new ct() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new zt() }
    }
  ]),
  vertexShader: Vt.meshphysical_vert,
  fragmentShader: Vt.meshphysical_frag
};
const Li = { r: 0, b: 0, g: 0 }, dn = /* @__PURE__ */ new Ge(), Kc = /* @__PURE__ */ new ne();
function Jc(i, t, e, n, r, s, a) {
  const o = new kt(0);
  let l = s === !0 ? 0 : 1, u, c, f = null, h = 0, p = null;
  function g(T) {
    let C = T.isScene === !0 ? T.background : null;
    return C && C.isTexture && (C = (T.backgroundBlurriness > 0 ? e : t).get(C)), C;
  }
  function x(T) {
    let C = !1;
    const v = g(T);
    v === null ? d(o, l) : v && v.isColor && (d(v, 1), C = !0);
    const F = i.xr.getEnvironmentBlendMode();
    F === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : F === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || C) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function m(T, C) {
    const v = g(C);
    v && (v.isCubeTexture || v.mapping === 306) ? (c === void 0 && (c = new Ee(
      new kn(1, 1, 1),
      new on({
        name: "BackgroundCubeMaterial",
        uniforms: Bn(Be.backgroundCube.uniforms),
        vertexShader: Be.backgroundCube.vertexShader,
        fragmentShader: Be.backgroundCube.fragmentShader,
        side: 1,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), c.geometry.deleteAttribute("uv"), c.onBeforeRender = function(F, b, w) {
      this.matrixWorld.copyPosition(w.matrixWorld);
    }, Object.defineProperty(c.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(c)), dn.copy(C.backgroundRotation), dn.x *= -1, dn.y *= -1, dn.z *= -1, v.isCubeTexture && v.isRenderTargetTexture === !1 && (dn.y *= -1, dn.z *= -1), c.material.uniforms.envMap.value = v, c.material.uniforms.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === !1 ? -1 : 1, c.material.uniforms.backgroundBlurriness.value = C.backgroundBlurriness, c.material.uniforms.backgroundIntensity.value = C.backgroundIntensity, c.material.uniforms.backgroundRotation.value.setFromMatrix4(Kc.makeRotationFromEuler(dn)), c.material.toneMapped = qt.getTransfer(v.colorSpace) !== Jt, (f !== v || h !== v.version || p !== i.toneMapping) && (c.material.needsUpdate = !0, f = v, h = v.version, p = i.toneMapping), c.layers.enableAll(), T.unshift(c, c.geometry, c.material, 0, 0, null)) : v && v.isTexture && (u === void 0 && (u = new Ee(
      new Wn(2, 2),
      new on({
        name: "BackgroundMaterial",
        uniforms: Bn(Be.background.uniforms),
        vertexShader: Be.background.vertexShader,
        fragmentShader: Be.background.fragmentShader,
        side: 0,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), u.geometry.deleteAttribute("normal"), Object.defineProperty(u.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(u)), u.material.uniforms.t2D.value = v, u.material.uniforms.backgroundIntensity.value = C.backgroundIntensity, u.material.toneMapped = qt.getTransfer(v.colorSpace) !== Jt, v.matrixAutoUpdate === !0 && v.updateMatrix(), u.material.uniforms.uvTransform.value.copy(v.matrix), (f !== v || h !== v.version || p !== i.toneMapping) && (u.material.needsUpdate = !0, f = v, h = v.version, p = i.toneMapping), u.layers.enableAll(), T.unshift(u, u.geometry, u.material, 0, 0, null));
  }
  function d(T, C) {
    T.getRGB(Li, pa(i)), n.buffers.color.setClear(Li.r, Li.g, Li.b, C, a);
  }
  return {
    getClearColor: function() {
      return o;
    },
    setClearColor: function(T, C = 1) {
      o.set(T), l = C, d(o, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(T) {
      l = T, d(o, l);
    },
    render: x,
    addToRenderList: m
  };
}
function jc(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = h(null);
  let s = r, a = !1;
  function o(M, R, q, G, k) {
    let j = !1;
    const H = f(G, q, R);
    s !== H && (s = H, u(s.object)), j = p(M, G, q, k), j && g(M, G, q, k), k !== null && t.update(k, i.ELEMENT_ARRAY_BUFFER), (j || a) && (a = !1, v(M, R, q, G), k !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(k).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function u(M) {
    return i.bindVertexArray(M);
  }
  function c(M) {
    return i.deleteVertexArray(M);
  }
  function f(M, R, q) {
    const G = q.wireframe === !0;
    let k = n[M.id];
    k === void 0 && (k = {}, n[M.id] = k);
    let j = k[R.id];
    j === void 0 && (j = {}, k[R.id] = j);
    let H = j[G];
    return H === void 0 && (H = h(l()), j[G] = H), H;
  }
  function h(M) {
    const R = [], q = [], G = [];
    for (let k = 0; k < e; k++)
      R[k] = 0, q[k] = 0, G[k] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: R,
      enabledAttributes: q,
      attributeDivisors: G,
      object: M,
      attributes: {},
      index: null
    };
  }
  function p(M, R, q, G) {
    const k = s.attributes, j = R.attributes;
    let H = 0;
    const nt = q.getAttributes();
    for (const V in nt)
      if (nt[V].location >= 0) {
        const dt = k[V];
        let St = j[V];
        if (St === void 0 && (V === "instanceMatrix" && M.instanceMatrix && (St = M.instanceMatrix), V === "instanceColor" && M.instanceColor && (St = M.instanceColor)), dt === void 0 || dt.attribute !== St || St && dt.data !== St.data) return !0;
        H++;
      }
    return s.attributesNum !== H || s.index !== G;
  }
  function g(M, R, q, G) {
    const k = {}, j = R.attributes;
    let H = 0;
    const nt = q.getAttributes();
    for (const V in nt)
      if (nt[V].location >= 0) {
        let dt = j[V];
        dt === void 0 && (V === "instanceMatrix" && M.instanceMatrix && (dt = M.instanceMatrix), V === "instanceColor" && M.instanceColor && (dt = M.instanceColor));
        const St = {};
        St.attribute = dt, dt && dt.data && (St.data = dt.data), k[V] = St, H++;
      }
    s.attributes = k, s.attributesNum = H, s.index = G;
  }
  function x() {
    const M = s.newAttributes;
    for (let R = 0, q = M.length; R < q; R++)
      M[R] = 0;
  }
  function m(M) {
    d(M, 0);
  }
  function d(M, R) {
    const q = s.newAttributes, G = s.enabledAttributes, k = s.attributeDivisors;
    q[M] = 1, G[M] === 0 && (i.enableVertexAttribArray(M), G[M] = 1), k[M] !== R && (i.vertexAttribDivisor(M, R), k[M] = R);
  }
  function T() {
    const M = s.newAttributes, R = s.enabledAttributes;
    for (let q = 0, G = R.length; q < G; q++)
      R[q] !== M[q] && (i.disableVertexAttribArray(q), R[q] = 0);
  }
  function C(M, R, q, G, k, j, H) {
    H === !0 ? i.vertexAttribIPointer(M, R, q, k, j) : i.vertexAttribPointer(M, R, q, G, k, j);
  }
  function v(M, R, q, G) {
    x();
    const k = G.attributes, j = q.getAttributes(), H = R.defaultAttributeValues;
    for (const nt in j) {
      const V = j[nt];
      if (V.location >= 0) {
        let ot = k[nt];
        if (ot === void 0 && (nt === "instanceMatrix" && M.instanceMatrix && (ot = M.instanceMatrix), nt === "instanceColor" && M.instanceColor && (ot = M.instanceColor)), ot !== void 0) {
          const dt = ot.normalized, St = ot.itemSize, X = t.get(ot);
          if (X === void 0) continue;
          const lt = X.buffer, N = X.type, J = X.bytesPerElement, pt = N === i.INT || N === i.UNSIGNED_INT || ot.gpuType === 1013;
          if (ot.isInterleavedBufferAttribute) {
            const et = ot.data, Tt = et.stride, Dt = ot.offset;
            if (et.isInstancedInterleavedBuffer) {
              for (let Ut = 0; Ut < V.locationSize; Ut++)
                d(V.location + Ut, et.meshPerAttribute);
              M.isInstancedMesh !== !0 && G._maxInstanceCount === void 0 && (G._maxInstanceCount = et.meshPerAttribute * et.count);
            } else
              for (let Ut = 0; Ut < V.locationSize; Ut++)
                m(V.location + Ut);
            i.bindBuffer(i.ARRAY_BUFFER, lt);
            for (let Ut = 0; Ut < V.locationSize; Ut++)
              C(
                V.location + Ut,
                St / V.locationSize,
                N,
                dt,
                Tt * J,
                (Dt + St / V.locationSize * Ut) * J,
                pt
              );
          } else {
            if (ot.isInstancedBufferAttribute) {
              for (let et = 0; et < V.locationSize; et++)
                d(V.location + et, ot.meshPerAttribute);
              M.isInstancedMesh !== !0 && G._maxInstanceCount === void 0 && (G._maxInstanceCount = ot.meshPerAttribute * ot.count);
            } else
              for (let et = 0; et < V.locationSize; et++)
                m(V.location + et);
            i.bindBuffer(i.ARRAY_BUFFER, lt);
            for (let et = 0; et < V.locationSize; et++)
              C(
                V.location + et,
                St / V.locationSize,
                N,
                dt,
                St * J,
                St / V.locationSize * et * J,
                pt
              );
          }
        } else if (H !== void 0) {
          const dt = H[nt];
          if (dt !== void 0)
            switch (dt.length) {
              case 2:
                i.vertexAttrib2fv(V.location, dt);
                break;
              case 3:
                i.vertexAttrib3fv(V.location, dt);
                break;
              case 4:
                i.vertexAttrib4fv(V.location, dt);
                break;
              default:
                i.vertexAttrib1fv(V.location, dt);
            }
        }
      }
    }
    T();
  }
  function F() {
    P();
    for (const M in n) {
      const R = n[M];
      for (const q in R) {
        const G = R[q];
        for (const k in G)
          c(G[k].object), delete G[k];
        delete R[q];
      }
      delete n[M];
    }
  }
  function b(M) {
    if (n[M.id] === void 0) return;
    const R = n[M.id];
    for (const q in R) {
      const G = R[q];
      for (const k in G)
        c(G[k].object), delete G[k];
      delete R[q];
    }
    delete n[M.id];
  }
  function w(M) {
    for (const R in n) {
      const q = n[R];
      if (q[M.id] === void 0) continue;
      const G = q[M.id];
      for (const k in G)
        c(G[k].object), delete G[k];
      delete q[M.id];
    }
  }
  function P() {
    y(), a = !0, s !== r && (s = r, u(s.object));
  }
  function y() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: P,
    resetDefaultState: y,
    dispose: F,
    releaseStatesOfGeometry: b,
    releaseStatesOfProgram: w,
    initAttributes: x,
    enableAttribute: m,
    disableUnusedAttributes: T
  };
}
function Qc(i, t, e) {
  let n;
  function r(u) {
    n = u;
  }
  function s(u, c) {
    i.drawArrays(n, u, c), e.update(c, n, 1);
  }
  function a(u, c, f) {
    f !== 0 && (i.drawArraysInstanced(n, u, c, f), e.update(c, n, f));
  }
  function o(u, c, f) {
    if (f === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, u, 0, c, 0, f);
    let p = 0;
    for (let g = 0; g < f; g++)
      p += c[g];
    e.update(p, n, 1);
  }
  function l(u, c, f, h) {
    if (f === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null)
      for (let g = 0; g < u.length; g++)
        a(u[g], c[g], h[g]);
    else {
      p.multiDrawArraysInstancedWEBGL(n, u, 0, c, 0, h, 0, f);
      let g = 0;
      for (let x = 0; x < f; x++)
        g += c[x] * h[x];
      e.update(g, n, 1);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l;
}
function tu(i, t, e, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const w = t.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function a(w) {
    return !(w !== 1023 && n.convert(w) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(w) {
    const P = w === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(w !== 1009 && n.convert(w) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    w !== 1015 && !P);
  }
  function l(w) {
    if (w === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      w = "mediump";
    }
    return w === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let u = e.precision !== void 0 ? e.precision : "highp";
  const c = l(u);
  c !== u && (console.warn("THREE.WebGLRenderer:", u, "not supported, using", c, "instead."), u = c);
  const f = e.logarithmicDepthBuffer === !0, h = e.reverseDepthBuffer === !0 && t.has("EXT_clip_control"), p = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), x = i.getParameter(i.MAX_TEXTURE_SIZE), m = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), d = i.getParameter(i.MAX_VERTEX_ATTRIBS), T = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), C = i.getParameter(i.MAX_VARYING_VECTORS), v = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), F = g > 0, b = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: u,
    logarithmicDepthBuffer: f,
    reverseDepthBuffer: h,
    maxTextures: p,
    maxVertexTextures: g,
    maxTextureSize: x,
    maxCubemapSize: m,
    maxAttributes: d,
    maxVertexUniforms: T,
    maxVaryings: C,
    maxFragmentUniforms: v,
    vertexTextures: F,
    maxSamples: b
  };
}
function eu(i) {
  const t = this;
  let e = null, n = 0, r = !1, s = !1;
  const a = new mn(), o = new zt(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, h) {
    const p = f.length !== 0 || h || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = h, n = f.length, p;
  }, this.beginShadows = function() {
    s = !0, c(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(f, h) {
    e = c(f, h, 0);
  }, this.setState = function(f, h, p) {
    const g = f.clippingPlanes, x = f.clipIntersection, m = f.clipShadows, d = i.get(f);
    if (!r || g === null || g.length === 0 || s && !m)
      s ? c(null) : u();
    else {
      const T = s ? 0 : n, C = T * 4;
      let v = d.clippingState || null;
      l.value = v, v = c(g, h, C, p);
      for (let F = 0; F !== C; ++F)
        v[F] = e[F];
      d.clippingState = v, this.numIntersection = x ? this.numPlanes : 0, this.numPlanes += T;
    }
  };
  function u() {
    l.value !== e && (l.value = e, l.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function c(f, h, p, g) {
    const x = f !== null ? f.length : 0;
    let m = null;
    if (x !== 0) {
      if (m = l.value, g !== !0 || m === null) {
        const d = p + x * 4, T = h.matrixWorldInverse;
        o.getNormalMatrix(T), (m === null || m.length < d) && (m = new Float32Array(d));
        for (let C = 0, v = p; C !== x; ++C, v += 4)
          a.copy(f[C]).applyMatrix4(T, o), a.normal.toArray(m, v), m[v + 3] = a.constant;
      }
      l.value = m, l.needsUpdate = !0;
    }
    return t.numPlanes = x, t.numIntersection = 0, m;
  }
}
function nu(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(a, o) {
    return o === 303 ? a.mapping = 301 : o === 304 && (a.mapping = 302), a;
  }
  function n(a) {
    if (a && a.isTexture) {
      const o = a.mapping;
      if (o === 303 || o === 304)
        if (t.has(a)) {
          const l = t.get(a).texture;
          return e(l, a.mapping);
        } else {
          const l = a.image;
          if (l && l.height > 0) {
            const u = new fo(l.height);
            return u.fromEquirectangularTexture(i, a), t.set(a, u), a.addEventListener("dispose", r), e(u.texture, a.mapping);
          } else
            return null;
        }
    }
    return a;
  }
  function r(a) {
    const o = a.target;
    o.removeEventListener("dispose", r);
    const l = t.get(o);
    l !== void 0 && (t.delete(o), l.dispose());
  }
  function s() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: s
  };
}
class va extends ma {
  constructor(t = -1, e = 1, n = 1, r = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = r, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = t.view === null ? null : Object.assign({}, t.view), this;
  }
  setViewOffset(t, e, n, r, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = n - t, a = n + t, o = r + e, l = r - e;
    if (this.view !== null && this.view.enabled) {
      const u = (this.right - this.left) / this.view.fullWidth / this.zoom, c = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += u * this.view.offsetX, a = s + u * this.view.width, o -= c * this.view.offsetY, l = o - c * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
  }
}
const Nn = 4, Ss = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], _n = 20, pr = /* @__PURE__ */ new va(), Cs = /* @__PURE__ */ new kt();
let mr = null, gr = 0, _r = 0, vr = !1;
const gn = (1 + Math.sqrt(5)) / 2, In = 1 / gn, ys = [
  /* @__PURE__ */ new L(-gn, In, 0),
  /* @__PURE__ */ new L(gn, In, 0),
  /* @__PURE__ */ new L(-In, 0, gn),
  /* @__PURE__ */ new L(In, 0, gn),
  /* @__PURE__ */ new L(0, gn, -In),
  /* @__PURE__ */ new L(0, gn, In),
  /* @__PURE__ */ new L(-1, 1, -1),
  /* @__PURE__ */ new L(1, 1, -1),
  /* @__PURE__ */ new L(-1, 1, 1),
  /* @__PURE__ */ new L(1, 1, 1)
];
class Es {
  constructor(t) {
    this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(t, e = 0, n = 0.1, r = 100) {
    mr = this._renderer.getRenderTarget(), gr = this._renderer.getActiveCubeFace(), _r = this._renderer.getActiveMipmapLevel(), vr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const s = this._allocateTargets();
    return s.depthBuffer = !0, this._sceneToCubeUV(t, n, r, s), e > 0 && this._blur(s, 0, 0, e), this._applyPMREM(s), this._cleanup(s), s;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = bs(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = As(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(t) {
    this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let t = 0; t < this._lodPlanes.length; t++)
      this._lodPlanes[t].dispose();
  }
  _cleanup(t) {
    this._renderer.setRenderTarget(mr, gr, _r), this._renderer.xr.enabled = vr, t.scissorTest = !1, Pi(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === 301 || t.mapping === 302 ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), mr = this._renderer.getRenderTarget(), gr = this._renderer.getActiveCubeFace(), _r = this._renderer.getActiveMipmapLevel(), vr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = {
      magFilter: 1006,
      minFilter: 1006,
      generateMipmaps: !1,
      type: 1016,
      format: 1023,
      colorSpace: zn,
      depthBuffer: !1
    }, r = Ts(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Ts(t, e, n);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = iu(s)), this._blurMaterial = ru(s, t, e);
    }
    return r;
  }
  _compileMaterial(t) {
    const e = new Ee(this._lodPlanes[0], t);
    this._renderer.compile(e, pr);
  }
  _sceneToCubeUV(t, e, n, r) {
    const o = new we(90, 1, e, n), l = [1, -1, 1, 1, 1, 1], u = [1, 1, 1, -1, -1, -1], c = this._renderer, f = c.autoClear, h = c.toneMapping;
    c.getClearColor(Cs), c.toneMapping = 0, c.autoClear = !1;
    const p = new Ur({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    }), g = new Ee(new kn(), p);
    let x = !1;
    const m = t.background;
    m ? m.isColor && (p.color.copy(m), t.background = null, x = !0) : (p.color.copy(Cs), x = !0);
    for (let d = 0; d < 6; d++) {
      const T = d % 3;
      T === 0 ? (o.up.set(0, l[d], 0), o.lookAt(u[d], 0, 0)) : T === 1 ? (o.up.set(0, 0, l[d]), o.lookAt(0, u[d], 0)) : (o.up.set(0, l[d], 0), o.lookAt(0, 0, u[d]));
      const C = this._cubeSize;
      Pi(r, T * C, d > 2 ? C : 0, C, C), c.setRenderTarget(r), x && c.render(g, o), c.render(t, o);
    }
    g.geometry.dispose(), g.material.dispose(), c.toneMapping = h, c.autoClear = f, t.background = m;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer, r = t.mapping === 301 || t.mapping === 302;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = bs()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = As());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, a = new Ee(this._lodPlanes[0], s), o = s.uniforms;
    o.envMap.value = t;
    const l = this._cubeSize;
    Pi(e, 0, 0, 3 * l, 2 * l), n.setRenderTarget(e), n.render(a, pr);
  }
  _applyPMREM(t) {
    const e = this._renderer, n = e.autoClear;
    e.autoClear = !1;
    const r = this._lodPlanes.length;
    for (let s = 1; s < r; s++) {
      const a = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), o = ys[(r - s - 1) % ys.length];
      this._blur(t, s - 1, s, a, o);
    }
    e.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(t, e, n, r, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      t,
      a,
      e,
      n,
      r,
      "latitudinal",
      s
    ), this._halfBlur(
      a,
      t,
      n,
      n,
      r,
      "longitudinal",
      s
    );
  }
  _halfBlur(t, e, n, r, s, a, o) {
    const l = this._renderer, u = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const c = 3, f = new Ee(this._lodPlanes[r], u), h = u.uniforms, p = this._sizeLods[n] - 1, g = isFinite(s) ? Math.PI / (2 * p) : 2 * Math.PI / (2 * _n - 1), x = s / g, m = isFinite(s) ? 1 + Math.floor(c * x) : _n;
    m > _n && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${_n}`);
    const d = [];
    let T = 0;
    for (let w = 0; w < _n; ++w) {
      const P = w / x, y = Math.exp(-P * P / 2);
      d.push(y), w === 0 ? T += y : w < m && (T += 2 * y);
    }
    for (let w = 0; w < d.length; w++)
      d[w] = d[w] / T;
    h.envMap.value = t.texture, h.samples.value = m, h.weights.value = d, h.latitudinal.value = a === "latitudinal", o && (h.poleAxis.value = o);
    const { _lodMax: C } = this;
    h.dTheta.value = g, h.mipInt.value = C - n;
    const v = this._sizeLods[r], F = 3 * v * (r > C - Nn ? r - C + Nn : 0), b = 4 * (this._cubeSize - v);
    Pi(e, F, b, 3 * v, 2 * v), l.setRenderTarget(e), l.render(f, pr);
  }
}
function iu(i) {
  const t = [], e = [], n = [];
  let r = i;
  const s = i - Nn + 1 + Ss.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    e.push(o);
    let l = 1 / o;
    a > i - Nn ? l = Ss[a - i + Nn - 1] : a === 0 && (l = 0), n.push(l);
    const u = 1 / (o - 2), c = -u, f = 1 + u, h = [c, c, f, c, f, f, c, c, f, f, c, f], p = 6, g = 6, x = 3, m = 2, d = 1, T = new Float32Array(x * g * p), C = new Float32Array(m * g * p), v = new Float32Array(d * g * p);
    for (let b = 0; b < p; b++) {
      const w = b % 3 * 2 / 3 - 1, P = b > 2 ? 0 : -1, y = [
        w,
        P,
        0,
        w + 2 / 3,
        P,
        0,
        w + 2 / 3,
        P + 1,
        0,
        w,
        P,
        0,
        w + 2 / 3,
        P + 1,
        0,
        w,
        P + 1,
        0
      ];
      T.set(y, x * g * b), C.set(h, m * g * b);
      const M = [b, b, b, b, b, b];
      v.set(M, d * g * b);
    }
    const F = new Ve();
    F.setAttribute("position", new Fe(T, x)), F.setAttribute("uv", new Fe(C, m)), F.setAttribute("faceIndex", new Fe(v, d)), t.push(F), r > Nn && r--;
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function Ts(i, t, e) {
  const n = new xn(i, t, e);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function Pi(i, t, e, n, r) {
  i.viewport.set(t, e, n, r), i.scissor.set(t, e, n, r);
}
function ru(i, t, e) {
  const n = new Float32Array(_n), r = new L(0, 1, 0);
  return new on({
    name: "SphericalGaussianBlur",
    defines: {
      n: _n,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / e,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: Nr(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function As() {
  return new on({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Nr(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function bs() {
  return new on({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Nr(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Nr() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function su(i) {
  let t = /* @__PURE__ */ new WeakMap(), e = null;
  function n(o) {
    if (o && o.isTexture) {
      const l = o.mapping, u = l === 303 || l === 304, c = l === 301 || l === 302;
      if (u || c) {
        let f = t.get(o);
        const h = f !== void 0 ? f.texture.pmremVersion : 0;
        if (o.isRenderTargetTexture && o.pmremVersion !== h)
          return e === null && (e = new Es(i)), f = u ? e.fromEquirectangular(o, f) : e.fromCubemap(o, f), f.texture.pmremVersion = o.pmremVersion, t.set(o, f), f.texture;
        if (f !== void 0)
          return f.texture;
        {
          const p = o.image;
          return u && p && p.height > 0 || c && p && r(p) ? (e === null && (e = new Es(i)), f = u ? e.fromEquirectangular(o) : e.fromCubemap(o), f.texture.pmremVersion = o.pmremVersion, t.set(o, f), o.addEventListener("dispose", s), f.texture) : null;
        }
      }
    }
    return o;
  }
  function r(o) {
    let l = 0;
    const u = 6;
    for (let c = 0; c < u; c++)
      o[c] !== void 0 && l++;
    return l === u;
  }
  function s(o) {
    const l = o.target;
    l.removeEventListener("dispose", s);
    const u = t.get(l);
    u !== void 0 && (t.delete(l), u.dispose());
  }
  function a() {
    t = /* @__PURE__ */ new WeakMap(), e !== null && (e.dispose(), e = null);
  }
  return {
    get: n,
    dispose: a
  };
}
function au(i) {
  const t = {};
  function e(n) {
    if (t[n] !== void 0)
      return t[n];
    let r;
    switch (n) {
      case "WEBGL_depth_texture":
        r = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = i.getExtension(n);
    }
    return t[n] = r, r;
  }
  return {
    has: function(n) {
      return e(n) !== null;
    },
    init: function() {
      e("EXT_color_buffer_float"), e("WEBGL_clip_cull_distance"), e("OES_texture_float_linear"), e("EXT_color_buffer_half_float"), e("WEBGL_multisampled_render_to_texture"), e("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const r = e(n);
      return r === null && ei("THREE.WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function ou(i, t, e, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(f) {
    const h = f.target;
    h.index !== null && t.remove(h.index);
    for (const g in h.attributes)
      t.remove(h.attributes[g]);
    for (const g in h.morphAttributes) {
      const x = h.morphAttributes[g];
      for (let m = 0, d = x.length; m < d; m++)
        t.remove(x[m]);
    }
    h.removeEventListener("dispose", a), delete r[h.id];
    const p = s.get(h);
    p && (t.remove(p), s.delete(h)), n.releaseStatesOfGeometry(h), h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount, e.memory.geometries--;
  }
  function o(f, h) {
    return r[h.id] === !0 || (h.addEventListener("dispose", a), r[h.id] = !0, e.memory.geometries++), h;
  }
  function l(f) {
    const h = f.attributes;
    for (const g in h)
      t.update(h[g], i.ARRAY_BUFFER);
    const p = f.morphAttributes;
    for (const g in p) {
      const x = p[g];
      for (let m = 0, d = x.length; m < d; m++)
        t.update(x[m], i.ARRAY_BUFFER);
    }
  }
  function u(f) {
    const h = [], p = f.index, g = f.attributes.position;
    let x = 0;
    if (p !== null) {
      const T = p.array;
      x = p.version;
      for (let C = 0, v = T.length; C < v; C += 3) {
        const F = T[C + 0], b = T[C + 1], w = T[C + 2];
        h.push(F, b, b, w, w, F);
      }
    } else if (g !== void 0) {
      const T = g.array;
      x = g.version;
      for (let C = 0, v = T.length / 3 - 1; C < v; C += 3) {
        const F = C + 0, b = C + 1, w = C + 2;
        h.push(F, b, b, w, w, F);
      }
    } else
      return;
    const m = new (oa(h) ? da : fa)(h, 1);
    m.version = x;
    const d = s.get(f);
    d && t.remove(d), s.set(f, m);
  }
  function c(f) {
    const h = s.get(f);
    if (h) {
      const p = f.index;
      p !== null && h.version < p.version && u(f);
    } else
      u(f);
    return s.get(f);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: c
  };
}
function lu(i, t, e) {
  let n;
  function r(h) {
    n = h;
  }
  let s, a;
  function o(h) {
    s = h.type, a = h.bytesPerElement;
  }
  function l(h, p) {
    i.drawElements(n, p, s, h * a), e.update(p, n, 1);
  }
  function u(h, p, g) {
    g !== 0 && (i.drawElementsInstanced(n, p, s, h * a, g), e.update(p, n, g));
  }
  function c(h, p, g) {
    if (g === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, p, 0, s, h, 0, g);
    let m = 0;
    for (let d = 0; d < g; d++)
      m += p[d];
    e.update(m, n, 1);
  }
  function f(h, p, g, x) {
    if (g === 0) return;
    const m = t.get("WEBGL_multi_draw");
    if (m === null)
      for (let d = 0; d < h.length; d++)
        u(h[d] / a, p[d], x[d]);
    else {
      m.multiDrawElementsInstancedWEBGL(n, p, 0, s, h, 0, x, 0, g);
      let d = 0;
      for (let T = 0; T < g; T++)
        d += p[T] * x[T];
      e.update(d, n, 1);
    }
  }
  this.setMode = r, this.setIndex = o, this.render = l, this.renderInstances = u, this.renderMultiDraw = c, this.renderMultiDrawInstances = f;
}
function cu(i) {
  const t = {
    geometries: 0,
    textures: 0
  }, e = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, a, o) {
    switch (e.calls++, a) {
      case i.TRIANGLES:
        e.triangles += o * (s / 3);
        break;
      case i.LINES:
        e.lines += o * (s / 2);
        break;
      case i.LINE_STRIP:
        e.lines += o * (s - 1);
        break;
      case i.LINE_LOOP:
        e.lines += o * s;
        break;
      case i.POINTS:
        e.points += o * s;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0;
  }
  return {
    memory: t,
    render: e,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function uu(i, t, e) {
  const n = /* @__PURE__ */ new WeakMap(), r = new se();
  function s(a, o, l) {
    const u = a.morphTargetInfluences, c = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, f = c !== void 0 ? c.length : 0;
    let h = n.get(o);
    if (h === void 0 || h.count !== f) {
      let y = function() {
        w.dispose(), n.delete(o), o.removeEventListener("dispose", y);
      };
      h !== void 0 && h.texture.dispose();
      const p = o.morphAttributes.position !== void 0, g = o.morphAttributes.normal !== void 0, x = o.morphAttributes.color !== void 0, m = o.morphAttributes.position || [], d = o.morphAttributes.normal || [], T = o.morphAttributes.color || [];
      let C = 0;
      p === !0 && (C = 1), g === !0 && (C = 2), x === !0 && (C = 3);
      let v = o.attributes.position.count * C, F = 1;
      v > t.maxTextureSize && (F = Math.ceil(v / t.maxTextureSize), v = t.maxTextureSize);
      const b = new Float32Array(v * F * 4 * f), w = new ca(b, v, F, f);
      w.type = 1015, w.needsUpdate = !0;
      const P = C * 4;
      for (let M = 0; M < f; M++) {
        const R = m[M], q = d[M], G = T[M], k = v * F * 4 * M;
        for (let j = 0; j < R.count; j++) {
          const H = j * P;
          p === !0 && (r.fromBufferAttribute(R, j), b[k + H + 0] = r.x, b[k + H + 1] = r.y, b[k + H + 2] = r.z, b[k + H + 3] = 0), g === !0 && (r.fromBufferAttribute(q, j), b[k + H + 4] = r.x, b[k + H + 5] = r.y, b[k + H + 6] = r.z, b[k + H + 7] = 0), x === !0 && (r.fromBufferAttribute(G, j), b[k + H + 8] = r.x, b[k + H + 9] = r.y, b[k + H + 10] = r.z, b[k + H + 11] = G.itemSize === 4 ? r.w : 1);
        }
      }
      h = {
        count: f,
        texture: w,
        size: new ct(v, F)
      }, n.set(o, h), o.addEventListener("dispose", y);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", a.morphTexture, e);
    else {
      let p = 0;
      for (let x = 0; x < u.length; x++)
        p += u[x];
      const g = o.morphTargetsRelative ? 1 : 1 - p;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", g), l.getUniforms().setValue(i, "morphTargetInfluences", u);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", h.texture, e), l.getUniforms().setValue(i, "morphTargetsTextureSize", h.size);
  }
  return {
    update: s
  };
}
function hu(i, t, e, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    const u = n.render.frame, c = l.geometry, f = t.get(l, c);
    if (r.get(f) !== u && (t.update(f), r.set(f, u)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === !1 && l.addEventListener("dispose", o), r.get(l) !== u && (e.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && e.update(l.instanceColor, i.ARRAY_BUFFER), r.set(l, u))), l.isSkinnedMesh) {
      const h = l.skeleton;
      r.get(h) !== u && (h.update(), r.set(h, u));
    }
    return f;
  }
  function a() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function o(l) {
    const u = l.target;
    u.removeEventListener("dispose", o), e.remove(u.instanceMatrix), u.instanceColor !== null && e.remove(u.instanceColor);
  }
  return {
    update: s,
    dispose: a
  };
}
class xa extends ve {
  constructor(t, e, n, r, s, a, o, l, u, c = 1026) {
    if (c !== 1026 && c !== 1027)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && c === 1026 && (n = 1014), n === void 0 && c === 1027 && (n = 1020), super(null, r, s, a, o, l, c, n, u), this.isDepthTexture = !0, this.image = { width: t, height: e }, this.magFilter = o !== void 0 ? o : 1003, this.minFilter = l !== void 0 ? l : 1003, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
const Ma = /* @__PURE__ */ new ve(), ws = /* @__PURE__ */ new xa(1, 1), Sa = /* @__PURE__ */ new ca(), Ca = /* @__PURE__ */ new $a(), ya = /* @__PURE__ */ new ga(), Rs = [], Ls = [], Ps = new Float32Array(16), Ds = new Float32Array(9), Us = new Float32Array(4);
function Xn(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = t * e;
  let s = Rs[r];
  if (s === void 0 && (s = new Float32Array(r), Rs[r] = s), t !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== t; ++a)
      o += e, i[a].toArray(s, o);
  }
  return s;
}
function oe(i, t) {
  if (i.length !== t.length) return !1;
  for (let e = 0, n = i.length; e < n; e++)
    if (i[e] !== t[e]) return !1;
  return !0;
}
function le(i, t) {
  for (let e = 0, n = t.length; e < n; e++)
    i[e] = t[e];
}
function Hi(i, t) {
  let e = Ls[t];
  e === void 0 && (e = new Int32Array(t), Ls[t] = e);
  for (let n = 0; n !== t; ++n)
    e[n] = i.allocateTextureUnit();
  return e;
}
function fu(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
}
function du(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (oe(e, t)) return;
    i.uniform2fv(this.addr, t), le(e, t);
  }
}
function pu(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
  else {
    if (oe(e, t)) return;
    i.uniform3fv(this.addr, t), le(e, t);
  }
}
function mu(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (oe(e, t)) return;
    i.uniform4fv(this.addr, t), le(e, t);
  }
}
function gu(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (oe(e, t)) return;
    i.uniformMatrix2fv(this.addr, !1, t), le(e, t);
  } else {
    if (oe(e, n)) return;
    Us.set(n), i.uniformMatrix2fv(this.addr, !1, Us), le(e, n);
  }
}
function _u(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (oe(e, t)) return;
    i.uniformMatrix3fv(this.addr, !1, t), le(e, t);
  } else {
    if (oe(e, n)) return;
    Ds.set(n), i.uniformMatrix3fv(this.addr, !1, Ds), le(e, n);
  }
}
function vu(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (oe(e, t)) return;
    i.uniformMatrix4fv(this.addr, !1, t), le(e, t);
  } else {
    if (oe(e, n)) return;
    Ps.set(n), i.uniformMatrix4fv(this.addr, !1, Ps), le(e, n);
  }
}
function xu(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
}
function Mu(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (oe(e, t)) return;
    i.uniform2iv(this.addr, t), le(e, t);
  }
}
function Su(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (oe(e, t)) return;
    i.uniform3iv(this.addr, t), le(e, t);
  }
}
function Cu(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (oe(e, t)) return;
    i.uniform4iv(this.addr, t), le(e, t);
  }
}
function yu(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
}
function Eu(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (oe(e, t)) return;
    i.uniform2uiv(this.addr, t), le(e, t);
  }
}
function Tu(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (oe(e, t)) return;
    i.uniform3uiv(this.addr, t), le(e, t);
  }
}
function Au(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (oe(e, t)) return;
    i.uniform4uiv(this.addr, t), le(e, t);
  }
}
function bu(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (ws.compareFunction = 515, s = ws) : s = Ma, e.setTexture2D(t || s, r);
}
function wu(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTexture3D(t || Ca, r);
}
function Ru(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTextureCube(t || ya, r);
}
function Lu(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTexture2DArray(t || Sa, r);
}
function Pu(i) {
  switch (i) {
    case 5126:
      return fu;
    // FLOAT
    case 35664:
      return du;
    // _VEC2
    case 35665:
      return pu;
    // _VEC3
    case 35666:
      return mu;
    // _VEC4
    case 35674:
      return gu;
    // _MAT2
    case 35675:
      return _u;
    // _MAT3
    case 35676:
      return vu;
    // _MAT4
    case 5124:
    case 35670:
      return xu;
    // INT, BOOL
    case 35667:
    case 35671:
      return Mu;
    // _VEC2
    case 35668:
    case 35672:
      return Su;
    // _VEC3
    case 35669:
    case 35673:
      return Cu;
    // _VEC4
    case 5125:
      return yu;
    // UINT
    case 36294:
      return Eu;
    // _VEC2
    case 36295:
      return Tu;
    // _VEC3
    case 36296:
      return Au;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return bu;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return wu;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Ru;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return Lu;
  }
}
function Du(i, t) {
  i.uniform1fv(this.addr, t);
}
function Uu(i, t) {
  const e = Xn(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function Iu(i, t) {
  const e = Xn(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function Nu(i, t) {
  const e = Xn(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function Fu(i, t) {
  const e = Xn(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, e);
}
function Ou(i, t) {
  const e = Xn(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, e);
}
function Bu(i, t) {
  const e = Xn(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, e);
}
function zu(i, t) {
  i.uniform1iv(this.addr, t);
}
function Gu(i, t) {
  i.uniform2iv(this.addr, t);
}
function Vu(i, t) {
  i.uniform3iv(this.addr, t);
}
function Hu(i, t) {
  i.uniform4iv(this.addr, t);
}
function ku(i, t) {
  i.uniform1uiv(this.addr, t);
}
function Wu(i, t) {
  i.uniform2uiv(this.addr, t);
}
function Xu(i, t) {
  i.uniform3uiv(this.addr, t);
}
function qu(i, t) {
  i.uniform4uiv(this.addr, t);
}
function Yu(i, t, e) {
  const n = this.cache, r = t.length, s = Hi(e, r);
  oe(n, s) || (i.uniform1iv(this.addr, s), le(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTexture2D(t[a] || Ma, s[a]);
}
function Zu(i, t, e) {
  const n = this.cache, r = t.length, s = Hi(e, r);
  oe(n, s) || (i.uniform1iv(this.addr, s), le(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTexture3D(t[a] || Ca, s[a]);
}
function $u(i, t, e) {
  const n = this.cache, r = t.length, s = Hi(e, r);
  oe(n, s) || (i.uniform1iv(this.addr, s), le(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTextureCube(t[a] || ya, s[a]);
}
function Ku(i, t, e) {
  const n = this.cache, r = t.length, s = Hi(e, r);
  oe(n, s) || (i.uniform1iv(this.addr, s), le(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTexture2DArray(t[a] || Sa, s[a]);
}
function Ju(i) {
  switch (i) {
    case 5126:
      return Du;
    // FLOAT
    case 35664:
      return Uu;
    // _VEC2
    case 35665:
      return Iu;
    // _VEC3
    case 35666:
      return Nu;
    // _VEC4
    case 35674:
      return Fu;
    // _MAT2
    case 35675:
      return Ou;
    // _MAT3
    case 35676:
      return Bu;
    // _MAT4
    case 5124:
    case 35670:
      return zu;
    // INT, BOOL
    case 35667:
    case 35671:
      return Gu;
    // _VEC2
    case 35668:
    case 35672:
      return Vu;
    // _VEC3
    case 35669:
    case 35673:
      return Hu;
    // _VEC4
    case 5125:
      return ku;
    // UINT
    case 36294:
      return Wu;
    // _VEC2
    case 36295:
      return Xu;
    // _VEC3
    case 36296:
      return qu;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return Yu;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Zu;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return $u;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return Ku;
  }
}
class ju {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = Pu(e.type);
  }
}
class Qu {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = Ju(e.type);
  }
}
class th {
  constructor(t) {
    this.id = t, this.seq = [], this.map = {};
  }
  setValue(t, e, n) {
    const r = this.seq;
    for (let s = 0, a = r.length; s !== a; ++s) {
      const o = r[s];
      o.setValue(t, e[o.id], n);
    }
  }
}
const xr = /(\w+)(\])?(\[|\.)?/g;
function Is(i, t) {
  i.seq.push(t), i.map[t.id] = t;
}
function eh(i, t, e) {
  const n = i.name, r = n.length;
  for (xr.lastIndex = 0; ; ) {
    const s = xr.exec(n), a = xr.lastIndex;
    let o = s[1];
    const l = s[2] === "]", u = s[3];
    if (l && (o = o | 0), u === void 0 || u === "[" && a + 2 === r) {
      Is(e, u === void 0 ? new ju(o, i, t) : new Qu(o, i, t));
      break;
    } else {
      let f = e.map[o];
      f === void 0 && (f = new th(o), Is(e, f)), e = f;
    }
  }
}
class Bi {
  constructor(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const s = t.getActiveUniform(e, r), a = t.getUniformLocation(e, s.name);
      eh(s, a, this);
    }
  }
  setValue(t, e, n, r) {
    const s = this.map[e];
    s !== void 0 && s.setValue(t, n, r);
  }
  setOptional(t, e, n) {
    const r = e[n];
    r !== void 0 && this.setValue(t, n, r);
  }
  static upload(t, e, n, r) {
    for (let s = 0, a = e.length; s !== a; ++s) {
      const o = e[s], l = n[o.id];
      l.needsUpdate !== !1 && o.setValue(t, l.value, r);
    }
  }
  static seqWithValue(t, e) {
    const n = [];
    for (let r = 0, s = t.length; r !== s; ++r) {
      const a = t[r];
      a.id in e && n.push(a);
    }
    return n;
  }
}
function Ns(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const nh = 37297;
let ih = 0;
function rh(i, t) {
  const e = i.split(`
`), n = [], r = Math.max(t - 6, 0), s = Math.min(t + 6, e.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    n.push(`${o === t ? ">" : " "} ${o}: ${e[a]}`);
  }
  return n.join(`
`);
}
const Fs = /* @__PURE__ */ new zt();
function sh(i) {
  qt._getMatrix(Fs, qt.workingColorSpace, i);
  const t = `mat3( ${Fs.elements.map((e) => e.toFixed(4))} )`;
  switch (qt.getTransfer(i)) {
    case Vi:
      return [t, "LinearTransferOETF"];
    case Jt:
      return [t, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [t, "LinearTransferOETF"];
  }
}
function Os(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS), r = i.getShaderInfoLog(t).trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const a = parseInt(s[1]);
    return e.toUpperCase() + `

` + r + `

` + rh(i.getShaderSource(t), a);
  } else
    return r;
}
function ah(i, t) {
  const e = sh(t);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function oh(i, t) {
  let e;
  switch (t) {
    case 1:
      e = "Linear";
      break;
    case 2:
      e = "Reinhard";
      break;
    case 3:
      e = "Cineon";
      break;
    case 4:
      e = "ACESFilmic";
      break;
    case 6:
      e = "AgX";
      break;
    case 7:
      e = "Neutral";
      break;
    case 5:
      e = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
const Di = /* @__PURE__ */ new L();
function lh() {
  qt.getLuminanceCoefficients(Di);
  const i = Di.x.toFixed(4), t = Di.y.toFixed(4), e = Di.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function ch(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(ni).join(`
`);
}
function uh(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== !1 && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function hh(i, t) {
  const e = {}, n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = i.getActiveAttrib(t, r), a = s.name;
    let o = 1;
    s.type === i.FLOAT_MAT2 && (o = 2), s.type === i.FLOAT_MAT3 && (o = 3), s.type === i.FLOAT_MAT4 && (o = 4), e[a] = {
      type: s.type,
      location: i.getAttribLocation(t, a),
      locationSize: o
    };
  }
  return e;
}
function ni(i) {
  return i !== "";
}
function Bs(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function zs(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const fh = /^[ \t]*#include +<([\w\d./]+)>/gm;
function wr(i) {
  return i.replace(fh, ph);
}
const dh = /* @__PURE__ */ new Map();
function ph(i, t) {
  let e = Vt[t];
  if (e === void 0) {
    const n = dh.get(t);
    if (n !== void 0)
      e = Vt[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else
      throw new Error("Can not resolve #include <" + t + ">");
  }
  return wr(e);
}
const mh = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Gs(i) {
  return i.replace(mh, gh);
}
function gh(i, t, e, n) {
  let r = "";
  for (let s = parseInt(t); s < parseInt(e); s++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function Vs(i) {
  let t = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? t += `
#define HIGH_PRECISION` : i.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
}
function _h(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === 1 ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === 2 ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === 3 && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function vh(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case 301:
      case 302:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case 306:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return t;
}
function xh(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case 302:
        t = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return t;
}
function Mh(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case 0:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case 1:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case 2:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
  return t;
}
function Sh(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2, n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 112)), texelHeight: n, maxMip: e };
}
function Ch(i, t, e, n) {
  const r = i.getContext(), s = e.defines;
  let a = e.vertexShader, o = e.fragmentShader;
  const l = _h(e), u = vh(e), c = xh(e), f = Mh(e), h = Sh(e), p = ch(e), g = uh(s), x = r.createProgram();
  let m, d, T = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
  e.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g
  ].filter(ni).join(`
`), m.length > 0 && (m += `
`), d = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g
  ].filter(ni).join(`
`), d.length > 0 && (d += `
`)) : (m = [
    Vs(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g,
    e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    e.batching ? "#define USE_BATCHING" : "",
    e.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    e.instancing ? "#define USE_INSTANCING" : "",
    e.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.map ? "#define USE_MAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + c : "",
    e.lightMap ? "#define USE_LIGHTMAP" : "",
    e.aoMap ? "#define USE_AOMAP" : "",
    e.bumpMap ? "#define USE_BUMPMAP" : "",
    e.normalMap ? "#define USE_NORMALMAP" : "",
    e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    e.anisotropy ? "#define USE_ANISOTROPY" : "",
    e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    e.specularMap ? "#define USE_SPECULARMAP" : "",
    e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    e.metalnessMap ? "#define USE_METALNESSMAP" : "",
    e.alphaMap ? "#define USE_ALPHAMAP" : "",
    e.alphaHash ? "#define USE_ALPHAHASH" : "",
    e.transmission ? "#define USE_TRANSMISSION" : "",
    e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    e.mapUv ? "#define MAP_UV " + e.mapUv : "",
    e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "",
    e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "",
    e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "",
    e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "",
    e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "",
    e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "",
    e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "",
    e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "",
    e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "",
    e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "",
    e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "",
    e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "",
    e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "",
    e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "",
    e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "",
    e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "",
    e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "",
    e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "",
    e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "",
    e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "",
    e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "",
    e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "",
    //
    e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
    e.vertexColors ? "#define USE_COLOR" : "",
    e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    e.vertexUv1s ? "#define USE_UV1" : "",
    e.vertexUv2s ? "#define USE_UV2" : "",
    e.vertexUv3s ? "#define USE_UV3" : "",
    e.pointsUvs ? "#define USE_POINTS_UV" : "",
    e.flatShading ? "#define FLAT_SHADED" : "",
    e.skinning ? "#define USE_SKINNING" : "",
    e.morphTargets ? "#define USE_MORPHTARGETS" : "",
    e.morphNormals && e.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    e.morphColors ? "#define USE_MORPHCOLORS" : "",
    e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "",
    e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "",
    e.doubleSided ? "#define DOUBLE_SIDED" : "",
    e.flipSided ? "#define FLIP_SIDED" : "",
    e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    e.shadowMapEnabled ? "#define " + l : "",
    e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(ni).join(`
`), d = [
    Vs(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g,
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    e.map ? "#define USE_MAP" : "",
    e.matcap ? "#define USE_MATCAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + u : "",
    e.envMap ? "#define " + c : "",
    e.envMap ? "#define " + f : "",
    h ? "#define CUBEUV_TEXEL_WIDTH " + h.texelWidth : "",
    h ? "#define CUBEUV_TEXEL_HEIGHT " + h.texelHeight : "",
    h ? "#define CUBEUV_MAX_MIP " + h.maxMip + ".0" : "",
    e.lightMap ? "#define USE_LIGHTMAP" : "",
    e.aoMap ? "#define USE_AOMAP" : "",
    e.bumpMap ? "#define USE_BUMPMAP" : "",
    e.normalMap ? "#define USE_NORMALMAP" : "",
    e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    e.anisotropy ? "#define USE_ANISOTROPY" : "",
    e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    e.clearcoat ? "#define USE_CLEARCOAT" : "",
    e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    e.dispersion ? "#define USE_DISPERSION" : "",
    e.iridescence ? "#define USE_IRIDESCENCE" : "",
    e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    e.specularMap ? "#define USE_SPECULARMAP" : "",
    e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    e.metalnessMap ? "#define USE_METALNESSMAP" : "",
    e.alphaMap ? "#define USE_ALPHAMAP" : "",
    e.alphaTest ? "#define USE_ALPHATEST" : "",
    e.alphaHash ? "#define USE_ALPHAHASH" : "",
    e.sheen ? "#define USE_SHEEN" : "",
    e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    e.transmission ? "#define USE_TRANSMISSION" : "",
    e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
    e.vertexColors || e.instancingColor || e.batchingColor ? "#define USE_COLOR" : "",
    e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    e.vertexUv1s ? "#define USE_UV1" : "",
    e.vertexUv2s ? "#define USE_UV2" : "",
    e.vertexUv3s ? "#define USE_UV3" : "",
    e.pointsUvs ? "#define USE_POINTS_UV" : "",
    e.gradientMap ? "#define USE_GRADIENTMAP" : "",
    e.flatShading ? "#define FLAT_SHADED" : "",
    e.doubleSided ? "#define DOUBLE_SIDED" : "",
    e.flipSided ? "#define FLIP_SIDED" : "",
    e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    e.shadowMapEnabled ? "#define " + l : "",
    e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    e.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    e.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    e.toneMapping !== 0 ? Vt.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    e.toneMapping !== 0 ? oh("toneMapping", e.toneMapping) : "",
    e.dithering ? "#define DITHERING" : "",
    e.opaque ? "#define OPAQUE" : "",
    Vt.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    ah("linearToOutputTexel", e.outputColorSpace),
    lh(),
    e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
    `
`
  ].filter(ni).join(`
`)), a = wr(a), a = Bs(a, e), a = zs(a, e), o = wr(o), o = Bs(o, e), o = zs(o, e), a = Gs(a), o = Gs(o), e.isRawShaderMaterial !== !0 && (T = `#version 300 es
`, m = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, d = [
    "#define varying in",
    e.glslVersion === ts ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    e.glslVersion === ts ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + d);
  const C = T + m + a, v = T + d + o, F = Ns(r, r.VERTEX_SHADER, C), b = Ns(r, r.FRAGMENT_SHADER, v);
  r.attachShader(x, F), r.attachShader(x, b), e.index0AttributeName !== void 0 ? r.bindAttribLocation(x, 0, e.index0AttributeName) : e.morphTargets === !0 && r.bindAttribLocation(x, 0, "position"), r.linkProgram(x);
  function w(R) {
    if (i.debug.checkShaderErrors) {
      const q = r.getProgramInfoLog(x).trim(), G = r.getShaderInfoLog(F).trim(), k = r.getShaderInfoLog(b).trim();
      let j = !0, H = !0;
      if (r.getProgramParameter(x, r.LINK_STATUS) === !1)
        if (j = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, x, F, b);
        else {
          const nt = Os(r, F, "vertex"), V = Os(r, b, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(x, r.VALIDATE_STATUS) + `

Material Name: ` + R.name + `
Material Type: ` + R.type + `

Program Info Log: ` + q + `
` + nt + `
` + V
          );
        }
      else q !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", q) : (G === "" || k === "") && (H = !1);
      H && (R.diagnostics = {
        runnable: j,
        programLog: q,
        vertexShader: {
          log: G,
          prefix: m
        },
        fragmentShader: {
          log: k,
          prefix: d
        }
      });
    }
    r.deleteShader(F), r.deleteShader(b), P = new Bi(r, x), y = hh(r, x);
  }
  let P;
  this.getUniforms = function() {
    return P === void 0 && w(this), P;
  };
  let y;
  this.getAttributes = function() {
    return y === void 0 && w(this), y;
  };
  let M = e.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return M === !1 && (M = r.getProgramParameter(x, nh)), M;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(x), this.program = void 0;
  }, this.type = e.shaderType, this.name = e.shaderName, this.id = ih++, this.cacheKey = t, this.usedTimes = 1, this.program = x, this.vertexShader = F, this.fragmentShader = b, this;
}
let yh = 0;
class Eh {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(t) {
    const e = t.vertexShader, n = t.fragmentShader, r = this._getShaderStage(e), s = this._getShaderStage(n), a = this._getShaderCacheForMaterial(t);
    return a.has(r) === !1 && (a.add(r), r.usedTimes++), a.has(s) === !1 && (a.add(s), s.usedTimes++), this;
  }
  remove(t) {
    const e = this.materialCache.get(t);
    for (const n of e)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(t), this;
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id;
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache;
    let n = e.get(t);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), e.set(t, n)), n;
  }
  _getShaderStage(t) {
    const e = this.shaderCache;
    let n = e.get(t);
    return n === void 0 && (n = new Th(t), e.set(t, n)), n;
  }
}
class Th {
  constructor(t) {
    this.id = yh++, this.code = t, this.usedTimes = 0;
  }
}
function Ah(i, t, e, n, r, s, a) {
  const o = new ua(), l = new Eh(), u = /* @__PURE__ */ new Set(), c = [], f = r.logarithmicDepthBuffer, h = r.vertexTextures;
  let p = r.precision;
  const g = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function x(y) {
    return u.add(y), y === 0 ? "uv" : `uv${y}`;
  }
  function m(y, M, R, q, G) {
    const k = q.fog, j = G.geometry, H = y.isMeshStandardMaterial ? q.environment : null, nt = (y.isMeshStandardMaterial ? e : t).get(y.envMap || H), V = nt && nt.mapping === 306 ? nt.image.height : null, ot = g[y.type];
    y.precision !== null && (p = r.getMaxPrecision(y.precision), p !== y.precision && console.warn("THREE.WebGLProgram.getParameters:", y.precision, "not supported, using", p, "instead."));
    const dt = j.morphAttributes.position || j.morphAttributes.normal || j.morphAttributes.color, St = dt !== void 0 ? dt.length : 0;
    let X = 0;
    j.morphAttributes.position !== void 0 && (X = 1), j.morphAttributes.normal !== void 0 && (X = 2), j.morphAttributes.color !== void 0 && (X = 3);
    let lt, N, J, pt;
    if (ot) {
      const Kt = Be[ot];
      lt = Kt.vertexShader, N = Kt.fragmentShader;
    } else
      lt = y.vertexShader, N = y.fragmentShader, l.update(y), J = l.getVertexShaderID(y), pt = l.getFragmentShaderID(y);
    const et = i.getRenderTarget(), Tt = i.state.buffers.depth.getReversed(), Dt = G.isInstancedMesh === !0, Ut = G.isBatchedMesh === !0, Ht = !!y.map, $ = !!y.matcap, it = !!nt, A = !!y.aoMap, Et = !!y.lightMap, tt = !!y.bumpMap, xt = !!y.normalMap, at = !!y.displacementMap, Lt = !!y.emissiveMap, vt = !!y.metalnessMap, E = !!y.roughnessMap, _ = y.anisotropy > 0, O = y.clearcoat > 0, Y = y.dispersion > 0, Q = y.iridescence > 0, Z = y.sheen > 0, At = y.transmission > 0, ht = _ && !!y.anisotropyMap, Mt = O && !!y.clearcoatMap, Wt = O && !!y.clearcoatNormalMap, rt = O && !!y.clearcoatRoughnessMap, Ct = Q && !!y.iridescenceMap, It = Q && !!y.iridescenceThicknessMap, Nt = Z && !!y.sheenColorMap, yt = Z && !!y.sheenRoughnessMap, Xt = !!y.specularMap, Gt = !!y.specularColorMap, jt = !!y.specularIntensityMap, D = At && !!y.transmissionMap, ft = At && !!y.thicknessMap, W = !!y.gradientMap, K = !!y.alphaMap, _t = y.alphaTest > 0, mt = !!y.alphaHash, Ot = !!y.extensions;
    let re = 0;
    y.toneMapped && (et === null || et.isXRRenderTarget === !0) && (re = i.toneMapping);
    const fe = {
      shaderID: ot,
      shaderType: y.type,
      shaderName: y.name,
      vertexShader: lt,
      fragmentShader: N,
      defines: y.defines,
      customVertexShaderID: J,
      customFragmentShaderID: pt,
      isRawShaderMaterial: y.isRawShaderMaterial === !0,
      glslVersion: y.glslVersion,
      precision: p,
      batching: Ut,
      batchingColor: Ut && G._colorsTexture !== null,
      instancing: Dt,
      instancingColor: Dt && G.instanceColor !== null,
      instancingMorph: Dt && G.morphTexture !== null,
      supportsVertexTextures: h,
      outputColorSpace: et === null ? i.outputColorSpace : et.isXRRenderTarget === !0 ? et.texture.colorSpace : zn,
      alphaToCoverage: !!y.alphaToCoverage,
      map: Ht,
      matcap: $,
      envMap: it,
      envMapMode: it && nt.mapping,
      envMapCubeUVHeight: V,
      aoMap: A,
      lightMap: Et,
      bumpMap: tt,
      normalMap: xt,
      displacementMap: h && at,
      emissiveMap: Lt,
      normalMapObjectSpace: xt && y.normalMapType === 1,
      normalMapTangentSpace: xt && y.normalMapType === 0,
      metalnessMap: vt,
      roughnessMap: E,
      anisotropy: _,
      anisotropyMap: ht,
      clearcoat: O,
      clearcoatMap: Mt,
      clearcoatNormalMap: Wt,
      clearcoatRoughnessMap: rt,
      dispersion: Y,
      iridescence: Q,
      iridescenceMap: Ct,
      iridescenceThicknessMap: It,
      sheen: Z,
      sheenColorMap: Nt,
      sheenRoughnessMap: yt,
      specularMap: Xt,
      specularColorMap: Gt,
      specularIntensityMap: jt,
      transmission: At,
      transmissionMap: D,
      thicknessMap: ft,
      gradientMap: W,
      opaque: y.transparent === !1 && y.blending === 1 && y.alphaToCoverage === !1,
      alphaMap: K,
      alphaTest: _t,
      alphaHash: mt,
      combine: y.combine,
      //
      mapUv: Ht && x(y.map.channel),
      aoMapUv: A && x(y.aoMap.channel),
      lightMapUv: Et && x(y.lightMap.channel),
      bumpMapUv: tt && x(y.bumpMap.channel),
      normalMapUv: xt && x(y.normalMap.channel),
      displacementMapUv: at && x(y.displacementMap.channel),
      emissiveMapUv: Lt && x(y.emissiveMap.channel),
      metalnessMapUv: vt && x(y.metalnessMap.channel),
      roughnessMapUv: E && x(y.roughnessMap.channel),
      anisotropyMapUv: ht && x(y.anisotropyMap.channel),
      clearcoatMapUv: Mt && x(y.clearcoatMap.channel),
      clearcoatNormalMapUv: Wt && x(y.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: rt && x(y.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Ct && x(y.iridescenceMap.channel),
      iridescenceThicknessMapUv: It && x(y.iridescenceThicknessMap.channel),
      sheenColorMapUv: Nt && x(y.sheenColorMap.channel),
      sheenRoughnessMapUv: yt && x(y.sheenRoughnessMap.channel),
      specularMapUv: Xt && x(y.specularMap.channel),
      specularColorMapUv: Gt && x(y.specularColorMap.channel),
      specularIntensityMapUv: jt && x(y.specularIntensityMap.channel),
      transmissionMapUv: D && x(y.transmissionMap.channel),
      thicknessMapUv: ft && x(y.thicknessMap.channel),
      alphaMapUv: K && x(y.alphaMap.channel),
      //
      vertexTangents: !!j.attributes.tangent && (xt || _),
      vertexColors: y.vertexColors,
      vertexAlphas: y.vertexColors === !0 && !!j.attributes.color && j.attributes.color.itemSize === 4,
      pointsUvs: G.isPoints === !0 && !!j.attributes.uv && (Ht || K),
      fog: !!k,
      useFog: y.fog === !0,
      fogExp2: !!k && k.isFogExp2,
      flatShading: y.flatShading === !0,
      sizeAttenuation: y.sizeAttenuation === !0,
      logarithmicDepthBuffer: f,
      reverseDepthBuffer: Tt,
      skinning: G.isSkinnedMesh === !0,
      morphTargets: j.morphAttributes.position !== void 0,
      morphNormals: j.morphAttributes.normal !== void 0,
      morphColors: j.morphAttributes.color !== void 0,
      morphTargetsCount: St,
      morphTextureStride: X,
      numDirLights: M.directional.length,
      numPointLights: M.point.length,
      numSpotLights: M.spot.length,
      numSpotLightMaps: M.spotLightMap.length,
      numRectAreaLights: M.rectArea.length,
      numHemiLights: M.hemi.length,
      numDirLightShadows: M.directionalShadowMap.length,
      numPointLightShadows: M.pointShadowMap.length,
      numSpotLightShadows: M.spotShadowMap.length,
      numSpotLightShadowsWithMaps: M.numSpotLightShadowsWithMaps,
      numLightProbes: M.numLightProbes,
      numClippingPlanes: a.numPlanes,
      numClipIntersection: a.numIntersection,
      dithering: y.dithering,
      shadowMapEnabled: i.shadowMap.enabled && R.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: re,
      decodeVideoTexture: Ht && y.map.isVideoTexture === !0 && qt.getTransfer(y.map.colorSpace) === Jt,
      decodeVideoTextureEmissive: Lt && y.emissiveMap.isVideoTexture === !0 && qt.getTransfer(y.emissiveMap.colorSpace) === Jt,
      premultipliedAlpha: y.premultipliedAlpha,
      doubleSided: y.side === 2,
      flipSided: y.side === 1,
      useDepthPacking: y.depthPacking >= 0,
      depthPacking: y.depthPacking || 0,
      index0AttributeName: y.index0AttributeName,
      extensionClipCullDistance: Ot && y.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Ot && y.extensions.multiDraw === !0 || Ut) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: y.customProgramCacheKey()
    };
    return fe.vertexUv1s = u.has(1), fe.vertexUv2s = u.has(2), fe.vertexUv3s = u.has(3), u.clear(), fe;
  }
  function d(y) {
    const M = [];
    if (y.shaderID ? M.push(y.shaderID) : (M.push(y.customVertexShaderID), M.push(y.customFragmentShaderID)), y.defines !== void 0)
      for (const R in y.defines)
        M.push(R), M.push(y.defines[R]);
    return y.isRawShaderMaterial === !1 && (T(M, y), C(M, y), M.push(i.outputColorSpace)), M.push(y.customProgramCacheKey), M.join();
  }
  function T(y, M) {
    y.push(M.precision), y.push(M.outputColorSpace), y.push(M.envMapMode), y.push(M.envMapCubeUVHeight), y.push(M.mapUv), y.push(M.alphaMapUv), y.push(M.lightMapUv), y.push(M.aoMapUv), y.push(M.bumpMapUv), y.push(M.normalMapUv), y.push(M.displacementMapUv), y.push(M.emissiveMapUv), y.push(M.metalnessMapUv), y.push(M.roughnessMapUv), y.push(M.anisotropyMapUv), y.push(M.clearcoatMapUv), y.push(M.clearcoatNormalMapUv), y.push(M.clearcoatRoughnessMapUv), y.push(M.iridescenceMapUv), y.push(M.iridescenceThicknessMapUv), y.push(M.sheenColorMapUv), y.push(M.sheenRoughnessMapUv), y.push(M.specularMapUv), y.push(M.specularColorMapUv), y.push(M.specularIntensityMapUv), y.push(M.transmissionMapUv), y.push(M.thicknessMapUv), y.push(M.combine), y.push(M.fogExp2), y.push(M.sizeAttenuation), y.push(M.morphTargetsCount), y.push(M.morphAttributeCount), y.push(M.numDirLights), y.push(M.numPointLights), y.push(M.numSpotLights), y.push(M.numSpotLightMaps), y.push(M.numHemiLights), y.push(M.numRectAreaLights), y.push(M.numDirLightShadows), y.push(M.numPointLightShadows), y.push(M.numSpotLightShadows), y.push(M.numSpotLightShadowsWithMaps), y.push(M.numLightProbes), y.push(M.shadowMapType), y.push(M.toneMapping), y.push(M.numClippingPlanes), y.push(M.numClipIntersection), y.push(M.depthPacking);
  }
  function C(y, M) {
    o.disableAll(), M.supportsVertexTextures && o.enable(0), M.instancing && o.enable(1), M.instancingColor && o.enable(2), M.instancingMorph && o.enable(3), M.matcap && o.enable(4), M.envMap && o.enable(5), M.normalMapObjectSpace && o.enable(6), M.normalMapTangentSpace && o.enable(7), M.clearcoat && o.enable(8), M.iridescence && o.enable(9), M.alphaTest && o.enable(10), M.vertexColors && o.enable(11), M.vertexAlphas && o.enable(12), M.vertexUv1s && o.enable(13), M.vertexUv2s && o.enable(14), M.vertexUv3s && o.enable(15), M.vertexTangents && o.enable(16), M.anisotropy && o.enable(17), M.alphaHash && o.enable(18), M.batching && o.enable(19), M.dispersion && o.enable(20), M.batchingColor && o.enable(21), y.push(o.mask), o.disableAll(), M.fog && o.enable(0), M.useFog && o.enable(1), M.flatShading && o.enable(2), M.logarithmicDepthBuffer && o.enable(3), M.reverseDepthBuffer && o.enable(4), M.skinning && o.enable(5), M.morphTargets && o.enable(6), M.morphNormals && o.enable(7), M.morphColors && o.enable(8), M.premultipliedAlpha && o.enable(9), M.shadowMapEnabled && o.enable(10), M.doubleSided && o.enable(11), M.flipSided && o.enable(12), M.useDepthPacking && o.enable(13), M.dithering && o.enable(14), M.transmission && o.enable(15), M.sheen && o.enable(16), M.opaque && o.enable(17), M.pointsUvs && o.enable(18), M.decodeVideoTexture && o.enable(19), M.decodeVideoTextureEmissive && o.enable(20), M.alphaToCoverage && o.enable(21), y.push(o.mask);
  }
  function v(y) {
    const M = g[y.type];
    let R;
    if (M) {
      const q = Be[M];
      R = lo.clone(q.uniforms);
    } else
      R = y.uniforms;
    return R;
  }
  function F(y, M) {
    let R;
    for (let q = 0, G = c.length; q < G; q++) {
      const k = c[q];
      if (k.cacheKey === M) {
        R = k, ++R.usedTimes;
        break;
      }
    }
    return R === void 0 && (R = new Ch(i, M, y, s), c.push(R)), R;
  }
  function b(y) {
    if (--y.usedTimes === 0) {
      const M = c.indexOf(y);
      c[M] = c[c.length - 1], c.pop(), y.destroy();
    }
  }
  function w(y) {
    l.remove(y);
  }
  function P() {
    l.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: d,
    getUniforms: v,
    acquireProgram: F,
    releaseProgram: b,
    releaseShaderCache: w,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: c,
    dispose: P
  };
}
function bh() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(a) {
    return i.has(a);
  }
  function e(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function r(a, o, l) {
    i.get(a)[o] = l;
  }
  function s() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: t,
    get: e,
    remove: n,
    update: r,
    dispose: s
  };
}
function wh(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
}
function Hs(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
}
function ks() {
  const i = [];
  let t = 0;
  const e = [], n = [], r = [];
  function s() {
    t = 0, e.length = 0, n.length = 0, r.length = 0;
  }
  function a(f, h, p, g, x, m) {
    let d = i[t];
    return d === void 0 ? (d = {
      id: f.id,
      object: f,
      geometry: h,
      material: p,
      groupOrder: g,
      renderOrder: f.renderOrder,
      z: x,
      group: m
    }, i[t] = d) : (d.id = f.id, d.object = f, d.geometry = h, d.material = p, d.groupOrder = g, d.renderOrder = f.renderOrder, d.z = x, d.group = m), t++, d;
  }
  function o(f, h, p, g, x, m) {
    const d = a(f, h, p, g, x, m);
    p.transmission > 0 ? n.push(d) : p.transparent === !0 ? r.push(d) : e.push(d);
  }
  function l(f, h, p, g, x, m) {
    const d = a(f, h, p, g, x, m);
    p.transmission > 0 ? n.unshift(d) : p.transparent === !0 ? r.unshift(d) : e.unshift(d);
  }
  function u(f, h) {
    e.length > 1 && e.sort(f || wh), n.length > 1 && n.sort(h || Hs), r.length > 1 && r.sort(h || Hs);
  }
  function c() {
    for (let f = t, h = i.length; f < h; f++) {
      const p = i[f];
      if (p.id === null) break;
      p.id = null, p.object = null, p.geometry = null, p.material = null, p.group = null;
    }
  }
  return {
    opaque: e,
    transmissive: n,
    transparent: r,
    init: s,
    push: o,
    unshift: l,
    finish: c,
    sort: u
  };
}
function Rh() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(n, r) {
    const s = i.get(n);
    let a;
    return s === void 0 ? (a = new ks(), i.set(n, [a])) : r >= s.length ? (a = new ks(), s.push(a)) : a = s[r], a;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: e
  };
}
function Lh() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            direction: new L(),
            color: new kt()
          };
          break;
        case "SpotLight":
          e = {
            position: new L(),
            direction: new L(),
            color: new kt(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          e = {
            position: new L(),
            color: new kt(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          e = {
            direction: new L(),
            skyColor: new kt(),
            groundColor: new kt()
          };
          break;
        case "RectAreaLight":
          e = {
            color: new kt(),
            position: new L(),
            halfWidth: new L(),
            halfHeight: new L()
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
function Ph() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new ct()
          };
          break;
        case "SpotLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new ct()
          };
          break;
        case "PointLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new ct(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
let Dh = 0;
function Uh(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function Ih(i) {
  const t = new Lh(), e = Ph(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let u = 0; u < 9; u++) n.probe.push(new L());
  const r = new L(), s = new ne(), a = new ne();
  function o(u) {
    let c = 0, f = 0, h = 0;
    for (let y = 0; y < 9; y++) n.probe[y].set(0, 0, 0);
    let p = 0, g = 0, x = 0, m = 0, d = 0, T = 0, C = 0, v = 0, F = 0, b = 0, w = 0;
    u.sort(Uh);
    for (let y = 0, M = u.length; y < M; y++) {
      const R = u[y], q = R.color, G = R.intensity, k = R.distance, j = R.shadow && R.shadow.map ? R.shadow.map.texture : null;
      if (R.isAmbientLight)
        c += q.r * G, f += q.g * G, h += q.b * G;
      else if (R.isLightProbe) {
        for (let H = 0; H < 9; H++)
          n.probe[H].addScaledVector(R.sh.coefficients[H], G);
        w++;
      } else if (R.isDirectionalLight) {
        const H = t.get(R);
        if (H.color.copy(R.color).multiplyScalar(R.intensity), R.castShadow) {
          const nt = R.shadow, V = e.get(R);
          V.shadowIntensity = nt.intensity, V.shadowBias = nt.bias, V.shadowNormalBias = nt.normalBias, V.shadowRadius = nt.radius, V.shadowMapSize = nt.mapSize, n.directionalShadow[p] = V, n.directionalShadowMap[p] = j, n.directionalShadowMatrix[p] = R.shadow.matrix, T++;
        }
        n.directional[p] = H, p++;
      } else if (R.isSpotLight) {
        const H = t.get(R);
        H.position.setFromMatrixPosition(R.matrixWorld), H.color.copy(q).multiplyScalar(G), H.distance = k, H.coneCos = Math.cos(R.angle), H.penumbraCos = Math.cos(R.angle * (1 - R.penumbra)), H.decay = R.decay, n.spot[x] = H;
        const nt = R.shadow;
        if (R.map && (n.spotLightMap[F] = R.map, F++, nt.updateMatrices(R), R.castShadow && b++), n.spotLightMatrix[x] = nt.matrix, R.castShadow) {
          const V = e.get(R);
          V.shadowIntensity = nt.intensity, V.shadowBias = nt.bias, V.shadowNormalBias = nt.normalBias, V.shadowRadius = nt.radius, V.shadowMapSize = nt.mapSize, n.spotShadow[x] = V, n.spotShadowMap[x] = j, v++;
        }
        x++;
      } else if (R.isRectAreaLight) {
        const H = t.get(R);
        H.color.copy(q).multiplyScalar(G), H.halfWidth.set(R.width * 0.5, 0, 0), H.halfHeight.set(0, R.height * 0.5, 0), n.rectArea[m] = H, m++;
      } else if (R.isPointLight) {
        const H = t.get(R);
        if (H.color.copy(R.color).multiplyScalar(R.intensity), H.distance = R.distance, H.decay = R.decay, R.castShadow) {
          const nt = R.shadow, V = e.get(R);
          V.shadowIntensity = nt.intensity, V.shadowBias = nt.bias, V.shadowNormalBias = nt.normalBias, V.shadowRadius = nt.radius, V.shadowMapSize = nt.mapSize, V.shadowCameraNear = nt.camera.near, V.shadowCameraFar = nt.camera.far, n.pointShadow[g] = V, n.pointShadowMap[g] = j, n.pointShadowMatrix[g] = R.shadow.matrix, C++;
        }
        n.point[g] = H, g++;
      } else if (R.isHemisphereLight) {
        const H = t.get(R);
        H.skyColor.copy(R.color).multiplyScalar(G), H.groundColor.copy(R.groundColor).multiplyScalar(G), n.hemi[d] = H, d++;
      }
    }
    m > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = ut.LTC_FLOAT_1, n.rectAreaLTC2 = ut.LTC_FLOAT_2) : (n.rectAreaLTC1 = ut.LTC_HALF_1, n.rectAreaLTC2 = ut.LTC_HALF_2)), n.ambient[0] = c, n.ambient[1] = f, n.ambient[2] = h;
    const P = n.hash;
    (P.directionalLength !== p || P.pointLength !== g || P.spotLength !== x || P.rectAreaLength !== m || P.hemiLength !== d || P.numDirectionalShadows !== T || P.numPointShadows !== C || P.numSpotShadows !== v || P.numSpotMaps !== F || P.numLightProbes !== w) && (n.directional.length = p, n.spot.length = x, n.rectArea.length = m, n.point.length = g, n.hemi.length = d, n.directionalShadow.length = T, n.directionalShadowMap.length = T, n.pointShadow.length = C, n.pointShadowMap.length = C, n.spotShadow.length = v, n.spotShadowMap.length = v, n.directionalShadowMatrix.length = T, n.pointShadowMatrix.length = C, n.spotLightMatrix.length = v + F - b, n.spotLightMap.length = F, n.numSpotLightShadowsWithMaps = b, n.numLightProbes = w, P.directionalLength = p, P.pointLength = g, P.spotLength = x, P.rectAreaLength = m, P.hemiLength = d, P.numDirectionalShadows = T, P.numPointShadows = C, P.numSpotShadows = v, P.numSpotMaps = F, P.numLightProbes = w, n.version = Dh++);
  }
  function l(u, c) {
    let f = 0, h = 0, p = 0, g = 0, x = 0;
    const m = c.matrixWorldInverse;
    for (let d = 0, T = u.length; d < T; d++) {
      const C = u[d];
      if (C.isDirectionalLight) {
        const v = n.directional[f];
        v.direction.setFromMatrixPosition(C.matrixWorld), r.setFromMatrixPosition(C.target.matrixWorld), v.direction.sub(r), v.direction.transformDirection(m), f++;
      } else if (C.isSpotLight) {
        const v = n.spot[p];
        v.position.setFromMatrixPosition(C.matrixWorld), v.position.applyMatrix4(m), v.direction.setFromMatrixPosition(C.matrixWorld), r.setFromMatrixPosition(C.target.matrixWorld), v.direction.sub(r), v.direction.transformDirection(m), p++;
      } else if (C.isRectAreaLight) {
        const v = n.rectArea[g];
        v.position.setFromMatrixPosition(C.matrixWorld), v.position.applyMatrix4(m), a.identity(), s.copy(C.matrixWorld), s.premultiply(m), a.extractRotation(s), v.halfWidth.set(C.width * 0.5, 0, 0), v.halfHeight.set(0, C.height * 0.5, 0), v.halfWidth.applyMatrix4(a), v.halfHeight.applyMatrix4(a), g++;
      } else if (C.isPointLight) {
        const v = n.point[h];
        v.position.setFromMatrixPosition(C.matrixWorld), v.position.applyMatrix4(m), h++;
      } else if (C.isHemisphereLight) {
        const v = n.hemi[x];
        v.direction.setFromMatrixPosition(C.matrixWorld), v.direction.transformDirection(m), x++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: n
  };
}
function Ws(i) {
  const t = new Ih(i), e = [], n = [];
  function r(c) {
    u.camera = c, e.length = 0, n.length = 0;
  }
  function s(c) {
    e.push(c);
  }
  function a(c) {
    n.push(c);
  }
  function o() {
    t.setup(e);
  }
  function l(c) {
    t.setupView(e, c);
  }
  const u = {
    lightsArray: e,
    shadowsArray: n,
    camera: null,
    lights: t,
    transmissionRenderTarget: {}
  };
  return {
    init: r,
    state: u,
    setupLights: o,
    setupLightsView: l,
    pushLight: s,
    pushShadow: a
  };
}
function Nh(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(r, s = 0) {
    const a = t.get(r);
    let o;
    return a === void 0 ? (o = new Ws(i), t.set(r, [o])) : s >= a.length ? (o = new Ws(i), a.push(o)) : o = a[s], o;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: n
  };
}
class Fh extends Hn {
  static get type() {
    return "MeshDepthMaterial";
  }
  constructor(t) {
    super(), this.isMeshDepthMaterial = !0, this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}
class Oh extends Hn {
  static get type() {
    return "MeshDistanceMaterial";
  }
  constructor(t) {
    super(), this.isMeshDistanceMaterial = !0, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
  }
}
const Bh = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, zh = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function Gh(i, t, e) {
  let n = new Ir();
  const r = new ct(), s = new ct(), a = new se(), o = new Fh({ depthPacking: 3201 }), l = new Oh(), u = {}, c = e.maxTextureSize, f = { 0: 1, 1: 0, 2: 2 }, h = new on({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new ct() },
      radius: { value: 4 }
    },
    vertexShader: Bh,
    fragmentShader: zh
  }), p = h.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const g = new Ve();
  g.setAttribute(
    "position",
    new Fe(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const x = new Ee(g, h), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let d = this.type;
  this.render = function(b, w, P) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || b.length === 0) return;
    const y = i.getRenderTarget(), M = i.getActiveCubeFace(), R = i.getActiveMipmapLevel(), q = i.state;
    q.setBlending(0), q.buffers.color.setClear(1, 1, 1, 1), q.buffers.depth.setTest(!0), q.setScissorTest(!1);
    const G = d !== 3 && this.type === 3, k = d === 3 && this.type !== 3;
    for (let j = 0, H = b.length; j < H; j++) {
      const nt = b[j], V = nt.shadow;
      if (V === void 0) {
        console.warn("THREE.WebGLShadowMap:", nt, "has no shadow.");
        continue;
      }
      if (V.autoUpdate === !1 && V.needsUpdate === !1) continue;
      r.copy(V.mapSize);
      const ot = V.getFrameExtents();
      if (r.multiply(ot), s.copy(V.mapSize), (r.x > c || r.y > c) && (r.x > c && (s.x = Math.floor(c / ot.x), r.x = s.x * ot.x, V.mapSize.x = s.x), r.y > c && (s.y = Math.floor(c / ot.y), r.y = s.y * ot.y, V.mapSize.y = s.y)), V.map === null || G === !0 || k === !0) {
        const St = this.type !== 3 ? { minFilter: 1003, magFilter: 1003 } : {};
        V.map !== null && V.map.dispose(), V.map = new xn(r.x, r.y, St), V.map.texture.name = nt.name + ".shadowMap", V.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(V.map), i.clear();
      const dt = V.getViewportCount();
      for (let St = 0; St < dt; St++) {
        const X = V.getViewport(St);
        a.set(
          s.x * X.x,
          s.y * X.y,
          s.x * X.z,
          s.y * X.w
        ), q.viewport(a), V.updateMatrices(nt, St), n = V.getFrustum(), v(w, P, V.camera, nt, this.type);
      }
      V.isPointLightShadow !== !0 && this.type === 3 && T(V, P), V.needsUpdate = !1;
    }
    d = this.type, m.needsUpdate = !1, i.setRenderTarget(y, M, R);
  };
  function T(b, w) {
    const P = t.update(x);
    h.defines.VSM_SAMPLES !== b.blurSamples && (h.defines.VSM_SAMPLES = b.blurSamples, p.defines.VSM_SAMPLES = b.blurSamples, h.needsUpdate = !0, p.needsUpdate = !0), b.mapPass === null && (b.mapPass = new xn(r.x, r.y)), h.uniforms.shadow_pass.value = b.map.texture, h.uniforms.resolution.value = b.mapSize, h.uniforms.radius.value = b.radius, i.setRenderTarget(b.mapPass), i.clear(), i.renderBufferDirect(w, null, P, h, x, null), p.uniforms.shadow_pass.value = b.mapPass.texture, p.uniforms.resolution.value = b.mapSize, p.uniforms.radius.value = b.radius, i.setRenderTarget(b.map), i.clear(), i.renderBufferDirect(w, null, P, p, x, null);
  }
  function C(b, w, P, y) {
    let M = null;
    const R = P.isPointLight === !0 ? b.customDistanceMaterial : b.customDepthMaterial;
    if (R !== void 0)
      M = R;
    else if (M = P.isPointLight === !0 ? l : o, i.localClippingEnabled && w.clipShadows === !0 && Array.isArray(w.clippingPlanes) && w.clippingPlanes.length !== 0 || w.displacementMap && w.displacementScale !== 0 || w.alphaMap && w.alphaTest > 0 || w.map && w.alphaTest > 0) {
      const q = M.uuid, G = w.uuid;
      let k = u[q];
      k === void 0 && (k = {}, u[q] = k);
      let j = k[G];
      j === void 0 && (j = M.clone(), k[G] = j, w.addEventListener("dispose", F)), M = j;
    }
    if (M.visible = w.visible, M.wireframe = w.wireframe, y === 3 ? M.side = w.shadowSide !== null ? w.shadowSide : w.side : M.side = w.shadowSide !== null ? w.shadowSide : f[w.side], M.alphaMap = w.alphaMap, M.alphaTest = w.alphaTest, M.map = w.map, M.clipShadows = w.clipShadows, M.clippingPlanes = w.clippingPlanes, M.clipIntersection = w.clipIntersection, M.displacementMap = w.displacementMap, M.displacementScale = w.displacementScale, M.displacementBias = w.displacementBias, M.wireframeLinewidth = w.wireframeLinewidth, M.linewidth = w.linewidth, P.isPointLight === !0 && M.isMeshDistanceMaterial === !0) {
      const q = i.properties.get(M);
      q.light = P;
    }
    return M;
  }
  function v(b, w, P, y, M) {
    if (b.visible === !1) return;
    if (b.layers.test(w.layers) && (b.isMesh || b.isLine || b.isPoints) && (b.castShadow || b.receiveShadow && M === 3) && (!b.frustumCulled || n.intersectsObject(b))) {
      b.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse, b.matrixWorld);
      const G = t.update(b), k = b.material;
      if (Array.isArray(k)) {
        const j = G.groups;
        for (let H = 0, nt = j.length; H < nt; H++) {
          const V = j[H], ot = k[V.materialIndex];
          if (ot && ot.visible) {
            const dt = C(b, ot, y, M);
            b.onBeforeShadow(i, b, w, P, G, dt, V), i.renderBufferDirect(P, null, G, dt, b, V), b.onAfterShadow(i, b, w, P, G, dt, V);
          }
        }
      } else if (k.visible) {
        const j = C(b, k, y, M);
        b.onBeforeShadow(i, b, w, P, G, j, null), i.renderBufferDirect(P, null, G, j, b, null), b.onAfterShadow(i, b, w, P, G, j, null);
      }
    }
    const q = b.children;
    for (let G = 0, k = q.length; G < k; G++)
      v(q[G], w, P, y, M);
  }
  function F(b) {
    b.target.removeEventListener("dispose", F);
    for (const P in u) {
      const y = u[P], M = b.target.uuid;
      M in y && (y[M].dispose(), delete y[M]);
    }
  }
}
const Vh = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
};
function Hh(i, t) {
  function e() {
    let D = !1;
    const ft = new se();
    let W = null;
    const K = new se(0, 0, 0, 0);
    return {
      setMask: function(_t) {
        W !== _t && !D && (i.colorMask(_t, _t, _t, _t), W = _t);
      },
      setLocked: function(_t) {
        D = _t;
      },
      setClear: function(_t, mt, Ot, re, fe) {
        fe === !0 && (_t *= re, mt *= re, Ot *= re), ft.set(_t, mt, Ot, re), K.equals(ft) === !1 && (i.clearColor(_t, mt, Ot, re), K.copy(ft));
      },
      reset: function() {
        D = !1, W = null, K.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let D = !1, ft = !1, W = null, K = null, _t = null;
    return {
      setReversed: function(mt) {
        if (ft !== mt) {
          const Ot = t.get("EXT_clip_control");
          ft ? Ot.clipControlEXT(Ot.LOWER_LEFT_EXT, Ot.ZERO_TO_ONE_EXT) : Ot.clipControlEXT(Ot.LOWER_LEFT_EXT, Ot.NEGATIVE_ONE_TO_ONE_EXT);
          const re = _t;
          _t = null, this.setClear(re);
        }
        ft = mt;
      },
      getReversed: function() {
        return ft;
      },
      setTest: function(mt) {
        mt ? et(i.DEPTH_TEST) : Tt(i.DEPTH_TEST);
      },
      setMask: function(mt) {
        W !== mt && !D && (i.depthMask(mt), W = mt);
      },
      setFunc: function(mt) {
        if (ft && (mt = Vh[mt]), K !== mt) {
          switch (mt) {
            case 0:
              i.depthFunc(i.NEVER);
              break;
            case 1:
              i.depthFunc(i.ALWAYS);
              break;
            case 2:
              i.depthFunc(i.LESS);
              break;
            case 3:
              i.depthFunc(i.LEQUAL);
              break;
            case 4:
              i.depthFunc(i.EQUAL);
              break;
            case 5:
              i.depthFunc(i.GEQUAL);
              break;
            case 6:
              i.depthFunc(i.GREATER);
              break;
            case 7:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          K = mt;
        }
      },
      setLocked: function(mt) {
        D = mt;
      },
      setClear: function(mt) {
        _t !== mt && (ft && (mt = 1 - mt), i.clearDepth(mt), _t = mt);
      },
      reset: function() {
        D = !1, W = null, K = null, _t = null, ft = !1;
      }
    };
  }
  function r() {
    let D = !1, ft = null, W = null, K = null, _t = null, mt = null, Ot = null, re = null, fe = null;
    return {
      setTest: function(Kt) {
        D || (Kt ? et(i.STENCIL_TEST) : Tt(i.STENCIL_TEST));
      },
      setMask: function(Kt) {
        ft !== Kt && !D && (i.stencilMask(Kt), ft = Kt);
      },
      setFunc: function(Kt, Le, ke) {
        (W !== Kt || K !== Le || _t !== ke) && (i.stencilFunc(Kt, Le, ke), W = Kt, K = Le, _t = ke);
      },
      setOp: function(Kt, Le, ke) {
        (mt !== Kt || Ot !== Le || re !== ke) && (i.stencilOp(Kt, Le, ke), mt = Kt, Ot = Le, re = ke);
      },
      setLocked: function(Kt) {
        D = Kt;
      },
      setClear: function(Kt) {
        fe !== Kt && (i.clearStencil(Kt), fe = Kt);
      },
      reset: function() {
        D = !1, ft = null, W = null, K = null, _t = null, mt = null, Ot = null, re = null, fe = null;
      }
    };
  }
  const s = new e(), a = new n(), o = new r(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap();
  let c = {}, f = {}, h = /* @__PURE__ */ new WeakMap(), p = [], g = null, x = !1, m = null, d = null, T = null, C = null, v = null, F = null, b = null, w = new kt(0, 0, 0), P = 0, y = !1, M = null, R = null, q = null, G = null, k = null;
  const j = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let H = !1, nt = 0;
  const V = i.getParameter(i.VERSION);
  V.indexOf("WebGL") !== -1 ? (nt = parseFloat(/^WebGL (\d)/.exec(V)[1]), H = nt >= 1) : V.indexOf("OpenGL ES") !== -1 && (nt = parseFloat(/^OpenGL ES (\d)/.exec(V)[1]), H = nt >= 2);
  let ot = null, dt = {};
  const St = i.getParameter(i.SCISSOR_BOX), X = i.getParameter(i.VIEWPORT), lt = new se().fromArray(St), N = new se().fromArray(X);
  function J(D, ft, W, K) {
    const _t = new Uint8Array(4), mt = i.createTexture();
    i.bindTexture(D, mt), i.texParameteri(D, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(D, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Ot = 0; Ot < W; Ot++)
      D === i.TEXTURE_3D || D === i.TEXTURE_2D_ARRAY ? i.texImage3D(ft, 0, i.RGBA, 1, 1, K, 0, i.RGBA, i.UNSIGNED_BYTE, _t) : i.texImage2D(ft + Ot, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, _t);
    return mt;
  }
  const pt = {};
  pt[i.TEXTURE_2D] = J(i.TEXTURE_2D, i.TEXTURE_2D, 1), pt[i.TEXTURE_CUBE_MAP] = J(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), pt[i.TEXTURE_2D_ARRAY] = J(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), pt[i.TEXTURE_3D] = J(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), et(i.DEPTH_TEST), a.setFunc(3), tt(!1), xt(1), et(i.CULL_FACE), A(0);
  function et(D) {
    c[D] !== !0 && (i.enable(D), c[D] = !0);
  }
  function Tt(D) {
    c[D] !== !1 && (i.disable(D), c[D] = !1);
  }
  function Dt(D, ft) {
    return f[D] !== ft ? (i.bindFramebuffer(D, ft), f[D] = ft, D === i.DRAW_FRAMEBUFFER && (f[i.FRAMEBUFFER] = ft), D === i.FRAMEBUFFER && (f[i.DRAW_FRAMEBUFFER] = ft), !0) : !1;
  }
  function Ut(D, ft) {
    let W = p, K = !1;
    if (D) {
      W = h.get(ft), W === void 0 && (W = [], h.set(ft, W));
      const _t = D.textures;
      if (W.length !== _t.length || W[0] !== i.COLOR_ATTACHMENT0) {
        for (let mt = 0, Ot = _t.length; mt < Ot; mt++)
          W[mt] = i.COLOR_ATTACHMENT0 + mt;
        W.length = _t.length, K = !0;
      }
    } else
      W[0] !== i.BACK && (W[0] = i.BACK, K = !0);
    K && i.drawBuffers(W);
  }
  function Ht(D) {
    return g !== D ? (i.useProgram(D), g = D, !0) : !1;
  }
  const $ = {
    100: i.FUNC_ADD,
    101: i.FUNC_SUBTRACT,
    102: i.FUNC_REVERSE_SUBTRACT
  };
  $[103] = i.MIN, $[104] = i.MAX;
  const it = {
    200: i.ZERO,
    201: i.ONE,
    202: i.SRC_COLOR,
    204: i.SRC_ALPHA,
    210: i.SRC_ALPHA_SATURATE,
    208: i.DST_COLOR,
    206: i.DST_ALPHA,
    203: i.ONE_MINUS_SRC_COLOR,
    205: i.ONE_MINUS_SRC_ALPHA,
    209: i.ONE_MINUS_DST_COLOR,
    207: i.ONE_MINUS_DST_ALPHA,
    211: i.CONSTANT_COLOR,
    212: i.ONE_MINUS_CONSTANT_COLOR,
    213: i.CONSTANT_ALPHA,
    214: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function A(D, ft, W, K, _t, mt, Ot, re, fe, Kt) {
    if (D === 0) {
      x === !0 && (Tt(i.BLEND), x = !1);
      return;
    }
    if (x === !1 && (et(i.BLEND), x = !0), D !== 5) {
      if (D !== m || Kt !== y) {
        if ((d !== 100 || v !== 100) && (i.blendEquation(i.FUNC_ADD), d = 100, v = 100), Kt)
          switch (D) {
            case 1:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", D);
              break;
          }
        else
          switch (D) {
            case 1:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", D);
              break;
          }
        T = null, C = null, F = null, b = null, w.set(0, 0, 0), P = 0, m = D, y = Kt;
      }
      return;
    }
    _t = _t || ft, mt = mt || W, Ot = Ot || K, (ft !== d || _t !== v) && (i.blendEquationSeparate($[ft], $[_t]), d = ft, v = _t), (W !== T || K !== C || mt !== F || Ot !== b) && (i.blendFuncSeparate(it[W], it[K], it[mt], it[Ot]), T = W, C = K, F = mt, b = Ot), (re.equals(w) === !1 || fe !== P) && (i.blendColor(re.r, re.g, re.b, fe), w.copy(re), P = fe), m = D, y = !1;
  }
  function Et(D, ft) {
    D.side === 2 ? Tt(i.CULL_FACE) : et(i.CULL_FACE);
    let W = D.side === 1;
    ft && (W = !W), tt(W), D.blending === 1 && D.transparent === !1 ? A(0) : A(D.blending, D.blendEquation, D.blendSrc, D.blendDst, D.blendEquationAlpha, D.blendSrcAlpha, D.blendDstAlpha, D.blendColor, D.blendAlpha, D.premultipliedAlpha), a.setFunc(D.depthFunc), a.setTest(D.depthTest), a.setMask(D.depthWrite), s.setMask(D.colorWrite);
    const K = D.stencilWrite;
    o.setTest(K), K && (o.setMask(D.stencilWriteMask), o.setFunc(D.stencilFunc, D.stencilRef, D.stencilFuncMask), o.setOp(D.stencilFail, D.stencilZFail, D.stencilZPass)), Lt(D.polygonOffset, D.polygonOffsetFactor, D.polygonOffsetUnits), D.alphaToCoverage === !0 ? et(i.SAMPLE_ALPHA_TO_COVERAGE) : Tt(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function tt(D) {
    M !== D && (D ? i.frontFace(i.CW) : i.frontFace(i.CCW), M = D);
  }
  function xt(D) {
    D !== 0 ? (et(i.CULL_FACE), D !== R && (D === 1 ? i.cullFace(i.BACK) : D === 2 ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : Tt(i.CULL_FACE), R = D;
  }
  function at(D) {
    D !== q && (H && i.lineWidth(D), q = D);
  }
  function Lt(D, ft, W) {
    D ? (et(i.POLYGON_OFFSET_FILL), (G !== ft || k !== W) && (i.polygonOffset(ft, W), G = ft, k = W)) : Tt(i.POLYGON_OFFSET_FILL);
  }
  function vt(D) {
    D ? et(i.SCISSOR_TEST) : Tt(i.SCISSOR_TEST);
  }
  function E(D) {
    D === void 0 && (D = i.TEXTURE0 + j - 1), ot !== D && (i.activeTexture(D), ot = D);
  }
  function _(D, ft, W) {
    W === void 0 && (ot === null ? W = i.TEXTURE0 + j - 1 : W = ot);
    let K = dt[W];
    K === void 0 && (K = { type: void 0, texture: void 0 }, dt[W] = K), (K.type !== D || K.texture !== ft) && (ot !== W && (i.activeTexture(W), ot = W), i.bindTexture(D, ft || pt[D]), K.type = D, K.texture = ft);
  }
  function O() {
    const D = dt[ot];
    D !== void 0 && D.type !== void 0 && (i.bindTexture(D.type, null), D.type = void 0, D.texture = void 0);
  }
  function Y() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Q() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Z() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function At() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function ht() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Mt() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Wt() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function rt() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Ct() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function It() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Nt(D) {
    lt.equals(D) === !1 && (i.scissor(D.x, D.y, D.z, D.w), lt.copy(D));
  }
  function yt(D) {
    N.equals(D) === !1 && (i.viewport(D.x, D.y, D.z, D.w), N.copy(D));
  }
  function Xt(D, ft) {
    let W = u.get(ft);
    W === void 0 && (W = /* @__PURE__ */ new WeakMap(), u.set(ft, W));
    let K = W.get(D);
    K === void 0 && (K = i.getUniformBlockIndex(ft, D.name), W.set(D, K));
  }
  function Gt(D, ft) {
    const K = u.get(ft).get(D);
    l.get(ft) !== K && (i.uniformBlockBinding(ft, K, D.__bindingPointIndex), l.set(ft, K));
  }
  function jt() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), a.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), c = {}, ot = null, dt = {}, f = {}, h = /* @__PURE__ */ new WeakMap(), p = [], g = null, x = !1, m = null, d = null, T = null, C = null, v = null, F = null, b = null, w = new kt(0, 0, 0), P = 0, y = !1, M = null, R = null, q = null, G = null, k = null, lt.set(0, 0, i.canvas.width, i.canvas.height), N.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: et,
    disable: Tt,
    bindFramebuffer: Dt,
    drawBuffers: Ut,
    useProgram: Ht,
    setBlending: A,
    setMaterial: Et,
    setFlipSided: tt,
    setCullFace: xt,
    setLineWidth: at,
    setPolygonOffset: Lt,
    setScissorTest: vt,
    activeTexture: E,
    bindTexture: _,
    unbindTexture: O,
    compressedTexImage2D: Y,
    compressedTexImage3D: Q,
    texImage2D: Ct,
    texImage3D: It,
    updateUBOMapping: Xt,
    uniformBlockBinding: Gt,
    texStorage2D: Wt,
    texStorage3D: rt,
    texSubImage2D: Z,
    texSubImage3D: At,
    compressedTexSubImage2D: ht,
    compressedTexSubImage3D: Mt,
    scissor: Nt,
    viewport: yt,
    reset: jt
  };
}
function Xs(i, t, e, n) {
  const r = kh(n);
  switch (e) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case 1021:
      return i * t;
    case 1024:
      return i * t;
    case 1025:
      return i * t * 2;
    case 1028:
      return i * t / r.components * r.byteLength;
    case 1029:
      return i * t / r.components * r.byteLength;
    case 1030:
      return i * t * 2 / r.components * r.byteLength;
    case 1031:
      return i * t * 2 / r.components * r.byteLength;
    case 1022:
      return i * t * 3 / r.components * r.byteLength;
    case 1023:
      return i * t * 4 / r.components * r.byteLength;
    case 1033:
      return i * t * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case 33776:
    case 33777:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case 33778:
    case 33779:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case 35841:
    case 35843:
      return Math.max(i, 16) * Math.max(t, 8) / 4;
    case 35840:
    case 35842:
      return Math.max(i, 8) * Math.max(t, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case 36196:
    case 37492:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case 37496:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case 37808:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case 37809:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case 37810:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case 37811:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case 37812:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case 37813:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case 37814:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case 37815:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case 37816:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case 37817:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case 37818:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case 37819:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case 37820:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case 37821:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case 36492:
    case 36494:
    case 36495:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case 36283:
    case 36284:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case 36285:
    case 36286:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${e} format.`
  );
}
function kh(i) {
  switch (i) {
    case 1009:
    case 1010:
      return { byteLength: 1, components: 1 };
    case 1012:
    case 1011:
    case 1016:
      return { byteLength: 2, components: 1 };
    case 1017:
    case 1018:
      return { byteLength: 2, components: 4 };
    case 1014:
    case 1013:
    case 1015:
      return { byteLength: 4, components: 1 };
    case 35902:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function Wh(i, t, e, n, r, s, a) {
  const o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), u = new ct(), c = /* @__PURE__ */ new WeakMap();
  let f;
  const h = /* @__PURE__ */ new WeakMap();
  let p = !1;
  try {
    p = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(E, _) {
    return p ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(E, _)
    ) : zi("canvas");
  }
  function x(E, _, O) {
    let Y = 1;
    const Q = vt(E);
    if ((Q.width > O || Q.height > O) && (Y = O / Math.max(Q.width, Q.height)), Y < 1)
      if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap || typeof VideoFrame < "u" && E instanceof VideoFrame) {
        const Z = Math.floor(Y * Q.width), At = Math.floor(Y * Q.height);
        f === void 0 && (f = g(Z, At));
        const ht = _ ? g(Z, At) : f;
        return ht.width = Z, ht.height = At, ht.getContext("2d").drawImage(E, 0, 0, Z, At), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + Q.width + "x" + Q.height + ") to (" + Z + "x" + At + ")."), ht;
      } else
        return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + Q.width + "x" + Q.height + ")."), E;
    return E;
  }
  function m(E) {
    return E.generateMipmaps;
  }
  function d(E) {
    i.generateMipmap(E);
  }
  function T(E) {
    return E.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : E.isWebGL3DRenderTarget ? i.TEXTURE_3D : E.isWebGLArrayRenderTarget || E.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function C(E, _, O, Y, Q = !1) {
    if (E !== null) {
      if (i[E] !== void 0) return i[E];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let Z = _;
    if (_ === i.RED && (O === i.FLOAT && (Z = i.R32F), O === i.HALF_FLOAT && (Z = i.R16F), O === i.UNSIGNED_BYTE && (Z = i.R8)), _ === i.RED_INTEGER && (O === i.UNSIGNED_BYTE && (Z = i.R8UI), O === i.UNSIGNED_SHORT && (Z = i.R16UI), O === i.UNSIGNED_INT && (Z = i.R32UI), O === i.BYTE && (Z = i.R8I), O === i.SHORT && (Z = i.R16I), O === i.INT && (Z = i.R32I)), _ === i.RG && (O === i.FLOAT && (Z = i.RG32F), O === i.HALF_FLOAT && (Z = i.RG16F), O === i.UNSIGNED_BYTE && (Z = i.RG8)), _ === i.RG_INTEGER && (O === i.UNSIGNED_BYTE && (Z = i.RG8UI), O === i.UNSIGNED_SHORT && (Z = i.RG16UI), O === i.UNSIGNED_INT && (Z = i.RG32UI), O === i.BYTE && (Z = i.RG8I), O === i.SHORT && (Z = i.RG16I), O === i.INT && (Z = i.RG32I)), _ === i.RGB_INTEGER && (O === i.UNSIGNED_BYTE && (Z = i.RGB8UI), O === i.UNSIGNED_SHORT && (Z = i.RGB16UI), O === i.UNSIGNED_INT && (Z = i.RGB32UI), O === i.BYTE && (Z = i.RGB8I), O === i.SHORT && (Z = i.RGB16I), O === i.INT && (Z = i.RGB32I)), _ === i.RGBA_INTEGER && (O === i.UNSIGNED_BYTE && (Z = i.RGBA8UI), O === i.UNSIGNED_SHORT && (Z = i.RGBA16UI), O === i.UNSIGNED_INT && (Z = i.RGBA32UI), O === i.BYTE && (Z = i.RGBA8I), O === i.SHORT && (Z = i.RGBA16I), O === i.INT && (Z = i.RGBA32I)), _ === i.RGB && O === i.UNSIGNED_INT_5_9_9_9_REV && (Z = i.RGB9_E5), _ === i.RGBA) {
      const At = Q ? Vi : qt.getTransfer(Y);
      O === i.FLOAT && (Z = i.RGBA32F), O === i.HALF_FLOAT && (Z = i.RGBA16F), O === i.UNSIGNED_BYTE && (Z = At === Jt ? i.SRGB8_ALPHA8 : i.RGBA8), O === i.UNSIGNED_SHORT_4_4_4_4 && (Z = i.RGBA4), O === i.UNSIGNED_SHORT_5_5_5_1 && (Z = i.RGB5_A1);
    }
    return (Z === i.R16F || Z === i.R32F || Z === i.RG16F || Z === i.RG32F || Z === i.RGBA16F || Z === i.RGBA32F) && t.get("EXT_color_buffer_float"), Z;
  }
  function v(E, _) {
    let O;
    return E ? _ === null || _ === 1014 || _ === 1020 ? O = i.DEPTH24_STENCIL8 : _ === 1015 ? O = i.DEPTH32F_STENCIL8 : _ === 1012 && (O = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : _ === null || _ === 1014 || _ === 1020 ? O = i.DEPTH_COMPONENT24 : _ === 1015 ? O = i.DEPTH_COMPONENT32F : _ === 1012 && (O = i.DEPTH_COMPONENT16), O;
  }
  function F(E, _) {
    return m(E) === !0 || E.isFramebufferTexture && E.minFilter !== 1003 && E.minFilter !== 1006 ? Math.log2(Math.max(_.width, _.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? _.mipmaps.length : 1;
  }
  function b(E) {
    const _ = E.target;
    _.removeEventListener("dispose", b), P(_), _.isVideoTexture && c.delete(_);
  }
  function w(E) {
    const _ = E.target;
    _.removeEventListener("dispose", w), M(_);
  }
  function P(E) {
    const _ = n.get(E);
    if (_.__webglInit === void 0) return;
    const O = E.source, Y = h.get(O);
    if (Y) {
      const Q = Y[_.__cacheKey];
      Q.usedTimes--, Q.usedTimes === 0 && y(E), Object.keys(Y).length === 0 && h.delete(O);
    }
    n.remove(E);
  }
  function y(E) {
    const _ = n.get(E);
    i.deleteTexture(_.__webglTexture);
    const O = E.source, Y = h.get(O);
    delete Y[_.__cacheKey], a.memory.textures--;
  }
  function M(E) {
    const _ = n.get(E);
    if (E.depthTexture && (E.depthTexture.dispose(), n.remove(E.depthTexture)), E.isWebGLCubeRenderTarget)
      for (let Y = 0; Y < 6; Y++) {
        if (Array.isArray(_.__webglFramebuffer[Y]))
          for (let Q = 0; Q < _.__webglFramebuffer[Y].length; Q++) i.deleteFramebuffer(_.__webglFramebuffer[Y][Q]);
        else
          i.deleteFramebuffer(_.__webglFramebuffer[Y]);
        _.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer[Y]);
      }
    else {
      if (Array.isArray(_.__webglFramebuffer))
        for (let Y = 0; Y < _.__webglFramebuffer.length; Y++) i.deleteFramebuffer(_.__webglFramebuffer[Y]);
      else
        i.deleteFramebuffer(_.__webglFramebuffer);
      if (_.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer), _.__webglMultisampledFramebuffer && i.deleteFramebuffer(_.__webglMultisampledFramebuffer), _.__webglColorRenderbuffer)
        for (let Y = 0; Y < _.__webglColorRenderbuffer.length; Y++)
          _.__webglColorRenderbuffer[Y] && i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);
      _.__webglDepthRenderbuffer && i.deleteRenderbuffer(_.__webglDepthRenderbuffer);
    }
    const O = E.textures;
    for (let Y = 0, Q = O.length; Y < Q; Y++) {
      const Z = n.get(O[Y]);
      Z.__webglTexture && (i.deleteTexture(Z.__webglTexture), a.memory.textures--), n.remove(O[Y]);
    }
    n.remove(E);
  }
  let R = 0;
  function q() {
    R = 0;
  }
  function G() {
    const E = R;
    return E >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + r.maxTextures), R += 1, E;
  }
  function k(E) {
    const _ = [];
    return _.push(E.wrapS), _.push(E.wrapT), _.push(E.wrapR || 0), _.push(E.magFilter), _.push(E.minFilter), _.push(E.anisotropy), _.push(E.internalFormat), _.push(E.format), _.push(E.type), _.push(E.generateMipmaps), _.push(E.premultiplyAlpha), _.push(E.flipY), _.push(E.unpackAlignment), _.push(E.colorSpace), _.join();
  }
  function j(E, _) {
    const O = n.get(E);
    if (E.isVideoTexture && at(E), E.isRenderTargetTexture === !1 && E.version > 0 && O.__version !== E.version) {
      const Y = E.image;
      if (Y === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (Y.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        N(O, E, _);
        return;
      }
    }
    e.bindTexture(i.TEXTURE_2D, O.__webglTexture, i.TEXTURE0 + _);
  }
  function H(E, _) {
    const O = n.get(E);
    if (E.version > 0 && O.__version !== E.version) {
      N(O, E, _);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, O.__webglTexture, i.TEXTURE0 + _);
  }
  function nt(E, _) {
    const O = n.get(E);
    if (E.version > 0 && O.__version !== E.version) {
      N(O, E, _);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, O.__webglTexture, i.TEXTURE0 + _);
  }
  function V(E, _) {
    const O = n.get(E);
    if (E.version > 0 && O.__version !== E.version) {
      J(O, E, _);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, O.__webglTexture, i.TEXTURE0 + _);
  }
  const ot = {
    1e3: i.REPEAT,
    1001: i.CLAMP_TO_EDGE,
    1002: i.MIRRORED_REPEAT
  }, dt = {
    1003: i.NEAREST,
    1004: i.NEAREST_MIPMAP_NEAREST,
    1005: i.NEAREST_MIPMAP_LINEAR,
    1006: i.LINEAR,
    1007: i.LINEAR_MIPMAP_NEAREST,
    1008: i.LINEAR_MIPMAP_LINEAR
  }, St = {
    512: i.NEVER,
    519: i.ALWAYS,
    513: i.LESS,
    515: i.LEQUAL,
    514: i.EQUAL,
    518: i.GEQUAL,
    516: i.GREATER,
    517: i.NOTEQUAL
  };
  function X(E, _) {
    if (_.type === 1015 && t.has("OES_texture_float_linear") === !1 && (_.magFilter === 1006 || _.magFilter === 1007 || _.magFilter === 1005 || _.magFilter === 1008 || _.minFilter === 1006 || _.minFilter === 1007 || _.minFilter === 1005 || _.minFilter === 1008) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(E, i.TEXTURE_WRAP_S, ot[_.wrapS]), i.texParameteri(E, i.TEXTURE_WRAP_T, ot[_.wrapT]), (E === i.TEXTURE_3D || E === i.TEXTURE_2D_ARRAY) && i.texParameteri(E, i.TEXTURE_WRAP_R, ot[_.wrapR]), i.texParameteri(E, i.TEXTURE_MAG_FILTER, dt[_.magFilter]), i.texParameteri(E, i.TEXTURE_MIN_FILTER, dt[_.minFilter]), _.compareFunction && (i.texParameteri(E, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(E, i.TEXTURE_COMPARE_FUNC, St[_.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (_.magFilter === 1003 || _.minFilter !== 1005 && _.minFilter !== 1008 || _.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
      if (_.anisotropy > 1 || n.get(_).__currentAnisotropy) {
        const O = t.get("EXT_texture_filter_anisotropic");
        i.texParameterf(E, O.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(_.anisotropy, r.getMaxAnisotropy())), n.get(_).__currentAnisotropy = _.anisotropy;
      }
    }
  }
  function lt(E, _) {
    let O = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, _.addEventListener("dispose", b));
    const Y = _.source;
    let Q = h.get(Y);
    Q === void 0 && (Q = {}, h.set(Y, Q));
    const Z = k(_);
    if (Z !== E.__cacheKey) {
      Q[Z] === void 0 && (Q[Z] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, O = !0), Q[Z].usedTimes++;
      const At = Q[E.__cacheKey];
      At !== void 0 && (Q[E.__cacheKey].usedTimes--, At.usedTimes === 0 && y(_)), E.__cacheKey = Z, E.__webglTexture = Q[Z].texture;
    }
    return O;
  }
  function N(E, _, O) {
    let Y = i.TEXTURE_2D;
    (_.isDataArrayTexture || _.isCompressedArrayTexture) && (Y = i.TEXTURE_2D_ARRAY), _.isData3DTexture && (Y = i.TEXTURE_3D);
    const Q = lt(E, _), Z = _.source;
    e.bindTexture(Y, E.__webglTexture, i.TEXTURE0 + O);
    const At = n.get(Z);
    if (Z.version !== At.__version || Q === !0) {
      e.activeTexture(i.TEXTURE0 + O);
      const ht = qt.getPrimaries(qt.workingColorSpace), Mt = _.colorSpace === "" ? null : qt.getPrimaries(_.colorSpace), Wt = _.colorSpace === "" || ht === Mt ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Wt);
      let rt = x(_.image, !1, r.maxTextureSize);
      rt = Lt(_, rt);
      const Ct = s.convert(_.format, _.colorSpace), It = s.convert(_.type);
      let Nt = C(_.internalFormat, Ct, It, _.colorSpace, _.isVideoTexture);
      X(Y, _);
      let yt;
      const Xt = _.mipmaps, Gt = _.isVideoTexture !== !0, jt = At.__version === void 0 || Q === !0, D = Z.dataReady, ft = F(_, rt);
      if (_.isDepthTexture)
        Nt = v(_.format === 1027, _.type), jt && (Gt ? e.texStorage2D(i.TEXTURE_2D, 1, Nt, rt.width, rt.height) : e.texImage2D(i.TEXTURE_2D, 0, Nt, rt.width, rt.height, 0, Ct, It, null));
      else if (_.isDataTexture)
        if (Xt.length > 0) {
          Gt && jt && e.texStorage2D(i.TEXTURE_2D, ft, Nt, Xt[0].width, Xt[0].height);
          for (let W = 0, K = Xt.length; W < K; W++)
            yt = Xt[W], Gt ? D && e.texSubImage2D(i.TEXTURE_2D, W, 0, 0, yt.width, yt.height, Ct, It, yt.data) : e.texImage2D(i.TEXTURE_2D, W, Nt, yt.width, yt.height, 0, Ct, It, yt.data);
          _.generateMipmaps = !1;
        } else
          Gt ? (jt && e.texStorage2D(i.TEXTURE_2D, ft, Nt, rt.width, rt.height), D && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, rt.width, rt.height, Ct, It, rt.data)) : e.texImage2D(i.TEXTURE_2D, 0, Nt, rt.width, rt.height, 0, Ct, It, rt.data);
      else if (_.isCompressedTexture)
        if (_.isCompressedArrayTexture) {
          Gt && jt && e.texStorage3D(i.TEXTURE_2D_ARRAY, ft, Nt, Xt[0].width, Xt[0].height, rt.depth);
          for (let W = 0, K = Xt.length; W < K; W++)
            if (yt = Xt[W], _.format !== 1023)
              if (Ct !== null)
                if (Gt) {
                  if (D)
                    if (_.layerUpdates.size > 0) {
                      const _t = Xs(yt.width, yt.height, _.format, _.type);
                      for (const mt of _.layerUpdates) {
                        const Ot = yt.data.subarray(
                          mt * _t / yt.data.BYTES_PER_ELEMENT,
                          (mt + 1) * _t / yt.data.BYTES_PER_ELEMENT
                        );
                        e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, W, 0, 0, mt, yt.width, yt.height, 1, Ct, Ot);
                      }
                      _.clearLayerUpdates();
                    } else
                      e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, W, 0, 0, 0, yt.width, yt.height, rt.depth, Ct, yt.data);
                } else
                  e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, W, Nt, yt.width, yt.height, rt.depth, 0, yt.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Gt ? D && e.texSubImage3D(i.TEXTURE_2D_ARRAY, W, 0, 0, 0, yt.width, yt.height, rt.depth, Ct, It, yt.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, W, Nt, yt.width, yt.height, rt.depth, 0, Ct, It, yt.data);
        } else {
          Gt && jt && e.texStorage2D(i.TEXTURE_2D, ft, Nt, Xt[0].width, Xt[0].height);
          for (let W = 0, K = Xt.length; W < K; W++)
            yt = Xt[W], _.format !== 1023 ? Ct !== null ? Gt ? D && e.compressedTexSubImage2D(i.TEXTURE_2D, W, 0, 0, yt.width, yt.height, Ct, yt.data) : e.compressedTexImage2D(i.TEXTURE_2D, W, Nt, yt.width, yt.height, 0, yt.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Gt ? D && e.texSubImage2D(i.TEXTURE_2D, W, 0, 0, yt.width, yt.height, Ct, It, yt.data) : e.texImage2D(i.TEXTURE_2D, W, Nt, yt.width, yt.height, 0, Ct, It, yt.data);
        }
      else if (_.isDataArrayTexture)
        if (Gt) {
          if (jt && e.texStorage3D(i.TEXTURE_2D_ARRAY, ft, Nt, rt.width, rt.height, rt.depth), D)
            if (_.layerUpdates.size > 0) {
              const W = Xs(rt.width, rt.height, _.format, _.type);
              for (const K of _.layerUpdates) {
                const _t = rt.data.subarray(
                  K * W / rt.data.BYTES_PER_ELEMENT,
                  (K + 1) * W / rt.data.BYTES_PER_ELEMENT
                );
                e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, K, rt.width, rt.height, 1, Ct, It, _t);
              }
              _.clearLayerUpdates();
            } else
              e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, rt.width, rt.height, rt.depth, Ct, It, rt.data);
        } else
          e.texImage3D(i.TEXTURE_2D_ARRAY, 0, Nt, rt.width, rt.height, rt.depth, 0, Ct, It, rt.data);
      else if (_.isData3DTexture)
        Gt ? (jt && e.texStorage3D(i.TEXTURE_3D, ft, Nt, rt.width, rt.height, rt.depth), D && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, rt.width, rt.height, rt.depth, Ct, It, rt.data)) : e.texImage3D(i.TEXTURE_3D, 0, Nt, rt.width, rt.height, rt.depth, 0, Ct, It, rt.data);
      else if (_.isFramebufferTexture) {
        if (jt)
          if (Gt)
            e.texStorage2D(i.TEXTURE_2D, ft, Nt, rt.width, rt.height);
          else {
            let W = rt.width, K = rt.height;
            for (let _t = 0; _t < ft; _t++)
              e.texImage2D(i.TEXTURE_2D, _t, Nt, W, K, 0, Ct, It, null), W >>= 1, K >>= 1;
          }
      } else if (Xt.length > 0) {
        if (Gt && jt) {
          const W = vt(Xt[0]);
          e.texStorage2D(i.TEXTURE_2D, ft, Nt, W.width, W.height);
        }
        for (let W = 0, K = Xt.length; W < K; W++)
          yt = Xt[W], Gt ? D && e.texSubImage2D(i.TEXTURE_2D, W, 0, 0, Ct, It, yt) : e.texImage2D(i.TEXTURE_2D, W, Nt, Ct, It, yt);
        _.generateMipmaps = !1;
      } else if (Gt) {
        if (jt) {
          const W = vt(rt);
          e.texStorage2D(i.TEXTURE_2D, ft, Nt, W.width, W.height);
        }
        D && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Ct, It, rt);
      } else
        e.texImage2D(i.TEXTURE_2D, 0, Nt, Ct, It, rt);
      m(_) && d(Y), At.__version = Z.version, _.onUpdate && _.onUpdate(_);
    }
    E.__version = _.version;
  }
  function J(E, _, O) {
    if (_.image.length !== 6) return;
    const Y = lt(E, _), Q = _.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, E.__webglTexture, i.TEXTURE0 + O);
    const Z = n.get(Q);
    if (Q.version !== Z.__version || Y === !0) {
      e.activeTexture(i.TEXTURE0 + O);
      const At = qt.getPrimaries(qt.workingColorSpace), ht = _.colorSpace === "" ? null : qt.getPrimaries(_.colorSpace), Mt = _.colorSpace === "" || At === ht ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Mt);
      const Wt = _.isCompressedTexture || _.image[0].isCompressedTexture, rt = _.image[0] && _.image[0].isDataTexture, Ct = [];
      for (let K = 0; K < 6; K++)
        !Wt && !rt ? Ct[K] = x(_.image[K], !0, r.maxCubemapSize) : Ct[K] = rt ? _.image[K].image : _.image[K], Ct[K] = Lt(_, Ct[K]);
      const It = Ct[0], Nt = s.convert(_.format, _.colorSpace), yt = s.convert(_.type), Xt = C(_.internalFormat, Nt, yt, _.colorSpace), Gt = _.isVideoTexture !== !0, jt = Z.__version === void 0 || Y === !0, D = Q.dataReady;
      let ft = F(_, It);
      X(i.TEXTURE_CUBE_MAP, _);
      let W;
      if (Wt) {
        Gt && jt && e.texStorage2D(i.TEXTURE_CUBE_MAP, ft, Xt, It.width, It.height);
        for (let K = 0; K < 6; K++) {
          W = Ct[K].mipmaps;
          for (let _t = 0; _t < W.length; _t++) {
            const mt = W[_t];
            _.format !== 1023 ? Nt !== null ? Gt ? D && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t, 0, 0, mt.width, mt.height, Nt, mt.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t, Xt, mt.width, mt.height, 0, mt.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Gt ? D && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t, 0, 0, mt.width, mt.height, Nt, yt, mt.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t, Xt, mt.width, mt.height, 0, Nt, yt, mt.data);
          }
        }
      } else {
        if (W = _.mipmaps, Gt && jt) {
          W.length > 0 && ft++;
          const K = vt(Ct[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, ft, Xt, K.width, K.height);
        }
        for (let K = 0; K < 6; K++)
          if (rt) {
            Gt ? D && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, Ct[K].width, Ct[K].height, Nt, yt, Ct[K].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, Xt, Ct[K].width, Ct[K].height, 0, Nt, yt, Ct[K].data);
            for (let _t = 0; _t < W.length; _t++) {
              const Ot = W[_t].image[K].image;
              Gt ? D && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t + 1, 0, 0, Ot.width, Ot.height, Nt, yt, Ot.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t + 1, Xt, Ot.width, Ot.height, 0, Nt, yt, Ot.data);
            }
          } else {
            Gt ? D && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, Nt, yt, Ct[K]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, Xt, Nt, yt, Ct[K]);
            for (let _t = 0; _t < W.length; _t++) {
              const mt = W[_t];
              Gt ? D && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t + 1, 0, 0, Nt, yt, mt.image[K]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + K, _t + 1, Xt, Nt, yt, mt.image[K]);
            }
          }
      }
      m(_) && d(i.TEXTURE_CUBE_MAP), Z.__version = Q.version, _.onUpdate && _.onUpdate(_);
    }
    E.__version = _.version;
  }
  function pt(E, _, O, Y, Q, Z) {
    const At = s.convert(O.format, O.colorSpace), ht = s.convert(O.type), Mt = C(O.internalFormat, At, ht, O.colorSpace), Wt = n.get(_), rt = n.get(O);
    if (rt.__renderTarget = _, !Wt.__hasExternalTextures) {
      const Ct = Math.max(1, _.width >> Z), It = Math.max(1, _.height >> Z);
      Q === i.TEXTURE_3D || Q === i.TEXTURE_2D_ARRAY ? e.texImage3D(Q, Z, Mt, Ct, It, _.depth, 0, At, ht, null) : e.texImage2D(Q, Z, Mt, Ct, It, 0, At, ht, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, E), xt(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, Y, Q, rt.__webglTexture, 0, tt(_)) : (Q === i.TEXTURE_2D || Q >= i.TEXTURE_CUBE_MAP_POSITIVE_X && Q <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, Y, Q, rt.__webglTexture, Z), e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function et(E, _, O) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, E), _.depthBuffer) {
      const Y = _.depthTexture, Q = Y && Y.isDepthTexture ? Y.type : null, Z = v(_.stencilBuffer, Q), At = _.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ht = tt(_);
      xt(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ht, Z, _.width, _.height) : O ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ht, Z, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, Z, _.width, _.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, At, i.RENDERBUFFER, E);
    } else {
      const Y = _.textures;
      for (let Q = 0; Q < Y.length; Q++) {
        const Z = Y[Q], At = s.convert(Z.format, Z.colorSpace), ht = s.convert(Z.type), Mt = C(Z.internalFormat, At, ht, Z.colorSpace), Wt = tt(_);
        O && xt(_) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Wt, Mt, _.width, _.height) : xt(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Wt, Mt, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, Mt, _.width, _.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function Tt(E, _) {
    if (_ && _.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (e.bindFramebuffer(i.FRAMEBUFFER, E), !(_.depthTexture && _.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const Y = n.get(_.depthTexture);
    Y.__renderTarget = _, (!Y.__webglTexture || _.depthTexture.image.width !== _.width || _.depthTexture.image.height !== _.height) && (_.depthTexture.image.width = _.width, _.depthTexture.image.height = _.height, _.depthTexture.needsUpdate = !0), j(_.depthTexture, 0);
    const Q = Y.__webglTexture, Z = tt(_);
    if (_.depthTexture.format === 1026)
      xt(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, Q, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, Q, 0);
    else if (_.depthTexture.format === 1027)
      xt(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, Q, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, Q, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Dt(E) {
    const _ = n.get(E), O = E.isWebGLCubeRenderTarget === !0;
    if (_.__boundDepthTexture !== E.depthTexture) {
      const Y = E.depthTexture;
      if (_.__depthDisposeCallback && _.__depthDisposeCallback(), Y) {
        const Q = () => {
          delete _.__boundDepthTexture, delete _.__depthDisposeCallback, Y.removeEventListener("dispose", Q);
        };
        Y.addEventListener("dispose", Q), _.__depthDisposeCallback = Q;
      }
      _.__boundDepthTexture = Y;
    }
    if (E.depthTexture && !_.__autoAllocateDepthBuffer) {
      if (O) throw new Error("target.depthTexture not supported in Cube render targets");
      Tt(_.__webglFramebuffer, E);
    } else if (O) {
      _.__webglDepthbuffer = [];
      for (let Y = 0; Y < 6; Y++)
        if (e.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer[Y]), _.__webglDepthbuffer[Y] === void 0)
          _.__webglDepthbuffer[Y] = i.createRenderbuffer(), et(_.__webglDepthbuffer[Y], E, !1);
        else {
          const Q = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Z = _.__webglDepthbuffer[Y];
          i.bindRenderbuffer(i.RENDERBUFFER, Z), i.framebufferRenderbuffer(i.FRAMEBUFFER, Q, i.RENDERBUFFER, Z);
        }
    } else if (e.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer), _.__webglDepthbuffer === void 0)
      _.__webglDepthbuffer = i.createRenderbuffer(), et(_.__webglDepthbuffer, E, !1);
    else {
      const Y = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Q = _.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, Q), i.framebufferRenderbuffer(i.FRAMEBUFFER, Y, i.RENDERBUFFER, Q);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Ut(E, _, O) {
    const Y = n.get(E);
    _ !== void 0 && pt(Y.__webglFramebuffer, E, E.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), O !== void 0 && Dt(E);
  }
  function Ht(E) {
    const _ = E.texture, O = n.get(E), Y = n.get(_);
    E.addEventListener("dispose", w);
    const Q = E.textures, Z = E.isWebGLCubeRenderTarget === !0, At = Q.length > 1;
    if (At || (Y.__webglTexture === void 0 && (Y.__webglTexture = i.createTexture()), Y.__version = _.version, a.memory.textures++), Z) {
      O.__webglFramebuffer = [];
      for (let ht = 0; ht < 6; ht++)
        if (_.mipmaps && _.mipmaps.length > 0) {
          O.__webglFramebuffer[ht] = [];
          for (let Mt = 0; Mt < _.mipmaps.length; Mt++)
            O.__webglFramebuffer[ht][Mt] = i.createFramebuffer();
        } else
          O.__webglFramebuffer[ht] = i.createFramebuffer();
    } else {
      if (_.mipmaps && _.mipmaps.length > 0) {
        O.__webglFramebuffer = [];
        for (let ht = 0; ht < _.mipmaps.length; ht++)
          O.__webglFramebuffer[ht] = i.createFramebuffer();
      } else
        O.__webglFramebuffer = i.createFramebuffer();
      if (At)
        for (let ht = 0, Mt = Q.length; ht < Mt; ht++) {
          const Wt = n.get(Q[ht]);
          Wt.__webglTexture === void 0 && (Wt.__webglTexture = i.createTexture(), a.memory.textures++);
        }
      if (E.samples > 0 && xt(E) === !1) {
        O.__webglMultisampledFramebuffer = i.createFramebuffer(), O.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, O.__webglMultisampledFramebuffer);
        for (let ht = 0; ht < Q.length; ht++) {
          const Mt = Q[ht];
          O.__webglColorRenderbuffer[ht] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, O.__webglColorRenderbuffer[ht]);
          const Wt = s.convert(Mt.format, Mt.colorSpace), rt = s.convert(Mt.type), Ct = C(Mt.internalFormat, Wt, rt, Mt.colorSpace, E.isXRRenderTarget === !0), It = tt(E);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, It, Ct, E.width, E.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ht, i.RENDERBUFFER, O.__webglColorRenderbuffer[ht]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), E.depthBuffer && (O.__webglDepthRenderbuffer = i.createRenderbuffer(), et(O.__webglDepthRenderbuffer, E, !0)), e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (Z) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, Y.__webglTexture), X(i.TEXTURE_CUBE_MAP, _);
      for (let ht = 0; ht < 6; ht++)
        if (_.mipmaps && _.mipmaps.length > 0)
          for (let Mt = 0; Mt < _.mipmaps.length; Mt++)
            pt(O.__webglFramebuffer[ht][Mt], E, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ht, Mt);
        else
          pt(O.__webglFramebuffer[ht], E, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ht, 0);
      m(_) && d(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (At) {
      for (let ht = 0, Mt = Q.length; ht < Mt; ht++) {
        const Wt = Q[ht], rt = n.get(Wt);
        e.bindTexture(i.TEXTURE_2D, rt.__webglTexture), X(i.TEXTURE_2D, Wt), pt(O.__webglFramebuffer, E, Wt, i.COLOR_ATTACHMENT0 + ht, i.TEXTURE_2D, 0), m(Wt) && d(i.TEXTURE_2D);
      }
      e.unbindTexture();
    } else {
      let ht = i.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (ht = E.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(ht, Y.__webglTexture), X(ht, _), _.mipmaps && _.mipmaps.length > 0)
        for (let Mt = 0; Mt < _.mipmaps.length; Mt++)
          pt(O.__webglFramebuffer[Mt], E, _, i.COLOR_ATTACHMENT0, ht, Mt);
      else
        pt(O.__webglFramebuffer, E, _, i.COLOR_ATTACHMENT0, ht, 0);
      m(_) && d(ht), e.unbindTexture();
    }
    E.depthBuffer && Dt(E);
  }
  function $(E) {
    const _ = E.textures;
    for (let O = 0, Y = _.length; O < Y; O++) {
      const Q = _[O];
      if (m(Q)) {
        const Z = T(E), At = n.get(Q).__webglTexture;
        e.bindTexture(Z, At), d(Z), e.unbindTexture();
      }
    }
  }
  const it = [], A = [];
  function Et(E) {
    if (E.samples > 0) {
      if (xt(E) === !1) {
        const _ = E.textures, O = E.width, Y = E.height;
        let Q = i.COLOR_BUFFER_BIT;
        const Z = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, At = n.get(E), ht = _.length > 1;
        if (ht)
          for (let Mt = 0; Mt < _.length; Mt++)
            e.bindFramebuffer(i.FRAMEBUFFER, At.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Mt, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, At.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Mt, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, At.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, At.__webglFramebuffer);
        for (let Mt = 0; Mt < _.length; Mt++) {
          if (E.resolveDepthBuffer && (E.depthBuffer && (Q |= i.DEPTH_BUFFER_BIT), E.stencilBuffer && E.resolveStencilBuffer && (Q |= i.STENCIL_BUFFER_BIT)), ht) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, At.__webglColorRenderbuffer[Mt]);
            const Wt = n.get(_[Mt]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Wt, 0);
          }
          i.blitFramebuffer(0, 0, O, Y, 0, 0, O, Y, Q, i.NEAREST), l === !0 && (it.length = 0, A.length = 0, it.push(i.COLOR_ATTACHMENT0 + Mt), E.depthBuffer && E.resolveDepthBuffer === !1 && (it.push(Z), A.push(Z), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, A)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, it));
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), ht)
          for (let Mt = 0; Mt < _.length; Mt++) {
            e.bindFramebuffer(i.FRAMEBUFFER, At.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Mt, i.RENDERBUFFER, At.__webglColorRenderbuffer[Mt]);
            const Wt = n.get(_[Mt]).__webglTexture;
            e.bindFramebuffer(i.FRAMEBUFFER, At.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Mt, i.TEXTURE_2D, Wt, 0);
          }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, At.__webglMultisampledFramebuffer);
      } else if (E.depthBuffer && E.resolveDepthBuffer === !1 && l) {
        const _ = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [_]);
      }
    }
  }
  function tt(E) {
    return Math.min(r.maxSamples, E.samples);
  }
  function xt(E) {
    const _ = n.get(E);
    return E.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && _.__useRenderToTexture !== !1;
  }
  function at(E) {
    const _ = a.render.frame;
    c.get(E) !== _ && (c.set(E, _), E.update());
  }
  function Lt(E, _) {
    const O = E.colorSpace, Y = E.format, Q = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || O !== zn && O !== "" && (qt.getTransfer(O) === Jt ? (Y !== 1023 || Q !== 1009) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", O)), _;
  }
  function vt(E) {
    return typeof HTMLImageElement < "u" && E instanceof HTMLImageElement ? (u.width = E.naturalWidth || E.width, u.height = E.naturalHeight || E.height) : typeof VideoFrame < "u" && E instanceof VideoFrame ? (u.width = E.displayWidth, u.height = E.displayHeight) : (u.width = E.width, u.height = E.height), u;
  }
  this.allocateTextureUnit = G, this.resetTextureUnits = q, this.setTexture2D = j, this.setTexture2DArray = H, this.setTexture3D = nt, this.setTextureCube = V, this.rebindTextures = Ut, this.setupRenderTarget = Ht, this.updateRenderTargetMipmap = $, this.updateMultisampleRenderTarget = Et, this.setupDepthRenderbuffer = Dt, this.setupFrameBufferTexture = pt, this.useMultisampledRTT = xt;
}
function Xh(i, t) {
  function e(n, r = "") {
    let s;
    const a = qt.getTransfer(r);
    if (n === 1009) return i.UNSIGNED_BYTE;
    if (n === 1017) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === 1018) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === 35902) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === 1010) return i.BYTE;
    if (n === 1011) return i.SHORT;
    if (n === 1012) return i.UNSIGNED_SHORT;
    if (n === 1013) return i.INT;
    if (n === 1014) return i.UNSIGNED_INT;
    if (n === 1015) return i.FLOAT;
    if (n === 1016) return i.HALF_FLOAT;
    if (n === 1021) return i.ALPHA;
    if (n === 1022) return i.RGB;
    if (n === 1023) return i.RGBA;
    if (n === 1024) return i.LUMINANCE;
    if (n === 1025) return i.LUMINANCE_ALPHA;
    if (n === 1026) return i.DEPTH_COMPONENT;
    if (n === 1027) return i.DEPTH_STENCIL;
    if (n === 1028) return i.RED;
    if (n === 1029) return i.RED_INTEGER;
    if (n === 1030) return i.RG;
    if (n === 1031) return i.RG_INTEGER;
    if (n === 1033) return i.RGBA_INTEGER;
    if (n === 33776 || n === 33777 || n === 33778 || n === 33779)
      if (a === Jt)
        if (s = t.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = t.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === 35840 || n === 35841 || n === 35842 || n === 35843)
      if (s = t.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === 36196 || n === 37492 || n === 37496)
      if (s = t.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === 36196 || n === 37492) return a === Jt ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === 37496) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821)
      if (s = t.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === 37808) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === 37809) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === 37810) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === 37811) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === 37812) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === 37813) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === 37814) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === 37815) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === 37816) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === 37817) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === 37818) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === 37819) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === 37820) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === 37821) return a === Jt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === 36492 || n === 36494 || n === 36495)
      if (s = t.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === 36492) return a === Jt ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === 36283 || n === 36284 || n === 36285 || n === 36286)
      if (s = t.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === 36492) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === 1020 ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
class qh extends we {
  constructor(t = []) {
    super(), this.isArrayCamera = !0, this.cameras = t;
  }
}
class an extends he {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const Yh = { type: "move" };
class Mr {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new an(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new an(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new L(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new L()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new an(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new L(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new L()), this._grip;
  }
  dispatchEvent(t) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(t), this._grip !== null && this._grip.dispatchEvent(t), this._hand !== null && this._hand.dispatchEvent(t), this;
  }
  connect(t) {
    if (t && t.hand) {
      const e = this._hand;
      if (e)
        for (const n of t.hand.values())
          this._getHandJoint(e, n);
    }
    return this.dispatchEvent({ type: "connected", data: t }), this;
  }
  disconnect(t) {
    return this.dispatchEvent({ type: "disconnected", data: t }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(t, e, n) {
    let r = null, s = null, a = null;
    const o = this._targetRay, l = this._grip, u = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (u && t.hand) {
        a = !0;
        for (const x of t.hand.values()) {
          const m = e.getJointPose(x, n), d = this._getHandJoint(u, x);
          m !== null && (d.matrix.fromArray(m.transform.matrix), d.matrix.decompose(d.position, d.rotation, d.scale), d.matrixWorldNeedsUpdate = !0, d.jointRadius = m.radius), d.visible = m !== null;
        }
        const c = u.joints["index-finger-tip"], f = u.joints["thumb-tip"], h = c.position.distanceTo(f.position), p = 0.02, g = 5e-3;
        u.inputState.pinching && h > p + g ? (u.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: t.handedness,
          target: this
        })) : !u.inputState.pinching && h <= p - g && (u.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: t.handedness,
          target: this
        }));
      } else
        l !== null && t.gripSpace && (s = e.getPose(t.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
      o !== null && (r = e.getPose(t.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Yh)));
    }
    return o !== null && (o.visible = r !== null), l !== null && (l.visible = s !== null), u !== null && (u.visible = a !== null), this;
  }
  // private method
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new an();
      n.matrixAutoUpdate = !1, n.visible = !1, t.joints[e.jointName] = n, t.add(n);
    }
    return t.joints[e.jointName];
  }
}
const Zh = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, $h = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class Kh {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(t, e, n) {
    if (this.texture === null) {
      const r = new ve(), s = t.properties.get(r);
      s.__webglTexture = e.texture, (e.depthNear != n.depthNear || e.depthFar != n.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = r;
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport, n = new on({
        vertexShader: Zh,
        fragmentShader: $h,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: e.z },
          depthHeight: { value: e.w }
        }
      });
      this.mesh = new Ee(new Wn(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class Jh extends Gn {
  constructor(t, e) {
    super();
    const n = this;
    let r = null, s = 1, a = null, o = "local-floor", l = 1, u = null, c = null, f = null, h = null, p = null, g = null;
    const x = new Kh(), m = e.getContextAttributes();
    let d = null, T = null;
    const C = [], v = [], F = new ct();
    let b = null;
    const w = new we();
    w.viewport = new se();
    const P = new we();
    P.viewport = new se();
    const y = [w, P], M = new qh();
    let R = null, q = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(N) {
      let J = C[N];
      return J === void 0 && (J = new Mr(), C[N] = J), J.getTargetRaySpace();
    }, this.getControllerGrip = function(N) {
      let J = C[N];
      return J === void 0 && (J = new Mr(), C[N] = J), J.getGripSpace();
    }, this.getHand = function(N) {
      let J = C[N];
      return J === void 0 && (J = new Mr(), C[N] = J), J.getHandSpace();
    };
    function G(N) {
      const J = v.indexOf(N.inputSource);
      if (J === -1)
        return;
      const pt = C[J];
      pt !== void 0 && (pt.update(N.inputSource, N.frame, u || a), pt.dispatchEvent({ type: N.type, data: N.inputSource }));
    }
    function k() {
      r.removeEventListener("select", G), r.removeEventListener("selectstart", G), r.removeEventListener("selectend", G), r.removeEventListener("squeeze", G), r.removeEventListener("squeezestart", G), r.removeEventListener("squeezeend", G), r.removeEventListener("end", k), r.removeEventListener("inputsourceschange", j);
      for (let N = 0; N < C.length; N++) {
        const J = v[N];
        J !== null && (v[N] = null, C[N].disconnect(J));
      }
      R = null, q = null, x.reset(), t.setRenderTarget(d), p = null, h = null, f = null, r = null, T = null, lt.stop(), n.isPresenting = !1, t.setPixelRatio(b), t.setSize(F.width, F.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(N) {
      s = N, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(N) {
      o = N, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return u || a;
    }, this.setReferenceSpace = function(N) {
      u = N;
    }, this.getBaseLayer = function() {
      return h !== null ? h : p;
    }, this.getBinding = function() {
      return f;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(N) {
      if (r = N, r !== null) {
        if (d = t.getRenderTarget(), r.addEventListener("select", G), r.addEventListener("selectstart", G), r.addEventListener("selectend", G), r.addEventListener("squeeze", G), r.addEventListener("squeezestart", G), r.addEventListener("squeezeend", G), r.addEventListener("end", k), r.addEventListener("inputsourceschange", j), m.xrCompatible !== !0 && await e.makeXRCompatible(), b = t.getPixelRatio(), t.getSize(F), r.renderState.layers === void 0) {
          const J = {
            antialias: m.antialias,
            alpha: !0,
            depth: m.depth,
            stencil: m.stencil,
            framebufferScaleFactor: s
          };
          p = new XRWebGLLayer(r, e, J), r.updateRenderState({ baseLayer: p }), t.setPixelRatio(1), t.setSize(p.framebufferWidth, p.framebufferHeight, !1), T = new xn(
            p.framebufferWidth,
            p.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: t.outputColorSpace,
              stencilBuffer: m.stencil
            }
          );
        } else {
          let J = null, pt = null, et = null;
          m.depth && (et = m.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, J = m.stencil ? 1027 : 1026, pt = m.stencil ? 1020 : 1014);
          const Tt = {
            colorFormat: e.RGBA8,
            depthFormat: et,
            scaleFactor: s
          };
          f = new XRWebGLBinding(r, e), h = f.createProjectionLayer(Tt), r.updateRenderState({ layers: [h] }), t.setPixelRatio(1), t.setSize(h.textureWidth, h.textureHeight, !1), T = new xn(
            h.textureWidth,
            h.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new xa(h.textureWidth, h.textureHeight, pt, void 0, void 0, void 0, void 0, void 0, void 0, J),
              stencilBuffer: m.stencil,
              colorSpace: t.outputColorSpace,
              samples: m.antialias ? 4 : 0,
              resolveDepthBuffer: h.ignoreDepthValues === !1
            }
          );
        }
        T.isXRRenderTarget = !0, this.setFoveation(l), u = null, a = await r.requestReferenceSpace(o), lt.setContext(r), lt.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return x.getDepthTexture();
    };
    function j(N) {
      for (let J = 0; J < N.removed.length; J++) {
        const pt = N.removed[J], et = v.indexOf(pt);
        et >= 0 && (v[et] = null, C[et].disconnect(pt));
      }
      for (let J = 0; J < N.added.length; J++) {
        const pt = N.added[J];
        let et = v.indexOf(pt);
        if (et === -1) {
          for (let Dt = 0; Dt < C.length; Dt++)
            if (Dt >= v.length) {
              v.push(pt), et = Dt;
              break;
            } else if (v[Dt] === null) {
              v[Dt] = pt, et = Dt;
              break;
            }
          if (et === -1) break;
        }
        const Tt = C[et];
        Tt && Tt.connect(pt);
      }
    }
    const H = new L(), nt = new L();
    function V(N, J, pt) {
      H.setFromMatrixPosition(J.matrixWorld), nt.setFromMatrixPosition(pt.matrixWorld);
      const et = H.distanceTo(nt), Tt = J.projectionMatrix.elements, Dt = pt.projectionMatrix.elements, Ut = Tt[14] / (Tt[10] - 1), Ht = Tt[14] / (Tt[10] + 1), $ = (Tt[9] + 1) / Tt[5], it = (Tt[9] - 1) / Tt[5], A = (Tt[8] - 1) / Tt[0], Et = (Dt[8] + 1) / Dt[0], tt = Ut * A, xt = Ut * Et, at = et / (-A + Et), Lt = at * -A;
      if (J.matrixWorld.decompose(N.position, N.quaternion, N.scale), N.translateX(Lt), N.translateZ(at), N.matrixWorld.compose(N.position, N.quaternion, N.scale), N.matrixWorldInverse.copy(N.matrixWorld).invert(), Tt[10] === -1)
        N.projectionMatrix.copy(J.projectionMatrix), N.projectionMatrixInverse.copy(J.projectionMatrixInverse);
      else {
        const vt = Ut + at, E = Ht + at, _ = tt - Lt, O = xt + (et - Lt), Y = $ * Ht / E * vt, Q = it * Ht / E * vt;
        N.projectionMatrix.makePerspective(_, O, Y, Q, vt, E), N.projectionMatrixInverse.copy(N.projectionMatrix).invert();
      }
    }
    function ot(N, J) {
      J === null ? N.matrixWorld.copy(N.matrix) : N.matrixWorld.multiplyMatrices(J.matrixWorld, N.matrix), N.matrixWorldInverse.copy(N.matrixWorld).invert();
    }
    this.updateCamera = function(N) {
      if (r === null) return;
      let J = N.near, pt = N.far;
      x.texture !== null && (x.depthNear > 0 && (J = x.depthNear), x.depthFar > 0 && (pt = x.depthFar)), M.near = P.near = w.near = J, M.far = P.far = w.far = pt, (R !== M.near || q !== M.far) && (r.updateRenderState({
        depthNear: M.near,
        depthFar: M.far
      }), R = M.near, q = M.far), w.layers.mask = N.layers.mask | 2, P.layers.mask = N.layers.mask | 4, M.layers.mask = w.layers.mask | P.layers.mask;
      const et = N.parent, Tt = M.cameras;
      ot(M, et);
      for (let Dt = 0; Dt < Tt.length; Dt++)
        ot(Tt[Dt], et);
      Tt.length === 2 ? V(M, w, P) : M.projectionMatrix.copy(w.projectionMatrix), dt(N, M, et);
    };
    function dt(N, J, pt) {
      pt === null ? N.matrix.copy(J.matrixWorld) : (N.matrix.copy(pt.matrixWorld), N.matrix.invert(), N.matrix.multiply(J.matrixWorld)), N.matrix.decompose(N.position, N.quaternion, N.scale), N.updateMatrixWorld(!0), N.projectionMatrix.copy(J.projectionMatrix), N.projectionMatrixInverse.copy(J.projectionMatrixInverse), N.isPerspectiveCamera && (N.fov = br * 2 * Math.atan(1 / N.projectionMatrix.elements[5]), N.zoom = 1);
    }
    this.getCamera = function() {
      return M;
    }, this.getFoveation = function() {
      if (!(h === null && p === null))
        return l;
    }, this.setFoveation = function(N) {
      l = N, h !== null && (h.fixedFoveation = N), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = N);
    }, this.hasDepthSensing = function() {
      return x.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return x.getMesh(M);
    };
    let St = null;
    function X(N, J) {
      if (c = J.getViewerPose(u || a), g = J, c !== null) {
        const pt = c.views;
        p !== null && (t.setRenderTargetFramebuffer(T, p.framebuffer), t.setRenderTarget(T));
        let et = !1;
        pt.length !== M.cameras.length && (M.cameras.length = 0, et = !0);
        for (let Dt = 0; Dt < pt.length; Dt++) {
          const Ut = pt[Dt];
          let Ht = null;
          if (p !== null)
            Ht = p.getViewport(Ut);
          else {
            const it = f.getViewSubImage(h, Ut);
            Ht = it.viewport, Dt === 0 && (t.setRenderTargetTextures(
              T,
              it.colorTexture,
              h.ignoreDepthValues ? void 0 : it.depthStencilTexture
            ), t.setRenderTarget(T));
          }
          let $ = y[Dt];
          $ === void 0 && ($ = new we(), $.layers.enable(Dt), $.viewport = new se(), y[Dt] = $), $.matrix.fromArray(Ut.transform.matrix), $.matrix.decompose($.position, $.quaternion, $.scale), $.projectionMatrix.fromArray(Ut.projectionMatrix), $.projectionMatrixInverse.copy($.projectionMatrix).invert(), $.viewport.set(Ht.x, Ht.y, Ht.width, Ht.height), Dt === 0 && (M.matrix.copy($.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), et === !0 && M.cameras.push($);
        }
        const Tt = r.enabledFeatures;
        if (Tt && Tt.includes("depth-sensing")) {
          const Dt = f.getDepthInformation(pt[0]);
          Dt && Dt.isValid && Dt.texture && x.init(t, Dt, r.renderState);
        }
      }
      for (let pt = 0; pt < C.length; pt++) {
        const et = v[pt], Tt = C[pt];
        et !== null && Tt !== void 0 && Tt.update(et, J, u || a);
      }
      St && St(N, J), J.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: J }), g = null;
    }
    const lt = new _a();
    lt.setAnimationLoop(X), this.setAnimationLoop = function(N) {
      St = N;
    }, this.dispose = function() {
    };
  }
}
const pn = /* @__PURE__ */ new Ge(), jh = /* @__PURE__ */ new ne();
function Qh(i, t) {
  function e(m, d) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), d.value.copy(m.matrix);
  }
  function n(m, d) {
    d.color.getRGB(m.fogColor.value, pa(i)), d.isFog ? (m.fogNear.value = d.near, m.fogFar.value = d.far) : d.isFogExp2 && (m.fogDensity.value = d.density);
  }
  function r(m, d, T, C, v) {
    d.isMeshBasicMaterial || d.isMeshLambertMaterial ? s(m, d) : d.isMeshToonMaterial ? (s(m, d), f(m, d)) : d.isMeshPhongMaterial ? (s(m, d), c(m, d)) : d.isMeshStandardMaterial ? (s(m, d), h(m, d), d.isMeshPhysicalMaterial && p(m, d, v)) : d.isMeshMatcapMaterial ? (s(m, d), g(m, d)) : d.isMeshDepthMaterial ? s(m, d) : d.isMeshDistanceMaterial ? (s(m, d), x(m, d)) : d.isMeshNormalMaterial ? s(m, d) : d.isLineBasicMaterial ? (a(m, d), d.isLineDashedMaterial && o(m, d)) : d.isPointsMaterial ? l(m, d, T, C) : d.isSpriteMaterial ? u(m, d) : d.isShadowMaterial ? (m.color.value.copy(d.color), m.opacity.value = d.opacity) : d.isShaderMaterial && (d.uniformsNeedUpdate = !1);
  }
  function s(m, d) {
    m.opacity.value = d.opacity, d.color && m.diffuse.value.copy(d.color), d.emissive && m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity), d.map && (m.map.value = d.map, e(d.map, m.mapTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, e(d.alphaMap, m.alphaMapTransform)), d.bumpMap && (m.bumpMap.value = d.bumpMap, e(d.bumpMap, m.bumpMapTransform), m.bumpScale.value = d.bumpScale, d.side === 1 && (m.bumpScale.value *= -1)), d.normalMap && (m.normalMap.value = d.normalMap, e(d.normalMap, m.normalMapTransform), m.normalScale.value.copy(d.normalScale), d.side === 1 && m.normalScale.value.negate()), d.displacementMap && (m.displacementMap.value = d.displacementMap, e(d.displacementMap, m.displacementMapTransform), m.displacementScale.value = d.displacementScale, m.displacementBias.value = d.displacementBias), d.emissiveMap && (m.emissiveMap.value = d.emissiveMap, e(d.emissiveMap, m.emissiveMapTransform)), d.specularMap && (m.specularMap.value = d.specularMap, e(d.specularMap, m.specularMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
    const T = t.get(d), C = T.envMap, v = T.envMapRotation;
    C && (m.envMap.value = C, pn.copy(v), pn.x *= -1, pn.y *= -1, pn.z *= -1, C.isCubeTexture && C.isRenderTargetTexture === !1 && (pn.y *= -1, pn.z *= -1), m.envMapRotation.value.setFromMatrix4(jh.makeRotationFromEuler(pn)), m.flipEnvMap.value = C.isCubeTexture && C.isRenderTargetTexture === !1 ? -1 : 1, m.reflectivity.value = d.reflectivity, m.ior.value = d.ior, m.refractionRatio.value = d.refractionRatio), d.lightMap && (m.lightMap.value = d.lightMap, m.lightMapIntensity.value = d.lightMapIntensity, e(d.lightMap, m.lightMapTransform)), d.aoMap && (m.aoMap.value = d.aoMap, m.aoMapIntensity.value = d.aoMapIntensity, e(d.aoMap, m.aoMapTransform));
  }
  function a(m, d) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, d.map && (m.map.value = d.map, e(d.map, m.mapTransform));
  }
  function o(m, d) {
    m.dashSize.value = d.dashSize, m.totalSize.value = d.dashSize + d.gapSize, m.scale.value = d.scale;
  }
  function l(m, d, T, C) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, m.size.value = d.size * T, m.scale.value = C * 0.5, d.map && (m.map.value = d.map, e(d.map, m.uvTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, e(d.alphaMap, m.alphaMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
  }
  function u(m, d) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, m.rotation.value = d.rotation, d.map && (m.map.value = d.map, e(d.map, m.mapTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, e(d.alphaMap, m.alphaMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
  }
  function c(m, d) {
    m.specular.value.copy(d.specular), m.shininess.value = Math.max(d.shininess, 1e-4);
  }
  function f(m, d) {
    d.gradientMap && (m.gradientMap.value = d.gradientMap);
  }
  function h(m, d) {
    m.metalness.value = d.metalness, d.metalnessMap && (m.metalnessMap.value = d.metalnessMap, e(d.metalnessMap, m.metalnessMapTransform)), m.roughness.value = d.roughness, d.roughnessMap && (m.roughnessMap.value = d.roughnessMap, e(d.roughnessMap, m.roughnessMapTransform)), d.envMap && (m.envMapIntensity.value = d.envMapIntensity);
  }
  function p(m, d, T) {
    m.ior.value = d.ior, d.sheen > 0 && (m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen), m.sheenRoughness.value = d.sheenRoughness, d.sheenColorMap && (m.sheenColorMap.value = d.sheenColorMap, e(d.sheenColorMap, m.sheenColorMapTransform)), d.sheenRoughnessMap && (m.sheenRoughnessMap.value = d.sheenRoughnessMap, e(d.sheenRoughnessMap, m.sheenRoughnessMapTransform))), d.clearcoat > 0 && (m.clearcoat.value = d.clearcoat, m.clearcoatRoughness.value = d.clearcoatRoughness, d.clearcoatMap && (m.clearcoatMap.value = d.clearcoatMap, e(d.clearcoatMap, m.clearcoatMapTransform)), d.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = d.clearcoatRoughnessMap, e(d.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), d.clearcoatNormalMap && (m.clearcoatNormalMap.value = d.clearcoatNormalMap, e(d.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale), d.side === 1 && m.clearcoatNormalScale.value.negate())), d.dispersion > 0 && (m.dispersion.value = d.dispersion), d.iridescence > 0 && (m.iridescence.value = d.iridescence, m.iridescenceIOR.value = d.iridescenceIOR, m.iridescenceThicknessMinimum.value = d.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = d.iridescenceThicknessRange[1], d.iridescenceMap && (m.iridescenceMap.value = d.iridescenceMap, e(d.iridescenceMap, m.iridescenceMapTransform)), d.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = d.iridescenceThicknessMap, e(d.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), d.transmission > 0 && (m.transmission.value = d.transmission, m.transmissionSamplerMap.value = T.texture, m.transmissionSamplerSize.value.set(T.width, T.height), d.transmissionMap && (m.transmissionMap.value = d.transmissionMap, e(d.transmissionMap, m.transmissionMapTransform)), m.thickness.value = d.thickness, d.thicknessMap && (m.thicknessMap.value = d.thicknessMap, e(d.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = d.attenuationDistance, m.attenuationColor.value.copy(d.attenuationColor)), d.anisotropy > 0 && (m.anisotropyVector.value.set(d.anisotropy * Math.cos(d.anisotropyRotation), d.anisotropy * Math.sin(d.anisotropyRotation)), d.anisotropyMap && (m.anisotropyMap.value = d.anisotropyMap, e(d.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = d.specularIntensity, m.specularColor.value.copy(d.specularColor), d.specularColorMap && (m.specularColorMap.value = d.specularColorMap, e(d.specularColorMap, m.specularColorMapTransform)), d.specularIntensityMap && (m.specularIntensityMap.value = d.specularIntensityMap, e(d.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function g(m, d) {
    d.matcap && (m.matcap.value = d.matcap);
  }
  function x(m, d) {
    const T = t.get(d).light;
    m.referencePosition.value.setFromMatrixPosition(T.matrixWorld), m.nearDistance.value = T.shadow.camera.near, m.farDistance.value = T.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function tf(i, t, e, n) {
  let r = {}, s = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(T, C) {
    const v = C.program;
    n.uniformBlockBinding(T, v);
  }
  function u(T, C) {
    let v = r[T.id];
    v === void 0 && (g(T), v = c(T), r[T.id] = v, T.addEventListener("dispose", m));
    const F = C.program;
    n.updateUBOMapping(T, F);
    const b = t.render.frame;
    s[T.id] !== b && (h(T), s[T.id] = b);
  }
  function c(T) {
    const C = f();
    T.__bindingPointIndex = C;
    const v = i.createBuffer(), F = T.__size, b = T.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, v), i.bufferData(i.UNIFORM_BUFFER, F, b), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, C, v), v;
  }
  function f() {
    for (let T = 0; T < o; T++)
      if (a.indexOf(T) === -1)
        return a.push(T), T;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function h(T) {
    const C = r[T.id], v = T.uniforms, F = T.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, C);
    for (let b = 0, w = v.length; b < w; b++) {
      const P = Array.isArray(v[b]) ? v[b] : [v[b]];
      for (let y = 0, M = P.length; y < M; y++) {
        const R = P[y];
        if (p(R, b, y, F) === !0) {
          const q = R.__offset, G = Array.isArray(R.value) ? R.value : [R.value];
          let k = 0;
          for (let j = 0; j < G.length; j++) {
            const H = G[j], nt = x(H);
            typeof H == "number" || typeof H == "boolean" ? (R.__data[0] = H, i.bufferSubData(i.UNIFORM_BUFFER, q + k, R.__data)) : H.isMatrix3 ? (R.__data[0] = H.elements[0], R.__data[1] = H.elements[1], R.__data[2] = H.elements[2], R.__data[3] = 0, R.__data[4] = H.elements[3], R.__data[5] = H.elements[4], R.__data[6] = H.elements[5], R.__data[7] = 0, R.__data[8] = H.elements[6], R.__data[9] = H.elements[7], R.__data[10] = H.elements[8], R.__data[11] = 0) : (H.toArray(R.__data, k), k += nt.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, q, R.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function p(T, C, v, F) {
    const b = T.value, w = C + "_" + v;
    if (F[w] === void 0)
      return typeof b == "number" || typeof b == "boolean" ? F[w] = b : F[w] = b.clone(), !0;
    {
      const P = F[w];
      if (typeof b == "number" || typeof b == "boolean") {
        if (P !== b)
          return F[w] = b, !0;
      } else if (P.equals(b) === !1)
        return P.copy(b), !0;
    }
    return !1;
  }
  function g(T) {
    const C = T.uniforms;
    let v = 0;
    const F = 16;
    for (let w = 0, P = C.length; w < P; w++) {
      const y = Array.isArray(C[w]) ? C[w] : [C[w]];
      for (let M = 0, R = y.length; M < R; M++) {
        const q = y[M], G = Array.isArray(q.value) ? q.value : [q.value];
        for (let k = 0, j = G.length; k < j; k++) {
          const H = G[k], nt = x(H), V = v % F, ot = V % nt.boundary, dt = V + ot;
          v += ot, dt !== 0 && F - dt < nt.storage && (v += F - dt), q.__data = new Float32Array(nt.storage / Float32Array.BYTES_PER_ELEMENT), q.__offset = v, v += nt.storage;
        }
      }
    }
    const b = v % F;
    return b > 0 && (v += F - b), T.__size = v, T.__cache = {}, this;
  }
  function x(T) {
    const C = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof T == "number" || typeof T == "boolean" ? (C.boundary = 4, C.storage = 4) : T.isVector2 ? (C.boundary = 8, C.storage = 8) : T.isVector3 || T.isColor ? (C.boundary = 16, C.storage = 12) : T.isVector4 ? (C.boundary = 16, C.storage = 16) : T.isMatrix3 ? (C.boundary = 48, C.storage = 48) : T.isMatrix4 ? (C.boundary = 64, C.storage = 64) : T.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", T), C;
  }
  function m(T) {
    const C = T.target;
    C.removeEventListener("dispose", m);
    const v = a.indexOf(C.__bindingPointIndex);
    a.splice(v, 1), i.deleteBuffer(r[C.id]), delete r[C.id], delete s[C.id];
  }
  function d() {
    for (const T in r)
      i.deleteBuffer(r[T]);
    a = [], r = {}, s = {};
  }
  return {
    bind: l,
    update: u,
    dispose: d
  };
}
class ef {
  constructor(t = {}) {
    const {
      canvas: e = Va(),
      context: n = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: u = !1,
      powerPreference: c = "default",
      failIfMajorPerformanceCaveat: f = !1,
      reverseDepthBuffer: h = !1
    } = t;
    this.isWebGLRenderer = !0;
    let p;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      p = n.getContextAttributes().alpha;
    } else
      p = a;
    const g = new Uint32Array(4), x = new Int32Array(4);
    let m = null, d = null;
    const T = [], C = [];
    this.domElement = e, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = ge, this.toneMapping = 0, this.toneMappingExposure = 1;
    const v = this;
    let F = !1, b = 0, w = 0, P = null, y = -1, M = null;
    const R = new se(), q = new se();
    let G = null;
    const k = new kt(0);
    let j = 0, H = e.width, nt = e.height, V = 1, ot = null, dt = null;
    const St = new se(0, 0, H, nt), X = new se(0, 0, H, nt);
    let lt = !1;
    const N = new Ir();
    let J = !1, pt = !1;
    const et = new ne(), Tt = new ne(), Dt = new L(), Ut = new se(), Ht = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let $ = !1;
    function it() {
      return P === null ? V : 1;
    }
    let A = n;
    function Et(S, U) {
      return e.getContext(S, U);
    }
    try {
      const S = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: o,
        premultipliedAlpha: l,
        preserveDrawingBuffer: u,
        powerPreference: c,
        failIfMajorPerformanceCaveat: f
      };
      if ("setAttribute" in e && e.setAttribute("data-engine", "three.js r170"), e.addEventListener("webglcontextlost", K, !1), e.addEventListener("webglcontextrestored", _t, !1), e.addEventListener("webglcontextcreationerror", mt, !1), A === null) {
        const U = "webgl2";
        if (A = Et(U, S), A === null)
          throw Et(U) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (S) {
      throw console.error("THREE.WebGLRenderer: " + S.message), S;
    }
    let tt, xt, at, Lt, vt, E, _, O, Y, Q, Z, At, ht, Mt, Wt, rt, Ct, It, Nt, yt, Xt, Gt, jt, D;
    function ft() {
      tt = new au(A), tt.init(), Gt = new Xh(A, tt), xt = new tu(A, tt, t, Gt), at = new Hh(A, tt), xt.reverseDepthBuffer && h && at.buffers.depth.setReversed(!0), Lt = new cu(A), vt = new bh(), E = new Wh(A, tt, at, vt, xt, Gt, Lt), _ = new nu(v), O = new su(v), Y = new go(A), jt = new jc(A, Y), Q = new ou(A, Y, Lt, jt), Z = new hu(A, Q, Y, Lt), Nt = new uu(A, xt, E), rt = new eu(vt), At = new Ah(v, _, O, tt, xt, jt, rt), ht = new Qh(v, vt), Mt = new Rh(), Wt = new Nh(tt), It = new Jc(v, _, O, at, Z, p, l), Ct = new Gh(v, Z, xt), D = new tf(A, Lt, xt, at), yt = new Qc(A, tt, Lt), Xt = new lu(A, tt, Lt), Lt.programs = At.programs, v.capabilities = xt, v.extensions = tt, v.properties = vt, v.renderLists = Mt, v.shadowMap = Ct, v.state = at, v.info = Lt;
    }
    ft();
    const W = new Jh(v, A);
    this.xr = W, this.getContext = function() {
      return A;
    }, this.getContextAttributes = function() {
      return A.getContextAttributes();
    }, this.forceContextLoss = function() {
      const S = tt.get("WEBGL_lose_context");
      S && S.loseContext();
    }, this.forceContextRestore = function() {
      const S = tt.get("WEBGL_lose_context");
      S && S.restoreContext();
    }, this.getPixelRatio = function() {
      return V;
    }, this.setPixelRatio = function(S) {
      S !== void 0 && (V = S, this.setSize(H, nt, !1));
    }, this.getSize = function(S) {
      return S.set(H, nt);
    }, this.setSize = function(S, U, B = !0) {
      if (W.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      H = S, nt = U, e.width = Math.floor(S * V), e.height = Math.floor(U * V), B === !0 && (e.style.width = S + "px", e.style.height = U + "px"), this.setViewport(0, 0, S, U);
    }, this.getDrawingBufferSize = function(S) {
      return S.set(H * V, nt * V).floor();
    }, this.setDrawingBufferSize = function(S, U, B) {
      H = S, nt = U, V = B, e.width = Math.floor(S * B), e.height = Math.floor(U * B), this.setViewport(0, 0, S, U);
    }, this.getCurrentViewport = function(S) {
      return S.copy(R);
    }, this.getViewport = function(S) {
      return S.copy(St);
    }, this.setViewport = function(S, U, B, z) {
      S.isVector4 ? St.set(S.x, S.y, S.z, S.w) : St.set(S, U, B, z), at.viewport(R.copy(St).multiplyScalar(V).round());
    }, this.getScissor = function(S) {
      return S.copy(X);
    }, this.setScissor = function(S, U, B, z) {
      S.isVector4 ? X.set(S.x, S.y, S.z, S.w) : X.set(S, U, B, z), at.scissor(q.copy(X).multiplyScalar(V).round());
    }, this.getScissorTest = function() {
      return lt;
    }, this.setScissorTest = function(S) {
      at.setScissorTest(lt = S);
    }, this.setOpaqueSort = function(S) {
      ot = S;
    }, this.setTransparentSort = function(S) {
      dt = S;
    }, this.getClearColor = function(S) {
      return S.copy(It.getClearColor());
    }, this.setClearColor = function() {
      It.setClearColor.apply(It, arguments);
    }, this.getClearAlpha = function() {
      return It.getClearAlpha();
    }, this.setClearAlpha = function() {
      It.setClearAlpha.apply(It, arguments);
    }, this.clear = function(S = !0, U = !0, B = !0) {
      let z = 0;
      if (S) {
        let I = !1;
        if (P !== null) {
          const st = P.texture.format;
          I = st === 1033 || st === 1031 || st === 1029;
        }
        if (I) {
          const st = P.texture.type, gt = st === 1009 || st === 1014 || st === 1012 || st === 1020 || st === 1017 || st === 1018, bt = It.getClearColor(), wt = It.getClearAlpha(), Ft = bt.r, Bt = bt.g, Rt = bt.b;
          gt ? (g[0] = Ft, g[1] = Bt, g[2] = Rt, g[3] = wt, A.clearBufferuiv(A.COLOR, 0, g)) : (x[0] = Ft, x[1] = Bt, x[2] = Rt, x[3] = wt, A.clearBufferiv(A.COLOR, 0, x));
        } else
          z |= A.COLOR_BUFFER_BIT;
      }
      U && (z |= A.DEPTH_BUFFER_BIT), B && (z |= A.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), A.clear(z);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      e.removeEventListener("webglcontextlost", K, !1), e.removeEventListener("webglcontextrestored", _t, !1), e.removeEventListener("webglcontextcreationerror", mt, !1), Mt.dispose(), Wt.dispose(), vt.dispose(), _.dispose(), O.dispose(), Z.dispose(), jt.dispose(), D.dispose(), At.dispose(), W.dispose(), W.removeEventListener("sessionstart", qr), W.removeEventListener("sessionend", Yr), ln.stop();
    };
    function K(S) {
      S.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), F = !0;
    }
    function _t() {
      console.log("THREE.WebGLRenderer: Context Restored."), F = !1;
      const S = Lt.autoReset, U = Ct.enabled, B = Ct.autoUpdate, z = Ct.needsUpdate, I = Ct.type;
      ft(), Lt.autoReset = S, Ct.enabled = U, Ct.autoUpdate = B, Ct.needsUpdate = z, Ct.type = I;
    }
    function mt(S) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", S.statusMessage);
    }
    function Ot(S) {
      const U = S.target;
      U.removeEventListener("dispose", Ot), re(U);
    }
    function re(S) {
      fe(S), vt.remove(S);
    }
    function fe(S) {
      const U = vt.get(S).programs;
      U !== void 0 && (U.forEach(function(B) {
        At.releaseProgram(B);
      }), S.isShaderMaterial && At.releaseShaderCache(S));
    }
    this.renderBufferDirect = function(S, U, B, z, I, st) {
      U === null && (U = Ht);
      const gt = I.isMesh && I.matrixWorld.determinant() < 0, bt = Oa(S, U, B, z, I);
      at.setMaterial(z, gt);
      let wt = B.index, Ft = 1;
      if (z.wireframe === !0) {
        if (wt = Q.getWireframeAttribute(B), wt === void 0) return;
        Ft = 2;
      }
      const Bt = B.drawRange, Rt = B.attributes.position;
      let Yt = Bt.start * Ft, Qt = (Bt.start + Bt.count) * Ft;
      st !== null && (Yt = Math.max(Yt, st.start * Ft), Qt = Math.min(Qt, (st.start + st.count) * Ft)), wt !== null ? (Yt = Math.max(Yt, 0), Qt = Math.min(Qt, wt.count)) : Rt != null && (Yt = Math.max(Yt, 0), Qt = Math.min(Qt, Rt.count));
      const te = Qt - Yt;
      if (te < 0 || te === 1 / 0) return;
      jt.setup(I, z, bt, B, wt);
      let xe, Zt = yt;
      if (wt !== null && (xe = Y.get(wt), Zt = Xt, Zt.setIndex(xe)), I.isMesh)
        z.wireframe === !0 ? (at.setLineWidth(z.wireframeLinewidth * it()), Zt.setMode(A.LINES)) : Zt.setMode(A.TRIANGLES);
      else if (I.isLine) {
        let Pt = z.linewidth;
        Pt === void 0 && (Pt = 1), at.setLineWidth(Pt * it()), I.isLineSegments ? Zt.setMode(A.LINES) : I.isLineLoop ? Zt.setMode(A.LINE_LOOP) : Zt.setMode(A.LINE_STRIP);
      } else I.isPoints ? Zt.setMode(A.POINTS) : I.isSprite && Zt.setMode(A.TRIANGLES);
      if (I.isBatchedMesh)
        if (I._multiDrawInstances !== null)
          Zt.renderMultiDrawInstances(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount, I._multiDrawInstances);
        else if (tt.get("WEBGL_multi_draw"))
          Zt.renderMultiDraw(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount);
        else {
          const Pt = I._multiDrawStarts, We = I._multiDrawCounts, $t = I._multiDrawCount, Pe = wt ? Y.get(wt).bytesPerElement : 1, Sn = vt.get(z).currentProgram.getUniforms();
          for (let Se = 0; Se < $t; Se++)
            Sn.setValue(A, "_gl_DrawID", Se), Zt.render(Pt[Se] / Pe, We[Se]);
        }
      else if (I.isInstancedMesh)
        Zt.renderInstances(Yt, te, I.count);
      else if (B.isInstancedBufferGeometry) {
        const Pt = B._maxInstanceCount !== void 0 ? B._maxInstanceCount : 1 / 0, We = Math.min(B.instanceCount, Pt);
        Zt.renderInstances(Yt, te, We);
      } else
        Zt.render(Yt, te);
    };
    function Kt(S, U, B) {
      S.transparent === !0 && S.side === 2 && S.forceSinglePass === !1 ? (S.side = 1, S.needsUpdate = !0, fi(S, U, B), S.side = 0, S.needsUpdate = !0, fi(S, U, B), S.side = 2) : fi(S, U, B);
    }
    this.compile = function(S, U, B = null) {
      B === null && (B = S), d = Wt.get(B), d.init(U), C.push(d), B.traverseVisible(function(I) {
        I.isLight && I.layers.test(U.layers) && (d.pushLight(I), I.castShadow && d.pushShadow(I));
      }), S !== B && S.traverseVisible(function(I) {
        I.isLight && I.layers.test(U.layers) && (d.pushLight(I), I.castShadow && d.pushShadow(I));
      }), d.setupLights();
      const z = /* @__PURE__ */ new Set();
      return S.traverse(function(I) {
        if (!(I.isMesh || I.isPoints || I.isLine || I.isSprite))
          return;
        const st = I.material;
        if (st)
          if (Array.isArray(st))
            for (let gt = 0; gt < st.length; gt++) {
              const bt = st[gt];
              Kt(bt, B, I), z.add(bt);
            }
          else
            Kt(st, B, I), z.add(st);
      }), C.pop(), d = null, z;
    }, this.compileAsync = function(S, U, B = null) {
      const z = this.compile(S, U, B);
      return new Promise((I) => {
        function st() {
          if (z.forEach(function(gt) {
            vt.get(gt).currentProgram.isReady() && z.delete(gt);
          }), z.size === 0) {
            I(S);
            return;
          }
          setTimeout(st, 10);
        }
        tt.get("KHR_parallel_shader_compile") !== null ? st() : setTimeout(st, 10);
      });
    };
    let Le = null;
    function ke(S) {
      Le && Le(S);
    }
    function qr() {
      ln.stop();
    }
    function Yr() {
      ln.start();
    }
    const ln = new _a();
    ln.setAnimationLoop(ke), typeof self < "u" && ln.setContext(self), this.setAnimationLoop = function(S) {
      Le = S, W.setAnimationLoop(S), S === null ? ln.stop() : ln.start();
    }, W.addEventListener("sessionstart", qr), W.addEventListener("sessionend", Yr), this.render = function(S, U) {
      if (U !== void 0 && U.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (F === !0) return;
      if (S.matrixWorldAutoUpdate === !0 && S.updateMatrixWorld(), U.parent === null && U.matrixWorldAutoUpdate === !0 && U.updateMatrixWorld(), W.enabled === !0 && W.isPresenting === !0 && (W.cameraAutoUpdate === !0 && W.updateCamera(U), U = W.getCamera()), S.isScene === !0 && S.onBeforeRender(v, S, U, P), d = Wt.get(S, C.length), d.init(U), C.push(d), Tt.multiplyMatrices(U.projectionMatrix, U.matrixWorldInverse), N.setFromProjectionMatrix(Tt), pt = this.localClippingEnabled, J = rt.init(this.clippingPlanes, pt), m = Mt.get(S, T.length), m.init(), T.push(m), W.enabled === !0 && W.isPresenting === !0) {
        const st = v.xr.getDepthSensingMesh();
        st !== null && Xi(st, U, -1 / 0, v.sortObjects);
      }
      Xi(S, U, 0, v.sortObjects), m.finish(), v.sortObjects === !0 && m.sort(ot, dt), $ = W.enabled === !1 || W.isPresenting === !1 || W.hasDepthSensing() === !1, $ && It.addToRenderList(m, S), this.info.render.frame++, J === !0 && rt.beginShadows();
      const B = d.state.shadowsArray;
      Ct.render(B, S, U), J === !0 && rt.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const z = m.opaque, I = m.transmissive;
      if (d.setupLights(), U.isArrayCamera) {
        const st = U.cameras;
        if (I.length > 0)
          for (let gt = 0, bt = st.length; gt < bt; gt++) {
            const wt = st[gt];
            $r(z, I, S, wt);
          }
        $ && It.render(S);
        for (let gt = 0, bt = st.length; gt < bt; gt++) {
          const wt = st[gt];
          Zr(m, S, wt, wt.viewport);
        }
      } else
        I.length > 0 && $r(z, I, S, U), $ && It.render(S), Zr(m, S, U);
      P !== null && (E.updateMultisampleRenderTarget(P), E.updateRenderTargetMipmap(P)), S.isScene === !0 && S.onAfterRender(v, S, U), jt.resetDefaultState(), y = -1, M = null, C.pop(), C.length > 0 ? (d = C[C.length - 1], J === !0 && rt.setGlobalState(v.clippingPlanes, d.state.camera)) : d = null, T.pop(), T.length > 0 ? m = T[T.length - 1] : m = null;
    };
    function Xi(S, U, B, z) {
      if (S.visible === !1) return;
      if (S.layers.test(U.layers)) {
        if (S.isGroup)
          B = S.renderOrder;
        else if (S.isLOD)
          S.autoUpdate === !0 && S.update(U);
        else if (S.isLight)
          d.pushLight(S), S.castShadow && d.pushShadow(S);
        else if (S.isSprite) {
          if (!S.frustumCulled || N.intersectsSprite(S)) {
            z && Ut.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Tt);
            const gt = Z.update(S), bt = S.material;
            bt.visible && m.push(S, gt, bt, B, Ut.z, null);
          }
        } else if ((S.isMesh || S.isLine || S.isPoints) && (!S.frustumCulled || N.intersectsObject(S))) {
          const gt = Z.update(S), bt = S.material;
          if (z && (S.boundingSphere !== void 0 ? (S.boundingSphere === null && S.computeBoundingSphere(), Ut.copy(S.boundingSphere.center)) : (gt.boundingSphere === null && gt.computeBoundingSphere(), Ut.copy(gt.boundingSphere.center)), Ut.applyMatrix4(S.matrixWorld).applyMatrix4(Tt)), Array.isArray(bt)) {
            const wt = gt.groups;
            for (let Ft = 0, Bt = wt.length; Ft < Bt; Ft++) {
              const Rt = wt[Ft], Yt = bt[Rt.materialIndex];
              Yt && Yt.visible && m.push(S, gt, Yt, B, Ut.z, Rt);
            }
          } else bt.visible && m.push(S, gt, bt, B, Ut.z, null);
        }
      }
      const st = S.children;
      for (let gt = 0, bt = st.length; gt < bt; gt++)
        Xi(st[gt], U, B, z);
    }
    function Zr(S, U, B, z) {
      const I = S.opaque, st = S.transmissive, gt = S.transparent;
      d.setupLightsView(B), J === !0 && rt.setGlobalState(v.clippingPlanes, B), z && at.viewport(R.copy(z)), I.length > 0 && hi(I, U, B), st.length > 0 && hi(st, U, B), gt.length > 0 && hi(gt, U, B), at.buffers.depth.setTest(!0), at.buffers.depth.setMask(!0), at.buffers.color.setMask(!0), at.setPolygonOffset(!1);
    }
    function $r(S, U, B, z) {
      if ((B.isScene === !0 ? B.overrideMaterial : null) !== null)
        return;
      d.state.transmissionRenderTarget[z.id] === void 0 && (d.state.transmissionRenderTarget[z.id] = new xn(1, 1, {
        generateMipmaps: !0,
        type: tt.has("EXT_color_buffer_half_float") || tt.has("EXT_color_buffer_float") ? 1016 : 1009,
        minFilter: 1008,
        samples: 4,
        stencilBuffer: s,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: qt.workingColorSpace
      }));
      const st = d.state.transmissionRenderTarget[z.id], gt = z.viewport || R;
      st.setSize(gt.z, gt.w);
      const bt = v.getRenderTarget();
      v.setRenderTarget(st), v.getClearColor(k), j = v.getClearAlpha(), j < 1 && v.setClearColor(16777215, 0.5), v.clear(), $ && It.render(B);
      const wt = v.toneMapping;
      v.toneMapping = 0;
      const Ft = z.viewport;
      if (z.viewport !== void 0 && (z.viewport = void 0), d.setupLightsView(z), J === !0 && rt.setGlobalState(v.clippingPlanes, z), hi(S, B, z), E.updateMultisampleRenderTarget(st), E.updateRenderTargetMipmap(st), tt.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Bt = !1;
        for (let Rt = 0, Yt = U.length; Rt < Yt; Rt++) {
          const Qt = U[Rt], te = Qt.object, xe = Qt.geometry, Zt = Qt.material, Pt = Qt.group;
          if (Zt.side === 2 && te.layers.test(z.layers)) {
            const We = Zt.side;
            Zt.side = 1, Zt.needsUpdate = !0, Kr(te, B, z, xe, Zt, Pt), Zt.side = We, Zt.needsUpdate = !0, Bt = !0;
          }
        }
        Bt === !0 && (E.updateMultisampleRenderTarget(st), E.updateRenderTargetMipmap(st));
      }
      v.setRenderTarget(bt), v.setClearColor(k, j), Ft !== void 0 && (z.viewport = Ft), v.toneMapping = wt;
    }
    function hi(S, U, B) {
      const z = U.isScene === !0 ? U.overrideMaterial : null;
      for (let I = 0, st = S.length; I < st; I++) {
        const gt = S[I], bt = gt.object, wt = gt.geometry, Ft = z === null ? gt.material : z, Bt = gt.group;
        bt.layers.test(B.layers) && Kr(bt, U, B, wt, Ft, Bt);
      }
    }
    function Kr(S, U, B, z, I, st) {
      S.onBeforeRender(v, U, B, z, I, st), S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse, S.matrixWorld), S.normalMatrix.getNormalMatrix(S.modelViewMatrix), I.onBeforeRender(v, U, B, z, S, st), I.transparent === !0 && I.side === 2 && I.forceSinglePass === !1 ? (I.side = 1, I.needsUpdate = !0, v.renderBufferDirect(B, U, z, I, S, st), I.side = 0, I.needsUpdate = !0, v.renderBufferDirect(B, U, z, I, S, st), I.side = 2) : v.renderBufferDirect(B, U, z, I, S, st), S.onAfterRender(v, U, B, z, I, st);
    }
    function fi(S, U, B) {
      U.isScene !== !0 && (U = Ht);
      const z = vt.get(S), I = d.state.lights, st = d.state.shadowsArray, gt = I.state.version, bt = At.getParameters(S, I.state, st, U, B), wt = At.getProgramCacheKey(bt);
      let Ft = z.programs;
      z.environment = S.isMeshStandardMaterial ? U.environment : null, z.fog = U.fog, z.envMap = (S.isMeshStandardMaterial ? O : _).get(S.envMap || z.environment), z.envMapRotation = z.environment !== null && S.envMap === null ? U.environmentRotation : S.envMapRotation, Ft === void 0 && (S.addEventListener("dispose", Ot), Ft = /* @__PURE__ */ new Map(), z.programs = Ft);
      let Bt = Ft.get(wt);
      if (Bt !== void 0) {
        if (z.currentProgram === Bt && z.lightsStateVersion === gt)
          return jr(S, bt), Bt;
      } else
        bt.uniforms = At.getUniforms(S), S.onBeforeCompile(bt, v), Bt = At.acquireProgram(bt, wt), Ft.set(wt, Bt), z.uniforms = bt.uniforms;
      const Rt = z.uniforms;
      return (!S.isShaderMaterial && !S.isRawShaderMaterial || S.clipping === !0) && (Rt.clippingPlanes = rt.uniform), jr(S, bt), z.needsLights = za(S), z.lightsStateVersion = gt, z.needsLights && (Rt.ambientLightColor.value = I.state.ambient, Rt.lightProbe.value = I.state.probe, Rt.directionalLights.value = I.state.directional, Rt.directionalLightShadows.value = I.state.directionalShadow, Rt.spotLights.value = I.state.spot, Rt.spotLightShadows.value = I.state.spotShadow, Rt.rectAreaLights.value = I.state.rectArea, Rt.ltc_1.value = I.state.rectAreaLTC1, Rt.ltc_2.value = I.state.rectAreaLTC2, Rt.pointLights.value = I.state.point, Rt.pointLightShadows.value = I.state.pointShadow, Rt.hemisphereLights.value = I.state.hemi, Rt.directionalShadowMap.value = I.state.directionalShadowMap, Rt.directionalShadowMatrix.value = I.state.directionalShadowMatrix, Rt.spotShadowMap.value = I.state.spotShadowMap, Rt.spotLightMatrix.value = I.state.spotLightMatrix, Rt.spotLightMap.value = I.state.spotLightMap, Rt.pointShadowMap.value = I.state.pointShadowMap, Rt.pointShadowMatrix.value = I.state.pointShadowMatrix), z.currentProgram = Bt, z.uniformsList = null, Bt;
    }
    function Jr(S) {
      if (S.uniformsList === null) {
        const U = S.currentProgram.getUniforms();
        S.uniformsList = Bi.seqWithValue(U.seq, S.uniforms);
      }
      return S.uniformsList;
    }
    function jr(S, U) {
      const B = vt.get(S);
      B.outputColorSpace = U.outputColorSpace, B.batching = U.batching, B.batchingColor = U.batchingColor, B.instancing = U.instancing, B.instancingColor = U.instancingColor, B.instancingMorph = U.instancingMorph, B.skinning = U.skinning, B.morphTargets = U.morphTargets, B.morphNormals = U.morphNormals, B.morphColors = U.morphColors, B.morphTargetsCount = U.morphTargetsCount, B.numClippingPlanes = U.numClippingPlanes, B.numIntersection = U.numClipIntersection, B.vertexAlphas = U.vertexAlphas, B.vertexTangents = U.vertexTangents, B.toneMapping = U.toneMapping;
    }
    function Oa(S, U, B, z, I) {
      U.isScene !== !0 && (U = Ht), E.resetTextureUnits();
      const st = U.fog, gt = z.isMeshStandardMaterial ? U.environment : null, bt = P === null ? v.outputColorSpace : P.isXRRenderTarget === !0 ? P.texture.colorSpace : zn, wt = (z.isMeshStandardMaterial ? O : _).get(z.envMap || gt), Ft = z.vertexColors === !0 && !!B.attributes.color && B.attributes.color.itemSize === 4, Bt = !!B.attributes.tangent && (!!z.normalMap || z.anisotropy > 0), Rt = !!B.morphAttributes.position, Yt = !!B.morphAttributes.normal, Qt = !!B.morphAttributes.color;
      let te = 0;
      z.toneMapped && (P === null || P.isXRRenderTarget === !0) && (te = v.toneMapping);
      const xe = B.morphAttributes.position || B.morphAttributes.normal || B.morphAttributes.color, Zt = xe !== void 0 ? xe.length : 0, Pt = vt.get(z), We = d.state.lights;
      if (J === !0 && (pt === !0 || S !== M)) {
        const Te = S === M && z.id === y;
        rt.setState(z, S, Te);
      }
      let $t = !1;
      z.version === Pt.__version ? (Pt.needsLights && Pt.lightsStateVersion !== We.state.version || Pt.outputColorSpace !== bt || I.isBatchedMesh && Pt.batching === !1 || !I.isBatchedMesh && Pt.batching === !0 || I.isBatchedMesh && Pt.batchingColor === !0 && I.colorTexture === null || I.isBatchedMesh && Pt.batchingColor === !1 && I.colorTexture !== null || I.isInstancedMesh && Pt.instancing === !1 || !I.isInstancedMesh && Pt.instancing === !0 || I.isSkinnedMesh && Pt.skinning === !1 || !I.isSkinnedMesh && Pt.skinning === !0 || I.isInstancedMesh && Pt.instancingColor === !0 && I.instanceColor === null || I.isInstancedMesh && Pt.instancingColor === !1 && I.instanceColor !== null || I.isInstancedMesh && Pt.instancingMorph === !0 && I.morphTexture === null || I.isInstancedMesh && Pt.instancingMorph === !1 && I.morphTexture !== null || Pt.envMap !== wt || z.fog === !0 && Pt.fog !== st || Pt.numClippingPlanes !== void 0 && (Pt.numClippingPlanes !== rt.numPlanes || Pt.numIntersection !== rt.numIntersection) || Pt.vertexAlphas !== Ft || Pt.vertexTangents !== Bt || Pt.morphTargets !== Rt || Pt.morphNormals !== Yt || Pt.morphColors !== Qt || Pt.toneMapping !== te || Pt.morphTargetsCount !== Zt) && ($t = !0) : ($t = !0, Pt.__version = z.version);
      let Pe = Pt.currentProgram;
      $t === !0 && (Pe = fi(z, U, I));
      let Sn = !1, Se = !1, qn = !1;
      const ee = Pe.getUniforms(), Oe = Pt.uniforms;
      if (at.useProgram(Pe.program) && (Sn = !0, Se = !0, qn = !0), z.id !== y && (y = z.id, Se = !0), Sn || M !== S) {
        at.buffers.depth.getReversed() ? (et.copy(S.projectionMatrix), ka(et), Wa(et), ee.setValue(A, "projectionMatrix", et)) : ee.setValue(A, "projectionMatrix", S.projectionMatrix), ee.setValue(A, "viewMatrix", S.matrixWorldInverse);
        const Je = ee.map.cameraPosition;
        Je !== void 0 && Je.setValue(A, Dt.setFromMatrixPosition(S.matrixWorld)), xt.logarithmicDepthBuffer && ee.setValue(
          A,
          "logDepthBufFC",
          2 / (Math.log(S.far + 1) / Math.LN2)
        ), (z.isMeshPhongMaterial || z.isMeshToonMaterial || z.isMeshLambertMaterial || z.isMeshBasicMaterial || z.isMeshStandardMaterial || z.isShaderMaterial) && ee.setValue(A, "isOrthographic", S.isOrthographicCamera === !0), M !== S && (M = S, Se = !0, qn = !0);
      }
      if (I.isSkinnedMesh) {
        ee.setOptional(A, I, "bindMatrix"), ee.setOptional(A, I, "bindMatrixInverse");
        const Te = I.skeleton;
        Te && (Te.boneTexture === null && Te.computeBoneTexture(), ee.setValue(A, "boneTexture", Te.boneTexture, E));
      }
      I.isBatchedMesh && (ee.setOptional(A, I, "batchingTexture"), ee.setValue(A, "batchingTexture", I._matricesTexture, E), ee.setOptional(A, I, "batchingIdTexture"), ee.setValue(A, "batchingIdTexture", I._indirectTexture, E), ee.setOptional(A, I, "batchingColorTexture"), I._colorsTexture !== null && ee.setValue(A, "batchingColorTexture", I._colorsTexture, E));
      const Yn = B.morphAttributes;
      if ((Yn.position !== void 0 || Yn.normal !== void 0 || Yn.color !== void 0) && Nt.update(I, B, Pe), (Se || Pt.receiveShadow !== I.receiveShadow) && (Pt.receiveShadow = I.receiveShadow, ee.setValue(A, "receiveShadow", I.receiveShadow)), z.isMeshGouraudMaterial && z.envMap !== null && (Oe.envMap.value = wt, Oe.flipEnvMap.value = wt.isCubeTexture && wt.isRenderTargetTexture === !1 ? -1 : 1), z.isMeshStandardMaterial && z.envMap === null && U.environment !== null && (Oe.envMapIntensity.value = U.environmentIntensity), Se && (ee.setValue(A, "toneMappingExposure", v.toneMappingExposure), Pt.needsLights && Ba(Oe, qn), st && z.fog === !0 && ht.refreshFogUniforms(Oe, st), ht.refreshMaterialUniforms(Oe, z, V, nt, d.state.transmissionRenderTarget[S.id]), Bi.upload(A, Jr(Pt), Oe, E)), z.isShaderMaterial && z.uniformsNeedUpdate === !0 && (Bi.upload(A, Jr(Pt), Oe, E), z.uniformsNeedUpdate = !1), z.isSpriteMaterial && ee.setValue(A, "center", I.center), ee.setValue(A, "modelViewMatrix", I.modelViewMatrix), ee.setValue(A, "normalMatrix", I.normalMatrix), ee.setValue(A, "modelMatrix", I.matrixWorld), z.isShaderMaterial || z.isRawShaderMaterial) {
        const Te = z.uniformsGroups;
        for (let Je = 0, je = Te.length; Je < je; Je++) {
          const Qr = Te[Je];
          D.update(Qr, Pe), D.bind(Qr, Pe);
        }
      }
      return Pe;
    }
    function Ba(S, U) {
      S.ambientLightColor.needsUpdate = U, S.lightProbe.needsUpdate = U, S.directionalLights.needsUpdate = U, S.directionalLightShadows.needsUpdate = U, S.pointLights.needsUpdate = U, S.pointLightShadows.needsUpdate = U, S.spotLights.needsUpdate = U, S.spotLightShadows.needsUpdate = U, S.rectAreaLights.needsUpdate = U, S.hemisphereLights.needsUpdate = U;
    }
    function za(S) {
      return S.isMeshLambertMaterial || S.isMeshToonMaterial || S.isMeshPhongMaterial || S.isMeshStandardMaterial || S.isShadowMaterial || S.isShaderMaterial && S.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return b;
    }, this.getActiveMipmapLevel = function() {
      return w;
    }, this.getRenderTarget = function() {
      return P;
    }, this.setRenderTargetTextures = function(S, U, B) {
      vt.get(S.texture).__webglTexture = U, vt.get(S.depthTexture).__webglTexture = B;
      const z = vt.get(S);
      z.__hasExternalTextures = !0, z.__autoAllocateDepthBuffer = B === void 0, z.__autoAllocateDepthBuffer || tt.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), z.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(S, U) {
      const B = vt.get(S);
      B.__webglFramebuffer = U, B.__useDefaultFramebuffer = U === void 0;
    }, this.setRenderTarget = function(S, U = 0, B = 0) {
      P = S, b = U, w = B;
      let z = !0, I = null, st = !1, gt = !1;
      if (S) {
        const wt = vt.get(S);
        if (wt.__useDefaultFramebuffer !== void 0)
          at.bindFramebuffer(A.FRAMEBUFFER, null), z = !1;
        else if (wt.__webglFramebuffer === void 0)
          E.setupRenderTarget(S);
        else if (wt.__hasExternalTextures)
          E.rebindTextures(S, vt.get(S.texture).__webglTexture, vt.get(S.depthTexture).__webglTexture);
        else if (S.depthBuffer) {
          const Rt = S.depthTexture;
          if (wt.__boundDepthTexture !== Rt) {
            if (Rt !== null && vt.has(Rt) && (S.width !== Rt.image.width || S.height !== Rt.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            E.setupDepthRenderbuffer(S);
          }
        }
        const Ft = S.texture;
        (Ft.isData3DTexture || Ft.isDataArrayTexture || Ft.isCompressedArrayTexture) && (gt = !0);
        const Bt = vt.get(S).__webglFramebuffer;
        S.isWebGLCubeRenderTarget ? (Array.isArray(Bt[U]) ? I = Bt[U][B] : I = Bt[U], st = !0) : S.samples > 0 && E.useMultisampledRTT(S) === !1 ? I = vt.get(S).__webglMultisampledFramebuffer : Array.isArray(Bt) ? I = Bt[B] : I = Bt, R.copy(S.viewport), q.copy(S.scissor), G = S.scissorTest;
      } else
        R.copy(St).multiplyScalar(V).floor(), q.copy(X).multiplyScalar(V).floor(), G = lt;
      if (at.bindFramebuffer(A.FRAMEBUFFER, I) && z && at.drawBuffers(S, I), at.viewport(R), at.scissor(q), at.setScissorTest(G), st) {
        const wt = vt.get(S.texture);
        A.framebufferTexture2D(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_CUBE_MAP_POSITIVE_X + U, wt.__webglTexture, B);
      } else if (gt) {
        const wt = vt.get(S.texture), Ft = U || 0;
        A.framebufferTextureLayer(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, wt.__webglTexture, B || 0, Ft);
      }
      y = -1;
    }, this.readRenderTargetPixels = function(S, U, B, z, I, st, gt) {
      if (!(S && S.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let bt = vt.get(S).__webglFramebuffer;
      if (S.isWebGLCubeRenderTarget && gt !== void 0 && (bt = bt[gt]), bt) {
        at.bindFramebuffer(A.FRAMEBUFFER, bt);
        try {
          const wt = S.texture, Ft = wt.format, Bt = wt.type;
          if (!xt.textureFormatReadable(Ft)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!xt.textureTypeReadable(Bt)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          U >= 0 && U <= S.width - z && B >= 0 && B <= S.height - I && A.readPixels(U, B, z, I, Gt.convert(Ft), Gt.convert(Bt), st);
        } finally {
          const wt = P !== null ? vt.get(P).__webglFramebuffer : null;
          at.bindFramebuffer(A.FRAMEBUFFER, wt);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(S, U, B, z, I, st, gt) {
      if (!(S && S.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let bt = vt.get(S).__webglFramebuffer;
      if (S.isWebGLCubeRenderTarget && gt !== void 0 && (bt = bt[gt]), bt) {
        const wt = S.texture, Ft = wt.format, Bt = wt.type;
        if (!xt.textureFormatReadable(Ft))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!xt.textureTypeReadable(Bt))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (U >= 0 && U <= S.width - z && B >= 0 && B <= S.height - I) {
          at.bindFramebuffer(A.FRAMEBUFFER, bt);
          const Rt = A.createBuffer();
          A.bindBuffer(A.PIXEL_PACK_BUFFER, Rt), A.bufferData(A.PIXEL_PACK_BUFFER, st.byteLength, A.STREAM_READ), A.readPixels(U, B, z, I, Gt.convert(Ft), Gt.convert(Bt), 0);
          const Yt = P !== null ? vt.get(P).__webglFramebuffer : null;
          at.bindFramebuffer(A.FRAMEBUFFER, Yt);
          const Qt = A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return A.flush(), await Ha(A, Qt, 4), A.bindBuffer(A.PIXEL_PACK_BUFFER, Rt), A.getBufferSubData(A.PIXEL_PACK_BUFFER, 0, st), A.deleteBuffer(Rt), A.deleteSync(Qt), st;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(S, U = null, B = 0) {
      S.isTexture !== !0 && (ei("WebGLRenderer: copyFramebufferToTexture function signature has changed."), U = arguments[0] || null, S = arguments[1]);
      const z = Math.pow(2, -B), I = Math.floor(S.image.width * z), st = Math.floor(S.image.height * z), gt = U !== null ? U.x : 0, bt = U !== null ? U.y : 0;
      E.setTexture2D(S, 0), A.copyTexSubImage2D(A.TEXTURE_2D, B, 0, 0, gt, bt, I, st), at.unbindTexture();
    }, this.copyTextureToTexture = function(S, U, B = null, z = null, I = 0) {
      S.isTexture !== !0 && (ei("WebGLRenderer: copyTextureToTexture function signature has changed."), z = arguments[0] || null, S = arguments[1], U = arguments[2], I = arguments[3] || 0, B = null);
      let st, gt, bt, wt, Ft, Bt, Rt, Yt, Qt;
      const te = S.isCompressedTexture ? S.mipmaps[I] : S.image;
      B !== null ? (st = B.max.x - B.min.x, gt = B.max.y - B.min.y, bt = B.isBox3 ? B.max.z - B.min.z : 1, wt = B.min.x, Ft = B.min.y, Bt = B.isBox3 ? B.min.z : 0) : (st = te.width, gt = te.height, bt = te.depth || 1, wt = 0, Ft = 0, Bt = 0), z !== null ? (Rt = z.x, Yt = z.y, Qt = z.z) : (Rt = 0, Yt = 0, Qt = 0);
      const xe = Gt.convert(U.format), Zt = Gt.convert(U.type);
      let Pt;
      U.isData3DTexture ? (E.setTexture3D(U, 0), Pt = A.TEXTURE_3D) : U.isDataArrayTexture || U.isCompressedArrayTexture ? (E.setTexture2DArray(U, 0), Pt = A.TEXTURE_2D_ARRAY) : (E.setTexture2D(U, 0), Pt = A.TEXTURE_2D), A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL, U.flipY), A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL, U.premultiplyAlpha), A.pixelStorei(A.UNPACK_ALIGNMENT, U.unpackAlignment);
      const We = A.getParameter(A.UNPACK_ROW_LENGTH), $t = A.getParameter(A.UNPACK_IMAGE_HEIGHT), Pe = A.getParameter(A.UNPACK_SKIP_PIXELS), Sn = A.getParameter(A.UNPACK_SKIP_ROWS), Se = A.getParameter(A.UNPACK_SKIP_IMAGES);
      A.pixelStorei(A.UNPACK_ROW_LENGTH, te.width), A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, te.height), A.pixelStorei(A.UNPACK_SKIP_PIXELS, wt), A.pixelStorei(A.UNPACK_SKIP_ROWS, Ft), A.pixelStorei(A.UNPACK_SKIP_IMAGES, Bt);
      const qn = S.isDataArrayTexture || S.isData3DTexture, ee = U.isDataArrayTexture || U.isData3DTexture;
      if (S.isRenderTargetTexture || S.isDepthTexture) {
        const Oe = vt.get(S), Yn = vt.get(U), Te = vt.get(Oe.__renderTarget), Je = vt.get(Yn.__renderTarget);
        at.bindFramebuffer(A.READ_FRAMEBUFFER, Te.__webglFramebuffer), at.bindFramebuffer(A.DRAW_FRAMEBUFFER, Je.__webglFramebuffer);
        for (let je = 0; je < bt; je++)
          qn && A.framebufferTextureLayer(A.READ_FRAMEBUFFER, A.COLOR_ATTACHMENT0, vt.get(S).__webglTexture, I, Bt + je), S.isDepthTexture ? (ee && A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0, vt.get(U).__webglTexture, I, Qt + je), A.blitFramebuffer(wt, Ft, st, gt, Rt, Yt, st, gt, A.DEPTH_BUFFER_BIT, A.NEAREST)) : ee ? A.copyTexSubImage3D(Pt, I, Rt, Yt, Qt + je, wt, Ft, st, gt) : A.copyTexSubImage2D(Pt, I, Rt, Yt, Qt + je, wt, Ft, st, gt);
        at.bindFramebuffer(A.READ_FRAMEBUFFER, null), at.bindFramebuffer(A.DRAW_FRAMEBUFFER, null);
      } else
        ee ? S.isDataTexture || S.isData3DTexture ? A.texSubImage3D(Pt, I, Rt, Yt, Qt, st, gt, bt, xe, Zt, te.data) : U.isCompressedArrayTexture ? A.compressedTexSubImage3D(Pt, I, Rt, Yt, Qt, st, gt, bt, xe, te.data) : A.texSubImage3D(Pt, I, Rt, Yt, Qt, st, gt, bt, xe, Zt, te) : S.isDataTexture ? A.texSubImage2D(A.TEXTURE_2D, I, Rt, Yt, st, gt, xe, Zt, te.data) : S.isCompressedTexture ? A.compressedTexSubImage2D(A.TEXTURE_2D, I, Rt, Yt, te.width, te.height, xe, te.data) : A.texSubImage2D(A.TEXTURE_2D, I, Rt, Yt, st, gt, xe, Zt, te);
      A.pixelStorei(A.UNPACK_ROW_LENGTH, We), A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, $t), A.pixelStorei(A.UNPACK_SKIP_PIXELS, Pe), A.pixelStorei(A.UNPACK_SKIP_ROWS, Sn), A.pixelStorei(A.UNPACK_SKIP_IMAGES, Se), I === 0 && U.generateMipmaps && A.generateMipmap(Pt), at.unbindTexture();
    }, this.copyTextureToTexture3D = function(S, U, B = null, z = null, I = 0) {
      return S.isTexture !== !0 && (ei("WebGLRenderer: copyTextureToTexture3D function signature has changed."), B = arguments[0] || null, z = arguments[1] || null, S = arguments[2], U = arguments[3], I = arguments[4] || 0), ei('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(S, U, B, z, I);
    }, this.initRenderTarget = function(S) {
      vt.get(S).__webglFramebuffer === void 0 && E.setupRenderTarget(S);
    }, this.initTexture = function(S) {
      S.isCubeTexture ? E.setTextureCube(S, 0) : S.isData3DTexture ? E.setTexture3D(S, 0) : S.isDataArrayTexture || S.isCompressedArrayTexture ? E.setTexture2DArray(S, 0) : E.setTexture2D(S, 0), at.unbindTexture();
    }, this.resetState = function() {
      b = 0, w = 0, P = null, at.reset(), jt.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return 2e3;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    e.drawingBufferColorspace = qt._getDrawingBufferColorSpace(t), e.unpackColorSpace = qt._getUnpackColorSpace();
  }
}
class nf extends he {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Ge(), this.environmentIntensity = 1, this.environmentRotation = new Ge(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(t, e) {
    return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
  }
}
class Ea extends ve {
  constructor(t, e, n, r, s, a, o, l, u) {
    super(t, e, n, r, s, a, o, l, u), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class He {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200;
  }
  // Virtual base class method to overwrite and implement in subclasses
  //	- t [0 .. 1]
  getPoint() {
    return console.warn("THREE.Curve: .getPoint() not implemented."), null;
  }
  // Get point at relative position in curve according to arc length
  // - u [0 .. 1]
  getPointAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getPoint(n, e);
  }
  // Get sequence of points using getPoint( t )
  getPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPoint(n / t));
    return e;
  }
  // Get sequence of points using getPointAt( u )
  getSpacedPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPointAt(n / t));
    return e;
  }
  // Get total curve arc length
  getLength() {
    const t = this.getLengths();
    return t[t.length - 1];
  }
  // Get list of cumulative segment lengths
  getLengths(t = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const e = [];
    let n, r = this.getPoint(0), s = 0;
    e.push(0);
    for (let a = 1; a <= t; a++)
      n = this.getPoint(a / t), s += n.distanceTo(r), e.push(s), r = n;
    return this.cacheArcLengths = e, e;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
  getUtoTmapping(t, e) {
    const n = this.getLengths();
    let r = 0;
    const s = n.length;
    let a;
    e ? a = e : a = t * n[s - 1];
    let o = 0, l = s - 1, u;
    for (; o <= l; )
      if (r = Math.floor(o + (l - o) / 2), u = n[r] - a, u < 0)
        o = r + 1;
      else if (u > 0)
        l = r - 1;
      else {
        l = r;
        break;
      }
    if (r = l, n[r] === a)
      return r / (s - 1);
    const c = n[r], h = n[r + 1] - c, p = (a - c) / h;
    return (r + p) / (s - 1);
  }
  // Returns a unit vector tangent at t
  // In case any sub curve does not implement its tangent derivation,
  // 2 points a small delta apart will be used to find its gradient
  // which seems to give a reasonable approximation
  getTangent(t, e) {
    let r = t - 1e-4, s = t + 1e-4;
    r < 0 && (r = 0), s > 1 && (s = 1);
    const a = this.getPoint(r), o = this.getPoint(s), l = e || (a.isVector2 ? new ct() : new L());
    return l.copy(o).sub(a).normalize(), l;
  }
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  computeFrenetFrames(t, e) {
    const n = new L(), r = [], s = [], a = [], o = new L(), l = new ne();
    for (let p = 0; p <= t; p++) {
      const g = p / t;
      r[p] = this.getTangentAt(g, new L());
    }
    s[0] = new L(), a[0] = new L();
    let u = Number.MAX_VALUE;
    const c = Math.abs(r[0].x), f = Math.abs(r[0].y), h = Math.abs(r[0].z);
    c <= u && (u = c, n.set(1, 0, 0)), f <= u && (u = f, n.set(0, 1, 0)), h <= u && n.set(0, 0, 1), o.crossVectors(r[0], n).normalize(), s[0].crossVectors(r[0], o), a[0].crossVectors(r[0], s[0]);
    for (let p = 1; p <= t; p++) {
      if (s[p] = s[p - 1].clone(), a[p] = a[p - 1].clone(), o.crossVectors(r[p - 1], r[p]), o.length() > Number.EPSILON) {
        o.normalize();
        const g = Math.acos(ue(r[p - 1].dot(r[p]), -1, 1));
        s[p].applyMatrix4(l.makeRotationAxis(o, g));
      }
      a[p].crossVectors(r[p], s[p]);
    }
    if (e === !0) {
      let p = Math.acos(ue(s[0].dot(s[t]), -1, 1));
      p /= t, r[0].dot(o.crossVectors(s[0], s[t])) > 0 && (p = -p);
      for (let g = 1; g <= t; g++)
        s[g].applyMatrix4(l.makeRotationAxis(r[g], p * g)), a[g].crossVectors(r[g], s[g]);
    }
    return {
      tangents: r,
      normals: s,
      binormals: a
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.6,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t;
  }
  fromJSON(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
}
class Fr extends He {
  constructor(t = 0, e = 0, n = 1, r = 1, s = 0, a = Math.PI * 2, o = !1, l = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = r, this.aStartAngle = s, this.aEndAngle = a, this.aClockwise = o, this.aRotation = l;
  }
  getPoint(t, e = new ct()) {
    const n = e, r = Math.PI * 2;
    let s = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(s) < Number.EPSILON;
    for (; s < 0; ) s += r;
    for (; s > r; ) s -= r;
    s < Number.EPSILON && (a ? s = 0 : s = r), this.aClockwise === !0 && !a && (s === r ? s = -r : s = s - r);
    const o = this.aStartAngle + t * s;
    let l = this.aX + this.xRadius * Math.cos(o), u = this.aY + this.yRadius * Math.sin(o);
    if (this.aRotation !== 0) {
      const c = Math.cos(this.aRotation), f = Math.sin(this.aRotation), h = l - this.aX, p = u - this.aY;
      l = h * c - p * f + this.aX, u = h * f + p * c + this.aY;
    }
    return n.set(l, u);
  }
  copy(t) {
    return super.copy(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
}
class rf extends Fr {
  constructor(t, e, n, r, s, a) {
    super(t, e, n, n, r, s, a), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Or() {
  let i = 0, t = 0, e = 0, n = 0;
  function r(s, a, o, l) {
    i = s, t = o, e = -3 * s + 3 * a - 2 * o - l, n = 2 * s - 2 * a + o + l;
  }
  return {
    initCatmullRom: function(s, a, o, l, u) {
      r(a, o, u * (o - s), u * (l - a));
    },
    initNonuniformCatmullRom: function(s, a, o, l, u, c, f) {
      let h = (a - s) / u - (o - s) / (u + c) + (o - a) / c, p = (o - a) / c - (l - a) / (c + f) + (l - o) / f;
      h *= c, p *= c, r(a, o, h, p);
    },
    calc: function(s) {
      const a = s * s, o = a * s;
      return i + t * s + e * a + n * o;
    }
  };
}
const Ui = /* @__PURE__ */ new L(), Sr = /* @__PURE__ */ new Or(), Cr = /* @__PURE__ */ new Or(), yr = /* @__PURE__ */ new Or();
class sf extends He {
  constructor(t = [], e = !1, n = "centripetal", r = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = n, this.tension = r;
  }
  getPoint(t, e = new L()) {
    const n = e, r = this.points, s = r.length, a = (s - (this.closed ? 0 : 1)) * t;
    let o = Math.floor(a), l = a - o;
    this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / s) + 1) * s : l === 0 && o === s - 1 && (o = s - 2, l = 1);
    let u, c;
    this.closed || o > 0 ? u = r[(o - 1) % s] : (Ui.subVectors(r[0], r[1]).add(r[0]), u = Ui);
    const f = r[o % s], h = r[(o + 1) % s];
    if (this.closed || o + 2 < s ? c = r[(o + 2) % s] : (Ui.subVectors(r[s - 1], r[s - 2]).add(r[s - 1]), c = Ui), this.curveType === "centripetal" || this.curveType === "chordal") {
      const p = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(u.distanceToSquared(f), p), x = Math.pow(f.distanceToSquared(h), p), m = Math.pow(h.distanceToSquared(c), p);
      x < 1e-4 && (x = 1), g < 1e-4 && (g = x), m < 1e-4 && (m = x), Sr.initNonuniformCatmullRom(u.x, f.x, h.x, c.x, g, x, m), Cr.initNonuniformCatmullRom(u.y, f.y, h.y, c.y, g, x, m), yr.initNonuniformCatmullRom(u.z, f.z, h.z, c.z, g, x, m);
    } else this.curveType === "catmullrom" && (Sr.initCatmullRom(u.x, f.x, h.x, c.x, this.tension), Cr.initCatmullRom(u.y, f.y, h.y, c.y, this.tension), yr.initCatmullRom(u.z, f.z, h.z, c.z, this.tension));
    return n.set(
      Sr.calc(l),
      Cr.calc(l),
      yr.calc(l)
    ), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(r.clone());
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const r = this.points[e];
      t.points.push(r.toArray());
    }
    return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(new L().fromArray(r));
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
}
function qs(i, t, e, n, r) {
  const s = (n - t) * 0.5, a = (r - e) * 0.5, o = i * i, l = i * o;
  return (2 * e - 2 * n + s + a) * l + (-3 * e + 3 * n - 2 * s - a) * o + s * i + e;
}
function af(i, t) {
  const e = 1 - i;
  return e * e * t;
}
function of(i, t) {
  return 2 * (1 - i) * i * t;
}
function lf(i, t) {
  return i * i * t;
}
function ii(i, t, e, n) {
  return af(i, t) + of(i, e) + lf(i, n);
}
function cf(i, t) {
  const e = 1 - i;
  return e * e * e * t;
}
function uf(i, t) {
  const e = 1 - i;
  return 3 * e * e * i * t;
}
function hf(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function ff(i, t) {
  return i * i * i * t;
}
function ri(i, t, e, n, r) {
  return cf(i, t) + uf(i, e) + hf(i, n) + ff(i, r);
}
class Ta extends He {
  constructor(t = new ct(), e = new ct(), n = new ct(), r = new ct()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = r;
  }
  getPoint(t, e = new ct()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2, o = this.v3;
    return n.set(
      ri(t, r.x, s.x, a.x, o.x),
      ri(t, r.y, s.y, a.y, o.y)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class df extends He {
  constructor(t = new L(), e = new L(), n = new L(), r = new L()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = r;
  }
  getPoint(t, e = new L()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2, o = this.v3;
    return n.set(
      ri(t, r.x, s.x, a.x, o.x),
      ri(t, r.y, s.y, a.y, o.y),
      ri(t, r.z, s.z, a.z, o.z)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class Aa extends He {
  constructor(t = new ct(), e = new ct()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new ct()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new ct()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class pf extends He {
  constructor(t = new L(), e = new L()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new L()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new L()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class ba extends He {
  constructor(t = new ct(), e = new ct(), n = new ct()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new ct()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2;
    return n.set(
      ii(t, r.x, s.x, a.x),
      ii(t, r.y, s.y, a.y)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class mf extends He {
  constructor(t = new L(), e = new L(), n = new L()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new L()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2;
    return n.set(
      ii(t, r.x, s.x, a.x),
      ii(t, r.y, s.y, a.y),
      ii(t, r.z, s.z, a.z)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class wa extends He {
  constructor(t = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = t;
  }
  getPoint(t, e = new ct()) {
    const n = e, r = this.points, s = (r.length - 1) * t, a = Math.floor(s), o = s - a, l = r[a === 0 ? a : a - 1], u = r[a], c = r[a > r.length - 2 ? r.length - 1 : a + 1], f = r[a > r.length - 3 ? r.length - 1 : a + 2];
    return n.set(
      qs(o, l.x, u.x, c.x, f.x),
      qs(o, l.y, u.y, c.y, f.y)
    ), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const r = this.points[e];
      t.points.push(r.toArray());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(new ct().fromArray(r));
    }
    return this;
  }
}
var Rr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: rf,
  CatmullRomCurve3: sf,
  CubicBezierCurve: Ta,
  CubicBezierCurve3: df,
  EllipseCurve: Fr,
  LineCurve: Aa,
  LineCurve3: pf,
  QuadraticBezierCurve: ba,
  QuadraticBezierCurve3: mf,
  SplineCurve: wa
});
class gf extends He {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(t) {
    this.curves.push(t);
  }
  closePath() {
    const t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
    if (!t.equals(e)) {
      const n = t.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new Rr[n](e, t));
    }
    return this;
  }
  // To get accurate point with reference to
  // entire path distance at time t,
  // following has to be done:
  // 1. Length of each sub path have to be known
  // 2. Locate and identify type of curve
  // 3. Get t for the curve
  // 4. Return curve.getPointAt(t')
  getPoint(t, e) {
    const n = t * this.getLength(), r = this.getCurveLengths();
    let s = 0;
    for (; s < r.length; ) {
      if (r[s] >= n) {
        const a = r[s] - n, o = this.curves[s], l = o.getLength(), u = l === 0 ? 0 : 1 - a / l;
        return o.getPointAt(u, e);
      }
      s++;
    }
    return null;
  }
  // We cannot use the default THREE.Curve getPoint() with getLength() because in
  // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
  // getPoint() depends on getLength
  getLength() {
    const t = this.getCurveLengths();
    return t[t.length - 1];
  }
  // cacheLengths must be recalculated.
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  // Compute lengths and cache them
  // We cannot overwrite getLengths() because UtoT mapping uses it.
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const t = [];
    let e = 0;
    for (let n = 0, r = this.curves.length; n < r; n++)
      e += this.curves[n].getLength(), t.push(e);
    return this.cacheLengths = t, t;
  }
  getSpacedPoints(t = 40) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPoint(n / t));
    return this.autoClose && e.push(e[0]), e;
  }
  getPoints(t = 12) {
    const e = [];
    let n;
    for (let r = 0, s = this.curves; r < s.length; r++) {
      const a = s[r], o = a.isEllipseCurve ? t * 2 : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? t * a.points.length : t, l = a.getPoints(o);
      for (let u = 0; u < l.length; u++) {
        const c = l[u];
        n && n.equals(c) || (e.push(c), n = c);
      }
    }
    return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e;
  }
  copy(t) {
    super.copy(t), this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const r = t.curves[e];
      this.curves.push(r.clone());
    }
    return this.autoClose = t.autoClose, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.autoClose = this.autoClose, t.curves = [];
    for (let e = 0, n = this.curves.length; e < n; e++) {
      const r = this.curves[e];
      t.curves.push(r.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.autoClose = t.autoClose, this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const r = t.curves[e];
      this.curves.push(new Rr[r.type]().fromJSON(r));
    }
    return this;
  }
}
class Ys extends gf {
  constructor(t) {
    super(), this.type = "Path", this.currentPoint = new ct(), t && this.setFromPoints(t);
  }
  setFromPoints(t) {
    this.moveTo(t[0].x, t[0].y);
    for (let e = 1, n = t.length; e < n; e++)
      this.lineTo(t[e].x, t[e].y);
    return this;
  }
  moveTo(t, e) {
    return this.currentPoint.set(t, e), this;
  }
  lineTo(t, e) {
    const n = new Aa(this.currentPoint.clone(), new ct(t, e));
    return this.curves.push(n), this.currentPoint.set(t, e), this;
  }
  quadraticCurveTo(t, e, n, r) {
    const s = new ba(
      this.currentPoint.clone(),
      new ct(t, e),
      new ct(n, r)
    );
    return this.curves.push(s), this.currentPoint.set(n, r), this;
  }
  bezierCurveTo(t, e, n, r, s, a) {
    const o = new Ta(
      this.currentPoint.clone(),
      new ct(t, e),
      new ct(n, r),
      new ct(s, a)
    );
    return this.curves.push(o), this.currentPoint.set(s, a), this;
  }
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t), n = new wa(e);
    return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this;
  }
  arc(t, e, n, r, s, a) {
    const o = this.currentPoint.x, l = this.currentPoint.y;
    return this.absarc(
      t + o,
      e + l,
      n,
      r,
      s,
      a
    ), this;
  }
  absarc(t, e, n, r, s, a) {
    return this.absellipse(t, e, n, n, r, s, a), this;
  }
  ellipse(t, e, n, r, s, a, o, l) {
    const u = this.currentPoint.x, c = this.currentPoint.y;
    return this.absellipse(t + u, e + c, n, r, s, a, o, l), this;
  }
  absellipse(t, e, n, r, s, a, o, l) {
    const u = new Fr(t, e, n, r, s, a, o, l);
    if (this.curves.length > 0) {
      const f = u.getPoint(0);
      f.equals(this.currentPoint) || this.lineTo(f.x, f.y);
    }
    this.curves.push(u);
    const c = u.getPoint(1);
    return this.currentPoint.copy(c), this;
  }
  copy(t) {
    return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.currentPoint = this.currentPoint.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this;
  }
}
class Br extends Ve {
  constructor(t = [], e = [], n = 1, r = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: t,
      indices: e,
      radius: n,
      detail: r
    };
    const s = [], a = [];
    o(r), u(n), c(), this.setAttribute("position", new Re(s, 3)), this.setAttribute("normal", new Re(s.slice(), 3)), this.setAttribute("uv", new Re(a, 2)), r === 0 ? this.computeVertexNormals() : this.normalizeNormals();
    function o(T) {
      const C = new L(), v = new L(), F = new L();
      for (let b = 0; b < e.length; b += 3)
        p(e[b + 0], C), p(e[b + 1], v), p(e[b + 2], F), l(C, v, F, T);
    }
    function l(T, C, v, F) {
      const b = F + 1, w = [];
      for (let P = 0; P <= b; P++) {
        w[P] = [];
        const y = T.clone().lerp(v, P / b), M = C.clone().lerp(v, P / b), R = b - P;
        for (let q = 0; q <= R; q++)
          q === 0 && P === b ? w[P][q] = y : w[P][q] = y.clone().lerp(M, q / R);
      }
      for (let P = 0; P < b; P++)
        for (let y = 0; y < 2 * (b - P) - 1; y++) {
          const M = Math.floor(y / 2);
          y % 2 === 0 ? (h(w[P][M + 1]), h(w[P + 1][M]), h(w[P][M])) : (h(w[P][M + 1]), h(w[P + 1][M + 1]), h(w[P + 1][M]));
        }
    }
    function u(T) {
      const C = new L();
      for (let v = 0; v < s.length; v += 3)
        C.x = s[v + 0], C.y = s[v + 1], C.z = s[v + 2], C.normalize().multiplyScalar(T), s[v + 0] = C.x, s[v + 1] = C.y, s[v + 2] = C.z;
    }
    function c() {
      const T = new L();
      for (let C = 0; C < s.length; C += 3) {
        T.x = s[C + 0], T.y = s[C + 1], T.z = s[C + 2];
        const v = m(T) / 2 / Math.PI + 0.5, F = d(T) / Math.PI + 0.5;
        a.push(v, 1 - F);
      }
      g(), f();
    }
    function f() {
      for (let T = 0; T < a.length; T += 6) {
        const C = a[T + 0], v = a[T + 2], F = a[T + 4], b = Math.max(C, v, F), w = Math.min(C, v, F);
        b > 0.9 && w < 0.1 && (C < 0.2 && (a[T + 0] += 1), v < 0.2 && (a[T + 2] += 1), F < 0.2 && (a[T + 4] += 1));
      }
    }
    function h(T) {
      s.push(T.x, T.y, T.z);
    }
    function p(T, C) {
      const v = T * 3;
      C.x = t[v + 0], C.y = t[v + 1], C.z = t[v + 2];
    }
    function g() {
      const T = new L(), C = new L(), v = new L(), F = new L(), b = new ct(), w = new ct(), P = new ct();
      for (let y = 0, M = 0; y < s.length; y += 9, M += 6) {
        T.set(s[y + 0], s[y + 1], s[y + 2]), C.set(s[y + 3], s[y + 4], s[y + 5]), v.set(s[y + 6], s[y + 7], s[y + 8]), b.set(a[M + 0], a[M + 1]), w.set(a[M + 2], a[M + 3]), P.set(a[M + 4], a[M + 5]), F.copy(T).add(C).add(v).divideScalar(3);
        const R = m(F);
        x(b, M + 0, T, R), x(w, M + 2, C, R), x(P, M + 4, v, R);
      }
    }
    function x(T, C, v, F) {
      F < 0 && T.x === 1 && (a[C] = T.x - 1), v.x === 0 && v.z === 0 && (a[C] = F / 2 / Math.PI + 0.5);
    }
    function m(T) {
      return Math.atan2(T.z, -T.x);
    }
    function d(T) {
      return Math.atan2(-T.y, Math.sqrt(T.x * T.x + T.z * T.z));
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Br(t.vertices, t.indices, t.radius, t.details);
  }
}
class Ra extends Ys {
  constructor(t) {
    super(t), this.uuid = Vn(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(t) {
    const e = [];
    for (let n = 0, r = this.holes.length; n < r; n++)
      e[n] = this.holes[n].getPoints(t);
    return e;
  }
  // get points of shape and holes (keypoints based on segments parameter)
  extractPoints(t) {
    return {
      shape: this.getPoints(t),
      holes: this.getPointsHoles(t)
    };
  }
  copy(t) {
    super.copy(t), this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const r = t.holes[e];
      this.holes.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.uuid = this.uuid, t.holes = [];
    for (let e = 0, n = this.holes.length; e < n; e++) {
      const r = this.holes[e];
      t.holes.push(r.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.uuid = t.uuid, this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const r = t.holes[e];
      this.holes.push(new Ys().fromJSON(r));
    }
    return this;
  }
}
const _f = {
  triangulate: function(i, t, e = 2) {
    const n = t && t.length, r = n ? t[0] * e : i.length;
    let s = La(i, 0, r, e, !0);
    const a = [];
    if (!s || s.next === s.prev) return a;
    let o, l, u, c, f, h, p;
    if (n && (s = Cf(i, t, s, e)), i.length > 80 * e) {
      o = u = i[0], l = c = i[1];
      for (let g = e; g < r; g += e)
        f = i[g], h = i[g + 1], f < o && (o = f), h < l && (l = h), f > u && (u = f), h > c && (c = h);
      p = Math.max(u - o, c - l), p = p !== 0 ? 32767 / p : 0;
    }
    return ai(s, a, e, o, l, p, 0), a;
  }
};
function La(i, t, e, n, r) {
  let s, a;
  if (r === Uf(i, t, e, n) > 0)
    for (s = t; s < e; s += n) a = Zs(s, i[s], i[s + 1], a);
  else
    for (s = e - n; s >= t; s -= n) a = Zs(s, i[s], i[s + 1], a);
  return a && ki(a, a.next) && (li(a), a = a.next), a;
}
function Mn(i, t) {
  if (!i) return i;
  t || (t = i);
  let e = i, n;
  do
    if (n = !1, !e.steiner && (ki(e, e.next) || ie(e.prev, e, e.next) === 0)) {
      if (li(e), e = t = e.prev, e === e.next) break;
      n = !0;
    } else
      e = e.next;
  while (n || e !== t);
  return t;
}
function ai(i, t, e, n, r, s, a) {
  if (!i) return;
  !a && s && bf(i, n, r, s);
  let o = i, l, u;
  for (; i.prev !== i.next; ) {
    if (l = i.prev, u = i.next, s ? xf(i, n, r, s) : vf(i)) {
      t.push(l.i / e | 0), t.push(i.i / e | 0), t.push(u.i / e | 0), li(i), i = u.next, o = u.next;
      continue;
    }
    if (i = u, i === o) {
      a ? a === 1 ? (i = Mf(Mn(i), t, e), ai(i, t, e, n, r, s, 2)) : a === 2 && Sf(i, t, e, n, r, s) : ai(Mn(i), t, e, n, r, s, 1);
      break;
    }
  }
}
function vf(i) {
  const t = i.prev, e = i, n = i.next;
  if (ie(t, e, n) >= 0) return !1;
  const r = t.x, s = e.x, a = n.x, o = t.y, l = e.y, u = n.y, c = r < s ? r < a ? r : a : s < a ? s : a, f = o < l ? o < u ? o : u : l < u ? l : u, h = r > s ? r > a ? r : a : s > a ? s : a, p = o > l ? o > u ? o : u : l > u ? l : u;
  let g = n.next;
  for (; g !== t; ) {
    if (g.x >= c && g.x <= h && g.y >= f && g.y <= p && Fn(r, o, s, l, a, u, g.x, g.y) && ie(g.prev, g, g.next) >= 0) return !1;
    g = g.next;
  }
  return !0;
}
function xf(i, t, e, n) {
  const r = i.prev, s = i, a = i.next;
  if (ie(r, s, a) >= 0) return !1;
  const o = r.x, l = s.x, u = a.x, c = r.y, f = s.y, h = a.y, p = o < l ? o < u ? o : u : l < u ? l : u, g = c < f ? c < h ? c : h : f < h ? f : h, x = o > l ? o > u ? o : u : l > u ? l : u, m = c > f ? c > h ? c : h : f > h ? f : h, d = Lr(p, g, t, e, n), T = Lr(x, m, t, e, n);
  let C = i.prevZ, v = i.nextZ;
  for (; C && C.z >= d && v && v.z <= T; ) {
    if (C.x >= p && C.x <= x && C.y >= g && C.y <= m && C !== r && C !== a && Fn(o, c, l, f, u, h, C.x, C.y) && ie(C.prev, C, C.next) >= 0 || (C = C.prevZ, v.x >= p && v.x <= x && v.y >= g && v.y <= m && v !== r && v !== a && Fn(o, c, l, f, u, h, v.x, v.y) && ie(v.prev, v, v.next) >= 0)) return !1;
    v = v.nextZ;
  }
  for (; C && C.z >= d; ) {
    if (C.x >= p && C.x <= x && C.y >= g && C.y <= m && C !== r && C !== a && Fn(o, c, l, f, u, h, C.x, C.y) && ie(C.prev, C, C.next) >= 0) return !1;
    C = C.prevZ;
  }
  for (; v && v.z <= T; ) {
    if (v.x >= p && v.x <= x && v.y >= g && v.y <= m && v !== r && v !== a && Fn(o, c, l, f, u, h, v.x, v.y) && ie(v.prev, v, v.next) >= 0) return !1;
    v = v.nextZ;
  }
  return !0;
}
function Mf(i, t, e) {
  let n = i;
  do {
    const r = n.prev, s = n.next.next;
    !ki(r, s) && Pa(r, n, n.next, s) && oi(r, s) && oi(s, r) && (t.push(r.i / e | 0), t.push(n.i / e | 0), t.push(s.i / e | 0), li(n), li(n.next), n = i = s), n = n.next;
  } while (n !== i);
  return Mn(n);
}
function Sf(i, t, e, n, r, s) {
  let a = i;
  do {
    let o = a.next.next;
    for (; o !== a.prev; ) {
      if (a.i !== o.i && Lf(a, o)) {
        let l = Da(a, o);
        a = Mn(a, a.next), l = Mn(l, l.next), ai(a, t, e, n, r, s, 0), ai(l, t, e, n, r, s, 0);
        return;
      }
      o = o.next;
    }
    a = a.next;
  } while (a !== i);
}
function Cf(i, t, e, n) {
  const r = [];
  let s, a, o, l, u;
  for (s = 0, a = t.length; s < a; s++)
    o = t[s] * n, l = s < a - 1 ? t[s + 1] * n : i.length, u = La(i, o, l, n, !1), u === u.next && (u.steiner = !0), r.push(Rf(u));
  for (r.sort(yf), s = 0; s < r.length; s++)
    e = Ef(r[s], e);
  return e;
}
function yf(i, t) {
  return i.x - t.x;
}
function Ef(i, t) {
  const e = Tf(i, t);
  if (!e)
    return t;
  const n = Da(e, i);
  return Mn(n, n.next), Mn(e, e.next);
}
function Tf(i, t) {
  let e = t, n = -1 / 0, r;
  const s = i.x, a = i.y;
  do {
    if (a <= e.y && a >= e.next.y && e.next.y !== e.y) {
      const h = e.x + (a - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
      if (h <= s && h > n && (n = h, r = e.x < e.next.x ? e : e.next, h === s))
        return r;
    }
    e = e.next;
  } while (e !== t);
  if (!r) return null;
  const o = r, l = r.x, u = r.y;
  let c = 1 / 0, f;
  e = r;
  do
    s >= e.x && e.x >= l && s !== e.x && Fn(a < u ? s : n, a, l, u, a < u ? n : s, a, e.x, e.y) && (f = Math.abs(a - e.y) / (s - e.x), oi(e, i) && (f < c || f === c && (e.x > r.x || e.x === r.x && Af(r, e))) && (r = e, c = f)), e = e.next;
  while (e !== o);
  return r;
}
function Af(i, t) {
  return ie(i.prev, i, t.prev) < 0 && ie(t.next, i, i.next) < 0;
}
function bf(i, t, e, n) {
  let r = i;
  do
    r.z === 0 && (r.z = Lr(r.x, r.y, t, e, n)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next;
  while (r !== i);
  r.prevZ.nextZ = null, r.prevZ = null, wf(r);
}
function wf(i) {
  let t, e, n, r, s, a, o, l, u = 1;
  do {
    for (e = i, i = null, s = null, a = 0; e; ) {
      for (a++, n = e, o = 0, t = 0; t < u && (o++, n = n.nextZ, !!n); t++)
        ;
      for (l = u; o > 0 || l > 0 && n; )
        o !== 0 && (l === 0 || !n || e.z <= n.z) ? (r = e, e = e.nextZ, o--) : (r = n, n = n.nextZ, l--), s ? s.nextZ = r : i = r, r.prevZ = s, s = r;
      e = n;
    }
    s.nextZ = null, u *= 2;
  } while (a > 1);
  return i;
}
function Lr(i, t, e, n, r) {
  return i = (i - e) * r | 0, t = (t - n) * r | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, i | t << 1;
}
function Rf(i) {
  let t = i, e = i;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== i);
  return e;
}
function Fn(i, t, e, n, r, s, a, o) {
  return (r - a) * (t - o) >= (i - a) * (s - o) && (i - a) * (n - o) >= (e - a) * (t - o) && (e - a) * (s - o) >= (r - a) * (n - o);
}
function Lf(i, t) {
  return i.next.i !== t.i && i.prev.i !== t.i && !Pf(i, t) && // dones't intersect other edges
  (oi(i, t) && oi(t, i) && Df(i, t) && // locally visible
  (ie(i.prev, i, t.prev) || ie(i, t.prev, t)) || // does not create opposite-facing sectors
  ki(i, t) && ie(i.prev, i, i.next) > 0 && ie(t.prev, t, t.next) > 0);
}
function ie(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function ki(i, t) {
  return i.x === t.x && i.y === t.y;
}
function Pa(i, t, e, n) {
  const r = Ni(ie(i, t, e)), s = Ni(ie(i, t, n)), a = Ni(ie(e, n, i)), o = Ni(ie(e, n, t));
  return !!(r !== s && a !== o || r === 0 && Ii(i, e, t) || s === 0 && Ii(i, n, t) || a === 0 && Ii(e, i, n) || o === 0 && Ii(e, t, n));
}
function Ii(i, t, e) {
  return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
}
function Ni(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function Pf(i, t) {
  let e = i;
  do {
    if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && Pa(e, e.next, i, t)) return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function oi(i, t) {
  return ie(i.prev, i, i.next) < 0 ? ie(i, t, i.next) >= 0 && ie(i, i.prev, t) >= 0 : ie(i, t, i.prev) < 0 || ie(i, i.next, t) < 0;
}
function Df(i, t) {
  let e = i, n = !1;
  const r = (i.x + t.x) / 2, s = (i.y + t.y) / 2;
  do
    e.y > s != e.next.y > s && e.next.y !== e.y && r < (e.next.x - e.x) * (s - e.y) / (e.next.y - e.y) + e.x && (n = !n), e = e.next;
  while (e !== i);
  return n;
}
function Da(i, t) {
  const e = new Pr(i.i, i.x, i.y), n = new Pr(t.i, t.x, t.y), r = i.next, s = t.prev;
  return i.next = t, t.prev = i, e.next = r, r.prev = e, n.next = e, e.prev = n, s.next = n, n.prev = s, n;
}
function Zs(i, t, e, n) {
  const r = new Pr(i, t, e);
  return n ? (r.next = n.next, r.prev = n, n.next.prev = r, n.next = r) : (r.prev = r, r.next = r), r;
}
function li(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function Pr(i, t, e) {
  this.i = i, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function Uf(i, t, e, n) {
  let r = 0;
  for (let s = t, a = e - n; s < e; s += n)
    r += (i[a] - i[s]) * (i[s + 1] + i[a + 1]), a = s;
  return r;
}
class si {
  // calculate area of the contour polygon
  static area(t) {
    const e = t.length;
    let n = 0;
    for (let r = e - 1, s = 0; s < e; r = s++)
      n += t[r].x * t[s].y - t[s].x * t[r].y;
    return n * 0.5;
  }
  static isClockWise(t) {
    return si.area(t) < 0;
  }
  static triangulateShape(t, e) {
    const n = [], r = [], s = [];
    $s(t), Ks(n, t);
    let a = t.length;
    e.forEach($s);
    for (let l = 0; l < e.length; l++)
      r.push(a), a += e[l].length, Ks(n, e[l]);
    const o = _f.triangulate(n, r);
    for (let l = 0; l < o.length; l += 3)
      s.push(o.slice(l, l + 3));
    return s;
  }
}
function $s(i) {
  const t = i.length;
  t > 2 && i[t - 1].equals(i[0]) && i.pop();
}
function Ks(i, t) {
  for (let e = 0; e < t.length; e++)
    i.push(t[e].x), i.push(t[e].y);
}
class zr extends Ve {
  constructor(t = new Ra([new ct(0.5, 0.5), new ct(-0.5, 0.5), new ct(-0.5, -0.5), new ct(0.5, -0.5)]), e = {}) {
    super(), this.type = "ExtrudeGeometry", this.parameters = {
      shapes: t,
      options: e
    }, t = Array.isArray(t) ? t : [t];
    const n = this, r = [], s = [];
    for (let o = 0, l = t.length; o < l; o++) {
      const u = t[o];
      a(u);
    }
    this.setAttribute("position", new Re(r, 3)), this.setAttribute("uv", new Re(s, 2)), this.computeVertexNormals();
    function a(o) {
      const l = [], u = e.curveSegments !== void 0 ? e.curveSegments : 12, c = e.steps !== void 0 ? e.steps : 1, f = e.depth !== void 0 ? e.depth : 1;
      let h = e.bevelEnabled !== void 0 ? e.bevelEnabled : !0, p = e.bevelThickness !== void 0 ? e.bevelThickness : 0.2, g = e.bevelSize !== void 0 ? e.bevelSize : p - 0.1, x = e.bevelOffset !== void 0 ? e.bevelOffset : 0, m = e.bevelSegments !== void 0 ? e.bevelSegments : 3;
      const d = e.extrudePath, T = e.UVGenerator !== void 0 ? e.UVGenerator : If;
      let C, v = !1, F, b, w, P;
      d && (C = d.getSpacedPoints(c), v = !0, h = !1, F = d.computeFrenetFrames(c, !1), b = new L(), w = new L(), P = new L()), h || (m = 0, p = 0, g = 0, x = 0);
      const y = o.extractPoints(u);
      let M = y.shape;
      const R = y.holes;
      if (!si.isClockWise(M)) {
        M = M.reverse();
        for (let $ = 0, it = R.length; $ < it; $++) {
          const A = R[$];
          si.isClockWise(A) && (R[$] = A.reverse());
        }
      }
      const G = si.triangulateShape(M, R), k = M;
      for (let $ = 0, it = R.length; $ < it; $++) {
        const A = R[$];
        M = M.concat(A);
      }
      function j($, it, A) {
        return it || console.error("THREE.ExtrudeGeometry: vec does not exist"), $.clone().addScaledVector(it, A);
      }
      const H = M.length, nt = G.length;
      function V($, it, A) {
        let Et, tt, xt;
        const at = $.x - it.x, Lt = $.y - it.y, vt = A.x - $.x, E = A.y - $.y, _ = at * at + Lt * Lt, O = at * E - Lt * vt;
        if (Math.abs(O) > Number.EPSILON) {
          const Y = Math.sqrt(_), Q = Math.sqrt(vt * vt + E * E), Z = it.x - Lt / Y, At = it.y + at / Y, ht = A.x - E / Q, Mt = A.y + vt / Q, Wt = ((ht - Z) * E - (Mt - At) * vt) / (at * E - Lt * vt);
          Et = Z + at * Wt - $.x, tt = At + Lt * Wt - $.y;
          const rt = Et * Et + tt * tt;
          if (rt <= 2)
            return new ct(Et, tt);
          xt = Math.sqrt(rt / 2);
        } else {
          let Y = !1;
          at > Number.EPSILON ? vt > Number.EPSILON && (Y = !0) : at < -Number.EPSILON ? vt < -Number.EPSILON && (Y = !0) : Math.sign(Lt) === Math.sign(E) && (Y = !0), Y ? (Et = -Lt, tt = at, xt = Math.sqrt(_)) : (Et = at, tt = Lt, xt = Math.sqrt(_ / 2));
        }
        return new ct(Et / xt, tt / xt);
      }
      const ot = [];
      for (let $ = 0, it = k.length, A = it - 1, Et = $ + 1; $ < it; $++, A++, Et++)
        A === it && (A = 0), Et === it && (Et = 0), ot[$] = V(k[$], k[A], k[Et]);
      const dt = [];
      let St, X = ot.concat();
      for (let $ = 0, it = R.length; $ < it; $++) {
        const A = R[$];
        St = [];
        for (let Et = 0, tt = A.length, xt = tt - 1, at = Et + 1; Et < tt; Et++, xt++, at++)
          xt === tt && (xt = 0), at === tt && (at = 0), St[Et] = V(A[Et], A[xt], A[at]);
        dt.push(St), X = X.concat(St);
      }
      for (let $ = 0; $ < m; $++) {
        const it = $ / m, A = p * Math.cos(it * Math.PI / 2), Et = g * Math.sin(it * Math.PI / 2) + x;
        for (let tt = 0, xt = k.length; tt < xt; tt++) {
          const at = j(k[tt], ot[tt], Et);
          et(at.x, at.y, -A);
        }
        for (let tt = 0, xt = R.length; tt < xt; tt++) {
          const at = R[tt];
          St = dt[tt];
          for (let Lt = 0, vt = at.length; Lt < vt; Lt++) {
            const E = j(at[Lt], St[Lt], Et);
            et(E.x, E.y, -A);
          }
        }
      }
      const lt = g + x;
      for (let $ = 0; $ < H; $++) {
        const it = h ? j(M[$], X[$], lt) : M[$];
        v ? (w.copy(F.normals[0]).multiplyScalar(it.x), b.copy(F.binormals[0]).multiplyScalar(it.y), P.copy(C[0]).add(w).add(b), et(P.x, P.y, P.z)) : et(it.x, it.y, 0);
      }
      for (let $ = 1; $ <= c; $++)
        for (let it = 0; it < H; it++) {
          const A = h ? j(M[it], X[it], lt) : M[it];
          v ? (w.copy(F.normals[$]).multiplyScalar(A.x), b.copy(F.binormals[$]).multiplyScalar(A.y), P.copy(C[$]).add(w).add(b), et(P.x, P.y, P.z)) : et(A.x, A.y, f / c * $);
        }
      for (let $ = m - 1; $ >= 0; $--) {
        const it = $ / m, A = p * Math.cos(it * Math.PI / 2), Et = g * Math.sin(it * Math.PI / 2) + x;
        for (let tt = 0, xt = k.length; tt < xt; tt++) {
          const at = j(k[tt], ot[tt], Et);
          et(at.x, at.y, f + A);
        }
        for (let tt = 0, xt = R.length; tt < xt; tt++) {
          const at = R[tt];
          St = dt[tt];
          for (let Lt = 0, vt = at.length; Lt < vt; Lt++) {
            const E = j(at[Lt], St[Lt], Et);
            v ? et(E.x, E.y + C[c - 1].y, C[c - 1].x + A) : et(E.x, E.y, f + A);
          }
        }
      }
      N(), J();
      function N() {
        const $ = r.length / 3;
        if (h) {
          let it = 0, A = H * it;
          for (let Et = 0; Et < nt; Et++) {
            const tt = G[Et];
            Tt(tt[2] + A, tt[1] + A, tt[0] + A);
          }
          it = c + m * 2, A = H * it;
          for (let Et = 0; Et < nt; Et++) {
            const tt = G[Et];
            Tt(tt[0] + A, tt[1] + A, tt[2] + A);
          }
        } else {
          for (let it = 0; it < nt; it++) {
            const A = G[it];
            Tt(A[2], A[1], A[0]);
          }
          for (let it = 0; it < nt; it++) {
            const A = G[it];
            Tt(A[0] + H * c, A[1] + H * c, A[2] + H * c);
          }
        }
        n.addGroup($, r.length / 3 - $, 0);
      }
      function J() {
        const $ = r.length / 3;
        let it = 0;
        pt(k, it), it += k.length;
        for (let A = 0, Et = R.length; A < Et; A++) {
          const tt = R[A];
          pt(tt, it), it += tt.length;
        }
        n.addGroup($, r.length / 3 - $, 1);
      }
      function pt($, it) {
        let A = $.length;
        for (; --A >= 0; ) {
          const Et = A;
          let tt = A - 1;
          tt < 0 && (tt = $.length - 1);
          for (let xt = 0, at = c + m * 2; xt < at; xt++) {
            const Lt = H * xt, vt = H * (xt + 1), E = it + Et + Lt, _ = it + tt + Lt, O = it + tt + vt, Y = it + Et + vt;
            Dt(E, _, O, Y);
          }
        }
      }
      function et($, it, A) {
        l.push($), l.push(it), l.push(A);
      }
      function Tt($, it, A) {
        Ut($), Ut(it), Ut(A);
        const Et = r.length / 3, tt = T.generateTopUV(n, r, Et - 3, Et - 2, Et - 1);
        Ht(tt[0]), Ht(tt[1]), Ht(tt[2]);
      }
      function Dt($, it, A, Et) {
        Ut($), Ut(it), Ut(Et), Ut(it), Ut(A), Ut(Et);
        const tt = r.length / 3, xt = T.generateSideWallUV(n, r, tt - 6, tt - 3, tt - 2, tt - 1);
        Ht(xt[0]), Ht(xt[1]), Ht(xt[3]), Ht(xt[1]), Ht(xt[2]), Ht(xt[3]);
      }
      function Ut($) {
        r.push(l[$ * 3 + 0]), r.push(l[$ * 3 + 1]), r.push(l[$ * 3 + 2]);
      }
      function Ht($) {
        s.push($.x), s.push($.y);
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(), e = this.parameters.shapes, n = this.parameters.options;
    return Nf(e, n, t);
  }
  static fromJSON(t, e) {
    const n = [];
    for (let s = 0, a = t.shapes.length; s < a; s++) {
      const o = e[t.shapes[s]];
      n.push(o);
    }
    const r = t.options.extrudePath;
    return r !== void 0 && (t.options.extrudePath = new Rr[r.type]().fromJSON(r)), new zr(n, t.options);
  }
}
const If = {
  generateTopUV: function(i, t, e, n, r) {
    const s = t[e * 3], a = t[e * 3 + 1], o = t[n * 3], l = t[n * 3 + 1], u = t[r * 3], c = t[r * 3 + 1];
    return [
      new ct(s, a),
      new ct(o, l),
      new ct(u, c)
    ];
  },
  generateSideWallUV: function(i, t, e, n, r, s) {
    const a = t[e * 3], o = t[e * 3 + 1], l = t[e * 3 + 2], u = t[n * 3], c = t[n * 3 + 1], f = t[n * 3 + 2], h = t[r * 3], p = t[r * 3 + 1], g = t[r * 3 + 2], x = t[s * 3], m = t[s * 3 + 1], d = t[s * 3 + 2];
    return Math.abs(o - c) < Math.abs(a - u) ? [
      new ct(a, 1 - l),
      new ct(u, 1 - f),
      new ct(h, 1 - g),
      new ct(x, 1 - d)
    ] : [
      new ct(o, 1 - l),
      new ct(c, 1 - f),
      new ct(p, 1 - g),
      new ct(m, 1 - d)
    ];
  }
};
function Nf(i, t, e) {
  if (e.shapes = [], Array.isArray(i))
    for (let n = 0, r = i.length; n < r; n++) {
      const s = i[n];
      e.shapes.push(s.uuid);
    }
  else
    e.shapes.push(i.uuid);
  return e.options = Object.assign({}, t), t.extrudePath !== void 0 && (e.options.extrudePath = t.extrudePath.toJSON()), e;
}
class Wi extends Br {
  constructor(t = 1, e = 0) {
    const n = (1 + Math.sqrt(5)) / 2, r = [
      -1,
      n,
      0,
      1,
      n,
      0,
      -1,
      -n,
      0,
      1,
      -n,
      0,
      0,
      -1,
      n,
      0,
      1,
      n,
      0,
      -1,
      -n,
      0,
      1,
      -n,
      n,
      0,
      -1,
      n,
      0,
      1,
      -n,
      0,
      -1,
      -n,
      0,
      1
    ], s = [
      0,
      11,
      5,
      0,
      5,
      1,
      0,
      1,
      7,
      0,
      7,
      10,
      0,
      10,
      11,
      1,
      5,
      9,
      5,
      11,
      4,
      11,
      10,
      2,
      10,
      7,
      6,
      7,
      1,
      8,
      3,
      9,
      4,
      3,
      4,
      2,
      3,
      2,
      6,
      3,
      6,
      8,
      3,
      8,
      9,
      4,
      9,
      5,
      2,
      4,
      11,
      6,
      2,
      10,
      8,
      6,
      7,
      9,
      8,
      1
    ];
    super(r, s, t, e), this.type = "IcosahedronGeometry", this.parameters = {
      radius: t,
      detail: e
    };
  }
  static fromJSON(t) {
    return new Wi(t.radius, t.detail);
  }
}
class Ff extends Hn {
  static get type() {
    return "ShadowMaterial";
  }
  constructor(t) {
    super(), this.isShadowMaterial = !0, this.color = new kt(0), this.transparent = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.fog = t.fog, this;
  }
}
class Of extends Hn {
  static get type() {
    return "MeshStandardMaterial";
  }
  constructor(t) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.color = new kt(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new kt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new ct(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ge(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class Bf extends Of {
  static get type() {
    return "MeshPhysicalMaterial";
  }
  constructor(t) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new ct(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function() {
        return ue(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function(e) {
        this.ior = (1 + 0.4 * e) / (1 - 0.4 * e);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new kt(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new kt(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new kt(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(t);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(t) {
    this._anisotropy > 0 != t > 0 && this.version++, this._anisotropy = t;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(t) {
    this._clearcoat > 0 != t > 0 && this.version++, this._clearcoat = t;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(t) {
    this._iridescence > 0 != t > 0 && this.version++, this._iridescence = t;
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(t) {
    this._dispersion > 0 != t > 0 && this.version++, this._dispersion = t;
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(t) {
    this._sheen > 0 != t > 0 && this.version++, this._sheen = t;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(t) {
    this._transmission > 0 != t > 0 && this.version++, this._transmission = t;
  }
  copy(t) {
    return super.copy(t), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropy = t.anisotropy, this.anisotropyRotation = t.anisotropyRotation, this.anisotropyMap = t.anisotropyMap, this.clearcoat = t.clearcoat, this.clearcoatMap = t.clearcoatMap, this.clearcoatRoughness = t.clearcoatRoughness, this.clearcoatRoughnessMap = t.clearcoatRoughnessMap, this.clearcoatNormalMap = t.clearcoatNormalMap, this.clearcoatNormalScale.copy(t.clearcoatNormalScale), this.dispersion = t.dispersion, this.ior = t.ior, this.iridescence = t.iridescence, this.iridescenceMap = t.iridescenceMap, this.iridescenceIOR = t.iridescenceIOR, this.iridescenceThicknessRange = [...t.iridescenceThicknessRange], this.iridescenceThicknessMap = t.iridescenceThicknessMap, this.sheen = t.sheen, this.sheenColor.copy(t.sheenColor), this.sheenColorMap = t.sheenColorMap, this.sheenRoughness = t.sheenRoughness, this.sheenRoughnessMap = t.sheenRoughnessMap, this.transmission = t.transmission, this.transmissionMap = t.transmissionMap, this.thickness = t.thickness, this.thicknessMap = t.thicknessMap, this.attenuationDistance = t.attenuationDistance, this.attenuationColor.copy(t.attenuationColor), this.specularIntensity = t.specularIntensity, this.specularIntensityMap = t.specularIntensityMap, this.specularColor.copy(t.specularColor), this.specularColorMap = t.specularColorMap, this;
  }
}
class Gr extends he {
  constructor(t, e = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new kt(t), this.intensity = e;
  }
  dispose() {
  }
  copy(t, e) {
    return super.copy(t, e), this.color.copy(t.color), this.intensity = t.intensity, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, this.groundColor !== void 0 && (e.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (e.object.distance = this.distance), this.angle !== void 0 && (e.object.angle = this.angle), this.decay !== void 0 && (e.object.decay = this.decay), this.penumbra !== void 0 && (e.object.penumbra = this.penumbra), this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (e.object.target = this.target.uuid), e;
  }
}
class Js extends Gr {
  constructor(t, e, n) {
    super(t, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(he.DEFAULT_UP), this.updateMatrix(), this.groundColor = new kt(e);
  }
  copy(t, e) {
    return super.copy(t, e), this.groundColor.copy(t.groundColor), this;
  }
}
const Er = /* @__PURE__ */ new ne(), js = /* @__PURE__ */ new L(), Qs = /* @__PURE__ */ new L();
class zf {
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new ct(512, 512), this.map = null, this.mapPass = null, this.matrix = new ne(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Ir(), this._frameExtents = new ct(1, 1), this._viewportCount = 1, this._viewports = [
      new se(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera, n = this.matrix;
    js.setFromMatrixPosition(t.matrixWorld), e.position.copy(js), Qs.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(Qs), e.updateMatrixWorld(), Er.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Er), n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), n.multiply(Er);
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(t) {
    return this.camera = t.camera.clone(), this.intensity = t.intensity, this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    return this.intensity !== 1 && (t.intensity = this.intensity), this.bias !== 0 && (t.bias = this.bias), this.normalBias !== 0 && (t.normalBias = this.normalBias), this.radius !== 1 && (t.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t;
  }
}
class Gf extends zf {
  constructor() {
    super(new va(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class Qn extends Gr {
  constructor(t, e) {
    super(t, e), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(he.DEFAULT_UP), this.updateMatrix(), this.target = new he(), this.shadow = new Gf();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
}
class ta extends Gr {
  constructor(t, e) {
    super(t, e), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: "170"
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "170");
const ti = new L();
function be(i, t, e, n, r, s) {
  const a = 2 * Math.PI * r / 4, o = Math.max(s - 2 * r, 0), l = Math.PI / 4;
  ti.copy(t), ti[n] = 0, ti.normalize();
  const u = 0.5 * a / (a + o), c = 1 - ti.angleTo(i) / l;
  return Math.sign(ti[e]) === 1 ? c * u : o / (a + o) + u + u * (1 - c);
}
class Vf extends kn {
  constructor(t = 1, e = 1, n = 1, r = 2, s = 0.1) {
    if (r = r * 2 + 1, s = Math.min(t / 2, e / 2, n / 2, s), super(1, 1, 1, r, r, r), r === 1) return;
    const a = this.toNonIndexed();
    this.index = null, this.attributes.position = a.attributes.position, this.attributes.normal = a.attributes.normal, this.attributes.uv = a.attributes.uv;
    const o = new L(), l = new L(), u = new L(t, e, n).divideScalar(2).subScalar(s), c = this.attributes.position.array, f = this.attributes.normal.array, h = this.attributes.uv.array, p = c.length / 6, g = new L(), x = 0.5 / r;
    for (let m = 0, d = 0; m < c.length; m += 3, d += 2)
      switch (o.fromArray(c, m), l.copy(o), l.x -= Math.sign(l.x) * x, l.y -= Math.sign(l.y) * x, l.z -= Math.sign(l.z) * x, l.normalize(), c[m + 0] = u.x * Math.sign(o.x) + l.x * s, c[m + 1] = u.y * Math.sign(o.y) + l.y * s, c[m + 2] = u.z * Math.sign(o.z) + l.z * s, f[m + 0] = l.x, f[m + 1] = l.y, f[m + 2] = l.z, Math.floor(m / p)) {
        case 0:
          g.set(1, 0, 0), h[d + 0] = be(g, l, "z", "y", s, n), h[d + 1] = 1 - be(g, l, "y", "z", s, e);
          break;
        case 1:
          g.set(-1, 0, 0), h[d + 0] = 1 - be(g, l, "z", "y", s, n), h[d + 1] = 1 - be(g, l, "y", "z", s, e);
          break;
        case 2:
          g.set(0, 1, 0), h[d + 0] = 1 - be(g, l, "x", "z", s, t), h[d + 1] = be(g, l, "z", "x", s, n);
          break;
        case 3:
          g.set(0, -1, 0), h[d + 0] = 1 - be(g, l, "x", "z", s, t), h[d + 1] = 1 - be(g, l, "z", "x", s, n);
          break;
        case 4:
          g.set(0, 0, 1), h[d + 0] = 1 - be(g, l, "x", "y", s, t), h[d + 1] = 1 - be(g, l, "y", "x", s, e);
          break;
        case 5:
          g.set(0, 0, -1), h[d + 0] = be(g, l, "x", "y", s, t), h[d + 1] = 1 - be(g, l, "y", "x", s, e);
          break;
      }
  }
}
function Hf(i, t = !1) {
  const e = i[0].index !== null, n = new Set(Object.keys(i[0].attributes)), r = new Set(Object.keys(i[0].morphAttributes)), s = {}, a = {}, o = i[0].morphTargetsRelative, l = new Ve();
  let u = 0;
  for (let c = 0; c < i.length; ++c) {
    const f = i[c];
    let h = 0;
    if (e !== (f.index !== null))
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const p in f.attributes) {
      if (!n.has(p))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + '. All geometries must have compatible attributes; make sure "' + p + '" attribute exists among all geometries, or in none of them.'), null;
      s[p] === void 0 && (s[p] = []), s[p].push(f.attributes[p]), h++;
    }
    if (h !== n.size)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". Make sure all geometries have the same number of attributes."), null;
    if (o !== f.morphTargetsRelative)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const p in f.morphAttributes) {
      if (!r.has(p))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ".  .morphAttributes must be consistent throughout all geometries."), null;
      a[p] === void 0 && (a[p] = []), a[p].push(f.morphAttributes[p]);
    }
    if (t) {
      let p;
      if (e)
        p = f.index.count;
      else if (f.attributes.position !== void 0)
        p = f.attributes.position.count;
      else
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". The geometry must have either an index or a position attribute"), null;
      l.addGroup(u, p, c), u += p;
    }
  }
  if (e) {
    let c = 0;
    const f = [];
    for (let h = 0; h < i.length; ++h) {
      const p = i[h].index;
      for (let g = 0; g < p.count; ++g)
        f.push(p.getX(g) + c);
      c += i[h].attributes.position.count;
    }
    l.setIndex(f);
  }
  for (const c in s) {
    const f = ea(s[c]);
    if (!f)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + c + " attribute."), null;
    l.setAttribute(c, f);
  }
  for (const c in a) {
    const f = a[c][0].length;
    if (f === 0) break;
    l.morphAttributes = l.morphAttributes || {}, l.morphAttributes[c] = [];
    for (let h = 0; h < f; ++h) {
      const p = [];
      for (let x = 0; x < a[c].length; ++x)
        p.push(a[c][x][h]);
      const g = ea(p);
      if (!g)
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + c + " morphAttribute."), null;
      l.morphAttributes[c].push(g);
    }
  }
  return l;
}
function ea(i) {
  let t, e, n, r = -1, s = 0;
  for (let u = 0; u < i.length; ++u) {
    const c = i[u];
    if (t === void 0 && (t = c.array.constructor), t !== c.array.constructor)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (e === void 0 && (e = c.itemSize), e !== c.itemSize)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (n === void 0 && (n = c.normalized), n !== c.normalized)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (r === -1 && (r = c.gpuType), r !== c.gpuType)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    s += c.count * e;
  }
  const a = new t(s), o = new Fe(a, e, n);
  let l = 0;
  for (let u = 0; u < i.length; ++u) {
    const c = i[u];
    if (c.isInterleavedBufferAttribute) {
      const f = l / e;
      for (let h = 0, p = c.count; h < p; h++)
        for (let g = 0; g < e; g++) {
          const x = c.getComponent(h, g);
          o.setComponent(h + f, g, x);
        }
    } else
      a.set(c.array, l);
    l += c.count * e;
  }
  return r !== void 0 && (o.gpuType = r), o;
}
const kf = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.4094 7.59036C22.8581 6.03852 17.7896 7.7969 15.6176 9.96889C13.4456 12.1409 9.17188 16.4151 9.17188 16.4151L15.5846 22.8278C15.5846 22.8278 19.8583 18.5536 22.0308 16.3816C24.2023 14.2102 25.9606 9.14162 24.4094 7.59036Z" fill="black"/>
<path d="M7 18.5876L13.4121 25.0004L14.6536 23.7589L8.24091 17.3462L7 18.5876Z" fill="black"/>
</svg>
`, Wf = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.9099 9.59011C27.3586 8.03828 22.29 9.79665 20.1181 11.9686C17.9461 14.1406 13.6724 18.4149 13.6724 18.4149L20.0851 24.8276C20.0851 24.8276 24.3588 20.5533 26.5313 18.3814C28.7027 16.2099 30.4611 11.1414 28.9099 9.59011Z" fill="black"/>
<path d="M11.5005 20.5874L17.9126 27.0001L19.1541 25.7587L12.7414 19.3459L11.5005 20.5874Z" fill="black"/>
<path d="M15.5733 8.42628C14.4529 7.30551 10.7923 8.57545 9.22361 10.1441C7.65494 11.7128 4.56836 14.7997 4.56836 14.7997L9.19979 19.4312C9.19979 19.4312 12.2864 16.3442 13.8554 14.7756C15.4237 13.2073 16.6936 9.54665 15.5733 8.42628Z" fill="black"/>
<path d="M3 16.3688L7.63102 21.0002L8.52765 20.1036L3.89622 15.4722L3 16.3688Z" fill="black"/>
</svg>
`, Xf = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.676 4.44231L18.4456 4.97273L18.9881 5.23882H19.5766C20.3907 5.06198 21.0537 5.20938 21.5663 5.68112L21.8385 5.76924L22.1548 5.72518L22.426 5.6362L22.7883 5.41505L22.6973 5.99039L22.5621 6.4327V6.83096L22.9694 6.96313L23.557 7.09616L24.2355 7.2292L23.2857 7.84775L23.8742 8.29006L25.5476 9.57293L25.1854 9.61698L24.2806 9.79408C24.1902 9.91205 24.2506 10.1924 24.4617 10.6346C24.8236 11.4602 24.9893 12.2858 24.9592 13.1114C24.9592 13.9075 24.7636 14.763 24.3716 15.6771C24.2208 14.999 23.949 14.3946 23.557 13.8638L22.1548 12.581L21.8835 12.2268L21.7925 11.8285L21.5212 10.1042L21.3401 9.97118L21.0689 9.83813L20.9788 10.2805L21.0238 10.3254V10.3694L21.1139 11.0329L21.2049 11.7845L21.3401 12.4039L21.7925 12.8021C22.6972 13.2739 23.3758 14.0551 23.8282 15.1459L23.9643 15.5441L24.0093 15.9424L22.4711 13.7748C22.0791 13.3328 21.7019 13.156 21.3401 13.2444L22.1548 14.0401L22.8784 14.8365L23.602 15.9424L23.7832 16.827L22.8784 15.367L21.4762 14.3942L22.0646 15.1018L22.6522 15.7212L23.1956 16.4728L23.7381 17.2693C23.4968 17.3578 23.3609 17.4315 23.3308 17.4905C23.2404 17.6084 23.2859 17.7559 23.4668 17.9328C24.0397 18.4635 24.1449 19.0825 23.7832 19.7901C23.4213 20.5272 22.8486 20.9258 22.0646 20.9849C21.944 20.9849 21.823 21.0287 21.7024 21.117L21.3861 21.3382C20.4211 22.6946 19.3654 23.742 18.2194 24.4793L17.9022 24.7004L17.9473 24.8326L19.4855 24.4344C19.4252 24.8177 19.2139 25.2017 18.852 25.5851L17.3597 26.5137L15.8665 27.0001C15.3237 27.0295 14.8861 26.9413 14.5544 26.7349L16.0026 26.4247L15.1879 26.2926L14.4192 26.2036C12.5193 25.8497 10.9359 24.9213 9.66923 23.4176C8.40256 21.9432 7.6933 20.2031 7.5425 18.198C7.4219 16.6941 7.61828 15.2197 8.13095 13.7748C8.61348 12.507 9.36754 11.2245 10.3929 9.92712C11.3881 8.65916 12.6549 7.89198 14.193 7.6266C15.7009 7.36127 17.1484 7.62698 18.5357 8.42309L19.0782 8.60019H19.1242L19.3504 8.11382L19.7568 7.14023L20.5714 6.4327L20.7526 6.2556L20.8427 6.03445L20.7075 5.94633L19.5766 6.69792L18.898 7.84775H18.852C18.068 7.37611 17.2085 7.0965 16.2738 7.00805L13.5595 7.2292C12.6548 7.4651 11.8403 7.84828 11.1165 8.37903C10.3627 8.9097 9.79 9.52887 9.39797 10.2364L9.21685 10.3694L8.94559 10.4135L7.90476 9.92712L7 9.17467L7.67857 8.95352L8.31209 8.64425L8.17601 7.89267L7.94982 7.09616L7.72363 6.2556L7.99489 6.34458L8.7194 6.52082L8.94559 5.81329C9.06626 5.22366 9.36788 4.7812 9.85035 4.48637L9.75934 5.6362L9.80441 5.85736L9.89542 6.07851L10.1667 5.99039L10.3478 5.85736L11.1616 5.14983L11.1165 5.94633L11.1616 6.69792C11.1917 7.02227 11.3732 7.08142 11.7049 6.87501L12.4286 6.47676L13.1973 6.21155C13.8909 6.03462 14.5099 5.6806 15.0527 5.14983L15.7764 4.57535L16.4549 4H16.9524L17.676 4.44231ZM15.4592 20.5426C14.6148 20.1298 13.5897 20.026 12.3835 20.2324C11.2075 20.4094 10.2876 20.8372 9.62416 21.5153L9.39797 21.7805L9.21685 22.0466L9.35203 22.1788C10.6489 21.9723 11.8859 21.9723 13.0621 22.1788C14.2984 22.3851 15.4744 22.813 16.5901 23.4616L16.7262 23.1074L16.7712 22.7541C16.7411 21.722 16.3036 20.9849 15.4592 20.5426ZM16.2738 22.444L15.4141 22.1347C15.3237 22.0167 15.3237 21.7218 15.4141 21.2501L16.2738 22.444ZM14.0119 20.8078C14.4944 20.8372 14.796 20.9109 14.9167 21.0289L14.9617 22.0017L14.0119 21.6924C13.9214 21.5744 13.9214 21.2795 14.0119 20.8078ZM13.5595 21.6924L12.2024 21.5153V20.7197H13.5595V21.6924ZM12.3835 17.1363L11.8163 17.7608C11.6571 17.9736 11.5965 18.2321 11.6351 18.5375C11.6788 18.8139 11.8214 19.0474 12.0637 19.2372L12.7696 19.3988L13.2317 19.1171L13.3174 17.8308L13.04 16.5272L12.3835 17.1363ZM16.1837 14.0081C16.0471 13.8514 14.8781 13.9911 15.1817 14.529C15.425 14.9595 16.0255 15.308 16.295 15.4283L16.1148 15.5683L14.0384 16.4616L14.0693 16.9064L14.5889 17.062C15.0568 16.7695 16.0852 16.1588 16.4576 16.0564C16.9227 15.9287 16.9312 15.8747 17.0831 16.1436C17.2352 16.4127 18.1798 17.1509 18.0462 17.6278C17.9398 18.0089 18.705 17.7745 19.1012 17.6096L19.1215 17.0343C18.9083 16.6741 18.3883 15.897 18.0136 15.6685C17.6388 15.4399 18.6787 15.4855 19.2452 15.5372C19.4616 15.4389 19.8502 15.1926 19.6755 14.9921C19.457 14.7414 17.7736 14.9188 17.5655 15.0275C17.3583 15.1362 16.3207 14.1652 16.1837 14.0081ZM21.0689 16.694L21.7474 17.5786L21.9736 17.4464L21.8385 17.1363L21.6573 16.827L21.4311 16.6499L21.1599 16.5617L21.0689 16.694ZM22.517 16.8711C22.4567 16.4583 22.2752 16.1196 21.9736 15.8542C21.7023 15.5889 21.3558 15.456 20.9337 15.4559L22.517 16.8711ZM9.88482 13.254C9.78186 13.161 9.02108 13.3437 9.26544 13.6755C9.46105 13.9409 9.88508 14.1249 10.073 14.1835L9.9661 14.2898L8.66727 15.0413L8.72294 15.3325L9.07901 15.3946C9.36433 15.1652 9.99421 14.6828 10.2321 14.586C10.529 14.4655 10.5303 14.4287 10.6526 14.5947C10.7749 14.7606 11.459 15.1746 11.4098 15.5C11.3703 15.7604 11.8568 15.5464 12.1052 15.4068L12.0716 15.0249C11.9016 14.8035 11.4949 14.3305 11.2287 14.2085C10.9626 14.0866 11.6524 14.0361 12.031 14.0262C12.1659 13.9446 12.4031 13.7513 12.2713 13.6323C12.1062 13.484 11.0096 13.7317 10.8806 13.8198C10.7526 13.9076 9.98876 13.3476 9.88482 13.254ZM8.99066 10.9888L8.17601 12.3598C7.93475 12.0944 7.81464 11.8287 7.81464 11.5633C7.78453 11.298 7.87484 10.9738 8.0859 10.5906L8.99066 10.9888ZM20.3452 9.30771V9.35177H20.3903V9.44075L20.5264 9.61698V9.57293H20.5714V9.61698L20.7075 9.48481L21.4311 8.6883V8.55613L21.3861 8.46715L21.25 8.37903H21.1599L20.3452 9.30771ZM21.1139 7.18428C20.33 7.53808 19.8328 8.12812 19.6216 8.95352V9.08656L19.6667 9.13062L19.7568 9.21959H19.9379L20.0289 9.13062L21.1139 7.18428Z" fill="black"/>
</svg>
`, qf = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.676 4.44231L18.4456 4.97273L18.9881 5.23882H19.5766C20.3907 5.06198 21.0537 5.20938 21.5663 5.68112L21.8385 5.76924L22.1548 5.72518L22.426 5.6362L22.7883 5.41505L22.6973 5.99039L22.5621 6.4327V6.83096L22.9694 6.96313L23.557 7.09616L24.2355 7.2292L23.2857 7.84775L23.8742 8.29006L25.5476 9.57293L25.1854 9.61698L24.2806 9.79408C24.1902 9.91205 24.2506 10.1924 24.4617 10.6346C24.8236 11.4602 24.9893 12.2858 24.9592 13.1114C24.9592 13.9075 24.7636 14.763 24.3716 15.6771C24.2208 14.999 23.949 14.3946 23.557 13.8638L22.1548 12.581L21.8835 12.2268L21.7925 11.8285L21.5212 10.1042L21.3401 9.97118L21.0689 9.83813L20.9788 10.2805L21.0238 10.3254V10.3694L21.1139 11.0329L21.2049 11.7845L21.3401 12.4039L21.7925 12.8021C22.6972 13.2739 23.3758 14.0551 23.8282 15.1459L23.9643 15.5441L24.0093 15.9424L22.4711 13.7748C22.0791 13.3328 21.7019 13.156 21.3401 13.2444L22.1548 14.0401L22.8784 14.8365L23.602 15.9424L23.7832 16.827L22.8784 15.367L21.4762 14.3942L22.0646 15.1018L22.6522 15.7212L23.1956 16.4728L23.7381 17.2693C23.4968 17.3578 23.3609 17.4315 23.3308 17.4905C23.2404 17.6084 23.2859 17.7559 23.4668 17.9328C24.0397 18.4635 24.1449 19.0825 23.7832 19.7901C23.4213 20.5272 22.8486 20.9258 22.0646 20.9849C21.944 20.9849 21.823 21.0287 21.7024 21.117L21.3861 21.3382C20.4211 22.6946 19.3654 23.742 18.2194 24.4793L17.9022 24.7004L17.9473 24.8326L19.4855 24.4344C19.4252 24.8177 19.2139 25.2017 18.852 25.5851L17.3597 26.5137L15.8665 27.0001C15.3237 27.0295 14.8861 26.9413 14.5544 26.7349L16.0026 26.4247L15.1879 26.2926L14.4192 26.2036C12.5193 25.8497 10.9359 24.9213 9.66923 23.4176C8.40256 21.9432 7.6933 20.2031 7.5425 18.198C7.4219 16.6941 7.61828 15.2197 8.13095 13.7748C8.61348 12.507 9.36754 11.2245 10.3929 9.92712C11.3881 8.65916 12.6549 7.89198 14.193 7.6266C15.7009 7.36127 17.1484 7.62698 18.5357 8.42309L19.0782 8.60019H19.1242L19.3504 8.11382L19.7568 7.14023L20.5714 6.4327L20.7526 6.2556L20.8427 6.03445L20.7075 5.94633L19.5766 6.69792L18.898 7.84775H18.852C18.068 7.37611 17.2085 7.0965 16.2738 7.00805L13.5595 7.2292C12.6548 7.4651 11.8403 7.84828 11.1165 8.37903C10.3627 8.9097 9.79 9.52887 9.39797 10.2364L9.21685 10.3694L8.94559 10.4135L7.90476 9.92712L7 9.17467L7.67857 8.95352L8.31209 8.64425L8.17601 7.89267L7.94982 7.09616L7.72363 6.2556L7.99489 6.34458L8.7194 6.52082L8.94559 5.81329C9.06626 5.22366 9.36788 4.7812 9.85035 4.48637L9.75934 5.6362L9.80441 5.85736L9.89542 6.07851L10.1667 5.99039L10.3478 5.85736L11.1616 5.14983L11.1165 5.94633L11.1616 6.69792C11.1917 7.02227 11.3732 7.08142 11.7049 6.87501L12.4286 6.47676L13.1973 6.21155C13.8909 6.03462 14.5099 5.6806 15.0527 5.14983L15.7764 4.57535L16.4549 4H16.9524L17.676 4.44231ZM15.4592 20.5426C14.6148 20.1298 13.5897 20.026 12.3835 20.2324C11.2075 20.4094 10.2876 20.8372 9.62416 21.5153L9.39797 21.7805L9.21685 22.0466L9.35203 22.1788C10.6489 21.9723 11.8859 21.9723 13.0621 22.1788C14.2984 22.3851 15.4744 22.813 16.5901 23.4616L16.7262 23.1074L16.7712 22.7541C16.7411 21.722 16.3036 20.9849 15.4592 20.5426ZM16.2738 22.444L15.4141 22.1347C15.3237 22.0167 15.3237 21.7218 15.4141 21.2501L16.2738 22.444ZM14.0119 20.8078C14.4944 20.8372 14.796 20.9109 14.9167 21.0289L14.9617 22.0017L14.0119 21.6924C13.9214 21.5744 13.9214 21.2795 14.0119 20.8078ZM13.5595 21.6924L12.2024 21.5153V20.7197H13.5595V21.6924ZM12.3835 17.1363L11.8163 17.7608C11.6571 17.9736 11.5965 18.2321 11.6351 18.5375C11.6788 18.8139 11.8214 19.0474 12.0637 19.2372L12.7696 19.3988L13.2317 19.1171L13.3174 17.8308L13.04 16.5272L12.3835 17.1363ZM16.1837 14.0081C16.0471 13.8514 14.8781 13.9911 15.1817 14.529C15.425 14.9595 16.0255 15.308 16.295 15.4283L16.1148 15.5683L14.0384 16.4616L14.0693 16.9064L14.5889 17.062C15.0568 16.7695 16.0852 16.1588 16.4576 16.0564C16.9227 15.9287 16.9312 15.8747 17.0831 16.1436C17.2352 16.4127 18.1798 17.1509 18.0462 17.6278C17.9398 18.0089 18.705 17.7745 19.1012 17.6096L19.1215 17.0343C18.9083 16.6741 18.3883 15.897 18.0136 15.6685C17.6388 15.4399 18.6787 15.4855 19.2452 15.5372C19.4616 15.4389 19.8502 15.1926 19.6755 14.9921C19.457 14.7414 17.7736 14.9188 17.5655 15.0275C17.3583 15.1362 16.3207 14.1652 16.1837 14.0081ZM21.0689 16.694L21.7474 17.5786L21.9736 17.4464L21.8385 17.1363L21.6573 16.827L21.4311 16.6499L21.1599 16.5617L21.0689 16.694ZM22.517 16.8711C22.4567 16.4583 22.2752 16.1196 21.9736 15.8542C21.7023 15.5889 21.3558 15.456 20.9337 15.4559L22.517 16.8711ZM9.88482 13.254C9.78186 13.161 9.02108 13.3437 9.26544 13.6755C9.46105 13.9409 9.88508 14.1249 10.073 14.1835L9.9661 14.2898L8.66727 15.0413L8.72294 15.3325L9.07901 15.3946C9.36433 15.1652 9.99421 14.6828 10.2321 14.586C10.529 14.4655 10.5303 14.4287 10.6526 14.5947C10.7749 14.7606 11.459 15.1746 11.4098 15.5C11.3703 15.7604 11.8568 15.5464 12.1052 15.4068L12.0716 15.0249C11.9016 14.8035 11.4949 14.3305 11.2287 14.2085C10.9626 14.0866 11.6524 14.0361 12.031 14.0262C12.1659 13.9446 12.4031 13.7513 12.2713 13.6323C12.1062 13.484 11.0096 13.7317 10.8806 13.8198C10.7526 13.9076 9.98876 13.3476 9.88482 13.254ZM8.99066 10.9888L8.17601 12.3598C7.93475 12.0944 7.81464 11.8287 7.81464 11.5633C7.78453 11.298 7.87484 10.9738 8.0859 10.5906L8.99066 10.9888ZM20.3452 9.30771V9.35177H20.3903V9.44075L20.5264 9.61698V9.57293H20.5714V9.61698L20.7075 9.48481L21.4311 8.6883V8.55613L21.3861 8.46715L21.25 8.37903H21.1599L20.3452 9.30771ZM21.1139 7.18428C20.33 7.53808 19.8328 8.12812 19.6216 8.95352V9.08656L19.6667 9.13062L19.7568 9.21959H19.9379L20.0289 9.13062L21.1139 7.18428Z" fill="black"/>
</svg>
`, Yf = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.16309 5.93498C9.28969 5.80838 9.41629 5.6976 9.54289 5.60265C9.66949 5.5077 9.81192 5.42857 9.97017 5.36527C10.0968 5.30197 10.2392 5.23867 10.3975 5.17537C10.5241 5.14372 10.6665 5.11207 10.8247 5.08042C10.983 5.04877 11.1412 5.01711 11.2995 4.98546C11.4578 4.98546 11.616 4.98546 11.7743 4.98546C11.9325 4.95381 12.0908 4.93799 12.249 4.93799C12.3756 4.93799 12.5497 4.93799 12.7712 4.93799C12.7712 5.47605 12.8662 5.98246 13.0561 6.45721C13.2144 6.86867 13.4517 7.21683 13.7682 7.50168C14.0847 7.78654 14.4329 8.00809 14.8127 8.16634C15.1925 8.29295 15.5881 8.35625 15.9996 8.35625C16.4111 8.35625 16.8067 8.29295 17.1865 8.16634C17.598 8.00809 17.9461 7.78654 18.231 7.50168C18.5475 7.21683 18.8007 6.86867 18.9906 6.45721C19.1488 6.01411 19.228 5.5077 19.228 4.93799C19.4812 4.93799 19.6394 4.93799 19.7027 4.93799C19.8926 4.93799 20.0667 4.95381 20.225 4.98546C20.3832 4.98546 20.5415 4.98546 20.6997 4.98546C20.858 5.01711 21.0162 5.04877 21.1745 5.08042C21.3327 5.11207 21.4751 5.14372 21.6017 5.17537C21.76 5.23867 21.9024 5.30197 22.029 5.36527C22.1873 5.42857 22.3297 5.5077 22.4563 5.60265C22.5829 5.6976 22.7095 5.80838 22.8361 5.93498V16.3322L22.5038 25.1152C22.5038 25.4317 22.3139 25.7166 21.9341 25.9698C21.5859 26.1913 21.0953 26.3971 20.4623 26.587C19.861 26.7452 19.1647 26.856 18.3734 26.9193C17.6138 27.0142 16.8225 27.0617 15.9996 27.0617C15.1767 27.0617 14.3854 27.0142 13.6258 26.9193C12.8345 26.8243 12.1382 26.6977 11.5369 26.5395C10.9039 26.3812 10.4133 26.1913 10.0651 25.9698C9.68532 25.6849 9.49542 25.4001 9.49542 25.1152L9.16309 16.3322V5.93498Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.65625 11.7743L8.21393 6.88428V14.7178L4.9381 15.9996L4.32091 15.6673L3.65625 12.7713V11.7743Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.7861 14.7178V6.88428L28.3438 11.7743V12.7713L27.6791 15.6673L27.062 15.9996L23.7861 14.7178Z" fill="black"/>
</svg>
`, Zf = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.8977 10.5333L17.2326 18.3544C17.043 18.1332 16.8534 17.912 16.6638 17.6908C16.4426 17.4696 16.2372 17.2642 16.0476 17.0746C15.8264 16.885 15.6052 16.6954 15.384 16.5058C15.1944 16.3478 14.9732 16.174 14.7204 15.9844C14.4992 15.8264 14.278 15.6684 14.0568 15.5104C13.804 15.384 13.567 15.2418 13.3458 15.0838C13.093 14.9574 12.8402 14.831 12.5874 14.7046C12.3346 14.6098 12.0818 14.4992 11.829 14.3728L18.1332 3.70769C18.7968 3.67609 19.4446 3.69189 20.0766 3.75509C20.677 3.7867 21.2458 3.8657 21.783 3.9921C22.3202 4.1185 22.8259 4.2923 23.2999 4.5135C23.7739 4.7031 24.2163 4.9401 24.6271 5.22451C25.0379 5.50891 25.4171 5.82491 25.7647 6.17251C26.0807 6.55171 26.3809 6.94672 26.6653 7.35752C26.9497 7.79992 27.1867 8.27393 27.3763 8.77953C27.5975 9.31673 27.7713 9.86974 27.8977 10.4385V10.5333ZM28.1347 13.1404L17.1378 20.914C17.1694 21.1036 17.1852 21.2932 17.1852 21.4828C17.2168 21.704 17.2484 21.8936 17.28 22.0516C17.3116 22.2412 17.3432 22.415 17.3748 22.573C17.4064 22.7626 17.438 22.9364 17.4696 23.0944C17.5012 23.2524 17.5328 23.4104 17.5644 23.5684C17.6276 23.7264 17.675 23.8686 17.7066 23.995C17.7698 24.153 17.8172 24.2952 17.8488 24.4216C17.912 24.548 17.9594 24.6744 17.991 24.8008C18.0226 24.8956 18.0542 24.9746 18.0858 25.0378C18.1174 25.1326 18.1332 25.2116 18.1332 25.2748C18.1648 25.338 18.1806 25.417 18.1806 25.5118C18.1806 25.575 18.1806 25.6382 18.1806 25.7014C18.1806 25.7646 18.1648 25.8278 18.1332 25.891C18.1332 25.9226 18.1174 25.97 18.0858 26.0332C18.0542 26.0964 18.0226 26.1438 17.991 26.1754C17.9594 26.2386 17.912 26.286 17.8488 26.3177C17.7856 26.3809 17.7224 26.4283 17.6592 26.4599C17.596 26.4915 17.5328 26.5231 17.4696 26.5547C17.4064 26.5863 17.3432 26.6179 17.28 26.6495C17.2168 26.6811 17.1536 26.6969 17.0904 26.6969C16.9956 26.6969 16.9166 26.6969 16.8534 26.6969C16.7902 26.6969 16.727 26.6811 16.6638 26.6495C16.6006 26.6495 16.5374 26.6337 16.4742 26.6021C16.3794 26.5705 16.3004 26.5389 16.2372 26.5073C16.1108 26.3809 16.0002 26.2386 15.9054 26.0806C15.8106 25.9226 15.7316 25.7804 15.6684 25.654C15.5736 25.496 15.4946 25.338 15.4314 25.18C15.3366 25.0536 15.2576 24.9114 15.1944 24.7534C15.1628 24.5954 15.1154 24.4374 15.0522 24.2794C15.0206 24.1214 14.989 23.9634 14.9574 23.8054C14.8942 23.6474 14.8626 23.4736 14.8626 23.284C14.831 23.126 14.8152 22.968 14.8152 22.81L10.6914 28.0715C10.6282 28.1031 10.5808 28.1347 10.5492 28.1663C10.486 28.1663 10.4228 28.1821 10.3596 28.2137C10.2964 28.2137 10.249 28.2295 10.2174 28.2611C10.1542 28.2611 10.091 28.2611 10.0278 28.2611C9.96456 28.2927 9.90136 28.3085 9.83816 28.3085C9.77496 28.3085 9.71176 28.3085 9.64856 28.3085C9.58536 28.3085 9.52216 28.3085 9.45896 28.3085C9.42736 28.3085 9.36416 28.2927 9.26936 28.2611C9.20616 28.2295 9.14296 28.1979 9.07976 28.1663C9.04816 28.1347 9.00076 28.1031 8.93756 28.0715C8.90596 28.0399 8.87436 27.9925 8.84276 27.9293C8.81116 27.8661 8.77956 27.8029 8.74796 27.7397C8.74796 27.6765 8.73216 27.6133 8.70056 27.5501C8.70056 27.4869 8.70056 27.4079 8.70056 27.3131C8.70056 27.2499 8.70056 27.1709 8.70056 27.0761C8.70056 26.9813 8.70056 26.8707 8.70056 26.7443L11.9712 22.7626L7.84735 26.2703C7.78415 26.3019 7.72095 26.3493 7.65775 26.4125C7.59455 26.4441 7.53135 26.4599 7.46815 26.4599C7.40495 26.4915 7.34175 26.5073 7.27855 26.5073C7.21535 26.5389 7.16795 26.5547 7.13635 26.5547C7.07314 26.5547 7.00994 26.5389 6.94674 26.5073C6.91514 26.5073 6.86774 26.4915 6.80454 26.4599C6.77294 26.4599 6.72554 26.4441 6.66234 26.4125C6.63074 26.3809 6.58334 26.3335 6.52014 26.2703C6.48854 26.2387 6.45694 26.1913 6.42534 26.128C6.39374 26.0964 6.36214 26.049 6.33054 25.9858C6.29894 25.9542 6.28314 25.9068 6.28314 25.8436C6.28314 25.7804 6.26734 25.733 6.23574 25.7014C6.23574 25.6382 6.25154 25.575 6.28314 25.5118C6.28314 25.4486 6.29894 25.3854 6.33054 25.3222C6.33054 25.259 6.34634 25.1958 6.37794 25.1326C6.40954 25.0694 6.44114 25.0062 6.47274 24.943L9.98036 21.9094L5.71434 24.0898C5.61953 24.0898 5.54053 24.0898 5.47733 24.0898C5.38253 24.0898 5.30353 24.0898 5.24033 24.0898C5.14553 24.0898 5.06653 24.074 5.00333 24.0424C4.94013 24.0424 4.87693 24.0266 4.81373 23.995C4.78213 23.9634 4.73473 23.9318 4.67153 23.9002C4.60833 23.8686 4.56093 23.837 4.52933 23.8054C4.49773 23.7738 4.46613 23.7264 4.43453 23.6632C4.40293 23.6316 4.37133 23.5842 4.33973 23.521C4.30813 23.4578 4.29233 23.3946 4.29233 23.3314C4.26073 23.2682 4.24493 23.205 4.24493 23.1418C4.24493 23.0786 4.24493 23.0312 4.24493 22.9996C4.24493 22.9364 4.26073 22.8732 4.29233 22.81C4.29233 22.7784 4.30813 22.731 4.33973 22.6678C4.33973 22.6362 4.35553 22.6046 4.38713 22.573C4.41873 22.5098 4.45033 22.4624 4.48193 22.4308C4.54513 22.3992 4.59253 22.3676 4.62413 22.336L8.22655 20.3926L4.86113 21.2932C4.79793 21.2616 4.71893 21.23 4.62413 21.1984C4.56093 21.1668 4.49773 21.1352 4.43453 21.1036C4.37133 21.072 4.32393 21.0404 4.29233 21.0088C4.22913 20.9772 4.18172 20.9298 4.15012 20.8666C4.08692 20.835 4.03952 20.8034 4.00792 20.7718C3.97632 20.7086 3.96052 20.6612 3.96052 20.6296C3.92892 20.598 3.91312 20.5506 3.91312 20.4874C3.88152 20.4242 3.86572 20.3768 3.86572 20.3452C3.86572 20.282 3.88152 20.2346 3.91312 20.203C3.91312 20.1714 3.92892 20.124 3.96052 20.0608C3.96052 20.0292 3.97632 19.9818 4.00792 19.9186C4.03952 19.887 4.07112 19.8554 4.10272 19.8238C4.10272 19.7922 4.11852 19.7448 4.15012 19.6816C4.21333 19.65 4.26073 19.6184 4.29233 19.5868C4.32393 19.5552 4.35553 19.5236 4.38713 19.492C4.45033 19.4604 4.49773 19.4288 4.52933 19.3972L7.70515 18.3544L7.98955 17.9752C8.14755 18.2596 8.30555 18.5282 8.46355 18.781C8.65316 19.0338 8.84276 19.2708 9.03236 19.492C9.22196 19.7448 9.41156 19.966 9.60116 20.1556C9.82236 20.3768 10.0436 20.5822 10.2648 20.7718C10.486 20.9614 10.723 21.1352 10.9758 21.2932C11.197 21.4512 11.434 21.5934 11.6868 21.7198C11.9396 21.8778 12.2082 22.0042 12.4926 22.099C12.777 22.2254 13.0614 22.336 13.3458 22.4308L27.9925 11.6709L28.1347 13.1404ZM8.41615 17.2642C8.51095 17.1694 8.60576 17.0904 8.70056 17.0272C8.76376 16.9324 8.84276 16.8534 8.93756 16.7902C9.03236 16.6954 9.12716 16.6164 9.22196 16.5532C9.31676 16.4584 9.42736 16.3794 9.55376 16.3162C9.64856 16.253 9.74336 16.1898 9.83816 16.1266C9.96456 16.0318 10.0752 15.9528 10.17 15.8896C10.2964 15.8264 10.407 15.7632 10.5018 15.7C10.6282 15.6368 10.7546 15.5736 10.881 15.5104L11.2602 15.226C11.513 15.3208 11.7658 15.4314 12.0186 15.5578C12.2398 15.6842 12.4768 15.8106 12.7296 15.937C12.9508 16.0634 13.172 16.1898 13.3932 16.3162C13.6144 16.4742 13.8356 16.6322 14.0568 16.7902C14.278 16.9482 14.4834 17.1062 14.673 17.2642C14.8942 17.4538 15.0996 17.6276 15.2892 17.7856C15.5104 17.9752 15.7 18.1806 15.858 18.4018C16.0476 18.5914 16.2372 18.7968 16.4268 19.018L13.251 21.3406C12.9982 21.2458 12.7454 21.151 12.4926 21.0562C12.2398 20.9614 12.0028 20.8508 11.7816 20.7244C11.5288 20.598 11.3076 20.4558 11.118 20.2978C10.8968 20.1398 10.6756 19.9818 10.4544 19.8238C10.2648 19.6342 10.0752 19.4446 9.88556 19.255C9.69596 19.0654 9.52216 18.86 9.36416 18.6388C9.20616 18.4492 9.04816 18.228 8.89016 17.9752C8.73216 17.754 8.57416 17.517 8.41615 17.2642Z" fill="black"/>
</svg>
`, $f = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.10231 10.5333L14.7674 18.3544C14.957 18.1332 15.1466 17.912 15.3362 17.6908C15.5574 17.4696 15.7628 17.2642 15.9524 17.0746C16.1736 16.885 16.3948 16.6954 16.616 16.5058C16.8056 16.3478 17.0268 16.174 17.2796 15.9844C17.5008 15.8264 17.722 15.6684 17.9432 15.5104C18.196 15.384 18.433 15.2418 18.6542 15.0838C18.907 14.9574 19.1598 14.831 19.4126 14.7046C19.6654 14.6098 19.9182 14.4992 20.171 14.3728L13.8668 3.70769C13.2032 3.67609 12.5554 3.69189 11.9234 3.75509C11.323 3.7867 10.7542 3.8657 10.217 3.9921C9.67975 4.1185 9.17415 4.2923 8.70014 4.5135C8.22614 4.7031 7.78374 4.9401 7.37294 5.22451C6.96213 5.50891 6.58293 5.82491 6.23533 6.17251C5.91933 6.55171 5.61912 6.94672 5.33472 7.35752C5.05032 7.79992 4.81332 8.27393 4.62372 8.77953C4.40252 9.31673 4.22871 9.86974 4.10231 10.4385V10.5333ZM3.86531 13.1404L14.8622 20.914C14.8306 21.1036 14.8148 21.2932 14.8148 21.4828C14.7832 21.704 14.7516 21.8936 14.72 22.0516C14.6884 22.2412 14.6568 22.415 14.6252 22.573C14.5936 22.7626 14.562 22.9364 14.5304 23.0944C14.4988 23.2524 14.4672 23.4104 14.4356 23.5684C14.3724 23.7264 14.325 23.8686 14.2934 23.995C14.2302 24.153 14.1828 24.2952 14.1512 24.4216C14.088 24.548 14.0406 24.6744 14.009 24.8008C13.9774 24.8956 13.9458 24.9746 13.9142 25.0378C13.8826 25.1326 13.8668 25.2116 13.8668 25.2748C13.8352 25.338 13.8194 25.417 13.8194 25.5118C13.8194 25.575 13.8194 25.6382 13.8194 25.7014C13.8194 25.7646 13.8352 25.8278 13.8668 25.891C13.8668 25.9226 13.8826 25.97 13.9142 26.0332C13.9458 26.0964 13.9774 26.1438 14.009 26.1754C14.0406 26.2386 14.088 26.286 14.1512 26.3177C14.2144 26.3809 14.2776 26.4283 14.3408 26.4599C14.404 26.4915 14.4672 26.5231 14.5304 26.5547C14.5936 26.5863 14.6568 26.6179 14.72 26.6495C14.7832 26.6811 14.8464 26.6969 14.9096 26.6969C15.0044 26.6969 15.0834 26.6969 15.1466 26.6969C15.2098 26.6969 15.273 26.6811 15.3362 26.6495C15.3994 26.6495 15.4626 26.6337 15.5258 26.6021C15.6206 26.5705 15.6996 26.5389 15.7628 26.5073C15.8892 26.3809 15.9998 26.2386 16.0946 26.0806C16.1894 25.9226 16.2684 25.7804 16.3316 25.654C16.4264 25.496 16.5054 25.338 16.5686 25.18C16.6634 25.0536 16.7424 24.9114 16.8056 24.7534C16.8372 24.5954 16.8846 24.4374 16.9478 24.2794C16.9794 24.1214 17.011 23.9634 17.0426 23.8054C17.1058 23.6474 17.1374 23.4736 17.1374 23.284C17.169 23.126 17.1848 22.968 17.1848 22.81L21.3086 28.0715C21.3718 28.1031 21.4192 28.1347 21.4508 28.1663C21.514 28.1663 21.5772 28.1821 21.6404 28.2137C21.7036 28.2137 21.751 28.2295 21.7826 28.2611C21.8458 28.2611 21.909 28.2611 21.9722 28.2611C22.0354 28.2927 22.0986 28.3085 22.1618 28.3085C22.225 28.3085 22.2882 28.3085 22.3514 28.3085C22.4146 28.3085 22.4778 28.3085 22.541 28.3085C22.5726 28.3085 22.6358 28.2927 22.7306 28.2611C22.7938 28.2295 22.857 28.1979 22.9202 28.1663C22.9518 28.1347 22.9992 28.1031 23.0624 28.0715C23.094 28.0399 23.1256 27.9925 23.1572 27.9293C23.1888 27.8661 23.2204 27.8029 23.252 27.7397C23.252 27.6765 23.2678 27.6133 23.2994 27.5501C23.2994 27.4869 23.2994 27.4079 23.2994 27.3131C23.2994 27.2499 23.2994 27.1709 23.2994 27.0761C23.2994 26.9813 23.2994 26.8707 23.2994 26.7443L20.0288 22.7626L24.1526 26.2703C24.2159 26.3019 24.2791 26.3493 24.3423 26.4125C24.4055 26.4441 24.4687 26.4599 24.5319 26.4599C24.5951 26.4915 24.6583 26.5073 24.7215 26.5073C24.7847 26.5389 24.8321 26.5547 24.8637 26.5547C24.9269 26.5547 24.9901 26.5389 25.0533 26.5073C25.0849 26.5073 25.1323 26.4915 25.1955 26.4599C25.2271 26.4599 25.2745 26.4441 25.3377 26.4125C25.3693 26.3809 25.4167 26.3335 25.4799 26.2703C25.5115 26.2387 25.5431 26.1913 25.5747 26.128C25.6063 26.0964 25.6379 26.049 25.6695 25.9858C25.7011 25.9542 25.7169 25.9068 25.7169 25.8436C25.7169 25.7804 25.7327 25.733 25.7643 25.7014C25.7643 25.6382 25.7485 25.575 25.7169 25.5118C25.7169 25.4486 25.7011 25.3854 25.6695 25.3222C25.6695 25.259 25.6537 25.1958 25.6221 25.1326C25.5905 25.0694 25.5589 25.0062 25.5273 24.943L22.0196 21.9094L26.2857 24.0898C26.3805 24.0898 26.4595 24.0898 26.5227 24.0898C26.6175 24.0898 26.6965 24.0898 26.7597 24.0898C26.8545 24.0898 26.9335 24.074 26.9967 24.0424C27.0599 24.0424 27.1231 24.0266 27.1863 23.995C27.2179 23.9634 27.2653 23.9318 27.3285 23.9002C27.3917 23.8686 27.4391 23.837 27.4707 23.8054C27.5023 23.7738 27.5339 23.7264 27.5655 23.6632C27.5971 23.6316 27.6287 23.5842 27.6603 23.521C27.6919 23.4578 27.7077 23.3946 27.7077 23.3314C27.7393 23.2682 27.7551 23.205 27.7551 23.1418C27.7551 23.0786 27.7551 23.0312 27.7551 22.9996C27.7551 22.9364 27.7393 22.8732 27.7077 22.81C27.7077 22.7784 27.6919 22.731 27.6603 22.6678C27.6603 22.6362 27.6445 22.6046 27.6129 22.573C27.5813 22.5098 27.5497 22.4624 27.5181 22.4308C27.4549 22.3992 27.4075 22.3676 27.3759 22.336L23.7734 20.3926L27.1389 21.2932C27.2021 21.2616 27.2811 21.23 27.3759 21.1984C27.4391 21.1668 27.5023 21.1352 27.5655 21.1036C27.6287 21.072 27.6761 21.0404 27.7077 21.0088C27.7709 20.9772 27.8183 20.9298 27.8499 20.8666C27.9131 20.835 27.9605 20.8034 27.9921 20.7718C28.0237 20.7086 28.0395 20.6612 28.0395 20.6296C28.0711 20.598 28.0869 20.5506 28.0869 20.4874C28.1185 20.4242 28.1343 20.3768 28.1343 20.3452C28.1343 20.282 28.1185 20.2346 28.0869 20.203C28.0869 20.1714 28.0711 20.124 28.0395 20.0608C28.0395 20.0292 28.0237 19.9818 27.9921 19.9186C27.9605 19.887 27.9289 19.8554 27.8973 19.8238C27.8973 19.7922 27.8815 19.7448 27.8499 19.6816C27.7867 19.65 27.7393 19.6184 27.7077 19.5868C27.6761 19.5552 27.6445 19.5236 27.6129 19.492C27.5497 19.4604 27.5023 19.4288 27.4707 19.3972L24.2949 18.3544L24.0104 17.9752C23.8524 18.2596 23.6944 18.5282 23.5364 18.781C23.3468 19.0338 23.1572 19.2708 22.9676 19.492C22.778 19.7448 22.5884 19.966 22.3988 20.1556C22.1776 20.3768 21.9564 20.5822 21.7352 20.7718C21.514 20.9614 21.277 21.1352 21.0242 21.2932C20.803 21.4512 20.566 21.5934 20.3132 21.7198C20.0604 21.8778 19.7918 22.0042 19.5074 22.099C19.223 22.2254 18.9386 22.336 18.6542 22.4308L4.00751 11.6709L3.86531 13.1404ZM23.5838 17.2642C23.489 17.1694 23.3942 17.0904 23.2994 17.0272C23.2362 16.9324 23.1572 16.8534 23.0624 16.7902C22.9676 16.6954 22.8728 16.6164 22.778 16.5532C22.6832 16.4584 22.5726 16.3794 22.4462 16.3162C22.3514 16.253 22.2566 16.1898 22.1618 16.1266C22.0354 16.0318 21.9248 15.9528 21.83 15.8896C21.7036 15.8264 21.593 15.7632 21.4982 15.7C21.3718 15.6368 21.2454 15.5736 21.119 15.5104L20.7398 15.226C20.487 15.3208 20.2342 15.4314 19.9814 15.5578C19.7602 15.6842 19.5232 15.8106 19.2704 15.937C19.0492 16.0634 18.828 16.1898 18.6068 16.3162C18.3856 16.4742 18.1644 16.6322 17.9432 16.7902C17.722 16.9482 17.5166 17.1062 17.327 17.2642C17.1058 17.4538 16.9004 17.6276 16.7108 17.7856C16.4896 17.9752 16.3 18.1806 16.142 18.4018C15.9524 18.5914 15.7628 18.7968 15.5732 19.018L18.749 21.3406C19.0018 21.2458 19.2546 21.151 19.5074 21.0562C19.7602 20.9614 19.9972 20.8508 20.2184 20.7244C20.4712 20.598 20.6924 20.4558 20.882 20.2978C21.1032 20.1398 21.3244 19.9818 21.5456 19.8238C21.7352 19.6342 21.9248 19.4446 22.1144 19.255C22.304 19.0654 22.4778 18.86 22.6358 18.6388C22.7938 18.4492 22.9518 18.228 23.1098 17.9752C23.2678 17.754 23.4258 17.517 23.5838 17.2642Z" fill="black"/>
</svg>
`, Kf = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9054 4.45528C18.1197 4.47058 18.4104 4.53943 18.7777 4.66185C19.145 4.76896 19.4588 4.90667 19.7189 5.07498C19.8261 5.13619 19.9409 5.23565 20.0633 5.37336C20.201 5.51108 20.3235 5.66409 20.4306 5.83241C20.5377 5.98542 20.6219 6.13843 20.6831 6.29145C20.7596 6.44446 20.7979 6.56687 20.7979 6.65868C20.7979 6.68929 20.6984 6.71989 20.4995 6.75049C20.3158 6.78109 20.0633 6.7964 19.7419 6.7964C19.4052 6.7964 19.1221 6.8117 18.8925 6.8423C18.6783 6.8729 18.4946 6.92646 18.3416 7.00297C18.1885 7.07947 18.0585 7.19423 17.9513 7.34725C17.8442 7.50026 17.7371 7.69153 17.6299 7.92105C17.4463 8.31889 17.2933 8.55606 17.1708 8.63257C17.0637 8.70908 17.0407 8.58666 17.102 8.26533C17.1326 8.15822 17.1708 7.9134 17.2167 7.53087C17.2626 7.13303 17.3086 6.71224 17.3545 6.2685C17.4004 5.82476 17.4463 5.43457 17.4922 5.09794C17.5381 4.746 17.5764 4.55474 17.607 4.52413C17.6376 4.47823 17.7371 4.45528 17.9054 4.45528ZM27.547 3.92738C27.7 3.95798 27.853 4.03449 28.0061 4.1569C28.2203 4.37112 28.2892 4.60829 28.2127 4.86842C28.1515 5.11324 27.9219 5.44987 27.524 5.87831C27.0343 6.39856 26.6899 6.65868 26.491 6.65868C26.3533 6.65868 26.2844 6.49802 26.2844 6.17669C26.2844 5.48812 26.4068 4.93727 26.6517 4.52413C26.9118 4.09569 27.2103 3.89677 27.547 3.92738ZM17.102 8.97685C17.1326 8.99215 17.1632 8.9998 17.1938 8.9998C17.2397 8.9998 17.2779 9.00745 17.3086 9.02276C17.3545 9.02276 17.4539 9.03806 17.607 9.06866L18.112 9.16047C18.112 9.16047 18.2651 9.19872 18.5711 9.27523C18.8772 9.35174 18.9461 9.39764 18.7777 9.41294C18.7777 9.44355 18.6859 9.47415 18.5023 9.50475C18.3186 9.52005 18.0967 9.5277 17.8365 9.5277C17.408 9.5277 17.1402 9.5124 17.0331 9.4818C16.9413 9.4512 16.8953 9.36704 16.8953 9.22933C16.8953 9.06101 16.9642 8.97685 17.102 8.97685ZM12.7403 16.574C12.7862 16.574 12.8474 16.6199 12.9239 16.7117C13.0005 16.8035 13.077 16.9183 13.1535 17.056C13.2453 17.1784 13.3219 17.3008 13.3831 17.4232C13.4443 17.5457 13.4749 17.6375 13.4749 17.6987C13.4749 17.8058 13.4519 17.8593 13.406 17.8593C13.3142 17.8593 13.1535 17.6987 12.9239 17.3773C12.7556 17.1325 12.6485 16.9413 12.6026 16.8035C12.572 16.6505 12.6179 16.574 12.7403 16.574ZM14.1177 15.1969C14.1636 15.2122 14.2324 15.2657 14.3243 15.3576C14.4314 15.4341 14.5309 15.5259 14.6227 15.633C14.7298 15.7401 14.8217 15.8472 14.8982 15.9543C14.99 16.0461 15.0512 16.115 15.0818 16.1609C15.1889 16.3751 15.166 16.4669 15.013 16.4363C14.8752 16.3904 14.6839 16.2603 14.439 16.0461C14.3319 15.9237 14.2401 15.8013 14.1636 15.6789C14.0871 15.5412 14.0488 15.4341 14.0488 15.3576C14.0488 15.2351 14.0718 15.1816 14.1177 15.1969ZM15.2425 13.9116C15.319 13.9116 15.4874 14.0493 15.7475 14.3247C15.9159 14.493 16.046 14.646 16.1378 14.7837C16.2296 14.9062 16.2602 14.9827 16.2296 15.0133C16.199 15.0439 16.1684 15.0592 16.1378 15.0592C16.0613 15.0592 15.9695 15.0286 15.8623 14.9674C15.7552 14.8909 15.6481 14.8067 15.5409 14.7149C15.4491 14.6078 15.3649 14.5007 15.2884 14.3936C15.2272 14.2711 15.1966 14.164 15.1966 14.0722C15.1966 13.9651 15.2119 13.9116 15.2425 13.9116ZM15.9541 12.3967C16.0154 12.3967 16.1378 12.4426 16.3214 12.5344C16.5051 12.6262 16.6964 12.7334 16.8953 12.8558C17.0943 12.9782 17.2626 13.0929 17.4004 13.2C17.5534 13.3072 17.6299 13.3837 17.6299 13.4296C17.6299 13.5061 17.5687 13.5443 17.4463 13.5443C17.2473 13.5443 17.0025 13.4678 16.7117 13.3148C16.2985 13.1006 16.0077 12.894 15.8394 12.6951C15.6863 12.4962 15.7246 12.3967 15.9541 12.3967ZM16.5969 10.9507C16.6581 10.9507 16.7806 10.989 16.9642 11.0655C17.1632 11.1267 17.3621 11.2032 17.5611 11.295C17.7753 11.3715 17.959 11.448 18.112 11.5245C18.2651 11.601 18.3416 11.6546 18.3416 11.6852C18.3416 11.777 18.2345 11.8229 18.0202 11.8229C17.8978 11.8229 17.7677 11.8076 17.6299 11.777C17.4922 11.7464 17.3545 11.7082 17.2167 11.6623C17.1096 11.6163 17.0025 11.5551 16.8953 11.4786C16.7882 11.4021 16.6964 11.3256 16.6199 11.2491C16.5587 11.1726 16.5204 11.1038 16.5051 11.0425C16.4898 10.9813 16.5204 10.9507 16.5969 10.9507ZM23.0935 6.98001L26.996 6.8882L26.9042 7.82924C26.8889 7.95166 26.8736 8.12762 26.8583 8.35714C26.843 8.58666 26.8277 8.84679 26.8124 9.13752C26.7971 9.41294 26.7818 9.71132 26.7665 10.0327L26.7205 10.9507C26.7052 11.4098 26.6976 11.8 26.6976 12.1213V12.9935C26.7129 13.2536 26.7359 13.4984 26.7665 13.7279C26.8124 13.9575 26.8583 14.2023 26.9042 14.4624C26.9807 14.8144 27.0343 15.1204 27.0649 15.3805C27.0955 15.6253 27.1031 15.7477 27.0878 15.7477C27.0725 15.763 26.9272 15.8166 26.6517 15.9084C26.3915 15.9849 26.0701 16.0767 25.6875 16.1838C24.754 16.4593 23.9123 16.7959 23.1624 17.1937C22.4278 17.5916 21.8615 18.0124 21.4636 18.4561C21.0657 18.8998 20.7826 19.3589 20.6142 19.8332C20.4612 20.3076 20.3923 20.8814 20.4076 21.5546C20.4229 21.7995 20.4306 21.9984 20.4306 22.1514C20.4306 22.2891 20.4153 22.3962 20.3847 22.4727C20.3694 22.5339 20.3388 22.5722 20.2928 22.5875C20.2469 22.6028 20.1781 22.6181 20.0862 22.6334C19.8567 22.6793 19.6807 22.7022 19.5583 22.7022C19.4052 22.7022 19.2904 22.664 19.2139 22.5875C19.1527 22.4957 19.0762 22.3427 18.9844 22.1284C18.8466 21.8224 18.6706 21.5317 18.4564 21.2563C18.2421 20.9655 17.9896 20.7131 17.6988 20.4988C17.4233 20.2693 17.1173 20.0857 16.7806 19.948C16.4592 19.8103 16.1301 19.7414 15.7935 19.7414C15.5792 19.7414 15.3573 19.7644 15.1277 19.8103C14.9135 19.8409 14.6686 19.8944 14.3931 19.9709C14.0258 20.078 13.7427 20.1622 13.5438 20.2234C13.3448 20.2693 13.1918 20.2923 13.0846 20.2923C12.9622 20.2923 12.878 20.254 12.8321 20.1775C12.8015 20.101 12.748 19.9862 12.6714 19.8332C12.5949 19.6496 12.526 19.4354 12.4648 19.1906C12.4189 18.9457 12.3807 18.7009 12.35 18.4561C12.3347 18.2113 12.3271 17.9894 12.3271 17.7905C12.3424 17.5916 12.373 17.4462 12.4189 17.3544C12.4954 17.232 12.549 17.1861 12.5796 17.2167C12.6255 17.2473 12.6944 17.3697 12.7862 17.5839C12.9086 17.8899 13.0464 18.1195 13.1994 18.2725C13.3678 18.4102 13.5285 18.4484 13.6815 18.3872C14.0947 18.2189 14.1024 17.8593 13.7045 17.3085C13.4902 17.0025 13.3678 16.7729 13.3372 16.6199C13.3219 16.4516 13.3831 16.2603 13.5208 16.0461C13.6279 15.939 13.6968 15.8855 13.7274 15.8855C13.8039 15.8855 14.0182 16.0614 14.3702 16.4134C14.615 16.6429 14.8063 16.7959 14.9441 16.8724C15.0818 16.9489 15.2043 16.9719 15.3114 16.9413C15.5562 16.8647 15.6634 16.7423 15.6328 16.574C15.6175 16.3904 15.4721 16.1226 15.1966 15.7707C15.0436 15.5871 14.9211 15.4417 14.8293 15.3346C14.7528 15.2275 14.6992 15.1433 14.6686 15.0821C14.638 15.0056 14.6304 14.9444 14.6457 14.8985C14.661 14.8526 14.6916 14.7914 14.7375 14.7149C14.7528 14.669 14.791 14.646 14.8523 14.646C14.9441 14.646 15.1736 14.8067 15.5409 15.128C15.9848 15.5106 16.2832 15.7018 16.4362 15.7018C16.5281 15.7018 16.6275 15.6483 16.7347 15.5412C16.8724 15.4035 16.926 15.2504 16.8953 15.0821C16.8647 14.9138 16.75 14.7684 16.551 14.646C16.2908 14.4777 16.0919 14.2711 15.9541 14.0263C15.8164 13.7815 15.7858 13.6055 15.8623 13.4984C15.8929 13.4678 15.9465 13.4525 16.023 13.4525C16.1608 13.4525 16.4515 13.552 16.8953 13.7509C17.3545 13.9651 17.6682 14.0722 17.8365 14.0722C18.0814 14.0722 18.2038 13.9192 18.2038 13.6132C18.2038 13.4755 18.1579 13.3684 18.0661 13.2919C17.9896 13.2 17.8442 13.0929 17.6299 12.9705C17.2933 12.8022 17.0101 12.6186 16.7806 12.4197C16.5663 12.2055 16.4821 12.0601 16.5281 11.9836C16.5587 11.953 16.6734 11.9453 16.8724 11.9606C17.0866 11.9759 17.3392 12.0142 17.6299 12.0754C17.8595 12.1213 18.0432 12.1596 18.1809 12.1902C18.3186 12.2208 18.4334 12.2361 18.5252 12.2361C18.6477 12.2361 18.7701 12.1749 18.8925 12.0524C19.3057 11.624 18.9231 11.2874 17.7447 11.0425C17.4539 10.966 17.2167 10.8436 17.0331 10.6753C16.8494 10.507 16.7882 10.3463 16.8494 10.1933C16.88 10.1015 16.9719 10.0403 17.1249 10.0097C17.2933 9.9791 17.6376 9.96379 18.1579 9.96379C18.6477 9.96379 18.9767 9.94849 19.145 9.91789C19.3134 9.88729 19.4129 9.82608 19.4435 9.73427C19.5353 9.52005 19.497 9.35174 19.3287 9.22933C19.1757 9.09161 18.9002 9.00745 18.5023 8.97685C18.1809 8.96155 17.9743 8.9386 17.8825 8.90799C17.8059 8.86209 17.7677 8.77028 17.7677 8.63257C17.7677 8.51016 17.7983 8.3801 17.8595 8.24238C17.9207 8.08937 17.9972 7.944 18.0891 7.80629C18.1809 7.66858 18.2804 7.54617 18.3875 7.43906C18.5099 7.33195 18.6247 7.25544 18.7318 7.20954C18.7931 7.19423 18.9461 7.17893 19.191 7.16363C19.4511 7.13303 19.7802 7.11008 20.1781 7.09477C20.576 7.06417 21.0198 7.04122 21.5095 7.02592C22.0146 7.01062 22.5425 6.99532 23.0935 6.98001ZM7.02424 19.3053C7.55988 19.3053 8.04196 19.29 8.47047 19.2594C8.91429 19.2135 9.3275 19.1523 9.7101 19.0758C10.0927 18.984 10.46 18.8692 10.812 18.7315C11.164 18.5785 11.5313 18.4025 11.9139 18.2036C11.9445 18.2036 11.9751 18.2648 12.0057 18.3872C12.0363 18.5096 12.0669 18.6627 12.0975 18.8463C12.22 19.8409 12.4342 20.4223 12.7403 20.5906C12.7862 20.6212 12.8704 20.6365 12.9928 20.6365C13.1152 20.6365 13.253 20.6212 13.406 20.5906C13.5744 20.56 13.7733 20.5141 14.0029 20.4529C14.2631 20.3764 14.5691 20.3076 14.9211 20.2464C15.2884 20.1852 15.5792 20.1469 15.7935 20.1316C15.9771 20.1316 16.1301 20.1393 16.2526 20.1546C16.375 20.1546 16.4898 20.1699 16.5969 20.2005C16.704 20.2311 16.8035 20.277 16.8953 20.3382C17.0025 20.3841 17.1173 20.4529 17.2397 20.5447C17.3774 20.6365 17.5458 20.7896 17.7447 21.0038C17.9437 21.2027 18.1273 21.4169 18.2957 21.6464C18.464 21.8607 18.6094 22.0672 18.7318 22.2662C18.8543 22.4498 18.9155 22.5875 18.9155 22.6793C18.9155 22.7711 18.6094 22.8782 17.9972 23.0006C17.4004 23.123 16.5281 23.2531 15.3802 23.3908C14.2477 23.5285 13.1459 23.5974 12.0746 23.5974C10.7278 23.5974 9.44993 23.4979 8.24091 23.299C7.03189 23.1001 5.92235 22.8094 4.91228 22.4268C4.71333 22.3503 4.56029 22.2891 4.45316 22.2432C4.34603 22.1973 4.26951 22.1514 4.2236 22.1055C4.17768 22.0443 4.14708 21.9754 4.13177 21.8989V21.5317C4.13177 21.1338 4.2236 20.736 4.40725 20.3382C4.6062 19.9403 4.83576 19.6726 5.09593 19.5348C5.26427 19.4583 5.49383 19.4048 5.78461 19.3742C6.07539 19.3283 6.4886 19.3053 7.02424 19.3053ZM26.9042 16.2297L27.3404 16.115L27.6847 17.3085C27.7765 17.6604 27.853 18.043 27.9143 18.4561C27.9908 18.8539 28.0443 19.2365 28.075 19.6037C28.1056 19.9556 28.1132 20.2693 28.0979 20.5447C28.0826 20.8202 28.0443 21.0114 27.9831 21.1185C27.9219 21.2257 27.8301 21.3251 27.7077 21.4169C27.5852 21.4934 27.3786 21.5699 27.0878 21.6464C26.8124 21.7076 26.4298 21.7765 25.94 21.853C25.4503 21.9142 24.8152 21.9907 24.0347 22.0825C23.6674 22.1284 23.3077 22.1743 22.9558 22.2202C22.6191 22.2508 22.313 22.2891 22.0375 22.335C21.762 22.3656 21.5325 22.3886 21.3488 22.4039C21.1805 22.4192 21.0734 22.4268 21.0274 22.4268C20.905 22.4421 20.8285 22.3886 20.7979 22.2662C20.7826 22.1284 20.7902 21.7689 20.8208 21.1874C20.8361 20.7131 20.8897 20.2999 20.9815 19.948C21.0887 19.5807 21.2417 19.2518 21.4407 18.961C21.6549 18.6703 21.9304 18.4025 22.2671 18.1577C22.6038 17.9129 23.017 17.6681 23.5067 17.4232C23.7057 17.3314 23.9505 17.2243 24.2413 17.1019C24.5474 16.9795 24.8611 16.8647 25.1825 16.7576C25.5039 16.6352 25.8176 16.5281 26.1237 16.4363C26.4298 16.3445 26.6899 16.2756 26.9042 16.2297ZM28.6029 21.8989C28.6182 21.8989 28.6259 21.9066 28.6259 21.9219H28.6489C28.6795 21.9525 28.7024 22.1514 28.7177 22.5186C28.7483 22.8859 28.7789 23.3143 28.8095 23.8039L28.8784 25.5942L28.3275 25.7549L27.6847 25.8926C27.4857 25.9232 27.2791 25.9538 27.0649 25.9844C26.9578 25.9997 26.8659 26.015 26.7894 26.0303H26.6287C26.5369 26.0303 26.4757 26.0227 26.4451 26.0074C26.4298 25.9767 26.4221 25.9232 26.4221 25.8467C26.4221 25.6937 26.3456 25.6172 26.1926 25.6172C26.0548 25.6172 25.986 25.686 25.986 25.8237C25.986 25.9614 25.8253 26.0533 25.5039 26.0992L25.1366 26.1451C25.1366 26.1451 25.0448 26.1527 24.8611 26.168C24.8152 26.1833 24.7616 26.168 24.7004 26.1221C24.6392 26.0762 24.5856 26.015 24.5397 25.9385C24.4632 25.8161 24.4096 25.7549 24.379 25.7549C24.3637 25.7549 24.3178 25.8161 24.2413 25.9385C24.1801 26.0303 24.0653 26.0992 23.897 26.1451C23.7286 26.191 23.5603 26.2139 23.3919 26.2139C23.2389 26.2139 23.1011 26.1986 22.9787 26.168C22.8716 26.1221 22.818 26.0609 22.818 25.9844C22.818 25.8467 22.7645 25.7778 22.6573 25.7778C22.5655 25.7778 22.489 25.8467 22.4278 25.9844C22.3972 26.0609 22.3053 26.1145 22.1523 26.1451C22.0146 26.1757 21.7697 26.191 21.4177 26.191H20.4995V25.5254C20.4995 25.1581 20.4765 24.9056 20.4306 24.7679C20.3847 24.6149 20.224 24.5384 19.9485 24.5384C19.7802 24.5384 19.5583 24.5614 19.2828 24.6073C19.0073 24.6379 18.6553 24.6914 18.2268 24.7679C17.7371 24.8444 17.3545 24.9133 17.079 24.9745C16.8035 25.0204 16.5969 25.0663 16.4592 25.1122C16.3368 25.1581 16.2602 25.2117 16.2296 25.2729C16.199 25.3188 16.1761 25.3876 16.1608 25.4795C16.1455 25.556 16.1225 25.6248 16.0919 25.686C16.0766 25.7319 16.0307 25.7702 15.9541 25.8008C15.8929 25.8314 15.8011 25.862 15.6787 25.8926C15.5562 25.9232 15.3956 25.9538 15.1966 25.9844C15.013 26.015 14.8599 26.038 14.7375 26.0533C14.6303 26.0686 14.5385 26.0762 14.462 26.0762C14.309 26.0762 14.2095 26.015 14.1636 25.8926C14.0871 25.709 14.0029 25.6172 13.9111 25.6172C13.7886 25.6172 13.7045 25.7166 13.6585 25.9155C13.6279 26.038 13.5514 26.1145 13.429 26.1451C13.3219 26.1757 13.0693 26.191 12.6714 26.191C12.3041 26.191 12.0516 26.1757 11.9139 26.1451C11.7914 26.1145 11.7302 26.0609 11.7302 25.9844C11.7302 25.8467 11.6614 25.7778 11.5236 25.7778C11.3859 25.7778 11.317 25.8467 11.317 25.9844C11.317 26.0609 11.2558 26.1145 11.1334 26.1451C11.0262 26.1757 10.8196 26.191 10.5136 26.191C10.2075 26.191 10.0009 26.1757 9.89375 26.1451C9.78662 26.1145 9.73306 26.0609 9.73306 25.9844C9.73306 25.7855 9.65653 25.686 9.50349 25.686C9.41167 25.686 9.31985 25.7396 9.22802 25.8467C9.1362 25.9691 8.9449 26.0303 8.65412 26.0303C8.43986 26.0303 8.21795 25.9921 7.98839 25.9155C7.75883 25.8237 7.62875 25.7166 7.59814 25.5942C7.55223 25.4259 7.48336 25.3417 7.39154 25.3417C7.31502 25.3264 7.23849 25.3953 7.16197 25.5483C7.11606 25.6401 6.99363 25.686 6.79468 25.686C6.68755 25.686 6.56512 25.6707 6.42738 25.6401C6.30495 25.6095 6.19017 25.5713 6.08304 25.5254C5.97591 25.4642 5.88409 25.4029 5.80757 25.3417C5.73105 25.2805 5.69279 25.2117 5.69279 25.1352C5.69279 24.9363 5.63157 24.898 5.50914 25.0204C5.40201 25.1275 5.27958 25.1811 5.14184 25.1811C4.92758 25.1811 4.74393 25.0893 4.59089 24.9056C4.42255 24.7067 4.2542 24.6379 4.08586 24.6991C3.93282 24.7603 3.72622 24.6991 3.46605 24.5155C3.37422 24.4543 3.30535 24.4007 3.25944 24.3548C3.21353 24.3089 3.17527 24.2553 3.14466 24.1941C3.12936 24.1176 3.12171 24.0182 3.12171 23.8958C3.13701 23.7733 3.15231 23.6127 3.16762 23.4138C3.19823 23.1842 3.22883 22.9777 3.25944 22.7941C3.29005 22.5951 3.31301 22.4804 3.32831 22.4498C3.35892 22.4192 3.42779 22.4268 3.53492 22.4727C3.65735 22.5033 3.79508 22.5722 3.94813 22.6793C4.10117 22.7864 4.31542 22.9012 4.59089 23.0236C4.86637 23.1307 5.17245 23.2454 5.50914 23.3679C5.86113 23.475 6.23608 23.5821 6.63398 23.6892C7.03189 23.7963 7.43745 23.8881 7.85066 23.9646C8.43221 24.0717 9.02907 24.1559 9.64123 24.2171C10.2534 24.263 10.8962 24.2859 11.5695 24.2859C12.5643 24.2859 13.605 24.2324 14.6916 24.1253C15.7935 24.0029 16.9872 23.8269 18.2727 23.5974C18.5941 23.5362 18.9767 23.475 19.4205 23.4138C19.8643 23.3373 20.3388 23.2684 20.8438 23.2072C21.3488 23.1307 21.8615 23.0618 22.3818 23.0006C22.9022 22.9241 23.3843 22.8629 23.8281 22.817C24.6239 22.7252 25.2896 22.6487 25.8253 22.5875C26.3762 22.511 26.82 22.4421 27.1567 22.3809C27.5087 22.3044 27.7765 22.2355 27.9602 22.1743C28.1438 22.1131 28.2816 22.0519 28.3734 21.9907C28.4346 21.9295 28.5111 21.8989 28.6029 21.8989ZM27.4781 4.38642C27.3557 4.41702 27.2332 4.47823 27.1108 4.57004C27.0343 4.64654 26.9578 4.77661 26.8812 4.96022C26.8047 5.12854 26.7512 5.29686 26.7205 5.46517C26.6746 5.63349 26.644 5.77885 26.6287 5.90126C26.6287 6.02367 26.644 6.08488 26.6746 6.08488C26.7205 6.08488 26.8047 6.02367 26.9272 5.90126C27.0649 5.77885 27.195 5.64114 27.3174 5.48812C27.4551 5.31981 27.5699 5.16679 27.6617 5.02908C27.7689 4.87607 27.8224 4.76896 27.8224 4.70775C27.8224 4.58534 27.7842 4.50118 27.7077 4.45528C27.6464 4.39407 27.5699 4.37112 27.4781 4.38642Z" fill="black"/>
</svg>
`, Jf = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0946 4.45528C13.8803 4.47058 13.5896 4.53943 13.2223 4.66185C12.855 4.76896 12.5412 4.90667 12.2811 5.07498C12.1739 5.13619 12.0591 5.23565 11.9367 5.37336C11.799 5.51108 11.6765 5.66409 11.5694 5.83241C11.4623 5.98542 11.3781 6.13843 11.3169 6.29145C11.2404 6.44446 11.2021 6.56687 11.2021 6.65868C11.2021 6.68929 11.3016 6.71989 11.5005 6.75049C11.6842 6.78109 11.9367 6.7964 12.2581 6.7964C12.5948 6.7964 12.8779 6.8117 13.1075 6.8423C13.3217 6.8729 13.5054 6.92646 13.6584 7.00297C13.8115 7.07947 13.9415 7.19423 14.0487 7.34725C14.1558 7.50026 14.2629 7.69153 14.3701 7.92105C14.5537 8.31889 14.7067 8.55606 14.8292 8.63257C14.9363 8.70908 14.9593 8.58666 14.898 8.26533C14.8674 8.15822 14.8292 7.9134 14.7833 7.53087C14.7374 7.13303 14.6914 6.71224 14.6455 6.2685C14.5996 5.82476 14.5537 5.43457 14.5078 5.09794C14.4619 4.746 14.4236 4.55474 14.393 4.52413C14.3624 4.47823 14.2629 4.45528 14.0946 4.45528ZM4.45303 3.92738C4.29999 3.95798 4.14695 4.03449 3.99391 4.1569C3.77966 4.37112 3.71079 4.60829 3.78731 4.86842C3.84852 5.11324 4.07808 5.44987 4.47599 5.87831C4.96572 6.39856 5.31006 6.65868 5.50901 6.65868C5.64675 6.65868 5.71562 6.49802 5.71562 6.17669C5.71562 5.48812 5.59319 4.93727 5.34832 4.52413C5.08815 4.09569 4.78972 3.89677 4.45303 3.92738ZM14.898 8.97685C14.8674 8.99215 14.8368 8.9998 14.8062 8.9998C14.7603 8.9998 14.7221 9.00745 14.6914 9.02276C14.6455 9.02276 14.5461 9.03806 14.393 9.06866L13.888 9.16047C13.888 9.16047 13.7349 9.19872 13.4289 9.27523C13.1228 9.35174 13.0539 9.39764 13.2223 9.41294C13.2223 9.44355 13.3141 9.47415 13.4977 9.50475C13.6814 9.52005 13.9033 9.5277 14.1635 9.5277C14.592 9.5277 14.8598 9.5124 14.9669 9.4818C15.0587 9.4512 15.1047 9.36704 15.1047 9.22933C15.1047 9.06101 15.0358 8.97685 14.898 8.97685ZM19.2597 16.574C19.2138 16.574 19.1526 16.6199 19.0761 16.7117C18.9995 16.8035 18.923 16.9183 18.8465 17.056C18.7547 17.1784 18.6781 17.3008 18.6169 17.4232C18.5557 17.5457 18.5251 17.6375 18.5251 17.6987C18.5251 17.8058 18.5481 17.8593 18.594 17.8593C18.6858 17.8593 18.8465 17.6987 19.0761 17.3773C19.2444 17.1325 19.3515 16.9413 19.3974 16.8035C19.428 16.6505 19.3821 16.574 19.2597 16.574ZM17.8823 15.1969C17.8364 15.2122 17.7676 15.2657 17.6757 15.3576C17.5686 15.4341 17.4691 15.5259 17.3773 15.633C17.2702 15.7401 17.1783 15.8472 17.1018 15.9543C17.01 16.0461 16.9488 16.115 16.9182 16.1609C16.8111 16.3751 16.834 16.4669 16.987 16.4363C17.1248 16.3904 17.3161 16.2603 17.561 16.0461C17.6681 15.9237 17.7599 15.8013 17.8364 15.6789C17.9129 15.5412 17.9512 15.4341 17.9512 15.3576C17.9512 15.2351 17.9282 15.1816 17.8823 15.1969ZM16.7575 13.9116C16.681 13.9116 16.5126 14.0493 16.2525 14.3247C16.0841 14.493 15.954 14.646 15.8622 14.7837C15.7704 14.9062 15.7398 14.9827 15.7704 15.0133C15.801 15.0439 15.8316 15.0592 15.8622 15.0592C15.9387 15.0592 16.0305 15.0286 16.1377 14.9674C16.2448 14.8909 16.3519 14.8067 16.4591 14.7149C16.5509 14.6078 16.6351 14.5007 16.7116 14.3936C16.7728 14.2711 16.8034 14.164 16.8034 14.0722C16.8034 13.9651 16.7881 13.9116 16.7575 13.9116ZM16.0459 12.3967C15.9846 12.3967 15.8622 12.4426 15.6786 12.5344C15.4949 12.6262 15.3036 12.7334 15.1047 12.8558C14.9057 12.9782 14.7374 13.0929 14.5996 13.2C14.4466 13.3072 14.3701 13.3837 14.3701 13.4296C14.3701 13.5061 14.4313 13.5443 14.5537 13.5443C14.7527 13.5443 14.9975 13.4678 15.2883 13.3148C15.7015 13.1006 15.9923 12.894 16.1606 12.6951C16.3137 12.4962 16.2754 12.3967 16.0459 12.3967ZM15.4031 10.9507C15.3419 10.9507 15.2194 10.989 15.0358 11.0655C14.8368 11.1267 14.6379 11.2032 14.4389 11.295C14.2247 11.3715 14.041 11.448 13.888 11.5245C13.7349 11.601 13.6584 11.6546 13.6584 11.6852C13.6584 11.777 13.7655 11.8229 13.9798 11.8229C14.1022 11.8229 14.2323 11.8076 14.3701 11.777C14.5078 11.7464 14.6455 11.7082 14.7833 11.6623C14.8904 11.6163 14.9975 11.5551 15.1047 11.4786C15.2118 11.4021 15.3036 11.3256 15.3801 11.2491C15.4413 11.1726 15.4796 11.1038 15.4949 11.0425C15.5102 10.9813 15.4796 10.9507 15.4031 10.9507ZM8.90651 6.98001L5.00398 6.8882L5.0958 7.82924C5.11111 7.95166 5.12641 8.12762 5.14172 8.35714C5.15702 8.58666 5.17232 8.84679 5.18763 9.13752C5.20293 9.41294 5.21824 9.71132 5.23354 10.0327L5.27945 10.9507C5.29476 11.4098 5.30241 11.8 5.30241 12.1213V12.9935C5.2871 13.2536 5.26415 13.4984 5.23354 13.7279C5.18763 13.9575 5.14172 14.2023 5.0958 14.4624C5.01928 14.8144 4.96572 15.1204 4.93511 15.3805C4.9045 15.6253 4.89685 15.7477 4.91216 15.7477C4.92746 15.763 5.07285 15.8166 5.34832 15.9084C5.60849 15.9849 5.92987 16.0767 6.31248 16.1838C7.24602 16.4593 8.08775 16.7959 8.83764 17.1937C9.57224 17.5916 10.1385 18.0124 10.5364 18.4561C10.9343 18.8998 11.2174 19.3589 11.3858 19.8332C11.5388 20.3076 11.6077 20.8814 11.5924 21.5546C11.5771 21.7995 11.5694 21.9984 11.5694 22.1514C11.5694 22.2891 11.5847 22.3962 11.6153 22.4727C11.6306 22.5339 11.6612 22.5722 11.7072 22.5875C11.7531 22.6028 11.8219 22.6181 11.9138 22.6334C12.1433 22.6793 12.3193 22.7022 12.4417 22.7022C12.5948 22.7022 12.7096 22.664 12.7861 22.5875C12.8473 22.4957 12.9238 22.3427 13.0156 22.1284C13.1534 21.8224 13.3294 21.5317 13.5436 21.2563C13.7579 20.9655 14.0104 20.7131 14.3012 20.4988C14.5767 20.2693 14.8827 20.0857 15.2194 19.948C15.5408 19.8103 15.8699 19.7414 16.2065 19.7414C16.4208 19.7414 16.6427 19.7644 16.8723 19.8103C17.0865 19.8409 17.3314 19.8944 17.6069 19.9709C17.9742 20.078 18.2573 20.1622 18.4562 20.2234C18.6552 20.2693 18.8082 20.2923 18.9154 20.2923C19.0378 20.2923 19.122 20.254 19.1679 20.1775C19.1985 20.101 19.252 19.9862 19.3286 19.8332C19.4051 19.6496 19.474 19.4354 19.5352 19.1906C19.5811 18.9457 19.6193 18.7009 19.65 18.4561C19.6653 18.2113 19.6729 17.9894 19.6729 17.7905C19.6576 17.5916 19.627 17.4462 19.5811 17.3544C19.5046 17.232 19.451 17.1861 19.4204 17.2167C19.3745 17.2473 19.3056 17.3697 19.2138 17.5839C19.0914 17.8899 18.9536 18.1195 18.8006 18.2725C18.6322 18.4102 18.4715 18.4484 18.3185 18.3872C17.9053 18.2189 17.8976 17.8593 18.2955 17.3085C18.5098 17.0025 18.6322 16.7729 18.6628 16.6199C18.6781 16.4516 18.6169 16.2603 18.4792 16.0461C18.3721 15.939 18.3032 15.8855 18.2726 15.8855C18.1961 15.8855 17.9818 16.0614 17.6298 16.4134C17.385 16.6429 17.1937 16.7959 17.0559 16.8724C16.9182 16.9489 16.7957 16.9719 16.6886 16.9413C16.4438 16.8647 16.3366 16.7423 16.3672 16.574C16.3825 16.3904 16.5279 16.1226 16.8034 15.7707C16.9564 15.5871 17.0789 15.4417 17.1707 15.3346C17.2472 15.2275 17.3008 15.1433 17.3314 15.0821C17.362 15.0056 17.3696 14.9444 17.3543 14.8985C17.339 14.8526 17.3084 14.7914 17.2625 14.7149C17.2472 14.669 17.209 14.646 17.1477 14.646C17.0559 14.646 16.8264 14.8067 16.4591 15.128C16.0152 15.5106 15.7168 15.7018 15.5638 15.7018C15.4719 15.7018 15.3725 15.6483 15.2653 15.5412C15.1276 15.4035 15.074 15.2504 15.1047 15.0821C15.1353 14.9138 15.25 14.7684 15.449 14.646C15.7092 14.4777 15.9081 14.2711 16.0459 14.0263C16.1836 13.7815 16.2142 13.6055 16.1377 13.4984C16.1071 13.4678 16.0535 13.4525 15.977 13.4525C15.8392 13.4525 15.5485 13.552 15.1047 13.7509C14.6455 13.9651 14.3318 14.0722 14.1635 14.0722C13.9186 14.0722 13.7962 13.9192 13.7962 13.6132C13.7962 13.4755 13.8421 13.3684 13.9339 13.2919C14.0104 13.2 14.1558 13.0929 14.3701 12.9705C14.7067 12.8022 14.9899 12.6186 15.2194 12.4197C15.4337 12.2055 15.5179 12.0601 15.4719 11.9836C15.4413 11.953 15.3266 11.9453 15.1276 11.9606C14.9134 11.9759 14.6608 12.0142 14.3701 12.0754C14.1405 12.1213 13.9568 12.1596 13.8191 12.1902C13.6814 12.2208 13.5666 12.2361 13.4748 12.2361C13.3523 12.2361 13.2299 12.1749 13.1075 12.0524C12.6943 11.624 13.0769 11.2874 14.2553 11.0425C14.5461 10.966 14.7833 10.8436 14.9669 10.6753C15.1506 10.507 15.2118 10.3463 15.1506 10.1933C15.12 10.1015 15.0281 10.0403 14.8751 10.0097C14.7067 9.9791 14.3624 9.96379 13.8421 9.96379C13.3523 9.96379 13.0233 9.94849 12.855 9.91789C12.6866 9.88729 12.5871 9.82608 12.5565 9.73427C12.4647 9.52005 12.503 9.35174 12.6713 9.22933C12.8243 9.09161 13.0998 9.00745 13.4977 8.97685C13.8191 8.96155 14.0257 8.9386 14.1175 8.90799C14.1941 8.86209 14.2323 8.77028 14.2323 8.63257C14.2323 8.51016 14.2017 8.3801 14.1405 8.24238C14.0793 8.08937 14.0028 7.944 13.9109 7.80629C13.8191 7.66858 13.7196 7.54617 13.6125 7.43906C13.4901 7.33195 13.3753 7.25544 13.2682 7.20954C13.2069 7.19423 13.0539 7.17893 12.809 7.16363C12.5489 7.13303 12.2198 7.11008 11.8219 7.09477C11.424 7.06417 10.9802 7.04122 10.4905 7.02592C9.98545 7.01062 9.45746 6.99532 8.90651 6.98001ZM24.9758 19.3053C24.4401 19.3053 23.958 19.29 23.5295 19.2594C23.0857 19.2135 22.6725 19.1523 22.2899 19.0758C21.9073 18.984 21.54 18.8692 21.188 18.7315C20.836 18.5785 20.4687 18.4025 20.0861 18.2036C20.0555 18.2036 20.0249 18.2648 19.9943 18.3872C19.9637 18.5096 19.9331 18.6627 19.9025 18.8463C19.78 19.8409 19.5658 20.4223 19.2597 20.5906C19.2138 20.6212 19.1296 20.6365 19.0072 20.6365C18.8848 20.6365 18.747 20.6212 18.594 20.5906C18.4256 20.56 18.2267 20.5141 17.9971 20.4529C17.7369 20.3764 17.4309 20.3076 17.0789 20.2464C16.7116 20.1852 16.4208 20.1469 16.2065 20.1316C16.0229 20.1316 15.8699 20.1393 15.7474 20.1546C15.625 20.1546 15.5102 20.1699 15.4031 20.2005C15.296 20.2311 15.1965 20.277 15.1047 20.3382C14.9975 20.3841 14.8827 20.4529 14.7603 20.5447C14.6226 20.6365 14.4542 20.7896 14.2553 21.0038C14.0563 21.2027 13.8727 21.4169 13.7043 21.6464C13.536 21.8607 13.3906 22.0672 13.2682 22.2662C13.1457 22.4498 13.0845 22.5875 13.0845 22.6793C13.0845 22.7711 13.3906 22.8782 14.0028 23.0006C14.5996 23.123 15.4719 23.2531 16.6198 23.3908C17.7523 23.5285 18.8541 23.5974 19.9254 23.5974C21.2722 23.5974 22.5501 23.4979 23.7591 23.299C24.9681 23.1001 26.0777 22.8094 27.0877 22.4268C27.2867 22.3503 27.4397 22.2891 27.5468 22.2432C27.654 22.1973 27.7305 22.1514 27.7764 22.1055C27.8223 22.0443 27.8529 21.9754 27.8682 21.8989V21.5317C27.8682 21.1338 27.7764 20.736 27.5928 20.3382C27.3938 19.9403 27.1642 19.6726 26.9041 19.5348C26.7357 19.4583 26.5062 19.4048 26.2154 19.3742C25.9246 19.3283 25.5114 19.3053 24.9758 19.3053ZM5.0958 16.2297L4.65964 16.115L4.3153 17.3085C4.22347 17.6604 4.14695 18.043 4.08574 18.4561C4.00922 18.8539 3.95565 19.2365 3.92504 19.6037C3.89444 19.9556 3.88678 20.2693 3.90209 20.5447C3.91739 20.8202 3.95565 21.0114 4.01687 21.1185C4.07809 21.2257 4.16991 21.3251 4.29234 21.4169C4.41477 21.4934 4.62138 21.5699 4.91216 21.6464C5.18763 21.7076 5.57023 21.7765 6.05996 21.853C6.54969 21.9142 7.18481 21.9907 7.96531 22.0825C8.33261 22.1284 8.69226 22.1743 9.04425 22.2202C9.38094 22.2508 9.68702 22.2891 9.96249 22.335C10.238 22.3656 10.4675 22.3886 10.6512 22.4039C10.8195 22.4192 10.9266 22.4268 10.9726 22.4268C11.095 22.4421 11.1715 22.3886 11.2021 22.2662C11.2174 22.1284 11.2098 21.7689 11.1792 21.1874C11.1639 20.7131 11.1103 20.2999 11.0185 19.948C10.9113 19.5807 10.7583 19.2518 10.5593 18.961C10.3451 18.6703 10.0696 18.4025 9.73293 18.1577C9.39624 17.9129 8.98303 17.6681 8.4933 17.4232C8.29435 17.3314 8.04949 17.2243 7.75871 17.1019C7.45263 16.9795 7.13889 16.8647 6.81751 16.7576C6.49612 16.6352 6.18239 16.5281 5.87631 16.4363C5.57023 16.3445 5.31006 16.2756 5.0958 16.2297ZM3.39705 21.8989C3.38175 21.8989 3.3741 21.9066 3.3741 21.9219H3.35114C3.32053 21.9525 3.29758 22.1514 3.28227 22.5186C3.25167 22.8859 3.22106 23.3143 3.19045 23.8039L3.12158 25.5942L3.67253 25.7549L4.3153 25.8926C4.51425 25.9232 4.72085 25.9538 4.93511 25.9844C5.04224 25.9997 5.13406 26.015 5.21058 26.0303H5.37128C5.4631 26.0303 5.52432 26.0227 5.55493 26.0074C5.57023 25.9767 5.57788 25.9232 5.57788 25.8467C5.57788 25.6937 5.6544 25.6172 5.80744 25.6172C5.94518 25.6172 6.01405 25.686 6.01405 25.8237C6.01405 25.9614 6.17474 26.0533 6.49612 26.0992L6.86342 26.1451C6.86342 26.1451 6.95525 26.1527 7.13889 26.168C7.18481 26.1833 7.23837 26.168 7.29959 26.1221C7.3608 26.0762 7.41437 26.015 7.46028 25.9385C7.5368 25.8161 7.59036 25.7549 7.62097 25.7549C7.63628 25.7549 7.68219 25.8161 7.75871 25.9385C7.81992 26.0303 7.9347 26.0992 8.10305 26.1451C8.27139 26.191 8.43974 26.2139 8.60808 26.2139C8.76112 26.2139 8.89886 26.1986 9.02129 26.168C9.12842 26.1221 9.18198 26.0609 9.18198 25.9844C9.18198 25.8467 9.23555 25.7778 9.34268 25.7778C9.4345 25.7778 9.51102 25.8467 9.57224 25.9844C9.60285 26.0609 9.69467 26.1145 9.84771 26.1451C9.98545 26.1757 10.2303 26.191 10.5823 26.191H11.5005V25.5254C11.5005 25.1581 11.5235 24.9056 11.5694 24.7679C11.6153 24.6149 11.776 24.5384 12.0515 24.5384C12.2198 24.5384 12.4417 24.5614 12.7172 24.6073C12.9927 24.6379 13.3447 24.6914 13.7732 24.7679C14.2629 24.8444 14.6455 24.9133 14.921 24.9745C15.1965 25.0204 15.4031 25.0663 15.5408 25.1122C15.6632 25.1581 15.7398 25.2117 15.7704 25.2729C15.801 25.3188 15.8239 25.3876 15.8392 25.4795C15.8545 25.556 15.8775 25.6248 15.9081 25.686C15.9234 25.7319 15.9693 25.7702 16.0459 25.8008C16.1071 25.8314 16.1989 25.862 16.3213 25.8926C16.4438 25.9232 16.6044 25.9538 16.8034 25.9844C16.987 26.015 17.1401 26.038 17.2625 26.0533C17.3697 26.0686 17.4615 26.0762 17.538 26.0762C17.691 26.0762 17.7905 26.015 17.8364 25.8926C17.9129 25.709 17.9971 25.6172 18.0889 25.6172C18.2114 25.6172 18.2955 25.7166 18.3415 25.9155C18.3721 26.038 18.4486 26.1145 18.571 26.1451C18.6781 26.1757 18.9307 26.191 19.3286 26.191C19.6959 26.191 19.9484 26.1757 20.0861 26.1451C20.2086 26.1145 20.2698 26.0609 20.2698 25.9844C20.2698 25.8467 20.3386 25.7778 20.4764 25.7778C20.6141 25.7778 20.683 25.8467 20.683 25.9844C20.683 26.0609 20.7442 26.1145 20.8666 26.1451C20.9738 26.1757 21.1804 26.191 21.4864 26.191C21.7925 26.191 21.9991 26.1757 22.1063 26.1451C22.2134 26.1145 22.2669 26.0609 22.2669 25.9844C22.2669 25.7855 22.3435 25.686 22.4965 25.686C22.5883 25.686 22.6802 25.7396 22.772 25.8467C22.8638 25.9691 23.0551 26.0303 23.3459 26.0303C23.5601 26.0303 23.782 25.9921 24.0116 25.9155C24.2412 25.8237 24.3713 25.7166 24.4019 25.5942C24.4478 25.4259 24.5166 25.3417 24.6085 25.3417C24.685 25.3264 24.7615 25.3953 24.838 25.5483C24.8839 25.6401 25.0064 25.686 25.2053 25.686C25.3125 25.686 25.4349 25.6707 25.5726 25.6401C25.6951 25.6095 25.8098 25.5713 25.917 25.5254C26.0241 25.4642 26.1159 25.4029 26.1924 25.3417C26.269 25.2805 26.3072 25.2117 26.3072 25.1352C26.3072 24.9363 26.3684 24.898 26.4909 25.0204C26.598 25.1275 26.7204 25.1811 26.8582 25.1811C27.0724 25.1811 27.2561 25.0893 27.4091 24.9056C27.5775 24.7067 27.7458 24.6379 27.9141 24.6991C28.0672 24.7603 28.2738 24.6991 28.534 24.5155C28.6258 24.4543 28.6946 24.4007 28.7406 24.3548C28.7865 24.3089 28.8247 24.2553 28.8553 24.1941C28.8706 24.1176 28.8783 24.0182 28.8783 23.8958C28.863 23.7733 28.8477 23.6127 28.8324 23.4138C28.8018 23.1842 28.7712 22.9777 28.7406 22.7941C28.71 22.5951 28.687 22.4804 28.6717 22.4498C28.6411 22.4192 28.5722 22.4268 28.4651 22.4727C28.3427 22.5033 28.2049 22.5722 28.0519 22.6793C27.8988 22.7864 27.6846 22.9012 27.4091 23.0236C27.1336 23.1307 26.8276 23.2454 26.4909 23.3679C26.1389 23.475 25.7639 23.5821 25.366 23.6892C24.9681 23.7963 24.5626 23.8881 24.1493 23.9646C23.5678 24.0717 22.9709 24.1559 22.3588 24.2171C21.7466 24.263 21.1038 24.2859 20.4305 24.2859C19.4357 24.2859 18.395 24.2324 17.3084 24.1253C16.2065 24.0029 15.0128 23.8269 13.7273 23.5974C13.4059 23.5362 13.0233 23.475 12.5795 23.4138C12.1357 23.3373 11.6612 23.2684 11.1562 23.2072C10.6512 23.1307 10.1385 23.0618 9.61815 23.0006C9.09781 22.9241 8.61574 22.8629 8.17192 22.817C7.37611 22.7252 6.71038 22.6487 6.17474 22.5875C5.62379 22.511 5.17998 22.4421 4.84329 22.3809C4.49129 22.3044 4.22347 22.2355 4.03982 22.1743C3.85618 22.1131 3.71844 22.0519 3.62662 21.9907C3.5654 21.9295 3.48888 21.8989 3.39705 21.8989ZM4.5219 4.38642C4.64433 4.41702 4.76677 4.47823 4.8892 4.57004C4.96572 4.64654 5.04224 4.77661 5.11876 4.96022C5.19528 5.12854 5.24884 5.29686 5.27945 5.46517C5.32536 5.63349 5.35597 5.77885 5.37128 5.90126C5.37128 6.02367 5.35597 6.08488 5.32536 6.08488C5.27945 6.08488 5.19528 6.02367 5.07285 5.90126C4.93511 5.77885 4.80503 5.64114 4.68259 5.48812C4.54486 5.31981 4.43008 5.16679 4.33825 5.02908C4.23113 4.87607 4.17756 4.76896 4.17756 4.70775C4.17756 4.58534 4.21582 4.50118 4.29234 4.45528C4.35356 4.39407 4.43008 4.37112 4.5219 4.38642Z" fill="black"/>
</svg>
`, _e = {
  dice: "#efe7d8",
  number: "#161310",
  background: "#10100f",
  fontFamily: 'Outfit, "Segoe UI", system-ui, sans-serif',
  pip: !1,
  emissive: null,
  emissiveIntensity: 0
};
_e.dice;
_e.number;
const Vr = 1.12, Hr = 0.86, jf = 0.07, Qf = new L(0, 0, 1), Ua = new L(0, 1, 0);
function td(i) {
  return new ze().setFromUnitVectors(Qf, i.clone().normalize());
}
function Ia(i) {
  return Ua.clone().applyQuaternion(td(i));
}
const ed = {
  one: { kind: "one", damage: 1, effects: 0 },
  two: { kind: "two", damage: 2, effects: 0 },
  effect: { kind: "effect", damage: 1, effects: 1 },
  blank: { kind: "blank", damage: 0, effects: 0 }
}, ci = [
  { kind: "one", normal: new L(0, 1, 0) },
  { kind: "two", normal: new L(0, -1, 0) },
  { kind: "effect", normal: new L(1, 0, 0) },
  { kind: "effect", normal: new L(-1, 0, 0) },
  { kind: "blank", normal: new L(0, 0, 1) },
  { kind: "blank", normal: new L(0, 0, -1) }
].map((i) => ({
  ...i,
  up: Ia(i.normal),
  position: i.normal.clone().multiplyScalar(0.51)
}));
let Fi = null, Oi = null;
function Na(i = Hr) {
  if (Fi) return Fi;
  const t = new Wi(i, 0), e = t.getAttribute("position"), n = t.getIndex(), r = [], s = new L(), a = new L(), o = new L(), l = (u, c, f) => {
    s.fromBufferAttribute(e, u), a.fromBufferAttribute(e, c), o.fromBufferAttribute(e, f);
    const h = s.clone(), p = a.clone(), g = o.clone(), x = new L().addVectors(h, p).add(g).divideScalar(3), m = new L().subVectors(p, h).cross(new L().subVectors(g, h)).normalize();
    if (x.dot(m) < 0) {
      m.negate(), r.push({ verts: [h, g, p], centroid: x, normal: m });
      return;
    }
    r.push({ verts: [h, p, g], centroid: x, normal: m });
  };
  if (n)
    for (let u = 0; u < n.count; u += 3)
      l(n.getX(u), n.getX(u + 1), n.getX(u + 2));
  else
    for (let u = 0; u < e.count; u += 3)
      l(u, u + 1, u + 2);
  return t.dispose(), Fi = r, Fi;
}
function kr() {
  if (Oi) return Oi;
  const i = Na(), t = /* @__PURE__ */ new Set(), e = new Array(i.length);
  let n = 1;
  for (let r = 0; r < i.length; r += 1) {
    if (t.has(r)) continue;
    let s = -1, a = 2;
    for (let o = 0; o < i.length; o += 1) {
      if (o === r || t.has(o)) continue;
      const l = i[r].normal.dot(i[o].normal);
      l < a && (a = l, s = o);
    }
    e[r] = n, e[s] = 21 - n, t.add(r), t.add(s), n += 1;
  }
  return Oi = i.map((r, s) => ({
    value: e[s],
    normal: r.normal,
    position: r.centroid.clone().add(r.normal.clone().multiplyScalar(0.012)),
    up: Ia(r.normal)
  })), Oi;
}
function na(i) {
  return i === "d6" ? Vr / 2 : kr()[0].position.length() - 0.012;
}
function ia(i) {
  return i === "d20" ? "d20" : i === "d20hit" ? "d20hit" : "d6";
}
function nd(i, t) {
  const e = new ze().setFromUnitVectors(i.clone().normalize(), Ua), n = t.clone().normalize().applyQuaternion(e), r = new L(n.x, 0, n.z);
  return r.lengthSq() < 1e-8 ? e : (r.normalize(), new ze().setFromUnitVectors(r, new L(0, 0, -1)).multiply(e));
}
function id(i, t) {
  if (i === "d6")
    return ci.find((n) => n.kind === t) ?? ci[0];
  const e = kr();
  return e.find((n) => n.value === t) ?? e[0];
}
function rd(i) {
  return i < 720 ? "mobile" : i < 1100 ? "tablet" : "desktop";
}
function sd(i, t) {
  return t === "mobile" ? Math.min(2, i) : t === "tablet" ? Math.min(3, i) : i <= 4 ? i : i <= 6 ? 3 : i <= 8 ? 4 : 5;
}
function ad(i, t) {
  return t === "mobile" ? i === "d6" ? 1.62 : 1.92 : t === "tablet" ? i === "d6" ? 1.78 : 2.12 : i === "d6" ? 2.05 : 2.4;
}
function od(i, t, e, n) {
  const r = Math.ceil(i / n), s = [];
  let a = 0;
  for (let o = 0; o < r; o += 1) {
    const l = Math.min(n, i - a), u = (l - 1) * t;
    for (let c = 0; c < l; c += 1) {
      const f = l === 1 ? 0 : -u / 2 + c * t, h = r === 1 ? 0 : (o - (r - 1) / 2) * t;
      s.push([f, e, h]), a += 1;
    }
  }
  return s;
}
function ld(i, t) {
  let e = 0, n = 0, r = 0, s = 0;
  for (const [a, , o] of i)
    e = Math.min(e, a), n = Math.max(n, a), r = Math.min(r, o), s = Math.max(s, o);
  return {
    halfW: (n - e) / 2 + t,
    halfD: (s - r) / 2 + t
  };
}
function cd(i, t, e) {
  const n = Math.min(Math.max(i / t, 0), 1), r = 7.5625, s = 2.75;
  let a;
  if (n < 1 / s)
    a = r * n * n;
  else if (n < 2 / s) {
    const o = n - 1.5 / s;
    a = r * o * o + 0.75;
  } else if (n < 2.5 / s) {
    const o = n - 2.25 / s;
    a = r * o * o + 0.9375;
  } else {
    const o = n - 2.625 / s;
    a = r * o * o + 0.984375;
  }
  return e * (1 - a);
}
const Gi = /* @__PURE__ */ new Map();
function ud(i) {
  const t = Gi.get(i);
  if (t) return t;
  const e = 512, n = document.createElement("canvas");
  n.width = e, n.height = e;
  const r = n.getContext("2d");
  r.clearRect(0, 0, e, e), r.textAlign = "center", r.textBaseline = "middle";
  const s = i >= 10, a = s ? e * 0.56 : e * 0.74;
  r.font = `700 ${a}px ${_e.fontFamily}`, r.lineJoin = "round", r.lineCap = "round", r.miterLimit = 2, r.lineWidth = s ? e * 0.06 : e * 0.07, r.strokeStyle = _e.number, r.fillStyle = _e.number;
  const o = e / 2 + a * 0.03;
  r.strokeText(String(i), e / 2, o), r.fillText(String(i), e / 2, o);
  const l = new Ea(n);
  return l.colorSpace = ge, l.anisotropy = 8, l.needsUpdate = !0, Gi.set(i, l), l;
}
const hd = {
  one: kf,
  two: Wf,
  effect: Xf,
  "hit-head": qf,
  "hit-body": Yf,
  "hit-left-arm": Zf,
  "hit-right-arm": $f,
  "hit-left-leg": Kf,
  "hit-right-leg": Jf
}, vn = {};
function fd(i) {
  return i.replace(/\s(width|height)=("[^"]*"|'[^']*')/g, "").replace(/<svg\b/, '<svg width="512" height="512"');
}
function dd(i) {
  const t = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fd(i))}`, e = new Image();
  return e.decoding = "async", new Promise((n, r) => {
    e.onload = () => n(e), e.onerror = () => r(new Error("Не удалось декодировать иконку")), e.src = t;
  });
}
function ra(i) {
  return vn[i] ?? null;
}
function pd(i) {
  Object.assign(_e, i || {}), Gi.forEach((t) => {
    t && t.dispose && t.dispose();
  }), Gi.clear(), Object.keys(vn).forEach((t) => {
    const e = vn[t];
    e && e.dispose && e.dispose(), delete vn[t];
  });
}
async function md() {
  for (const [e, n] of Object.entries(hd)) {
    if (vn[e]) continue;
    const r = await dd(n), s = document.createElement("canvas");
    s.width = 512, s.height = 512;
    const a = s.getContext("2d");
    a.clearRect(0, 0, 512, 512), a.drawImage(r, 40.96, 40.96, 512 - 40.96 * 2, 512 - 40.96 * 2), a.globalCompositeOperation = "source-in", a.fillStyle = _e.number, a.fillRect(0, 0, 512, 512);
    const o = new Ea(s);
    o.colorSpace = ge, o.anisotropy = 8, o.needsUpdate = !0, vn[e] = o;
  }
  return vn;
}
function Tr(i) {
  return i === "d6" ? "one" : 1;
}
function gd(i) {
  return i === "d6" ? ci[Math.floor(Math.random() * ci.length)].kind : 1 + Math.floor(Math.random() * 20);
}
function sa(i, t, e, n) {
  const r = Math.abs(i) % 100, s = r % 10;
  return r > 10 && r < 20 ? n : s === 1 ? t : s >= 2 && s <= 4 ? e : n;
}
function _d(i) {
  let t = 0, e = 0, n = 0;
  for (const r of i) {
    if (r == null) {
      n += 1;
      continue;
    }
    const s = ed[r];
    s && (t += s.damage, e += s.effects);
  }
  return { damage: t, effects: e, pending: n, complete: n === 0 };
}
function vd(i) {
  const { damage: t, effects: e, complete: n } = _d(i);
  if (n && t === 0) return "Нет урона";
  if (t === 0 && e === 0) return "";
  const r = `${t} ${sa(t, "единица", "единицы", "единиц")} урона`;
  return e ? `${r} + ${e} ${sa(e, "эффект", "эффекта", "эффектов")}` : r;
}
const xd = {
  head: "Голова",
  body: "Тело",
  "left-arm": "Левая рука",
  "right-arm": "Правая рука",
  "left-leg": "Левая нога",
  "right-leg": "Правая нога"
};
function Fa(i) {
  return i <= 2 ? "head" : i <= 8 ? "body" : i <= 11 ? "left-arm" : i <= 14 ? "right-arm" : i <= 17 ? "left-leg" : "right-leg";
}
function Md(i) {
  const t = i[0];
  return t == null ? "" : `Попадание: ${xd[Fa(t)]}`;
}
function Sd(i, t, e, n, r, s) {
  i.updateMatrixWorld(!0);
  const a = new ne().multiplyMatrices(
    i.projectionMatrix,
    i.matrixWorldInverse
  ), o = [
    [t, n, e],
    [-t, n, e],
    [t, n, -e],
    [-t, n, -e],
    [t, 0, e],
    [-t, 0, e],
    [t, 0, -e],
    [-t, 0, -e]
  ], l = new L(), u = (f) => {
    let h = 1e-4, p = 1e-4;
    for (const [g, x, m] of o)
      l.set(g * f, x * f + r, m * f).applyMatrix4(a), h = Math.max(h, Math.abs(l.x)), p = Math.max(p, Math.abs(l.y));
    return { maxX: h, maxY: p };
  };
  let c = 1;
  for (let f = 0; f < 6; f += 1) {
    const { maxX: h, maxY: p } = u(c);
    c *= Math.min(s / h, s / p);
  }
  return c;
}
const Wr = new Bf({
  color: _e.dice,
  roughness: 0.3,
  metalness: 0.05,
  clearcoat: 0.72,
  clearcoatRoughness: 0.22,
  envMapIntensity: 0.9
}), Xr = Wr.clone();
Xr.flatShading = !1;
function Cd() {
  [Wr, Xr].forEach((i) => {
    i.color.set(_e.dice), _e.emissive ? (i.emissive.set(_e.emissive), i.emissiveIntensity = _e.emissiveIntensity || 0.2) : (i.emissive.set(0), i.emissiveIntensity = 0), _e.pip ? (i.roughness = 0.44, i.metalness = 0.06, i.clearcoat = 0.28, i.clearcoatRoughness = 0.35, i.envMapIntensity = 0.45) : (i.roughness = 0.3, i.metalness = 0.05, i.clearcoat = 0.72, i.clearcoatRoughness = 0.22, i.envMapIntensity = 0.9), i.needsUpdate = !0;
  });
}
const yd = new Vf(1, 1, 1, 4, 0.13), Ed = bd(Hr, jf), Td = new Wn(1, 1), Ad = new L(0, 0, 1);
function bd(i, t) {
  const e = Na(i), n = t, r = [];
  for (const a of e) {
    const o = a.normal, l = a.verts[1].clone().sub(a.verts[0]);
    if (l.lengthSq() < 1e-12) continue;
    l.normalize();
    const u = new L().crossVectors(o, l).normalize(), c = a.centroid, f = (C) => {
      const v = C.clone().sub(c);
      return new ct(v.dot(l), v.dot(u));
    }, h = f(a.verts[0]), p = f(a.verts[1]), g = f(a.verts[2]), x = new Ra();
    x.moveTo(h.x, h.y), x.lineTo(p.x, p.y), x.lineTo(g.x, g.y), x.closePath();
    const m = new zr(x, {
      depth: 0.03,
      bevelEnabled: !0,
      bevelThickness: n,
      bevelSize: n,
      bevelOffset: -n * 0.72,
      bevelSegments: 4,
      curveSegments: 1
    }), d = new ne().makeBasis(l, u, o.clone().negate()), T = c.clone().addScaledVector(o, n * 0.15);
    d.setPosition(T), m.applyMatrix4(d), r.push(m.index ? m.toNonIndexed() : m);
  }
  const s = Hf(r, !1);
  for (const a of r) a.dispose();
  return s ? (s.computeVertexNormals(), s) : (console.error("DiceRoller: не удалось собрать геометрию D20"), new Wi(i, 0));
}
function Ar(i, t, e, n, r) {
  if (!n) return;
  const s = new ze().setFromUnitVectors(Ad, e.clone().normalize()), a = new Ee(
    Td,
    new Ur({
      map: n,
      transparent: !0,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
      toneMapped: !1
    })
  );
  a.position.copy(t), a.quaternion.copy(s), a.scale.set(r, r, 1), a.renderOrder = 2, i.add(a);
}
function wd(i) {
  const t = new an();
  if (i === "d6") {
    const e = new an();
    e.scale.setScalar(Vr);
    const n = new Ee(yd, Wr);
    n.castShadow = !0, e.add(n);
    for (const r of ci)
      r.kind !== "blank" && Ar(e, r.position, r.normal, ra(r.kind), 0.78);
    t.add(e);
  } else {
    const e = new Ee(Ed, Xr);
    e.castShadow = !0, t.add(e);
    for (const n of kr())
      i === "d20hit" ? Ar(
        t,
        n.position,
        n.normal,
        ra(`hit-${Fa(n.value)}`),
        0.48
      ) : Ar(t, n.position, n.normal, ud(n.value), 0.45);
  }
  return t;
}
const Rd = `
  <div class="dice-roller__stage"></div>
  <div class="dice-roller__hud">
    <div class="dice-roller__results" aria-live="polite"></div>
    <div class="dice-roller__panel">
      <div class="dice-roller__group">
        <span class="dice-roller__label">Кубики</span>
        <div class="dice-roller__stepper">
          <button type="button" class="dice-roller__icon" data-action="dec" aria-label="Меньше кубиков">−</button>
          <span class="dice-roller__count">2</span>
          <button type="button" class="dice-roller__icon" data-action="inc" aria-label="Больше кубиков">+</button>
        </div>
      </div>
      <div class="dice-roller__group">
        <span class="dice-roller__label">Тип</span>
        <div class="dice-roller__segment" role="group" aria-label="Тип кубика">
          <button type="button" class="dice-roller__seg is-active" data-type="d6">D6</button>
          <button type="button" class="dice-roller__seg" data-type="d20">D20</button>
          <button type="button" class="dice-roller__seg" data-type="d20hit">D20 hit</button>
        </div>
      </div>
      <button type="button" class="dice-roller__roll" data-action="roll">Бросить</button>
    </div>
  </div>
`;
function Ld(i) {
  if (typeof i == "string") {
    const t = document.querySelector(i);
    if (!t) throw new Error(`DiceRoller: элемент «${i}» не найден`);
    return t;
  }
  if (!i) throw new Error("DiceRoller: не передан контейнер");
  return i;
}
function aa(i, t, e, n, r, s) {
  const a = new L(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(), o = id(t, e);
  return {
    mesh: i,
    type: t,
    target: e,
    animate: n,
    settleAt: r,
    position: s,
    targetQuat: nd(o.normal, o.up),
    settling: !1,
    settled: !1,
    fromQuat: new ze(),
    startedAt: null,
    axis: a,
    spinSpeed: 22 + Math.random() * 16
  };
}
function Pd(i, t = {}) {
  const e = Ld(i);
  t.theme && pd(t.theme), Cd(), e.classList.add("dice-roller"), e.innerHTML = Rd;
  const n = e.querySelector(".dice-roller__stage"), r = e.querySelector(".dice-roller__results"), s = e.querySelector(".dice-roller__count"), a = e.querySelector('[data-action="roll"]'), o = e.querySelector('[data-action="dec"]'), l = e.querySelector('[data-action="inc"]'), u = [...e.querySelectorAll("[data-type]")], c = {
    count: Math.min(10, Math.max(1, t.count ?? 2)),
    savedCount: Math.min(10, Math.max(1, t.count ?? 2)),
    type: ia(t.type),
    targets: [],
    results: [],
    rolling: !1,
    dice: []
  };
  c.type === "d20hit" && (c.count = 1), c.targets = Array.from({ length: c.count }, () => Tr(c.type)), c.results = Array.from({ length: c.count }, () => null);
  const f = new kt(_e.background || 1052687), h = new ef({ antialias: !0, alpha: !1 });
  h.setPixelRatio(Math.min(window.devicePixelRatio, 2)), h.outputColorSpace = ge, h.toneMapping = 4, h.shadowMap.enabled = !0, h.shadowMap.type = 2, h.setClearColor(f, 1), n.appendChild(h.domElement);
  const p = new nf();
  p.background = f.clone();
  const g = new we(34, 1, 0.1, 80);
  if (g.position.set(0, 7.2, 9.6), g.lookAt(0, 0, 0), _e.pip) {
    p.add(new Js(12189625, 136194, 0.62)), p.add(new ta(1375764, 0.22));
    const X = new Qn(15990771, 1.12);
    X.position.set(5.5, 10, 4), X.castShadow = !0, X.shadow.mapSize.set(1024, 1024), X.shadow.camera.near = 1, X.shadow.camera.far = 28, X.shadow.camera.left = -10, X.shadow.camera.right = 10, X.shadow.camera.top = 10, X.shadow.camera.bottom = -10, p.add(X);
    const lt = new Qn(1375764, 0.48);
    lt.position.set(-5, 4, -3), p.add(lt);
    const N = new Qn(8191868, 0.22);
    N.position.set(0, 3, -6), p.add(N);
  } else {
    p.add(new Js(16052198, 1512980, 0.42)), p.add(new ta(16777215, 0.28));
    const X = new Qn(16777215, 1.55);
    X.position.set(5.5, 10, 4), X.castShadow = !0, X.shadow.mapSize.set(1024, 1024), X.shadow.camera.near = 1, X.shadow.camera.far = 28, X.shadow.camera.left = -10, X.shadow.camera.right = 10, X.shadow.camera.top = 10, X.shadow.camera.bottom = -10, p.add(X);
    const lt = new Qn(14142392, 0.28);
    lt.position.set(-5, 4, -3), p.add(lt);
  }
  const x = new an();
  p.add(x);
  const m = new Ee(
    new Wn(40, 40),
    new Ff({ opacity: 0.32 })
  );
  m.rotation.x = -Math.PI / 2, m.position.y = -0.02, m.receiveShadow = !0, x.add(m);
  const d = new an();
  x.add(d);
  let T = 0, C = performance.now(), v = !1;
  function F(X) {
    c.rolling = X;
    const lt = c.type === "d20hit";
    a.disabled = X, o.disabled = X || lt || c.count <= 1, l.disabled = X || lt || c.count >= 10, u.forEach((N) => {
      N.disabled = X;
    }), a.textContent = X ? "Бросок…" : "Бросить";
  }
  function b() {
    if (c.type === "d6") {
      const X = vd(c.results), lt = X || "·", N = X ? " is-in" : "";
      r.innerHTML = `<div class="dice-roller__summary${N}">${lt}</div>`;
      return;
    }
    if (c.type === "d20hit") {
      const X = Md(c.results), lt = X || "·", N = X ? " is-in" : "";
      r.innerHTML = `<div class="dice-roller__summary${N}">${lt}</div>`;
      return;
    }
    r.innerHTML = c.results.map((X) => {
      const lt = X == null ? "·" : String(X);
      return `<div class="dice-roller__result${X == null ? "" : " is-in"}">${lt}</div>`;
    }).join("");
  }
  function w() {
    s.textContent = String(c.count), e.dataset.type = c.type, u.forEach((X) => {
      X.classList.toggle("is-active", X.dataset.type === c.type);
    }), b();
  }
  function P() {
    const X = n.clientWidth || 0, lt = n.clientHeight || 0;
    if (X < 2 || lt < 2) return;
    h.setSize(X, lt, !1), g.aspect = X / lt;
    const N = rd(X), J = sd(c.count, N), pt = ad(c.type, N), et = na(c.type), Tt = od(c.count, pt, et, J), Dt = c.type === "d6" ? Vr * 0.52 : Hr, { halfW: Ut, halfD: Ht } = ld(Tt, Dt), $ = N === "desktop" ? 10.6 : N === "tablet" ? 9.4 : 8.8, it = N === "desktop" ? 32 : N === "tablet" ? 36 : 40, A = 0.08;
    g.fov = it, g.position.set(
      0,
      $ * (N === "desktop" ? 0.84 : N === "tablet" ? 1.05 : 1.18),
      $ * (N === "desktop" ? 0.5 : N === "tablet" ? 0.38 : 0.32)
    ), g.lookAt(0, A + et * 0.3, 0), g.updateProjectionMatrix();
    const Et = N === "desktop" ? 0.64 : N === "tablet" ? 0.82 : 0.84, tt = N === "desktop" ? 0.58 : N === "tablet" ? 0.86 : 1, xt = Sd(g, Ut, Ht, et, A, Et), at = Math.min(xt, tt);
    e.dataset.mode = N, x.position.set(0, A, 0), x.scale.setScalar(at), c.dice.forEach((Lt, vt) => {
      Lt.position = Tt[vt] ?? Lt.position, (!Lt.animate || Lt.settled) && Lt.mesh.position.set(Lt.position[0], Lt.position[1], Lt.position[2]);
    });
  }
  function y(X) {
    var N;
    if (c.dice.length === c.count && ((N = c.dice[0]) == null ? void 0 : N.type) === c.type)
      c.dice.forEach((J, pt) => {
        const et = aa(
          J.mesh,
          c.type,
          c.targets[pt],
          X,
          0.88 + pt * 0.35,
          J.position
        );
        Object.assign(J, et);
      });
    else {
      for (; d.children.length; )
        d.remove(d.children[0]);
      c.dice = c.targets.map((J, pt) => {
        const et = wd(c.type);
        return d.add(et), aa(
          et,
          c.type,
          J,
          X,
          0.88 + pt * 0.35,
          [0, na(c.type), 0]
        );
      });
    }
    X || c.dice.forEach((J) => {
      J.mesh.quaternion.copy(J.targetQuat);
    }), P();
  }
  function M() {
    F(!1);
    const X = { type: c.type, values: c.results.slice() };
    if (c._settleResolve) {
      const lt = c._settleResolve;
      c._settleResolve = null, lt(X);
    }
    typeof t.onSettled == "function" && t.onSettled(X);
  }
  function R(X) {
    c.results[X] == null && (c.results[X] = c.targets[X], b(), c.results.every((lt) => lt != null) && M());
  }
  function q(X) {
    for (let lt = 0; lt < c.dice.length; lt += 1) {
      const N = c.dice[lt], J = N.mesh, [pt, et, Tt] = N.position;
      if (!N.animate || N.settled) {
        J.quaternion.copy(N.targetQuat), J.position.set(pt, et, Tt);
        continue;
      }
      N.startedAt == null && (N.startedAt = performance.now());
      const Dt = (performance.now() - N.startedAt) / 1e3, Ut = Math.min(0.85, N.settleAt * 0.55), Ht = cd(Dt, Ut, 1.9), $ = N.settleAt - 0.42, it = Dt >= $ ? 0 : 1 - Dt / Math.max(N.settleAt, 1e-3), A = Math.sin(Dt * 14) * 0.07 * it;
      if (J.position.set(pt + A, et + Ht, Tt - A * 0.35), Dt >= $) {
        N.settling || (N.settling = !0, N.fromQuat.copy(J.quaternion));
        const Et = Math.min(1, (Dt - $) / 0.42), tt = 1 - (1 - Et) ** 3;
        J.quaternion.copy(N.fromQuat).slerp(N.targetQuat, tt), Et >= 1 && !N.settled && (N.settled = !0, J.quaternion.copy(N.targetQuat), J.position.set(pt, et, Tt), R(lt));
        continue;
      }
      J.rotateOnWorldAxis(N.axis, N.spinSpeed * X), N.spinSpeed = Math.max(12, N.spinSpeed * (1 - 0.12 * X));
    }
  }
  function G(X) {
    if (v) return;
    const lt = Math.min((X - C) / 1e3, 0.08);
    C = X, q(lt), h.render(p, g), T = requestAnimationFrame(G);
  }
  function k() {
    return c.rolling ? c._settlePromise || Promise.resolve({ type: c.type, values: c.results.slice() }) : (F(!0), c.targets = Array.from({ length: c.count }, () => gd(c.type)), c.results = Array.from({ length: c.count }, () => null), b(), y(!0), c._settlePromise = new Promise((X) => {
      c._settleResolve = X;
    }), c._settlePromise);
  }
  function j(X) {
    if (c.rolling || c.type === "d20hit") return;
    const lt = Math.min(10, Math.max(1, X));
    c.count = lt, c.savedCount = lt, c.targets = Array.from({ length: lt }, () => Tr(c.type)), c.results = Array.from({ length: lt }, () => null), w(), y(!1), nt();
  }
  function H(X) {
    if (c.rolling) return;
    const lt = ia(X);
    lt !== c.type && (lt === "d20hit" ? (c.savedCount = c.count, c.count = 1) : c.type === "d20hit" && (c.count = Math.min(10, Math.max(1, c.savedCount || 2))), c.type = lt, c.targets = Array.from({ length: c.count }, () => Tr(c.type)), c.results = Array.from({ length: c.count }, () => null), w(), F(!1), y(!1), nt());
  }
  e.addEventListener("click", (X) => {
    const lt = X.target.closest("button");
    !lt || !e.contains(lt) || (lt.dataset.action === "roll" && k(), lt.dataset.action === "dec" && j(c.count - 1), lt.dataset.action === "inc" && j(c.count + 1), lt.dataset.type && H(lt.dataset.type));
  });
  function nt() {
    typeof t.onChange == "function" && t.onChange({ count: c.count, type: c.type });
  }
  const V = (X) => {
    X.code !== "Space" && X.code !== "Enter" || X.target instanceof HTMLButtonElement && X.code === "Enter" || (X.preventDefault(), k());
  }, ot = t.bindKeys !== !1;
  ot && window.addEventListener("keydown", V);
  const dt = new ResizeObserver(() => P());
  dt.observe(n), w(), F(!1), T = requestAnimationFrame(G);
  const St = md().catch((X) => {
    console.warn("DiceRoller: не удалось загрузить иконки", X);
  }).finally(() => {
    !v && !c.rolling && y(!1);
  });
  return {
    roll: k,
    setCount: j,
    setType: H,
    layout: P,
    ready: St,
    getCount() {
      return c.count;
    },
    getType() {
      return c.type;
    },
    destroy() {
      v = !0, cancelAnimationFrame(T), dt.disconnect(), ot && window.removeEventListener("keydown", V), h.dispose(), e.innerHTML = "", e.classList.remove("dice-roller");
    }
  };
}
const Dd = { mount: Pd };
export {
  Dd as default,
  Pd as mountDiceRoller
};
