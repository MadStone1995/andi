// pages/geturl/geturl.js

var app = getApp();
var url = app.globalData.url

Page({
  data: {
    province: '',
    city: '',
    isshow: false,
    time: "",
    radio: 1,
    down: '',
    hiddenmodalput: true,
    chooseItem:0,
    check: 2,
    //当前页数 请求的页数
    page: 1,
    limit:10,
    items: [{
      name: '1',
      value: '饿了么',
      checked: 'true'
    },
    {
      name: '2',
      value: '美团'
    },
    ],
    sjxqList:[],
    cityInfo:{},
    heightInfo:100,
    canLoad:true,
    loading:false,
    update_time:'',
  },
  chooseType(e) {
    var that = this;
    that.setData({
      chooseItem: e.target.dataset.type
    })
    // if (e.target.dataset.type == 2) {
    //   that.getsjxq();
    // }
  },
  getCityInfo(){
    var that =this;
    if (that.data.province == '') {
      wx.showToast({
        title: '请先选择城市',
        icon: 'none',
        duration: 1000
      })
      return
    }
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/centercityoverview/',
      data: { province: that.data.province, city: that.data.city, userid: app.globalData.userid},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        if(res.data.code==200){
          console.log(res.data.list);
          that.setData({
            cityInfo: res.data.list,
            update_time: res.data.update_time,
          })
        } else if (res.data.code == 102) {
          wx.showModal({
            title: '提示',
            content: '未注册用户信息,请注册',
            confirmText: '前往注册',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/my/register/register',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          wx.showToast({
            title: res.data.error,
            icon: 'none'
          })
        }
      },
      error: function (e) {

      }
    })
    that.getsjxq();
  },
  //商家详情
  getsjxq(){
    var that = this;
    if (that.data.province == '') {
      // wx.showToast({
      //   title: '请先选择城市',
      //   icon: 'none',
      //   duration: 1000
      // })
      return
    }else{
      wx.showLoading({
        title: '数据加载中...',
      })
      wx.request({
        url: app.globalData.httpsurl2 + 'merchants/centercitydetails/',
        data: { province: that.data.province, city: that.data.city, page: 1, limit: 10, userid: app.globalData.userid},
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          wx.hideLoading();
          if(res.data.code == 200){
            console.log(res.data);
            that.setData({
              sjxqList:res.data.list,
              page: 1
            })
          } else if (res.data.code == 102) {
            wx.showModal({
              title: '提示',
              content: '未注册用户信息,请注册',
              confirmText: '前往注册',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/my/register/register',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
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
  getHeight() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          heightInfo: res.windowHeight - 300,
        })
      },
    })
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
        url: app.globalData.httpsurl2 + 'merchants/centercitydetails/',
        data: { page: that.data.page, limit: 10, province: that.data.province, city: that.data.city, userid: app.globalData.userid},
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if(res.data.code == 200){
            var newList = that.data.sjxqList;
            newList.push.apply(newList, res.data.list);
            that.setData({
              loading: false,
              sjxqList: newList,
              page: that.data.page,
              canLoad: true,
            })
          } else if (res.data.code == 102) {
            wx.showModal({
              title: '提示',
              content: '未注册用户信息,请注册',
              confirmText: '前往注册',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/my/register/register',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
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
  // 地区选择
  sureSelectAreaListener: function (e) {
    var that = this;
    that.setData({
      isshow: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city
    })
  },
  chooseAddress: function () {
    this.setData({
      isshow: true
    })
  },

  onLoad: function (options) {
    var that = this;
    that.getHeight();
      },
  onReady: function () {

  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      radio: e.detail.value
    })
  },
  radioChange2: function (e) {
    var radio = e.detail.value
    console.log(radio)
    var that = this
    that.setData({
      check: radio
    })
  },
  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

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