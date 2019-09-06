<template>
    <!--完善信息-->
    <div>
        <div class="app-wrap">
            <div  v-for="(v,i) in itemList" :key="i" class="pay-check-investment">
                <dl class="sub-list" >
                    <dd style="border-top: none; margin-top: 0; padding-top: 0;">
                        <div class="title">
                            <span class="c" v-if="v.fixedTerm==2">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dingtou"></use>
                                </svg>
                            </span>
                            <span class="c yellow" v-if="v.fixedTerm==1">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dingtou"></use>
                                </svg>
                            </span>

                            <span class="t">{{v.prodName}}</span>
                           <!-- <a v-if="v.fixedTerm==2" @click="transferCurrent(v.prod_order_id, v.prod_money_inc, v.prodTerm)" class="b" href="javascript:void(0);">转活期</a>-->
                        </div>
                        <div class="content" @click="investmentDetail(v)">
                            <div class="l">
                                <div class="orange">{{v.prod_money_inc}}</div>
                                <div class="gray">投资金额</div>
                            </div>
                            <div class="m">
                                <div v-if="v.fixedTerm==2" class="b">{{v.prodTerm}}个月</div>
                                <div v-if="v.fixedTerm==1" class="b">{{v.prodTerm}}天</div>
                                <div class="gray">产品期限</div>
                            </div>
                            <div class="r">
                                <div class="b">利率 {{v.prodRate}}</div>
                                <div>预期收益￥{{v.preliminary_earnings}}</div>
                            </div>
                        </div>
                        <div class="date-box">
                            <div class="l">
                                <span>购买日</span>
                                {{v.orderDate}}
                            </div>
                            <div class="r">
                                <span>到期日</span>
                                {{v.interestsDate}}
                            </div>
                        </div>
                    </dd>
                </dl>
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
        name: "investRegularly",
        data(){
            return {
                itemList: [],
                dialogPopUp: false,
                withdrawalPopUp: false,
                dialogPopUpInfo: '',
                submitData: {}
            }
        },
        methods:{
            getListInfo(){
                console.log(1)
                util.axiosPost('/eebpc/wealthCenter/getProdOrderVoListByUserId')
                .then(res => {
                    console.log(2)
                    console.log(res)
                    this.itemList = res.data.prodOrderVoList
                    console.log(res.data.prodOrderVoList)
                })
                .catch( err => {
                    console.log(3)
                    console.log(err)
                })
            },investmentDetail(v){
                if(v.fixedTerm==2){
                    this.$router.push({name:"investmentDetail1", params:{v:v}})
                }else if(v.fixedTerm==1){
                    this.$router.push({name:"investmentDetail2", params:{v:v}})
                }
            },
            transferCurrent(orderId, money, term){
                var hour = util.getCurrHour();
                if(hour>=21){
                    Toast({
                        message: '此时间为非交易时间',
                        duration:3000
                    });
                    return;
                }
                util.axiosPost('/eebpc/buy/unsubscribe', {
                    prodOrderId: orderId
                })
                .then(res => {
                    console.log(4)
                    console.log(res)
                    this.dialogPopUpInfo = res.data
                    this.dialogPopUpInfo.prod_money_inc = money
                    this.dialogPopUpInfo.prodTerm = term
                    this.dialogPopUp = true;

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
            this.getListInfo()
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
.app-wrap .pay-check-investment .sub-list dd .content .orange {
    font-size: 16px;
}
.app-wrap .pay-check-investment:first-child{
    margin: 10px 20px 10px 20px!important;
}
</style>
