// pages/userCenter/authenticationCenter/authenticationCenter.js
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    picker:['人脸识别','拍照上传身份证'],
    realName:'',
    authNumber:'',
    isAgree: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
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
  PickerChange:function(e){
    that.setData({
      index: e.detail.value
    })
  },
  getRealName:function(e){
    that.setData({
      realName:e.detail.value
    })
  },
  getAuthNumber: function (e) {
    that.setData({
      authNumber: e.detail.value
    })
  },
  submit:function(e){
    let authNumber = that.data.authNumber
    let realName = that.data.realName
    if(authNumber === '' || realName === ''|| !that.data.isAgree){
      wx.showToast({
        title: '请完善信息后提交',
        icon:'none',
        duration:1500
      })
    }else{
      if(that.data.index === 0){
        wx.showToast({
          title: '暂不支持人脸识别认证方式',
          icon:'none',
          duration:1500
        })
      }
      if(that.data.index === 1){
        wx.navigateTo({
          url: '/pages/userCenter/authenticationCenter/IDCardOCR?realName=' + that.data.realName +'&&authNumber=' + that.data.authNumber,
        })
      }
    }
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
})