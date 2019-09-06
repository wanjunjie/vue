import util from '../../../util/util';
import axios from 'axios';

// 应用初始状态
const state = {
    //data
    regularList:[],//定期理财
    fixedList:[],//固定期限理财
    productObj:{},//定期理财obj
    queryPower:{}//企业是否控制菜单  充值和动态协议     cz  xy  值为0的时候需要控制，其它不控制
}

// 定义所需的 mutations
const mutations = {
    //set
    setRegularAndFixed(state,param){
        //state.regularList = param.ProdInfoListOne;//定期理财
        //state.fixedList = param.ProdInfoListTwo;//固定期限理财
        sessionStorage.setItem('regularList',JSON.stringify(param.ProdInfoListOne));//定期理财
        sessionStorage.setItem('fixedList',JSON.stringify(param.ProdInfoListTwo));//固定期限理财
    },
    setProductObj(state,param){
        state.productObj = param;
    },
    setQueryPower(state,params){
        state.queryPower = params;
    }
}

const actions = {
    //.do

    //########################我的财富中心 首页  begin########################
    //首页列表查询
    getIndexInfo(store,data){
        return axios.post('/eebpc/wealthCenter/getIndexInfo',{});
    },

    //定期产品购买列表
    getProdOrderDetails(store,data){
        return util.axiosPost('/eebpc/wealthCenter/getProdOrderDetails',data);
    },

    //查询企业期限产品
    queryFixedProdOrderVoList(store,data){
        return util.axiosPost('/eebpc/wealthCenter/getFixedProdOrderVoList',data);
    },

    // 查询定期、固定期限详情
    queryProdDetail(store,data){
        return util.axiosPost('/eebpc/wealthCenter/getProdDetail',data);
    },
    //  活转固定期限-指固定天数
    termProBuy(store,data){
        return util.axiosPost('/eebpc/buy/termProBuy',data);
    },

    // 从银行卡购买固定期限产品
    productSaleProd(store,data){
        return util.axiosPost('/eebpc/buy/productSaleProd',data);
    },

    //固定期/定期，预期收益计算
    getExpectedEarnings(store,data){
        return util.axiosPost('/eebpc/wealthCenter/getExpectedEarnings',data);
    },

    //查询企业是否控制菜单
    queryPowerByInstanceId(store,data){
        return util.axiosPost('/eebpc/queryPara/queryInstanceid',data);
    }


    //########################我的财富中心  首页 end########################


}

const getters = {
    //get

    getRegularList(state){
        return JSON.parse(sessionStorage.getItem('regularList'));
        //return state.regularList;
    },
    getFixedList(state){
        return JSON.parse(sessionStorage.getItem('fixedList'));
        //return state.fixedList;
    },
    getProductObj(state){
        return state.productObj;
    },
    getQueryPower(state){
        return state.queryPower;
    }

}

export default ({
    state,
    getters,
    actions,
    mutations
})
