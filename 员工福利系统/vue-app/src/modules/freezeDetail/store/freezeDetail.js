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

    //########################查询个人冻结金额明细  begin########################
    /*
     * 查询个人冻结金额明细
     * currentPage  查询页码
     */
    queryFreezeDetail(store,params){
        return util.axiosPost('/eebpc/query/queryFreezeDetail',params);
    }
    //########################查询个人冻结金额明细  end########################
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
