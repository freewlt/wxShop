// pages/home/home.js
var app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },
  onLoad: function(){
    
    var that = this;
    // 全民砍价
    wx.request({
      url: app.globalData.subDomain + '/shop/goods/list',
      success: function(res) {
        if(res.data.code == 0){
         that.list = res.data.data;
         var arrayList = that.list;
         var newList = arrayList.splice(3,6)
         console.log(newSelection)
         that.setData({
              list: newList,
          });
        }
      }
    })
  }
 
})



