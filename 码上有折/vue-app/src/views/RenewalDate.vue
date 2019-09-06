<template>
<div>
    <div class="renew-top-info">
        您的超级会员已经到期，续费后即可继续享受折扣
    </div>
    <div class="renew-item">
        <span class="i"><img src="@/assets/images/2018-10-23_03.png"></span>
        <span class="t">
            <b>限时特惠</b>
            <span class="n"><span class="b">2</span>元/月</span>
            <span class="g">10元/月</span>
        </span>
    </div>
    <a class="link-btn-orange" style="margin-top:2.5rem;" href="#" @click="toRenew">立即续费</a>
    <a class="link-btn-gray" style="margin-top:.5rem;" :href="'/walletpn/products/pay?issuerId='+issuerId+'&productNo='+productNo+ '&discountRatio='+discountRatio"  >暂不续费，原价买单</a>
    
    <div class="renew-bottom-info">
       <a @click="share = true"> 邀请好友，享免费续会员</a>
    </div>
    
    <!--
    <form ref="myBankForm" :action="renewParam.requestURL" target="_blank">
    -->
    <form  v-if="renewParam"  submit="" ref="payForm" :action="renewParam.requestURL" >
        <input type="hidden" :key="key" :value="val" v-if="key!='requestURL'" :name="key" v-for="(val,key) in renewParam"/>
    </form>
     <!-- 分享 -->
    <div v-if="share" class="popup-share">
        <div class="icon-share">
            <span>点击上方分享功能</span>
        </div>
        <div @click="share = false" class="bg-content"></div>
    </div>
</div>
</template>

<script>
import '@/assets/css/app.css'
import wx from 'weixin-js-sdk'
export default {
    name: 'renewalDate',
    data(){
        return{
            renewParam:{},
            wxConfParam:{},
            wxSharaParam:{},
            share: false,
            thumb: require ('@/assets/logo.png'),
            issuerId:"",//发卡机构
            productNo:"",//折扣权益商品号
            discountRatio:10 //折扣率,100元的商品，售卖95元，折扣率为0.05
        }
    },
    created(){
        //原价买单参数
        this.issuerId = this.$route.query.issuerId;
        this.productNo = this.$route.query.productNo;

        // alert("window.location.href:"+window.location.href);
        //获取微信权限注入参数
        this.$util.postRequest('/walletpn/invite/wxConfig')
                .then( res => {
                    // console.log(res)
                    
                    this.wxConfParam = JSON.parse(JSON.stringify(res.data));

                    if( res.data == undefined){
                        return;
                    }
                    
                    wx.config({
                        debug: false,
                        appId: this.wxConfParam.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                        timestamp:this.wxConfParam.timestamp, // 必填，生成签名的时间戳
                        nonceStr: this.wxConfParam.nonceStr, // 必填，生成签名的随机串
                        signature: this.wxConfParam.signature,// 必填，签名，见附录1
                        //需要分享的列表项:发送给朋友，分享到朋友圈
                        jsApiList: [
                        'onMenuShareAppMessage','onMenuShareTimeline'
                        ]
                    });

                    let imgUrl = location.protocol + location.host + this.thumb;
                    //查询微信分享参数
                    this.$util.postRequest('/walletpn/invite/wxShare')
                        .then( res => {
                                console.log(res)
                        this.wxSharaParam = res.data;
                    
                    });

                    wx.ready(()=>{

                            
                            
                            //分享给朋友
                            wx.onMenuShareAppMessage({
                                title: this.wxSharaParam.title, // 分享标题
                                desc: this.wxSharaParam.desc, // 分享描述
                                link: this.wxSharaParam.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: imgUrl, // 分享图标
                                //type: this.wxSharaParam.type, // 分享类型,music、video或link，不填默认为link
                                //dataUrl: this.wxSharaParam.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                                success: function (res) {
                                    // 用户确认分享后执行的回调函数
                                    console.log("分享给朋友成功返回的信息为:",res);
                                }
                            });


                            //分享朋友圈
                            wx.onMenuShareTimeline({
                                title: this.wxSharaParam.title, // 分享标题
                                desc: this.wxSharaParam.desc, // 分享描述
                                link: this.wxSharaParam.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: imgUrl, // 分享图标
                                //type: this.wxSharaParam.type, // 分享类型,music、video或link，不填默认为link
                                // dataUrl: this.wxSharaParam.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                                success: function (res) {
                                    // 用户确认分享后执行的回调函数
                                    console.log("分享朋友圈成功返回的信息为:",res);
                                }
                            });

                        });
                });

    },
    methods:{

        //会员续费
        async toRenew(){
            let result =false;
            await this.$util.postRequest('/walletpn/renew/renew',{amount:"100"})
                .then( res => {
                    console.log(res)
                    this.renewParam = res.data;
                    
                    if(res.data == undefined || res.data.errorCode!=undefined){
                        result=false;
                    }else{
                        result = true;
                    }
                });

                if( result){
                    //拼装form，跳转收银台支付
                    this.$refs.payForm.submit();
                }
                
        },

    }
}
</script>
