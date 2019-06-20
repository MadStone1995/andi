// pages/odinvestment/odinvestment.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://xcx.od888.cn/static/fixed/images/ax-banner.png',
    ],
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    page:1,
    limit:10,
    canLoad: true,
    loading: false,
    shopName:'',
    typeList:[

    ],
    cytype:'已入驻',
    zsarea:'',
    zsscale:'',//招商规模
    zscost:'',
    shopList:[],
    moreCy:false,
    moreJe:false,
    moreGm:false,
  },
  getTypeList(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl2 + 'wx/peacemind/',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          typeList: res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  chooseMoreCy(){
    var that = this;
    that.setData({
      moreCy: !that.data.moreCy,
    })
  },
  chooseMoreJe() {
    var that = this;
    that.setData({
      moreJe: !that.data.moreJe,
    })
  },
  chooseMoreGm() {
    var that = this;
    that.setData({
      moreGm: !that.data.moreGm,
    })
  },
  lookmore(e){
    var that = this;
      // wx.showModal({
      //   title: '通知',
      //   content: '游客查询次数受限,请前往注册',
      //   confirmText:'立即注册',
      //   success(res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
    var index=  e.currentTarget.dataset.shopid;
    index= JSON.stringify(index)
    console.log(index);
    wx.navigateTo({
      url: '/pages/ppdetail/ppdetail?detaiInfo='+index,
    })
  },
  bindPickerChange(e) {
    var item = e.detail.value;
    var that= this;
    var type = this.data.typeList.area[item];
    this.setData({
      zsarea: type
    })
    that.getListInfo();
  },
  choosecytype(e){
    var that = this;
    if (that.data.cytype == e.currentTarget.dataset.cytype){
      that.setData({
        cytype: '',
        shopName:'',
      })
    }else{
      that.setData({
        cytype: e.currentTarget.dataset.cytype,
        shopName: '',
      })
    }
    that.getListInfo();
  },
  choosetztype(e) {
    var that = this;
    if (that.data.zscost == e.currentTarget.dataset.tztype) {
      that.setData({
        zscost: '',
        shopName: '',
      })
    } else {
      that.setData({
        zscost: e.currentTarget.dataset.tztype,
        shopName: '',
      })
    }
    that.getListInfo();
  },
  choosetztype(e) {
    var that = this;
    if (that.data.zscost == e.currentTarget.dataset.tztype) {
      that.setData({
        zscost: '',
        shopName: '',
      })
    } else {
      that.setData({
        zscost: e.currentTarget.dataset.tztype,
        shopName: '',
      })
    }
    that.getListInfo();
  },
  choosetgmype(e) {
    var that = this;
    if (that.data.zsscale == e.currentTarget.dataset.gmtype) {
      that.setData({
        zsscale: '',
        shopName: '',
      })
    } else {
      that.setData({
        zsscale: e.currentTarget.dataset.gmtype,
        shopName: '',
      })
    }
    that.getListInfo();
  },
  getBrand(e){
    var that = this;
    that.data.shopName = e.detail.value;
    that.setData({
      shopName: e.detail.value,
    })
  },
  getListInfo(){
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'wx/peacemind/',
      data: { 
        brand_name: that.data.shopName,
        classify:that.data.cytype,
        area:that.data.zsarea,
        cost:that.data.zscost,
        scale:that.data.zsscale,
        page:1,
        limit:10,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          shopList: res.data.list,
          page:1,
        })
      },
      error: function (e) {

      }
    })
  },
  loadMoreShop(){
    var that = this;
    if (that.data.canLoad) {
      that.setData({
        canLoad: false,
        loading: true,
      })
      that.data.page = that.data.page + 1;
      wx.request({
        url: app.globalData.httpsurl2 + 'wx/peacemind/',
        data: {
          brand_name: that.data.shopName,
          classify: that.data.cytype,
          area: that.data.zsarea,
          cost: that.data.zscost,
          scale: that.data.zsscale,
          page: 1,
          limit: 10,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          var newList = that.data.shopList;
          newList.push.apply(newList, res.data.list);
          that.setData({
            loading: false,
            shopList: newList,
            page: that.data.page,
            canLoad: true,
          })
          if (that.data.shopList.length == res.data.max) {
            wx.showToast({
              title: '没有更多了！',
              icon: 'none',
              duration: 1500
            })
          }
        },
        error: function (e) {

        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getTypeList();
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
    var that= this;
    that.getListInfo();
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