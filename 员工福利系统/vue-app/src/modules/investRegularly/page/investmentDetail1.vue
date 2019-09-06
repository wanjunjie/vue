<template>
    <div class="app-wrap">
        <div class="link-info-box">
            <dl class="link-info-list">
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">产品名称</div>
                        <div class="info">{{v.prodName}}</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">产品期限</div>
                        <div class="info">{{v.prodTerm}}个月</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">定期利率</div>
                        <div class="info">{{v.prodRate}}</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">
                            <span>定期转活期利率</span>
                            <span class="ts">未到期转活期则按该利率计息</span>
                        </div>

                        <div class="info">{{dialogPopUpInfo.currentProdRate}}</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">到期本金处理方式</div>
                        <div class="info">自动续投</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">到期利息处理方式</div>
                        <div class="info">自动续投</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">利息计算公式</div>
                        <div class="info">本金*产品期限*定期利率/12</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">投资天数</div>
                        <div class="info">投资当日至回款当日的前一日</div>
                    </a>
                </dd>
                <dt>
                    定期产品到期后本息自动续投，进入下一周期，用户转活期时，当期会按定转活利率计息，之前的完整周期仍按照定期利率计息。
                </dt>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">投资本金</div>
                        <div class="info">¥ {{v.prod_money_inc}}</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">起投日</div>
                        <div class="info">{{v.orderDate}}</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">到期日</div>
                        <div class="info">{{v.interestsDate}}</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">预期收益</div>
                        <div class="info">¥ {{v.preliminary_earnings}}</div>
                    </a>
                </dd>
                <dt></dt>
                <dd>
                    <a href="javascript:void(0)" @click="showAgreement">
                        <div class="title" v-if="queryPower.instanceId!=='76'">借款协议</div>
                        <div class="title" v-else>企业入金合规说明</div>
                        <div class="info">
                            查看
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-jiantou"></use>
                            </svg>
                        </div>
                    </a>
                </dd>
            </dl>
            <div class="bottom-blue-btn">
                <a @click="show" href="javascript:void(0)">转活期</a>
            </div>
        </div>
        <div v-show="dialogPopUp" class="dialog-pop-up">
            <div class="dialog-content">
                <div class="title">温馨提示</div>
                <div class="info">
                    您正在赎回 金额{{dialogPopUpInfo.prod_money_inc}}元 - 期限 {{dialogPopUpInfo.prodTerm}}个月的定期理财产品，赎回后产品将按定期转活期利率计算收益。
                    <div class="center">
                        当前定期转活期利率为{{dialogPopUpInfo.currentProdRate}}<br>
                        起息日期 {{dialogPopUpInfo.starData}}<br>
                        结息日期 {{dialogPopUpInfo.endData}}
                    </div>
                </div>
                <div class="footer">
                    <div class="l">
                        <a @click="transferCurrentCancel" href="javascript:void(0)">取消</a>
                    </div>
                    <div class="r">
                        <a @click="transferCurrentSure(dialogPopUpInfo.prodId, dialogPopUpInfo.prodOrderId, dialogPopUpInfo.prod_money_inc)" class="blue" href="javascript:void(0)">继续</a>
                    </div>
                </div>
            </div>
            <div class="dialog-bg"></div>
        </div>
        <div v-show="withdrawalPopUp" class="withdrawal-pop-up">
            <div class="withdrawal-content pb-100">
                <div class="head">
                    <router-link class="i" :to="{ path: '/' }">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </router-link>
                    定期转活期
                    <router-link class="qd" :to="{ path: '/' }">确定</router-link>
                </div>
                <div class="pic mt-10"><img src="@/assets/img/pic.png"></div>
                <div class="mt-20 center fs-16">
                    交易成功
                </div>
                <div class="mt-15" style="line-height: 150%;">
                    您可前往 <router-link class="blue" :to="{ path: '/' }">首页</router-link> 查看您的活期账户余额，也可至 <router-link class="blue" :to="{ path: 'transactionDetail' }">交易明细</router-link> 查看交易记录
                </div>
            </div>
            <div class="withdrawal-bg"></div>
        </div>
        <!--<div class="dialog-pop-up">
            <div class="dialog-content">
                <div class="title">定期转活期</div>
                <div class="info">
                    未到期转活期将按照定期转活期利率计息确定转活期吗？
                </div>
                <div class="footer">
                    <div class="l">
                        <a href="javascript:void(0)">确定</a>
                    </div>
                    <div class="r">
                        <a class="blue" href="javascript:void(0)">再想想</a>
                    </div>
                </div>
            </div>
            <div class="dialog-bg"></div>
        </div>-->
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
        name: "investRegularly",
        data(){
            return {
                v:"",
                dialogPopUp: false,
                withdrawalPopUp: false,
                dialogPopUpInfo: '',
                submitData: {}
            }
        },
        methods:{
            show(){
                this.dialogPopUp = true;
            },
            showAgreement(){
                    this.$router.push({name:"agreement1", params:{fixedTerm:this.v.fixedTerm,prod_money_inc:this.v.prod_money_inc,prodRate:this.v.prodRate,prodTerm:this.v.prodTerm,orderDate:this.v.orderDate,interestsDate:this.v.interestsDate}})
            },
            transferCurrent(orderId, money, term){
                util.axiosPost('/eebpc/buy/unsubscribe', {
                    prodOrderId: orderId
                })
                .then(res => {
                    console.log(4)
                    console.log(res)
                    this.dialogPopUpInfo = res.data
                    this.dialogPopUpInfo.prod_money_inc = money
                    this.dialogPopUpInfo.prodTerm = term

                })
                .catch( err => {
                    console.log(5)
                    console.log(err)
                })
            },
            transferCurrentCancel(){
                this.dialogPopUp = false
            },
            transferCurrentSure(prodId, prodOrderId, money){
                this.submitData.prodId = prodId
                this.submitData.prodOrderId = prodOrderId
                this.submitData.prodMoney = money
                this.dialogPopUp = false
                AIP.addKeyboardPayPassword('', {callback:this.getV, forgot:this.getF})
            },
            getV(){
                this.submitData.password = encrypt($("#passWordInput").val(),this.key);
                util.axiosPost('/eebpc/buy/unsubscribeSubimt',
                    this.submitData
                )
                .then( response => {
                    console.log(this.submitData);
                    console.log(response);
                    console.log('1');

                   if(response.data.state == '0'){
                       this.withdrawalPopUp = true;
                       setTimeout(() => {
                           this.$router.push({path:'/'});
                       },2000)
                   }
                })
                .catch( err => {
                    console.log('--catch--')
                    console.log(err);
                });
            },
            getF(){
                 this.$router.push({path:'/userValidate'});
            }
        },
        created(){
            this.$store.dispatch('getKey',{});
            this.v = this.$route.params.v || "";
            if(this.v==''||this.v==null){
             this.v = JSON.parse(sessionStorage.getItem("investmengtDetail_v"));
            }else{
                sessionStorage.setItem("investmengtDetail_v",JSON.stringify(this.v));
            }
            this.transferCurrent(this.v.prod_order_id, this.v.prod_money_inc, this.v.prodTerm);

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
