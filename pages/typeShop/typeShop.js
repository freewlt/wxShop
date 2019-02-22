// pages/typeShop/typeShop.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  data:{
    hotGoods: [],
  },
  herfBtn:function(){
    wx.navigateTo({
      url:'../detail/detail'
    }) 
  },
  onLoad:function(){
    const that = this;
    // 人气推荐全民砍价
    util.request(api.IndexUrlHotGoods).then(function (res) {
      if (res.errno === 0) {
        var hotGoods = res.data.hotGoodsList;
        that.setData({
          hotGoods: hotGoods,
        });
      }
    });
  }
})
