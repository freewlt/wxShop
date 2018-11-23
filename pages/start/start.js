// pages/home/home.js
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
  onLoad: function(){
    wx.navigateTo({
           url:'/pages/logs/logs',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
          success:function(){
            console.log(3)
          }        //成功后的回调；
      })
    var that = this;
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
    // 商品模板
    wx.request({
      url: app.globalData.subDomain + '/shop/subshop/list',
      success: function(res) {
        if(res.data.code == 0){
         that.detail = res.data.data;
         var arrayDetail = that.detail;
         var newDetail = arrayDetail.splice(0,4)
         that.setData({
              detail: newDetail,
          });
        }
      }
    })
    // 全民砍价
    wx.request({
      url: app.globalData.subDomain + '/shop/goods/list',
      success: function(res) {
        if(res.data.code == 0){
         that.list = res.data.data;
         var newList = that.list.splice(3,6);
         var newSelection = that.list.splice(0,3);
         that.setData({
              list: newList,
              selection: newSelection,
          });
        }
      }
    })
    // 人气推荐
    wx.request({
      url: app.globalData.subDomain + '/shop/goods/list',
      success: function(res) {
        if(res.data.code == 0){
         that.list = res.data.data;
         var newMoods = that.list.splice(1,4)
         that.setData({
              moods: newMoods,
          });
        }
      }
    })
  }
 
})



