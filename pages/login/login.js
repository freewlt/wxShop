//login.js

//获取应用实例
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    motto: '获取登录授权',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  getIndexData: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('userInfo',  res.userInfo);
        wx.setStorageSync('token', res.token);
        wx.setStorageSync('userId',  res.userId);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  register:function(e){
    let that = this;
    wx.login({
      success:function(res){
        console.log(res)
        //存储用户信息
        
        if(app.globalData.userInfo){
          wx.switchTab({
            "url": '/pages/index/index'
          })
        }
        // if(res.code){
        //   util.request(api.AuthLoginByWeixin).then((res)=>{
        //     console.log(res)
        //   })
        // }
      }
    })
  },
  onLoad: function () {
    this.getIndexData();
  },
})
