// pages/detail/detail.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

var app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    gallery: [],
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
    
    // 首页banner
    // util.request(api.GoodsDetail, { id: that.data.id }).then(function (res) {
    //   if (res.errno === 0) {
    //     console.log(res)
    //     console.log(res.data.gallery)
    //     that.setData({
    //       gallery: res.data.gallery,
    //     });
       
    //   }
    // });
    util.request(api.GoodsDetail, { id: that.data.id }).then(function (res) {
      console.log(res)
      if (res.errno === 0) {
        var list = res;
        that.setData({
          gallery: list,
        });
      }
    });
  },
  onLoad: function(options){
    console.log(options)
    this.setData({
      id: options.id
    })
    this.getIndexData();
    

 
    
  }
 
})
