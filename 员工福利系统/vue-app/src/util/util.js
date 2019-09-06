import axios from "axios";
import qs from "qs";
import errorCode from '@/util/errorCodeValues';
import router from '@/router';
import { Toast } from 'mint-ui';
import * as allinpay from '../allinpayProperties';
import wx from 'weixin-js-sdk';
import { Indicator } from 'mint-ui';

axios.interceptors.response.use(
    response =>{
        Indicator.close();
        if(response.data&&response.data.errorCode){
            let flag = true;
            for(let key of Object.keys(errorCode)){
                if(key===response.data.errorCode){
                    flag = false;
                    console.log(`errorCode:${errorCode[key].errorCode};errorMsg:${errorCode[key].errorMsg}`);//注意！！这里不是单引号 '  而是 `
                    Toast({message:errorCode[key].errorMsg,duration:3000});
                    if(errorCode[key].route){
                        setTimeout(function(){
                            router.push(errorCode[key].route);
                        },1500);
                    }
                    return response;
                }
            }

            console.log('interceptors errorCode日志:');
            console.log(response.data);
            if(flag&&response.data.errorCode){
                Toast({message:response.data.errorMsg,duration:3000});
                return;
            }
            Toast({message:'服务器出现故障...已提交管理员!',duration:3000});
        }

        return response;
    },
    error => {
        Indicator.close();
        console.log(error);
    }
)

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    phoneCode:{
        //短信发送验证码的对象
        sendCodeobj:{
            clock:function(){},
            nums:60,
            btn:{}
        },
        sendCode(btn,sendObj){

            this.sendCodeobj.nums = sendObj&&sendObj.nums?sendObj.nums:this.sendCodeobj.nums;//自定义多少秒
            this.sendCodeobj.btn = btn;
            this.sendCodeobj.btn.disabled = true;
            this.sendCodeobj.btn.style.backgroundColor = '#ccc';
            this.sendCodeobj.btn.value = this.sendCodeobj.nums + 's重发';

            //设置时钟
            this.sendCodeobj.clock = setInterval(()=>{
                this.sendCodeobj.nums--;
                if(this.sendCodeobj.nums>0){
                    this.sendCodeobj.btn.value = this.sendCodeobj.nums + 's重发';
                }else{
                    this.sendCodeobj.btn.style.backgroundColor = sendObj&&sendObj.bgColor?sendObj.bgColor:'#fff';//自定义背景色
                    this.sendCodeobj.btn.disabled = false;
                    clearInterval(this.sendCodeobj.clock); //清除js定时器
                    this.sendCodeobj.btn.value = sendObj&&sendObj.btnValue?sendObj.btnValue:'重新获取';//value重新获取
                    this.sendCodeobj.nums = sendObj&&sendObj.nums?sendObj.nums:60;//重置时间
                }
            }, 1000); //一秒执行一次
        }
    },

    /**
     * 表单校验
     * 目前校验规则有非空，是否是数字，是否是手机号,是否是银行卡号,是否是身份证
     * @param resource  源数据
     * @param rules     数据规则    源数据和数据规则key要一致
     * @returns {*}
     */
    validateForm(resource,rules){
        let msg = {hasNull:false,info:''};

        let arr = new Array();
        for(let key of Object.keys(resource)){
            for(let k2 of Object.keys(rules)){
                if(key===k2) {
                    arr.push({key:key,val:resource[key],arr:rules[k2]});
                }
            }
        }

        for(let i=0,len=arr.length;i<len;i++){
            let item = arr[i];
            for(let j=0,len2=item.arr.length;j<len2;j++){
                let temp = item.arr[j];
                if(temp.isNull&&!this.isValidate(item.val)
                    ||
                    temp.isNum&&!this.isNumber(item.val)
                    ||
                    temp.isPhone&&!this.checkIsMobile(item.val)
                    ||
                    temp.isBankId&&!this.checkBankId(item.val)
                    ||
                    temp.isIdCard&&!this.checkIdCard(item.val)
                ){
                    return msg={hasNull:true,info:temp.message};
                }
            }
        }
        return msg;
    },

    //判断是否是数值型
    isNumber(val){
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if(regPos.test(val) || regNeg.test(val)){
            return true;
        }else{
            return false;
        }
    },

    //字符串转数值型
    toNumber(str){
        return this.isNumber(str)?Number(str):0;
    },

    //校验是否为手机号
    checkIsMobile(phoneNum) {
        var reg = /^(1[3|4|5|7|8])[\d]{9}$/;
        if (reg.test(phoneNum) == false) {
            return false;
        }
        return true;
    },
    //判断非空
    isValidate(obj) {
        return obj != null && obj != "" && obj != undefined;
    },

    //判断数组
    isValidateArr(arr){
        return arr != null && arr != undefined && arr.length>0;
    },
    //给字符串长度大于一个数字的该字符串后面加上...
    interceptStr(str,num){
        return (this.isValidate(str)&&str.length>num)?str.substring(0,num)+'...':str;
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

    //发送post请求并解决中文乱码问题
    axiosPost(url, data) {
        axios.create({headers: {'content-type': 'application/x-www-form-urlencoded'}});
        data = qs.stringify(data);
        return axios.post(url, data);
    },

    //身份证校验
    checkIdCard(idNum){
        //15位身份证号码的基本格式校验
        var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idNum);

        //18位身份证号码的基本格式校验
        var check2 = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idNum);
        if((!check)&&(!check2)) {
            return false;
        }
        return true;
    },
    //银行卡号校验
    checkBankId(bankId){
        var reg = /^[0-9]+$/;
        var back = reg.test(bankId);
        if( (bankId.length < 16)|| (bankId.length>25) || !back){
            return false;
        }
        return true;
    },
    getPropUrl(param){
        let url = {};
        if('development'===param){//开发&&测试
            url.etsUrl = allinpay.development.etsUrl;
        }else{
            //生产
            url.etsUrl = allinpay.production.etsUrl;
        }
        return url;
    },

    //日期处理
    formatDate: {
        format: function (dateStr, fmt) {
            let _this = new Date(dateStr);
            var o = {
                "M+" : _this.getMonth()+1,                 //月份
                "d+" : _this.getDate(),                    //日
                "h+" : _this.getHours(),                   //小时
                "m+" : _this.getMinutes(),                 //分
                "s+" : _this.getSeconds(),                 //秒
                "q+" : Math.floor((_this.getMonth()+3)/3), //季度
                "S"  : _this.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (_this.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }

    },

    //取得当前时间小时
    getCurrHour(){
        var d = new Date();
        //取得当前时间小时：
        return d.getHours();
    },
    formatAmount(val){
        return Number(val) >= 1 ? val+'万':Number(val)*10000;
    },


     /**
     * 判断是否是微信环境
     */
    getIsWxClient () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }
        return false;
    },
    
    //=============微信分享start==============

    wxShareCom(thumb){
        this.axiosPost('/eebpc/wx/wxShare')
        .then( response => {
            console.log(1)
            console.log(response)
            this.wxdetail = response.data
            this.goToWX(thumb)
        })
    },
    goToWX(thumb){
        this.axiosPost('/eebpc/wx/wxConfig')
        .then( response => {
            let res = JSON.parse(JSON.stringify(response))
            res = res.data;
            this.wxInit(res,thumb);
            console.log(res)
        })
    },
    // 微信分享
    wxInit(res,thumb) {
        //let imgUrl = location.protocol + location.host + this.thumb;
        let imgUrl = thumb;
        wx.config({
            debug: false,
            appId: res.appId,
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
        });
        wx.ready(()=> {
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: this.wxdetail.title, // 分享标题
                desc: this.wxdetail.desc, // 分享描述
                link: this.wxdetail.link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function() {
                    // alert("分享到朋友圈成功")
                },
                cancel: function() {
                    alert("分享失败,您取消了分享!")
                }
            }); 
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: this.wxdetail.title, // 分享标题
                desc: this.wxdetail.desc, // 分享描述
                link: this.wxdetail.link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function() {
                    // alert("成功分享给朋友")
                },
                cancel: function() {
                    alert("分享失败,您取消了分享!")
                }
            });
            //享给QQ好友
            wx.onMenuShareQQ({
                title: this.wxdetail.title, // 分享标题
                desc: this.wxdetail.desc, // 分享描述
                link: this.wxdetail.link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function() {
                    // alert("成功分享给QQ好友")
                },
                cancel: function() {
                    alert("分享失败,您取消了分享!")
                }
            });
            //分享QQ空间
            wx.onMenuShareQZone({
                title: this.wxdetail.title, // 分享标题
                desc: this.wxdetail.desc, // 分享描述
                link: this.wxdetail.link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function() {
                    // alert("成功分享QQ空间")
                },
                cancel: function() {
                    alert("分享失败,您取消了分享!")
                }
            });
        });
        wx.error(function(err) {
            alert(JSON.stringify(err))
        });
    },
    //=============微信分享end================
    openIndicator(){
        Indicator.open();
    },
    closeIndicator(){
        Indicator.close();
    },
    scrollTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

};
