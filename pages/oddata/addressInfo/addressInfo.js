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
    update_time:'',
    radio: 1,
    menu: [],
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
    range: [{
      name: '1',
      value: '3公里',
      checked: 'true'
    },
    {
      name: '2',
      value: '6公里'
    },
    {
      name: '3',
      value: '全城'
    },
    ],

    value3: 1,
    value2: '',
    index: 0,
    title_value: '',
    img: '',
    down: '',
    check: 2,
    hiddenmodalput: true,
    flog: false,
    page: 1,
    search: [],
    list: [],
    type3: '',
    array: [],
    title:'',
    sqInfo:{},
    detailsList:[],
    heightInfo:200,
    canLoad:true,
    loading:false,
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
  chooseAddress: function () {
    this.setData({
      show: true
    })
  },

  onLoad: function (options) {
    var that = this;
    that.getHeight();
  },
  inputName: function (e) {
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
    if (that.data.title != e.detail.value) {
      var title = e.detail.value;
      var one = that.data.radio;
      var province = that.data.province;
      var city = that.data.city;
      var area = that.data.area;
      wx.request({
        url: app.globalData.httpsurl2 + 'merchants/circleanalysisquery/',
        data: { province: province, city: city,area:area, store_name: title },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res);
          console.log(JSON.stringify(res.data.data) != "{}");
          if (JSON.stringify(res.data.data) != "{}") {
            that.setData({
              menu: res.data.list,
              flag: true
            })
          } else {
            that.setData({
              menu: res.data.list,
              flag: false
            })
          }
        },
        error: function (e) {

        }
      })
    }
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  radioChange2: function (e) {
    var radio = e.detail.value
    console.log(radio)
    var that = this
    that.setData({
      check: radio
    })
  },

  onReady: function () {

  },

  radioChange: function (e) {
    this.setData({
      radio: e.detail.value
    })
  },
  //得到范围选择框的值
  range: function (e) {
    console.log(e.detail.value)
    this.setData({
      value3: e.detail.value
    })
  },

  //失去焦点
  closeflag(){
    var that = this;
    that.setData({
      flag:false,
    })
  },
  //点击出现内容
  select: function (e) {
    var name = e.currentTarget.dataset.name;
    console.log(name);
    var that = this
    that.setData({
      value2: name,
      title_value: name,
      flag: false
    })
  },

  //输入框
  title: function (e) {
    this.setData({
      title_value: e.detail.value
    })
  },

  formSubmit: function (e) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    //单选框
    // var one = that.data.radio;
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
    var area = that.data.area;
    var name = that.data.value2
    var range = that.data.value3
    if(range == 1){
      range = 3000;
    } else if (range == 2){
      range = 6000;
    }else{
      range = 600000000;
    }
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/businesscircleanalysis/',
      data: { province: province, city: city,area:area, store_name: name, scope: range, userid: app.globalData.userid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        if(res.data.code == 200){
          that.setData({
            sqInfo:res.data.list,
            detailsList: res.data.list.details,
            page: 1,
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
  },
  loadMoreShop() {
    var that = this;
    var province = that.data.province;
    var city = that.data.city;
    var area = that.data.area;
    var name = that.data.value2
    var range = that.data.value3
    if (range == 1) {
      range = 3000;
    } else if (range == 2) {
      range = 6000;
    } else {
      range = 600000000;
    }
    if (that.data.canLoad) {
      that.setData({
        canLoad: false,
        loading: true,
      })
      that.data.page = that.data.page + 1;
      wx.request({
        url: app.globalData.httpsurl2 + 'merchants/businesscircleanalysis/',
        data: { page: that.data.page, limit: 10, province: province, city: city, area:area,store_name: name, scope: range, userid: app.globalData.userid},
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if(res.data.code == 200){
            var newList = that.data.detailsList;
            newList.push.apply(newList, res.data.list.details);
            that.setData({
              loading: false,
              detailsList: newList,
              page: that.data.page,
              canLoad: true,
            })
          } else if(res.data.code == 102) {
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