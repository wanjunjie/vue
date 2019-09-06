<template>
    <div class="app">
        <div class="validation-code-top">
            本次交易需校验短信验证码<br>已发送至手机 
            {{mobileNoMark}}
        </div>
       <div class="form-input-list">
            <div class="item">
                <span class="t">验证码</span>
                <div class="i"><input ref="msgCode" type="tel" placeholder="请输入短信验证码"  v-model="msgCode" maxlength="6"></div>
                <a class="r-l" v-if="countdown" @click="getVerificationCode" href="javascript:void(0);">重新获取</a>
                <span v-else class="r-l">{{count}}秒后重发</span>
            </div>
            <div class="agreement">
                <a class="orange"  @click="getVoiceVerificationCode" href="javascript:void(0);">获取语音验证码</a>
            </div>
       </div>
        <a class="link-btn-orange" style="margin-top:1rem;"  href="javascript:void(0)" @click="payConfirm">确定</a>
  
        
    </div>
</template>

<script>
import '@/assets/css/app.css'
export default {
    name: 'PayApplication',
    data(){
        return{
            mobileNoMark:"",
            isSend:true,   //是否点击发送短信验证码
            msgCode:"",//短信验证码
            count: '',//倒计时
            countdown:false,//是否展示倒计时
            tokenId: this.$store.state.token
        }
    },
    created(){
        this.queryPaymentOrder();
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
                
    },
    methods:{

        //查询页面初始化信息
        queryPaymentOrder(){
            this.$util.postRequest('/walletpn/payment/queryOrder',{tokenId:this.tokenId})
            .then(res =>{
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                this.mobileNoMark = res.data.ylMobileNo;
            })
        },


        //获取短信验证码
        getVerificationCode(){
           this.countdown = false;
            this.$util.openIndicator();
           this.$util.postRequest('/walletpn/payment/application',{tokenId:this.tokenId,smsType:'0'})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    this.countdown = true;
                    return;
                }

                this.isSend = true;
            
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
                this.$refs.msgCode.focus()

        },

        //获取语音验证码
        getVoiceVerificationCode(){
            this.$util.openIndicator();
           this.$util.postRequest('/walletpn/payment/application',{tokenId:this.tokenId,smsType:'2'})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                this.isSend = true;
            });
        },
        //确认提交
        payConfirm(){
            if(!this.$util.isValidate(this.msgCode)){
                Toast({
                    message:'请输入短信验证码!',
                    duration:3000
                });
                return;
            }
            this.$util.openIndicator();
             this.$util.postRequest('/walletpn/payment/confirm',{tokenId:this.tokenId,msgCode:this.msgCode})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                this.$router.push({name:'paySuccess'});
            });
        }
    }
}
</script>
