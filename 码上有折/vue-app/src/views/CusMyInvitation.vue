<template>
<div style="overflow:scroll; height: 100%; -webkit-overflow-scrolling : touch;">
    <mt-loadmore bottomPullText="加载更多" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false"> 
    <div>
        <div class="my-invitation">
            
            <div class="item">
                累计邀请
                <span class="n">
                    <span>{{totalInvite}}</span>
                    人
                </span>
            </div>
            <div class="item">
                已为您免费续期
                <span class="n">
                    <span>{{totalFreeDate}}</span>
                    天
                </span>
            </div>
            <div v-if="totalRewardAmt!=null && totalRewardAmt!='' && totalRewardAmt!='0.00'" class="item">
                已获得现金奖励
                <span class="n">
                    <span>{{totalRewardAmt}}</span>
                    元
                </span>
                <div class="title"> 
                    <span>
                    下载通联钱包APP，使用本手机({{markMobile}})登录，即可提现
                    </span>
                </div>
            </div>
        </div>
        <div class="my-invitation-list" v-for="(v,i) in itemList" :key="i">
            <div class="item">
                <div class="t">{{v.createDatetime}}</div>
                <div class="n">{{v.invitedUserId}}</div>
            </div>
        </div>
        <div v-if="itemList.length < 1" class="index-bottom-info">
            <div class="t">暂无数据</div>
        </div>
    </div>
    </mt-loadmore>
</div>
</template>

 <style scoped>
    .title {
        margin-top: .15rem;
        color: #aeaeae;
        font-size: .24rem;
    }
</style>


<script>
import { Loadmore } from 'mint-ui';
export default {
  name: 'myInvitation',
  data(){
        return {
                tokenId: this.$store.state.token,
                pageData:{
                    currentPage:1,    //currentPage  查询页码
                    typeCode:'0'        //0全部1充值2提现3投资
                },
                itemList: [],
                totalInvite: '',
                totalFreeDate: '',
                totalRewardAmt:'',//已获得的现金奖励
                markMobile:'',//掩码手机号
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
                this.getInfos();
                this.$refs.loadmore.onBottomLoaded();
            },
        getInfos(){
           const num = 10;//每一页接受多少条数据
           this.$util.postRequest('/walletpn/alreadyInvited/queryAlreadyInvited',{tokenId:this.tokenId,pageIndex:this.pageData.currentPage,pageSize:num})
            .then( res => {
                console.log(res)
  
                this.totalInvite = res.data.totalInvite
                this.totalFreeDate = res.data.totalFreeDate
                this.totalRewardAmt = res.data.totalRewardAmt
                this.markMobile = res.data.markMobile
                this.itemList = this.itemList.concat(res.data.dataList);
                if(res.data.dataList.length<num){
                         this.allLoaded = true;// 若数据已全部获取完毕
                    } 
                
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
    created(){
        this.getInfos()
    }
}
</script>
