// pages/my/address/address.js
import event from '../../../utils/event';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shipaddress: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: app.globalData.httpsurl + 'addressdetails/',
      // data: { user_id: app.globalData.userid },
      data: {
        user_id: app.globalData.userid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
       wx.hideLoading();
       if(res.data.code == 200){
          that.setData({
            shipaddress:res.data.detail,
          })
       }
      },
      error: function (e) {

      }
    })
  },
  addAddress(){
    wx.navigateTo({
      url: '/pages/my/addAddress/addAddress',
    })
  },
  //购买时地址的选择
  chooseAddress: function (e) {
    var address = e.currentTarget.dataset.address;
    event.emit('waimaiaddress:changed', address);
    wx.navigateBack({
      delta: 1
    })

  },
  editAddress(e){
    console.log(e.currentTarget.dataset);
    var addressInfo = JSON.stringify(e.currentTarget.dataset.address);
    console.log(addressInfo);
    wx.navigateTo({
      url: '/pages/my/addAddress/addAddress?addressInfo='+addressInfo,
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