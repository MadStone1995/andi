//index.js
//获取应用实例
import amapFile from '../../utils/amap-wx.js'
const app = getApp()
Page({
  data: {
    userInfo: {},
    haveqx:false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this;
    if (typeof (options.userId) != "undefined") {
      that.setData({
        shareId: options.userId
      })
    }
    this.getOpenId();
    this.getLocationInfo();
    
  },
  //获取分享
  getPoint() {
    var that= this;
    if (!app.isEmpty(that.data.shareId)) {
      wx.request({
        url: app.globalData.httpsurl + 'homeinvitation/',
        data: {
          inviter_id: that.data.shareId,
          current_id: app.globalData.userid,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {//服务器返回数据

        },
        error: function (e) {

        }
      })
    }
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
      //判断是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.login({
              success(res) {
                wx.showLoading({
                  title: '登录中...',
                })
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
                      wx.hideLoading();
                        if (res.data.code == 100) {
                          app.globalData.userid = res.data.user_id;
                          that.toHome();
                          that.getPoint();
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
          } else {
            console.log("未授权");
          }
        }
      })
    }else{
      that.toHome();
      that.getPoint();
    }
  },
  getUserInfo: function(e) {
    var that = this;
    wx.getSetting({
      success(res) {
        that.toHome();
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success(res) {
              wx.request({
                url: app.globalData.httpsurl + 'obtain/',
                data: {code: res.code},
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
                        data: { gender: res.userInfo.gender, avatarUrl: res.userInfo.avatarUrl, nickName: res.userInfo.nickName, open_id: app.globalData.openid},
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded',
                        },
                        success: function (res) {//服务器返回数据
                          app.globalData.userid = res.data.user_id;
                          that.getPoint();
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
      fail(){
        console.log("拒绝授权");
      }
    })
  },
  toHome(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
})
