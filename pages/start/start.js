// pages/home/home.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
// 获取应用实例
var app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    banner: [],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    current: 0,
    nav:[
      {txt:'签到', icon:"/images/index/icon/star.png"},
      {txt:'礼券', icon:"/images/index/icon/gift.png"},
      {txt:'砍价', icon:"/images/index/icon/bargain.png"},
      {txt:'专栏', icon:"/images/index/icon/column.png"}
    ],
    detail: [],
    list: [],
    selection: [],
    moods: [],
  },

  swiperchange: function(e){
    this.setData({
      current: e.detail.current
    })
  },
  onPullDownRefresh(){
    // 增加下拉刷新数据的功能
    var self = this;
    this.getIndexData();
  },
  getIndexData: function () {
    util.request(api.IndexUrlBanner).then(function (res) {

      if (res.errno === 0) {
        data.banner = res.data.banner
      that.setData(data);
      }
    });
  },
  onLoad: function(){
    var that = this;
    // wx.request({
    //   url: app.globalData.subDomain + '/index/newGoods',
    //   success: function(res) {
    //     console.log('pic',res.data.data)
    //     if(res.data.code == 0){
    //      that.pic = res.data.data;
    //      that.setData({
    //         pic: that.pic,
    //      });
    //     }
    //   }
    // })
    // banner图片
    // wx.request({
    //   url: app.globalData.subDomain + '/shop/goods/category/all',
    //   success: function(res) {
    //     if(res.data.code == 0){
    //      that.pic = res.data.data;
    //      that.setData({
    //         pic: that.pic,
    //      });
    //     }
    //   }
    // })
    // // 商品模板
    // wx.request({
    //   url: app.globalData.subDomain + '/shop/subshop/list',
    //   success: function(res) {
    //     if(res.data.code == 0){
    //      that.detail = res.data.data;
    //      var arrayDetail = that.detail;
    //      var newDetail = arrayDetail.splice(0,4)
    //      that.setData({
    //           detail: newDetail,
    //       });
    //     }
    //   }
    // })
    // // 全民砍价
    // wx.request({
    //   url: app.globalData.subDomain + '/shop/goods/list',
    //   success: function(res) {
    //     if(res.data.code == 0){
    //      that.list = res.data.data;
    //      var newList = that.list.splice(3,6);
    //      var newSelection = that.list.splice(0,3);
    //      that.setData({
    //           list: newList,
    //           selection: newSelection,
    //       });
    //     }
    //   }
    // })
    // // 人气推荐
    // wx.request({
    //   url: app.globalData.subDomain + '/shop/goods/list',
    //   success: function(res) {
    //     if(res.data.code == 0){
    //      that.list = res.data.data;
    //      var newMoods = that.list.splice(1,4)
    //      that.setData({
    //           moods: newMoods,
    //       });
    //     }
    //   }
    // })
  }
 
})



