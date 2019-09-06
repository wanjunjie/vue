<template>
    <section>
        <div class="app-wrap">
        <div class="gray-bg" :style="empStatus===EMP_STATUS.STOP?{height:'100vh'}:''">

            <div class="mask-container" :hidden="addFlag==0">
                <div :class="addFlag%2==0?'mask animated fadeOutUp':'mask'" @click="toggleFlag">
                </div>
                <div :class="addFlag%2==0?'modalK animated fadeOutUp zzz':'modalK animated bounceInUp'">
                    <div class="tipsK" :style="bgPng2">
                        <p class="contentP">账号停用状态时,将无法进行活期理财的充值、期限理财申购,定期理财到期不再续投,自动赎回至活期。</p>
                        <div class="contentP2">
                            <div class="contentP">不影响活期提现、期限产品转活期产品、资产查询等操作。如有疑问请联系企业管理员。</div>
                            <img :src="require('@/assets/img/customer.png')">
                        </div>
                    </div>
                    <div class="tipsK2" @click="toggleFlag">
                        我知道了
                    </div>
                </div>
            </div>
            <div v-if="noticeState" class="prompt-info">
                <router-link to="/notice" class="more">
                    <div id="scrollTop" class="list">
                        <div v-for="(item, index) in noticeList.list" :key="index" class="item">
                            <span class="i">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-tongzhi"></use>
                                </svg>
                            </span>
                            <span class="c">{{item.title}}</span>
                        </div>
                    </div>
                </router-link>
                <span @click="noticeState = !noticeState" class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-guanbi"></use>
                    </svg>
                </span>
            </div>

            <div class="pay-check-top">
                <div class="stop-p" :style="bgPng" @click="toggleFlag" v-if="empStatus===EMP_STATUS.STOP">停用提示</div>
                <div>总资产(元)</div>
                <!--<div class="mt-20 fs-23">暂无收益</div>-->
                <div class="num-box" v-if="boolState==true">
                    <span>{{indexInfo.enterpriseProdVo.totalMonye?indexInfo.enterpriseProdVo.totalMonye:0}}</span>
                    <span class="eyes" @click="eyeshow">
                        <svg class="icon" aria-hidden="true" >
                            <use xlink:href="#icon-yanjing"></use>
                        </svg>
                    </span>
                    <router-link to="/notice" class="tz-box">
                        <span v-if="noticeList.total > 0" class='c'>{{noticeList.total}}</span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-tongzhi2"></use>
                        </svg>
                    </router-link>
                </div>

                <div class="num-box" v-if="boolState==false" >
                    <span>****</span>
                    <span class="eyes"  @click="eyeshow">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yanjing1"></use>
                        </svg>
                    </span>
                    <router-link to="/notice" class="tz-box">
                        <span v-if="noticeList.total > 0" class='c'>{{noticeList.total}}</span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-tongzhi2"></use>
                        </svg>
                    </router-link>
                </div>
            </div>
            <div class="pay-check-middle">
                <span class="cz" v-if="queryPower.cz!=='0'&&empStatus!==EMP_STATUS.STOP" @click="recharge">充值</span>
                <span class="tx"  @click="takeCash">提现</span>
                <div>活期理财(元)</div>
                <div class="lc">
                    <div class="item mt-10">
                        <span>可用金额：</span>
                        <span class="b orange" v-if="boolState==true">{{indexInfo.enterpriseProdVo.availBal?indexInfo.enterpriseProdVo.availBal:0.00}}</span>
                        <span class="b orange" v-if="boolState==false">****</span>
                    </div>
                    <div class="item">
                        <span>已冻结金额：</span>
                        <span class="orange" v-if="boolState==true">{{indexInfo.enterpriseProdVo.freezeBal?indexInfo.enterpriseProdVo.freezeBal:0.00}}</span>
                        <span class="orange"  v-if="boolState==false">****</span>
                        <router-link class="l" to="/freezeDetail">查看详情</router-link>
                    </div>
                </div>

                <div class="info">
                    <span>预收益(元)</span>
                    <span class="b"  v-if="boolState==true">{{queryPower.instanceId==='72'?'0.00':indexInfo.enterpriseProdVo.balancePreliminaryEarnings}}</span>
                    <span class="b"  v-if="boolState==false">****</span>
                    <span>利率</span>
                    <span class="b">
                        <span>{{queryPower.instanceId==='72'?'0%':indexInfo.enterpriseProdVo.hqreoat}}</span>
                        <span  class="wen" @click="interestRate = !interestRate">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-wen"></use>
                            </svg>
                        </span>
                    </span>

                </div>
            </div>
            <div class="pay-check-prompt center">
                温馨提示：系统交易时间为{{indexInfo.startTime}}-{{indexInfo.endTime}}<span v-show="boolWithdrawlimit==true"></span>
            </div>
            <!-- **-- <div class="pay-check-investment">
                <div>
                    <div class="w">
                        <router-link to="/investRegularly" class="more" href="javascript:void(0)"  v-if="indexInfo.timeProNum>0">
                            <span class="blue">{{indexInfo.timeProNum}}笔</span>投资中
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-jiantou"></use>
                            </svg>
                        </router-link>
                        <div>定期金额(元)</div>
                        <div class="total" v-if="boolState==true">{{indexInfo.timeProTotal?indexInfo.timeProTotal:0.00}}</div>
                        <div class="total" v-if="boolState==false">****</div>
                    </div>
                </div>
                <dl class="sub-list" v-for="(cal,k) in indexInfo.enterpriseProdVo.employeeOrderVoList" :key="k">
                    <dd v-if="cal.status==0">
                        <div class="title">
                            <span class="c">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dingtou"></use>
                                </svg>
                            </span>
                            <span class="t">{{cal.enterpriseProdInfo.prodName}}</span>
                            <router-link :to="{name:'investment',params:{id:cal.enterpriseProdInfo.prodId}}" class="b" href="javascript:void(0);">投资</router-link>
                        </div>
                        <div class="content">
                            <div class="l">
                                <div class="orange">{{cal.enterpriseProdInfo.prodRate}}</div>
                                <div class="gray">收益率</div>
                            </div>
                            <div class="m">
                                <div class="b">{{cal.enterpriseProdInfo.prodTerm}}个月</div>
                                <div class="gray">产品期限</div>
                            </div>
                            <div class="r">
                                <div class="b">{{cal.enterpriseProdInfo.prodBuyMinmonye}}元起购</div>
                                <div>{{(Number(cal.enterpriseProdInfo.prodRaiseLimit)/10000).toFixed(2)}}万元募集上限</div>
                            </div>
                        </div>
                    </dd>
                </dl>
            </div>-->

            <div class="pay-check-investment">
                <div class="w">
                    <router-link to="/investRegularly" class="more" v-if="indexInfo.timeProNum>0">
                        <span class="blue">{{indexInfo.timeProNum}}笔</span>投资中
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </router-link>
                    <div>期限理财（元）</div>
                    <div class="total">{{indexInfo.timeProTotal?indexInfo.timeProTotal:0.00}}</div>
                </div>
                <dl class="sub-list" v-if="empStatus!==4">
                    <dd>
                        <div class="title">
                        <span class="c">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dingtou"></use>
                            </svg>
                        </span>
                            <span class="t"><b>定期理财</b></span>
                            <router-link class="more" :to="{name:'regularWealth',params:{index:0}}">
                                全部
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-jiantou"></use>
                                </svg>
                            </router-link>
                        </div>
                    </dd>

                    <!--只显示2条-->
                    <dd v-if="navContent[0].data && navContent[0].data.length!=0 && i < 2" v-for="(v,i) in navContent[0].data" :key="i" @click="linkToInvestment(v)">
                        <div class="title">
                            <span class="t">{{v.prodName}}</span>
                        </div>
                        <div class="content">
                            <div class="l">
                                <div class="orange">{{v.prodRate}}</div>
                                <div class="gray">收益率</div>
                            </div>
                            <div class="m">
                                <div class="b">{{v.prodTerm}}个月</div>
                                <div class="gray">产品期限</div>
                            </div>
                            <div class="r">
                                <div class="b">{{v.prodBuyMinmonye}}元起购</div>
                                <div>{{v.prodRaiseLimit}}募集上限</div>
                            </div>
                        </div>
                    </dd>
                    <dd v-if="navContent[0].data.length==0" style="text-align: center">
                        暂时没有该产品!
                    </dd>

                    <dd>
                        <div class="title">
                        <span class="c yellow">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dingtou"></use>
                            </svg>
                        </span>
                            <span class="t"><b>固定期限理财</b></span>
                            <router-link class="more" :to="{name:'regularWealth',params:{index:1}}">
                                全部
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-jiantou"></use>
                                </svg>
                            </router-link>
                        </div>
                    </dd>
                    <dd v-if="navContent[1].data && navContent[1].data.length!=0 && ii < 2" v-for="(v,ii) in navContent[1].data" @click="linkToFixedWealth(v)">
                        <div v-if="Number(v.prodState)==1" class="fd stop">未开始</div>
                        <div v-if="Number(v.prodState)==2" class="fd">募集中</div>

                        <div class="title">
                            <span class="t">{{v.prodName}}</span>
                        </div>
                        <div class="content">
                            <div class="l">
                                <div class="orange">{{v.prodRate}}</div>
                                <div class="gray">收益率</div>
                            </div>
                            <div class="m">
                                <div class="b">{{v.prodTerm}}天</div>
                                <div class="gray">产品期限</div>
                            </div>
                            <div class="r">
                                <div class="b">{{v.prodBuyMinmonye}}元起购</div>
                                <div>{{v.prodRaiseLimit}}募集上限</div>
                            </div>
                        </div>
                    </dd>
                    <dd v-if="navContent[1].data.length==0" style="text-align: center">
                        暂时没有该产品!
                    </dd>
                </dl>
            </div>

            <dl class="link-list">
                <dd>
                    <router-link  to="/transactionDetail">
                        交易明细
                        <span class="jt">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-jiantou"></use>
                            </svg>
                        </span>
                    </router-link>
                </dd>
                <dd v-if="infoState==false">
                    <router-link to="/perfectInfor" >
                        完善信息
                        <span class="p">未完善</span>
                        <span class="jt">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-jiantou"></use>
                            </svg>
                        </span>
                    </router-link>
                </dd>
                <!--
                <dd v-if="bandState==true" @click="unBand">
                    <router-link to="" >
                        解绑福利卡
                        <span class="jt">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-jiantou"></use>
                            </svg>
                        </span>
                    </router-link>
                </dd>
                -->
                <!--
                <dd>
                    <router-link to="/userEdit">
                        修改密码
                        <span class="jt">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-jiantou"></use>
                            </svg>
                        </span>
                    </router-link>
                </dd>
                -->
            </dl>

            <div v-show="dialogPopUp" class="dialog-pop-up">
                <div class="dialog-content">
                    <div class="title">温馨提示</div>
                    <div class="info">
                        <div class="center">
                            确定解绑福利卡？
                        </div>
                    </div>
                    <div class="footer">
                        <div class="l">
                            <a @click="unBandCancel" href="javascript:void(0)">取消</a>
                        </div>
                        <div class="r">
                            <a @click="unBandConf" class="blue" href="javascript:void(0)">继续</a>
                        </div>
                    </div>
                </div>
                <div class="dialog-bg"></div>
            </div>

        </div>
        </div>
        <wxshare/>
        <div v-if="interestRate" class="dialog-pop-up">
            <div class="dialog-content">
                <div class="title">说明</div>
                <div class="info">
                    <div class="t" v-if="indexInfo.enterpriseProdVo.demandCycType=='1'">活期结息日：每月的{{indexInfo.enterpriseProdVo.demandCycDay}}号</div>
                    <div class="t" v-if="indexInfo.enterpriseProdVo.demandCycType=='2'">活期结息日：每季度最后一个月的{{indexInfo.enterpriseProdVo.demandCycDay}}号</div>
                    <ul class="ul-list">
                        <li>• 结息日当天会将本结息周期产生的活期利息转入活期账户</li>
                        <li>• 预收益是指待结算的活期利息</li>
                        <li>• 活期日利息=日终活期余额*利率/365</li>
                    </ul>

                </div>
                <div class="footer">
                    <a class="blue" @click="interestRate = !interestRate" href="javascript:void(0)">知道了</a>
                </div>
            </div>
            <div @click="interestRate = !interestRate" class="dialog-bg"></div>
        </div>
    </section>
</template>


<script>
    import util from '@/util/util';
    import { Toast,Indicator } from 'mint-ui';
    import wxshare from '../../../components/wxshare';
    import anime from 'animejs';
    import '@/assets/css/animate.css';
    import {EMP_STATUS} from '../constants/wealthCenterConstants';

    export default {
        name: "wealthMain",
        data(){
            return{
                EMP_STATUS,
                empStatus:EMP_STATUS.NORMAL,
                addFlag:0,
                bgPng:[
                    {backgroundImage:'url(' + require('@/assets/img/stop.png') + ')'},
                    {color:'white'}
                ],
                bgPng2:[
                    {backgroundImage:'url(' + require('@/assets/img/tips.png') + ')'},
                ],
                interestRate:false,
                boolState:true,
                infoState:false,
                bandState:false,

                boolWithdrawlimit:false,

                //解除绑定提示窗
                dialogPopUp:false,
                //活期，定期，固定期限产品列表
                indexInfo:{
                    withdrawlimit:0,
                    timeProTotal:'',
                    timeProNum:'',
                    enterpriseProdVo:{
                        employeeOrderVoList:[]
                    },
                    employeeOrderVoList:{}
                },
                navContent:[
                    {clazz:'current',data:[]},
                    {clazz:'',data:[]}
                ],
                noticeState: false,
                noticeList:[],
                noticeTime:'',
                queryPower:{
                    cz:'0'
                }//企业是否控制菜单  充值和动态协议     cz  xy  值为0的时候需要控制，其它不控制
            }
        },
        created(){
            this.getNoticeList();
            Indicator.open();

            this.$store.dispatch('getIndexInfo',{}).then(resp=>{
                console.log("==getIndexInfo====");
                console.log(resp.data);
                this.indexInfo =resp.data;

                this.indexInfo.enterpriseProdVo.employeeOrderVoList = this.indexInfo.enterpriseProdVo.employeeOrderVoList.filter(item=>{
                    this.$set(item,'clazz',0);
                    this.$set(item,'first',0);
                    return item;
                });
                this.indexInfo.enterpriseProdVo.empTermOrderVoList = this.indexInfo.enterpriseProdVo.empTermOrderVoList.filter(item2=>{
                    this.$set(item2,'clazz',0);
                    this.$set(item2,'first',0);
                    return item2;
                });
                if(this.indexInfo.bindState==1){
                    this.bandState=true;
                }
                this.whetherSigned();
            });

            this.$store.dispatch('queryFixedProdOrderVoList',{}).then(resp=>{
                console.log(resp.data);
                this.$store.commit('setRegularAndFixed',resp.data);
                this.navContent[0].data = this.$store.getters.getRegularList;
                this.navContent[1].data = this.$store.getters.getFixedList;
            });

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
        mounted(){
            setTimeout(()=>{
                this.$nextTick(()=>{
                    console.log(this.queryPower.cz=='0');
                    Indicator.close();
                })
            },500);
        },
        destroyed(){
            clearInterval(this.noticeTime)
        },
        methods:{
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
                        //this.addFlag = 1;
                        this.addFlag = sessionStorage.getItem('STOP')?0:1;
                        sessionStorage.setItem('STOP',true);
                    }
                });
            },
            marquee(){
                let firstItem = document.querySelectorAll('#scrollTop .item')[0].cloneNode(true);
                document.querySelector('#scrollTop').appendChild(firstItem);
                let listNum = document.querySelectorAll('#scrollTop .item'),
                    current = 0;
                console.log(listNum.length)
                this.noticeTime = setInterval(()=>{
                    if(current < listNum.length-1){
                        current ++
                    }
                    else{
                        current = 0;
                        document.querySelector('#scrollTop').style.marginTop = 0;
                    }
                    anime({
                        targets: '#scrollTop',
                        marginTop:  - (current * 40)
                    });
                },3000)
            },
            whetherSigned(){
                console.log("==queryAgree====");
                util.axiosPost('/eebpc/agreePay/queryAgree')
                .then( res => {
                    console.log(res);
                    console.log('1');
                    if(res.data.exits == 1){
                        this.infoState = true;
                    }
                });

                console.log(this.indexInfo.withdrawlimit);
                if(this.indexInfo.withdrawlimit == 0){
                    this.boolWithdrawlimit=false;
                }else{
                    this.boolWithdrawlimit=true;
                }
            },
            linkToInvestment(v){
                this.$store.commit('setProductObj',{...v});
                this.$router.push({name:'investment',params:{id:v.prodId}});
            },
            linkToFixedWealth(v){
                this.$store.commit('setProductObj',{...v});
                this.$router.push({name:'fixedWealth',params:{fixedObj:JSON.stringify(v)}});
            },
            eyeshow(){
                if(this.boolState==false){
                    this.boolState=true;
                }else{
                    this.boolState=false
                }

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
                    this.$router.push({path:'/topUp'});
                }

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
                    this.$router.push({path:'/takeCash'});
                }

            },
            //购买定期产品
            saleprod(prodId){
                var hour = util.getCurrHour();
                if(hour>=21){
                    Toast({
                        message: '此时间为非交易时间',
                        duration:3000
                    });
                }else{
                    sessionStorage.setItem('prodId',prodId);
                    this.$router.push({path:'/buyProduct'});
                }
            },

            //展开or收起定期购买详情
            getProdOrderDetails(e,prodId,empInstanceId,item){

                //如果是首次异步查，非首次不查询
                if(item.first==0){
                    this.$store.dispatch('getProdOrderDetails',{prodId:prodId,empInstanceId:empInstanceId}).then(resp=>{
                        console.log(resp.data);
                        //定期购买列表
                        this.$set(item,'prodOrderVoList',resp.data.prodOrderVoList);

                        if(undefined!=resp&&undefined!=resp.data){
                            //重置成非首次
                            item.first=1;
                        }
                    });
                }

                //控制列表的展示隐藏
                if(item.clazz==0){
                    item.clazz=1;  //展示
                    e.currentTarget.text='收起详情';
                }else{
                    item.clazz=0;   //隐藏
                    e.currentTarget.text='查看详情';
                }
            },


            //购买固定期限产品
            buyTermProd(prod_id){

            },

            //展开or收起固定期购买详情
            getTermOrderDetails(e,prodId,empInstanceId,item){
                 //如果是首次异步查，非首次不查询
                if(item.first==0){
                    this.$store.dispatch('getProdOrderDetails',{prodId:prodId,empInstanceId:empInstanceId}).then(resp=>{
                        console.log(resp.data);

                        //this.prodOrderVoList =resp.data;
                        this.$set(item,'prodOrderVoList',resp.data.prodOrderVoList);

                        if(undefined!=resp&&undefined!=resp.data){
                            //重置成非首次
                            item.first=1;
                        }
                    });
                }

                //控制列表的展示隐藏
                if(item.clazz==0){
                    item.clazz=1;  //展示
                    e.currentTarget.text='收起详情';
                }else{
                    item.clazz=0;   //隐藏
                    e.currentTarget.text='查看详情';
                }
            },

            //定期转活期
            unsubscribe(prod_order_id,prodTerm,prod_money_inc,prodId){
                let unsubscribeInfo={
                    prodOrderId:prod_order_id,
                    prodMoney:prod_money_inc,
                    prodTerm:prodTerm
                }

                sessionStorage.setItem('unsubscribeInfo',JSON.stringify(unsubscribeInfo))

                this.$router.push({path:'/pastToCurrent'});
            },

            //解除绑定按钮
            unBand(){
                 this.dialogPopUp = true;
            },
            //解除绑定取消
            unBandCancel(){
                this.dialogPopUp = false;
            },

            //解除绑定确认
            unBandConf(){
                this.dialogPopUp = false;
                util.axiosPost('/eebpc/login/unband')
                .then( res => {
                    console.log(res);
                    Toast({message:"解绑成功",duration:3000});
                    setTimeout(()=>{
                        //this.$router.push({path:'/register'});
                        this.$router.push({name:'register',params:{resource:'qb'}});
                    },3000);
                });
            },
            toggleFlag(){
                this.addFlag++;
            }
        },
        components:{
            wxshare
        }
    }
</script>

<style scoped>
    .mask-container{
        width: 100%;
    }
    .stop-p{
        position: absolute;
        top: 3rem;
        left: 0rem;
        width: 6rem;
        height: 2rem;
        line-height: 2rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 1;
    }
    .mask{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        z-index: 999;
        opacity: 0.5;
    }
    .modalK{
        width: 100%;
        position: absolute;
        top:5rem;
        z-index: 1000;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }
    .tipsK{
        width: 80%;
        margin-left: 1.5rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: white;
        padding: 1.5rem 1rem 1rem 1rem;
        font-size: 12px;
    }
    .tipsK .contentP{
        text-indent:2rem;
        letter-spacing:.1rem;
        line-height: 1.4rem;
    }
    .tipsK .contentP2{
        display: flex;
    }
    .tipsK .contentP2 img{
        width: 60px;
        height: 60px;
        border-radius: 8px;
        margin-right: -40px;
        margin-top: 8px;
        margin-left: 10px;
    }
    .tipsK2{
        color: white;
        text-align: center;
        font-size: 18px;
        position: relative;
        top: 35vh;
    }
    .zzz{
        z-index: 0;
    }
</style>
