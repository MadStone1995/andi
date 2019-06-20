import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
let chart;
let chart2;
let chart3;
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    title: {
      text: '有效单量比',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3"],
    legend: {
      data: ['上星期单量', '本星期单量'],
      top: 30,
      left: 'center',
      backgroundColor: '#fff',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      textStyle: {
        fontSize: 25
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        intervar: 0,
        rotate: 300,//旋转角度
        margin: 5,
        color: '#666'
      }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: '上星期单量',
      type: 'line',
      smooth: true,
      itemStyle: { normal: { label: { show: true } } },
      data: [],
    }, {
      name: '本星期单量',
      type: 'line',
      smooth: true,
      itemStyle: { normal: { label: { show: true } } },
      data: [],
    }]
  };
  chart.setOption(option);
  return chart;
}
function initChart2(canvas, width, height) {
  chart2 = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart2);
  var option = {
    title: {
      text: '有效营收比',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3"],
    legend: {
      data: ['上星期营收', '本星期营收'],
      top: 30,
      left: 'center',
      backgroundColor: '#fff',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      textStyle: {
        fontSize: 24
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        intervar: 0,
        rotate: 300,//旋转角度
        margin: 5,
        color: '#666'
      }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: '上星期营收',
      type: 'line',
      smooth: true,
      itemStyle: { normal: { label: { show: true } } },
      data: [],
    }, {
      name: '本星期营收',
      type: 'line',
      smooth: true,
      itemStyle: { normal: { label: { show: true } } },
      data: [],
    }]
  };
  chart2.setOption(option);
  return chart2;
}

function initChart3(canvas, width, height) {
  chart3 = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart3);
  var option = {
    title: {
      text: '新老客户比',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3"],
    legend: {
      data: [],
      top: 30,
      left: 'center',
      backgroundColor: '#fff',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      textStyle: {
        fontSize: 24
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        intervar: 0,
        rotate: 300,//旋转角度
        margin: 5,
        color: '#666'
      }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: '上星期营收',
      type: 'line',
      smooth: true,
      itemStyle: { normal: { label: { show: true } } },
      data: [],
    }]
  };
  chart3.setOption(option);
  return chart3;
}
Page({
  data: {
    ec: {
      lazyLoad: true
    },
    ec2: {
      lazyLoad: true
    },
    ec3: {
      lazyLoad: true
    },
    chooseItem: 0,
    detail: {},
    haveqx: true,
    sqStatus: -2,
  },
  onLoad(){
    this.barComponent1 = this.selectComponent('#mychart-dom-line');
    this.barComponent2 = this.selectComponent('#mychart-dom-line2');
    this.barComponent3 = this.selectComponent('#mychart-dom-line3');
  },
  onShow(){
    var that =this;
    that.getdetailInfo(that.data.chooseItem);
    that.getSqInfo(that.data.chooseItem);
    that.getapi();
  },
  getSqInfo(e) {
    var that = this;
    if (e == 0) {
      var platform = "eleme";
    } else if (e == 1) {
      var platform = "meituan";
    }
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/storeauditshow/',
      data: { user_id: app.globalData.userid, platform: platform },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          sqStatus: res.data.state,
        })
        if (res.data.state == 1) {
          that.setData({
            haveqx: true,
          })
        } else {
          that.setData({
            haveqx: false,
            detail:{},
          })

        }
      },
      error: function (e) {

      }
    })

  },
  chooseType(e) {
    var that = this;
    // if (that.data.chooseItem != e.currentTarget.dataset.type) {
    //   that.setData({
    //     chooseItem: e.currentTarget.dataset.type
    //   })
    // }
    that.getSqInfo(e.currentTarget.dataset.type);
    that.getdetailInfo(e.currentTarget.dataset.type);
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  getdetailInfo(e) {
    var that = this;
    wx.showLoading({
      title: '数据加载中。。。',
    })
    if (e == 0) {
      var platform = "eleme";
    } else if (e == 1) {
      var platform = "meituan";
    }
    wx.request({
      url: app.globalData.httpsurl2 + 'constructions/storedetails/',
      data: { user_id: app.globalData.userid, platform: platform },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          that.setData({
            detail: res.data.list,
          })
          console.log(that.data.detail)
          var query = wx.createSelectorQuery();
        }
        that.setData({
          chooseItem: e
        })
      },
      error: function (e) {

      }
    })
  },
  getapi: function () {
    var _this = this;
    // 获取IP地址
    wx.request({
      url: 'https://ip.tianqiapi.com/',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // 根据IP获取天气数据
        _this.weatherweekday(res.data.ip);
      }
    });
  },
  weatherweekday: function (ip) {
    var _this = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api/?version=v1',
      data: {
        'ip': ip
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        _this.setData({
          weatherweek: res.data
        });
        // console.log(res.data);
      }
    });
  },
  toAuthorization(e) {
    var that = this;
    var item = that.data.chooseItem;
    wx.navigateTo({
      url: '/pages/model/authorization/authorization?item=' + item,
    })
  },
  onReady() {
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
});
