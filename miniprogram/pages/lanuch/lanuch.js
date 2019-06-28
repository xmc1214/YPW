// pages/lanuch/lanuch.js
var that;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: [{
        title: '发布活动',
        src: '/images/activity.png',
        time: 0.5,
      },
      {
        title: '发布约拍',
        src: '/images/camera.png',
        time: 1,
        url: '/pages/lanuch/yuePai/yuePai'
      },
      {
        title: '上传作品',
        src: '/images/work.png',
        time: 1.5,
        url: '/pages/lanuch/work/work'
      }
    ],
    toggleDelay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    that.setData({
      toggleDelay: true
    })
    setTimeout(function() {
      that.setData({
        toggleDelay: false
      })
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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

  openLaunch: function(e) {
    let item = e.currentTarget.dataset.item
    if (item.title === '发布活动') {
      wx.showToast({
        title: '暂未开通，敬请期待',
        icon: 'none',
        duration: 1500
      })
    } else {
      // if (!app.globalData.isAuth) {
      //   wx.showModal({
      //     title: '权限提示',
      //     content: '请先完成实名认证',
      //     showCancel: true,
      //     cancelText: '取消',
      //     confirmText: '去认证',
      //     confirmColor: '#5397ff',
      //     success: function(res) {
      //       if (res.confirm) {
      //         wx.redirectTo({
      //           url: '/pages/userCenter/authenticationCenter/authenticationCenter',
      //         })
      //       } else {

      //       }
      //     }
      //   })
      // }else{
      //   wx.navigateTo({
      //     url: item.url
      //   })
      // }
      wx.navigateTo({
          url: item.url
        })
    }

  }
})