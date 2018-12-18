// pages/address/address.js
Page({
  data:{
    userName: '',
    add_telNumber: '',
    add_provinceName: '',
    add_cityName: '',
    add_countyName: '',
    add_detailInfo: '',
    add_postalCode: '',
  },
  chooseAddress:function(){
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log(JSON.stringify(res));
          console.log(res);
          that.setData({
            "userName": res.userName,
            "add_telNumber": res.telNumber,
            "add_provinceName": res.provinceName,
            "add_cityName": res.cityName,
            "add_countyName": res.countyName,
            "add_detailInfo": res.detailInfo,
            "add_postalCode": res.postalCode,
            //具体收货地址显示
            flag:false,

          })
        },
        fail: function (err) {
          console.log(JSON.stringify(err));
          console.info("收货地址授权失败");
          wx.showToast({
            title: '授权失败，您将无法进行下单支付;重新授权请删除小程序后再次进入',
            icon: 'success',
            duration: 20000
          })
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
})