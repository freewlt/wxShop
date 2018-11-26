// pages/home/home.js
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
    wx.request({
      // url: app.globalData.subDomain + '/shop/goods/list',
      url: api.IndexUrlBanner,
      success: function(res) {
        if(res.data.code == 0){
         that.list = res.data.data;
         var newList = that.list.splice(3,6);
         that.setData({
              list: newList,
          });
        }
      }
    })
  }
 
})



