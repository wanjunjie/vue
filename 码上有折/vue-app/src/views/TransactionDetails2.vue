<template>
<div style="height: 100%;">
    <div class="order-transaction-details-list" style="overflow:scroll; height: 100%; -webkit-overflow-scrolling : touch;">
       <mt-loadmore bottomPullText="加载更多" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false"> 
        <div v-for="(v,i) in itemList" :key="i" class="item">
            <div class="sj">
                <span class="l" v-if="v.transType=='4'">超级会员续费</span>
                <span class="l" v-else>{{v.issuerName}}</span>
                <span class="r">{{v.amount}}</span>
            </div>
            <div class="yh" v-if="v.discount!= null && v.discount!='0.00'">优惠金额：{{v.discount}}</div>
            <div class="yh red" v-if="v.deducteAmt!= null && v.deducteAmt!='0.00' ">红包抵扣：{{v.deducteAmt}}</div>
            <div class="ddh">订单号：{{v.orderId}}</div>
            <div class="time">
                <span class="l">{{v.createDatetime}}</span>
                <span class="r" v-if="v.state=='1'">未付款</span>
                <span class="r" v-if="v.state=='2'">交易成功</span>
                <span class="r" v-if="v.state=='3'">交易关闭</span>
                <span class="r" v-if="v.state=='4'">已退款</span>
                <span class="r" v-if="v.state=='5'">退款处理中</span>
                <span class="r" v-if="v.state=='6'">退款失败</span>
            </div>
        </div>
        <div v-if="itemList.length < 1" class="index-bottom-info">
            <div class="t">暂无数据</div>
        </div>
       </mt-loadmore>
    </div>

</div>
</template>

<script>
import { Loadmore } from 'mint-ui';
export default {
  name: 'transactionDetails',
    data(){
        return {
         pageData:{
                    currentPage:1,    //currentPage  查询页码
                    typeCode:'0'        //0全部1充值2提现3投资
                },
                itemList:[],
                allLoaded:false//下拉刷新
            }
       
},
    methods:{
           loadTop(){
                // 加载更多数据
                console.log('下拉加载数据');
                this.$refs.loadmore.onTopLoaded();
            },
            loadBottom() {
                // 加载更多数据
                console.log('上拉加载数据');
                this.pageData.currentPage++;
                this.getInfo();
                this.$refs.loadmore.onBottomLoaded();
            },
        getInfo(){
            const num = 10;//每一页接受多少条数据
            this.$util.postRequest('/walletpn/transDetail/queryTransDetail2',{pageIndex:this.pageData.currentPage, pageSize:num, tokenId: this.$store.state.token})
            .then( res => {
                console.log(res)
                this.itemList = this.itemList.concat(res.data.dataList);
                if(res.data.dataList.length<num){
                         this.allLoaded = true;// 若数据已全部获取完毕
                    } 
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    created(){
        this.getInfo();

    }
}
</script>
