<template>
    <!--完善信息-->
    <div>
        <div class="app-wrap pt-20">
            <div class="pay-check-investment">
                <dl class="sub-list">
                    <dd style="border-top: none; margin-top: 0; padding-top: 0;">
                        <div class="title">
                            <span class="c">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dingtou"></use>
                                </svg>
                            </span>
                            <span class="t">{{productSaleInfo.prodName}}</span>
                        </div>
                        <div class="content">
                            <div class="l">
                                <div class="orange">{{productSaleInfo.prodRate}}</div>
                                <div class="gray">收益率</div>
                            </div>
                            <div class="m">
                                <div class="b">{{productSaleInfo.prodTerm}}个月</div>
                                <div class="gray">产品期限</div>
                            </div>
                            <div class="r">
                                <div class="b">{{productSaleInfo.prodBuyMinmonye}}元起购</div>
                                <div>{{(Number(productSaleInfo.prodRaiseLimit)/10000).toFixed(2)}}万募集上限</div>
                            </div>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="withdrawal-pop-up">
            <div class="withdrawal-content pb-100">
                <div class="title">
                    <span class="t">投资金额</span>
                    <!-- <div class="r">当前活期余额 <span class="orange">{{productSaleInfo.balanceMoney}}</span>元</div> -->
                </div>
                <div class="input-content">
                    <div class="title">¥</div>
                    <div class="input-box">
                        <input v-model="amount" @blur="scrollTop()" type="number" v-bind:placeholder="purchase(productSaleInfo.prodBuyMinmonye)">
                        <div v-if="amount != ''" @click="amount = ''" class="clear-input">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-guanbi"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div v-show="wayNum == 2" style="color: #ccc; margin-top:1rem; margin-left: 2rem;">
                    银行卡限额:单笔<span class="orange">{{formatAmount(bankInfo.singleLmt)}}</span>元，单日<span class="orange">{{formatAmount(bankInfo.dayLmt)}}</span>元
                </div>
                <!-- <div class="title">
                    <span class="t">投资方式</span>
                </div>
                <ul class="payment-method-ul">
                    <li @click="wayNum = 1" v-bind:class="{ selected: wayNum == 1 }">活期余额<span class="orange">{{productSaleInfo.balanceMoney}}</span>元</li>
                    <li @click="wayNum = 2" v-bind:class="{ selected: wayNum == 2 }" style="padding-left:44px;">
                        <div class="logo"> -->
                            <!-- <img src="@/assets/img/bank/cmb.png"> -->
                            <!-- <img :src="imgSrc">
                        </div>
                        {{bankInfo.mBankName}} 储蓄卡（{{bankInfo.cardId}}）
                    </li>
                </ul> -->

                <div class="investment-amount-box" style="margin:0px; box-shadow:none; -webkit-box-shadow:none">
                    <div class="payment-method">
                        <div class="title">支付方式</div>
                        <ul>
                            <li :class="{ selected: wayNum == 1 }">
                                <div>活期余额<span class="orange">&nbsp;{{productSaleInfo.balanceMoney}}&nbsp;</span>元</div>
                                <span class="checkbox font-size" @click="wayNum = 1">
                                    <!--<input type="checkbox">-->
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-dui"></use>
                                    </svg>
                                </span>
                            </li>
                            <li :class="{ selected: wayNum == 2 }" v-if="queryPower.cz!=='0'">
                                <div>{{bankInfo.mbankName}} 储蓄卡（{{bankInfo.cardId}}）</div>
                                <span class="checkbox font-size" @click="wayNum = 2">
                                    <!--<input type="checkbox">-->
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-dui"></use>
                                    </svg>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <label style="margin-left: 20px; margin-top: 20px; display: inline-block;">
                    <input type="checkbox" v-model="agree"> 同意
                    <a href="javascript:void(0)" class="blue" @click="linkToAgreement" v-if="queryPower.instanceId!=='76'">《借款协议》</a>
                    <a href="javascript:void(0)" class="blue" @click="linkToAgreement" v-else>《企业入金合规说明》</a>
                    <!--<router-link to="/agreement" class="blue">《借款协议》</router-link>-->
                </label>
                <a v-if="btnState == 3" class="btn btn-blue mt-30" href="javascript:void(0)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dui1"></use>
                    </svg>
                    投资成功
                </a>
                <a v-if="btnState == 2" class="btn btn-blue mt-30" href="javascript:void(0)">
                    <svg class="icon rotate" aria-hidden="true">
                        <use xlink:href="#icon-jiazai1"></use>
                    </svg>
                    正在投资
                </a>
                <a v-if="btnState == 1 & agree === true" @click="topUp" class="btn btn-blue mt-30" href="javascript:void(0);">确定</a>
                <a v-else-if="btnState == 1 & agree[0] !== true" class="btn btn-gray mt-30" href="javascript:void(0);">确定</a>
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
        name: "investment",
        data(){
            return {
                productSaleInfo: '',
                prodId: this.$route.params.id,
                amount: '',
                passWord: '',
                btnState: 1,
                bankInfo: {},
                imgSrc: '',
                wayNum: 1,
                agree:true
            }
        },
        methods:{
            scrollTop(){
                util.scrollTop()
            },
            formatAmount(val){
                return util.formatAmount(val);
            },
            productSale(){
                util.axiosPost('/eebpc/buy/productSale', {
                    prodId: this.prodId
                })
                .then(res => {
                    console.log(res)
                    this.productSaleInfo = res.data
                })
            },

            topUp(){
                var exp = /^([1-9][\d]{0,9}|0)(\.[\d]{1,2})?$/;
                if(exp.test(this.amount)){
                    if(this.amount < this.productSaleInfo.prodBuyMinmonye){
                        Toast({
                            message:'金额小于起购金额!',
                            duration:3000
                        });
                    }
                    else if(Number(this.wayNum) == 1 && Number(this.amount) > util.toNumber(this.productSaleInfo.balanceMoney)){
                       Toast({
                            message:'余额小于购买产品金额!',
                            duration:3000
                        });
                    }
                    else if(Number(this.amount) > util.toNumber(this.productSaleInfo.prodRaiseLimit)){
                       Toast({
                            message:'金额大于募集上限!',
                            duration:3000
                        });
                    }
                    else{
                        AIP.addKeyboardPayPassword(this.amount, {callback:this.getV, forgot:this.getF})
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
                    this.bankInfo = res.data
                    this.imgSrc = require('@/assets/img/bank/'+ this.bankInfo.name +'.png')
                    this.bankInfo.cardId = res.data.cardId.substring(res.data.cardId.length-4);
                })
            },
            getWayUrl(){
                if(this.wayNum == 1){
                    console.log('--余额支付--')
                    return '/eebpc/buy/productSaleSubimt'

                }
                else{
                    console.log('--银行卡支付--')
                    return '/eebpc/buy/productSaleSubimt2'
                }
            },
            getV(){
                this.btnState = 2
                this.passWord = encrypt($("#passWordInput").val(),this.key);
                util.axiosPost(this.getWayUrl(),
                    {
                        prodId: this.productSaleInfo.prodId,
                        money: this.amount,
                        password: this.passWord
                    }
                )
                .then( response => {
                    console.log(this.amount);
                    console.log(this.passWord);
                    console.log(response);
                    console.log('1');
                    if(response.data.state == 0){
                        console.log('--成功--')
                        this.btnState = 3
                        // MessageBox.alert('投资成功!','提示').then(action => {
                        //     this.$router.push({path:'/investRegularly'});
                        // });
                        setTimeout(()=>{
                            this.$router.push({path:'/investRegularly'});
                        }, 3000)
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
            },
            purchase(num){
                return num + "元起投"
            },
            linkToAgreement(){
                this.$router.push({name:"agreement", params:{inputAmount:this.amount}});
            }

        },
        created(){
            this.getBankInfo()
            this.whetherSigned()
            this.$store.dispatch('getKey',{});
            this.productSale()
            // fastClick.attach(document.body);
        },
        mounted(){

        },
        computed:{
            ...mapGetters({
                key:'getKey',
                queryPower:'getQueryPower'
            })
        },
        components:{
            wxshare
        }
    }
</script>

<style scoped>
</style>
