import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/app.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './vuex'
import util from './util'
import '@/assets/js/iconfont/iconfont.js'

Vue.use(MintUI)

Vue.prototype.$util = util
Vue.prototype.$dataUrl = process.env.VUE_APP_DATA_URL,

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
