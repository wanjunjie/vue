<template>
<div class="app-wrap">
    <div class="gray-bg">
        <div class="page-xjk-top-assets-info">
           <div class="content">
               <div class="title">账户余额（元）</div>
               <div class="num">{{userAccountInfoVo.availBal}}</div>
               <div class="info">
                   <span class="t">冻结金额 {{userAccountInfoVo.freezeBal}} 元</span>
                   <!-- <span class="i">
                       <svg class="icon" aria-hidden="true">
                           <use xlink:href="#icon-wen"></use>
                       </svg>
                   </span> -->
               </div>
           </div>
           <div class="bottom">
               <dl class="item-list clearfix">
                   <dd>
                       <span class="fs-18">{{userAccountInfoVo.instanceId==='72'?'0%':currentProdVo.hqreoat}}</span>
                       <span class="fs-12">年化收益率</span>
                   </dd>
                   <dd>
                       <span class="fs-18">{{userAccountInfoVo.instanceId==='72'?'0.00':currentProdVo.balancePreliminaryEarnings}}</span>
                       <span class="fs-12">待结收益</span>
                   </dd>
                   <dd>
                       <span class="fs-18">{{currentProdVo.demandCycDay}}日</span>
                       <span class="fs-12">下一结算日</span>
                   </dd>
               </dl>
           </div>
        </div>
        <div class="page-xjk-middle-info">
            <dl class="rule">
                <dt>收益规则</dt>
                <dd>
                    * 转入当日计息，转出当日不计息<br>
                    * 按月结息,每月{{currentProdVo.demandCycDay}}日将当月收益结算为小金库余额<br>
                    * 结息日前提现的金额,当月持有期利息仍在结息日进行结算
                </dd>
            </dl>
            <dl class="rule">
                <dt>提现规则</dt>
                <dd>
                    * {{upperLimit}}元以上提现,需企业进行审核,审核通过后到账,审核期限内,该笔资金处于冻结状态,冻结状态下的资金仍正常计息<br>
                    * 最大提现金额为账户可用余额,冻结金额不可提现<br>
                    * 单笔提现金额不得低于{{lowerLimit}}元，当账户可提现金额低于{{lowerLimit}}元时，需一次性全额提现<br>
                    * 可提现笔数为:{{Number(takeCashRisk.resNum)<0?0:takeCashRisk.resNum}}次/日,{{Number(takeCashRisk.ljMonthNum)<0?0:takeCashRisk.ljMonthNum}}次/月,包括大额提现和非大额提现
                </dd>
            </dl>
        </div>
        <div class="page-xjk-bottom-info">
            <div class="info">每日 {{startTime}} 至 {{endTime}}为交易时间</div>
            <div class="space"></div>
            <div class="btn-box">
                <div class="left-btn"><a class="btn btn-white"  href="javascript:void(0);"  @click="takeCash">提现</a></div>
                <div class="right-btn"><a class="btn btn-blue"  href="javascript:void(0);"  v-if="queryPower.cz!=='0'&&empStatus!=='4'" @click="recharge">充值</a></div>
            </div>
        </div>
    </div>
</div>
</template>


<script>

    import $ from 'jquery'
    import AIP from '@/util/aip'
    import util from '@/util/util';
    import { Toast, MessageBox } from 'mint-ui';
    import {mapGetters} from 'vuex';
    import {encrypt} from '@/util/encryptPassword';
    import wxshare from '../../components/wxshare';
    import {EMP_STATUS} from '../wealthCenter/constants/wealthCenterConstants';
    export default {
        name: "",
       
        data(){
            return {
                empStatus:EMP_STATUS.NORMAL,
                bankInfo:{},
                totalMoney:0.00,
                noticeList:[],
                noticeState: false,
                userAccountInfoVo:{
                    empInstanceId:'',
                    instanceId:'',
                    currBal:'0.00',
                    availBal:'0.00',
                    freezeBal:'0.00'
                },
                currentProdVo:{
                    hqreoat:'',
                    balancePreliminaryEarnings:'',
                    demandCycDay:''
                },
                takeCashRisk:{},
                upperLimit:null,//提现上限值
                lowerLimit:null,//提现下限值
                queryPower:{
                    cz:'0'
                }//企业是否控制菜单  充值和动态协议     cz  xy  值为0的时候需要控制，其它不控制
            }
        },
        methods:{
            getInfo(){
                util.axiosPost('/eebpc/myCurrentAcc/getInfo'
                ).then(resp=>{
                    console.log("==myCurrentAcc/getInfo====");
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
            //充值
            recharge(){
                var hour = util.getCurrHour();
                if(hour>=21){
                    Toast({
                        message: '此时间为非交易时间',
                        duration:3000
                    });
                }else{
                    this.$router.push({path:'/new/topUp'});
                }

            },
            getBankInfo(){
                util.axiosPost('/eebpc/queryBank/queryBankNameAndMoney')
                .then( res => {
                    console.log(res)
                    this.bankInfo = res.data;
                    this.bankInfo.cardId = res.data.cardId.substring(res.data.cardId.length-4);
                     this.imgSrc = require('@/assets/img/bank/'+ this.bankInfo.name +'.png');
                })
            },
            //提现
            takeCash(){
                var hour = util.getCurrHour();
                if(hour>=21){
                    Toast({
                        message: '此时间为非交易时间',
                        duration:3000
                    });
                }else{
                    this.$router.push({path:'/new/takeCash'});
                }

            },
            
        },

        getNoticeList(){
            util.axiosPost('/eebpc/Msg/queryUnreadMsg')
            .then( res => {
                    console.log(res.data);
                    this.noticeList = res.data
                    if(res.data.list.length > 0){
                        this.noticeState = true;
                        setTimeout(()=>{
                            this.marquee();
                        },500)
                    }
                    if(res.data&&Number(res.data.empStatus)===EMP_STATUS.STOP){
                        this.empStatus = EMP_STATUS.STOP;
                    }
            });
        },
        created(){
           this.getInfo();
           this.queryRisk();
            //控制充值按钮是否展示
            this.$store.dispatch('queryPowerByInstanceId',{}).then(resp=>{
                console.log(resp.data);
                this.queryPower = resp.data;
                if(this.queryPower.cz!=='0'){
                    this.queryPower.cz = '1';
                }
                this.$store.commit('setQueryPower',this.queryPower);
            });//查询企业是否控制菜单
        },
        components:{
            
        }
    }
</script>

<style scoped>
</style>