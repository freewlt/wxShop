// pages/address/address.js
var address = require('../../utils/city.js')
var util = require('../../utils/util');
const api = require('../../config/api.js');

Page({
  data:{
    add_serName:'',
    add_telNumber: '',
    add_detailInfo: '',
    add_postalCode: '',
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    areaInfo:'',
    disabled: false,
    error: '',
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
    var id = address.provinces[0].id;
    that.setData({
      addressMenuIsShow: true,
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
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
    let userName = that.data.add_serName;
    let phone = that.data.add_telNumber;
    let areaInfo = that.data.areaInfo;
    let detail = that.data.add_detailInfo;

    var values = e.detail.value;
    values.areaInfo = that.data.areaInfo;

    // 表单验证
    if (!that.validation(values)) {
      wx.showToast({
        title: that.data.error,
        image: '/images/fail.png',
        duration: 2000
      })
      return false;
    }
    util.request(api.IndexUrlHotGoods,{phone: phone,userName:userName,detail:detail,areaInfo:areaInfo,addBtn:false}).then(function (res) {
      var address = areaInfo + detail
      wx.navigateTo({
        url:'../order/order?phone='+ phone + '&&userName=' + userName + '&&address=' + address + '&&addBtn=false'
      })
    });
  },  


   /**
   * 表单验证
   */
  validation: function (values) {
    if (values.add_serName === '') {
      this.data.error = '收件人不能为空';
      return false;
    }
    if (values.phone.length < 1) {
      this.data.error = '手机号不能为空';
      return false;
    }
    // if (values.phone.length !== 11) {
    //   this.data.error = '手机号长度有误';
    //   return false;
    // }
    // let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    // if (!reg.test(values.phone)) {
    //   this.data.error = '手机号不符合要求';
    //   return false;
    // }
    if (!this.data.areaInfo) {
      this.data.error = '省市区不能空';
      return false;
    }
    if (values.detail === '') {
      this.data.error = '详细地址不能为空';
      return false;
    }
    return true;
  },


  onLoad: function(e){
    var id = address.provinces[0].id;
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
  }
})
