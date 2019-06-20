// pages/odinvestment/odinvestment.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "https://xcx.od888.cn/static/fixed/images/sjnb-banner.png",
    ],
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    chooseItem:0,
    sqStatus:-2,
    heightInfo:250,
    yyList:[],
    ddList:[],
    spList:[],
    page:1,
    loading:false,
    canLoad:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getHeight();
    that.getYyList();
  },
  toAuthorization(e) {
    var that = this;
    //商家内地数据跳转
    var item = 5;
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  },
  getHeight() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          heightInfo: res.windowHeight - 400,
        })
        console.log(that.data.heightInfo);
      },
    })
  },
  getYyList(){
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/platformoperation/',
      data: {user_id:app.globalData.userid,page:1,limit:10},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.list);
        that.setData({
          yyList:res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  getddList(){
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/platformorder/',
      data: { user_id: app.globalData.userid, page: 1, limit: 10 },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.list);
        that.setData({
          ddList: res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  getSpList() {
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/salessituation/',
      data: { user_id: app.globalData.userid, page: 1, limit: 10 },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.list);
        that.setData({
          spList: res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  loadMoreYy(){
    var that = this;
    if (that.data.canLoad) {
      that.setData({
        canLoad: false,
        loading: true,
      })
      that.data.page = that.data.page + 1;
      wx.request({
        url: app.globalData.httpsurl2 + 'constructions/platformoperation/',
        data: { page: that.data.page, limit: 10, user_id: app.globalData.userid},
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          var newList = that.data.yyList;
          newList.push.apply(newList, res.data.list);
          that.setData({
            loading: false,
            yyList: newList,
            page: that.data.page,
            canLoad: true,
          })
          if(newList.length == res.data.max){
            wx.showToast({
              title: '没有更多数据了',
              icon:'none',
              duration:1500
            })
          }
        },
        error: function (e) {

        }
      })
    }
  },
  loadMoreDd(){
    var that = this;
    if (that.data.canLoad) {
      that.setData({
        canLoad: false,
        loading: true,
      })
      that.data.page = that.data.page + 1;
      wx.request({
        url: app.globalData.httpsurl2 + 'constructions/platformorder/',
        data: { page: that.data.page, limit: 10, user_id: app.globalData.userid },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          var newList = that.data.ddList;
          newList.push.apply(newList, res.data.list);
          that.setData({
            loading: false,
            ddList: newList,
            page: that.data.page,
            canLoad: true,
          })
          if (newList.length == res.data.max) {
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
              duration: 1500
            })
          }
        },
        error: function (e) {

        }
      })
    }
  },
  loadMoreSp(){
    var that = this;
    if (that.data.canLoad) {
      that.setData({
        canLoad: false,
        loading: true,
      })
      that.data.page = that.data.page + 1;
      wx.request({
        url: app.globalData.httpsurl2 + 'constructions/salessituation/',
        data: { page: that.data.page, limit: 10, user_id: app.globalData.userid },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          var newList = that.data.spList;
          newList.push.apply(newList, res.data.list);
          that.setData({
            loading: false,
            spList: newList,
            page: that.data.page,
            canLoad: true,
          })
          if (newList.length == res.data.max) {
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
              duration: 1500
            })
          }
        },
        error: function (e) {

        }
      })
    }
  },
  chooseType(e){
    console.log(e.currentTarget.dataset.type);
    var that = this;
    that.setData({
      chooseItem: e.currentTarget.dataset.type,
      page:1,
    })
    if(that.data.chooseItem == 0){
      that.getYyList();
    }else if(that.data.chooseItem == 1){
      that.getddList();
    }else{
      that.getSpList();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    console.log("分享者ID：" + app.globalData.userid)
    return {
      title: 'od商吧-餐饮人的社区',
      path: '/pages/index/index?userId=' + app.globalData.userid,
      success: res => {

      },
      fail: () => {
        console.log('--- 转发失败 ---');
      }
    }
  },
})