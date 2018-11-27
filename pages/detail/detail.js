// pages/detail/detail.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

var app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    relatedGoods: [],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    current: 0,
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
    let that = this;
    
    // 列表详情
    util.request(api.GoodsRelated, { id: that.data.id }).then(function (res) {
      console.log(res.data)
      if (res.errno === 0) {
        that.setData({
          relatedGoods: res.data.goodsList,
        });
      }
    });
    
  },
  onLoad: function(options){
    this.setData({
      id: parseInt(options.id)
    })
    this.getIndexData();
    

 
    
  }
 
})
