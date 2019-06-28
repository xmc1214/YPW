// pages/index/pickYou/pickYou.js
var that
var util = require('/../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    title: '我要约拍',
    disabled: true,
    files: [],
    max: 200,
    currentNumber: 0,
    maximage: 2,
    ypRequestInfo:{
      explain:'',
      phoneNumber:'',
      wechatNumber:'',
      hopeTime:'暂无',
      auth:'暂无',
      hisOpenId:'',
      openId:'',
      launchTime: util.formatTime(new Date())
    },
    picker: ['摄影师', '摄影爱好者', '摄影工作室'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
that = this
that.setData({
  ['ypRequestInfo.hisOpenId']:options.hisOpenId,
  ['ypRequestInfo.openId']:wx.getStorageSync("userInfo").openId
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

  },
  check: function (e) {
    var inputValue = e.detail.value;
    var len = parseInt(inputValue.length);
    if (len > this.data.max) return;
    this.setData({
      currentNumber: len
    })
    if (inputValue != '') {
      this.setData({
        disabled:false,
        ['ypRequestInfo.explain']: inputValue
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  chooseImage: function (e) {
    
    if (that.data.files.length >= that.data.maximage) return;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  getPhoneNumber:function(e){
    that.setData({
      ['ypRequestInfo.phoneNumber']:e.detail.value
    })
  },
  getWechatNumber: function (e) {
    that.setData({
      ['ypRequestInfo.wechatNumber']: e.detail.value
    })
  },
  PickerChange(e) {
    that.setData({
      ['ypRequestInfo.auth']: that.data.picker[e.detail.value]
    })
  },
  DateChange(e) {
    that.setData({
      ['ypRequestInfo.hopeTime']: e.detail.value
    })
  },
  submitAf:function(e){
    that.setData({
      loading: true,
      title: '正在提交请求',
      disabled: true
    })
    wx.cloud.callFunction({
      name:'ypRequestListCURD',
     data:{
       type:'add',
       ypRequestInfo: that.data.ypRequestInfo
     },
     success:res=>{
       wx.showToast({
         title: '约拍成功',
         icon: 'success',
         duration: 1000
       })
      setTimeout(function(){
        wx.navigateBack({

        })
      },1000)
     },
     fail:err=>{
       console.log(err)
       wx.showToast({
         title: '约拍失败',
         icon: 'none',
         duration: 1000
       })
     },
     complete:res=>{
        let  ypRequestInfo = {
          explain:'',
          phoneNumber:'',
          wechatNumber:'',
          hopeTime:'暂无',
          auth:'暂无',
          hisOpenId:'',
          openId:'',
          launchTime: util.formatTime(new Date())
      }
       that.setData({
         loading: false,
         title: '我要约拍',
         disabled: false,
         ypRequestInfo:ypRequestInfo
       })
     }
    })
  
  }
})