<template>
<div>
    <div class="img invite-friends-img">
        <router-link class="a" to="/myInvitation">我的分享</router-link>
        <img src="@/assets/images/2018-10-23-2_01.png">
    </div>
    <div class="img invite-friends-img">
        <span class="s">超级会员卡</span>
        <div class="j">
            已为您节省
            <span class="n">{{getData.savedAmt}}</span>
            元
        </div>
        <span class="time">卡片有效期还剩{{getData.validDateNumber}}天</span>
        <img src="@/assets/images/2018-10-23-2_02.png">
    </div>
    <div class="img invite-friends-img">
        <div class="info">
            • 每成功邀请1名好友，可获VIP自动续期7天（多邀请多得哦 ! ）<br>
            • 受邀好友可免费获得30天码上有折超级会员
        </div>
        <img src="@/assets/images/2018-10-23-2_03.png">
    </div>
    <div class="img invite-friends-img">
        <a @click="share = true" class="btn-1" href="#">立即邀请</a>
        <a @click="getQrCode()" class="btn-2" href="#">面对面邀请</a>
        <img src="@/assets/images/2018-10-23-2_04.png">
    </div>
     <!-- 分享 -->
    <div v-if="share" class="popup-share">
        <div @click="share = false" class="img-share">
            <span>点击上方分享功能</span>
        </div>
        <!-- <div class="icon-share">
            <span>点击上方分享功能</span>
        </div> -->
        <div class="bg-content"></div>
    </div>
    <!-- 二维码弹框 -->
    <div v-if="showQrCode" class="popup-qr-code">
        <div class="main-content">
            <span @click="showQrCode = false" class="close"></span>
            <div class="t">
                邀请好友扫描二维码自动续会员
            </div>
            <div class="i">
                <img :src="qrImg">
            </div>
        </div>
        <div class="bg-content"></div>
    </div>
</div>
</template>

<script>
import QRCode from 'qrcode'
import wx from 'weixin-js-sdk'
export default {
    data(){
        return {
            qrImg: '',
            showQrCode: false,
            share: false,
            thumb: require ('@/assets/logo.png'),
            getData: '',
            detail: ''
        }
    },
    methods:{
        getQrCode(){
            this.$util.postRequest('/walletpn/invite/f2fInvite')
            .then( res => {
                console.log(res)
                QRCode.toDataURL(res.data.inviteUrl, {
                    errorCorrectionLevel: 'M',
                    width: 300,
                    type: 'image/jpeg',
                    rendererOpts: {
                        quality: 0.9
                    }
                })
                .then(url => {
                    this.qrImg = url
                    this.showQrCode = true
                })
            })
        },
        goToWX(){
            this.$util.postRequest('/walletpn/invite/wxConfig')
            .then( response => {
                let res = JSON.parse(JSON.stringify(response))
                res = res.data;
                this.wxInit(res);
                console.log

                console.log(res)
            })
        },
        getDitall(){
            this.$util.postRequest('/walletpn/invite/wxShare')
            .then( response => {
                console.log(1)
                console.log(response)
                this.detail = response.data
                this.goToWX()
            })
        },
        // 微信分享
        wxInit(res) {
            let imgUrl = location.protocol + location.host + this.thumb;
            wx.config({
                debug: false,
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
            });
            wx.ready(()=> {
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: this.detail.title, // 分享标题
                    desc: this.detail.desc, // 分享描述
                    link: this.detail.link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function() {
                        // alert("分享到朋友圈成功")
                    },
                    cancel: function() {
                        alert("分享失败,您取消了分享!")
                    }
                }); 
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: this.detail.title, // 分享标题
                    desc: this.detail.desc, // 分享描述
                    link: this.detail.link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function() {
                        // alert("成功分享给朋友")
                    },
                    cancel: function() {
                        alert("分享失败,您取消了分享!")
                    }
                });
                //享给QQ好友
                wx.onMenuShareQQ({
                    title: this.detail.title, // 分享标题
                    desc: this.detail.desc, // 分享描述
                    link: this.detail.link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function() {
                        // alert("成功分享给QQ好友")
                    },
                    cancel: function() {
                        alert("分享失败,您取消了分享!")
                    }
                });
                //分享QQ空间
                wx.onMenuShareQZone({
                    title: this.detail.title, // 分享标题
                    desc: this.detail.desc, // 分享描述
                    link: this.detail.link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function() {
                        // alert("成功分享QQ空间")
                    },
                    cancel: function() {
                        alert("分享失败,您取消了分享!")
                    }
                });
            });
            wx.error(function(err) {
                alert(JSON.stringify(err))
            });
        },
        getInfo(){
            this.$util.postRequest('/walletpn/LoginEnter/firstPageData')
            .then( res => {
                // console.log(res)
                this.getData = res.data
            })
        }
    },
    computed: {
        
    },
    created(){
        this.getDitall()
        this.getInfo()
    }
}
</script>
