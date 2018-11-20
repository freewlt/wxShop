// pages/home/home.js
var app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    // //图片地址
    pic: [
      '/images/index/happy/01.png',
      '/images/index/happy/02.png',
      '/images/index/happy/03.png',
      '/images/index/happy/04.png'
    ],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    current: 0,
    nav:[
      {txt:'签到', icon:"/images/index/icon/star.png"},
      {txt:'礼券', icon:"/images/index/icon/gift.png"},
      {txt:'砍价', icon:"/images/index/icon/bargain.png"},
      {txt:'专栏', icon:"/images/index/icon/column.png"}
    ] 
  },

  swiperchange: function(e){
    this.setData({
      current: e.detail.current
    })
  }
 
})



