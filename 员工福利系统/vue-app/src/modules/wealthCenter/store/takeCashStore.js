import util from '../../../util/util';
import axios from 'axios';

// 应用初始状态
const state = {
    //data
    balance:''
}

// 定义所需的 mutations
const mutations = {
    //set
    setBalance(state,param){
        state.balance = param.balance;
    }
}

const actions = {
    //.do

    //########################个人网银  begin########################
    //查询账户活期余额
    queryBalance(store,data){
        axios.post('/eebpc/query/queryBalance',{}).then(resp=>{
            store.commit('setBalance',resp.data);
        });
    },
    //金额密码校验
    transferMoney(store,data){
        return util.axiosPost('/eebpc/Money/transferMoney',data);
    },

    //个人网银   去网上银行付款
    checkInformation(store,data){
        return axios.post('/eebpc/Money/checkInformation',data);
    },
    /**
     *  自动查询支付结果    每2秒查询一次
     * @param store
     * @param orderId
     * @returns 1:代表成功，2：支付失败 3：通联支付失败6:代表待支付
     */
    queryOrder(store,data){
        return util.axiosPost('/eebpc/Money/queryOrder',data);
    },
    /**
     *主动查询银行是否充值成功
     * @param store
     * @param orderId
     * @returns 1:代表成功，2：支付失败 3：通联支付失败6:代表待支付
     */
    queryBankorder(store,data){
        return util.axiosPost('/eebpc/Money/queryBankorder',data);
    },
    //########################个人网银  end########################

    //########################协议支付  begin########################
    //查询用户签约协议
    queryAgree(store,data){
        return axios.post('/eebpc/agreePay/queryAgree',{});
    },
    //协议签约申请-包含发短信
    signApply(store,data){
        return util.axiosPost('/eebpc/agreePay/signApply',data);
    },
    //协议签约确认-确认开通
    signConf(store,data){
        return util.axiosPost('/eebpc/agreePay/signConf',data);
    },
    //协议支付申请-通联这边发短信
    payApply(store,data){
        return util.axiosPost('/eebpc/agreePay/payApply',data);
    },
    //协议支付确认-确认支付
    payConf(store,data){
        return util.axiosPost('/eebpc/agreePay/payConf',data);
    },
    //########################协议支付  end########################

    //########################购买产品  begin########################
    //跳到购买产品路由的时候根据prodId查询产品信息
    productSale(store,data){
        return util.axiosPost('/eebpc/buy/productSale',data);
    },
    //购买理理财产品
    productSaleSubimt(store,data){
        return util.axiosPost('/eebpc/buy/productSaleSubimt',data);
    },
    //########################购买产品  end########################

    //########################提现  begin########################
    takeCashMoney(store,data){
        return util.axiosPost('/eebpc/Money/TakeCashMoney',data);
    },
    //########################提现  end########################
    //########################定转活  begin########################
    //根据prodOrderId查询对应产品信息
    unsubscribe(store,data){
        return util.axiosPost('/eebpc/buy/unsubscribe',data);
    },
    //定转活确认
    unsubscribeSubimt(store,data){
        return util.axiosPost('/eebpc/buy/unsubscribeSubimt',data);
    }
    //########################定转活  end########################
}

const getters = {
    //get
    getBalance(state){
        return state.balance;
    }

}

export default ({
    state,
    getters,
    actions,
    mutations
})
