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

<script>
import { Loadmore } from 'mint-ui';
export default {
  name: 'myInvitation',
  data(){
        return {
                pageData:{
                    currentPage:1,    //currentPage  查询页码
                    typeCode:'0'        //0全部1充值2提现3投资
                },
                itemList: [],
                totalInvite: '',
                totalFreeDate: '',
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
           this.$util.postRequest('/walletpn/alreadyInvited/queryAlreadyInvited',{pageIndex:this.pageData.currentPage,pageSize:num})
            .then( res => {
                console.log(res)
  
                this.totalInvite = res.data.totalInvite
                this.totalFreeDate = res.data.totalFreeDate
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
