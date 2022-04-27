/*
快手极速版02
===========================
[Script]
cron "0 30 9,10,11,12,13,14,15,16,17,18 * * ?" script-path=kbg_ksjsb_02.js, tag=快手极速版02, enabled=false
*/

const jsname = "快手极速版02",
    $ = new Env("快手极速版02");

class userInfo {
    constructor(str) {
        let tempck = str.match(/(kuaishou.api_st=[\w\-]+)/)[1] + ';';
        this.index = ++userIdx;
        this.cookie = "kpn=NEBULA; kpf=ANDROID_PHONE; did=ANDROID_" + randomString(16) + "; ver=9.10; appver=9.10.40.2474; language=zh-cn; countryCode=CN; sys=ANDROID_5.1; client_key=2ac2a76d; " + tempck;
        this.name = this.index;
        this.valid = false;
        this.bindAlipay = false;
        this.alipay = '';
        this.bindWechat = false;
        this.wechat = '';
    }
    // 查询账户信息
    async getUserInfo() {
        let url = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo";
        let body = '',
            urlObject = populateUrlObject(url, this.cookie, body);

        await httpRequest("get", urlObject);
        let result = httpResult;

        if (!result) {
            return;
        }
        if (result.result == 1) {
            this.valid = true;
            this.name = result.data.userData.nickname;
            this.cashBalance = result.data.totalCash;
            this.coinBalance = result.data.totalCoin;
            this.allCash = result.data.allCash;
            console.log("账号[" + this.name + "]账户余额" + this.cashBalance + '元，' + this.coinBalance + "金币，未审核余额" + Math.floor(parseFloat(this.allCash) - parseFloat(this.cashBalance)) + '元')
        } else {
            console.log("账号[" + this.name + "]查询账户信息失败：" + result.error_msg)
        }
    }
    // 查询账户信息
    async accountOverview() {
        let url = "https://nebula.kuaishou.com/rest/n/nebula/account/overview";

        let body = '',
            urlObject = populateUrlObject(url, this.cookie, body);

        await httpRequest("get", urlObject);
        let result = httpResult;

        if (!result) {
            return;
        }

        if (result.result == 1) {
            this.coinBalance = result.data.coinBalance;
            this.cashBalance = result.data.cashBalance;
            let exchangeCoinState = result.data.exchangeCoinState;

            logAndNotify("账号[" + this.name + "]账户余额" + this.cashBalance + '元，' + this.coinBalance + '金币');

            if (exchangeCoinState == 2) {
                await $.wait(200);
                await this.changeExchangeType(0);
            } 
        } else {
            console.log("账号[" + this.name + "]查询账户信息失败：" + result.error_msg);
        }
    }
}







!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite();
    } else {
        // if (!(await checkEnv())) {
        //     return;
        // }

        console.log("============================");
        console.log("\n============== 登录 ==============");

        for (let user of userList) {
            // await user.getUserInfo();
            await $.wait(500);
        }

        let validUserList = userList.filter(x => x.valid == true);

        if (validUserList.length == 0) {
            return;
        }

        for (let user of validUserList) {
            console.log("\n=========== " + user.name + " ===========");
        }
    }
})().catch( e => $.logErr(e)).finally( () => {$.done()});

async function GetRewrite() {
    if ($request.url.indexOf("appsupport/yoda/biz/info") > -1) {
        let ck = $request.headers.Cookie.match(/(kuaishou.api_st=[\w\-]+)/)[1] + ';';
    
        userCookie ? userCookie.indexOf(ck) == -1 && (userCookie = userCookie + "\n" + ck, $.setdata(userCookie, "ksjsbCookie"), ckList = userCookie.split("\n"), $.msg(jsname + (" 获取第" + ckList.length + "个ck成功: " + ck))) : ($.setdata(ck, "ksjsbCookie"), $.msg(jsname + (" 获取第1个ck成功: " + ck)));
    }
  
    if ($request.url.indexOf("ksapp/client/package/renew") > -1) {
        let _0x302aa3 = $request.url.match(/(kuaishou.api_st=[\w\-]+)/)[1] + ';';
    
        userCookie ? userCookie.indexOf(_0x302aa3) == -1 && (userCookie = userCookie + "\n" + _0x302aa3, $.setdata(userCookie, "ksjsbCookie"), ckList = userCookie.split("\n"), $.msg(jsname + (" 获取第" + ckList.length + "个ck成功: " + _0x302aa3))) : ($.setdata(_0x302aa3, "ksjsbCookie"), $.msg(jsname + (" 获取第1个ck成功: " + _0x302aa3)));
    }
}
  
async function checkEnv() {
    if (userCookie) {
        let splitor = envSplitor[0];

        for (let sp of envSplitor) {
            if (userCookie.indexOf(sp) > -1) {
                splitor = sp;
                break;
            }
        }

        for (let userCookies of userCookie.split(splitor)) {
            userCookies && userList.push(new UserInfo(userCookies));
        }

        userCount = userList.length;
    } else {
        console.log("未找到CK");
        return;
    }

    console.log("共找到" + userCount + "个账号");
    return true;
}

/////////////////////////////////////////////////////////////////
function logAndNotify(str) {
    console.log(str);
    notifyStr += str;
    notifyStr += "\n";
  }


function Env(_0x4b6eb2, _0x34747f) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process["exit"](0);
    
    class _0x49f726 {
        constructor(_0x48fe94) {
        this["env"] = _0x48fe94;
        }
    
        ["send"](_0x43400b, _0x1b0c86 = "GET") {
        _0x43400b = "string" == typeof _0x43400b ? {
            'url': _0x43400b
        } : _0x43400b;
        let _0x2d9941 = this["get"];
        "POST" === _0x1b0c86 && (_0x2d9941 = this["post"]);
        "PUT" === _0x1b0c86 && (_0x2d9941 = this["put"]);
        return new Promise((_0x27553b, _0x176473) => {
            _0x2d9941["call"](this, _0x43400b, (_0x1fd57d, _0x3bceab, _0x5d1243) => {
            _0x1fd57d ? _0x176473(_0x1fd57d) : _0x27553b(_0x3bceab);
            });
        });
        }
    
        ["get"](_0x2b0cee) {
        return this["send"]["call"](this["env"], _0x2b0cee);
        }
    
        ["post"](_0x12851f) {
        return this["send"]["call"](this["env"], _0x12851f, "POST");
        }
    
        ["put"](_0x9c06d7) {
        return this["send"]["call"](this["env"], _0x9c06d7, "PUT");
        }
    
    }
    
    return new class {
        constructor(_0x167672, _0x1402d9) {
        this.name = _0x167672;
        this.http = new _0x49f726(this);
        this.data = null;
        this.dataFile = "box.dat";
        this.logs = [];
        this.isMute = false;
        this.isNeedRewrite = false;
        this.logSeparator = "\n";
        this.startTime = new Date().getTime();
        Object.assign(this, _0x1402d9);
        this.log('', '🔔' + this.name + ", 开始!");
        }
    
        isNode() {
        return "undefined" != typeof module && !!module["exports"];
        }
    
        isQuanX() {
        return "undefined" != typeof $task;
        }
    
        isSurge() {
        return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
        }
    
        isLoon() {
        return "undefined" != typeof $loon;
        }
    
        toObj(_0x3b6a33, _0xc8e66c = null) {
        try {
            return JSON.parse(_0x3b6a33);
        } catch {
            return _0xc8e66c;
        }
        }
    
        toStr (_0xf8bf49, _0x30ae5a = null) {
        try {
            return JSON.stringify(_0xf8bf49);
        } catch {
            return _0x30ae5a;
        }
        }
    
        getjson (_0xdb73df, _0x30312a) {
        let _0x2edbad = _0x30312a;
    
        const _0x3a11c6 = this["getdata"](_0xdb73df);
    
        if (_0x3a11c6) {
            try {
            _0x2edbad = JSON.parse(this["getdata"](_0xdb73df));
            } catch {}
        }
    
        return _0x2edbad;
        }
    
        setjson (_0x4d57bf, _0x268be4) {
        try {
            return this["setdata"](JSON.stringify(_0x4d57bf), _0x268be4);
        } catch {
            return false;
        }
        }
    
        getScript (_0x1d0d91) {
        return new Promise(_0xfc506e => {
            const _0x6d58e0 = {
            "url": _0x1d0d91
            };
            this["get"](_0x6d58e0, (_0x2f61cb, _0x24ccee, _0x9ca367) => _0xfc506e(_0x9ca367));
        });
        }
    
        runScript (_0x40b937, _0x40a644) {
        return new Promise(_0x15fb33 => {
            let _0x2a64cc = this["getdata"]("@chavy_boxjs_userCfgs.httpapi");
    
            _0x2a64cc = _0x2a64cc ? _0x2a64cc["replace"](/\n/g, '')["trim"]() : _0x2a64cc;
    
            let _0x169839 = this["getdata"]("@chavy_boxjs_userCfgs.httpapi_timeout");
    
            _0x169839 = _0x169839 ? 1 * _0x169839 : 20;
            _0x169839 = _0x40a644 && _0x40a644["timeout"] ? _0x40a644["timeout"] : _0x169839;
            const _0x2d74ef = {
            "script_text": _0x40b937,
            "mock_type": "cron",
            "timeout": _0x169839
            };
    
            const [_0x4487ef, _0x2f9ab9] = _0x2a64cc["split"]('@'),
                _0x3bd185 = {
            'url': "http://" + _0x2f9ab9 + "/v1/scripting/evaluate",
            'body': _0x2d74ef,
            'headers': {
                'X-Key': _0x4487ef,
                'Accept': "*/*"
            }
            };
    
            this["post"](_0x3bd185, (_0x4bf530, _0x500f2d, _0x14dc05) => _0x15fb33(_0x14dc05));
        })["catch"](_0x5c3aba => this.logErr(_0x5c3aba));
        }
    
        ["loaddata"]() {
        if (!this["isNode"]()) {
            return {};
        }
    
        {
            this.fs = this.fs ? this.fs : require('fs');
            this.path = this.path ? this.path : require("path");
    
            const _0x1fda07 = this.path["resolve"](this.dataFile),
                _0x38048f = this.path["resolve"](process["cwd"](), this.dataFile),
                _0x4012f4 = this.fs["existsSync"](_0x1fda07),
                _0x270e95 = !_0x4012f4 && this.fs["existsSync"](_0x38048f);
    
            if (!_0x4012f4 && !_0x270e95) {
            return {};
            }
    
            {
            const _0x53b203 = _0x4012f4 ? _0x1fda07 : _0x38048f;
    
            try {
                return JSON.parse(this.fs["readFileSync"](_0x53b203));
            } catch (_0x1f4978) {
                return {};
            }
            }
        }
        }
    
        ["writedata"]() {
        if (this["isNode"]()) {
            this.fs = this.fs ? this.fs : require('fs');
            this.path = this.path ? this.path : require("path");
    
            const _0x262df2 = this.path["resolve"](this.dataFile),
                _0x23866d = this.path["resolve"](process["cwd"](), this.dataFile),
                _0x9d7be7 = this.fs["existsSync"](_0x262df2),
                _0x4c8b58 = !_0x9d7be7 && this.fs["existsSync"](_0x23866d),
                _0xeb1b8a = JSON.stringify(this.data);
    
            _0x9d7be7 ? this.fs["writeFileSync"](_0x262df2, _0xeb1b8a) : _0x4c8b58 ? this.fs["writeFileSync"](_0x23866d, _0xeb1b8a) : this.fs["writeFileSync"](_0x262df2, _0xeb1b8a);
        }
        }
    
        ["lodash_get"](_0xbbd0c0, _0x1026c8, _0x4a3630) {
        const _0x721a99 = _0x1026c8["replace"](/\[(\d+)\]/g, ".$1")["split"]('.');
    
        let _0x35ba80 = _0xbbd0c0;
    
        for (const _0x4bb142 of _0x721a99) if (_0x35ba80 = Object(_0x35ba80)[_0x4bb142], void 0 === _0x35ba80) {
            return _0x4a3630;
        }
    
        return _0x35ba80;
        }
    
        ["lodash_set"](_0x42c265, _0xba4077, _0x38e869) {
        return Object(_0x42c265) !== _0x42c265 ? _0x42c265 : (Array["isArray"](_0xba4077) || (_0xba4077 = _0xba4077["toString"]()["match"](/[^.[\]]+/g) || []), _0xba4077["slice"](0, -1)["reduce"]((_0x2be6ef, _0x50e1c0, _0x2a2cf7) => Object(_0x2be6ef[_0x50e1c0]) === _0x2be6ef[_0x50e1c0] ? _0x2be6ef[_0x50e1c0] : _0x2be6ef[_0x50e1c0] = Math["abs"](_0xba4077[_0x2a2cf7 + 1]) >> 0 == +_0xba4077[_0x2a2cf7 + 1] ? [] : {}, _0x42c265)[_0xba4077[_0xba4077.length - 1]] = _0x38e869, _0x42c265);
        }
    
        ["getdata"](_0x3d93e4) {
        let _0x485fb0 = this["getval"](_0x3d93e4);
    
        if (/^@/["test"](_0x3d93e4)) {
            const [, _0x1216e8, _0x2e7423] = /^@(.*?)\.(.*?)$/["exec"](_0x3d93e4),
                _0x57f9c3 = _0x1216e8 ? this["getval"](_0x1216e8) : '';
    
            if (_0x57f9c3) {
            try {
                const _0x57b6d7 = JSON.parse(_0x57f9c3);
    
                _0x485fb0 = _0x57b6d7 ? this["lodash_get"](_0x57b6d7, _0x2e7423, '') : _0x485fb0;
            } catch (_0x4a9e15) {
                _0x485fb0 = '';
            }
            }
        }
    
        return _0x485fb0;
        }
    
        ["setdata"](_0x3e36ff, _0x3432b1) {
        let _0x145a14 = false;
    
        if (/^@/["test"](_0x3432b1)) {
            const [, _0x57bca6, _0x538f40] = /^@(.*?)\.(.*?)$/["exec"](_0x3432b1),
                _0x596ea5 = this["getval"](_0x57bca6),
                _0x57dda5 = _0x57bca6 ? "null" === _0x596ea5 ? null : _0x596ea5 || '{}' : '{}';
    
            try {
            const _0x249e5d = JSON.parse(_0x57dda5);
    
            this["lodash_set"](_0x249e5d, _0x538f40, _0x3e36ff);
            _0x145a14 = this["setval"](JSON.stringify(_0x249e5d), _0x57bca6);
            } catch (_0x488ce6) {
            const _0x5972fd = {};
            this["lodash_set"](_0x5972fd, _0x538f40, _0x3e36ff);
            _0x145a14 = this["setval"](JSON.stringify(_0x5972fd), _0x57bca6);
            }
        } else {
            _0x145a14 = this["setval"](_0x3e36ff, _0x3432b1);
        }
    
        return _0x145a14;
        }
    
        ["getval"](_0x315247) {
        return this.isSurge() || this.isLoon() ? $persistentStore["read"](_0x315247) : this.isQuanX() ? $prefs["valueForKey"](_0x315247) : this["isNode"]() ? (this.data = this["loaddata"](), this.data[_0x315247]) : this.data && this.data[_0x315247] || null;
        }
    
        ["setval"](_0x33ebd0, _0xef113d) {
        return this.isSurge() || this.isLoon() ? $persistentStore["write"](_0x33ebd0, _0xef113d) : this.isQuanX() ? $prefs["setValueForKey"](_0x33ebd0, _0xef113d) : this["isNode"]() ? (this.data = this["loaddata"](), this.data[_0xef113d] = _0x33ebd0, this["writedata"](), true) : this.data && this.data[_0xef113d] || null;
        }
    
        ["initGotEnv"](_0x340daa) {
        this["got"] = this["got"] ? this["got"] : require("got");
        this["cktough"] = this["cktough"] ? this["cktough"] : require("tough-cookie");
        this["ckjar"] = this["ckjar"] ? this["ckjar"] : new this["cktough"]["CookieJar"]();
        _0x340daa && (_0x340daa["headers"] = _0x340daa["headers"] ? _0x340daa["headers"] : {}, void 0 === _0x340daa["headers"]["Cookie"] && void 0 === _0x340daa["cookieJar"] && (_0x340daa["cookieJar"] = this["ckjar"]));
        }
    
        ["get"](_0x441955, _0x353ce7 = () => {}) {
        const _0x5dc518 = {
            "X-Surge-Skip-Scripting": false
        };
        const _0x56542b = {
            "hints": false
        };
        _0x441955["headers"] && (delete _0x441955["headers"]["Content-Type"], delete _0x441955["headers"]["Content-Length"]);
        this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x441955["headers"] = _0x441955["headers"] || {}, Object.assign(_0x441955["headers"], _0x5dc518)), $httpClient["get"](_0x441955, (_0x220032, _0x2e7980, _0x4431aa) => {
            !_0x220032 && _0x2e7980 && (_0x2e7980["body"] = _0x4431aa, _0x2e7980["statusCode"] = _0x2e7980["status"]);
    
            _0x353ce7(_0x220032, _0x2e7980, _0x4431aa);
        })) : this.isQuanX() ? (this.isNeedRewrite && (_0x441955["opts"] = _0x441955["opts"] || {}, Object.assign(_0x441955["opts"], _0x56542b)), $task["fetch"](_0x441955)["then"](_0x9d6098 => {
            const {
            'statusCode': _0x2ad0f2,
            'statusCode': _0x3c52bd,
            'headers': _0x8225e9,
            'body': _0x5dd875
            } = _0x9d6098,
                _0x800517 = {
            "status": _0x2ad0f2,
            "statusCode": _0x3c52bd,
            "headers": _0x8225e9,
            "body": _0x5dd875
            };
    
            _0x353ce7(null, _0x800517, _0x5dd875);
        }, _0x2288d0 => _0x353ce7(_0x2288d0))) : this["isNode"]() && (this["initGotEnv"](_0x441955), this["got"](_0x441955)['on']("redirect", (_0xb9dd78, _0xca5954) => {
            try {
            if (_0xb9dd78["headers"]["set-cookie"]) {
                const _0x34bcf8 = _0xb9dd78["headers"]["set-cookie"]["map"](this["cktough"]["Cookie"]["parse"])["toString"]();
    
                this["ckjar"]["setCookieSync"](_0x34bcf8, null);
                _0xca5954["cookieJar"] = this["ckjar"];
            }
            } catch (_0x2e0f79) {
            this.logErr(_0x2e0f79);
            }
        })["then"](_0x5c4d6d => {
            const {
            'statusCode': _0x1a65a3,
            'statusCode': _0x2af971,
            'headers': _0x14c5b4,
            'body': _0x12fa57
            } = _0x5c4d6d,
                _0x36cd90 = {
            "status": _0x1a65a3,
            "statusCode": _0x2af971,
            "headers": _0x14c5b4,
            "body": _0x12fa57
            };
    
            _0x353ce7(null, _0x36cd90, _0x12fa57);
        }, _0x198fce => {
            const {
            'message': _0x4705dd,
            'response': _0x32498c
            } = _0x198fce;
    
            _0x353ce7(_0x4705dd, _0x32498c, _0x32498c && _0x32498c["body"]);
        }));
        }
    
        ["post"](_0x359f08, _0x390793 = () => {}) {
        const _0x4c6d64 = {
            "X-Surge-Skip-Scripting": false
        };
        const _0x2577d2 = {
            "hints": false
        };
    
        if (_0x359f08["body"] && _0x359f08["headers"] && !_0x359f08["headers"]["Content-Type"] && (_0x359f08["headers"]["Content-Type"] = "application/x-www-form-urlencoded"), _0x359f08["headers"] && delete _0x359f08["headers"]["Content-Length"], this.isSurge() || this.isLoon()) {
            this.isSurge() && this.isNeedRewrite && (_0x359f08["headers"] = _0x359f08["headers"] || {}, Object.assign(_0x359f08["headers"], _0x4c6d64));
            $httpClient["post"](_0x359f08, (_0x26e956, _0x166fad, _0x20fdfe) => {
            !_0x26e956 && _0x166fad && (_0x166fad["body"] = _0x20fdfe, _0x166fad["statusCode"] = _0x166fad["status"]);
    
            _0x390793(_0x26e956, _0x166fad, _0x20fdfe);
            });
        } else {
            if (this.isQuanX()) {
            _0x359f08["method"] = "POST", this.isNeedRewrite && (_0x359f08["opts"] = _0x359f08["opts"] || {}, Object.assign(_0x359f08["opts"], _0x2577d2)), $task["fetch"](_0x359f08)["then"](_0x5a32e1 => {
                const {
                'statusCode': _0x39fd5b,
                'statusCode': _0x4bbc20,
                'headers': _0x110860,
                'body': _0x4bf295
                } = _0x5a32e1,
                    _0x293e95 = {
                "status": _0x39fd5b,
                "statusCode": _0x4bbc20,
                "headers": _0x110860,
                "body": _0x4bf295
                };
    
                _0x390793(null, _0x293e95, _0x4bf295);
            }, _0x599d7e => _0x390793(_0x599d7e));
            } else {
            if (this["isNode"]()) {
                this["initGotEnv"](_0x359f08);
                const {
                'url': _0x599084,
                ..._0x33a62d
                } = _0x359f08;
                this["got"]["post"](_0x599084, _0x33a62d)["then"](_0x30d6a7 => {
                const {
                    'statusCode': _0x468d4f,
                    'statusCode': _0x36bdbc,
                    'headers': _0x248d9b,
                    'body': _0x552ba9
                } = _0x30d6a7,
                        _0x3cc06a = {
                    "status": _0x468d4f,
                    "statusCode": _0x36bdbc,
                    "headers": _0x248d9b,
                    "body": _0x552ba9
                };
    
                _0x390793(null, _0x3cc06a, _0x552ba9);
                }, _0x37677f => {
                const {
                    'message': _0x1a081a,
                    'response': _0x3bf600
                } = _0x37677f;
    
                _0x390793(_0x1a081a, _0x3bf600, _0x3bf600 && _0x3bf600["body"]);
                });
            }
            }
        }
        }
    
        ["put"](_0x3f0f36, _0x248df5 = () => {}) {
        const _0x59d3b6 = {
            "X-Surge-Skip-Scripting": false
        };
        const _0x3e8d14 = {
            "hints": false
        };
    
        if (_0x3f0f36["body"] && _0x3f0f36["headers"] && !_0x3f0f36["headers"]["Content-Type"] && (_0x3f0f36["headers"]["Content-Type"] = "application/x-www-form-urlencoded"), _0x3f0f36["headers"] && delete _0x3f0f36["headers"]["Content-Length"], this.isSurge() || this.isLoon()) {
            this.isSurge() && this.isNeedRewrite && (_0x3f0f36["headers"] = _0x3f0f36["headers"] || {}, Object.assign(_0x3f0f36["headers"], _0x59d3b6));
            $httpClient["put"](_0x3f0f36, (_0x4958d5, _0x3f8666, _0x5ac468) => {
            !_0x4958d5 && _0x3f8666 && (_0x3f8666["body"] = _0x5ac468, _0x3f8666["statusCode"] = _0x3f8666["status"]);
    
            _0x248df5(_0x4958d5, _0x3f8666, _0x5ac468);
            });
        } else {
            if (this.isQuanX()) {
            _0x3f0f36["method"] = "PUT";
            this.isNeedRewrite && (_0x3f0f36["opts"] = _0x3f0f36["opts"] || {}, Object.assign(_0x3f0f36["opts"], _0x3e8d14));
            $task["fetch"](_0x3f0f36)["then"](_0x4d4378 => {
                const {
                'statusCode': _0x46e0e1,
                'statusCode': _0x22d569,
                'headers': _0x1bc9da,
                'body': _0x2bd834
                } = _0x4d4378,
                    _0x3eb3fc = {
                "status": _0x46e0e1,
                "statusCode": _0x22d569,
                "headers": _0x1bc9da,
                "body": _0x2bd834
                };
    
                _0x248df5(null, _0x3eb3fc, _0x2bd834);
            }, _0x4ddbc5 => _0x248df5(_0x4ddbc5));
            } else {
            if (this["isNode"]()) {
                this["initGotEnv"](_0x3f0f36);
                const {
                'url': _0x92287c,
                ..._0x4d8596
                } = _0x3f0f36;
                this["got"]["put"](_0x92287c, _0x4d8596)["then"](_0x20f821 => {
                const {
                    'statusCode': _0x1104a7,
                    'statusCode': _0x453801,
                    'headers': _0x7cc169,
                    'body': _0x5e2337
                } = _0x20f821,
                        _0xb78fdf = {
                    "status": _0x1104a7,
                    "statusCode": _0x453801,
                    "headers": _0x7cc169,
                    "body": _0x5e2337
                };
    
                _0x248df5(null, _0xb78fdf, _0x5e2337);
                }, _0x570faa => {
                const {
                    'message': _0x108ca0,
                    'response': _0x406f47
                } = _0x570faa;
    
                _0x248df5(_0x108ca0, _0x406f47, _0x406f47 && _0x406f47["body"]);
                });
            }
            }
        }
        }
    
        ["time"](_0x15e74b) {
        let _0x829d67 = {
            'M+': new Date()["getMonth"]() + 1,
            'd+': new Date()["getDate"](),
            'H+': new Date()["getHours"](),
            'm+': new Date()["getMinutes"](),
            's+': new Date()["getSeconds"](),
            'q+': Math["floor"]((new Date()["getMonth"]() + 3) / 3),
            'S': new Date()["getMilliseconds"]()
        };
        /(y+)/["test"](_0x15e74b) && (_0x15e74b = _0x15e74b["replace"](RegExp['$1'], (new Date()["getFullYear"]() + '')["substr"](4 - RegExp['$1'].length)));
    
        for (let _0x485bdf in _0x829d67) new RegExp('(' + _0x485bdf + ')')["test"](_0x15e74b) && (_0x15e74b = _0x15e74b["replace"](RegExp['$1'], 1 == RegExp['$1'].length ? _0x829d67[_0x485bdf] : ('00' + _0x829d67[_0x485bdf])["substr"](('' + _0x829d67[_0x485bdf]).length)));
    
        return _0x15e74b;
        }
    
        ["msg"](_0x5f1003 = _0x4b6eb2, _0x37bdbf = '', _0x113e2a = '', _0x1fa461) {
        const _0x40d392 = _0x995fa5 => {
            if (!_0x995fa5) {
            return _0x995fa5;
            }
    
            if ("string" == typeof _0x995fa5) {
            return this.isLoon() ? _0x995fa5 : this.isQuanX() ? {
                'open-url': _0x995fa5
            } : this.isSurge() ? {
                'url': _0x995fa5
            } : void 0;
            }
    
            if ("object" == typeof _0x995fa5) {
            if (this.isLoon()) {
                let _0x277a10 = _0x995fa5["openUrl"] || _0x995fa5["url"] || _0x995fa5["open-url"],
                    _0x4cc785 = _0x995fa5["mediaUrl"] || _0x995fa5["media-url"];
    
                const _0x20a326 = {
                "openUrl": _0x277a10,
                "mediaUrl": _0x4cc785
                };
                return _0x20a326;
            }
    
            if (this.isQuanX()) {
                let _0x357e9c = _0x995fa5["open-url"] || _0x995fa5["url"] || _0x995fa5["openUrl"],
                    _0x4fb620 = _0x995fa5["media-url"] || _0x995fa5["mediaUrl"];
    
                const _0x592e1c = {
                "open-url": _0x357e9c,
                "media-url": _0x4fb620
                };
                return _0x592e1c;
            }
    
            if (this.isSurge()) {
                let _0x2e3a08 = _0x995fa5["url"] || _0x995fa5["openUrl"] || _0x995fa5["open-url"];
    
                const _0x6d91d4 = {
                "url": _0x2e3a08
                };
                return _0x6d91d4;
            }
            }
        };
    
        this.isMute || (this.isSurge() || this.isLoon() ? $notification["post"](_0x5f1003, _0x37bdbf, _0x113e2a, _0x40d392(_0x1fa461)) : this.isQuanX() && $notify(_0x5f1003, _0x37bdbf, _0x113e2a, _0x40d392(_0x1fa461)));
        let _0x59871a = ['', "==============📣系统通知📣=============="];
    
        _0x59871a.push(_0x5f1003);
    
        _0x37bdbf && _0x59871a.push(_0x37bdbf);
        _0x113e2a && _0x59871a.push(_0x113e2a);
        console.log(_0x59871a["join"]("\n"));
        this.logs = this.logs["concat"](_0x59871a);
        }
    
        log (..._0xe86ee7) {
        _0xe86ee7.length > 0 && (this.logs = [...this.logs, ..._0xe86ee7]);
        console.log(_0xe86ee7["join"](this.logSeparator));
        }
    
        logErr(_0x5bf670, _0x337637) {
        const _0xb33298 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
    
        _0xb33298 ? this.log('', '❗️' + this.name + ", 错误!", _0x5bf670["stack"]) : this.log('', '❗️' + this.name + ", 错误!", _0x5bf670);
        }
    
        ["wait"](_0x2629ff) {
        return new Promise(_0x4f8827 => setTimeout(_0x4f8827, _0x2629ff));
        }
    
        ["done"](_0x1dc5da = {}) {
        const _0x4002a5 = new Date().getTime(),
                _0x66c421 = (_0x4002a5 - this.startTime) / 1000;
    
        this.log('', '🔔' + this.name + ", 结束! 🕛 " + _0x66c421 + " 秒");
        this.log();
        (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x1dc5da);
        }
    
    }(_0x4b6eb2, _0x34747f);
}