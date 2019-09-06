import util from '../../../util/util';

// 应用初始状态
const state = {
    //data
}

// 定义所需的 mutations
const mutations = {
    //set
}

const actions = {
    //.do

    //########################交易明细  begin########################
    /*
     * 查询个人活期交易明细
     * currentPage  查询页码
     * typeCode     0全部1充值2提现3投资
     */
    qureyEmployeeFinanceDetailInfoHFive(store,params){
        return util.axiosPost('/eebpc/query/qureyEmployeeFinanceDetailInfoHFive',params);
    }
    //########################交易明细  end########################
}

const getters = {
    //get
}

export default ({
    state,
    getters,
    actions,
    mutations
})
