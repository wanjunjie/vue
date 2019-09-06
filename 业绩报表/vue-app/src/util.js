;(function () {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
  var html = document.getElementsByTagName('html')[0];
  var settingFs = parseInt(html.style.fontSize);
  var settedFs = settingFs;
  var whileCount = 0;
  while (true) {
    var realFs = parseInt(window.getComputedStyle(html).fontSize);
    var delta = realFs - settedFs;
    if (Math.abs(delta) >= 1) {
      if (delta > 0) settingFs--;
      else settingFs++;
      html.setAttribute('style', 'font-size:' + settingFs + 'px!important');
    } else
      break;
    if (whileCount++ > 100)
      break
  }
})();

import axios from "axios"
axios.interceptors.request.use(config => {
  config.baseURL = process.env.VUE_APP_DATA_URL
  console.log(config)
  return config
}, err => {
  console.log('请求超时!')
  return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
  if (data.status && data.status == 200 && data.data.status == 'error') {
    console.log(data.data.msg)
    return;
  }
  if (data.data.errorCode != null && data.data.errorCode != "" && data.data.errorCode != undefined) {
    console.log(data.data.errorMsg)
    return;
  }
  return data;
  
}, err => {
  console.log(err)
  if (err.response.status == 504 || err.response.status == 404) {
    console.log('交易超时，请重试')
  } else if (err.response.status == 403) {
    console.log('权限不足,请联系管理员!')
  } else if (err.response.status == 401) {
    console.log('未有token')
  } else {
    console.log('未知错误!')
  }
  return Promise.resolve(err);
})

let utils = {
  postRequest(url, params) {
    return axios({
      method: 'post',
      url: url,
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
  uploadFileRequest(url, params) {
    return axios({
      method: 'post',
      url: url,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  putRequest(url, params) {
    return axios({
      method: 'put',
      url: url,
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
  deleteRequest(url) {
    return axios({
      method: 'delete',
      url: url
    });
  },
  getRequest(url, params) {
    return axios({
      method: 'get',
      params: params,
      url: url
    });
  },
  //判断非空
  isValidate(obj) {
    return obj != null && obj != "" && obj != undefined;
  },
  //将url里的参数解析成json对象
  convertUrlToJSON(urlData) {
    let field = urlData.split('&');

    let res = {};
    for (let i = 0, len = field.length; i < len; i++) {
      let temp = field[i].split('=');
      res[temp[0]] = temp[1];
    }
    return res;
  },
  //
  getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  // 今天，明天，昨天的日期 昨天： getDateStr(-1); 今天： getDateStr(0);
  getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var year = dd.getFullYear();
    var mon = dd.getMonth() + 1 <= 9 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期
    var day = dd.getDate() <= 9 ? "0" + dd.getDate() : dd.getDate();
    return year + "" + mon + "" + day;
  },
  //获取当月第一天
  getDateCurrentMonth() {
    var dd = new Date();
    dd.setDate(dd.getDate()); //获取AddDayCount天后的日期
    var year = dd.getFullYear();
    var mon = dd.getMonth() + 1 <= 9 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期
    var day = "01";
    return year + "" + mon + "" + day;
  },
  // 获取上月最后一天和第一天的日期
  getDateLastMonth(num) {
    var nowdays = new Date();
    var year = nowdays.getFullYear();
    var month = nowdays.getMonth();
    if (month == 0)
       {
         month = 12;
         year = year - 1;
      }
    if (month < 10) {
       month = "0" + month;
    }
    var firstDay = year + "" + month + "" + "01"; //上个月的第一天
    var myDate = new Date(year, month, 0);
    var lastDay = year + "" + month + "" + myDate.getDate(); //上个月的最后一天
    if (num == 'f') {
      return firstDay;
    }
    else if (num == 'l'){
      return lastDay;
    }
  },
  //分转元
  getAmount(num){
    return num/100;
  }

};
export default utils