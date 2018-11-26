// pages/bargain/bargain.js

const util = require('../../utils/util.js');
const api = require('../../config/api.js');

var app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
  },

  onLoad: function(){
    var that = this;
    // 全民砍价
    util.request(api.IndexUrlHotGoods).then(function (res) {
      if (res.errno === 0) {
        var list = res.data.hotGoodsList.splice(1,4);
        that.setData({
          list: list,
        });
      }
    });
  }
 
})



