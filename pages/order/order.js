// pages/order/order.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    list: [],
    price: 20,
  },
  getIndexData: function(){
    var that = this;
    // 人气推荐全民砍价
    util.request(api.IndexUrlHotGoods).then(function (res) {
      if (res.errno === 0) {
        var list = res.data.hotGoodsList.splice(1,1);
        that.setData({
          list: list,
        });
      }
    });
  },
  addAddress: function(){
    wx.navigateTo({
      url:'../../pages/address/address'
    })
  },
  onLoad: function(){
    this.getIndexData();
  }
})
