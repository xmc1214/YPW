// pages/userCenter/advice/advice.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    hasInput: 'disabled',
    max: 200,
    currentNumber: 0,
    maximage: 2,
    message: '',
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
  check: function (e) {
    var inputValue = e.detail.value;
    var len = parseInt(inputValue.length);
    if (len > this.data.max) return;
    this.setData({
      currentNumber: len
    })
    if (inputValue != '') {
      this.setData({
        hasInput: ''
      })
    } else {
      this.setData({
        hasInput: 'disabled'
      })
    }
  },
  chooseImage: function (e) {
     that = this;
    if (that.data.files.length >= that.data.maximage) return;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        console.log(that.data.files)
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  submit: function () {
   that = this
    that.setData({
      message: ''
    })
    wx.showToast({
      title: '评价成功',
      icon: 'success',
      duration: 3000
    });
  },
})