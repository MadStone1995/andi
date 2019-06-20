import QQMapWX from '../../utils/qqmap-wx-jssdk.min.js'
const qqmapsdk = new QQMapWX({
  key: '3HLBZ-QAHCW-2AER2-RIYTU-QSYMT-MUFTF'
});
const app = getApp()
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '编辑资讯详情...',
    _focus: false,
    imgPaths:[],
    infoDetail:{
      transfer:0,
      registration:0,
      courier:0,
    },
    address:'',
    //发布类别 0:店面，1人才，2闲置，3有话说
    releaseType:0,
    array:[{value: 0,name: '否' },
          {value: 1,name: '是'}]
  },
  bindPickerChange: function (e) {
    this.data.infoDetail.transfer= e.detail.value;
    this.setData({
      infoDetail: this.data.infoDetail
    })
  },
  bindPickerChange2:function(e) {
    this.data.infoDetail.registration = e.detail.value;
    this.setData({
      infoDetail: this.data.infoDetail
    })
  },
  bindPickerChange3: function (e) {
    this.data.infoDetail.courier = e.detail.value;
    this.setData({
      infoDetail: this.data.infoDetail
    })
  },
  inputName(e){
    var that = this;
    that.data.infoDetail.name = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputPhone(e) {
    var that = this;
    that.data.infoDetail.phone = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputType(e) {
    var that = this;
    that.data.infoDetail.type = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputTechnology(e) {
    var that = this;
    that.data.infoDetail.technology = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputDescribe(e) {
    var that = this;
    that.data.infoDetail.describe = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputCompany(e) {
    var that = this;
    that.data.infoDetail.company = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputAddress(e) {
    var that = this;
    that.data.infoDetail.address = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputWorkingtime(e) {
    var that = this;
    that.data.infoDetail.working_time = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputTreatment(e){
    var that = this;
    that.data.infoDetail.treatment = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputRequirements(e){
    var that = this;
    that.data.infoDetail.requirements = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputArea(e) {
    var that = this;
    that.data.infoDetail.area = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputFirstrent(e){
    var that = this;
    that.data.infoDetail.firstrent = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputAbortrent(e){
    var that = this;
    that.data.infoDetail.abortrent = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputTitle(e){
    var that = this;
    that.data.infoDetail.title = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputAbstract(e){
    var that = this;
    that.data.infoDetail.abstract = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputPrice(e){
    var that = this;
    that.data.infoDetail.price = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputGoods(e){
    var that = this;
    that.data.infoDetail.goods = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputAbstract(e) {
    var that = this;
    that.data.infoDetail.abstract = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  uploadImg() {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'], // 指定压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var newList = that.data.imgPaths;
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            wx.request({
              url: app.globalData.httpsurl2 + 'wx/wximage/',
              data: {
                file: res.data
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              method: 'POST',
              success: res => {
                if (res.data.code == 200) {
                  let imgPathItem = res.data.list;
                  newList.push.apply(newList, imgPathItem);
                  that.setData({
                    imgPaths: newList
                  })
                } else {
                  that.setData({
                    showMsg: res.data.error
                  })
                }

              }
            })
          }
        })
      }
    })
  },
  deleteImg(e){
    var that = this;
    let index = e.currentTarget.dataset.id;
      that.data.imgPaths.splice(index, 1);
      that.setData({
        imgPaths: that.data.imgPaths,
      })
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad(option) {
    var that = this;
    that.setData({
      releaseType: option.releaseType,
      address: app.globalData.loacationCity
    })
  },
  //提交审核
  submitInfo(){
    var that = this;
    //发布店面
    if(that.data.releaseType == 0){
      if (app.isEmpty(that.data.infoDetail.name)){
        wx.showToast({
          title: '请输入联系人',
          icon:'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.phone)) {
        wx.showToast({
          title: '请输入联系方式',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.type)) {
        wx.showToast({
          title: '请输入门店营业',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.area)) {
        wx.showToast({
          title: '请输入门店面积',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.firstrent)) {
        wx.showToast({
          title: '请输入最低租金',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.abortrent)) {
        wx.showToast({
          title: '请输入最高租金',
          icon: 'none',
        })
      }else{
        wx.request({
          url: app.globalData.httpsurl2 + 'wx/housingadd/',
          data: {
            user_id: app.globalData.userid,
            name: that.data.infoDetail.name,
            city: that.data.address,
            area: that.data.infoDetail.area,
            firstrent: that.data.infoDetail.firstrent,
            abortrent: that.data.infoDetail.abortrent,
            transfer: that.data.infoDetail.transfer,
            registration: that.data.infoDetail.registration,
            phone: that.data.infoDetail.phone,
            type: that.data.infoDetail.type,
            note: '',
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          success: res => {
              if(res.data.code == 200){
                wx.showToast({
                  title: '提交成功',
                  icon:'success',
                })
                var timeOut = setTimeout(function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 1500)
              }
          }
        })
      }
      //发布人才
    } else if (that.data.releaseType == 1) {
      if (app.isEmpty(that.data.infoDetail.name)) {
        wx.showToast({
          title: '请输入联系人',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.phone)) {
        wx.showToast({
          title: '请输入联系方式',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.technology)) {
        wx.showToast({
          title: '请输入职位',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.describe)) {
        wx.showToast({
          title: '请输入工作内容',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.company)) {
        wx.showToast({
          title: '请输入公司',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.address)) {
        wx.showToast({
          title: '请输入工作地点',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.working_time)) {
        wx.showToast({
          title: '请输入工作时长',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.treatment)) {
        wx.showToast({
          title: '请输入薪资待遇',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.requirements)) {
        wx.showToast({
          title: '请输入要求',
          icon: 'none',
        })
      }else {
        wx.request({
          url: app.globalData.httpsurl2 + 'wx/recruitmentadd/',
          data: {
            user_id: app.globalData.userid,
            name: that.data.infoDetail.name,
            city: that.data.address,
            technology: that.data.infoDetail.technology,
            describe: that.data.infoDetail.describe,
            company: that.data.infoDetail.company,
            address: that.data.infoDetail.address,
            working_time: that.data.infoDetail.working_time,
            phone: that.data.infoDetail.phone,
            treatment: that.data.infoDetail.treatment,
            requirements: that.data.infoDetail.requirements,
            note: '',
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          success: res => {
            if (res.data.code == 200) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
              })
              var timeOut = setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1500)
            }
          }
        })
      }
      //发布闲置
    } else if (that.data.releaseType == 2) {
      if (app.isEmpty(that.data.infoDetail.name)) {
        wx.showToast({
          title: '请输入联系人',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.phone)) {
        wx.showToast({
          title: '请输入联系方式',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.goods)) {
        wx.showToast({
          title: '请输入物品',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.abstract)) {
        wx.showToast({
          title: '请输入商品简介',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.price)) {
        wx.showToast({
          title: '请输入价格',
          icon: 'none',
        })
      }else {
         let photo = [];
        for(let i=0;i<that.data.imgPaths.length;i++){
          photo.push(that.data.imgPaths[i].id)
        }
        photo = JSON.stringify(photo)
        wx.request({
          url: app.globalData.httpsurl2 + 'wx/replacementadd/',
          data: {
            user_id: app.globalData.userid,
            name: that.data.infoDetail.name,
            phone: that.data.infoDetail.phone,
            city: that.data.address,
            goods: that.data.infoDetail.goods,
            price: that.data.infoDetail.price,
            courier: that.data.infoDetail.courier,
            abstract: that.data.infoDetail.abstract,
            photo: photo,
            note: '',
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          success: res => {
            if (res.data.code == 200) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
              })
              var timeOut = setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1500)
            }
          }
        })
      }
    } else if (that.data.releaseType == 3) {
      if (app.isEmpty(that.data.infoDetail.title)) {
        wx.showToast({
          title: '请输入话题内容',
          icon: 'none',
        })
      }else {
        let photo = [];
        for (let i = 0; i < that.data.imgPaths.length; i++) {
          photo.push(that.data.imgPaths[i].id)
        }
        photo = JSON.stringify(photo)
        wx.request({
          url: app.globalData.httpsurl2 + 'wx/postingadd/',
          data: {
            user_id: app.globalData.userid,
            title:that.data.infoDetail.title,
            abstract: '简介',
            address:that.data.address,
            richtext: '富文本',
            photo:photo,
            note:'备注',
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          success: res => {
            if (res.data.code == 200) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
              })
              var timeOut = setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1500)
            }
          }
        })
      }
    }
    // let photo = [];
    // for(let i=0;i<that.data.imgPaths.length;i++){
    //   photo.push(that.data.imgPaths[i].id)
    // }
    // photo = JSON.stringify(photo)
    // wx.request({
    //   url: app.globalData.httpsurl2 + 'wx/postingadd/',
    //   data: {
    //     user_id: app.globalData.userid,
    //     // user_id: 1,
    //     title:that.data.infoDetail.title,
    //     abstract: that.data.infoDetail.abstract,
    //     address:that.data.address,
    //     richtext: that.data.formats.html,
    //     photo:photo,
    //     note:'',
    //     type:'1',
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //   },
    //   method: 'POST',
    //   success: res => {
     
    //   }
    // })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },

  undo() {
    this.editorCtx.undo()
  },
  redo() {
    this.editorCtx.redo()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  inputDetail(e){
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
       
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
      
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      sizeType: ['compressed'], // 指定压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            wx.request({
              url: app.globalData.httpsurl2 + 'wx/wximage/',
              data: {
                file: res.data
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              method: 'POST',
              success: res => {
                if (res.data.code == 200) {
                  that.editorCtx.insertImage({
                    src: res.data.list[0].url,
                    data: {
                      id: 'abcd',
                      role: 'god'
                    },
                    success: function () {
                  
                    }
                  })
               
                } else {
                  that.setData({
                    showMsg: res.data.error
                  })
                }

              }
            })
          }
        })
      }
    })
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
