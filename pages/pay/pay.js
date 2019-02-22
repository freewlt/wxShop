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
    util.request(api.IndexUrlHotGoods,{totalMoney: totalMoney}).then(function (res) {
      wx.navigateTo({
        url:'../detail/detail?totalMoney='+ totalMoney 
      });
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

