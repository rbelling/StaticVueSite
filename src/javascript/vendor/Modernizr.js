/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-touchevents-mq !*/
! function(e, n, t) {
    function o(e, n) {
        return typeof e === n
    }

    function s() {
        var e, n, t, s, a, i, r;
        for (var l in c)
            if (c.hasOwnProperty(l)) {
                if (e = [], n = c[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
                    for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
                for (s = o(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++) i = e[a], r = i.split("."), 1 === r.length ? d[r[0]] = s : (!d[r[0]] || d[r[0]] instanceof Boolean || (d[r[0]] = new Boolean(d[r[0]])), d[r[0]][r[1]] = s), f.push((s ? "" : "no-") + r.join("-"))
            }
    }

    function a(e) {
        var n = p.className,
            t = d._config.classPrefix || "";
        if (m && (n = n.baseVal), d._config.enableJSClass) {
            var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
            n = n.replace(o, "$1" + t + "js$2")
        }
        d._config.enableClasses && (n += " " + t + e.join(" " + t), m ? p.className.baseVal = n : p.className = n)
    }

    function i() {
        return "function" != typeof n.createElement ? n.createElement(arguments[0]) : m ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
    }

    function r() {
        var e = n.body;
        return e || (e = i(m ? "svg" : "body"), e.fake = !0), e
    }

    function l(e, t, o, s) {
        var a, l, f, c, u = "modernizr",
            d = i("div"),
            m = r();
        if (parseInt(o, 10))
            for (; o--;) f = i("div"), f.id = s ? s[o] : u + (o + 1), d.appendChild(f);
        return a = i("style"), a.type = "text/css", a.id = "s" + u, (m.fake ? m : d).appendChild(a), m.appendChild(d), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(n.createTextNode(e)), d.id = u, m.fake && (m.style.background = "", m.style.overflow = "hidden", c = p.style.overflow, p.style.overflow = "hidden", p.appendChild(m)), l = t(d, e), m.fake ? (m.parentNode.removeChild(m), p.style.overflow = c, p.offsetHeight) : d.parentNode.removeChild(d), !!l
    }
    var f = [],
        c = [],
        u = {
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
                c.push({
                    name: e,
                    fn: n,
                    options: t
                })
            },
            addAsyncTest: function(e) {
                c.push({
                    name: null,
                    fn: e
                })
            }
        },
        d = function() {};
    d.prototype = u, d = new d;
    var p = n.documentElement,
        m = "svg" === p.nodeName.toLowerCase(),
        h = u._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];
    u._prefixes = h;
    var v = function() {
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
    u.mq = v;
    var g = u.testStyles = l;
    d.addTest("touchevents", function() {
        var t;
        if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;
        else {
            var o = ["@media (", h.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            g(o, function(e) {
                t = 9 === e.offsetTop
            })
        }
        return t
    }), s(), a(f), delete u.addTest, delete u.addAsyncTest;
    for (var y = 0; y < d._q.length; y++) d._q[y]();
    e.Modernizr = d
}(window, document);