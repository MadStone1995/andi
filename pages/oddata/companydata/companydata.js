const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseItem: 0,
    choosePlat:0,
    chooseJm:0,
    chooseCg:0,
    takeawayData:'',
    // productList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    var that = this;
    that.getTakeawayData();
  },
  chooseType(e) {
    var that = this;
    that.setData({
      chooseItem: e.target.dataset.type
    })
  },
  choosePlat(e) {
    var that = this;
    that.setData({
      choosePlat: e.target.dataset.type
    })
  },
  chooseJm(e) {
    var that = this;
    that.setData({
      chooseJm: e.target.dataset.type
    })
  },
  chooseCg(e) {
    var that = this;
    that.setData({
      chooseJm: e.target.dataset.type
    })
  },
  //获取外卖数据
  getTakeawayData(){
    var that = this;
    if (app.isEmpty(app.globalData.userName) || app.isEmpty(app.globalData.password)){
      wx.showToast({
        title: "获取信息出错，请重新登录",
        icon: 'none'
      })
    }else{
      wx.showLoading({
        title: '数据请求中',
      })
        wx.request({
          url: app.globalData.httpsurl2 + 'constructions/delivery/',
          data: {
            phone: app.globalData.userName,
            password: app.globalData.password,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            wx.hideLoading();
            if (res.data.code == 200) {
             that.setData({
               takeawayData:res.data.list,
             })
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
    }
  },
  phonecallevent: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone
    })
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