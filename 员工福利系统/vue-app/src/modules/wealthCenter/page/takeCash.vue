<template>
<div>
    <div class="app-wrap">
        <div class="withdrawal-title">提现至</div>
        <dl class="withdrawal-bank-list">
            <dd class="red">
                <div class="logo">
                    <!--<img src="img/bank/bank-1.png">-->
                    <img :src="imgSrc">
                </div>
                <div class="name">{{bankInfo.mBankName}}   储蓄卡（{{bankInfo.cardId}}）</div>
                <div class="num">**** **** **** {{bankInfo.cardId}}</div>
            </dd>
        </dl>
    </div>
    <div class="withdrawal-pop-up">
        <div class="withdrawal-content pb-15">
            <div class="title">
                <span class="t">提现金额</span>
                <div class="r">当前可提现 <span class="orange">{{balance}}</span>元</div>
            </div>
            <div class="input-content">
                <div class="title">¥</div>
                <div class="input-box">

                    <input v-if="buzu" type="number" @blur="scrollTop()"  v-model="txMoney=balance" readonly>
                    <div v-else>
                        <input type="number" @blur="scrollTop()"  v-model="txMoney"  placeholder="输入提现金额">
                        <div v-show="txMoney!=''" class="clear-input" @click="txMoney=''">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-guanbi"></use>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
            <div class="prompt prompt-pb" v-if="msg"><span class="orange">{{msg}}</span></div>
            <div class="prompt prompt-pb">
                <span v-if="takeCashRisk.resNum!==undefined">今日还可提现<span class="orange">{{Number(takeCashRisk.resNum)<0?0:takeCashRisk.resNum}}</span>次</span>
                <span v-if="takeCashRisk.ljMonthNum!==undefined">&nbsp;本月还可提现<span class="orange">{{Number(takeCashRisk.ljMonthNum)<0?0:takeCashRisk.ljMonthNum}}</span>次</span>
            </div>

            <a v-if="btnState == 4" class="btn btn-blue mt-20" href="javascript:void(0)">
                企业审核中...
            </a>
            <a v-if="btnState == 3" class="btn btn-blue mt-20" href="javascript:void(0)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dui1"></use>
                </svg>
                提现成功
            </a>
            <a v-if="btnState == 2" class="btn btn-blue mt-20" href="javascript:void(0)">
                <svg class="icon rotate" aria-hidden="true">
                    <use xlink:href="#icon-jiazai1"></use>
                </svg>
                正在提现
            </a>
            <a v-if="btnState == 1" @click="topUp" class="btn btn-blue mt-20" href="javascript:void(0);">
                提现
            </a>

            <div class="take-cash-container">
                <p>提现说明:</p>
                <p><span class="pstk">●</span> 您进行大额提现(单笔金额超过<span class="orange">{{upperLimit}}</span>元)时，需企业审核，在审核之前，该笔资金处于冻结状态，冻结状态下的资金仍正常计息；</p>
                <p v-if="Number(lowerLimit)!==0"><span class="pstk">●</span> 您的单笔提现金额不得低于<span class="orange">{{lowerLimit}}</span>元，当您的可提现金额低于该值时，需一次性全额提现；</p>
                <p><span class="pstk">●</span> 您的可提现笔数为：
                    <span class="orange" v-if="takeCashRisk.dayNum">{{takeCashRisk.dayNum}}次/日&nbsp;</span>
                    <span class="orange" v-if="takeCashRisk.monthNum">{{takeCashRisk.monthNum}}次/月</span>，包括大额提现和非大额提现。
                </p>
                <p>给您带来不便敬请谅解，如有疑问，请与您所在企业联系。</p>
            </div>


        </div>
        <div class="withdrawal-bg"></div>

        <!--微信分享标签-->
        <wxshare/>
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
    import wxshare from '../../../components/wxshare'

    export default {
        name: "takeCash",
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
                showMsg:0//0不显示1显示
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
                                this.$router.push({path:'/wealthMain'});
                            }, 3000)

                        }else if(response.data.state == 3){
                            console.log('--请求提交成功--')
                            this.btnState = 4;

                            let info = `<span style="font-size: .8rem">企业已收到您的提现申请，企业审核后会短信告知您审核结果，请耐心等待</span>`;
                            MessageBox.alert(info,'提示').then(action => {
                                this.$router.push({path:'/wealthMain'});
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
