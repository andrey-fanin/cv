(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const s of l)
      if (s.type === "childList")
        for (const o of s.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const s = {};
    return (
      l.integrity && (s.integrity = l.integrity),
      l.referrerpolicy && (s.referrerPolicy = l.referrerpolicy),
      l.crossorigin === "use-credentials"
        ? (s.credentials = "include")
        : l.crossorigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const s = n(l);
    fetch(l.href, s);
  }
})();
function Rr(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let l = 0; l < r.length; l++) n[r[l]] = !0;
  return t ? (l) => !!n[l.toLowerCase()] : (l) => !!n[l];
}
const qo =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Jo = Rr(qo);
function El(e) {
  return !!e || e === "";
}
function xr(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        l = ge(r) ? ei(r) : xr(r);
      if (l) for (const s in l) t[s] = l[s];
    }
    return t;
  } else {
    if (ge(e)) return e;
    if (be(e)) return e;
  }
}
const Qo = /;(?![^(]*\))/g,
  zo = /:(.+)/;
function ei(e) {
  const t = {};
  return (
    e.split(Qo).forEach((n) => {
      if (n) {
        const r = n.split(zo);
        r.length > 1 && (t[r[0].trim()] = r[1].trim());
      }
    }),
    t
  );
}
function yn(e) {
  let t = "";
  if (ge(e)) t = e;
  else if (B(e))
    for (let n = 0; n < e.length; n++) {
      const r = yn(e[n]);
      r && (t += r + " ");
    }
  else if (be(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Fe = (e) =>
    ge(e)
      ? e
      : e == null
      ? ""
      : B(e) || (be(e) && (e.toString === yl || !Y(e.toString)))
      ? JSON.stringify(e, Cl, 2)
      : String(e),
  Cl = (e, t) =>
    t && t.__v_isRef
      ? Cl(e, t.value)
      : Kt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, l]) => ((n[`${r} =>`] = l), n),
            {}
          ),
        }
      : vl(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : be(t) && !B(t) && !Tl(t)
      ? String(t)
      : t,
  oe = {},
  Bt = [],
  Qe = () => {},
  ti = () => !1,
  ni = /^on[^a-z]/,
  Wn = (e) => ni.test(e),
  Hr = (e) => e.startsWith("onUpdate:"),
  Ie = Object.assign,
  $r = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  ri = Object.prototype.hasOwnProperty,
  z = (e, t) => ri.call(e, t),
  B = Array.isArray,
  Kt = (e) => jn(e) === "[object Map]",
  vl = (e) => jn(e) === "[object Set]",
  Y = (e) => typeof e == "function",
  ge = (e) => typeof e == "string",
  Vr = (e) => typeof e == "symbol",
  be = (e) => e !== null && typeof e == "object",
  Ll = (e) => be(e) && Y(e.then) && Y(e.catch),
  yl = Object.prototype.toString,
  jn = (e) => yl.call(e),
  si = (e) => jn(e).slice(8, -1),
  Tl = (e) => jn(e) === "[object Object]",
  Ur = (e) =>
    ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Pn = Rr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Bn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  li = /-(\w)/g,
  Zt = Bn((e) => e.replace(li, (t, n) => (n ? n.toUpperCase() : ""))),
  oi = /\B([A-Z])/g,
  zt = Bn((e) => e.replace(oi, "-$1").toLowerCase()),
  Il = Bn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  sr = Bn((e) => (e ? `on${Il(e)}` : "")),
  hn = (e, t) => !Object.is(e, t),
  an = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Dn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  ii = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let hs;
const ai = () =>
  hs ||
  (hs =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let rt;
class Nl {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        rt &&
        ((this.parent = rt),
        (this.index = (rt.scopes || (rt.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active) {
      const n = rt;
      try {
        return (rt = this), t();
      } finally {
        rt = n;
      }
    }
  }
  on() {
    rt = this;
  }
  off() {
    rt = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (this.parent && !t) {
        const l = this.parent.scopes.pop();
        l &&
          l !== this &&
          ((this.parent.scopes[this.index] = l), (l.index = this.index));
      }
      this.active = !1;
    }
  }
}
function ui(e) {
  return new Nl(e);
}
function ci(e, t = rt) {
  t && t.active && t.effects.push(e);
}
const Wr = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  wl = (e) => (e.w & Lt) > 0,
  kl = (e) => (e.n & Lt) > 0,
  fi = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Lt;
  },
  di = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const l = t[r];
        wl(l) && !kl(l) ? l.delete(e) : (t[n++] = l),
          (l.w &= ~Lt),
          (l.n &= ~Lt);
      }
      t.length = n;
    }
  },
  fr = new WeakMap();
let sn = 0,
  Lt = 1;
const dr = 30;
let Ze;
const Mt = Symbol(""),
  _r = Symbol("");
class jr {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      ci(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Ze,
      n = Ct;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Ze),
        (Ze = this),
        (Ct = !0),
        (Lt = 1 << ++sn),
        sn <= dr ? fi(this) : ps(this),
        this.fn()
      );
    } finally {
      sn <= dr && di(this),
        (Lt = 1 << --sn),
        (Ze = this.parent),
        (Ct = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Ze === this
      ? (this.deferStop = !0)
      : this.active &&
        (ps(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ps(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Ct = !0;
const Al = [];
function en() {
  Al.push(Ct), (Ct = !1);
}
function tn() {
  const e = Al.pop();
  Ct = e === void 0 ? !0 : e;
}
function xe(e, t, n) {
  if (Ct && Ze) {
    let r = fr.get(e);
    r || fr.set(e, (r = new Map()));
    let l = r.get(n);
    l || r.set(n, (l = Wr())), Fl(l);
  }
}
function Fl(e, t) {
  let n = !1;
  sn <= dr ? kl(e) || ((e.n |= Lt), (n = !wl(e))) : (n = !e.has(Ze)),
    n && (e.add(Ze), Ze.deps.push(e));
}
function _t(e, t, n, r, l, s) {
  const o = fr.get(e);
  if (!o) return;
  let u = [];
  if (t === "clear") u = [...o.values()];
  else if (n === "length" && B(e))
    o.forEach((c, d) => {
      (d === "length" || d >= r) && u.push(c);
    });
  else
    switch ((n !== void 0 && u.push(o.get(n)), t)) {
      case "add":
        B(e)
          ? Ur(n) && u.push(o.get("length"))
          : (u.push(o.get(Mt)), Kt(e) && u.push(o.get(_r)));
        break;
      case "delete":
        B(e) || (u.push(o.get(Mt)), Kt(e) && u.push(o.get(_r)));
        break;
      case "set":
        Kt(e) && u.push(o.get(Mt));
        break;
    }
  if (u.length === 1) u[0] && mr(u[0]);
  else {
    const c = [];
    for (const d of u) d && c.push(...d);
    mr(Wr(c));
  }
}
function mr(e, t) {
  const n = B(e) ? e : [...e];
  for (const r of n) r.computed && gs(r);
  for (const r of n) r.computed || gs(r);
}
function gs(e, t) {
  (e !== Ze || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const _i = Rr("__proto__,__v_isRef,__isVue"),
  Ol = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Vr)
  ),
  mi = Br(),
  hi = Br(!1, !0),
  pi = Br(!0),
  bs = gi();
function gi() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = ne(this);
        for (let s = 0, o = this.length; s < o; s++) xe(r, "get", s + "");
        const l = r[t](...n);
        return l === -1 || l === !1 ? r[t](...n.map(ne)) : l;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        en();
        const r = ne(this)[t].apply(this, n);
        return tn(), r;
      };
    }),
    e
  );
}
function Br(e = !1, t = !1) {
  return function (r, l, s) {
    if (l === "__v_isReactive") return !e;
    if (l === "__v_isReadonly") return e;
    if (l === "__v_isShallow") return t;
    if (l === "__v_raw" && s === (e ? (t ? Mi : Rl) : t ? Dl : Sl).get(r))
      return r;
    const o = B(r);
    if (!e && o && z(bs, l)) return Reflect.get(bs, l, s);
    const u = Reflect.get(r, l, s);
    return (Vr(l) ? Ol.has(l) : _i(l)) || (e || xe(r, "get", l), t)
      ? u
      : Ee(u)
      ? o && Ur(l)
        ? u
        : u.value
      : be(u)
      ? e
        ? xl(u)
        : Xr(u)
      : u;
  };
}
const bi = Pl(),
  Ei = Pl(!0);
function Pl(e = !1) {
  return function (n, r, l, s) {
    let o = n[r];
    if (pn(o) && Ee(o) && !Ee(l)) return !1;
    if (
      !e &&
      !pn(l) &&
      (hr(l) || ((l = ne(l)), (o = ne(o))), !B(n) && Ee(o) && !Ee(l))
    )
      return (o.value = l), !0;
    const u = B(n) && Ur(r) ? Number(r) < n.length : z(n, r),
      c = Reflect.set(n, r, l, s);
    return (
      n === ne(s) && (u ? hn(l, o) && _t(n, "set", r, l) : _t(n, "add", r, l)),
      c
    );
  };
}
function Ci(e, t) {
  const n = z(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && _t(e, "delete", t, void 0), r;
}
function vi(e, t) {
  const n = Reflect.has(e, t);
  return (!Vr(t) || !Ol.has(t)) && xe(e, "has", t), n;
}
function Li(e) {
  return xe(e, "iterate", B(e) ? "length" : Mt), Reflect.ownKeys(e);
}
const Ml = { get: mi, set: bi, deleteProperty: Ci, has: vi, ownKeys: Li },
  yi = {
    get: pi,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Ti = Ie({}, Ml, { get: hi, set: Ei }),
  Kr = (e) => e,
  Kn = (e) => Reflect.getPrototypeOf(e);
function Nn(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const l = ne(e),
    s = ne(t);
  n || (t !== s && xe(l, "get", t), xe(l, "get", s));
  const { has: o } = Kn(l),
    u = r ? Kr : n ? Zr : gn;
  if (o.call(l, t)) return u(e.get(t));
  if (o.call(l, s)) return u(e.get(s));
  e !== l && e.get(t);
}
function wn(e, t = !1) {
  const n = this.__v_raw,
    r = ne(n),
    l = ne(e);
  return (
    t || (e !== l && xe(r, "has", e), xe(r, "has", l)),
    e === l ? n.has(e) : n.has(e) || n.has(l)
  );
}
function kn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && xe(ne(e), "iterate", Mt), Reflect.get(e, "size", e)
  );
}
function Es(e) {
  e = ne(e);
  const t = ne(this);
  return Kn(t).has.call(t, e) || (t.add(e), _t(t, "add", e, e)), this;
}
function Cs(e, t) {
  t = ne(t);
  const n = ne(this),
    { has: r, get: l } = Kn(n);
  let s = r.call(n, e);
  s || ((e = ne(e)), (s = r.call(n, e)));
  const o = l.call(n, e);
  return (
    n.set(e, t), s ? hn(t, o) && _t(n, "set", e, t) : _t(n, "add", e, t), this
  );
}
function vs(e) {
  const t = ne(this),
    { has: n, get: r } = Kn(t);
  let l = n.call(t, e);
  l || ((e = ne(e)), (l = n.call(t, e))), r && r.call(t, e);
  const s = t.delete(e);
  return l && _t(t, "delete", e, void 0), s;
}
function Ls() {
  const e = ne(this),
    t = e.size !== 0,
    n = e.clear();
  return t && _t(e, "clear", void 0, void 0), n;
}
function An(e, t) {
  return function (r, l) {
    const s = this,
      o = s.__v_raw,
      u = ne(o),
      c = t ? Kr : e ? Zr : gn;
    return (
      !e && xe(u, "iterate", Mt), o.forEach((d, h) => r.call(l, c(d), c(h), s))
    );
  };
}
function Fn(e, t, n) {
  return function (...r) {
    const l = this.__v_raw,
      s = ne(l),
      o = Kt(s),
      u = e === "entries" || (e === Symbol.iterator && o),
      c = e === "keys" && o,
      d = l[e](...r),
      h = n ? Kr : t ? Zr : gn;
    return (
      !t && xe(s, "iterate", c ? _r : Mt),
      {
        next() {
          const { value: E, done: b } = d.next();
          return b
            ? { value: E, done: b }
            : { value: u ? [h(E[0]), h(E[1])] : h(E), done: b };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function pt(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Ii() {
  const e = {
      get(s) {
        return Nn(this, s);
      },
      get size() {
        return kn(this);
      },
      has: wn,
      add: Es,
      set: Cs,
      delete: vs,
      clear: Ls,
      forEach: An(!1, !1),
    },
    t = {
      get(s) {
        return Nn(this, s, !1, !0);
      },
      get size() {
        return kn(this);
      },
      has: wn,
      add: Es,
      set: Cs,
      delete: vs,
      clear: Ls,
      forEach: An(!1, !0),
    },
    n = {
      get(s) {
        return Nn(this, s, !0);
      },
      get size() {
        return kn(this, !0);
      },
      has(s) {
        return wn.call(this, s, !0);
      },
      add: pt("add"),
      set: pt("set"),
      delete: pt("delete"),
      clear: pt("clear"),
      forEach: An(!0, !1),
    },
    r = {
      get(s) {
        return Nn(this, s, !0, !0);
      },
      get size() {
        return kn(this, !0);
      },
      has(s) {
        return wn.call(this, s, !0);
      },
      add: pt("add"),
      set: pt("set"),
      delete: pt("delete"),
      clear: pt("clear"),
      forEach: An(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      (e[s] = Fn(s, !1, !1)),
        (n[s] = Fn(s, !0, !1)),
        (t[s] = Fn(s, !1, !0)),
        (r[s] = Fn(s, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Ni, wi, ki, Ai] = Ii();
function Yr(e, t) {
  const n = t ? (e ? Ai : ki) : e ? wi : Ni;
  return (r, l, s) =>
    l === "__v_isReactive"
      ? !e
      : l === "__v_isReadonly"
      ? e
      : l === "__v_raw"
      ? r
      : Reflect.get(z(n, l) && l in r ? n : r, l, s);
}
const Fi = { get: Yr(!1, !1) },
  Oi = { get: Yr(!1, !0) },
  Pi = { get: Yr(!0, !1) },
  Sl = new WeakMap(),
  Dl = new WeakMap(),
  Rl = new WeakMap(),
  Mi = new WeakMap();
function Si(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Di(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Si(si(e));
}
function Xr(e) {
  return pn(e) ? e : Gr(e, !1, Ml, Fi, Sl);
}
function Ri(e) {
  return Gr(e, !1, Ti, Oi, Dl);
}
function xl(e) {
  return Gr(e, !0, yi, Pi, Rl);
}
function Gr(e, t, n, r, l) {
  if (!be(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const s = l.get(e);
  if (s) return s;
  const o = Di(e);
  if (o === 0) return e;
  const u = new Proxy(e, o === 2 ? r : n);
  return l.set(e, u), u;
}
function Yt(e) {
  return pn(e) ? Yt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function pn(e) {
  return !!(e && e.__v_isReadonly);
}
function hr(e) {
  return !!(e && e.__v_isShallow);
}
function Hl(e) {
  return Yt(e) || pn(e);
}
function ne(e) {
  const t = e && e.__v_raw;
  return t ? ne(t) : e;
}
function $l(e) {
  return Dn(e, "__v_skip", !0), e;
}
const gn = (e) => (be(e) ? Xr(e) : e),
  Zr = (e) => (be(e) ? xl(e) : e);
function Vl(e) {
  Ct && Ze && ((e = ne(e)), Fl(e.dep || (e.dep = Wr())));
}
function Ul(e, t) {
  (e = ne(e)), e.dep && mr(e.dep);
}
function Ee(e) {
  return !!(e && e.__v_isRef === !0);
}
function Oe(e) {
  return Wl(e, !1);
}
function xi(e) {
  return Wl(e, !0);
}
function Wl(e, t) {
  return Ee(e) ? e : new Hi(e, t);
}
class Hi {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ne(t)),
      (this._value = n ? t : gn(t));
  }
  get value() {
    return Vl(this), this._value;
  }
  set value(t) {
    (t = this.__v_isShallow ? t : ne(t)),
      hn(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this.__v_isShallow ? t : gn(t)),
        Ul(this));
  }
}
function We(e) {
  return Ee(e) ? e.value : e;
}
const $i = {
  get: (e, t, n) => We(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const l = e[t];
    return Ee(l) && !Ee(n) ? ((l.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function jl(e) {
  return Yt(e) ? e : new Proxy(e, $i);
}
class Vi {
  constructor(t, n, r, l) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new jr(t, () => {
        this._dirty || ((this._dirty = !0), Ul(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !l),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = ne(this);
    return (
      Vl(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Ui(e, t, n = !1) {
  let r, l;
  const s = Y(e);
  return (
    s ? ((r = e), (l = Qe)) : ((r = e.get), (l = e.set)),
    new Vi(r, l, s || !l, n)
  );
}
function vt(e, t, n, r) {
  let l;
  try {
    l = r ? e(...r) : e();
  } catch (s) {
    Yn(s, t, n);
  }
  return l;
}
function je(e, t, n, r) {
  if (Y(e)) {
    const s = vt(e, t, n, r);
    return (
      s &&
        Ll(s) &&
        s.catch((o) => {
          Yn(o, t, n);
        }),
      s
    );
  }
  const l = [];
  for (let s = 0; s < e.length; s++) l.push(je(e[s], t, n, r));
  return l;
}
function Yn(e, t, n, r = !0) {
  const l = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const o = t.proxy,
      u = n;
    for (; s; ) {
      const d = s.ec;
      if (d) {
        for (let h = 0; h < d.length; h++) if (d[h](e, o, u) === !1) return;
      }
      s = s.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      vt(c, null, 10, [e, o, u]);
      return;
    }
  }
  Wi(e, n, l, r);
}
function Wi(e, t, n, r = !0) {
  console.error(e);
}
let Rn = !1,
  pr = !1;
const Re = [];
let ft = 0;
const un = [];
let ln = null,
  $t = 0;
const cn = [];
let bt = null,
  Vt = 0;
const Bl = Promise.resolve();
let qr = null,
  gr = null;
function ji(e) {
  const t = qr || Bl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Bi(e) {
  let t = ft + 1,
    n = Re.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    bn(Re[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Kl(e) {
  (!Re.length || !Re.includes(e, Rn && e.allowRecurse ? ft + 1 : ft)) &&
    e !== gr &&
    (e.id == null ? Re.push(e) : Re.splice(Bi(e.id), 0, e), Yl());
}
function Yl() {
  !Rn && !pr && ((pr = !0), (qr = Bl.then(Zl)));
}
function Ki(e) {
  const t = Re.indexOf(e);
  t > ft && Re.splice(t, 1);
}
function Xl(e, t, n, r) {
  B(e)
    ? n.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e),
    Yl();
}
function Yi(e) {
  Xl(e, ln, un, $t);
}
function Xi(e) {
  Xl(e, bt, cn, Vt);
}
function Xn(e, t = null) {
  if (un.length) {
    for (
      gr = t, ln = [...new Set(un)], un.length = 0, $t = 0;
      $t < ln.length;
      $t++
    )
      ln[$t]();
    (ln = null), ($t = 0), (gr = null), Xn(e, t);
  }
}
function Gl(e) {
  if ((Xn(), cn.length)) {
    const t = [...new Set(cn)];
    if (((cn.length = 0), bt)) {
      bt.push(...t);
      return;
    }
    for (bt = t, bt.sort((n, r) => bn(n) - bn(r)), Vt = 0; Vt < bt.length; Vt++)
      bt[Vt]();
    (bt = null), (Vt = 0);
  }
}
const bn = (e) => (e.id == null ? 1 / 0 : e.id);
function Zl(e) {
  (pr = !1), (Rn = !0), Xn(e), Re.sort((n, r) => bn(n) - bn(r));
  const t = Qe;
  try {
    for (ft = 0; ft < Re.length; ft++) {
      const n = Re[ft];
      n && n.active !== !1 && vt(n, null, 14);
    }
  } finally {
    (ft = 0),
      (Re.length = 0),
      Gl(),
      (Rn = !1),
      (qr = null),
      (Re.length || un.length || cn.length) && Zl(e);
  }
}
function Gi(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || oe;
  let l = n;
  const s = t.startsWith("update:"),
    o = s && t.slice(7);
  if (o && o in r) {
    const h = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: E, trim: b } = r[h] || oe;
    b && (l = n.map((I) => I.trim())), E && (l = n.map(ii));
  }
  let u,
    c = r[(u = sr(t))] || r[(u = sr(Zt(t)))];
  !c && s && (c = r[(u = sr(zt(t)))]), c && je(c, e, 6, l);
  const d = r[u + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[u]) return;
    (e.emitted[u] = !0), je(d, e, 6, l);
  }
}
function ql(e, t, n = !1) {
  const r = t.emitsCache,
    l = r.get(e);
  if (l !== void 0) return l;
  const s = e.emits;
  let o = {},
    u = !1;
  if (!Y(e)) {
    const c = (d) => {
      const h = ql(d, t, !0);
      h && ((u = !0), Ie(o, h));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !s && !u
    ? (r.set(e, null), null)
    : (B(s) ? s.forEach((c) => (o[c] = null)) : Ie(o, s), r.set(e, o), o);
}
function Gn(e, t) {
  return !e || !Wn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      z(e, t[0].toLowerCase() + t.slice(1)) || z(e, zt(t)) || z(e, t));
}
let Me = null,
  Jl = null;
function xn(e) {
  const t = Me;
  return (Me = e), (Jl = (e && e.type.__scopeId) || null), t;
}
function qt(e, t = Me, n) {
  if (!t || e._n) return e;
  const r = (...l) => {
    r._d && Ps(-1);
    const s = xn(t),
      o = e(...l);
    return xn(s), r._d && Ps(1), o;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function lr(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: l,
    props: s,
    propsOptions: [o],
    slots: u,
    attrs: c,
    emit: d,
    render: h,
    renderCache: E,
    data: b,
    setupState: I,
    ctx: O,
    inheritAttrs: k,
  } = e;
  let w, m;
  const C = xn(e);
  try {
    if (n.shapeFlag & 4) {
      const g = l || r;
      (w = st(h.call(g, g, E, s, I, b, O))), (m = c);
    } else {
      const g = t;
      (w = st(
        g.length > 1 ? g(s, { attrs: c, slots: u, emit: d }) : g(s, null)
      )),
        (m = t.props ? c : Zi(c));
    }
  } catch (g) {
    (fn.length = 0), Yn(g, e, 1), (w = se(Be));
  }
  let T = w;
  if (m && k !== !1) {
    const g = Object.keys(m),
      { shapeFlag: y } = T;
    g.length && y & 7 && (o && g.some(Hr) && (m = qi(m, o)), (T = mt(T, m)));
  }
  return (
    n.dirs && ((T = mt(T)), (T.dirs = T.dirs ? T.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (T.transition = n.transition),
    (w = T),
    xn(C),
    w
  );
}
const Zi = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Wn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  qi = (e, t) => {
    const n = {};
    for (const r in e) (!Hr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Ji(e, t, n) {
  const { props: r, children: l, component: s } = e,
    { props: o, children: u, patchFlag: c } = t,
    d = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? ys(r, o, d) : !!o;
    if (c & 8) {
      const h = t.dynamicProps;
      for (let E = 0; E < h.length; E++) {
        const b = h[E];
        if (o[b] !== r[b] && !Gn(d, b)) return !0;
      }
    }
  } else
    return (l || u) && (!u || !u.$stable)
      ? !0
      : r === o
      ? !1
      : r
      ? o
        ? ys(r, o, d)
        : !0
      : !!o;
  return !1;
}
function ys(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let l = 0; l < r.length; l++) {
    const s = r[l];
    if (t[s] !== e[s] && !Gn(n, s)) return !0;
  }
  return !1;
}
function Qi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ql = (e) => e.__isSuspense;
function zi(e, t) {
  t && t.pendingBranch
    ? B(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Xi(e);
}
function zl(e, t) {
  if (Le) {
    let n = Le.provides;
    const r = Le.parent && Le.parent.provides;
    r === n && (n = Le.provides = Object.create(r)), (n[e] = t);
  }
}
function Xt(e, t, n = !1) {
  const r = Le || Me;
  if (r) {
    const l =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (l && e in l) return l[e];
    if (arguments.length > 1) return n && Y(t) ? t.call(r.proxy) : t;
  }
}
const Ts = {};
function St(e, t, n) {
  return eo(e, t, n);
}
function eo(
  e,
  t,
  { immediate: n, deep: r, flush: l, onTrack: s, onTrigger: o } = oe
) {
  const u = Le;
  let c,
    d = !1,
    h = !1;
  if (
    (Ee(e)
      ? ((c = () => e.value), (d = hr(e)))
      : Yt(e)
      ? ((c = () => e), (r = !0))
      : B(e)
      ? ((h = !0),
        (d = e.some((m) => Yt(m) || hr(m))),
        (c = () =>
          e.map((m) => {
            if (Ee(m)) return m.value;
            if (Yt(m)) return Ut(m);
            if (Y(m)) return vt(m, u, 2);
          })))
      : Y(e)
      ? t
        ? (c = () => vt(e, u, 2))
        : (c = () => {
            if (!(u && u.isUnmounted)) return E && E(), je(e, u, 3, [b]);
          })
      : (c = Qe),
    t && r)
  ) {
    const m = c;
    c = () => Ut(m());
  }
  let E,
    b = (m) => {
      E = w.onStop = () => {
        vt(m, u, 4);
      };
    };
  if (vn)
    return (b = Qe), t ? n && je(t, u, 3, [c(), h ? [] : void 0, b]) : c(), Qe;
  let I = h ? [] : Ts;
  const O = () => {
    if (!!w.active)
      if (t) {
        const m = w.run();
        (r || d || (h ? m.some((C, T) => hn(C, I[T])) : hn(m, I))) &&
          (E && E(), je(t, u, 3, [m, I === Ts ? void 0 : I, b]), (I = m));
      } else w.run();
  };
  O.allowRecurse = !!t;
  let k;
  l === "sync"
    ? (k = O)
    : l === "post"
    ? (k = () => ve(O, u && u.suspense))
    : (k = () => Yi(O));
  const w = new jr(c, k);
  return (
    t
      ? n
        ? O()
        : (I = w.run())
      : l === "post"
      ? ve(w.run.bind(w), u && u.suspense)
      : w.run(),
    () => {
      w.stop(), u && u.scope && $r(u.scope.effects, w);
    }
  );
}
function ea(e, t, n) {
  const r = this.proxy,
    l = ge(e) ? (e.includes(".") ? to(r, e) : () => r[e]) : e.bind(r, r);
  let s;
  Y(t) ? (s = t) : ((s = t.handler), (n = t));
  const o = Le;
  Jt(this);
  const u = eo(l, s.bind(r), n);
  return o ? Jt(o) : Dt(), u;
}
function to(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let l = 0; l < n.length && r; l++) r = r[n[l]];
    return r;
  };
}
function Ut(e, t) {
  if (!be(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), Ee(e))) Ut(e.value, t);
  else if (B(e)) for (let n = 0; n < e.length; n++) Ut(e[n], t);
  else if (vl(e) || Kt(e))
    e.forEach((n) => {
      Ut(n, t);
    });
  else if (Tl(e)) for (const n in e) Ut(e[n], t);
  return e;
}
function ta() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Tn(() => {
      e.isMounted = !0;
    }),
    Jr(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Ve = [Function, Array],
  na = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Ve,
      onEnter: Ve,
      onAfterEnter: Ve,
      onEnterCancelled: Ve,
      onBeforeLeave: Ve,
      onLeave: Ve,
      onAfterLeave: Ve,
      onLeaveCancelled: Ve,
      onBeforeAppear: Ve,
      onAppear: Ve,
      onAfterAppear: Ve,
      onAppearCancelled: Ve,
    },
    setup(e, { slots: t }) {
      const n = Rt(),
        r = ta();
      let l;
      return () => {
        const s = t.default && ro(t.default(), !0);
        if (!s || !s.length) return;
        let o = s[0];
        if (s.length > 1) {
          for (const k of s)
            if (k.type !== Be) {
              o = k;
              break;
            }
        }
        const u = ne(e),
          { mode: c } = u;
        if (r.isLeaving) return or(o);
        const d = Is(o);
        if (!d) return or(o);
        const h = br(d, u, r, n);
        Hn(d, h);
        const E = n.subTree,
          b = E && Is(E);
        let I = !1;
        const { getTransitionKey: O } = d.type;
        if (O) {
          const k = O();
          l === void 0 ? (l = k) : k !== l && ((l = k), (I = !0));
        }
        if (b && b.type !== Be && (!Ot(d, b) || I)) {
          const k = br(b, u, r, n);
          if ((Hn(b, k), c === "out-in"))
            return (
              (r.isLeaving = !0),
              (k.afterLeave = () => {
                (r.isLeaving = !1), n.update();
              }),
              or(o)
            );
          c === "in-out" &&
            d.type !== Be &&
            (k.delayLeave = (w, m, C) => {
              const T = no(r, b);
              (T[String(b.key)] = b),
                (w._leaveCb = () => {
                  m(), (w._leaveCb = void 0), delete h.delayedLeave;
                }),
                (h.delayedLeave = C);
            });
        }
        return o;
      };
    },
  },
  ra = na;
function no(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function br(e, t, n, r) {
  const {
      appear: l,
      mode: s,
      persisted: o = !1,
      onBeforeEnter: u,
      onEnter: c,
      onAfterEnter: d,
      onEnterCancelled: h,
      onBeforeLeave: E,
      onLeave: b,
      onAfterLeave: I,
      onLeaveCancelled: O,
      onBeforeAppear: k,
      onAppear: w,
      onAfterAppear: m,
      onAppearCancelled: C,
    } = t,
    T = String(e.key),
    g = no(n, e),
    y = (H, V) => {
      H && je(H, r, 9, V);
    },
    P = (H, V) => {
      const K = V[1];
      y(H, V),
        B(H) ? H.every((q) => q.length <= 1) && K() : H.length <= 1 && K();
    },
    S = {
      mode: s,
      persisted: o,
      beforeEnter(H) {
        let V = u;
        if (!n.isMounted)
          if (l) V = k || u;
          else return;
        H._leaveCb && H._leaveCb(!0);
        const K = g[T];
        K && Ot(e, K) && K.el._leaveCb && K.el._leaveCb(), y(V, [H]);
      },
      enter(H) {
        let V = c,
          K = d,
          q = h;
        if (!n.isMounted)
          if (l) (V = w || c), (K = m || d), (q = C || h);
          else return;
        let fe = !1;
        const de = (H._enterCb = (Ke) => {
          fe ||
            ((fe = !0),
            Ke ? y(q, [H]) : y(K, [H]),
            S.delayedLeave && S.delayedLeave(),
            (H._enterCb = void 0));
        });
        V ? P(V, [H, de]) : de();
      },
      leave(H, V) {
        const K = String(e.key);
        if ((H._enterCb && H._enterCb(!0), n.isUnmounting)) return V();
        y(E, [H]);
        let q = !1;
        const fe = (H._leaveCb = (de) => {
          q ||
            ((q = !0),
            V(),
            de ? y(O, [H]) : y(I, [H]),
            (H._leaveCb = void 0),
            g[K] === e && delete g[K]);
        });
        (g[K] = e), b ? P(b, [H, fe]) : fe();
      },
      clone(H) {
        return br(H, t, n, r);
      },
    };
  return S;
}
function or(e) {
  if (Zn(e)) return (e = mt(e)), (e.children = null), e;
}
function Is(e) {
  return Zn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Hn(e, t) {
  e.shapeFlag & 6 && e.component
    ? Hn(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function ro(e, t = !1, n) {
  let r = [],
    l = 0;
  for (let s = 0; s < e.length; s++) {
    let o = e[s];
    const u = n == null ? o.key : String(n) + String(o.key != null ? o.key : s);
    o.type === ce
      ? (o.patchFlag & 128 && l++, (r = r.concat(ro(o.children, t, u))))
      : (t || o.type !== Be) && r.push(u != null ? mt(o, { key: u }) : o);
  }
  if (l > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
  return r;
}
function sa(e) {
  return Y(e) ? { setup: e, name: e.name } : e;
}
const Gt = (e) => !!e.type.__asyncLoader,
  Zn = (e) => e.type.__isKeepAlive,
  la = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(e, { slots: t }) {
      const n = Rt(),
        r = n.ctx;
      if (!r.renderer)
        return () => {
          const C = t.default && t.default();
          return C && C.length === 1 ? C[0] : C;
        };
      const l = new Map(),
        s = new Set();
      let o = null;
      const u = n.suspense,
        {
          renderer: {
            p: c,
            m: d,
            um: h,
            o: { createElement: E },
          },
        } = r,
        b = E("div");
      (r.activate = (C, T, g, y, P) => {
        const S = C.component;
        d(C, T, g, 0, u),
          c(S.vnode, C, T, g, S, u, y, C.slotScopeIds, P),
          ve(() => {
            (S.isDeactivated = !1), S.a && an(S.a);
            const H = C.props && C.props.onVnodeMounted;
            H && Ue(H, S.parent, C);
          }, u);
      }),
        (r.deactivate = (C) => {
          const T = C.component;
          d(C, b, null, 1, u),
            ve(() => {
              T.da && an(T.da);
              const g = C.props && C.props.onVnodeUnmounted;
              g && Ue(g, T.parent, C), (T.isDeactivated = !0);
            }, u);
        });
      function I(C) {
        ir(C), h(C, n, u, !0);
      }
      function O(C) {
        l.forEach((T, g) => {
          const y = Ds(T.type);
          y && (!C || !C(y)) && k(g);
        });
      }
      function k(C) {
        const T = l.get(C);
        !o || T.type !== o.type ? I(T) : o && ir(o), l.delete(C), s.delete(C);
      }
      St(
        () => [e.include, e.exclude],
        ([C, T]) => {
          C && O((g) => on(C, g)), T && O((g) => !on(T, g));
        },
        { flush: "post", deep: !0 }
      );
      let w = null;
      const m = () => {
        w != null && l.set(w, ar(n.subTree));
      };
      return (
        Tn(m),
        oo(m),
        Jr(() => {
          l.forEach((C) => {
            const { subTree: T, suspense: g } = n,
              y = ar(T);
            if (C.type === y.type) {
              ir(y);
              const P = y.component.da;
              P && ve(P, g);
              return;
            }
            I(C);
          });
        }),
        () => {
          if (((w = null), !t.default)) return null;
          const C = t.default(),
            T = C[0];
          if (C.length > 1) return (o = null), C;
          if (!Cn(T) || (!(T.shapeFlag & 4) && !(T.shapeFlag & 128)))
            return (o = null), T;
          let g = ar(T);
          const y = g.type,
            P = Ds(Gt(g) ? g.type.__asyncResolved || {} : y),
            { include: S, exclude: H, max: V } = e;
          if ((S && (!P || !on(S, P))) || (H && P && on(H, P)))
            return (o = g), T;
          const K = g.key == null ? y : g.key,
            q = l.get(K);
          return (
            g.el && ((g = mt(g)), T.shapeFlag & 128 && (T.ssContent = g)),
            (w = K),
            q
              ? ((g.el = q.el),
                (g.component = q.component),
                g.transition && Hn(g, g.transition),
                (g.shapeFlag |= 512),
                s.delete(K),
                s.add(K))
              : (s.add(K),
                V && s.size > parseInt(V, 10) && k(s.values().next().value)),
            (g.shapeFlag |= 256),
            (o = g),
            Ql(T.type) ? T : g
          );
        }
      );
    },
  },
  oa = la;
function on(e, t) {
  return B(e)
    ? e.some((n) => on(n, t))
    : ge(e)
    ? e.split(",").includes(t)
    : e.test
    ? e.test(t)
    : !1;
}
function ia(e, t) {
  so(e, "a", t);
}
function aa(e, t) {
  so(e, "da", t);
}
function so(e, t, n = Le) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let l = n;
      for (; l; ) {
        if (l.isDeactivated) return;
        l = l.parent;
      }
      return e();
    });
  if ((qn(t, r, n), n)) {
    let l = n.parent;
    for (; l && l.parent; )
      Zn(l.parent.vnode) && ua(r, t, n, l), (l = l.parent);
  }
}
function ua(e, t, n, r) {
  const l = qn(t, e, r, !0);
  Jn(() => {
    $r(r[t], l);
  }, n);
}
function ir(e) {
  let t = e.shapeFlag;
  t & 256 && (t -= 256), t & 512 && (t -= 512), (e.shapeFlag = t);
}
function ar(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function qn(e, t, n = Le, r = !1) {
  if (n) {
    const l = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          en(), Jt(n);
          const u = je(t, n, e, o);
          return Dt(), tn(), u;
        });
    return r ? l.unshift(s) : l.push(s), s;
  }
}
const ht =
    (e) =>
    (t, n = Le) =>
      (!vn || e === "sp") && qn(e, t, n),
  lo = ht("bm"),
  Tn = ht("m"),
  ca = ht("bu"),
  oo = ht("u"),
  Jr = ht("bum"),
  Jn = ht("um"),
  fa = ht("sp"),
  da = ht("rtg"),
  _a = ht("rtc");
function ma(e, t = Le) {
  qn("ec", e, t);
}
function kt(e, t, n, r) {
  const l = e.dirs,
    s = t && t.dirs;
  for (let o = 0; o < l.length; o++) {
    const u = l[o];
    s && (u.oldValue = s[o].value);
    let c = u.dir[r];
    c && (en(), je(c, n, 8, [e.el, u, e, t]), tn());
  }
}
const ha = Symbol();
function dt(e, t, n, r) {
  let l;
  const s = n && n[r];
  if (B(e) || ge(e)) {
    l = new Array(e.length);
    for (let o = 0, u = e.length; o < u; o++)
      l[o] = t(e[o], o, void 0, s && s[o]);
  } else if (typeof e == "number") {
    l = new Array(e);
    for (let o = 0; o < e; o++) l[o] = t(o + 1, o, void 0, s && s[o]);
  } else if (be(e))
    if (e[Symbol.iterator])
      l = Array.from(e, (o, u) => t(o, u, void 0, s && s[u]));
    else {
      const o = Object.keys(e);
      l = new Array(o.length);
      for (let u = 0, c = o.length; u < c; u++) {
        const d = o[u];
        l[u] = t(e[d], d, u, s && s[u]);
      }
    }
  else l = [];
  return n && (n[r] = l), l;
}
function io(e, t, n = {}, r, l) {
  if (Me.isCE || (Me.parent && Gt(Me.parent) && Me.parent.isCE))
    return se("slot", t === "default" ? null : { name: t }, r && r());
  let s = e[t];
  s && s._c && (s._d = !1), U();
  const o = s && ao(s(n)),
    u = Te(
      ce,
      { key: n.key || `_${t}` },
      o || (r ? r() : []),
      o && e._ === 1 ? 64 : -2
    );
  return (
    !l && u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]),
    s && s._c && (s._d = !0),
    u
  );
}
function ao(e) {
  return e.some((t) =>
    Cn(t) ? !(t.type === Be || (t.type === ce && !ao(t.children))) : !0
  )
    ? e
    : null;
}
const Er = (e) => (e ? (Lo(e) ? es(e) || e.proxy : Er(e.parent)) : null),
  $n = Ie(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Er(e.parent),
    $root: (e) => Er(e.root),
    $emit: (e) => e.emit,
    $options: (e) => co(e),
    $forceUpdate: (e) => e.f || (e.f = () => Kl(e.update)),
    $nextTick: (e) => e.n || (e.n = ji.bind(e.proxy)),
    $watch: (e) => ea.bind(e),
  }),
  pa = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: l,
        props: s,
        accessCache: o,
        type: u,
        appContext: c,
      } = e;
      let d;
      if (t[0] !== "$") {
        const I = o[t];
        if (I !== void 0)
          switch (I) {
            case 1:
              return r[t];
            case 2:
              return l[t];
            case 4:
              return n[t];
            case 3:
              return s[t];
          }
        else {
          if (r !== oe && z(r, t)) return (o[t] = 1), r[t];
          if (l !== oe && z(l, t)) return (o[t] = 2), l[t];
          if ((d = e.propsOptions[0]) && z(d, t)) return (o[t] = 3), s[t];
          if (n !== oe && z(n, t)) return (o[t] = 4), n[t];
          Cr && (o[t] = 0);
        }
      }
      const h = $n[t];
      let E, b;
      if (h) return t === "$attrs" && xe(e, "get", t), h(e);
      if ((E = u.__cssModules) && (E = E[t])) return E;
      if (n !== oe && z(n, t)) return (o[t] = 4), n[t];
      if (((b = c.config.globalProperties), z(b, t))) return b[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: l, ctx: s } = e;
      return l !== oe && z(l, t)
        ? ((l[t] = n), !0)
        : r !== oe && z(r, t)
        ? ((r[t] = n), !0)
        : z(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((s[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: l,
          propsOptions: s,
        },
      },
      o
    ) {
      let u;
      return (
        !!n[o] ||
        (e !== oe && z(e, o)) ||
        (t !== oe && z(t, o)) ||
        ((u = s[0]) && z(u, o)) ||
        z(r, o) ||
        z($n, o) ||
        z(l.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : z(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let Cr = !0;
function ga(e) {
  const t = co(e),
    n = e.proxy,
    r = e.ctx;
  (Cr = !1), t.beforeCreate && Ns(t.beforeCreate, e, "bc");
  const {
    data: l,
    computed: s,
    methods: o,
    watch: u,
    provide: c,
    inject: d,
    created: h,
    beforeMount: E,
    mounted: b,
    beforeUpdate: I,
    updated: O,
    activated: k,
    deactivated: w,
    beforeDestroy: m,
    beforeUnmount: C,
    destroyed: T,
    unmounted: g,
    render: y,
    renderTracked: P,
    renderTriggered: S,
    errorCaptured: H,
    serverPrefetch: V,
    expose: K,
    inheritAttrs: q,
    components: fe,
    directives: de,
    filters: Ke,
  } = t;
  if ((d && ba(d, r, null, e.appContext.config.unwrapInjectedRef), o))
    for (const J in o) {
      const ee = o[J];
      Y(ee) && (r[J] = ee.bind(n));
    }
  if (l) {
    const J = l.call(n, n);
    be(J) && (e.data = Xr(J));
  }
  if (((Cr = !0), s))
    for (const J in s) {
      const ee = s[J],
        ye = Y(ee) ? ee.bind(n, n) : Y(ee.get) ? ee.get.bind(n, n) : Qe,
        it = !Y(ee) && Y(ee.set) ? ee.set.bind(n) : Qe,
        Ye = qe({ get: ye, set: it });
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Ye.value,
        set: (He) => (Ye.value = He),
      });
    }
  if (u) for (const J in u) uo(u[J], r, n, J);
  if (c) {
    const J = Y(c) ? c.call(n) : c;
    Reflect.ownKeys(J).forEach((ee) => {
      zl(ee, J[ee]);
    });
  }
  h && Ns(h, e, "c");
  function ue(J, ee) {
    B(ee) ? ee.forEach((ye) => J(ye.bind(n))) : ee && J(ee.bind(n));
  }
  if (
    (ue(lo, E),
    ue(Tn, b),
    ue(ca, I),
    ue(oo, O),
    ue(ia, k),
    ue(aa, w),
    ue(ma, H),
    ue(_a, P),
    ue(da, S),
    ue(Jr, C),
    ue(Jn, g),
    ue(fa, V),
    B(K))
  )
    if (K.length) {
      const J = e.exposed || (e.exposed = {});
      K.forEach((ee) => {
        Object.defineProperty(J, ee, {
          get: () => n[ee],
          set: (ye) => (n[ee] = ye),
        });
      });
    } else e.exposed || (e.exposed = {});
  y && e.render === Qe && (e.render = y),
    q != null && (e.inheritAttrs = q),
    fe && (e.components = fe),
    de && (e.directives = de);
}
function ba(e, t, n = Qe, r = !1) {
  B(e) && (e = vr(e));
  for (const l in e) {
    const s = e[l];
    let o;
    be(s)
      ? "default" in s
        ? (o = Xt(s.from || l, s.default, !0))
        : (o = Xt(s.from || l))
      : (o = Xt(s)),
      Ee(o) && r
        ? Object.defineProperty(t, l, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (u) => (o.value = u),
          })
        : (t[l] = o);
  }
}
function Ns(e, t, n) {
  je(B(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function uo(e, t, n, r) {
  const l = r.includes(".") ? to(n, r) : () => n[r];
  if (ge(e)) {
    const s = t[e];
    Y(s) && St(l, s);
  } else if (Y(e)) St(l, e.bind(n));
  else if (be(e))
    if (B(e)) e.forEach((s) => uo(s, t, n, r));
    else {
      const s = Y(e.handler) ? e.handler.bind(n) : t[e.handler];
      Y(s) && St(l, s, e);
    }
}
function co(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: l,
      optionsCache: s,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    u = s.get(t);
  let c;
  return (
    u
      ? (c = u)
      : !l.length && !n && !r
      ? (c = t)
      : ((c = {}), l.length && l.forEach((d) => Vn(c, d, o, !0)), Vn(c, t, o)),
    s.set(t, c),
    c
  );
}
function Vn(e, t, n, r = !1) {
  const { mixins: l, extends: s } = t;
  s && Vn(e, s, n, !0), l && l.forEach((o) => Vn(e, o, n, !0));
  for (const o in t)
    if (!(r && o === "expose")) {
      const u = Ea[o] || (n && n[o]);
      e[o] = u ? u(e[o], t[o]) : t[o];
    }
  return e;
}
const Ea = {
  data: ws,
  props: Ft,
  emits: Ft,
  methods: Ft,
  computed: Ft,
  beforeCreate: ke,
  created: ke,
  beforeMount: ke,
  mounted: ke,
  beforeUpdate: ke,
  updated: ke,
  beforeDestroy: ke,
  beforeUnmount: ke,
  destroyed: ke,
  unmounted: ke,
  activated: ke,
  deactivated: ke,
  errorCaptured: ke,
  serverPrefetch: ke,
  components: Ft,
  directives: Ft,
  watch: va,
  provide: ws,
  inject: Ca,
};
function ws(e, t) {
  return t
    ? e
      ? function () {
          return Ie(
            Y(e) ? e.call(this, this) : e,
            Y(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Ca(e, t) {
  return Ft(vr(e), vr(t));
}
function vr(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ke(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ft(e, t) {
  return e ? Ie(Ie(Object.create(null), e), t) : t;
}
function va(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ie(Object.create(null), e);
  for (const r in t) n[r] = ke(e[r], t[r]);
  return n;
}
function La(e, t, n, r = !1) {
  const l = {},
    s = {};
  Dn(s, zn, 1), (e.propsDefaults = Object.create(null)), fo(e, t, l, s);
  for (const o in e.propsOptions[0]) o in l || (l[o] = void 0);
  n ? (e.props = r ? l : Ri(l)) : e.type.props ? (e.props = l) : (e.props = s),
    (e.attrs = s);
}
function ya(e, t, n, r) {
  const {
      props: l,
      attrs: s,
      vnode: { patchFlag: o },
    } = e,
    u = ne(l),
    [c] = e.propsOptions;
  let d = !1;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const h = e.vnode.dynamicProps;
      for (let E = 0; E < h.length; E++) {
        let b = h[E];
        if (Gn(e.emitsOptions, b)) continue;
        const I = t[b];
        if (c)
          if (z(s, b)) I !== s[b] && ((s[b] = I), (d = !0));
          else {
            const O = Zt(b);
            l[O] = Lr(c, u, O, I, e, !1);
          }
        else I !== s[b] && ((s[b] = I), (d = !0));
      }
    }
  } else {
    fo(e, t, l, s) && (d = !0);
    let h;
    for (const E in u)
      (!t || (!z(t, E) && ((h = zt(E)) === E || !z(t, h)))) &&
        (c
          ? n &&
            (n[E] !== void 0 || n[h] !== void 0) &&
            (l[E] = Lr(c, u, E, void 0, e, !0))
          : delete l[E]);
    if (s !== u)
      for (const E in s) (!t || (!z(t, E) && !0)) && (delete s[E], (d = !0));
  }
  d && _t(e, "set", "$attrs");
}
function fo(e, t, n, r) {
  const [l, s] = e.propsOptions;
  let o = !1,
    u;
  if (t)
    for (let c in t) {
      if (Pn(c)) continue;
      const d = t[c];
      let h;
      l && z(l, (h = Zt(c)))
        ? !s || !s.includes(h)
          ? (n[h] = d)
          : ((u || (u = {}))[h] = d)
        : Gn(e.emitsOptions, c) ||
          ((!(c in r) || d !== r[c]) && ((r[c] = d), (o = !0)));
    }
  if (s) {
    const c = ne(n),
      d = u || oe;
    for (let h = 0; h < s.length; h++) {
      const E = s[h];
      n[E] = Lr(l, c, E, d[E], e, !z(d, E));
    }
  }
  return o;
}
function Lr(e, t, n, r, l, s) {
  const o = e[n];
  if (o != null) {
    const u = z(o, "default");
    if (u && r === void 0) {
      const c = o.default;
      if (o.type !== Function && Y(c)) {
        const { propsDefaults: d } = l;
        n in d ? (r = d[n]) : (Jt(l), (r = d[n] = c.call(null, t)), Dt());
      } else r = c;
    }
    o[0] &&
      (s && !u ? (r = !1) : o[1] && (r === "" || r === zt(n)) && (r = !0));
  }
  return r;
}
function _o(e, t, n = !1) {
  const r = t.propsCache,
    l = r.get(e);
  if (l) return l;
  const s = e.props,
    o = {},
    u = [];
  let c = !1;
  if (!Y(e)) {
    const h = (E) => {
      c = !0;
      const [b, I] = _o(E, t, !0);
      Ie(o, b), I && u.push(...I);
    };
    !n && t.mixins.length && t.mixins.forEach(h),
      e.extends && h(e.extends),
      e.mixins && e.mixins.forEach(h);
  }
  if (!s && !c) return r.set(e, Bt), Bt;
  if (B(s))
    for (let h = 0; h < s.length; h++) {
      const E = Zt(s[h]);
      ks(E) && (o[E] = oe);
    }
  else if (s)
    for (const h in s) {
      const E = Zt(h);
      if (ks(E)) {
        const b = s[h],
          I = (o[E] = B(b) || Y(b) ? { type: b } : b);
        if (I) {
          const O = Os(Boolean, I.type),
            k = Os(String, I.type);
          (I[0] = O > -1),
            (I[1] = k < 0 || O < k),
            (O > -1 || z(I, "default")) && u.push(E);
        }
      }
    }
  const d = [o, u];
  return r.set(e, d), d;
}
function ks(e) {
  return e[0] !== "$";
}
function As(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Fs(e, t) {
  return As(e) === As(t);
}
function Os(e, t) {
  return B(t) ? t.findIndex((n) => Fs(n, e)) : Y(t) && Fs(t, e) ? 0 : -1;
}
const mo = (e) => e[0] === "_" || e === "$stable",
  Qr = (e) => (B(e) ? e.map(st) : [st(e)]),
  Ta = (e, t, n) => {
    if (t._n) return t;
    const r = qt((...l) => Qr(t(...l)), n);
    return (r._c = !1), r;
  },
  ho = (e, t, n) => {
    const r = e._ctx;
    for (const l in e) {
      if (mo(l)) continue;
      const s = e[l];
      if (Y(s)) t[l] = Ta(l, s, r);
      else if (s != null) {
        const o = Qr(s);
        t[l] = () => o;
      }
    }
  },
  po = (e, t) => {
    const n = Qr(t);
    e.slots.default = () => n;
  },
  Ia = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = ne(t)), Dn(t, "_", n)) : ho(t, (e.slots = {}));
    } else (e.slots = {}), t && po(e, t);
    Dn(e.slots, zn, 1);
  },
  Na = (e, t, n) => {
    const { vnode: r, slots: l } = e;
    let s = !0,
      o = oe;
    if (r.shapeFlag & 32) {
      const u = t._;
      u
        ? n && u === 1
          ? (s = !1)
          : (Ie(l, t), !n && u === 1 && delete l._)
        : ((s = !t.$stable), ho(t, l)),
        (o = t);
    } else t && (po(e, t), (o = { default: 1 }));
    if (s) for (const u in l) !mo(u) && !(u in o) && delete l[u];
  };
function go() {
  return {
    app: null,
    config: {
      isNativeTag: ti,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let wa = 0;
function ka(e, t) {
  return function (r, l = null) {
    Y(r) || (r = Object.assign({}, r)), l != null && !be(l) && (l = null);
    const s = go(),
      o = new Set();
    let u = !1;
    const c = (s.app = {
      _uid: wa++,
      _component: r,
      _props: l,
      _container: null,
      _context: s,
      _instance: null,
      version: Ya,
      get config() {
        return s.config;
      },
      set config(d) {},
      use(d, ...h) {
        return (
          o.has(d) ||
            (d && Y(d.install)
              ? (o.add(d), d.install(c, ...h))
              : Y(d) && (o.add(d), d(c, ...h))),
          c
        );
      },
      mixin(d) {
        return s.mixins.includes(d) || s.mixins.push(d), c;
      },
      component(d, h) {
        return h ? ((s.components[d] = h), c) : s.components[d];
      },
      directive(d, h) {
        return h ? ((s.directives[d] = h), c) : s.directives[d];
      },
      mount(d, h, E) {
        if (!u) {
          const b = se(r, l);
          return (
            (b.appContext = s),
            h && t ? t(b, d) : e(b, d, E),
            (u = !0),
            (c._container = d),
            (d.__vue_app__ = c),
            es(b.component) || b.component.proxy
          );
        }
      },
      unmount() {
        u && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, h) {
        return (s.provides[d] = h), c;
      },
    });
    return c;
  };
}
function yr(e, t, n, r, l = !1) {
  if (B(e)) {
    e.forEach((b, I) => yr(b, t && (B(t) ? t[I] : t), n, r, l));
    return;
  }
  if (Gt(r) && !l) return;
  const s = r.shapeFlag & 4 ? es(r.component) || r.component.proxy : r.el,
    o = l ? null : s,
    { i: u, r: c } = e,
    d = t && t.r,
    h = u.refs === oe ? (u.refs = {}) : u.refs,
    E = u.setupState;
  if (
    (d != null &&
      d !== c &&
      (ge(d)
        ? ((h[d] = null), z(E, d) && (E[d] = null))
        : Ee(d) && (d.value = null)),
    Y(c))
  )
    vt(c, u, 12, [o, h]);
  else {
    const b = ge(c),
      I = Ee(c);
    if (b || I) {
      const O = () => {
        if (e.f) {
          const k = b ? h[c] : c.value;
          l
            ? B(k) && $r(k, s)
            : B(k)
            ? k.includes(s) || k.push(s)
            : b
            ? ((h[c] = [s]), z(E, c) && (E[c] = h[c]))
            : ((c.value = [s]), e.k && (h[e.k] = c.value));
        } else
          b
            ? ((h[c] = o), z(E, c) && (E[c] = o))
            : I && ((c.value = o), e.k && (h[e.k] = o));
      };
      o ? ((O.id = -1), ve(O, n)) : O();
    }
  }
}
const ve = zi;
function Aa(e) {
  return Fa(e);
}
function Fa(e, t) {
  const n = ai();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: l,
      patchProp: s,
      createElement: o,
      createText: u,
      createComment: c,
      setText: d,
      setElementText: h,
      parentNode: E,
      nextSibling: b,
      setScopeId: I = Qe,
      cloneNode: O,
      insertStaticContent: k,
    } = e,
    w = (
      a,
      i,
      f,
      p = null,
      v = null,
      N = null,
      M = !1,
      F = null,
      A = !!i.dynamicChildren
    ) => {
      if (a === i) return;
      a && !Ot(a, i) && ((p = $e(a)), Se(a, v, N, !0), (a = null)),
        i.patchFlag === -2 && ((A = !1), (i.dynamicChildren = null));
      const { type: _, ref: L, shapeFlag: R } = i;
      switch (_) {
        case Qn:
          m(a, i, f, p);
          break;
        case Be:
          C(a, i, f, p);
          break;
        case Mn:
          a == null && T(i, f, p, M);
          break;
        case ce:
          de(a, i, f, p, v, N, M, F, A);
          break;
        default:
          R & 1
            ? P(a, i, f, p, v, N, M, F, A)
            : R & 6
            ? Ke(a, i, f, p, v, N, M, F, A)
            : (R & 64 || R & 128) && _.process(a, i, f, p, v, N, M, F, A, we);
      }
      L != null && v && yr(L, a && a.ref, N, i || a, !i);
    },
    m = (a, i, f, p) => {
      if (a == null) r((i.el = u(i.children)), f, p);
      else {
        const v = (i.el = a.el);
        i.children !== a.children && d(v, i.children);
      }
    },
    C = (a, i, f, p) => {
      a == null ? r((i.el = c(i.children || "")), f, p) : (i.el = a.el);
    },
    T = (a, i, f, p) => {
      [a.el, a.anchor] = k(a.children, i, f, p, a.el, a.anchor);
    },
    g = ({ el: a, anchor: i }, f, p) => {
      let v;
      for (; a && a !== i; ) (v = b(a)), r(a, f, p), (a = v);
      r(i, f, p);
    },
    y = ({ el: a, anchor: i }) => {
      let f;
      for (; a && a !== i; ) (f = b(a)), l(a), (a = f);
      l(i);
    },
    P = (a, i, f, p, v, N, M, F, A) => {
      (M = M || i.type === "svg"),
        a == null ? S(i, f, p, v, N, M, F, A) : K(a, i, v, N, M, F, A);
    },
    S = (a, i, f, p, v, N, M, F) => {
      let A, _;
      const {
        type: L,
        props: R,
        shapeFlag: x,
        transition: W,
        patchFlag: X,
        dirs: Q,
      } = a;
      if (a.el && O !== void 0 && X === -1) A = a.el = O(a.el);
      else {
        if (
          ((A = a.el = o(a.type, N, R && R.is, R)),
          x & 8
            ? h(A, a.children)
            : x & 16 &&
              V(a.children, A, null, p, v, N && L !== "foreignObject", M, F),
          Q && kt(a, null, p, "created"),
          R)
        ) {
          for (const le in R)
            le !== "value" &&
              !Pn(le) &&
              s(A, le, null, R[le], N, a.children, p, v, Ne);
          "value" in R && s(A, "value", null, R.value),
            (_ = R.onVnodeBeforeMount) && Ue(_, p, a);
        }
        H(A, a, a.scopeId, M, p);
      }
      Q && kt(a, null, p, "beforeMount");
      const re = (!v || (v && !v.pendingBranch)) && W && !W.persisted;
      re && W.beforeEnter(A),
        r(A, i, f),
        ((_ = R && R.onVnodeMounted) || re || Q) &&
          ve(() => {
            _ && Ue(_, p, a), re && W.enter(A), Q && kt(a, null, p, "mounted");
          }, v);
    },
    H = (a, i, f, p, v) => {
      if ((f && I(a, f), p)) for (let N = 0; N < p.length; N++) I(a, p[N]);
      if (v) {
        let N = v.subTree;
        if (i === N) {
          const M = v.vnode;
          H(a, M, M.scopeId, M.slotScopeIds, v.parent);
        }
      }
    },
    V = (a, i, f, p, v, N, M, F, A = 0) => {
      for (let _ = A; _ < a.length; _++) {
        const L = (a[_] = F ? Et(a[_]) : st(a[_]));
        w(null, L, i, f, p, v, N, M, F);
      }
    },
    K = (a, i, f, p, v, N, M) => {
      const F = (i.el = a.el);
      let { patchFlag: A, dynamicChildren: _, dirs: L } = i;
      A |= a.patchFlag & 16;
      const R = a.props || oe,
        x = i.props || oe;
      let W;
      f && At(f, !1),
        (W = x.onVnodeBeforeUpdate) && Ue(W, f, i, a),
        L && kt(i, a, f, "beforeUpdate"),
        f && At(f, !0);
      const X = v && i.type !== "foreignObject";
      if (
        (_
          ? q(a.dynamicChildren, _, F, f, p, X, N)
          : M || ye(a, i, F, null, f, p, X, N, !1),
        A > 0)
      ) {
        if (A & 16) fe(F, i, R, x, f, p, v);
        else if (
          (A & 2 && R.class !== x.class && s(F, "class", null, x.class, v),
          A & 4 && s(F, "style", R.style, x.style, v),
          A & 8)
        ) {
          const Q = i.dynamicProps;
          for (let re = 0; re < Q.length; re++) {
            const le = Q[re],
              Ge = R[le],
              Ht = x[le];
            (Ht !== Ge || le === "value") &&
              s(F, le, Ge, Ht, v, a.children, f, p, Ne);
          }
        }
        A & 1 && a.children !== i.children && h(F, i.children);
      } else !M && _ == null && fe(F, i, R, x, f, p, v);
      ((W = x.onVnodeUpdated) || L) &&
        ve(() => {
          W && Ue(W, f, i, a), L && kt(i, a, f, "updated");
        }, p);
    },
    q = (a, i, f, p, v, N, M) => {
      for (let F = 0; F < i.length; F++) {
        const A = a[F],
          _ = i[F],
          L =
            A.el && (A.type === ce || !Ot(A, _) || A.shapeFlag & 70)
              ? E(A.el)
              : f;
        w(A, _, L, null, p, v, N, M, !0);
      }
    },
    fe = (a, i, f, p, v, N, M) => {
      if (f !== p) {
        for (const F in p) {
          if (Pn(F)) continue;
          const A = p[F],
            _ = f[F];
          A !== _ && F !== "value" && s(a, F, _, A, M, i.children, v, N, Ne);
        }
        if (f !== oe)
          for (const F in f)
            !Pn(F) && !(F in p) && s(a, F, f[F], null, M, i.children, v, N, Ne);
        "value" in p && s(a, "value", f.value, p.value);
      }
    },
    de = (a, i, f, p, v, N, M, F, A) => {
      const _ = (i.el = a ? a.el : u("")),
        L = (i.anchor = a ? a.anchor : u(""));
      let { patchFlag: R, dynamicChildren: x, slotScopeIds: W } = i;
      W && (F = F ? F.concat(W) : W),
        a == null
          ? (r(_, f, p), r(L, f, p), V(i.children, f, L, v, N, M, F, A))
          : R > 0 && R & 64 && x && a.dynamicChildren
          ? (q(a.dynamicChildren, x, f, v, N, M, F),
            (i.key != null || (v && i === v.subTree)) && bo(a, i, !0))
          : ye(a, i, f, L, v, N, M, F, A);
    },
    Ke = (a, i, f, p, v, N, M, F, A) => {
      (i.slotScopeIds = F),
        a == null
          ? i.shapeFlag & 512
            ? v.ctx.activate(i, f, p, M, A)
            : ot(i, f, p, v, N, M, A)
          : ue(a, i, A);
    },
    ot = (a, i, f, p, v, N, M) => {
      const F = (a.component = Va(a, p, v));
      if ((Zn(a) && (F.ctx.renderer = we), Ua(F), F.asyncDep)) {
        if ((v && v.registerDep(F, J), !a.el)) {
          const A = (F.subTree = se(Be));
          C(null, A, i, f);
        }
        return;
      }
      J(F, a, i, f, v, N, M);
    },
    ue = (a, i, f) => {
      const p = (i.component = a.component);
      if (Ji(a, i, f))
        if (p.asyncDep && !p.asyncResolved) {
          ee(p, i, f);
          return;
        } else (p.next = i), Ki(p.update), p.update();
      else (i.el = a.el), (p.vnode = i);
    },
    J = (a, i, f, p, v, N, M) => {
      const F = () => {
          if (a.isMounted) {
            let { next: L, bu: R, u: x, parent: W, vnode: X } = a,
              Q = L,
              re;
            At(a, !1),
              L ? ((L.el = X.el), ee(a, L, M)) : (L = X),
              R && an(R),
              (re = L.props && L.props.onVnodeBeforeUpdate) && Ue(re, W, L, X),
              At(a, !0);
            const le = lr(a),
              Ge = a.subTree;
            (a.subTree = le),
              w(Ge, le, E(Ge.el), $e(Ge), a, v, N),
              (L.el = le.el),
              Q === null && Qi(a, le.el),
              x && ve(x, v),
              (re = L.props && L.props.onVnodeUpdated) &&
                ve(() => Ue(re, W, L, X), v);
          } else {
            let L;
            const { el: R, props: x } = i,
              { bm: W, m: X, parent: Q } = a,
              re = Gt(i);
            if (
              (At(a, !1),
              W && an(W),
              !re && (L = x && x.onVnodeBeforeMount) && Ue(L, Q, i),
              At(a, !0),
              R && et)
            ) {
              const le = () => {
                (a.subTree = lr(a)), et(R, a.subTree, a, v, null);
              };
              re
                ? i.type.__asyncLoader().then(() => !a.isUnmounted && le())
                : le();
            } else {
              const le = (a.subTree = lr(a));
              w(null, le, f, p, a, v, N), (i.el = le.el);
            }
            if ((X && ve(X, v), !re && (L = x && x.onVnodeMounted))) {
              const le = i;
              ve(() => Ue(L, Q, le), v);
            }
            (i.shapeFlag & 256 ||
              (Q && Gt(Q.vnode) && Q.vnode.shapeFlag & 256)) &&
              a.a &&
              ve(a.a, v),
              (a.isMounted = !0),
              (i = f = p = null);
          }
        },
        A = (a.effect = new jr(F, () => Kl(_), a.scope)),
        _ = (a.update = () => A.run());
      (_.id = a.uid), At(a, !0), _();
    },
    ee = (a, i, f) => {
      i.component = a;
      const p = a.vnode.props;
      (a.vnode = i),
        (a.next = null),
        ya(a, i.props, p, f),
        Na(a, i.children, f),
        en(),
        Xn(void 0, a.update),
        tn();
    },
    ye = (a, i, f, p, v, N, M, F, A = !1) => {
      const _ = a && a.children,
        L = a ? a.shapeFlag : 0,
        R = i.children,
        { patchFlag: x, shapeFlag: W } = i;
      if (x > 0) {
        if (x & 128) {
          Ye(_, R, f, p, v, N, M, F, A);
          return;
        } else if (x & 256) {
          it(_, R, f, p, v, N, M, F, A);
          return;
        }
      }
      W & 8
        ? (L & 16 && Ne(_, v, N), R !== _ && h(f, R))
        : L & 16
        ? W & 16
          ? Ye(_, R, f, p, v, N, M, F, A)
          : Ne(_, v, N, !0)
        : (L & 8 && h(f, ""), W & 16 && V(R, f, p, v, N, M, F, A));
    },
    it = (a, i, f, p, v, N, M, F, A) => {
      (a = a || Bt), (i = i || Bt);
      const _ = a.length,
        L = i.length,
        R = Math.min(_, L);
      let x;
      for (x = 0; x < R; x++) {
        const W = (i[x] = A ? Et(i[x]) : st(i[x]));
        w(a[x], W, f, null, v, N, M, F, A);
      }
      _ > L ? Ne(a, v, N, !0, !1, R) : V(i, f, p, v, N, M, F, A, R);
    },
    Ye = (a, i, f, p, v, N, M, F, A) => {
      let _ = 0;
      const L = i.length;
      let R = a.length - 1,
        x = L - 1;
      for (; _ <= R && _ <= x; ) {
        const W = a[_],
          X = (i[_] = A ? Et(i[_]) : st(i[_]));
        if (Ot(W, X)) w(W, X, f, null, v, N, M, F, A);
        else break;
        _++;
      }
      for (; _ <= R && _ <= x; ) {
        const W = a[R],
          X = (i[x] = A ? Et(i[x]) : st(i[x]));
        if (Ot(W, X)) w(W, X, f, null, v, N, M, F, A);
        else break;
        R--, x--;
      }
      if (_ > R) {
        if (_ <= x) {
          const W = x + 1,
            X = W < L ? i[W].el : p;
          for (; _ <= x; )
            w(null, (i[_] = A ? Et(i[_]) : st(i[_])), f, X, v, N, M, F, A), _++;
        }
      } else if (_ > x) for (; _ <= R; ) Se(a[_], v, N, !0), _++;
      else {
        const W = _,
          X = _,
          Q = new Map();
        for (_ = X; _ <= x; _++) {
          const De = (i[_] = A ? Et(i[_]) : st(i[_]));
          De.key != null && Q.set(De.key, _);
        }
        let re,
          le = 0;
        const Ge = x - X + 1;
        let Ht = !1,
          ds = 0;
        const nn = new Array(Ge);
        for (_ = 0; _ < Ge; _++) nn[_] = 0;
        for (_ = W; _ <= R; _++) {
          const De = a[_];
          if (le >= Ge) {
            Se(De, v, N, !0);
            continue;
          }
          let tt;
          if (De.key != null) tt = Q.get(De.key);
          else
            for (re = X; re <= x; re++)
              if (nn[re - X] === 0 && Ot(De, i[re])) {
                tt = re;
                break;
              }
          tt === void 0
            ? Se(De, v, N, !0)
            : ((nn[tt - X] = _ + 1),
              tt >= ds ? (ds = tt) : (Ht = !0),
              w(De, i[tt], f, null, v, N, M, F, A),
              le++);
        }
        const _s = Ht ? Oa(nn) : Bt;
        for (re = _s.length - 1, _ = Ge - 1; _ >= 0; _--) {
          const De = X + _,
            tt = i[De],
            ms = De + 1 < L ? i[De + 1].el : p;
          nn[_] === 0
            ? w(null, tt, f, ms, v, N, M, F, A)
            : Ht && (re < 0 || _ !== _s[re] ? He(tt, f, ms, 2) : re--);
        }
      }
    },
    He = (a, i, f, p, v = null) => {
      const { el: N, type: M, transition: F, children: A, shapeFlag: _ } = a;
      if (_ & 6) {
        He(a.component.subTree, i, f, p);
        return;
      }
      if (_ & 128) {
        a.suspense.move(i, f, p);
        return;
      }
      if (_ & 64) {
        M.move(a, i, f, we);
        return;
      }
      if (M === ce) {
        r(N, i, f);
        for (let R = 0; R < A.length; R++) He(A[R], i, f, p);
        r(a.anchor, i, f);
        return;
      }
      if (M === Mn) {
        g(a, i, f);
        return;
      }
      if (p !== 2 && _ & 1 && F)
        if (p === 0) F.beforeEnter(N), r(N, i, f), ve(() => F.enter(N), v);
        else {
          const { leave: R, delayLeave: x, afterLeave: W } = F,
            X = () => r(N, i, f),
            Q = () => {
              R(N, () => {
                X(), W && W();
              });
            };
          x ? x(N, X, Q) : Q();
        }
      else r(N, i, f);
    },
    Se = (a, i, f, p = !1, v = !1) => {
      const {
        type: N,
        props: M,
        ref: F,
        children: A,
        dynamicChildren: _,
        shapeFlag: L,
        patchFlag: R,
        dirs: x,
      } = a;
      if ((F != null && yr(F, null, f, a, !0), L & 256)) {
        i.ctx.deactivate(a);
        return;
      }
      const W = L & 1 && x,
        X = !Gt(a);
      let Q;
      if ((X && (Q = M && M.onVnodeBeforeUnmount) && Ue(Q, i, a), L & 6))
        wt(a.component, f, p);
      else {
        if (L & 128) {
          a.suspense.unmount(f, p);
          return;
        }
        W && kt(a, null, i, "beforeUnmount"),
          L & 64
            ? a.type.remove(a, i, f, v, we, p)
            : _ && (N !== ce || (R > 0 && R & 64))
            ? Ne(_, i, f, !1, !0)
            : ((N === ce && R & 384) || (!v && L & 16)) && Ne(A, i, f),
          p && at(a);
      }
      ((X && (Q = M && M.onVnodeUnmounted)) || W) &&
        ve(() => {
          Q && Ue(Q, i, a), W && kt(a, null, i, "unmounted");
        }, f);
    },
    at = (a) => {
      const { type: i, el: f, anchor: p, transition: v } = a;
      if (i === ce) {
        Nt(f, p);
        return;
      }
      if (i === Mn) {
        y(a);
        return;
      }
      const N = () => {
        l(f), v && !v.persisted && v.afterLeave && v.afterLeave();
      };
      if (a.shapeFlag & 1 && v && !v.persisted) {
        const { leave: M, delayLeave: F } = v,
          A = () => M(f, N);
        F ? F(a.el, N, A) : A();
      } else N();
    },
    Nt = (a, i) => {
      let f;
      for (; a !== i; ) (f = b(a)), l(a), (a = f);
      l(i);
    },
    wt = (a, i, f) => {
      const { bum: p, scope: v, update: N, subTree: M, um: F } = a;
      p && an(p),
        v.stop(),
        N && ((N.active = !1), Se(M, a, i, f)),
        F && ve(F, i),
        ve(() => {
          a.isUnmounted = !0;
        }, i),
        i &&
          i.pendingBranch &&
          !i.isUnmounted &&
          a.asyncDep &&
          !a.asyncResolved &&
          a.suspenseId === i.pendingId &&
          (i.deps--, i.deps === 0 && i.resolve());
    },
    Ne = (a, i, f, p = !1, v = !1, N = 0) => {
      for (let M = N; M < a.length; M++) Se(a[M], i, f, p, v);
    },
    $e = (a) =>
      a.shapeFlag & 6
        ? $e(a.component.subTree)
        : a.shapeFlag & 128
        ? a.suspense.next()
        : b(a.anchor || a.el),
    ze = (a, i, f) => {
      a == null
        ? i._vnode && Se(i._vnode, null, null, !0)
        : w(i._vnode || null, a, i, null, null, null, f),
        Gl(),
        (i._vnode = a);
    },
    we = {
      p: w,
      um: Se,
      m: He,
      r: at,
      mt: ot,
      mc: V,
      pc: ye,
      pbc: q,
      n: $e,
      o: e,
    };
  let Xe, et;
  return (
    t && ([Xe, et] = t(we)), { render: ze, hydrate: Xe, createApp: ka(ze, Xe) }
  );
}
function At({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function bo(e, t, n = !1) {
  const r = e.children,
    l = t.children;
  if (B(r) && B(l))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let u = l[s];
      u.shapeFlag & 1 &&
        !u.dynamicChildren &&
        ((u.patchFlag <= 0 || u.patchFlag === 32) &&
          ((u = l[s] = Et(l[s])), (u.el = o.el)),
        n || bo(o, u));
    }
}
function Oa(e) {
  const t = e.slice(),
    n = [0];
  let r, l, s, o, u;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const d = e[r];
    if (d !== 0) {
      if (((l = n[n.length - 1]), e[l] < d)) {
        (t[r] = l), n.push(r);
        continue;
      }
      for (s = 0, o = n.length - 1; s < o; )
        (u = (s + o) >> 1), e[n[u]] < d ? (s = u + 1) : (o = u);
      d < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r));
    }
  }
  for (s = n.length, o = n[s - 1]; s-- > 0; ) (n[s] = o), (o = t[o]);
  return n;
}
const Pa = (e) => e.__isTeleport,
  ce = Symbol(void 0),
  Qn = Symbol(void 0),
  Be = Symbol(void 0),
  Mn = Symbol(void 0),
  fn = [];
let Je = null;
function U(e = !1) {
  fn.push((Je = e ? null : []));
}
function Ma() {
  fn.pop(), (Je = fn[fn.length - 1] || null);
}
let En = 1;
function Ps(e) {
  En += e;
}
function Eo(e) {
  return (
    (e.dynamicChildren = En > 0 ? Je || Bt : null),
    Ma(),
    En > 0 && Je && Je.push(e),
    e
  );
}
function G(e, t, n, r, l, s) {
  return Eo($(e, t, n, r, l, s, !0));
}
function Te(e, t, n, r, l) {
  return Eo(se(e, t, n, r, l, !0));
}
function Cn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ot(e, t) {
  return e.type === t.type && e.key === t.key;
}
const zn = "__vInternal",
  Co = ({ key: e }) => (e != null ? e : null),
  Sn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? ge(e) || Ee(e) || Y(e)
        ? { i: Me, r: e, k: t, f: !!n }
        : e
      : null;
function $(
  e,
  t = null,
  n = null,
  r = 0,
  l = null,
  s = e === ce ? 0 : 1,
  o = !1,
  u = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Co(t),
    ref: t && Sn(t),
    scopeId: Jl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: l,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    u
      ? (zr(c, n), s & 128 && e.normalize(c))
      : n && (c.shapeFlag |= ge(n) ? 8 : 16),
    En > 0 &&
      !o &&
      Je &&
      (c.patchFlag > 0 || s & 6) &&
      c.patchFlag !== 32 &&
      Je.push(c),
    c
  );
}
const se = Sa;
function Sa(e, t = null, n = null, r = 0, l = null, s = !1) {
  if (((!e || e === ha) && (e = Be), Cn(e))) {
    const u = mt(e, t, !0);
    return (
      n && zr(u, n),
      En > 0 &&
        !s &&
        Je &&
        (u.shapeFlag & 6 ? (Je[Je.indexOf(e)] = u) : Je.push(u)),
      (u.patchFlag |= -2),
      u
    );
  }
  if ((Ka(e) && (e = e.__vccOpts), t)) {
    t = Da(t);
    let { class: u, style: c } = t;
    u && !ge(u) && (t.class = yn(u)),
      be(c) && (Hl(c) && !B(c) && (c = Ie({}, c)), (t.style = xr(c)));
  }
  const o = ge(e) ? 1 : Ql(e) ? 128 : Pa(e) ? 64 : be(e) ? 4 : Y(e) ? 2 : 0;
  return $(e, t, n, r, l, o, s, !0);
}
function Da(e) {
  return e ? (Hl(e) || zn in e ? Ie({}, e) : e) : null;
}
function mt(e, t, n = !1) {
  const { props: r, ref: l, patchFlag: s, children: o } = e,
    u = t ? xa(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Co(u),
    ref:
      t && t.ref ? (n && l ? (B(l) ? l.concat(Sn(t)) : [l, Sn(t)]) : Sn(t)) : l,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ce ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && mt(e.ssContent),
    ssFallback: e.ssFallback && mt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Ra(e = " ", t = 0) {
  return se(Qn, null, e, t);
}
function vo(e, t) {
  const n = se(Mn, null, e);
  return (n.staticCount = t), n;
}
function dn(e = "", t = !1) {
  return t ? (U(), Te(Be, null, e)) : se(Be, null, e);
}
function st(e) {
  return e == null || typeof e == "boolean"
    ? se(Be)
    : B(e)
    ? se(ce, null, e.slice())
    : typeof e == "object"
    ? Et(e)
    : se(Qn, null, String(e));
}
function Et(e) {
  return e.el === null || e.memo ? e : mt(e);
}
function zr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (B(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const l = t.default;
      l && (l._c && (l._d = !1), zr(e, l()), l._c && (l._d = !0));
      return;
    } else {
      n = 32;
      const l = t._;
      !l && !(zn in t)
        ? (t._ctx = Me)
        : l === 3 &&
          Me &&
          (Me.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    Y(t)
      ? ((t = { default: t, _ctx: Me }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Ra(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function xa(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const l in r)
      if (l === "class")
        t.class !== r.class && (t.class = yn([t.class, r.class]));
      else if (l === "style") t.style = xr([t.style, r.style]);
      else if (Wn(l)) {
        const s = t[l],
          o = r[l];
        o &&
          s !== o &&
          !(B(s) && s.includes(o)) &&
          (t[l] = s ? [].concat(s, o) : o);
      } else l !== "" && (t[l] = r[l]);
  }
  return t;
}
function Ue(e, t, n, r = null) {
  je(e, t, 7, [n, r]);
}
const Ha = go();
let $a = 0;
function Va(e, t, n) {
  const r = e.type,
    l = (t ? t.appContext : e.appContext) || Ha,
    s = {
      uid: $a++,
      vnode: e,
      type: r,
      parent: t,
      appContext: l,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Nl(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(l.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: _o(r, l),
      emitsOptions: ql(r, l),
      emit: null,
      emitted: null,
      propsDefaults: oe,
      inheritAttrs: r.inheritAttrs,
      ctx: oe,
      data: oe,
      props: oe,
      attrs: oe,
      slots: oe,
      refs: oe,
      setupState: oe,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (s.ctx = { _: s }),
    (s.root = t ? t.root : s),
    (s.emit = Gi.bind(null, s)),
    e.ce && e.ce(s),
    s
  );
}
let Le = null;
const Rt = () => Le || Me,
  Jt = (e) => {
    (Le = e), e.scope.on();
  },
  Dt = () => {
    Le && Le.scope.off(), (Le = null);
  };
function Lo(e) {
  return e.vnode.shapeFlag & 4;
}
let vn = !1;
function Ua(e, t = !1) {
  vn = t;
  const { props: n, children: r } = e.vnode,
    l = Lo(e);
  La(e, n, l, t), Ia(e, r);
  const s = l ? Wa(e, t) : void 0;
  return (vn = !1), s;
}
function Wa(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = $l(new Proxy(e.ctx, pa)));
  const { setup: r } = n;
  if (r) {
    const l = (e.setupContext = r.length > 1 ? Ba(e) : null);
    Jt(e), en();
    const s = vt(r, e, 0, [e.props, l]);
    if ((tn(), Dt(), Ll(s))) {
      if ((s.then(Dt, Dt), t))
        return s
          .then((o) => {
            Ms(e, o, t);
          })
          .catch((o) => {
            Yn(o, e, 0);
          });
      e.asyncDep = s;
    } else Ms(e, s, t);
  } else yo(e, t);
}
function Ms(e, t, n) {
  Y(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : be(t) && (e.setupState = jl(t)),
    yo(e, n);
}
let Ss;
function yo(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Ss && !r.render) {
      const l = r.template;
      if (l) {
        const { isCustomElement: s, compilerOptions: o } = e.appContext.config,
          { delimiters: u, compilerOptions: c } = r,
          d = Ie(Ie({ isCustomElement: s, delimiters: u }, o), c);
        r.render = Ss(l, d);
      }
    }
    e.render = r.render || Qe;
  }
  Jt(e), en(), ga(e), tn(), Dt();
}
function ja(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return xe(e, "get", "$attrs"), t[n];
    },
  });
}
function Ba(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = ja(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function es(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(jl($l(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in $n) return $n[n](e);
        },
      }))
    );
}
function Ds(e, t = !0) {
  return Y(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ka(e) {
  return Y(e) && "__vccOpts" in e;
}
const qe = (e, t) => Ui(e, t, vn);
function To(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? be(t) && !B(t)
      ? Cn(t)
        ? se(e, null, [t])
        : se(e, t)
      : se(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Cn(n) && (n = [n]),
      se(e, t, n));
}
const Ya = "3.2.37",
  Xa = "http://www.w3.org/2000/svg",
  Pt = typeof document < "u" ? document : null,
  Rs = Pt && Pt.createElement("template"),
  Ga = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const l = t
        ? Pt.createElementNS(Xa, e)
        : Pt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          l.setAttribute("multiple", r.multiple),
        l
      );
    },
    createText: (e) => Pt.createTextNode(e),
    createComment: (e) => Pt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Pt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, n, r, l, s) {
      const o = n ? n.previousSibling : t.lastChild;
      if (l && (l === s || l.nextSibling))
        for (
          ;
          t.insertBefore(l.cloneNode(!0), n),
            !(l === s || !(l = l.nextSibling));

        );
      else {
        Rs.innerHTML = r ? `<svg>${e}</svg>` : e;
        const u = Rs.content;
        if (r) {
          const c = u.firstChild;
          for (; c.firstChild; ) u.appendChild(c.firstChild);
          u.removeChild(c);
        }
        t.insertBefore(u, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Za(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function qa(e, t, n) {
  const r = e.style,
    l = ge(n);
  if (n && !l) {
    for (const s in n) Tr(r, s, n[s]);
    if (t && !ge(t)) for (const s in t) n[s] == null && Tr(r, s, "");
  } else {
    const s = r.display;
    l ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = s);
  }
}
const xs = /\s*!important$/;
function Tr(e, t, n) {
  if (B(n)) n.forEach((r) => Tr(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Ja(e, t);
    xs.test(n)
      ? e.setProperty(zt(r), n.replace(xs, ""), "important")
      : (e[r] = n);
  }
}
const Hs = ["Webkit", "Moz", "ms"],
  ur = {};
function Ja(e, t) {
  const n = ur[t];
  if (n) return n;
  let r = Zt(t);
  if (r !== "filter" && r in e) return (ur[t] = r);
  r = Il(r);
  for (let l = 0; l < Hs.length; l++) {
    const s = Hs[l] + r;
    if (s in e) return (ur[t] = s);
  }
  return t;
}
const $s = "http://www.w3.org/1999/xlink";
function Qa(e, t, n, r, l) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS($s, t.slice(6, t.length))
      : e.setAttributeNS($s, t, n);
  else {
    const s = Jo(t);
    n == null || (s && !El(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? "" : n);
  }
}
function za(e, t, n, r, l, s, o) {
  if (t === "innerHTML" || t === "textContent") {
    r && o(r, l, s), (e[t] = n == null ? "" : n);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const c = n == null ? "" : n;
    (e.value !== c || e.tagName === "OPTION") && (e.value = c),
      n == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = El(n))
      : n == null && c === "string"
      ? ((n = ""), (u = !0))
      : c === "number" && ((n = 0), (u = !0));
  }
  try {
    e[t] = n;
  } catch {}
  u && e.removeAttribute(t);
}
const [Io, eu] = (() => {
  let e = Date.now,
    t = !1;
  if (typeof window < "u") {
    Date.now() > document.createEvent("Event").timeStamp &&
      (e = performance.now.bind(performance));
    const n = navigator.userAgent.match(/firefox\/(\d+)/i);
    t = !!(n && Number(n[1]) <= 53);
  }
  return [e, t];
})();
let Ir = 0;
const tu = Promise.resolve(),
  nu = () => {
    Ir = 0;
  },
  ru = () => Ir || (tu.then(nu), (Ir = Io()));
function su(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function lu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function ou(e, t, n, r, l = null) {
  const s = e._vei || (e._vei = {}),
    o = s[t];
  if (r && o) o.value = r;
  else {
    const [u, c] = iu(t);
    if (r) {
      const d = (s[t] = au(r, l));
      su(e, u, d, c);
    } else o && (lu(e, u, o, c), (s[t] = void 0));
  }
}
const Vs = /(?:Once|Passive|Capture)$/;
function iu(e) {
  let t;
  if (Vs.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(Vs)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [zt(e.slice(2)), t];
}
function au(e, t) {
  const n = (r) => {
    const l = r.timeStamp || Io();
    (eu || l >= n.attached - 1) && je(uu(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = ru()), n;
}
function uu(e, t) {
  if (B(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (l) => !l._stopped && r && r(l))
    );
  } else return t;
}
const Us = /^on[a-z]/,
  cu = (e, t, n, r, l = !1, s, o, u, c) => {
    t === "class"
      ? Za(e, r, l)
      : t === "style"
      ? qa(e, n, r)
      : Wn(t)
      ? Hr(t) || ou(e, t, n, r, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : fu(e, t, r, l)
        )
      ? za(e, t, r, s, o, u, c)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Qa(e, t, r, l));
  };
function fu(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Us.test(t) && Y(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Us.test(t) && ge(n))
    ? !1
    : t in e;
}
const du = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
ra.props;
const _u = Ie({ patchProp: cu }, Ga);
let Ws;
function mu() {
  return Ws || (Ws = Aa(_u));
}
const hu = (...e) => {
  const t = mu().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const l = pu(r);
      if (!l) return;
      const s = t._component;
      !Y(s) && !s.render && !s.template && (s.template = l.innerHTML),
        (l.innerHTML = "");
      const o = n(l, !1, l instanceof SVGElement);
      return (
        l instanceof Element &&
          (l.removeAttribute("v-cloak"), l.setAttribute("data-v-app", "")),
        o
      );
    }),
    t
  );
};
function pu(e) {
  return ge(e) ? document.querySelector(e) : e;
}
/*!
 * shared v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const Nr = typeof window < "u",
  gu = typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
  Tt = (e) => (gu ? Symbol(e) : e),
  bu = (e, t, n) => Eu({ l: e, k: t, s: n }),
  Eu = (e) =>
    JSON.stringify(e)
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")
      .replace(/\u0027/g, "\\u0027"),
  he = (e) => typeof e == "number" && isFinite(e),
  Cu = (e) => ns(e) === "[object Date]",
  yt = (e) => ns(e) === "[object RegExp]",
  er = (e) => j(e) && Object.keys(e).length === 0;
function vu(e, t) {
  typeof console < "u" &&
    (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Ce = Object.assign;
let js;
const _n = () =>
  js ||
  (js =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function Bs(e) {
  return e
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
const Lu = Object.prototype.hasOwnProperty;
function ts(e, t) {
  return Lu.call(e, t);
}
const ie = Array.isArray,
  _e = (e) => typeof e == "function",
  D = (e) => typeof e == "string",
  Z = (e) => typeof e == "boolean",
  ae = (e) => e !== null && typeof e == "object",
  No = Object.prototype.toString,
  ns = (e) => No.call(e),
  j = (e) => ns(e) === "[object Object]",
  yu = (e) =>
    e == null
      ? ""
      : ie(e) || (j(e) && e.toString === No)
      ? JSON.stringify(e, null, 2)
      : String(e);
/*!
 * message-compiler v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const te = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  __EXTEND_POINT__: 15,
};
function tr(e, t, n = {}) {
  const { domain: r, messages: l, args: s } = n,
    o = e,
    u = new SyntaxError(String(o));
  return (u.code = e), t && (u.location = t), (u.domain = r), u;
}
function Tu(e) {
  throw e;
}
function Iu(e, t, n) {
  return { line: e, column: t, offset: n };
}
function wr(e, t, n) {
  const r = { start: e, end: t };
  return n != null && (r.source = n), r;
}
const ut = " ",
  Nu = "\r",
  Ae = `
`,
  wu = String.fromCharCode(8232),
  ku = String.fromCharCode(8233);
function Au(e) {
  const t = e;
  let n = 0,
    r = 1,
    l = 1,
    s = 0;
  const o = (S) => t[S] === Nu && t[S + 1] === Ae,
    u = (S) => t[S] === Ae,
    c = (S) => t[S] === ku,
    d = (S) => t[S] === wu,
    h = (S) => o(S) || u(S) || c(S) || d(S),
    E = () => n,
    b = () => r,
    I = () => l,
    O = () => s,
    k = (S) => (o(S) || c(S) || d(S) ? Ae : t[S]),
    w = () => k(n),
    m = () => k(n + s);
  function C() {
    return (s = 0), h(n) && (r++, (l = 0)), o(n) && n++, n++, l++, t[n];
  }
  function T() {
    return o(n + s) && s++, s++, t[n + s];
  }
  function g() {
    (n = 0), (r = 1), (l = 1), (s = 0);
  }
  function y(S = 0) {
    s = S;
  }
  function P() {
    const S = n + s;
    for (; S !== n; ) C();
    s = 0;
  }
  return {
    index: E,
    line: b,
    column: I,
    peekOffset: O,
    charAt: k,
    currentChar: w,
    currentPeek: m,
    next: C,
    peek: T,
    reset: g,
    resetPeek: y,
    skipToPeek: P,
  };
}
const gt = void 0,
  Ks = "'",
  Fu = "tokenizer";
function Ou(e, t = {}) {
  const n = t.location !== !1,
    r = Au(e),
    l = () => r.index(),
    s = () => Iu(r.line(), r.column(), r.index()),
    o = s(),
    u = l(),
    c = {
      currentType: 14,
      offset: u,
      startLoc: o,
      endLoc: o,
      lastType: 14,
      lastOffset: u,
      lastStartLoc: o,
      lastEndLoc: o,
      braceNest: 0,
      inLinked: !1,
      text: "",
    },
    d = () => c,
    { onError: h } = t;
  function E(a, i, f, ...p) {
    const v = d();
    if (((i.column += f), (i.offset += f), h)) {
      const N = wr(v.startLoc, i),
        M = tr(a, N, { domain: Fu, args: p });
      h(M);
    }
  }
  function b(a, i, f) {
    (a.endLoc = s()), (a.currentType = i);
    const p = { type: i };
    return (
      n && (p.loc = wr(a.startLoc, a.endLoc)), f != null && (p.value = f), p
    );
  }
  const I = (a) => b(a, 14);
  function O(a, i) {
    return a.currentChar() === i
      ? (a.next(), i)
      : (E(te.EXPECTED_TOKEN, s(), 0, i), "");
  }
  function k(a) {
    let i = "";
    for (; a.currentPeek() === ut || a.currentPeek() === Ae; )
      (i += a.currentPeek()), a.peek();
    return i;
  }
  function w(a) {
    const i = k(a);
    return a.skipToPeek(), i;
  }
  function m(a) {
    if (a === gt) return !1;
    const i = a.charCodeAt(0);
    return (i >= 97 && i <= 122) || (i >= 65 && i <= 90) || i === 95;
  }
  function C(a) {
    if (a === gt) return !1;
    const i = a.charCodeAt(0);
    return i >= 48 && i <= 57;
  }
  function T(a, i) {
    const { currentType: f } = i;
    if (f !== 2) return !1;
    k(a);
    const p = m(a.currentPeek());
    return a.resetPeek(), p;
  }
  function g(a, i) {
    const { currentType: f } = i;
    if (f !== 2) return !1;
    k(a);
    const p = a.currentPeek() === "-" ? a.peek() : a.currentPeek(),
      v = C(p);
    return a.resetPeek(), v;
  }
  function y(a, i) {
    const { currentType: f } = i;
    if (f !== 2) return !1;
    k(a);
    const p = a.currentPeek() === Ks;
    return a.resetPeek(), p;
  }
  function P(a, i) {
    const { currentType: f } = i;
    if (f !== 8) return !1;
    k(a);
    const p = a.currentPeek() === ".";
    return a.resetPeek(), p;
  }
  function S(a, i) {
    const { currentType: f } = i;
    if (f !== 9) return !1;
    k(a);
    const p = m(a.currentPeek());
    return a.resetPeek(), p;
  }
  function H(a, i) {
    const { currentType: f } = i;
    if (!(f === 8 || f === 12)) return !1;
    k(a);
    const p = a.currentPeek() === ":";
    return a.resetPeek(), p;
  }
  function V(a, i) {
    const { currentType: f } = i;
    if (f !== 10) return !1;
    const p = () => {
        const N = a.currentPeek();
        return N === "{"
          ? m(a.peek())
          : N === "@" ||
            N === "%" ||
            N === "|" ||
            N === ":" ||
            N === "." ||
            N === ut ||
            !N
          ? !1
          : N === Ae
          ? (a.peek(), p())
          : m(N);
      },
      v = p();
    return a.resetPeek(), v;
  }
  function K(a) {
    k(a);
    const i = a.currentPeek() === "|";
    return a.resetPeek(), i;
  }
  function q(a) {
    const i = k(a),
      f = a.currentPeek() === "%" && a.peek() === "{";
    return a.resetPeek(), { isModulo: f, hasSpace: i.length > 0 };
  }
  function fe(a, i = !0) {
    const f = (v = !1, N = "", M = !1) => {
        const F = a.currentPeek();
        return F === "{"
          ? N === "%"
            ? !1
            : v
          : F === "@" || !F
          ? N === "%"
            ? !0
            : v
          : F === "%"
          ? (a.peek(), f(v, "%", !0))
          : F === "|"
          ? N === "%" || M
            ? !0
            : !(N === ut || N === Ae)
          : F === ut
          ? (a.peek(), f(!0, ut, M))
          : F === Ae
          ? (a.peek(), f(!0, Ae, M))
          : !0;
      },
      p = f();
    return i && a.resetPeek(), p;
  }
  function de(a, i) {
    const f = a.currentChar();
    return f === gt ? gt : i(f) ? (a.next(), f) : null;
  }
  function Ke(a) {
    return de(a, (f) => {
      const p = f.charCodeAt(0);
      return (
        (p >= 97 && p <= 122) ||
        (p >= 65 && p <= 90) ||
        (p >= 48 && p <= 57) ||
        p === 95 ||
        p === 36
      );
    });
  }
  function ot(a) {
    return de(a, (f) => {
      const p = f.charCodeAt(0);
      return p >= 48 && p <= 57;
    });
  }
  function ue(a) {
    return de(a, (f) => {
      const p = f.charCodeAt(0);
      return (
        (p >= 48 && p <= 57) || (p >= 65 && p <= 70) || (p >= 97 && p <= 102)
      );
    });
  }
  function J(a) {
    let i = "",
      f = "";
    for (; (i = ot(a)); ) f += i;
    return f;
  }
  function ee(a) {
    w(a);
    const i = a.currentChar();
    return i !== "%" && E(te.EXPECTED_TOKEN, s(), 0, i), a.next(), "%";
  }
  function ye(a) {
    let i = "";
    for (;;) {
      const f = a.currentChar();
      if (f === "{" || f === "}" || f === "@" || f === "|" || !f) break;
      if (f === "%")
        if (fe(a)) (i += f), a.next();
        else break;
      else if (f === ut || f === Ae)
        if (fe(a)) (i += f), a.next();
        else {
          if (K(a)) break;
          (i += f), a.next();
        }
      else (i += f), a.next();
    }
    return i;
  }
  function it(a) {
    w(a);
    let i = "",
      f = "";
    for (; (i = Ke(a)); ) f += i;
    return (
      a.currentChar() === gt && E(te.UNTERMINATED_CLOSING_BRACE, s(), 0), f
    );
  }
  function Ye(a) {
    w(a);
    let i = "";
    return (
      a.currentChar() === "-" ? (a.next(), (i += `-${J(a)}`)) : (i += J(a)),
      a.currentChar() === gt && E(te.UNTERMINATED_CLOSING_BRACE, s(), 0),
      i
    );
  }
  function He(a) {
    w(a), O(a, "'");
    let i = "",
      f = "";
    const p = (N) => N !== Ks && N !== Ae;
    for (; (i = de(a, p)); ) i === "\\" ? (f += Se(a)) : (f += i);
    const v = a.currentChar();
    return v === Ae || v === gt
      ? (E(te.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, s(), 0),
        v === Ae && (a.next(), O(a, "'")),
        f)
      : (O(a, "'"), f);
  }
  function Se(a) {
    const i = a.currentChar();
    switch (i) {
      case "\\":
      case "'":
        return a.next(), `\\${i}`;
      case "u":
        return at(a, i, 4);
      case "U":
        return at(a, i, 6);
      default:
        return E(te.UNKNOWN_ESCAPE_SEQUENCE, s(), 0, i), "";
    }
  }
  function at(a, i, f) {
    O(a, i);
    let p = "";
    for (let v = 0; v < f; v++) {
      const N = ue(a);
      if (!N) {
        E(
          te.INVALID_UNICODE_ESCAPE_SEQUENCE,
          s(),
          0,
          `\\${i}${p}${a.currentChar()}`
        );
        break;
      }
      p += N;
    }
    return `\\${i}${p}`;
  }
  function Nt(a) {
    w(a);
    let i = "",
      f = "";
    const p = (v) => v !== "{" && v !== "}" && v !== ut && v !== Ae;
    for (; (i = de(a, p)); ) f += i;
    return f;
  }
  function wt(a) {
    let i = "",
      f = "";
    for (; (i = Ke(a)); ) f += i;
    return f;
  }
  function Ne(a) {
    const i = (f = !1, p) => {
      const v = a.currentChar();
      return v === "{" || v === "%" || v === "@" || v === "|" || !v || v === ut
        ? p
        : v === Ae
        ? ((p += v), a.next(), i(f, p))
        : ((p += v), a.next(), i(!0, p));
    };
    return i(!1, "");
  }
  function $e(a) {
    w(a);
    const i = O(a, "|");
    return w(a), i;
  }
  function ze(a, i) {
    let f = null;
    switch (a.currentChar()) {
      case "{":
        return (
          i.braceNest >= 1 && E(te.NOT_ALLOW_NEST_PLACEHOLDER, s(), 0),
          a.next(),
          (f = b(i, 2, "{")),
          w(a),
          i.braceNest++,
          f
        );
      case "}":
        return (
          i.braceNest > 0 &&
            i.currentType === 2 &&
            E(te.EMPTY_PLACEHOLDER, s(), 0),
          a.next(),
          (f = b(i, 3, "}")),
          i.braceNest--,
          i.braceNest > 0 && w(a),
          i.inLinked && i.braceNest === 0 && (i.inLinked = !1),
          f
        );
      case "@":
        return (
          i.braceNest > 0 && E(te.UNTERMINATED_CLOSING_BRACE, s(), 0),
          (f = we(a, i) || I(i)),
          (i.braceNest = 0),
          f
        );
      default:
        let v = !0,
          N = !0,
          M = !0;
        if (K(a))
          return (
            i.braceNest > 0 && E(te.UNTERMINATED_CLOSING_BRACE, s(), 0),
            (f = b(i, 1, $e(a))),
            (i.braceNest = 0),
            (i.inLinked = !1),
            f
          );
        if (
          i.braceNest > 0 &&
          (i.currentType === 5 || i.currentType === 6 || i.currentType === 7)
        )
          return (
            E(te.UNTERMINATED_CLOSING_BRACE, s(), 0),
            (i.braceNest = 0),
            Xe(a, i)
          );
        if ((v = T(a, i))) return (f = b(i, 5, it(a))), w(a), f;
        if ((N = g(a, i))) return (f = b(i, 6, Ye(a))), w(a), f;
        if ((M = y(a, i))) return (f = b(i, 7, He(a))), w(a), f;
        if (!v && !N && !M)
          return (
            (f = b(i, 13, Nt(a))),
            E(te.INVALID_TOKEN_IN_PLACEHOLDER, s(), 0, f.value),
            w(a),
            f
          );
        break;
    }
    return f;
  }
  function we(a, i) {
    const { currentType: f } = i;
    let p = null;
    const v = a.currentChar();
    switch (
      ((f === 8 || f === 9 || f === 12 || f === 10) &&
        (v === Ae || v === ut) &&
        E(te.INVALID_LINKED_FORMAT, s(), 0),
      v)
    ) {
      case "@":
        return a.next(), (p = b(i, 8, "@")), (i.inLinked = !0), p;
      case ".":
        return w(a), a.next(), b(i, 9, ".");
      case ":":
        return w(a), a.next(), b(i, 10, ":");
      default:
        return K(a)
          ? ((p = b(i, 1, $e(a))), (i.braceNest = 0), (i.inLinked = !1), p)
          : P(a, i) || H(a, i)
          ? (w(a), we(a, i))
          : S(a, i)
          ? (w(a), b(i, 12, wt(a)))
          : V(a, i)
          ? (w(a), v === "{" ? ze(a, i) || p : b(i, 11, Ne(a)))
          : (f === 8 && E(te.INVALID_LINKED_FORMAT, s(), 0),
            (i.braceNest = 0),
            (i.inLinked = !1),
            Xe(a, i));
    }
  }
  function Xe(a, i) {
    let f = { type: 14 };
    if (i.braceNest > 0) return ze(a, i) || I(i);
    if (i.inLinked) return we(a, i) || I(i);
    switch (a.currentChar()) {
      case "{":
        return ze(a, i) || I(i);
      case "}":
        return E(te.UNBALANCED_CLOSING_BRACE, s(), 0), a.next(), b(i, 3, "}");
      case "@":
        return we(a, i) || I(i);
      default:
        if (K(a))
          return (f = b(i, 1, $e(a))), (i.braceNest = 0), (i.inLinked = !1), f;
        const { isModulo: v, hasSpace: N } = q(a);
        if (v) return N ? b(i, 0, ye(a)) : b(i, 4, ee(a));
        if (fe(a)) return b(i, 0, ye(a));
        break;
    }
    return f;
  }
  function et() {
    const { currentType: a, offset: i, startLoc: f, endLoc: p } = c;
    return (
      (c.lastType = a),
      (c.lastOffset = i),
      (c.lastStartLoc = f),
      (c.lastEndLoc = p),
      (c.offset = l()),
      (c.startLoc = s()),
      r.currentChar() === gt ? b(c, 14) : Xe(r, c)
    );
  }
  return { nextToken: et, currentOffset: l, currentPosition: s, context: d };
}
const Pu = "parser",
  Mu = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Su(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "\uFFFD";
    }
  }
}
function Du(e = {}) {
  const t = e.location !== !1,
    { onError: n } = e;
  function r(m, C, T, g, ...y) {
    const P = m.currentPosition();
    if (((P.offset += g), (P.column += g), n)) {
      const S = wr(T, P),
        H = tr(C, S, { domain: Pu, args: y });
      n(H);
    }
  }
  function l(m, C, T) {
    const g = { type: m, start: C, end: C };
    return t && (g.loc = { start: T, end: T }), g;
  }
  function s(m, C, T, g) {
    (m.end = C), g && (m.type = g), t && m.loc && (m.loc.end = T);
  }
  function o(m, C) {
    const T = m.context(),
      g = l(3, T.offset, T.startLoc);
    return (g.value = C), s(g, m.currentOffset(), m.currentPosition()), g;
  }
  function u(m, C) {
    const T = m.context(),
      { lastOffset: g, lastStartLoc: y } = T,
      P = l(5, g, y);
    return (
      (P.index = parseInt(C, 10)),
      m.nextToken(),
      s(P, m.currentOffset(), m.currentPosition()),
      P
    );
  }
  function c(m, C) {
    const T = m.context(),
      { lastOffset: g, lastStartLoc: y } = T,
      P = l(4, g, y);
    return (
      (P.key = C),
      m.nextToken(),
      s(P, m.currentOffset(), m.currentPosition()),
      P
    );
  }
  function d(m, C) {
    const T = m.context(),
      { lastOffset: g, lastStartLoc: y } = T,
      P = l(9, g, y);
    return (
      (P.value = C.replace(Mu, Su)),
      m.nextToken(),
      s(P, m.currentOffset(), m.currentPosition()),
      P
    );
  }
  function h(m) {
    const C = m.nextToken(),
      T = m.context(),
      { lastOffset: g, lastStartLoc: y } = T,
      P = l(8, g, y);
    return C.type !== 12
      ? (r(m, te.UNEXPECTED_EMPTY_LINKED_MODIFIER, T.lastStartLoc, 0),
        (P.value = ""),
        s(P, g, y),
        { nextConsumeToken: C, node: P })
      : (C.value == null &&
          r(m, te.UNEXPECTED_LEXICAL_ANALYSIS, T.lastStartLoc, 0, nt(C)),
        (P.value = C.value || ""),
        s(P, m.currentOffset(), m.currentPosition()),
        { node: P });
  }
  function E(m, C) {
    const T = m.context(),
      g = l(7, T.offset, T.startLoc);
    return (g.value = C), s(g, m.currentOffset(), m.currentPosition()), g;
  }
  function b(m) {
    const C = m.context(),
      T = l(6, C.offset, C.startLoc);
    let g = m.nextToken();
    if (g.type === 9) {
      const y = h(m);
      (T.modifier = y.node), (g = y.nextConsumeToken || m.nextToken());
    }
    switch (
      (g.type !== 10 &&
        r(m, te.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, nt(g)),
      (g = m.nextToken()),
      g.type === 2 && (g = m.nextToken()),
      g.type)
    ) {
      case 11:
        g.value == null &&
          r(m, te.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, nt(g)),
          (T.key = E(m, g.value || ""));
        break;
      case 5:
        g.value == null &&
          r(m, te.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, nt(g)),
          (T.key = c(m, g.value || ""));
        break;
      case 6:
        g.value == null &&
          r(m, te.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, nt(g)),
          (T.key = u(m, g.value || ""));
        break;
      case 7:
        g.value == null &&
          r(m, te.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, nt(g)),
          (T.key = d(m, g.value || ""));
        break;
      default:
        r(m, te.UNEXPECTED_EMPTY_LINKED_KEY, C.lastStartLoc, 0);
        const y = m.context(),
          P = l(7, y.offset, y.startLoc);
        return (
          (P.value = ""),
          s(P, y.offset, y.startLoc),
          (T.key = P),
          s(T, y.offset, y.startLoc),
          { nextConsumeToken: g, node: T }
        );
    }
    return s(T, m.currentOffset(), m.currentPosition()), { node: T };
  }
  function I(m) {
    const C = m.context(),
      T = C.currentType === 1 ? m.currentOffset() : C.offset,
      g = C.currentType === 1 ? C.endLoc : C.startLoc,
      y = l(2, T, g);
    y.items = [];
    let P = null;
    do {
      const V = P || m.nextToken();
      switch (((P = null), V.type)) {
        case 0:
          V.value == null &&
            r(m, te.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, nt(V)),
            y.items.push(o(m, V.value || ""));
          break;
        case 6:
          V.value == null &&
            r(m, te.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, nt(V)),
            y.items.push(u(m, V.value || ""));
          break;
        case 5:
          V.value == null &&
            r(m, te.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, nt(V)),
            y.items.push(c(m, V.value || ""));
          break;
        case 7:
          V.value == null &&
            r(m, te.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, nt(V)),
            y.items.push(d(m, V.value || ""));
          break;
        case 8:
          const K = b(m);
          y.items.push(K.node), (P = K.nextConsumeToken || null);
          break;
      }
    } while (C.currentType !== 14 && C.currentType !== 1);
    const S = C.currentType === 1 ? C.lastOffset : m.currentOffset(),
      H = C.currentType === 1 ? C.lastEndLoc : m.currentPosition();
    return s(y, S, H), y;
  }
  function O(m, C, T, g) {
    const y = m.context();
    let P = g.items.length === 0;
    const S = l(1, C, T);
    (S.cases = []), S.cases.push(g);
    do {
      const H = I(m);
      P || (P = H.items.length === 0), S.cases.push(H);
    } while (y.currentType !== 14);
    return (
      P && r(m, te.MUST_HAVE_MESSAGES_IN_PLURAL, T, 0),
      s(S, m.currentOffset(), m.currentPosition()),
      S
    );
  }
  function k(m) {
    const C = m.context(),
      { offset: T, startLoc: g } = C,
      y = I(m);
    return C.currentType === 14 ? y : O(m, T, g, y);
  }
  function w(m) {
    const C = Ou(m, Ce({}, e)),
      T = C.context(),
      g = l(0, T.offset, T.startLoc);
    return (
      t && g.loc && (g.loc.source = m),
      (g.body = k(C)),
      T.currentType !== 14 &&
        r(
          C,
          te.UNEXPECTED_LEXICAL_ANALYSIS,
          T.lastStartLoc,
          0,
          m[T.offset] || ""
        ),
      s(g, C.currentOffset(), C.currentPosition()),
      g
    );
  }
  return { parse: w };
}
function nt(e) {
  if (e.type === 14) return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "\u2026" : t;
}
function Ru(e, t = {}) {
  const n = { ast: e, helpers: new Set() };
  return { context: () => n, helper: (s) => (n.helpers.add(s), s) };
}
function Ys(e, t) {
  for (let n = 0; n < e.length; n++) rs(e[n], t);
}
function rs(e, t) {
  switch (e.type) {
    case 1:
      Ys(e.cases, t), t.helper("plural");
      break;
    case 2:
      Ys(e.items, t);
      break;
    case 6:
      rs(e.key, t), t.helper("linked"), t.helper("type");
      break;
    case 5:
      t.helper("interpolate"), t.helper("list");
      break;
    case 4:
      t.helper("interpolate"), t.helper("named");
      break;
  }
}
function xu(e, t = {}) {
  const n = Ru(e);
  n.helper("normalize"), e.body && rs(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function Hu(e, t) {
  const { sourceMap: n, filename: r, breakLineCode: l, needIndent: s } = t,
    o = {
      source: e.loc.source,
      filename: r,
      code: "",
      column: 1,
      line: 1,
      offset: 0,
      map: void 0,
      breakLineCode: l,
      needIndent: s,
      indentLevel: 0,
    },
    u = () => o;
  function c(k, w) {
    o.code += k;
  }
  function d(k, w = !0) {
    const m = w ? l : "";
    c(s ? m + "  ".repeat(k) : m);
  }
  function h(k = !0) {
    const w = ++o.indentLevel;
    k && d(w);
  }
  function E(k = !0) {
    const w = --o.indentLevel;
    k && d(w);
  }
  function b() {
    d(o.indentLevel);
  }
  return {
    context: u,
    push: c,
    indent: h,
    deindent: E,
    newline: b,
    helper: (k) => `_${k}`,
    needIndent: () => o.needIndent,
  };
}
function $u(e, t) {
  const { helper: n } = e;
  e.push(`${n("linked")}(`),
    Qt(e, t.key),
    t.modifier
      ? (e.push(", "), Qt(e, t.modifier), e.push(", _type"))
      : e.push(", undefined, _type"),
    e.push(")");
}
function Vu(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n("normalize")}([`), e.indent(r());
  const l = t.items.length;
  for (let s = 0; s < l && (Qt(e, t.items[s]), s !== l - 1); s++) e.push(", ");
  e.deindent(r()), e.push("])");
}
function Uu(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n("plural")}([`), e.indent(r());
    const l = t.cases.length;
    for (let s = 0; s < l && (Qt(e, t.cases[s]), s !== l - 1); s++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function Wu(e, t) {
  t.body ? Qt(e, t.body) : e.push("null");
}
function Qt(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Wu(e, t);
      break;
    case 1:
      Uu(e, t);
      break;
    case 2:
      Vu(e, t);
      break;
    case 6:
      $u(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
  }
}
const ju = (e, t = {}) => {
  const n = D(t.mode) ? t.mode : "normal",
    r = D(t.filename) ? t.filename : "message.intl",
    l = !!t.sourceMap,
    s =
      t.breakLineCode != null
        ? t.breakLineCode
        : n === "arrow"
        ? ";"
        : `
`,
    o = t.needIndent ? t.needIndent : n !== "arrow",
    u = e.helpers || [],
    c = Hu(e, {
      mode: n,
      filename: r,
      sourceMap: l,
      breakLineCode: s,
      needIndent: o,
    });
  c.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"),
    c.indent(o),
    u.length > 0 &&
      (c.push(`const { ${u.map((E) => `${E}: _${E}`).join(", ")} } = ctx`),
      c.newline()),
    c.push("return "),
    Qt(c, e),
    c.deindent(o),
    c.push("}");
  const { code: d, map: h } = c.context();
  return { ast: e, code: d, map: h ? h.toJSON() : void 0 };
};
function Bu(e, t = {}) {
  const n = Ce({}, t),
    l = Du(n).parse(e);
  return xu(l, n), ju(l, n);
}
/*!
 * devtools-if v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const wo = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate",
};
/*!
 * core-base v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const It = [];
It[0] = { w: [0], i: [3, 0], ["["]: [4], o: [7] };
It[1] = { w: [1], ["."]: [2], ["["]: [4], o: [7] };
It[2] = { w: [2], i: [3, 0], [0]: [3, 0] };
It[3] = {
  i: [3, 0],
  [0]: [3, 0],
  w: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  o: [7, 1],
};
It[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [4, 2],
  ["]"]: [1, 3],
  o: 8,
  l: [4, 0],
};
It[5] = { ["'"]: [4, 0], o: 8, l: [5, 0] };
It[6] = { ['"']: [4, 0], o: 8, l: [6, 0] };
const Ku = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Yu(e) {
  return Ku.test(e);
}
function Xu(e) {
  const t = e.charCodeAt(0),
    n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Gu(e) {
  if (e == null) return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function Zu(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e))
    ? !1
    : Yu(t)
    ? Xu(t)
    : "*" + t;
}
function qu(e) {
  const t = [];
  let n = -1,
    r = 0,
    l = 0,
    s,
    o,
    u,
    c,
    d,
    h,
    E;
  const b = [];
  (b[0] = () => {
    o === void 0 ? (o = u) : (o += u);
  }),
    (b[1] = () => {
      o !== void 0 && (t.push(o), (o = void 0));
    }),
    (b[2] = () => {
      b[0](), l++;
    }),
    (b[3] = () => {
      if (l > 0) l--, (r = 4), b[0]();
      else {
        if (((l = 0), o === void 0 || ((o = Zu(o)), o === !1))) return !1;
        b[1]();
      }
    });
  function I() {
    const O = e[n + 1];
    if ((r === 5 && O === "'") || (r === 6 && O === '"'))
      return n++, (u = "\\" + O), b[0](), !0;
  }
  for (; r !== null; )
    if ((n++, (s = e[n]), !(s === "\\" && I()))) {
      if (
        ((c = Gu(s)),
        (E = It[r]),
        (d = E[c] || E.l || 8),
        d === 8 ||
          ((r = d[0]),
          d[1] !== void 0 && ((h = b[d[1]]), h && ((u = s), h() === !1))))
      )
        return;
      if (r === 7) return t;
    }
}
const Xs = new Map();
function Ju(e, t) {
  return ae(e) ? e[t] : null;
}
function Qu(e, t) {
  if (!ae(e)) return null;
  let n = Xs.get(t);
  if ((n || ((n = qu(t)), n && Xs.set(t, n)), !n)) return null;
  const r = n.length;
  let l = e,
    s = 0;
  for (; s < r; ) {
    const o = l[n[s]];
    if (o === void 0) return null;
    (l = o), s++;
  }
  return l;
}
const zu = (e) => e,
  ec = (e) => "",
  tc = "text",
  nc = (e) => (e.length === 0 ? "" : e.join("")),
  rc = yu;
function Gs(e, t) {
  return (
    (e = Math.abs(e)),
    t === 2 ? (e ? (e > 1 ? 1 : 0) : 1) : e ? Math.min(e, 2) : 0
  );
}
function sc(e) {
  const t = he(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (he(e.named.count) || he(e.named.n))
    ? he(e.named.count)
      ? e.named.count
      : he(e.named.n)
      ? e.named.n
      : t
    : t;
}
function lc(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function oc(e = {}) {
  const t = e.locale,
    n = sc(e),
    r =
      ae(e.pluralRules) && D(t) && _e(e.pluralRules[t]) ? e.pluralRules[t] : Gs,
    l = ae(e.pluralRules) && D(t) && _e(e.pluralRules[t]) ? Gs : void 0,
    s = (m) => m[r(n, m.length, l)],
    o = e.list || [],
    u = (m) => o[m],
    c = e.named || {};
  he(e.pluralIndex) && lc(n, c);
  const d = (m) => c[m];
  function h(m) {
    const C = _e(e.messages)
      ? e.messages(m)
      : ae(e.messages)
      ? e.messages[m]
      : !1;
    return C || (e.parent ? e.parent.message(m) : ec);
  }
  const E = (m) => (e.modifiers ? e.modifiers[m] : zu),
    b =
      j(e.processor) && _e(e.processor.normalize) ? e.processor.normalize : nc,
    I =
      j(e.processor) && _e(e.processor.interpolate)
        ? e.processor.interpolate
        : rc,
    O = j(e.processor) && D(e.processor.type) ? e.processor.type : tc,
    w = {
      list: u,
      named: d,
      plural: s,
      linked: (m, ...C) => {
        const [T, g] = C;
        let y = "text",
          P = "";
        C.length === 1
          ? ae(T)
            ? ((P = T.modifier || P), (y = T.type || y))
            : D(T) && (P = T || P)
          : C.length === 2 && (D(T) && (P = T || P), D(g) && (y = g || y));
        let S = h(m)(w);
        return y === "vnode" && ie(S) && P && (S = S[0]), P ? E(P)(S, y) : S;
      },
      message: h,
      type: O,
      interpolate: I,
      normalize: b,
    };
  return w;
}
let Ln = null;
function ic(e) {
  Ln = e;
}
function ac(e, t, n) {
  Ln &&
    Ln.emit(wo.I18nInit, {
      timestamp: Date.now(),
      i18n: e,
      version: t,
      meta: n,
    });
}
const uc = cc(wo.FunctionTranslate);
function cc(e) {
  return (t) => Ln && Ln.emit(e, t);
}
const fc = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  __EXTEND_POINT__: 7,
};
function dc(e, t, n) {
  return [
    ...new Set([n, ...(ie(t) ? t : ae(t) ? Object.keys(t) : D(t) ? [t] : [n])]),
  ];
}
function ko(e, t, n) {
  const r = D(n) ? n : In,
    l = e;
  l.__localeChainCache || (l.__localeChainCache = new Map());
  let s = l.__localeChainCache.get(r);
  if (!s) {
    s = [];
    let o = [n];
    for (; ie(o); ) o = Zs(s, o, t);
    const u = ie(t) || !j(t) ? t : t.default ? t.default : null;
    (o = D(u) ? [u] : u), ie(o) && Zs(s, o, !1), l.__localeChainCache.set(r, s);
  }
  return s;
}
function Zs(e, t, n) {
  let r = !0;
  for (let l = 0; l < t.length && Z(r); l++) {
    const s = t[l];
    D(s) && (r = _c(e, t[l], n));
  }
  return r;
}
function _c(e, t, n) {
  let r;
  const l = t.split("-");
  do {
    const s = l.join("-");
    (r = mc(e, s, n)), l.splice(-1, 1);
  } while (l.length && r === !0);
  return r;
}
function mc(e, t, n) {
  let r = !1;
  if (!e.includes(t) && ((r = !0), t)) {
    r = t[t.length - 1] !== "!";
    const l = t.replace(/!/g, "");
    e.push(l), (ie(n) || j(n)) && n[l] && (r = n[l]);
  }
  return r;
}
const hc = "9.2.2",
  nr = -1,
  In = "en-US",
  qs = "",
  Js = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function pc() {
  return {
    upper: (e, t) =>
      t === "text" && D(e)
        ? e.toUpperCase()
        : t === "vnode" && ae(e) && "__v_isVNode" in e
        ? e.children.toUpperCase()
        : e,
    lower: (e, t) =>
      t === "text" && D(e)
        ? e.toLowerCase()
        : t === "vnode" && ae(e) && "__v_isVNode" in e
        ? e.children.toLowerCase()
        : e,
    capitalize: (e, t) =>
      t === "text" && D(e)
        ? Js(e)
        : t === "vnode" && ae(e) && "__v_isVNode" in e
        ? Js(e.children)
        : e,
  };
}
let Ao;
function gc(e) {
  Ao = e;
}
let Fo;
function bc(e) {
  Fo = e;
}
let Oo;
function Ec(e) {
  Oo = e;
}
let Po = null;
const Qs = (e) => {
    Po = e;
  },
  Cc = () => Po;
let Mo = null;
const zs = (e) => {
    Mo = e;
  },
  vc = () => Mo;
let el = 0;
function Lc(e = {}) {
  const t = D(e.version) ? e.version : hc,
    n = D(e.locale) ? e.locale : In,
    r =
      ie(e.fallbackLocale) ||
      j(e.fallbackLocale) ||
      D(e.fallbackLocale) ||
      e.fallbackLocale === !1
        ? e.fallbackLocale
        : n,
    l = j(e.messages) ? e.messages : { [n]: {} },
    s = j(e.datetimeFormats) ? e.datetimeFormats : { [n]: {} },
    o = j(e.numberFormats) ? e.numberFormats : { [n]: {} },
    u = Ce({}, e.modifiers || {}, pc()),
    c = e.pluralRules || {},
    d = _e(e.missing) ? e.missing : null,
    h = Z(e.missingWarn) || yt(e.missingWarn) ? e.missingWarn : !0,
    E = Z(e.fallbackWarn) || yt(e.fallbackWarn) ? e.fallbackWarn : !0,
    b = !!e.fallbackFormat,
    I = !!e.unresolving,
    O = _e(e.postTranslation) ? e.postTranslation : null,
    k = j(e.processor) ? e.processor : null,
    w = Z(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    m = !!e.escapeParameter,
    C = _e(e.messageCompiler) ? e.messageCompiler : Ao,
    T = _e(e.messageResolver) ? e.messageResolver : Fo || Ju,
    g = _e(e.localeFallbacker) ? e.localeFallbacker : Oo || dc,
    y = ae(e.fallbackContext) ? e.fallbackContext : void 0,
    P = _e(e.onWarn) ? e.onWarn : vu,
    S = e,
    H = ae(S.__datetimeFormatters) ? S.__datetimeFormatters : new Map(),
    V = ae(S.__numberFormatters) ? S.__numberFormatters : new Map(),
    K = ae(S.__meta) ? S.__meta : {};
  el++;
  const q = {
    version: t,
    cid: el,
    locale: n,
    fallbackLocale: r,
    messages: l,
    modifiers: u,
    pluralRules: c,
    missing: d,
    missingWarn: h,
    fallbackWarn: E,
    fallbackFormat: b,
    unresolving: I,
    postTranslation: O,
    processor: k,
    warnHtmlMessage: w,
    escapeParameter: m,
    messageCompiler: C,
    messageResolver: T,
    localeFallbacker: g,
    fallbackContext: y,
    onWarn: P,
    __meta: K,
  };
  return (
    (q.datetimeFormats = s),
    (q.numberFormats = o),
    (q.__datetimeFormatters = H),
    (q.__numberFormatters = V),
    __INTLIFY_PROD_DEVTOOLS__ && ac(q, t, K),
    q
  );
}
function ss(e, t, n, r, l) {
  const { missing: s, onWarn: o } = e;
  if (s !== null) {
    const u = s(e, n, t, l);
    return D(u) ? u : t;
  } else return t;
}
function rn(e, t, n) {
  const r = e;
  (r.__localeChainCache = new Map()), e.localeFallbacker(e, n, t);
}
const yc = (e) => e;
let tl = Object.create(null);
function Tc(e, t = {}) {
  {
    const r = (t.onCacheKey || yc)(e),
      l = tl[r];
    if (l) return l;
    let s = !1;
    const o = t.onError || Tu;
    t.onError = (d) => {
      (s = !0), o(d);
    };
    const { code: u } = Bu(e, t),
      c = new Function(`return ${u}`)();
    return s ? c : (tl[r] = c);
  }
}
let So = te.__EXTEND_POINT__;
const cr = () => ++So,
  Wt = {
    INVALID_ARGUMENT: So,
    INVALID_DATE_ARGUMENT: cr(),
    INVALID_ISO_DATE_ARGUMENT: cr(),
    __EXTEND_POINT__: cr(),
  };
function jt(e) {
  return tr(e, null, void 0);
}
const nl = () => "",
  lt = (e) => _e(e);
function rl(e, ...t) {
  const {
      fallbackFormat: n,
      postTranslation: r,
      unresolving: l,
      messageCompiler: s,
      fallbackLocale: o,
      messages: u,
    } = e,
    [c, d] = kr(...t),
    h = Z(d.missingWarn) ? d.missingWarn : e.missingWarn,
    E = Z(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn,
    b = Z(d.escapeParameter) ? d.escapeParameter : e.escapeParameter,
    I = !!d.resolvedMessage,
    O =
      D(d.default) || Z(d.default)
        ? Z(d.default)
          ? s
            ? c
            : () => c
          : d.default
        : n
        ? s
          ? c
          : () => c
        : "",
    k = n || O !== "",
    w = D(d.locale) ? d.locale : e.locale;
  b && Ic(d);
  let [m, C, T] = I ? [c, w, u[w] || {}] : Do(e, c, w, o, E, h),
    g = m,
    y = c;
  if (
    (!I && !(D(g) || lt(g)) && k && ((g = O), (y = g)),
    !I && (!(D(g) || lt(g)) || !D(C)))
  )
    return l ? nr : c;
  let P = !1;
  const S = () => {
      P = !0;
    },
    H = lt(g) ? g : Ro(e, c, C, g, y, S);
  if (P) return g;
  const V = kc(e, C, T, d),
    K = oc(V),
    q = Nc(e, H, K),
    fe = r ? r(q, c) : q;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const de = {
      timestamp: Date.now(),
      key: D(c) ? c : lt(g) ? g.key : "",
      locale: C || (lt(g) ? g.locale : ""),
      format: D(g) ? g : lt(g) ? g.source : "",
      message: fe,
    };
    (de.meta = Ce({}, e.__meta, Cc() || {})), uc(de);
  }
  return fe;
}
function Ic(e) {
  ie(e.list)
    ? (e.list = e.list.map((t) => (D(t) ? Bs(t) : t)))
    : ae(e.named) &&
      Object.keys(e.named).forEach((t) => {
        D(e.named[t]) && (e.named[t] = Bs(e.named[t]));
      });
}
function Do(e, t, n, r, l, s) {
  const { messages: o, onWarn: u, messageResolver: c, localeFallbacker: d } = e,
    h = d(e, r, n);
  let E = {},
    b,
    I = null;
  const O = "translate";
  for (
    let k = 0;
    k < h.length &&
    ((b = h[k]),
    (E = o[b] || {}),
    (I = c(E, t)) === null && (I = E[t]),
    !(D(I) || _e(I)));
    k++
  ) {
    const w = ss(e, t, b, s, O);
    w !== t && (I = w);
  }
  return [I, b, E];
}
function Ro(e, t, n, r, l, s) {
  const { messageCompiler: o, warnHtmlMessage: u } = e;
  if (lt(r)) {
    const d = r;
    return (d.locale = d.locale || n), (d.key = d.key || t), d;
  }
  if (o == null) {
    const d = () => r;
    return (d.locale = n), (d.key = t), d;
  }
  const c = o(r, wc(e, n, l, r, u, s));
  return (c.locale = n), (c.key = t), (c.source = r), c;
}
function Nc(e, t, n) {
  return t(n);
}
function kr(...e) {
  const [t, n, r] = e,
    l = {};
  if (!D(t) && !he(t) && !lt(t)) throw jt(Wt.INVALID_ARGUMENT);
  const s = he(t) ? String(t) : (lt(t), t);
  return (
    he(n)
      ? (l.plural = n)
      : D(n)
      ? (l.default = n)
      : j(n) && !er(n)
      ? (l.named = n)
      : ie(n) && (l.list = n),
    he(r) ? (l.plural = r) : D(r) ? (l.default = r) : j(r) && Ce(l, r),
    [s, l]
  );
}
function wc(e, t, n, r, l, s) {
  return {
    warnHtmlMessage: l,
    onError: (o) => {
      throw (s && s(o), o);
    },
    onCacheKey: (o) => bu(t, n, o),
  };
}
function kc(e, t, n, r) {
  const {
      modifiers: l,
      pluralRules: s,
      messageResolver: o,
      fallbackLocale: u,
      fallbackWarn: c,
      missingWarn: d,
      fallbackContext: h,
    } = e,
    b = {
      locale: t,
      modifiers: l,
      pluralRules: s,
      messages: (I) => {
        let O = o(n, I);
        if (O == null && h) {
          const [, , k] = Do(h, I, t, u, c, d);
          O = o(k, I);
        }
        if (D(O)) {
          let k = !1;
          const m = Ro(e, I, t, O, I, () => {
            k = !0;
          });
          return k ? nl : m;
        } else return lt(O) ? O : nl;
      },
    };
  return (
    e.processor && (b.processor = e.processor),
    r.list && (b.list = r.list),
    r.named && (b.named = r.named),
    he(r.plural) && (b.pluralIndex = r.plural),
    b
  );
}
function sl(e, ...t) {
  const {
      datetimeFormats: n,
      unresolving: r,
      fallbackLocale: l,
      onWarn: s,
      localeFallbacker: o,
    } = e,
    { __datetimeFormatters: u } = e,
    [c, d, h, E] = Ar(...t),
    b = Z(h.missingWarn) ? h.missingWarn : e.missingWarn;
  Z(h.fallbackWarn) ? h.fallbackWarn : e.fallbackWarn;
  const I = !!h.part,
    O = D(h.locale) ? h.locale : e.locale,
    k = o(e, l, O);
  if (!D(c) || c === "") return new Intl.DateTimeFormat(O, E).format(d);
  let w = {},
    m,
    C = null;
  const T = "datetime format";
  for (
    let P = 0;
    P < k.length && ((m = k[P]), (w = n[m] || {}), (C = w[c]), !j(C));
    P++
  )
    ss(e, c, m, b, T);
  if (!j(C) || !D(m)) return r ? nr : c;
  let g = `${m}__${c}`;
  er(E) || (g = `${g}__${JSON.stringify(E)}`);
  let y = u.get(g);
  return (
    y || ((y = new Intl.DateTimeFormat(m, Ce({}, C, E))), u.set(g, y)),
    I ? y.formatToParts(d) : y.format(d)
  );
}
const xo = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits",
];
function Ar(...e) {
  const [t, n, r, l] = e,
    s = {};
  let o = {},
    u;
  if (D(t)) {
    const c = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!c) throw jt(Wt.INVALID_ISO_DATE_ARGUMENT);
    const d = c[3]
      ? c[3].trim().startsWith("T")
        ? `${c[1].trim()}${c[3].trim()}`
        : `${c[1].trim()}T${c[3].trim()}`
      : c[1].trim();
    u = new Date(d);
    try {
      u.toISOString();
    } catch {
      throw jt(Wt.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (Cu(t)) {
    if (isNaN(t.getTime())) throw jt(Wt.INVALID_DATE_ARGUMENT);
    u = t;
  } else if (he(t)) u = t;
  else throw jt(Wt.INVALID_ARGUMENT);
  return (
    D(n)
      ? (s.key = n)
      : j(n) &&
        Object.keys(n).forEach((c) => {
          xo.includes(c) ? (o[c] = n[c]) : (s[c] = n[c]);
        }),
    D(r) ? (s.locale = r) : j(r) && (o = r),
    j(l) && (o = l),
    [s.key || "", u, s, o]
  );
}
function ll(e, t, n) {
  const r = e;
  for (const l in n) {
    const s = `${t}__${l}`;
    !r.__datetimeFormatters.has(s) || r.__datetimeFormatters.delete(s);
  }
}
function ol(e, ...t) {
  const {
      numberFormats: n,
      unresolving: r,
      fallbackLocale: l,
      onWarn: s,
      localeFallbacker: o,
    } = e,
    { __numberFormatters: u } = e,
    [c, d, h, E] = Fr(...t),
    b = Z(h.missingWarn) ? h.missingWarn : e.missingWarn;
  Z(h.fallbackWarn) ? h.fallbackWarn : e.fallbackWarn;
  const I = !!h.part,
    O = D(h.locale) ? h.locale : e.locale,
    k = o(e, l, O);
  if (!D(c) || c === "") return new Intl.NumberFormat(O, E).format(d);
  let w = {},
    m,
    C = null;
  const T = "number format";
  for (
    let P = 0;
    P < k.length && ((m = k[P]), (w = n[m] || {}), (C = w[c]), !j(C));
    P++
  )
    ss(e, c, m, b, T);
  if (!j(C) || !D(m)) return r ? nr : c;
  let g = `${m}__${c}`;
  er(E) || (g = `${g}__${JSON.stringify(E)}`);
  let y = u.get(g);
  return (
    y || ((y = new Intl.NumberFormat(m, Ce({}, C, E))), u.set(g, y)),
    I ? y.formatToParts(d) : y.format(d)
  );
}
const Ho = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay",
];
function Fr(...e) {
  const [t, n, r, l] = e,
    s = {};
  let o = {};
  if (!he(t)) throw jt(Wt.INVALID_ARGUMENT);
  const u = t;
  return (
    D(n)
      ? (s.key = n)
      : j(n) &&
        Object.keys(n).forEach((c) => {
          Ho.includes(c) ? (o[c] = n[c]) : (s[c] = n[c]);
        }),
    D(r) ? (s.locale = r) : j(r) && (o = r),
    j(l) && (o = l),
    [s.key || "", u, s, o]
  );
}
function il(e, t, n) {
  const r = e;
  for (const l in n) {
    const s = `${t}__${l}`;
    !r.__numberFormatters.has(s) || r.__numberFormatters.delete(s);
  }
}
typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" &&
  (_n().__INTLIFY_PROD_DEVTOOLS__ = !1);
/*!
 * vue-i18n v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const Ac = "9.2.2";
function Fc() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" &&
    (_n().__VUE_I18N_FULL_INSTALL__ = !0),
    typeof __VUE_I18N_LEGACY_API__ != "boolean" &&
      (_n().__VUE_I18N_LEGACY_API__ = !0),
    typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" &&
      (_n().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
fc.__EXTEND_POINT__;
let $o = te.__EXTEND_POINT__;
const Pe = () => ++$o,
  me = {
    UNEXPECTED_RETURN_TYPE: $o,
    INVALID_ARGUMENT: Pe(),
    MUST_BE_CALL_SETUP_TOP: Pe(),
    NOT_INSLALLED: Pe(),
    NOT_AVAILABLE_IN_LEGACY_MODE: Pe(),
    REQUIRED_VALUE: Pe(),
    INVALID_VALUE: Pe(),
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Pe(),
    NOT_INSLALLED_WITH_PROVIDE: Pe(),
    UNEXPECTED_ERROR: Pe(),
    NOT_COMPATIBLE_LEGACY_VUE_I18N: Pe(),
    BRIDGE_SUPPORT_VUE_2_ONLY: Pe(),
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: Pe(),
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Pe(),
    __EXTEND_POINT__: Pe(),
  };
function pe(e, ...t) {
  return tr(e, null, void 0);
}
const Or = Tt("__transrateVNode"),
  Pr = Tt("__datetimeParts"),
  Mr = Tt("__numberParts"),
  Vo = Tt("__setPluralRules");
Tt("__intlifyMeta");
const Uo = Tt("__injectWithOption");
function Sr(e) {
  if (!ae(e)) return e;
  for (const t in e)
    if (!!ts(e, t))
      if (!t.includes(".")) ae(e[t]) && Sr(e[t]);
      else {
        const n = t.split("."),
          r = n.length - 1;
        let l = e;
        for (let s = 0; s < r; s++) n[s] in l || (l[n[s]] = {}), (l = l[n[s]]);
        (l[n[r]] = e[t]), delete e[t], ae(l[n[r]]) && Sr(l[n[r]]);
      }
  return e;
}
function rr(e, t) {
  const { messages: n, __i18n: r, messageResolver: l, flatJson: s } = t,
    o = j(n) ? n : ie(r) ? {} : { [e]: {} };
  if (
    (ie(r) &&
      r.forEach((u) => {
        if ("locale" in u && "resource" in u) {
          const { locale: c, resource: d } = u;
          c ? ((o[c] = o[c] || {}), mn(d, o[c])) : mn(d, o);
        } else D(u) && mn(JSON.parse(u), o);
      }),
    l == null && s)
  )
    for (const u in o) ts(o, u) && Sr(o[u]);
  return o;
}
const On = (e) => !ae(e) || ie(e);
function mn(e, t) {
  if (On(e) || On(t)) throw pe(me.INVALID_VALUE);
  for (const n in e)
    ts(e, n) && (On(e[n]) || On(t[n]) ? (t[n] = e[n]) : mn(e[n], t[n]));
}
function Wo(e) {
  return e.type;
}
function jo(e, t, n) {
  let r = ae(t.messages) ? t.messages : {};
  "__i18nGlobal" in n &&
    (r = rr(e.locale.value, { messages: r, __i18n: n.__i18nGlobal }));
  const l = Object.keys(r);
  l.length &&
    l.forEach((s) => {
      e.mergeLocaleMessage(s, r[s]);
    });
  {
    if (ae(t.datetimeFormats)) {
      const s = Object.keys(t.datetimeFormats);
      s.length &&
        s.forEach((o) => {
          e.mergeDateTimeFormat(o, t.datetimeFormats[o]);
        });
    }
    if (ae(t.numberFormats)) {
      const s = Object.keys(t.numberFormats);
      s.length &&
        s.forEach((o) => {
          e.mergeNumberFormat(o, t.numberFormats[o]);
        });
    }
  }
}
function al(e) {
  return se(Qn, null, e, 0);
}
const ul = "__INTLIFY_META__";
let cl = 0;
function fl(e) {
  return (t, n, r, l) => e(n, r, Rt() || void 0, l);
}
const Oc = () => {
  const e = Rt();
  let t = null;
  return e && (t = Wo(e)[ul]) ? { [ul]: t } : null;
};
function ls(e = {}, t) {
  const { __root: n } = e,
    r = n === void 0;
  let l = Z(e.inheritLocale) ? e.inheritLocale : !0;
  const s = Oe(n && l ? n.locale.value : D(e.locale) ? e.locale : In),
    o = Oe(
      n && l
        ? n.fallbackLocale.value
        : D(e.fallbackLocale) ||
          ie(e.fallbackLocale) ||
          j(e.fallbackLocale) ||
          e.fallbackLocale === !1
        ? e.fallbackLocale
        : s.value
    ),
    u = Oe(rr(s.value, e)),
    c = Oe(j(e.datetimeFormats) ? e.datetimeFormats : { [s.value]: {} }),
    d = Oe(j(e.numberFormats) ? e.numberFormats : { [s.value]: {} });
  let h = n
      ? n.missingWarn
      : Z(e.missingWarn) || yt(e.missingWarn)
      ? e.missingWarn
      : !0,
    E = n
      ? n.fallbackWarn
      : Z(e.fallbackWarn) || yt(e.fallbackWarn)
      ? e.fallbackWarn
      : !0,
    b = n ? n.fallbackRoot : Z(e.fallbackRoot) ? e.fallbackRoot : !0,
    I = !!e.fallbackFormat,
    O = _e(e.missing) ? e.missing : null,
    k = _e(e.missing) ? fl(e.missing) : null,
    w = _e(e.postTranslation) ? e.postTranslation : null,
    m = n ? n.warnHtmlMessage : Z(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    C = !!e.escapeParameter;
  const T = n ? n.modifiers : j(e.modifiers) ? e.modifiers : {};
  let g = e.pluralRules || (n && n.pluralRules),
    y;
  (y = (() => {
    r && zs(null);
    const _ = {
      version: Ac,
      locale: s.value,
      fallbackLocale: o.value,
      messages: u.value,
      modifiers: T,
      pluralRules: g,
      missing: k === null ? void 0 : k,
      missingWarn: h,
      fallbackWarn: E,
      fallbackFormat: I,
      unresolving: !0,
      postTranslation: w === null ? void 0 : w,
      warnHtmlMessage: m,
      escapeParameter: C,
      messageResolver: e.messageResolver,
      __meta: { framework: "vue" },
    };
    (_.datetimeFormats = c.value),
      (_.numberFormats = d.value),
      (_.__datetimeFormatters = j(y) ? y.__datetimeFormatters : void 0),
      (_.__numberFormatters = j(y) ? y.__numberFormatters : void 0);
    const L = Lc(_);
    return r && zs(L), L;
  })()),
    rn(y, s.value, o.value);
  function S() {
    return [s.value, o.value, u.value, c.value, d.value];
  }
  const H = qe({
      get: () => s.value,
      set: (_) => {
        (s.value = _), (y.locale = s.value);
      },
    }),
    V = qe({
      get: () => o.value,
      set: (_) => {
        (o.value = _), (y.fallbackLocale = o.value), rn(y, s.value, _);
      },
    }),
    K = qe(() => u.value),
    q = qe(() => c.value),
    fe = qe(() => d.value);
  function de() {
    return _e(w) ? w : null;
  }
  function Ke(_) {
    (w = _), (y.postTranslation = _);
  }
  function ot() {
    return O;
  }
  function ue(_) {
    _ !== null && (k = fl(_)), (O = _), (y.missing = k);
  }
  const J = (_, L, R, x, W, X) => {
    S();
    let Q;
    if (__INTLIFY_PROD_DEVTOOLS__)
      try {
        Qs(Oc()), r || (y.fallbackContext = n ? vc() : void 0), (Q = _(y));
      } finally {
        Qs(null), r || (y.fallbackContext = void 0);
      }
    else Q = _(y);
    if (he(Q) && Q === nr) {
      const [re, le] = L();
      return n && b ? x(n) : W(re);
    } else {
      if (X(Q)) return Q;
      throw pe(me.UNEXPECTED_RETURN_TYPE);
    }
  };
  function ee(..._) {
    return J(
      (L) => Reflect.apply(rl, null, [L, ..._]),
      () => kr(..._),
      "translate",
      (L) => Reflect.apply(L.t, L, [..._]),
      (L) => L,
      (L) => D(L)
    );
  }
  function ye(..._) {
    const [L, R, x] = _;
    if (x && !ae(x)) throw pe(me.INVALID_ARGUMENT);
    return ee(L, R, Ce({ resolvedMessage: !0 }, x || {}));
  }
  function it(..._) {
    return J(
      (L) => Reflect.apply(sl, null, [L, ..._]),
      () => Ar(..._),
      "datetime format",
      (L) => Reflect.apply(L.d, L, [..._]),
      () => qs,
      (L) => D(L)
    );
  }
  function Ye(..._) {
    return J(
      (L) => Reflect.apply(ol, null, [L, ..._]),
      () => Fr(..._),
      "number format",
      (L) => Reflect.apply(L.n, L, [..._]),
      () => qs,
      (L) => D(L)
    );
  }
  function He(_) {
    return _.map((L) => (D(L) || he(L) || Z(L) ? al(String(L)) : L));
  }
  const at = { normalize: He, interpolate: (_) => _, type: "vnode" };
  function Nt(..._) {
    return J(
      (L) => {
        let R;
        const x = L;
        try {
          (x.processor = at), (R = Reflect.apply(rl, null, [x, ..._]));
        } finally {
          x.processor = null;
        }
        return R;
      },
      () => kr(..._),
      "translate",
      (L) => L[Or](..._),
      (L) => [al(L)],
      (L) => ie(L)
    );
  }
  function wt(..._) {
    return J(
      (L) => Reflect.apply(ol, null, [L, ..._]),
      () => Fr(..._),
      "number format",
      (L) => L[Mr](..._),
      () => [],
      (L) => D(L) || ie(L)
    );
  }
  function Ne(..._) {
    return J(
      (L) => Reflect.apply(sl, null, [L, ..._]),
      () => Ar(..._),
      "datetime format",
      (L) => L[Pr](..._),
      () => [],
      (L) => D(L) || ie(L)
    );
  }
  function $e(_) {
    (g = _), (y.pluralRules = g);
  }
  function ze(_, L) {
    const R = D(L) ? L : s.value,
      x = et(R);
    return y.messageResolver(x, _) !== null;
  }
  function we(_) {
    let L = null;
    const R = ko(y, o.value, s.value);
    for (let x = 0; x < R.length; x++) {
      const W = u.value[R[x]] || {},
        X = y.messageResolver(W, _);
      if (X != null) {
        L = X;
        break;
      }
    }
    return L;
  }
  function Xe(_) {
    const L = we(_);
    return L != null ? L : n ? n.tm(_) || {} : {};
  }
  function et(_) {
    return u.value[_] || {};
  }
  function a(_, L) {
    (u.value[_] = L), (y.messages = u.value);
  }
  function i(_, L) {
    (u.value[_] = u.value[_] || {}), mn(L, u.value[_]), (y.messages = u.value);
  }
  function f(_) {
    return c.value[_] || {};
  }
  function p(_, L) {
    (c.value[_] = L), (y.datetimeFormats = c.value), ll(y, _, L);
  }
  function v(_, L) {
    (c.value[_] = Ce(c.value[_] || {}, L)),
      (y.datetimeFormats = c.value),
      ll(y, _, L);
  }
  function N(_) {
    return d.value[_] || {};
  }
  function M(_, L) {
    (d.value[_] = L), (y.numberFormats = d.value), il(y, _, L);
  }
  function F(_, L) {
    (d.value[_] = Ce(d.value[_] || {}, L)),
      (y.numberFormats = d.value),
      il(y, _, L);
  }
  cl++,
    n &&
      Nr &&
      (St(n.locale, (_) => {
        l && ((s.value = _), (y.locale = _), rn(y, s.value, o.value));
      }),
      St(n.fallbackLocale, (_) => {
        l && ((o.value = _), (y.fallbackLocale = _), rn(y, s.value, o.value));
      }));
  const A = {
    id: cl,
    locale: H,
    fallbackLocale: V,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(_) {
      (l = _),
        _ &&
          n &&
          ((s.value = n.locale.value),
          (o.value = n.fallbackLocale.value),
          rn(y, s.value, o.value));
    },
    get availableLocales() {
      return Object.keys(u.value).sort();
    },
    messages: K,
    get modifiers() {
      return T;
    },
    get pluralRules() {
      return g || {};
    },
    get isGlobal() {
      return r;
    },
    get missingWarn() {
      return h;
    },
    set missingWarn(_) {
      (h = _), (y.missingWarn = h);
    },
    get fallbackWarn() {
      return E;
    },
    set fallbackWarn(_) {
      (E = _), (y.fallbackWarn = E);
    },
    get fallbackRoot() {
      return b;
    },
    set fallbackRoot(_) {
      b = _;
    },
    get fallbackFormat() {
      return I;
    },
    set fallbackFormat(_) {
      (I = _), (y.fallbackFormat = I);
    },
    get warnHtmlMessage() {
      return m;
    },
    set warnHtmlMessage(_) {
      (m = _), (y.warnHtmlMessage = _);
    },
    get escapeParameter() {
      return C;
    },
    set escapeParameter(_) {
      (C = _), (y.escapeParameter = _);
    },
    t: ee,
    getLocaleMessage: et,
    setLocaleMessage: a,
    mergeLocaleMessage: i,
    getPostTranslationHandler: de,
    setPostTranslationHandler: Ke,
    getMissingHandler: ot,
    setMissingHandler: ue,
    [Vo]: $e,
  };
  return (
    (A.datetimeFormats = q),
    (A.numberFormats = fe),
    (A.rt = ye),
    (A.te = ze),
    (A.tm = Xe),
    (A.d = it),
    (A.n = Ye),
    (A.getDateTimeFormat = f),
    (A.setDateTimeFormat = p),
    (A.mergeDateTimeFormat = v),
    (A.getNumberFormat = N),
    (A.setNumberFormat = M),
    (A.mergeNumberFormat = F),
    (A[Uo] = e.__injectWithOption),
    (A[Or] = Nt),
    (A[Pr] = Ne),
    (A[Mr] = wt),
    A
  );
}
function Pc(e) {
  const t = D(e.locale) ? e.locale : In,
    n =
      D(e.fallbackLocale) ||
      ie(e.fallbackLocale) ||
      j(e.fallbackLocale) ||
      e.fallbackLocale === !1
        ? e.fallbackLocale
        : t,
    r = _e(e.missing) ? e.missing : void 0,
    l =
      Z(e.silentTranslationWarn) || yt(e.silentTranslationWarn)
        ? !e.silentTranslationWarn
        : !0,
    s =
      Z(e.silentFallbackWarn) || yt(e.silentFallbackWarn)
        ? !e.silentFallbackWarn
        : !0,
    o = Z(e.fallbackRoot) ? e.fallbackRoot : !0,
    u = !!e.formatFallbackMessages,
    c = j(e.modifiers) ? e.modifiers : {},
    d = e.pluralizationRules,
    h = _e(e.postTranslation) ? e.postTranslation : void 0,
    E = D(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0,
    b = !!e.escapeParameterHtml,
    I = Z(e.sync) ? e.sync : !0;
  let O = e.messages;
  if (j(e.sharedMessages)) {
    const y = e.sharedMessages;
    O = Object.keys(y).reduce((S, H) => {
      const V = S[H] || (S[H] = {});
      return Ce(V, y[H]), S;
    }, O || {});
  }
  const { __i18n: k, __root: w, __injectWithOption: m } = e,
    C = e.datetimeFormats,
    T = e.numberFormats,
    g = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: O,
    flatJson: g,
    datetimeFormats: C,
    numberFormats: T,
    missing: r,
    missingWarn: l,
    fallbackWarn: s,
    fallbackRoot: o,
    fallbackFormat: u,
    modifiers: c,
    pluralRules: d,
    postTranslation: h,
    warnHtmlMessage: E,
    escapeParameter: b,
    messageResolver: e.messageResolver,
    inheritLocale: I,
    __i18n: k,
    __root: w,
    __injectWithOption: m,
  };
}
function Dr(e = {}, t) {
  {
    const n = ls(Pc(e)),
      r = {
        id: n.id,
        get locale() {
          return n.locale.value;
        },
        set locale(l) {
          n.locale.value = l;
        },
        get fallbackLocale() {
          return n.fallbackLocale.value;
        },
        set fallbackLocale(l) {
          n.fallbackLocale.value = l;
        },
        get messages() {
          return n.messages.value;
        },
        get datetimeFormats() {
          return n.datetimeFormats.value;
        },
        get numberFormats() {
          return n.numberFormats.value;
        },
        get availableLocales() {
          return n.availableLocales;
        },
        get formatter() {
          return {
            interpolate() {
              return [];
            },
          };
        },
        set formatter(l) {},
        get missing() {
          return n.getMissingHandler();
        },
        set missing(l) {
          n.setMissingHandler(l);
        },
        get silentTranslationWarn() {
          return Z(n.missingWarn) ? !n.missingWarn : n.missingWarn;
        },
        set silentTranslationWarn(l) {
          n.missingWarn = Z(l) ? !l : l;
        },
        get silentFallbackWarn() {
          return Z(n.fallbackWarn) ? !n.fallbackWarn : n.fallbackWarn;
        },
        set silentFallbackWarn(l) {
          n.fallbackWarn = Z(l) ? !l : l;
        },
        get modifiers() {
          return n.modifiers;
        },
        get formatFallbackMessages() {
          return n.fallbackFormat;
        },
        set formatFallbackMessages(l) {
          n.fallbackFormat = l;
        },
        get postTranslation() {
          return n.getPostTranslationHandler();
        },
        set postTranslation(l) {
          n.setPostTranslationHandler(l);
        },
        get sync() {
          return n.inheritLocale;
        },
        set sync(l) {
          n.inheritLocale = l;
        },
        get warnHtmlInMessage() {
          return n.warnHtmlMessage ? "warn" : "off";
        },
        set warnHtmlInMessage(l) {
          n.warnHtmlMessage = l !== "off";
        },
        get escapeParameterHtml() {
          return n.escapeParameter;
        },
        set escapeParameterHtml(l) {
          n.escapeParameter = l;
        },
        get preserveDirectiveContent() {
          return !0;
        },
        set preserveDirectiveContent(l) {},
        get pluralizationRules() {
          return n.pluralRules || {};
        },
        __composer: n,
        t(...l) {
          const [s, o, u] = l,
            c = {};
          let d = null,
            h = null;
          if (!D(s)) throw pe(me.INVALID_ARGUMENT);
          const E = s;
          return (
            D(o) ? (c.locale = o) : ie(o) ? (d = o) : j(o) && (h = o),
            ie(u) ? (d = u) : j(u) && (h = u),
            Reflect.apply(n.t, n, [E, d || h || {}, c])
          );
        },
        rt(...l) {
          return Reflect.apply(n.rt, n, [...l]);
        },
        tc(...l) {
          const [s, o, u] = l,
            c = { plural: 1 };
          let d = null,
            h = null;
          if (!D(s)) throw pe(me.INVALID_ARGUMENT);
          const E = s;
          return (
            D(o)
              ? (c.locale = o)
              : he(o)
              ? (c.plural = o)
              : ie(o)
              ? (d = o)
              : j(o) && (h = o),
            D(u) ? (c.locale = u) : ie(u) ? (d = u) : j(u) && (h = u),
            Reflect.apply(n.t, n, [E, d || h || {}, c])
          );
        },
        te(l, s) {
          return n.te(l, s);
        },
        tm(l) {
          return n.tm(l);
        },
        getLocaleMessage(l) {
          return n.getLocaleMessage(l);
        },
        setLocaleMessage(l, s) {
          n.setLocaleMessage(l, s);
        },
        mergeLocaleMessage(l, s) {
          n.mergeLocaleMessage(l, s);
        },
        d(...l) {
          return Reflect.apply(n.d, n, [...l]);
        },
        getDateTimeFormat(l) {
          return n.getDateTimeFormat(l);
        },
        setDateTimeFormat(l, s) {
          n.setDateTimeFormat(l, s);
        },
        mergeDateTimeFormat(l, s) {
          n.mergeDateTimeFormat(l, s);
        },
        n(...l) {
          return Reflect.apply(n.n, n, [...l]);
        },
        getNumberFormat(l) {
          return n.getNumberFormat(l);
        },
        setNumberFormat(l, s) {
          n.setNumberFormat(l, s);
        },
        mergeNumberFormat(l, s) {
          n.mergeNumberFormat(l, s);
        },
        getChoiceIndex(l, s) {
          return -1;
        },
        __onComponentInstanceCreated(l) {
          const { componentInstanceCreatedListener: s } = e;
          s && s(l, r);
        },
      };
    return r;
  }
}
const os = {
  tag: { type: [String, Object] },
  locale: { type: String },
  scope: {
    type: String,
    validator: (e) => e === "parent" || e === "global",
    default: "parent",
  },
  i18n: { type: Object },
};
function Mc({ slots: e }, t) {
  return t.length === 1 && t[0] === "default"
    ? (e.default ? e.default() : []).reduce(
        (r, l) => (r = [...r, ...(ie(l.children) ? l.children : [l])]),
        []
      )
    : t.reduce((n, r) => {
        const l = e[r];
        return l && (n[r] = l()), n;
      }, {});
}
function Bo(e) {
  return ce;
}
const dl = {
  name: "i18n-t",
  props: Ce(
    {
      keypath: { type: String, required: !0 },
      plural: { type: [Number, String], validator: (e) => he(e) || !isNaN(e) },
    },
    os
  ),
  setup(e, t) {
    const { slots: n, attrs: r } = t,
      l = e.i18n || is({ useScope: e.scope, __useComponent: !0 });
    return () => {
      const s = Object.keys(n).filter((E) => E !== "_"),
        o = {};
      e.locale && (o.locale = e.locale),
        e.plural !== void 0 && (o.plural = D(e.plural) ? +e.plural : e.plural);
      const u = Mc(t, s),
        c = l[Or](e.keypath, u, o),
        d = Ce({}, r),
        h = D(e.tag) || ae(e.tag) ? e.tag : Bo();
      return To(h, d, c);
    };
  },
};
function Sc(e) {
  return ie(e) && !D(e[0]);
}
function Ko(e, t, n, r) {
  const { slots: l, attrs: s } = t;
  return () => {
    const o = { part: !0 };
    let u = {};
    e.locale && (o.locale = e.locale),
      D(e.format)
        ? (o.key = e.format)
        : ae(e.format) &&
          (D(e.format.key) && (o.key = e.format.key),
          (u = Object.keys(e.format).reduce(
            (b, I) => (n.includes(I) ? Ce({}, b, { [I]: e.format[I] }) : b),
            {}
          )));
    const c = r(e.value, o, u);
    let d = [o.key];
    ie(c)
      ? (d = c.map((b, I) => {
          const O = l[b.type],
            k = O ? O({ [b.type]: b.value, index: I, parts: c }) : [b.value];
          return Sc(k) && (k[0].key = `${b.type}-${I}`), k;
        }))
      : D(c) && (d = [c]);
    const h = Ce({}, s),
      E = D(e.tag) || ae(e.tag) ? e.tag : Bo();
    return To(E, h, d);
  };
}
const _l = {
    name: "i18n-n",
    props: Ce(
      {
        value: { type: Number, required: !0 },
        format: { type: [String, Object] },
      },
      os
    ),
    setup(e, t) {
      const n = e.i18n || is({ useScope: "parent", __useComponent: !0 });
      return Ko(e, t, Ho, (...r) => n[Mr](...r));
    },
  },
  ml = {
    name: "i18n-d",
    props: Ce(
      {
        value: { type: [Number, Date], required: !0 },
        format: { type: [String, Object] },
      },
      os
    ),
    setup(e, t) {
      const n = e.i18n || is({ useScope: "parent", __useComponent: !0 });
      return Ko(e, t, xo, (...r) => n[Pr](...r));
    },
  };
function Dc(e, t) {
  const n = e;
  if (e.mode === "composition") return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function Rc(e) {
  const t = (o) => {
    const { instance: u, modifiers: c, value: d } = o;
    if (!u || !u.$) throw pe(me.UNEXPECTED_ERROR);
    const h = Dc(e, u.$),
      E = hl(d);
    return [Reflect.apply(h.t, h, [...pl(E)]), h];
  };
  return {
    created: (o, u) => {
      const [c, d] = t(u);
      Nr &&
        e.global === d &&
        (o.__i18nWatcher = St(d.locale, () => {
          u.instance && u.instance.$forceUpdate();
        })),
        (o.__composer = d),
        (o.textContent = c);
    },
    unmounted: (o) => {
      Nr &&
        o.__i18nWatcher &&
        (o.__i18nWatcher(), (o.__i18nWatcher = void 0), delete o.__i18nWatcher),
        o.__composer && ((o.__composer = void 0), delete o.__composer);
    },
    beforeUpdate: (o, { value: u }) => {
      if (o.__composer) {
        const c = o.__composer,
          d = hl(u);
        o.textContent = Reflect.apply(c.t, c, [...pl(d)]);
      }
    },
    getSSRProps: (o) => {
      const [u] = t(o);
      return { textContent: u };
    },
  };
}
function hl(e) {
  if (D(e)) return { path: e };
  if (j(e)) {
    if (!("path" in e)) throw pe(me.REQUIRED_VALUE, "path");
    return e;
  } else throw pe(me.INVALID_VALUE);
}
function pl(e) {
  const { path: t, locale: n, args: r, choice: l, plural: s } = e,
    o = {},
    u = r || {};
  return (
    D(n) && (o.locale = n),
    he(l) && (o.plural = l),
    he(s) && (o.plural = s),
    [t, u, o]
  );
}
function xc(e, t, ...n) {
  const r = j(n[0]) ? n[0] : {},
    l = !!r.useI18nComponentName;
  (Z(r.globalInstall) ? r.globalInstall : !0) &&
    (e.component(l ? "i18n" : dl.name, dl),
    e.component(_l.name, _l),
    e.component(ml.name, ml)),
    e.directive("t", Rc(t));
}
function Hc(e, t, n) {
  return {
    beforeCreate() {
      const r = Rt();
      if (!r) throw pe(me.UNEXPECTED_ERROR);
      const l = this.$options;
      if (l.i18n) {
        const s = l.i18n;
        l.__i18n && (s.__i18n = l.__i18n),
          (s.__root = t),
          this === this.$root
            ? (this.$i18n = gl(e, s))
            : ((s.__injectWithOption = !0), (this.$i18n = Dr(s)));
      } else
        l.__i18n
          ? this === this.$root
            ? (this.$i18n = gl(e, l))
            : (this.$i18n = Dr({
                __i18n: l.__i18n,
                __injectWithOption: !0,
                __root: t,
              }))
          : (this.$i18n = e);
      l.__i18nGlobal && jo(t, l, l),
        e.__onComponentInstanceCreated(this.$i18n),
        n.__setInstance(r, this.$i18n),
        (this.$t = (...s) => this.$i18n.t(...s)),
        (this.$rt = (...s) => this.$i18n.rt(...s)),
        (this.$tc = (...s) => this.$i18n.tc(...s)),
        (this.$te = (s, o) => this.$i18n.te(s, o)),
        (this.$d = (...s) => this.$i18n.d(...s)),
        (this.$n = (...s) => this.$i18n.n(...s)),
        (this.$tm = (s) => this.$i18n.tm(s));
    },
    mounted() {},
    unmounted() {
      const r = Rt();
      if (!r) throw pe(me.UNEXPECTED_ERROR);
      delete this.$t,
        delete this.$rt,
        delete this.$tc,
        delete this.$te,
        delete this.$d,
        delete this.$n,
        delete this.$tm,
        n.__deleteInstance(r),
        delete this.$i18n;
    },
  };
}
function gl(e, t) {
  (e.locale = t.locale || e.locale),
    (e.fallbackLocale = t.fallbackLocale || e.fallbackLocale),
    (e.missing = t.missing || e.missing),
    (e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn),
    (e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn),
    (e.formatFallbackMessages =
      t.formatFallbackMessages || e.formatFallbackMessages),
    (e.postTranslation = t.postTranslation || e.postTranslation),
    (e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage),
    (e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml),
    (e.sync = t.sync || e.sync),
    e.__composer[Vo](t.pluralizationRules || e.pluralizationRules);
  const n = rr(e.locale, { messages: t.messages, __i18n: t.__i18n });
  return (
    Object.keys(n).forEach((r) => e.mergeLocaleMessage(r, n[r])),
    t.datetimeFormats &&
      Object.keys(t.datetimeFormats).forEach((r) =>
        e.mergeDateTimeFormat(r, t.datetimeFormats[r])
      ),
    t.numberFormats &&
      Object.keys(t.numberFormats).forEach((r) =>
        e.mergeNumberFormat(r, t.numberFormats[r])
      ),
    e
  );
}
const $c = Tt("global-vue-i18n");
function Vc(e = {}, t) {
  const n =
      __VUE_I18N_LEGACY_API__ && Z(e.legacy)
        ? e.legacy
        : __VUE_I18N_LEGACY_API__,
    r = Z(e.globalInjection) ? e.globalInjection : !0,
    l = __VUE_I18N_LEGACY_API__ && n ? !!e.allowComposition : !0,
    s = new Map(),
    [o, u] = Uc(e, n),
    c = Tt("");
  function d(b) {
    return s.get(b) || null;
  }
  function h(b, I) {
    s.set(b, I);
  }
  function E(b) {
    s.delete(b);
  }
  {
    const b = {
      get mode() {
        return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition";
      },
      get allowComposition() {
        return l;
      },
      async install(I, ...O) {
        (I.__VUE_I18N_SYMBOL__ = c),
          I.provide(I.__VUE_I18N_SYMBOL__, b),
          !n && r && qc(I, b.global),
          __VUE_I18N_FULL_INSTALL__ && xc(I, b, ...O),
          __VUE_I18N_LEGACY_API__ && n && I.mixin(Hc(u, u.__composer, b));
        const k = I.unmount;
        I.unmount = () => {
          b.dispose(), k();
        };
      },
      get global() {
        return u;
      },
      dispose() {
        o.stop();
      },
      __instances: s,
      __getInstance: d,
      __setInstance: h,
      __deleteInstance: E,
    };
    return b;
  }
}
function is(e = {}) {
  const t = Rt();
  if (t == null) throw pe(me.MUST_BE_CALL_SETUP_TOP);
  if (
    !t.isCE &&
    t.appContext.app != null &&
    !t.appContext.app.__VUE_I18N_SYMBOL__
  )
    throw pe(me.NOT_INSLALLED);
  const n = Wc(t),
    r = Bc(n),
    l = Wo(t),
    s = jc(e, l);
  if (__VUE_I18N_LEGACY_API__ && n.mode === "legacy" && !e.__useComponent) {
    if (!n.allowComposition) throw pe(me.NOT_AVAILABLE_IN_LEGACY_MODE);
    return Xc(t, s, r, e);
  }
  if (s === "global") return jo(r, e, l), r;
  if (s === "parent") {
    let c = Kc(n, t, e.__useComponent);
    return c == null && (c = r), c;
  }
  const o = n;
  let u = o.__getInstance(t);
  if (u == null) {
    const c = Ce({}, e);
    "__i18n" in l && (c.__i18n = l.__i18n),
      r && (c.__root = r),
      (u = ls(c)),
      Yc(o, t),
      o.__setInstance(t, u);
  }
  return u;
}
function Uc(e, t, n) {
  const r = ui();
  {
    const l =
      __VUE_I18N_LEGACY_API__ && t ? r.run(() => Dr(e)) : r.run(() => ls(e));
    if (l == null) throw pe(me.UNEXPECTED_ERROR);
    return [r, l];
  }
}
function Wc(e) {
  {
    const t = Xt(e.isCE ? $c : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw pe(e.isCE ? me.NOT_INSLALLED_WITH_PROVIDE : me.UNEXPECTED_ERROR);
    return t;
  }
}
function jc(e, t) {
  return er(e)
    ? "__i18n" in t
      ? "local"
      : "global"
    : e.useScope
    ? e.useScope
    : "local";
}
function Bc(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function Kc(e, t, n = !1) {
  let r = null;
  const l = t.root;
  let s = t.parent;
  for (; s != null; ) {
    const o = e;
    if (e.mode === "composition") r = o.__getInstance(s);
    else if (__VUE_I18N_LEGACY_API__) {
      const u = o.__getInstance(s);
      u != null && ((r = u.__composer), n && r && !r[Uo] && (r = null));
    }
    if (r != null || l === s) break;
    s = s.parent;
  }
  return r;
}
function Yc(e, t, n) {
  Tn(() => {}, t),
    Jn(() => {
      e.__deleteInstance(t);
    }, t);
}
function Xc(e, t, n, r = {}) {
  const l = t === "local",
    s = xi(null);
  if (l && e.proxy && !(e.proxy.$options.i18n || e.proxy.$options.__i18n))
    throw pe(me.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
  const o = Z(r.inheritLocale) ? r.inheritLocale : !0,
    u = Oe(l && o ? n.locale.value : D(r.locale) ? r.locale : In),
    c = Oe(
      l && o
        ? n.fallbackLocale.value
        : D(r.fallbackLocale) ||
          ie(r.fallbackLocale) ||
          j(r.fallbackLocale) ||
          r.fallbackLocale === !1
        ? r.fallbackLocale
        : u.value
    ),
    d = Oe(rr(u.value, r)),
    h = Oe(j(r.datetimeFormats) ? r.datetimeFormats : { [u.value]: {} }),
    E = Oe(j(r.numberFormats) ? r.numberFormats : { [u.value]: {} }),
    b = l
      ? n.missingWarn
      : Z(r.missingWarn) || yt(r.missingWarn)
      ? r.missingWarn
      : !0,
    I = l
      ? n.fallbackWarn
      : Z(r.fallbackWarn) || yt(r.fallbackWarn)
      ? r.fallbackWarn
      : !0,
    O = l ? n.fallbackRoot : Z(r.fallbackRoot) ? r.fallbackRoot : !0,
    k = !!r.fallbackFormat,
    w = _e(r.missing) ? r.missing : null,
    m = _e(r.postTranslation) ? r.postTranslation : null,
    C = l ? n.warnHtmlMessage : Z(r.warnHtmlMessage) ? r.warnHtmlMessage : !0,
    T = !!r.escapeParameter,
    g = l ? n.modifiers : j(r.modifiers) ? r.modifiers : {},
    y = r.pluralRules || (l && n.pluralRules);
  function P() {
    return [u.value, c.value, d.value, h.value, E.value];
  }
  const S = qe({
      get: () => (s.value ? s.value.locale.value : u.value),
      set: (i) => {
        s.value && (s.value.locale.value = i), (u.value = i);
      },
    }),
    H = qe({
      get: () => (s.value ? s.value.fallbackLocale.value : c.value),
      set: (i) => {
        s.value && (s.value.fallbackLocale.value = i), (c.value = i);
      },
    }),
    V = qe(() => (s.value ? s.value.messages.value : d.value)),
    K = qe(() => h.value),
    q = qe(() => E.value);
  function fe() {
    return s.value ? s.value.getPostTranslationHandler() : m;
  }
  function de(i) {
    s.value && s.value.setPostTranslationHandler(i);
  }
  function Ke() {
    return s.value ? s.value.getMissingHandler() : w;
  }
  function ot(i) {
    s.value && s.value.setMissingHandler(i);
  }
  function ue(i) {
    return P(), i();
  }
  function J(...i) {
    return s.value
      ? ue(() => Reflect.apply(s.value.t, null, [...i]))
      : ue(() => "");
  }
  function ee(...i) {
    return s.value ? Reflect.apply(s.value.rt, null, [...i]) : "";
  }
  function ye(...i) {
    return s.value
      ? ue(() => Reflect.apply(s.value.d, null, [...i]))
      : ue(() => "");
  }
  function it(...i) {
    return s.value
      ? ue(() => Reflect.apply(s.value.n, null, [...i]))
      : ue(() => "");
  }
  function Ye(i) {
    return s.value ? s.value.tm(i) : {};
  }
  function He(i, f) {
    return s.value ? s.value.te(i, f) : !1;
  }
  function Se(i) {
    return s.value ? s.value.getLocaleMessage(i) : {};
  }
  function at(i, f) {
    s.value && (s.value.setLocaleMessage(i, f), (d.value[i] = f));
  }
  function Nt(i, f) {
    s.value && s.value.mergeLocaleMessage(i, f);
  }
  function wt(i) {
    return s.value ? s.value.getDateTimeFormat(i) : {};
  }
  function Ne(i, f) {
    s.value && (s.value.setDateTimeFormat(i, f), (h.value[i] = f));
  }
  function $e(i, f) {
    s.value && s.value.mergeDateTimeFormat(i, f);
  }
  function ze(i) {
    return s.value ? s.value.getNumberFormat(i) : {};
  }
  function we(i, f) {
    s.value && (s.value.setNumberFormat(i, f), (E.value[i] = f));
  }
  function Xe(i, f) {
    s.value && s.value.mergeNumberFormat(i, f);
  }
  const et = {
    get id() {
      return s.value ? s.value.id : -1;
    },
    locale: S,
    fallbackLocale: H,
    messages: V,
    datetimeFormats: K,
    numberFormats: q,
    get inheritLocale() {
      return s.value ? s.value.inheritLocale : o;
    },
    set inheritLocale(i) {
      s.value && (s.value.inheritLocale = i);
    },
    get availableLocales() {
      return s.value ? s.value.availableLocales : Object.keys(d.value);
    },
    get modifiers() {
      return s.value ? s.value.modifiers : g;
    },
    get pluralRules() {
      return s.value ? s.value.pluralRules : y;
    },
    get isGlobal() {
      return s.value ? s.value.isGlobal : !1;
    },
    get missingWarn() {
      return s.value ? s.value.missingWarn : b;
    },
    set missingWarn(i) {
      s.value && (s.value.missingWarn = i);
    },
    get fallbackWarn() {
      return s.value ? s.value.fallbackWarn : I;
    },
    set fallbackWarn(i) {
      s.value && (s.value.missingWarn = i);
    },
    get fallbackRoot() {
      return s.value ? s.value.fallbackRoot : O;
    },
    set fallbackRoot(i) {
      s.value && (s.value.fallbackRoot = i);
    },
    get fallbackFormat() {
      return s.value ? s.value.fallbackFormat : k;
    },
    set fallbackFormat(i) {
      s.value && (s.value.fallbackFormat = i);
    },
    get warnHtmlMessage() {
      return s.value ? s.value.warnHtmlMessage : C;
    },
    set warnHtmlMessage(i) {
      s.value && (s.value.warnHtmlMessage = i);
    },
    get escapeParameter() {
      return s.value ? s.value.escapeParameter : T;
    },
    set escapeParameter(i) {
      s.value && (s.value.escapeParameter = i);
    },
    t: J,
    getPostTranslationHandler: fe,
    setPostTranslationHandler: de,
    getMissingHandler: Ke,
    setMissingHandler: ot,
    rt: ee,
    d: ye,
    n: it,
    tm: Ye,
    te: He,
    getLocaleMessage: Se,
    setLocaleMessage: at,
    mergeLocaleMessage: Nt,
    getDateTimeFormat: wt,
    setDateTimeFormat: Ne,
    mergeDateTimeFormat: $e,
    getNumberFormat: ze,
    setNumberFormat: we,
    mergeNumberFormat: Xe,
  };
  function a(i) {
    (i.locale.value = u.value),
      (i.fallbackLocale.value = c.value),
      Object.keys(d.value).forEach((f) => {
        i.mergeLocaleMessage(f, d.value[f]);
      }),
      Object.keys(h.value).forEach((f) => {
        i.mergeDateTimeFormat(f, h.value[f]);
      }),
      Object.keys(E.value).forEach((f) => {
        i.mergeNumberFormat(f, E.value[f]);
      }),
      (i.escapeParameter = T),
      (i.fallbackFormat = k),
      (i.fallbackRoot = O),
      (i.fallbackWarn = I),
      (i.missingWarn = b),
      (i.warnHtmlMessage = C);
  }
  return (
    lo(() => {
      if (e.proxy == null || e.proxy.$i18n == null)
        throw pe(me.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
      const i = (s.value = e.proxy.$i18n.__composer);
      t === "global"
        ? ((u.value = i.locale.value),
          (c.value = i.fallbackLocale.value),
          (d.value = i.messages.value),
          (h.value = i.datetimeFormats.value),
          (E.value = i.numberFormats.value))
        : l && a(i);
    }),
    et
  );
}
const Gc = ["locale", "fallbackLocale", "availableLocales"],
  Zc = ["t", "rt", "d", "n", "tm"];
function qc(e, t) {
  const n = Object.create(null);
  Gc.forEach((r) => {
    const l = Object.getOwnPropertyDescriptor(t, r);
    if (!l) throw pe(me.UNEXPECTED_ERROR);
    const s = Ee(l.value)
      ? {
          get() {
            return l.value.value;
          },
          set(o) {
            l.value.value = o;
          },
        }
      : {
          get() {
            return l.get && l.get();
          },
        };
    Object.defineProperty(n, r, s);
  }),
    (e.config.globalProperties.$i18n = n),
    Zc.forEach((r) => {
      const l = Object.getOwnPropertyDescriptor(t, r);
      if (!l || !l.value) throw pe(me.UNEXPECTED_ERROR);
      Object.defineProperty(e.config.globalProperties, `$${r}`, l);
    });
}
gc(Tc);
bc(Qu);
Ec(ko);
Fc();
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = _n();
  (e.__INTLIFY__ = !0), ic(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const as = {
    header: {
      downloadCv: "\u0441\u043A\u0430\u0447\u0430\u0442\u044C cv",
      link: "https://andrey-fanin.github.io/cv/Andrey_Fanin_Frontend_developer_CV_RU.pdf",
    },
    aboutMe: {
      title: "\u041E\u0431\u043E \u043C\u043D\u0435",
      descrFirst:
        "\u0412\u0441\u0451, \u0447\u0442\u043E \u044F \u0434\u0435\u043B\u0430\u044E - \u043E\u043D\u043E \u0441 \u043B\u044E\u0434\u044C\u043C\u0438, \u043F\u0440\u043E \u043B\u044E\u0434\u0435\u0439, \u0434\u043B\u044F \u043B\u044E\u0434\u0435\u0439",
      descrSecond:
        "\u041D\u043E\u0432\u044B\u0439 \u0434\u0435\u043D\u044C - \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u0439 \u043F\u043E\u0432\u043E\u0434 \u0438\u0437\u0443\u0447\u0438\u0442\u044C \u0447\u0442\u043E-\u0442\u043E \u043D\u043E\u0432\u043E\u0435",
      descrThird:
        "<\u043F\u0440\u043E\u0441\u043D\u0438\u0441\u044C \u0438 \u043A\u043E\u0434\u044C />",
    },
    contacts: {
      title:
        "\u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043C\u043D\u0435",
    },
    preview: {
      info: "\u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E \u0444\u0440\u043E\u043D\u0442\u0435\u043D\u0434-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430",
    },
    projectsDescr: {
      onlineShop: [
        "\u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043C\u0430\u0433\u0430\u0437\u0438\u043D \u0441 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0435\u0439 \u0438 \u0430\u0434\u043C\u0438\u043D-\u043F\u0430\u043D\u0435\u043B\u044C\u044E",
        "\u0434\u0435\u043C\u043E-\u0432\u0435\u0440\u0441\u0438\u044F \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u0430 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E supabase",
      ],
      bankApp: [
        "\u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0434\u0435\u043D\u0435\u0436\u043D\u044B\u0445 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u0432",
      ],
      vuelance: [
        "\u041B\u0430\u0439\u0442-\u0432\u0435\u0440\u0441\u0438\u044F \u0444\u0440\u0438\u043B\u0430\u043D\u0441-\u0431\u0438\u0440\u0436\u0438",
      ],
      todo: [
        "SPA \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0432\u0441\u0435\u0433\u043E \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u0430 Vue",
        "\u0417\u0430\u0434\u0430\u0447\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432 localstorage",
        "\u041F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u043F\u044F\u0442\u043E\u0433\u043E \u0442\u0430\u0441\u043A\u0430 \u0432\u0430\u043C \u043F\u043E\u043A\u0430\u0436\u0443\u0442 \u043B\u044E\u0431\u0438\u043C\u0443\u044E \u0441\u043E\u0431\u0430\u043A\u0443, \u0430 \u043F\u0440\u0438 \u043E\u0447\u0438\u0441\u0442\u043A\u0435 \u0441\u043F\u0438\u0441\u043A\u043E\u0432 \u0432\u044B \u0443\u0432\u0438\u0434\u0438\u0442\u0435 \u043F\u043E\u043B\u0435\u0437\u043D\u044B\u0439 \u0441\u043E\u0432\u0435\u0442",
      ],
      beats: [
        "\u041B\u0435\u043D\u0434\u0438\u043D\u0433 \u0441 \u0432\u0438\u0434\u0436\u0435\u0442\u0430\u043C\u0438",
        "\u0420\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D \u0430\u0434\u0430\u043F\u0442\u0438\u0432\u043D\u043E\u0439 \u0432\u0451\u0440\u0441\u0442\u043A\u043E\u0439 \u0441 One Page Scroll \u0438 \u0441 \u0444\u043E\u0440\u043C\u043E\u0439 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 xhr",
      ],
      soloNika: [
        "\u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043C\u0430\u0433\u0430\u0437\u0438\u043D \u0435\u0432\u0440\u043E\u043F\u0435\u0439\u0441\u043A\u043E\u0439 \u043C\u0435\u0431\u0435\u043B\u0438",
      ],
      videoProduction: [
        "\u041C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043D\u044B\u0439 \u0441\u0430\u0439\u0442 \u0441 \u0440\u0435\u0437\u0438\u043D\u043E\u0432\u043E\u0439 \u0432\u0451\u0440\u0441\u0442\u043A\u043E\u0439 \u0438 \u0444\u043E\u0440\u043C\u0430\u043C\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u043E\u0442\u0437\u044B\u0432\u043E\u0432",
      ],
    },
  },
  us = {
    header: {
      downloadCv: "download cv",
      link: "https://andrey-fanin.github.io/cv/Andrey_Fanin_Frontend_developer_CV_EN.pdf",
    },
    aboutMe: {
      title: "About me",
      descrFirst: "Everything I do is with people, about people, for people",
      descrSecond: "every day is a good reason to learn something new",
      descrThird: "<wake up and code />",
    },
    contacts: { title: "contact me" },
    preview: { info: "frontend developer's portfolio" },
    projectsDescr: {
      onlineShop: [
        "web-app with authorization and admin panel",
        "live demo is working with supabase",
      ],
      bankApp: ["mobile-app for money transfers "],
      vuelance: ["light version of freelance services"],
      todo: [
        "SPA using all the main functionality",
        "Tasks will be saved in localstorage",
        "You'll see lovely dog, when you'll create the fifth task, and there will be a useful advice, when list will be cleared",
      ],
      beats: [
        "Landing with widgets",
        "Created with responsive design and One Page Scroll function. Also it has xhr form.",
      ],
      soloNika: ["online-shop for european furniture"],
      videoProduction: [
        "Multipage site with responsive design and feedback forms",
      ],
    },
  },
  Jc = new Proxy(new URLSearchParams(window.location.search), {
    get: (e, t) => e.get(t),
  }),
  cs = Jc.lang,
  Qc = Vc({ locale: cs === "ru" ? "ru" : "en", messages: { ru: as, en: us } });
const fs = {
  __name: "WrapperComponent",
  props: { class: { type: String, default: "" } },
  setup(e) {
    const t = e;
    let n = Oe("");
    return (
      t.class && (n = "wrapper--" + t.class),
      (r, l) => (
        U(),
        G(
          "div",
          { class: yn(["wrapper", We(n)]) },
          [io(r.$slots, "default")],
          2
        )
      )
    );
  },
};
const Yo = {
  __name: "ContainerComponent",
  props: { class: { type: String, default: "" } },
  setup(e) {
    const t = e;
    let n = Oe("");
    return (
      t.class && (n = "container--" + t.class),
      (r, l) => (
        U(),
        G(
          "div",
          { class: yn(["container", We(n)]) },
          [io(r.$slots, "default")],
          2
        )
      )
    );
  },
};
let Un;
cs === "ru" ? (Un = { ...as.header }) : (Un = { ...us.header });
const zc = [
    { id: 1, name: "react" },
    { id: 2, name: "vue" },
    { id: 3, name: "js" },
    { id: 2, name: "html+css" },
  ],
  ef = [
    { id: 1, name: "github", link: "https://github.com/andrey-fanin" },
    { id: 2, name: Un.downloadCv, link: Un.link },
  ];
const tf = { class: "header" },
  nf = { class: "header__nav" },
  rf = { class: "anchors__list" },
  sf = { class: "anchor__item", key: "item.id" },
  lf = ["href"],
  of = { key: 0, class: "links__list" },
  af = { class: "link__item", key: "item.id" },
  uf = ["href"],
  cf = {
    __name: "HeaderComponent",
    setup(e) {
      const t = Xt("mobile");
      return (n, r) => (
        U(),
        Te(
          fs,
          { class: "header" },
          {
            default: qt(() => [
              se(
                Yo,
                { class: "header" },
                {
                  default: qt(() => [
                    $("header", tf, [
                      $("nav", nf, [
                        $("ul", rf, [
                          (U(!0),
                          G(
                            ce,
                            null,
                            dt(
                              We(zc),
                              (l) => (
                                U(),
                                G("li", sf, [
                                  $(
                                    "a",
                                    { href: "#" + l.name },
                                    Fe(l.name),
                                    9,
                                    lf
                                  ),
                                ])
                              )
                            ),
                            128
                          )),
                        ]),
                        We(t)
                          ? dn("", !0)
                          : (U(),
                            G("ul", of, [
                              (U(!0),
                              G(
                                ce,
                                null,
                                dt(
                                  We(ef),
                                  (l) => (
                                    U(),
                                    G("li", af, [
                                      $(
                                        "a",
                                        { href: l.link },
                                        Fe(l.name),
                                        9,
                                        uf
                                      ),
                                    ])
                                  )
                                ),
                                128
                              )),
                            ])),
                      ]),
                    ]),
                  ]),
                  _: 1,
                }
              ),
            ]),
            _: 1,
          }
        )
      );
    },
  },
  xt = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, l] of t) n[r] = l;
    return n;
  },
  ff = {},
  df = {
    viewBox: "0 0 1770 223",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  _f = vo(
    '<path d="M41.5495 194.532H0L56.4647 45.3797H99.0797L155.544 194.532H113.995L104.407 167.898H51.1379L41.5495 194.532ZM60.7262 140.198H94.8182L77.7722 90.1253L60.7262 140.198Z" fill="white"></path><path d="M296.165 194.532H257.812V133.806H204.543V194.532H166.19V45.3797H204.543V103.975H257.812V45.3797H296.165V194.532Z" fill="white"></path><path d="M343.141 45.3797H455.006V164.701H470.986V222.232H434.764L432.633 194.532H349.534L347.403 222.232H311.18V164.701H325.03C329.15 160.014 332.204 154.758 334.192 148.934C336.323 142.968 337.531 137.57 337.815 132.74L343.141 45.3797ZM416.652 164.701V75.2101H377.233L374.037 128.479C373.611 137.144 371.48 145.88 367.645 154.687C366.083 158.38 364.307 161.718 362.318 164.701H416.652Z" fill="white"></path><path d="M488.09 45.3797H577.582C592.497 45.3797 603.293 48.7889 609.969 55.6073C616.787 62.2836 620.197 73.0794 620.197 87.9946V109.302C620.197 124.217 616.787 135.084 609.969 141.902C603.293 148.579 592.497 151.917 577.582 151.917H526.444V194.532H488.09V45.3797ZM581.843 87.9946C581.843 79.4716 577.582 75.2101 569.059 75.2101H526.444V122.087H569.059C577.582 122.087 581.843 117.825 581.843 109.302V87.9946Z" fill="white"></path><path d="M757.621 194.532H639.365V45.3797H757.621V75.2101H677.718V103.975H740.575V133.806H677.718V164.701H757.621V194.532Z" fill="white"></path><path d="M866.239 194.532V102.91L815.102 194.532H774.617V45.3797H812.971V137.002L864.109 45.3797H904.593V194.532H866.239ZM827.886 34.7259C809.42 34.7259 800.186 25.4927 800.186 7.02626V0.634033H827.886V5.96089C827.886 8.09163 828.596 9.86726 830.017 11.2878C831.437 12.7083 833.213 13.4185 835.344 13.4185H841.736C843.867 13.4185 845.642 12.7083 847.063 11.2878C848.483 9.86726 849.193 8.09163 849.193 5.96089V0.634033H876.893V7.02626C876.893 25.4927 867.66 34.7259 849.193 34.7259H827.886Z" fill="white"></path><path d="M1162.47 141.263C1162.47 156.178 1159.06 167.045 1152.24 173.864C1145.57 180.54 1134.77 183.878 1119.86 183.878H1094.29V198.793H1055.93V183.878H1030.37C1015.45 183.878 1004.58 180.54 997.765 173.864C991.088 167.045 987.75 156.178 987.75 141.263V98.6483C987.75 83.7331 991.088 72.9373 997.765 66.261C1004.58 59.4426 1015.45 56.0334 1030.37 56.0334H1055.93V41.1182H1094.29V56.0334H1119.86C1134.77 56.0334 1145.57 59.4426 1152.24 66.261C1159.06 72.9373 1162.47 83.7331 1162.47 98.6483V141.263ZM1124.12 98.6483C1124.12 90.1253 1119.86 85.8638 1111.33 85.8638H1092.16V154.048H1111.33C1119.86 154.048 1124.12 149.786 1124.12 141.263V98.6483ZM1026.1 141.263C1026.1 149.786 1030.37 154.048 1038.89 154.048H1058.06V85.8638H1038.89C1030.37 85.8638 1026.1 90.1253 1026.1 98.6483V141.263Z" fill="white"></path><path d="M1204.1 194.532H1162.55L1219.01 45.3797H1261.63L1318.09 194.532H1276.54L1266.95 167.898H1213.68L1204.1 194.532ZM1223.27 140.198H1257.36L1240.32 90.1253L1223.27 140.198Z" fill="white"></path><path d="M1458.71 194.532H1420.36V133.806H1367.09V194.532H1328.74V45.3797H1367.09V103.975H1420.36V45.3797H1458.71V194.532Z" fill="white"></path><path d="M1614.36 194.532H1576V102.91L1524.86 194.532H1484.38V45.3797H1522.73V137.002L1573.87 45.3797H1614.36V194.532Z" fill="white"></path><path d="M1770 194.532H1731.65V133.806H1678.38V194.532H1640.02V45.3797H1678.38V103.975H1731.65V45.3797H1770V194.532Z" fill="white"></path>',
    11
  ),
  mf = [_f];
function hf(e, t) {
  return U(), G("svg", df, mf);
}
const Xo = xt(ff, [["render", hf]]),
  pf = {},
  gf = {
    viewBox: "0 0 1770 164",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  bf = vo(
    '<path d="M45.4734 163.238H0L61.7972 0L108.437 0L170.234 163.238H124.76L114.266 134.088H55.9672L45.4734 163.238ZM66.4611 103.773H103.773L85.1168 48.9713L66.4611 103.773Z" fill="white"></path><path d="M324.134 163.238H279.827L223.86 65.2951V163.238H181.884V0L226.192 0L282.159 97.9427V0L324.134 0V163.238Z" fill="white"></path><path d="M443.174 0C460.742 0 474.034 4.5862 483.051 13.7586C492.223 22.7756 496.809 36.0678 496.809 53.6353V109.603C496.809 127.17 492.223 140.54 483.051 149.712C474.034 158.729 460.742 163.238 443.174 163.238H352.227V0L443.174 0ZM454.834 53.6353C454.834 39.6435 447.838 32.6476 433.846 32.6476H394.203V130.59H433.846C447.838 130.59 454.834 123.594 454.834 109.603V53.6353Z" fill="white"></path><path d="M520.065 0L618.008 0C634.332 0 646.147 3.73115 653.454 11.1935C660.916 18.5003 664.647 30.3156 664.647 46.6394V67.6271C664.647 80.5306 662.471 90.5581 658.118 97.7095C653.92 104.861 647.158 109.603 637.83 111.934L666.979 163.238H621.506L594.688 114.266H562.041V163.238H520.065V0ZM622.672 46.6394C622.672 37.3115 618.008 32.6476 608.68 32.6476H562.041V81.6189H608.68C618.008 81.6189 622.672 76.9549 622.672 67.6271V46.6394Z" fill="white"></path><path d="M817.327 163.238H687.903V0L817.327 0V32.6476H729.879V64.1291H798.672V96.7767H729.879V130.59H817.327V163.238Z" fill="white"></path><path d="M817.273 0L861.58 0L900.058 79.2869L938.535 0L982.843 0L921.045 120.096V163.238H879.07V120.096L817.273 0Z" fill="white"></path><path d="M1104.04 163.238H1062.07V0L1191.49 0V32.6476H1104.04V71.125H1172.83V103.773H1104.04V163.238Z" fill="white"></path><path d="M1223.07 163.238H1177.6L1239.4 0L1286.03 0L1347.83 163.238H1302.36L1291.86 134.088H1233.57L1223.07 163.238ZM1244.06 103.773H1281.37L1262.72 48.9713L1244.06 103.773Z" fill="white"></path><path d="M1501.73 163.238H1457.43L1401.46 65.2951V163.238H1359.48V0L1403.79 0L1459.76 97.9427V0L1501.73 0V163.238Z" fill="white"></path><path d="M1606.78 163.238H1522.83V130.59H1543.82V32.6476H1522.83V0L1606.78 0V32.6476H1585.79V130.59H1606.78V163.238Z" fill="white"></path><path d="M1770 163.238H1725.69L1669.73 65.2951V163.238H1627.75V0L1672.06 0L1728.02 97.9427V0L1770 0V163.238Z" fill="white"></path>',
    11
  ),
  Ef = [bf];
function Cf(e, t) {
  return U(), G("svg", gf, Ef);
}
const Go = xt(pf, [["render", Cf]]);
const vf = { class: "preview__general" },
  Lf = ["locale"],
  yf = { class: "preview__general-info" },
  Tf = {
    __name: "PreviewGeneralComponent",
    setup(e) {
      return (t, n) => (
        U(),
        Te(fs, null, {
          default: qt(() => [
            se(Yo, null, {
              default: qt(() => [
                $("div", vf, [
                  $(
                    "div",
                    { class: "preview__general-title", locale: t.$i18n.locale },
                    [
                      t.$i18n.locale === "ru"
                        ? (U(), Te(Xo, { key: 0 }))
                        : (U(), Te(Go, { key: 1 })),
                    ],
                    8,
                    Lf
                  ),
                  $("p", yf, Fe(t.$t("preview.info")), 1),
                ]),
              ]),
              _: 1,
            }),
          ]),
          _: 1,
        })
      );
    },
  },
  If = {},
  Nf = {
    width: "60",
    height: "67",
    viewBox: "0 0 60 67",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  wf = $(
    "path",
    {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M51.2211 24.6336L26.5875 0L18.161 8.4265L36.322 26.5875H0L1.53057e-07 39.4229H36.4318L18.159 57.6957L26.588 66.1247L59.6505 33.0623L51.2214 24.6332L51.2211 24.6336Z",
      fill: "white",
    },
    null,
    -1
  ),
  kf = [wf];
function Af(e, t) {
  return U(), G("svg", Nf, kf);
}
const Ff = xt(If, [["render", Af]]),
  Of = "/assets/bank-app.8607e8f1.mp4",
  Pf = "/assets/beats.66da9359.mp4",
  Mf = "/assets/online-shop.6b880298.webm",
  Sf = "/assets/solo-nika.1bd51eec.mp4",
  Df = "/assets/todo.4d987a41.mp4",
  Rf = "/assets/video-production.3916f100.mp4",
  xf = "/assets/vuelance.d2393e66.mp4",
  Hf = ["src"],
  $f = {
    __name: "VideoComponent",
    props: { videoSrc: { type: String, default: "" } },
    setup(e) {
      const t = e;
      function n() {
        return new URL(
          Object.assign({
            "/cv/assets/video/bank-app.mp4": Of,
            "/cv/assets/video/beats.mp4": Pf,
            "/cv/assets/video/online-shop.webm": Mf,
            "/cv/assets/video/solo-nika.mp4": Sf,
            "/cv/assets/video/todo.mp4": Df,
            "/cv/assets/video/video-production.mp4": Rf,
            "/cv/assets/video/vuelance.mp4": xf,
          })[`/cv/assets/video/${t.videoSrc}`],
          self.location
        );
      }
      const r = Oe(null),
        l = Oe(null);
      function s() {
        setInterval(function () {
          l.value.value = Math.round(
            (r.value.currentTime / r.value.duration) * 100
          );
        });
      }
      return (
        Tn(() => {
          r.value.addEventListener("play", s);
        }),
        Jn(() => {
          r.value.removeEventListener("play", s);
        }),
        (o, u) => (
          U(),
          G(
            ce,
            null,
            [
              $(
                "video",
                {
                  src: n(),
                  preload: "auto",
                  ref_key: "video",
                  ref: r,
                  autoplay: "",
                  loop: "",
                  playsinline: "",
                  muted: "",
                },
                null,
                8,
                Hf
              ),
              $(
                "progress",
                {
                  id: "progress",
                  ref_key: "progress",
                  ref: l,
                  max: "100",
                  value: "0",
                },
                "Progress",
                512
              ),
            ],
            64
          )
        )
      );
    },
  };
const Vf = {
    key: 0,
    class: "project__item-content__tags project__item-content__tags--mobile",
  },
  Uf = { class: "tags__list" },
  Wf = { class: "tag__item" },
  jf = { class: "project__item-content__wrap" },
  Bf = { class: "project__item-content" },
  Kf = { key: 0, class: "project__item-content__tags" },
  Yf = { class: "tags__list" },
  Xf = { class: "tag__item" },
  Gf = { class: "project__item-content__info" },
  Zf = { class: "content__info-text" },
  qf = { class: "content__info-text__title" },
  Jf = { class: "content__info-text__descr" },
  Qf = ["href"],
  zf = { class: "info__link-arrow" },
  bl = {
    __name: "ProjectsItem",
    props: { item: { type: Object } },
    setup(e) {
      const t = Xt("mobile");
      let n = Oe(!1);
      return (r, l) => (
        U(),
        G(
          "li",
          {
            class: "projects-row__project-item",
            onMouseover:
              l[0] || (l[0] = (s) => (Ee(n) ? (n.value = !0) : (n = !0))),
          },
          [
            We(t)
              ? (U(),
                G("div", Vf, [
                  $("ul", Uf, [
                    (U(!0),
                    G(
                      ce,
                      null,
                      dt(e.item.tags, (s) => (U(), G("li", Wf, Fe(s), 1))),
                      256
                    )),
                  ]),
                ]))
              : dn("", !0),
            $("div", jf, [
              $("div", Bf, [
                We(t)
                  ? dn("", !0)
                  : (U(),
                    G("div", Kf, [
                      $("ul", Yf, [
                        (U(!0),
                        G(
                          ce,
                          null,
                          dt(e.item.tags, (s) => (U(), G("li", Xf, Fe(s), 1))),
                          256
                        )),
                      ]),
                    ])),
                $("div", Gf, [
                  $("div", Zf, [
                    $("div", qf, Fe(e.item.title), 1),
                    (U(!0),
                    G(
                      ce,
                      null,
                      dt(e.item.descr, (s) => (U(), G("p", Jf, Fe(s), 1))),
                      256
                    )),
                  ]),
                  $(
                    "a",
                    { href: e.item.link, class: "content__info-link" },
                    [$("div", zf, [se(Ff)])],
                    8,
                    Qf
                  ),
                ]),
                We(n) && !We(t)
                  ? (U(),
                    Te(
                      oa,
                      { key: 1 },
                      [
                        se($f, { videoSrc: e.item.videoSrc }, null, 8, [
                          "videoSrc",
                        ]),
                      ],
                      1024
                    ))
                  : dn("", !0),
              ]),
            ]),
          ],
          32
        )
      );
    },
  };
const ed = { class: "" },
  td = ["id"],
  nd = { class: "projects-row-title" },
  rd = { class: "projects-row__projects-list" },
  sd = { class: "about__block" },
  ld = { class: "about__block-title" },
  od = { class: "about__block-descr" },
  id = ["id"],
  ad = { class: "projects-row-title" },
  ud = { class: "projects-row__projects-list" },
  cd = {
    __name: "ProjectsRow",
    props: { row: { type: Object } },
    setup(e) {
      return (t, n) =>
        e.row.title === "html+css"
          ? (U(),
            G(
              ce,
              { key: 0 },
              [
                $("div", ed, [
                  $(
                    "a",
                    { id: e.row.title },
                    [$("h2", nd, Fe(e.row.title), 1)],
                    8,
                    td
                  ),
                  $("div", rd, [
                    (U(!0),
                    G(
                      ce,
                      null,
                      dt(
                        e.row.row,
                        (r) => (U(), Te(bl, { item: r }, null, 8, ["item"]))
                      ),
                      256
                    )),
                  ]),
                ]),
                $("div", sd, [
                  $("h2", ld, Fe(t.$t("aboutMe.title")), 1),
                  $("div", od, [
                    $("p", null, Fe(t.$t("aboutMe.descrFirst")), 1),
                    $("p", null, Fe(t.$t("aboutMe.descrSecond")), 1),
                    $("p", null, Fe(t.$t("aboutMe.descrThird")), 1),
                  ]),
                ]),
              ],
              64
            ))
          : (U(),
            G(
              ce,
              { key: 1 },
              [
                $(
                  "a",
                  { id: e.row.title },
                  [$("h2", ad, Fe(e.row.title), 1)],
                  8,
                  id
                ),
                $("ul", ud, [
                  (U(!0),
                  G(
                    ce,
                    null,
                    dt(
                      e.row.row,
                      (r) => (U(), Te(bl, { item: r }, null, 8, ["item"]))
                    ),
                    256
                  )),
                ]),
              ],
              64
            ));
    },
  },
  fd = "https://andrey-fanin.github.io/video-production/",
  dd = "https://andrey-fanin.github.io/beats/",
  _d = "https://andrey-fanin.github.io/vuelance/",
  md = "https://andrey-fanin.github.io/todo/",
  hd = "https://solo-nika.ru/",
  pd = "https://andrey-fanin.github.io/online-shop/",
  gd = "https://andrey-fanin.github.io/bank-app/";
let ct;
cs === "ru" ? (ct = { ...as }) : (ct = { ...us });
const bd = {
  react: {
    title: "react",
    row: {
      onlineShop: {
        title: "online shop",
        descr: ct.projectsDescr.onlineShop,
        tags: [
          "react",
          "postgresql",
          "express.js",
          "node.js",
          "react-bootstrap",
          "supabase",
        ],
        link: pd,
        videoSrc: "online-shop.webm",
      },
      bankApp: {
        title: "bank app",
        descr: ct.projectsDescr.bankApp,
        tags: ["react", "react-query", "chakra-ui"],
        link: gd,
        videoSrc: "bank-app.mp4",
      },
    },
  },
  vue: {
    title: "vue",
    row: {
      vuelance: {
        title: "vuelance",
        descr: ct.projectsDescr.vuelance,
        tags: ["vue", "vuex", "vue-router"],
        link: _d,
        videoSrc: "vuelance.mp4",
      },
      todo: {
        title: "todo",
        descr: ct.projectsDescr.todo,
        tags: ["vue", "pug"],
        link: md,
        videoSrc: "todo.mp4",
      },
    },
  },
  js: {
    title: "js",
    row: {
      beats: {
        title: "beats",
        descr: ct.projectsDescr.beats,
        tags: ["js", "jquery", "html", "css"],
        link: dd,
        videoSrc: "beats.mp4",
      },
      soloNika: {
        title: "solo-nika",
        descr: ct.projectsDescr.soloNika,
        tags: ["js", "php", "bitrix"],
        link: hd,
        videoSrc: "solo-nika.mp4",
      },
    },
  },
  htmlCss: {
    title: "html+css",
    row: {
      videoProduction: {
        title: "video-production",
        descr: ct.projectsDescr.videoProduction,
        tags: ["html", "css"],
        link: fd,
        videoSrc: "video-production.mp4",
      },
    },
  },
};
const Ed = { class: "portfolio__projects-rows__list" },
  Cd = { class: "portfolio__projects-row__item" },
  vd = {
    __name: "ProjectsList",
    setup(e) {
      return (t, n) => (
        U(),
        G("ul", Ed, [
          (U(!0),
          G(
            ce,
            null,
            dt(
              We(bd),
              (r) => (U(), G("li", Cd, [se(cd, { row: r }, null, 8, ["row"])]))
            ),
            256
          )),
        ])
      );
    },
  };
const Ld = { class: "wrapper wrapper--portfolio" },
  yd = { class: "container container--portfolio" },
  Td = {
    __name: "PortfolioComponent",
    setup(e) {
      return (t, n) => (U(), G("div", Ld, [$("div", yd, [se(vd)])]));
    },
  },
  Id = {},
  Nd = {
    width: "22",
    height: "22",
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  wd = $(
    "path",
    {
      d: "M2.65887 10.7226C4.46918 9.71382 6.48998 8.87188 8.37811 8.02564C11.6264 6.63957 14.8877 5.27751 18.1818 4.00946C18.8228 3.79339 19.9743 3.58209 20.0873 4.54296C20.0254 5.90306 19.7711 7.25519 19.5966 8.60732C19.1538 11.5808 18.642 14.5441 18.1429 17.5077C17.9709 18.4949 16.7485 19.006 15.9663 18.3742C14.0865 17.0897 12.1923 15.8177 10.3366 14.5035C9.72869 13.8786 10.2924 12.9812 10.8353 12.535C12.3835 10.9915 14.0254 9.68007 15.4927 8.05678C15.8885 7.08984 14.7191 7.90475 14.3333 8.15443C12.2138 9.63203 10.1462 11.1998 7.91153 12.4984C6.77008 13.1341 5.4397 12.5909 4.29876 12.2362C3.27577 11.8077 1.7767 11.376 2.65876 10.7227L2.65887 10.7226Z",
      fill: "white",
    },
    null,
    -1
  ),
  kd = [wd];
function Ad(e, t) {
  return U(), G("svg", Nd, kd);
}
const Fd = xt(Id, [["render", Ad]]),
  Od = {},
  Pd = {
    width: "22",
    height: "22",
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  Md = $(
    "path",
    {
      d: "M5.17419 3.43435L5.49854 3.10999C5.89544 2.7131 6.53892 2.7131 6.93582 3.10999L9.32463 5.49881C9.72152 5.8957 9.72152 6.53919 9.32463 6.93608L7.65242 8.60829C7.36654 8.89418 7.29566 9.33093 7.47647 9.69255C8.52172 11.783 10.2168 13.4781 12.3073 14.5234C12.6689 14.7042 13.1057 14.6333 13.3916 14.3474L15.0638 12.6752C15.4607 12.2783 16.1041 12.2783 16.501 12.6752L18.8898 15.064C19.2867 15.4609 19.2867 16.1044 18.8898 16.5013L18.5655 16.8257C16.4197 18.9714 13.0227 19.2129 10.595 17.3921L9.84513 16.8297C8.07317 15.5007 6.4991 13.9267 5.17013 12.1547L4.60774 11.4049C2.78699 8.97719 3.02841 5.58013 5.17419 3.43435Z",
      fill: "white",
    },
    null,
    -1
  ),
  Sd = [Md];
function Dd(e, t) {
  return U(), G("svg", Pd, Sd);
}
const Rd = xt(Od, [["render", Dd]]),
  xd = {},
  Hd = {
    width: "22",
    height: "22",
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  $d = $(
    "path",
    {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M2.4036 8.38534C2.39063 8.91514 2.39062 9.51662 2.39062 10.2028V12.1689C2.39062 14.9495 2.39062 16.3398 3.25445 17.2037C4.11827 18.0675 5.50857 18.0675 8.28917 18.0675H14.1877C16.9683 18.0675 18.3586 18.0675 19.2225 17.2037C20.0863 16.3398 20.0863 14.9495 20.0863 12.1689V10.2027C20.0863 9.51662 20.0863 8.91514 20.0733 8.38534L12.1933 12.7631C11.5995 13.093 10.8774 13.093 10.2836 12.7631L2.4036 8.38534ZM2.62947 6.29963C2.71095 6.32008 2.79113 6.3514 2.86806 6.39414L11.2385 11.0444L19.6088 6.39414C19.6858 6.3514 19.7659 6.32009 19.8474 6.29963C19.7197 5.8341 19.5235 5.46908 19.2225 5.16802C18.3586 4.3042 16.9683 4.3042 14.1877 4.3042H8.28918C5.50857 4.3042 4.11827 4.3042 3.25445 5.16802C2.95339 5.46908 2.75725 5.8341 2.62947 6.29963Z",
      fill: "white",
    },
    null,
    -1
  ),
  Vd = [$d];
function Ud(e, t) {
  return U(), G("svg", Hd, Vd);
}
const Wd = xt(xd, [["render", Ud]]),
  jd = {},
  Bd = {
    width: "22",
    height: "22",
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  Kd = $(
    "g",
    { "clip-path": "url(#clip0_6_173)" },
    [
      $("path", {
        d: "M20.5243 5.74751C19.5406 4.06215 18.2064 2.72785 16.5212 1.74431C14.8357 0.760714 12.9957 0.269043 10.9998 0.269043C9.00419 0.269043 7.16357 0.760865 5.47847 1.74431C3.79311 2.7278 2.45891 4.06215 1.47527 5.74751C0.491772 7.43282 0 9.27319 0 11.2686C0 13.6655 0.699306 15.8208 2.09827 17.7352C3.49708 19.6497 5.30414 20.9745 7.5193 21.7096C7.77715 21.7575 7.96803 21.7238 8.09214 21.6095C8.2163 21.495 8.2783 21.3517 8.2783 21.18C8.2783 21.1514 8.27584 20.8937 8.27108 20.4066C8.26616 19.9195 8.26385 19.4946 8.26385 19.1321L7.93442 19.1891C7.72437 19.2276 7.4594 19.2439 7.13949 19.2393C6.81974 19.2348 6.48779 19.2013 6.14411 19.139C5.80028 19.0772 5.48047 18.934 5.18445 18.7096C4.88857 18.4852 4.67853 18.1915 4.55437 17.8289L4.41115 17.4993C4.31568 17.2799 4.16539 17.0361 3.96006 16.769C3.75473 16.5015 3.5471 16.3202 3.33705 16.2248L3.23677 16.153C3.16995 16.1053 3.10795 16.0477 3.05061 15.981C2.99332 15.9142 2.95043 15.8474 2.92179 15.7804C2.89309 15.7135 2.91687 15.6585 2.99337 15.6155C3.06987 15.5724 3.20813 15.5514 3.40874 15.5514L3.69509 15.5942C3.88607 15.6325 4.12229 15.7468 4.40407 15.9379C4.6857 16.1288 4.91722 16.3771 5.09866 16.6825C5.31839 17.0741 5.58311 17.3724 5.89359 17.5778C6.20381 17.7831 6.51659 17.8856 6.83163 17.8856C7.14667 17.8856 7.41877 17.8617 7.64802 17.8142C7.87703 17.7664 8.09188 17.6947 8.2925 17.5992C8.37843 16.9592 8.6124 16.4676 8.99421 16.1239C8.45002 16.0667 7.96075 15.9806 7.52617 15.866C7.09184 15.7513 6.64301 15.5652 6.17998 15.3072C5.7167 15.0495 5.33239 14.7295 5.02693 14.3477C4.72142 13.9658 4.47069 13.4643 4.2751 12.8438C4.0794 12.2231 3.98153 11.507 3.98153 10.6954C3.98153 9.53987 4.35877 8.55652 5.11311 7.74485C4.75975 6.87608 4.79311 5.90217 5.21329 4.82321C5.49021 4.73718 5.90086 4.80174 6.44505 5.0165C6.98935 5.23136 7.38786 5.41541 7.641 5.56802C7.89413 5.72057 8.09695 5.84985 8.24976 5.95469C9.13793 5.70652 10.0545 5.58241 10.9997 5.58241C11.9449 5.58241 12.8617 5.70652 13.7499 5.95469L14.2942 5.61111C14.6664 5.38185 15.1059 5.17176 15.6116 4.98078C16.1177 4.7899 16.5047 4.73733 16.7722 4.82336C17.2017 5.90237 17.24 6.87623 16.8865 7.745C17.6408 8.55667 18.0182 9.54027 18.0182 10.6956C18.0182 11.5072 17.9199 12.2255 17.7246 12.851C17.5289 13.4766 17.276 13.9776 16.9658 14.3549C16.6552 14.7322 16.2684 15.0497 15.8054 15.3073C15.3423 15.5652 14.8933 15.7513 14.459 15.866C14.0245 15.9807 13.5352 16.0668 12.991 16.1241C13.4873 16.5536 13.7355 17.2316 13.7355 18.1578V21.1796C13.7355 21.3513 13.7952 21.4946 13.9147 21.6091C14.0341 21.7234 14.2226 21.7571 14.4804 21.7092C16.6959 20.9741 18.5029 19.6493 19.9017 17.7348C21.3003 15.8204 21.9998 13.6651 21.9998 11.2682C21.9993 9.27304 21.5073 7.43282 20.5243 5.74751Z",
        fill: "white",
      }),
    ],
    -1
  ),
  Yd = $(
    "defs",
    null,
    [
      $("clipPath", { id: "clip0_6_173" }, [
        $("rect", { width: "22", height: "22", fill: "white" }),
      ]),
    ],
    -1
  ),
  Xd = [Kd, Yd];
function Gd(e, t) {
  return U(), G("svg", Bd, Xd);
}
const Zd = xt(jd, [["render", Gd]]);
const qd = {
    __name: "SvgIconComponent",
    props: { icon: String },
    setup(e) {
      return (t, n) =>
        e.icon === "telegram"
          ? (U(), Te(Fd, { key: 0 }))
          : e.icon === "phone"
          ? (U(), Te(Rd, { key: 1 }))
          : e.icon === "mail"
          ? (U(), Te(Wd, { key: 2 }))
          : e.icon === "github"
          ? (U(), Te(Zd, { key: 3 }))
          : dn("", !0);
    },
  },
  Jd = [
    { icon: "telegram", value: "@dwytyf", link: "https://t.me/dwytyf" },
    { icon: "phone", value: "+7 908 040 26 73", link: "tel:+79080402673" },
    {
      icon: "mail",
      value: "andr.fanin16@gmail.com",
      link: "mailto:andr.fanin16@gmail.com",
    },
    {
      icon: "github",
      value: "andrey_fanin",
      link: "https://github.com/andrey-fanin",
    },
  ];
const Qd = { class: "wrapper wrapper--footer" },
  zd = { class: "container container--footer" },
  e0 = { class: "footer" },
  t0 = ["locale"],
  n0 = { class: "footer__contacts" },
  r0 = { class: "footer__contacts-title" },
  s0 = { class: "footer__contacts-content" },
  l0 = { class: "footer__contacts-list" },
  o0 = { class: "footer__contact-item" },
  i0 = ["href"],
  a0 = { class: "item-icon" },
  u0 = { class: "item-text" },
  c0 = {
    __name: "FooterComponent",
    setup(e) {
      return (t, n) => (
        U(),
        G("div", Qd, [
          $("div", zd, [
            $("footer", e0, [
              $(
                "div",
                { class: "footer__title", locale: t.$i18n.locale },
                [
                  t.$i18n.locale === "ru"
                    ? (U(), Te(Xo, { key: 0 }))
                    : (U(), Te(Go, { key: 1 })),
                ],
                8,
                t0
              ),
              $("div", n0, [
                $("div", r0, Fe(t.$t("contacts.title")), 1),
                $("address", s0, [
                  $("ul", l0, [
                    (U(!0),
                    G(
                      ce,
                      null,
                      dt(
                        We(Jd),
                        (r) => (
                          U(),
                          G("li", o0, [
                            $(
                              "a",
                              { href: r.link, class: "item-link" },
                              [
                                $("div", a0, [
                                  se(qd, { icon: r.icon }, null, 8, ["icon"]),
                                ]),
                                $("span", u0, Fe(r.value), 1),
                              ],
                              8,
                              i0
                            ),
                          ])
                        )
                      ),
                      256
                    )),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ])
      );
    },
  },
  f0 = { class: "preview" },
  d0 = { class: "portfolio" },
  _0 = sa({
    __name: "App",
    setup(e) {
      return (
        window.innerWidth < 500 && zl("mobile", !0),
        (t, n) => (
          U(),
          Te(
            fs,
            { class: "body" },
            {
              default: qt(() => [
                $("section", f0, [se(cf), se(Tf)]),
                $("main", d0, [se(Td)]),
                se(c0),
              ]),
              _: 1,
            }
          )
        )
      );
    },
  });
const Zo = hu(_0);
Zo.use(Qc);
Zo.mount("#app");
