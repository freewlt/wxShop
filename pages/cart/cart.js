// pages/cart/cart.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  data: {    
    carts: [], //数据 
    iscart: false,    
    hidden: null,    
    isAllSelect: false,    
    totalMoney: 0,
  },

onShow: function () {    
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）  
  
    //var arr = wx.getStorageSync('cart') || [];    
    console.info("缓存数据："+arr);    // 有数据的话，就遍历数据，计算总金额 和 总数量  
    if (arr.length > 0) {      
        // 更新数据  
      this.setData({        
        carts: arr,        
        iscart: true,        
        hidden: false
      });      
        console.info("缓存数据：" + this.data.carts);
    }else{     
        this.setData({        
            iscart: false,        
            hidden: true,
      });
    }
  },
})
