// pages/my/sjrz/sjrz.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'USA', value: '品牌公司' ,checked: 'true'},
      { name: 'CHN', value: '外卖待运营公司' },
      { name: 'BRA', value: '供应商' }
    ],
    imgPaths:[],
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  uploadImg() {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'], // 指定压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var newList = that.data.imgPaths;
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            wx.request({
              url: app.globalData.httpsurl2 + 'wx/wximage/',
              data: {
                file: res.data
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              method: 'POST',
              success: res => {
                if (res.data.code == 200) {
                  let imgPathItem = res.data.list;
                  newList.push.apply(newList, imgPathItem);
                  that.setData({
                    imgPaths: newList
                  })
                } else {
                  wx.showToast({
                    title: res.data.error,
                    icon:'none',
                  })
                }

              }
            })
          }
        })
      }
    })
  },
  deleteImg(e) {
    var that = this;
    let index = e.currentTarget.dataset.id;
    that.data.imgPaths.splice(index, 1);
    that.setData({
      imgPaths: that.data.imgPaths,
    })
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