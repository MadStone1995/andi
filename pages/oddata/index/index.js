// pages/odinvestment/odinvestment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "https://xcx.od888.cn/static/fixed/images/oddata-banner.png",
    ],
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
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

  },
  goto(e){
    console.log(e.currentTarget.dataset.id);
    if (e.currentTarget.dataset.id == 0){
      wx.navigateTo({
        url: '/pages/oddata/cityInfo/cityInfo',
      })
    } else if (e.currentTarget.dataset.id == 1) {
      wx.navigateTo({
        url: '/pages/model/BigData/BigData',
      })
    } else if (e.currentTarget.dataset.id == 2) {
      wx.navigateTo({
        url: '/pages/oddata/categoryInfo/categoryInfo',
      })
    } else if (e.currentTarget.dataset.id == 3) {
      wx.navigateTo({
        url: '/pages/oddata/brandInfo/brandInfo',
      })
    }else if (e.currentTarget.dataset.id == 4) {
      wx.navigateTo({
        url:'/pages/shop/shop',
        // url: '/pages/oddata/merchantInfo/merchantInfo',
      })
    } else if (e.currentTarget.dataset.id == 5) {
      wx.navigateTo({
        url: '/pages/oddata/companyInfo/companyInfo',
      })
    }
    
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