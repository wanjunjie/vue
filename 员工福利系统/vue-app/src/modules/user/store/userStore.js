import util from '../../../util/util';
import axios from 'axios';

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

    //########################用户设置  begin########################
    //用户注册
    userregister(store,data){
    return util.axiosPost('/eebpc/login/h5login',data);
    },
    //用户修改密码
    modifyPwd(store,data){
        return util.axiosPost('/eebpc/password/changerPassword',data);
    }
    //########################用户设置  end########################
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
