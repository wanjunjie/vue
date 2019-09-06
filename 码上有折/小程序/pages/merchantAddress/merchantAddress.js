// pages/merchantAddress/merchantAddress.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        merchantUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        console.log(1);
        if(options.flag&&options.flag==='h5'){
            //从H5返回
            let rs = decodeURI(options.resultData);
            console.log(rs);
            wx.navigateTo({
              url: '/pages/wxPayment/wxPayment'
            })
        }else{
            let _this = this;
            _this.setData({'merchantUrl':app.globalData.baseUrl+'walletpn/minipro/weChatH5/weChatH5.html?issuerId=MYHR&productNo=DR00001&discountRatio=9.8&userId=181031550155614'});
        }

        /*let _this = this;
        app.wxRequest(app.globalData.baseUrl+'walletpn/miniPro/getQRCode.do',{
            issuerId:'MYHR',
            productNo:'DR00001',
            discountRatio:'9.8',
            userId:181031550155614
        }).then(resp=>{
            console.log(resp.data.authCodeUrl);
            _this.setData({'merchantUrl':resp.data.authCodeUrl});
        });*/
    },

    onShareAppMessage(options) {
        console.log(options.webViewUrl)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log(2);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log(3);
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