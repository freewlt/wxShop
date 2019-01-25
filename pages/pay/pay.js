// pages/pay/pay.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    orderNum:'0124578245457454',
    totalMoney:'',
    userName:'',
    phone:'',
    address:'',
  },
  payBtn:function(){
    var totalMoney = this.data.totalMoney;
    // util.request(api.OrderSubmit,{totalMoney: totalMoney}).then(function (res) {
    //   var address = areaInfo + detail
    //   wx.navigateTo({
    //     url:'../order/order?totalMoney='+ totalMoney
    //   })
    // });

    util.request(api.OrderSubmit, { totalMoney: totalMoney }, 'POST', 'application/json').then(res => {
      if (res.errno === 0) {
        const orderId = res.data.orderInfo.id;
       
          wx.navigateTo({
            url:'../order/order?totalMoney='+ totalMoney
          });
      
      } else {
        util.showErrorToast('下单失败');
      }
    });


  },
  onLoad: function(options){
    this.setData({
      orderNum:options.orderNum,
      totalMoney:options.totalMoney,
      userName:options.userName,
      phone:options.phone,
      address:options.address,
    })
  },

})

