import QQMapWX from '../../utils/qqmap-wx-jssdk.min.js'
const qqmapsdk = new QQMapWX({
  key: '3HLBZ-QAHCW-2AER2-RIYTU-QSYMT-MUFTF'
});
const app = getApp()
Page({
  data: {
    formats: {
      html:'',
    },
    bottom: 0,
    readOnly: false,
    placeholder: '编辑菜谱详情...',
    _focus: false,
    imgPaths: [],
    videoSrc:'',
    videoId:[],
    infoDetail: {
      transfer: 0,
      registration: 0,
      courier: 0,
    },
    ingredientsList:[
      {
        ingredientsName:'',
        ingredientsNum:'',
      }
    ],
    address: '',
    //发布类别 0:店面，1人才，2闲置，3有话说
    releaseType: 0,
    array: [{ value: 0, name: '否' },
    { value: 1, name: '是' }]
  },
  bindPickerChange: function (e) {
    this.data.infoDetail.transfer = e.detail.value;
    this.setData({
      infoDetail: this.data.infoDetail
    })
  },
  bindPickerChange2: function (e) {
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
  addItem(){
    var that=this;
    let newItem = {
      ingredientsName: '',
      ingredientsNum: '',
    };
    that.data.ingredientsList.push(newItem);
    that.setData({
      ingredientsList: that.data.ingredientsList,
    })
  },
  inputingredientsName(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    that.data.ingredientsList[index].ingredientsName = e.detail.value;
    that.setData({
      ingredientsList: that.data.ingredientsList,
    })
  },
  inputingredientsNum(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    that.data.ingredientsList[index].ingredientsNum = e.detail.value;
    that.setData({
      ingredientsList: that.data.ingredientsList,
    })
  },
  inputName(e) {
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
  inputTreatment(e) {
    var that = this;
    that.data.infoDetail.treatment = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputRequirements(e) {
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
  inputFirstrent(e) {
    var that = this;
    that.data.infoDetail.firstrent = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputAbortrent(e) {
    var that = this;
    that.data.infoDetail.abortrent = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputTitle(e) {
    var that = this;
    that.data.infoDetail.title = e.detail.value;
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
  inputHot(e) {
    var that = this;
    that.data.infoDetail.hot = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputGoods(e) {
    var that = this;
    that.data.infoDetail.goods = e.detail.value;
    that.setData({
      infoDetail: that.data.infoDetail,
    })
  },
  inputLabel(e) {
    var that = this;
    that.data.infoDetail.label = e.detail.value;
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
  deleteImg(e) {
    var that = this;
    let index = e.currentTarget.dataset.id;
    that.data.imgPaths.splice(index, 1);
    that.setData({
      imgPaths: that.data.imgPaths,
    })
  },
  addVideo(){
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 1800,
      camera: 'back',
      success(res) {
        that.setData({
          videoSrc: res.tempFilePath,
        })
        wx.uploadFile({
          url: app.globalData.httpsurl2 + 'dealer/backvideo/', 
          filePath: that.data.videoSrc,
          name: 'file',
          formData: {
            category:'视频',
          },
          success(res) {
            const iddata = JSON.parse(res.data);
            let videoId = [];
            videoId.push(iddata.id);
            that.setData({
              videoId: videoId,
            })
          }
        })
      }
    })
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    var that = this;
    that.setData({
      address: app.globalData.loacationCity
    })
  },
  //提交审核
  submitInfo() {
    var that = this;
    //发布菜谱
    let photo = [];
    for(let i=0;i<that.data.imgPaths.length;i++){
      photo.push(that.data.imgPaths[i].id)
    }
    photo = JSON.stringify(photo)
    if (that.data.releaseType == 0) {
      if (app.isEmpty(that.data.infoDetail.goods)) {
        wx.showToast({
          title: '请输入菜品',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.label)) {
        wx.showToast({
          title: '请输入标签',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.hot)) {
        wx.showToast({
          title: '请输入火爆地区',
          icon: 'none',
        })
      } else if (app.isEmpty(that.data.infoDetail.abstract)) {
        wx.showToast({
          title: '请输入简介',
          icon: 'none',
        })
      } else {
        that.data.ingredientsList = JSON.stringify(that.data.ingredientsList);
        that.data.videoId = JSON.stringify(that.data.videoId);
        wx.request({
          url: app.globalData.httpsurl2 + 'wx/hotvideoadd/',
          data: {
            user_id: app.globalData.userid,
            goods: that.data.infoDetail.goods,
            labels: that.data.infoDetail.label,
            hot: that.data.infoDetail.hot,
            abstract: that.data.infoDetail.abstract,
            video: that.data.videoId,
            photo: photo,
            specification: that.data.ingredientsList,
            richtext: that.data.formats.html,
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
    // const formats = e.detail
    // this.setData({ formats })
    // console.log(this.data.formats.html);
  },
  inputDetail(e) {
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
