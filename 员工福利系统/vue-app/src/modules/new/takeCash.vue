<template>
<div class="app-wrap">
    <div>
        <div class="page-xjkcz-top-info">
            <div class="content">
                <div class="name">小金库</div>
                <div class="info">
                    <span v-if="userAccountInfoVo.currentProdVo.hqreoat !== '0%'">年化收益率{{userAccountInfoVo.currentProdVo.hqreoat}}</span> <span>可用于购买理财产品</span></div>
            </div>
            
        </div>
        <div class="page-lccpsg-payment page-xjkcz-payment">
            <div class="title">
                提现至
                <span class="r"><span v-if="takeCashRisk.resNum!==undefined">当日还可提现 <span class="orange">{{Number(takeCashRisk.resNum)<0?0:takeCashRisk.resNum}}</span> 次，</span><span v-if="takeCashRisk.ljMonthNum!==undefined">本月还可提现 <span class="orange">{{Number(takeCashRisk.ljMonthNum)<0?0:takeCashRisk.ljMonthNum}}</span> 次</span></span>
            </div>
            <dl class="payment-list">
                <dd>
                    <div class="bank"><img :src="imgSrc"></div>
                    <div class="info">
                        <div class="n">{{bankInfo.mBankName}} 储蓄卡（{{bankInfo.cardId}}）</div>
                        <div class="i">
                            <span>**** **** {{bankInfo.cardId}}</span>
                        </div>
                    </div>
                </dd>
            </dl>
        </div>
        <div class="page-lccpsg-amount">
            <div class="title">
                提现金额
                <span class="r gray">最小提现金额{{takeCashRisk.lowerLimit}}元</span>
            </div>
            <div class="input-box">
                <span class="f">¥</span>
                <div class="input">
                    <!-- <input class="num" type="number" placeholder="请输入金额"> -->
                    <input class="num" type="number" @blur="scrollTop()"  v-model="txMoney"  placeholder="输入提现金额">
                    <div v-show="txMoney!=''" class="clear-input" @click="txMoney=''" style="right:100px;">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                    <span @click="txMoney=balance" class="all">全部提现</span>
                </div>
            </div>
            <div class="input-bottom-info">可提现金额 <span class="orange">{{balance}}</span> 元 冻结金额 {{userAccountInfoVo.userAccountInfoVo.freezeBal}}元</div>
            
            <a v-if="btnState == 4" class="blue-btn" href="javascript:void(0)">
                <span class="t">企业审核中...</span>
            </a>
            <a v-if="btnState == 3" class="blue-btn" href="javascript:void(0)">
                <span class="i">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dui1"></use>
                    </svg>
                </span>
                <span class="t">提现成功</span>
            </a>
            <a v-if="btnState == 2" class="blue-btn" href="javascript:void(0)">
                <span class="i">
                    <svg class="icon rotate" aria-hidden="true">
                        <use xlink:href="#icon-jiazai1"></use>
                    </svg>
                </span>
                <span class="t">正在提现</span>
            </a>
            <a v-if="btnState == 1" @click="topUp" class="blue-btn" href="javascript:void(0);">
                <span class="t">提现</span>
            </a>

            <div class="t-c fs-12 gray">提现超过 <span class="orange">{{takeCashRisk.upperLimit}}</span> 元需要企业审核</div>
        </div>
        
    </div>
</div>
</template>
<script>
    import $ from 'jquery'
    import AIP from '@/util/aip'
    import util from '@/util/util'
    import { Toast, MessageBox } from 'mint-ui'
    import {mapGetters} from 'vuex';
    import {encrypt} from '@/util/encryptPassword'
    import wxshare from '../../components/wxshare'

    export default {
        name: "newTakeCash",
        data(){
            return {
                txMoney:'',
                password:'',
                btnState:'1',
                visibleState:'1',
                imgSrc: '',
                bankInfo: {},
                takeCashRisk:{},

                upperLimit:null,//提现上限值
                lowerLimit:null,//提现下限值
                buzu:false,
                chaoguo:false,
                msg:'',
                clock:function(){},
                nums:3,
                showMsg:0,//0不显示1显示
                userAccountInfoVo:{
                    empInstanceId:'',
                    instanceId:'',
                    currBal:'',
                    availBal:'',
                    freezeBal:''
                }
            }
        },
        watch:{
            'txMoney':{
                handler(newV,oldV){
                    if(util.isValidate(newV)){
                        console.log(this.validateMsg());
                        this.msg = this.showMsg===0?'':this.msg;
                    }
                },
                deep:true
            }
        },
        methods:{
            validateMsg(){
                //console.log('进来了吗'+this.balance);
                this.showMsg = 0;
                if(this.balance){
                    //当用户可提现金额低于可提现下限限值时
                    if(Number(this.balance)<Number(this.lowerLimit)){
                        this.msg = `您当前的可提现金额不足${this.lowerLimit}元，需全额提现`;
                        this.buzu = true;
                        this.showMsg = 1;
                        //return false;
                    }

                    //当用户提现金额超过提现上限限值时
                    if(Number(this.txMoney)>Number(this.upperLimit)){
                        this.msg = `您的提现金额超过${this.upperLimit}元，需企业审核`;
                        this.chaoguo = true;
                        this.showMsg = 1;
                        //return false;
                    }

                    //当用户可提现金额高于可提现下限限值时且用户提现金额低于下限值时
                    if(util.isNumber(this.txMoney)&&Number(this.balance)>=Number(this.lowerLimit)&&Number(this.txMoney)<Number(this.lowerLimit)){
                        this.msg = `您的提现金额低于${this.lowerLimit}元，请重置提现金额`;
                        this.showMsg = 1;
                        return false;
                    }
                }

                return true;
            },
            getV(){
                this.btnState = 2
                this.passWord = encrypt($("#passWordInput").val(),this.key);
                util.axiosPost('/eebpc/Money/TakeCashMoney',
                    {
                        txMoney: this.txMoney,
                        password: this.passWord
                    }
                )
                .then( response => {
                    console.log(this.txMoney);
                    console.log(this.passWord);
                    console.log(response);
                    console.log('1');
                    if(util.isValidate(response)){
                        if(response.data.state == 1){
                            console.log('--成功--')
                            this.btnState = 3;
                            setTimeout(()=>{
                                this.$router.push({path:'/wealthMain2'});
                            }, 3000)

                        }else if(response.data.state == 3){
                            console.log('--请求提交成功--')
                            this.btnState = 4;

                            let info = `<span style="font-size: .8rem">企业已收到您的提现申请，企业审核后会短信告知您审核结果，请耐心等待</span>`;
                            MessageBox.alert(info,'提示').then(action => {
                                this.$router.push({path:'/wealthMain2'});
                            });
                        }
                    }else{
                        console.log('--异常--')
                        this.btnState = 1;
                        this.txMoney = "";
                        console.log('--按钮恢复--')

                    }
                });
            },
            getF(){
                 this.$router.push({path:'/userValidate'});
            },
            scrollTop(){
                util.scrollTop()
            },
            isWeiXin(){
                //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
                var ua = window.navigator.userAgent.toLowerCase();
                //通过正则表达式匹配ua中是否含有MicroMessenger字符串
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    return true;
                }else{
                    return false;
                }
            },
            topUp(){
                var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
                if(exp.test(this.txMoney)&&this.validateMsg()){

                    if(Number(this.txMoney)>Number(this.balance)){
                        Toast({
                            message:'活期余额不足，剩余金额'+Number(this.balance)+'元',
                            duration:3000
                        });
                        return false;
                    }
                     //风控校验：次数和单日限额

                    if(this.takeCashRisk.numState){
                        if(this.takeCashRisk.resNum!==undefined && this.takeCashRisk.resNum <= 0){
                            Toast({
                                message:'今日提现次数已用完',
                                duration:3000
                            });
                            return false;
                        }
                    }

                    if(this.takeCashRisk.numMState){
                        if(this.takeCashRisk.ljMonthNum!==undefined && this.takeCashRisk.ljMonthNum <= 0){
                            Toast({message:'当月提现次数已用完',duration:3000});
                            return false;
                        }
                    }

                    if(this.takeCashRisk.amountState){
                        if(this.takeCashRisk.resAmount < this.txMoney){
                            Toast({
                                message:'超过今日剩余提现额度'+this.takeCashRisk.resAmount+'元',
                                duration:3000
                            });
                            return false;
                        }
                    }
                    if(this.isWeiXin()){
                        // 是微信浏览器，执行操作
                        AIP.addKeyboardPayPassword(this.txMoney, {callback:this.getV, forgot:this.getF})
                    }else{
                        AIP.addKeyboardPayPassword(this.txMoney, {callback:this.getV})
                    }

                }
                else{
                    Toast({
                        message:'金额有误!',
                        duration:3000
                    });
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
            queryRisk(){
                 util.axiosPost('/eebpc/Money/TakeCashMoneyRisk')
                .then( res => {
                    console.log(res)
                    this.takeCashRisk = res.data;
                    this.upperLimit = util.isValidate(this.takeCashRisk)?Number(this.takeCashRisk.upperLimit):null;
                    this.lowerLimit = util.isValidate(this.takeCashRisk)?Number(this.takeCashRisk.lowerLimit):null;
                })
            },

            getIndexInfo(){
                util.axiosPost('/eebpc/myCurrentAcc/getInfo'
                ).then(resp=>{
                    console.log("==wealthCenter2/etIndexInfo====");
                    console.log(resp.data);
                    this.userAccountInfoVo = resp.data;
                   
                });
            }

            //表单校验
//            validateForm(){
//                let rules = {
//                    txMoney:[{isNull:true,message:'金额不能为空!'},{isNum:true,message:'金额只能是数字!'}],
//                    password:[{isNull:true,message:'密码不能为空!'}]
//                }
//                let rs = util.validateForm(this.cashFormData,rules);
//                if(rs.hasNull){
//                    this.$message({message:rs.info,type:'error'});
//                    return false;
//                }
//                if(Number(this.cashFormData.txMoney)>Number(this.balance)){
//                    this.$message({message:`活期余额不足，剩余金额${Number(this.balance)}元`,type:'error'});
//                    return false;
//                }
//               return true;
//            }
            //提现
//            takeCashSubmit(){
//                if(this.validateForm()){
//                    this.cashFormData.password = encrypt(this.cashFormData.password,this.key);//密码加密
//                    //个人提现，状态1 表示成功,3：提现限额超限，表示大额审核中
//                    this.$store.dispatch('takeCashMoney',this.cashFormData).then(resp=>{
//                        console.log(resp.data);
//                        let param = {title:'提现结果',state:false,content:'提现失败!'};
//                        if(Number(resp.data.state)==1) {
//                            param = {title:'提现结果',state:true,content:'提现成功!'};
//                        }else if(Number(resp.data.state)==3){
//                            param = {title:'提现结果',state:true,content:'提现额度较大,需要管理员审核,审核通过后<br/>将自动转至您的银行账户,请注意查收'};
//                        }
//                        this.$store.commit('setResultPageData',param);
//                        this.$router.push({path:'/commonResult'});
//                    });
//                }
//            }
        },
        created(){
            this.getIndexInfo();
            this.$store.dispatch('getKey',{});
            this.$store.dispatch('queryBalance',{});
            this.getBankInfo();
            this.queryRisk();
            this.clock = setInterval(()=>{
                this.nums--;
                if(this.nums>0){
                    this.validateMsg();
                }else{
                    clearInterval(this.clock);
                    this.nums = 3;
                }
            }, 200);
        },
        computed:{
            ...mapGetters({
                balance:'getBalance',
                key:'getKey'
            })
        },
        components:{
            wxshare
        }
    }
</script>

<style scoped>
    .take-cash-container{
        margin-top: 1rem; color:rgb(123,123,123); font-size: .75rem;
    }
    .take-cash-container p{
        line-height:1.2rem;
    }
    .pstk{
        font-size: .3rem;
    }

    .prompt-pb {
        padding: 1rem 1rem 0rem!important;
    }
</style>
