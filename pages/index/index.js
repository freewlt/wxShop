// pages/index/index.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

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
    topics: [],
    hotGoods: [],
    brand: [],
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
    let  that = this;
    // 首页banner
    util.request(api.IndexUrlBanner).then(function (res) {
      if (res.errno === 0) {
        var banner = res.data.banner;
        that.setData({
          banner: banner,
        });
      }
    });
    // 模板购买
    util.request(api.IndexUrlBrand).then(function (res) {
      if (res.errno === 0) {
        var brand = res.data.brandList;
        that.setData({
          brand: brand,
        });
      }
    });
    // 专题精选banner
    util.request(api.IndexUrlTopic).then(function (res) {
      if (res.errno === 0) {
        var topics = res.data.topicList;
        that.setData({
          topics: topics,
        });
      }
    });
    // 人气推荐全民砍价
    util.request(api.IndexUrlHotGoods).then(function (res) {
      if (res.errno === 0) {
        var hotGood = res.data.hotGoodsList;
        var hotGoods = hotGood.splice(1,4);
        var list = res.data.hotGoodsList.splice(1,4);
        that.setData({
          hotGoods: hotGoods,
          list: list,
        });
      }
    });
  },
  onLoad: function(){
    this.getIndexData();
  }
 
})



