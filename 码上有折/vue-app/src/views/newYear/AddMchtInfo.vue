<template>
    <div class="app">
        <div class="my-red-packets-p">
            <div class="p-img">
                <div class="banner-info">
                    <div class="t">开通活动</div>
                    <div class="i">开通活动后，<b>推荐用户扫码领红包，您可得赏金。</b>赏金将存入以下账号。关注<b>通联钱包公众号</b>或下载<b>通联钱包APP</b>即可查看赏金。</div>
                </div>
                <img src="@/assets/images/my-red-packets_19.png">
            </div>
        </div>
       <div class="my-red-packets-input-list">
            <div class="item">
                <span class="t">商户信息</span>
                <div class="i">
                    <input type="text" v-model="mchtInfo" maxlength="20" placeholder="请输入您的商户信息">
                    <div class="prompt">限20字</div>
                </div>
                
            </div>
            <div class="item">
                <span class="t">手机号</span>
                <div class="i"><input type="text" placeholder="请输入可用的手机号"  v-model="mobileNo" maxlength="11" ></div>
            </div>
            <div class="item">
                <span class="t">验证码</span>
                <div class="i"><input type="text" placeholder="请输入短信验证码" v-model="msgCode" maxlength="6" ></div>
                <a class="r-l"  v-if="countdown" @click="getVerificationCode" href="javascript:void(0);" >获取</a>
                <a class="r-l" v-else>{{count}}</a>
            </div>
            <div class="agreement">
                <a href="javascript:void(0);" @click="getVoiceVerificationCode">获取语音验证码</a>
            </div>
       </div>
       <a class="link-btn-orange" style="margin-top:.6rem;" href="javascript:void(0)" @click="getRedPacket">开通活动</a>
       <div class="renew-bottom-info">若您是顾客，请告知商家开通活动</div>
    </div>
</template>

<script>
import '@/assets/css/app.css'
export default {
    data(){
        return {
            mchtInfo:"",
            mobileNo:"",
            isSend:true,   //是否点击发送短信验证码
            msgCode:"",//短信验证码
            smsFlow:"",//短信验证码返回流水号
            count: '60',//倒计时
            countdown:true,//是否展示倒计时
            getSuccess:false,
            tokenId: ''
        }
    },
    methods:{ //获取短信验证码
       
       //获取短信验证码
        getVerificationCode(){

            if(!this.$util.isValidate(this.mchtInfo)){
                Toast({
                    message:'请输入商户信息!',
                    duration:3000
                });
                return;
            }
           this.countdown = false;
           this.$util.openIndicator();
           this.$util.postRequest('/walletpn/cusMchtInfo/sentMessage',{tokenId:this.tokenId,smsType:0,mobileNo:this.mobileNo})
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

            if(!this.$util.isValidate(this.mchtInfo)){
                Toast({
                    message:'请输入商户信息!',
                    duration:3000
                });
                return;
            }
            this.$util.openIndicator();
           this.$util.postRequest('/walletpn/cusMchtInfo/sentMessage',{tokenId:this.tokenId,smsType:2,mobileNo:this.mobileNo})
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
            if(this.$route.query.tokenId){
                this.tokenId = this.$route.query.tokenId;

                sessionStorage.setItem("tokenId",this.tokenId);
                window.location.replace("/walletpn/vueapp/#/addMchtInfo");
                //this.$router.replace({name:'addMchtInfo'})
            }else{

                this.tokenId = sessionStorage.getItem("tokenId");
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
             this.$util.postRequest('/walletpn/cusMchtInfo/addMchtInfo',{tokenId:this.tokenId,smsFlow:this.smsFlow,msgCode:this.msgCode,mobileNo:this.mobileNo,mchtInfo:this.mchtInfo})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                
                this.$router.push({name:'addMchtSucc',params:{mobileNo:this.mobileNo}});
            });
        }
    },
    computed:{

    },
    created(){
        this.saveTokenId();
    }
}
</script>