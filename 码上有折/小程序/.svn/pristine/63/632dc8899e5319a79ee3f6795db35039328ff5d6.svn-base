// pages/tradeRecds/tradeRecds.js

const util = require('../../utils/dateUtils.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid:'',
    hasMore: true,
    totalPage:1,
    pageNo:1,
    pageSize: 10,
    tradeRecds:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setStorageSync('userId', '201609291000523')
    // // let appid = wx.getAccountInfoSync().miniProgram.appid
    // let moreData = [{ time: '2018-10-24 15:35:00', tradeType: '消费', amount:'98.00', discount:'2.05' },
    //   { time: '2018-10-24 15:35:01', tradeType: '矿泉水', amount: '98.00', discount: '2.05' }]
    //========================================================
    var _this = this
    console.log('totalPage:' + _this.data.totalPage)
    console.log('pageNo:' + _this.data.pageNo)
   
    let baseUrl = app.globalData.baseUrl
    let timestamp = util.formatTime(new Date())
    let jrlNo = timestamp + Math.floor(Math.random() * 1000);
    let appid = this.data.appid
    // let userId = wx.getStorageSync('userId')
    // console.log('userId:' + JSON.stringify(userId))

    // reqData = 'userId=' + userId + '&pageIndex=' + this.data.pageNo +'&pageSize=' + 20
    let reqData = {
      transType: '2',
      // userId: userId,
      pageIndex: this.data.pageNo,
      pageSize: this.data.pageSize
    }

    console.log('reqData:', JSON.stringify(reqData))
    
    app.wxRequest(baseUrl + 'walletpn/transDetail/queryTransDetail', reqData, this.back()).then(res => {
      let tradeRecds = _this.data.tradeRecds
      let moreData = res.data.dataList
      let total = parseInt(res.data.total)
      let totalPage = (total) / _this.data.pageSize
      totalPage = Math.floor(totalPage) + 1
      // console.log('parseInt(res.data.total):' + parseInt(res.data.total))
      // console.log('totalPage:' + totalPage)
      // console.log('total % _this.data.pageSize:' + total % _this.data.pageSize)
      if (total % _this.data.pageSize == 0 && total > 0) {
        totalPage = totalPage - 1
      }
      _this.setData({
        pageNo: _this.data.pageNo + 1,
        totalPage: totalPage,
        tradeRecds: tradeRecds.concat(moreData)
      })
      if (_this.data.totalPage < _this.data.pageNo || _this.data.totalPage == 1) {
        _this.setData({
          hasMore: false
        })
        return
      }
        console.log("请求成功", res)
    })
    // wx.request({
      
    //   url: baseUrl + '/transDetail/queryTransDetail' ,
    //   //+ '?userId=' + userId,
    //   data: reqData,
    //   method: 'POST',
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
      
    //   success: function (res) {
    //     if (typeof res.data.errorCode != 'undefined' && res.data.errorCode != '000000'){
    //       console.log("后台返回失败：", res)
    //       return
    //     }
    //     console.log("请求成功", res)
    //     let tradeRecds = _this.data.tradeRecds
    //     let moreData = res.data.dataList
    //     for (var i = 0; i < moreData.length; i++) {
    //       let str = (moreData[i].amount / 100).toFixed(2) + '';
    //       // moreData[i].amount = str
    //       moreData[i].tradeType='消费'
    //       let dstr = (moreData[i].discount / 100).toFixed(2) + '';
    //       // moreData[i].discount = dstr

    //       moreData[i].time = moreData[i].createDatetime
    //       // moreData[i].time = dataStr.substr(0, 4) + '-' + dataStr.substr(4, 2) + '-' + dataStr.substr(6, 2) + ' ' + dataStr.substr(8, 2) + ':' + dataStr.substr(10, 2) + ':' + dataStr.substr(12, 2)
    //     }
    //     _this.setData({
    //       pageNo: _this.data.pageNo + 1,
    //       tradeRecds: tradeRecds.concat(moreData)
    //     })
    //     console.log("请求成功", res)
    //   }, fail: function (res) {
    //     console.log("请求失败", res)
    //   }
    // })

  //===================================

    // this.setData({
    //   tradeRecds: moreData,
    //   appid: appid
    // })
  },
  back: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMoreRecds()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMoreRecds: function () {
    this.reqForRecds()
  },
  reqForRecds: function () {
    var _this = this
    console.log('totalPage:' + _this.data.totalPage)
    console.log('pageNo:' + _this.data.pageNo)
    if (_this.data.totalPage < _this.data.pageNo ){
      _this.setData({
        hasMore: false
      })
      return
    }

    let baseUrl = app.globalData.baseUrl
    let timestamp = util.formatTime(new Date())
    let jrlNo = timestamp + Math.floor(Math.random() * 1000);
    let appid = this.data.appid
    // let userId = wx.getStorageSync('userId')
    // console.log('userId:' + JSON.stringify(userId))
    let reqData = {
      transType: '2',
      // userId: userId,
      pageIndex: this.data.pageNo,
      pageSize: this.data.pageSize
    }

    console.log('reqData:', JSON.stringify(reqData))
    app.wxRequest(baseUrl + 'walletpn/transDetail/queryTransDetail', reqData, this.back()).then(res => {
      let tradeRecds = _this.data.tradeRecds
      let moreData = res.data.dataList
      let total = parseInt(res.data.total)
      let totalPage = (total) / _this.data.pageSize
      totalPage = Math.floor(totalPage) + 1
      if (total % _this.data.pageSize == 0 && total > 0) {
        totalPage = totalPage - 1
      }
      _this.setData({
        pageNo: _this.data.pageNo + 1,
        totalPage: totalPage,
        tradeRecds: tradeRecds.concat(moreData)
      })
      console.log("请求成功", res)
    })
    // wx.request({

    //   url: baseUrl + '/transDetail/queryTransDetail',
    //   //+ '?userId=' + userId,
    //   data: reqData,
    //   method: 'POST',
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },

    //   success: function (res) {
    //     if (typeof res.data.errorCode != 'undefined' && res.data.errorCode != '000000') {
    //       console.log("后台返回失败：", res)
    //       return
    //     }
    //     console.log("请求成功", res)
    //     let tradeRecds = _this.data.tradeRecds
    //     let moreData = res.data.dataList
    //     for (var i = 0; i < moreData.length; i++) {
    //       let str = (moreData[i].amount / 100).toFixed(2) + '';
    //       // moreData[i].amount = str
    //       moreData[i].tradeType = '消费'
    //       let dstr = (moreData[i].discount / 100).toFixed(2) + '';
    //       // moreData[i].discount = dstr

    //       moreData[i].time = moreData[i].createDatetime
    //       // moreData[i].time = dataStr.substr(0, 4) + '-' + dataStr.substr(4, 2) + '-' + dataStr.substr(6, 2) + ' ' + dataStr.substr(8, 2) + ':' + dataStr.substr(10, 2) + ':' + dataStr.substr(12, 2)
    //     }
    //     _this.setData({
    //       pageNo: _this.data.pageNo + 1,
    //       tradeRecds: tradeRecds.concat(moreData)
    //     })
    //     console.log("请求成功", res)
    //   }, fail: function (res) {
    //     console.log("请求失败", res)
    //   }
    // })
  }
})