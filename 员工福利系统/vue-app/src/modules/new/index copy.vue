<template>
    <div class="app-wrap">
    <div class="gray-bg">
        <div v-if="noticeState" class="top-prompt-info">
            <router-link to="/notice" class="more">
                <div id="scrollTop" class="list">
                    <div v-for="(item, index) in noticeList.list" :key="index" class="item">
                        <span class="i">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gonggao"></use>
                            </svg>
                        </span>
                        <span class="c">{{item.title}}</span>
                    </div>
                </div>
            </router-link>
            <span @click="noticeState = !noticeState" class="close">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-guanbi1"></use>
                </svg>
            </span>
        </div>
        <div class="top-pay-check">
            <router-link to="/notice" class="tz-box">
                <span v-if="noticeList.total > 0" class='c'>{{noticeList.total}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gonggao"></use>
                </svg>
            </router-link>
            <div class="title-box">
                <span>总资产（元）</span>
                <span class="eyes"  v-if="boolState==true" @click="eyeshow">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yanjing"></use>
                    </svg>
                </span>
                <span class="eyes"  v-if="boolState==false" @click="eyeshow">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yanjing1"></use>
                    </svg>
                </span>
                
            </div>
             <div class="num">{{this.totalMoney}}</div>
             <a class="link" href="#">查看我的持仓</a>
        </div>
        <div class="pay-check-middle-box">
            <div class="title">
                <span class="t">小金库</span>
                <span class="tag">活期</span>
                <router-link class="info" href="#">
                    <span>详情</span>
                    <span class="i">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </span>
                </router-link>
            </div>
            <div class="main">
                <span class="t">账户余额（元）</span>
                <span class="n"  v-if="boolState==true" >{{userAccountInfoVo.availBal}}</span>
                <span class="n"  v-if="boolState==false" >****</span>
            </div>
            <a class="b-btn" href="#" @click="recharge">充值</a>
        </div>
        <!--<div class="pay-check-prompt-middle">
            温馨提示：系统转账时间为 00:00-21:00
        </div>-->
        <div class="pay-check-investment-bottom">
            <dl class="sub-list">
                <dd>
                    <div class="title">
                        <span class="t"><b>定期理财</b></span>
                        <div class="r">
                            随时定转活 到期自动续存
                        </div>
                    </div>
                </dd>
                <dd v-if="navContent[0].data && navContent[0].data.length!=0 && i < 2" v-for="(v,i) in navContent[0].data" :key="i" @click="linkToInvestment(v)">
                    <div class="title">
                        <span class="t">{{v.prodName}}</span>
                    </div>
                    <div class="content">
                        <div class="l">
                            <div class="orange">{{v.prodRate}}</div>
                            <div>年化收益率</div>
                        </div>
                        <div class="m">
                            <div class="b">{{v.prodTerm}}个月</div>
                            <div>产品期限</div>
                        </div>
                        <div class="r">
                            <div class="n">{{v.prodBuyMinmonye}}元起购</div>
                            <div>{{v.prodRaiseLimit}}募集上限</div>
                        </div>
                    </div>
                </dd>
                    <dd v-if="navContent[0].data.length==0" style="text-align: center">
                        暂时没有该产品!
                    </dd>
                <dd>
                    <router-link :to="{name:'regularWealth',params:{index:0}}" class="bottom-more-btn" >更多产品</router-link>
                </dd>
            </dl>
        </div>
        <div class="pay-check-investment-bottom">
            <dl class="sub-list">
                <dd>
                    <div class="title">
                        <span class="t"><b>固定期限理财</b></span>
                        <div class="r">
                            产品期限内不支持赎回
                        </div>
                    </div>
                </dd>
                    <dd v-if="navContent[1].data && navContent[1].data.length!=0 && ii < 2" v-for="(v,ii) in navContent[1].data" @click="linkToFixedWealth(v)">
                    <div class="title">
                        <span class="t">{{v.prodName}}</span>
                    </div>
                    <div class="content">
                        <div class="l">
                            <div class="orange">{{v.prodRate}}</div>
                            <div>年化收益率</div>
                        </div>
                        <div class="m">
                            <div class="b">{{v.prodTerm}}天</div>
                            <div>产品期限</div>
                        </div>
                        <div class="r">
                            <div class="n">{{v.prodBuyMinmonye}}元起购</div>
                            <div>{{v.prodRaiseLimit}}募集上限</div>
                        </div>
                    </div>
                </dd>

                <dd v-if="navContent[1].data.length==0" style="text-align: center">
                    暂时没有该产品!
                </dd>
                <dd>
                    <router-link :to="{name:'regularWealth',params:{index:1}}" class="bottom-more-btn" >更多产品</router-link>
                </dd>
            </dl>
        </div>
    </div>
    </div>
</template>

<script>

    import util from '@/util/util';
    import { Toast,Indicator } from 'mint-ui';
    import anime from 'animejs';
    import '@/assets/css/animate.css';
    import {EMP_STATUS} from '../wealthCenter/constants/wealthCenterConstants';

    export default {
        name: "",
       
        data(){
            return {
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

                totalMoney:0.00,
                noticeList:[],
                noticeState: false,
                navContent:[
                    {clazz:'current',data:[]},
                    {clazz:'',data:[]}
                ],
                userAccountInfoVo:{
                    empInstanceId:'',
                    instanceId:'',
                    currBal:'',
                    availBal:'',
                    freezeBal:''
                }
            }
        },
        methods:{
            eyeshow(){
                if(this.boolState==false){
                    this.boolState=true;
                }else{
                    this.boolState=false
                }

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
                },3000);
            },
            getIndexInfo(){
                util.axiosPost('/eebpc/wealthCenter2/getIndexInfo'
                ).then(resp=>{
                    console.log("==wealthCenter2/etIndexInfo====");
                    console.log(resp.data);
                    this.indexInfo =resp.data;
                    this.userAccountInfoVo = resp.data.userAccountInfoVo;
                    this.totalMoney = resp.data.totalMoney;
                    if(this.indexInfo.bindState==1){
                        this.bandState=true;
                    }
                    this.whetherSigned();
                });
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
            linkToInvestment(v){
                this.$store.commit('setProductObj',{...v});
                this.$router.push({name:'newInvestment',params:{id:v.prodId}});
            },
            linkToFixedWealth(v){
                this.$store.commit('setProductObj',{...v});
                this.$router.push({name:'newFixedWealth',params:{fixedObj:JSON.stringify(v)}});
            },
            
        },
        created(){
           this.getNoticeList();
           this.getIndexInfo();
            this.$store.dispatch('queryFixedProdOrderVoList',{}).then(resp=>{
                console.log(resp.data);
                this.$store.commit('setRegularAndFixed',resp.data);
                this.navContent[0].data = this.$store.getters.getRegularList;
                this.navContent[1].data = this.$store.getters.getFixedList;
            });
        },
        components:{
            
        }
    }
</script>

<style scoped>
</style>