<template>
  <div>
    <div v-if="getData.isShare=='1'" class="img index-header">
        <div class="s">
            <span class="t">超级会员 </span>

        <router-link v-if="!isBind" class="remaining" to="/bindUser">还剩30天 </router-link>
        <router-link v-else-if="getData.state == '1'" class="remaining" to="/paySet">还剩{{getData.validDateNumber}}天 </router-link>
        <router-link v-else-if="!bindCard" class="overdue" to="/paySet">已过期,请续费</router-link>
        <router-link v-else class="overdue" to="/renewalDate2">已过期,请续费</router-link>
        </div>
        <div class="j">
            已为您节省  
            <span class="n">{{getData.savedAmt}}</span>
            元
        </div>
        <router-link v-if="!isBind" class="detail" to="/bindUser">交易明细</router-link>
        <router-link v-else-if="!bindCard" class="detail" to="/paySet">交易明细</router-link>
        <router-link v-else class="detail" to="/transactionDetails2">交易明细</router-link>
        <!--
        <router-link v-if="!isBind && actState!='1'" class="renewal" to="/bindUser" style="top:.05rem;">
            <span class="t">邀请好友</span>
            <span class="i">送7天会员</span>
        </router-link>
        <div v-if="isBind && actState!='1'">
            <router-link class="renewal" to="/cusFriendsShare" style="top:.05rem;">
            <span class="t">邀请好友</span>
            <span class="i">送7天会员</span>
        </router-link>
        </div>
        -->
        <div v-if="actShow=='1'">
            <!--
            <a href="javascript:void(0);" class="my-red-packets-link" @click="toRedPocket"></a>
            -->
        </div>
        <router-link v-if="!isBind" class="set" to="/bindUser">支付设置</router-link>
        <router-link v-else class="set" to="/paySet">支付设置</router-link>
        <img src="@/assets/images/2018_10_22_01.png">
    </div>
    <div v-if="getData.isShare=='0'" class="img index-header">
        <div class="s">
            <span class="t">超级会员 </span>
            <span v-if="isBind && getData.state == '1'" class="remaining" to="/paySet">还剩{{getData.validDateNumber}}天 </span>
        </div>
        <div class="j">
            已为您节省  
            <span class="n">{{getData.savedAmt}}</span>
            元
        </div>
        <router-link v-if="!isBind" class="detail" to="/bindUser">交易明细</router-link>
        <router-link v-else-if="!bindCard" class="detail" to="/paySet">交易明细</router-link>
        <router-link v-else class="detail" to="/transactionDetails2">交易明细</router-link>

        <div v-if="isRenew">
            <router-link v-if="!isBind" class="renewal" to="/bindUser" style="top:.05rem;">
                <span class="t">续费</span>
                <span class="i">还剩30天</span>
            </router-link>
            <router-link v-else-if="!bindCard" class="renewal" to="/paySet" style="top:.05rem;">
                <span class="t">续费</span>
                <span class="i">还剩{{getData.validDateNumber}}天</span>
            </router-link>
            <router-link v-else class="renewal" to="/renewalDate2" style="top:.05rem;">
                <span class="t">续费</span>
                <span class="i">还剩{{getData.validDateNumber}}天</span>
            </router-link>
        </div>
         <div v-else>
             <div class="bank-logo">
                <img :src="dingzhiLogo1">
             </div>
        </div>

        <div v-if="actShow=='1'">
            <!--
            <a href="javascript:void(0);" class="my-red-packets-link" @click="toRedPocket"></a>
            -->
        </div>
        <router-link v-if="!isBind" class="set" to="/bindUser">支付设置</router-link>
        <router-link v-else class="set" to="/paySet">支付设置</router-link>
        <img src="@/assets/images/2018_10_22_01.png">
    </div>

    <div v-if="actShow=='1'" class="p-img">
        <div v-if="appId=='Tlmswxf'">
            <router-link to="/A20190412">
                <img src="@/assets/images/my-red-packets-0_06.png">
            </router-link>
        </div>
        <div v-if-else="appId=='TLmspfb'">
            <a href="https://mp.weixin.qq.com/s/fk7NJHUAQ_CFH0RiG1Z_Lw">
                <img src="@/assets/images/my-red-packets-0_04.png">
            </a>
        </div>
        
        <div v-else @click="huodong">
            <a href="javascript:void(0)">
                <img src="@/assets/images/my-red-packets-0_05.png">
            </a>
        </div>
       
    </div>

    <div class="select-merchants-module">
        <div class="title-content">
            <span class="i"></span>
            <span class="l">请选择商户付款</span>
            <!-- <span class="r">支持全国门店</span> -->
        </div>
        <div class="main-content">
            <div v-for="(v,i) in getData.dataList" :key="i" class="item">
                <span class="i"><img :src="v.imgPath"></span>
                <span class="t">{{v.name}}<span class="n"><span class="b">{{v.discountNuber}}</span>折</span></span>
                <span v-if="v.issuerId=='WALM'" class="orangeColor">支持沃尔玛旗下购物广场、山姆、惠选所有门店</span>
                <span v-if="v.issuerId=='SDJT'" class="orangeColor">支持除北京/天津/内蒙古/河北/黑吉辽三省区域外门店</span>
                <span v-if="v.issuerId=='C000'" class="orangeColor">温馨提示：单笔不超过1000元，大额请分多次付款</span>

                <router-link v-if="!isBind" class="a" to="/bindUser"><span v-if="v.issuerId=='WALM'||v.issuerId=='KFC'">去购卡</span><span v-else>去付款</span></router-link>
                <router-link v-else-if="!bindCard" class="a" to="/paySet"><span v-if="v.issuerId=='WALM'||v.issuerId=='KFC'">去购卡</span><span v-else>去付款</span></router-link>
                <router-link v-else-if="getData.state == '2'" class="a" :to="{ path: 'renewalDate2', query: { issuerId: v.issuerId, productNo: v.productNo,tlIssuerId:v.tlIssuerId,discountRatio:v.nonMemDiscount }}"><span v-if="v.issuerId=='WALM'||v.issuerId=='KFC'">去购卡</span><span v-else>去付款</span></router-link>
                <a v-else class="a" href="javascript:void(0)" @click="toPay( v.tlIssuerId , v.issuerId , v.productNo , v.discount)"><span v-if="v.issuerId=='WALM'||v.issuerId=='KFC'">去购卡</span><span v-else>去付款</span></a>
            </div>
        </div>
        <div class="bottom-content"><span class="t">到底啦，更多权益敬请期待</span></div>
    </div>
    <div class="index-bottom-info">
        本服务由通联支付提供，客服电话95193
        <div class="t">温馨提示：使用本服务付款后，不再开立报销发票。</div>
    </div>
    <!-- 未绑卡 -->
    <div v-if="!bindCardShow" class="popup-experience-immediately-two">
        <div :class="['main-content', {'bank-content-logo':!isPopup}]">
            <!-- <div v-if="isPopup">
                <img class="logo" src="../assets/images/bank/logo2.png">
            </div> -->
            <div v-if="!isPopup">
                <img class="logo" :src="dingzhiLogo2">
            </div>

            <div class="info2">
                &nbsp; <br>
                <span class="b">立享全国指定商超无门槛优惠</span><br>
                每天每单都优惠！买单即享！
            </div>
            <router-link v-if="!isBind" class="link2" to="/bindUser">立即设置银行卡</router-link>
            <router-link v-else class="link2" to="/paySet">立即设置银行卡</router-link>
            <a @click="bindCardShow = !bindCardShow" class="link-go" href="javascript:void(0);">跳过</a>
        </div>
        <div class="bg-content"></div>
        <link rel="dns-prefetch" href="//www.chinagiftcard.cn"/>
        <link rel="dns-prefetch" href="//www.culdata.com"/>
    </div>

    <form ref="payForm" :action="this.$dataUrl+'/walletpn/cusProducts/pay'"  method="post">
        <input type="hidden" name="tlIssuerId" :value="tlIssuerId"/>
        <input type="hidden" name="issuerId" :value="issuerId"/>
        <input type="hidden" name="productNo" :value="productNo"/>
        <input type="hidden" name="discountRatio" :value="discountRatio"/>
        <input type="hidden" name="tokenId" :value="tokenId"/>
    </form>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default {
    name: 'home',
    data(){
        return {
            getData: '',
            tokenId: '',
            isBind: false,
            bindCard: true,
            bindCardShow: true,
            actState:"0",//0-结束 1-有效
            actShow:false,//是否展示春节活动
            isRenew:true,//是否显示续费，默认显示，其他显示定制图片
            isPopup:true,//是否显示定制弹窗，默认显示，其他显示定制图片
            dingzhiLogo1:"",
            dingzhiLogo2:"",
            
            tlIssuerId:"",
            issuerId:'',
            productNo:'',
            discountRatio:'',

            
            thumb: require ('@/assets/logo.png'),
            detail: '',
            appId:''
        }
    },
    methods:{
        getInfo(){
            this.$util.openIndicator();
            this.$util.postRequest('/walletpn/login/queryData?tokenId='+this.tokenId)
            .then( res => {
                // console.log('login/queryData::')
                 console.log(res.data)
                this.getData = res.data
                if("1"==this.getData.isBind){
                    this.isBind = true;
                    this.getCardList()
                }else{
                    this.bindCard = false
                    this.bindCardShow = false
                }
                //活动
                let actsts = res.data.actShow;
                if("1" == actsts){
                    this.actShow = true;
                }else{
                    this.actShow = false;
                }

                //右上角显示续费 or 定制图片
                if("0" == res.data.isRenew){
                    this.isRenew = true;
                }else{
                    this.isRenew = false;
                    this.dingzhiLogo1=require ('@/assets/images/bank/'+res.data.isRenew);
                }

                //首次弹窗显示默认 or 定制图片
                if("0" == res.data.isPopup){
                    this.isPopup = true;
                }else{
                    this.isPopup = false;
                    this.dingzhiLogo2=require ('@/assets/images/bank/'+res.data.isPopup);
                }
                this.appId = res.data.appId
              
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getTokenId(){
            if(this.$route.query.tokenId){
                this.$util.postRequest('/walletpn/login/getTokenId ', {referrerTokenId:localStorage.getItem('referrerTokenId'),tokenId:this.$route.query.tokenId})
                .then( response => {
                
                    if(response.data == ''){
                        this.$util.Message.error({message: '获取token失败'});
                    }
                    else{
                        this.$store.commit('set_token', response.data);
                        this.tokenId = this.$store.state.token
                        this.getInfo()
                        this.queryMchtAct();
                        this.wxShare();
                        
                        this.$router.replace({name:'app'})
                    }
                    // console.log('login/getTokenId::')
                    // console.log(response)
                    // console.log('store.state.token::')
                    // console.log(this.$store.state.token)
                    // console.log('route.query.tokenId::')
                    // console.log(this.$route.query.tokenId)
                })
            }
            else{
                // console.log(123456789098765432345678)
                this.tokenId = this.$store.state.token
                this.getInfo()
                this.queryMchtAct();
                this.wxShare();
            }
            // console.log('11111111111111111')
            // console.log(this.$store.state.token)
        },
        getCardList(){
            this.$util.postRequest('/walletpn/bankCard/cardList', {tokenId:this.tokenId})
            .then( response => {
             
                if(response.data == ''){
                    this.bindCard = false
                    this.bindCardShow = false
                }
                else if(response.data.ERRORCODE){
                    this.bindCard = false
                    this.bindCardShow = false
                    this.$util.Message.error({message: response.data.ERRORMSG});
                }else{
                    this.bindCard = true;
                    this.bindCardShow = true;
                }
                // console.log('bankCard/cardList::')
                // console.log(response)
                // console.log('store.state.token::')
                // console.log(this.$store.state.token)
                // console.log('route.query.tokenId::')
                // console.log(this.$route.query.tokenId)
                
            })
        },

        toPay(tlIssuerId,issuerId,productNo,discountRatio){
            //'/walletpn/cusProducts/pay?tlIssuerId=' + v.tlIssuerId +'&issuerId=' + v.issuerId +'&productNo=' + v.productNo + '&discountRatio=' + v.discount + '&tokenId=' + tokenId
            
            this.tlIssuerId=tlIssuerId;
            this.issuerId=issuerId;
            this.productNo=productNo;
            this.discountRatio = discountRatio;
            this.$nextTick(function () {
                this.$refs.payForm.submit();
            })
        },


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

        huodong(){
            //判断是否绑卡，如果未绑卡先绑卡
            if(!this.isBind){
                this.$router.push({ name: 'bindUser'});
            }else{
                this.$router.push({ name: 'cusFriendsShare2'});
            }
        },
        //点击红包
        toRedPocket(){
            //判断是否绑卡，如果未绑卡先绑卡
            if(!this.isBind){
                this.$router.push({ name: 'bindUser'});
            }else{
                this.$router.push({ name: 'myRedPocketList'});
            }
        },


        //=============微信分享start==============

        wxShare(){
            this.$util.postRequest('/walletpn/cusInvite/wxShare',{tokenId:this.tokenId})
            .then( response => {
                console.log(1)
                console.log(response)
                this.detail = response.data
                this.goToWX()
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
                //alert(JSON.stringify(err))
            });
        },
        //=============微信分享end================
    },
    computed:{

    },
    created(){
        this.getTokenId();
    }
}
</script>