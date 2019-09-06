import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/base.css'
import util from './util'

Vue.config.productionTip = false
Vue.prototype.$util = util
Vue.prototype.$dataUrl = process.env.VUE_APP_DATA_URL

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
