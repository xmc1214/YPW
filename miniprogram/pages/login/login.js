// pages/login/login.js
var that
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '开启约拍之旅',
    loading:false
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
    wx.hideToast()
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
  getuserinfo: function(e) {
    if(!e.detail.userInfo){
      wx.showToast({
        title: '授权失败',
        icon:'none',
        duration:1500
      })
    }else{
      let userInfo = e.detail.userInfo
      that.setData({
        loading: true
      })
      if (!wx.getStorageSync("userInfo")) {
        wx.setStorageSync("userInfo", userInfo)
        wx.cloud.callFunction({
          name: 'login',
          data: {
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            gender: userInfo.gender
          },
          success: res => {
            console.log(res)
            wx.showToast({
              title: '进入主页中',
              icon: 'loading',
            })
            wx.switchTab({
              url: '/pages/index/index',
            })
          },
          fail: res => {
            wx.showToast({
              title: '授权失败',
              icon: 'none',
              duration: 1500
            })
          }
        })
      } else {
        wx.showToast({
          title: '进入主页中',
          icon: 'loading',
        })
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    }
  }
})