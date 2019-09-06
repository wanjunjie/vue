//login.js
//获取应用实例
var jsonData = require('../../data/json.js');
var app = getApp();
var http = require('../start/http.js');
var util = require('../../utils/dateUtils.js');

Page({
    data: {
        remind: '加载中',
        angle: 0,
        userInfo: {},
        imageUrl: app.globalData.imgUrl,
        rootUrl: app.globalData.baseUrl,
        showView: true,
        savedMoney: 0,
        openId: app.globalData.openId,
        respData: {},
        code:null,
        appid: "wxf8081e43d0be6272",
        refopenId:"",

    },
    goToIndex() {
        wx.switchTab({url: '/pages/index/index'});
    },

    onLoad: function (options) {
        var that = this;
        if (options.srcOpenId)
            that.data.refopenId = options.srcOpenId
        else if (options.sence)
            that.data.refopenId = options.scence
        console.log("邀请用户id:" + that.data.refopenId)
    },
    onShow: function () {
        let that = this
        let userInfo = wx.getStorageSync('userInfo')
        if (!userInfo) {
            wx.navigateTo({
                url: "/pages/index/index"
            })
        } else {
            that.setData({
                userInfo: userInfo
            })
        };
        //先获取openid
        that.getOpenid().then(rspCode => {
          that.setData({
            code: rspCode,
          })
          console.log("获取code" + that.data.code),
            //再获取首页信息
            that.getFirstData(that.data.rootUrl + 'walletpn/LoginEnter/firstData?').then(backEndData => {
              app.globalData.openId = backEndData.data.openId,
                that.setData({
                  respData: backEndData.data,
                  savedMoney:backEndData.data.savedAmt / 100,
                  validDateNumber: "(还剩"+backEndData.data.validDateNumber+"天)",
                  validDate: backEndData.data.validDate,
                  openId: backEndData.data.openId,
                  firstFlag: backEndData.data.firstFlag,
                  state: backEndData.data.state,
                })
              if (that.data.state === '2'){
                  console.log("会员卡已经过期，state：" + that.data.state)
                  that.setData({validDateNumber:"已过期"})
              }
              console.log("是否首次登录:" + that.data.firstFlag)
              if (that.data.firstFlag === '1') {
                console.log("是首次登录")
                that.setData({
                  showView: false
                })
              }
              else {
                console.log("非首次登录")
                that.setData({
                  showView: true
                })
              }
              console.log("获取首页信息:", that.data.respData);
            })
        });
    },
    onReady: function () {
        var that = this;
        setTimeout(function () {
            that.setData({
                remind: ''
            });
        }, 1000);
        wx.onAccelerometerChange(function (res) {
            var angle = -(res.x * 30).toFixed(1);
            if (angle > 14) {
                angle = 14;
            }
            else if (angle < -14) {
                angle = -14;
            }
            if (that.data.angle !== angle) {
                that.setData({
                    angle: angle
                });
            }
        });
    },
    onChangeShowState: function () {
        var that = this;
        that.setData({
            showView: true
        })
    },
    getValidDay: function (validDay) {
        var that = this
        var t1 = util.formatTime(new Date());
        var t2 = validDay.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3 00:00:00")
        var startDay = new Date(t1.replace(/-/g, "/"))
        var endDay = new Date(t2)
        var days = endDay.getTime() - startDay.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));
        that.setData({
            d: day
        })
    },
    getOpenid() {
        let that = this;
        return new Promise((resolve, reject) => {
            wx.login({
                success(res) {
                    if (res.code) {
                        resolve(res.code);
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        });
    },
    getFirstData(url) {
        let that = this;
        return new Promise((resolve, reject) => {
            //发起网络请求
            app.wxRequest(url, {
              code: that.data.code,
              refopenId: that.data.refopenId,
              refAppId:that.data.appid
            }).then(resp => {
                resolve(resp);
            })
        });
    },
});