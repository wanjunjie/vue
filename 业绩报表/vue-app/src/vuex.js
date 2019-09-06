import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        discount: 0,
        token:''
    },
    mutations: {
        changeDiscount (state) {
            state.discount = 1
        },
        set_token(state, token) {
            state.token = token
            sessionStorage.token = token
        },
        del_token(state) {
            state.token = ''
            sessionStorage.removeItem('token')
        }

    },
    getters: {
        getDiscount(state){
            return state.discount;
        }
    }
})
export default store