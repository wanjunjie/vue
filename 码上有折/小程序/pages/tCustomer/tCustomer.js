// pages/tCustomer/tCustomer.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: app.globalData.imgUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.wxRequest(app.globalData.baseUrl + 'walletpn/LoginEnter/firstData', {openId: "ocrjk1ZQKYNCgm8PwvgXafwnmTfY"}, this.back()).then(resp => {
            console.log(resp);
        })
    },
    back() {
        console.log('该函数可以不传,用于complete之后的处理');
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

    }
})