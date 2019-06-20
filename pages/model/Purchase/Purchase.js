Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseItem: 0,
    productList: [{ img: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640' }, { img: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640' }, { img: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'}],
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

  },
  chooseType(e) {
    var that = this;
    that.setData({
      chooseItem: e.target.dataset.type
    })
  },
  phonecallevent: function (e) {
    console.log(e.target.dataset.phone)
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