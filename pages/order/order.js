// pages/order/order.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    list: [],
    price: 976800,
    addBtn:true,
    userName:'',
    phone:'',
    address:'',
    addressList:{}
  },
  getIndexData: function(){
    var that = this;
    // 人气推荐全民砍价
    util.request(api.IndexUrlHotGoods).then(function (res) {
      if (res.errno === 0) {
        var list = res.data.hotGoodsList.splice(1,1);
        that.setData({
          list: list,
        });
      }
    });
  },
  addAddress: function(){
    wx.navigateTo({
      url:'../../pages/address/address'
    })
  },
  startGrop(){
    var phone = this.data.phone;
    var userName = this.data.userName;
    var address = this.data.address;
    var totalMoney = this.data.price;
    if(!this.data.addBtn){
      util.request(api.IndexUrlHotGoods,{totalMoney: totalMoney,phone: phone,userName:userName,address:address}).then(function(){
        wx.navigateTo({
          url:'../pay/pay?phone='+ phone + '&&userName=' + userName + '&&address=' + address + '&&totalMoney=' + totalMoney
        })
      })
    }else{
      wx.showToast({
        title: '请选择收货地址',
        image: '../../images/fail.png',
        duration: 2000
      });
    }
  },
  onLoad: function(options){
    this.getIndexData(); 
    this.data.addressList = options;
  },
  onShow:function(){
    if(this.data.addressList.addBtn){
      this.setData({
        addBtn:false,
        userName:this.data.addressList.userName,
        phone:this.data.addressList.phone,
        address:this.data.addressList.address
      })
    }  
  }
})
