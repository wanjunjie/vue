<template>
<div class="app-wrap">
    <div class="gray-bg">
        <div style="overflow:scroll; height: 100vh; -webkit-overflow-scrolling : touch;">
        <div class="page-xjk-top-assets-info">
           <div class="content">
               <div class="title">总资产（元）</div>
               <div class="num">{{totalMoney}}</div>
               <!--<div class="info">
                   <span class="t">累计收益 112.00 元</span>
               </div>-->
           </div>
           <div class="bottom">
               <dl class="item-list clearfix">
                   <dd class="fs-12">小金库</dd>
                   <dd class="fs-12" v-if="this.regularProNum!=0">定期理财</dd>
                   <dd class="fs-12" v-if="this.fixedProNum!=0">固定期理财</dd>
                   <dd class="fs-18">{{userAccountInfoVo.currBal}}</dd>
                   <dd class="fs-18" v-if="this.regularProNum!=0">{{regularProTotal}}</dd>
                   <dd class="fs-18" v-if="this.fixedProNum!=0">{{fixedProTotal}}</dd>
                   <dd class="fs-12"></dd>
                   <dd class="fs-12" v-if="this.regularProNum!=0">{{regularProNum}}笔投资中</dd>
                   <dd class="fs-12" v-if="this.fixedProNum!=0">{{fixedProNum}}笔投资中</dd>
               </dl>
           </div>
        </div>
        <div class="page-wdcc-middle-tag">
            <div class="tag">
                <a v-for="(v,i) in navHead" :class="v.clazz" :key="i" @click="changeType(v)">{{v.name}}</a>
            </div>
            <a class="more" href="javascript:void(0);">
                查看交易明细
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
            </a>
        </div>
        
        
            <mt-loadmore bottomPullText="加载更多" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
                <dl class="g-wealth-management-product-list">
                    <dd  v-for="(v,i) in totalAllList" :key="i" @click="linkToWarehouseDetail(v)">
                        <div class="header">
                            <div class="title">
                                <span class="name">{{v.prodName}}</span>
                                <span class="tag">投资中</span>
                            </div>
                            <div class="b-info">产品停止存续，到期自动赎回小金库</div>
                            <svg class="icon more" aria-hidden="true">
                                <use xlink:href="#icon-jiantou"></use>
                            </svg>
                        </div>
                        <div class="content">
                            <ul class="item-list clearfix">
                                <li class="fs-18">{{v.prod_money_inc}}</li>
                                <li class="fs-18">{{v.preliminary_earnings}}</li>
                                <li class="fs-12">{{v.orderDate}}</li>
                                <li class="fs-12">持仓金额（元）</li>
                                <li class="fs-12">预期收益（元）</li>
                                <li class="fs-12">投资日期</li>
                            </ul>
                        </div>
                    </dd>
                </dl>
            </mt-loadmore>
        </div>
        
    </div>
</div>
</template>

<script>
    import util from '@/util/util';
    import { Toast,Loadmore,Indicator } from 'mint-ui';
    export default {
        name: "",
       
        data(){
            return {
                totalMoney:'',
                regularProTotal:'',
                fixedProTotal:'',
                regularProNum:'',
                fixedProNum:'',
                navHead:[
                    {name:'投资中',clazz:'current',typeCode:'0'},
                    {name:'已赎回',clazz:'',typeCode:'1'}
                ],
                navObj:{},//当前是全部还是充值还是提现还是投资
                pageData:{
                    currentPage:1,    //currentPage  查询页码
                    typeCode:'0'        //0投资中1已赎回
                },
                //这个数据方便自己看里面的数据结构
                resultData:{
                    endRow:0,
                    nextPage:0,//下一页
                    pageIndex:0,//当前页号
                    pageSize:4,//页面数据条数
                    prePage:1,//上一页
                    record:0,//记录总数
                    sartRow:0,
                    totalPageCount:0,//总页数
                    houseList:[]
                },
                totalAllList:[],
                allLoaded:false,//下拉刷新
                userAccountInfoVo:{
                    empInstanceId:'',
                    instanceId:'',
                    currBal:'',
                    availBal:'',
                    freezeBal:''
                }
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
                util.axiosPost('/eebpc/query/queryEmployeeProdList.do',this.pageData
                ).then(resp=>{
                    console.log(resp.data);
                    this.resultData = resp.data;
                    this.totalAllList = this.totalAllList.concat(this.resultData.houseList);
                    Indicator.close();
                });
            },
            linkToWarehouseDetail(v){
                this.$router.push({name:'mywarehouseDetail',params:{id:v.prodId}});
            },
            getInfo(){
                util.axiosPost('/eebpc/myWarehouse/getInfo'
                ).then(resp=>{
                    console.log("====myWarehouse/getInfo====");
                    console.log(resp.data);
                    this.indexInfo =resp.data;
                    this.userAccountInfoVo = resp.data.userAccountInfoVo;
                    this.totalMoney = resp.data.totalMoney;
                    this.regularProTotal= resp.data.regularProTotal;
                    this.fixedProTotal= resp.data.fixedProTotal;
                    this.regularProNum= resp.data.regularProNum;
                    this.fixedProNum= resp.data.fixedProNum;
                });
            }
            
        },
        created(){
           this.getInfo();
           this.commContent();
        },
        components:{
            
        }
    }
</script>

<style scoped>
</style>