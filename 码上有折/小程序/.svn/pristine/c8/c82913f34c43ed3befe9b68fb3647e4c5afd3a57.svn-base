function  req(url,cb) {
      wx.request({
          url: url,
          data: {},
          method:  'POST',
          header:  { 'content-type':  'application/json' },
          success:  function (res) {
              return  typeof  cb  ==  "function"  &&  cb(res.data)
          },
          fail:  function () {
              return  typeof  cb  ==  "function"  &&  cb(false)
          }
      })
}

module.exports  =  {  req:  req  }