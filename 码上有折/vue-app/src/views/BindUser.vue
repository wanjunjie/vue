<template>
    <div class="app">
        <div class="validation-code-top">
            请补充手机号
        </div>
       <div class="form-input-list">
            <div class="item">
                <span class="t">手机号</span>
                <div class="i"><input type="text" placeholder="请输入手机号" v-model="mobileNo" maxlength="11"></div>
            </div>
            <div class="item">
                <span class="t">验证码</span>
                <div class="i"><input type="text" placeholder="请输入短信验证码"  v-model="msgCode" maxlength="6"></div>
                <a class="r-l"  v-if="countdown" @click="getVerificationCode" href="javascript:void(0);">获取</a>
                <span v-else class="r-l">{{count}}秒后重发</span>
            </div>
            <div class="agreement">
                <a class="orange"  @click="getVoiceVerificationCode" href="javascript:void(0);">获取语音验证码</a>
            </div>
       </div>
        <a class="link-btn-orange" style="margin-top:1rem;"  href="javascript:void(0)" @click="bindConfirm">确定</a>
  
        
    </div>
</template>

<script>
import '@/assets/css/app.css'
export default {
    name: 'PayApplication',
    data(){
        return{
            mobileNo:"",
            isSend:true,   //是否点击发送短信验证码
            msgCode:"",//短信验证码
            smsFlow:"",//短信验证码返回流水号
            count: '60',//倒计时
            countdown:true,//是否展示倒计时
            tokenId: this.$store.state.token
        }
    },
    created(){

                
    },
    methods:{




        //获取短信验证码
        getVerificationCode(){
           this.countdown = false;
           this.$util.openIndicator();
           this.$util.postRequest('/walletpn/login/sentMessage',{tokenId:this.tokenId,smsType:0,mobileNo:this.mobileNo})
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
           this.$util.postRequest('/walletpn/login/sentMessage',{tokenId:this.tokenId,smsType:2,mobileNo:this.mobileNo})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                
                this.smsFlow=res.data.smsFlow;
                this.isSend = true;
            });
        },
        //确认提交
        bindConfirm(){
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
             this.$util.postRequest('/walletpn/login/bindUser',{referrerTokenId:localStorage.getItem('referrerTokenId'),tokenId:this.tokenId,smsFlow:this.smsFlow,msgCode:this.msgCode,mobileNo:this.mobileNo})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                localStorage.removeItem('referrerTokenId');
                this.$router.push({name:'app'});
            });
        }
    }
}
</script>
