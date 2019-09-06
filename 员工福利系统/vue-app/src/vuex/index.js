import Vue from 'vue'
import Vuex from 'vuex'
import common from './common.js'
import wealthMainStore from '../modules/wealthCenter/store/wealthMainStore';
import takeCashStore from '../modules/wealthCenter/store/takeCashStore';
import userStore from '../modules/user/store/userStore'
import  transactionDetail from '../modules/transactionDetail/store/transactionDetail'
import  freezeDetail from '../modules/freezeDetail/store/freezeDetail'


Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        common,
        wealthMainStore,
        takeCashStore,
        userStore,
        transactionDetail,
        freezeDetail
    }
});
