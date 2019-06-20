import * as echarts from '../../../ec-canvas/echarts';
const app = getApp();
var url = app.globalData.url
// pages/geturl/geturl.js
Page({
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },
    istree: false,
    province: '浙江省',
    city: '杭州市',
    isshow: false,
    menu: [],
    update_time:'',
    radio: 1,
    items: [
      { name: '1', value: '饿了么', checked: 'true' },
      { name: '2', value: '美团' },
    ],
    index: 0,
    type3: '',
    down: '',
    check: 2,
    hiddenmodalput: true,
    array: [],
    page: 1,
    page2:1,
    page_size: 1,
    city_list: [],
    list: [],
    goods: [],//品牌列表
    arrt: [],
    pl: '',
    flag: false,
    flog: false,
    g_new: false,
    time: '',
    value2: '',
    inputing: false,
    ppgkInfo:{},
    cityInfo:[],
    ppList:[],
    canLoad: true,
    loading: false,
    canLoad2: true,
    loading2: false,
    productType:'',
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
    //树状图
    this.echartsComponnet = this.selectComponent('#treeEchart');
    this.getTypeList();
  },
  cancel: function () {

    this.setData({
      hiddenmodalput: true
    });
  },
  inputName: function (e) {
    var that = this
    if (that.data.title != e.detail.value) {
      var title = e.detail.value;
      that.setData({
        value2: title
      })
      wx.request({
        url: app.globalData.httpsurl2 + 'merchants/centerbrandquery/',
        data: { shop_name_short: title},
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          wx.hideLoading();
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
  formSubmit: function (e) {
    var that = this
    if (that.data.value2 == '') {
      wx.showToast({
        title: '请先输入品牌',
        icon: 'none',
        duration: 1000
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/centerbrandprofile/',
      data: { shop_name_short: that.data.value2, userid: app.globalData.userid},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.list);
        if(res.data.code == 200){
          that.initChart(res.data.list)
          that.setData({
            ppgkInfo: res.data,
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
  //查询城市
  queryCity: function (e) {
    var that = this
    if (that.data.province == '') {
      wx.showToast({
        title: '请先选择城市',
        icon: 'none',
        duration: 1000
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/accuratebrandprofile/',
      data: { page: 1, limit: 10, province: that.data.province, city: that.data.city, shop_name_short: that.data.value2, userid: app.globalData.userid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data);
        // that.initChart(res.data.list)
        if(res.data.code == 200){
          that.setData({
            cityInfo: res.data.list,
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
    var productType = that.data.productType;
    if (that.data.canLoad) {
      that.setData({
        canLoad: false,
        loading: true,
      })
      that.data.page = that.data.page + 1;
      wx.request({
        url: app.globalData.httpsurl2 + 'merchants/accuratebrandprofile/',
        data: { page: that.data.page, limit: 10, province: that.data.province, city: that.data.city, shop_name_short: that.data.value2, userid: app.globalData.userid},
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if(res.data.code == 200){
            var newList = that.data.cityInfo;
            newList.push.apply(newList, res.data.list);
            that.setData({
              loading: false,
              cityInfo: newList,
              page: that.data.page,
              canLoad: true,
            })
            if (that.data.cityInfo.length == res.data.max) {
              wx.showToast({
                title: '没有更多了！',
                icon: 'none',
                duration: 1500
              })
            }
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
  getPpList(){
    var that = this
    if (that.data.productType == '') {
      wx.showToast({
        title: '请先选择品类',
        icon: 'none',
        duration: 1000
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/accurateclassifyprofile/',
      data: { page: 1, limit: 10, province: that.data.province, city: that.data.city, classify: that.data.productType, userid: app.globalData.userid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        if(res.data.code == 200){
          that.setData({
            ppList: res.data.list,
            page2: 1
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
        } else if(res.data.code == 100){
          wx.showToast({
            title: res.data.error,
            icon: 'none'
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
  },
  loadMoreShop2() {
    var that = this;
    if (that.data.canLoad2) {
      that.setData({
        canLoad2: false,
        loading2: true,
      })
      that.data.page2 = that.data.page2 + 1;
      wx.request({
        url: app.globalData.httpsurl2 + 'merchants/accurateclassifyprofile/',
        data: { page: that.data.page2, limit: 10, province: that.data.province, city: that.data.city, classify: that.data.productType },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if(res.data.code == 200 ){
            var newList = that.data.ppList;
            newList.push.apply(newList, res.data.list);
            that.setData({
              loading2: false,
              ppList: newList,
              page2: that.data.page2,
              canLoad2: true,
            })
            if (that.data.ppList.length == res.data.max) {
              wx.showToast({
                title: '没有更多了！',
                icon: 'none',
                duration: 1500
              })
            }
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
          } else if (res.data.code == 100) {
            wx.showToast({
              title: res.data.error,
              icon: 'none'
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
  bindPickerChange(e) {
    var item = e.detail.value;
    var type = this.data.array[item];
    this.setData({
      productType: type
    })
  },
  //点击出现内容
  select: function (e) {
    var name = e.currentTarget.dataset.name;
    var that = this;
    that.setData({
      value2: name,
      flag: false
    });
  },
  radioChange2: function (e) {
    var radio = e.detail.value
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
  onShow: function () {
    var that = this
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

  },

  initChart: function (data) {
    this.echartsComponnet.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      var data1 = data;
      var option = {
        series: [{
          type: 'tree',
          data: [data1],
          top: '5%',
          left: '20%',
          bottom: '2%',
          right: '15%',
          layout: 'radial',
          symbol: 'emptyCircle',
          symbolSize: 7,
          initialTreeDepth: 3,
          animationDurationUpdate: 750,
          label: {
            normal: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              color: 'black'
            }
          }

        }]
      };
      chart.setOption(option);
      return chart;
    })
  }
})