<template>
    <!--冻结明细-->
    <div class="app-wrap">
            <div style="overflow:scroll; height: 40rem; -webkit-overflow-scrolling : touch;">
                <mt-loadmore bottomPullText="加载更多" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
                    <dl class="freeze-detail">
                        <dd v-for="(v,i) in totalAllList" :key="i">
                            <div class="date"><span>冻结金额</span> <span class="gray">{{v.mount| fixedAmount(2)}}</span></div>
                            <div class="date mt-10"><span>冻结原因</span> <span class="gray">大额提现</span></div>
                            <div class="num orange" v-if="Number(v.reviewState)==1">待审核
                                <span class="gray">{{v.creatTime | formatDate('MM-dd hh:mm')}}</span>
                            </div>
                            <div class="num" v-else-if="Number(v.reviewState)==2">审核通过
                                <span class="gray">{{v.creatTime | formatDate('MM-dd hh:mm')}}</span>
                            </div>
                            <div class="num orange" v-else-if="Number(v.reviewState)==3">审核失败
                                <span class="gray">{{v.creatTime | formatDate('MM-dd hh:mm')}}</span>
                            </div>
                            <div class="num orange" v-else-if="Number(v.reviewState)==4">审核不通过 {{v.stateInfo}}
                                <span class="gray">{{v.creatTime | formatDate('MM-dd hh:mm')}}</span>
                            </div>
                        </dd>
                    </dl>
                </mt-loadmore>
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
        name: "freezeDetail",
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
                pageData:{
                    currentPage:1,    //currentPage  查询页码
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
                this.changeType();
                this.$refs.loadmore.onTopLoaded();
            },
            loadBottom() {
                // 加载更多数据
                console.log('上拉加载数据');

                if(this.resultData.pageIndex==this.resultData.totalPageCount){//当前页等于最大页数
                    this.allLoaded = true;// 若数据已全部获取完毕
                    Toast({message:'到底了!',duration:3000});
                }
                this.pageData.currentPage++;
                this.commContent();
                this.$refs.loadmore.onBottomLoaded();
            },
            //类型切换
            changeType(){
                //以上是样式切换
                //以下是数据初始化
                this.pageData.currentPage = 1;
                this.totalAllList = new Array();//清空重新开始加载
                this.allLoaded = false;// 若数据已全部获取完毕
                this.commContent();
            },
            commContent(){
                Indicator.open();//防止重复表单提交，一个加载中的遮罩层
                this.$store.dispatch('queryFreezeDetail',this.pageData).then(resp=>{
                    console.log(resp.data);
                    this.resultData = resp.data;
                    this.totalAllList = this.totalAllList.concat(this.resultData.houseList);

                    Indicator.close();
                     if(resp.data.record=='0'){
                    Toast({message:'待审核数据为空!',duration:3000});
                }
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
</style>
