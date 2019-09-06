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
                        <div class="title">募集期</div>
                        <div class="info">{{prodDetail.enterpriseProdInfo.preSaleStart | formatDate('yyyy.MM.dd')}}-{{prodDetail.enterpriseProdInfo.preSaleEnd | formatDate('yyyy.MM.dd')}}</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">锁定期</div>
                        <div class="info">{{v.prodTerm}}天</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">募集期利率</div>
                        <div class="info">{{dialogPopUpInfo.currentProdRate}}</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">锁定期利率</div>
                        <div class="info">{{v.prodRate}}</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">结息方式</div>
                        <div class="info" v-if="prodDetail.enterpriseProdInfo.demandCycType==1">按月结息</div>
                        <div class="info" v-else>到期结息</div>
                    </a>
                </dd>
                <dd v-if="prodDetail.enterpriseProdInfo.demandCycType==1">
                    <a href="javascript:void(0)">
                        <div class="title">结息日</div>
                        <div class="info">{{prodDetail.enterpriseProdInfo.demandCycDay}}号</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">到期本金处理方式</div>
                        <div class="info">自动转至活期账户</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">到期利息处理方式</div>
                        <div class="info">自动转至活期账户</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">利息计算公式</div>
                        <div class="info">本金*投资天数*利率/365</div>
                    </a>
                </dd>
                <dd>
                    <a href="javascript:void(0)">
                        <div class="title">投资天数</div>
                        <div class="info">投资当日至回款当日的前一日</div>
                    </a>
                </dd>
                <dt v-if="prodDetail.enterpriseProdInfo.demandCycType==1">
                    募集期利息会在第一个结息日结息，最后一个结息日至锁定期结束期间产生的利息在到期日结息
                </dt>
                <dt v-else>
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
                        <div class="title">
                            <span>预期收益</span>
                            <span class="ts">募集期利息+锁定期利息</span>
                        </div>
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
    import wxshare from '../../../components/wxshare'
    export default {
        name: "investRegularly",
        data(){
            return {
                v:{},
                dialogPopUp: false,
                withdrawalPopUp: false,
                dialogPopUpInfo: '',
                submitData: {},
                prodDetail:{

                }
            }
        },
        filters:{
            formatDate(val,pattern){
                return util.formatDate.format(val,pattern);
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
            util.axiosPost('/eebpc/wealthCenter/getProdDetail', {
                    prodId: this.v.prodId
                }).then(resp=>{
                console.log(resp.data);
                this.prodDetail = resp.data;
            });
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

