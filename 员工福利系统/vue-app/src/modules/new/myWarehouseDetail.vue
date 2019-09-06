<template>
<div class="app-wrap">
    <div>
        <dl class="page-wdcc-dqlctzz-info-list">
           <dd>
               <span>持仓金额（元）</span>
               <span class="r">9,999,999.99</span>
            </dd>
            <dd>
                <span>持仓金额（元）</span>
                <span class="r">9,999,999.99</span>
            </dd>
            <dd>
                <span>产品期限</span>
                <span class="r">3个月</span>
            </dd>
            <dd>
                <span>年化收益率</span>
                <span class="r">5.00%</span>
            </dd>
            <dd>
                <span>提前赎回收益率</span>
                <span class="r">5.00%</span>
            </dd>
            <dd>
                <span>支付账户</span>
                <span class="r">广发银行（1122）</span>
            </dd>
            <dd>
                <span>到期处理方式</span>
                <span class="r">本期自动投续</span>
            </dd>
        </dl>
        <ul class="page-wdcc-dqlctzz-time-list">
            <li class="selected">
                <div class="time">
                    <div class="d">5月29日</div>
                    <div class="y">2019年</div>
                </div>
                <div class="info">
                    <div class="t">申购成功</div>
                    <div class="n">金额：9,999.99</div>
                </div>
            </li>
            <li class="selected">
                <div class="time">
                    <div class="d">8月29日</div>
                    <div class="y">2019年</div>
                </div>
                <div class="info">
                    <div class="t">到期续投成功</div>
                    <div class="n">金额：9,999.99</div>
                </div>
            </li>
            <li>
                <div class="time">
                    <div class="d">11月29日</div>
                    <div class="y">2019年</div>
                </div>
                <div class="info">
                    <div class="t">到期将自动续投</div>
                    <div class="n">金额：9,999.99</div>
                </div>
            </li>
        </ul>
        <div class="btn-box">
            <a class="btn btn-blue" href="javascript:void(0)">提前赎回</a>
        </div>
    </div>
</div>
</template>


<script>

    import util from '@/util/util';
    export default {
        name: "",
       
        data(){
            return {
                totalMoney:0.00,
                noticeList:[],
                noticeState: false,
                userAccountInfoVo:{
                    empInstanceId:'',
                    instanceId:'',
                    currBal:'',
                    availBal:'',
                    freezeBal:''
                },
                currentProdVo:{
                    hqreoat:'',
                    balancePreliminaryEarnings:'',
                    demandCycDay:''
                },
                takeCashRisk:{},
                upperLimit:null,//提现上限值
                lowerLimit:null,//提现下限值
                prodId: this.$route.params.id
            }
        },
        methods:{
            getInfo(){
                util.axiosPost('/eebpc/mycurrentAcc/getInfo'
                ).then(resp=>{
                    console.log("==mycurrentAcc/getInfo====");
                    console.log(resp.data);
                    this.indexInfo =resp.data;
                    this.userAccountInfoVo = resp.data.userAccountInfoVo;
                    this.startTime = resp.data.startTime;
                    this.endTime = resp.data.endTime;
                    this.currentProdVo = resp.data.currentProdVo;
                });
            },
            queryRisk(){
                 util.axiosPost('/eebpc/Money/TakeCashMoneyRisk')
                .then( res => {
                    console.log(res)
                    this.takeCashRisk = res.data;
                    this.upperLimit = util.isValidate(this.takeCashRisk)?Number(this.takeCashRisk.upperLimit):null;
                    this.lowerLimit = util.isValidate(this.takeCashRisk)?Number(this.takeCashRisk.lowerLimit):null;
                })
            },
            
        },
        created(){
           this.getInfo();
           this.queryRisk();
           
        },
        components:{
            
        }
    }
</script>

<style scoped>
</style>