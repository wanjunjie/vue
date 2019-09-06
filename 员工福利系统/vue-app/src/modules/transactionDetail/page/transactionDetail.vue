<template>
    <!--交易明细-->
    <div class="app-wrap">
        <div id="mint-loadmore-top" class="transaction-details">
            <ul class="head clearfix">
                <li v-for="(v,i) in navHead" :class="v.clazz" :key="i"><a @click="changeType(v)" href="javascript:void(0)">{{v.name}}</a></li>
            </ul>
            <div style="overflow:scroll; height: 100vh; -webkit-overflow-scrolling : touch;">
                <mt-loadmore bottomPullText="加载更多" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
                    <ul class="body">
                        <li class="current">
                            <dl>
                                <div v-for="(v,i) in totalAllList" :key="i">

                                    <dd>
                                        <div class="name">{{v.tradeIntro}}</div>
                                        <div class="date">{{v.tradeDate | formatDate('yyyy.MM.dd')}}</div>
                                        <div class="num orange" v-if="Number(v.tradeType)==1">+{{v.mount | fixedAmount(2)}}
                                            <span class="inf" v-if="v.tradingStatus==1||v.tradingStatus=='1'">成功</span>
                                            <span class="inred" v-else-if="v.tradingStatus==5||v.tradingStatus=='5'">审核不通过</span>
                                            <span class="inred" v-else-if="v.tradingStatus==7||v.tradingStatus=='7'">处理中</span>
                                            <span class="inred" v-else>失败</span>
                                        </div>
                                        <div class="num" v-else-if="Number(v.tradeType)==2">-{{v.mount | fixedAmount(2)}}
                                            <span class="inf" v-if="v.tradingStatus==1||v.tradingStatus=='1'">成功</span>
                                            <span class="inred" v-else-if="v.tradingStatus==5||v.tradingStatus=='5'">审核不通过</span>
                                            <span class="inred" v-else-if="v.tradingStatus==7||v.tradingStatus=='7'">处理中</span>
                                            <span class="inred" v-else>失败</span>
                                        </div>
                                        <div class="num" v-else>{{v.mount | fixedAmount(2)}}
                                            <span class="inf" v-if="v.tradingStatus==1||v.tradingStatus=='1'">成功</span>
                                            <span class="inred" v-else-if="v.tradingStatus==5||v.tradingStatus=='5'">审核不通过</span>
                                            <span class="inred" v-else-if="v.tradingStatus==7||v.tradingStatus=='7'">处理中</span>
                                            <span class="inred" v-else>失败</span>
                                        </div>
                                    </dd>
                                    <dd v-if="v.tradingStatus==5||v.tradingStatus=='5'" class="tips-why">
                                        <span>不通过原因：</span>
                                        <span v-if="v.bankRetmsg">{{v.bankRetmsg}}</span>
                                        <span v-else>无</span>
                                    </dd>
                                </div>

                            </dl>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>

        <!--微信分享标签-->
        <wxshare/>
    </div>
</template>

<script>

    import util from '@/util/util';
    import { Toast,Loadmore,Indicator } from 'mint-ui';
    import wxshare from '../../../components/wxshare'
    export default {
        name: "transactionDetail",
        filters:{
            formatDate(val,pattern){
                return util.formatDate.format(val,pattern);
            },
            fixedAmount(val,pattern){
                return util.isNumber(val)?Number(val).toFixed(pattern):'0.00';
            }
        },
        data(){
            return {
                navHead:[
                    {name:'全部',clazz:'current',typeCode:'0'},
                    {name:'充值',clazz:'',typeCode:'1'},
                    {name:'提现',clazz:'',typeCode:'2'},
                    {name:'投资',clazz:'',typeCode:'3'}
                ],
                navObj:{},//当前是全部还是充值还是提现还是投资
                pageData:{
                    currentPage:1,    //currentPage  查询页码
                    typeCode:'0'        //0全部1充值2提现3投资
                },
                //这个数据方便自己看里面的数据结构
                resultData:{
                    endRow:0,
                    nextPage:0,//下一页
                    pageIndex:0,//当前页号
                    pageSize:10,//页面数据条数
                    prePage:1,//上一页
                    record:0,//记录总数
                    sartRow:0,
                    totalPageCount:0,//总页数
                    houseList:[]
                },
                totalAllList:[],
                allLoaded:false,//下拉刷新
            }
        },
        methods:{
            loadTop(){
                // 加载更多数据
                console.log('下拉加载数据');
                this.changeType(this.navObj);
                this.$refs.loadmore.onTopLoaded();
            },
            loadBottom() {
                // 加载更多数据
                console.log('上拉加载数据');

                if(this.resultData.pageIndex==this.resultData.totalPageCount){//当前页等于最大页数
                    this.allLoaded = true;// 若数据已全部获取完毕
                }
                this.pageData.currentPage++;
                this.commContent();
                this.$refs.loadmore.onBottomLoaded();
            },
            //类型切换
            changeType(v){
                this.navObj = v;
                this.navHead.forEach(item=>item.clazz='');
                v.clazz = 'current';
                //以上是样式切换
                //以下是数据初始化
                this.pageData.currentPage = 1;
                this.pageData.typeCode = v.typeCode;//0全部1充值2提现3投资
                this.totalAllList = new Array();//清空重新开始加载
                this.allLoaded = false;// 若数据已全部获取完毕
                this.commContent();
            },
            commContent(){
                Indicator.open();//防止重复表单提交，一个加载中的遮罩层
                this.$store.dispatch('qureyEmployeeFinanceDetailInfoHFive',this.pageData).then(resp=>{
                    console.log(resp.data);
                    this.resultData = resp.data;
                    this.totalAllList = this.totalAllList.concat(this.resultData.houseList);

                    Indicator.close();
                });
            }
        },
        created(){
            this.commContent();
        },
        components:{
            wxshare
        }
    }
</script>

<style scoped>
    .tips-why{
        color:rgb(123,123,123); font-size: .75rem; font-weight: 100;
        letter-spacing: 0.01rem; padding:.7rem 0rem!important;
        border-top: dashed 0.03rem gray;
    }
</style>
