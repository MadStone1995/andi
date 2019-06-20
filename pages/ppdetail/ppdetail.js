// pages/ppdetail/ppdetail.js
import * as echarts from '../../ec-canvas/echarts';
import util from '../../utils/util.js'
import geoJson from './china.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    detaiInfo:{},
    allList:'',
    showMore:false,
    dateTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.barComponent = this.selectComponent('#mychart-dom-area');
    var info = JSON.parse(options.detaiInfo);
    var that = this;
    let time = util.formatDate(new Date());
    that.setData({
      detaiInfo:info,
      dateTime:time,
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
    var that= this;
    that.getShopInfo();
  },
  lookInfo(){
    var that=this;
    that.setData({
      showMore: !that.data.showMore,
    })
  },
  callPhone(){
    var phoneNum = String(this.data.allList.phone);
    wx.makePhoneCall({
      phoneNumber:phoneNum,
    })
  },
  getShopInfo(){
    var that= this;
    wx.request({
      url: app.globalData.httpsurl2 + 'wx/peaceminddetails/',
      data: { alliance_id: that.data.detaiInfo.alliance_id},
      // data: { alliance_id:1},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          allList: res.data.list
        })
        // var countryList = res.data.list.distribution;
        var countryList = [{ name: '北京', value: 0 },
        { name: '天津', value: 0 },
        { name: '上海', value: 0 },
        { name: '重庆', value: 0 },
        { name: '河北', value: 0 },
        { name: '河南', value: 0 },
        { name: '云南', value: 0 },
        { name: '辽宁', value: 0 },
        { name: '黑龙江', value: 0 },
        { name: '湖南', value: 0 },
        { name: '安徽', value: 0 },
        { name: '山东', value: 0 },
        { name: '新疆', value: 0 },
        { name: '江苏', value: 0 },
        { name: '浙江', value: 0 },
        { name: '江西', value: 0 },
        { name: '湖北', value: 0 },
        { name: '广西', value: 0 },
        { name: '甘肃', value: 0 },
        { name: '山西', value: 0 },
        { name: '内蒙古', value: 0 },
        { name: '陕西', value: 0 },
        { name: '吉林', value: 0 },
        { name: '福建', value: 0 },
        { name: '贵州', value: 0 },
        { name: '广东', value: 0 },
        { name: '青海', value: 0 },
        { name: '西藏', value: 0 },
        { name: '四川', value: 0 },
        { name: '宁夏', value: 0 },
        { name: '海南', value: 0 },
        { name: '台湾', value: 0 },
        { name: '香港', value: 0 },
        { name: '澳门', value: 0 }
        ];
        var maxNum = 0;
        for (var index in res.data.list.distribution){
          delete countryList[index].drop;
          for (var innum in countryList){
            if (res.data.list.distribution[index].name == countryList[innum].name){
              countryList[innum].value = res.data.list.distribution[index].value;
              if (res.data.list.distribution[index].value > maxNum){
                maxNum = res.data.list.distribution[index].value;
              }
            }
              countryList[innum].label = {
                normal: {
                  show: true,
                  formatter: function (params) {
                    return params.name + "\n" + params.value;    //地图上展示文字 + 数值
                  },
                }
              };
          }
        }
        var query = wx.createSelectorQuery();
        query.select('#container').boundingClientRect((res) => {
          let width = res.width;
          let height = res.height;
          that.barComponent.init((canvas, width, height) => {
            // 初始化图表
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            canvas.setChart(chart);
            echarts.registerMap('china', geoJson);
            var option = {
              tooltip: {
                trigger: 'item',
                formatter: function (params) {
                  var res = '';
                  res += params['data'].name;
                  res += '门店数' + ' : ' + params['data'].value;
                  return res;
                }
              },
              visualMap: {
                show: true,
                min: 0,
                max: maxNum,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true
              },
              series: [{
                type: 'map',
                mapType: 'china',
                label: {
                  normal: {
                    show: true, //显示省份标签
                    textStyle: {
                      color: "#333",
                    } //省份标签字体颜色
                  },
                  emphasis: { //对应的鼠标悬浮效果
                    show: false,
                    position: 'right',
                    textStyle: {
                      color: "#800080",
                      formatter: '{b}'
                    }
                  }
                },
                aspectScale: 0.75,
                zoom: 1.2,
                itemStyle: {
                  normal: {
                    borderWidth: .5, //区域边框宽度
                    borderColor: '#009fe8', //区域边框颜色
                    areaColor: "#ffefd5", //区域颜色
                  },
                  emphasis: {
                    borderWidth: .5,
                    borderColor: '#4b0082',
                    areaColor: "#ffdead",
                  }
                },
                data: countryList,
              }],


            };
            chart.setOption(option);
            return chart;
          });
        }).exec()
      },
      error: function (e) {

      }
    })
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