<template>
    <!--充值-->
    <div>
        <div class="app-wrap">
            <dl class="withdrawal-bank-list pt-20">
                <dd class="red">
                    <div class="logo">
                        <!-- <img src="@/assets/img/bank/cmb.png"> -->
                        <img :src="imgSrc">
                    </div>
                    <div class="name">{{bankInfo.mbankName}} 储蓄卡{{bankInfo.cardId!=undefined?`(${bankInfo.cardId})`:''}}</div>
                    <div class="num">**** **** **** {{bankInfo.cardId}}</div>
                </dd>
            </dl>
        </div>
        <div class="withdrawal-pop-up">
            <div class="withdrawal-content pb-100">
                <div class="title">
                    <span class="t">充值金额</span>
                    <div class="r">当前余额 <span class="orange">{{bankInfo.money?bankInfo.money:0}}</span>元</div>
                </div>
                <div class="input-content">
                    <div class="title">¥</div>
                    <div class="input-box">
                        <input @blur="scrollTop"  style="font-size: 14px" v-model="amount" type="number" :placeholder="bankInfo.prodBuyMinmonye+'元起投'">
                        <div v-if="amount != ''" @click="amount = ''" class="clear-input">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-guanbi"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="prompt" v-if="bankInfo.singleLmt||bankInfo.dayLmt">
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
                <div class="prompt">收益计算日：当日</div>
                <a v-if="btnState == 3" class="btn btn-blue mt-20" href="javascript:void(0)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dui1"></use>
                    </svg>
                    充值成功
                </a>
                <a v-if="btnState == 2" class="btn btn-blue mt-20" href="javascript:void(0)">
                    <svg class="icon rotate" aria-hidden="true">
                        <use xlink:href="#icon-jiazai1"></use>
                    </svg>
                    正在充值
                </a>
                <a v-if="btnState == 1" @click="topUp" class="btn btn-blue mt-20" href="javascript:void(0);">充值赚收益</a>
            </div>
            <div class="withdrawal-bg"></div>
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
    import {encrypt} from '@/util/encryptPassword'
    import wxshare from '../../../components/wxshare'
    export default {
        name: "topUp",
        data(){
            return {
                bankInfo: {},
                amount: '',
                passWord: '',
                btnState: 1,
                imgSrc: ''
            }
        },
        methods:{
            scrollTop(){
                util.scrollTop()
            },
            formatAmount(val){
                return util.formatAmount(val);
            },
            getV(){
                this.btnState = 2
                this.passWord = encrypt($("#passWordInput").val(),this.key);
                util.axiosPost('/eebpc/agreePay/payConfHFive',
                    {
                        amount: this.amount,
                        password: this.passWord
                    }
                )
                .then( response => {
                    console.log(this.amount);
                    console.log(this.passWord);
                    console.log(response);
                    console.log('1');
                    if(response.data.status == 0){
                        console.log('--成功--')
                        this.btnState = 3
                        // MessageBox.alert('充值成功!','提示').then(action => {
                        //     this.$router.push({path:'/'});
                        // });
                        setTimeout(()=>{
                            this.$router.push({path:'/'});
                        }, 2000)
                    }
                    else if(response.errorMsg){
                        console.log('--报错--')
                        this.btnState = 1
                        Toast({
                            message: response.errorMsg,
                            duration:3000
                        });
                    }
                    else{
                        console.log('--异常--')
                        this.btnState = 1
                        Toast({
                            message: '异常',
                            duration:3000
                        });
                    }
                })
                .catch( err => {
                    console.log('--catch--')
                    console.log(err);
                    this.amount = ''
                    this.btnState = 1
                });
            },
            getF(){
                 this.$router.push({path:'/userValidate'});
            },
            topUp(){
                var exp = /^([1-9][\d]{0,9}|0)(\.[\d]{1,2})?$/;
                if(exp.test(this.amount)){
                    // if(util.isValidate(this.bankInfo)&&util.isValidate(this.bankInfo.prodBuyMinmonye)){
                    if(util.isValidate(this.bankInfo)){
                        if(Number(this.amount)<Number(this.bankInfo.prodBuyMinmonye)){
                            Toast({message:'充值金额不能低于起购金额!',duration:3000});
                        }else{
                            AIP.addKeyboardPayPassword(this.amount, {callback:this.getV, forgot:this.getF});
                        }
                    }
                }
                else{
                    Toast({
                        message:'金额无效!',
                        duration:3000
                    });
                }
            },
            getBankInfo(){
                util.axiosPost('/eebpc/queryBank/queryBankNameAndMoney')
                .then( res => {
                    console.log(res)
                    this.bankInfo = res.data;
                    this.bankInfo.cardId = res.data.cardId.substring(res.data.cardId.length-4);
                     this.imgSrc = require('@/assets/img/bank/'+ this.bankInfo.name +'.png');
                })
            },
            whetherSigned(){
                util.axiosPost('/eebpc/agreePay/queryAgree')
                .then( res => {
                    console.log(res);
                    if(res.data.exits != 1){
                        this.$router.push({path:'/perfectInfor'});
                    }
                })
                .catch( err => {
                    console.log(err);
                });
            }
        },
        created(){
            this.whetherSigned()
            this.$store.dispatch('getKey',{});
            this.getBankInfo();
            // fastClick.attach(document.body);
        },
        mounted(){

        },
        computed:{
            ...mapGetters({
                key:'getKey'
            })
        },
        components:{
            wxshare
        }
    }
</script>

<style scoped>
</style>
