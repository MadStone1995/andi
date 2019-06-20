// pages/my/myintegral/myintegral.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yueList: [{ date: "2019-4-20", total: "兑换", num: "-10积分" },
    { date: "2019-4-23", total: "充值", num: "+12积分" },
    { date: "2019-4-30", total: "兑换", num: "-5积分" }],
    userInfo:{},
    sendNum:'',
    phone:'',
    pointList:[],
    loading:false,
    canLoad:true,
    page:1,
    invitatepeople:0,
    invitateNum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    that.init();
  },
  loadMoreShop() {
    var that = this;
    if (that.data.canLoad) {
      that.setData({
        canLoad: false,
        loading: true,
      })
      that.data.page = that.data.page + 1;
      wx.request({
        url: app.globalData.httpsurl + 'integralwater/',
        data: { user_id: app.globalData.userid, page: that.data.page, limit: 10 },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if (res.data.code == 200) {
            var newList = that.data.pointList;
            newList.push.apply(newList, res.data.list);
            that.setData({
              loading: false,
              pointList: newList,
              page: that.data.page,
              canLoad: true,
            })
            
          }else {
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
  init() {
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'getuser/',
      data: { user_id: app.globalData.userid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        if (res.data.code == 200) {
          that.setData({
            userInfo: res.data.list
          })
        }
      },
      error: function (e) {

      }
    })
    wx.request({
      url: app.globalData.httpsurl + 'integralwater/',
      data: { user_id: app.globalData.userid,page:1,limit:10 },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        if(res.data.code == 200){
          that.setData({
            pointList:res.data.list,
            invitatepeople: res.data.invitation.number,
            invitateNum: res.data.invitation.sum,
          })
        }
      },
      error: function (e) {

      }
    })
  },
  sureSend(){
    var that = this;
    if(app.isEmpty(that.data.phone)){
      wx.showToast({
        title: '输入手机号',
        icon: 'none',
      })
    } else if (app.isEmpty(that.data.sendNum)){
      wx.showToast({
        title: '输入积分数',
        icon: 'none',
      })
    }else{
    wx.showModal({
      title: '提示',
      content: '确认转赠？',
      confirmText: '转赠',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.httpsurl + 'integralturnadd/',
            data: {
              user_id: app.globalData.userid,
              number: that.data.sendNum,
              phone: that.data.phone
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: function (res) {//服务器返回数据
              if (res.data.code == 200) {
                wx.showToast({
                  title: '转增成功！',
                  icon: 'success',
                })
                that.init();
              } else {
                wx.showToast({
                  title: res.data.error,
                  icon: 'none',
                })
              }
            },
            error: function (e) {

            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    }
   
  },
  inputNum(e){
    var that = this;
    that.setData({
      sendNum: e.detail.value
    })
  },
  inputPhone(e) {
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },
  tomall() {
    wx.navigateTo({
      url: '/pages/my/mall/mall',
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