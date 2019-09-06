<template>
    <!--fixedWealth  固定期限理财-->
    <div class="app-wrap">
        <div class="pay-check-investment mt-20">
            <dl class="sub-list">
                <dd style="border-top: none; margin-top: 0; padding-top: 0;">
                    <div class="title">
                        <span class="c">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dingtou"></use>
                            </svg>
                        </span>
                        <span class="t">{{resultData.enterpriseProdInfo.prodName}}</span>
                    </div>
                    <div class="content">
                        <div class="l">
                            <div class="orange">{{resultData.enterpriseProdInfo.prodRate}}</div>
                            <div class="gray">收益率</div>
                        </div>
                        <div class="m">
                            <div class="b">{{resultData.enterpriseProdInfo.prodTerm}}天</div>
                            <div class="gray">稳定期</div>
                        </div>
                        <div class="r">
                            <div class="b">{{resultData.enterpriseProdInfo.prodBuyMinmonye}}元起购</div>
                            <div>{{resultData.enterpriseProdInfo.prodRaiseLimit}}募集上限</div>
                        </div>
                    </div>
                    <div class="time-progress">
                        <ul>
                            <li :class="resultData.enterpriseProdInfo.prodState>=1?'selected':''">
                                <div class="top">开始募集</div>
                                <div class="bottom">{{resultData.enterpriseProdInfo.preSaleStart | formatDate('yyyy.MM.dd')}}</div>
                            </li>
                            <li :class="resultData.enterpriseProdInfo.prodState>=2?'selected':''">
                                <div class="top">募集结束</div>
                                <div class="bottom">{{resultData.enterpriseProdInfo.preSaleEnd | formatDate('yyyy.MM.dd')}}</div>
                            </li>
                            <li :class="resultData.enterpriseProdInfo.prodState>=3?'selected':''">
                                <div class="top">计息开始</div>
                                <div class="bottom">{{resultData.enterpriseProdInfo.closedPeriodStart | formatDate('yyyy.MM.dd')}}</div>
                            </li>
                            <li :class="resultData.enterpriseProdInfo.prodState>=4?'selected':''">
                                <div class="top">计息结束</div>
                                <div class="bottom">{{resultData.enterpriseProdInfo.closedPeriodEnd | formatDate('yyyy.MM.dd')}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="other-info">
                        <div>
                            <!-- 募集期享受活期利息 -->
                            <ul class="u-l">
                                <li>{{queryPower.instanceId==='72'?'募集期利率:3%':'募集期享受活期利息'}}</li>
                                <li>该产品不支持提前赎回</li>
                                <li v-if="1==resultData.enterpriseProdInfo.demandCycType">每月{{resultData.enterpriseProdInfo.demandCycDay}}号结息至活期账户</li>
                            </ul>
                        </div>
                        <!-- <div class="r"></div> -->
                    </div>
                </dd>
            </dl>
        </div>
        <div class="investment-amount-box">
            <div class="title">
                <span class="t">投资金额</span>
                <div class="r">预估收益 <span class="orange">{{estimate}}</span>元</div>
            </div>
            <div class="input-content">
                <div class="title">¥</div>
                <div class="input-box">
                    <input type="number" @blur="scrollTop()"  :placeholder="(resultData.enterpriseProdInfo.prodBuyMinmonye?resultData.enterpriseProdInfo.prodBuyMinmonye:0)+'元起投'" v-model="amount">
                    <div v-show="amount!=''" class="clear-input" @click="amount=''">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="payment-method">
                <div class="title">支付方式</div>
                <ul>
                    <li :class="chkPaymentTypes==0?'selected':''">
                        <div>活期余额<span class="orange">{{resultData.balanceMonye}}</span>元</div>
                        <span class="checkbox font-size" @click="changePaymentType(0)">
                            <!--<input type="checkbox">-->
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dui"></use>
                            </svg>
                        </span>
                    </li>
                    <li :class="chkPaymentTypes==1?'selected':''" v-if="queryPower.cz!=='0'">
                        <div>{{resultData.organizationVo.mBankName}} {{resultData.organizationVo.cardBin}} ({{resultData.organizationVo.cardId}})</div>
                        <span class="checkbox font-size" @click="changePaymentType(1)">
                            <!--<input type="checkbox">-->
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dui"></use>
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>
            <label style="margin-left: 20px; margin-top: 20px; display: inline-block;">
                <input type="checkbox" v-model="agree"> 同意
                <a href="javascript:void(0)" class="blue" @click="linkToAgreement" v-if="queryPower.instanceId!=='76'">《借款协议》</a>
                <a href="javascript:void(0)" class="blue" @click="linkToAgreement" v-else>《企业入金合规说明》</a>
                <!--<router-link to="/agreement" class="blue">《借款协议》</router-link>-->
            </label>
        </div>
        <div class="bottom-fixed-box">
            <a v-if="fixedObj.prodState==1" class="btn btn-gray" onselectstart="return false" href="javascript:void(0)">投资未开始</a>

            <a v-if="fixedObj.prodState !=1 & agree === true" @click="invest" class="btn btn-blue" onselectstart="return false" href="javascript:void(0);">投资</a>
            <a v-else-if="fixedObj.prodState !=1 & agree[0] !== true" class="btn btn-gray" onselectstart="return false" href="javascript:void(0);">投资</a>
            <!-- <a @click="login" class="btn btn-blue" href="javascript:void(0)">绑定</a> -->
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
        name: "fixedWealth",
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
                agree:true
            }
        },
        methods:{
            scrollTop(){
                util.scrollTop()
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
                            this.$router.push('/');
                        });
                        break;

                    //1 从银行卡购买固定期限产品
                    case 1:
                        this.$store.dispatch('productSaleProd',data).then(resp=>{
                            console.log(resp.data);
                            this.$router.push('/');
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
