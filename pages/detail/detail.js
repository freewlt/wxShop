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
            goods: res.data.goodsList.splice(1,1),
          });
      }
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
    
  // onCollectionTap: function (event) {　　　　// 定义onCollectionTap事件用来确定文章是否收藏，如果没收藏就能点亮星星进行收藏
  //           var postsCollected = wx.getStorageSync('posts_collected');   //获取缓存的方法
  //           var postCollected = postsCollected[this.data.currentPostId];   //确定当前文章是否有缓存的状态，传递参数方法、借助其他参数来传递变量，如上的data
  //            postCollected = !postCollected;// 取反操作，收藏变成未收藏、未收藏变为收藏
  //           postsCollected[this.data.currentPostId] = postCollected;//整体缓存的某一篇文章的缓存值等于postCollected从而更新一个变量
  //          wx.setStorageSync('posts_collected', postsCollected);//更新文章是否收藏的缓存值,相当于在数据库中做了一次更新。
  //           //更新Data的数据绑定变量,从而实现图片切换
  //            this.setData({
  //               collected: postCollected //当前的collected为postCollected
  //           })
  //       },
   // 弹窗显示隐藏
  choosespe: function () {
    var that = this;
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
    this.getIndexData();
    
  //   var postId = option.id;//要先在对应的数据文本中对每个栏目定义postId、比如postId: 0 postId:1
  //        this.id = postId; //借助顶部data作为中转，拿到上面这行postid后，将它放到下面var postCollected = postsCollected[]中
  //            //将这个postId从onLoad中传递到下面的onCollectionTap中
  //           var postData = postsData.postList[postId];//定义每个新闻列表对应顺序是哪个新闻内容
   
  //  //用户收藏功能
  //        var postsCollected = wx.getStorageSync('posts_collected') //从缓存中读取所有的缓存状态
  //           if (postsCollected) {   //postsCollected为真的情况，在缓存中存在
  //               var postCollected = postsCollected[postId]//读取其中一个缓存状态
  //               this.setData({
  //                   collected: postCollected //将是否被收藏的状态上绑定到collected这个变量上
  //               })
  //          }
  //           else {       //为假的情况，缓存中为空的情况
  //              var postsCollected = { }; //对postsCollected进行一个赋值操作，从而防止为空，从而省掉后面对它是否为空进行测试的步骤
  //              postsCollected[postId] = false; // 让当前的这篇文章状态为false，从而收藏星星不点亮
  //               wx.setStorageSync('posts_collected', postsCollected);//将postsCollected对象放到缓存中
  //           }

  }
 
})
