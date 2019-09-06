<template>
  <div>
    <div class="img index-header">
        <div class="s">
            <span class="t">超级会员 </span>
            (还剩{{getData.validDateNumber}}天)
        </div>
        <div class="j">
            已为您节省  
            <span class="n">{{getData.savedAmt}}</span>
            元
        </div>
        <router-link class="a" to="/transactionDetails">交易明细 ></router-link>
        <router-link class="img-a" to="/goodFriendsShare"></router-link>
        <img src="@/assets/images/2018_10_22_02.png">
    </div>
    <div class="select-merchants-module">
        <div class="title-content">
            <span class="i"></span>
            <span class="l">请选择商户付款</span>
            <span class="r">支持全国门店</span>
        </div>
        <div class="main-content">
            <div v-for="(v,i) in getData.dataList" :key="i" class="item">
                <span class="i"><img :src="v.imgPath"></span>
                <span class="t">{{v.name}}<span class="n"><span class="b">{{v.discountNuber}}</span>折</span></span>
                <span v-if="v.issuerId=='WALM'" class="orangeColor">温馨提示：单笔消费金额不低于20元</span>
                <router-link v-if="getData.state == '2'" class="a" :to="{ path: 'renewalDate', query: { issuerId: v.issuerId, productNo: v.productNo }}">去付款</router-link>
                <a v-else class="a" :href="'/walletpn/products/pay?issuerId=' + v.issuerId +'&productNo=' + v.productNo + '&discountRatio=' + v.discount">去付款</a>
            </div>
        </div>
        <div class="bottom-content"><span class="t">到底啦，更多权益敬请期待</span></div>
    </div>
    <div class="index-bottom-info">
        本服务由通联支付提供，客服电话95193
        <div class="t">温馨提示：使用本服务付款后，不再开立报销发票。</div>
    </div>
    <!-- 体验弹框 -->
    <div v-if="getData.firstFlag == 1" class="popup-experience-immediately">
        <div class="main-content">
            <div class="info">
                欢迎使用码上有折，会员可享肯德基、必胜客、家乐福等多家商户全国门店折扣买单，单单折、天天折，折上折，享受消费新体验。<br>
                您已获得30天《超级会员》，快来体验吧。
            </div>
            <a @click="getData.firstFlag = 0" class="link" href="#">立即体验</a>
        </div>
        <div class="bg-content"></div>
    </div>
    <!-- 邀请好友弹框 -->
    <div v-if="succeed" class="popup-invite-friends">
        <div class="main-content">
            <span @click="goToHome" class="close"></span>
            <div class="i"></div>
            <div class="t">
                恭喜您!
            </div>
            <div class="info">
                成功省钱 <span class="b">{{saveMoney}}</span> 元!
            </div>
            <a @click="goToGoodFriendsShare" class="link" href="javascript:void(0)">邀请好友，省得更多</a>
        </div>
        <div class="bg-content"></div>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
    name: 'home',
    data(){
        return {
            getData: '',
            succeed: false,
            saveMoney: '',
            thumb: require ('@/assets/logo.png'),
            detail: ''
        }
    },
    methods:{
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
                console.log(res)
                this.getData = res.data
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        goToHome(){
            this.succeed = false
            this.$router.push({ name: 'home'})
        },
        goToGoodFriendsShare(){
            this.succeed = false
            this.$router.push({ name: 'home'})
            this.$router.push({ name: 'goodFriendsShare'})
        }
    },
    computed:{
        isSucceed(){
            let discount =  this.$route.query.discount
            if(discount != null&discount != ''&this.$store.getters.getDiscount == 0){
                this.succeed = true
                this.saveMoney = discount
                this.$store.commit('changeDiscount')
            }
            else{
                this.succeed = false
                this.saveMoney = ''
            }
        }
    },
    created(){
        this.getDitall()
        this.getInfo()
        this.isSucceed
    }
}
</script>