// pages/inviteRecds/inviteRecds.js
const util = require('../../utils/dateUtils.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteTotal:0,
    bonusDays:0,
    totalPage: 1,
    hasMore: true,
    pageNo: 1,
    pageSize: 10,
    inviteRecds:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // let moreData = [{  createDateTime: '20181024153559',invitedNickName: 'test1' },
    //   { createDateTime:'20181024153559', invitedNickName: 'test2' }]
    // for (var i = 0; i < moreData.length; i++) {
    //   let dataStr = moreData[i].createDateTime
    //   moreData[i].time = dataStr.substr(0, 4) + '-' + dataStr.substr(4, 2) + '-' + dataStr.substr(6, 2) + ' ' + dataStr.substr(8, 2) + ':' + dataStr.substr(10, 2) + ':' + dataStr.substr(12,2)
    // }
    // this.setData({
    //   inviteRecds: moreData
    // })
    // ---------------------------------------------------



    var _this = this

    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowHeight: res.windowHeight + "px",
        })
      }
    })


    let baseUrl = app.globalData.baseUrl
    let timestamp = util.formatTime(new Date())
    console.log("timestamp:", timestamp)
    timestamp = util.formatDate(new Date(), "yyyyMMddHHmmss")
    console.log("timestamp:", timestamp)
    let jrlNo = Math.floor(Math.random() * 36);
    let appid = this.data.appid
    let userId = wx.getStorageSync('userId')
    
    console.log('userId:' + userId)
    let reqData = {
      userId: userId,
      pageIndex: this.data.pageNo,
      pageSize: this.data.pageSize
    }
    console.log('reqData:' + JSON.stringify(reqData))
    app.wxRequest(baseUrl + 'walletpn/alreadyInvited/queryAlreadyInvited', reqData, this.back()).then(res=>{
        if (typeof res.data.errorCode != 'undefined' && res.data.errorCode != '000000') {
          console.log("后台返回失败：", res)
          // return
        }
        let inviteRecds = _this.data.inviteRecds
        let moreData = res.data.dataList
      let total = parseInt(res.data.totalInvite)
      let totalPage = (total) / _this.data.pageSize
      totalPage = Math.floor(totalPage) + 1
      console.log('parseInt(res.data.total):' + parseInt(res.data.totalInvite))
      console.log('totalPage:' + totalPage)
      console.log('total:' + total)
      console.log('total % _this.data.pageSize:' + total % _this.data.pageSize)
      if (total % _this.data.pageSize == 0 && total > 0) {
        totalPage = totalPage - 1
      }
      console.log('totalPage:' + totalPage)
      _this.setData({
        inviteTotal: res.data.totalInvite,
        bonusDays: res.data.totalFreeDate,
        pageNo: _this.data.pageNo + 1,
        totalPage: totalPage,
        inviteRecds: inviteRecds.concat(moreData)
      })
      console.log('pageNo:' + _this.data.pageNo)
      if (_this.data.totalPage < _this.data.pageNo || _this.data.totalPage == 1) {
        _this.setData({
          hasMore: false
        })
        return
      }
        console.log("请求成功", res)
    })
    // wx.request({
    //   url: baseUrl + 'alreadyInvited/queryAlreadyInvited',
    //   data: reqData,
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   method: 'POST',
    //   success: function (res) {
    //     if (typeof res.data.errorCode != 'undefined' && res.data.errorCode != '000000') {
    //       console.log("后台返回失败：", res)
    //       return
    //     }
    //     let inviteRecds = _this.data.inviteRecds
    //     let moreData = res.data.dataList
    //     _this.setData({
    //       pageNo: _this.data.pageNo + 1,
    //       inviteRecds: inviteRecds.concat(moreData)
    //     })
    //     console.log("请求成功", res)
    //   }, fail: function (res) {
    //     console.log("请求失败", res)
    //   }
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
  scroll: function() {
    console.log("scroll")
  },
  reqForRecds: function () {
    var _this = this
    if (_this.data.totalPage < _this.data.pageNo) {
      _this.setData({
        hasMore: false
      })
      return
    }
    let baseUrl = app.globalData.baseUrl
    let timestamp = util.formatTime(new Date())
    let jrlNo = Math.floor(Math.random() * 36);
    let appid = this.data.appid
    let userId = wx.getStorageSync('userId')
    
    console.log('userId:' + userId)
    let reqData={
      userId: userId,
      pageIndex: this.data.pageNo,
      pageSize: this.data.pageSize
    }
    console.log('reqData:' + JSON.stringify(reqData))
    app.wxRequest(baseUrl + 'walletpn/alreadyInvited/queryAlreadyInvited', reqData, this.back()).then(res => {
      if (typeof res.data.errorCode != 'undefined' && res.data.errorCode != '000000') {
        console.log("后台返回失败：", res)
        // return
      }
      let inviteRecds = _this.data.inviteRecds
      let moreData = res.data.dataList
      let total = parseInt(res.data.totalInvite)
      let totalPage = (total) / _this.data.pageSize
      totalPage = Math.floor(totalPage) + 1
      // console.log('parseInt(res.data.total):' + parseInt(res.data.total))
      // console.log('totalPage:' + totalPage)
      // console.log('total % _this.data.pageSize:' + total % _this.data.pageSize)
      if (total % _this.data.pageSize == 0 && total > 0) {
        totalPage = totalPage - 1
      }
      _this.setData({
        inviteTotal: res.data.totalInvite,
        bonusDays: res.data.totalFreeDate,
        pageNo: _this.data.pageNo + 1,
        totalPage: totalPage,
        inviteRecds: inviteRecds.concat(moreData)
      })
      console.log("请求成功", res)
    })
    // wx.request({
    //   url: baseUrl + '/alreadyInvited/queryAlreadyInvited',
    //   data: reqData,
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   method: 'POST',
    //   success: function (res) {
    //     let inviteRecds = _this.data.inviteRecds
    //     if (typeof res.data.errorCode != 'undefined' && res.data.errorCode != '000000') {
    //       console.log("后台返回失败：", res)
    //       let moreData = [{ invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }]
    //       _this.setData({
    //         pageNo: _this.data.pageNo + 1,
    //         inviteRecds: inviteRecds.concat(moreData)
    //       })
    //       return
    //     }
        
    //     let moreData = res.data.dataList

    //     moreData = [{ invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh' }, { invitedNickName: 'hh'}]
    //     _this.setData({
    //       pageNo: _this.data.pageNo + 1,
    //       totalPage: res.data.total,
    //       inviteRecds: inviteRecds.concat(moreData)
    //     })
    //     if( res.data.total < _this.data.pageNo ){
    //       _this.setData({
    //         hasMore: false
    //       })
    //     }
    //     console.log("请求成功", res)
    //   }, fail: function (res) {
    //     console.log("请求失败", res)
        
        
    //   }
    // })
  }
})