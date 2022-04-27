/*
快手极速版-五一提现活动
抓包教程地址：http://cxgc.top/archives/ksjsb
欢迎填我邀请码：791642607
交流群：212796668、681030097
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#快手极速版-五一提现活动
0 5 0 * * * https://github.com/JDWXX/jd_all/blob/master/ks/ksjsb_wytx.js, tag=快手极速版-五一提现活动, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "0 5 0 * * *" script-path=https://github.com/JDWXX/jd_all/blob/master/ks/ksjsb_wytx.js,tag=快手极速版-五一提现活动
===================================Surge================================
快手极速版-五一提现活动 = type=cron,cronexp="0 5 0 * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_all/blob/master/ks/ksjsb_wytx.js
====================================小火箭=============================
快手极速版-五一提现活动 = type=cron,script-path=https://github.com/JDWXX/jd_all/blob/master/ks/ksjsb_wytx.js, cronexpr="0 5 0 * * *", timeout=3600, enable=true
 */
const $ = new Env('快手极速版-五一提现活动');
const jdCookieNode = $.isNode() ? require('./ksCookie.js') : '';
let boostId = $.isNode() ? (process.env.ksjsbBoostId ? process.env.ksjsbBoostId : "") : ($.getdata('ksjsbBoostId') ? $.getdata('ksjsbBoostId') : "") //快手助力码 boostId
var __encode = 'jsjiami.com'
    , _a = {}
    , _0xb483 = ["_decode", "http://www.sojson.com/javascriptobfuscator.html"];
(function (_0xd642x1) {
    _0xd642x1[_0xb483[0]] = _0xb483[1]
})(_a);
let cookiesArr = []
    , cookie = ""
    , message;
const fetch = require("node-fetch");
let cxgc = "195893484";
if ($["isNode"]()) {
    Object["keys"](jdCookieNode)["forEach"]((_0xe804x6) => {
        cookiesArr["push"](jdCookieNode[_0xe804x6])
    });
    if (process["env"]["JD_DEBUG"] && process["env"]["JD_DEBUG"] === "false") {
        console["log"] = () => {}
    }
} else {
    cookiesArr = [$["getdata"]("CookieJD"), $["getdata"]("CookieJD2"), ...jsonParse($["getdata"]("CookiesJD") || "[]")["map"]((_0xe804x6) => {
        return _0xe804x6["cookie"]
    })]["filter"]((_0xe804x6) => {
        return !!_0xe804x6
    })
};
let github = true;

function gettext() {
    return {
        url: `${"https://jdwxx.github.io/jd_job/ksjsb.json"}`
        , timeout: 10000
    }
}
async function getHub() {
    return new Promise((_0xe804xa) => {
        setTimeout(() => {
            $["get"](gettext(), (_0xe804xb, _0xe804xc, _0xe804xd) => {
                try {
                    if (_0xe804xb) {
                        console["log"]("权限查询请求失败");
                        github = false
                    } else {
                        _0xe804xd = JSON["parse"](_0xe804xd);
                        cxgc = _0xe804xd["cxgc"]
                    }
                } catch (e) {
                    github = false;
                    $["logErr"](e, _0xe804xc)
                } finally {
                    _0xe804xa(_0xe804xd)
                }
            })
        })
    })
}

function random(_0xe804xf, _0xe804x10) {
    return Math["floor"](Math["random"]() * (_0xe804x10 - _0xe804xf)) + _0xe804xf
}

function randomString(_0xe804x12 = 12) {
    let _0xe804x13 = "abcdef0123456789"
        , _0xe804x14 = _0xe804x13["length"]
        , _0xe804x15 = "";
    for (let _0xe804x16 = 0; _0xe804x16 < _0xe804x12; _0xe804x16++) {
        _0xe804x15 += _0xe804x13["charAt"](Math["floor"](Math["random"]() * _0xe804x14))
    };
    return _0xe804x15
}!(async () => {
    if (!cookiesArr[0x0]) {
        $["msg"]($["name"], "【提示】请先获取快手账号 ksjsbCookie直接使用抓包工具抓包", "http://cxgc.top/archives/ksjsb", {
            "open-url": "http://cxgc.top/archives/ksjsb"
        });
        return
    };
    await getHub();
    if (!github) {
        console["log"]("异常错误,请稍候重试");
        return
    };
    let _0xe804x17 = "https://special.m.kuaishou.com";
    console["log"]("抓包教程地址：http://cxgc.top/archives/ksjsb");
    console["log"]("感谢大家填我邀请码：791642607，填写了我邀请码的快手个人中心截图问我问题");
    console["log"]("交流群：212796668、681030097、743744614");
    let _0xe804x18 = cxgc["split"]("@");
    for (let _0xe804x16 = 0; _0xe804x16 < cookiesArr["length"]; _0xe804x16++) {
        if (cookiesArr[_0xe804x16]) {
            cookie = cookiesArr[_0xe804x16];
            $["index"] = _0xe804x16 + 1;
            $["isLogin"] = true;
            $["nickName"] = "";
            message = "";
            console["log"](`${"\n******开始【快手账号"}${$["index"]}${"】*********\n"}`);
            let _0xe804x19 = cookie["match"](/(kuaishou.api_st=[\w\-]+)/)[0x1] + ";";
            let _0xe804x1a = "kpn=NEBULA; kpf=ANDROID_PHONE; did=ANDROID_" + randomString(16) + "; ver=10.3; appver=10.3.10.3126; language=zh-cn; countryCode=CN; sys=ANDROID_12; client_key=2ac2a76d; " + _0xe804x19;
            try {
                if (boostId == "") {
                    console["log"](" ======= 获取助力码 ======= ");
                    await fetch(_0xe804x17 + "/rest/wd/ld2022/lm/activity/page", {
                        "headers": {
                            "Host": "special.m.kuaishou.com"
                            , "Connection": "keep-alive"
                            , "User-Agent": $["isNode"]() ? (process["env"]["JD_USER_AGENT"] ? process["env"]["JD_USER_AGENT"] : (require("./USER_AGENTS")["USER_AGENT"])) : ($["getdata"]("JDUA") ? $["getdata"]("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
                            , "content-type": "application/json"
                            , "Accept": "*/*"
                            , "X-Requested-With": "com.kuaishou.nebula"
                            , "Sec-Fetch-Site": "same-origin"
                            , "Sec-Fetch-Mode": "cors"
                            , "Sec-Fetch-Dest": "empty"
                            , "Referer": "https://special.m.kuaishou.com/ld2022/daily-cash/?fid=2679516878&cc=panelPoster&followRefer=151&webview_bgcolor=%23ebfaf5&entry_src=ks_wy_090&shareMethod=PICTURE&kpn=NEBULA&subBiz=MAYDAY_MONEY&shareId=16913781434630&__launch_options__=%7B%22enableLoading%22%3Atrue,%22enableProgress%22%3Afalse,%22defaultLoadingColor%22%3A%22%23006b74%22%7D&shareMode=APP&originShareId=16913781434630&layoutType=4&shareObjectId=195863752&shareUrlOpened=0&hyId=workday-2022-cash&timestamp=1651118426996"
                            , "Accept-Encoding": "gzip, deflate"
                            , "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
                            , "Cookie": _0xe804x1a
                        }
                        , "method": "GET"
                    })["then"]((_0xe804x1c) => {
                        return _0xe804x1c["json"]()
                    })["then"]((_0xe804x1b) => {
                        if (_0xe804x1b["data"] && _0xe804x1b["data"]["boostId"]) {
                            boostId = _0xe804x1b["data"]["boostId"];
                            console["log"](" ======= 获取到助力码 ======= ");
                            console["log"](" boostId = " + boostId);
                            console["log"](" ========================== ");
                            _0xe804x18["push"](boostId);
                            _0xe804x18["push"](boostId);
                            _0xe804x18["push"](boostId);
                            _0xe804x18["push"](boostId)
                        }
                    });
                    await $["wait"](4000);
                    if (boostId == "") {
                        await fetch(_0xe804x17 + "/rest/wd/ld2022/lm/activity/openPacket", {
                            "headers": {
                                "Host": "special.m.kuaishou.com"
                                , "Connection": "keep-alive"
                                , "User-Agent": $["isNode"]() ? (process["env"]["JD_USER_AGENT"] ? process["env"]["JD_USER_AGENT"] : (require("./USER_AGENTS")["USER_AGENT"])) : ($["getdata"]("JDUA") ? $["getdata"]("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
                                , "content-type": "application/json"
                                , "Accept": "*/*"
                                , "X-Requested-With": "com.kuaishou.nebula"
                                , "Sec-Fetch-Site": "same-origin"
                                , "Sec-Fetch-Mode": "cors"
                                , "Sec-Fetch-Dest": "empty"
                                , "Referer": "https://special.m.kuaishou.com/ld2022/daily-cash/?layoutType=4&webview_bgcolor=%23ebfaf5&__launch_options__=%7B%22enableLoading%22%3Atrue,%22enableProgress%22%3Afalse,%22defaultLoadingColor%22%3A%22%23006b74%22%7D&hyId=workday-2022-cash&entry_src=ks_wy_087"
                                , "Accept-Encoding": "gzip, deflate"
                                , "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
                                , "Cookie": _0xe804x1a
                            }
                            , "method": "GET"
                        })["then"]((_0xe804x1c) => {
                            return _0xe804x1c["json"]()
                        })["then"]((_0xe804x1b) => {
                            if (_0xe804x1b["data"] && _0xe804x1b["data"]["boostId"]) {
                                boostId = _0xe804x1b["data"]["boostId"];
                                console["log"](" ======= 获取到助力码 ======= ");
                                console["log"](" boostId = " + boostId);
                                console["log"](" ========================== ");
                                _0xe804x18["push"](boostId);
                                _0xe804x18["push"](boostId);
                                _0xe804x18["push"](boostId);
                                _0xe804x18["push"](boostId)
                            }
                        })
                    }
                };
                let _0xe804x1d = _0xe804x18[random(0, _0xe804x18["length"])];
                if (boostId != "") {
                    console["log"]("去助力 -> " + boostId)
                };
                await $["wait"](4000);
                await fetch(_0xe804x17 + "/rest/wd/ld2022/lm/activity/task/start", {
                    "headers": {
                        "Host": "special.m.kuaishou.com"
                        , "Connection": "keep-alive"
                        , "User-Agent": $["isNode"]() ? (process["env"]["JD_USER_AGENT"] ? process["env"]["JD_USER_AGENT"] : (require("./USER_AGENTS")["USER_AGENT"])) : ($["getdata"]("JDUA") ? $["getdata"]("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
                        , "content-type": "application/json"
                        , "Accept": "*/*"
                        , "X-Requested-With": "com.kuaishou.nebula"
                        , "Sec-Fetch-Site": "same-origin"
                        , "Sec-Fetch-Mode": "cors"
                        , "Sec-Fetch-Dest": "empty"
                        , "Referer": "https://special.m.kuaishou.com/ld2022/daily-cash/?fid=2679516878&cc=panelPoster&followRefer=151&webview_bgcolor=%23ebfaf5&entry_src=ks_wy_090&shareMethod=PICTURE&kpn=NEBULA&subBiz=MAYDAY_MONEY&shareId=16913781434630&__launch_options__=%7B%22enableLoading%22%3Atrue,%22enableProgress%22%3Afalse,%22defaultLoadingColor%22%3A%22%23006b74%22%7D&shareMode=APP&originShareId=16913781434630&layoutType=4&shareObjectId=195863752&shareUrlOpened=0&hyId=workday-2022-cash&timestamp=1651118426996"
                        , "Accept-Encoding": "gzip, deflate"
                        , "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
                        , "Cookie": _0xe804x1a
                    }
                    , "body": "{'taskType':3,'boostId':" + _0xe804x1d + "}"
                    , "method": "POST"
                })["then"]((_0xe804x1c) => {
                    return _0xe804x1c["json"]()
                })["then"]((_0xe804x1b) => {});
                await $["wait"](4000);
                await fetch(_0xe804x17 + "/rest/wd/ld2022/lm/activity/boost", {
                    "headers": {
                        "Host": "special.m.kuaishou.com"
                        , "Connection": "keep-alive"
                        , "User-Agent": $["isNode"]() ? (process["env"]["JD_USER_AGENT"] ? process["env"]["JD_USER_AGENT"] : (require("./USER_AGENTS")["USER_AGENT"])) : ($["getdata"]("JDUA") ? $["getdata"]("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
                        , "content-type": "application/json"
                        , "Accept": "*/*"
                        , "X-Requested-With": "com.kuaishou.nebula"
                        , "Sec-Fetch-Site": "same-origin"
                        , "Sec-Fetch-Mode": "cors"
                        , "Sec-Fetch-Dest": "empty"
                        , "Referer": "https://special.m.kuaishou.com/ld2022/daily-cash/?fid=2679516878&cc=panelPoster&followRefer=151&webview_bgcolor=%23ebfaf5&entry_src=ks_wy_090&shareMethod=PICTURE&kpn=NEBULA&subBiz=MAYDAY_MONEY&shareId=16913781434630&__launch_options__=%7B%22enableLoading%22%3Atrue,%22enableProgress%22%3Afalse,%22defaultLoadingColor%22%3A%22%23006b74%22%7D&shareMode=APP&originShareId=16913781434630&layoutType=4&shareObjectId=195863752&shareUrlOpened=0&hyId=workday-2022-cash&timestamp=1651118426996"
                        , "Accept-Encoding": "gzip, deflate"
                        , "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
                        , "Cookie": _0xe804x1a
                    }
                    , "body": "{'type':3,'boostId':" + _0xe804x1d + "}"
                    , "method": "POST"
                })["then"]((_0xe804x1c) => {
                    return _0xe804x1c["json"]()
                })["then"]((_0xe804x1b) => {
                    if (boostId != "") {
                        console["log"](" ======= 助力结果 ======= ");
                        console["log"](_0xe804x1b)
                    }
                })
            } catch (e) {};
            await $["wait"](2000)
        }
    }
})()["catch"]((_0xe804x12) => {
    $["log"]("", `${"❌ "}${$["name"]}${", 失败! 原因: "}${_0xe804x12}${"!"}`, "")
})["finally"](() => {
    $["done"]()
});
(function (_0xe804x1e, _0xe804x1f, _0xe804x20, _0xe804x21, _0xe804x22, _0xe804x23) {
    _0xe804x23 = "undefined";
    _0xe804x21 = function (_0xe804x24) {
        if (typeof alert !== _0xe804x23) {
            alert(_0xe804x24)
        };
        if (typeof console !== _0xe804x23) {
            console["log"](_0xe804x24)
        }
    };
    _0xe804x20 = function (_0xe804x14, _0xe804x1e) {
        return _0xe804x14 + _0xe804x1e
    };
    _0xe804x22 = _0xe804x20("删除", _0xe804x20(_0xe804x20("版本号，js会定", "期弹窗，"), "还请支持我们的工作"));
    try {
        _0xe804x1e = __encode;
        if (!(typeof _0xe804x1e !== _0xe804x23 && _0xe804x1e === _0xe804x20("jsjia", "mi.com"))) {
            _0xe804x21(_0xe804x22)
        }
    } catch (e) {
        _0xe804x21(_0xe804x22)
    }
})({})

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env)
        .indexOf("GITHUB") > -1 && process.exit(0);
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date)
                .getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                    let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                    i = i ? i.replace(/\n/g, "")
                        .trim() : i;
                    let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                    r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                    const [o, h] = i.split("@"), n = {
                        url: `http://${h}/v1/scripting/evaluate`
                        , body: {
                            script_text: t
                            , mock_type: "cron"
                            , timeout: r
                        }
                        , headers: {
                            "X-Key": o
                            , Accept: "*/*"
                        }
                    };
                    this.post(n, (t, e, i) => s(i))
                })
                .catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile)
                    , e = this.path.resolve(process.cwd(), this.dataFile)
                    , s = this.fs.existsSync(t)
                    , i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile)
                    , e = this.path.resolve(process.cwd(), this.dataFile)
                    , s = this.fs.existsSync(t)
                    , i = !s && this.fs.existsSync(e)
                    , r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1")
                .split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString()
                    .match(/[^.[\]]+/g) || []), e.slice(0, -1)
                .reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })), $task.fetch(t)
                .then(t => {
                    const {
                        statusCode: s
                        , statusCode: i
                        , headers: r
                        , body: o
                    } = t;
                    e(null, {
                        status: s
                        , statusCode: i
                        , headers: r
                        , body: o
                    }, o)
                }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t)
                .on("redirect", (t, e) => {
                    try {
                        if (t.headers["set-cookie"]) {
                            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse)
                                .toString();
                            s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                        }
                    } catch (t) {
                        this.logErr(t)
                    }
                })
                .then(t => {
                    const {
                        statusCode: s
                        , statusCode: i
                        , headers: r
                        , body: o
                    } = t;
                    e(null, {
                        status: s
                        , statusCode: i
                        , headers: r
                        , body: o
                    }, o)
                }, t => {
                    const {
                        message: s
                        , response: i
                    } = t;
                    e(s, i, i && i.body)
                }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })), $task.fetch(t)
                .then(t => {
                    const {
                        statusCode: s
                        , statusCode: i
                        , headers: r
                        , body: o
                    } = t;
                    e(null, {
                        status: s
                        , statusCode: i
                        , headers: r
                        , body: o
                    }, o)
                }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s
                    , ...i
                } = t;
                this.got.post(s, i)
                    .then(t => {
                        const {
                            statusCode: s
                            , statusCode: i
                            , headers: r
                            , body: o
                        } = t;
                        e(null, {
                            status: s
                            , statusCode: i
                            , headers: r
                            , body: o
                        }, o)
                    }, t => {
                        const {
                            message: s
                            , response: i
                        } = t;
                        e(s, i, i && i.body)
                    })
            }
        }
        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1
                , "d+": s.getDate()
                , "H+": s.getHours()
                , "m+": s.getMinutes()
                , "s+": s.getSeconds()
                , "q+": Math.floor((s.getMonth() + 3) / 3)
                , S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "")
                .substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")")
                .test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e])
                    .substr(("" + i[e])
                        .length)));
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"]
                            , s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e
                            , mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl
                            , s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e
                            , "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date)
                .getTime()
                , s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
