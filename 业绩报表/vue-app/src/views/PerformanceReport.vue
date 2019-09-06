<template>
 <div class="wrap grey-bg">
    <div class="yj-top-infor">
        <div class="refresh" @click="refresh"></div>
        <div class="title">交易总笔数</div>
        <div class="total"><span class="n">{{getData.transTotal}}</span><span class="s">笔</span></div>
        <div class="info-item merchants">
            <div class="icon"></div>
            <div class="info">
                <div class="t">商户总数</div>
                <div class="c"><span class="n">{{getData.mchtTotal}}</span><span class="s">家</span></div>
            </div>
        </div>
        <div class="info-item trading">
            <div class="icon"></div>
            <div class="info">
                <div class="t">交易总金额</div>
                <div class="c"><span class="n">{{this.$util.getAmount(getData.totalAmt)}}</span><span class="s">元</span></div>
            </div>
        </div>
    </div>

    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <ul class="yj-data-list">
        <li>
            <div class="name"><span class="t" >今日数据</span></div>
            <router-link class="sub-item"  :to="{ name: 'merchantsDetails', params: { userId: this.$route.query.userId, begDate:this.$util.getDateStr(0), endDate:this.$util.getDateStr(0) }}">
                <div class="icon-j"></div>
                <div class="line">
                    <div class="item"><span class="t">新增商户</span><span class="c">{{getData.today.addMcht}}</span></div>
                </div>
            </router-link>
            <router-link class="sub-item" :to="{ name: 'transactionList', params: { userId: this.$route.query.userId, begDate:this.$util.getDateStr(0), endDate:this.$util.getDateStr(0) }}">
                <div class="icon-j"></div>
                <div class="line">
                    <div class="item"><span class="t">交易金额</span><span class="c">{{this.$util.getAmount(getData.today.transAmt)}}</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t">交易笔数</span><span class="c">{{getData.today.transSuccNum}}</span></div>
                    <div class="item r-item"><span class="t">失败笔数</span><span class="c">{{getData.today.transFailNum}}</span></div>
                </div>
            </router-link>
        </li>
        <li>
            <div class="name"><span class="t">昨日数据</span></div>
            <router-link class="sub-item" :to="{ name: 'merchantsDetails', params: { userId: this.$route.query.userId, begDate:this.$util.getDateStr(-1), endDate:this.$util.getDateStr(-1) }}">
                <div class="icon-j"></div>
                <div class="line">
                    <div class="item"><span class="t">新增商户</span><span class="c">{{getData.yesterday.addMcht}}</span></div>
                </div>
            </router-link>
            <router-link class="sub-item" :to="{ name: 'transactionList', params: { userId: this.$route.query.userId, begDate:this.$util.getDateStr(-1), endDate:this.$util.getDateStr(-1) }}">
                <div class="icon-j"></div>
                <div class="line">
                    <div class="item"><span class="t">交易金额</span><span class="c">{{this.$util.getAmount(getData.yesterday.transAmt)}}</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t">交易笔数</span><span class="c">{{getData.yesterday.transSuccNum}}</span></div>
                    <div class="item r-item"><span class="t">失败笔数</span><span class="c">{{getData.yesterday.transFailNum}}</span></div>
                </div>
            </router-link>
        </li>
        <li>
            <div class="name"><span class="t">当月数据</span></div>
            <router-link class="sub-item" :to="{ name: 'merchantsDetails', params: { userId: this.$route.query.userId, begDate:this.$util.getDateCurrentMonth(), endDate:this.$util.getDateStr(0) }}">
                <div class="icon-j"></div>
                <div class="line">
                    <div class="item"><span class="t">新增商户</span><span class="c">{{getData.curMonth.addMcht}}</span></div>
                </div>
            </router-link>
            <router-link class="sub-item" :to="{ name: 'transactionList', params: { userId: this.$route.query.userId, begDate:this.$util.getDateCurrentMonth(), endDate:this.$util.getDateStr(0) }}">
                <div class="icon-j"></div>
                <div class="line">
                    <div class="item"><span class="t">交易金额</span><span class="c">{{this.$util.getAmount(getData.curMonth.transAmt)}}</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t">交易笔数</span><span class="c">{{getData.curMonth.transSuccNum}}</span></div>
                    <div class="item r-item"><span class="t">失败笔数</span><span class="c">{{getData.curMonth.transFailNum}}</span></div>
                </div>
            </router-link>
        </li>
        <li>
            <div class="name"><span class="t">上月数据</span></div>
            <router-link class="sub-item" :to="{ name: 'merchantsDetails', params: { userId: this.$route.query.userId, begDate:this.$util.getDateLastMonth('f'), endDate:this.$util.getDateLastMonth('l') }}">
                <div class="icon-j"></div>
                <div class="line">
                    <div class="item"><span class="t">新增商户</span><span class="c">{{getData.lastMonth.addMcht}}</span></div>
                </div>
            </router-link>
            <router-link class="sub-item" :to="{ name: 'transactionList', params: { userId: this.$route.query.userId, begDate:this.$util.getDateLastMonth('f'), endDate:this.$util.getDateLastMonth('l') }}">
                <div class="icon-j"></div>
                <div class="line">
                    <div class="item"><span class="t">交易金额</span><span class="c">{{this.$util.getAmount(getData.lastMonth.transAmt)}}</span></div>
                </div>
                <div class="line">
                    <div class="item"><span class="t">交易笔数</span><span class="c">{{getData.today.lastMonth}}</span></div>
                    <div class="item r-item"><span class="t">失败笔数</span><span class="c">{{getData.lastMonth.transFailNum}}</span></div>
                </div>
            </router-link>
        </li>
    </ul>
    <!-- </van-pull-refresh> -->
</div>
</template>
<script>
// import { PullRefresh } from 'vant';
export default {
    // components: {
    //     [PullRefresh.name]: PullRefresh,
    // },
    data(){
        return {
            getData: {
                curMonth: {},
                lastMonth: {},
                mchtTotal: '',
                today: {},
                totalAmt: {},
                transTotal: {},
                yesterday: {},
                
            },
            // isLoading: false
        }
    },
    methods:{
        // onRefresh() {
        //     setTimeout(() => {
        //         this.getInfo();
        //         this.isLoading = false;
        //     }, 500);
        // },
        refresh(e){
            e.target.classList.add("active");
            setTimeout(() => {e.target.classList.remove("active");}, 1200)
            this.getInfo()
        },
        getInfo(){
            this.$util.getRequest('/promoteweb/promoteservice/queryBusinessReport', {
                "appId": "TLceshi",
                "version": "1.0",
                "bizContent": {
                    "appid": "TLAzypt",
                    "userId": this.$route.query.userId,
                }
            })
            .then( res => {
                window.console.log(res);
                this.getData = res.data.data
            });
        }
    },
    computed:{

    },
    created(){
        this.getInfo();
    }
}
</script>
<style scoped>
/* .van-pull-refresh{
    overflow: visible;
    -webkit-user-select: text;
    user-select: text;
} */
</style>