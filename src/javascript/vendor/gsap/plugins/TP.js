var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.ThrowPropsPlugin", ["plugins.TweenPlugin", "TweenLite", "easing.Ease", "utils.VelocityTracker"], function(e, t, r, n) {
            var o, i, s, a, c = function() {
                    e.call(this, "throwProps"), this._overwriteProps.length = 0
                },
                u = 999999999999999,
                p = 1e-10,
                l = _gsScope._gsDefine.globals,
                f = !1,
                v = {
                    x: 1,
                    y: 1,
                    z: 2,
                    scale: 1,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 1,
                    rotationZ: 1,
                    rotationX: 2,
                    rotationY: 2,
                    skewX: 1,
                    skewY: 1,
                    xPercent: 1,
                    yPercent: 1
                },
                g = function(e, t, r, n) {
                    for (var o, i, s = t.length, a = 0, c = u; --s > -1;) o = t[s], i = o - e, 0 > i && (i = -i), c > i && o >= n && r >= o && (a = s, c = i);
                    return t[a]
                },
                h = function(e, t, r, n) {
                    if ("auto" === e.end) return e;
                    r = isNaN(r) ? u : r, n = isNaN(n) ? -u : n;
                    var o = "function" == typeof e.end ? e.end(t) : e.end instanceof Array ? g(t, e.end, r, n) : Number(e.end);
                    return o > r ? o = r : n > o && (o = n), {
                        max: o,
                        min: o,
                        unitFactor: e.unitFactor
                    }
                },
                _ = function(e, t, r) {
                    for (var n in t) void 0 === e[n] && n !== r && (e[n] = t[n]);
                    return e
                },
                d = c.calculateChange = function(e, n, o, i) {
                    null == i && (i = .05);
                    var s = n instanceof r ? n : n ? new r(n) : t.defaultEase;
                    return o * i * e / s.getRatio(i)
                },
                y = c.calculateDuration = function(e, n, o, i, s) {
                    s = s || .05;
                    var a = i instanceof r ? i : i ? new r(i) : t.defaultEase;
                    return Math.abs((n - e) * a.getRatio(s) / o / s)
                },
                m = c.calculateTweenDuration = function(e, o, i, s, a, u) {
                    if ("string" == typeof e && (e = t.selector(e)), !e) return 0;
                    null == i && (i = 10), null == s && (s = .2), null == a && (a = 1), e.length && (e = e[0] || e);
                    var l, v, g, m, P, w, x, k, T, b, N = 0,
                        S = 9999999999,
                        V = o.throwProps || o,
                        O = o.ease instanceof r ? o.ease : o.ease ? new r(o.ease) : t.defaultEase,
                        R = isNaN(V.checkpoint) ? .05 : Number(V.checkpoint),
                        B = isNaN(V.resistance) ? c.defaultResistance : Number(V.resistance);
                    for (l in V) "resistance" !== l && "checkpoint" !== l && "preventOvershoot" !== l && (v = V[l], "object" != typeof v && (T = T || n.getByTarget(e), T && T.isTrackingProp(l) ? v = "number" == typeof v ? {
                        velocity: v
                    } : {
                        velocity: T.getVelocity(l)
                    } : (m = Number(v) || 0, g = m * B > 0 ? m / B : m / -B)), "object" == typeof v && (void 0 !== v.velocity && "number" == typeof v.velocity ? m = Number(v.velocity) || 0 : (T = T || n.getByTarget(e), m = T && T.isTrackingProp(l) ? T.getVelocity(l) : 0), P = isNaN(v.resistance) ? B : Number(v.resistance), g = m * P > 0 ? m / P : m / -P, w = "function" == typeof e[l] ? e[l.indexOf("set") || "function" != typeof e["get" + l.substr(3)] ? l : "get" + l.substr(3)]() : e[l] || 0, x = w + d(m, O, g, R), void 0 !== v.end && (v = h(v, x, v.max, v.min), (u || f) && (V[l] = _(v, V[l], "end"))), void 0 !== v.max && x > Number(v.max) + p ? (b = v.unitFactor || c.defaultUnitFactors[l] || 1, k = w > v.max && v.min !== v.max || m * b > -15 && 45 > m * b ? s + .1 * (i - s) : y(w, v.max, m, O, R), S > k + a && (S = k + a)) : void 0 !== v.min && Number(v.min) - p > x && (b = v.unitFactor || c.defaultUnitFactors[l] || 1, k = v.min > w && v.min !== v.max || m * b > -45 && 15 > m * b ? s + .1 * (i - s) : y(w, v.min, m, O, R), S > k + a && (S = k + a)), k > N && (N = k)), g > N && (N = g));
                    return N > S && (N = S), N > i ? i : s > N ? s : N
                },
                P = c.prototype = new e("throwProps");
            return P.constructor = c, c.version = "0.9.8", c.API = 2, c._autoCSS = !0, c.defaultResistance = 100, c.defaultUnitFactors = {
                time: 1e3,
                totalTime: 1e3
            }, c.track = function(e, t, r) {
                return n.track(e, t, r)
            }, c.untrack = function(e, t) {
                n.untrack(e, t)
            }, c.isTracking = function(e, t) {
                return n.isTracking(e, t)
            }, c.getVelocity = function(e, t) {
                var r = n.getByTarget(e);
                return r ? r.getVelocity(t) : NaN
            }, c._cssRegister = function() {
                var e = l.com.greensock.plugins.CSSPlugin;
                if (e) {
                    var t = e._internals,
                        r = t._parseToProxy,
                        s = t._setPluginRatio,
                        a = t.CSSPropTween;
                    t._registerComplexSpecialProp("throwProps", {
                        parser: function(e, t, u, p, l, f) {
                            f = new c;
                            var g, h, _, d, y, m = {},
                                P = {},
                                w = {},
                                x = {},
                                k = {},
                                T = {};
                            i = {};
                            for (_ in t) "resistance" !== _ && "preventOvershoot" !== _ && (h = t[_], "object" == typeof h ? (void 0 !== h.velocity && "number" == typeof h.velocity ? m[_] = Number(h.velocity) || 0 : (y = y || n.getByTarget(e), m[_] = y && y.isTrackingProp(_) ? y.getVelocity(_) : 0), void 0 !== h.end && (x[_] = h.end), void 0 !== h.min && (P[_] = h.min), void 0 !== h.max && (w[_] = h.max), h.preventOvershoot && (T[_] = !0), void 0 !== h.resistance && (g = !0, k[_] = h.resistance)) : "number" == typeof h ? m[_] = h : (y = y || n.getByTarget(e), m[_] = y && y.isTrackingProp(_) ? y.getVelocity(_) : h || 0), v[_] && p._enableTransforms(2 === v[_]));
                            d = r(e, m, p, l, f), o = d.proxy, m = d.end;
                            for (_ in o) i[_] = {
                                velocity: m[_],
                                min: P[_],
                                max: w[_],
                                end: x[_],
                                resistance: k[_],
                                preventOvershoot: T[_]
                            };
                            return null != t.resistance && (i.resistance = t.resistance), t.preventOvershoot && (i.preventOvershoot = !0), l = new a(e, "throwProps", 0, 0, d.pt, 2), p._overwriteProps.pop(), l.plugin = f, l.setRatio = s, l.data = d, f._onInitTween(o, i, p._tween), l
                        }
                    })
                }
            }, c.to = function(e, r, n, c, u) {
                r.throwProps || (r = {
                    throwProps: r
                }), 0 === u && (r.throwProps.preventOvershoot = !0), f = !0;
                var p = new t(e, 1, r);
                return p.render(0, !0, !0), p.vars.css ? (p.duration(m(o, {
                    throwProps: i,
                    ease: r.ease
                }, n, c, u)), p._delay && !p.vars.immediateRender ? p.invalidate() : s._onInitTween(o, a, p), f = !1, p) : (p.kill(), p = new t(e, m(e, r, n, c, u), r), f = !1, p)
            }, P._onInitTween = function(e, t, r) {
                this.target = e, this._props = [], s = this, a = t;
                var o, i, c, u, p, l, v, g, y, m = r._ease,
                    P = isNaN(t.checkpoint) ? .05 : Number(t.checkpoint),
                    w = r._duration,
                    x = t.preventOvershoot,
                    k = 0;
                for (o in t)
                    if ("resistance" !== o && "checkpoint" !== o && "preventOvershoot" !== o) {
                        if (i = t[o], "number" == typeof i) p = Number(i) || 0;
                        else if ("object" != typeof i || isNaN(i.velocity)) {
                            if (y = y || n.getByTarget(e), !y || !y.isTrackingProp(o)) throw "ERROR: No velocity was defined in the throwProps tween of " + e + " property: " + o;
                            p = y.getVelocity(o)
                        } else p = Number(i.velocity);
                        l = d(p, m, w, P), g = 0, u = "function" == typeof e[o], c = u ? e[o.indexOf("set") || "function" != typeof e["get" + o.substr(3)] ? o : "get" + o.substr(3)]() : e[o], "object" == typeof i && (v = c + l, void 0 !== i.end && (i = h(i, v, i.max, i.min), f && (t[o] = _(i, t[o], "end"))), void 0 !== i.max && v > Number(i.max) ? x || i.preventOvershoot ? l = i.max - c : g = i.max - c - l : void 0 !== i.min && Number(i.min) > v && (x || i.preventOvershoot ? l = i.min - c : g = i.min - c - l)), this._overwriteProps[k] = o, this._props[k++] = {
                            p: o,
                            s: c,
                            c1: l,
                            c2: g,
                            f: u,
                            r: !1
                        }
                    }
                return !0
            }, P._kill = function(t) {
                for (var r = this._props.length; --r > -1;) null != t[this._props[r].p] && this._props.splice(r, 1);
                return e.prototype._kill.call(this, t)
            }, P._roundProps = function(e, t) {
                for (var r = this._props, n = r.length; --n > -1;)(e[r[n]] || e.throwProps) && (r[n].r = t)
            }, P.setRatio = function(e) {
                for (var t, r, n = this._props.length; --n > -1;) t = this._props[n], r = t.s + t.c1 * e + t.c2 * e * e, t.r && (r = Math.round(r)), t.f ? this.target[t.p](r) : this.target[t.p] = r
            }, e.activate([c]), c
        }, !0), _gsScope._gsDefine("utils.VelocityTracker", ["TweenLite"], function(e) {
            var t, r, n, o, i = /([A-Z])/g,
                s = {},
                a = {
                    x: 1,
                    y: 1,
                    z: 2,
                    scale: 1,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 1,
                    rotationZ: 1,
                    rotationX: 2,
                    rotationY: 2,
                    skewX: 1,
                    skewY: 1,
                    xPercent: 1,
                    yPercent: 1
                },
                c = document.defaultView ? document.defaultView.getComputedStyle : function() {},
                u = function(e, t, r) {
                    var n = (e._gsTransform || s)[t];
                    return n || 0 === n ? n : (e.style[t] ? n = e.style[t] : (r = r || c(e, null)) ? n = r[t] || r.getPropertyValue(t) || r.getPropertyValue(t.replace(i, "-$1").toLowerCase()) : e.currentStyle && (n = e.currentStyle[t]), parseFloat(n) || 0)
                },
                p = e.ticker,
                l = function(e, t, r) {
                    this.p = e, this.f = t, this.v1 = this.v2 = 0, this.t1 = this.t2 = p.time, this.css = !1, this.type = "", this._prev = null, r && (this._next = r, r._prev = this)
                },
                f = function() {
                    var e, r, i = t,
                        s = p.time;
                    if (s - n >= .03)
                        for (o = n, n = s; i;) {
                            for (r = i._firstVP; r;) e = r.css ? u(i.target, r.p) : r.f ? i.target[r.p]() : i.target[r.p], (e !== r.v1 || s - r.t1 > .15) && (r.v2 = r.v1, r.v1 = e, r.t2 = r.t1, r.t1 = s), r = r._next;
                            i = i._next
                        }
                },
                v = function(e) {
                    this._lookup = {}, this.target = e, this.elem = e.style && e.nodeType ? !0 : !1, r || (p.addEventListener("tick", f, null, !1, -100), n = o = p.time, r = !0), t && (this._next = t, t._prev = this), t = this
                },
                g = v.getByTarget = function(e) {
                    for (var r = t; r;) {
                        if (r.target === e) return r;
                        r = r._next
                    }
                },
                h = v.prototype;
            return h.addProp = function(t, r) {
                if (!this._lookup[t]) {
                    var n = this.target,
                        o = "function" == typeof n[t],
                        i = o ? this._altProp(t) : t,
                        s = this._firstVP;
                    this._firstVP = this._lookup[t] = this._lookup[i] = s = new l(i !== t && 0 === t.indexOf("set") ? i : t, o, s), s.css = this.elem && (void 0 !== this.target.style[s.p] || a[s.p]), s.css && a[s.p] && !n._gsTransform && e.set(n, {
                        x: "+=0",
                        overwrite: !1
                    }), s.type = r || s.css && 0 === t.indexOf("rotation") ? "deg" : "", s.v1 = s.v2 = s.css ? u(n, s.p) : o ? n[s.p]() : n[s.p]
                }
            }, h.removeProp = function(e) {
                var t = this._lookup[e];
                t && (t._prev ? t._prev._next = t._next : t === this._firstVP && (this._firstVP = t._next), t._next && (t._next._prev = t._prev), this._lookup[e] = 0, t.f && (this._lookup[this._altProp(e)] = 0))
            }, h.isTrackingProp = function(e) {
                return this._lookup[e] instanceof l
            }, h.getVelocity = function(e) {
                var t, r, n, o = this._lookup[e],
                    i = this.target;
                if (!o) throw "The velocity of " + e + " is not being tracked.";
                return t = o.css ? u(i, o.p) : o.f ? i[o.p]() : i[o.p], r = t - o.v2, ("rad" === o.type || "deg" === o.type) && (n = "rad" === o.type ? 2 * Math.PI : 360, r %= n, r !== r % (n / 2) && (r = 0 > r ? r + n : r - n)), r / (p.time - o.t2)
            }, h._altProp = function(e) {
                var t = e.substr(0, 3),
                    r = ("get" === t ? "set" : "set" === t ? "get" : t) + e.substr(3);
                return "function" == typeof this.target[r] ? r : e
            }, v.getByTarget = function(r) {
                var n = t;
                for ("string" == typeof r && (r = e.selector(r)), r.length && r !== window && r[0] && r[0].style && !r.nodeType && (r = r[0]); n;) {
                    if (n.target === r) return n;
                    n = n._next
                }
            }, v.track = function(e, t, r) {
                var n = g(e),
                    o = t.split(","),
                    i = o.length;
                for (r = (r || "").split(","), n || (n = new v(e)); --i > -1;) n.addProp(o[i], r[i] || r[0]);
                return n
            }, v.untrack = function(e, r) {
                var n = g(e),
                    o = (r || "").split(","),
                    i = o.length;
                if (n) {
                    for (; --i > -1;) n.removeProp(o[i]);
                    n._firstVP && r || (n._prev ? n._prev._next = n._next : n === t && (t = n._next), n._next && (n._next._prev = n._prev))
                }
            }, v.isTracking = function(e, t) {
                var r = g(e);
                return r ? !t && r._firstVP ? !0 : r.isTrackingProp(t) : !1
            }, v
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e) {
        "use strict";
        var t = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[e]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], t) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = t())
    }("ThrowPropsPlugin");