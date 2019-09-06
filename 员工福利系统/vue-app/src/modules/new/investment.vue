<template>
    <!--完善信息-->
    <div class="app-wrap">
    <div class="gray-bg pb-100">
        <div class="page-dqlc-pro">
            <div class="title">{{productSaleInfo.prodName}}</div>
            <ul class="info clearfix">
                <li>
                    <div class="t orange t-l">{{productSaleInfo.prodRate}}</div>
                    <div class="i t-l">年化收益率</div>
                </li>
                <li>
                    <div class="t">{{productSaleInfo.prodTerm}}</div>
                    <div class="i">产品期限（月）</div>
                </li>
                <li>
                    <div class="t">{{productSaleInfo.prodBuyMinmonye}}</div>
                    <div class="i">起购金额（元）</div>
                </li>
            </ul>
            <div class="tag">
                <span>无募集期，随时投资</span>
                <span>到期自动续投</span>
            </div>
        </div>
        <dl class="page-wdcc-dqlctzz-info-list">
           <dd>
               <span>产品募集规模</span>
               <span class="r">{{(Number(productSaleInfo.prodRaiseLimit)/10000).toFixed(2)}}万元</span>
            </dd>
            <dd>
                <span>提前赎回收益率</span>
                <span class="r">{{productSaleInfo.prodAlterRate}}</span>
            </dd>
        </dl>
        <div class="page-dqlc-rule">
            <div class="title">交易规则</div>
            <ul class="ul clearfix">
                <li class="selected" style="width: 60%;">
                    <div class="tag">可赎回至小金库</div>
                    <div class="t">申请成功</div>
                    <div class="time">{{productSaleInfo.nowDay}}</div>
                    <div class="icon"></div>
                    <div class="line"></div>
                </li>
                <li style="width: 40%;">
                    <div class="t">产品到期自动投续</div>
                    <div class="time">{{productSaleInfo.demandCycDay}}</div>
                    <div class="icon"></div>
                    <div class="line"></div>
                </li>
                <li style="width: 0%;">
                    <div class="t"></div>
                    <div class="time"></div>
                    <div class="icon"></div>
                    <div class="line"></div>
                </li>
            </ul>
            <!-- <div class="infor">
                *文案文案文案文案文案文案文案文案文案文案文案
                *文案文案文案文案文案文案文案文案文案文案文案
                *文案文案文案文案文案文案文案文案文案文案文案
                *文案文案文案文案文案文案文案文案文案文案文案
            </div> -->
        </div>
        <div class="page-dqlc-infor" style="display:none">
            <div class="title">产品说明</div>
            <div class="infor">
                {{productSaleInfo.prodDescription}}
            </div>
        </div>
        <!-- <router-link :to="'/new/investmentProductPurchase/?id=' + prodId" class="page-dqlc-bottom-blue-btn"  @click="recharge"> -->
        <a href="javascript:void(0);" class="page-dqlc-bottom-blue-btn"  @click="goTo">
            <span class="t">立即申购</span>
            <span class="i">剩余可申购金额：{{productSaleInfo.prodBal}}元</span>
        </a>
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
        name: "newInvestment",
        data(){
            return {
                productSaleInfo: '',
                prodId: this.$route.params.id
            }
        },
        methods:{
            //
            goTo(){
                var hour = util.getCurrHour();
                if(hour>=21){
                    Toast({
                        message: '此时间为非交易时间',
                        duration:3000
                    });
                }else{
                    this.$router.push({path:'/new/investmentProductPurchase/?id=' + this.prodId});
                }
            },
           
            productSale(){
                util.axiosPost('/eebpc/buy/productSale', {
                    prodId: this.prodId
                })
                .then(res => {
                    console.log(res)
                    this.productSaleInfo = res.data
                })
            }
        },
        created(){
            this.$store.dispatch('getKey',{});
            this.productSale()
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
