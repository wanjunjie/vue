;(function(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    var html = document.getElementsByTagName('html')[0];
    var settingFs = parseInt(html.style.fontSize);
    var settedFs = settingFs;
    var whileCount = 0;
    while(true) {
        var realFs = parseInt(window.getComputedStyle(html).fontSize);
        var delta = realFs - settedFs;
        if (Math.abs(delta) >= 1)
        {
            if (delta > 0) settingFs--; else settingFs++;
            html.setAttribute('style', 'font-size:'+settingFs + 'px!important');
        } else
            break;
        if (whileCount++ > 100)
            break
    }
})()
import axios from "axios"
import $ from "jquery"
import store from './vuex'
// import router from './router'

import { Indicator } from 'mint-ui'

axios.defaults.withCredentials=true;
axios.defaults.headers.common['Authentication-Token'] = store.state.token;
axios.interceptors.request.use(config=> {
    //判断是否存在token，如果存在将每个页面header都添加token
    
    if(store.state.token){
        config.headers.common['Authentication-Token']=store.state.token
    }
    return config;
}, err=> {
    utils.closeIndicator()
    Message.error({message: '请求超时!'});
    return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
    utils.closeIndicator()
    if (data.status && data.status == 200 && data.data.status == 'error') {
        Message.error({message: data.data.msg});
        return;
    }
    if (data.data.errorCode != null && data.data.errorCode != "" && data.data.errorCode != undefined) {
        Message.error({message: data.data.errorMsg});
        return;
    }
    return data;
}, err=> {
    utils.closeIndicator()
    if (err.response.status == 504||err.response.status == 404) {
        Message.error({message: '交易超时，请重试'});
    } 
    else if (err.response.status == 403) {
        Message.error({message: '权限不足,请联系管理员!'});
    }
    else if (err.response.status == 401) {
        store.commit('del_token');
        Message.error({message: 'axios未有token'});
        // router.replace({
        //     path: '/login',
        //     query: {redirect: '123'}//登录成功后跳入浏览的当前页面
        // })
    }
    else {
        Message.error({message: '未知错误!'});
    }
    return Promise.resolve(err);
})

let base = process.env.VUE_APP_DATA_URL;

let Message = {
    error(obj){
        let html = `<div id="messageError" class="popup-invite-friends">
            <div class="main-content">
                <span class="close"></span>
                <div class="i error"></div>
                <div class="info">
                ${obj.message}
                </div>
            </div>
            <div class="bg-content"></div>
        </div>`
        $('#messageError').remove()
        $('body').append(html)
        $('#messageError .close').on('click', function(){
            $('#messageError').remove()
        })
    }
}

let utils = {
    postRequest(url, params){
        return axios({
            method: 'post',
            url: `${base}${url}`,
            data: params,
            transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
            }],
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    uploadFileRequest(url, params){
        return axios({
            method: 'post',
            url: `${base}${url}`,
            data: params,
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });
    },
    putRequest(url, params){
        return axios({
            method: 'put',
            url: `${base}${url}`,
            data: params,
            transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
            }],
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    deleteRequest(url){
        return axios({
            method: 'delete',
            url: `${base}${url}`
        });
    },
    getRequest(url){
        return axios({
            method: 'get',
            url: `${base}${url}`
        });
    },
    //判断非空
    isValidate(obj) {
        return obj != null && obj != "" && obj != undefined;
    },
    //将url里的参数解析成json对象
    convertUrlToJSON(urlData){
        let field = urlData.split('&');

        let res = {};
        for(let i=0,len=field.length;i<len;i++){
            let temp = field[i].split('=');
            res[temp[0]]=temp[1];
        }
        return res;
    },
    //
    getQuery(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
    },
    Message:Message,
    openIndicator(){
        Indicator.open();
    },
    closeIndicator(){
        Indicator.close();
    }
    
};
export default utils