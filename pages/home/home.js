import amapFile from '../../utils/amap-wx.js'
import util from '../../utils/util.js'
import QQMapWX from '../../utils/qqmap-wx-jssdk.min.js'
const qqmapsdk = new QQMapWX({
  key: '3HLBZ-QAHCW-2AER2-RIYTU-QSYMT-MUFTF'
});
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareId:'',
    imgUrls: [
      'https://xcx.od888.cn/static/fixed/images/home-banner1.png',
      'https://xcx.od888.cn/static/fixed/images/home-banner2.png',
    ],
    indicatorDots: false,
    autoplay: true,
    circular:true,
    interval: 5000,
    duration: 1000,
    height:'',
    date:'',
    membernum:500,
    currentData: 0,
    weatherInfo:{
      wea_img:'yu',
      list:[],
    },
    address:'',
    playIndex:'',
    //咨讯信息
    newsList:[],
    //信息列表
    infoHouseList:[],
    //话题列表
    themeList:[],
    //视频
    videoList:[],
    videoId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;
   that.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {

      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        app.globalData.loacationProvince = province;
        app.globalData.loacationCity = city;
        vm.getweatherInfo();
        vm.setData({
          address: city,
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  getMemberNum(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'homeuserdisplay/',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
       that.setData({
         membernum: res.data.item
       })
      },
      error: function (e) {

      }
    })
  },
  getweatherInfo(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/cityweather/',
      data: {
        province: app.globalData.loacationProvince,
        city: app.globalData.loacationCity,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
      if(res.data.code == 200){
        that.data.weatherInfo.list = res.data.list.futurewea;
        that.data.weatherInfo.wea_img = res.data.list.futurewea
        that.setData({
          weatherInfo: that.data.weatherInfo
        })
      }
      },
      error: function (e) {

      }
    })
    let time = util.formatDate(new Date());
    let date = util.getDates(1, time);
    that.data.weatherInfo.time = date[0].time;
    that.data.weatherInfo.week = date[0].week;

    that.setData({
      weatherInfo: that.data.weatherInfo,
    })
    console.log(that.data.weatherInfo);
  },
  towzjf() {
    wx.navigateTo({
      url: '/pages/my/wzjf/wzjf',
    })
  },
  todetail(e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/model/menuDetail/menuDetail?hotvideo_id=' + id,
    })
  },
  toTheme(e){
    var that = this;
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/themeDetail/themeDetail?article_id=' + id,
    })
  },
  tonewDetail(e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/newsdetail/newsdetail?article_id=' + id,
    })
  },
  // getHeight(){
  //   var query = wx.createSelectorQuery();
  //   //选择id
  //   var that = this;
  //   query.select('#content').boundingClientRect(function (rect) {
  //     that.setData({
  //       height: rect.height
  //     })
  //   }).exec();
  // },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current,
        pageNum: 1,
      })
      //that.queryMyOrder();
    }
  },
  //滑动切换
  bindChange: function (e) {
    const that = this;
    if (that.data.currentData === e.detail.current) {
      return false;
    } else {
      that.setData({
        currentData: e.detail.current,
      })
    }
  },
  jumpTo(e){
    if (e.target.dataset.h5 == 0){
      wx.navigateTo({
        url: '/pages/model/wantShop/wantShop',
      })
    } else if (e.target.dataset.h5 == 1){
      wx.navigateTo({
        url: '/pages/model/Operate/Operate',
      })
    } else if (e.target.dataset.h5 == 2) {
      wx.navigateTo({
        url: '/pages/model/Purchase/Purchase',
      })
    } else if (e.target.dataset.h5 == 3) {
      wx.navigateTo({
        url: '/pages/model/Creditworthiness/Creditworthiness',
      })
    } else if (e.target.dataset.h5 == 4) {
      wx.navigateTo({
        url: '/pages/model/Lovelearning/Lovelearning',
      })
    } else{
      wx.navigateTo({
        url: '/pages/oddata/addressInfo/addressInfo',
      })
    }
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
    var that = this;
    that.getMemberNum();
    that.getNews();
    that.getInfoList();
    that.getVideoList();
    that.getThemeList();  
  },
  //获取资讯信息
  getNews(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'consultingshow/',
      data: {
        type:'1',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
      
        that.setData({
          newsList:res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  //获取信息list
  getInfoList() {
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'informationshow/',
      data: {
        type:5,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        that.setData({
          infoHouseList: res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  getVideoList(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'videoshow/',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        if(res.data.code == 200 ){
          that.setData({
            videoList: res.data.list,
          })
        }
      },
      error: function (e) {

      }
    })
  },
  getThemeList() {
    var that = this;
    wx.request({
      url: app.globalData.httpsurl + 'consultingshow/',
      data: {
        type: '2',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        if (res.data.code == 200) {
          that.setData({
            themeList: res.data.list,
          })
        }
      },
      error: function (e) {

      }
    })
  },
  bindplay: function (e) {
    var that = this;
    if (that.data.videoId != e.currentTarget.id){
      that.setData({
        videoId: e.currentTarget.id,
      })
      var id = String(e.currentTarget.id)     //点击id
      if (!this.data.playIndex) { // 没有播放时播放视频
        this.setData({
          playIndex: id
        })
        var videoContext = wx.createVideoContext(id)
        videoContext.play()
      } else {// 有播放时先将prev暂停，再播放当前点击的current
        var videoContextPrev = wx.createVideoContext(this.data.playIndex)
        // videoContextPrev.seek(0)
        if (this.data.playIndex != id) {  //不知道为什么，不加这个判断的时候这个视频会一直在播放和暂停之间切换
          videoContextPrev.pause()
        }
        this.setData({
          playIndex: id
        })
        var videoContextCurrent = wx.createVideoContext(this.data.playIndex)
        videoContextCurrent.play()
      }

    }

  },
  phonecallevent: function (e) {
    var phone = String(e.target.dataset.phone);
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  isEmpty(obj){
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
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
  shareTheme(){
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