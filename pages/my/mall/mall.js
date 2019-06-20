// pages/my/mall/mall.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    items: [],
    allList:[],
    chooseArr1:[],
    chooseArr2:[],
    tjState:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.init();
  },
  init() {
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: app.globalData.httpsurl + 'getuser/',
      data: { user_id: app.globalData.userid },
      // data: { user_id: 1 },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        that.setData({
          userInfo: res.data.list
        })
      },
      error: function (e) {

      }
    })
    wx.request({
      url: app.globalData.httpsurl + 'questionnairesurvey/',
      data: { user_id: app.globalData.userid },
      // data: { user_id: 1 },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
      wx.hideLoading();
       console.log(res.data.list);
       that.setData({
         allList:res.data.list,
         tjState: res.data.state
       })
      },
      error: function (e) {

      }
    })
    
  },
  checkboxChange(e) {
    var that = this;
    if (e.detail.value.length > 5){
      wx.showToast({
        title: '选择1-5项',
        icon:'none',
        duration: 1500
      })
    }else{
      that.setData({
        chooseArr1: e.detail.value,
      })
    }
    var sum = 0;
    var itemList1 = that.data.allList[0].value;
    for (var index in itemList1){
      if (that.inArr(itemList1[index].options_id, that.data.chooseArr1)){
        itemList1[index].state = 1;
      }else{
        itemList1[index].state = 0;
      }
    }
    that.data.allList[0].value = itemList1;
    that.setData({
      allList:that.data.allList,
    })
  },
  checkboxChange2(e) {
    var that = this;
    if (e.detail.value.length > 5) {
      wx.showToast({
        title: '选择1-5项',
        icon: 'none',
        duration: 1500
      })
    } else {
      that.setData({
        chooseArr2: e.detail.value,
      })
    }
    var itemList2 = that.data.allList[1].value;
    for (var index in itemList2) {
      if (that.inArr(itemList2[index].options_id, that.data.chooseArr2)) {
          itemList2[index].state = 1;
      } else {
        itemList2[index].state = 0;
      }
    }
    that.data.allList[1].value = itemList2;
    that.setData({
      allList: that.data.allList,
    })
  },
  inArr(item,arr){
   for( var i=0; i< arr.length ; i++){
     if(item == arr[i]){
       return true;
     }
   }
   return false;
  },
  submiteInfo(){
    var that = this;
    var postList = JSON.stringify(that.data.allList);
    wx.request({
      url: app.globalData.httpsurl + 'questionnairesubmit/',
      data: { user_id: app.globalData.userid, content: postList },
      // data: { user_id: 1, content: postList},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {//服务器返回数据
        console.log(res.data);
        if (res.data.code == 200) {
          console.log(res.data.code);
          wx.showToast({
            title: '问卷已提交',
            icon: 'none',
            duration: 2500
          })
          wx.request({
            url: app.globalData.httpsurl + 'questionnairesurvey/',
            data: { user_id: app.globalData.userid },
            // data: { user_id: 1 },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: function (res) {//服务器返回数据
              console.log(res.data.list);
              that.setData({
                allList: res.data.list,
                tjState: res.data.state
              })
            },
            error: function (e) {

            }
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
            title: res.data.erroe,
            icon: 'none',
            duration: 1500
          })
        }
      },
      error: function (e) {

      }
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
})