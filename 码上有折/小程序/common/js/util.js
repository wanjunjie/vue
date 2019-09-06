function wxRequest(url, data, complete) {
    //console.log('#######');
    //console.log(wx.getStorageSync('sessionId')?wx.getStorageSync('sessionId'):'2');
    return new Promise((resolve, reject) => {
        wx.request({
            method: "POST",
            url: url,
            data: data,
            //请求头
            header: {
                'cookie':wx.getStorageSync('sessionId'),
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (response) {
                if (response.data && response.data.errorCode) {
                    let flag = true;
                    console.log('interceptors errorCode日志:');
                    console.log(response.data);
                    if (flag && response.data.errorCode) {
                        wx.showToast({title: response.data.errorMsg, icon: 'none'});
                        return;
                    }
                    wx.showToast({title: '服务器出现故障...已提交管理员!', icon: 'none'});
                }

                /*if(response.data['NO_LOGIN']){
                    console.log('no');
                }*/

                let head = response.header;
                wx.setStorageSync('sessionId', wx.getStorageSync('sessionId')?wx.getStorageSync('sessionId'):head['Set-Cookie'] );
                resolve(response);
            },
            fail: function (error) {
                console.log(error);
                reject(error);
            },
            complete: function () {
                if (undefined != complete && null != complete) {
                    complete();//请求完成后执行的函数
                }
            }
        })
    });
}

module.exports = {wxRequest: wxRequest}