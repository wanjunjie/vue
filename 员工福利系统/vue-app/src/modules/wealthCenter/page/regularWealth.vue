<template>
    <!--regularWealth  理财产品页面  定期理财和固定期限理财-->
    <div class="app-wrap">
        <ul class="wealth-management-products-tab clearfix">
            <li v-for="(v,i) in navHead" :key="i" :class="v.clazz" @click="changeNavContent(i)"><a href="javascript:void(0)">{{v.name}}</a></li>
        </ul>
        <ul class="wealth-management-products-ul">
            <li :class="navContent[0].clazz">
                <dl class="wealth-management-products-list">
                    <dd v-if="navContent[0].data && navContent[0].data.length!=0" v-for="(v,i) in navContent[0].data" :key="i" @click="linkToInvestment(v)">
                        <div class="title">
                            <span class="t">{{v.prodName}}</span>
                            <!--<router-link :to="{name:'investment',params:{id:v.prodId}}" class="b">投资</router-link>-->
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
                                <div>可提前赎回</div>
                            </div>
                        </div>
                    </dd>
                    <dd v-if="navContent[0].data.length==0" style="text-align: center">
                        暂时没有该产品!
                    </dd>
                </dl>
            </li>
            <li :class="navContent[1].clazz">
                <dl class="wealth-management-products-list">
                    <dd v-if="navContent[1].data && navContent[1].data.length!=0" v-for="(v,i) in navContent[1].data" :key="i" @click="linkToFixedWealth(v)">
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
                    <!--<dd>
                        <div class="fd">募集中</div>
                        <div class="title">
                            <span class="t">理财产品名称</span>
                        </div>
                        <div class="content">
                            <div class="l">
                                <div class="orange">5.96%</div>
                                <div class="gray">收益率</div>
                            </div>
                            <div class="m">
                                <div class="b">180天</div>
                                <div class="gray">产品期限</div>
                            </div>
                            <div class="r">
                                <div class="b">1元起购</div>
                                <div>10万募集上限</div>
                            </div>
                        </div>
                    </dd>-->
                </dl>
            </li>
        </ul>

        <!--微信分享标签-->
        <wxshare/>
    </div>
</template>
<script>
    import util from '@/util/util'
    import { Toast, MessageBox } from 'mint-ui'
    import {mapGetters} from 'vuex';
    import wxshare from '../../../components/wxshare'

    export default {
        name: "regularWealth",
        data(){
            return {
                navHead:[
                    {name:'定期理财',clazz:'selected'},
                    {name:'固定期限理财',clazz:''}
                ],
                navContent:[
                    {clazz:'current',data:[]},
                    {clazz:'',data:[]}
                ]
            }
        },
        methods:{
            changeNavContent(i=0){
                this.navHead.forEach((item,index)=>i==index?item.clazz='selected':item.clazz='');
                this.navContent.forEach((item,index)=>i==index?item.clazz='current':item.clazz='');
            },
            linkToInvestment(v){
                this.$router.push({name:'investment',params:{id:v.prodId}});
            },
            linkToFixedWealth(v){
                this.$router.push({name:'fixedWealth',params:{fixedObj:JSON.stringify(v)}});
            }
        },
        created(){
            this.navContent[0].data = this.$store.getters.getRegularList;
            this.navContent[1].data = this.$store.getters.getFixedList;
            this.changeNavContent(Number(this.$route.params.index));
        },
        mounted(){
        },
        computed:{
        },
        components:{
            wxshare
        }
    }
</script>

<style scoped>

</style>
