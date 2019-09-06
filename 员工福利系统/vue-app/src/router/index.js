import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
//import index from '@/components/index'
import register from '@/components/register'
import newRegister from '@/modules/new/register'
import wealthMain from '../modules/wealthCenter/page/wealthMain.vue'
import freezeDetail from '../modules/freezeDetail/page/freezeDetail.vue'
import takeCash from '../modules/wealthCenter/page/takeCash.vue'
import newTakeCash from '../modules/new/takeCash.vue'
import userEdit from '@/modules/user/page/userEdit.vue'
import transactionDetail from '@/modules/transactionDetail/page/transactionDetail.vue'
import perfectInfor from '@/modules/perfectInfor/page/perfectInfor.vue'
import newPerfectInfor from '@/modules/new/perfectInfor.vue'
import topUp from '@/modules/topUp/page/topUp.vue'
import newTopUp from '@/modules/new/topUp.vue'
import investRegularly from '@/modules/investRegularly/page/investRegularly.vue'
import investmentDetail1 from '@/modules/investRegularly/page/investmentDetail1.vue'
import investmentDetail2 from '@/modules/investRegularly/page/investmentDetail2.vue'
import agreement from '@/modules/investRegularly/page/agreement.vue'
import agreement1 from '@/modules/investRegularly/page/agreement1.vue'
import investment from '@/modules/investment/page/investment.vue'
import newInvestment from '@/modules/new/investment.vue'
import regularWealth from '../modules/wealthCenter/page/regularWealth.vue'
import newRegularWealth from '../modules/new/regularWealth.vue'
import fixedWealth from '../modules/wealthCenter/page/fixedWealth.vue'
import newFixedWealth from '@/modules/new/fixedWealth.vue'
import setPassWord from '../modules/setPassWord/page/setPassWord.vue'
import resetPwd from '../modules/getBackPayPwd/page/resetPwd.vue'
import userValidate from '../modules/getBackPayPwd/page/userValidate.vue'
import sentMessageValidate from '../modules/getBackPayPwd/page/sentMessageValidate.vue'
import notice from '../modules/notice/page/notice.vue'
import noticeDetail from '../modules/notice/page/noticeDetail.vue'
import newFixedWealthProductPurchase from '@/modules/new/fixedWealthProductPurchase.vue'
import newInvestmentProductPurchase from '@/modules/new/investmentProductPurchase.vue'
import wealthMain2 from '../modules/new/index.vue'
import myWarehouse from '../modules/new/myWarehouse.vue'
import myCurrentAcct from '../modules/new/myCurrentAcct.vue'
import myWarehouseDetail1 from '../modules/new/myWarehouseDetail1.vue'
import myWarehouseDetail2 from '../modules/new/myWarehouseDetail2.vue'
import myWarehouseDetail3 from '../modules/new/myWarehouseDetail3.vue'
import myWarehouseDetail4 from '../modules/new/myWarehouseDetail4.vue'
import myWarehouseDetailConf from '../modules/new/myWarehouseDetailConf.vue'



Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'index', component: wealthMain,meta:{title:'首页'}},
        {path: '/register',name:'register', component: register,meta:{title:'员工福利系统'}},
        {
            path: '/new/register',
            name: 'newRegister',
            component: newRegister,
            meta: {
                title: '员工福利系统'
            }
        },
        {path: '/wealthMain',name:'wealthMain', component: wealthMain,meta:{title:'中心'}},
        {path: '/freezeDetail',name:'freezeDetail', component: freezeDetail,meta:{title:'冻结明细'}},
        {path: '/takeCash',name:'takeCash', component: takeCash,meta:{title:'提现'}},
        {
            path: '/new/takeCash',
            name: 'newTakeCash',
            component: newTakeCash,
            meta: {
                title: '提现'
            }
        },
        {path: '/userEdit',name:'userEdit', component: userEdit,meta:{title:'修改密码'}},
        {path: '/transactionDetail',name:'transactionDetail', component: transactionDetail,meta:{title:'交易明细'}},
        {path: '/perfectInfor',name:'perfectInfor', component: perfectInfor,meta:{title:'员工福利系统'}},
        {
            path: '/new/perfectInfor',
            name: 'newPerfectInfor',
            component: newPerfectInfor,
            meta: {
                title: '员工福利系统'
            }
        },
        {path: '/topUp',name:'topUp', component: topUp,meta:{title:'充值'}},
        {
            path: '/new/topUp',
            name: 'newTopUp',
            component: newTopUp,
            meta: {
                title: '充值'
            }
        },
        {path: '/investRegularly',name:'investRegularly', component: investRegularly,meta:{title:'我的投资'}},
        {path: '/investmentDetail1',name:'investmentDetail1', component: investmentDetail1,meta:{title:'投资详情'}},
        {path: '/investmentDetail2',name:'investmentDetail2', component: investmentDetail2,meta:{title:'投资详情'}},
        {path: '/agreement',name:'agreement', component: agreement,meta:{title:'借款协议'}},
        {path: '/agreement1',name:'agreement1', component: agreement1,meta:{title:'借款协议'}},
        {path: '/investment/:id',name:'investment', component: investment,meta:{title:'投资定期'}},
        { path: '/new/investment/:id', name: 'newInvestment', component: newInvestment, meta: { title: '投资定期' } },
        {path:'/regularWealth/:index',name:'regularWealth',component:regularWealth,meta:{title:'理财产品'}},
        {path:'/newRegularWealth/:index',name:'newRegularWealth',component:newRegularWealth,meta:{title:'理财产品'}},
        {path:'/fixedWealth/',name:'fixedWealth',component:fixedWealth,meta:{title:'固定期限理财'}},
        { path: '/new/fixedWealth/', name: 'newFixedWealth', component: newFixedWealth, meta: { title: '固定期限理财' } },
        {path:'/setPassWord',name:'setPassWord',component:setPassWord,meta:{title:'设置密码'}},
        {path:'/resetPwd',name:'resetPwd',component:resetPwd,meta:{title:'重置支付密码'}},
        {path:'/sentMessageValidate',name:'sentMessageValidate',component:sentMessageValidate,meta:{title:'重置支付密码'}},
        {path:'/userValidate',name:'userValidate',component:userValidate,meta:{title:'重置支付密码'}},
        {path:'/notice',name:'notice', component: notice,meta:{title:'通知'}},
        {path:'/noticeDetail',name:'noticeDetail',component:noticeDetail,meta:{title:'通知详情'}},
        {
            path: '/wealthMain2',
            name: 'wealthMain2',
            component: wealthMain2,
            meta: {
                title: '员工福利系统'
            }
        }, {
            path: '/myWarehouse',
            name: 'myWarehouse',
            component: myWarehouse,
            meta: {
                title: '我的持仓'
            }
        }, {
            path: '/myCurrentAcct',
            name: 'myCurrentAcct',
            component: myCurrentAcct,
            meta: {
                title: '我的小金库'
            }
        }, {
            path: '/myWarehouseDetail1',
            name: 'myWarehouseDetail1',
            component: myWarehouseDetail1,
            meta: {
                title: '我的持仓明细'
            }
        },{
            path: '/myWarehouseDetail2',
            name: 'myWarehouseDetail2',
            component: myWarehouseDetail2,
            meta: {
                title: '我的持仓明细'
            }
        },{
            path: '/myWarehouseDetail3',
            name: 'myWarehouseDetail3',
            component: myWarehouseDetail3,
            meta: {
                title: '我的持仓明细'
            }
        },{
            path: '/myWarehouseDetail4',
            name: 'myWarehouseDetail4',
            component: myWarehouseDetail4,
            meta: {
                title: '我的持仓明细'
            }
        },{
            path: '/myWarehouseDetailConf',
            name: 'myWarehouseDetailConf',
            component: myWarehouseDetailConf,
            meta: {
                title: '确认赎回'
            }
        },
        {
            path: '/new/fixedWealthProductPurchase',
            name: 'newFixedWealthProductPurchase',
            component: newFixedWealthProductPurchase,
            meta: {
                title: '理财产品申购'
            }
        },
        {
            path: '/new/investmentProductPurchase',
            name: 'newInvestmentProductPurchase',
            component: newInvestmentProductPurchase,
            meta: {
                title: '理财产品申购'
            }
        },
        
    ]
})
