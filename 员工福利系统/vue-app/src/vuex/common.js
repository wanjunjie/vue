import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import util from '@/util/util';
import * as allinpay from '../allinpayProperties';

Vue.use(Vuex)

// 应用初始状态
const state = {
    //data
    key:''//对密码进行加密
}

// 定义所需的 mutations
const mutations = {
    //set
    setKey(state,param){
        state.key = param;
    }
}

const actions = {
    //.do

    //加密获取key
    getKey(store,data){
        axios.post('/eebpc/login/getkey',data).then(resp=>{
            store.commit('setKey',resp.data.key);
        });
    }
}

const getters = {
    //get
    getKey(state){
        return state.key;
    }
}

export default ({
    state,
    getters,
    actions,
    mutations
})
