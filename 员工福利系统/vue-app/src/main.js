// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import Vue from 'vue'

import MintUI from 'mint-ui'
//import { Toast,Swipe, SwipeItem,Loadmore  } from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App'
import router from './router'

import store from './vuex/index'

// 引入fastclick
//import fastClick from 'fastclick'
//使用faseclick
//fastClick.attach(document.body)

Vue.config.productionTip = false
Vue.use(MintUI)

router.beforeEach(function(to,from,next){
    document.title = to.meta.title;
    if (to.path == '/register') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
//    if (!user && to.path != '/register' && to.path!='/perfectInfor' && to.path!='/setPassword') {
//        next({path: '/register'})
//    } else {
        next()
//    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App},
  template: '<app/>'
})
