//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    haveqx: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    // this.getOpenId();
    // this.getLocationInfo();
  },
  getLocationInfo() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '75f7108336ea2958d914c661d972dbeb' });
    myAmapFun.getWeather({
      success: function (data) {
      },
      fail: function (info) {
        //失败回调
      }
    })
  },
  //微信触发登陆
  getOpenId: function () {
    var that = this;
    if (app.isEmpty(app.globalData.openid)) {
      wx.login({
        success(res) {
          wx.request({
            url: app.globalData.httpsurl + 'obtain/',
            data: { code: res.code },
            method: 'GET',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: function (res) {//服务器返回数据
              app.globalData.openid = res.data.open_id;
              that.setData({
                haveqx: true,
              })
              wx.request({
                url: app.globalData.httpsurl + 'userstorage/',
                data: { open_id: res.data.open_id },
                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                success: function (res) {//服务器返回数据
                  if (res.data.code == 100) {
                    app.globalData.userid = res.data.user_id;
                    that.toHome();
                  }
                },
                error: function (e) {

                }
              })

            },
            error: function (e) {

            }
          })

        }
      })

    }
  },
  getUserInfo: function (e) {
    var that = this;
    wx.getSetting({
      success(res) {
        that.toHome();
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success(res) {
              wx.request({
                url: app.globalData.httpsurl + 'obtain/',
                data: { code: res.code },
                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                success: function (res) {//服务器返回数据
                  app.globalData.openid = res.data.open_id;
                  wx.getUserInfo({
                    success: function (res) {
                      wx.request({
                        url: app.globalData.httpsurl + 'userstorage/',
                        data: { gender: res.userInfo.gender, avatarUrl: res.userInfo.avatarUrl, nickName: res.userInfo.nickName, open_id: app.globalData.openid },
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded',
                        },
                        success: function (res) {//服务器返回数据
                          app.globalData.userid = res.data.user_id;
                        },
                        error: function (e) {

                        }
                      })
                    }
                  })

                },
                error: function (e) {

                }
              })
            }
          })

        }
      },
      fail() {
        console.log("拒绝授权");
      }
    })
  },
  toHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
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
