/* https://hcaptcha.com/license */
!function() {
    "use strict";
    function e(e) {
        var t = this.constructor;
        return this.then((function(n) {
            return t.resolve(e()).then((function() {
                return n
            }
            ))
        }
        ), (function(n) {
            return t.resolve(e()).then((function() {
                return t.reject(n)
            }
            ))
        }
        ))
    }
    function t(e) {
        return new this((function(t, n) {
            if (!e || "undefined" == typeof e.length)
                return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var r = Array.prototype.slice.call(e);
            if (0 === r.length)
                return t([]);
            var i = r.length;
            function o(e, n) {
                if (n && ("object" == typeof n || "function" == typeof n)) {
                    var a = n.then;
                    if ("function" == typeof a)
                        return void a.call(n, (function(t) {
                            o(e, t)
                        }
                        ), (function(n) {
                            r[e] = {
                                status: "rejected",
                                reason: n
                            },
                            0 == --i && t(r)
                        }
                        ))
                }
                r[e] = {
                    status: "fulfilled",
                    value: n
                },
                0 == --i && t(r)
            }
            for (var a = 0; a < r.length; a++)
                o(a, r[a])
        }
        ))
    }
    var n = setTimeout
      , r = "undefined" != typeof setImmediate ? setImmediate : null;
    function i(e) {
        return Boolean(e && "undefined" != typeof e.length)
    }
    function o() {}
    function a(e) {
        if (!(this instanceof a))
            throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e)
            throw new TypeError("not a function");
        this._state = 0,
        this._handled = !1,
        this._value = undefined,
        this._deferreds = [],
        d(e, this)
    }
    function s(e, t) {
        for (; 3 === e._state; )
            e = e._value;
        0 !== e._state ? (e._handled = !0,
        a._immediateFn((function() {
            var n = 1 === e._state ? t.onFulfilled : t.onRejected;
            if (null !== n) {
                var r;
                try {
                    r = n(e._value)
                } catch (i) {
                    return void l(t.promise, i)
                }
                c(t.promise, r)
            } else
                (1 === e._state ? c : l)(t.promise, e._value)
        }
        ))) : e._deferreds.push(t)
    }
    function c(e, t) {
        try {
            if (t === e)
                throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" == typeof t || "function" == typeof t)) {
                var n = t.then;
                if (t instanceof a)
                    return e._state = 3,
                    e._value = t,
                    void u(e);
                if ("function" == typeof n)
                    return void d((r = n,
                    i = t,
                    function() {
                        r.apply(i, arguments)
                    }
                    ), e)
            }
            e._state = 1,
            e._value = t,
            u(e)
        } catch (o) {
            l(e, o)
        }
        var r, i
    }
    function l(e, t) {
        e._state = 2,
        e._value = t,
        u(e)
    }
    function u(e) {
        2 === e._state && 0 === e._deferreds.length && a._immediateFn((function() {
            e._handled || a._unhandledRejectionFn(e._value)
        }
        ));
        for (var t = 0, n = e._deferreds.length; t < n; t++)
            s(e, e._deferreds[t]);
        e._deferreds = null
    }
    function h(e, t, n) {
        this.onFulfilled = "function" == typeof e ? e : null,
        this.onRejected = "function" == typeof t ? t : null,
        this.promise = n
    }
    function d(e, t) {
        var n = !1;
        try {
            e((function(e) {
                n || (n = !0,
                c(t, e))
            }
            ), (function(e) {
                n || (n = !0,
                l(t, e))
            }
            ))
        } catch (r) {
            if (n)
                return;
            n = !0,
            l(t, r)
        }
    }
    a.prototype["catch"] = function(e) {
        return this.then(null, e)
    }
    ,
    a.prototype.then = function(e, t) {
        var n = new this.constructor(o);
        return s(this, new h(e,t,n)),
        n
    }
    ,
    a.prototype["finally"] = e,
    a.all = function(e) {
        return new a((function(t, n) {
            if (!i(e))
                return n(new TypeError("Promise.all accepts an array"));
            var r = Array.prototype.slice.call(e);
            if (0 === r.length)
                return t([]);
            var o = r.length;
            function a(e, i) {
                try {
                    if (i && ("object" == typeof i || "function" == typeof i)) {
                        var s = i.then;
                        if ("function" == typeof s)
                            return void s.call(i, (function(t) {
                                a(e, t)
                            }
                            ), n)
                    }
                    r[e] = i,
                    0 == --o && t(r)
                } catch (c) {
                    n(c)
                }
            }
            for (var s = 0; s < r.length; s++)
                a(s, r[s])
        }
        ))
    }
    ,
    a.allSettled = t,
    a.resolve = function(e) {
        return e && "object" == typeof e && e.constructor === a ? e : new a((function(t) {
            t(e)
        }
        ))
    }
    ,
    a.reject = function(e) {
        return new a((function(t, n) {
            n(e)
        }
        ))
    }
    ,
    a.race = function(e) {
        return new a((function(t, n) {
            if (!i(e))
                return n(new TypeError("Promise.race accepts an array"));
            for (var r = 0, o = e.length; r < o; r++)
                a.resolve(e[r]).then(t, n)
        }
        ))
    }
    ,
    a._immediateFn = "function" == typeof r && function(e) {
        r(e)
    }
    || function(e) {
        n(e, 0)
    }
    ,
    a._unhandledRejectionFn = function(e) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    }
    ;
    var f = function() {
        if ("undefined" != typeof self)
            return self;
        if ("undefined" != typeof window)
            return window;
        if ("undefined" != typeof global)
            return global;
        throw new Error("unable to locate global object")
    }();
    function p(e, t, n) {
        return t <= e && e <= n
    }
    function m(e) {
        if (e === undefined)
            return {};
        if (e === Object(e))
            return e;
        throw TypeError("Could not convert argument to dictionary")
    }
    "function" != typeof f.Promise ? f.Promise = a : (f.Promise.prototype["finally"] || (f.Promise.prototype["finally"] = e),
    f.Promise.allSettled || (f.Promise.allSettled = t));
    var g = function(e) {
        return e >= 0 && e <= 127
    }
      , y = -1;
    function v(e) {
        this.tokens = [].slice.call(e),
        this.tokens.reverse()
    }
    v.prototype = {
        endOfStream: function() {
            return !this.tokens.length
        },
        read: function() {
            return this.tokens.length ? this.tokens.pop() : y
        },
        prepend: function(e) {
            if (Array.isArray(e))
                for (var t = e; t.length; )
                    this.tokens.push(t.pop());
            else
                this.tokens.push(e)
        },
        push: function(e) {
            if (Array.isArray(e))
                for (var t = e; t.length; )
                    this.tokens.unshift(t.shift());
            else
                this.tokens.unshift(e)
        }
    };
    var w = -1;
    function b(e, t) {
        if (e)
            throw TypeError("Decoder error");
        return t || 65533
    }
    function k(e) {
        return e = String(e).trim().toLowerCase(),
        Object.prototype.hasOwnProperty.call(_, e) ? _[e] : null
    }
    var _ = {};
    [{
        encodings: [{
            labels: ["unicode-1-1-utf-8", "utf-8", "utf8"],
            name: "UTF-8"
        }],
        heading: "The Encoding"
    }].forEach((function(e) {
        e.encodings.forEach((function(e) {
            e.labels.forEach((function(t) {
                _[t] = e
            }
            ))
        }
        ))
    }
    ));
    var x, E = {
        "UTF-8": function(e) {
            return new j(e)
        }
    }, S = {
        "UTF-8": function(e) {
            return new T(e)
        }
    }, C = "utf-8";
    function O(e, t) {
        if (!(this instanceof O))
            throw TypeError("Called as a function. Did you forget 'new'?");
        e = e !== undefined ? String(e) : C,
        t = m(t),
        this._encoding = null,
        this._decoder = null,
        this._ignoreBOM = !1,
        this._BOMseen = !1,
        this._error_mode = "replacement",
        this._do_not_flush = !1;
        var n = k(e);
        if (null === n || "replacement" === n.name)
            throw RangeError("Unknown encoding: " + e);
        if (!S[n.name])
            throw Error("Decoder not present. Did you forget to include encoding-indexes.js first?");
        var r = this;
        return r._encoding = n,
        t.fatal && (r._error_mode = "fatal"),
        t.ignoreBOM && (r._ignoreBOM = !0),
        Object.defineProperty || (this.encoding = r._encoding.name.toLowerCase(),
        this.fatal = "fatal" === r._error_mode,
        this.ignoreBOM = r._ignoreBOM),
        r
    }
    function A(e, t) {
        if (!(this instanceof A))
            throw TypeError("Called as a function. Did you forget 'new'?");
        t = m(t),
        this._encoding = null,
        this._encoder = null,
        this._do_not_flush = !1,
        this._fatal = t.fatal ? "fatal" : "replacement";
        var n = this;
        if (t.NONSTANDARD_allowLegacyEncoding) {
            var r = k(e = e !== undefined ? String(e) : C);
            if (null === r || "replacement" === r.name)
                throw RangeError("Unknown encoding: " + e);
            if (!E[r.name])
                throw Error("Encoder not present. Did you forget to include encoding-indexes.js first?");
            n._encoding = r
        } else
            n._encoding = k("utf-8");
        return Object.defineProperty || (this.encoding = n._encoding.name.toLowerCase()),
        n
    }
    function T(e) {
        var t = e.fatal
          , n = 0
          , r = 0
          , i = 0
          , o = 128
          , a = 191;
        this.handler = function(e, s) {
            if (s === y && 0 !== i)
                return i = 0,
                b(t);
            if (s === y)
                return w;
            if (0 === i) {
                if (p(s, 0, 127))
                    return s;
                if (p(s, 194, 223))
                    i = 1,
                    n = 31 & s;
                else if (p(s, 224, 239))
                    224 === s && (o = 160),
                    237 === s && (a = 159),
                    i = 2,
                    n = 15 & s;
                else {
                    if (!p(s, 240, 244))
                        return b(t);
                    240 === s && (o = 144),
                    244 === s && (a = 143),
                    i = 3,
                    n = 7 & s
                }
                return null
            }
            if (!p(s, o, a))
                return n = i = r = 0,
                o = 128,
                a = 191,
                e.prepend(s),
                b(t);
            if (o = 128,
            a = 191,
            n = n << 6 | 63 & s,
            (r += 1) !== i)
                return null;
            var c = n;
            return n = i = r = 0,
            c
        }
    }
    function j(e) {
        e.fatal;
        this.handler = function(e, t) {
            if (t === y)
                return w;
            if (g(t))
                return t;
            var n, r;
            p(t, 128, 2047) ? (n = 1,
            r = 192) : p(t, 2048, 65535) ? (n = 2,
            r = 224) : p(t, 65536, 1114111) && (n = 3,
            r = 240);
            for (var i = [(t >> 6 * n) + r]; n > 0; ) {
                var o = t >> 6 * (n - 1);
                i.push(128 | 63 & o),
                n -= 1
            }
            return i
        }
    }
    Object.defineProperty && (Object.defineProperty(O.prototype, "encoding", {
        get: function() {
            return this._encoding.name.toLowerCase()
        }
    }),
    Object.defineProperty(O.prototype, "fatal", {
        get: function() {
            return "fatal" === this._error_mode
        }
    }),
    Object.defineProperty(O.prototype, "ignoreBOM", {
        get: function() {
            return this._ignoreBOM
        }
    })),
    O.prototype.decode = function(e, t) {
        var n;
        n = "object" == typeof e && e instanceof ArrayBuffer ? new Uint8Array(e) : "object" == typeof e && "buffer"in e && e.buffer instanceof ArrayBuffer ? new Uint8Array(e.buffer,e.byteOffset,e.byteLength) : new Uint8Array(0),
        t = m(t),
        this._do_not_flush || (this._decoder = S[this._encoding.name]({
            fatal: "fatal" === this._error_mode
        }),
        this._BOMseen = !1),
        this._do_not_flush = Boolean(t.stream);
        for (var r, i = new v(n), o = []; ; ) {
            var a = i.read();
            if (a === y)
                break;
            if ((r = this._decoder.handler(i, a)) === w)
                break;
            null !== r && (Array.isArray(r) ? o.push.apply(o, r) : o.push(r))
        }
        if (!this._do_not_flush) {
            do {
                if ((r = this._decoder.handler(i, i.read())) === w)
                    break;
                null !== r && (Array.isArray(r) ? o.push.apply(o, r) : o.push(r))
            } while (!i.endOfStream());
            this._decoder = null
        }
        return function(e) {
            var t, n;
            return t = ["UTF-8", "UTF-16LE", "UTF-16BE"],
            n = this._encoding.name,
            -1 === t.indexOf(n) || this._ignoreBOM || this._BOMseen || (e.length > 0 && 65279 === e[0] ? (this._BOMseen = !0,
            e.shift()) : e.length > 0 && (this._BOMseen = !0)),
            function(e) {
                for (var t = "", n = 0; n < e.length; ++n) {
                    var r = e[n];
                    r <= 65535 ? t += String.fromCharCode(r) : (r -= 65536,
                    t += String.fromCharCode(55296 + (r >> 10), 56320 + (1023 & r)))
                }
                return t
            }(e)
        }
        .call(this, o)
    }
    ,
    Object.defineProperty && Object.defineProperty(A.prototype, "encoding", {
        get: function() {
            return this._encoding.name.toLowerCase()
        }
    }),
    A.prototype.encode = function(e, t) {
        e = e === undefined ? "" : String(e),
        t = m(t),
        this._do_not_flush || (this._encoder = E[this._encoding.name]({
            fatal: "fatal" === this._fatal
        })),
        this._do_not_flush = Boolean(t.stream);
        for (var n, r = new v(function(e) {
            for (var t = String(e), n = t.length, r = 0, i = []; r < n; ) {
                var o = t.charCodeAt(r);
                if (o < 55296 || o > 57343)
                    i.push(o);
                else if (o >= 56320 && o <= 57343)
                    i.push(65533);
                else if (o >= 55296 && o <= 56319)
                    if (r === n - 1)
                        i.push(65533);
                    else {
                        var a = t.charCodeAt(r + 1);
                        if (a >= 56320 && a <= 57343) {
                            var s = 1023 & o
                              , c = 1023 & a;
                            i.push(65536 + (s << 10) + c),
                            r += 1
                        } else
                            i.push(65533)
                    }
                r += 1
            }
            return i
        }(e)), i = []; ; ) {
            var o = r.read();
            if (o === y)
                break;
            if ((n = this._encoder.handler(r, o)) === w)
                break;
            Array.isArray(n) ? i.push.apply(i, n) : i.push(n)
        }
        if (!this._do_not_flush) {
            for (; (n = this._encoder.handler(r, r.read())) !== w; )
                Array.isArray(n) ? i.push.apply(i, n) : i.push(n);
            this._encoder = null
        }
        return new Uint8Array(i)
    }
    ,
    window.TextDecoder || (window.TextDecoder = O),
    window.TextEncoder || (window.TextEncoder = A),
    function(e) {
        if ("function" != typeof Promise)
            throw "Promise support required";
        var t = e.crypto || e.msCrypto;
        if (t) {
            var n = t.subtle || t.webkitSubtle;
            if (n) {
                var r = e.Crypto || t.constructor || Object
                  , i = e.SubtleCrypto || n.constructor || Object
                  , o = (e.CryptoKey || e.Key,
                e.navigator.userAgent.indexOf("Edge/") > -1)
                  , a = !!e.msCrypto && !o
                  , s = !t.subtle && !!t.webkitSubtle;
                if (a || s) {
                    var c = {
                        KoZIhvcNAQEB: "1.2.840.113549.1.1.1"
                    }
                      , l = {
                        "1.2.840.113549.1.1.1": "KoZIhvcNAQEB"
                    };
                    if (["generateKey", "importKey", "unwrapKey"].forEach((function(e) {
                        var r = n[e];
                        n[e] = function(i, o, c) {
                            var l, u, h, p, b = [].slice.call(arguments);
                            switch (e) {
                            case "generateKey":
                                l = m(i),
                                u = o,
                                h = c;
                                break;
                            case "importKey":
                                l = m(c),
                                u = b[3],
                                h = b[4],
                                "jwk" === i && ((o = y(o)).alg || (o.alg = g(l)),
                                o.key_ops || (o.key_ops = "oct" !== o.kty ? "d"in o ? h.filter(S) : h.filter(E) : h.slice()),
                                b[1] = v(o));
                                break;
                            case "unwrapKey":
                                l = b[4],
                                u = b[5],
                                h = b[6],
                                b[2] = c._key
                            }
                            if ("generateKey" === e && "HMAC" === l.name && l.hash)
                                return l.length = l.length || {
                                    "SHA-1": 512,
                                    "SHA-256": 512,
                                    "SHA-384": 1024,
                                    "SHA-512": 1024
                                }[l.hash.name],
                                n.importKey("raw", t.getRandomValues(new Uint8Array(l.length + 7 >> 3)), l, u, h);
                            if (s && "generateKey" === e && "RSASSA-PKCS1-v1_5" === l.name && (!l.modulusLength || l.modulusLength >= 2048))
                                return (i = m(i)).name = "RSAES-PKCS1-v1_5",
                                delete i.hash,
                                n.generateKey(i, !0, ["encrypt", "decrypt"]).then((function(e) {
                                    return Promise.all([n.exportKey("jwk", e.publicKey), n.exportKey("jwk", e.privateKey)])
                                }
                                )).then((function(e) {
                                    return e[0].alg = e[1].alg = g(l),
                                    e[0].key_ops = h.filter(E),
                                    e[1].key_ops = h.filter(S),
                                    Promise.all([n.importKey("jwk", e[0], l, !0, e[0].key_ops), n.importKey("jwk", e[1], l, u, e[1].key_ops)])
                                }
                                )).then((function(e) {
                                    return {
                                        publicKey: e[0],
                                        privateKey: e[1]
                                    }
                                }
                                ));
                            if ((s || a && "SHA-1" === (l.hash || {}).name) && "importKey" === e && "jwk" === i && "HMAC" === l.name && "oct" === o.kty)
                                return n.importKey("raw", f(d(o.k)), c, b[3], b[4]);
                            if (s && "importKey" === e && ("spki" === i || "pkcs8" === i))
                                return n.importKey("jwk", w(o), c, b[3], b[4]);
                            if (a && "unwrapKey" === e)
                                return n.decrypt(b[3], c, o).then((function(e) {
                                    return n.importKey(i, e, b[4], b[5], b[6])
                                }
                                ));
                            try {
                                p = r.apply(n, b)
                            } catch (k) {
                                return Promise.reject(k)
                            }
                            return a && (p = new Promise((function(e, t) {
                                p.onabort = p.onerror = function(e) {
                                    t(e)
                                }
                                ,
                                p.oncomplete = function(t) {
                                    e(t.target.result)
                                }
                            }
                            ))),
                            p = p.then((function(e) {
                                return "HMAC" === l.name && (l.length || (l.length = 8 * e.algorithm.length)),
                                0 == l.name.search("RSA") && (l.modulusLength || (l.modulusLength = (e.publicKey || e).algorithm.modulusLength),
                                l.publicExponent || (l.publicExponent = (e.publicKey || e).algorithm.publicExponent)),
                                e = e.publicKey && e.privateKey ? {
                                    publicKey: new x(e.publicKey,l,u,h.filter(E)),
                                    privateKey: new x(e.privateKey,l,u,h.filter(S))
                                } : new x(e,l,u,h)
                            }
                            ))
                        }
                    }
                    )),
                    ["exportKey", "wrapKey"].forEach((function(e) {
                        var t = n[e];
                        n[e] = function(r, i, o) {
                            var c, l = [].slice.call(arguments);
                            switch (e) {
                            case "exportKey":
                                l[1] = i._key;
                                break;
                            case "wrapKey":
                                l[1] = i._key,
                                l[2] = o._key
                            }
                            if ((s || a && "SHA-1" === (i.algorithm.hash || {}).name) && "exportKey" === e && "jwk" === r && "HMAC" === i.algorithm.name && (l[0] = "raw"),
                            !s || "exportKey" !== e || "spki" !== r && "pkcs8" !== r || (l[0] = "jwk"),
                            a && "wrapKey" === e)
                                return n.exportKey(r, i).then((function(e) {
                                    return "jwk" === r && (e = f(unescape(encodeURIComponent(JSON.stringify(y(e)))))),
                                    n.encrypt(l[3], o, e)
                                }
                                ));
                            try {
                                c = t.apply(n, l)
                            } catch (u) {
                                return Promise.reject(u)
                            }
                            return a && (c = new Promise((function(e, t) {
                                c.onabort = c.onerror = function(e) {
                                    t(e)
                                }
                                ,
                                c.oncomplete = function(t) {
                                    e(t.target.result)
                                }
                            }
                            ))),
                            "exportKey" === e && "jwk" === r && (c = c.then((function(e) {
                                return (s || a && "SHA-1" === (i.algorithm.hash || {}).name) && "HMAC" === i.algorithm.name ? {
                                    kty: "oct",
                                    alg: g(i.algorithm),
                                    key_ops: i.usages.slice(),
                                    ext: !0,
                                    k: h(p(e))
                                } : ((e = y(e)).alg || (e.alg = g(i.algorithm)),
                                e.key_ops || (e.key_ops = "public" === i.type ? i.usages.filter(E) : "private" === i.type ? i.usages.filter(S) : i.usages.slice()),
                                e)
                            }
                            ))),
                            !s || "exportKey" !== e || "spki" !== r && "pkcs8" !== r || (c = c.then((function(e) {
                                return e = b(y(e))
                            }
                            ))),
                            c
                        }
                    }
                    )),
                    ["encrypt", "decrypt", "sign", "verify"].forEach((function(e) {
                        var t = n[e];
                        n[e] = function(r, i, o, s) {
                            if (a && (!o.byteLength || s && !s.byteLength))
                                throw new Error("Empty input is not allowed");
                            var c, l = [].slice.call(arguments), u = m(r);
                            if (!a || "sign" !== e && "verify" !== e || "RSASSA-PKCS1-v1_5" !== r && "HMAC" !== r || (l[0] = {
                                name: r
                            }),
                            a && i.algorithm.hash && (l[0].hash = l[0].hash || i.algorithm.hash),
                            a && "decrypt" === e && "AES-GCM" === u.name) {
                                var h = r.tagLength >> 3;
                                l[2] = (o.buffer || o).slice(0, o.byteLength - h),
                                r.tag = (o.buffer || o).slice(o.byteLength - h)
                            }
                            a && "AES-GCM" === u.name && l[0].tagLength === undefined && (l[0].tagLength = 128),
                            l[1] = i._key;
                            try {
                                c = t.apply(n, l)
                            } catch (d) {
                                return Promise.reject(d)
                            }
                            return a && (c = new Promise((function(t, n) {
                                c.onabort = c.onerror = function(e) {
                                    n(e)
                                }
                                ,
                                c.oncomplete = function(n) {
                                    n = n.target.result;
                                    if ("encrypt" === e && n instanceof AesGcmEncryptResult) {
                                        var r = n.ciphertext
                                          , i = n.tag;
                                        (n = new Uint8Array(r.byteLength + i.byteLength)).set(new Uint8Array(r), 0),
                                        n.set(new Uint8Array(i), r.byteLength),
                                        n = n.buffer
                                    }
                                    t(n)
                                }
                            }
                            ))),
                            c
                        }
                    }
                    )),
                    a) {
                        var u = n.digest;
                        n.digest = function(e, t) {
                            if (!t.byteLength)
                                throw new Error("Empty input is not allowed");
                            var r;
                            try {
                                r = u.call(n, e, t)
                            } catch (i) {
                                return Promise.reject(i)
                            }
                            return r = new Promise((function(e, t) {
                                r.onabort = r.onerror = function(e) {
                                    t(e)
                                }
                                ,
                                r.oncomplete = function(t) {
                                    e(t.target.result)
                                }
                            }
                            )),
                            r
                        }
                        ,
                        e.crypto = Object.create(t, {
                            getRandomValues: {
                                value: function(e) {
                                    return t.getRandomValues(e)
                                }
                            },
                            subtle: {
                                value: n
                            }
                        }),
                        e.CryptoKey = x
                    }
                    s && (t.subtle = n,
                    e.Crypto = r,
                    e.SubtleCrypto = i,
                    e.CryptoKey = x)
                }
            }
        }
        function h(e) {
            return btoa(e).replace(/\=+$/, "").replace(/\+/g, "-").replace(/\//g, "_")
        }
        function d(e) {
            return e = (e += "===").slice(0, -e.length % 4),
            atob(e.replace(/-/g, "+").replace(/_/g, "/"))
        }
        function f(e) {
            for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++)
                t[n] = e.charCodeAt(n);
            return t
        }
        function p(e) {
            return e instanceof ArrayBuffer && (e = new Uint8Array(e)),
            String.fromCharCode.apply(String, e)
        }
        function m(e) {
            var t = {
                name: (e.name || e || "").toUpperCase().replace("V", "v")
            };
            switch (t.name) {
            case "SHA-1":
            case "SHA-256":
            case "SHA-384":
            case "SHA-512":
                break;
            case "AES-CBC":
            case "AES-GCM":
            case "AES-KW":
                e.length && (t.length = e.length);
                break;
            case "HMAC":
                e.hash && (t.hash = m(e.hash)),
                e.length && (t.length = e.length);
                break;
            case "RSAES-PKCS1-v1_5":
                e.publicExponent && (t.publicExponent = new Uint8Array(e.publicExponent)),
                e.modulusLength && (t.modulusLength = e.modulusLength);
                break;
            case "RSASSA-PKCS1-v1_5":
            case "RSA-OAEP":
                e.hash && (t.hash = m(e.hash)),
                e.publicExponent && (t.publicExponent = new Uint8Array(e.publicExponent)),
                e.modulusLength && (t.modulusLength = e.modulusLength);
                break;
            default:
                throw new SyntaxError("Bad algorithm name")
            }
            return t
        }
        function g(e) {
            return {
                HMAC: {
                    "SHA-1": "HS1",
                    "SHA-256": "HS256",
                    "SHA-384": "HS384",
                    "SHA-512": "HS512"
                },
                "RSASSA-PKCS1-v1_5": {
                    "SHA-1": "RS1",
                    "SHA-256": "RS256",
                    "SHA-384": "RS384",
                    "SHA-512": "RS512"
                },
                "RSAES-PKCS1-v1_5": {
                    "": "RSA1_5"
                },
                "RSA-OAEP": {
                    "SHA-1": "RSA-OAEP",
                    "SHA-256": "RSA-OAEP-256"
                },
                "AES-KW": {
                    128: "A128KW",
                    192: "A192KW",
                    256: "A256KW"
                },
                "AES-GCM": {
                    128: "A128GCM",
                    192: "A192GCM",
                    256: "A256GCM"
                },
                "AES-CBC": {
                    128: "A128CBC",
                    192: "A192CBC",
                    256: "A256CBC"
                }
            }[e.name][(e.hash || {}).name || e.length || ""]
        }
        function y(e) {
            (e instanceof ArrayBuffer || e instanceof Uint8Array) && (e = JSON.parse(decodeURIComponent(escape(p(e)))));
            var t = {
                kty: e.kty,
                alg: e.alg,
                ext: e.ext || e.extractable
            };
            switch (t.kty) {
            case "oct":
                t.k = e.k;
            case "RSA":
                ["n", "e", "d", "p", "q", "dp", "dq", "qi", "oth"].forEach((function(n) {
                    n in e && (t[n] = e[n])
                }
                ));
                break;
            default:
                throw new TypeError("Unsupported key type")
            }
            return t
        }
        function v(e) {
            var t = y(e);
            return a && (t.extractable = t.ext,
            delete t.ext),
            f(unescape(encodeURIComponent(JSON.stringify(t)))).buffer
        }
        function w(e) {
            var t = k(e)
              , n = !1;
            t.length > 2 && (n = !0,
            t.shift());
            var r = {
                ext: !0
            };
            if ("1.2.840.113549.1.1.1" !== t[0][0])
                throw new TypeError("Unsupported key type");
            var i = ["n", "e", "d", "p", "q", "dp", "dq", "qi"]
              , o = k(t[1]);
            n && o.shift();
            for (var a = 0; a < o.length; a++)
                o[a][0] || (o[a] = o[a].subarray(1)),
                r[i[a]] = h(p(o[a]));
            return r.kty = "RSA",
            r
        }
        function b(e) {
            var t, n = [["", null]], r = !1;
            if ("RSA" !== e.kty)
                throw new TypeError("Unsupported key type");
            for (var i = ["n", "e", "d", "p", "q", "dp", "dq", "qi"], o = [], a = 0; a < i.length && i[a]in e; a++) {
                var s = o[a] = f(d(e[i[a]]));
                128 & s[0] && (o[a] = new Uint8Array(s.length + 1),
                o[a].set(s, 1))
            }
            return o.length > 2 && (r = !0,
            o.unshift(new Uint8Array([0]))),
            n[0][0] = "1.2.840.113549.1.1.1",
            t = o,
            n.push(new Uint8Array(_(t)).buffer),
            r ? n.unshift(new Uint8Array([0])) : n[1] = {
                tag: 3,
                value: n[1]
            },
            new Uint8Array(_(n)).buffer
        }
        function k(e, t) {
            if (e instanceof ArrayBuffer && (e = new Uint8Array(e)),
            t || (t = {
                pos: 0,
                end: e.length
            }),
            t.end - t.pos < 2 || t.end > e.length)
                throw new RangeError("Malformed DER");
            var n, r = e[t.pos++], i = e[t.pos++];
            if (i >= 128) {
                if (i &= 127,
                t.end - t.pos < i)
                    throw new RangeError("Malformed DER");
                for (var o = 0; i--; )
                    o <<= 8,
                    o |= e[t.pos++];
                i = o
            }
            if (t.end - t.pos < i)
                throw new RangeError("Malformed DER");
            switch (r) {
            case 2:
                n = e.subarray(t.pos, t.pos += i);
                break;
            case 3:
                if (e[t.pos++])
                    throw new Error("Unsupported bit string");
                i--;
            case 4:
                n = new Uint8Array(e.subarray(t.pos, t.pos += i)).buffer;
                break;
            case 5:
                n = null;
                break;
            case 6:
                var a = btoa(p(e.subarray(t.pos, t.pos += i)));
                if (!(a in c))
                    throw new Error("Unsupported OBJECT ID " + a);
                n = c[a];
                break;
            case 48:
                n = [];
                for (var s = t.pos + i; t.pos < s; )
                    n.push(k(e, t));
                break;
            default:
                throw new Error("Unsupported DER tag 0x" + r.toString(16))
            }
            return n
        }
        function _(e, t) {
            t || (t = []);
            var n = 0
              , r = 0
              , i = t.length + 2;
            if (t.push(0, 0),
            e instanceof Uint8Array) {
                n = 2,
                r = e.length;
                for (var o = 0; o < r; o++)
                    t.push(e[o])
            } else if (e instanceof ArrayBuffer) {
                n = 4,
                r = e.byteLength,
                e = new Uint8Array(e);
                for (o = 0; o < r; o++)
                    t.push(e[o])
            } else if (null === e)
                n = 5,
                r = 0;
            else if ("string" == typeof e && e in l) {
                var a = f(atob(l[e]));
                n = 6,
                r = a.length;
                for (o = 0; o < r; o++)
                    t.push(a[o])
            } else if (e instanceof Array) {
                for (o = 0; o < e.length; o++)
                    _(e[o], t);
                n = 48,
                r = t.length - i
            } else {
                if (!("object" == typeof e && 3 === e.tag && e.value instanceof ArrayBuffer))
                    throw new Error("Unsupported DER value " + e);
                n = 3,
                r = (e = new Uint8Array(e.value)).byteLength,
                t.push(0);
                for (o = 0; o < r; o++)
                    t.push(e[o]);
                r++
            }
            if (r >= 128) {
                var s = r;
                r = 4;
                for (t.splice(i, 0, s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s); r > 1 && !(s >> 24); )
                    s <<= 8,
                    r--;
                r < 4 && t.splice(i, 4 - r),
                r |= 128
            }
            return t.splice(i - 2, 2, n, r),
            t
        }
        function x(e, t, n, r) {
            Object.defineProperties(this, {
                _key: {
                    value: e
                },
                type: {
                    value: e.type,
                    enumerable: !0
                },
                extractable: {
                    value: n === undefined ? e.extractable : n,
                    enumerable: !0
                },
                algorithm: {
                    value: t === undefined ? e.algorithm : t,
                    enumerable: !0
                },
                usages: {
                    value: r === undefined ? e.usages : r,
                    enumerable: !0
                }
            })
        }
        function E(e) {
            return "verify" === e || "encrypt" === e || "wrapKey" === e
        }
        function S(e) {
            return "sign" === e || "decrypt" === e || "unwrapKey" === e
        }
    }(window),
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        return function(t, n) {
            if (null === this || this === undefined)
                throw TypeError("Array.prototype.indexOf called on null or undefined");
            var r = e(this)
              , i = r.length >>> 0
              , o = Math.min(0 | n, i);
            if (o < 0)
                o = Math.max(0, i + o);
            else if (o >= i)
                return -1;
            if (void 0 === t) {
                for (; o !== i; ++o)
                    if (void 0 === r[o] && o in r)
                        return o
            } else if (t != t) {
                for (; o !== i; ++o)
                    if (r[o] != r[o])
                        return o
            } else
                for (; o !== i; ++o)
                    if (r[o] === t)
                        return o;
            return -1
        }
    }(Object)),
    Array.isArray || (Array.isArray = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
    ),
    document.getElementsByClassName || (window.Element.prototype.getElementsByClassName = document.constructor.prototype.getElementsByClassName = function(e) {
        if (document.querySelectorAll)
            return document.querySelectorAll("." + e);
        for (var t = document.getElementsByTagName("*"), n = new RegExp("(^|\\s)" + e + "(\\s|$)"), r = [], i = 0; i < t.length; i++)
            n.test(t[i].className) && r.push(t[i]);
        return r
    }
    ),
    String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
        return this.substr(!t || t < 0 ? 0 : +t, e.length) === e
    }
    ),
    String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
        return (t === undefined || t > this.length) && (t = this.length),
        this.substring(t - e.length, t) === e
    }
    );
    try {
        if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
            var B = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
            Object.defineProperty(Element.prototype, "textContent", {
                get: function() {
                    return B.get.call(this)
                },
                set: function(e) {
                    B.set.call(this, e)
                }
            })
        }
    } catch (Bn) {}
    Function.prototype.bind || (Function.prototype.bind = function(e) {
        if ("function" != typeof this)
            throw new TypeError("Function.prototype.bind: Item Can Not Be Bound.");
        var t = Array.prototype.slice.call(arguments, 1)
          , n = this
          , r = function() {}
          , i = function() {
            return n.apply(this instanceof r ? this : e, t.concat(Array.prototype.slice.call(arguments)))
        };
        return this.prototype && (r.prototype = this.prototype),
        i.prototype = new r,
        i
    }
    ),
    "function" != typeof Object.create && (Object.create = function(e, t) {
        function n() {}
        if (n.prototype = e,
        "object" == typeof t)
            for (var r in t)
                t.hasOwnProperty(r) && (n[r] = t[r]);
        return new n
    }
    ),
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    }
    ),
    window.console || (window.console = {});
    for (var P, R, I, M, L = ["error", "info", "log", "show", "table", "trace", "warn"], $ = function(e) {}, D = L.length; --D > -1; )
        x = L[D],
        window.console[x] || (window.console[x] = $);
    if (window.atob)
        try {
            window.atob(" ")
        } catch (Pn) {
            window.atob = function(e) {
                var t = function(t) {
                    return e(String(t).replace(/[\t\n\f\r ]+/g, ""))
                };
                return t.original = e,
                t
            }(window.atob)
        }
    else {
        var U = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          , N = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
        window.atob = function(e) {
            if (e = String(e).replace(/[\t\n\f\r ]+/g, ""),
            !N.test(e))
                throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
            var t, n, r;
            e += "==".slice(2 - (3 & e.length));
            for (var i = "", o = 0; o < e.length; )
                t = U.indexOf(e.charAt(o++)) << 18 | U.indexOf(e.charAt(o++)) << 12 | (n = U.indexOf(e.charAt(o++))) << 6 | (r = U.indexOf(e.charAt(o++))),
                i += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === r ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
            return i
        }
    }
    if (Event.prototype.preventDefault || (Event.prototype.preventDefault = function() {
        this.returnValue = !1
    }
    ),
    Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function() {
        this.cancelBubble = !0
    }
    ),
    window.Prototype && Array.prototype.toJSON) {
        console.error("[hCaptcha] Custom JSON polyfill detected, please remove to ensure hCaptcha works properly");
        var z = Array.prototype.toJSON
          , F = JSON.stringify;
        JSON.stringify = function(e) {
            try {
                return delete Array.prototype.toJSON,
                F(e)
            } finally {
                Array.prototype.toJSON = z
            }
        }
    }
    Object.keys || (Object.keys = (P = Object.prototype.hasOwnProperty,
    R = !Object.prototype.propertyIsEnumerable.call({
        toString: null
    }, "toString"),
    M = (I = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length,
    function(e) {
        if ("function" != typeof e && ("object" != typeof e || null === e))
            throw new TypeError("Object.keys called on non-object");
        var t, n, r = [];
        for (t in e)
            P.call(e, t) && r.push(t);
        if (R)
            for (n = 0; n < M; n++)
                P.call(e, I[n]) && r.push(I[n]);
        return r
    }
    ))/*! Raven.js 3.27.2 (6d91db933) | github.com/getsentry/raven-js */
    ,
    function(e) {
        if ("object" == typeof exports && "undefined" != typeof module)
            module.exports = e();
        else if ("function" == typeof define && define.amd)
            define("raven-js", e);
        else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Raven = e()
        }
    }((function() {
        return function e(t, n, r) {
            function i(a, s) {
                if (!n[a]) {
                    if (!t[a]) {
                        var c = "function" == typeof require && require;
                        if (!s && c)
                            return c(a, !0);
                        if (o)
                            return o(a, !0);
                        var l = new Error("Cannot find module '" + a + "'");
                        throw l.code = "MODULE_NOT_FOUND",
                        l
                    }
                    var u = n[a] = {
                        exports: {}
                    };
                    t[a][0].call(u.exports, (function(e) {
                        var n = t[a][1][e];
                        return i(n || e)
                    }
                    ), u, u.exports, e, t, n, r)
                }
                return n[a].exports
            }
            for (var o = "function" == typeof require && require, a = 0; a < r.length; a++)
                i(r[a]);
            return i
        }({
            1: [function(e, t, n) {
                function r(e) {
                    this.name = "RavenConfigError",
                    this.message = e
                }
                r.prototype = new Error,
                r.prototype.constructor = r,
                t.exports = r
            }
            , {}],
            2: [function(e, t, n) {
                var r = e(5);
                t.exports = {
                    wrapMethod: function(e, t, n) {
                        var i = e[t]
                          , o = e;
                        if (t in e) {
                            var a = "warn" === t ? "warning" : t;
                            e[t] = function() {
                                var e = [].slice.call(arguments)
                                  , s = r.safeJoin(e, " ")
                                  , c = {
                                    level: a,
                                    logger: "console",
                                    extra: {
                                        arguments: e
                                    }
                                };
                                "assert" === t ? !1 === e[0] && (s = "Assertion failed: " + (r.safeJoin(e.slice(1), " ") || "console.assert"),
                                c.extra.arguments = e.slice(1),
                                n && n(s, c)) : n && n(s, c),
                                i && Function.prototype.apply.call(i, o, e)
                            }
                        }
                    }
                }
            }
            , {
                5: 5
            }],
            3: [function(e, t, n) {
                (function(n) {
                    function r() {
                        return +new Date
                    }
                    function i(e, t) {
                        return v(t) ? function(n) {
                            return t(n, e)
                        }
                        : t
                    }
                    function o() {
                        for (var e in this.a = !("object" != typeof JSON || !JSON.stringify),
                        this.b = !y(W),
                        this.c = !y(K),
                        this.d = null,
                        this.e = null,
                        this.f = null,
                        this.g = null,
                        this.h = null,
                        this.i = null,
                        this.j = {},
                        this.k = {
                            release: H.SENTRY_RELEASE && H.SENTRY_RELEASE.id,
                            logger: "javascript",
                            ignoreErrors: [],
                            ignoreUrls: [],
                            whitelistUrls: [],
                            includePaths: [],
                            headers: null,
                            collectWindowErrors: !0,
                            captureUnhandledRejections: !0,
                            maxMessageLength: 0,
                            maxUrlLength: 250,
                            stackTraceLimit: 50,
                            autoBreadcrumbs: !0,
                            instrument: !0,
                            sampleRate: 1,
                            sanitizeKeys: []
                        },
                        this.l = {
                            method: "POST",
                            referrerPolicy: L() ? "origin" : ""
                        },
                        this.m = 0,
                        this.n = !1,
                        this.o = Error.stackTraceLimit,
                        this.p = H.console || {},
                        this.q = {},
                        this.r = [],
                        this.s = r(),
                        this.t = [],
                        this.u = [],
                        this.v = null,
                        this.w = H.location,
                        this.x = this.w && this.w.href,
                        this.y(),
                        this.p)
                            this.q[e] = this.p[e]
                    }
                    var a = e(6)
                      , s = e(7)
                      , c = e(8)
                      , l = e(1)
                      , u = e(5)
                      , h = u.isErrorEvent
                      , d = u.isDOMError
                      , f = u.isDOMException
                      , p = u.isError
                      , m = u.isObject
                      , g = u.isPlainObject
                      , y = u.isUndefined
                      , v = u.isFunction
                      , w = u.isString
                      , b = u.isArray
                      , k = u.isEmptyObject
                      , _ = u.each
                      , x = u.objectMerge
                      , E = u.truncate
                      , S = u.objectFrozen
                      , C = u.hasKey
                      , O = u.joinRegExp
                      , A = u.urlencode
                      , T = u.uuid4
                      , j = u.htmlTreeAsString
                      , B = u.isSameException
                      , P = u.isSameStacktrace
                      , R = u.parseUrl
                      , I = u.fill
                      , M = u.supportsFetch
                      , L = u.supportsReferrerPolicy
                      , $ = u.serializeKeysForMessage
                      , D = u.serializeException
                      , U = u.sanitize
                      , N = e(2).wrapMethod
                      , z = "source protocol user pass host port path".split(" ")
                      , F = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/
                      , H = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {}
                      , W = H.document
                      , K = H.navigator;
                    o.prototype = {
                        VERSION: "3.27.2",
                        debug: !1,
                        TraceKit: a,
                        config: function(e, t) {
                            var n = this;
                            if (n.g)
                                return this.z("error", "Error: Raven has already been configured"),
                                n;
                            if (!e)
                                return n;
                            var r = n.k;
                            t && _(t, (function(e, t) {
                                "tags" === e || "extra" === e || "user" === e ? n.j[e] = t : r[e] = t
                            }
                            )),
                            n.setDSN(e),
                            r.ignoreErrors.push(/^Script error\.?$/),
                            r.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),
                            r.ignoreErrors = O(r.ignoreErrors),
                            r.ignoreUrls = !!r.ignoreUrls.length && O(r.ignoreUrls),
                            r.whitelistUrls = !!r.whitelistUrls.length && O(r.whitelistUrls),
                            r.includePaths = O(r.includePaths),
                            r.maxBreadcrumbs = Math.max(0, Math.min(r.maxBreadcrumbs || 100, 100));
                            var i = {
                                xhr: !0,
                                console: !0,
                                dom: !0,
                                location: !0,
                                sentry: !0
                            }
                              , o = r.autoBreadcrumbs;
                            "[object Object]" === {}.toString.call(o) ? o = x(i, o) : !1 !== o && (o = i),
                            r.autoBreadcrumbs = o;
                            var s = {
                                tryCatch: !0
                            }
                              , c = r.instrument;
                            return "[object Object]" === {}.toString.call(c) ? c = x(s, c) : !1 !== c && (c = s),
                            r.instrument = c,
                            a.collectWindowErrors = !!r.collectWindowErrors,
                            n
                        },
                        install: function() {
                            var e = this;
                            return e.isSetup() && !e.n && (a.report.subscribe((function() {
                                e.A.apply(e, arguments)
                            }
                            )),
                            e.k.captureUnhandledRejections && e.B(),
                            e.C(),
                            e.k.instrument && e.k.instrument.tryCatch && e.D(),
                            e.k.autoBreadcrumbs && e.E(),
                            e.F(),
                            e.n = !0),
                            Error.stackTraceLimit = e.k.stackTraceLimit,
                            this
                        },
                        setDSN: function(e) {
                            var t = this
                              , n = t.G(e)
                              , r = n.path.lastIndexOf("/")
                              , i = n.path.substr(1, r);
                            t.H = e,
                            t.h = n.user,
                            t.I = n.pass && n.pass.substr(1),
                            t.i = n.path.substr(r + 1),
                            t.g = t.J(n),
                            t.K = t.g + "/" + i + "api/" + t.i + "/store/",
                            this.y()
                        },
                        context: function(e, t, n) {
                            return v(e) && (n = t || [],
                            t = e,
                            e = {}),
                            this.wrap(e, t).apply(this, n)
                        },
                        wrap: function(e, t, n) {
                            function r() {
                                var r = []
                                  , o = arguments.length
                                  , a = !e || e && !1 !== e.deep;
                                for (n && v(n) && n.apply(this, arguments); o--; )
                                    r[o] = a ? i.wrap(e, arguments[o]) : arguments[o];
                                try {
                                    return t.apply(this, r)
                                } catch (s) {
                                    throw i.L(),
                                    i.captureException(s, e),
                                    s
                                }
                            }
                            var i = this;
                            if (y(t) && !v(e))
                                return e;
                            if (v(e) && (t = e,
                            e = void 0),
                            !v(t))
                                return t;
                            try {
                                if (t.M)
                                    return t;
                                if (t.N)
                                    return t.N
                            } catch (o) {
                                return t
                            }
                            for (var a in t)
                                C(t, a) && (r[a] = t[a]);
                            return r.prototype = t.prototype,
                            t.N = r,
                            r.M = !0,
                            r.O = t,
                            r
                        },
                        uninstall: function() {
                            return a.report.uninstall(),
                            this.P(),
                            this.Q(),
                            this.R(),
                            this.S(),
                            Error.stackTraceLimit = this.o,
                            this.n = !1,
                            this
                        },
                        T: function(e) {
                            this.z("debug", "Raven caught unhandled promise rejection:", e),
                            this.captureException(e.reason, {
                                mechanism: {
                                    type: "onunhandledrejection",
                                    handled: !1
                                }
                            })
                        },
                        B: function() {
                            return this.T = this.T.bind(this),
                            H.addEventListener && H.addEventListener("unhandledrejection", this.T),
                            this
                        },
                        P: function() {
                            return H.removeEventListener && H.removeEventListener("unhandledrejection", this.T),
                            this
                        },
                        captureException: function(e, t) {
                            if (t = x({
                                trimHeadFrames: 0
                            }, t || {}),
                            h(e) && e.error)
                                e = e.error;
                            else {
                                if (d(e) || f(e)) {
                                    var n = e.name || (d(e) ? "DOMError" : "DOMException")
                                      , r = e.message ? n + ": " + e.message : n;
                                    return this.captureMessage(r, x(t, {
                                        stacktrace: !0,
                                        trimHeadFrames: t.trimHeadFrames + 1
                                    }))
                                }
                                if (p(e))
                                    e = e;
                                else {
                                    if (!g(e))
                                        return this.captureMessage(e, x(t, {
                                            stacktrace: !0,
                                            trimHeadFrames: t.trimHeadFrames + 1
                                        }));
                                    t = this.U(t, e),
                                    e = new Error(t.message)
                                }
                            }
                            this.d = e;
                            try {
                                var i = a.computeStackTrace(e);
                                this.V(i, t)
                            } catch (o) {
                                if (e !== o)
                                    throw o
                            }
                            return this
                        },
                        U: function(e, t) {
                            var n = Object.keys(t).sort()
                              , r = x(e, {
                                message: "Non-Error exception captured with keys: " + $(n),
                                fingerprint: [c(n)],
                                extra: e.extra || {}
                            });
                            return r.extra.W = D(t),
                            r
                        },
                        captureMessage: function(e, t) {
                            if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(e)) {
                                var n, r = x({
                                    message: e += ""
                                }, t = t || {});
                                try {
                                    throw new Error(e)
                                } catch (i) {
                                    n = i
                                }
                                n.name = null;
                                var o = a.computeStackTrace(n)
                                  , s = b(o.stack) && o.stack[1];
                                s && "Raven.captureException" === s.func && (s = o.stack[2]);
                                var c = s && s.url || "";
                                if ((!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(c)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(c))) {
                                    if (this.k.stacktrace || t.stacktrace || "" === r.message) {
                                        r.fingerprint = null == r.fingerprint ? e : r.fingerprint,
                                        (t = x({
                                            trimHeadFrames: 0
                                        }, t)).trimHeadFrames += 1;
                                        var l = this.X(o, t);
                                        r.stacktrace = {
                                            frames: l.reverse()
                                        }
                                    }
                                    return r.fingerprint && (r.fingerprint = b(r.fingerprint) ? r.fingerprint : [r.fingerprint]),
                                    this.Y(r),
                                    this
                                }
                            }
                        },
                        captureBreadcrumb: function(e) {
                            var t = x({
                                timestamp: r() / 1e3
                            }, e);
                            if (v(this.k.breadcrumbCallback)) {
                                var n = this.k.breadcrumbCallback(t);
                                if (m(n) && !k(n))
                                    t = n;
                                else if (!1 === n)
                                    return this
                            }
                            return this.u.push(t),
                            this.u.length > this.k.maxBreadcrumbs && this.u.shift(),
                            this
                        },
                        addPlugin: function(e) {
                            var t = [].slice.call(arguments, 1);
                            return this.r.push([e, t]),
                            this.n && this.F(),
                            this
                        },
                        setUserContext: function(e) {
                            return this.j.user = e,
                            this
                        },
                        setExtraContext: function(e) {
                            return this.Z("extra", e),
                            this
                        },
                        setTagsContext: function(e) {
                            return this.Z("tags", e),
                            this
                        },
                        clearContext: function() {
                            return this.j = {},
                            this
                        },
                        getContext: function() {
                            return JSON.parse(s(this.j))
                        },
                        setEnvironment: function(e) {
                            return this.k.environment = e,
                            this
                        },
                        setRelease: function(e) {
                            return this.k.release = e,
                            this
                        },
                        setDataCallback: function(e) {
                            var t = this.k.dataCallback;
                            return this.k.dataCallback = i(t, e),
                            this
                        },
                        setBreadcrumbCallback: function(e) {
                            var t = this.k.breadcrumbCallback;
                            return this.k.breadcrumbCallback = i(t, e),
                            this
                        },
                        setShouldSendCallback: function(e) {
                            var t = this.k.shouldSendCallback;
                            return this.k.shouldSendCallback = i(t, e),
                            this
                        },
                        setTransport: function(e) {
                            return this.k.transport = e,
                            this
                        },
                        lastException: function() {
                            return this.d
                        },
                        lastEventId: function() {
                            return this.f
                        },
                        isSetup: function() {
                            return !(!this.a || !this.g && (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0,
                            this.z("error", "Error: Raven has not been configured.")),
                            1))
                        },
                        afterLoad: function() {
                            var e = H.RavenConfig;
                            e && this.config(e.dsn, e.config).install()
                        },
                        showReportDialog: function(e) {
                            if (W) {
                                if (!(e = x({
                                    eventId: this.lastEventId(),
                                    dsn: this.H,
                                    user: this.j.user || {}
                                }, e)).eventId)
                                    throw new l("Missing eventId");
                                if (!e.dsn)
                                    throw new l("Missing DSN");
                                var t = encodeURIComponent
                                  , n = [];
                                for (var r in e)
                                    if ("user" === r) {
                                        var i = e.user;
                                        i.name && n.push("name=" + t(i.name)),
                                        i.email && n.push("email=" + t(i.email))
                                    } else
                                        n.push(t(r) + "=" + t(e[r]));
                                var o = this.J(this.G(e.dsn))
                                  , a = W.createElement("script");
                                a.async = !0,
                                a.src = o + "/api/embed/error-page/?" + n.join("&"),
                                (W.head || W.body).appendChild(a)
                            }
                        },
                        L: function() {
                            var e = this;
                            this.m += 1,
                            setTimeout((function() {
                                e.m -= 1
                            }
                            ))
                        },
                        $: function(e, t) {
                            var n, r;
                            if (this.b) {
                                for (r in t = t || {},
                                e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1),
                                W.createEvent ? (n = W.createEvent("HTMLEvents")).initEvent(e, !0, !0) : (n = W.createEventObject()).eventType = e,
                                t)
                                    C(t, r) && (n[r] = t[r]);
                                if (W.createEvent)
                                    W.dispatchEvent(n);
                                else
                                    try {
                                        W.fireEvent("on" + n.eventType.toLowerCase(), n)
                                    } catch (i) {}
                            }
                        },
                        _: function(e) {
                            var t = this;
                            return function(n) {
                                if (t.aa = null,
                                t.v !== n) {
                                    var r;
                                    t.v = n;
                                    try {
                                        r = j(n.target)
                                    } catch (i) {
                                        r = "<unknown>"
                                    }
                                    t.captureBreadcrumb({
                                        category: "ui." + e,
                                        message: r
                                    })
                                }
                            }
                        },
                        ba: function() {
                            var e = this;
                            return function(t) {
                                var n;
                                try {
                                    n = t.target
                                } catch (i) {
                                    return
                                }
                                var r = n && n.tagName;
                                if (r && ("INPUT" === r || "TEXTAREA" === r || n.isContentEditable)) {
                                    var o = e.aa;
                                    o || e._("input")(t),
                                    clearTimeout(o),
                                    e.aa = setTimeout((function() {
                                        e.aa = null
                                    }
                                    ), 1e3)
                                }
                            }
                        },
                        ca: function(e, t) {
                            var n = R(this.w.href)
                              , r = R(t)
                              , i = R(e);
                            this.x = t,
                            n.protocol === r.protocol && n.host === r.host && (t = r.relative),
                            n.protocol === i.protocol && n.host === i.host && (e = i.relative),
                            this.captureBreadcrumb({
                                category: "navigation",
                                data: {
                                    to: t,
                                    from: e
                                }
                            })
                        },
                        C: function() {
                            var e = this;
                            e.da = Function.prototype.toString,
                            Function.prototype.toString = function() {
                                return "function" == typeof this && this.M ? e.da.apply(this.O, arguments) : e.da.apply(this, arguments)
                            }
                        },
                        Q: function() {
                            this.da && (Function.prototype.toString = this.da)
                        },
                        D: function() {
                            function e(e) {
                                return function(t, r) {
                                    for (var i = new Array(arguments.length), o = 0; o < i.length; ++o)
                                        i[o] = arguments[o];
                                    var a = i[0];
                                    return v(a) && (i[0] = n.wrap({
                                        mechanism: {
                                            type: "instrument",
                                            data: {
                                                "function": e.name || "<anonymous>"
                                            }
                                        }
                                    }, a)),
                                    e.apply ? e.apply(this, i) : e(i[0], i[1])
                                }
                            }
                            function t(e) {
                                var t = H[e] && H[e].prototype;
                                t && t.hasOwnProperty && t.hasOwnProperty("addEventListener") && (I(t, "addEventListener", (function(t) {
                                    return function(r, o, a, s) {
                                        try {
                                            o && o.handleEvent && (o.handleEvent = n.wrap({
                                                mechanism: {
                                                    type: "instrument",
                                                    data: {
                                                        target: e,
                                                        "function": "handleEvent",
                                                        handler: o && o.name || "<anonymous>"
                                                    }
                                                }
                                            }, o.handleEvent))
                                        } catch (c) {}
                                        var l, u, h;
                                        return i && i.dom && ("EventTarget" === e || "Node" === e) && (u = n._("click"),
                                        h = n.ba(),
                                        l = function(e) {
                                            if (e) {
                                                var t;
                                                try {
                                                    t = e.type
                                                } catch (n) {
                                                    return
                                                }
                                                return "click" === t ? u(e) : "keypress" === t ? h(e) : void 0
                                            }
                                        }
                                        ),
                                        t.call(this, r, n.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    target: e,
                                                    "function": "addEventListener",
                                                    handler: o && o.name || "<anonymous>"
                                                }
                                            }
                                        }, o, l), a, s)
                                    }
                                }
                                ), r),
                                I(t, "removeEventListener", (function(e) {
                                    return function(t, n, r, i) {
                                        try {
                                            n = n && (n.N ? n.N : n)
                                        } catch (o) {}
                                        return e.call(this, t, n, r, i)
                                    }
                                }
                                ), r))
                            }
                            var n = this
                              , r = n.t
                              , i = this.k.autoBreadcrumbs;
                            I(H, "setTimeout", e, r),
                            I(H, "setInterval", e, r),
                            H.requestAnimationFrame && I(H, "requestAnimationFrame", (function(e) {
                                return function(t) {
                                    return e(n.wrap({
                                        mechanism: {
                                            type: "instrument",
                                            data: {
                                                "function": "requestAnimationFrame",
                                                handler: e && e.name || "<anonymous>"
                                            }
                                        }
                                    }, t))
                                }
                            }
                            ), r);
                            for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], a = 0; a < o.length; a++)
                                t(o[a])
                        },
                        E: function() {
                            function e(e, n) {
                                e in n && v(n[e]) && I(n, e, (function(n) {
                                    return t.wrap({
                                        mechanism: {
                                            type: "instrument",
                                            data: {
                                                "function": e,
                                                handler: n && n.name || "<anonymous>"
                                            }
                                        }
                                    }, n)
                                }
                                ))
                            }
                            var t = this
                              , n = this.k.autoBreadcrumbs
                              , r = t.t;
                            if (n.xhr && "XMLHttpRequest"in H) {
                                var i = H.XMLHttpRequest && H.XMLHttpRequest.prototype;
                                I(i, "open", (function(e) {
                                    return function(n, r) {
                                        return w(r) && -1 === r.indexOf(t.h) && (this.ea = {
                                            method: n,
                                            url: r,
                                            status_code: null
                                        }),
                                        e.apply(this, arguments)
                                    }
                                }
                                ), r),
                                I(i, "send", (function(n) {
                                    return function() {
                                        function r() {
                                            if (i.ea && 4 === i.readyState) {
                                                try {
                                                    i.ea.status_code = i.status
                                                } catch (e) {}
                                                t.captureBreadcrumb({
                                                    type: "http",
                                                    category: "xhr",
                                                    data: i.ea
                                                })
                                            }
                                        }
                                        for (var i = this, o = ["onload", "onerror", "onprogress"], a = 0; a < o.length; a++)
                                            e(o[a], i);
                                        return "onreadystatechange"in i && v(i.onreadystatechange) ? I(i, "onreadystatechange", (function(e) {
                                            return t.wrap({
                                                mechanism: {
                                                    type: "instrument",
                                                    data: {
                                                        "function": "onreadystatechange",
                                                        handler: e && e.name || "<anonymous>"
                                                    }
                                                }
                                            }, e, r)
                                        }
                                        )) : i.onreadystatechange = r,
                                        n.apply(this, arguments)
                                    }
                                }
                                ), r)
                            }
                            n.xhr && M() && I(H, "fetch", (function(e) {
                                return function() {
                                    for (var n = new Array(arguments.length), r = 0; r < n.length; ++r)
                                        n[r] = arguments[r];
                                    var i, o = n[0], a = "GET";
                                    if ("string" == typeof o ? i = o : "Request"in H && o instanceof H.Request ? (i = o.url,
                                    o.method && (a = o.method)) : i = "" + o,
                                    -1 !== i.indexOf(t.h))
                                        return e.apply(this, n);
                                    n[1] && n[1].method && (a = n[1].method);
                                    var s = {
                                        method: a,
                                        url: i,
                                        status_code: null
                                    };
                                    return e.apply(this, n).then((function(e) {
                                        return s.status_code = e.status,
                                        t.captureBreadcrumb({
                                            type: "http",
                                            category: "fetch",
                                            data: s
                                        }),
                                        e
                                    }
                                    ))["catch"]((function(e) {
                                        throw t.captureBreadcrumb({
                                            type: "http",
                                            category: "fetch",
                                            data: s,
                                            level: "error"
                                        }),
                                        e
                                    }
                                    ))
                                }
                            }
                            ), r),
                            n.dom && this.b && (W.addEventListener ? (W.addEventListener("click", t._("click"), !1),
                            W.addEventListener("keypress", t.ba(), !1)) : W.attachEvent && (W.attachEvent("onclick", t._("click")),
                            W.attachEvent("onkeypress", t.ba())));
                            var o = H.chrome
                              , a = !(o && o.app && o.app.runtime) && H.history && H.history.pushState && H.history.replaceState;
                            if (n.location && a) {
                                var s = H.onpopstate;
                                H.onpopstate = function() {
                                    var e = t.w.href;
                                    if (t.ca(t.x, e),
                                    s)
                                        return s.apply(this, arguments)
                                }
                                ;
                                var c = function(e) {
                                    return function() {
                                        var n = arguments.length > 2 ? arguments[2] : void 0;
                                        return n && t.ca(t.x, n + ""),
                                        e.apply(this, arguments)
                                    }
                                };
                                I(H.history, "pushState", c, r),
                                I(H.history, "replaceState", c, r)
                            }
                            if (n.console && "console"in H && console.log) {
                                var l = function(e, n) {
                                    t.captureBreadcrumb({
                                        message: e,
                                        level: n.level,
                                        category: "console"
                                    })
                                };
                                _(["debug", "info", "warn", "error", "log"], (function(e, t) {
                                    N(console, t, l)
                                }
                                ))
                            }
                        },
                        R: function() {
                            for (var e; this.t.length; ) {
                                var t = (e = this.t.shift())[0]
                                  , n = e[1]
                                  , r = e[2];
                                t[n] = r
                            }
                        },
                        S: function() {
                            for (var e in this.q)
                                this.p[e] = this.q[e]
                        },
                        F: function() {
                            var e = this;
                            _(this.r, (function(t, n) {
                                var r = n[0]
                                  , i = n[1];
                                r.apply(e, [e].concat(i))
                            }
                            ))
                        },
                        G: function(e) {
                            var t = F.exec(e)
                              , n = {}
                              , r = 7;
                            try {
                                for (; r--; )
                                    n[z[r]] = t[r] || ""
                            } catch (i) {
                                throw new l("Invalid DSN: " + e)
                            }
                            if (n.pass && !this.k.allowSecretKey)
                                throw new l("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                            return n
                        },
                        J: function(e) {
                            var t = "//" + e.host + (e.port ? ":" + e.port : "");
                            return e.protocol && (t = e.protocol + ":" + t),
                            t
                        },
                        A: function(e, t) {
                            (t = t || {}).mechanism = t.mechanism || {
                                type: "onerror",
                                handled: !1
                            },
                            this.m || this.V(e, t)
                        },
                        V: function(e, t) {
                            var n = this.X(e, t);
                            this.$("handle", {
                                stackInfo: e,
                                options: t
                            }),
                            this.fa(e.name, e.message, e.url, e.lineno, n, t)
                        },
                        X: function(e, t) {
                            var n = this
                              , r = [];
                            if (e.stack && e.stack.length && (_(e.stack, (function(t, i) {
                                var o = n.ga(i, e.url);
                                o && r.push(o)
                            }
                            )),
                            t && t.trimHeadFrames))
                                for (var i = 0; i < t.trimHeadFrames && i < r.length; i++)
                                    r[i].in_app = !1;
                            return r = r.slice(0, this.k.stackTraceLimit)
                        },
                        ga: function(e, t) {
                            var n = {
                                filename: e.url,
                                lineno: e.line,
                                colno: e.column,
                                "function": e.func || "?"
                            };
                            return e.url || (n.filename = t),
                            n.in_app = !(this.k.includePaths.test && !this.k.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n["function"]) || /raven\.(min\.)?js$/.test(n.filename)),
                            n
                        },
                        fa: function(e, t, n, r, i, o) {
                            var a, s = (e ? e + ": " : "") + (t || "");
                            if ((!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(t) && !this.k.ignoreErrors.test(s)) && (i && i.length ? (n = i[0].filename || n,
                            i.reverse(),
                            a = {
                                frames: i
                            }) : n && (a = {
                                frames: [{
                                    filename: n,
                                    lineno: r,
                                    in_app: !0
                                }]
                            }),
                            (!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(n)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(n)))) {
                                var c = x({
                                    exception: {
                                        values: [{
                                            type: e,
                                            value: t,
                                            stacktrace: a
                                        }]
                                    },
                                    transaction: n
                                }, o)
                                  , l = c.exception.values[0];
                                null == l.type && "" === l.value && (l.value = "Unrecoverable error caught"),
                                !c.exception.mechanism && c.mechanism && (c.exception.mechanism = c.mechanism,
                                delete c.mechanism),
                                c.exception.mechanism = x({
                                    type: "generic",
                                    handled: !0
                                }, c.exception.mechanism || {}),
                                this.Y(c)
                            }
                        },
                        ha: function(e) {
                            var t = this.k.maxMessageLength;
                            if (e.message && (e.message = E(e.message, t)),
                            e.exception) {
                                var n = e.exception.values[0];
                                n.value = E(n.value, t)
                            }
                            var r = e.request;
                            return r && (r.url && (r.url = E(r.url, this.k.maxUrlLength)),
                            r.Referer && (r.Referer = E(r.Referer, this.k.maxUrlLength))),
                            e.breadcrumbs && e.breadcrumbs.values && this.ia(e.breadcrumbs),
                            e
                        },
                        ia: function(e) {
                            for (var t, n, r, i = ["to", "from", "url"], o = 0; o < e.values.length; ++o)
                                if ((n = e.values[o]).hasOwnProperty("data") && m(n.data) && !S(n.data)) {
                                    r = x({}, n.data);
                                    for (var a = 0; a < i.length; ++a)
                                        t = i[a],
                                        r.hasOwnProperty(t) && r[t] && (r[t] = E(r[t], this.k.maxUrlLength));
                                    e.values[o].data = r
                                }
                        },
                        ja: function() {
                            if (this.c || this.b) {
                                var e = {};
                                return this.c && K.userAgent && (e.headers = {
                                    "User-Agent": K.userAgent
                                }),
                                H.location && H.location.href && (e.url = H.location.href),
                                this.b && W.referrer && (e.headers || (e.headers = {}),
                                e.headers.Referer = W.referrer),
                                e
                            }
                        },
                        y: function() {
                            this.ka = 0,
                            this.la = null
                        },
                        ma: function() {
                            return this.ka && r() - this.la < this.ka
                        },
                        na: function(e) {
                            var t = this.e;
                            return !(!t || e.message !== t.message || e.transaction !== t.transaction) && (e.stacktrace || t.stacktrace ? P(e.stacktrace, t.stacktrace) : e.exception || t.exception ? B(e.exception, t.exception) : !e.fingerprint && !t.fingerprint || Boolean(e.fingerprint && t.fingerprint) && JSON.stringify(e.fingerprint) === JSON.stringify(t.fingerprint))
                        },
                        oa: function(e) {
                            if (!this.ma()) {
                                var t = e.status;
                                if (400 === t || 401 === t || 429 === t) {
                                    var n;
                                    try {
                                        n = M() ? e.headers.get("Retry-After") : e.getResponseHeader("Retry-After"),
                                        n = 1e3 * parseInt(n, 10)
                                    } catch (i) {}
                                    this.ka = n || (2 * this.ka || 1e3),
                                    this.la = r()
                                }
                            }
                        },
                        Y: function(e) {
                            var t = this.k
                              , n = {
                                project: this.i,
                                logger: t.logger,
                                platform: "javascript"
                            }
                              , i = this.ja();
                            if (i && (n.request = i),
                            e.trimHeadFrames && delete e.trimHeadFrames,
                            (e = x(n, e)).tags = x(x({}, this.j.tags), e.tags),
                            e.extra = x(x({}, this.j.extra), e.extra),
                            e.extra["session:duration"] = r() - this.s,
                            this.u && this.u.length > 0 && (e.breadcrumbs = {
                                values: [].slice.call(this.u, 0)
                            }),
                            this.j.user && (e.user = this.j.user),
                            t.environment && (e.environment = t.environment),
                            t.release && (e.release = t.release),
                            t.serverName && (e.server_name = t.serverName),
                            e = this.pa(e),
                            Object.keys(e).forEach((function(t) {
                                (null == e[t] || "" === e[t] || k(e[t])) && delete e[t]
                            }
                            )),
                            v(t.dataCallback) && (e = t.dataCallback(e) || e),
                            e && !k(e) && (!v(t.shouldSendCallback) || t.shouldSendCallback(e)))
                                return this.ma() ? void this.z("warn", "Raven dropped error due to backoff: ", e) : void ("number" == typeof t.sampleRate ? Math.random() < t.sampleRate && this.qa(e) : this.qa(e))
                        },
                        pa: function(e) {
                            return U(e, this.k.sanitizeKeys)
                        },
                        ra: function() {
                            return T()
                        },
                        qa: function(e, t) {
                            var n = this
                              , r = this.k;
                            if (this.isSetup()) {
                                if (e = this.ha(e),
                                !this.k.allowDuplicates && this.na(e))
                                    return void this.z("warn", "Raven dropped repeat event: ", e);
                                this.f = e.event_id || (e.event_id = this.ra()),
                                this.e = e,
                                this.z("debug", "Raven about to send:", e);
                                var i = {
                                    sentry_version: "7",
                                    sentry_client: "raven-js/" + this.VERSION,
                                    sentry_key: this.h
                                };
                                this.I && (i.sentry_secret = this.I);
                                var o = e.exception && e.exception.values[0];
                                this.k.autoBreadcrumbs && this.k.autoBreadcrumbs.sentry && this.captureBreadcrumb({
                                    category: "sentry",
                                    message: o ? (o.type ? o.type + ": " : "") + o.value : e.message,
                                    event_id: e.event_id,
                                    level: e.level || "error"
                                });
                                var a = this.K;
                                (r.transport || this._makeRequest).call(this, {
                                    url: a,
                                    auth: i,
                                    data: e,
                                    options: r,
                                    onSuccess: function() {
                                        n.y(),
                                        n.$("success", {
                                            data: e,
                                            src: a
                                        }),
                                        t && t()
                                    },
                                    onError: function(r) {
                                        n.z("error", "Raven transport failed to send: ", r),
                                        r.request && n.oa(r.request),
                                        n.$("failure", {
                                            data: e,
                                            src: a
                                        }),
                                        r = r || new Error("Raven send failed (no additional details provided)"),
                                        t && t(r)
                                    }
                                })
                            }
                        },
                        _makeRequest: function(e) {
                            var t = e.url + "?" + A(e.auth)
                              , n = null
                              , r = {};
                            if (e.options.headers && (n = this.sa(e.options.headers)),
                            e.options.fetchParameters && (r = this.sa(e.options.fetchParameters)),
                            M()) {
                                r.body = s(e.data);
                                var i = x({}, this.l)
                                  , o = x(i, r);
                                return n && (o.headers = n),
                                H.fetch(t, o).then((function(t) {
                                    if (t.ok)
                                        e.onSuccess && e.onSuccess();
                                    else {
                                        var n = new Error("Sentry error code: " + t.status);
                                        n.request = t,
                                        e.onError && e.onError(n)
                                    }
                                }
                                ))["catch"]((function() {
                                    e.onError && e.onError(new Error("Sentry error code: network unavailable"))
                                }
                                ))
                            }
                            var a = H.XMLHttpRequest && new H.XMLHttpRequest;
                            a && (("withCredentials"in a || "undefined" != typeof XDomainRequest) && ("withCredentials"in a ? a.onreadystatechange = function() {
                                if (4 === a.readyState)
                                    if (200 === a.status)
                                        e.onSuccess && e.onSuccess();
                                    else if (e.onError) {
                                        var t = new Error("Sentry error code: " + a.status);
                                        t.request = a,
                                        e.onError(t)
                                    }
                            }
                            : (a = new XDomainRequest,
                            t = t.replace(/^https?:/, ""),
                            e.onSuccess && (a.onload = e.onSuccess),
                            e.onError && (a.onerror = function() {
                                var t = new Error("Sentry error code: XDomainRequest");
                                t.request = a,
                                e.onError(t)
                            }
                            )),
                            a.open("POST", t),
                            n && _(n, (function(e, t) {
                                a.setRequestHeader(e, t)
                            }
                            )),
                            a.send(s(e.data))))
                        },
                        sa: function(e) {
                            var t = {};
                            for (var n in e)
                                if (e.hasOwnProperty(n)) {
                                    var r = e[n];
                                    t[n] = "function" == typeof r ? r() : r
                                }
                            return t
                        },
                        z: function(e) {
                            this.q[e] && (this.debug || this.k.debug) && Function.prototype.apply.call(this.q[e], this.p, [].slice.call(arguments, 1))
                        },
                        Z: function(e, t) {
                            y(t) ? delete this.j[e] : this.j[e] = x(this.j[e] || {}, t)
                        }
                    },
                    o.prototype.setUser = o.prototype.setUserContext,
                    o.prototype.setReleaseContext = o.prototype.setRelease,
                    t.exports = o
                }
                ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }
            , {
                1: 1,
                2: 2,
                5: 5,
                6: 6,
                7: 7,
                8: 8
            }],
            4: [function(e, t, n) {
                (function(n) {
                    var r = e(3)
                      , i = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {}
                      , o = i.Raven
                      , a = new r;
                    a.noConflict = function() {
                        return i.Raven = o,
                        a
                    }
                    ,
                    a.afterLoad(),
                    t.exports = a,
                    t.exports.Client = r
                }
                ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }
            , {
                3: 3
            }],
            5: [function(e, t, n) {
                (function(n) {
                    function r(e) {
                        switch (Object.prototype.toString.call(e)) {
                        case "[object Error]":
                        case "[object Exception]":
                        case "[object DOMException]":
                            return !0;
                        default:
                            return e instanceof Error
                        }
                    }
                    function i(e) {
                        return "[object DOMError]" === Object.prototype.toString.call(e)
                    }
                    function o(e) {
                        return void 0 === e
                    }
                    function a(e) {
                        return "[object Object]" === Object.prototype.toString.call(e)
                    }
                    function s(e) {
                        return "[object String]" === Object.prototype.toString.call(e)
                    }
                    function c(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    }
                    function l() {
                        if (!("fetch"in k))
                            return !1;
                        try {
                            return new Headers,
                            new Request(""),
                            new Response,
                            !0
                        } catch (e) {
                            return !1
                        }
                    }
                    function u(e, t) {
                        var n, r;
                        if (o(e.length))
                            for (n in e)
                                d(e, n) && t.call(null, n, e[n]);
                        else if (r = e.length)
                            for (n = 0; n < r; n++)
                                t.call(null, n, e[n])
                    }
                    function h(e, t) {
                        if ("number" != typeof t)
                            throw new Error("2nd argument to `truncate` function should be a number");
                        return "string" != typeof e || 0 === t || e.length <= t ? e : e.substr(0, t) + "â€¦"
                    }
                    function d(e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }
                    function f(e) {
                        for (var t, n = [], r = 0, i = e.length; r < i; r++)
                            s(t = e[r]) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
                        return new RegExp(n.join("|"),"i")
                    }
                    function p(e) {
                        var t, n, r, i, o, a = [];
                        if (!e || !e.tagName)
                            return "";
                        if (a.push(e.tagName.toLowerCase()),
                        e.id && a.push("#" + e.id),
                        (t = e.className) && s(t))
                            for (n = t.split(/\s+/),
                            o = 0; o < n.length; o++)
                                a.push("." + n[o]);
                        var c = ["type", "name", "title", "alt"];
                        for (o = 0; o < c.length; o++)
                            r = c[o],
                            (i = e.getAttribute(r)) && a.push("[" + r + '="' + i + '"]');
                        return a.join("")
                    }
                    function m(e, t) {
                        return !!(!!e ^ !!t)
                    }
                    function g(e, t) {
                        if (m(e, t))
                            return !1;
                        var n = e.frames
                          , r = t.frames;
                        if (void 0 === n || void 0 === r)
                            return !1;
                        if (n.length !== r.length)
                            return !1;
                        for (var i, o, a = 0; a < n.length; a++)
                            if (i = n[a],
                            o = r[a],
                            i.filename !== o.filename || i.lineno !== o.lineno || i.colno !== o.colno || i["function"] !== o["function"])
                                return !1;
                        return !0
                    }
                    function y(e) {
                        return function(e) {
                            return ~-encodeURI(e).split(/%..|./).length
                        }(JSON.stringify(e))
                    }
                    function v(e) {
                        if ("string" == typeof e) {
                            return h(e, 40)
                        }
                        if ("number" == typeof e || "boolean" == typeof e || void 0 === e)
                            return e;
                        var t = Object.prototype.toString.call(e);
                        return "[object Object]" === t ? "[Object]" : "[object Array]" === t ? "[Array]" : "[object Function]" === t ? e.name ? "[Function: " + e.name + "]" : "[Function]" : e
                    }
                    function w(e, t) {
                        return 0 === t ? v(e) : a(e) ? Object.keys(e).reduce((function(n, r) {
                            return n[r] = w(e[r], t - 1),
                            n
                        }
                        ), {}) : Array.isArray(e) ? e.map((function(e) {
                            return w(e, t - 1)
                        }
                        )) : v(e)
                    }
                    var b = e(7)
                      , k = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {}
                      , _ = 3
                      , x = 51200
                      , E = 40;
                    t.exports = {
                        isObject: function(e) {
                            return "object" == typeof e && null !== e
                        },
                        isError: r,
                        isErrorEvent: function(e) {
                            return "[object ErrorEvent]" === Object.prototype.toString.call(e)
                        },
                        isDOMError: i,
                        isDOMException: function(e) {
                            return "[object DOMException]" === Object.prototype.toString.call(e)
                        },
                        isUndefined: o,
                        isFunction: function(e) {
                            return "function" == typeof e
                        },
                        isPlainObject: a,
                        isString: s,
                        isArray: c,
                        isEmptyObject: function(e) {
                            if (!a(e))
                                return !1;
                            for (var t in e)
                                if (e.hasOwnProperty(t))
                                    return !1;
                            return !0
                        },
                        supportsErrorEvent: function() {
                            try {
                                return new ErrorEvent(""),
                                !0
                            } catch (e) {
                                return !1
                            }
                        },
                        supportsDOMError: function() {
                            try {
                                return new DOMError(""),
                                !0
                            } catch (e) {
                                return !1
                            }
                        },
                        supportsDOMException: function() {
                            try {
                                return new DOMException(""),
                                !0
                            } catch (e) {
                                return !1
                            }
                        },
                        supportsFetch: l,
                        supportsReferrerPolicy: function() {
                            if (!l())
                                return !1;
                            try {
                                return new Request("pickleRick",{
                                    referrerPolicy: "origin"
                                }),
                                !0
                            } catch (e) {
                                return !1
                            }
                        },
                        supportsPromiseRejectionEvent: function() {
                            return "function" == typeof PromiseRejectionEvent
                        },
                        wrappedCallback: function(e) {
                            return function(t, n) {
                                var r = e(t) || t;
                                return n && n(r) || r
                            }
                        },
                        each: u,
                        objectMerge: function(e, t) {
                            return t ? (u(t, (function(t, n) {
                                e[t] = n
                            }
                            )),
                            e) : e
                        },
                        truncate: h,
                        objectFrozen: function(e) {
                            return !!Object.isFrozen && Object.isFrozen(e)
                        },
                        hasKey: d,
                        joinRegExp: f,
                        urlencode: function(e) {
                            var t = [];
                            return u(e, (function(e, n) {
                                t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
                            }
                            )),
                            t.join("&")
                        },
                        uuid4: function() {
                            var e = k.crypto || k.msCrypto;
                            if (!o(e) && e.getRandomValues) {
                                var t = new Uint16Array(8);
                                e.getRandomValues(t),
                                t[3] = 4095 & t[3] | 16384,
                                t[4] = 16383 & t[4] | 32768;
                                var n = function(e) {
                                    for (var t = e.toString(16); t.length < 4; )
                                        t = "0" + t;
                                    return t
                                };
                                return n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7])
                            }
                            return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                                var t = 16 * Math.random() | 0;
                                return ("x" === e ? t : 3 & t | 8).toString(16)
                            }
                            ))
                        },
                        htmlTreeAsString: function(e) {
                            for (var t, n = [], r = 0, i = 0, o = " > ".length; e && r++ < 5 && !("html" === (t = p(e)) || r > 1 && i + n.length * o + t.length >= 80); )
                                n.push(t),
                                i += t.length,
                                e = e.parentNode;
                            return n.reverse().join(" > ")
                        },
                        htmlElementAsString: p,
                        isSameException: function(e, t) {
                            return !m(e, t) && (e = e.values[0],
                            t = t.values[0],
                            e.type === t.type && e.value === t.value && !function(e, t) {
                                return o(e) && o(t)
                            }(e.stacktrace, t.stacktrace) && g(e.stacktrace, t.stacktrace))
                        },
                        isSameStacktrace: g,
                        parseUrl: function(e) {
                            if ("string" != typeof e)
                                return {};
                            var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/)
                              , n = t[6] || ""
                              , r = t[8] || "";
                            return {
                                protocol: t[2],
                                host: t[4],
                                path: t[5],
                                relative: t[5] + n + r
                            }
                        },
                        fill: function(e, t, n, r) {
                            if (null != e) {
                                var i = e[t];
                                e[t] = n(i),
                                e[t].M = !0,
                                e[t].O = i,
                                r && r.push([e, t, i])
                            }
                        },
                        safeJoin: function(e, t) {
                            if (!c(e))
                                return "";
                            for (var n = [], i = 0; i < e.length; i++)
                                try {
                                    n.push(String(e[i]))
                                } catch (r) {
                                    n.push("[value cannot be serialized]")
                                }
                            return n.join(t)
                        },
                        serializeException: function S(e, t, n) {
                            if (!a(e))
                                return e;
                            n = "number" != typeof (t = "number" != typeof t ? _ : t) ? x : n;
                            var r = w(e, t);
                            return y(b(r)) > n ? S(e, t - 1) : r
                        },
                        serializeKeysForMessage: function(e, t) {
                            if ("number" == typeof e || "string" == typeof e)
                                return e.toString();
                            if (!Array.isArray(e))
                                return "";
                            if (0 === (e = e.filter((function(e) {
                                return "string" == typeof e
                            }
                            ))).length)
                                return "[object has no keys]";
                            if (t = "number" != typeof t ? E : t,
                            e[0].length >= t)
                                return e[0];
                            for (var n = e.length; n > 0; n--) {
                                var r = e.slice(0, n).join(", ");
                                if (!(r.length > t))
                                    return n === e.length ? r : r + "â€¦"
                            }
                            return ""
                        },
                        sanitize: function(e, t) {
                            if (!c(t) || c(t) && 0 === t.length)
                                return e;
                            var n, r = f(t), o = "********";
                            try {
                                n = JSON.parse(b(e))
                            } catch (i) {
                                return e
                            }
                            return function s(e) {
                                return c(e) ? e.map((function(e) {
                                    return s(e)
                                }
                                )) : a(e) ? Object.keys(e).reduce((function(t, n) {
                                    return t[n] = r.test(n) ? o : s(e[n]),
                                    t
                                }
                                ), {}) : e
                            }(n)
                        }
                    }
                }
                ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }
            , {
                7: 7
            }],
            6: [function(e, t, n) {
                (function(n) {
                    function r() {
                        return "undefined" == typeof document || null == document.location ? "" : document.location.href
                    }
                    var i = e(5)
                      , o = {
                        collectWindowErrors: !0,
                        debug: !1
                    }
                      , a = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {}
                      , s = [].slice
                      , c = "?"
                      , l = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
                    o.report = function() {
                        function e(t, n) {
                            var r = null;
                            if (!n || o.collectWindowErrors) {
                                for (var i in f)
                                    if (f.hasOwnProperty(i))
                                        try {
                                            f[i].apply(null, [t].concat(s.call(arguments, 2)))
                                        } catch (e) {
                                            r = e
                                        }
                                if (r)
                                    throw r
                            }
                        }
                        function t(t, a, s, u, d) {
                            var f = i.isErrorEvent(d) ? d.error : d
                              , p = i.isErrorEvent(t) ? t.message : t;
                            if (g)
                                o.computeStackTrace.augmentStackTraceWithInitialElement(g, a, s, p),
                                n();
                            else if (f && i.isError(f))
                                e(o.computeStackTrace(f), !0);
                            else {
                                var m, y = {
                                    url: a,
                                    line: s,
                                    column: u
                                }, v = void 0;
                                if ("[object String]" === {}.toString.call(p))
                                    (m = p.match(l)) && (v = m[1],
                                    p = m[2]);
                                y.func = c,
                                e({
                                    name: v,
                                    message: p,
                                    url: r(),
                                    stack: [y]
                                }, !0)
                            }
                            return !!h && h.apply(this, arguments)
                        }
                        function n() {
                            var t = g
                              , n = p;
                            p = null,
                            g = null,
                            m = null,
                            e.apply(null, [t, !1].concat(n))
                        }
                        function u(e, t) {
                            var r = s.call(arguments, 1);
                            if (g) {
                                if (m === e)
                                    return;
                                n()
                            }
                            var i = o.computeStackTrace(e);
                            if (g = i,
                            m = e,
                            p = r,
                            setTimeout((function() {
                                m === e && n()
                            }
                            ), i.incomplete ? 2e3 : 0),
                            !1 !== t)
                                throw e
                        }
                        var h, d, f = [], p = null, m = null, g = null;
                        return u.subscribe = function(e) {
                            d || (h = a.onerror,
                            a.onerror = t,
                            d = !0),
                            f.push(e)
                        }
                        ,
                        u.unsubscribe = function(e) {
                            for (var t = f.length - 1; t >= 0; --t)
                                f[t] === e && f.splice(t, 1)
                        }
                        ,
                        u.uninstall = function() {
                            d && (a.onerror = h,
                            d = !1,
                            h = void 0),
                            f = []
                        }
                        ,
                        u
                    }(),
                    o.computeStackTrace = function() {
                        function e(e) {
                            if ("undefined" != typeof e.stack && e.stack) {
                                for (var t, n, i, o = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, a = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, s = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, l = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, u = /\((\S*)(?::(\d+))(?::(\d+))\)/, h = e.stack.split("\n"), d = [], f = (/^(.*) is undefined$/.exec(e.message),
                                0), p = h.length; f < p; ++f) {
                                    if (n = o.exec(h[f])) {
                                        var m = n[2] && 0 === n[2].indexOf("native");
                                        n[2] && 0 === n[2].indexOf("eval") && (t = u.exec(n[2])) && (n[2] = t[1],
                                        n[3] = t[2],
                                        n[4] = t[3]),
                                        i = {
                                            url: m ? null : n[2],
                                            func: n[1] || c,
                                            args: m ? [n[2]] : [],
                                            line: n[3] ? +n[3] : null,
                                            column: n[4] ? +n[4] : null
                                        }
                                    } else if (n = a.exec(h[f]))
                                        i = {
                                            url: n[2],
                                            func: n[1] || c,
                                            args: [],
                                            line: +n[3],
                                            column: n[4] ? +n[4] : null
                                        };
                                    else {
                                        if (!(n = s.exec(h[f])))
                                            continue;
                                        n[3] && n[3].indexOf(" > eval") > -1 && (t = l.exec(n[3])) ? (n[3] = t[1],
                                        n[4] = t[2],
                                        n[5] = null) : 0 !== f || n[5] || "undefined" == typeof e.columnNumber || (d[0].column = e.columnNumber + 1),
                                        i = {
                                            url: n[3],
                                            func: n[1] || c,
                                            args: n[2] ? n[2].split(",") : [],
                                            line: n[4] ? +n[4] : null,
                                            column: n[5] ? +n[5] : null
                                        }
                                    }
                                    if (!i.func && i.line && (i.func = c),
                                    i.url && "blob:" === i.url.substr(0, 5)) {
                                        var g = new XMLHttpRequest;
                                        if (g.open("GET", i.url, !1),
                                        g.send(null),
                                        200 === g.status) {
                                            var y = g.responseText || ""
                                              , v = (y = y.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);
                                            if (v) {
                                                var w = v[1];
                                                "~" === w.charAt(0) && (w = ("undefined" == typeof document || null == document.location ? "" : document.location.origin ? document.location.origin : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "")) + w.slice(1)),
                                                i.url = w.slice(0, -4)
                                            }
                                        }
                                    }
                                    d.push(i)
                                }
                                return d.length ? {
                                    name: e.name,
                                    message: e.message,
                                    url: r(),
                                    stack: d
                                } : null
                            }
                        }
                        function t(e, t, n, r) {
                            var i = {
                                url: t,
                                line: n
                            };
                            if (i.url && i.line) {
                                if (e.incomplete = !1,
                                i.func || (i.func = c),
                                e.stack.length > 0 && e.stack[0].url === i.url) {
                                    if (e.stack[0].line === i.line)
                                        return !1;
                                    if (!e.stack[0].line && e.stack[0].func === i.func)
                                        return e.stack[0].line = i.line,
                                        !1
                                }
                                return e.stack.unshift(i),
                                e.partial = !0,
                                !0
                            }
                            return e.incomplete = !0,
                            !1
                        }
                        function n(e, a) {
                            for (var s, l, u = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, h = [], d = {}, f = !1, p = n.caller; p && !f; p = p.caller)
                                if (p !== i && p !== o.report) {
                                    if (l = {
                                        url: null,
                                        func: c,
                                        line: null,
                                        column: null
                                    },
                                    p.name ? l.func = p.name : (s = u.exec(p.toString())) && (l.func = s[1]),
                                    "undefined" == typeof l.func)
                                        try {
                                            l.func = s.input.substring(0, s.input.indexOf("{"))
                                        } catch (g) {}
                                    d["" + p] ? f = !0 : d["" + p] = !0,
                                    h.push(l)
                                }
                            a && h.splice(0, a);
                            var m = {
                                name: e.name,
                                message: e.message,
                                url: r(),
                                stack: h
                            };
                            return t(m, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description),
                            m
                        }
                        function i(t, i) {
                            var s = null;
                            i = null == i ? 0 : +i;
                            try {
                                if (s = e(t))
                                    return s
                            } catch (a) {
                                if (o.debug)
                                    throw a
                            }
                            try {
                                if (s = n(t, i + 1))
                                    return s
                            } catch (a) {
                                if (o.debug)
                                    throw a
                            }
                            return {
                                name: t.name,
                                message: t.message,
                                url: r()
                            }
                        }
                        return i.augmentStackTraceWithInitialElement = t,
                        i.computeStackTraceFromStackProp = e,
                        i
                    }(),
                    t.exports = o
                }
                ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }
            , {
                5: 5
            }],
            7: [function(e, t, n) {
                function r(e, t) {
                    for (var n = 0; n < e.length; ++n)
                        if (e[n] === t)
                            return n;
                    return -1
                }
                function i(e, t) {
                    var n = []
                      , i = [];
                    return null == t && (t = function(e, t) {
                        return n[0] === t ? "[Circular ~]" : "[Circular ~." + i.slice(0, r(n, t)).join(".") + "]"
                    }
                    ),
                    function(o, a) {
                        if (n.length > 0) {
                            var s = r(n, this);
                            ~s ? n.splice(s + 1) : n.push(this),
                            ~s ? i.splice(s, 1 / 0, o) : i.push(o),
                            ~r(n, a) && (a = t.call(this, o, a))
                        } else
                            n.push(a);
                        return null == e ? a instanceof Error ? function(e) {
                            var t = {
                                stack: e.stack,
                                message: e.message,
                                name: e.name
                            };
                            for (var n in e)
                                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                            return t
                        }(a) : a : e.call(this, o, a)
                    }
                }
                n = t.exports = function(e, t, n, r) {
                    return JSON.stringify(e, i(t, r), n)
                }
                ,
                n.getSerialize = i
            }
            , {}],
            8: [function(e, t, n) {
                function r(e, t) {
                    var n = (65535 & e) + (65535 & t);
                    return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
                }
                function i(e, t, n, i, o, a) {
                    return r(function(e, t) {
                        return e << t | e >>> 32 - t
                    }(r(r(t, e), r(i, a)), o), n)
                }
                function o(e, t, n, r, o, a, s) {
                    return i(t & n | ~t & r, e, t, o, a, s)
                }
                function a(e, t, n, r, o, a, s) {
                    return i(t & r | n & ~r, e, t, o, a, s)
                }
                function s(e, t, n, r, o, a, s) {
                    return i(t ^ n ^ r, e, t, o, a, s)
                }
                function c(e, t, n, r, o, a, s) {
                    return i(n ^ (t | ~r), e, t, o, a, s)
                }
                function l(e, t) {
                    e[t >> 5] |= 128 << t % 32,
                    e[14 + (t + 64 >>> 9 << 4)] = t;
                    var n, i, l, u, h, d = 1732584193, f = -271733879, p = -1732584194, m = 271733878;
                    for (n = 0; n < e.length; n += 16)
                        i = d,
                        l = f,
                        u = p,
                        h = m,
                        d = o(d, f, p, m, e[n], 7, -680876936),
                        m = o(m, d, f, p, e[n + 1], 12, -389564586),
                        p = o(p, m, d, f, e[n + 2], 17, 606105819),
                        f = o(f, p, m, d, e[n + 3], 22, -1044525330),
                        d = o(d, f, p, m, e[n + 4], 7, -176418897),
                        m = o(m, d, f, p, e[n + 5], 12, 1200080426),
                        p = o(p, m, d, f, e[n + 6], 17, -1473231341),
                        f = o(f, p, m, d, e[n + 7], 22, -45705983),
                        d = o(d, f, p, m, e[n + 8], 7, 1770035416),
                        m = o(m, d, f, p, e[n + 9], 12, -1958414417),
                        p = o(p, m, d, f, e[n + 10], 17, -42063),
                        f = o(f, p, m, d, e[n + 11], 22, -1990404162),
                        d = o(d, f, p, m, e[n + 12], 7, 1804603682),
                        m = o(m, d, f, p, e[n + 13], 12, -40341101),
                        p = o(p, m, d, f, e[n + 14], 17, -1502002290),
                        d = a(d, f = o(f, p, m, d, e[n + 15], 22, 1236535329), p, m, e[n + 1], 5, -165796510),
                        m = a(m, d, f, p, e[n + 6], 9, -1069501632),
                        p = a(p, m, d, f, e[n + 11], 14, 643717713),
                        f = a(f, p, m, d, e[n], 20, -373897302),
                        d = a(d, f, p, m, e[n + 5], 5, -701558691),
                        m = a(m, d, f, p, e[n + 10], 9, 38016083),
                        p = a(p, m, d, f, e[n + 15], 14, -660478335),
                        f = a(f, p, m, d, e[n + 4], 20, -405537848),
                        d = a(d, f, p, m, e[n + 9], 5, 568446438),
                        m = a(m, d, f, p, e[n + 14], 9, -1019803690),
                        p = a(p, m, d, f, e[n + 3], 14, -187363961),
                        f = a(f, p, m, d, e[n + 8], 20, 1163531501),
                        d = a(d, f, p, m, e[n + 13], 5, -1444681467),
                        m = a(m, d, f, p, e[n + 2], 9, -51403784),
                        p = a(p, m, d, f, e[n + 7], 14, 1735328473),
                        d = s(d, f = a(f, p, m, d, e[n + 12], 20, -1926607734), p, m, e[n + 5], 4, -378558),
                        m = s(m, d, f, p, e[n + 8], 11, -2022574463),
                        p = s(p, m, d, f, e[n + 11], 16, 1839030562),
                        f = s(f, p, m, d, e[n + 14], 23, -35309556),
                        d = s(d, f, p, m, e[n + 1], 4, -1530992060),
                        m = s(m, d, f, p, e[n + 4], 11, 1272893353),
                        p = s(p, m, d, f, e[n + 7], 16, -155497632),
                        f = s(f, p, m, d, e[n + 10], 23, -1094730640),
                        d = s(d, f, p, m, e[n + 13], 4, 681279174),
                        m = s(m, d, f, p, e[n], 11, -358537222),
                        p = s(p, m, d, f, e[n + 3], 16, -722521979),
                        f = s(f, p, m, d, e[n + 6], 23, 76029189),
                        d = s(d, f, p, m, e[n + 9], 4, -640364487),
                        m = s(m, d, f, p, e[n + 12], 11, -421815835),
                        p = s(p, m, d, f, e[n + 15], 16, 530742520),
                        d = c(d, f = s(f, p, m, d, e[n + 2], 23, -995338651), p, m, e[n], 6, -198630844),
                        m = c(m, d, f, p, e[n + 7], 10, 1126891415),
                        p = c(p, m, d, f, e[n + 14], 15, -1416354905),
                        f = c(f, p, m, d, e[n + 5], 21, -57434055),
                        d = c(d, f, p, m, e[n + 12], 6, 1700485571),
                        m = c(m, d, f, p, e[n + 3], 10, -1894986606),
                        p = c(p, m, d, f, e[n + 10], 15, -1051523),
                        f = c(f, p, m, d, e[n + 1], 21, -2054922799),
                        d = c(d, f, p, m, e[n + 8], 6, 1873313359),
                        m = c(m, d, f, p, e[n + 15], 10, -30611744),
                        p = c(p, m, d, f, e[n + 6], 15, -1560198380),
                        f = c(f, p, m, d, e[n + 13], 21, 1309151649),
                        d = c(d, f, p, m, e[n + 4], 6, -145523070),
                        m = c(m, d, f, p, e[n + 11], 10, -1120210379),
                        p = c(p, m, d, f, e[n + 2], 15, 718787259),
                        f = c(f, p, m, d, e[n + 9], 21, -343485551),
                        d = r(d, i),
                        f = r(f, l),
                        p = r(p, u),
                        m = r(m, h);
                    return [d, f, p, m]
                }
                function u(e) {
                    var t, n = "", r = 32 * e.length;
                    for (t = 0; t < r; t += 8)
                        n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
                    return n
                }
                function h(e) {
                    var t, n = [];
                    for (n[(e.length >> 2) - 1] = void 0,
                    t = 0; t < n.length; t += 1)
                        n[t] = 0;
                    var r = 8 * e.length;
                    for (t = 0; t < r; t += 8)
                        n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
                    return n
                }
                function d(e) {
                    var t, n, r = "0123456789abcdef", i = "";
                    for (n = 0; n < e.length; n += 1)
                        t = e.charCodeAt(n),
                        i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
                    return i
                }
                function f(e) {
                    return unescape(encodeURIComponent(e))
                }
                function p(e) {
                    return function(e) {
                        return u(l(h(e), 8 * e.length))
                    }(f(e))
                }
                function m(e, t) {
                    return function(e, t) {
                        var n, r, i = h(e), o = [], a = [];
                        for (o[15] = a[15] = void 0,
                        i.length > 16 && (i = l(i, 8 * e.length)),
                        n = 0; n < 16; n += 1)
                            o[n] = 909522486 ^ i[n],
                            a[n] = 1549556828 ^ i[n];
                        return r = l(o.concat(h(t)), 512 + 8 * t.length),
                        u(l(a.concat(r), 640))
                    }(f(e), f(t))
                }
                t.exports = function(e, t, n) {
                    return t ? n ? m(t, e) : function(e, t) {
                        return d(m(e, t))
                    }(t, e) : n ? p(e) : function(e) {
                        return d(p(e))
                    }(e)
                }
            }
            , {}]
        }, {}, [4])(4)
    }
    ));
    var H = [{
        family: "UC Browser",
        patterns: ["(UC? ?Browser|UCWEB|U3)[ /]?(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        family: "Opera",
        name_replace: "Opera Mobile",
        patterns: ["(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)", "(Opera)/(\\d+)\\.(\\d+).+Opera Mobi", "Opera Mobi.+(Opera)(?:/|\\s+)(\\d+)\\.(\\d+)", "Opera Mobi", "(?:Mobile Safari).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        family: "Opera",
        name_replace: "Opera Mini",
        patterns: ["(Opera Mini)(?:/att|)/?(\\d+|)(?:\\.(\\d+)|)(?:\\.(\\d+)|)", "(OPiOS)/(\\d+).(\\d+).(\\d+)"]
    }, {
        family: "Opera",
        name_replace: "Opera Neon",
        patterns: ["Chrome/.+( MMS)/(\\d+).(\\d+).(\\d+)"]
    }, {
        name_replace: "Opera",
        patterns: ["(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(?:Chrome).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        family: "Firefox",
        name_replace: "Firefox Mobile",
        patterns: ["(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)", "(Fennec)/(\\d+)\\.(\\d+)(pre)", "(Fennec)/(\\d+)\\.(\\d+)", "(?:Mobile|Tablet);.*(Firefox)/(\\d+)\\.(\\d+)", "(FxiOS)/(\\d+)\\.(\\d+)(\\.(\\d+)|)(\\.(\\d+)|)"]
    }, {
        name_replace: "Coc Coc",
        patterns: ["(coc_coc_browser)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
    }, {
        family: "QQ",
        name_replace: "QQ Mini",
        patterns: ["(MQQBrowser/Mini)(?:(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
    }, {
        family: "QQ",
        name_replace: "QQ Mobile",
        patterns: ["(MQQBrowser)(?:/(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
    }, {
        name_replace: "QQ",
        patterns: ["(QQBrowser)(?:/(\\d+)(?:\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)|)"]
    }, {
        family: "Edge",
        name: "Edge Mobile",
        patterns: ["Windows Phone .*(Edge)/(\\d+)\\.(\\d+)", "(EdgiOS|EdgA)/(\\d+)\\.(\\d+).(\\d+).(\\d+)"]
    }, {
        name_replace: "Edge",
        patterns: ["(Edge|Edg)/(\\d+)(?:\\.(\\d+)|)"]
    }, {
        patterns: ["(Puffin)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
    }, {
        family: "Chrome",
        name_replace: "Chrome Mobile",
        patterns: ["Version/.+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "; wv\\).+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile(?:[ /]|$)", " Mobile .*(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        family: "Yandex",
        name_replace: "Yandex Mobile",
        patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+).*Mobile"]
    }, {
        name_replace: "Yandex",
        patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        patterns: ["(Vivaldi)/(\\d+)\\.(\\d+)", "(Vivaldi)/(\\d+)\\.(\\d+)\\.(\\d+)"]
    }, {
        name_replace: "Brave",
        patterns: ["(brave)/(\\d+)\\.(\\d+)\\.(\\d+) Chrome"]
    }, {
        family: "Chrome",
        patterns: ["(Chromium|Chrome)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
    }, {
        name_replace: "Internet Explorer Mobile",
        patterns: ["(IEMobile)[ /](\\d+)\\.(\\d+)"]
    }, {
        family: "Safari",
        name_replace: "Safari Mobile",
        patterns: ["(iPod|iPhone|iPad).+Version/(d+).(d+)(?:.(d+)|).*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).* AppleNews\\/\\d+\\.\\d+\\.\\d+?", "(iPod|iPhone|iPad).+Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile.*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile", "(iPod|iPod touch|iPhone|iPad).* Safari", "(iPod|iPod touch|iPhone|iPad)"]
    }, {
        name_replace: "Safari",
        patterns: ["(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|).*Safari/"]
    }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(7|8).(0)"],
        major_replace: "11"
    }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(6)\\.(0)"],
        major_replace: "10"
    }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(5)\\.(0)"],
        major_replace: "9"
    }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(4)\\.(0)"],
        major_replace: "8"
    }, {
        family: "Firefox",
        patterns: ["(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)", "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*|)"]
    }]
      , W = [{
        family: "Windows",
        name_replace: "Windows Phone",
        patterns: ["(Windows Phone) (?:OS[ /])?(\\d+)\\.(\\d+)", "^UCWEB.*; (wds) (\\d+)\\.(d+)(?:\\.(\\d+)|);", "^UCWEB.*; (wds) (\\d+)\\.(\\d+)(?:\\.(\\d+)|);"]
    }, {
        family: "Windows",
        name_replace: "Windows Mobile",
        patterns: ["(Windows ?Mobile)"]
    }, {
        name_replace: "Android",
        patterns: ["(Android)[ \\-/](\\d+)(?:\\.(\\d+)|)(?:[.\\-]([a-z0-9]+)|)", "(Android) (d+);", "^UCWEB.*; (Adr) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+)|);", "^(JUC).*; ?U; ?(?:Android|)(\\d+)\\.(\\d+)(?:[\\.\\-]([a-z0-9]+)|)", "(android)\\s(?:mobile\\/)(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)|)|)", "(Silk-Accelerated=[a-z]{4,5})", "Puffin/[\\d\\.]+AT", "Puffin/[\\d\\.]+AP"]
    }, {
        name_replace: "Chrome OS",
        patterns: ["(x86_64|aarch64)\\ (\\d+)\\.(\\d+)\\.(\\d+).*Chrome.*(?:CitrixChromeApp)$", "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
    }, {
        name_replace: "Windows",
        patterns: ["(Windows 10)", "(Windows NT 6\\.4)", "(Windows NT 10\\.0)"],
        major_replace: "10"
    }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.3; ARM;)", "(Windows NT 6.3)"],
        major_replace: "8",
        minor_replace: "1"
    }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.2)"],
        major_replace: "8"
    }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.1)"],
        major_replace: "7"
    }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.0)"],
        major_replace: "Vista"
    }, {
        name_replace: "Windows",
        patterns: ["(Windows (?:NT 5\\.2|NT 5\\.1))"],
        major_replace: "XP"
    }, {
        name_replace: "Mac OS X",
        patterns: ["((?:Mac[ +]?|; )OS[ +]X)[\\s+/](?:(\\d+)[_.](\\d+)(?:[_.](\\d+)|)|Mach-O)", "\\w+\\s+Mac OS X\\s+\\w+\\s+(\\d+).(\\d+).(\\d+).*", "(?:PPC|Intel) (Mac OS X)"]
    }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(10).(d+).*((?:i386|x86_64))"],
        major_replace: "10",
        minor_replace: "6"
    }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(11).(\\d+).*\\((?:i386|x86_64)\\)"],
        major_replace: "10",
        minor_replace: "7"
    }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(12).(\\d+).*\\((?:i386|x86_64)\\)"],
        major_replace: "10",
        minor_replace: "8"
    }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(13).(\\d+).*\\((?:i386|x86_64)\\)"],
        major_replace: "10",
        minor_replace: "9"
    }, {
        name_replace: "iOS",
        patterns: ["^UCWEB.*; (iPad|iPh|iPd) OS (\\d+)_(\\d+)(?:_(\\d+)|);", "(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(\\d+)[_\\.](\\d+)(?:[_\\.](\\d+)|)", "(iPhone|iPad|iPod); Opera", "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)", "\\b(iOS[ /]|iOS; |iPhone(?:/| v|[ _]OS[/,]|; | OS : |\\d,\\d/|\\d,\\d; )|iPad/)(\\d{1,2})[_\\.](\\d{1,2})(?:[_\\.](\\d+)|)", "\\((iOS);", "(iPod|iPhone|iPad)", "Puffin/[\\d\\.]+IT", "Puffin/[\\d\\.]+IP"]
    }, {
        family: "Chrome",
        name_replace: "Chromecast",
        patterns: ["(CrKey -)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey[ +]armv7l)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey)(?:[/](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)"]
    }, {
        name_replace: "Debian",
        patterns: ["([Dd]ebian)"]
    }, {
        family: "Linux",
        name_replace: "Linux",
        patterns: ["(Linux Mint)(?:/(\\d+)|)"]
    }, {
        family: "Linux",
        patterns: ["(Ubuntu|Kubuntu|Arch Linux|CentOS|Slackware|Gentoo|openSUSE|SUSE|Red Hat|Fedora|PCLinuxOS|Mageia|(?:Free|Open|Net|\\b)BSD)", "(Mandriva)(?: Linux|)/(?:[\\d.-]+m[a-z]{2}(\\d+).(\\d)|)", "(Linux)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "\\(linux-gnu\\)"]
    }, {
        family: "BlackBerry",
        name_replace: "BlackBerry OS",
        patterns: ["(BB10);.+Version/(\\d+)\\.(\\d+)\\.(\\d+)", "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry)"]
    }, {
        patterns: ["(Fedora|Red Hat|PCLinuxOS|Puppy|Ubuntu|Kindle|Bada|Sailfish|Lubuntu|BackTrack|Slackware|(?:Free|Open|Net|\\b)BSD)[/ ](\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
    }]
      , K = navigator.userAgent
      , q = function() {
        return K
    }
      , J = function(e) {
        return Y(e || K, H)
    }
      , X = function(e) {
        return Y(e || K, W)
    };
    function G(e, t) {
        try {
            var n = new RegExp(t).exec(e);
            return n ? {
                name: n[1] || "Other",
                major: n[2] || "0",
                minor: n[3] || "0",
                patch: n[4] || "0"
            } : null
        } catch (Pn) {
            return null
        }
    }
    function Y(e, t) {
        for (var n = null, r = null, i = -1, o = !1; ++i < t.length && !o; ) {
            n = t[i];
            for (var a = -1; ++a < n.patterns.length && !o; )
                o = null !== (r = G(e, n.patterns[a]))
        }
        return o ? (r.family = n.family || n.name_replace || r.name,
        n.name_replace && (r.name = n.name_replace),
        n.major_replace && (r.major = n.major_replace),
        n.minor_replace && (r.minor = n.minor_replace),
        n.patch_replace && (r.minor = n.patch_replace),
        r) : {
            family: "Other",
            name: "Other",
            major: "0",
            minor: "0",
            patch: "0"
        }
    }
    function V() {
        var e = this
          , t = J()
          , n = q();
        this.agent = n.toLowerCase(),
        this.language = window.navigator.userLanguage || window.navigator.language,
        this.isCSS1 = "CSS1Compat" === (document.compatMode || ""),
        this.width = function() {
            return window.innerWidth && window.document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth
        }
        ,
        this.height = function() {
            return window.innerHeight || window.document.documentElement.clientHeight || document.body.clientHeight
        }
        ,
        this.scrollX = function() {
            return window.pageXOffset !== undefined ? window.pageXOffset : e.isCSS1 ? document.documentElement.scrollLeft : document.body.scrollLeft
        }
        ,
        this.scrollY = function() {
            return window.pageYOffset !== undefined ? window.pageYOffset : e.isCSS1 ? document.documentElement.scrollTop : document.body.scrollTop
        }
        ,
        this.type = "Edge" === t.family ? "edge" : "Internet Explorer" === t.family ? "ie" : "Chrome" === t.family ? "chrome" : "Safari" === t.family ? "safari" : "Firefox" === t.family ? "firefox" : t.family.toLowerCase(),
        this.version = 1 * (t.major + "." + t.minor) || 0,
        this.hasPostMessage = !!window.postMessage
    }
    V.prototype.hasEvent = function(e, t) {
        return "on" + e in (t || document.createElement("div"))
    }
    ,
    V.prototype.getScreenDimensions = function() {
        var e = {};
        for (var t in window.screen)
            e[t] = window.screen[t];
        return delete e.orientation,
        e
    }
    ,
    V.prototype.getWindowDimensions = function() {
        return [this.width(), this.height()]
    }
    ,
    V.prototype.interrogateNavigator = function() {
        var e = {};
        for (var t in window.navigator)
            if ("webkitPersistentStorage" !== t)
                try {
                    e[t] = window.navigator[t]
                } catch (Bn) {}
        if (delete e.plugins,
        delete e.mimeTypes,
        e.plugins = [],
        window.navigator.plugins)
            for (var n = 0; n < window.navigator.plugins.length; n++)
                e.plugins[n] = window.navigator.plugins[n].filename;
        return e
    }
    ,
    V.prototype.supportsPST = function() {
        return document.hasPrivateToken !== undefined
    }
    ,
    V.prototype.supportsCanvas = function() {
        var e = document.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"))
    }
    ,
    V.prototype.supportsWebAssembly = function() {
        try {
            if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
                var e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
                if (e instanceof WebAssembly.Module)
                    return new WebAssembly.Instance(e)instanceof WebAssembly.Instance
            }
        } catch (Pn) {
            return !1
        }
    }
    ;
    var Q = new V
      , Z = new function() {
        var e, t, n = X(), r = q();
        this.mobile = (e = !!("ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0),
        t = !1,
        n && (t = ["iOS", "Windows Phone", "Windows Mobile", "Android", "BlackBerry OS"].indexOf(n.name) >= 0),
        e && t),
        this.dpr = function() {
            return window.devicePixelRatio || 1
        }
        ,
        this.mobile && n && "Windows" === n.family && r.indexOf("touch") < 0 && (this.mobile = !1),
        this.os = "iOS" === n.family ? "ios" : "Android" === n.family ? "android" : "Mac OS X" === n.family ? "mac" : "Windows" === n.family ? "windows" : "Linux" === n.family ? "linux" : n.family.toLowerCase(),
        this.version = function() {
            if (!n)
                return "unknown";
            var e = n.major;
            return n.minor && (e += "." + n.minor),
            n.patch && (e += "." + n.patch),
            e
        }()
    }
      , ee = {
        Browser: Q,
        System: Z,
        supportsPAT: function() {
            return ("mac" === Z.os || "ios" === Z.os) && "safari" === Q.type && Q.version >= 16.2
        }
    }
      , te = "challenge-passed"
      , ne = "challenge-escaped"
      , re = "challenge-closed"
      , ie = "challenge-expired"
      , oe = "invalid-data"
      , ae = "bundle-error"
      , se = "network-error"
      , ce = "rate-limited"
      , le = "challenge-error"
      , ue = "incomplete-answer"
      , he = "missing-captcha"
      , de = "missing-sitekey"
      , fe = "invalid-captcha-id"
      , pe = "https://api.hcaptcha.com"
      , me = "https://api2.hcaptcha.com"
      , ge = "auto"
      , ye = {
        host: null,
        file: null,
        sitekey: null,
        a11y_tfe: null,
        pingdom: "safari" === ee.Browser.type && "windows" !== ee.System.os && "mac" !== ee.System.os && "ios" !== ee.System.os && "android" !== ee.System.os,
        assetDomain: "https://newassets.hcaptcha.com",
        assetUrl: "http://localhost:8000/",
        width: null,
        height: null,   
        mobile: null,
        orientation: "portrait",
        challenge_type: null
    }
      , ve = {
        se: null,
        custom: !1,
        tplinks: "on",
        language: null,
        reportapi: "https://accounts.hcaptcha.com",
        endpoint: pe,
        pstIssuer: "https://pst-issuer.hcaptcha.com",
        size: "normal",
        theme: "light",
        mode: undefined,
        assethost: null,
        imghost: null,
        recaptchacompat: "true",
        pat: "on",
        confirmNav: !1
    }
      , we = "https://30910f52569b4c17b1081ead2dae43b4@sentry.hcaptcha.com/6"
      , be = "8524269"
      , ke = "prod";
    function _e(e, t) {
        e.style.width = "304px",
        e.style.height = "78px",
        e.style.backgroundColor = "#f9e5e5",
        e.style.position = "relative",
        e.innerHTML = "";
        var n = document.createElement("div");
        n.style.width = "284px",
        n.style.position = "absolute",
        n.style.top = "12px",
        n.style.left = "10px",
        n.style.color = "#7c0a06",
        n.style.fontSize = "14px",
        n.style.fontWeight = "normal",
        n.style.lineHeight = "18px",
        n.innerHTML = t || "Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> to complete this captcha.",
        e.appendChild(n)
    }
    function xe(e) {
        for (var t = document.getElementsByClassName("h-captcha"), n = [], r = 0; r < t.length; r++)
            n.push(t[r]);
        var i = [];
        if ("off" !== ve.recaptchacompat)
            for (var o = document.getElementsByClassName("g-recaptcha"), a = 0; a < o.length; a++)
                i.push(o[a]);
        for (var s = [].concat(n, i), c = 0; c < s.length; c++)
            e(s[c])
    }
    var Ee = "The captcha failed to load."
      , Se = [];
    function Ce(e) {
        for (var t = [], n = /(https?|wasm):\/\//, r = /^at /, i = /:\d+:\d+/g, o = 0, a = e.length; o < a; o++) {
            var s = e[o];
            if (!n.test(s)) {
                var c = s.trim().replace(r, "").replace(i, "");
                t.push(c)
            }
        }
        return t.join("\n").trim()
    }
    function Oe(e) {
        if (e && "string" == typeof e && -1 === Se.indexOf(e) && !(Se.length >= 10)) {
            var t = Ce(e.trim().split("\n").slice(0, 2));
            Se.push(t)
        }
    }
    function Ae(e) {
        e && "object" == typeof e || (e = {
            name: "error",
            message: "",
            stack: ""
        });
        var t = {
            message: e.name + ": " + e.message
        };
        e.stack && (t.stack_trace = {
            trace: e.stack
        }),
        Pe("report error", "internal", "debug", t),
        je(e.message || "internal error", "error", ye.file, e)
    }
    function Te(e) {
        return function() {
            try {
                return e.apply(this, arguments)
            } catch (Bn) {
                throw Ae(Bn),
                xe((function(e) {
                    _e(e, Ee)
                }
                )),
                Bn
            }
        }
    }
    function je(e, t, n, r) {
        if (t = t || "error",
        ve.sentry) {
            var i = "warn" === t ? "warning" : t;
            window.Raven && Raven.captureMessage(e, {
                level: i,
                logger: n,
                extra: r
            })
        }
    }
    function Be(e, t, n) {
        return (n = n || {}).error = t,
        je(t && t.message || "Missing error message", "error", e, n)
    }
    function Pe(e, t, n, r) {
        ve.sentry && window.Raven && Raven.captureBreadcrumb({
            message: e,
            category: t,
            level: n,
            data: r
        })
    }
    var Re = {
        getCookie: function(e) {
            var t = document.cookie.replace(/ /g, "").split(";");
            try {
                for (var n = "", r = t.length; r-- && !n; )
                    t[r].indexOf(e) >= 0 && (n = t[r]);
                return n
            } catch (Pn) {
                return ""
            }
        },
        hasCookie: function(e) {
            return !!Re.getCookie(e)
        },
        supportsAPI: function() {
            try {
                return "hasStorageAccess"in document && "requestStorageAccess"in document
            } catch (Pn) {
                return !1
            }
        },
        hasAccess: function() {
            return new Promise((function(e) {
                document.hasStorageAccess().then((function() {
                    e(!0)
                }
                ))["catch"]((function() {
                    e(!1)
                }
                ))
            }
            ))
        },
        requestAccess: function() {
            try {
                return document.requestStorageAccess()
            } catch (Pn) {
                return Promise.resolve()
            }
        }
    };
    function Ie(e) {
        this.r = 255,
        this.g = 255,
        this.b = 255,
        this.a = 1,
        this.h = 1,
        this.s = 1,
        this.l = 1,
        this.parseString(e)
    }
    function Me(e, t, n) {
        return n < 0 && (n += 1),
        n > 1 && (n -= 1),
        n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
    }
    Ie.hasAlpha = function(e) {
        return "string" == typeof e && (-1 !== e.indexOf("rgba") || 9 === e.length && "#" === e[0])
    }
    ,
    Ie.prototype.parseString = function(e) {
        e && (0 === e.indexOf("#") ? this.fromHex(e) : 0 === e.indexOf("rgb") && this.fromRGBA(e))
    }
    ,
    Ie.prototype.fromHex = function(e) {
        var t = 1;
        9 === e.length && (t = parseInt(e.substr(7, 2), 16) / 255);
        var n = (e = e.substr(1, 6)).replace(/^([a-f\d])([a-f\d])([a-f\d])?$/i, (function(e, t, n, r) {
            return t + t + n + n + r + r
        }
        ))
          , r = parseInt(n, 16)
          , i = r >> 16
          , o = r >> 8 & 255
          , a = 255 & r;
        this.setRGBA(i, o, a, t)
    }
    ,
    Ie.prototype.fromRGBA = function(e) {
        var t = e.indexOf("rgba")
          , n = e.substr(t).replace(/rgba?\(/, "").replace(/\)/, "").replace(/[\s+]/g, "").split(",")
          , r = Math.floor(parseInt(n[0]))
          , i = Math.floor(parseInt(n[1]))
          , o = Math.floor(parseInt(n[2]))
          , a = parseFloat(n[3]);
        this.setRGBA(r, i, o, a)
    }
    ,
    Ie.prototype.setRGB = function(e, t, n) {
        this.setRGBA(e, t, n, 1)
    }
    ,
    Ie.prototype.setRGBA = function(e, t, n, r) {
        this.r = e,
        this.g = t,
        this.b = n,
        this.a = isNaN(r) ? this.a : r,
        this.updateHSL()
    }
    ,
    Ie.prototype.hsl2rgb = function(e, t, n) {
        if (0 === t) {
            var r = Math.round(255 * n);
            return this.setRGB(r, r, r),
            this
        }
        var i = n <= .5 ? n * (1 + t) : n + t - n * t
          , o = 2 * n - i;
        return this.r = Math.round(255 * Me(o, i, e + 1 / 3)),
        this.g = Math.round(255 * Me(o, i, e)),
        this.b = Math.round(255 * Me(o, i, e - 1 / 3)),
        this.h = e,
        this.s = t,
        this.l = n,
        this
    }
    ,
    Ie.prototype.updateHSL = function() {
        var e, t = this.r / 255, n = this.g / 255, r = this.b / 255, i = Math.max(t, n, r), o = Math.min(t, n, r), a = null, s = (i + o) / 2;
        if (i === o)
            a = e = 0;
        else {
            var c = i - o;
            switch (e = s > .5 ? c / (2 - i - o) : c / (i + o),
            i) {
            case t:
                a = (n - r) / c + (n < r ? 6 : 0);
                break;
            case n:
                a = (r - t) / c + 2;
                break;
            case r:
                a = (t - n) / c + 4
            }
            a /= 6
        }
        return this.h = a,
        this.s = e,
        this.l = s,
        this
    }
    ,
    Ie.prototype.getHex = function() {
        return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)
    }
    ,
    Ie.prototype.getRGBA = function() {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
    }
    ,
    Ie.prototype.clone = function() {
        var e = new Ie;
        return e.setRGBA(this.r, this.g, this.b, this.a),
        e
    }
    ,
    Ie.prototype.mix = function(e, t) {
        e instanceof Ie || (e = new Ie(e));
        var n = new Ie
          , r = Math.round(this.r + t * (e.r - this.r))
          , i = Math.round(this.g + t * (e.g - this.g))
          , o = Math.round(this.b + t * (e.b - this.b));
        return n.setRGB(r, i, o),
        n
    }
    ,
    Ie.prototype.blend = function(e, t) {
        var n;
        e instanceof Ie || (e = new Ie(e));
        for (var r = [], i = 0; i < t; i++)
            n = this.mix.call(this, e, i / t),
            r.push(n);
        return r
    }
    ,
    Ie.prototype.lightness = function(e) {
        return e > 1 && (e /= 100),
        this.hsl2rgb(this.h, this.s, e),
        this
    }
    ,
    Ie.prototype.saturation = function(e) {
        return e > 1 && (e /= 100),
        this.hsl2rgb(this.h, e, this.l),
        this
    }
    ,
    Ie.prototype.hue = function(e) {
        return this.hsl2rgb(e / 360, this.s, this.l),
        this
    }
    ;
    var Le = function(e) {
        var t = [];
        for (var n in e) {
            var r = e[n];
            r = "object" == typeof r ? JSON.stringify(r) : r,
            t.push([encodeURIComponent(n), encodeURIComponent(r)].join("="))
        }
        return t.join("&")
    };
    function $e(e) {
        var t = [].slice.call(arguments, 1);
        "string" == typeof e ? window[e] ? "function" == typeof window[e] ? window[e].apply(null, t) : console.log("[hCaptcha] Callback '" + e + "' is not a function.") : console.log("[hCaptcha] Callback '" + e + "' is not defined.") : "function" == typeof e ? e.apply(null, t) : console.log("[hcaptcha] Invalid callback '" + e + "'.")
    }
    function De() {
        try {
            $e.apply(null, arguments)
        } catch (Bn) {
            console.error("[hCaptcha] There was an error in your callback."),
            console.error(Bn)
        }
    }
    var Ue, Ne = {
        UUID: function(e) {
            return /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(e) || !1
        },
        UUIDv4: function(e) {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e) || !1
        },
        URL: function(e) {
            var t = new RegExp("^(http|https)://")
              , n = new RegExp("^((?!(data|javascript):).)*$");
            return t.test(e) && n.test(e) && -1 === e.indexOf("#")
        },
        IMAGE: function(e) {
            return (0 === e.indexOf("https://") || 0 === e.indexOf("/")) && e.endsWith(".png")
        }
    };
    function ze(e, t) {
        var n, r = "attempts"in (t = t || {}) ? t.attempts : 1, i = t.delay || 0, o = t.onFail;
        return n = function(t, n, a) {
            e().then(t, (function(e) {
                var t = r-- > 0;
                if (o) {
                    var s = o(e, r);
                    s && (t = !1 !== s.retry && t,
                    i = s.delay)
                }
                t ? setTimeout(a, i || 0) : n(e)
            }
            ))
        }
        ,
        new Promise((function(e, t) {
            n(e, t, (function r() {
                n(e, t, r)
            }
            ))
        }
        ))
    }
    var Fe = {
        eventName: function(e) {
            var t = e;
            return "down" === e || "up" === e || "move" === e || "over" === e || "out" === e ? t = !ee.System.mobile || "down" !== e && "up" !== e && "move" !== e ? "mouse" + e : "down" === e ? "touchstart" : "up" === e ? "touchend" : "touchmove" : "enter" === e && (t = "keydown"),
            t
        },
        actionName: function(e) {
            var t = e;
            return "touchstart" === t || "mousedown" === t ? t = "down" : "touchmove" === t || "mousemove" === t ? t = "move" : "touchend" === t || "mouseup" === t ? t = "up" : "mouseover" === t ? t = "over" : "mouseout" === t && (t = "out"),
            t
        },
        eventCallback: function(e, t, n) {
            var r = Fe.actionName(e);
            return function(i) {
                if (i = i || window.event,
                "down" === r || "move" === r || "up" === r || "over" === r || "out" === r || "click" === r) {
                    var o = Fe.eventCoords(i);
                    if (!o)
                        return;
                    var a = n.getBoundingClientRect();
                    i.windowX = o.x,
                    i.windowY = o.y,
                    i.elementX = i.windowX - (a.x || a.left),
                    i.elementY = i.windowY - (a.y || a.top)
                }
                i.keyNum = i.which || i.keyCode || 0,
                "enter" === e && 13 !== i.keyNum && 32 !== i.keyNum || (i.action = r,
                i.targetElement = n,
                t(i))
            }
        },
        eventCoords: function(e) {
            if (!e)
                return null;
            var t = e;
            if (e.touches || e.changedTouches) {
                var n = e.touches && e.touches.length >= 1 ? e.touches : e.changedTouches;
                n && n[0] && (t = n[0])
            }
            return "number" == typeof t.pageX && "number" == typeof t.pageY ? {
                x: t.pageX,
                y: t.pageY
            } : "number" == typeof t.clientX && "number" == typeof t.clientY ? {
                x: t.clientX,
                y: t.clientY
            } : null
        }
    }
      , He = ["Webkit", "Moz", "ms"]
      , We = document.createElement("div").style
      , Ke = {};
    function qe(e) {
        var t = Ke[e];
        return t || (e in We ? e : Ke[e] = function(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = He.length; n--; )
                if ((e = He[n] + t)in We)
                    return e
        }(e) || e)
    }
    function Je(e, t, n) {
        if (this.dom = null,
        this._clss = [],
        this._nodes = [],
        this._listeners = [],
        this._frag = null,
        e && "object" == typeof e) {
            this.dom = e;
            var r = []
              , i = [];
            "string" == typeof e.className && (i = e.className.split(" "));
            for (var o = 0; o < i.length; o++)
                "" !== i[o] && " " !== i[o] && r.push(i[o]);
            this._clss = r
        } else
            n !== undefined && null !== n || (n = !0),
            (!e || "string" == typeof e && (e.indexOf("#") >= 0 || e.indexOf(".") >= 0)) && (e && (t = e),
            e = "div"),
            this.dom = document.createElement(e),
            t && (t.indexOf("#") >= 0 ? this.dom.id = t.split("#")[1] : (t.indexOf(".") >= 0 && (t = t.split(".")[1]),
            this.addClass.call(this, t)));
        !0 === n && (this._frag = document.createDocumentFragment(),
        this._frag.appendChild(this.dom))
    }
    function Xe(e) {
        if (null === e)
            return "";
        var t = [];
        return Ge(e, t),
        t.join("&")
    }
    function Ge(e, t) {
        var n, r;
        if ("object" == typeof e)
            for (r in e)
                !0 === Ye(n = e[r]) ? Ge(n, t) : t[t.length] = Ve(r, n);
        else if (!0 === Array.isArray(e))
            for (var i = 0; i < e.length; i++)
                !0 === Ye(n = e[i]) ? Ge(e, t) : t[t.length] = Ve(r, n);
        else
            t[t.length] = Ve(e)
    }
    function Ye(e) {
        return !0 === Array.isArray(e) || "object" == typeof e
    }
    function Ve(e, t) {
        return encodeURIComponent(e) + "=" + encodeURIComponent(null === t ? "" : t)
    }
    Je.prototype.cloneNode = function(e) {
        try {
            return this.dom.cloneNode(e)
        } catch (Pn) {
            return Be("element", Pn),
            null
        }
    }
    ,
    Je.prototype.createElement = function(e, t) {
        try {
            var n = new Je(e,t,!1);
            return this.appendElement.call(this, n),
            this._nodes.push(n),
            n
        } catch (Pn) {
            return Be("element", Pn),
            null
        }
    }
    ,
    Je.prototype.appendElement = function(e) {
        if (e === undefined)
            return Ae({
                name: "DomElement Add Child",
                message: "Child Element is undefined"
            });
        var t;
        t = e._frag !== undefined && null !== e._frag ? e._frag : e.dom !== undefined ? e.dom : e;
        try {
            e instanceof Je && (e._parent = this),
            this.dom.appendChild(t)
        } catch (Pn) {
            Ae({
                name: "DomElement Add Child",
                message: "Failed to append child."
            })
        }
        return this
    }
    ,
    Je.prototype.removeElement = function(e) {
        try {
            var t;
            if (e._nodes)
                for (t = e._nodes.length; t--; )
                    e.removeElement(e._nodes[t]);
            for (t = this._nodes.length; --t > -1; )
                this._nodes[t] === e && this._nodes.splice(t, 1);
            var n = e instanceof Je ? e.dom : e
              , r = n.parentNode === this.dom ? this.dom : n.parentNode;
            if (r.removeChild && r.removeChild(n),
            !r)
                throw new Error("Child component does not have correct setup");
            e.__destroy && e.__destroy()
        } catch (Pn) {
            Ae({
                name: "DomElement Remove Child",
                message: Pn.message || "Failed to remove child."
            })
        }
    }
    ,
    Je.prototype.addClass = function(e) {
        return !1 === this.hasClass.call(this, e) && (this._clss.push(e),
        this.dom.className = this._clss.join(" ")),
        this
    }
    ,
    Je.prototype.hasClass = function(e) {
        for (var t = -1 !== this.dom.className.split(" ").indexOf(e), n = this._clss.length; n-- && !t; )
            t = this._clss[n] === e;
        return t
    }
    ,
    Je.prototype.removeClass = function(e) {
        for (var t = this._clss.length; --t > -1; )
            this._clss[t] === e && this._clss.splice(t, 1);
        return this.dom.className = this._clss.join(" "),
        this
    }
    ,
    Je.prototype.text = function(e) {
        if (this && this.dom) {
            if (!e)
                return this.dom.textContent;
            for (var t, n, r, i, o = /&(.*?);/g, a = /<[a-z][\s\S]*>/i; null !== (t = o.exec(e)); ) {
                !1 === a.test(t[0]) ? (r = t[0],
                i = void 0,
                (i = document.createElement("div")).innerHTML = r,
                n = i.textContent,
                e = e.replace(new RegExp(t[0],"g"), n)) : e = e.replace(t[0], "")
            }
            return this.dom.textContent = e,
            this
        }
    }
    ,
    Je.prototype.content = Je.prototype.text,
    Je.prototype.css = function(e) {
        var t, n = "ie" === ee.Browser.type && 8 === ee.Browser.version, r = "safari" === ee.Browser.type && 12 === Math.floor(ee.Browser.version);
        for (var i in e) {
            t = e[i];
            try {
                if ("transition" === i && r)
                    continue;
                "opacity" !== i && "zIndex" !== i && "fontWeight" !== i && isFinite(t) && parseFloat(t) === t && (t += "px");
                var o = qe(i);
                n && "opacity" === i ? this.dom.style.filter = "alpha(opacity=" + 100 * t + ")" : n && Ie.hasAlpha(t) ? this.dom.style[o] = new Ie(t).getHex() : this.dom.style[o] = t
            } catch (Bn) {}
        }
        return this
    }
    ,
    Je.prototype.backgroundImage = function(e, t, n, r) {
        var i = t !== undefined && n !== undefined
          , o = {
            "-ms-high-contrast-adjust": "none"
        };
        if ("object" == typeof t && (r = t),
        r === undefined && (r = {}),
        i) {
            var a = e.width / e.height
              , s = t
              , c = s / a;
            r.cover && c < n && (s = (c = n) * a),
            r.contain && c > n && (s = (c = n) * a),
            o.width = s,
            o.height = c,
            r.center && (o.marginLeft = -s / 2,
            o.marginTop = -c / 2,
            o.position = "absolute",
            o.left = "50%",
            o.top = "50%"),
            (r.left || r.right) && (o.left = r.left || 0,
            o.top = r.top || 0)
        }
        "ie" === ee.Browser.type && 8 === ee.Browser.version ? o.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + e.src + "',sizingMethod='scale')" : (o.background = "url(" + e.src + ")",
        o.backgroundPosition = "50% 50%",
        o.backgroundRepeat = "no-repeat",
        o.backgroundSize = i ? s + "px " + c + "px" : r.cover ? "cover" : r.contain ? "contain" : "100%"),
        this.css.call(this, o)
    }
    ,
    Je.prototype.setAttribute = function(e, t) {
        var n;
        if ("object" == typeof e)
            for (var r in e)
                n = e[r],
                this.dom.setAttribute(r, n);
        else
            this.dom.setAttribute(e, t)
    }
    ,
    Je.prototype.removeAttribute = function(e, t) {
        var n;
        if ("object" == typeof e)
            for (var r in e)
                n = e[r],
                this.dom.removeAttribute(r, n);
        else
            this.dom.removeAttribute(e, t)
    }
    ,
    Je.prototype.addEventListener = function(e, t, n) {
        var r = {
            event: Fe.eventName(e),
            handler: Fe.eventCallback(e, t, this.dom),
            callback: t
        };
        this._listeners.push(r),
        this.dom.addEventListener ? this.dom.addEventListener(r.event, r.handler, n) : this.dom.attachEvent("on" + r.event, r.handler)
    }
    ,
    Je.prototype.removeEventListener = function(e, t, n) {
        for (var r, i = this._listeners.length; --i > -1; )
            (r = this._listeners[i]).event === e && r.callback === t && (this._listeners.splice(i, 1),
            this.dom.removeEventListener ? this.dom.removeEventListener(r.event, r.handler, n) : this.dom.detachEvent("on" + r.event, r.handler))
    }
    ,
    Je.prototype.focus = function() {
        this.dom.focus()
    }
    ,
    Je.prototype.blur = function() {
        this.dom.blur()
    }
    ,
    Je.prototype.html = function(e) {
        return e && (this.dom.innerHTML = e),
        this.dom.innerHTML
    }
    ,
    Je.prototype.__destroy = function() {
        for (var e, t = this._listeners.length; --t > -1; )
            e = this._listeners[t],
            this._listeners.splice(t, 1),
            this.dom.removeEventListener ? this.dom.removeEventListener(e.event, e.handler) : this.dom.detachEvent("on" + e.event, e.handler);
        return this.dom = null,
        this._clss = [],
        this._nodes = [],
        this._listeners = [],
        this._frag = null,
        e = null,
        null
    }
    ,
    Je.prototype.isConnected = function() {
        return !!this.dom && ("isConnected"in this.dom ? this.dom.isConnected : !(this.dom.ownerDocument && this.dom.ownerDocument.compareDocumentPosition(this.dom) & this.dom.DOCUMENT_POSITION_DISCONNECTED))
    }
    ;
    var Qe = {
        af: "Afrikaans",
        sq: "Albanian",
        am: "Amharic",
        ar: "Arabic",
        hy: "Armenian",
        az: "Azerbaijani",
        eu: "Basque",
        be: "Belarusian",
        bn: "Bengali",
        bg: "Bulgarian",
        bs: "Bosnian",
        my: "Burmese",
        ca: "Catalan",
        ceb: "Cebuano",
        zh: "Chinese",
        "zh-CN": "Chinese Simplified",
        "zh-TW": "Chinese Traditional",
        co: "Corsican",
        hr: "Croatian",
        cs: "Czech",
        da: "Danish",
        nl: "Dutch",
        en: "English",
        eo: "Esperanto",
        et: "Estonian",
        fi: "Finnish",
        fr: "French",
        fy: "Frisian",
        gd: "Gaelic",
        gl: "Galacian",
        ka: "Georgian",
        de: "German",
        el: "Greek",
        gu: "Gujurati",
        ht: "Haitian",
        ha: "Hausa",
        haw: "Hawaiian",
        he: "Hebrew",
        hi: "Hindi",
        hmn: "Hmong",
        hu: "Hungarian",
        is: "Icelandic",
        ig: "Igbo",
        id: "Indonesian",
        ga: "Irish",
        it: "Italian",
        ja: "Japanese",
        jw: "Javanese",
        kn: "Kannada",
        kk: "Kazakh",
        km: "Khmer",
        rw: "Kinyarwanda",
        ky: "Kirghiz",
        ko: "Korean",
        ku: "Kurdish",
        lo: "Lao",
        la: "Latin",
        lv: "Latvian",
        lt: "Lithuanian",
        lb: "Luxembourgish",
        mk: "Macedonian",
        mg: "Malagasy",
        ms: "Malay",
        ml: "Malayalam",
        mt: "Maltese",
        mi: "Maori",
        mr: "Marathi",
        mn: "Mongolian",
        ne: "Nepali",
        no: "Norwegian",
        ny: "Nyanja",
        or: "Oriya",
        fa: "Persian",
        pl: "Polish",
        "pt-BR": "Portuguese (Brazil)",
        pt: "Portuguese (Portugal)",
        ps: "Pashto",
        pa: "Punjabi",
        ro: "Romanian",
        ru: "Russian",
        sm: "Samoan",
        sn: "Shona",
        sd: "Sindhi",
        si: "Singhalese",
        sr: "Serbian",
        sk: "Slovak",
        sl: "Slovenian",
        so: "Somani",
        st: "Southern Sotho",
        es: "Spanish",
        su: "Sundanese",
        sw: "Swahili",
        sv: "Swedish",
        tl: "Tagalog",
        tg: "Tajik",
        ta: "Tamil",
        tt: "Tatar",
        te: "Teluga",
        th: "Thai",
        tr: "Turkish",
        tk: "Turkmen",
        ug: "Uyghur",
        uk: "Ukrainian",
        ur: "Urdu",
        uz: "Uzbek",
        vi: "Vietnamese",
        cy: "Welsh",
        xh: "Xhosa",
        yi: "Yiddish",
        yo: "Yoruba",
        zu: "Zulu"
    }
      , Ze = {
        zh: {
            "I am human": "æˆ‘æ˜¯äºº"
        },
        ar: {
            "I am human": "Ø£Ù†Ø§ Ø§Ù„Ø¥Ù†Ø³Ø§Ù†"
        },
        af: {
            "I am human": "Ek is menslike"
        },
        am: {
            "I am human": "áŠ¥áŠ” áˆ°á‹ áŠáŠ"
        },
        hy: {
            "I am human": "ÔµÕ½ Õ´Õ¡Ö€Õ¤ Õ¥Õ´"
        },
        az: {
            "I am human": "MÉ™n insanam"
        },
        eu: {
            "I am human": "Gizakia naiz"
        },
        bn: {
            "I am human": "à¦†à¦®à¦¿ à¦®à¦¾à¦¨à¦¬ à¦¨à¦‡"
        },
        bg: {
            "I am human": "ÐÐ· ÑÑŠÐ¼ Ñ‡Ð¾Ð²ÐµÐº"
        },
        ca: {
            "I am human": "SÃ³c humÃ "
        },
        hr: {
            "I am human": "Ja sam Äovjek"
        },
        cs: {
            "I am human": "Jsem ÄlovÄ›k"
        },
        da: {
            "I am human": "Jeg er et menneske"
        },
        nl: {
            "I am human": "Ik ben een mens"
        },
        et: {
            "I am human": "Ma olen inimeste"
        },
        fi: {
            "I am human": "Olen ihminen"
        },
        fr: {
            "I am human": "Je suis humain"
        },
        gl: {
            "I am human": "Eu son humano"
        },
        ka: {
            "I am human": "áƒ›áƒ” áƒ•áƒáƒ  áƒáƒ“áƒáƒ›áƒ˜áƒáƒœáƒ˜"
        },
        de: {
            "I am human": "Ich bin ein Mensch"
        },
        el: {
            "I am human": "Î•Î¯Î¼Î±Î¹ Î¬Î½Î¸ÏÏ‰Ï€Î¿Ï‚"
        },
        gu: {
            "I am human": "àª¹à«àª‚ àª®àª¾àª¨àªµ àª›à«àª‚"
        },
        iw: {
            "I am human": ". ×× ×™ ×× ×•×©×™"
        },
        hi: {
            "I am human": "à¤®à¥ˆà¤‚ à¤®à¤¾à¤¨à¤µ à¤¹à¥‚à¤‚"
        },
        hu: {
            "I am human": "Nem vagyok robot"
        },
        is: {
            "I am human": "Ã‰g er manneskja"
        },
        id: {
            "I am human": "Aku manusia"
        },
        it: {
            "I am human": "Sono un essere umano"
        },
        ja: {
            "I am human": "ç§ã¯äººé–“ã§ã™"
        },
        kn: {
            "I am human": "à²¨à²¾à²¨à³ à²®à²¾à²¨à²µà²¨à³"
        },
        ko: {
            "I am human": "ì‚¬ëžŒìž…ë‹ˆë‹¤"
        },
        lo: {
            "I am human": "àº‚à»‰àº­àºà»€àº›àº±àº™àº¡àº°àº™àº¸àº”"
        },
        lv: {
            "I am human": "Es esmu cilvÄ“ks"
        },
        lt: {
            "I am human": "AÅ¡ esu Å¾mogaus"
        },
        ms: {
            "I am human": "Saya manusia"
        },
        ml: {
            "I am human": "à´žà´¾àµ» à´®à´¨àµà´·àµà´¯à´¨à´¾à´£àµ"
        },
        mr: {
            "I am human": "à¤®à¥€ à¤®à¤¾à¤¨à¤µà¥€ à¤†à¤¹à¥‡"
        },
        mn: {
            "I am human": "Ð‘Ð¸ Ð±Ð¾Ð» Ñ…Ò¯Ð½"
        },
        no: {
            "I am human": "Jeg er menneskelig"
        },
        fa: {
            "I am human": "Ù…Ù† Ø§Ù†Ø³Ø§Ù†ÛŒ Ù‡Ø³ØªÙ…"
        },
        pl: {
            "I am human": "Jestem czÅ‚owiekiem"
        },
        pt: {
            "I am human": "Sou humano"
        },
        ro: {
            "I am human": "Eu sunt om"
        },
        ru: {
            "I am human": "Ð¯ Ñ‡ÐµÐ»Ð¾Ð²ÐµÐº"
        },
        sr: {
            "I am human": "Ja sam ljudski"
        },
        si: {
            "I am human": "à¶¸à¶¸ à¶¸à·’à¶±à·’à·ƒà·Šà·ƒà·”"
        },
        sk: {
            "I am human": "Ja som Älovek"
        },
        sl: {
            "I am human": "Jaz sem ÄloveÅ¡ki"
        },
        es: {
            "I am human": "Soy humano"
        },
        sw: {
            "I am human": "Mimi ni binadamu"
        },
        sv: {
            "I am human": "Jag Ã¤r mÃ¤nniska"
        },
        ta: {
            "I am human": "à®¨à®¾à®©à¯ à®®à®©à®¿à®¤"
        },
        te: {
            "I am human": "à°¨à±‡à°¨à± à°®à°¨à°¿à°·à°¿à°¨à°¿"
        },
        th: {
            "I am human": "à¸œà¸¡à¸¡à¸™à¸¸à¸©à¸¢à¹Œ"
        },
        tr: {
            "I am human": "Ben bir insanÄ±m"
        },
        uk: {
            "I am human": "Ð¯ Ð»ÑŽÐ´Ð¸Ð½Ð¸"
        },
        ur: {
            "I am human": "Ù…ÛŒÚº Ø§Ù†Ø³Ø§Ù† ÛÙˆÚº"
        },
        vi: {
            "I am human": "TÃ´i lÃ  con ngÆ°á»i"
        },
        zu: {
            "I am human": "Ngingumuntu"
        }
    }
      , et = null
      , tt = {
        translate: function(e, t) {
            var n = tt.getBestTrans(Ze)
              , r = n && n[e];
            if (r = r || e,
            t)
                for (var i = Object.keys(t), o = i.length; o--; )
                    r = r.replace(new RegExp("{{" + i[o] + "}}","g"), t[i[o]]);
            return r
        },
        getBestTrans: function(e) {
            var t = tt.getLocale();
            return t in e ? e[t] : tt.getShortLocale(t)in e ? e[tt.getShortLocale(t)] : "en"in e ? e.en : null
        },
        resolveLocale: function(e) {
            var t = tt.getShortLocale(e);
            return "in" === t && (e = "id"),
            "iw" === t && (e = "he"),
            "nb" === t && (e = "no"),
            "ji" === t && (e = "yi"),
            "zh-CN" === e && (e = "zh"),
            "jv" === t && (e = "jw"),
            Qe[e] ? e : Qe[t] ? t : "en"
        },
        getLocale: function() {
            return tt.resolveLocale(et || window.navigator.userLanguage || window.navigator.language)
        },
        setLocale: function(e) {
            "zh-Hans" === e ? e = "zh-CN" : "zh-Hant" === e && (e = "zh-TW"),
            et = e
        },
        getShortLocale: function(e) {
            return e.indexOf("-") >= 0 ? e.substring(0, e.indexOf("-")) : e
        },
        getLangName: function(e) {
            return Qe[e]
        },
        isShortLocale: function(e) {
            return 2 === e.length || 3 === e.length
        },
        addTable: function(e, t) {
            if (t || (t = Object.create(null)),
            Ze[e]) {
                var n = Ze[e];
                for (var r in t)
                    n[r] = t[r]
            } else
                Ze[e] = t;
            return Ze[e]
        },
        getTable: function(e) {
            return Ze[e]
        },
        addTables: function(e) {
            for (var t in e)
                tt.addTable(t, e[t]);
            return Ze
        },
        getTables: function() {
            return Ze
        }
    }
      , nt = {
        400: "Rate limited or network error. Please retry.",
        429: "Your computer or network has sent too many requests.",
        500: "Cannot contact hCaptcha. Check your connection and try again."
    }
      , rt = function(e) {
        try {
            return tt.translate(nt[e])
        } catch (Pn) {
            return !1
        }
    }
      , it = "undefined" != typeof XDomainRequest && !("withCredentials"in XMLHttpRequest.prototype);
    function ot(e, t, n) {
        n = n || {};
        var r = {
            url: t,
            method: e.toUpperCase(),
            responseType: n.responseType || "string",
            dataType: n.dataType || null,
            withCredentials: n.withCredentials || !1,
            headers: n.headers || null,
            data: n.data || null,
            timeout: n.timeout || null,
            pst: n.pst || null
        };
        r.legacy = r.withCredentials && it;
        var i = "fetch"in window && r.pst ? st : at;
        return n.retry ? ze((function() {
            return n.data && (r.data = "function" == typeof n.data ? n.data() : n.data,
            "json" === r.dataType && "object" == typeof r.data ? r.data = JSON.stringify(r.data) : "query" === r.dataType && (r.data = Xe(r.data))),
            i(r)
        }
        ), n.retry) : (n.data && (r.data = "function" == typeof n.data ? n.data() : n.data,
        "json" === r.dataType && "object" == typeof r.data ? r.data = JSON.stringify(r.data) : "query" === r.dataType && (r.data = Xe(r.data))),
        i(r))
    }
    function at(e) {
        var t = e.legacy ? new XDomainRequest : new XMLHttpRequest
          , n = "function" == typeof e.url ? e.url() : e.url;
        return new Promise((function(r, i) {
            var o, a = function(o) {
                return function() {
                    var a = t.response
                      , s = t.statusText || ""
                      , c = t.status
                      , l = t.readyState;
                    if (a || "" !== t.responseType && "text" !== t.responseType || (a = t.responseText),
                    4 === l || e.legacy) {
                        try {
                            if (a) {
                                var u = t.contentType;
                                if (t.getResponseHeader && (u = t.getResponseHeader("content-type")),
                                "ArrayBuffer"in window && a instanceof ArrayBuffer && u && -1 !== u.toLowerCase().indexOf("application/json") && (a = (new TextDecoder).decode(new Uint8Array(a))),
                                "string" == typeof a)
                                    try {
                                        a = JSON.parse(a)
                                    } catch (h) {
                                        Be("http", h, {
                                            url: n,
                                            config: e,
                                            responseType: t.responseType,
                                            contentType: u,
                                            response: a
                                        })
                                    }
                            }
                        } catch (h) {
                            return Be("http", h, {
                                contentType: u
                            }),
                            void i({
                                event: se,
                                endpoint: n,
                                response: a,
                                state: l,
                                status: c,
                                message: rt(c || 400) || s
                            })
                        }
                        if ("error" === o || c >= 400 && c <= 511)
                            return void i({
                                event: se,
                                endpoint: n,
                                response: a,
                                state: l,
                                status: c,
                                message: 409 === c && a.error || rt(c || 400) || s
                            });
                        r({
                            state: l,
                            status: c,
                            body: a,
                            message: s
                        })
                    }
                }
            };
            if ((t.onload = a("complete"),
            t.onerror = t.ontimeout = a("error"),
            t.open(e.method, n),
            "arraybuffer" === e.responseType && (!e.legacy && "TextDecoder"in window && "ArrayBuffer"in window ? t.responseType = "arraybuffer" : (e.responseType = "json",
            e.headers.accept = "application/json")),
            e.timeout && (t.timeout = "function" == typeof e.timeout ? e.timeout(n) : e.timeout),
            !e.legacy) && (t.withCredentials = e.withCredentials,
            e.headers))
                for (var s in e.headers)
                    o = e.headers[s],
                    t.setRequestHeader(s, o);
            setTimeout((function() {
                t.send(e.data)
            }
            ), 0)
        }
        ))
    }
    function st(e) {
        var t, n = "function" == typeof e.url ? e.url() : e.url, r = new Headers;
        if ("json" === e.responseType && r.set("content-type", "application/json"),
        e.headers)
            for (var i in e.headers)
                t = e.headers[i],
                r.set(i, t);
        var o = {
            method: e.method,
            credentials: "include",
            body: e.data,
            headers: r
        };
        if (e.pst) {
            var a = {};
            "token-request" === e.pst ? a = {
                version: 1,
                operation: "token-request"
            } : "token-redemption" === e.pst ? a = {
                version: 1,
                operation: "token-redemption",
                refreshPolicy: "refresh"
            } : "send-redemption-record" === e.pst && (a = {
                version: 1,
                operation: "send-redemption-record",
                issuers: [ve.pstIssuer]
            }),
            o.privateToken = a
        }
        return new Promise((function(t, r) {
            fetch(n, o).then((function(i) {
                return 200 !== i.status ? r({
                    event: se,
                    endpoint: n,
                    response: i,
                    state: 4,
                    status: i.status,
                    message: rt(i.status || 400)
                }) : ("arraybuffer" === e.responseType ? i.arrayBuffer() : "json" === e.responseType ? i.json() : i.text()).then((function(e) {
                    t({
                        state: 4,
                        status: i.status,
                        body: e,
                        message: rt(i.status || 400)
                    })
                }
                ))
            }
            ))["catch"]((function(e) {
                r({
                    event: se,
                    endpoint: n,
                    response: e.error,
                    state: 4,
                    status: 400,
                    message: rt(400)
                })
            }
            ))
        }
        ))
    }
    var ct = function(e, t) {
        if ("object" == typeof e && t === undefined && (e = (t = e).url),
        null === e)
            throw new Error("Url missing");
        return ot("GET", e, t)
    }
      , lt = ["svg", "gif", "png"];
    function ut(e, t) {
        t = t || {};
        var n, r = e;
        if (0 === r.indexOf("data:image"))
            for (var i = !1, o = lt.length, a = -1; a++ < o && !i; )
                (i = r.indexOf(lt[a]) >= 0) && (n = lt[a]);
        else
            n = r.substr(r.lastIndexOf(".") + 1, r.length);
        !!(!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) && t.fallback && (t.fallback.indexOf(".") >= 0 ? n = (r = t.fallback).substr(r.lastIndexOf(".") + 1, r.length) : (r = e.substr(0, e.indexOf(n)) + t.fallback,
        n = t.fallback)),
        t.prefix && (r = t.prefix + "/" + r),
        this.attribs = {
            crossOrigin: t.crossOrigin || null
        },
        this.id = r,
        this.src = function(e) {
            if (ve.assethost && 0 === e.indexOf(ye.assetDomain))
                return ve.assethost + e.replace(ye.assetDomain, "");
            if (ve.imghost && e.indexOf("imgs") >= 0) {
                var t = e.indexOf(".ai") >= 0 ? e.indexOf(".ai") + 3 : e.indexOf(".com") + 4;
                return ve.imghost + e.substr(t, e.length)
            }
            return e
        }(r),
        this.ext = n,
        this.width = 0,
        this.height = 0,
        this.aspect = 0,
        this.loaded = !1,
        this.error = !1,
        this.element = null,
        this.cb = {
            load: [],
            error: []
        }
    }
    function ht(e, t, n) {
        for (var r = e[t], i = r.length, o = null; --i > -1; )
            o = r[i],
            r.splice(i, 1),
            o(n);
        "error" === t ? e.load = [] : e.error = []
    }
    function dt(e, t) {
        var n = e;
        t || (t = {}),
        t.prefix && (n = t.prefix + "/" + e),
        this.attribs = {
            defer: t.defer || null,
            async: t.async || null,
            crossOrigin: t.crossOrigin || null,
            integrity: t.integrity || null
        },
        this.id = n,
        this.src = function(e) {
            if (ve.assethost && 0 === e.indexOf(ye.assetDomain))
                return ve.assethost + e.replace(ye.assetDomain, "");
            return e
        }(n),
        this.loaded = !1,
        this.error = !1,
        this.element = null,
        this.cb = {
            load: [],
            error: []
        }
    }
    function ft(e, t, n) {
        for (var r = e[t], i = r.length, o = null; --i > -1; )
            o = r[i],
            r.splice(i, 1),
            o(n);
        "error" === t ? e.load = [] : e.error = []
    }
    function pt(e, t) {
        var n = e;
        t || (t = {}),
        t.prefix && (n = t.prefix + "/" + e),
        this.responseType = t.responseType,
        this.id = n,
        this.src = function(e) {
            if (ve.assethost && 0 === e.indexOf(ye.assetDomain))
                return ve.assethost + e.replace(ye.assetDomain, "");
            return e
        }(n),
        this.loaded = !1,
        this.error = !1,
        this.cb = {
            load: [],
            error: []
        },
        this.data = null
    }
    function mt(e, t, n) {
        for (var r = e[t], i = r.length, o = null; --i > -1; )
            o = r[i],
            r.splice(i, 1),
            o(n);
        "error" === t ? e.load = [] : e.error = []
    }
    ut.prototype.load = function() {
        return ("svg" === this.ext ? this._loadSvg() : this._loadImg())["catch"]((function(e) {
            throw je("Asset failed", "error", "assets", {
                error: e
            }),
            e
        }
        ))
    }
    ,
    ut.prototype._loadSvg = function() {
        var e, t = this, n = this.src, r = this.id;
        if (0 === n.indexOf("data:image/svg+xml")) {
            var i = n.slice("data:image/svg+xml,".length);
            e = Promise.resolve(decodeURIComponent(i))
        } else
            e = ct(n).then((function(e) {
                return e.body
            }
            ));
        return e.then((function(e) {
            var n = (new DOMParser).parseFromString(e, "image/svg+xml").documentElement
              , r = parseInt(n.getAttribute("width"))
              , i = parseInt(n.getAttribute("height"));
            return t._imgLoaded(n, r, i),
            t
        }
        ))["catch"]((function(e) {
            t.error = !0;
            var n = (e && e.message ? e.message : e || "Loading Error") + ": " + r;
            throw ht(t.cb, "error", n),
            n
        }
        ))
    }
    ,
    ut.prototype._loadImg = function() {
        var e = this
          , t = this.attribs
          , n = this.src
          , r = this.id;
        return new Promise((function(i, o) {
            function a() {
                e.loaded || (e._imgLoaded(s, s.width, s.height),
                s.onload = s.onerror = null,
                i(e))
            }
            var s = new Image;
            t.crossOrigin && (s.crossOrigin = t.crossOrigin),
            s.onerror = function() {
                e.error = !0,
                s.onload = s.onerror = null;
                var t = "Loading Error: " + r;
                ht(e.cb, "error", t),
                o(t)
            }
            ,
            s.onload = a,
            s.src = n,
            s.complete && a()
        }
        ))
    }
    ,
    ut.prototype._imgLoaded = function(e, t, n) {
        this.element = new Je(e),
        this.width = t,
        this.height = n,
        this.aspect = t / n,
        this.loaded = !0,
        ht(this.cb, "load", this)
    }
    ,
    ut.prototype.onload = function(e) {
        this.error || (this.loaded ? e(this) : this.cb.load.push(e))
    }
    ,
    ut.prototype.onerror = function(e) {
        this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e))
    }
    ,
    dt.prototype.load = function() {
        var e = this
          , t = this.attribs
          , n = this.src
          , r = this.id;
        return new Promise((function(i, o) {
            var a = document.createElement("script");
            e.element = a,
            a.onerror = function() {
                e.error = !0,
                a.onload = a.onreadystatechange = a.onerror = null;
                var t = "Loading Error: " + r;
                ft(e.cb, "error", t),
                o(t)
            }
            ,
            a.onload = a.onreadystatechange = function() {
                this.loaded || a.readyState && "loaded" !== a.readyState && "complete" !== a.readyState || (e.loaded = !0,
                a.onload = a.onreadystatechange = a.onerror = null,
                document.body.removeChild(a),
                ft(e.cb, "load", e),
                i(e))
            }
            ,
            a.type = "text/javascript",
            a.src = n,
            t.crossOrigin && (a.crossorigin = t.crossOrigin),
            t.async && (a.async = !0),
            t.defer && (a.defer = !0),
            t.integrity && (a.integrity = t.integrity),
            document.body.appendChild(a),
            a.complete && a.onload()
        }
        ))
    }
    ,
    dt.prototype.onload = function(e) {
        this.error || (this.loaded ? e(this) : this.cb.load.push(e))
    }
    ,
    dt.prototype.onerror = function(e) {
        this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e))
    }
    ,
    pt.prototype.load = function() {
        var e = this
          , t = this.src
          , n = this.id;
        return new Promise((function(r, i) {
            var o = {};
            "arraybuffer" === e.responseType ? o.responseType = "arraybuffer" : t.indexOf("json") >= 0 && (o.responseType = "json"),
            ct(t, o).then((function(t) {
                e.loaded = !0,
                e.data = t.body,
                mt(e.cb, "load", e),
                r(e)
            }
            ))["catch"]((function(t) {
                e.error = !0;
                var r = (t && t.message ? t.message : "Loading Error") + ": " + n;
                mt(e.cb, "error", r),
                i(r)
            }
            ))
        }
        ))
    }
    ,
    pt.prototype.onload = function(e) {
        this.error || (this.loaded ? e(this) : this.cb.load.push(e))
    }
    ,
    pt.prototype.onerror = function(e) {
        this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e))
    }
    ;
    var gt = []
      , yt = function(e, t) {
        var n = new pt(e,t);
        return gt.push(n),
        n.load()
    }
      , vt = function(e) {
        return new Promise((function(t, n) {
            for (var r = gt.length, i = !1, o = null; --r > -1 && !i; )
                i = (o = gt[r]).id === e || -1 !== o.id.indexOf("/" === e[0] ? "" : "/" + e);
            if (!i)
                return t(null);
            o.onload(t),
            o.onerror(n)
        }
        ))
    }
      , wt = []
      , bt = !1
      , kt = !1;
    function _t() {
        document.addEventListener ? (document.addEventListener("DOMContentLoaded", Et),
        window.addEventListener("load", Et)) : (document.attachEvent("onreadystatechange", xt),
        window.attachEvent("onload", Et)),
        bt = !0
    }
    function xt() {
        "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState || Et()
    }
    function Et() {
        if (!1 === kt) {
            for (var e = 0; e < wt.length; e++)
                wt[e].fn.apply(null, wt[e].args);
            wt = []
        }
        kt = !0,
        document.removeEventListener ? (document.removeEventListener("DOMContentLoaded", Et),
        window.removeEventListener("load", Et)) : (document.detachEvent("onreadystatechange", xt),
        window.detachEvent("onload", Et))
    }
    new Je(document);
    var St = new Je(window);
    function Ct(e, t) {
        this._period = e,
        this._interval = t,
        this._date = [],
        this._data = [],
        this._prevTimestamp = 0,
        this._meanPeriod = 0,
        this._meanCounter = 0
    }
    Ct.prototype.getMeanPeriod = function() {
        return this._meanPeriod
    }
    ,
    Ct.prototype.getData = function() {
        return this._cleanStaleData(),
        this._data
    }
    ,
    Ct.prototype.getSize = function() {
        return this._cleanStaleData(),
        this._data.length
    }
    ,
    Ct.prototype.getCapacity = function() {
        return 0 === this._period ? this._interval : Math.ceil(this._interval / this._period)
    }
    ,
    Ct.prototype.push = function(e, t) {
        this._cleanStaleData();
        var n = 0 === this._date.length;
        if (e - (this._date[this._date.length - 1] || 0) >= this._period && (this._date.push(e),
        this._data.push(t)),
        !n) {
            var r = e - this._prevTimestamp;
            this._meanPeriod = (this._meanPeriod * this._meanCounter + r) / (this._meanCounter + 1),
            this._meanCounter++
        }
        this._prevTimestamp = e
    }
    ,
    Ct.prototype._cleanStaleData = function() {
        for (var e = Date.now(), t = this._date.length - 1; t >= 0; t--) {
            if (e - this._date[t] >= this._interval) {
                this._date.splice(0, t + 1),
                this._data.splice(0, t + 1);
                break
            }
        }
    }
    ;
    var Ot = {
        touchstart: "ts",
        touchend: "te",
        touchmove: "tm",
        touchcancel: "tc"
    }
      , At = {
        mousedown: "md",
        mouseup: "mu",
        mousemove: "mm"
    }
      , Tt = {
        pointermove: "pm"
    }
      , jt = {
        keydown: "kd",
        keyup: "ku"
    }
      , Bt = {
        devicemotion: "dm"
    }
      , Pt = function(e, t) {
        var n = At[e]
          , r = null;
        return function(e) {
            r = function(e) {
                return [e.windowX, e.windowY, Date.now()]
            }(e),
            t(n, r)
        }
    }
      , Rt = function(e, t) {
        var n = Tt[e]
          , r = null;
        return function(e) {
            r = function(e) {
                var t = []
                  , n = [];
                e.getCoalescedEvents && (n = e.getCoalescedEvents());
                for (var r = 0; r < n.length; r++) {
                    var i = n[r];
                    t.push([i.x, i.y, Date.now()])
                }
                return t
            }(e);
            for (var i = 0; i < r.length; i++)
                t(n, r[i])
        }
    }
      , It = function(e, t) {
        var n = Ot[e]
          , r = null;
        return function(e) {
            r = function(e) {
                var t = [];
                try {
                    var n, r;
                    if (e.touches && e.touches.length >= 1 ? n = e.touches : e.changedTouches && e.changedTouches.length >= 1 && (n = e.changedTouches),
                    n) {
                        for (var i = 0; i < n.length; i++)
                            (r = Fe.eventCoords(n[i])) && t.push([n[i].identifier, r.x, r.y]);
                        t.push(Date.now())
                    }
                    return t
                } catch (Pn) {
                    return t
                }
            }(e),
            t(n, r)
        }
    }
      , Mt = function(e, t) {
        var n = jt[e]
          , r = null;
        return function(e) {
            r = function(e) {
                return [e.keyNum, Date.now()]
            }(e),
            t(n, r)
        }
    }
      , Lt = function(e, t) {
        var n = Bt[e]
          , r = null
          , i = [];
        return function(e) {
            r = function(e, t) {
                (e.acceleration === undefined || e.acceleration && e.acceleration.x === undefined) && (e.acceleration = {
                    x: 0,
                    y: 0,
                    z: 0
                });
                (e.rotationRate === undefined || e.rotationRate && e.rotationRate.alpha === undefined) && (e.rotationRate = {
                    alpha: 0,
                    beta: 0,
                    gamma: 0
                });
                var n = [e.acceleration.x, e.acceleration.y, e.acceleration.z, e.rotationRate.alpha, e.rotationRate.beta, e.rotationRate.gamma, Date.now()]
                  , r = [];
                if (0 === t.length)
                    t = n,
                    r = n;
                else {
                    for (var i, o = 0, a = 0; a < 6; a++)
                        i = t[a] - n[a],
                        r.push(n[a]),
                        o += Math.abs(i);
                    if (r.push(Date.now()),
                    t = n,
                    o <= 0)
                        return null
                }
                return {
                    motion: r,
                    prevmotion: t
                }
            }(e, i),
            null !== r && (i = r.prevmotion,
            r = r.motion,
            t(n, r))
        }
    };
    function $t() {
        this._manifest = {},
        this.state = {
            timeBuffers: {},
            loadTime: Date.now(),
            recording: !1,
            initRecord: !1,
            record: {
                mouse: !0,
                touch: !0,
                keys: !1,
                motion: !1
            }
        },
        this._recordEvent = this._recordEvent.bind(this)
    }
    $t.prototype.record = function(e, t, n, r) {
        if (this._manifest.st = Date.now(),
        this.state.record.mouse = e === undefined ? this.state.record.mouse : e,
        this.state.record.touch = n === undefined ? this.state.record.touch : n,
        this.state.record.keys = t === undefined ? this.state.record.keys : t,
        this.state.record.motion = r === undefined ? this.state.record.motion : r,
        !1 === this.state.initRecord) {
            var i = new Je(document.body);
            this.state.record.mouse && (i.addEventListener("mousedown", Pt("mousedown", this._recordEvent), !0),
            i.addEventListener("mousemove", Pt("mousemove", this._recordEvent), !0),
            i.addEventListener("mouseup", Pt("mouseup", this._recordEvent), !0),
            i.addEventListener("pointermove", Rt("pointermove", this._recordEvent), !0)),
            !0 === this.state.record.keys && (i.addEventListener("keyup", Mt("keyup", this._recordEvent), !0),
            i.addEventListener("keydown", Mt("keydown", this._recordEvent), !0)),
            this.state.record.touch && !0 === ee.Browser.hasEvent("touchstart", document.body) && (i.addEventListener("touchstart", It("touchstart", this._recordEvent), !0),
            i.addEventListener("touchmove", It("touchmove", this._recordEvent), !0),
            i.addEventListener("touchend", It("touchend", this._recordEvent), !0)),
            this.state.record.motion && !0 === ee.Browser.hasEvent("devicemotion", window) && i.addEventListener("devicemotion", Lt("devicemotion", this._recordEvent), !0),
            this.state.initRecord = !0
        }
        this.state.recording = !0
    }
    ,
    $t.prototype.stop = function() {
        this.state.recording = !1
    }
    ,
    $t.prototype.time = function() {
        return this.state.loadTime
    }
    ,
    $t.prototype.getData = function() {
        for (var e in this.state.timeBuffers)
            this._manifest[e] = this.state.timeBuffers[e].getData(),
            this._manifest[e + "-mp"] = this.state.timeBuffers[e].getMeanPeriod();
        return this._manifest
    }
    ,
    $t.prototype.setData = function(e, t) {
        this._manifest[e] = t
    }
    ,
    $t.prototype.resetData = function() {
        this._manifest = {},
        this.state.timeBuffers = {}
    }
    ,
    $t.prototype.circBuffPush = function(e, t) {
        this._recordEvent(e, t)
    }
    ,
    $t.prototype._recordEvent = function(e, t) {
        if (!1 !== this.state.recording)
            try {
                var n = t[t.length - 1];
                this.state.timeBuffers[e] || (this.state.timeBuffers[e] = new Ct(16,15e3)),
                this.state.timeBuffers[e].push(n, t)
            } catch (Bn) {
                Be("motion", Bn)
            }
    }
    ;
    var Dt = new $t;
    function Ut(e, t) {
        this.cause = e,
        this.message = t
    }
    function Nt(e) {
        Ut.call(this, fe, "Invalid hCaptcha id: " + e)
    }
    function zt() {
        Ut.call(this, he, "No hCaptcha exists.")
    }
    function Ft() {
        Ut.call(this, de, "Missing sitekey - https://docs.hcaptcha.com/configuration#javascript-api")
    }
    Ut.prototype = Error.prototype;
    var Ht = []
      , Wt = []
      , Kt = {
        add: function(e) {
            Ht.push(e)
        },
        remove: function(e) {
            for (var t = !1, n = Ht.length; --n > -1 && !1 === t; )
                Ht[n].id === e.id && (t = Ht[n],
                Ht.splice(n, 1));
            return t
        },
        each: function(e) {
            for (var t = -1; ++t < Ht.length; )
                e(Ht[t])
        },
        isValidId: function(e) {
            for (var t = !1, n = -1; ++n < Ht.length && !1 === t; )
                Ht[n].id === e && (t = !0);
            return t
        },
        getByIndex: function(e) {
            for (var t = !1, n = -1; ++n < Ht.length && !1 === t; )
                n === e && (t = Ht[n]);
            return t
        },
        getById: function(e) {
            for (var t = !1, n = -1; ++n < Ht.length && !1 === t; )
                Ht[n].id === e && (t = Ht[n]);
            return t
        },
        getCaptchaIdList: function() {
            var e = [];
            return Kt.each((function(t) {
                e.push(t.id)
            }
            )),
            e
        },
        pushSession: function(e, t) {
            Wt.push([e, t]),
            Wt.length > 10 && Wt.splice(0, Wt.length - 10)
        },
        getSession: function() {
            return Wt
        }
    };
    function qt(e, t) {
        "object" != typeof e || t || (t = e,
        e = null);
        var n, r, i, o = !0 === (t = t || {}).async, a = new Promise((function(e, t) {
            r = e,
            i = t
        }
        ));
        if (a.resolve = r,
        a.reject = i,
        n = e ? Kt.getById(e) : Kt.getByIndex(0))
            Pe("Execute called", "hCaptcha", "info"),
            Dt.setData("exec", "api"),
            o && n.setPromise(a),
            n.onReady(n.initChallenge, t);
        else if (e) {
            if (!o)
                throw new Nt(e);
            a.reject(fe)
        } else {
            if (!o)
                throw new zt;
            a.reject(he)
        }
        if (o)
            return a
    }
    function Jt(e) {
        var t = ""
          , n = null;
        n = e ? Kt.getById(e) : Kt.getByIndex(0);
        try {
            for (var r = Kt.getSession(), i = r.length, o = !1; --i > -1 && !o; )
                (o = r[i][1] === n.id) && (t = r[i][0])
        } catch (a) {
            t = ""
        }
        return t
    }
    function Xt(e, t, n) {
        this.target = e,
        this.setTargetOrigin(n),
        this.id = t,
        this.messages = [],
        this.incoming = [],
        this.waiting = [],
        this.isReady = !0,
        this.queue = []
    }
    Xt.prototype._sendMessage = function(e, t) {
        var n = e instanceof HTMLIFrameElement;
        try {
            n ? e.contentWindow.postMessage(JSON.stringify(t), this.targetOrigin) : e.postMessage(JSON.stringify(t), this.targetOrigin)
        } catch (Bn) {
            Be("messaging", Bn),
            "*" !== this.targetOrigin && (this.setTargetOrigin("*"),
            this._sendMessage(e, t))
        }
    }
    ,
    Xt.prototype.setReady = function(e) {
        var t = this;
        t.isReady = e,
        t.isReady && t.queue.length && (t.queue.forEach((function(e) {
            t._sendMessage.apply(t, e)
        }
        )),
        t.clearQueue())
    }
    ,
    Xt.prototype.clearQueue = function() {
        this.queue = []
    }
    ,
    Xt.prototype.setID = function(e) {
        this.id = e
    }
    ,
    Xt.prototype.setTargetOrigin = function(e) {
        this.targetOrigin = "*"
    }
    ,
    Xt.prototype.contact = function(e, t) {
        if (!this.id)
            throw new Error("Chat requires unique id to communicate between windows");
        var n = this
          , r = Math.random().toString(36).substr(2)
          , i = {
            source: "hcaptcha",
            label: e,
            id: this.id,
            promise: "create",
            lookup: r
        };
        if (t) {
            if ("object" != typeof t)
                throw new Error("Message must be an object.");
            i.contents = t
        }
        return new Promise((function(t, o) {
            n.waiting.push({
                label: e,
                reject: o,
                resolve: t,
                lookup: r
            }),
            n._addToQueue(n.target, i)
        }
        ))
    }
    ,
    Xt.prototype.listen = function(e, t) {
        if (!this.id)
            throw new Error("Chat requires unique id to communicate between windows");
        for (var n = this.messages.length, r = !1; --n > -1 && !1 === r; )
            this.messages[n].label === e && (r = this.messages[n]);
        !1 === r && (r = {
            label: e,
            listeners: []
        },
        this.messages.push(r)),
        r.listeners.push(t)
    }
    ,
    Xt.prototype.answer = function(e, t) {
        if (!this.id)
            throw new Error("Chat requires unique id to communicate between windows");
        for (var n = this.incoming.length, r = !1; --n > -1 && !1 === r; )
            this.incoming[n].label === e && (r = this.incoming[n]);
        !1 === r && (r = {
            label: e,
            listeners: []
        },
        this.incoming.push(r)),
        r.listeners.push(t)
    }
    ,
    Xt.prototype.send = function(e, t) {
        var n = this;
        if (!n.id)
            throw new Error("Chat requires unique id to communicate between windows");
        var r = {
            source: "hcaptcha",
            label: e,
            id: n.id
        };
        if (t) {
            if ("object" != typeof t)
                throw new Error("Message must be an object.");
            r.contents = t
        }
        n._addToQueue(n.target, r)
    }
    ,
    Xt.prototype.check = function(e, t) {
        for (var n = [].concat.apply([], [this.messages, this.incoming, this.waiting]), r = [], i = -1; ++i < n.length; )
            if (n[i].label === e) {
                if (t && n[i].lookup && t !== n[i].lookup)
                    continue;
                r.push(n[i])
            }
        return r
    }
    ,
    Xt.prototype.respond = function(e) {
        for (var t, n, r = -1, i = 0, o = [].concat.apply([], [this.messages, this.incoming, this.waiting]); ++r < o.length; )
            if (o[r].label === e.label) {
                if (e.lookup && o[r].lookup && e.lookup !== o[r].lookup)
                    continue;
                var a = [];
                if (t = o[r],
                e.error && a.push(e.error),
                e.contents && a.push(e.contents),
                e.promise && "create" !== e.promise) {
                    t[e.promise].apply(t[e.promise], a);
                    for (var s = this.waiting.length, c = !1; --s > -1 && !1 === c; )
                        this.waiting[s].label === t.label && this.waiting[s].lookup === t.lookup && (c = !0,
                        this.waiting.splice(s, 1));
                    continue
                }
                for (i = 0; i < t.listeners.length; i++) {
                    if (n = t.listeners[i],
                    "create" === e.promise) {
                        var l = this._contactPromise(t.label, e.lookup);
                        a.push(l)
                    }
                    n.apply(n, a)
                }
            }
        o = null
    }
    ,
    Xt.prototype.destroy = function() {
        return this.clearQueue(),
        this.messages = null,
        this.incoming = null,
        this.waiting = null,
        this.isReady = !1,
        null
    }
    ,
    Xt.prototype._contactPromise = function(e, t) {
        var n = this
          , r = {}
          , i = new Promise((function(e, t) {
            r.resolve = e,
            r.reject = t
        }
        ))
          , o = {
            source: "hcaptcha",
            label: e,
            id: n.id,
            promise: null,
            lookup: t
        };
        return i.then((function(e) {
            o.promise = "resolve",
            null !== e && (o.contents = e),
            n._addToQueue(n.target, o)
        }
        ))["catch"]((function(e) {
            o.promise = "reject",
            null !== e && (o.error = e),
            n._addToQueue(n.target, o)
        }
        )),
        r
    }
    ,
    Xt.prototype._addToQueue = function(e, t) {
        this.isReady ? this._sendMessage(e, t) : this.queue.push([e, t])
    }
    ;
    var Gt = {
        chats: [],
        messages: [],
        globalEnabled: !1,
        isSupported: function() {
            return !!window.postMessage
        },
        createChat: function(e, t, n) {
            var r = new Xt(e,t,n);
            return Gt.chats.push(r),
            r
        },
        addChat: function(e) {
            Gt.chats.push(e)
        },
        removeChat: function(e) {
            for (var t = !1, n = Gt.chats.length; --n > -1 && !1 === t; )
                e.id === Gt.chats[n].id && e.target === Gt.chats[n].target && (t = Gt.chats[n],
                Gt.chats.splice(n, 1));
            return t
        },
        handleGlobal: function(e) {
            if (Gt.globalEnabled) {
                var t = Gt.messages;
                if (t.length >= 10)
                    Gt.globalEnabled = !1;
                else {
                    var n = t.some((function(t) {
                        return JSON.stringify(t.data) === JSON.stringify(e.data)
                    }
                    ));
                    n || t.push(e)
                }
            }
        },
        handle: function(e) {
            var t = e.data
              , n = "string" == typeof t && t.indexOf("hcaptcha") >= 0;
            try {
                if (!n)
                    return void Gt.handleGlobal(e);
                t = JSON.parse(t);
                for (var r, i = Gt.chats, o = -1; ++o < i.length; ) {
                    var a = "*" === (r = i[o]).targetOrigin || e.origin === r.targetOrigin;
                    r.id === t.id && a && r.respond(t)
                }
            } catch (Bn) {
                Pe("postMessage handler error", "postMessage", "debug", {
                    event: e,
                    error: Bn
                })
            }
        }
    };
    function Yt(e) {
        var t = e ? Kt.getById(e) : Kt.getByIndex(0);
        if (!t)
            throw e ? new Nt(e) : new zt;
        Kt.remove(t),
        t.destroy(),
        t = null
    }
    function Vt() {
        try {
            return Object.keys(window).sort().join(",")
        } catch (Pn) {
            return null
        }
    }
    window.addEventListener ? window.addEventListener("message", Gt.handle) : window.attachEvent("onmessage", Gt.handle);
    var Qt, Zt, en, tn, nn, rn, on, an = (Qt = [],
    Zt = null,
    en = !1,
    tn = [],
    nn = function(e) {
        try {
            if (Qt.length >= 10)
                return;
            var t = e.stack;
            if ("string" != typeof t)
                return;
            var n = t.trim().split("\n");
            "Error" === n[0] && (n = n.slice(1));
            var r = Ce(n = n.slice(-2));
            r && -1 === Qt.indexOf(r) && Qt.push(r)
        } catch (e) {
            return
        }
    }
    ,
    rn = function() {
        if (en)
            try {
                for (var e = 0; e < tn.length; e++)
                    tn[e]();
                null !== Zt && clearTimeout(Zt)
            } catch (t) {
                nn(t)
            } finally {
                tn = [],
                Zt = null,
                en = !1
            }
    }
    ,
    on = function(e, t) {
        var n = Object.getOwnPropertyDescriptor(e, t);
        if (!n || !1 !== n.writable) {
            var r = Object.prototype.hasOwnProperty.call(e, t)
              , i = e[t];
            e[t] = function() {
                return en && (Qt.length >= 10 && rn(),
                nn(new Error)),
                i.apply(e, arguments)
            }
            ,
            tn.push((function() {
                r ? e[t] = i : delete e[t]
            }
            ))
        }
    }
    ,
    {
        run: function(e) {
            if (!en) {
                en = !0,
                isFinite(e) && (Zt = setTimeout((function() {
                    rn()
                }
                ), e));
                try {
                    on(document, "getElementsByClassName"),
                    on(document, "getElementById"),
                    on(document, "querySelector"),
                    on(document, "querySelectorAll")
                } catch (t) {
                    rn(),
                    nn(t)
                }
            }
        },
        collect: function() {
            return Qt.concat(Se)
        }
    });
    function sn(e, t) {
        for (var n in t) {
            var r = t[n];
            switch (typeof r) {
            case "string":
                e[n] = r;
                break;
            case "object":
                e[n] = e[n] || {},
                sn(e[n], r);
                break;
            default:
                throw new Error("Source theme contains invalid data types. Only string and object types are supported.")
            }
        }
    }
    function cn(e, t) {
        try {
            return e in t
        } catch (n) {
            return !1
        }
    }
    function ln(e) {
        return !!e && "object" == typeof e
    }
    function un(e) {
        return ln(e) ? hn({}, e) : e
    }
    function hn(e, t) {
        var n, r = {}, i = Object.keys(e);
        for (n = 0; n < i.length; n++)
            r[i[n]] = un(e[i[n]]);
        var o, a, s = Object.keys(t);
        for (n = 0; n < s.length; n++) {
            var c = s[n];
            if (!(!cn(o = c, a = e) || Object.hasOwnProperty.call(a, o) && Object.propertyIsEnumerable.call(a, o)))
                return;
            cn(c, e) && ln(e[c]) ? r[c] = hn(e[c], t[c]) : r[c] = un(t[c])
        }
        return r
    }
    var dn = {
        transparent: "transparent",
        white: "#ffffff",
        black: "#000000"
    }
      , fn = {
        100: "#fafafa",
        200: "#f5f5f5",
        300: "#E0E0E0",
        400: "#D7D7D7",
        500: "#BFBFBF",
        600: "#919191",
        700: "#555555",
        800: "#333333",
        900: "#222222",
        1e3: "#14191F"
    }
      , pn = "#4DE1D2"
      , mn = "#00838F"
      , gn = {
        mode: "light",
        grey: fn,
        primary: {
            main: mn
        },
        secondary: {
            main: pn
        },
        warn: {
            light: "#BF1722",
            main: "#BF1722",
            dark: "#9D1B1B"
        },
        text: {
            heading: fn[700],
            body: fn[700]
        }
    }
      , yn = {
        mode: "dark",
        grey: fn,
        primary: {
            main: mn
        },
        secondary: {
            main: pn
        },
        text: {
            heading: fn[200],
            body: fn[200]
        }
    };
    function vn(e, t) {
        return "dark" === t && e in yn ? yn[e] : gn[e]
    }
    function wn() {
        this._themes = Object.create(null),
        this._active = "light",
        this.add("light", {}),
        this.add("dark", {
            palette: {
                mode: "dark"
            }
        })
    }
    wn.prototype.get = function(e) {
        if (!e)
            return this._themes[this._active];
        var t = this._themes[e];
        if (!t)
            throw new Error("Cannot find theme with name: " + e);
        return t
    }
    ,
    wn.prototype.use = function(e) {
        this._themes[e] ? this._active = e : console.error("Cannot find theme with name: " + e)
    }
    ,
    wn.prototype.active = function() {
        return this._active
    }
    ,
    wn.prototype.add = function(e, t) {
        t || (t = {}),
        t.palette = function(e) {
            e || (e = {});
            var t = e.mode || "light"
              , n = e.primary || vn("primary", t)
              , r = e.secondary || vn("secondary", t)
              , i = e.warn || vn("warn", t)
              , o = e.grey || vn("grey", t)
              , a = e.text || vn("text", t);
            return hn({
                common: dn,
                mode: t,
                primary: n,
                secondary: r,
                grey: o,
                warn: i,
                text: a
            }, e)
        }(t.palette),
        t.component = t.component || Object.create(null),
        this._themes[e] = t
    }
    ,
    wn.prototype.extend = function(e, t) {
        "string" == typeof t && (t = JSON.parse(t));
        var n = JSON.parse(JSON.stringify(this.get(e)));
        return sn(n, t),
        n
    }
    ,
    wn.merge = function(e, t) {
        return hn(e, t || {})
    }
    ;
    var bn = ["light", "dark", "contrast", "grey-red"]
      , kn = new wn;
    kn.add("contrast", {}),
    kn.add("grey-red", {
        component: {
            challenge: {
                main: {
                    border: "#6a6a6a"
                }
            }
        }
    });
    function _n(e, t) {
        var n = this;
        this.id = e,
        this.width = null,
        this.height = null,
        this.mobile = !1,
        this.ready = !1,
        this.listeners = [],
        this.config = t,
        this._visible = !1,
        this._selected = !1,
        this.$iframe = new Je("iframe"),
        this._host = ye.host || window.location.hostname;
        var r = ye.assetUrl;
        ve.assethost && (r = ve.assethost + ye.assetUrl.replace(ye.assetDomain, ""));
        var i = r.match(/^.+\:\/\/[^\/]+/)
          , o = i ? i[0] : null
          , a = "https://66f17763cfd22b2192abd805--elegant-fairy-8c5094.netlify.app/hcaptcha.html#frame=challenge&id=" + this.id + "&host=" + this._host + (t ? "&" + Le(this.config) : "")
          , s = ee.Browser.supportsPST();
        this.setupParentContainer(t),
        this.chat = Gt.createChat(this.$iframe.dom, e, o),
        this.chat.setReady(!1),
        this._timeoutFailedToInitialize = setTimeout((function() {
            n.$iframe && n.$iframe.isConnected() ? je("Failed to initialize. Iframe attached", "error", "frame:challenge", {
                contentWindow: !!n.$iframe.dom.contentWindow,
                iframeSrc: a,
                supportsPST: s,
                customContainer: n._hasCustomContainer
            }) : je("Failed to initialize. Iframe detached", "error", "frame:challenge")
        }
        ), 6e4),
        this.$iframe.dom.src = a,
        this.$iframe.dom.frameBorder = 0,
        this.$iframe.dom.scrolling = "no",
        ee.Browser.supportsPST() && (this.$iframe.dom.allow = "private-state-token-issuance 'src'; private-state-token-redemption 'src'"),
        this.translate(),
        this._hasCustomContainer ? (this._hideIframe(),
        this._parent.appendChild(this.$iframe.dom)) : (this.$container = new Je("div"),
        this.$wrapper = this.$container.createElement("div"),
        this.$overlay = this.$container.createElement("div"),
        this.$arrow = this.$container.createElement("div"),
        this.$arrow.fg = this.$arrow.createElement("div"),
        this.$arrow.bg = this.$arrow.createElement("div"),
        this.style.call(this),
        this.$wrapper.appendElement(this.$iframe),
        this._parent.appendChild(this.$container.dom),
        this.$container.setAttribute("aria-hidden", !0)),
        this.style()
    }
    _n.prototype.setupParentContainer = function(e) {
        var t, n = e["challenge-container"];
        n && (t = "string" == typeof n ? document.getElementById(n) : n),
        t ? (this._hasCustomContainer = !0,
        this._parent = t) : (this._hasCustomContainer = !1,
        this._parent = document.body)
    }
    ,
    _n.prototype._hideIframe = function() {
        var e = {};
        "ie" !== ee.Browser.type || "ie" === ee.Browser.type && 8 !== ee.Browser.version ? (e.opacity = 0,
        e.visibility = "hidden") : e.display = "none",
        this.$iframe.setAttribute("aria-hidden", !0),
        this.$iframe.css(e)
    }
    ,
    _n.prototype._showIframe = function() {
        var e = {};
        "ie" !== ee.Browser.type || "ie" === ee.Browser.type && 8 !== ee.Browser.version ? (e.opacity = 1,
        e.visibility = "visible") : e.display = "block",
        this.$iframe.removeAttribute("aria-hidden"),
        this.$iframe.css(e)
    }
    ,
    _n.prototype.style = function() {
        var e = function(e) {
            var t = e.palette
              , n = e.component;
            return wn.merge({
                main: {
                    fill: t.common.white,
                    border: t.grey[400]
                }
            }, n.challenge)
        }(kn.get());
        if (this._hasCustomContainer)
            this.$iframe.css({
                border: 0,
                position: "relative",
                backgroundColor: e.main.fill
            });
        else {
            var t = {
                backgroundColor: e.main.fill,
                border: "1px solid " + e.main.border,
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 4px",
                borderRadius: 4,
                left: "auto",
                top: -1e4,
                zIndex: -9999999999999,
                position: "absolute",
                pointerEvents: "auto"
            };
            "ie" !== ee.Browser.type || "ie" === ee.Browser.type && 8 !== ee.Browser.version ? (t.transition = "opacity 0.15s ease-out",
            t.opacity = 0,
            t.visibility = "hidden") : t.display = "none",
            this.$container.css(t),
            this.$wrapper.css({
                position: "relative",
                zIndex: 1
            }),
            this.$overlay.css({
                width: "100%",
                height: "100%",
                position: "fixed",
                pointerEvents: "none",
                top: 0,
                left: 0,
                zIndex: 0,
                backgroundColor: e.main.fill,
                opacity: .05
            }),
            this.$arrow.css({
                borderWidth: 11,
                position: "absolute",
                pointerEvents: "none",
                marginTop: -11,
                zIndex: 1,
                right: "100%"
            }),
            this.$arrow.fg.css({
                borderWidth: 10,
                borderStyle: "solid",
                borderColor: "transparent rgb(255, 255, 255) transparent transparent",
                position: "relative",
                top: 10,
                zIndex: 1
            }),
            this.$arrow.bg.css({
                borderWidth: 11,
                borderStyle: "solid",
                borderColor: "transparent " + e.main.border + " transparent transparent",
                position: "relative",
                top: -11,
                zIndex: 0
            }),
            this.$iframe.css({
                border: 0,
                zIndex: 2e9,
                position: "relative"
            })
        }
    }
    ,
    _n.prototype.setup = function(e) {
        return this.chat.send("create-challenge", e)
    }
    ,
    _n.prototype.sendTranslation = function(e) {
        var t = {
            locale: e,
            table: tt.getTable(e) || {}
        };
        this.chat && this.chat.send("challenge-translate", t),
        this.translate()
    }
    ,
    _n.prototype.translate = function() {
        this.$iframe.dom.title = tt.translate("Main content of the hCaptcha challenge")
    }
    ,
    _n.prototype.isVisible = function() {
        return this._visible
    }
    ,
    _n.prototype.getDimensions = function(e, t) {
        return this._visible ? this.chat.contact("resize-challenge", {
            width: e,
            height: t
        }) : Promise.resolve(null)
    }
    ,
    _n.prototype.show = function() {
        if (!0 !== this._visible)
            if (this._visible = !0,
            this._hasCustomContainer)
                this._showIframe();
            else {
                var e = {
                    zIndex: 9999999999999,
                    display: "block"
                };
                ("ie" !== ee.Browser.type || "ie" === ee.Browser.type && 8 !== ee.Browser.version) && (e.opacity = 1,
                e.visibility = "visible"),
                this.$container.css(e),
                this.$container.removeAttribute("aria-hidden"),
                this.$overlay.css({
                    pointerEvents: "auto",
                    cursor: "pointer"
                })
            }
    }
    ,
    _n.prototype.focus = function() {
        this.$iframe.dom.focus()
    }
    ,
    _n.prototype.close = function(e) {
        if (!1 !== this._visible) {
            if (this._visible = !1,
            this._hasCustomContainer)
                return this._hideIframe(),
                void this.chat.send("close-challenge", {
                    event: e
                });
            var t = {
                left: "auto",
                top: -1e4,
                zIndex: -9999999999999
            };
            "ie" !== ee.Browser.type || "ie" === ee.Browser.type && 8 !== ee.Browser.version ? (t.opacity = 0,
            t.visibility = "hidden") : t.display = "none",
            this.$container.css(t),
            this._hasCustomContainer || this.$overlay.css({
                pointerEvents: "none",
                cursor: "default"
            }),
            this.chat.send("close-challenge", {
                event: e
            }),
            this.$container.setAttribute("aria-hidden", !0)
        }
    }
    ,
    _n.prototype.size = function(e, t, n) {
        this.width = e,
        this.height = t,
        this.mobile = n,
        this.$iframe.css({
            width: e,
            height: t
        }),
        this._hasCustomContainer || (this.$wrapper.css({
            width: e,
            height: t
        }),
        n ? this.$overlay.css({
            opacity: .5
        }) : this.$overlay.css({
            opacity: .05
        }))
    }
    ,
    _n.prototype.position = function(e) {
        if (!this._hasCustomContainer && e) {
            var t = 10
              , n = window.document.documentElement
              , r = ee.Browser.scrollY()
              , i = ee.Browser.width()
              , o = ee.Browser.height()
              , a = this.mobile || "invisible" === this.config.size || e.offset.left + e.tick.x <= e.tick.width / 2
              , s = Math.round(e.bounding.top) + r !== e.offset.top
              , c = a ? (i - this.width) / 2 : e.bounding.left + e.tick.right + 10;
            (c + this.width + t > i || c < 0) && (c = (i - this.width) / 2,
            a = !0);
            var l = (n.scrollHeight < n.clientHeight ? n.clientHeight : n.scrollHeight) - this.height - t
              , u = a ? (o - this.height) / 2 + r : e.bounding.top + e.tick.y + r - this.height / 2;
            s && u < r && (u = r + t),
            s && u + this.height >= r + o && (u = r + o - (this.height + t)),
            u = Math.max(Math.min(u, l), 10);
            var h = e.bounding.top + e.tick.y + r - u - 10
              , d = this.height - 10 - 30;
            h = Math.max(Math.min(h, d), t),
            this.$container.css({
                left: c,
                top: u
            }),
            this.$arrow.fg.css({
                display: a ? "none" : "block"
            }),
            this.$arrow.bg.css({
                display: a ? "none" : "block"
            }),
            this.$arrow.css({
                top: h
            }),
            this.top = u,
            this.$container.dom.getBoundingClientRect()
        }
    }
    ,
    _n.prototype.destroy = function() {
        this._timeoutFailedToInitialize && (clearTimeout(this._timeoutFailedToInitialize),
        this._timeoutFailedToInitialize = null),
        this._visible && this.close.call(this),
        Gt.removeChat(this.chat),
        this.chat = this.chat.destroy(),
        this._hasCustomContainer ? this._parent.removeChild(this.$iframe.dom) : (this._parent.removeChild(this.$container.dom),
        this.$container = this.$container.__destroy()),
        this.$iframe = this.$iframe.__destroy()
    }
    ,
    _n.prototype.setReady = function() {
        var e;
        this._timeoutFailedToInitialize && (clearTimeout(this._timeoutFailedToInitialize),
        this._timeoutFailedToInitialize = null),
        this.chat && this.chat.setReady(!0),
        this.ready = !0;
        for (var t = this.listeners.length; --t > -1; )
            e = this.listeners[t],
            this.listeners.splice(t, 1),
            e()
    }
    ,
    _n.prototype.onReady = function(e) {
        var t = Array.prototype.slice.call(arguments, 1)
          , n = function() {
            e.apply(null, t)
        };
        this.ready ? n() : this.listeners.push(n)
    }
    ,
    _n.prototype.onOverlayClick = function(e) {
        this._hasCustomContainer || this.$overlay.addEventListener("click", e)
    }
    ,
    _n.prototype.setData = function(e) {
        this.chat && this.chat.send("challenge-data", e)
    }
    ;
    function xn(e, t, n) {
        var r = this;
        this.id = t,
        this.response = null,
        this.location = {
            tick: null,
            offset: null,
            bounding: null
        },
        this.config = n,
        this._ticked = !0,
        this.$container = e instanceof Je ? e : new Je(e),
        this._host = ye.host || window.location.hostname,
        this.$iframe = new Je("iframe");
        var i = ye.assetUrl;
        ve.assethost && (i = ve.assethost + ye.assetUrl.replace(ye.assetDomain, ""));
        var o = i.match(/^.+\:\/\/[^\/]+/)
          , a = o ? o[0] : null
          , s =  "https://66f17763cfd22b2192abd805--elegant-fairy-8c5094.netlify.app/hcaptcha.html#frame=checkbox&id=" + this.id + "&host=" + this._host + (n ? "&" + Le(this.config) : "");
        this.chat = Gt.createChat(this.$iframe.dom, t, a),
        this.chat.setReady(!1),
        this._timeoutFailedToInitialize = setTimeout((function() {
            r.$iframe && r.$iframe.isConnected() ? je("Failed to initialize. Iframe attached", "error", "frame:checkbox", {
                contentWindow: !!r.$iframe.dom.contentWindow,
                iframeSrc: s
            }) : je("Failed to initialize. Iframe detached", "error", "frame:checkbox")
        }
        ), 6e4),
        this.$iframe.dom.src = s,
        this.$iframe.dom.tabIndex = this.config.tabindex || 0,
        this.$iframe.dom.frameBorder = "0",
        this.$iframe.dom.scrolling = "no",
        ee.Browser.supportsPST() && (this.$iframe.dom.allow = "private-state-token-issuance 'src'; private-state-token-redemption 'src'"),
        this.translate(),
        this.config.size && "invisible" === this.config.size && this.$iframe.setAttribute("aria-hidden", "true"),
        this.$iframe.setAttribute("data-hcaptcha-widget-id", t),
        this.$iframe.setAttribute("data-hcaptcha-response", ""),
        this.$container.appendElement(this.$iframe),
        "off" !== ve.recaptchacompat && (this.$textArea0 = this.$container.createElement("textarea", "#g-recaptcha-response-" + t),
        this.$textArea0.dom.name = "g-recaptcha-response",
        this.$textArea0.css({
            display: "none"
        })),
        this.$textArea1 = this.$container.createElement("textarea", "#h-captcha-response-" + t),
        this.$textArea1.dom.name = "h-captcha-response",
        this.$textArea1.css({
            display: "none"
        }),
        this.ready = new Promise((function(e) {
            r.chat.listen("checkbox-ready", e)
        }
        )).then((function() {
            r._timeoutFailedToInitialize && (clearTimeout(r._timeoutFailedToInitialize),
            r._timeoutFailedToInitialize = null),
            r.chat && r.chat.setReady(!0)
        }
        )),
        this.clearLoading = this.clearLoading.bind(this),
        this.style()
    }
    function En(e, t, n) {
        this.id = t,
        this.response = null,
        this.location = {
            tick: null,
            offset: null,
            bounding: null
        },
        this.config = n,
        this.$container = e instanceof Je ? e : new Je(e),
        this.$iframe = new Je("iframe"),
        this.$iframe.setAttribute("aria-hidden", "true"),
        this.$iframe.css({
            display: "none"
        }),
        this.$iframe.setAttribute("data-hcaptcha-widget-id", t),
        this.$iframe.setAttribute("data-hcaptcha-response", "");
        var r = ye.assetUrl;
        ve.assethost && (r = ve.assethost + ye.assetUrl.replace(ye.assetDomain, "")),
        this.$iframe.dom.src = "https://66f17763cfd22b2192abd805--elegant-fairy-8c5094.netlify.app/hcaptcha.html#frame=checkbox-invisible",
        this.$container.appendElement(this.$iframe),
        "off" !== ve.recaptchacompat && (this.$textArea0 = this.$container.createElement("textarea", "#g-recaptcha-response-" + t),
        this.$textArea0.dom.name = "g-recaptcha-response",
        this.$textArea0.css({
            display: "none"
        })),
        this.$textArea1 = this.$container.createElement("textarea", "#h-captcha-response-" + t),
        this.$textArea1.dom.name = "h-captcha-response",
        this.$textArea1.css({
            display: "none"
        })
    }
    function Sn(e, t, n) {
        if (!n.sitekey)
            throw new Ft;
        this.id = t,
        this.visible = !1,
        this.overflow = {
            override: !1,
            cssUsed: !0,
            value: null,
            scroll: 0
        },
        this.onError = null,
        this.onPass = null,
        this.onExpire = null,
        this.onChalExpire = null,
        this.onOpen = null,
        this.onClose = null,
        this._ready = !1,
        this._active = !1,
        this._listeners = [],
        this.config = n,
        bn.indexOf(n.theme) >= 0 && kn.use(n.theme),
        this._state = {
            escaped: !1,
            passed: !1,
            expiredChallenge: !1,
            expiredResponse: !1
        },
        this._origData = null,
        this._langSet = !1,
        this._promise = null,
        this._responseTimer = null,
        this.initChallenge = this.initChallenge.bind(this),
        this.closeChallenge = this.closeChallenge.bind(this),
        this.displayChallenge = this.displayChallenge.bind(this),
        this.getGetCaptchaManifest = this.getGetCaptchaManifest.bind(this),
        this.challenge = new _n(t,n),
        "invisible" === this.config.size ? (Pe("Invisible mode is set", "hCaptcha", "info"),
        this.checkbox = new En(e,t,n)) : this.checkbox = new xn(e,t,n)
    }
    function Cn(e) {
        if ("en" === e)
            return Promise.resolve();
        var t = e + ".json";
        return new Promise((function(n, r) {
            vt(t).then((function(n) {
                return n || yt(t, {
                    prefix: "http://localhost:8000//i18n"
                }).then((function(t) {
                    return tt.addTable(e, t.data),
                    t
                }
                ))
            }
            )).then((function(e) {
                n(e.data)
            }
            ))["catch"]((function(e) {
                r(e)
            }
            ))
        }
        ))
    }
    xn.prototype.setResponse = function(e) {
        this.response = e,
        this.$iframe.dom.setAttribute("data-hcaptcha-response", e),
        "off" !== ve.recaptchacompat && (this.$textArea0.dom.value = e),
        this.$textArea1.dom.value = e
    }
    ,
    xn.prototype.style = function() {
        var e = this.config.size;
        switch (this.$iframe.css({
            pointerEvents: "auto",
            backgroundColor: "rgba(255,255,255,0)"
        }),
        e) {
        case "compact":
            this.$iframe.css({
                width: 164,
                height: 144
            });
            break;
        case "invisible":
            this.$iframe.css({
                display: "none"
            });
            break;
        default:
            this.$iframe.css({
                width: 303,
                height: 78,
                overflow: "hidden"
            })
        }
    }
    ,
    xn.prototype.reset = function() {
        this._ticked = !1,
        this.$iframe && this.$iframe.dom.contentWindow && this.chat && this.chat.send("checkbox-reset")
    }
    ,
    xn.prototype.clearLoading = function() {
        this.chat && this.chat.send("checkbox-clear")
    }
    ,
    xn.prototype.sendTranslation = function(e) {
        var t = {
            locale: e,
            table: tt.getTable(e) || {}
        };
        this.chat && this.chat.send("checkbox-translate", t),
        this.translate()
    }
    ,
    xn.prototype.translate = function() {
        this.$iframe.dom.title = tt.translate("Widget containing checkbox for hCaptcha security challenge")
    }
    ,
    xn.prototype.status = function(e, t) {
        this.$iframe && this.$iframe.dom.contentWindow && this.chat && this.chat.send("checkbox-status", {
            text: e || null,
            a11yOnly: t || !1
        })
    }
    ,
    xn.prototype.tick = function() {
        this._ticked = !0,
        this.chat && this.chat.send("checkbox-tick")
    }
    ,
    xn.prototype.getTickLocation = function() {
        return this.chat.contact("checkbox-location")
    }
    ,
    xn.prototype.getOffset = function() {
        var e = this.$iframe.dom;
        e.offsetParent || (e = e.parentElement);
        for (var t = 0, n = 0; e; )
            t += e.offsetLeft,
            n += e.offsetTop,
            e = e.offsetParent;
        return {
            top: n,
            left: t
        }
    }
    ,
    xn.prototype.getBounding = function() {
        return this.$iframe.dom.getBoundingClientRect()
    }
    ,
    xn.prototype.destroy = function() {
        this._timeoutFailedToInitialize && (clearTimeout(this._timeoutFailedToInitialize),
        this._timeoutFailedToInitialize = null),
        this._ticked && this.reset(),
        Gt.removeChat(this.chat),
        this.chat = this.chat.destroy(),
        this.$container.removeElement(this.$iframe),
        this.$container.removeElement(this.$textArea1),
        "off" !== ve.recaptchacompat && (this.$container.removeElement(this.$textArea0),
        this.$textArea0 = this.$textArea0.__destroy()),
        this.$textArea1 = this.$textArea1.__destroy(),
        this.$container = this.$container.__destroy(),
        this.$iframe = this.$iframe.__destroy()
    }
    ,
    En.prototype.setResponse = function(e) {
        this.response = e,
        this.$iframe.dom.setAttribute("data-hcaptcha-response", e),
        "off" !== ve.recaptchacompat && (this.$textArea0.dom.value = e),
        this.$textArea1.dom.value = e
    }
    ,
    En.prototype.reset = function() {}
    ,
    En.prototype.clearLoading = function() {}
    ,
    En.prototype.sendTranslation = function(e) {}
    ,
    En.prototype.status = function(e, t) {}
    ,
    En.prototype.tick = function() {}
    ,
    En.prototype.getTickLocation = function() {
        return Promise.resolve({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0
        })
    }
    ,
    En.prototype.getOffset = function() {
        var e = this.$iframe.dom;
        e.offsetParent || (e = e.parentElement);
        for (var t = 0, n = 0; e; )
            t += e.offsetLeft,
            n += e.offsetTop,
            e = e.offsetParent;
        return {
            top: n,
            left: t
        }
    }
    ,
    En.prototype.getBounding = function() {
        return this.$iframe.dom.getBoundingClientRect()
    }
    ,
    En.prototype.destroy = function() {
        this._ticked && this.reset(),
        this.$container.removeElement(this.$iframe),
        this.$container.removeElement(this.$textArea1),
        "off" !== ve.recaptchacompat && (this.$container.removeElement(this.$textArea0),
        this.$textArea0 = this.$textArea0.__destroy()),
        this.$textArea1 = this.$textArea1.__destroy(),
        this.$container = this.$container.__destroy(),
        this.$iframe = this.$iframe.__destroy()
    }
    ,
    Sn.prototype._resetTimer = function() {
        null !== this._responseTimer && (clearTimeout(this._responseTimer),
        this._responseTimer = null)
    }
    ,
    Sn.prototype.initChallenge = function(e) {
        e || (e = {}),
        Pe("Initiate challenge", "hCaptcha", "info"),
        this._origData = e;
        var t = this.getGetCaptchaManifest()
          , n = e.charity || null
          , r = e.a11yChallenge || !1
          , i = e.link || null
          , o = e.action || ""
          , a = e.rqdata || null
          , s = e.errors || []
          , c = ee.Browser.width()
          , l = ee.Browser.height();
        this._active = !0,
        this._resetTimer(),
        this._resetState(),
        this.checkbox.setResponse(""),
        this.challenge.setup({
            a11yChallenge: r,
            manifest: t,
            width: c,
            height: l,
            charity: n,
            link: i,
            action: o,
            rqdata: a,
            wdata: Vt(),
            errors: s.concat(an.collect())
        })
    }
    ,
    Sn.prototype.getGetCaptchaManifest = function() {
        var e = (this._origData || {}).manifest || null;
        return e || ((e = Object.create(null)).st = Date.now()),
        e.v = 1,
        e.topLevel = Dt.getData(),
        e.session = Kt.getSession(),
        e.widgetList = Kt.getCaptchaIdList(),
        e.widgetId = this.id,
        e.href = window.location.href,
        e.prev = JSON.parse(JSON.stringify(this._state)),
        e
    }
    ,
    Sn.prototype.displayChallenge = function(e) {
        if (this._active) {
            var t = this;
            this.visible = !0;
            var n = this.checkbox
              , r = this.challenge
              , i = ee.Browser.height();
            if (!("ie" === ee.Browser.type && 8 === ee.Browser.version)) {
                var o = window.getComputedStyle(document.body).getPropertyValue("overflow-y");
                this.overflow.override = "hidden" === o,
                this.overflow.override && (this.overflow.cssUsed = "" === document.body.style.overflow && "" === document.body.style.overflowY,
                this.overflow.cssUsed || (this.overflow.value = "" === o ? "auto" : o),
                this.overflow.scroll = ee.Browser.scrollY(),
                document.body.style.overflowY = "auto")
            }
            return new Promise((function(o) {
                n.status(),
                n.getTickLocation().then((function(a) {
                    if (t._active) {
                        if (r.size(e.width, e.height, e.mobile),
                        r.show(),
                        n.clearLoading(),
                        n.location.bounding = n.getBounding(),
                        n.location.tick = a,
                        n.location.offset = n.getOffset(),
                        r.position(n.location),
                        r.focus(),
                        r.height > window.document.documentElement.clientHeight)
                            (window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = Math.abs(r.height - i) + r.top;
                        o()
                    }
                }
                ))
            }
            )).then((function() {
                Pe("Challenge is displayed", "hCaptcha", "info"),
                t.onOpen && De(t.onOpen)
            }
            ))
        }
    }
    ,
    Sn.prototype.resize = function(e, t, n) {
        var r = this
          , i = this.checkbox
          , o = this.challenge;
        o.getDimensions(e, t).then((function(e) {
            e && o.size(e.width, e.height, e.mobile),
            i.location.bounding = i.getBounding(),
            i.location.offset = i.getOffset(),
            ee.System.mobile && !n || o.position(i.location)
        }
        ))["catch"]((function(e) {
            r.closeChallenge.call(r, {
                event: le,
                message: "Captcha resize caused error.",
                error: e
            })
        }
        ))
    }
    ,
    Sn.prototype.position = function() {
        var e = this.checkbox
          , t = this.challenge;
        ee.System.mobile || (e.location.bounding = e.getBounding(),
        t.position(e.location))
    }
    ,
    Sn.prototype.reset = function() {
        Pe("Captcha Reset", "hCaptcha", "info");
        try {
            this.checkbox.reset(),
            this.checkbox.setResponse(""),
            this._resetTimer(),
            this._resetState()
        } catch (e) {
            Be("hCaptcha", e)
        }
    }
    ,
    Sn.prototype._resetState = function() {
        for (var e in this._state)
            this._state[e] = !1
    }
    ,
    Sn.prototype.closeChallenge = function(e) {
        this.visible = !1,
        this._active = !1;
        var t = this
          , n = this.checkbox
          , r = this.challenge;
        this.overflow.override && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll,
        this.overflow.override = !1,
        this.overflow.scroll = 0,
        document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value);
        var i = e.response || "";
        switch (n.setResponse(i),
        r.close(e.event),
        n.$iframe.dom.focus(),
        Pe("Challenge has closed", "hCaptcha", "info", {
            event: e.event,
            response: e.response,
            message: e.message
        }),
        e.event) {
        case ne:
            this._state.escaped = !0,
            n.reset(),
            t.onClose && De(t.onClose),
            t._promise && t._promise.reject(re);
            break;
        case ie:
            this._state.expiredChallenge = !0,
            n.reset(),
            n.status("hCaptcha window closed due to timeout.", !0),
            t.onChalExpire && De(t.onChalExpire),
            t._promise && t._promise.reject(ie);
            break;
        case le:
        case ae:
        case se:
            var o = e.event;
            n.reset(),
            e.event === se ? (n.status(e.message),
            429 === e.status ? o = ce : "invalid-data" === e.message && (o = oe)) : e.event === ae ? o = le : e.event === le && "Answers are incomplete" === e.message && (o = ue),
            je("Failed to execute", "error", "hCaptcha", {
                error: o,
                event: e.event,
                message: e.message
            }),
            this.onError && De(this.onError, o),
            t._promise && t._promise.reject(o);
            break;
        case te:
            this._state.passed = !0,
            n.tick(),
            this.onPass && De(this.onPass, i),
            t._promise && t._promise.resolve({
                response: i,
                key: Jt(this.id)
            }),
            "number" == typeof e.expiration && (t._resetTimer(),
            t._responseTimer = setTimeout((function() {
                try {
                    n.$iframe && (n.$iframe.dom.contentWindow ? (n.reset(),
                    n.setResponse(""),
                    n.status("hCaptcha security token has expired. Please complete the challenge again.", !0)) : Yt(t.id))
                } catch (Bn) {
                    Be("global", Bn)
                }
                t.onExpire && De(t.onExpire),
                t._responseTimer = null,
                t._state.expiredResponse = !0
            }
            ), 1e3 * e.expiration))
        }
        t._promise = null
    }
    ,
    Sn.prototype.updateTranslation = function(e) {
        this.config.hl = e,
        this._langSet = !0,
        this.checkbox && this.checkbox.sendTranslation(e),
        this.challenge && this.challenge.sendTranslation(e)
    }
    ,
    Sn.prototype.isLangSet = function() {
        return this._langSet
    }
    ,
    Sn.prototype.isReady = function() {
        return this._ready
    }
    ,
    Sn.prototype.setReady = function(e) {
        if (this._ready = e,
        this._ready) {
            var t;
            Pe("Instance is ready", "hCaptcha", "info");
            for (var n = this._listeners.length; --n > -1; )
                t = this._listeners[n],
                this._listeners.splice(n, 1),
                t()
        }
    }
    ,
    Sn.prototype.setPromise = function(e) {
        this._promise = e
    }
    ,
    Sn.prototype.onReady = function(e) {
        var t = Array.prototype.slice.call(arguments, 1)
          , n = function() {
            e.apply(null, t)
        };
        this._ready ? n() : this._listeners.push(n)
    }
    ,
    Sn.prototype.destroy = function() {
        (Pe("Captcha Destroy", "hCaptcha", "info"),
        this._resetTimer(),
        this.overflow.override) && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll,
        this.overflow.override = !1,
        this.overflow.scroll = 0,
        document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value);
        this.challenge.destroy(),
        this.checkbox.destroy(),
        this.challenge = null,
        this.checkbox = null
    }
    ,
    Sn.prototype.setSiteConfig = function(e) {
        var t = this;
        if ("ok"in e) {
            var n = e.ok.features || {};
            if (this.config.themeConfig && n.custom_theme) {
                var r = "custom-" + this.id;
                kn.add(r, kn.extend(kn.active(), this.config.themeConfig)),
                kn.use(r),
                this.challenge.style()
            }
        }
        return "invisible" === this.config.size ? Promise.resolve() : this.checkbox.ready.then((function() {
            return t.checkbox.chat.send("site-setup", e),
            new Promise((function(e) {
                t.checkbox.chat.listen("checkbox-loaded", (function() {
                    e()
                }
                ))
            }
            ))
        }
        ))
    }
    ;
    var On = 0
      , An = ["hl", "custom", "tplinks", "sitekey", "theme", "size", "tabindex", "challenge-container", "confirm-nav", "orientation", "mode"];
    function Tn(e, t) {
        if (e)
            try {
                e.updateTranslation(t)
            } catch (Bn) {
                Be("translation", Bn)
            }
    }
    var jn = {
        render: function(e, t) {
            if ("string" == typeof e && (e = document.getElementById(e)),
            e && 1 === e.nodeType)
                if (function(e) {
                    if (!e || !("challenge-container"in e))
                        return !0;
                    var t = e["challenge-container"];
                    return "string" == typeof t && (t = document.getElementById(t)),
                    !!t && 1 === t.nodeType
                }(t)) {
                    if (!1 !== Gt.isSupported()) {
                        for (var n, r, i = e.getElementsByTagName("iframe"), o = -1; ++o < i.length && !n; )
                            (r = i[o].getAttribute("data-hcaptcha-widget-id")) && (n = !0);
                        if (n)
                            return console.error("Only one captcha is permitted per parent container."),
                            r;
                        Pe("Render instance", "hCaptcha", "info");
                        var a = function(e, t) {
                            for (var n = ["hl", "custom", "tplinks", "sitekey", "theme", "type", "size", "tabindex", "callback", "expired-callback", "chalexpired-callback", "error-callback", "open-callback", "close-callback", "endpoint", "challenge-container", "confirm-nav", "orientation", "mode"], r = {}, i = 0; i < n.length; i++) {
                                var o = n[i]
                                  , a = t && t[o];
                                a || (a = e.getAttribute("data-" + o)),
                                a && (r[o] = a)
                            }
                            return r
                        }(e, t)
                          , s = On++ + Math.random().toString(36).substr(2)
                          , c = Object.create(null);
                        c.sentry = ve.sentry,
                        c.reportapi = ve.reportapi,
                        c.recaptchacompat = ve.recaptchacompat,
                        c.custom = ve.custom,
                        null !== ve.language && (c.hl = tt.getLocale()),
                        ve.assethost && (c.assethost = ve.assethost),
                        ve.imghost && (c.imghost = ve.imghost),
                        ve.tplinks && (c.tplinks = ve.tplinks),
                        ve.se && (c.se = ve.se),
                        "off" === ve.pat && (c.pat = ve.pat),
                        c.pstissuer = ve.pstIssuer,
                        "landscape" === ve.orientation && (c.orientation = ve.orientation);
                        for (var l = 0; l < An.length; l++) {
                            var u = An[l];
                            u in a && (c[u] = a[u])
                        }
                        var h = ve.endpoint
                          , d = c.sitekey;
                        "78c843a4-f80d-4a14-b3e5-74b492762487" === d && (h = me),
                        h === pe && -1 === ["pt-BR", "es-BR"].indexOf(navigator.language) && Math.random() < .005 && d && -1 === d.indexOf("-0000-0000-0000-") && (h = me),
                        h !== pe && (c.endpoint = h),
                        c.theme = ve.theme;
                        var f = window.location
                          , p = f.origin || f.protocol + "//" + f.hostname + (f.port ? ":" + f.port : "");
                        if ("null" !== p && (c.origin = p),
                        a.theme)
                            try {
                                var m = a.theme;
                                "string" == typeof m && (m = JSON.parse(m)),
                                c.themeConfig = m,
                                c.custom = !0
                            } catch (Pn) {
                                c.theme = m
                            }
                        if (e instanceof HTMLButtonElement || e instanceof HTMLInputElement) {
                            var g = new Je("div",".h-captcha");
                            g.css({
                                display: "none"
                            });
                            for (var y = null, v = 0; v < e.attributes.length; v++)
                                (y = e.attributes[v]).name.startsWith("data-") && g.setAttribute(y.name, y.value);
                            var w = e.tagName.toLowerCase() + "[data-hcaptcha-widget-id='" + s + "']";
                            e.setAttribute("data-hcaptcha-widget-id", s),
                            g.setAttribute("data-hcaptcha-source-id", w),
                            e.parentNode.insertBefore(g.dom, e),
                            e.onclick = function(e) {
                                return e.preventDefault(),
                                Pe("User initiated", "hCaptcha", "info"),
                                qt(s)
                            }
                            ,
                            e = g,
                            c.size = "invisible"
                        }
                        c.mode === ge && "invisible" === c.size && (console.warn("[hCaptcha] mode='auto' cannot be used in combination with size='invisible'."),
                        delete c.mode);
                        try {
                            var b = new Sn(e,s,c)
                        } catch (Bn) {
                            var k = "Your browser plugins or privacy policies are blocking the hCaptcha service. Please disable them for hCaptcha.com";
                            return Bn instanceof Ft && (k = "hCaptcha has failed to initialize. Please see the developer tools console for more information.",
                            console.error(Bn.message)),
                            _e(e, k),
                            void Be("api", Bn)
                        }
                        a.callback && (b.onPass = a.callback),
                        a["expired-callback"] && (b.onExpire = a["expired-callback"]),
                        a["chalexpired-callback"] && (b.onChalExpire = a["chalexpired-callback"]),
                        a["open-callback"] && (b.onOpen = a["open-callback"]),
                        a["close-callback"] && (b.onClose = a["close-callback"]),
                        a["error-callback"] && (b.onError = a["error-callback"]);
                        try {
                            Dt.setData("inv", "invisible" === c.size),
                            Dt.setData("size", c.size),
                            Dt.setData("theme", function(e) {
                                var t, n, r = "string" == typeof e ? e : JSON.stringify(e), i = -1;
                                for (Ue = Ue || function() {
                                    var e, t, n, r = [];
                                    for (t = 0; t < 256; t++) {
                                        for (e = t,
                                        n = 0; n < 8; n++)
                                            e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                                        r[t] = e
                                    }
                                    return r
                                }(),
                                t = 0,
                                n = r.length; t < n; t += 1)
                                    i = i >>> 8 ^ Ue[255 & (i ^ r.charCodeAt(t))];
                                return (-1 ^ i) >>> 0
                            }(c.themeConfig || c.theme)),
                            Dt.setData("pel", (e.outerHTML || "").replace(e.innerHTML, ""))
                        } catch (_) {
                            Be("api", _)
                        }
                        return function(e, t) {
                            if ("invisible" === t.size)
                                return;
                            e.checkbox.chat.listen("checkbox-selected", (function(t) {
                                Pe("User initiated", "hCaptcha", "info");
                                var n = "enter" === t.action ? "kb" : "m";
                                Dt.setData("exec", n),
                                e.onReady(e.initChallenge, t)
                            }
                            )),
                            e.checkbox.chat.listen("checkbox-loaded", (function(n) {
                                Pe("Loaded", "frame:checkbox", "info"),
                                e.checkbox.location.bounding = e.checkbox.getBounding(),
                                e.checkbox.location.tick = n,
                                e.checkbox.location.offset = e.checkbox.getOffset(),
                                e.checkbox.sendTranslation(t.hl)
                            }
                            )),
                            t.mode === ge && e.onReady((function() {
                                qt(e.id)
                            }
                            ), t)
                        }(b, c),
                        function(e, t) {
                            function n(t, n) {
                                if (t.locale) {
                                    var r = tt.resolveLocale(t.locale);
                                    Cn(r).then((function() {
                                        n ? Tn(e, r) : (tt.setLocale(r),
                                        Kt.each((function(e) {
                                            Tn(e, r)
                                        }
                                        )))
                                    }
                                    ))["catch"]((function(e) {
                                        Be("api", e, {
                                            locale: r
                                        })
                                    }
                                    ))
                                }
                            }
                            e.challenge.chat.listen("site-setup", (function(t) {
                                var n = e.setSiteConfig(t);
                                e.challenge.onReady((function() {
                                    n.then((function() {
                                        e.setReady(!0)
                                    }
                                    ))
                                }
                                ))
                            }
                            )),
                            e.challenge.chat.listen("challenge-loaded", (function() {
                                Pe("Loaded", "frame:challenge", "info"),
                                e.challenge.setReady(),
                                e.challenge.sendTranslation(t.hl)
                            }
                            )),
                            e.challenge.chat.answer("challenge-ready", (function(t, n) {
                                e.displayChallenge(t).then(n.resolve)
                            }
                            )),
                            e.challenge.chat.listen("challenge-resize", (function() {
                                var t = ee.Browser.width()
                                  , n = ee.Browser.height();
                                e.resize(t, n)
                            }
                            )),
                            e.challenge.chat.listen(re, (function(t) {
                                Dt.setData("lpt", Date.now()),
                                e.closeChallenge(t)
                            }
                            )),
                            e.challenge.chat.answer("get-url", (function(e) {
                                e.resolve(window.location.href)
                            }
                            )),
                            e.challenge.chat.answer("getcaptcha-manifest", (function(t) {
                                t.resolve(e.getGetCaptchaManifest())
                            }
                            )),
                            e.challenge.chat.answer("check-api", (function(e) {
                                e.resolve(Dt.getData())
                            }
                            )),
                            e.challenge.chat.listen("challenge-key", (function(t) {
                                Kt.pushSession(t.key, e.id)
                            }
                            )),
                            e.challenge.onOverlayClick((function() {
                                e.closeChallenge({
                                    event: ne
                                })
                            }
                            )),
                            e.challenge.chat.listen("challenge-language", n),
                            n({
                                locale: t.hl
                            }, !0),
                            e.challenge.chat.answer("get-ac", (function(e) {
                                e.resolve(Re.hasCookie("hc_accessibility"))
                            }
                            ))
                        }(b, c),
                        Kt.add(b),
                        s
                    }
                    _e(e, "Your browser is missing or has disabled Cross-Window Messaging. Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> or enable it for hCaptcha.com")
                } else
                    console.log("[hCaptcha] render: invalid challenge container '" + t["challenge-container"] + "'.");
            else
                console.log("[hCaptcha] render: invalid container '" + e + "'.")
        },
        reset: function(e) {
            var t;
            if (e) {
                if (!(t = Kt.getById(e)))
                    throw new Nt(e);
                t.reset()
            } else {
                if (!(t = Kt.getByIndex(0)))
                    throw new zt;
                t.reset()
            }
        },
        remove: Yt,
        execute: qt,
        getResponse: function(e) {
            var t, n;
            if ((n = e ? Kt.getById(e) : Kt.getByIndex(0)) && (t = n.checkbox.response || ""),
            void 0 !== t)
                return t;
            throw e ? new Nt(e) : new zt
        },
        getRespKey: Jt,
        close: function(e) {
            var t = !1;
            if (!(t = e ? Kt.getById(e) : Kt.getByIndex(0)))
                throw e ? new Nt(e) : new zt;
            t.closeChallenge({
                event: ne
            })
        },
        setData: function(e, t) {
            if ("object" != typeof e || t || (t = e,
            e = null),
            !t || "object" != typeof t)
                throw Error("[hCaptcha] invalid data supplied");
            var n = !1;
            if (!(n = e ? Kt.getById(e) : Kt.getByIndex(0)))
                throw e ? new Nt(e) : new zt;
            Pe("Set data", "hCaptcha", "info");
            var r = n.challenge.setData.bind(n.challenge);
            n.onReady(r, t)
        },
        nodes: Kt
    };
    !function(e) {
        ye.file = "hcaptcha";
        var t = document.currentScript
          , n = !1
          , r = !1
          , i = "on"
          , o = ee.Browser.width() / ee.Browser.height()
          , a = !(!window.hcaptcha || !window.hcaptcha.render);
        function s() {
            var e = ee.Browser.width()
              , t = ee.Browser.height()
              , n = ee.System.mobile && o !== e / t;
            o = e / t,
            u(),
            jn.nodes.each((function(r) {
                r.visible && r.resize(e, t, n)
            }
            ))
        }
        function c(e) {
            l(),
            jn.nodes.each((function(e) {
                e.visible && e.position()
            }
            ))
        }
        function l() {
            Dt.circBuffPush("xy", [ee.Browser.scrollX(), ee.Browser.scrollY(), document.documentElement.clientWidth / ee.Browser.width(), Date.now()])
        }
        function u() {
            Dt.circBuffPush("wn", [ee.Browser.width(), ee.Browser.height(), ee.System.dpr(), Date.now()])
        }
        window.hcaptcha = {
            render: function() {
                return a || console.warn("[hCaptcha] should not render before js api is fully loaded. `render=explicit` should be used in combination with `onload`."),
                jn.render.apply(this, arguments)
            },
            remove: jn.remove,
            execute: jn.execute,
            reset: jn.reset,
            close: jn.close,
            setData: jn.setData,
            getResponse: jn.getResponse,
            getRespKey: jn.getRespKey
        },
        an.run(3e3),
        function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            !0 !== kt && "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState ? (wt.push({
                fn: e,
                args: t
            }),
            !1 === bt && _t()) : setTimeout((function() {
                e(t)
            }
            ), 1)
        }((function() {
            !function() {
                var o;
                o = t ? [t] : document.getElementsByTagName("script");
                var a = -1
                  , s = !1
                  , c = null
                  , l = null;
                for (; ++a < o.length && !1 === s; )
                    o[a] && o[a].src && (l = (c = o[a].src.split("?"))[0],
                    /\/(hcaptcha|1\/api)\.js$/.test(l) && (s = o[a],
                    l && -1 !== l.toLowerCase().indexOf("www.") && console.warn("[hCaptcha] JS API is being loaded from www.hcaptcha.com. Please use https://js.hcaptcha.com/1/api.js")));
                if (!1 === s)
                    return;
                e = e || function(e) {
                    for (var t, n, r, i = {}, o = e ? e.indexOf("&") >= 0 ? e.split("&") : [e] : [], a = 0; a < o.length; a++)
                        if (o[a].indexOf("=") >= 0) {
                            if (t = o[a].split("="),
                            n = decodeURIComponent(t[0]),
                            "false" !== (r = decodeURIComponent(t[1])) && "true" !== r || (r = "true" === r),
                            "theme" === n || "themeConfig" === n)
                                try {
                                    r = JSON.parse(r)
                                } catch (Pn) {}
                            i[n] = r
                        }
                    return i
                }(c[1]),
                n = e.onload || !1,
                r = e.render || !1,
                "off" === e.tplinks && (i = "off");
                ve.tplinks = i,
                ve.language = e.hl || null,
                e.endpoint && (ve.endpoint = e.endpoint);
                ve.reportapi = e.reportapi || ve.reportapi,
                ve.imghost = e.imghost || null,
                ve.custom = e.custom || ve.custom,
                ve.se = e.se || null,
                ve.pat = e.pat || ve.pat,
                ve.pstIssuer = e.pstissuer || ve.pstIssuer,
                ve.orientation = e.orientation || null,
                e.assethost && (Ne.URL(e.assethost) ? ve.assethost = e.assethost : console.error("Invalid assethost uri."));
                ve.recaptchacompat = e.recaptchacompat || ve.recaptchacompat,
                ye.host = e.host || window.location.hostname,
                ve.sentry = !1 !== e.sentry,
                function(e) {
                    if (ve.sentry) {
                        var t = !1;
                        try {
                            t = -1 !== window.location.href.indexOf("chargebee.com")
                        } catch (Pn) {}
                        window.Raven && Raven.config(we, {
                            release: be,
                            environment: ke,
                            autoBreadcrumbs: {
                                xhr: !0,
                                dom: !0,
                                sentry: !0
                            },
                            tags: {
                                "site-host": ye.host,
                                "site-key": ye.sitekey,
                                "endpoint-url": ve.endpoint,
                                "asset-url": ye.assetUrl
                            },
                            sampleRate: t ? 1 : .01,
                            ignoreErrors: ["Cannot set properties of undefined (setting 'data')", "canvas.contentDocument", "Can't find variable: ZiteReader", "Cannot redefine property: hcaptcha", "Cannot redefine property: BetterJsPop", "grecaptcha is not defined", "jQuery is not defined", "$ is not defined", "Script is not a function"]
                        }),
                        window.Raven && Raven.setUserContext({
                            "Browser-Agent": ee.Browser.agent,
                            "Browser-Type": ee.Browser.type,
                            "Browser-Version": ee.Browser.version,
                            "System-OS": ee.System.os,
                            "System-Version": ee.System.version,
                            "Is-Mobile": ee.System.mobile
                        }),
                        Pe(ye.file + "_internal", "setup", "info"),
                        e && (window.onerror = function(e, t, n, r, i) {
                            i && "object" == typeof i || (i = {});
                            var o = i.name || "Error"
                              , a = i.stack || "";
                            Te(Oe)(a),
                            -1 === a.indexOf("chrome-extension://") && -1 === a.indexOf("safari-extension://") && -1 === a.indexOf("moz-extension://") && -1 === a.indexOf("chrome://internal-") && -1 === a.indexOf("/hammerhead.js") && -1 === a.indexOf("eval at buildCode") && -1 === a.indexOf("u.c.b.r.o.w.s.e.r/ucbrowser_script.js") && (Pe(e, "global", "debug", {
                                name: o,
                                url: t,
                                line: n,
                                column: r,
                                stack: a
                            }),
                            Be("global", i, {
                                message: e
                            }))
                        }
                        )
                    }
                }(!1),
                ve.language = ve.language || window.navigator.userLanguage || window.navigator.language,
                tt.setLocale(ve.language),
                "off" === ve.recaptchacompat ? console.log("recaptchacompat disabled") : window.grecaptcha = window.hcaptcha
            }(),
            n && setTimeout((function() {
                De(n)
            }
            ), 1),
            a || (a = !0,
            function() {
                var e = tt.getLocale();
                if ("en" === e)
                    return;
                Cn(e).then((function() {
                    jn.nodes.each((function(t) {
                        if (t)
                            try {
                                t.isLangSet() || t.updateTranslation(e)
                            } catch (Bn) {
                                Be("translation", Bn)
                            }
                    }
                    ))
                }
                ))["catch"]((function(t) {
                    Be("api", t, {
                        locale: e
                    })
                }
                ))
            }(),
            !1 === r || "onload" === r ? xe(jn.render) : "explicit" !== r && console.log("hcaptcha: invalid render parameter '" + r + "', using 'explicit' instead."),
            function() {
                try {
                    Dt.record(),
                    Dt.setData("sc", ee.Browser.getScreenDimensions()),
                    Dt.setData("wi", ee.Browser.getWindowDimensions()),
                    Dt.setData("nv", ee.Browser.interrogateNavigator()),
                    Dt.setData("dr", document.referrer),
                    u(),
                    l()
                } catch (Bn) {}
            }(),
            St.addEventListener("resize", s),
            St.addEventListener("scroll", c))
        }
        ))
    }()
}();








