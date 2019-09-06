<template>
<div class="wrap grey-bg">
    <div class="yj-header-nav">
        <a class="icon-return" href="javascript:void(0)" @click="$router.go(-1)"></a>
        <div class="title">商户交易明细</div>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
    <ul class="yj-details-list">
        <li v-for="item in list" :key="item.merchantId" >
            <div class="name"><span class="t">{{item.mchtName}}</span></div>
            <div class="sub-item">
                <div class="line">
                    <div class="item"><span class="t">商户号</span><span class="c">{{item.merchantId}}</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t two">产品</span><span class="c">{{item.prodType}}</span></div>
                    <div class="item r-item"><span class="t two">类型</span><span class="c">{{item.transType}}</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t two">笔数</span><span class="c">{{item.transNum}}</span></div>
                    <div class="item r-item"><span class="t two">金额</span><span class="c">{{that.getAmount(item.transAmt)}}</span></div>
                </div>
            </div>
        </li>
    </ul>
    </van-list>
</div>
</template>
<script>
import { List } from 'vant';
export default {
    components: {
        [List.name]: List,
    },
  data() {
    return {
        list: [],
        loading: false,
        finished: false,
        pageNo: 1,
        that: this.$util
    };
  },
  methods: {
    onLoad() {
        // 异步更新数据
        setTimeout(() => {
            // 加载状态结束
            this.loading = false;
            this.$util.getRequest('/promoteweb/promoteservice/mchtTransDetail', {
                "appId": "TLceshi",
                "version": "1.0",
                "bizContent": {
                    "appid": "TLAzypt",
                    "userId": this.$route.params.userId,
                    "begDate": this.$route.params.begDate,
                    "endDate": this.$route.params.endDate,
                    "pageSize": "10",
                    "pageNo": this.pageNo,
                    "merchantId": this.$route.params.merchantId
                }
            })
            .then( res => {
                if(res.data.data.dataList.length == 0){
                    // 数据全部加载完成
                    this.finished = true;
                }
                else{
                    console.log(res);
                    this.list.push(...res.data.data.dataList);
                    this.pageNo++;
                    console.log(this.list)
                }
            });
        }, 100);
    },
  },
  created(){

  }
}
</script>