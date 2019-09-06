<template>
<div class="wrap grey-bg">
    <div class="yj-header-nav">
        <a class="icon-return" href="javascript:void(0)" @click="$router.go(-1)"></a>
        <div class="title">商户明细</div>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
    <ul class="yj-details-list">
        <li v-for="item in list" :key="item.merchantId">
            <div class="name"><span class="t">{{item.mchtName}}</span></div>
            <div class="sub-item">
                <div class="line">
                    <div class="item"><span class="t">商户号</span><span class="c">{{item.merchantId}}</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t">入网时间</span><span class="c">{{item.entryDate | toTime}}</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t">联系人</span><span class="c">{{item.contactName}}</span></div>
                    <div class="item r-item"><span class="t">联系电话</span><span class="c">{{item.contactPhone}}</span></div>
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
    data(){
        return {
            list: [],
            loading: false,
            finished: false,
            pageNo: 1
        };
    },
    filters: {
        toTime: function(date) {
            return date.substr(0,4) + '-' + date.substr(4,2)+ '-' + date.substr(6,2) + ' ' + date.substr(8,2) + ':' + date.substr(10,2) + ':' + date.substr(12,2);
        }
　　},
    methods:{
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                // 加载状态结束
                this.loading = false;
                this.$util.getRequest('/promoteweb/promoteservice/mchtEntryDetail', {
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
    computed:{

    },
    created(){

    }
}
</script>