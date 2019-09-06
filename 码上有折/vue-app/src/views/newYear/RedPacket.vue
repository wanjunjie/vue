<template>
<div class="my-red-packets-p">
        <div class="p-img">
            <div class="top-info">
                <b>要换季换新了</b><span>，给你一个红包<br>超市买单就能直接抵扣</span>
            </div>
            <img src="@/assets/images/my-red-packets_01.png">
        </div>
        <div class="p-img" v-if="redPacketFlag=='0'||redPacketFlag=='2'">
            <div class="top-title">感谢支持</div>
            <img src="@/assets/images/my-red-packets_02.png">
        </div>
        <div class="p-img" v-else>
            <div class="top-title">恭喜您获得红包</div>
            <img src="@/assets/images/my-red-packets_02.png">
        </div>
        <div class="p-img" v-if="redPacketFlag=='0'">
            <div class="get-amount-title">您已领取过该红包</div>
            <img src="@/assets/images/my-red-packets_03.png">
        </div>
        <div class="p-img" v-else-if="redPacketFlag=='2'">
            <div class="get-amount-title">该红包仅限新用户领取</div>
            <img src="@/assets/images/my-red-packets_03.png">
        </div>
        <div class="p-img" v-else>
            <div class="get-amount"><span class="i">¥</span><span class="amount">5.00</span></div>
            <div class="get-amount-info">折后金额大于5元即可使用</div>
            <img src="@/assets/images/my-red-packets_03.png">
        </div>

        <div v-if="redPacketFlag=='0'&& firstyflag" class="p-img content-middle2 use-red-packets">
            <div class="title">红包已发放到账号</div>
            <div class="tel">{{mobileNo | mobileNoSplit}}</div>
            <div class="info">在通联钱包公众号 > 码上有折 > 红包</div>
            <div class="bottom">可以查看</div>

            <div class="qr-code">
                <img src="@/assets/images/my-red-packets_18.png">
            </div>

            <div class="qr-code-info">
                <span>长按关注</span>
                <b>通联钱包</b>
                <span>公众号</span>
            </div>
        </div>
        <div v-else-if="redPacketFlag=='0'&& !firstyflag" class="p-img content-middle use-red-packets">
            <div class="title">红包已发放到账号</div>
            <div class="tel">{{mobileNo | mobileNoSplit}}</div>
            <div class="info">在通联钱包公众号 > 码上有折 > 红包</div>
            <div class="bottom">可以查看</div>
            <div class="btn-link">
                <router-link class="link" to="/app">立即使用</router-link>
            </div>
        </div>
        <div v-else-if="redPacketFlag=='2' && firstyflag" class="p-img content-middle2 use-red-packets">
            <div class="yq">
                <span class="b">欢迎邀请好友</span><br>
                我拿<span class="b">5</span>元<span class="b">现金</span>奖励<br>
               好友拿<span class="b">5</span>元立减红包
            </div>
            <div class="qr-code">
                <img src="@/assets/images/my-red-packets_18.png">
            </div>

            <div class="qr-code-info">
                <span>长按关注</span>
                <b>通联钱包</b>
                <span>公众号</span>
            </div>
        </div>
        <div v-else-if="redPacketFlag=='2' && !firstyflag" class="p-img content-middle use-red-packets">
            <div class="yq">
                <span class="b">欢迎邀请好友</span><br>
                我拿<span class="b">5</span>元<span class="b">现金</span>奖励<br>
               好友拿<span class="b">5</span>元立减红包
            </div>
            <div class="btn-link">
                <router-link class="link" to="/app">邀请好友</router-link>
            </div>
        </div>
        <div v-else-if="getSuccess && firstyflag" class="p-img content-middle2 use-red-packets">
            <div class="title">红包已发放到账号</div>
            <div class="tel">{{mobileNo | mobileNoSplit}}</div>
            <div class="info">在通联钱包公众号 > 码上有折 > 红包</div>
            <div class="bottom">可以查看</div>

            <div class="qr-code">
                <img src="@/assets/images/my-red-packets_18.png">
            </div>

            <div class="qr-code-info">
                <span>长按关注</span>
                <b>通联钱包</b>
                <span>公众号</span>
            </div>
        </div>
        <div v-else-if="getSuccess && !firstyflag" class="p-img content-middle use-red-packets">
            <div class="title">红包已发放到账号</div>
            <div class="tel">{{mobileNo | mobileNoSplit}}</div>
            <div class="info">在通联钱包公众号 > 码上有折 > 红包</div>
            <div class="bottom">可以查看</div>
            <div class="btn-link">
                <router-link class="link" to="/app">立即使用</router-link>
            </div>
        </div>
        <div v-else class="p-img content-middle phone-verification">
            <div class="title">红包将发放到以下手机号：</div>
            <div class="content">
                <div class="tel">
                    <input class="input" type="tel" placeholder="请输入您的手机号码" v-model="mobileNo" maxlength="11" />
                </div>
                <div class="verification">
                    <input class="get a" type="button" v-if="countdown" @click="getVerificationCode" value="获取" />
                    <input class="get b" type="button" v-else :value="count" />
                    <input class="input" type="text" v-model="msgCode" maxlength="6" placeholder="短信验证码" />
                </div>
            </div>
            <div class="bottom">
                <a href="javascript:void(0);" @click="getVoiceVerificationCode">语音验证码</a>
            </div>
            <div class="btn-link">
                <a class="link" href="javascript:void(0)" @click="getRedPacket">收入囊中</a>
            </div>
        </div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_05.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_06.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_07.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_08.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_09.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_10.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_11.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_12.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_13.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_14.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_15.png"></div>
        <div class="p-img"><img src="@/assets/images/my-red-packets_16.png"></div>

    </div>
</template>

<script>
import '@/assets/css/app.css'
import wx from 'weixin-js-sdk'
export default {

    data(){
        return {
            mchtName:"",
            mobileNo:"",
            mobileNoMark:"",
            isSend:true,   //是否点击发送短信验证码
            msgCode:"",//短信验证码
            smsFlow:"",//短信验证码返回流水号
            count: '60',//倒计时
            countdown:true,//是否展示倒计时
            redPacketFlag:'1',
            getSuccess:false,
            tokenId: '',
            detail:'',
            thumb: require ('@/assets/logo.png'),
        }
    },
    filters:{
        mobileNoSplit(mobileNo){
            if(mobileNo && null !=mobileNo){
                var temp = mobileNo.substring(0, 3)+" "+mobileNo.substring(3, 7)+" "+mobileNo.substring(7, 11);
                return temp;
            }
        }
    },
    methods:{ //获取短信验证码
       
       //获取短信验证码
        getVerificationCode(){
           this.countdown = false;
           this.$util.openIndicator();
           this.$util.postRequest('/walletpn/redPacket/sentMessage',{tokenId:this.tokenId,smsType:0,mobileNo:this.mobileNo})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    this.countdown = true;
                    return;
                }

                this.isSend = true;
                this.smsFlow=res.data.smsFlow;
                this.count = 60;
                let timer = setInterval(() => {
                    if (this.count > 0) {
                        this.count--;
                    }
                    else{
                        this.countdown = true;
                        clearInterval(timer);
                    }
                   }, 1000)
                });

        },

        //获取语音验证码
        getVoiceVerificationCode(){
            this.$util.openIndicator();
           this.$util.postRequest('/walletpn/redPacket/sentMessage',{tokenId:this.tokenId,smsType:2,mobileNo:this.mobileNo})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                
                this.smsFlow=res.data.smsFlow;
                this.isSend = true;
            });
        },
       saveTokenId(){
            if(this.$route.query.tokenId && this.$route.query.mobileNo){
                this.mobileNo = this.$route.query.mobileNo;
                this.tokenId = this.$route.query.tokenId;
                this.mchtName = this.$route.query.mchtName;
                this.redPacketFlag = this.$route.query.redPacketFlag;
                this.$store.commit('set_token', this.tokenId);
                if("true"==this.$route.query.firstyflag){
                    this.firstyflag=true;
                }else{
                    this.firstyflag=false;
                }
                this.getSuccess = true;

                sessionStorage.setItem("tokenId",this.tokenId);
                sessionStorage.setItem("mobileNo",this.mobileNo);
                sessionStorage.setItem("mchtName",this.mchtName);
                sessionStorage.setItem("redPacketFlag",this.redPacketFlag);
                sessionStorage.setItem("firstyflag",this.firstyflag);
                sessionStorage.setItem("getSuccess",this.getSuccess);

                window.location.replace("/walletpn/vueapp/#/redPacket");
                //this.$router.replace({path:'redPacket'});
                return;
            }else if(this.$route.query.tokenId){
                this.tokenId = this.$route.query.tokenId;
                this.mchtName = this.$route.query.mchtName;
                this.redPacketFlag = this.$route.query.redPacketFlag;
                if("true"==this.$route.query.firstyflag){
                    this.firstyflag=true;
                }else{
                    this.firstyflag=false;
                }
                sessionStorage.setItem("tokenId",this.tokenId);
                sessionStorage.setItem("mchtName",this.mchtName);
                sessionStorage.setItem("redPacketFlag",this.redPacketFlag);
                sessionStorage.setItem("firstyflag",this.firstyflag);
                window.location.replace("/walletpn/vueapp/#/redPacket");

                return;
            }else{ 
                    this.tokenId=sessionStorage.getItem("tokenId");
                    this.mobileNo=sessionStorage.getItem("mobileNo");
                    this.mchtName=sessionStorage.getItem("mchtName");
                    this.redPacketFlag=sessionStorage.getItem("redPacketFlag");
                    this.firstyflag=sessionStorage.getItem("firstyflag");
                    this.getSuccess=sessionStorage.getItem("getSuccess");
                    if(null==this.tokenId){
                        Toast({
                            message:'页面已过期,请重新打开链接或扫码',
                            duration:3000
                
                        });

                    };
            }
        },
        //确认提交
        getRedPacket(){
            if(!this.$util.isValidate(this.mobileNo)){
                Toast({
                    message:'请输入正确的手机号码!',
                    duration:3000
          
          });
                return;
            }
            if(!this.$util.isValidate(this.msgCode)){
                Toast({
                    message:'请输入短信验证码!',
                    duration:3000
                });
                return;
            }
            this.$util.openIndicator();
             this.$util.postRequest('/walletpn/redPacket/getRedPacket',{tokenId:this.tokenId,smsFlow:this.smsFlow,msgCode:this.msgCode,mobileNo:this.mobileNo})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                this.redPacketFlag = res.data.redPacketFlag;
                this.$store.commit('set_token', this.tokenId);
                this.getSuccess = true;
            });
        },



        //=============微信分享start==============

        wxShare(){
            this.$util.postRequest('/walletpn/cusInvite/wxShare',{tokenId:this.tokenId,queryType:"0"})
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
        this.saveTokenId();
        this.$nextTick(function () {
            this.wxShare();
        })
    }
}
</script>