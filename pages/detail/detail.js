// pages/detail/detail.js
var app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    pic: [],
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
  onLoad: function(options){
    var that = this;
    console.log(options.timeStamp);
    this.setData({
      timeStamp: options.timeStamp
    })
    // banner图片
    wx.request({
      url: app.globalData.subDomain + '/shop/goods/category/all',
      success: function(res) {
        if(res.data.code == 0){
         that.pic = res.data.data;
         that.setData({
            pic: that.pic,
         });
        }
      }
    })
    
  }
 
})
