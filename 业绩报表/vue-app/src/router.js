import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
     {
       path: '/',
       meta: {
         title: "业绩报表"
       },
       name: 'performanceReport',
       component: () => import('./views/PerformanceReport.vue')
     },
     {
       path: '/performanceReportNone',
       meta: {
         title: "业绩报表"
       },
       name: 'performanceReportNone',
       component: () => import('./views/PerformanceReportNone.vue')
     },
    {
      path: '/merchantsDetails/:userId/:begDate/:endDate',
      meta: {
        title: "商户明细"
      },
      name: 'merchantsDetails',
      component: () => import('./views/MerchantsDetails.vue')
    },
    {
      path: '/transactionList/:userId/:begDate/:endDate',
      meta: {
        title: "商户交易汇总"
      },
      name: 'transactionList',
      component: () => import('./views/TransactionList.vue')
    },
    {
      path: '/transactionDetails/:userId/:merchantId/:begDate/:endDate',
      meta: {
        title: "商户交易明细"
      },
      name: 'transactionDetails',
      component: () => import('./views/TransactionDetails.vue')
    },
    // {
    //   path: '/agreementA',
    //   meta: {
    //     title: "通联支付会员服务协议"
    //   },
    //   name: 'agreementA',
    //   component: () => import('./views/AgreementA.vue')
    // },
    // {
    //   path: '/agreementB',
    //   meta: {
    //     title: "通联支付账户使用协议"
    //   },
    //   name: 'agreementB',
    //   component: () => import('./views/AgreementB.vue')
    // },
    // {
    //   path: '/agreementC',
    //   meta: {
    //     title: "通商云小伙伴隐私协议"
    //   },
    //   name: 'agreementC',
    //   component: () => import('./views/AgreementC.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => { //beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) { //判断是否有标题
    document.title = to.meta.title
  }
  next() //执行进入路由，如果不写就不会进入目标页
})

export default router