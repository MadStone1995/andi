const app = getApp()
Page({
  data: {
    avatarUrl: '',
    nickName: '',
    vip: false,
    money: 0,
    userInfo:{},
  },
  isvip() {
    return http.get(`/front/my/?open_id=${wx.getStorageSync('openid')}`).then(res => {
      this.setData({
        vip: res.data.situation,
        money: res.data.money || 0,
      })
    })
  },

  onLoad: function(options) {
    var that = this;
    
  },
  init(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'getuser/',
      data: {user_id: app.globalData.userid},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        console.log(res);
        if(res.data.code == 200){
          that.setData({
            userInfo:res.data.list
          })
        }
      },
      error: function (e) {

      }
    })
  },
  tomyCoupons() {
    wx.navigateTo({
      // url: '../myCoupons/myCoupons',
    })
  },
  toqiandao(){
    wx.navigateTo({
      url: '/pages/my/qiandao/qiandao',
    })
  },
  torelease(){
    wx.navigateTo({
      url: '/pages/my/release/release',
    })
  },
  tocollections(){
    wx.navigateTo({
      url: '/pages/my/collections/collections',
    })
  },
  towzjf(){
    wx.navigateTo({
      url: '/pages/my/wzjf/wzjf',
    })
  },
  toabout(){
    wx.navigateTo({
      url: '/pages/my/about/about',
    })
  },
  tosjrz(){
    wx.navigateTo({
      url: '/pages/my/sjrz/sjrz',
    })
  },
  tohelp(){
    wx.navigateTo({
      url: '/pages/my/helpcenter/helpcenter',
    })
  },
  tomyyue(){
    wx.navigateTo({
      url: '/pages/my/myyue/myyue',
    })
  },
  tomyintegral(){
    wx.navigateTo({
      url: '/pages/my/myintegral/myintegral',
    })
  },
  toGroup() {
    wx.navigateTo({
      // url: '../group/group',
    })
  },
  toAddress(){
    wx.navigateTo({
      url: '/pages/my/address/address',
    })
  },
  toregister(){
    wx.navigateTo({
      url: '/pages/my/register/register',
    })
  },
  tomall(){
    wx.navigateTo({
      url: '/pages/my/mall/mall',
    })
  },
  toOrder() {
    wx.navigateTo({
      // url: '../order/order',
    })
  },
  addmoney() {
    wx.navigateTo({
      // url: '../recharge/recharge',
    })
  },
  openvip() {
    wx.navigateTo({
      // url: '../openvip/openvip',
    })
  },
  onReady: function() {

  },

  onShow: function() {
    // this.isvip();
    var that = this;
    that.init();
  },

  onHide: function() {

  },

  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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