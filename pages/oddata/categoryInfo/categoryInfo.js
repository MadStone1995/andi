// pages/geturl/geturl.js
var app = getApp();
var url = app.globalData.url;

Page({

  data: {
    province: '',
    city: '',
    area: '',
    show: false,
    time: '',
    value2: '',
    index: 0,
    title_value: '',
    img: '',
    down: '',
    check: 2,
    hiddenmodalput: true,
    flog: false,
    page: 1,
    list: [],
    array: [],
    productType:'',
    canLoad:true,
    loading:false,
    update_time:'',
  },
  // 地区选择
  sureSelectAreaListener: function (e) {
    var that = this;
    that.setData({
      show: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city,
      area: e.detail.currentTarget.dataset.area
    })
  },
  bindPickerChange(e) {
    var item = e.detail.value;
    var type = this.data.array[item];
    this.setData({
      productType: type
    })
  },
  chooseAddress: function () {
    this.setData({
      show: true
    })
  },
  onLoad: function (options) {
    var that = this;
    that.getTypeList();
    that.getHeight();
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  onReady: function () {

  },
  getTypeList() {
    var that = this;
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/categoryquery/',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          array: res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  loadMoreShop() {
    var that = this;
    var province = that.data.province;
    var city = that.data.city;
    var area = that.data.area;
    var productType= that.data.productType;
    if (that.data.canLoad) {
      that.setData({
        canLoad: false,
        loading: true,
      })
      that.data.page = that.data.page + 1;
      wx.request({
        url: app.globalData.httpsurl2 + 'merchants/categorydetails/',
        data: { page: that.data.page, limit: 10, province: province, city: city, area:area,classify: productType, userid: app.globalData.userid },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if(res.data.code == 200){
            var newList = that.data.list;
            newList.push.apply(newList, res.data.list);
            that.setData({
              loading: false,
              list: newList,
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
  getHeight() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          heightInfo: res.windowHeight - 325,
        })
      },
    })
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    //省市区
    if (that.data.province == '') {
      wx.showToast({
        title: '请先选择城市',
        icon: 'none',
        duration: 1000
      })
      return
    }
    var province = that.data.province;
    var city = that.data.city;
    var area = this.data.area;
    var productType = that.data.productType;
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/categorydetails/',
      data: { province: province, city: city,area:area, page: 1, limit: 10, classify: productType, userid: app.globalData.userid},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        if(res.data.code == 200){
          that.setData({
            list: res.data.list,
            page: 1,
            update_time: res.data.update_time
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


  },
  //图片预览
  preimage: function (e) {
    wx.previewImage({
      urls: '[' + this.data.img + ']',
    })
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})