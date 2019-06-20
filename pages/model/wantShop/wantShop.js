import * as echarts from '../../../ec-canvas/echarts';
import amapFile from '../../../utils/amap-wx.js'
import QQMapWX from '../../../utils/qqmap-wx-jssdk.min.js'
const qqmapsdk = new QQMapWX({
  key: '3HLBZ-QAHCW-2AER2-RIYTU-QSYMT-MUFTF'
});
const app = getApp()

let chart = null;
let chart1;
let chart2;
let chart3;
let chart4;
function initChart(canvas, width, height) {
  chart1 = echarts.init(canvas, null, {
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
      data: ['商家总数', '日销总数', '月销总数']
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
        data: [],
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
        name: '商家总数',
        type: 'bar',
        label: {
          normal: {
            show: false,
            position: 'inside'
          }
        },
        data:[],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '日销总数',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: '月销总数',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false,
            position: 'left'
          }
        },
        data: [],
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
}
function initChart2(canvas, width, height) {
  chart2 = echarts.init(canvas, null, {
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
        data: [],
        textStyle: {
          fontSize: 25
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          intervar:0,
          rotate:300,
          margin:5,
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
            show: false,
            position: 'inside'
          }
        },
        data: [],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
    ]
  };

  chart2.setOption(option);
  return chart2;
}
function initChart3(canvas, width, height) {
  chart3= echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart3);
  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE"],
    series: [{
      label: {
        normal: {
          fontSize: 14,
          formatter: '{b}: {d}%',
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart3.setOption(option);
  return chart3;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    },
    ec3: {
      onInit: initChart3
    },
    ec4: {
     lazyLoad: true
    },
    src:'',
    array: ['奶茶', '甜品', '咖啡', '蛋糕'],
    region: ['浙江省', '杭州市'],
    customItem: '请选择',
    productType:'',
    detailaddress:'',
    chooseItem:1,
    isshow:false,
    shopList:[],
    page:1,
    limit:10,
    heightInfo:100,
    canLoad:true,
    loading:false,
    currentLo:'',
    currentLa:'',
    ppName:'',
    flag:false,
    menu:[],
    ppSumInfo:{},
    ppInfoList:[],
    detailInfo:{
      
    },
    // typeList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // that.getMap();
    that.getTypeList();
    that.getHeight();
    this.barComponent = this.selectComponent('#mychart-dom-bar4');
    wx.getLocation({
      success(res) {
        that.setData({
          currentLo: res.longitude,
          currentLa: res.latitude,
          includePoints: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],
          markers: [{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            width: 32,
            height: 32
          }]
        });
      }
    })
  },
  chooseAddress: function () {
    this.setData({
      isshow: true
    })
  },
  inputAddress(e) {
    var that = this;
    that.data.detailaddress = e.detail.value;
    that.setData({
      detailaddress: that.data.detailaddress,
    })
  },
  inputPp(e) {
    var that = this;
    if (that.data.ppName != e.detail.value) {
      that.data.ppName = e.detail.value;
      that.setData({
        ppName: that.data.ppName,
      })
      wx.request({
        url: app.globalData.httpsurl2 + 'merchants/brandquery/',
        data: { shop_name_short: e.detail.value},
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if (res.data.code == 200) {
            if (res.data.list != undefined) {
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
          }else{
            wx.showToast({
              title: res.data.error,
              icon:'none',
            })
          }
         
          
        },
        error: function (e) {

        }
      })
    }
    
  },
  select: function (e) {
    var name = e.currentTarget.dataset.name;
    var that = this
    that.setData({
      ppName:name,
      flag: false
    })
  },
  submitPp(){
    var that = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/branddrawing/',
      data: { shop_name_short: that.data.ppName, userid: app.globalData.userid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          that.setData({
            ppSumInfo: res.data.sum,
          })
          var treeList = res.data.list;
          var query = wx.createSelectorQuery();
          query.select('#detailItem-info3').boundingClientRect((res) => {
            let width = res.width;
            let height = res.height;
            that.barComponent.init((canvas, width, height) => {
              // 初始化图表
              const chart4 = echarts.init(canvas, null, {
                width: width,
                height: height
              });
              canvas.setChart(chart4);
              var option = {
                series: [{
                  type: 'tree',
                  data: [treeList],
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
              chart4.setOption(option);
              return chart4;
            });
          }).exec()
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
            icon: 'none',
          })
        }
      },
      error: function (e) {

      }
    })
  },
  // 地区选择
  sureSelectAreaListener: function (e) {
    var that = this;
    that.data.region[0] = e.detail.currentTarget.dataset.province;
    that.data.region[1] = e.detail.currentTarget.dataset.city;
    that.setData({
      isshow: false,
      region: that.data.region,
    })
  },
  getMap(){
    var that = this;
    let address = that.data.region[0] + that.data.region[1]+ that.data.detailaddress
    qqmapsdk.search({
      keyword: address,  //搜索关键词
      //  location: '39.980014,116.313972', 
      success: function (res) { //搜索成功后的回调
      console.log(res.data);
        that.setData({
          currentLo: res.data[0].location.lng,
          currentLa: res.data[0].location.lat,
          markers: [{
            longitude: res.data[0].location.lng,
            latitude: res.data[0].location.lat,
            title: res.address,
            width: 32,
            height: 32
          }]
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
      });
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  getHeight(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          heightInfo: res.windowHeight - 350,
        })
      },
    })
  },
  getTypeList(){
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
          array:res.data.list,
        })
      },
      error: function (e) {

      }
    })
  },
  submitAddInfo(){
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/categoryquery/',
      data: { page: 1, limit: 10, province: that.data.region[0], city: that.data.region[1], classify: that.data.productType, userid: app.globalData.userid},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          that.setData({
            shopList: res.data.list,
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
        }else{
          wx.showToast({
            title: res.data.error,
            icon:'none'
          })
        }
       
      },
      error: function (e) {

      }
    })
  },
  detailAddress() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    that.getMap();
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/locationreference/',
      data: { province: that.data.region[0], city: that.data.region[1], address: that.data.detailaddress, userid: app.globalData.userid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          that.setData({
            detailInfo: res.data,
          })
          let xdata = [], ydata = [];
          res.data.ranking.forEach(function (value, index, arrSelf) {
            xdata.push(value.name);
            ydata.push(value.sales);
          });
          chart2.setOption({
            xAxis: {
              data: xdata,
            },
            series: [{
              data: ydata,
            }]
          });
          let xdata2 = [], xMonth = [], xDay = [], xNum = [];
          res.data.classify.forEach(function (value, index, arrSelf) {
            xdata2.push(value.name);
            xMonth.push(value.month);
            xDay.push(value.day);
            xNum.push(value.number);
          });
          chart1.setOption({
            yAxis: {
              data: xdata2,
            },
            series: [
              { data: xNum },
              { data: xDay },
              { data: xMonth },
            ]
          });
          let xring = [], ring = [];
          res.data.interval.forEach(function (value, index, arrSelf) {
            xring.push(value.area);
            ring.push({
              name: value.area,
              value: value.number
            });
          });
          chart3.setOption({
            series: [
              { data: ring },
            ]
          });
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
  loadMoreShop(){
    var that = this;
    if(that.data.canLoad){
      that.setData({
        canLoad:false,
        loading:true,
      })
    that.data.page = that.data.page+1;
    wx.request({
      url: app.globalData.httpsurl2 + 'merchants/categoryquery/',
      data: { page: that.data.page, limit: 10, province: that.data.region[0], city: that.data.region[1], classify: that.data.productType, userid: app.globalData.userid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if(res.data.code == 200){
          var newList = that.data.shopList;
          newList.push.apply(newList, res.data.list);
          that.setData({
            loading:false,
            shopList: newList,
            page:that.data.page,
            canLoad: true,
          })
        }else if (res.data.code == 102) {
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
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerChange(e) {
    var item = e.detail.value;
    var type = this.data.array[item];
    this.setData({
      productType: type
    })
  },
  chooseType(e){
    var that =this;
    that.setData({
      chooseItem: e.target.dataset.type
    })
    if (e.target.dataset.type == 2){
   
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