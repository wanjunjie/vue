//app.js
var http = require('pages/start/http.js')
var util = require('common/js/util.js')
App({
    data: {
        carts: [],
        hasList: false,          // 列表是否有数据
        cartsao: false,          // 网点编号是否存在
        customerNo: '',
        customername: '',
        goodsNumber: '',
        openId: ''
    },

    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        //https://qianbao.allinpay.com/walletpn/
        //http://test.allinpay.com/walletpn/
        baseUrl: 'http://test.allinpay.com/',//发起请求的服务器地址
        //https://qianbao.allinpay.com/walletpn/minipro/images/     生产的
        //http://test.allinpay.com/walletpn/minipro/images/         测试的
        imgUrl: 'http://test.allinpay.com/walletpn/minipro/images/',
        openId: null
    }
    ,
    func: {
        req: http.req
    },
    wxRequest: util.wxRequest
})