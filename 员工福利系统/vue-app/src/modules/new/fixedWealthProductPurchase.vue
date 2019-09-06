<template>
    <div class="app-wrap">
        <div>
            <div class="page-lccpsg-name-info">
                <div class="name">{{resultData.enterpriseProdInfo.prodName}}</div>
                <div class="info">剩余可投资额度 {{resultData.prodBal}} 元</div>
            </div>
            <div class="page-lccpsg-payment">
                <div class="title">支付账户</div>
                <dl class="payment-list">
                    <dd :class="chkPaymentTypes==0?'selected':''" @click="changePaymentType(0)">
                        <div class="bank"><img src="@/assets/img/bank/bank-xjk.png"></div>
                        <div class="info">
                            <div class="n">小金库</div>
                            <div class="i">
                                <span>账户金额 {{resultData.balanceMonye}} 元</span>
                            </div>
                        </div>
                        <span class="radio">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dui2"></use>
                            </svg>
                        </span>
                    </dd>
                    <dd :class="chkPaymentTypes==1?'selected':''" v-if="queryPower.cz!=='0'" @click="changePaymentType(1)">
                        <div class="bank"><img :src="imgSrc"></div>
                        <div class="info">
                            <div class="n">{{resultData.organizationVo.mBankName}} {{resultData.organizationVo.cardBin}} ({{resultData.organizationVo.cardId}})</div>
                            <div class="i">
                                <!-- <span>单笔限额5000元，单日限额5000元</span> -->
                                <span>单笔限额{{formatAmount(resultData.singleLmt)}}元，单日限额{{formatAmount(resultData.dayLmt)}}元</span>
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
                        <input class="num" type="number" @blur="scrollTop()"  :placeholder="(resultData.enterpriseProdInfo.prodBuyMinmonye?resultData.enterpriseProdInfo.prodBuyMinmonye:0)+'元起投'" v-model="amount">
                        <div v-show="amount!=''" class="clear-input" @click="amount=''">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-guanbi"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="input-bottom-info">{{resultData.today}}（今日）开始计算收益</div>

                <a v-if="fixedObj.prodState==1" class="blue-btn btn-disabled" href="javascript:void(0)">
                    <span class="t">投资未开始</span>
                </a>
                <a v-if="fixedObj.prodState !=1 & agree === true" @click="invest" class="blue-btn" href="javascript:void(0)">
                    <span class="t">投资</span>
                </a>
                <a v-else-if="fixedObj.prodState !=1 & agree[0] !== true" class="blue-btn btn-disabled" href="javascript:void(0)">
                    <span class="t">投资</span>
                </a>

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
        name: "newFixedWealthProductPurchase", 
        filters:{
            formatDate(val,pattern){
                return util.formatDate.format(val,pattern);
            }
        },
        watch:{
            'amount':{
                handler(newValue,oldValue){
                    if(util.isValidate(newValue)){
                        this.$store.dispatch('getExpectedEarnings',{prodId:this.fixedObj.prodId,money:newValue}).then(resp=>{
                            console.log(resp.data);
                            this.estimate = resp.data;
                        })
                    }
                }
            }
        },
        data(){
            return {
                amount:'',
                chkPaymentTypes:0,
                resultData:{
                    balanceMonye : '0.00',
                    enterpriseProdInfo:{},
                    organizationVo:{
                        mBankName:'',
                        cardBin:'',
                        cardId:''
                    }
                },
                passWord:'',
                estimate:0,
                agree:true,
                imgSrc:""
            }
        },
        methods:{
            scrollTop(){
                util.scrollTop()
            },
            formatAmount(val){
                return util.formatAmount(val);
            },
            changePaymentType(selectedIndex=0){
                this.chkPaymentTypes = selectedIndex;
            },
            //投资
            invest(){
                if(this.validaorForm()){
                    AIP.addKeyboardPayPassword(this.amount, {callback:this.submit, forgot:this.info});
                }
            },
            submit(){
                this.passWord = encrypt($("#passWordInput").val(),this.key);

                var data = {
                    prodId:this.fixedObj.prodId,
                    money:this.amount,
                    password:this.passWord
                };
                switch(this.chkPaymentTypes){
                    //0 活期余额
                    case 0:
                        this.$store.dispatch('termProBuy',data).then(resp=>{
                            console.log(resp.data);
                            this.$router.push('/wealthMain2');
                        });
                        break;

                    //1 从银行卡购买固定期限产品
                    case 1:
                        this.$store.dispatch('productSaleProd',data).then(resp=>{
                            console.log(resp.data);
                            this.$router.push('/wealthMain2');
                        });
                        break;
                }
            },
            info(){
                 this.$router.push({path:'/userValidate'});
            },
            validaorForm(){
                if(!util.isValidate(this.amount)){
                    Toast({message:'投资金额不能为空!'});
                    return false;
                }
                if(!util.isNumber(this.amount)){
                    Toast({message:'投资金额只能是数字!'});
                    return false;
                }
                if(util.toNumber(this.amount)<util.toNumber(this.resultData.enterpriseProdInfo.prodBuyMinmonye)){
                    Toast({message:'投资金额不能小于起投金额!'});
                    return false;
                }
                return true;
            },
            linkToAgreement(){
                this.$router.push({name:'agreement',params:{inputAmount:this.amount}});
            }

        },
        created(){
            this.$store.dispatch('queryProdDetail',this.fixedObj).then(resp=>{
                console.log(resp.data);
                this.resultData = resp.data;
                this.imgSrc = require('@/assets/img/bank/'+ this.resultData.organizationVo.name +'.png')
            });
            this.$store.dispatch('getKey',{});

        },
        computed:{
            fixedObj(){
                if(this.$route.params.fixedObj !== undefined){
                    sessionStorage.setItem('fixedWealth_01', this.$route.params.fixedObj);
                    return JSON.parse(this.$route.params.fixedObj);
                }
                else{
                    return JSON.parse(sessionStorage.getItem('fixedWealth_01'))
                }
            },
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
