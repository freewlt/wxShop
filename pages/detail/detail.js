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
    animationData:{}
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
          that.setData({
            relatedGoods: res.data.goodsList
          });
      }
    });
  },
  choosespe: function(){
    
  },
  onLoad: function(options){
    this.setData({
      id: options.id
    })
    this.getIndexData();
  }
 
})
