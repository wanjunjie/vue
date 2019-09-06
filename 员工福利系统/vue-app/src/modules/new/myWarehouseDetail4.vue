<template>
<div class="app-wrap">
    <div>
        <dl class="page-wdcc-dqlctzz-info-list">
            <dd>
                <span>持仓金额（元）</span>
                <span class="r">{{v.prod_money_inc}}</span>
            </dd>
            <dd>
                <span>产品期限</span>
                <span class="r">{{v.prodTerm}}天</span>
            </dd>
            <dd>
                <span>年化收益率</span>
                <span class="r">{{v.prodRate}}</span>
            </dd>
            <dd>
                <span>提前赎回收益率</span>
                <span class="r">{{currentProdVo.hqreoat}}</span>
            </dd>
            <dd>
                <span>支付账户</span>
                <span class="r">{{bankInfo.mbankName}}{{bankInfo.cardId!=undefined?`(${bankInfo.cardId})`:''}}</span>
            </dd>
            <dd>
                <span>到期处理方式</span>
                <span class="r">本期自动投续</span>
            </dd>
        </dl>
        <dl  class="page-wdcc-dqlctzz-info-list">
            <dd @click="showAgreement">
                <span v-if="queryPower.instanceId!=='76'">借款协议</span>
                <span v-else>企业入金合规说明</span>
                <span class="r">查看
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg></span>
            </dd>
        </dl>
        <dl>
            <dd>
            </dd>
        </dl>

        <ul class="page-wdcc-dqlctzz-time-list">
            <li class="selected">
                <div class="time">
                    <div class="d">{{getMMDD(v.orderDate)}}</div>
                    <div class="y">{{getYYYY(v.orderDate)}}</div>
                </div>
                <div class="info">
                    <div class="t">申购成功</div>
                    <div class="n">金额：{{v.prod_money_inc}}</div>
                </div>
            </li>
            <!--<li>
                <div class="time">
                    <div class="d">11月29日</div>
                    <div class="y">2019年</div>
                </div>
                <div class="info">
                    <div class="t">到期将自动续投</div>
                    <div class="n">金额：9,999.99</div>
                </div>
            </li>-->
        </ul>
        <!--<div class="btn-box">
            <a class="btn btn-blue" @click="confirm">提前赎回</a>
        </div>-->
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
    export default {
        name: "investRegularly",
        data(){
            return {
                bankInfo: {},
                v:"",
                dialogPopUp: false,
                withdrawalPopUp: false,
                dialogPopUpInfo: '',
                submitData: {},
                currentProdVo:{
                    hqreoat:'',
                    balancePreliminaryEarnings:'',
                    demandCycDay:''
                }
            }
        },
        methods:{
            getMMDD(date){
                return date.substring(5,7)+"月"+date.substring(8,10)
            },
            getYYYY(date){
                return date.substring(0,4)+"年"
            },
            getInfo(){
                util.axiosPost('/eebpc/myCurrentAcc/getInfo'
                ).then(resp=>{
                    console.log("==myCurrentAcc/getInfo====");
                    console.log(resp.data);
                    this.currentProdVo = resp.data.currentProdVo;
                });
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
            show(){
                this.dialogPopUp = true;
            },
            showAgreement(){
                    this.$router.push({name:"agreement1", params:{fixedTerm:this.v.fixedTerm,prod_money_inc:this.v.prod_money_inc,prodRate:this.v.prodRate,prodTerm:this.v.prodTerm,orderDate:this.v.orderDate,interestsDate:this.v.interestsDate}})
            },
            confirm(){
                    this.$router.push({name:"myWarehouseDetailConf", params:{v:this.v}})
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
            this.getInfo();
            this.getBankInfo();
        },
        mounted(){

        },
        computed:{
            ...mapGetters({
                key:'getKey',
                queryPower:'getQueryPower'
            })
        }
    }
</script>

<style scoped>
</style>
