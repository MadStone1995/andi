const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "/images/oddata-banner.png",
    ],
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    showlogin:false,
    userName:'',
    userPassword:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  preventTouchMove(){

  },
  loginBox(){
    var that = this;
    that.setData({
      showlogin: !that.data.showlogin,
    })
  },
  getUserName(e){
    var that = this;
    that.data.userName = e.detail.value;
    that.setData({
      userName: e.detail.value,
    })
  },
  getPassword(e){
    var that = this;
    that.data.userPassword = e.detail.value;
    that.setData({
      userPassword: e.detail.value,
    })
  },
  tologin(){
    var that = this;
    if (app.isEmpty(that.data.userName) || app.isEmpty(that.data.userPassword)){
      wx.showToast({
        title: '请填写登录信息',
        icon:'none'
      })
    }else{
      console.log(that.data.userName);
      console.log(that.data.userPassword);
      wx.showLoading({
        title: '登录中',
      })
      wx.request({
        url: app.globalData.httpsurl2 + 'constructions/login/',
        data: {
          phone: that.data.userName,
          password: that.data.userPassword,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          wx.hideLoading();
          if(res.data.code == 200){
            app.globalData.userName = that.data.userName;
            app.globalData.password = that.data.userPassword;
            wx.navigateTo({
              url: '/pages/oddata/companydata/companydata',
            })
          }else{
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
    that.data.userName = app.globalData.userName;
    that.data.userPassword = app.globalData.password;
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