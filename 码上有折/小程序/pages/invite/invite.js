// pages/invite/invite.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    showView:true,
    shareView:true,
    f2fView:true,
    miniQrcode:true,
    savedMoney:0,
    validDate:null,
    rootUrl: app.globalData.baseUrl,
    qrcode:null,
    miniQrcode: null,
    openId:app.globalData.openId,
    accessToken:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      savedMoney:options.sm,
      validDate:options.vd
    })
    
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  closeQrCode(){
    var that=this;
    that.setData({
        showView:(!that.data.showView)
    })
  },
  getQrCode() {
    let that = this;
    let url = that.data.rootUrl +"walletpn/invite/f2fInviteImage"
    app.wxRequest(url, {
      }).then(resp => {
        //console.log("f2fInvite:" + resp.data.inviteUrl);
        const base64 = wx.arrayBufferToBase64(resp.data.inviteUrl);
        that.setData({
          showView:false,
          shareView:true,
          f2fView:false,
          miniView:true,
          qrcode: resp.data.inviteUrl
        })
      })
    },
  shareProgram(){
    let that = this
    that.setData({
      showView: true,
      shareView: false
    })
  },
  onShareAppMessage: function (options) {
    let that = this
    return {
      title: '马上有折小程序',
      path: '/pages/start/start?srcOpenId='+app.globalData.openId,
      imageUrl:'',
      //desc:'商超折扣，马上就有',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  //立即邀请，分享朋友圈，生成小程序二维码图片
  shareInCycle() {
    let that = this;
    //后台获取accessToken并获取二维码
    that.getAccessToken().then(rspToken => {
      that.setData({
        accessToken: rspToken
      })
      that.getMiniQrcode().then(rspQrcode => {
        that.setData({
          miniQrcode: "data:image/png;base64," + rspQrcode
        })
        //console.log("获取小程序二维码:", that.data.miniQrcode)
      }),
        that.setData({
          showView: false,
          shareView: true,
          f2fView:true,
          miniView:false
        })
      console.log("showview:" + that.data.showView + "shareview" + that.data.shareView)
      })
  },
  //发往后台获取accessToken
  getAccessToken(){
    let that = this;
    return new Promise((resolve, reject) => {
      //发起网络请求
      app.wxRequest(that.data.rootUrl + 'walletpn/wx/getAccessToken', {
        appId: "wxf8081e43d0be6272"
      }).then(resp => {
        console.log("获取token:", resp.data.accessToken)
        resolve(resp.data.accessToken);
      })
    })
  },
  //根据accesstoken获取小程序二维码
  getMiniQrcode(){
    let that = this;
    
    //var scene = decodeURIComponent("refopenId=" + app.globalData.openId)
    return new Promise((resolve, reject) => {
      wx.request({
        method: "POST",
        url: "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + that.data.accessToken,
        responseType: 'arraybuffer',
        data:{
          scene: app.globalData.openId,
          path: "pages/start/start"
        },
        success: resp => {
          resolve(wx.arrayBufferToBase64(resp.data));
        }
      })
    })
  },
  closeShareView(){
    let that= this;
    that.setData({
      shareView: true
    })
  },
})