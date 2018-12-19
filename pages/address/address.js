// pages/address/address.js
var address = require('../../utils/city.js')
var util = require('../../utils/util');
const api = require('../../config/api.js');

Page({
  data:{
    add_serName: '',
    add_telNumber: '',
    add_detailInfo: '',
    add_postalCode: '',
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    areaInfo:''

  },
  chooseAddress:function(){
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          that.setData({
            "add_serName": res.userName,
            "add_telNumber": res.telNumber,
            "provinces": res.provinceName,
            "citys": res.cityName,
            "areas": res.countyName,
            "add_detailInfo": res.detailInfo,
            "add_postalCode": res.postalCode,
            //具体收货地址显示
            flag:false,
            "areaInfo": res.provinceName + res.cityName + res.countyName
          })
        },
        fail: function (err) {
          wx.showToast({
            title: '授权失败，您将无法进行下单支付;重新授权请删除小程序后再次进入',
            icon: 'fail',
            duration: 1000
          })
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this;
    that.setData({
      addressMenuIsShow: true,
    })
  },

  // 点击地区选择取消按钮
  cityCancel: function (e) {
    var that = this;
    that.setData({
      addressMenuIsShow: false,
    })
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this;
    var city = that.data.city;
    var value = that.data.value;
    that.setData({
      addressMenuIsShow: false,
    })
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name
    that.setData({
      areaInfo: areaInfo,
    })
  },
  // 点击蒙版时取消组件的显示
  hideCitySelected: function (e) {
    var that = this;
    that.setData({
      addressMenuIsShow: false,
    })
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var that = this;
    var value = e.detail.value;
    var provinces = that.data.provinces;
    var citys = that.data.citys;
    var areas = that.data.areas;
    var provinceNum = value[0];
    var cityNum = value[1];
    var countyNum = value[2];
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (that.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      that.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      var id = citys[cityNum].id;
      that.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      // 滑动选择了区
      that.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },
  formSubmit: function(e) { 
    var that = this;
    let address = that.data;
    var phone = address.add_telNumber;
    console.log(address) 
    // if (address.add_serName == '' && address.add_telNumber == '' && address.areaInfo == '' && address.add_detailInfo =='') {
    //   console.log(address)
    //   wx.showToast({
    //     title: '请输入完整信息！',
    //     icon: 'none',
    //     image:"/images/fail.png",
    //     duration: 1000
    //   })
    //   return false;
    // }else{
    //   wx.navigateTo({
    //     url:'../../pages/order/order'
    //   })
    // }
    // console.log(phone)
    // if((/^1[34578]\d{9}$/.test(phone)) && phone.length < 11){
    //   wx.navigateTo({
    //     url:'../../pages/order/order'
    //   })
    // }else{
    //   wx.showToast({
    //     title: '手机号有误！',
    //     icon: 'none',
    //     image:"/images/fail.png",
    //     duration: 1000
    //   })
    // }
  },  
  onLoad: function(){
    var id = address.provinces[0].id;
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
  }
})