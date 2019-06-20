const app = getApp()
Page({
  data: {
    address_id:'',
    gender: ['隐藏','男', '女'],
    sex: 0,
    region: ['所在地区', '', ''],
    regionColor: '#999',
    receiver: '',
    receiverPhone: '',
    receiverAddress: '',
    isDefault: false,
    addressId: ''
  },
  bindGenderChange: function(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
      regionColor: '#222',
    })
  },
  getReceiver: function(e) {
    this.setData({
      receiver: e.detail.value,
    })
  },
  getReceiverPhone: function(e) {
    this.setData({
      receiverPhone: e.detail.value,
    })
  },
  getReceiverAddress: function(e) {
    this.setData({
      receiverAddress: e.detail.value,
    })
  },
  switchChange: function(e) {
    this.setData({
      isDefault: e.detail.value,
    })
    console.log(this.data.isDefault);
  },
  showToast(e) {
    wx.showToast({
      title: e,
      icon: 'none',
      duration: 2000
    });
  },
  addshipadd() {
    if (this.data.receiver == '') {
      this.showToast('收货人不能为空');
      return;
    } else if (this.data.receiverPhone == '') {
      this.showToast('手机号码不能为空');
      return;
    } else if (this.data.region[0] == '所在地区') {
      this.showToast('所在地区不能为空');
      return;
    } else if (this.data.receiverAddress == '') {
      this.showToast('详细地址不能为空');
      return;
    }
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.receiverPhone))) {
      wx.showToast({
        title: '手机号码有误,请重填',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    var that = this;
    var type = 0;
    if(that.data.isDefault){
      type = 1;
    }
    if (app.isEmpty(that.data.address_id)){
      wx.request({
        url: app.globalData.httpsurl + 'addressincrease/',
        // data: { user_id: app.globalData.userid },
        data: {
                user_id: app.globalData.userid,
                the_consignee: that.data.receiver,
                gender: that.data.gender[that.data.sex],
                phone: that.data.receiverPhone,
                region:that.data.region,
                detailed: that.data.receiverAddress,
                type: type,
          },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {//服务器返回数据
          console.log(res);
          if (res.data.code == 200) {
            that.showToast(res.data.list);
            wx.navigateBack({
              delta: 1,
            })
          } else if (res.data.code == 102){
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
                  
                }
              }
            })
          }
          else{
            that.showToast(res.data.error);
          }
        },
        error: function (e) {

        }
      })
    }else{
      wx.request({
        url: app.globalData.httpsurl + 'addressalter/',
        // data: { user_id: app.globalData.userid },
        data: {
          user_id: app.globalData.userid,
          address_id:that.data.address_id,
          the_consignee: that.data.receiver,
          gender: that.data.gender[that.data.sex],
          phone: that.data.receiverPhone,
          region: that.data.region,
          detailed: that.data.receiverAddress,
          type: type,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {//服务器返回数据
          console.log(res);
          if (res.data.code == 200) {
            that.showToast(res.data.list);
            wx.navigateBack({
              delta: 1,
            })
          }else {
            that.showToast(res.data.error);
          }
        },
        error: function (e) {

        }
      })
    }
  },

  onLoad: function(options) {
    var that = this;
    if (typeof (options.addressInfo) != "undefined"){
      var addressInfo = JSON.parse(options.addressInfo);
      console.log(addressInfo);
      for (var i = 0; i < that.data.gender.length;i++){
        if(that.data.gender[i] == addressInfo.gender){
          that.setData({
            sex:i
          })
        }
      }
      if(addressInfo.type == 1){
        that.setData({
          isDefault: true
        })
      }
      that.setData({
        address_id: addressInfo.address_id,
        receiver: addressInfo.name,
        receiverPhone:addressInfo.phone,
        'region[0]': addressInfo.region,
        receiverAddress: addressInfo.detailed,
      })
    }
  },
  onShow(){
   
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