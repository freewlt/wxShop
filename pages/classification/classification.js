// pages/classification/classification.js

const util = require('../../utils/util.js')
const api = require('../../config/api.js');
Page({
  data:{
    listAll:[],
    listFam:[],
    listPar:[],
    listNew:[],
    currentData : 0,
  },
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{
      that.setData({
        currentData: e.target.dataset.current
      })
      if(that.data.currentData == 0){
        util.request(api.GoodsList,{id:that.data.currentData}).then((res)=>{
          that.setData({
            listAll:res.data.goodsList
          })
        })
      } else if(that.data.currentData == 1){
        util.request(api.IndexUrlNewGoods,{id:that.data.currentData}).then((res)=>{
          this.setData({
            listFam:res.data.newGoodsList
          })
        })
      } else if(that.data.currentData == 2){
        util.request(api.IndexUrlHotGoods,{id:that.data.currentData}).then((res)=>{
          that.setData({
            listPar:res.data.hotGoodsList
          })
        })
      } else if(that.data.currentData == 3){
        util.request(api.GoodsList,{id:that.data.currentData}).then((res)=>{
          this.setData({
            listNew:res.data.goodsList
          })
        })
      } 
    }
  },
  //跳转商品清单
  typeBtn:function(){
    wx.navigateTo({
      url:'../typeShop/typeShop' 
    })
  },
  onLoad:function(){
    const that = this;
    if(that.data.currentData == 0){
      util.request(api.GoodsList,{id:that.data.currentData}).then((res)=>{
        console.log(res.data.goodsList)
        this.setData({
          listAll:res.data.goodsList
        })
      })
    }
  }
})