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
    chooseTitle: '选择版本  选择规格',
    openAttr: false,
    animationData: {},
    nameProduct: [
      {title:'商品介绍'},
      {title:'商品评价'}
    ],
    currentTab: 0,
    showView: false,
    goods: [],
    id: '',
    num: 1,
    minusStatus: 'disabled',
    isAdd: true,
    isStart: false,
    isBuy: false,
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
      if (res.errno === 0) {
        console.log()
          that.setData({
            relatedGoods: res.data.goodsList,
            goods: res.data.goodsList.splice(1,1),
          });
      }
    }),
    //本地存储数据
    wx.setStorage({
      key: 'isCollect',
      data: that.data.isCollectData
    })
  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
      currentTab: e.target.dataset.current
    })
    }
  },
  //是否收藏
  onCollectionTap:function () {
    var that = this;
    that.setData({
      isCollect: !this.data.isCollect
    })
    if(this.data.isCollect == false){
      wx.showToast({
        title: '加入收藏！',
        icon: 'success',
        duration: 2000
      })
    } else{
      wx.showToast({
        title: '取消收藏！',
        icon: 'fail',
        duration: 2000
      })
    }
  },
  startGrop: function (){
    var that = this;
    that.setData({
      isBuy: false,
      isStart: true,
      isAdd: false,
      showView: (!that.data.showView)
    })
  },
  buyNow: function(){
    var that = this;
    that.setData({
      isBuy: true,
      isStart: false,
      isAdd: false,
      showView: (!that.data.showView)
    });
  },
  buyResource: function (){
    var that = this;
    that.setData({
      isBuy: true,
      isStart: false,
      isAdd: false,
      showView: (!that.data.showView)
    })
  },

   // 弹窗显示隐藏
  choosespe: function () {
    var that = this;
    that.setData({
      isAdd: true,
      isStart: false,
      isBuy: false,
      showView: (!that.data.showView)
    })
  },
  //关闭弹窗
  closeShow: function() {
    console.log(34)
    var that = this;
    console.log(that.data.showView)
    that.setData({
      showView: (!that.data.showView)
    })
  },
  // 选择类型
  changeGroup: function(event){
     var id = event.currentTarget.dataset.id;
     this.setData({
        id: id
     });
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

  //立即购买
  buyNow: function () {
    wx.navigateTo({
      url: '../../pages/order/order?'
      })
  },
  // 加入购物车
  addCar: function (e) {
    var that = this;
    var goods = that.data.goods;
    var id = that.data.goods[0].id;
    goods.isSelect = false;
    var count = that.data.goods[0].num;
    var title = that.data.goods[0].name;
    if (title.length > 13) {
      goods.title = title.substring(0, 13) + '...';
    }
    var arr = wx.getStorageSync('cart') || [];
    if (arr.length > 0) {
      for (var i in arr) {
        if (arr[i].id == id) {
          arr[i].count = arr[i].count + 1;
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
        duration: 2000
      });
      that.setData({
        showView: (!that.data.showView)
      })
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
    that.getIndexData();
    wx.getStorage({
      key: 'isCollect',
      success: function(res) {
        that.setData({
          isCollect: res,
        })
      }
    })
    wx.clearStorage();
  }
 
})
