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
    flowStep:[
      {picStep:'/images/flow/01.png', txtStep:'支付开团或参团'},
      {picStep:'/images/flow/02.png', txtStep:'邀请好友一起拼团'},
      {picStep:'/images/flow/03.png', txtStep:'达到人数分别发货'},
      {picStep:'/images/flow/04.png', txtStep:'人数不够自动退款'}
    ],
    chooseTitle:'选择版本  选择规格',
    animationData:{},
    showView: false,
    goods: [],
    num: 1,
    minusStatus: 'disabled'
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
      var relatedGood = res.data.goodsList;
      console.log(relatedGood)
      if (res.errno === 0) {
          that.setData({
            relatedGoods: res.data.goodsList,
            goods: res.data.goodsList.splice(1,1)
          });
      }
    });
 
  },

   // 弹窗显示隐藏
  choosespe: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  //点击减号
  bindMinus: function () {
    var that = this;
    var num = that.data.num;
    if (num > 1) {
      num --;
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    that.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  //点击加号
  bindPlus: function(){
    var that = this;
    var num = that.data.num;
    num ++;
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    that.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  // 加入购物车
  addCar: function (e) {
    var that = this;
    var goods = that.data.goods;
    console.log(goods)
    goods.isSelect = false;
    var count = that.data.goods.num;
    console.log(count)
    var title = that.data.goods.title;
    // if (title.length > 13) {
    //   goods.title = title.substring(0, 13) + '...';
    // }
    var arr = wx.getStorageSync('cart') || [];
    console.log("arr,{}",arr);
    if (arr.length > 0) {
      for (var i in arr) {
        if (arr[i].goodsId == goodsId) {
          arr[i].count = arr[i].count + 1;
          try {
            wx.setStorageSync('cart', arr)
          } catch (e) {
            console.log(e)
          }
          wx.showToast ({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          })
          this.closeDialog();
          reutrn;
        }
      }
      arr.push(goods);
    } else {
      arr.push(goods);
    }
    try {
      wx.setStorageSync('cart', arr)
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration:2000
      });
      this.closeDialog();
      return
    } catch(e){
      console.log(e)
      
    }
  },

  onLoad: function(options){
    var that = this;
    that.setData({
      id: options.id
    })
    this.getIndexData();
  }
 
})
