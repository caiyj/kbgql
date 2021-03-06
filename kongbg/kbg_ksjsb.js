/*
===========================
[Script]
cron "0 30 9,10,11,12,13,14,15,16,17,18 * * ?" script-path=kbg_ksjsb.js, tag=快手极速版, enabled=false
 */

const jsname = "快手极速版",
    $ = new Env("快手极速版");

let notifyStr = '',
    httpResult,
    envSplitor = ["\n", '@'],
    userCookie = ($.isNode() ? process.env.ksjsbCookie : $.getdata("ksjsbCookie")) || '',
    userList = [],
    ksjsbCash = ($.isNode() ? process.env.ksjsbCash : $.getval("ksjsbCash")) || '',
    ksjsbWithdrawTime = ($.isNode() ? process.env.ksjsbWithdrawTime : $.getval("ksjsbWithdrawTime")) || 15,
    ksjsbAggressive = ($.isNode() ? process.env.ksjsbAggressive : $.getval("ksjsbAggressive")) || 0,
    notifyFlag = ($.isNode() ? process.env.ksjsbNotify : $.getval("ksjsbNotify")) || 1,
    userIdx = 0,
    userCount = 0,
    needRunNum = 12,
    inviteList = [];

const ad1 = {
  'id': 0,
  "name": "广告视频"
};
const ad2 = {
  'id': 49,
  "name": "广告视频"
};
const box = {
  'id': 77,
  "name": "宝箱翻倍视频"
};
const sign = {
  'id': 136,
  "name": "签到翻倍视频1"
};
const unknown1 = {
  'id': 151,
  "name": "未知视频"
};
const ksAdInfo = {
  "ad1": ad1,
  "ad2": ad2,
  "box": box,
  "sign": sign,
  "unknown1": unknown1
};
const taskTypes = {
  'ad': 49,
  "live": 75,
  "luckydraw": 161,
  'gj': 217,
  "invite": 2008
};
const luckdrawNum_161 = {
  "extParams": "56dfe31594b858e69ef613f5e97227fb03493544e59e2b2a726006e2852ec1040cd969d4748c460ecf574cc487214a91f70592aa8b2225630027c39ca2c544027efa65815d1acea23cb503034b12641c",
  "businessId": 161,
  "pageId": 11101,
  "posId": 4683,
  "subPageId": 100013628,
  "name": "获取抽奖次数视频"
};
const luckdrawVideo_161_213 = {
  "extParams": "56dfe31594b858e69ef613f5e97227fbf89856abafca7f90fab063cf60935d6faedb05b76646dc3ece57cd4898d412d86e985a2b510216ad4853603d2992501cea0a08182731fcbf023467cf30ecda80",
  "businessId": 161,
  "pageId": 11101,
  "posId": 4685,
  "subPageId": 100013630,
  "name": "抽奖视频161-213"
};
const luckdrawVideo_161_100 = {
  "extParams": "56dfe31594b858e69ef613f5e97227fb67b973ad1394855c549442d15702f96393178eaeef5635134bb7e4ff97e69218c1f18455baf645dbaef685b7bf30c0914ea53ddcde26b2fa67b888203dab0fd4",
  "businessId": 161,
  "pageId": 11101,
  "posId": 4684,
  "subPageId": 100013629,
  "name": "抽奖视频161-100"
};
const luckdrawVideo_11_213 = {
  "extParams": "56dfe31594b858e69ef613f5e97227fbf89856abafca7f90fab063cf60935d6faedb05b76646dc3ece57cd4898d412d86e985a2b510216ad4853603d2992501cea0a08182731fcbf023467cf30ecda80",
  "businessId": 11,
  "pageId": 11101,
  "posId": 4684,
  "subPageId": 100013629,
  "name": "抽奖视频11-100"
};
const luckdrawVideo_11_100 = {
  "extParams": "56dfe31594b858e69ef613f5e97227fb67b973ad1394855c549442d15702f96393178eaeef5635134bb7e4ff97e69218c1f18455baf645dbaef685b7bf30c0914ea53ddcde26b2fa67b888203dab0fd4",
  "businessId": 11,
  "pageId": 11101,
  "posId": 4684,
  "subPageId": 100013629,
  "name": "抽奖视频11-100"
};
const inviteVideo_2008 = {
  "extParams": "60869a9fd2ab63f5e0b1725d059da31f7d3ed3046658438ee204a153c3bc47189ccf268b22e603b6750780c9647e7a12b3027381e11da27b234311bccfd4a67bb892f889a4020ceae4f4e102cc50c327",
  "businessId": 2008,
  "pageId": 100012068,
  "posId": 6765,
  "subPageId": 100015089,
  "name": "邀请页视频(实际是100金币)"
};
const liveVideo_75 = {
  "extParams": "56dfe31594b858e69ef613f5e97227fbd5f9da00aa5144df8830a5781ae07d7cfaf4d95abc2510c950f99404a9e0bf62f5b5765a867c385685e0570ed76b858a159dacd55e41e4a9813db4e619a8b092",
  "businessId": 75,
  "pageId": 100012068,
  "posId": 6765,
  "subPageId": 100015089,
  "name": "直播任务"
};
const signVideo_168 = {
  "extParams": "56dfe31594b858e69ef613f5e97227fbd5f9da00aa5144df8830a5781ae07d7cfaf4d95abc2510c950f99404a9e0bf62f5b5765a867c385685e0570ed76b858a159dacd55e41e4a9813db4e619a8b092",
  "businessId": 168,
  "pageId": 100012068,
  "posId": 6765,
  "subPageId": 100015089,
  "name": "签到翻倍视频2"
};
const luckydrawInfo = {
  "luckdrawNum_161": luckdrawNum_161,
  "luckdrawVideo_161_213": luckdrawVideo_161_213,
  "luckdrawVideo_161_100": luckdrawVideo_161_100,
  "luckdrawVideo_11_213": luckdrawVideo_11_213,
  "luckdrawVideo_11_100": luckdrawVideo_11_100,
  "inviteVideo_2008": inviteVideo_2008,
  "liveVideo_75": liveVideo_75,
  "signVideo_168": signVideo_168
};

let date = new Date(),
    currentHour = date["getHours"](),
    version = 1.07,
    _0x2e716e = 0,
    jsnameStr = "ksjsb",
    _0x180c0c = "https://127.0.0.1/",
    _0x75eec0 = "https://127.0.0.1/";

class UserInfo {
  constructor(str) {
    let tempck = str["match"](/(kuaishou.api_st=[\w\-]+)/)[1] + ';';

    this.index = ++userIdx;
    this.cookie = "kpn=NEBULA; kpf=ANDROID_PHONE; did=ANDROID_" + randomString(16) + "; ver=9.10; appver=9.10.40.2474; language=zh-cn; countryCode=CN; sys=ANDROID_5.1; client_key=2ac2a76d; " + tempck;
    this.name = this.index;
    this.valid = false;
    this.bindAlipay = false;
    this.alipay = '';
    this.bindWechat = false;
    this.wechat = '';
    this.needSms = false;
    this.hasLuckydraw = true;
    const run49 = {
      "num": 2,
      "needRun": true
    };
    const run75 = {
      "num": 1,
      "needRun": true
    };
    const run161 = {
      "num": 5,
      "needRun": true
    };
    const run217 = {
      "num": 1,
      "needRun": true
    };
    const run2008 = {
      "num": 5,
      "needRun": true
    };
    const taskInfo = {
      '49': run49,
      '75': run75,
      "161": run161,
      "217": run217,
      "2008": run2008
    };
    this.task = taskInfo;
  }

  async getUserInfo() {
    let url = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo",
        body = '';

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result.result == 1 ? (this.valid = true, this.name = result.data.userData.nickname, this.cashBalance = result.data.totalCash, this.coinBalance = result.data.totalCoin, this.allCash = result.data.allCash, console.log("账号[" + this.name + "]账户余额" + this.cashBalance + '元，' + this.coinBalance + "金币，未审核余额" + Math.floor(parseFloat(this.allCash) - parseFloat(this.cashBalance)) + '元')) : console.log("账号[" + this.name + "]查询账户信息失败：" + result.error_msg);
  }

  async setShare() {
    let url = "https://nebula.kuaishou.com/rest/n/nebula/account/withdraw/setShare",
        body = '';

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result.result == 1 ? (console.log("账号[" + this.name + "]准备分享得金币"), await $.wait(200), await this.taskReward(122)) : console.log("账号[" + this.name + "]分享失败：" + result.error_msg);
  }
  // 领取任务奖励
  async taskReward(taskId) {
    let url = "https://nebula.kuaishou.com/rest/n/nebula/daily/report?taskId=" + taskId,
        body = '';

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result.result == 1 ? console.log("账号[" + this.name + "]完成任务[" + taskId + "]成功，获得" + result["data"]["amount"] + '金币') : console.log("账号[" + this.name + "]完成任务[" + taskId + "]失败：" + result["error_msg"]);
  }
  // 获取签到信息
  async getSignInfo() {
    let url = "https://nebula.kuaishou.com/rest/n/nebula/sign/queryPopup",
        body = '';

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result.result == 1 ? (console.log("账号[" + this.name + "]今天" + (result["data"]["nebulaSignInPopup"]["todaySigned"] ? '已' : '未') + '签到'), !result["data"]["nebulaSignInPopup"]["todaySigned"] && (await $.wait(200), await this["doSign"](), await $.wait(200), await this["setShare"]())) : console.log("账号[" + this.name + "]查询签到信息失败：" + result["error_msg"]);
  }
  // 签到
  async doSign() {
    let url = "https://nebula.kuaishou.com/rest/n/nebula/sign/sign?source=activity";

    let body = '',
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    if (result["result"] == 1) {
      console.log("账号[" + this.name + "]签到成功：" + result["data"]["toast"]);
      await $.wait(200);
      await this.ksAdParam(ksAdInfo["sign"]);
      await $.wait(200);
      await this.ksNeoAdParam(luckydrawInfo["signVideo_168"]);
    } else {
      console.log("账号[" + this.name + "]签到失败：" + result["error_msg"]);
    }
  }

  async taskList() {
    console.log('taskList-----')
    let url = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/tasks?addressBookAccessStatus=true&pushNotificationStatus=false",
        body = '';

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;
    console.log('taskList-----result:', result)

    if (!result) {
      return;
    }

    if (result["result"] == 1) {
      console.log("账号[" + this.name + "]任务完成情况：");

      for (let item of result.data.dailyTasks) {
        for (let type in taskTypes) {
          if (item.taskId == taskTypes[type]) {
            let completedStages = parseInt(item.completedStages),
                stages = parseInt(item.stages),
                num = Math.ceil(stages / needRunNum),
                needRun = completedStages < stages;

            const info = {
              "num": num,
              "needRun": needRun
            };
            this.task[item.taskId] = info;
            console.log('【' + item.name + "】 " + completedStages + '/' + stages + '，' + (needRun ? "未完成" : "已完成") + "，每次运行完成" + num + "次任务");
            continue;
          }
        }
      }
    } else {
      console.log("账号[" + this.name + "]查询任务列表失败：" + result.error_msg);
    }
  }
  // 逛街领金币
  async ["ksgj"]() {
    let url = "https://api.e.kuaishou.com/rest/r/reward/task/getActivityReward",
        body = "activityId=148&client_key=ksgjbody",
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result["result"] == 1 ? console.log("账号[" + this.name + "]逛街获得" + result["data"]["amount"] + '金币') : console.log("账号[" + this.name + "]逛街失败：" + result["error_msg"]);
  }

  async ksAdParam(creativeId) {
    // let url = "https://api.e.kuaishou.com/rest/e/v1/reward/ad?kpf=ANDROID_PHONE&kpn=NEBULA";
    // let body = "encData=WlTuzeTU6mGT9525bjJUVnlteAACTXpjgjAw%2BtDz1mbM14iDVHdJY0pKd7s5mx8%2BXMRRi7MCE3BSy1NNxI6bywhQueJl4YV8QDNsCONuMI7m59XX7rycrXz5ZPbObMBFLp23dqIF86Do53AbF3u4Dd2Vsk%2B1BzkhUIjucpA2gZ6g837f5Wz19RFfZ9m0pIuu8qg0EFbwOhyvbnybXJXFHahBNDH%2BfHB3V63CQuUJV6MSpBlFU6%2BDiPwORLmSR81ZkexYHIeTr2KafARSUD896R1uB%2BfUnuLqTxnxGmbUG1YIRWBELKXBD6NS9dBoJCaXUCZdA8Iy%2FXwz95700n4l98a9e0fAsnip7ehHiRCNVs7QSEMghZyZDAVZqj1S2XukcCNfZmusnYLyTk3t8pQlfH1PJqbwlA%2BnHpe%2FN8vnOSP0I1F3ZwXHWaaLL2FT%2FvHzk6Ly4osnC45ugzvyKjRmoJhi%2BQBlnOIV9GGpDBWprlbEmer2RVDv4DRCSPt%2Bfiqd3GyKML6S%2B9iWt26PpIzIORn1DyP0X4QaxZNdYWAd3lfYfTjEPXW%2BLtdcMiEYX%2FSqYWyO6zOZ4iovRzLBLXcxsd2EPoe%2B2U5Jw5tw5YBFb1%2BmsANJX9YqA1i1EE1ZlzBOQaFSudn%2Bwvwo3%2FmCfT1CORmlgfrQvWPbMrFqOlO3iSsDWBa3HqTVD82RbV%2BjRlKSPYu56jOpKvtKUHCy%2Fj3nKQZGmN2Pkdsjss0j2MKACMIwDLbOhYo%2B0pP7hY5%2FJMV0pzH65e%2BmSE2dFmbOeA%2BcR8TNtlDnWCEqDDLkMzZ7%2Bh1xWINvXEMVm453edsfnboaSXY24%2FW8RLYkYPoF%2FcMNalSuBF9X7xIw&sign=5a54eecde4d4ea6113782f7bc107d057094e54271e3c02c2eb795e0944356e7b&cs=false&sig=b5f1438be8043fa13cc0feae4408fdc7&client_key=2ac2a76d&__NS_sig3=03126241d268ea6e1d4b48491c78afa2fb133333575a5442&os=android&__NStokensig=a72ad8f8d36f5797858ea6363d8a39754c7e485a15a8d094cc334d249959edd1&token=Cg9rdWFpc2hvdS5hcGkuc3QSoAGJnMSOANoNbM6ND_OdEzBSJT4dCPjOk56DU5u5eK0bhKo1g4aIZ54x3Gd6DvRjA1Jc_CYqAnTdqHez5240vfyWqpMYv7neRWKjUx2DoZzjyFP65DNbluF2-8xcCPwAtUFH9l9xuSxRukRU7MJZS8JCZbdWZkiTtn7XwYgX9pP3OFrjlduNj2UhLZqyb1LTLoA5bbBAyelqOUJWgrv5kx0fGhLZe8NH31JEM6ppJzAS6A8iBVUiIDZhUfY1IjzcFcyxDdAHsjSY7hQCepATcGWmABMlxirPKAUwAQ",
    let url = "https://api.e.kuaishou.com/rest/r/ad/nebula/reward";
    let body = `bizStr={"endTime":1651647435882,"eventValue":-1,"rewardList":[{"creativeId":${creativeId},"extInfo":"","llsid":2005174133101892900,"taskType":1}],"startTime":1651647362215,"taskId":77}`,
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result["result"] == 1 ? result["impAdInfo"] && result["impAdInfo"]["length"] > 0 && result["impAdInfo"][0]["adInfo"] && result["impAdInfo"][0]["adInfo"]["length"] > 0 && result["impAdInfo"][0]["adInfo"][0]["adBaseInfo"] && (await $.wait(200), await this["ksAdReward"](result["llsid"], result["impAdInfo"][0]["adInfo"][0]["adBaseInfo"]["creativeId"], creativeId)) : console.log("账号[" + this.name + "]获取" + creativeId["name"] + "参数失败：" + result["error_msg"]);
  }

  async ksAdReward(llsid, creativeId, info) {
    let endTime = new Date().getTime();

    let randomTime = Math.floor(Math.random() * 30000) + 45000;

    let startTime = endTime - randomTime,
        url = "https://api.e.kuaishou.com/rest/r/ad/nebula/reward";

    let body = "bizStr={\"endTime\":" + endTime + ",\"eventValue\":-1,\"rewardList\":[{\"creativeId\":" + creativeId + ",\"extInfo\":\"\",\"llsid\":" + llsid + ",\"taskType\":1}],\"startTime\":" + startTime + ",\"taskId\":" + info['id'] + '}',
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result["result"] == 1 ? console.log("账号[" + this.name + ']看' + info.name + '获得' + result["data"]["awardAmount"] + '金币') : console.log("账号[" + this.name + ']看' + info.name + "失败：" + result["error_msg"]);
  }

  // 开宝箱
  async openBox(flag) {
    let url = "https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=" + flag + "&isReadyOfAdPlay=true";

    let body = '',
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result["result"] == 1 ? flag == true ? result["data"]["commonAwardPopup"] && result["data"]["commonAwardPopup"]["awardAmount"] ? (console.log("账号[" + this.name + "]开宝箱获得" + result["data"]["commonAwardPopup"]["awardAmount"] + '金币'), await $.wait(200), await this.ksAdParam(ksAdInfo["box"])) : console.log("账号[" + this.name + "]开宝箱没有获得金币") : result["data"]["openTime"] > -1 ? (console.log("账号[" + this.name + "]开宝箱冷却时间还有" + Math["floor"](result["data"]["openTime"] / 1000) + '秒'), result["data"]["openTime"] == 0 && (await $.wait(200), await this["openBox"](true))) : console.log("账号[" + this.name + "]开宝箱次数已用完") : flag == true ? console.log("账号[" + this.name + "]开宝箱失败：" + result["error_msg"]) : console.log("账号[" + this.name + "]查询宝箱状态失败：" + result["error_msg"]);
  }
  // 提现
  async withdraw(money) {
    if (!this.bindAlipay && !this.bindWechat) {
      logAndNotify("账号[" + this.name + "]未绑定提现账号，不执行提现");

      return;
    }

    let parseMoney = parseInt(money * 100),
        provider = this.bindAlipay ? "ALIPAY" : "WECHAT",
        providerName = provider == "ALIPAY" ? "支付宝" : '微信',
        payType = provider == "ALIPAY" ? this.alipay : this.wechat,
        url = "https://www.kuaishoupay.com/pay/account/h5/withdraw/apply",
        body = "account_group_key=NEBULA_CASH_ACCOUNT&mobile_code=&fen=" + parseMoney + "&provider=" + provider + "&total_fen=" + parseMoney + "&commission_fen=0&third_account=" + provider + "&attach=&biz_content=&session_id=",
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result["result"] == "SUCCESS" ? logAndNotify('账号' + this.index + '[' + this.name + "]提现" + money + '元到' + providerName + '[' + payType + "]成功") : logAndNotify('账号' + this.index + '[' + this.name + "]提现" + money + '元到' + providerName + '[' + payType + "]失败：" + result["msg"]);
  }

  async withdrawOverview() {
    let url = "https://nebula.kuaishou.com/rest/n/nebula/outside/withdraw/overview?appver=10.2.20.2021";

    let body = '',
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    if (result["result"] == 1) {
      if (result["data"]["isLimit"] == true) {
        console.log("账号[" + this.name + "]今天已提现");
        return;
      }

      let cashBalance = parseFloat(this["cashBalance"]);

      if (ksjsbAggressive == 1) {
        if (cashBalance < 0.3) {
          logAndNotify("账号[" + this.name + "]余额不足0.3元，不提现");
        } else {
          let maxCashBalance = Math["floor"](cashBalance * 10) / 10;

          maxCashBalance = maxCashBalance > 50 ? 50 : maxCashBalance;

          logAndNotify("账号[" + this.name + "]准备最大化提现" + maxCashBalance + '元');

          await $.wait(200);
          await this["withdraw"](maxCashBalance);
        }
      } else {
        if (!ksjsbCash) {
          for (let item of result["data"]["enWithdrawList"]["sort"](function (a, b) {
            return b - a;
          })) {
            if (cashBalance >= parseFloat(item)) {
              logAndNotify("账号[" + this.name + "]准备提现" + item + '元');

              await $.wait(200);
              await this["withdraw"](item);
              return;
            }
          }

          logAndNotify("账号[" + this.name + "]余额不足，可提现额度：" + result["data"]["enWithdrawList"]["join"](','));
        } else {
          cashBalance >= parseFloat(ksjsbCash) ? (logAndNotify("账号[" + this.name + "]准备提现" + ksjsbCash + '元'), await $.wait(200), await this["withdraw"](ksjsbCash)) : logAndNotify("账号[" + this.name + "]余额不足" + ksjsbCash + "元，不提现");
        }
      }
    } else {
      console.log("账号[" + this.name + "]查询提现列表失败：" + result["error_msg"]);
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

    if (result["result"] == 1) {
      this["coinBalance"] = result["data"]["coinBalance"];
      this["cashBalance"] = result["data"]["cashBalance"];
      let exchangeCoinState = result["data"]["exchangeCoinState"];

      logAndNotify("账号[" + this.name + "]账户余额" + this["cashBalance"] + '元，' + this["coinBalance"] + '金币');

      exchangeCoinState == 2 && (await $.wait(200), await this["changeExchangeType"](0));
    } else {
      console.log("账号[" + this.name + "]查询账户信息失败：" + result["error_msg"]);
    }
  }

  async changeExchangeType(type) {
    let url = "https://nebula.kuaishou.com/rest/n/nebula/exchange/changeExchangeType",
        body = "{\"type\":" + type + '}',
        urlObject = populateUrlObject(url, this.cookie, body);

    urlObject.headers["Content-Type"] = "application/json";
    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    let exchangeType = type == 0 ? "自动兑换" : "手动兑换";

    result["result"] == 1 ? console.log("账号[" + this.name + "]兑换方式更改成功，目前兑换方式为：" + exchangeType) : console.log("账号[" + this.name + "]兑换方式更改失败：" + result["error_msg"]);
  }

  async ["exchangeCoin"]() {
    if (this["coinBalance"] < 100) {
      console.log("账号[" + this.name + "]金币余额不足100，不执行兑换");
      return;
    }

    let url = "https://nebula.kuaishou.com/rest/n/nebula/exchange/coinToCash/submit";

    let body = "{\"coinAmount\":" + this["coinBalance"] + ",\"token\":\"rE2zK-Cmc82uOzxMJW7LI2-wTGcKMqqAHE0PhfN0U4bJY4cAM5Inxw\"}",
        urlObject = populateUrlObject(url, this.cookie, body);

    urlObject["headers"]["Content-Type"] = "application/json";
    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    if (result["result"] == 1) {
      let _0x1856d5 = Math["floor"](this["coinBalance"] / 100) * 100,
          _0x5af9a1 = Math["floor"](this["coinBalance"] / 100) / 100;

      console.log("账号[" + this.name + "]兑换金币成功，将" + _0x1856d5 + "金币兑换成" + _0x5af9a1 + '元');
    } else {
      console.log("账号[" + this.name + "]兑换金币失败：" + result["error_msg"]);
    }
  }

  async ksNeoAdParam(taskInfo) {
    let url = "https://api2.e.kuaishou.com/rest/e/v1/reward/ad?kpf=ANDROID_PHONE&kpn=NEBULA";
    let body = "encData=WlTuzeTU6mGT9525bjJUVnlteAACTXpjgjAw%2BtDz1mbM14iDVHdJY0pKd7s5mx8%2BXMRRi7MCE3BSy1NNxI6bywhQueJl4YV8QDNsCONuMI7m59XX7rycrXz5ZPbObMBFLp23dqIF86Do53AbF3u4Dd2Vsk%2B1BzkhUIjucpA2gZ6g837f5Wz19RFfZ9m0pIuu8qg0EFbwOhyvbnybXJXFHahBNDH%2BfHB3V63CQuUJV6MSpBlFU6%2BDiPwORLmSR81ZkexYHIeTr2KafARSUD896R1uB%2BfUnuLqTxnxGmbUG1YIRWBELKXBD6NS9dBoJCaXUCZdA8Iy%2FXwz95700n4l98a9e0fAsnip7ehHiRCNVs7QSEMghZyZDAVZqj1S2XukcCNfZmusnYLyTk3t8pQlfH1PJqbwlA%2BnHpe%2FN8vnOSP0I1F3ZwXHWaaLL2FT%2FvHzk6Ly4osnC45ugzvyKjRmoJhi%2BQBlnOIV9GGpDBWprlbEmer2RVDv4DRCSPt%2Bfiqd3GyKML6S%2B9iWt26PpIzIORn1DyP0X4QaxZNdYWAd3lfYfTjEPXW%2BLtdcMiEYX%2FSqYWyO6zOZ4iovRzLBLXcxsd2EPoe%2B2U5Jw5tw5YBFb1%2BmsANJX9YqA1i1EE1ZlzBOQaFSudn%2Bwvwo3%2FmCfT1CORmlgfrQvWPbMrFqOlO3iSsDWBa3HqTVD82RbV%2BjRlKSPYu56jOpKvtKUHCy%2Fj3nKQZGmN2Pkdsjss0j2MKACMIwDLbOhYo%2B0pP7hY5%2FJMV0pzH65e%2BmSE2dFmbOeA%2BcR8TNtlDnWCEqDDLkMzZ7%2Bh1xWINvXEMVm453edsfnboaSXY24%2FW8RLYkYPoF%2FcMNalSuBF9X7xIw&sign=5a54eecde4d4ea6113782f7bc107d057094e54271e3c02c2eb795e0944356e7b&cs=false&sig=b5f1438be8043fa13cc0feae4408fdc7&client_key=2ac2a76d&__NS_sig3=03126241d268ea6e1d4b48491c78afa2fb133333575a5442&os=android&__NStokensig=a72ad8f8d36f5797858ea6363d8a39754c7e485a15a8d094cc334d249959edd1&token=Cg9rdWFpc2hvdS5hcGkuc3QSoAGJnMSOANoNbM6ND_OdEzBSJT4dCPjOk56DU5u5eK0bhKo1g4aIZ54x3Gd6DvRjA1Jc_CYqAnTdqHez5240vfyWqpMYv7neRWKjUx2DoZzjyFP65DNbluF2-8xcCPwAtUFH9l9xuSxRukRU7MJZS8JCZbdWZkiTtn7XwYgX9pP3OFrjlduNj2UhLZqyb1LTLoA5bbBAyelqOUJWgrv5kx0fGhLZe8NH31JEM6ppJzAS6A8iBVUiIDZhUfY1IjzcFcyxDdAHsjSY7hQCepATcGWmABMlxirPKAUwAQ";

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    console.log('ksNeoAdParam', taskInfo, result)

    if (!result) {
      console.log(`${taskInfo.name}运行结果：失败。原因：${result.error_msg}\n`)
      return;
    }

    result["result"] == 1 ? result["impAdInfo"] && result["impAdInfo"]["length"] > 0 && result["impAdInfo"][0]["adInfo"] && result["impAdInfo"][0]["adInfo"]["length"] > 0 && result["impAdInfo"][0]["adInfo"][0]["adBaseInfo"] && (await $.wait(200), await this["ksNeoAdReward"](result["llsid"], result["impAdInfo"][0]["adInfo"][0]["adBaseInfo"]["creativeId"], taskInfo)) : console.log("账号[" + this.name + "]获取" + taskInfo["name"] + "参数失败：" + result["error_msg"]);
  }

  async ksNeoAdReward(llsid, creativeId, info) {
    let endTime = new Date().getTime(),
        randomTime = Math["floor"](Math["random"]() * 30000) + 45000,
        startTime = endTime - randomTime;

    let url = "https://api.e.kuaishou.com/rest/r/ad/task/report",
        body = "bizStr={\"businessId\":" + info["businessId"] + ",\"endTime\":" + endTime + ",\"extParams\":\"" + info["extParams"] + "\",\"mediaScene\":\"video\",\"neoInfos\":[{\"creativeId\":" + creativeId + ",\"extInfo\":\"\",\"llsid\":" + llsid + ",\"taskType\":1}],\"pageId\":" + info["pageId"] + ",\"posId\":" + info["posId"] + ",\"startTime\":" + startTime + ",\"subPageId\":" + info["subPageId"] + '}',
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    if (result["result"] == 1) {
      let neoAmount = result["data"]["neoAmount"] + '金币';

      if (result["data"]["neoToH5Data"]) {
        try {
          let neoToH5Data = JSON.parse(Base64["decode"](result["data"]["neoToH5Data"])["replace"](/\0/g, ''));

          neoToH5Data["extraCoin"] && (neoAmount += '+' + neoToH5Data["extraCoin"] + '金币');
        } catch (e) {
          console.log(result["data"]["neoToH5Data"]);
        } finally {}
      }

      console.log("账号[" + this.name + ']看' + info["name"] + '获得' + neoAmount);

      if (this.hasLuckydraw) {
        await this["luckdrawTasks"]();
      }
    } else {
      console.log("账号[" + this.name + ']看' + info["name"] + "失败：" + result["error_msg"]);
    }
  }

  async luckdrawInfo() {
    let url = "https://activity.e.kuaishou.com/rest/r/game/user/info",
        body = '';

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    if (result["result"] == 1) {
      console.log("账号[" + this.name + "]现有" + result["data"]["userDiamondResult"]["diamondPercent"] + "钻石，剩余抽奖次数：" + result["data"]["userDailyLotteryTimesResult"]["remainTimes"]);

      for (let i = 0; i < result["data"]["userDailyLotteryTimesResult"]["remainTimes"]; i++) {
        await $.wait(200);
        await this["luckydraw"]();
      }
    } else {
      console.log("账号[" + this.name + "]查询抽奖次数失败：" + result["error_msg"]);
    }
  }

  async luckydraw() {
    let url = "https://activity.e.kuaishou.com/rest/r/game/lottery?wheelVersion=1";

    let body = '',
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    if (result["result"] == 1) {
      let coinCount = result["data"]["coinCount"] ? result["data"]["coinCount"] + '金币' : result["data"]["diamondCount"] ? result["data"]["diamondCount"] + '钻石' : '空气';

      console.log("账号[" + this.name + "]抽奖获得" + coinCount);

      if (result["data"]["videoCoinCount"]) {
        console.log("额外奖励：" + result["data"]["videoCoinCount"]);
      }

      if (result["data"]["schema"]) {
        try {
          console.log(Base64["decode"](result["data"]["schema"]));
        } catch (_0x54d9d8) {
          console.log(result["data"]["schema"]);
        } finally {}
      }

      this.hasLuckydraw && (await this["luckdrawTasks"]());
    } else {
      console.log("账号[" + this.name + "]抽奖失败：" + result["error_msg"]);
    }
  }
  // 抽奖页签到成功
  async luckydrawSign() {
    let url = "https://activity.e.kuaishou.com/rest/r/game/sign-in";

    let body = '',
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result["result"] == 1 ? result["data"]["isShow"] && console.log("账号[" + this.name + "]抽奖页签到成功") : (console.log("账号[" + this.name + "]查询抽奖签到情况失败：" + result["error_msg"]), result["error_msg"]["indexOf"]("激励游戏未在运营") > -1 && (this.hasLuckydraw = false));
  }
  // 获取抽奖页定时奖励次数详情
  async luckdrawTimerInfo() {
    let url = "https://activity.e.kuaishou.com/rest/r/game/timer-reward/info",
        body = '';

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    if (result["result"] == 1) {
      if (result["data"]) {
        let currentTime = new Date().getTime(),
            lastTimerTime = result["data"]["lastTimerTime"],
            minutesInterval = result["data"]["minutesInterval"] * 60 * 1000,
            dixTime = lastTimerTime + minutesInterval;

        currentTime < dixTime ? console.log("账号[" + this.name + "]抽奖页奖励冷却时间还有" + (dixTime - currentTime) / 1000 + '秒') : (await $.wait(200), await this["luckdrawTimerReward"](result["data"]["goldNum"]));
      } else {
        console.log("账号[" + this.name + "]抽奖页定时奖励次数已用完");
      }
    } else {
      console.log("账号[" + this.name + "]查询抽奖页定时奖励情况失败：" + result["error_msg"]);
    }
  }

  async ["luckdrawTimerReward"](_0x4487d6) {
    let url = "https://activity.e.kuaishou.com/rest/r/game/timer-reward",
        body = '',
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result["result"] == 1 ? console.log("账号[" + this.name + "]领取抽奖页定时奖励获得" + _0x4487d6 + '金币') : console.log("账号[" + this.name + "]领取抽奖页定时奖励失败：" + result["error_msg"]);
  }
  // 领取抽奖任务
  async luckdrawTasks() {
    let url = "https://activity.e.kuaishou.com/rest/r/game/tasks";
    let body = '';

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    if (result["result"] == 1) {
      for (let t of result["data"]["dailyTasks"]) {
        t["taskState"] == 1 && (await $.wait(200), await this["luckdrawTasksReward"](t));
      }

      for (let gt of result["data"]["growthTasks"]) {
        gt["taskState"] == 1 && (await $.wait(200), await this["luckdrawTasksReward"](gt));
      }
    } else {
      console.log("账号[" + this.name + "]查询抽奖页任务失败：" + result["error_msg"]);
    }
  }
  // 领取抽奖任务reward
  async luckdrawTasksReward(info) {
    let url = "https://activity.e.kuaishou.com/rest/r/game/task/reward-receive?taskName=" + info["taskName"],
        body = '';

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result["result"] == 1 ? console.log("账号[" + this.name + "]领取抽奖任务[" + info["taskTitle"] + "]奖励获得" + result["data"]["popUp"]["taskRewardName"]) : console.log("账号[" + this.name + "]领取抽奖任务[" + info["taskTitle"] + "]奖励失败：" + result["error_msg"]);
  }

  // 助力
  async helpInvite(cks) {
    let ckInfo = cks["split"]('&'),
        fid = ckInfo[0],
        shareToken = ckInfo[1],
        url = "https://nebula.kuaishou.com/rest/n/nebula/qrcode?version=1.2.0",
        body = '',
        urlObject = populateUrlObject(url, this.cookie, body);

    urlObject["headers"]["Referer"] = "https://nebula.kuaishou.com/fission/face-qrcode?fid=" + fid + "&shareToken=" + shareToken + "&source=qrcode";
    await httpRequest("get", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    !(result["result"] == 1) && console.log("账号[" + this.name + "]邀请失败：" + result["error_msg"]);
  }

  //  扫码助力
  async helpScan(cks) {
    let ckInfo = cks["split"]('&'),
        fid = ckInfo[0];
        shareToken = ckInfo[1];

    if (fid == this["userId"]) {
      return;
    }

    let url = "https://api.kuaishouzt.com/rest/zt/share/show/any";

    let body = "theme=light&sdkVersion=1.14.0.4&kpf=ANDROID_PHONE&shareMessage=https%3A%2F%2Fnicdd.get666bjrqu985xvp14v.com%2Ff%2F" + shareToken + "%3FlayoutType%3D4&kpn=NEBULA&launchState=hotLaunch&sessionId=ac165e40-48bd-42de-9fc5-b250d7eb983c&extTransientParams=%7B%22source%22%3A%22userScanCamera%22%7D";

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result["result"] == 1 ? (await $.wait(100), await this["helpInvite"](cks)) : console.log("账号[" + this.name + "]模拟邀请二维码扫描失败：" + result["error_msg"]);
  }
  // 查询提现账号绑定情况
  async bindInfo() {
    let url = "https://www.kuaishoupay.com/pay/account/h5/provider/bind_info";
    let body = "account_group_key=NEBULA_CASH_ACCOUNT&bind_page_type=3";

    let urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    if (result["result"] == "SUCCESS") {
      let _0x7a774c = "未绑定支付宝",
          _0x3639d1 = "未绑定微信";
      result["alipay_bind"] == true && (this.bindAlipay = true, this.alipay = result["alipay_nick_name"], _0x7a774c = "已绑定支付宝[" + result["alipay_nick_name"] + ']');
      result["wechat_bind"] == true && (this.bindWechat = true, this.wechat = result["wechat_nick_name"], _0x3639d1 = "已绑定微信[" + result["wechat_nick_name"] + ']');
      console.log("账号[" + this.name + ']' + _0x3639d1 + '，' + _0x7a774c);
    } else {
      console.log("账号[" + this.name + "]查询提现账号绑定情况失败：" + result["error_msg"]);
    }
  }
  // 查询账号提现情况
  async accountInfo() {
    let url = "https://www.kuaishoupay.com/pay/account/h5/withdraw/account_info",
        body = "account_group_key=NEBULA_CASH_ACCOUNT&providers=",
        urlObject = populateUrlObject(url, this.cookie, body);

    await httpRequest("post", urlObject);
    let result = httpResult;

    if (!result) {
      return;
    }

    result["result"] == "SUCCESS" ? this.needSms = result["need_mobile_code"] : console.log("账号[" + this.name + "]查询账号提现情况失败：" + result["error_msg"]);
  }

}

!(async () => {
  if (typeof $request !== "undefined") {
    await GetRewrite();
  } else {
    if (!(await checkEnv())) {
      return;
    }

    console.log("============================");
    console.log("\n============== 登录 ==============");

    for (let user of userList) {
      await user.getUserInfo();
      await $.wait(500);
    }

    let validUserList = userList.filter(x => x.valid == true);

    if (validUserList.length == 0) {
      return;
    }

    for (let user of validUserList) {
      console.log("\n=========== " + user.name + " ===========");
      await user.getSignInfo();
      await $.wait(200);
      await user.openBox(false);
      await $.wait(200);
      await user.taskList();
      await $.wait(200);
      await user.luckydrawSign();
      await $.wait(200);
      console.log('user---:', user)
      if (user.hasLuckydraw == true) {
        await user.luckdrawTimerInfo();
        await $.wait(200);
        await user.luckdrawTasks();
        await $.wait(200);
        await user.luckdrawInfo();
        await $.wait(200);
      }

      if (user.task[taskTypes.luckydraw].needRun) {
        for (let i = 0; i < user.task[taskTypes.luckydraw].num; i++) {
          currentHour < 13 ? (await user.ksNeoAdParam(luckydrawInfo["luckdrawVideo_161_213"]), await $.wait(200), await user.ksNeoAdParam(luckydrawInfo["luckdrawVideo_11_213"]), await $.wait(200)) : (await user.ksNeoAdParam(luckydrawInfo["luckdrawVideo_161_100"]), await $.wait(200), await user.ksNeoAdParam(luckydrawInfo["luckdrawVideo_11_100"]), await $.wait(200));
        }
      }

      if (user.task[taskTypes.ad].needRun) {
        for (let k = 0; k < user.task[taskTypes.ad].num; k++) {
          await user.ksAdParam(ksAdInfo["ad1"]);
          await $.wait(200);
          k != user.task[taskTypes.ad].num - 1 && (await $.wait(2000));
        }
      }

      if (user.task[taskTypes.gj].needRun) {
        for (let k = 0; k < user.task[taskTypes.gj].num; k++) {
          await user.ksgj();
          await $.wait(200);
        }
      }

      if (user.task[taskTypes.live].needRun) {
        for (let k = 0; k < user.task[taskTypes.live].num; k++) {
          await user.ksNeoAdParam(luckydrawInfo["liveVideo_75"]);
          await $.wait(200);
        }
      }

      if (user.task[taskTypes.invite].needRun) {
        for (let k = 0; k < user.task[taskTypes.invite].num; k++) {
          await user.ksNeoAdParam(luckydrawInfo["inviteVideo_2008"]);
          await $.wait(200);
        }
      }
    }

    console.log("\n============== 账户情况 ==============");

    for (let user of validUserList) {
      await user.accountOverview();
      await $.wait(200);
      await user.bindInfo();
      await $.wait(200);
      await user.accountInfo();
      await $.wait(200);
    }

    console.log("\n============== 自动提现 ==============");
    let cashStr = "按提现列表自动提现";

    if (ksjsbCash) {
      cashStr = "自动提现" + ksjsbCash + '元';
    }

    ksjsbAggressive && (cashStr = "最大化提现");

    if (currentHour == ksjsbWithdrawTime) {
      console.log("提现时间，现在设置为" + cashStr);

      for (let user of validUserList) {
        await user.withdrawOverview();
        await $.wait(200);
      }
    } else {
      console.log("非提现时间，现在设置为" + ksjsbWithdrawTime + '点' + cashStr);
    }

    await _0x217ea6();

    if (inviteList["length"] > 0) {
      for (let _0x1e7eac of validUserList) {
        for (let _0x52333f of inviteList) {
          await _0x1e7eac["helpScan"](_0x52333f);
          await $.wait(200);
        }
      }
    }

    if (notifyFlag == 2) {
      await showmsg();
    } else {
      if (notifyFlag == 1) {
        currentHour == ksjsbWithdrawTime && (await showmsg());
      }
    }
  }
})()["catch"](e => $.logErr(e))["finally"](() => $.done());

async function GetRewrite() {
  if ($request.url.indexOf("appsupport/yoda/biz/info") > -1) {
    let ck = $request.headers.Cookie.match(/(kuaishou.api_st=[\w\-]+)/)[1] + ';';

    userCookie ? userCookie["indexOf"](ck) == -1 && (userCookie = userCookie + "\n" + ck, $.setdata(userCookie, "ksjsbCookie"), ckList = userCookie.split("\n"), $.msg(jsname + (" 获取第" + ckList.length + "个ck成功: " + ck))) : ($.setdata(ck, "ksjsbCookie"), $.msg(jsname + (" 获取第1个ck成功: " + ck)));
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
      if (userCookie["indexOf"](sp) > -1) {
        splitor = sp;
        break;
      }
    }

    for (let userCookies of userCookie.split(splitor)) {
      userCookies && userList["push"](new UserInfo(userCookies));
    }

    userCount = userList["length"];
  } else {
    console.log("未找到CK");
    return;
  }

  console.log("共找到" + userCount + "个账号");
  return true;
}
//通知
async function showmsg() {
  if (!notifyStr) {
    return;
  }

  notifyBody = "快手极速版运行通知\n\n" + notifyStr;

  if (notifyFlag > 0) {
    $.msg(notifyBody);

    if ($.isNode()) {
      var notify = require("./sendNotify");

      await notify.sendNotify($.name, notifyBody);
    }
  } else {
    console.log(notifyBody);
  }
}

function logAndNotify(str) {
  console.log(str);
  notifyStr += str;
  notifyStr += "\n";
}
//pushDear
async function pushDear(str) {
  if (!PushDearKey) {
    return;
  }

  if (!str) {
    return;
  }

  console.log("\n============= PushDear 通知 =============\n");
  console.log(str);
  let urlObject = {
    'url': "https://api2.pushdeer.com/message/push?pushkey=" + PushDearKey + "&text=" + encodeURIComponent(str),
    'headers': {}
  };
  await httpRequest("get", urlObject);

  let result = httpResult,
      retStr = result.content.result == false ? '失败' : '成功';

  console.log("\n========== PushDear 通知发送" + retStr + " ==========\n");
}

async function checkVersion() {
  const body = {
    "url": _0x180c0c,
    "headers": ''
  };
  await httpRequest("get", body);
  let result = httpResult;

  if (!result) {
    return;
  }

  if (result[jsnameStr]) {
    let _0x17f43b = result[jsnameStr];

    if (_0x17f43b["status"] == 0) {
      if (version >= _0x17f43b["version"]) {
        _0x2e716e = true;
        _0x75eec0 = "https://127.0.0.1/";
        console.log(_0x17f43b["msg"][_0x17f43b["status"]]);
        console.log(_0x17f43b["updateMsg"]);
        console.log("现在运行的脚本版本是：1.07，最新脚本版本：" + _0x17f43b["latestVersion"]);
      } else {
        console.log(_0x17f43b["versionMsg"]);
      }
    } else {
      console.log(_0x17f43b["msg"][_0x17f43b["status"]]);
    }
  } else {
    console.log(result["errorMsg"]);
  }
}

async function _0x217ea6() {
  let flag = '';
  const _0x4ee00e = {
    "url": _0x180c0c,
    "headers": ''
  };
  await httpRequest("get", _0x4ee00e);
  let result = httpResult;

  if (!result) {
    return flag;
  }

  for (let item of result["invite"]) {
    if (item) {
      inviteList["push"](item);
    }
  }

  return flag;
}

function populateUrlObject(url, cookie, body = '') {
  let host = url["replace"]('//', '/')["split"]('/')[1];

  const headers = {
    "Host": host,
    "Cookie": cookie
  };
  const urlObject = {
    "url": url,
    "headers": headers
  };
  body && (urlObject.body = body, urlObject.headers["Content-Type"] = "application/x-www-form-urlencoded", urlObject.headers["Content-Length"] = urlObject.body ? urlObject.body.length : 0);
  return urlObject;
}

async function httpRequest(method, url) {
  httpResult = null;
  return new Promise(resolve => {
    $[method](url, async (err, resp, data) => {
      try {
        if (err) {
          console.log(method + "请求失败");
          console.log(JSON.stringify(err));

          $.logErr(err);
        } else {
          safeGet(data) && (httpResult = JSON.parse(data));
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
    console.log("服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}

function getMin(a, b) {
  return a < b ? a : b;
}

function getMax(a, b) {
  return a < b ? b : a;
}

function padStr(num,length,padding='0') {
    let numStr = String(num)
    let numPad = (length>numStr.length) ? (length-numStr.length) : 0
    let retStr = ''
    for(let i=0; i<numPad; i++) {
        retStr += padding
    }
    retStr += numStr
    return retStr;
}

function randomString(len = 12) {
  let chars = "abcdef0123456789",
      maxLen = chars["length"],
      str = '';

  for (i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxLen));
  }

  return str;
}

var Base64 = {
  '_keyStr': "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  'encode': function (_0x520ad6) {
    var _0x3b89d8 = '',
        _0x52e713,
        _0x5f37fd,
        _0x16192e,
        _0x1c74b8,
        _0x4ac984;

    var _0x241716;

    var _0x544abc,
        _0x1cfdb4 = 0;

    _0x520ad6 = Base64["_utf8_encode"](_0x520ad6);

    while (_0x1cfdb4 < _0x520ad6["length"]) {
      _0x52e713 = _0x520ad6["charCodeAt"](_0x1cfdb4++);
      _0x5f37fd = _0x520ad6["charCodeAt"](_0x1cfdb4++);
      _0x16192e = _0x520ad6["charCodeAt"](_0x1cfdb4++);
      _0x1c74b8 = _0x52e713 >> 2;
      _0x4ac984 = (_0x52e713 & 3) << 4 | _0x5f37fd >> 4;
      _0x241716 = (_0x5f37fd & 15) << 2 | _0x16192e >> 6;
      _0x544abc = _0x16192e & 63;

      if (isNaN(_0x5f37fd)) {
        _0x241716 = _0x544abc = 64;
      } else {
        isNaN(_0x16192e) && (_0x544abc = 64);
      }

      _0x3b89d8 = _0x3b89d8 + this["_keyStr"]["charAt"](_0x1c74b8) + this["_keyStr"]["charAt"](_0x4ac984) + this["_keyStr"]["charAt"](_0x241716) + this["_keyStr"]["charAt"](_0x544abc);
    }

    return _0x3b89d8;
  },
  'decode': function (_0x1c6b99) {
    var _0x51ff61 = '';

    var _0x4c4b64, _0x14f8a8, _0x3b562f, _0x2db8c6, _0x480654, _0x12c51e;

    var _0x171589,
        _0x470c6a = 0;

    _0x1c6b99 = _0x1c6b99["replace"](/[^A-Za-z0-9+/=]/g, '');

    while (_0x470c6a < _0x1c6b99["length"]) {
      _0x2db8c6 = this["_keyStr"]["indexOf"](_0x1c6b99["charAt"](_0x470c6a++));
      _0x480654 = this["_keyStr"]["indexOf"](_0x1c6b99["charAt"](_0x470c6a++));
      _0x12c51e = this["_keyStr"]["indexOf"](_0x1c6b99["charAt"](_0x470c6a++));
      _0x171589 = this["_keyStr"]["indexOf"](_0x1c6b99["charAt"](_0x470c6a++));
      _0x4c4b64 = _0x2db8c6 << 2 | _0x480654 >> 4;
      _0x14f8a8 = (_0x480654 & 15) << 4 | _0x12c51e >> 2;
      _0x3b562f = (_0x12c51e & 3) << 6 | _0x171589;
      _0x51ff61 = _0x51ff61 + String["fromCharCode"](_0x4c4b64);
      _0x12c51e != 64 && (_0x51ff61 = _0x51ff61 + String["fromCharCode"](_0x14f8a8));
      _0x171589 != 64 && (_0x51ff61 = _0x51ff61 + String["fromCharCode"](_0x3b562f));
    }

    _0x51ff61 = Base64["_utf8_decode"](_0x51ff61);
    return _0x51ff61;
  },
  '_utf8_encode': function (_0x45c925) {
    _0x45c925 = _0x45c925["replace"](/rn/g, 'n');
    var _0x2c3c1b = '';

    for (var _0x214079 = 0; _0x214079 < _0x45c925["length"]; _0x214079++) {
      var _0x4c6807 = _0x45c925["charCodeAt"](_0x214079);

      if (_0x4c6807 < 128) {
        _0x2c3c1b += String["fromCharCode"](_0x4c6807);
      } else {
        _0x4c6807 > 127 && _0x4c6807 < 2048 ? (_0x2c3c1b += String["fromCharCode"](_0x4c6807 >> 6 | 192), _0x2c3c1b += String["fromCharCode"](_0x4c6807 & 63 | 128)) : (_0x2c3c1b += String["fromCharCode"](_0x4c6807 >> 12 | 224), _0x2c3c1b += String["fromCharCode"](_0x4c6807 >> 6 & 63 | 128), _0x2c3c1b += String["fromCharCode"](_0x4c6807 & 63 | 128));
      }
    }

    return _0x2c3c1b;
  },
  '_utf8_decode': function (_0x52c830) {
    var _0xb36e42 = '';

    var _0xb0fba0 = 0,
        _0x480f85 = c1 = c2 = 0;

    while (_0xb0fba0 < _0x52c830["length"]) {
      _0x480f85 = _0x52c830["charCodeAt"](_0xb0fba0);

      if (_0x480f85 < 128) {
        _0xb36e42 += String["fromCharCode"](_0x480f85);
        _0xb0fba0++;
      } else {
        _0x480f85 > 191 && _0x480f85 < 224 ? (c2 = _0x52c830["charCodeAt"](_0xb0fba0 + 1), _0xb36e42 += String["fromCharCode"]((_0x480f85 & 31) << 6 | c2 & 63), _0xb0fba0 += 2) : (c2 = _0x52c830["charCodeAt"](_0xb0fba0 + 1), c3 = _0x52c830["charCodeAt"](_0xb0fba0 + 2), _0xb36e42 += String["fromCharCode"]((_0x480f85 & 15) << 12 | (c2 & 63) << 6 | c3 & 63), _0xb0fba0 += 3);
      }
    }

    return _0xb36e42;
  }
};

function MD5Encrypt(_0x583963) {
  function _0x64af7b(_0x1f0410, _0x13b47a) {
    return _0x1f0410 << _0x13b47a | _0x1f0410 >>> 32 - _0x13b47a;
  }

  function _0x3234e5(_0x18e1d3, _0x21d890) {
    var _0x5787b2, _0x1bb324, _0x2cf431, _0x10e959, _0x513122;

    _0x2cf431 = 2147483648 & _0x18e1d3;
    _0x10e959 = 2147483648 & _0x21d890;
    _0x5787b2 = 1073741824 & _0x18e1d3;
    _0x1bb324 = 1073741824 & _0x21d890;
    _0x513122 = (1073741823 & _0x18e1d3) + (1073741823 & _0x21d890);
    return _0x5787b2 & _0x1bb324 ? 2147483648 ^ _0x513122 ^ _0x2cf431 ^ _0x10e959 : _0x5787b2 | _0x1bb324 ? 1073741824 & _0x513122 ? 3221225472 ^ _0x513122 ^ _0x2cf431 ^ _0x10e959 : 1073741824 ^ _0x513122 ^ _0x2cf431 ^ _0x10e959 : _0x513122 ^ _0x2cf431 ^ _0x10e959;
  }

  function _0x2b70a0(_0x49fc18, _0x2758c2, _0x24e132) {
    return _0x49fc18 & _0x2758c2 | ~_0x49fc18 & _0x24e132;
  }

  function _0x3e5c81(_0x5e039f, _0x2ff09b, _0x522d46) {
    return _0x5e039f & _0x522d46 | _0x2ff09b & ~_0x522d46;
  }

  function _0x5ce12f(_0x27d1b4, _0x31895b, _0x1ad6f9) {
    return _0x27d1b4 ^ _0x31895b ^ _0x1ad6f9;
  }

  function _0x3a7666(_0x1954b8, _0x35f7ba, _0x25396a) {
    return _0x35f7ba ^ (_0x1954b8 | ~_0x25396a);
  }

  function _0x3f5420(_0x6f58f5, _0x213c8d, _0x4247f2, _0x1e0cd4, _0x4871ed, _0x7e3cf1, _0x586866) {
    _0x6f58f5 = _0x3234e5(_0x6f58f5, _0x3234e5(_0x3234e5(_0x2b70a0(_0x213c8d, _0x4247f2, _0x1e0cd4), _0x4871ed), _0x586866));
    return _0x3234e5(_0x64af7b(_0x6f58f5, _0x7e3cf1), _0x213c8d);
  }

  function _0x5dd039(_0x4addec, _0x5db1c7, _0x16f369, _0x4365b2, _0x436f61, _0x5d9c41, _0x480e72) {
    _0x4addec = _0x3234e5(_0x4addec, _0x3234e5(_0x3234e5(_0x3e5c81(_0x5db1c7, _0x16f369, _0x4365b2), _0x436f61), _0x480e72));
    return _0x3234e5(_0x64af7b(_0x4addec, _0x5d9c41), _0x5db1c7);
  }

  function _0xd4b03c(_0x557443, _0x215dcf, _0x557f01, _0x1b96f7, _0x475621, _0x2f0b5f, _0xf32cc8) {
    _0x557443 = _0x3234e5(_0x557443, _0x3234e5(_0x3234e5(_0x5ce12f(_0x215dcf, _0x557f01, _0x1b96f7), _0x475621), _0xf32cc8));
    return _0x3234e5(_0x64af7b(_0x557443, _0x2f0b5f), _0x215dcf);
  }

  function _0x4c9004(_0x1010ab, _0x56c143, _0x4d41d4, _0xfc0757, _0x115fab, _0x141dd6, _0x3df261) {
    _0x1010ab = _0x3234e5(_0x1010ab, _0x3234e5(_0x3234e5(_0x3a7666(_0x56c143, _0x4d41d4, _0xfc0757), _0x115fab), _0x3df261));
    return _0x3234e5(_0x64af7b(_0x1010ab, _0x141dd6), _0x56c143);
  }

  function _0x42ba2d(_0x406fa0) {
    for (var _0x524f9b, _0x41bd49 = _0x406fa0["length"], _0x543c09 = _0x41bd49 + 8, _0x1d4f2e = (_0x543c09 - _0x543c09 % 64) / 64, _0x7f6593 = 16 * (_0x1d4f2e + 1), _0x29fa94 = new Array(_0x7f6593 - 1), _0x301bd0 = 0, _0x25d8f2 = 0; _0x41bd49 > _0x25d8f2;) {
      _0x524f9b = (_0x25d8f2 - _0x25d8f2 % 4) / 4, _0x301bd0 = _0x25d8f2 % 4 * 8, _0x29fa94[_0x524f9b] = _0x29fa94[_0x524f9b] | _0x406fa0["charCodeAt"](_0x25d8f2) << _0x301bd0, _0x25d8f2++;
    }

    _0x524f9b = (_0x25d8f2 - _0x25d8f2 % 4) / 4;
    _0x301bd0 = _0x25d8f2 % 4 * 8;
    _0x29fa94[_0x524f9b] = _0x29fa94[_0x524f9b] | 128 << _0x301bd0;
    _0x29fa94[_0x7f6593 - 2] = _0x41bd49 << 3;
    _0x29fa94[_0x7f6593 - 1] = _0x41bd49 >>> 29;
    return _0x29fa94;
  }

  function _0x4990e8(_0x1862f7) {
    var _0x4f2fc5,
        _0x5cc094,
        _0x1a6499 = '',
        _0x35cf9a = '';

    for (_0x5cc094 = 0; 3 >= _0x5cc094; _0x5cc094++) {
      _0x4f2fc5 = _0x1862f7 >>> 8 * _0x5cc094 & 255;
      _0x35cf9a = '0' + _0x4f2fc5["toString"](16);
      _0x1a6499 += _0x35cf9a["substr"](_0x35cf9a["length"] - 2, 2);
    }

    return _0x1a6499;
  }

  function _0xe29c1e(_0x8bbf64) {
    _0x8bbf64 = _0x8bbf64["replace"](/\r\n/g, "\n");

    for (var _0x108e22 = '', _0x4a233f = 0; _0x4a233f < _0x8bbf64["length"]; _0x4a233f++) {
      var _0x4a46cc = _0x8bbf64["charCodeAt"](_0x4a233f);

      128 > _0x4a46cc ? _0x108e22 += String["fromCharCode"](_0x4a46cc) : _0x4a46cc > 127 && 2048 > _0x4a46cc ? (_0x108e22 += String["fromCharCode"](_0x4a46cc >> 6 | 192), _0x108e22 += String["fromCharCode"](63 & _0x4a46cc | 128)) : (_0x108e22 += String["fromCharCode"](_0x4a46cc >> 12 | 224), _0x108e22 += String["fromCharCode"](_0x4a46cc >> 6 & 63 | 128), _0x108e22 += String["fromCharCode"](63 & _0x4a46cc | 128));
    }

    return _0x108e22;
  }

  var _0x574a17,
      _0x55692e,
      _0x3bed70,
      _0x35e4bc,
      _0x309031,
      _0x5d1f5e,
      _0x195636,
      _0x289d45,
      _0x507f3b,
      _0x331d38 = [],
      _0x186765 = 7,
      _0xae967 = 12,
      _0x5e4c80 = 17,
      _0x11cb84 = 22,
      _0x3347ca = 5,
      _0xd2786a = 9;

  var _0x10e328 = 14,
      _0x1c75ec = 20,
      _0xd92682 = 4,
      _0xb30684 = 11,
      _0x1aef15 = 16,
      _0x3077e0 = 23,
      _0x3111ee = 6,
      _0x4471b4 = 10,
      _0x317e12 = 15,
      _0x26539b = 21;

  for (_0x583963 = _0xe29c1e(_0x583963), _0x331d38 = _0x42ba2d(_0x583963), _0x5d1f5e = 1732584193, _0x195636 = 4023233417, _0x289d45 = 2562383102, _0x507f3b = 271733878, _0x574a17 = 0; _0x574a17 < _0x331d38["length"]; _0x574a17 += 16) {
    _0x55692e = _0x5d1f5e;
    _0x3bed70 = _0x195636;
    _0x35e4bc = _0x289d45;
    _0x309031 = _0x507f3b;
    _0x5d1f5e = _0x3f5420(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 0], _0x186765, 3614090360);
    _0x507f3b = _0x3f5420(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 1], _0xae967, 3905402710);
    _0x289d45 = _0x3f5420(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 2], _0x5e4c80, 606105819);
    _0x195636 = _0x3f5420(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 3], _0x11cb84, 3250441966);
    _0x5d1f5e = _0x3f5420(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 4], _0x186765, 4118548399);
    _0x507f3b = _0x3f5420(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 5], _0xae967, 1200080426);
    _0x289d45 = _0x3f5420(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 6], _0x5e4c80, 2821735955);
    _0x195636 = _0x3f5420(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 7], _0x11cb84, 4249261313);
    _0x5d1f5e = _0x3f5420(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 8], _0x186765, 1770035416);
    _0x507f3b = _0x3f5420(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 9], _0xae967, 2336552879);
    _0x289d45 = _0x3f5420(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 10], _0x5e4c80, 4294925233);
    _0x195636 = _0x3f5420(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 11], _0x11cb84, 2304563134);
    _0x5d1f5e = _0x3f5420(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 12], _0x186765, 1804603682);
    _0x507f3b = _0x3f5420(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 13], _0xae967, 4254626195);
    _0x289d45 = _0x3f5420(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 14], _0x5e4c80, 2792965006);
    _0x195636 = _0x3f5420(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 15], _0x11cb84, 1236535329);
    _0x5d1f5e = _0x5dd039(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 1], _0x3347ca, 4129170786);
    _0x507f3b = _0x5dd039(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 6], _0xd2786a, 3225465664);
    _0x289d45 = _0x5dd039(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 11], _0x10e328, 643717713);
    _0x195636 = _0x5dd039(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 0], _0x1c75ec, 3921069994);
    _0x5d1f5e = _0x5dd039(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 5], _0x3347ca, 3593408605);
    _0x507f3b = _0x5dd039(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 10], _0xd2786a, 38016083);
    _0x289d45 = _0x5dd039(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 15], _0x10e328, 3634488961);
    _0x195636 = _0x5dd039(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 4], _0x1c75ec, 3889429448);
    _0x5d1f5e = _0x5dd039(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 9], _0x3347ca, 568446438);
    _0x507f3b = _0x5dd039(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 14], _0xd2786a, 3275163606);
    _0x289d45 = _0x5dd039(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 3], _0x10e328, 4107603335);
    _0x195636 = _0x5dd039(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 8], _0x1c75ec, 1163531501);
    _0x5d1f5e = _0x5dd039(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 13], _0x3347ca, 2850285829);
    _0x507f3b = _0x5dd039(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 2], _0xd2786a, 4243563512);
    _0x289d45 = _0x5dd039(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 7], _0x10e328, 1735328473);
    _0x195636 = _0x5dd039(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 12], _0x1c75ec, 2368359562);
    _0x5d1f5e = _0xd4b03c(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 5], _0xd92682, 4294588738);
    _0x507f3b = _0xd4b03c(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 8], _0xb30684, 2272392833);
    _0x289d45 = _0xd4b03c(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 11], _0x1aef15, 1839030562);
    _0x195636 = _0xd4b03c(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 14], _0x3077e0, 4259657740);
    _0x5d1f5e = _0xd4b03c(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 1], _0xd92682, 2763975236);
    _0x507f3b = _0xd4b03c(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 4], _0xb30684, 1272893353);
    _0x289d45 = _0xd4b03c(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 7], _0x1aef15, 4139469664);
    _0x195636 = _0xd4b03c(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 10], _0x3077e0, 3200236656);
    _0x5d1f5e = _0xd4b03c(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 13], _0xd92682, 681279174);
    _0x507f3b = _0xd4b03c(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 0], _0xb30684, 3936430074);
    _0x289d45 = _0xd4b03c(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 3], _0x1aef15, 3572445317);
    _0x195636 = _0xd4b03c(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 6], _0x3077e0, 76029189);
    _0x5d1f5e = _0xd4b03c(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 9], _0xd92682, 3654602809);
    _0x507f3b = _0xd4b03c(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 12], _0xb30684, 3873151461);
    _0x289d45 = _0xd4b03c(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 15], _0x1aef15, 530742520);
    _0x195636 = _0xd4b03c(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 2], _0x3077e0, 3299628645);
    _0x5d1f5e = _0x4c9004(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 0], _0x3111ee, 4096336452);
    _0x507f3b = _0x4c9004(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 7], _0x4471b4, 1126891415);
    _0x289d45 = _0x4c9004(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 14], _0x317e12, 2878612391);
    _0x195636 = _0x4c9004(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 5], _0x26539b, 4237533241);
    _0x5d1f5e = _0x4c9004(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 12], _0x3111ee, 1700485571);
    _0x507f3b = _0x4c9004(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 3], _0x4471b4, 2399980690);
    _0x289d45 = _0x4c9004(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 10], _0x317e12, 4293915773);
    _0x195636 = _0x4c9004(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 1], _0x26539b, 2240044497);
    _0x5d1f5e = _0x4c9004(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 8], _0x3111ee, 1873313359);
    _0x507f3b = _0x4c9004(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 15], _0x4471b4, 4264355552);
    _0x289d45 = _0x4c9004(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 6], _0x317e12, 2734768916);
    _0x195636 = _0x4c9004(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 13], _0x26539b, 1309151649);
    _0x5d1f5e = _0x4c9004(_0x5d1f5e, _0x195636, _0x289d45, _0x507f3b, _0x331d38[_0x574a17 + 4], _0x3111ee, 4149444226);
    _0x507f3b = _0x4c9004(_0x507f3b, _0x5d1f5e, _0x195636, _0x289d45, _0x331d38[_0x574a17 + 11], _0x4471b4, 3174756917);
    _0x289d45 = _0x4c9004(_0x289d45, _0x507f3b, _0x5d1f5e, _0x195636, _0x331d38[_0x574a17 + 2], _0x317e12, 718787259);
    _0x195636 = _0x4c9004(_0x195636, _0x289d45, _0x507f3b, _0x5d1f5e, _0x331d38[_0x574a17 + 9], _0x26539b, 3951481745);
    _0x5d1f5e = _0x3234e5(_0x5d1f5e, _0x55692e);
    _0x195636 = _0x3234e5(_0x195636, _0x3bed70);
    _0x289d45 = _0x3234e5(_0x289d45, _0x35e4bc);
    _0x507f3b = _0x3234e5(_0x507f3b, _0x309031);
  }

  var _0x551509 = _0x4990e8(_0x5d1f5e) + _0x4990e8(_0x195636) + _0x4990e8(_0x289d45) + _0x4990e8(_0x507f3b);

  return _0x551509["toLowerCase"]();
}

function Env(_0x4b6eb2, _0x34747f) {
  "undefined" != typeof process && JSON.stringify(process.env)["indexOf"]("GITHUB") > -1 && process["exit"](0);

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
      return Object(_0x42c265) !== _0x42c265 ? _0x42c265 : (Array["isArray"](_0xba4077) || (_0xba4077 = _0xba4077["toString"]()["match"](/[^.[\]]+/g) || []), _0xba4077["slice"](0, -1)["reduce"]((_0x2be6ef, _0x50e1c0, _0x2a2cf7) => Object(_0x2be6ef[_0x50e1c0]) === _0x2be6ef[_0x50e1c0] ? _0x2be6ef[_0x50e1c0] : _0x2be6ef[_0x50e1c0] = Math["abs"](_0xba4077[_0x2a2cf7 + 1]) >> 0 == +_0xba4077[_0x2a2cf7 + 1] ? [] : {}, _0x42c265)[_0xba4077[_0xba4077["length"] - 1]] = _0x38e869, _0x42c265);
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
      /(y+)/["test"](_0x15e74b) && (_0x15e74b = _0x15e74b["replace"](RegExp['$1'], (new Date()["getFullYear"]() + '')["substr"](4 - RegExp['$1']["length"])));

      for (let _0x485bdf in _0x829d67) new RegExp('(' + _0x485bdf + ')')["test"](_0x15e74b) && (_0x15e74b = _0x15e74b["replace"](RegExp['$1'], 1 == RegExp['$1']["length"] ? _0x829d67[_0x485bdf] : ('00' + _0x829d67[_0x485bdf])["substr"](('' + _0x829d67[_0x485bdf])["length"])));

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

      _0x59871a["push"](_0x5f1003);

      _0x37bdbf && _0x59871a["push"](_0x37bdbf);
      _0x113e2a && _0x59871a["push"](_0x113e2a);
      console.log(_0x59871a["join"]("\n"));
      this.logs = this.logs["concat"](_0x59871a);
    }

    log (..._0xe86ee7) {
      _0xe86ee7["length"] > 0 && (this.logs = [...this.logs, ..._0xe86ee7]);
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

function FxPCnMKLw7() {
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  this["encode"] = function (_0x1f80b2) {
    var _0x59089c = '',
        _0xb7a46e,
        _0x56b266,
        _0x4fc97e,
        _0x1f0b27,
        _0x5a89b9,
        _0x1b2844,
        _0x7cf32c,
        _0x464e89 = 0;

    _0x1f80b2 = _utf8_encode(_0x1f80b2);

    while (_0x464e89 < _0x1f80b2["length"]) {
      _0xb7a46e = _0x1f80b2["charCodeAt"](_0x464e89++);
      _0x56b266 = _0x1f80b2["charCodeAt"](_0x464e89++);
      _0x4fc97e = _0x1f80b2["charCodeAt"](_0x464e89++);
      _0x1f0b27 = _0xb7a46e >> 2;
      _0x5a89b9 = (_0xb7a46e & 3) << 4 | _0x56b266 >> 4;
      _0x1b2844 = (_0x56b266 & 15) << 2 | _0x4fc97e >> 6;
      _0x7cf32c = _0x4fc97e & 63;

      if (isNaN(_0x56b266)) {
        _0x1b2844 = _0x7cf32c = 64;
      } else {
        isNaN(_0x4fc97e) && (_0x7cf32c = 64);
      }

      _0x59089c = _0x59089c + _keyStr["charAt"](_0x1f0b27) + _keyStr["charAt"](_0x5a89b9) + _keyStr["charAt"](_0x1b2844) + _keyStr["charAt"](_0x7cf32c);
    }

    return _0x59089c;
  };

  this["decode"] = function (_0x435108) {
    var _0x2d5cce = '',
        _0x5c0bb2,
        _0x37b11e,
        _0x108449,
        _0x2230dd,
        _0x14e94b,
        _0x2284fb,
        _0x2f8484,
        _0x334984 = 0;

    _0x435108 = _0x435108["replace"](/[^A-Za-z0-9\+\/\=]/g, '');

    while (_0x334984 < _0x435108["length"]) {
      _0x2230dd = _keyStr["indexOf"](_0x435108["charAt"](_0x334984++));
      _0x14e94b = _keyStr["indexOf"](_0x435108["charAt"](_0x334984++));
      _0x2284fb = _keyStr["indexOf"](_0x435108["charAt"](_0x334984++));
      _0x2f8484 = _keyStr["indexOf"](_0x435108["charAt"](_0x334984++));
      _0x5c0bb2 = _0x2230dd << 2 | _0x14e94b >> 4;
      _0x37b11e = (_0x14e94b & 15) << 4 | _0x2284fb >> 2;
      _0x108449 = (_0x2284fb & 3) << 6 | _0x2f8484;
      _0x2d5cce = _0x2d5cce + String["fromCharCode"](_0x5c0bb2);
      _0x2284fb != 64 && (_0x2d5cce = _0x2d5cce + String["fromCharCode"](_0x37b11e));
      _0x2f8484 != 64 && (_0x2d5cce = _0x2d5cce + String["fromCharCode"](_0x108449));
    }

    _0x2d5cce = _utf8_decode(_0x2d5cce);
    return _0x2d5cce;
  };

  _utf8_encode = function (_0x121fa8) {
    _0x121fa8 = _0x121fa8["replace"](/\r\n/g, "\n");
    var _0x572177 = '';

    for (var _0x12597e = 0; _0x12597e < _0x121fa8["length"]; _0x12597e++) {
      var _0x47bf4b = _0x121fa8["charCodeAt"](_0x12597e);

      if (_0x47bf4b < 128) {
        _0x572177 += String["fromCharCode"](_0x47bf4b);
      } else {
        _0x47bf4b > 127 && _0x47bf4b < 2048 ? (_0x572177 += String["fromCharCode"](_0x47bf4b >> 6 | 192), _0x572177 += String["fromCharCode"](_0x47bf4b & 63 | 128)) : (_0x572177 += String["fromCharCode"](_0x47bf4b >> 12 | 224), _0x572177 += String["fromCharCode"](_0x47bf4b >> 6 & 63 | 128), _0x572177 += String["fromCharCode"](_0x47bf4b & 63 | 128));
      }
    }

    return _0x572177;
  };

  _utf8_decode = function (_0x105752) {
    var _0x1348ba = '';
    var _0x374cf5 = 0;

    var _0x426bc3 = c1 = c2 = 0;

    while (_0x374cf5 < _0x105752["length"]) {
      _0x426bc3 = _0x105752["charCodeAt"](_0x374cf5);

      if (_0x426bc3 < 128) {
        _0x1348ba += String["fromCharCode"](_0x426bc3);
        _0x374cf5++;
      } else {
        _0x426bc3 > 191 && _0x426bc3 < 224 ? (c2 = _0x105752["charCodeAt"](_0x374cf5 + 1), _0x1348ba += String["fromCharCode"]((_0x426bc3 & 31) << 6 | c2 & 63), _0x374cf5 += 2) : (c2 = _0x105752["charCodeAt"](_0x374cf5 + 1), c3 = _0x105752["charCodeAt"](_0x374cf5 + 2), _0x1348ba += String["fromCharCode"]((_0x426bc3 & 15) << 12 | (c2 & 63) << 6 | c3 & 63), _0x374cf5 += 3);
      }
    }

    return _0x1348ba;
  };
}

function rc4(_0x5732ed, _0x26ff11) {
  var _0x498f57 = Array(256);

  var _0xb68803 = Array(_0x5732ed["length"]);

  for (var _0x1bc4d4 = 0; _0x1bc4d4 < 256; _0x1bc4d4++) {
    _0x498f57[_0x1bc4d4] = _0x1bc4d4;

    var _0xe71c5b = (_0xe71c5b + _0x498f57[_0x1bc4d4] + _0x26ff11["charCodeAt"](_0x1bc4d4 % _0x26ff11["length"])) % 256;

    var _0x3f1641 = _0x498f57[_0x1bc4d4];
    _0x498f57[_0x1bc4d4] = _0x498f57[_0xe71c5b];
    _0x498f57[_0xe71c5b] = _0x3f1641;
  }

  for (var _0x1bc4d4 = 0; _0x1bc4d4 < _0x5732ed["length"]; _0x1bc4d4++) {
    _0xb68803[_0x1bc4d4] = _0x5732ed["charCodeAt"](_0x1bc4d4);
  }

  for (var _0x10ba77 = 0; _0x10ba77 < _0xb68803["length"]; _0x10ba77++) {
    var _0x1bc4d4 = (_0x1bc4d4 + 1) % 256,
        _0xe71c5b = (_0xe71c5b + _0x498f57[_0x1bc4d4]) % 256,
        _0x3f1641 = _0x498f57[_0x1bc4d4];

    _0x498f57[_0x1bc4d4] = _0x498f57[_0xe71c5b];
    _0x498f57[_0xe71c5b] = _0x3f1641;

    var _0x259aff = (_0x498f57[_0x1bc4d4] + _0x498f57[_0xe71c5b] % 256) % 256;

    _0xb68803[_0x10ba77] = String["fromCharCode"](_0xb68803[_0x10ba77] ^ _0x498f57[_0x259aff]);
  }

  return _0xb68803["join"]('');
}

function Envcc(_0x280bbe, _0x3e4e51) {
  class _0x464fc1 {
    constructor(_0x588b8a) {
      this["env"] = _0x588b8a;
    }

    ["send"](_0x27a67d, _0x14d5e8 = "GET") {
      _0x27a67d = "string" == typeof _0x27a67d ? {
        'url': _0x27a67d
      } : _0x27a67d;
      let _0x3e3976 = this["get"];
      "POST" === _0x14d5e8 && (_0x3e3976 = this["post"]);
      return new Promise((_0x53f89f, _0x54871a) => {
        _0x3e3976["call"](this, _0x27a67d, (_0xeae3f5, _0xe2ae2c, _0x3f94b2) => {
          _0xeae3f5 ? _0x54871a(_0xeae3f5) : _0x53f89f(_0xe2ae2c);
        });
      });
    }

    ["get"](_0x7a3a27) {
      return this["send"]["call"](this["env"], _0x7a3a27);
    }

    ["post"](_0x19c4f5) {
      return this["send"]["call"](this["env"], _0x19c4f5, "POST");
    }

  }

  return new class {
    constructor(_0x5daead, _0x5b6447) {
      this.name = _0x5daead;
      this.http = new _0x464fc1(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = false;
      this.isNeedRewrite = false;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x5b6447);
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

    ["isShadowrocket"]() {
      return "undefined" != typeof $rocket;
    }

    toObj(_0x4787cb, _0x368a2d = null) {
      try {
        return JSON.parse(_0x4787cb);
      } catch {
        return _0x368a2d;
      }
    }

    toStr (_0x11a5e2, _0x211c31 = null) {
      try {
        return JSON.stringify(_0x11a5e2);
      } catch {
        return _0x211c31;
      }
    }

    getjson (_0x5f2791, _0x18d2bb) {
      let _0x22c2de = _0x18d2bb;

      const _0x27188f = this["getdata"](_0x5f2791);

      if (_0x27188f) {
        try {
          _0x22c2de = JSON.parse(this["getdata"](_0x5f2791));
        } catch {}
      }

      return _0x22c2de;
    }

    setjson (_0x34fbd6, _0x299ffd) {
      try {
        return this["setdata"](JSON.stringify(_0x34fbd6), _0x299ffd);
      } catch {
        return false;
      }
    }

    getScript (_0x25a705) {
      return new Promise(_0x2098cc => {
        const _0x135a0e = {
          "url": _0x25a705
        };
        this["get"](_0x135a0e, (_0x3ed319, _0x131976, _0x25346d) => _0x2098cc(_0x25346d));
      });
    }

    runScript (_0x42ddff, _0xbaae53) {
      return new Promise(_0x4b1c8a => {
        let _0x204ec2 = this["getdata"]("@chavy_boxjs_userCfgs.httpapi");

        _0x204ec2 = _0x204ec2 ? _0x204ec2["replace"](/\n/g, '')["trim"]() : _0x204ec2;

        let _0x533249 = this["getdata"]("@chavy_boxjs_userCfgs.httpapi_timeout");

        _0x533249 = _0x533249 ? 1 * _0x533249 : 20;
        _0x533249 = _0xbaae53 && _0xbaae53["timeout"] ? _0xbaae53["timeout"] : _0x533249;

        const [_0x5ba768, _0x1abf36] = _0x204ec2["split"]('@'),
              _0xe97850 = {
          'url': "http://" + _0x1abf36 + "/v1/scripting/evaluate",
          'body': {
            'script_text': _0x42ddff,
            'mock_type': "cron",
            'timeout': _0x533249
          },
          'headers': {
            'X-Key': _0x5ba768,
            'Accept': "*/*"
          }
        };

        this["post"](_0xe97850, (_0x25e8fe, _0x5ef095, _0x34b4b8) => _0x4b1c8a(_0x34b4b8));
      })["catch"](_0x546eb7 => this.logErr(_0x546eb7));
    }

    ["loaddata"]() {
      if (!this["isNode"]()) {
        return {};
      }

      {
        this.fs = this.fs ? this.fs : require('fs');
        this.path = this.path ? this.path : require("path");

        const _0xa9d74c = this.path["resolve"](this.dataFile),
              _0x346699 = this.path["resolve"](process["cwd"](), this.dataFile),
              _0x358160 = this.fs["existsSync"](_0xa9d74c),
              _0x40909d = !_0x358160 && this.fs["existsSync"](_0x346699);

        if (!_0x358160 && !_0x40909d) {
          return {};
        }

        {
          const _0x46268d = _0x358160 ? _0xa9d74c : _0x346699;

          try {
            return JSON.parse(this.fs["readFileSync"](_0x46268d));
          } catch (_0x4d855a) {
            return {};
          }
        }
      }
    }

    ["writedata"]() {
      if (this["isNode"]()) {
        this.fs = this.fs ? this.fs : require('fs');
        this.path = this.path ? this.path : require("path");

        const _0x24b36c = this.path["resolve"](this.dataFile),
              _0x52f902 = this.path["resolve"](process["cwd"](), this.dataFile),
              _0x133d1a = this.fs["existsSync"](_0x24b36c),
              _0xb96c18 = !_0x133d1a && this.fs["existsSync"](_0x52f902),
              _0xf85a2e = JSON.stringify(this.data);

        _0x133d1a ? this.fs["writeFileSync"](_0x24b36c, _0xf85a2e) : _0xb96c18 ? this.fs["writeFileSync"](_0x52f902, _0xf85a2e) : this.fs["writeFileSync"](_0x24b36c, _0xf85a2e);
      }
    }

    ["lodash_get"](_0x413618, _0x2b1fed, _0x3560c1) {
      const _0x390bfb = _0x2b1fed["replace"](/\[(\d+)\]/g, ".$1")["split"]('.');

      let _0x4ea1c0 = _0x413618;

      for (const _0x1adbab of _0x390bfb) if (_0x4ea1c0 = Object(_0x4ea1c0)[_0x1adbab], void 0 === _0x4ea1c0) {
        return _0x3560c1;
      }

      return _0x4ea1c0;
    }

    ["lodash_set"](_0x5971d4, _0x234c83, _0x581509) {
      return Object(_0x5971d4) !== _0x5971d4 ? _0x5971d4 : (Array["isArray"](_0x234c83) || (_0x234c83 = _0x234c83["toString"]()["match"](/[^.[\]]+/g) || []), _0x234c83["slice"](0, -1)["reduce"]((_0x444402, _0x33b66c, _0x493d31) => Object(_0x444402[_0x33b66c]) === _0x444402[_0x33b66c] ? _0x444402[_0x33b66c] : _0x444402[_0x33b66c] = Math["abs"](_0x234c83[_0x493d31 + 1]) >> 0 == +_0x234c83[_0x493d31 + 1] ? [] : {}, _0x5971d4)[_0x234c83[_0x234c83["length"] - 1]] = _0x581509, _0x5971d4);
    }

    ["getdata"](_0xd4a5f3) {
      let _0x440ae0 = this["getval"](_0xd4a5f3);

      if (/^@/["test"](_0xd4a5f3)) {
        const [, _0x27e4bc, _0x4a547a] = /^@(.*?)\.(.*?)$/["exec"](_0xd4a5f3),
              _0x60ff8f = _0x27e4bc ? this["getval"](_0x27e4bc) : '';

        if (_0x60ff8f) {
          try {
            const _0x180fe1 = JSON.parse(_0x60ff8f);

            _0x440ae0 = _0x180fe1 ? this["lodash_get"](_0x180fe1, _0x4a547a, '') : _0x440ae0;
          } catch (_0x574077) {
            _0x440ae0 = '';
          }
        }
      }

      return _0x440ae0;
    }

    ["setdata"](_0x4c0847, _0x3e2591) {
      let _0x14c056 = false;

      if (/^@/["test"](_0x3e2591)) {
        const [, _0x25e9bd, _0x9eeb35] = /^@(.*?)\.(.*?)$/["exec"](_0x3e2591),
              _0x1de478 = this["getval"](_0x25e9bd),
              _0x4aff64 = _0x25e9bd ? "null" === _0x1de478 ? null : _0x1de478 || '{}' : '{}';

        try {
          const _0x29e60d = JSON.parse(_0x4aff64);

          this["lodash_set"](_0x29e60d, _0x9eeb35, _0x4c0847);
          _0x14c056 = this["setval"](JSON.stringify(_0x29e60d), _0x25e9bd);
        } catch (_0x4bbd7d) {
          const _0x521eb8 = {};
          this["lodash_set"](_0x521eb8, _0x9eeb35, _0x4c0847);
          _0x14c056 = this["setval"](JSON.stringify(_0x521eb8), _0x25e9bd);
        }
      } else {
        _0x14c056 = this["setval"](_0x4c0847, _0x3e2591);
      }

      return _0x14c056;
    }

    ["getval"](_0x40917e) {
      return this.isSurge() || this.isLoon() ? $persistentStore["read"](_0x40917e) : this.isQuanX() ? $prefs["valueForKey"](_0x40917e) : this["isNode"]() ? (this.data = this["loaddata"](), this.data[_0x40917e]) : this.data && this.data[_0x40917e] || null;
    }

    ["setval"](_0x8aa8b9, _0x306948) {
      return this.isSurge() || this.isLoon() ? $persistentStore["write"](_0x8aa8b9, _0x306948) : this.isQuanX() ? $prefs["setValueForKey"](_0x8aa8b9, _0x306948) : this["isNode"]() ? (this.data = this["loaddata"](), this.data[_0x306948] = _0x8aa8b9, this["writedata"](), true) : this.data && this.data[_0x306948] || null;
    }

    ["initGotEnv"](_0x48f776) {
      this["got"] = this["got"] ? this["got"] : require("got");
      this["cktough"] = this["cktough"] ? this["cktough"] : require("tough-cookie");
      this["ckjar"] = this["ckjar"] ? this["ckjar"] : new this["cktough"]["CookieJar"]();
      _0x48f776 && (_0x48f776["headers"] = _0x48f776["headers"] ? _0x48f776["headers"] : {}, void 0 === _0x48f776["headers"]["Cookie"] && void 0 === _0x48f776["cookieJar"] && (_0x48f776["cookieJar"] = this["ckjar"]));
    }

    ["get"](_0x32a6cf, _0x1c7dae = () => {}) {
      if (_0x32a6cf["headers"] && (delete _0x32a6cf["headers"]["Content-Type"], delete _0x32a6cf["headers"]["Content-Length"]), this.isSurge() || this.isLoon()) {
        const _0x38cfcb = {
          "X-Surge-Skip-Scripting": false
        };
        this.isSurge() && this.isNeedRewrite && (_0x32a6cf["headers"] = _0x32a6cf["headers"] || {}, Object.assign(_0x32a6cf["headers"], _0x38cfcb));
        $httpClient["get"](_0x32a6cf, (_0x43a481, _0x2a212f, _0x4b5e3a) => {
          !_0x43a481 && _0x2a212f && (_0x2a212f["body"] = _0x4b5e3a, _0x2a212f["statusCode"] = _0x2a212f["status"]);

          _0x1c7dae(_0x43a481, _0x2a212f, _0x4b5e3a);
        });
      } else {
        if (this.isQuanX()) {
          const _0x127e59 = {
            "hints": false
          };
          this.isNeedRewrite && (_0x32a6cf["opts"] = _0x32a6cf["opts"] || {}, Object.assign(_0x32a6cf["opts"], _0x127e59));
          $task["fetch"](_0x32a6cf)["then"](_0x167f5b => {
            const {
              'statusCode': _0x581d1a,
              'statusCode': _0x439f03,
              'headers': _0x152820,
              'body': _0x438191
            } = _0x167f5b,
                  _0x5de731 = {
              "status": _0x581d1a,
              "statusCode": _0x439f03,
              "headers": _0x152820,
              "body": _0x438191
            };

            _0x1c7dae(null, _0x5de731, _0x438191);
          }, _0x2e8080 => _0x1c7dae(_0x2e8080));
        } else {
          if (this["isNode"]()) {
            let _0x2f5150 = require("iconv-lite");

            this["initGotEnv"](_0x32a6cf);
            this["got"](_0x32a6cf)['on']("redirect", (_0x11788b, _0x23d586) => {
              try {
                if (_0x11788b["headers"]["set-cookie"]) {
                  const _0x13fa34 = _0x11788b["headers"]["set-cookie"]["map"](this["cktough"]["Cookie"]["parse"])["toString"]();

                  _0x13fa34 && this["ckjar"]["setCookieSync"](_0x13fa34, null);
                  _0x23d586["cookieJar"] = this["ckjar"];
                }
              } catch (_0x448c7d) {
                this.logErr(_0x448c7d);
              }
            })["then"](_0x5dbc48 => {
              const {
                'statusCode': _0xeaab53,
                'statusCode': _0x336eda,
                'headers': _0x2c270b,
                'rawBody': _0x229165
              } = _0x5dbc48;
              const _0x101d63 = {
                "status": _0xeaab53,
                "statusCode": _0x336eda,
                "headers": _0x2c270b,
                "rawBody": _0x229165
              };

              _0x1c7dae(null, _0x101d63, _0x2f5150["decode"](_0x229165, this.encoding));
            }, _0x1fad95 => {
              const {
                'message': _0x454368,
                'response': _0x152a62
              } = _0x1fad95;

              _0x1c7dae(_0x454368, _0x152a62, _0x152a62 && _0x2f5150["decode"](_0x152a62["rawBody"], this.encoding));
            });
          }
        }
      }
    }

    ["post"](_0xa76253, _0x423d25 = () => {}) {
      const _0x162a67 = _0xa76253["method"] ? _0xa76253["method"]["toLocaleLowerCase"]() : "post";

      if (_0xa76253["body"] && _0xa76253["headers"] && !_0xa76253["headers"]["Content-Type"] && (_0xa76253["headers"]["Content-Type"] = "application/x-www-form-urlencoded"), _0xa76253["headers"] && delete _0xa76253["headers"]["Content-Length"], this.isSurge() || this.isLoon()) {
        const _0x1b68f0 = {
          "X-Surge-Skip-Scripting": false
        };
        this.isSurge() && this.isNeedRewrite && (_0xa76253["headers"] = _0xa76253["headers"] || {}, Object.assign(_0xa76253["headers"], _0x1b68f0));

        $httpClient[_0x162a67](_0xa76253, (_0x28b2f1, _0x5e9237, _0x431dd9) => {
          !_0x28b2f1 && _0x5e9237 && (_0x5e9237["body"] = _0x431dd9, _0x5e9237["statusCode"] = _0x5e9237["status"]);

          _0x423d25(_0x28b2f1, _0x5e9237, _0x431dd9);
        });
      } else {
        if (this.isQuanX()) {
          _0xa76253["method"] = _0x162a67;
          const _0x5bd363 = {
            "hints": false
          };
          this.isNeedRewrite && (_0xa76253["opts"] = _0xa76253["opts"] || {}, Object.assign(_0xa76253["opts"], _0x5bd363));
          $task["fetch"](_0xa76253)["then"](_0x580f1a => {
            const {
              'statusCode': _0x560971,
              'statusCode': _0x36073c,
              'headers': _0x422b05,
              'body': _0x3d317e
            } = _0x580f1a;
            const _0xec9b6 = {
              "status": _0x560971,
              "statusCode": _0x36073c,
              "headers": _0x422b05,
              "body": _0x3d317e
            };

            _0x423d25(null, _0xec9b6, _0x3d317e);
          }, _0x414b7e => _0x423d25(_0x414b7e));
        } else {
          if (this["isNode"]()) {
            let _0x3ec62a = require("iconv-lite");

            this["initGotEnv"](_0xa76253);
            const {
              'url': _0x3bcbb0,
              ..._0x175fa2
            } = _0xa76253;

            this["got"][_0x162a67](_0x3bcbb0, _0x175fa2)["then"](_0x522423 => {
              const {
                'statusCode': _0x581409,
                'statusCode': _0x1cca4e,
                'headers': _0x48ed48,
                'rawBody': _0x2d2f8d
              } = _0x522423,
                    _0x11ef7c = {
                "status": _0x581409,
                "statusCode": _0x1cca4e,
                "headers": _0x48ed48,
                "rawBody": _0x2d2f8d
              };

              _0x423d25(null, _0x11ef7c, _0x3ec62a["decode"](_0x2d2f8d, this.encoding));
            }, _0x3661e0 => {
              const {
                'message': _0xe62144,
                'response': _0x124d15
              } = _0x3661e0;

              _0x423d25(_0xe62144, _0x124d15, _0x124d15 && _0x3ec62a["decode"](_0x124d15["rawBody"], this.encoding));
            });
          }
        }
      }
    }

    ["time"](_0x57e1ea, _0x3951dc = null) {
      const _0x239b32 = _0x3951dc ? new Date(_0x3951dc) : new Date();

      let _0x5e77df = {
        'M+': _0x239b32["getMonth"]() + 1,
        'd+': _0x239b32["getDate"](),
        'H+': _0x239b32["getHours"](),
        'm+': _0x239b32["getMinutes"](),
        's+': _0x239b32["getSeconds"](),
        'q+': Math["floor"]((_0x239b32["getMonth"]() + 3) / 3),
        'S': _0x239b32["getMilliseconds"]()
      };
      /(y+)/["test"](_0x57e1ea) && (_0x57e1ea = _0x57e1ea["replace"](RegExp['$1'], (_0x239b32["getFullYear"]() + '')["substr"](4 - RegExp['$1']["length"])));

      for (let _0x46a891 in _0x5e77df) new RegExp('(' + _0x46a891 + ')')["test"](_0x57e1ea) && (_0x57e1ea = _0x57e1ea["replace"](RegExp['$1'], 1 == RegExp['$1']["length"] ? _0x5e77df[_0x46a891] : ('00' + _0x5e77df[_0x46a891])["substr"](('' + _0x5e77df[_0x46a891])["length"])));

      return _0x57e1ea;
    }

    ["msg"](_0x475bdb = _0x280bbe, _0x35f69c = '', _0x45e30c = '', _0x186f39) {
      const _0x4ab83f = _0xcdea1e => {
        if (!_0xcdea1e) {
          return _0xcdea1e;
        }

        if ("string" == typeof _0xcdea1e) {
          return this.isLoon() ? _0xcdea1e : this.isQuanX() ? {
            'open-url': _0xcdea1e
          } : this.isSurge() ? {
            'url': _0xcdea1e
          } : void 0;
        }

        if ("object" == typeof _0xcdea1e) {
          if (this.isLoon()) {
            let _0x5268b0 = _0xcdea1e["openUrl"] || _0xcdea1e["url"] || _0xcdea1e["open-url"],
                _0x18a781 = _0xcdea1e["mediaUrl"] || _0xcdea1e["media-url"];

            const _0x17f082 = {
              "openUrl": _0x5268b0,
              "mediaUrl": _0x18a781
            };
            return _0x17f082;
          }

          if (this.isQuanX()) {
            let _0x3a5a11 = _0xcdea1e["open-url"] || _0xcdea1e["url"] || _0xcdea1e["openUrl"],
                _0x29ab65 = _0xcdea1e["media-url"] || _0xcdea1e["mediaUrl"];

            const _0xcc796 = {
              "open-url": _0x3a5a11,
              "media-url": _0x29ab65
            };
            return _0xcc796;
          }

          if (this.isSurge()) {
            let _0x554063 = _0xcdea1e["url"] || _0xcdea1e["openUrl"] || _0xcdea1e["open-url"];

            const _0x5de2d9 = {
              "url": _0x554063
            };
            return _0x5de2d9;
          }
        }
      };

      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification["post"](_0x475bdb, _0x35f69c, _0x45e30c, _0x4ab83f(_0x186f39)) : this.isQuanX() && $notify(_0x475bdb, _0x35f69c, _0x45e30c, _0x4ab83f(_0x186f39))), !this["isMuteLog"]) {
        let _0x507b02 = ['', "==============📣系统通知📣=============="];

        _0x507b02.push(_0x475bdb);

        _0x35f69c && _0x507b02.push(_0x35f69c);
        _0x45e30c && _0x507b02.push(_0x45e30c);
        console.log(_0x507b02["join"]("\n"));
        this.logs = this.logs["concat"](_0x507b02);
      }
    }

    ["fwcaas"]() {
      return "fkRGREUCFRNfMCtqKj0lLiE/OXowLTRz";
    }

    log (..._0x2cebf5) {}

    logErr(_0x3cd944, _0xc82cf) {
      const _0xc00526 = !this.isSurge() && !this.isQuanX() && !this.isLoon();

      _0xc00526 ? this.log('', '❗️' + this.name + ", 错误!", _0x3cd944["stack"]) : this.log('', '❗️' + this.name + ", 错误!", _0x3cd944);
    }

    ["fwur"]() {
      var _0x5bbbd2 = new FxPCnMKLw7();

      return _0x5bbbd2["decode"](this["fwcaas"]());
    }

    ["wait"](_0x230a35) {
      return new Promise(_0x12f54f => setTimeout(_0x12f54f, _0x230a35));
    }

    ["done"](_0x4fa5b7 = {}) {
      const _0x2597ed = new Date().getTime();

      const _0x4ff26d = (_0x2597ed - this.startTime) / 1000;

      this.log('', '🔔' + this.name + ", 结束! 🕛 " + _0x4ff26d + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x4fa5b7);
    }

  }(_0x280bbe, _0x3e4e51);
}