<template>
    <!--fixedWealth  固定期限理财-->
    <div class="app-wrap">
        <div class="gray-bg pb-100">
            <div class="page-dqlc-pro">
                <div class="title">{{resultData.enterpriseProdInfo.prodName}}</div>
                <ul class="info clearfix">
                    <li>
                        <div class="t orange t-l">{{resultData.enterpriseProdInfo.prodRate}}</div>
                        <div class="i t-l">年化收益率</div>
                    </li>
                    <li>
                        <div class="t">{{resultData.enterpriseProdInfo.prodTerm}}</div>
                        <div class="i">产品期限（天）</div>
                    </li>
                    <li>
                        <div class="t">{{resultData.enterpriseProdInfo.prodBuyMinmonye}}</div>
                        <div class="i">起购金额（元）</div>
                    </li>
                </ul>
                <div class="tag">
                    <span>募集期内申购</span>
                    <span>到期自动赎回</span>
                </div>
            </div>
            <dl class="page-wdcc-dqlctzz-info-list">
                <dd>
                <span>产品募集规模</span>
                <span class="r">{{(Number(resultData.enterpriseProdInfo.prodRaiseLimit)/10000).toFixed(2)}}万元</span>
                </dd>
                <dd>
                    <span>募集期</span>
                    <span class="r">{{resultData.enterpriseProdInfo.preSaleStart | formatDate('yyyy年MM月dd日')}}</span>
                </dd>
                <dd>
                    <span>募集期收益率</span>
                    <span class="r">{{resultData.enterpriseProdInfo.prodRate}}</span>
                </dd>
                <dd>
                    <span>结算方式</span>
                    <span class="r">到期结息<span v-if="resultData.enterpriseProdInfo.demandCycType == 1">/每月{{resultData.enterpriseProdInfo.demandCycDay}}日</span></span>
                </dd>
            </dl>
            <div class="page-gdqlc-rule">
                <div class="title">交易规则</div>
                <ul class="ul clearfix">
                    <li class="selected" style="width: 40%;">
                        <div class="t">募集开始</div>
                        <div class="time">{{resultData.enterpriseProdInfo.preSaleStart | formatDate('MM月dd日')}}</div>
                        <div class="icon"></div>
                        <div class="line"></div>
                    </li>
                    <li style="width: 56%;">
                        <div class="t">募集结束</div>
                        <div class="time">{{resultData.enterpriseProdInfo.preSaleEnd | formatDate('MM月dd日')}}</div>
                        <div class="icon"></div>
                        <div class="line"></div>
                    </li>
                    <li style="width: 0;">
                        <div class="t">到期赎回至小金库</div>
                        <div class="time">{{resultData.enterpriseProdInfo.returnDay | formatDate('MM月dd日')}}</div>
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
                    {{resultData.enterpriseProdInfo.prodDescription}}
                </div>
            </div>
            <a href="javascript:void(0);" class="page-dqlc-bottom-blue-btn"  @click="goTo">
                <span class="t">立即申购</span>
                <span class="i">剩余可申购金额：{{resultData.prodBal}}元</span>
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
        name: "newFixedWealth",
        filters:{
            formatDate(val,pattern){
                return util.formatDate.format(val,pattern);
            }
        },
        watch:{
           
        },
        data(){
            return {
                resultData:{
                    balanceMonye : '0.00',
                    enterpriseProdInfo:{},
                    organizationVo:{
                        mBankName:'',
                        cardBin:'',
                        cardId:''
                    }
                }
            }
        },
        methods:{
            goTo(){
                var hour = util.getCurrHour();
                if(hour>=21){
                    Toast({
                        message: '此时间为非交易时间',
                        duration:3000
                    });
                }else{
                    this.$router.push({path:'/new/fixedWealthProductPurchase'});
                }
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
