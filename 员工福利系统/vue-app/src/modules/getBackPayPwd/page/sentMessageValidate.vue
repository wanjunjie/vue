<template>
    <div class="app-wrap">
        <div class="login-top-title pt-50">
            <div>准备发送短信验证码至您的手机</div>
            <div class="mt-20 fs-19 blue">{{mobileNo |mobileNoSplit }}</div>
        </div>
        <dl class="form-list mt-35">
            <dd>
                <div class="title">验证码</div>
                <div class="input-box">
                    <input type="tel" placeholder="请输入短信验证码" v-model="msgCode" maxlength="6" >
                    <div class="right">
                        <a href="javascript:void(0)" v-if="countdown" @click="getVerificationCode" >获取验证码</a>
                        <span v-else >{{count}}</span>
                    </div>
                </div>
            </dd>
        </dl>
        <div class="btn-box">
            <a class="btn blue fs-14" href="javascript:void(0)" @click="getVoiceVerificationCode">语音验证码</a>
            <a class="btn btn-blue mt-10" @click="next"  href="javascript:void(0)">下一步</a>
        </div>


        <!--微信分享标签-->
        <wxshare/>
    </div>
</template>
<script>

    import $ from 'jquery'
    import AIP from '@/util/aip'
    import util from '@/util/util'
    import { Toast, MessageBox } from 'mint-ui'
    import {mapGetters} from 'vuex';
    import wxshare from '../../../components/wxshare'

export default {
    
    data(){
        return {
            mobileNo:"",
            mobileNoMark:"",
            isSend:true,   //是否点击发送短信验证码
            msgCode:"",//短信验证码
            smsFlow:"",//短信验证码返回流水号
            count: '60',//倒计时
            countdown:true,//是否展示倒计时
            getSuccess:false,
        }
    },
    filters:{
        mobileNoSplit(mobileNo){
            if(mobileNo && null !=mobileNo){
                var temp = mobileNo.substring(0, 3)+"****"+mobileNo.substring(7, 11);
                return temp;
            }
        }
    },
    methods:{ 
       
       //获取短信验证码
        getVerificationCode(){
           this.countdown = false;
           util.openIndicator();
           util.axiosPost('/eebpc/getBackPwd/sentMessage',{smsType:0})
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
            util.openIndicator();
            util.axiosPost('/eebpc/getBackPwd/sentMessage',{smsType:2})
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
        next(){
            if(!util.isValidate(this.msgCode)){
                Toast({
                    message:'请输入短信验证码!',
                    duration:3000
                });
                return;
            }
            if(!util.isNumber(this.msgCode)){
                Toast({
                    message:'短信验证码一定是数字!',
                    duration:3000
                });
                return;
            }
            util.openIndicator();
            util.axiosPost('/eebpc/getBackPwd/validateSms',{smsFlow:this.smsFlow,msgCode:this.msgCode})
            .then(res => {
                console.log(res);
                if(res == undefined || null == res){
                    return;
                }
                this.$router.push({name:'resetPwd'});
            });
        },


    },
    computed:{

    },
    created(){
    },
    components:{
        wxshare
    }
}
</script>