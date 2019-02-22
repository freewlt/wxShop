// pages/goCart/goCart.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  data:{
    hotGoods: [],
    isHas:true,
    cartList:{}
  },
  herfBtn:function(){
    wx.navigateTo({
      url:'../detail/detail'
    }) 
  },
  getCartData:function(){
    const that = this;
    // 人气推荐全民砍价
    util.request(api.IndexUrlHotGoods).then(function (res) {
      if (res.errno === 0) {
        var hotGoods = res.data.hotGoodsList;
        console.log(hotGoods)
        that.setData({
          hotGoods: hotGoods,
        });
      }
    });
  },
  getData:function(){
    const that = this;
    const cart = wx.getStorageSync('cart')
    if(cart.length>0){
      wx.getStorage({
        key:'cart',
        success:function(res){
          console.log(res.data);
          that.setData({
            cartList:res.data[0],
            isHas:false
          })
        }
      })
    }else{
      this.setData({
        isHas:true
      })
    }
  },
  onLoad:function(){
    this.getCartData();
  },
  onShow:function(){
    this.getData()
  } 
})
