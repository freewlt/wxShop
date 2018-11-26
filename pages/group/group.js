// pages/group/group.js
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
  getIndexData: function(){
    var that = this;
    // 全民砍价
    util.request(api.GoodsList).then(function (res) {
      if (res.errno === 0) {
        var list = res.data.goodsList;
        that.setData({
          list: list,
        });
      }
    });
  },
  
  onLoad: function(){
    this.getIndexData();
  }
 
})
