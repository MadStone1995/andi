// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   userInfo:{},
    isshow:false,
    region: [],
    array: ['餐饮公司从业人员', '其他从业人员', '已开店商家', '意向开店商家','其他餐饮从业者'],
    sxInfo:'',
    canSend:true,
    second:60,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.userid);
  },
  bindSxChange(e){
    console.log(e.detail.value);
    var that = this;
    that.data.userInfo.attribute = that.data.array[e.detail.value],
    that.setData({
      sxInfo:that.data.array[e.detail.value],
      userInfo: that.data.userInfo,
    })
  },
  chooseAddress: function () {
    this.setData({
      isshow: true
    })
  },
  sendMsg(){
    var that = this;
    if(that.data.canSend){
      if(app.isEmpty(that.data.userInfo.phone)){
        wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 1500,
        })
        return;
      }else{
        that.setData({
          canSend:false,
        })
        wx.request({
          url: app.globalData.httpsurl + '/phonenumberbinding/',
          data: { phone: that.data.userInfo.phone},
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            if(res.data.code == 200){
             that.countDown();
            }
          },
          error: function (e) {

          }
        })
      }
    }
  },
  //倒计时
  countDown: function () {
    var that = this;
    let countDownNum = that.data.second;
    that.setData({
      timer: setInterval(function () {
        countDownNum--;
        that.setData({
          second: countDownNum
        })
        if (countDownNum == 0) {
          that.setData({
            canSend:true,
            second:60,
          })
          clearInterval(that.data.timer);
        }
      }, 1000)
    })
  },
  //注册用户
  registerUser(){
    var that =this;
    if (app.isEmpty(that.data.userInfo.province)){
      wx.showToast({
        title: '请选择地址',
        icon:'none',
        duration: 1500,
      })
    } else if (app.isEmpty(that.data.userInfo.phone)) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1500,
      })
    } else if (app.isEmpty(that.data.userInfo.code)) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1500,
      })
    } else if (app.isEmpty(that.data.userInfo.attribute)) {
      wx.showToast({
        title: '请选择用户属性',
        icon: 'none',
        duration: 1500,
      })
    }else{
      wx.showLoading({
        title: '注册提交中...',
      })
      wx.request({
        url: app.globalData.httpsurl + '/additionaluser/',
        data: {
          user_id: app.globalData.userid, 
        province:that.data.userInfo.province,
        city:that.data.userInfo.city,
        phone:that.data.userInfo.phone,
        message_code:that.data.userInfo.code,
        attribute:that.data.userInfo.attribute,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          wx.hideLoading();
          if(res.data.code == 200){
            wx.showToast({
              title: res.data.list,
              icon: 'none',
              duration: 1500,
            })
            var timeOut = setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1500)
          }else{
            wx.showToast({
              title: res.data.error,
              icon: 'none',
              duration: 2500,
            })
          }
         
        },
        error: function (e) {

        }
      })
    }
  },
  // 地区选择
  sureSelectAreaListener: function (e) {
    var that = this;
    that.data.region[0] = e.detail.currentTarget.dataset.province;
    that.data.region[1] = e.detail.currentTarget.dataset.city;
    that.data.userInfo.province = e.detail.currentTarget.dataset.province;
    that.data.userInfo.city = e.detail.currentTarget.dataset.city;
    that.setData({
      isshow: false,
      region: that.data.region,
      userInfo:that.data.userInfo,
    })
  },
  inputName(e) {
    var that = this;
    that.data.userInfo.platform_username = e.detail.value;
    that.setData({
      userInfo: that.data.userInfo,
    })
  },
  inputPsd(e) {
    var that = this;
    that.data.userInfo.platform_password = e.detail.value;
    that.setData({
      userInfo: that.data.userInfo,
    })
  },
  inputPhone(e) {
    var that = this;
    that.data.userInfo.phone = e.detail.value;
    that.setData({
      userInfo: that.data.userInfo,
    })
  },
  inputName2(e) {
    var that = this;
    that.data.userInfo.platform_username = e.detail.value;
    that.setData({
      userInfo: that.data.userInfo,
    })
  },
  inputPsd2(e) {
    var that = this;
    that.data.userInfo.code = e.detail.value;
    that.setData({
      userInfo: that.data.userInfo,
    })
  },
  inputPhone2(e) {
    var that = this;
    that.data.userInfo.phone_number = e.detail.value;
    that.setData({
      userInfo: that.data.userInfo,
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