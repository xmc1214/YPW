// pages/userCenter/club/clubDetail.js
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: ["1.尊贵标识,彰显特殊身份",
      "2.发布信息无需审核（敏感信息除外）",
      "3.安全约拍，自动约拍担保",
      "4.平台福利，优先领取和发放",
      "5.天使用户，抢先体验平台最新功能"
    ],
    vipList: [{
      number: 1,
      price: 18.00
    }, {
      number: 3,
      price: 45.00
    }, {
      number: 6,
      price: 93.00
    }, {
      number: 12,
      price: 178.00
    }],
    vipInfo:{},
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
that = this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  buyVip:function(e){
    that.setData({
      vipInfo:e.currentTarget.dataset.item,
      isShow:true
    })
  },
  hideModal:function(e){
    that.setData({
      isShow:false
    })
  },
  payForVip:function(e){
    that.setData({
      isShow:false
    })
    wx.showLoading({
      title: '请求中',
      mask: true,
      success: function(res) {

      },
      fail: function(res) {

      },
      complete: function(res) {

      },
    })
    setTimeout(function(){
      wx.hideLoading()
      wx.showToast({
        title: '成功开通',
        icon: 'success',
        duration: 1000
      })
    },1000)
  }
})