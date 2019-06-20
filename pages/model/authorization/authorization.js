// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mtInfo: {
    },
    elmInfo: {
    },
    dpType:'',
    sqState:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.item);
    ////商家内地数据跳转
    var that =this;
    that.setData({
      dpType:options.item,
    })
    that.getIndexInfo();
  },
  getIndexInfo(){
    var that = this;
    if (that.data.dpType == 0) {
      var platform = "eleme";
    } else if (that.data.dpType == 1) {
      var platform = "meituan";
    }
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/storeauditshow/',
      data: { user_id: app.globalData.userid, platform: platform },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          sqState:res.data.state
        })
        if (that.data.dpType == 0 && !app.isEmpty(res.data.list)){
          that.data.elmInfo = res.data.list;
          that.setData({
            elmInfo: that.data.elmInfo,
          })
          console.log(that.data.elmInfo);
        } else if (that.data.dpType == 1 && !app.isEmpty(res.data.list)){
          that.data.mtInfo = res.data.list;
          that.setData({
            mtInfo: that.data.mtInfo,
          })
        }
      },
      error: function (e) {

      }
    })
  },
  bindingMt() {
    var that = this;
    console.log(that.data.mtInfo);
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/bindingbusinessadd/',
      data: { user_id: app.globalData.userid, platform: 'meitaun', platform_username: that.data.mtInfo.platform_username, platform_password: that.data.mtInfo.platform_password, phone_number: that.data.mtInfo.phone_number },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 100) {

        }
      },
      error: function (e) {

      }
    })
  },
  bindingElm() {
    var that = this;
    console.log(that.data.elmInfo);
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/bindingbusinessadd/',
      data: { user_id: app.globalData.userid, platform: 'eleme', platform_username: that.data.elmInfo.platform_username, platform_password: that.data.elmInfo.platform_password, phone_number: that.data.elmInfo.phone_number },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 100) {

        }
      },
      error: function (e) {

      }
    })
  },
  inputName(e) {
    var that = this;
    that.data.mtInfo.platform_username = e.detail.value;
    that.setData({
      mtInfo: that.data.mtInfo,
    })
  },
  inputPsd(e) {
    var that = this;
    that.data.mtInfo.platform_password = e.detail.value;
    that.setData({
      mtInfo: that.data.mtInfo,
    })
  },
  inputPhone(e) {
    var that = this;
    that.data.mtInfo.phone_number = e.detail.value;
    that.setData({
      mtInfo: that.data.mtInfo,
    })
  },
  inputName2(e) {
    var that = this;
    that.data.elmInfo.platform_username = e.detail.value;
    that.setData({
      elmInfo: that.data.elmInfo,
    })
  },
  inputPsd2(e) {
    var that = this;
    that.data.elmInfo.platform_password = e.detail.value;
    that.setData({
      elmInfo: that.data.elmInfo,
    })
  },
  inputPhone2(e) {
    var that = this;
    that.data.elmInfo.phone_number = e.detail.value;
    that.setData({
      elmInfo: that.data.elmInfo,
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
  getMtList() {

  },
  getElmList() {

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