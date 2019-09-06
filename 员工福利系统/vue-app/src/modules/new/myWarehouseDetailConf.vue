<template>
<div class="app-wrap">
    <div>
        <dl class="page-wdcc-tqsh-info-list">
           <dt>产品名称</dt>
           <dd>
               <span class="l">赎回本金：</span>
               <span class="r"><span class="orange">{{v.prod_money_inc}}</span> 元</span>
            </dd>
            <dd>
                <span class="l">利息：</span>
                <span class="r"><span class="orange">{{dialogPopUpInfo.interest}}</span> 元</span>
            </dd>
        </dl>
        <div class="page-wdcc-tqsh-ts">温馨提示：赎回金额及利息将分为两笔到账至您的小金库，请注意查收。</div>
        <div class="page-wdcc-tqsh-js">
            利息是如何计算的？
            <span class="i">&lt;</span>
        </div>
        <dl class="page-wdcc-tqsh-lxjs-info">
            <dd>
                <div class="l-box">
                    <div class="s">赎回本金</div>
                    <div class="b">{{v.prod_money_inc}} 元</div>
                </div>
                <div class="r-box">
                    <div class="s">提前赎回收益率</div>
                    <div class="b">
                        <span class="i">&times;</span>
                       {{dialogPopUpInfo.currentProdRate}}
                    </div>
                </div>
            </dd>
            <dd>
                <div class="r-box">
                    <div class="b">
                        <span class="i">/</span>
                        365
                    </div>
                    <div class="s">
                        计息天数：<br>
                        {{dialogPopUpInfo.starData}} - {{dialogPopUpInfo.endData}}
                    </div>
                    <div class="b">
                        <span class="i">&times;</span>
                       天
                    </div>
                </div>
            </dd>
            <dd>
                <div class="r-box">
                    <div class="s mt-10">利息</div>
                    <div class="b mt-0">
                        <span class="i">=</span>
                        {{dialogPopUpInfo.interest}} 元
                    </div>
                </div>
            </dd>
        </dl>
        <div class="btn-box mt-30">
            <div class="left-btn">
                <a class="btn btn-blue btn-disabled"  @click="transferCurrentSure(dialogPopUpInfo.prodId, dialogPopUpInfo.prodOrderId, dialogPopUpInfo.prod_money_inc)" >确认赎回</a>
            </div>
            <div class="right-btn">
                <router-link class="btn btn-blue"  :to="{ path: '/wealthMain2' }">再想想</router-link>
            </div>
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
    export default {
        name: "myWarehouseDetailConf",
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
                    prodOrderId: orderId,
                    money: money
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
                           this.$router.push({path:'/wealthMain2'});
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
        }
    }
</script>

<style scoped>
</style>
