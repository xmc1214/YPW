// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:["/images/icons/yaoqing.png","/images/icons/tongzhi.png","/images/icons/wodeqingqiu.png"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getYaoQing:function(e){
    wx.navigateTo({
      url: '/pages/message/getInvite/getInvite',
    })
  },
  sendYaoQing:function(e){
    wx.navigateTo({
      url: '/pages/message/senInvite/sendInvite',
    })
  },
  getQingQiu:function(e){
    wx.showToast({
      title: '您暂未发布活动，请先发布活动',
      icon: 'none',
      duration: 2000

    })
  }
})