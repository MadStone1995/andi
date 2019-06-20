// pages/model/Lovelearning/Lovelearning.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://xcx.od888.cn/static/fixed/images/food-banner.png',
      'https://xcx.od888.cn/static/fixed/images/food-banner.png',
      'https://xcx.od888.cn/static/fixed/images/food-banner.png',
    ],
    scrollHeight:300,
    xindex: 0,
    chooseItem: 0,
    menuList:[],
    goodsName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    that.getWinHeight();
  },
  inputGoodName(e){
    var that = this;
    that.setData({
      goodsName:e.detail.value,
    })
  },
  searchGoods(){
    var name = this.data.goodsName;
    wx.navigateTo({
      url: '../menuList/menuList?goodsName=' + name,
    })
  },
  torichMenu() {
    var that = this;
    wx.navigateTo({
      url: '/pages/richMenu/richMenu',
    })
  },
  toDetail(e){
    var that =this;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/model/menuDetail/menuDetail?hotvideo_id='+id,
    })
  },
  getWinHeight() {
    var that = this;
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.select('.pageInfo').boundingClientRect(function (rect) {
      that.data.scrollHeight = rect.height - 370;
      that.setData({
        scrollHeight: that.data.scrollHeight
      })
    }).exec();
  },
  chooseType(e) {
    var that = this;
    that.setData({
      chooseItem: e.target.dataset.type
    })
  },
  swiperChange(e) {
    this.setData({
      xindex: e.detail.current
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
    var that = this;
    that.getMenuList();
  },
  getMenuList(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl2 + 'wx/hotvideoshows/',
      data: {
        page:1,
        limit:10,
        goods:'',
        type:1,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if(res.data.code == 200){
          that.setData({
            menuList: res.data.list,
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