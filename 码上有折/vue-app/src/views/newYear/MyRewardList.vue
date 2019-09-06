<template>
    <div id="app">
        <div class="my-red-packets-info">
            <div class="top-info">
                <div class="t">您已经获得现金奖励</div>
                <div class="n">{{consumedAmt}}</div>
            </div>
            <div class="info">
                <div :class="show=='1'?'red':''"  @click="show='1'"> 
                    <div class="t">好友已消费</div>
                    <div class="n">{{consumedAmt}}</div>
                </div>
                <div :class="show=='0'?'red':''" @click="show='0'">
                    <div class="t">好友未消费</div>
                    <div class="n">{{unConsumedAmt}}</div>
                </div>
            </div>
            <div v-if="show=='1'" class="order-transaction-details-box" style="bottom: 2.64rem">
                <mt-loadmore bottomPullText="加载更多" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false"> 
                    <div class="order-transaction-details-list">
                        <div class="item" v-for="(v,i) in rewardList1" :key="i" >
                            <div class="sj">
                                <span class="l">{{v.userName}}</span>
                                <span class="r">获得奖励</span>
                            </div>
                            <div class="time">
                                <span class="l">{{v.createDatetime}}</span>
                                <span class="r orange">{{v.rewardAmt}}元</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="rewardList1.length < 1" class="index-bottom-info">
                        <div class="t">暂无数据</div>
                    </div>
                </mt-loadmore>
            </div>
            <div v-if="show=='1'" class="down-load">
                <div class="t">下载通联钱包APP，使用本手机（{{mobileNo}}）<br>登录，即可提现</div>
                <a class="l" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.allinpay.tonglianqianbao">下载通联钱包APP</a>
            </div>

            <div v-if="show=='0'" class="order-transaction-details-box">
                <mt-loadmore bottomPullText="加载更多" :bottom-method="loadBottom0" :bottom-all-loaded="allLoaded0" ref="loadmore" :auto-fill="false"> 
                <div class="order-transaction-details-list">
                    <div class="item" v-for="(v,i) in rewardList0" :key="i">
                        <div class="sj">
                            <span class="l">{{v.userName}}</span>
                            <span class="r">待领取</span>
                        </div>
                        <div class="time">
                            <span class="l">{{v.createDatetime}}</span>
                            <span class="r orange">{{v.rewardAmt}}元</span>
                        </div>
                    </div>
                </div>
                <div v-if="rewardList0.length < 1" class="index-bottom-info">
                    <div class="t">暂无数据</div>
                </div>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>

<script>
import { Loadmore } from 'mint-ui';
export default {
  name: 'myRewardList',
  data(){
        return {
                show:"1",//0展示未消费，1展示已消费
                consumedAmt:'',//好友消费金额
                unConsumedAmt: '',//好友未消费金额
                mobileNo: '',
                rewardList1:[],
                rewardList0:[],

                currentPage:1,//当前页1
                currentPage0:1,//未领取

                allLoaded:false,//下拉刷新
                allLoaded0:false,
       }
},
 methods:{
        getInfos(v_state){//0-未领取 1-已领取
            let pageIndex=1;
            if("1" == v_state){
                pageIndex=this.currentPage;
            }else{
                pageIndex=this.currentPage0;
            }
           this.$util.postRequest('/walletpn/reward/queryRewardDetail',{tokenId:this.$store.state.token,state:v_state,pageIndex:pageIndex})
            .then( res => {
                console.log(res)
                if(res==null || res.data==null){
                    return;
                }
                this.consumedAmt = res.data.consumedAmt;
                this.unConsumedAmt = res.data.unConsumedAmt;
                this.mobileNo = res.data.markMobile;
                if("1" == v_state){
                   this.rewardList1 = this.rewardList1.concat(res.data.dataList); 
                    //this.rewardList1 = res.data.dataList;  
                    alert(this.rewardList1.size());
                    if(res.data.dataList<30){
                        this.allLoaded = true;//全部获取完毕
                    } 
                }else{
                    this.rewardList0 = this.rewardList0.concat(res.data.dataList);
                    if(res.data.dataList<30){
                        this.allLoaded0= true;//全部获取完毕
                    }
                }

                
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        loadTop(){
            // 加载更多数据
            console.log('下拉加载数据');
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() {
            // 加载更多数据
            console.log('上拉加载数据');
            this.currentPage++;
            this.getInfos('1');
            this.$refs.loadmore.onBottomLoaded();
        },

        loadBottom0() {
            // 加载更多数据
            console.log('上拉加载数据');
            this.currentPage0++;
            this.getInfos('0');
            this.$refs.loadmore.onBottomLoaded();
        },
    },
    created(){
        this.getInfos('1');//已获取
        this.getInfos("0");//未领取
    }
}
</script>
