// miniprogram/pages/userCenter/authenticationCenter/IDCardOCR.js
let that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realName: '',
    authNumber: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    console.log(options)
    that.setData({
      realName: options.realName,
      authNumber: options.authNumber
    })
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
  handleFinish(e) {
    if (!e.detail) {
      return
    }
    let authDetail = e.detail
    console.log(authDetail)
    if (authDetail.realName != that.data.Name) {
      wx.showToast({
        title: '认证失败,真实姓名不符,请重新认证',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function(){
        wx.navigateBack({

        })
      },1500)
    } else
    if (authDetail.authNumber != that.data.IdNum) {
      wx.showToast({
        title: '认证失败,证件号码不符,请重新认证',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function() {
        wx.navigateBack({

        })
      }, 1500)
    } else {
      wx.showToast({
        title: '认证成功',
        icon: 'success',
        duration: 1500
      })
      let authInfo = authDetail
      wx.cloud.callFunction({
        name: 'authInfoCURD',
        data: {
          type:'add',
          authInfo: authInfo
        },
        success: res => {
          console.log(res)
          wx.showToast({
            title: '保存认证信息中',
            icon: 'loading'
          })
          wx.cloud.callFunction({
            name:'authInfoCURD',
            data:{
              type:'update',
              isAuth:true
            },
            success:res=>{
              wx.hideToast()
              wx.setStorage({
                key: 'authInfo',
                data: authDetail,
              })
              app.globalData.isAuth = true
            },
            fail:err=>{
              wx.showToast({
                title: '保存认证信息失败',
                icon: 'loading'
              })
            },
            complete:res=>{
              wx.hideToast()
            }
          })
        },
        fail: err => {
          wx.showToast({
            title: '保存认证信息失败',
            icon: 'loading'
          })
        },
        complete: res => {
          wx.hideToast()
          setTimeout(function () {
            wx.navigateBack({
              delta: 2
            })
          }, 1500)
        }
      })
     
    }
  },
})