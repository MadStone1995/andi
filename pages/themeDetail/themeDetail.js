// pages/newsdetail/newsdetail.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allInfo: {},
    contentInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.article_id);
    wx.request({
      url: app.globalData.httpsurl + 'consultingdetails/',
      data: {
        // article_id: options.article_id,
        article_id:6,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        console.log(res.data);
        that.setData({
          allInfo: res.data.list,
        })
        // if (!app.isEmpty(res.data.list.richtext)) {
        //   var article = res.data.list.richtext
        //   WxParse.wxParse('article', 'html', article, that, 5);
        // }
      },
      error: function (e) {

      }
    })



  },
  getContent(e){
    var that =this;
    that.setData({
      contentInfo:e.detail.value,
    })
  },
  submitContent(){
    var that =this;
    wx.showToast({
      title:'评论提交中',
      icon:'none',
    })
    wx.request({
      url: app.globalData.httpsurl + 'handlecomment/',
      data: {
        article_id: options.article_id,
        user_id:app.globalData.user_id,
        type:1,
        content:that.data.contentInfo,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        wx.hideLoading();
        wx.showToast({
          title: res.data.error,
          icon:'none',
        })
      },
      error: function (e) {

      }
    })
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