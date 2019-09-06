<template>
    <div class="app">
        <ul class="my-red-packets-tab">
            <li :class="show=='0'?'current':''" @click="show='0';"><a href="javascript:void(0)">未使用</a></li>
            <li :class="show=='2'?'current':''" @click="show='2';getInfos('2');"><a href="javascript:void(0)">已使用</a></li>
            <li :class="show=='3'?'current':''" @click="show='3';getInfos('3');"><a href="javascript:void(0)">已过期</a></li>
        </ul>
        <div class="my-red-packets-content">
            <div v-if="show=='0'">
            <div class="my-red-packets-list selected">
                <a href="javascript:void(0)" class="item" v-for="(v,i) in dataList0" :key="i" >
                    <div :class="v.maxCostAmt.length>1?'n s':'n'" ><span>¥</span><b>{{v.maxCostAmt}}</b></div>
                    <div class="title">{{v.couponTheme}}</div>
                    <div class="i">{{v.couponSubTheme}} 满{{v.minAmount}}元可用</div>
                    <div class="time">截止日期：{{v.endDatetime}}</div>
                </a>
                <div v-if="dataList0.length < 1" class="index-bottom-info">
                        <div class="t">暂无数据</div>
                </div>
            </div>
            </div>
            <div v-if="show=='2'">
            <div  class="my-red-packets-list selected">
                <a href="javascript:void(0)" class="item" v-for="(v,i) in dataList2" :key="i">
                    <div :class="v.maxCostAmt.length>1?'n s':'n'" ><span>¥</span><b>{{v.maxCostAmt}}</b></div>
                    <div class="title">{{v.couponTheme}}</div>
                    <div class="i">{{v.couponSubTheme}} 满{{v.minAmount}}元可用</div>
                    <div class="time">截止日期：{{v.endDatetime}}</div>
                    <div class="used">已使用</div>
                </a>
                <div v-if="dataList2.length < 1" class="index-bottom-info">
                        <div class="t">暂无数据</div>
                </div>
            </div>
            </div>

            <div v-if="show=='3'">
            <div class="my-red-packets-list selected">
                <a href="javascript:void(0)" class="item"  v-for="(v,i) in dataList3" :key="i" disabled>
                    <div :class="v.maxCostAmt.length>1?'n s':'n'" ><span>¥</span><b>5</b></div>
                    <div class="title">{{v.couponTheme}}</div>
                    <div class="i">{{v.couponSubTheme}} 满{{v.minAmount}}元可用</div>
                    <div class="time">截止日期：{{v.endDatetime}}</div>
                    <div class="used">已过期</div>
                </a>
                <div v-if="dataList3.length < 1" class="index-bottom-info">
                        <div class="t">暂无数据</div>
                </div>
            </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
  name: 'myRedPocketList',
  data(){
        return {
                show:"0",//0-未使用 2-已使用 3-已过期
                dataList0:{},//未使用
                dataList2:{},//已使用
                dataList3:{}//已过期

       }
},
 methods:{
        getInfos(v_state){//0-未使用 2-已使用 3-已过期
           this.$util.postRequest('/walletpn/reward/queryRedPocketList',{tokenId:this.$store.state.token,useState:v_state})
            .then( res => {
                console.log(res)
                if(res==null || res.data==null){
                    return;
                }
                
                if("0" == v_state){
                    this.dataList0 = res.data.dataList;   
                }else if("2" == v_state){
                    this.dataList2 = res.data.dataList;   
                }else{
                    this.dataList3 = res.data.dataList;
                }

                
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
    created(){
        this.getInfos("0");//未使用
    }
}
</script>
