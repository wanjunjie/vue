<template>
<div style="height: 100%;">
    <div class="transaction-details-list" style="overflow:scroll; height: 100%; -webkit-overflow-scrolling : touch;">
       <mt-loadmore bottomPullText="加载更多" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false"> 
        <div v-for="(v,i) in itemList" :key="i" class="item">
            <div class="t">{{v.createDatetime}}
                <span class="p">{{v.amount}}</span>
            </div>
            <div class="n">
                消费
                <span class="y">优惠：{{v.discount}}</span>
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
            this.$util.postRequest('/walletpn/transDetail/queryTransDetail',{pageIndex:this.pageData.currentPage,pageSize:num})
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
