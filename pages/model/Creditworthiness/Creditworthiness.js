const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseItem: 0,
    productList: [{ img: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640' }, { img: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640' }, { img: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640' }],
    scrollHeight:310,
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: false,
    itemNum:2,
    vertical:true,
    circular: true,
    circular2:false,
    interval: 5000,
    duration: 1000,
    page:1,
    limit:10,
    shopList:[],
    memberList:[],
    ershouList:[],
    themeList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getWinHeight();
  },
  getWinHeight(){
    var that = this;
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.select('.pageInfo').boundingClientRect(function (rect) {
      console.log(rect.height)
      that.data.scrollHeight = rect.height - 280;
      that.setData({
        scrollHeight: that.data.scrollHeight
      })
    }).exec();
    console.log(that.data.scrollHeight);
  },
  submitXq(){
    console.log("submitXq");
    var that = this;
    //0:店面，1人才，2闲置，3有话说
    wx.navigateTo({
      url: '/pages/richtext/richtext?releaseType='+that.data.chooseItem,
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
    that.getShopList();

  },
  //获取店面list
  getShopList() {
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'creditcommunity/',
      data: {
        type: 1,
        page:1,
        limit:10,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        that.setData({
          shopList: res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  //获取人才列表
  getMemberList(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'creditcommunity/',
      data: {
        type: 2,
        page: 1,
        limit: 10,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
       
        that.setData({
          memberList: res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  //获取闲置
  getErshouList(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'creditcommunity/',
      data: {
        type: 3,
        page: 1,
        limit: 10,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        that.setData({
          ershouList: res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  //有话说列表
  getThemeList(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'therearewords/',
      data: {
        page: 1,
        limit: 10,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        console.log(res.data);
        that.setData({
          themeList: res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  chooseType(e) {
    var that = this;
    if (e.target.dataset.type != that.data.chooseItem){
      that.setData({
        chooseItem: e.target.dataset.type
      })
      if(that.data.chooseItem == 0){
        that.getShopList();
      } else if (that.data.chooseItem == 1){
        that.getMemberList();
      } else if (that.data.chooseItem == 2) {
        that.getErshouList();
      } else if (that.data.chooseItem == 3) {
        that.getThemeList();
      }
    }
  },
  phonecallevent: function (e) {
    console.log(e.target.dataset.phone)
    let phone = String(e.target.dataset.phone)
    wx.makePhoneCall({
      phoneNumber: phone
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