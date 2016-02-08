/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-csscalc-matchmedia-touchevents-video-mq-setclasses !*/
! function(e, n, t) {
    function o(e, n) {
        return typeof e === n
    }

    function r() {
        var e, n, t, r, i, a, s;
        for (var l in g)
            if (g.hasOwnProperty(l)) {
                if (e = [], n = g[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
                    for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
                for (r = o(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) a = e[i], s = a.split("."), 1 === s.length ? Modernizr[s[0]] = r : (!Modernizr[s[0]] || Modernizr[s[0]] instanceof Boolean || (Modernizr[s[0]] = new Boolean(Modernizr[s[0]])), Modernizr[s[0]][s[1]] = r), h.push((r ? "" : "no-") + s.join("-"))
            }
    }

    function i(e) {
        var n = w.className,
            t = Modernizr._config.classPrefix || "";
        if (x && (n = n.baseVal), Modernizr._config.enableJSClass) {
            var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
            n = n.replace(o, "$1" + t + "js$2")
        }
        Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), x ? w.className.baseVal = n : w.className = n)
    }

    function a() {
        return "function" != typeof n.createElement ? n.createElement(arguments[0]) : x ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
    }

    function s() {
        var e = n.body;
        return e || (e = a(x ? "svg" : "body"), e.fake = !0), e
    }

    function l(e, t, o, r) {
        var i, l, u, c, f = "modernizr",
            p = a("div"),
            d = s();
        if (parseInt(o, 10))
            for (; o--;) u = a("div"), u.id = r ? r[o] : f + (o + 1), p.appendChild(u);
        return i = a("style"), i.type = "text/css", i.id = "s" + f, (d.fake ? d : p).appendChild(i), d.appendChild(p), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)), p.id = f, d.fake && (d.style.background = "", d.style.overflow = "hidden", c = w.style.overflow, w.style.overflow = "hidden", w.appendChild(d)), l = t(p, e), d.fake ? (d.parentNode.removeChild(d), w.style.overflow = c, w.offsetHeight) : p.parentNode.removeChild(p), !!l
    }

    function u(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, n, t) {
            return n + t.toUpperCase()
        }).replace(/^-/, "")
    }

    function c(e, n) {
        return !!~("" + e).indexOf(n)
    }

    function f(e, n) {
        return function() {
            return e.apply(n, arguments)
        }
    }

    function p(e, n, t) {
        var r;
        for (var i in e)
            if (e[i] in n) return t === !1 ? e[i] : (r = n[e[i]], o(r, "function") ? f(r, t || n) : r);
        return !1
    }

    function d(e) {
        return e.replace(/([A-Z])/g, function(e, n) {
            return "-" + n.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }

    function m(n, o) {
        var r = n.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; r--;)
                if (e.CSS.supports(d(n[r]), o)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in e) {
            for (var i = []; r--;) i.push("(" + d(n[r]) + ":" + o + ")");
            return i = i.join(" or "), l("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == getComputedStyle(e, null).position
            })
        }
        return t
    }

    function v(e, n, r, i) {
        function s() {
            f && (delete N.style, delete N.modElem)
        }
        if (i = o(i, "undefined") ? !1 : i, !o(r, "undefined")) {
            var l = m(e, r);
            if (!o(l, "undefined")) return l
        }
        for (var f, p, d, v, y, h = ["modernizr", "tspan"]; !N.style;) f = !0, N.modElem = a(h.shift()), N.style = N.modElem.style;
        for (d = e.length, p = 0; d > p; p++)
            if (v = e[p], y = N.style[v], c(v, "-") && (v = u(v)), N.style[v] !== t) {
                if (i || o(r, "undefined")) return s(), "pfx" == n ? v : !0;
                try {
                    N.style[v] = r
                } catch (g) {}
                if (N.style[v] != y) return s(), "pfx" == n ? v : !0
            }
        return s(), !1
    }

    function y(e, n, t, r, i) {
        var a = e.charAt(0).toUpperCase() + e.slice(1),
            s = (e + " " + P.join(a + " ") + a).split(" ");
        return o(n, "string") || o(n, "undefined") ? v(s, n, r, i) : (s = (e + " " + z.join(a + " ") + a).split(" "), p(s, n, t))
    }
    var h = [],
        g = [],
        C = {
            _version: "3.2.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, n) {
                var t = this;
                setTimeout(function() {
                    n(t[e])
                }, 0)
            },
            addTest: function(e, n, t) {
                g.push({
                    name: e,
                    fn: n,
                    options: t
                })
            },
            addAsyncTest: function(e) {
                g.push({
                    name: null,
                    fn: e
                })
            }
        },
        Modernizr = function() {};
    Modernizr.prototype = C, Modernizr = new Modernizr;
    var w = n.documentElement,
        x = "svg" === w.nodeName.toLowerCase(),
        _ = C._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];
    C._prefixes = _, Modernizr.addTest("video", function() {
        var e = a("video"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), n.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), n.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
        } catch (t) {}
        return n
    }), Modernizr.addTest("csscalc", function() {
        var e = "width:",
            n = "calc(10px);",
            t = a("a");
        return t.style.cssText = e + _.join(n + e), !!t.style.length
    });
    var S = function() {
        var n = e.matchMedia || e.msMatchMedia;
        return n ? function(e) {
            var t = n(e);
            return t && t.matches || !1
        } : function(n) {
            var t = !1;
            return l("@media " + n + " { #modernizr { position: absolute; } }", function(n) {
                t = "absolute" == (e.getComputedStyle ? e.getComputedStyle(n, null) : n.currentStyle).position
            }), t
        }
    }();
    C.mq = S;
    var b = C.testStyles = l;
    Modernizr.addTest("touchevents", function() {
        var t;
        if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;
        else {
            var o = ["@media (", _.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            b(o, function(e) {
                t = 9 === e.offsetTop
            })
        }
        return t
    });
    var T = "Moz O ms Webkit",
        P = C._config.usePrefixes ? T.split(" ") : [];
    C._cssomPrefixes = P;
    var E = function(n) {
        var o, r = _.length,
            i = e.CSSRule;
        if ("undefined" == typeof i) return t;
        if (!n) return !1;
        if (n = n.replace(/^@/, ""), o = n.replace(/-/g, "_").toUpperCase() + "_RULE", o in i) return "@" + n;
        for (var a = 0; r > a; a++) {
            var s = _[a],
                l = s.toUpperCase() + "_" + o;
            if (l in i) return "@-" + s.toLowerCase() + "-" + n
        }
        return !1
    };
    C.atRule = E;
    var z = C._config.usePrefixes ? T.toLowerCase().split(" ") : [];
    C._domPrefixes = z;
    var j = {
        elem: a("modernizr")
    };
    Modernizr._q.push(function() {
        delete j.elem
    });
    var N = {
        style: j.elem.style
    };
    Modernizr._q.unshift(function() {
        delete N.style
    }), C.testAllProps = y;
    var L = C.prefixed = function(e, n, t) {
        return 0 === e.indexOf("@") ? E(e) : (-1 != e.indexOf("-") && (e = u(e)), n ? y(e, n, t) : y(e, "pfx"))
    };
    Modernizr.addTest("matchmedia", !!L("matchMedia", e)), r(), i(h), delete C.addTest, delete C.addAsyncTest;
    for (var $ = 0; $ < Modernizr._q.length; $++) Modernizr._q[$]();
    e.Modernizr = Modernizr
}(window, document);