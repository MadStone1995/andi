// pages/model/menuList/menuList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsName:'',
    menuList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.goodsName);
    if (!app.isEmpty(options.goodsName)){
      that.setData({
        goodsName: options.goodsName
      })
    }
    that.getMenuList();
  },
  toDetail(e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/model/menuDetail/menuDetail?hotvideo_id=' + id,
    })
  },
  inputGoodName(e){
    var that = this;
    that.setData({
      goodsName:e.detail.value,
    })
  },
  getMenuList() {
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'wx/hotvideoshows/',
      data: {
        page: 1,
        limit: 10,
        goods: that.data.goodsName,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          that.setData({
            menuList: res.data.list,
          })
          console.log(that.data.menuList);
        } else {
          wx.showToast({
            title: res.data.error,
            icon: 'none'
          })
        }
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

  }
})