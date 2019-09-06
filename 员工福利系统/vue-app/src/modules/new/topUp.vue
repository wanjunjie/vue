<template>
    <!--充值-->
    <div class="app-wrap">
    <div>
        <div class="page-xjkcz-top-info">
            <div class="content">
                <div class="name">小金库</div>
                <div class="info"><span v-if="currentProdVo.hqreoat != '0%'">年化收益率{{currentProdVo.hqreoat}}</span> <span>可用于购买理财产品</span></div>
            </div>
            
        </div>
        <div class="page-lccpsg-payment page-xjkcz-payment">
            <div class="title">支付账户</div>
            <dl class="payment-list">
                <dd>
                    <div class="bank"><img :src="imgSrc"></div>
                    <div class="info">
                        <div class="n">{{bankInfo.mbankName}} 储蓄卡{{bankInfo.cardId!=undefined?`(${bankInfo.cardId})`:''}}</div>
                        <div class="i">
                            <span v-if="bankInfo.singleLmt">单笔限额{{formatAmount(bankInfo.singleLmt)}}元</span> <span v-if="bankInfo.dayLmt">,单日限额{{formatAmount(bankInfo.dayLmt)}}元</span>
                            <!-- <span>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-wen"></use>
                                </svg>
                            </span> -->
                        </div>
                    </div>
                </dd>
            </dl>
        </div>
        <div class="page-lccpsg-amount">
            <div class="title">
                充值金额
                <span class="r">当前余额 <span class="orange">{{bankInfo.money?bankInfo.money:0}}</span>元</span>
            </div>
            <div class="input-box">
                <span class="f">¥</span>
                <div class="input">
                    <input class="num" @blur="scrollTop" v-model="amount" type="number" :placeholder="bankInfo.prodBuyMinmonye+'元起投'">
                    <div v-if="amount != ''" @click="amount = ''" class="clear-input">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="input-bottom-info" v-if="currentProdVo.hqreoat != '0%'">{{userAccountInfoVo.today}}（今日）开始计算收益，{{userAccountInfoVo.endDay}}首笔收益到账</div>

             <a v-if="btnState == 3" class="blue-btn" href="javascript:void(0)">
                <span class="i">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dui1"></use>
                    </svg>
                </span>
                <span class="t">充值成功</span>
            </a>
            <a v-if="btnState == 2" class="blue-btn" href="javascript:void(0)">
                <span class="i">
                    <svg class="icon rotate" aria-hidden="true">
                        <use xlink:href="#icon-jiazai1"></use>
                    </svg>
                </span>
                <span class="t">正在充值</span>
            </a>
            <a v-if="btnState == 1" @click="topUp" class="blue-btn" href="javascript:void(0);"><span class="t">充值赚收益</span></a>

          
        </div>
        
    </div>
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
        name: "newTopUp",
        data(){
            return {
                bankInfo: {},
                amount: '',
                passWord: '',
                btnState: 1,
                imgSrc: '',
                userAccountInfoVo: {
                    today: '',
                    endDay: ''
                },
                currentProdVo:{
                    hqreoat:'',
                    balancePreliminaryEarnings:'',
                    demandCycDay:''
                }
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
                            this.$router.push({path:'/wealthMain2'});
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
                    if(res.data.exits != 1 && res.data.exits != 2){
                        this.$router.push({path:'/perfectInfor'});
                    }
                })
                .catch( err => {
                    console.log(err);
                });
            },
            getIndexInfo(){
                util.axiosPost('/eebpc/myCurrentAcc/getInfo'
                ).then(resp=>{
                    console.log("==myCurrentAcc/getInfo====");
                    console.log(resp.data);
                    this.indexInfo =resp.data;
                    this.userAccountInfoVo = resp.data.userAccountInfoVo;
                    this.currentProdVo = resp.data.currentProdVo;
                });
            }
        },
        created(){
            this.getIndexInfo();
            this.whetherSigned();
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
