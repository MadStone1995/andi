// pages/model/Operate/Operate.js
 import util from '../../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseItem:0,
    ptDataType:0,
    ptDataType2: 0,
    ptDataText1:"差评预警",
    ptDataText2:"经营日报",
    ptDataText3: "饿了么",
    ptDataText4: "美团",
    ptDataText5:"未来7天天气",
    badCommentList:[],//差评列表
    businessData:{},
    yesterday:'',
    imgsrc:[],
    detailList:[],
    showMsg:'预览图',
    weatherweek:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getweatherInfo();
  },
  getweatherInfo() {
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
        if (res.data.code == 200) {
          that.data.weatherweek = res.data.list.futurewea;
          that.setData({
            weatherweek: that.data.weatherweek
          })
        }
      },
      error: function (e) {

      }
    })
  },
  chooseType(e) {
    var that = this;
    that.setData({
      chooseItem: e.target.dataset.type
    })
  },
  changePtType(){
    var that =this;
    if(that.data.ptDataType == 0){
      that.setData({
        ptDataType:1,
        ptDataText1:"经营日报",
        ptDataText2: "差评预警",
      })
    }else{
      that.setData({
        ptDataType: 0,
        ptDataText2: "经营日报",
        ptDataText1: "差评预警",
      })
    }
  },
  changePtType2() {
    var that = this;
    if (that.data.ptDataType2 == 0) {
      that.setData({
        ptDataType2: 1,
        ptDataText3: "美团",
        ptDataText4: "饿了么",
      })
    } else {
      that.setData({
        ptDataType2: 0,
        ptDataText4: "美团",
        ptDataText3: "饿了么",
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
    var that =this;
    that.getPtInfo();
    that.getDiagnosis();
  },
  uploadImage(){
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'], // 指定压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      count:1,
      success:function(res){
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          imgsrc: tempFilePaths
        })
      
      }
    })
  },
  uploadImg(){
    var that = this;
    console.log(that.data.imgsrc);
    wx.getFileSystemManager().readFile({
      filePath: that.data.imgsrc[0], //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        console.log(res.data);
        wx.request({
          url: app.globalData.httpsurl2 + 'imagedetection/',
          data: {
            file: res.data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          success: res => {
            console.log(res);
            if(res.data.code == 200){
              that.setData({
                showMsg:res.data.list
              })
            }else{
              that.setData({
                showMsg: res.data.error
              })
            }
            
          }
        })
      }
    })
  },
  // 图片预览
  previewImage: function (e) {
    var current = e.target.dataset.src[0]
    wx.previewImage({
      urls: [current]
    })
  },
  //删除图片
  deleteImg: function (e) {
    var that = this;
    that.setData({
      imgsrc:[],
    });
  },
  //获取平台数据
  getPtInfo(){
    var that =this;
    //差评预警
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/badreviewwarning/',
      data: { user_id: app.globalData.userid},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if(res.data.code == 200){
          that.setData({
            badCommentList:res.data.list,
          })
        }
      },
      error: function (e) {

      }
    })
    //经营日报
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/businessdaily/',
      data: { user_id: app.globalData.userid},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data.code == 200) {
          let time = that.getDateStr(new Date(), -1);
          let date = util.getDates(1, time);
          that.setData({
            businessData:res.data.list,
            yesterday:time,
            week: date[0].week
          })
        }
      },
      error: function (e) {

      }
    })
  },
  //获取诊断信息
  getDiagnosis(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/shopdiagnosis/',
      data: { user_id: app.globalData.userid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data.code == 200) {
        console.log(res.data);
        that.setData({
          detailList:res.data.list,
        })
        }
      },
      error: function (e) {

      }
    })
  },
getDateStr(today, addDayCount) {
    var dd;
    if(today) {
      dd = new Date(today);
    }else{
      dd = new Date();
    }
  dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期 
    var d = dd.getDate();
    if(m < 10) {
      m = '0' + m;
    };
    if(d < 10) {
      d = '0' + d;
    };
    return y + "-" + m + "-" + d;
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