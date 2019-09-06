//时间转为 yy/MM/dd HH:mm:ss 格式字符串
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 时间转为指定格式字符串
   const formatDate = (dateStr, fmt) =>{
    let _this = new Date(dateStr);
    var o = {
      "M+": _this.getMonth() + 1,                 //月份
      "d+": _this.getDate(),                    //日
      "H+": _this.getHours(),                   //小时
      "m+": _this.getMinutes(),                 //分
      "s+": _this.getSeconds(),                 //秒
      "q+": Math.floor((_this.getMonth() + 3) / 3), //季度
      "S": _this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  // 字符串转为时间
  const parse = (dateString, pattern) => {
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





module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  pasre: parse
}