<template>
<div class="wrap grey-bg">
    <div class="yj-header-nav">
        <a class="icon-return" href="javascript:void(0)" @click="$router.go(-1)"></a>
        <div class="title">商户交易汇总</div>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
        <div class="yj-details-link-list">
            <router-link class="li" v-for="item in list" :key="item.merchantId" :to="{ name: 'transactionDetails', params: { userId: $route.params.userId, merchantId: item.merchantId, begDate: $route.params.begDate, endDate: $route.params.endDate }}" >
                <div class="icon-j"></div>
                <div class="name"><span class="t">{{item.mchtName}}</span></div>
                <div class="sub-item">
                    <div class="line">
                        <div class="item"><span class="t">商户号</span><span class="c">{{item.merchantId}}</span></div>
                    </div>
                    <div class="line">
                        <div class="item"><span class="t">交易笔数</span><span class="c">{{item.transNum}}</span></div>
                        <div class="item r-item"><span class="t">交易金额</span><span class="c">{{that.getAmount(item.transAmt)}}</span></div>
                    </div>
                </div>
            </router-link>
        </div>
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
        setTimeout(() => {
            // 加载状态结束
            this.loading = false;
            this.$util.getRequest('/promoteweb/promoteservice/mchtTransList', {
                "appId": "TLceshi",
                "version": "1.0",
                "bizContent": {
                    "appid": "TLAzypt",
                    "userId": this.$route.params.userId,
                    "begDate": this.$route.params.begDate,
                    "endDate": this.$route.params.endDate,
                    "pageSize": "10",
                    "pageNo": this.pageNo,
                }
            })
            .then( res => {
                console.log(res);
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