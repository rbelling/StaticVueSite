/* eslint-disable */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.ThrowPropsPlugin", ["plugins.TweenPlugin", "TweenLite", "easing.Ease", "utils.VelocityTracker"], function(t, e, i, r) {
            var s, n, o, a, l = function() {
                    t.call(this, "throwProps"), this._overwriteProps.length = 0
                },
                h = 999999999999999,
                u = 1e-10,
                p = _gsScope._gsDefine.globals,
                f = !1,
                c = {
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
                _ = function(t, e, i, r) {
                    for (var s, n, o = e.length, a = 0, l = h; --o > -1;) s = e[o], n = s - t, 0 > n && (n = -n), l > n && s >= r && i >= s && (a = o, l = n);
                    return e[a]
                },
                d = function(t, e, i, r) {
                    if ("auto" === t.end) return t;
                    i = isNaN(i) ? h : i, r = isNaN(r) ? -h : r;
                    var s = "function" == typeof t.end ? t.end(e) : t.end instanceof Array ? _(e, t.end, i, r) : Number(t.end);
                    return s > i ? s = i : r > s && (s = r), {
                        max: s,
                        min: s,
                        unitFactor: t.unitFactor
                    }
                },
                g = function(t, e, i) {
                    for (var r in e) void 0 === t[r] && r !== i && (t[r] = e[r]);
                    return t
                },
                m = l.calculateChange = function(t, r, s, n) {
                    null == n && (n = .05);
                    var o = r instanceof i ? r : r ? new i(r) : e.defaultEase;
                    return s * n * t / o.getRatio(n)
                },
                v = l.calculateDuration = function(t, r, s, n, o) {
                    o = o || .05;
                    var a = n instanceof i ? n : n ? new i(n) : e.defaultEase;
                    return Math.abs((r - t) * a.getRatio(o) / s / o)
                },
                y = l.calculateTweenDuration = function(t, s, n, o, a, h) {
                    if ("string" == typeof t && (t = e.selector(t)), !t) return 0;
                    null == n && (n = 10), null == o && (o = .2), null == a && (a = 1), t.length && (t = t[0] || t);
                    var p, c, _, y, x, w, T, b, P, S, k = 0,
                        C = 9999999999,
                        O = s.throwProps || s,
                        R = s.ease instanceof i ? s.ease : s.ease ? new i(s.ease) : e.defaultEase,
                        A = isNaN(O.checkpoint) ? .05 : Number(O.checkpoint),
                        M = isNaN(O.resistance) ? l.defaultResistance : Number(O.resistance);
                    for (p in O) "resistance" !== p && "checkpoint" !== p && "preventOvershoot" !== p && (c = O[p], "object" != typeof c && (P = P || r.getByTarget(t), P && P.isTrackingProp(p) ? c = "number" == typeof c ? {
                        velocity: c
                    } : {
                        velocity: P.getVelocity(p)
                    } : (y = Number(c) || 0, _ = y * M > 0 ? y / M : y / -M)), "object" == typeof c && (void 0 !== c.velocity && "number" == typeof c.velocity ? y = Number(c.velocity) || 0 : (P = P || r.getByTarget(t), y = P && P.isTrackingProp(p) ? P.getVelocity(p) : 0), x = isNaN(c.resistance) ? M : Number(c.resistance), _ = y * x > 0 ? y / x : y / -x, w = "function" == typeof t[p] ? t[p.indexOf("set") || "function" != typeof t["get" + p.substr(3)] ? p : "get" + p.substr(3)]() : t[p] || 0, T = w + m(y, R, _, A), void 0 !== c.end && (c = d(c, T, c.max, c.min), (h || f) && (O[p] = g(c, O[p], "end"))), void 0 !== c.max && T > Number(c.max) + u ? (S = c.unitFactor || l.defaultUnitFactors[p] || 1, b = w > c.max && c.min !== c.max || y * S > -15 && 45 > y * S ? o + .1 * (n - o) : v(w, c.max, y, R, A), C > b + a && (C = b + a)) : void 0 !== c.min && Number(c.min) - u > T && (S = c.unitFactor || l.defaultUnitFactors[p] || 1, b = c.min > w && c.min !== c.max || y * S > -45 && 15 > y * S ? o + .1 * (n - o) : v(w, c.min, y, R, A), C > b + a && (C = b + a)), b > k && (k = b)), _ > k && (k = _));
                    return k > C && (k = C), k > n ? n : o > k ? o : k
                },
                x = l.prototype = new t("throwProps");
            return x.constructor = l, l.version = "0.9.8", l.API = 2, l._autoCSS = !0, l.defaultResistance = 100, l.defaultUnitFactors = {
                time: 1e3,
                totalTime: 1e3
            }, l.track = function(t, e, i) {
                return r.track(t, e, i)
            }, l.untrack = function(t, e) {
                r.untrack(t, e)
            }, l.isTracking = function(t, e) {
                return r.isTracking(t, e)
            }, l.getVelocity = function(t, e) {
                var i = r.getByTarget(t);
                return i ? i.getVelocity(e) : 0 / 0
            }, l._cssRegister = function() {
                var t = p.com.greensock.plugins.CSSPlugin;
                if (t) {
                    var e = t._internals,
                        i = e._parseToProxy,
                        o = e._setPluginRatio,
                        a = e.CSSPropTween;
                    e._registerComplexSpecialProp("throwProps", {
                        parser: function(t, e, h, u, p, f) {
                            f = new l;
                            var _, d, g, m, v, y = {},
                                x = {},
                                w = {},
                                T = {},
                                b = {},
                                P = {};
                            n = {};
                            for (g in e) "resistance" !== g && "preventOvershoot" !== g && (d = e[g], "object" == typeof d ? (void 0 !== d.velocity && "number" == typeof d.velocity ? y[g] = Number(d.velocity) || 0 : (v = v || r.getByTarget(t), y[g] = v && v.isTrackingProp(g) ? v.getVelocity(g) : 0), void 0 !== d.end && (T[g] = d.end), void 0 !== d.min && (x[g] = d.min), void 0 !== d.max && (w[g] = d.max), d.preventOvershoot && (P[g] = !0), void 0 !== d.resistance && (_ = !0, b[g] = d.resistance)) : "number" == typeof d ? y[g] = d : (v = v || r.getByTarget(t), y[g] = v && v.isTrackingProp(g) ? v.getVelocity(g) : d || 0), c[g] && u._enableTransforms(2 === c[g]));
                            m = i(t, y, u, p, f), s = m.proxy, y = m.end;
                            for (g in s) n[g] = {
                                velocity: y[g],
                                min: x[g],
                                max: w[g],
                                end: T[g],
                                resistance: b[g],
                                preventOvershoot: P[g]
                            };
                            return null != e.resistance && (n.resistance = e.resistance), e.preventOvershoot && (n.preventOvershoot = !0), p = new a(t, "throwProps", 0, 0, m.pt, 2), u._overwriteProps.pop(), p.plugin = f, p.setRatio = o, p.data = m, f._onInitTween(s, n, u._tween), p
                        }
                    })
                }
            }, l.to = function(t, i, r, l, h) {
                i.throwProps || (i = {
                    throwProps: i
                }), 0 === h && (i.throwProps.preventOvershoot = !0), f = !0;
                var u = new e(t, 1, i);
                return u.render(0, !0, !0), u.vars.css ? (u.duration(y(s, {
                    throwProps: n,
                    ease: i.ease
                }, r, l, h)), u._delay && !u.vars.immediateRender ? u.invalidate() : o._onInitTween(s, a, u), f = !1, u) : (u.kill(), u = new e(t, y(t, i, r, l, h), i), f = !1, u)
            }, x._onInitTween = function(t, e, i) {
                this.target = t, this._props = [], o = this, a = e;
                var s, n, l, h, u, p, c, _, v, y = i._ease,
                    x = isNaN(e.checkpoint) ? .05 : Number(e.checkpoint),
                    w = i._duration,
                    T = e.preventOvershoot,
                    b = 0;
                for (s in e)
                    if ("resistance" !== s && "checkpoint" !== s && "preventOvershoot" !== s) {
                        if (n = e[s], "number" == typeof n) u = Number(n) || 0;
                        else if ("object" != typeof n || isNaN(n.velocity)) {
                            if (v = v || r.getByTarget(t), !v || !v.isTrackingProp(s)) throw "ERROR: No velocity was defined in the throwProps tween of " + t + " property: " + s;
                            u = v.getVelocity(s)
                        } else u = Number(n.velocity);
                        p = m(u, y, w, x), _ = 0, h = "function" == typeof t[s], l = h ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : t[s], "object" == typeof n && (c = l + p, void 0 !== n.end && (n = d(n, c, n.max, n.min), f && (e[s] = g(n, e[s], "end"))), void 0 !== n.max && c > Number(n.max) ? T || n.preventOvershoot ? p = n.max - l : _ = n.max - l - p : void 0 !== n.min && Number(n.min) > c && (T || n.preventOvershoot ? p = n.min - l : _ = n.min - l - p)), this._overwriteProps[b] = s, this._props[b++] = {
                            p: s,
                            s: l,
                            c1: p,
                            c2: _,
                            f: h,
                            r: !1
                        }
                    }
                return !0
            }, x._kill = function(e) {
                for (var i = this._props.length; --i > -1;) null != e[this._props[i].p] && this._props.splice(i, 1);
                return t.prototype._kill.call(this, e)
            }, x._roundProps = function(t, e) {
                for (var i = this._props, r = i.length; --r > -1;)(t[i[r]] || t.throwProps) && (i[r].r = e)
            }, x.setRatio = function(t) {
                for (var e, i, r = this._props.length; --r > -1;) e = this._props[r], i = e.s + e.c1 * t + e.c2 * t * t, e.r && (i = Math.round(i)), e.f ? this.target[e.p](i) : this.target[e.p] = i
            }, t.activate([l]), l
        }, !0), _gsScope._gsDefine("utils.VelocityTracker", ["TweenLite"], function(t) {
            var e, i, r, s, n = /([A-Z])/g,
                o = {},
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
                l = document.defaultView ? document.defaultView.getComputedStyle : function() {},
                h = function(t, e, i) {
                    var r = (t._gsTransform || o)[e];
                    return r || 0 === r ? r : (t.style[e] ? r = t.style[e] : (i = i || l(t, null)) ? r = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(n, "-$1").toLowerCase()) : t.currentStyle && (r = t.currentStyle[e]), parseFloat(r) || 0)
                },
                u = t.ticker,
                p = function(t, e, i) {
                    this.p = t, this.f = e, this.v1 = this.v2 = 0, this.t1 = this.t2 = u.time, this.css = !1, this.type = "", this._prev = null, i && (this._next = i, i._prev = this)
                },
                f = function() {
                    var t, i, n = e,
                        o = u.time;
                    if (o - r >= .03)
                        for (s = r, r = o; n;) {
                            for (i = n._firstVP; i;) t = i.css ? h(n.target, i.p) : i.f ? n.target[i.p]() : n.target[i.p], (t !== i.v1 || o - i.t1 > .15) && (i.v2 = i.v1, i.v1 = t, i.t2 = i.t1, i.t1 = o), i = i._next;
                            n = n._next
                        }
                },
                c = function(t) {
                    this._lookup = {}, this.target = t, this.elem = t.style && t.nodeType ? !0 : !1, i || (u.addEventListener("tick", f, null, !1, -100), r = s = u.time, i = !0), e && (this._next = e, e._prev = this), e = this
                },
                _ = c.getByTarget = function(t) {
                    for (var i = e; i;) {
                        if (i.target === t) return i;
                        i = i._next
                    }
                },
                d = c.prototype;
            return d.addProp = function(e, i) {
                if (!this._lookup[e]) {
                    var r = this.target,
                        s = "function" == typeof r[e],
                        n = s ? this._altProp(e) : e,
                        o = this._firstVP;
                    this._firstVP = this._lookup[e] = this._lookup[n] = o = new p(n !== e && 0 === e.indexOf("set") ? n : e, s, o), o.css = this.elem && (void 0 !== this.target.style[o.p] || a[o.p]), o.css && a[o.p] && !r._gsTransform && t.set(r, {
                        x: "+=0",
                        overwrite: !1
                    }), o.type = i || o.css && 0 === e.indexOf("rotation") ? "deg" : "", o.v1 = o.v2 = o.css ? h(r, o.p) : s ? r[o.p]() : r[o.p]
                }
            }, d.removeProp = function(t) {
                var e = this._lookup[t];
                e && (e._prev ? e._prev._next = e._next : e === this._firstVP && (this._firstVP = e._next), e._next && (e._next._prev = e._prev), this._lookup[t] = 0, e.f && (this._lookup[this._altProp(t)] = 0))
            }, d.isTrackingProp = function(t) {
                return this._lookup[t] instanceof p
            }, d.getVelocity = function(t) {
                var e, i, r, s = this._lookup[t],
                    n = this.target;
                if (!s) throw "The velocity of " + t + " is not being tracked.";
                return e = s.css ? h(n, s.p) : s.f ? n[s.p]() : n[s.p], i = e - s.v2, ("rad" === s.type || "deg" === s.type) && (r = "rad" === s.type ? 2 * Math.PI : 360, i %= r, i !== i % (r / 2) && (i = 0 > i ? i + r : i - r)), i / (u.time - s.t2)
            }, d._altProp = function(t) {
                var e = t.substr(0, 3),
                    i = ("get" === e ? "set" : "set" === e ? "get" : e) + t.substr(3);
                return "function" == typeof this.target[i] ? i : t
            }, c.getByTarget = function(i) {
                var r = e;
                for ("string" == typeof i && (i = t.selector(i)), i.length && i !== window && i[0] && i[0].style && !i.nodeType && (i = i[0]); r;) {
                    if (r.target === i) return r;
                    r = r._next
                }
            }, c.track = function(t, e, i) {
                var r = _(t),
                    s = e.split(","),
                    n = s.length;
                for (i = (i || "").split(","), r || (r = new c(t)); --n > -1;) r.addProp(s[n], i[n] || i[0]);
                return r
            }, c.untrack = function(t, i) {
                var r = _(t),
                    s = (i || "").split(","),
                    n = s.length;
                if (r) {
                    for (; --n > -1;) r.removeProp(s[n]);
                    r._firstVP && i || (r._prev ? r._prev._next = r._next : r === e && (e = r._next), r._next && (r._next._prev = r._prev))
                }
            }, c.isTracking = function(t, e) {
                var i = _(t);
                return i ? !e && i._firstVP ? !0 : i.isTrackingProp(e) : !1
            }, c
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[t]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = e())
    }("ThrowPropsPlugin");