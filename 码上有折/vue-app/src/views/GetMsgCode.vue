<template>
    <div class="app">
        <div class="validation-code-top">
            设置特权银行卡需要校验短信验证码
        </div>
        <div class="validation-code-tel">
            {{mobileNoMark}}
        </div>
       <div class="form-input-list">
            <div class="item">
                <span class="t">验证码</span>
                <div class="i"><input ref="msgCode" type="tel" placeholder="请输入短信验证码" v-model="msgCode" maxlength="6"></div>
                <a v-if="countdown" @click="getVerificationCode" class="r-l" href="javascript:void(0);">获取</a>
                <span v-else class="r-l">{{count}}秒后重发</span>
            </div>
       </div>
        <a class="link-btn-orange" style="margin-top:1rem;" href="javascript:void(0)" @click="conf">确定</a>
  
    </div>
</template>

<script>
import '@/assets/css/app.css'
import { Toast } from 'mint-ui'
export default {
    name: 'AddMsgCode',
    data(){
        return{
            agreeId:"",//协议编号
            mobileNo:"",
            mobileNoMark:"",
            smsFlow:"",//短信验证码返回流水号
            isSend:false,   //是否点击发送短信验证码
            msgCode:"",//短信验证码
            count: '',//倒计时
            countdown:true,//是否展示倒计时
        }
    },
    created(){
        this.agreeId = this.$route.params.id;
        this.mobileNo = this.$route.params.mobileNo;
        this.mobileNoMark = this.mobileNo.substring(0,3)+"****"+this.mobileNo.substring(this.mobileNo.length-4);
    },
    methods:{
        //获取短信验证码
        getVerificationCode(){
            this.$util.openIndicator();
           this.$util.postRequest('/walletpn/bankCard/sentMessage',{tokenId:this.$store.state.token,smsType:'0',mobileNo:this.mobileNo})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                this.smsFlow=res.data.smsFlow;
                this.isSend = true;
            
                this.count = 60;
                this.countdown = false;
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


        //确认提交
        conf(){
            if(!this.$util.isValidate(this.msgCode)){
                Toast({
                    message:'请输入短信验证码!',
                    duration:3000
                });
                return;
            }
            this.$util.openIndicator();
             this.$util.postRequest('/walletpn/bankCard/setPrivilegeCard',{tokenId:this.$store.state.token,agreeId:this.agreeId,smsFlow:this.smsFlow,smsNo:this.msgCode})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                this.$router.push({name:'addSucess'});
            });
        }
    }
}
</script>
