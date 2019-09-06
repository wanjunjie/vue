<template>
<div class="my-red-packets-p">
        <div class="p-img">
            <router-link to="/myRewardList" class="invitation-my-link">我的奖励</router-link>
            <img src="@/assets/images/my-red-packets-bg_01.png">
        </div>
        <div class="p-img"><img src="@/assets/images/my-red-packets-bg_02.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets-bg_03.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets-bg_04.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets-bg_05.png"></div>
        <div v-if="actState=='1'">
            <div class="p-img">
                <div class="invitation-btn-link">
                    <a class="btn1" @click="share = true"  href="javascript:void(0)">立即邀请好友</a>
                </div>
                <img src="@/assets/images/my-red-packets-bg_06.png">
            </div>
            <div class="p-img">
                <div class="invitation-btn-link">
                    <a @click="getQrCode" class="btn2" href="javascript:void(0)">面对面邀请</a>
                    <router-link to="/activityRules" class="link" >活动规则 </router-link>
                </div>
                <img src="@/assets/images/my-red-packets-bg_07.png">
            </div>
        </div>
        <div v-else>
            <div class="p-img">
                <div class="invitation-btn-link">
                    <a class="btn1" href="javascript:void(0)">活动已结束</a>
                </div>
                <img src="@/assets/images/my-red-packets-bg_06.png">
            </div>
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
                    邀请好友扫码领红包
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
            tokenId: this.$store.state.token,
            qrImg: '',
            showQrCode: false,
            share: false,
            thumb: require ('@/assets/logo.png'),
            detail: '',
            actState:"0",//0-结束 1-有效
        }
    },
    methods:{
        getQrCode(){
            this.$util.postRequest('/walletpn/cusInvite/f2fInvite',{tokenId:this.tokenId,queryType:'0'})
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
            this.$util.postRequest('/walletpn/cusInvite/wxConfig',{tokenId:this.tokenId})
            .then( response => {
                let res = JSON.parse(JSON.stringify(response))
                res = res.data;
                this.wxInit(res);

                console.log(res)
            })
        },
        getDitall(){
            this.$util.postRequest('/walletpn/cusInvite/wxShare',{tokenId:this.tokenId,queryType:'0'})
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

        //查询活动是否结束
        queryMchtAct(){
            this.$util.postRequest('/walletpn/reward/queryMchtAct', {tokenId:this.tokenId})
            .then( res => {
                console.log(res);
                if(res == undefined){
                    return;
                }

                this.actState = res.data.actState;
            });
        },
  
    },
    computed: {
        
    },
    created(){
        this.getDitall();
        this.queryMchtAct();
    }
}
</script>
