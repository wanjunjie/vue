import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GoodFriendsShare from './views/GoodFriendsShare.vue'
import CusFriendsShare from './views/CusFriendsShare.vue'
import MyInvitation from './views/MyInvitation.vue'
import CusMyInvitation from './views/CusMyInvitation.vue'
import RenewalDate from './views/RenewalDate.vue'
import RenewalDate2 from './views/RenewalDate2.vue'
import TransactionDetails from './views/TransactionDetails.vue'
import TransactionDetails2 from './views/TransactionDetails2.vue'
import VisitorsUser from './views/VisitorsUser.vue'
import PaySet from './views/PaySet.vue'
import AddCard from './views/AddCard.vue'
import AddMobile from './views/AddMobile.vue'
import AddMsgCode from './views/AddMsgCode.vue'
import AddSucess from './views/AddSucess.vue'
import BindUser from './views/BindUser.vue'
import PayApplication from './views/PayApplication.vue'
import PaySuccess from './views/PaySuccess.vue'
import Error from './views/Error.vue'
import Index from './views/Index.vue'
import ChangeCard from './views/ChangeCard.vue'
import GetMsgCode from './views/GetMsgCode.vue'
import store from './vuex'
import redPacket from './views/newYear/RedPacket.vue'
import addMchtInfo from './views/newYear/AddMchtInfo.vue'
import addMchtSucc from './views/newYear/AddMchtSucc.vue'
import redPacketsPage2 from './views/newYear/redPacketsPage2.vue'
import CusFriendsShare2 from './views/newYear/CusFriendsShare2.vue'
import MyRewardList from './views/newYear/MyRewardList.vue'
import MyRedPocketList from './views/newYear/MyRedPocketList.vue'
import ActivityRules from './views/newYear/ActivityRules.vue'
import A20190412 from './views/active/A20190412.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/goodFriendsShare',
      name: 'goodFriendsShare',
      component: GoodFriendsShare,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/myInvitation',
      name: 'myInvitation',
      component: MyInvitation,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/cusMyInvitation',
      name: 'cusMyInvitation',
      component: CusMyInvitation,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/cusFriendsShare',
      name: 'cusFriendsShare',
      component: CusFriendsShare,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/cusFriendsShare2',
      name: 'cusFriendsShare2',
      component: CusFriendsShare2,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/renewalDate',
      name: 'renewalDate',
      component: RenewalDate,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/renewalDate2',
      name: 'renewalDate2',
      component: RenewalDate2,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/transactionDetails',
      name: 'transactionDetails',
      component: TransactionDetails,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/transactionDetails2',
      name: 'transactionDetails2',
      component: TransactionDetails2,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/visitorsUser',
      name: 'visitorsUser',
      component: VisitorsUser,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/bindUser',
      name: 'bindUser',
      component: BindUser,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/paySet',
      name: 'paySet',
      component: PaySet,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/addCard',
      name: 'addCard',
      component: AddCard,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/addMobile',
      name: 'addMobile',
      component: AddMobile,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/addMsgCode',
      name: 'addMsgCode',
      component: AddMsgCode,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/addSucess',
      name: 'addSucess',
      component: AddSucess,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/payApplication',
      name: 'payApplication',
      component: PayApplication,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: PaySuccess,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/app',
      name: 'app',
      component: Index,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/changeCard',
      name: 'changeCard',
      component: ChangeCard,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/getMsgCode',
      name: 'getMsgCode',
      component: GetMsgCode,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/bindUser',
      name: 'bindUser',
      component: BindUser,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/redPacket',
      name: 'redPacket',
      component: redPacket,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/addMchtInfo',
      name: 'addMchtInfo',
      component: addMchtInfo,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/addMchtSucc',
      name: 'addMchtSucc',
      component: addMchtSucc,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/redPacketsPage2',
      name: 'redPacketsPage2',
      component: redPacketsPage2,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/myRewardList',
      name: 'myRewardList',
      component: MyRewardList,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/myRedPocketList',
      name: 'myRedPocketList',
      component: MyRedPocketList,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/activityRules',
      name: 'activityRules',
      component: ActivityRules,
      meta:{
        // requireAuth: true
      }
    },
    {
      path: '/A20190412',
      name: 'A20190412',
      component: A20190412,
      meta:{
        // requireAuth: true
      }
    }
  
  ]
})

if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: '123'}
      })
    }
  }
  else {
    next();
  }
})

export default router