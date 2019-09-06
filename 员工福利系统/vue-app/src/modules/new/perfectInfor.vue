<template>
    <!--完善信息-->
    <div>
        <div v-if="stop == 1" class="app-wrap">
            <div class="login-top-title pt-30">
                <div>因您绑定的银行卡所在银行规定</div>
                <div class="mt-10">需先补充银行预留手机号方可进行资金交易</div>
            </div>
            <div class="bank-info mt-25">
                <span class="img">
                    <img :src="imgSrc">
                </span>
                <span>{{bankInfo.mbankName}}  储蓄卡{{bankInfo.cardId!=undefined?`(${bankInfo.cardId})`:''}}</span>
            </div>
            <div class="login-top-title pt-30" v-if="bankInfo.singleLmt||bankInfo.dayLmt">
                <div style="color: darkgray;">
                    银行卡限额:
                    <span v-if="bankInfo.singleLmt">
                        单笔
                        <span class="orange">{{formatAmount(bankInfo.singleLmt)}}</span>
                        元&nbsp;&nbsp;
                    </span>

                    <span v-if="bankInfo.dayLmt">
                        单日
                        <span class="orange">{{formatAmount(bankInfo.dayLmt)}}</span>
                        元
                    </span>
                </div>
            </div>
            <dl class="form-list mt-35">
                <dd>
                    <div class="title">手机号</div>
                    <div class="input-box">
                        <input type="tel" v-model="phone" placeholder="请输入银行预留手机号">
                    </div>
                </dd>
                <dd>
                    <div class="title">验证码</div>
                    <div class="input-box">
                        <input type="tel" v-model="smsCode" placeholder="请输入6位验证码">
                        <div class="right">
                            <a v-if="countdown" @click="getVerificationCode" href="javascript:void(0)">获取验证码</a>
                            <span v-else>{{count}}秒后重发</span>
                        </div>
                    </div>
                </dd>
            </dl>
            <div class="btn-box mt-35">
                <a @click="contract" class="btn btn-blue mt-10" href="javascript:void(0)">确认开通</a>
            </div>
        </div>
        <div v-else class="loading">
            <div class="content">
                <svg class="icon rotate" aria-hidden="true">
                    <use xlink:href="#icon-jiazai1"></use>
                </svg>
            </div>
        </div>

        <!--微信分享标签-->
        <wxshare/>
    </div>


</template>

<script>
    import axios from 'axios';
    import util from '@/util/util';
    import { Toast, MessageBox } from 'mint-ui';
    import wxshare from '../../components/wxshare'
    export default {
        name: "newPerfectInfor",
        data(){
            return {
                stop: 2,
                bankInfo: {},
                phone: '',
                countdown: true,
                count: '',
                smsCode: '',
                imgSrc: ''
            }
        },
        methods:{
            formatAmount(val){
                return util.formatAmount(val);
            },
            getInfo(){
                axios.post('/eebpc/queryBank/queryBankNameAndMoney')
                .then( response => {
                    console.log('123456788721')
                    console.log(response);
                    this.bankInfo = response.data;
                    this.imgSrc = require('@/assets/img/bank/'+ this.bankInfo.name +'.png')
                    this.bankInfo.cardId = response.data.cardId.substring(response.data.cardId.length-4);

                })
                .catch( error => {
                    console.log(error);
                });
            },
            getVerificationCode(){
                axios.post('/eebpc/agreePay/queryAgree')
                .then(res => {
                    console.log(res)
                    console.log('1')
                    return util.axiosPost('/eebpc/agreePay/signApplyHFive',
                        {
                            mobileNo: this.phone
                        }
                    )
                    .then( response => {
                        console.log(response);
                        console.log('2');
                    })
                })
                .catch( err => {
                    console.log('3')
                    console.log(err);
                });

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
            },
            contract(){
                var myreg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                if (!myreg.test(this.phone)) {
                    Toast({
                        message:'手机号码格式有误!',
                        duration:3000
                    });
                }
                if(!util.isValidate(this.smsCode)){
                    Toast({message:'短信验证码不能为空!'});
                    return false;
                }
                util.axiosPost('/eebpc/agreePay/signConf',
                    {
                        smsCode: this.smsCode
                    }
                )
                .then( response => {
                    console.log(response);
                    console.log('1');
                    if(response.errorMsg){
                        Toast({
                            message: response.errorMsg,
                            duration:3000
                        });
                    }
                    else{
                        MessageBox.alert('签约成功!','提示').then(action => {
                            this.$router.push({path:'/wealthMain2'});
                        });
                    }
                })
                .catch( err => {
                    console.log('2')
                    console.log(err);
                });
            },
            whetherSigned(){
                util.axiosPost('/eebpc/agreePay/queryAgree')
                .then( res => {
                    let user = JSON.parse(sessionStorage.getItem('user'));
                    if(!user){
                        sessionStorage.setItem('user', JSON.stringify(res));
                    }

                    console.log(res);
                    console.log('1');
                    if(res.data.exits != 1 && res.data.exits != 2){
                        this.$router.push({path:'/wealthMain2'});
                    }
                    else{
                        // util.axiosPost('/eebpc/query/queryPhoneNumber')
                        // .then( response => {
                        //     console.log(response);
                        //     console.log('2');
                        //     if(response.data.phoneNumber != ''){
                        //         console.log(response.data.phoneNumber);
                        //         this.stop = 2;
                        //         this.phone = response.data.phoneNumber;
                        //     }
                        //     else{
                        //         this.stop = 1;
                        //         this.getInfo();
                        //     }
                        // })
                        this.stop = 1;
                        this.getInfo();
                        console.log(res.data.exits);
                    }
                })
                .catch( err => {
                    console.log('3')
                    console.log(err);
                });
            }
        },
        created(){
            this.whetherSigned();
        },
        components:{
            wxshare
        }
    }
</script>

<style scoped>
.loading{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
}
.loading .content{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: -25px;
    font-size: 50px;
    color: #eee;
}
</style>
