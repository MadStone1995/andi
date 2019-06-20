import * as echarts from '../../../ec-canvas/echarts';
const app = getApp()
let chart = null;
let chart1;
function initChart2(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      // data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },

        data: ['美团', '饿了么', '百度外卖', '一点资讯', '微信', '微博', '知乎'],
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
          rotate: 300,
          margin: 5,
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        // name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [320, 300, 278, 254, 210, 200, 110],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      // {
      //   name: '正面',
      //   type: 'bar',
      //   stack: '总量',
      //   label: {
      //     normal: {
      //       show: true
      //     }
      //   },
      //   data: [120, 102, 141, 174, 190, 250, 220],
      //   itemStyle: {
      //     // emphasis: {
      //     //   color: '#32c5e9'
      //     // }
      //   }
      // },
      // {
      //   name: '负面',
      //   type: 'bar',
      //   stack: '总量',
      //   label: {
      //     normal: {
      //       show: true,
      //       position: 'left'
      //     }
      //   },
      //   data: [-20, -32, -21, -34, -90, -130, -110],
      //   itemStyle: {
      //     // emphasis: {
      //     //   color: '#67e0e3'
      //     // }
      //   }
      // }
    ]
  };

  chart.setOption(option);
  return chart;
}
function initChart3(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
      },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    ec1: {
      lazyLoad: true
    },
    ec2: {
      lazyLoad: true
    },
    chooseItem: 0,
    cityInfo:{},
    ppInfo:{},
    ppquanguo:{},
    imgsrc:'https://xcx.od888.cn/static/fixed/images/sj-banner.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.barComponent1 = this.selectComponent('#mychart-dom-bar1');
    this.barComponent2 = this.selectComponent('#mychart-dom-bar2');
    this.barComponent3 = this.selectComponent('#mychart-dom-bar3');
    that.getCityInfo();
    // that.getPlInfo();
    // that.getPpInfo();
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

  },
  getCityInfo(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/takecityoverview/',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          cityInfo:res.data.list
        })
        let xdata2 = [], xMonth = [], xDay = [], xNum = [];
        res.data.list.principal.forEach(function (value, index, arrSelf) {
          xdata2.push(value.name);
          xMonth.push(value.month);
          xDay.push(value.day);
          xNum.push(value.number);
        });
        var query = wx.createSelectorQuery();
        query.select('#detailItem-info1').boundingClientRect((res) => {
          let width = res.width;
          let height = res.height;
          that.barComponent1.init((canvas, width, height) => {
            // 初始化图表
            const chart1 = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            canvas.setChart(chart1);
            var option = {
              color: ['#37a2da', '#32c5e9', '#67e0e3'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                confine: true
              },
              legend: {
                data: ['商家数(家)', '月销总量(万)', '日销总量(万)']
              },
              grid: {
                left: 20,
                right: 20,
                bottom: 15,
                top: 40,
                containLabel: true
              },
              xAxis: [
                {
                  type: 'value',
                  axisLine: {
                    lineStyle: {
                      color: '#999'
                    }
                  },
                  axisLabel: {
                    color: '#666'
                  }
                }
              ],
              yAxis: [
                {
                  type: 'category',
                  axisTick: { show: false },
                  data: xdata2,
                  axisLine: {
                    lineStyle: {
                      color: '#999'
                    }
                  },
                  axisLabel: {
                    color: '#666'
                  }
                }
              ],
              series: [
                {
                  name: '商家数(家)',
                  type: 'bar',
                  label: {
                    normal: {
                      show: false,
                      position: 'inside'
                    }
                  },
                  data: xNum,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#37a2da'
                    // }
                  }
                },
                {
                  name: '月销总量(万)',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  data: xMonth,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#32c5e9'
                    // }
                  }
                },
                {
                  name: '日销总量(万)',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    normal: {
                      show: false,
                      position: 'left'
                    }
                  },
                  data: xDay,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#67e0e3'
                    // }
                  }
                }
              ]
            };
            chart1.setOption(option);
            return chart1;
          });
        }).exec()
        // chart1.setOption({
        //   yAxis: {
        //     data: xdata2,
        //   },
        //   series: [
        //     { data: xMonth },
        //     { data: xDay },
        //     { data: xNum },
        //   ]
        // });

      },
      error: function (e) {

      }
    })
  },
  getPlInfo(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/takecategoryreport/',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let xdata2 = [], xMonth = [], xDay = [], xNum = [];
        res.data.list.forEach(function (value, index, arrSelf) {
          xdata2.push(value.classify);
          xMonth.push(value.month);
          xDay.push(value.day);
          xNum.push(value.number);
        });
        var query = wx.createSelectorQuery();
        query.select('#detailItem-info2').boundingClientRect((res) => {
          let width = res.width;
          let height = res.height;
          that.barComponent2.init((canvas, width, height) => {
            // 初始化图表
            const chart2 = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            canvas.setChart(chart2);
            var option = {
              color: ['#37a2da', '#32c5e9', '#67e0e3'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                confine: true
              },
              legend: {
                data: ['商家数(家)', '月销总量(万)', '日销总量(万)']
              },
              grid: {
                left: 20,
                right: 20,
                bottom: 15,
                top: 40,
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  axisTick: { show: false },
                  data: xdata2,
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
                    rotate: 300,
                    margin: 5,
                    color: '#666'
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  axisTick: { show: false },
                  data: xdata2,
                  axisLine: {
                    lineStyle: {
                      color: '#999'
                    }
                  },
                  axisLabel: {
                    color: '#666'
                  }
                }
              ],
              series: [
                {
                  name: '商家数(家)',
                  type: 'bar',
                  label: {
                    normal: {
                      show: false,
                      position: 'inside'
                    }
                  },
                  data: xNum,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#37a2da'
                    // }
                  }
                },
                {
                  name: '月销总量(万)',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  data: xMonth,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#32c5e9'
                    // }
                  }
                },
                {
                  name: '日销总量(万)',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    normal: {
                      show: false,
                      position: 'left'
                    }
                  },
                  data: xDay,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#67e0e3'
                    // }
                  }
                }
              ]
            };
            chart2.setOption(option);
            return chart2;
          });
        }).exec()
      },
      error: function (e) {

      }
    })
  },
  //品牌概况
  getPpInfo(){
    var that = this;
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/takebrandprofile/',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          ppInfo: res.data.sum,
          ppquanguo: res.data.quanguo
        })
        console.log(that.data.ppInfo);
        let xdata2 = [], xBrand = [], xNum = [];
        res.data.list.forEach(function (value, index, arrSelf) {
          xdata2.push(value.classify);
          xBrand.push(value.brand);
          xNum.push(value.number);
        });
        var query = wx.createSelectorQuery();
        query.select('#detailItem-info3').boundingClientRect((res) => {
          let width = res.width;
          let height = res.height;
          that.barComponent3.init((canvas, width, height) => {
            // 初始化图表
            const chart3 = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            canvas.setChart(chart3);
            var option = {
              color: ['#37a2da', '#32c5e9'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                confine: true
              },
              legend: {
                data: ['品牌数', '商家数']
              },
              grid: {
                left: 20,
                right: 20,
                bottom: 15,
                top: 40,
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  axisTick: { show: false },
                  data: xdata2,
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
                    rotate: 270,
                    margin: 5,
                    color: '#666'
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  axisTick: { show: false },
                  axisLine: {
                    lineStyle: {
                      color: '#999'
                    }
                  },
                  axisLabel: {
                    color: '#666'
                  }
                }
              ],
              series: [
                {
                  name: '商家数',
                  type: 'bar',
                  label: {
                    normal: {
                      show: false,
                      position: 'inside'
                    }
                  },
                  data: xNum,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#37a2da'
                    // }
                  }
                },
                {
                  name: '品牌数',
                  type: 'bar',
                  label: {
                    normal: {
                      show: false,
                      position: 'inside'
                    }
                  },
                  data: xBrand,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#37a2da'
                    // }
                  }
                },
              ]
            };
            chart3.setOption(option);
            return chart3;
          });
        }).exec()
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
    if (e.target.dataset.type == 1){
      that.getPlInfo();
    } else if (e.target.dataset.type == 2){
      that.getPpInfo();
    }
  },
  phonecallevent: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone
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