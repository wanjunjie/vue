<template>
  <div class="app-wrap">
    <div>
        <div class="page-lccpsg-name-info">
            <div class="name">{{productSaleInfo.prodName}}</div>
            <div class="info">剩余可投资额度 {{productSaleInfo.prodBal}} 元</div>
        </div>
        <div class="page-lccpsg-payment">
            <div class="title">支付账户</div>
            <dl class="payment-list">
                <dd :class="{ selected: wayNum == 1 }"  @click="wayNum = 1">
                    <div class="bank"><img src="@/assets/img/bank/bank-xjk.png"></div>
                    <div class="info">
                        <div class="n">小金库</div>
                        <div class="i">
                            <span>账户金额 {{productSaleInfo.balanceMoney}} 元</span>
                        </div>
                    </div>
                    <span class="radio">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dui2"></use>
                        </svg>
                    </span>
                </dd>
                <dd :class="{ selected: wayNum == 2 }" v-if="queryPower.cz!=='0'" @click="wayNum = 2">
                    <div class="bank"><img :src="imgSrc"></div>
                    <div class="info">
                        <div class="n">{{bankInfo.mbankName}} 储蓄卡（{{bankInfo.cardId}}）</div>
                        <div class="i">
                            <span>单笔限额{{formatAmount(bankInfo.singleLmt)}}元，单日限额{{formatAmount(bankInfo.dayLmt)}}元</span>
                            <!-- <span>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-wen"></use>
                                </svg>
                            </span> -->
                        </div>
                    </div>
                    <span class="radio">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dui2"></use>
                        </svg>
                    </span>
                </dd>
            </dl>
        </div>
        <div class="page-lccpsg-amount">
            <div class="title">申购金额</div>
            <div class="input-box">
                <span class="f">¥</span>
                <div class="input">
                    <input class="num" v-model="amount" @blur="scrollTop()" type="number" v-bind:placeholder="purchase(productSaleInfo.prodBuyMinmonye)">
                    <div v-if="amount != ''" @click="amount = ''" class="clear-input">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="input-bottom-info">{{productSaleInfo.today}}（今日）开始计算收益</div>
            
            <a v-if="btnState == 3" class="blue-btn" href="javascript:void(0)">
                <span class="i">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dui1"></use>
                    </svg>
                </span>
                <span class="t">投资成功</span>
            </a>
            <a v-if="btnState == 2" class="blue-btn" href="javascript:void(0)">
                <span class="i">
                    <svg class="icon rotate" aria-hidden="true">
                        <use xlink:href="#icon-jiazai1"></use>
                    </svg>
                </span>
                <span class="t">正在投资</span>
            </a>
            <a v-if="btnState == 1 & agree === true" @click="topUp" class="blue-btn" href="javascript:void(0);"><span class="t">立即申购</span></a>
            <a v-else-if="btnState == 1 & agree[0] !== true" class="blue-btn btn-disabled" href="javascript:void(0);"><span class="t">立即申购</span></a>


            <div class="agree-agreement">
                <span class="checkbox">
                    <input type="checkbox" v-model="agree">
                    <svg :class="['icon', { blue:agree }]" aria-hidden="true">
                        <use xlink:href="#icon-dui"></use>
                    </svg>
                </span>
                <span>我已阅读并同意
                    <a href="javascript:void(0)" class="blue" @click="linkToAgreement" v-if="queryPower.instanceId!=='76'">《借款协议》</a>
                    <a href="javascript:void(0)" class="blue" @click="linkToAgreement" v-else>《企业入金合规说明》</a>
                </span>
            </div>
        </div>
        
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
    import wxshare from '../../components/wxshare'
    export default {
        name: "newInvestmentProductPurchase",
        data(){
            return {
                productSaleInfo: '',
                prodId: this.$route.query.id,
                amount: '',
                passWord: '',
                btnState: 1,
                bankInfo: {},
                imgSrc: '',
                wayNum: 1,
                agree:true,
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
                            this.$router.push({path:'/myWarehouse'});
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
                    if(res.data.exits != 1 && res.data.exits != 2){
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
