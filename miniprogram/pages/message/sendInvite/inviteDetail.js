// miniprogram/pages/message/sendInvite/inviteDetail.js
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    sendDetail:{},
    otherInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.showLoading({
      title: '数据加载中',
    })
    that.setData({
      sendDetail: JSON.parse(options.item),
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo:res.data
        })
      },
    })
    wx.cloud.callFunction({
      name:'getIdInfo',
      data:{
        type:'getOther',
        openId: that.data.sendDetail.hisOpenId
      },
      success:res=>{
        console.log
        that.setData({
          otherInfo:res.result[0]
        })
      },fail:err=>{
        console.log(err)
      },
      complete:res=>{
        wx.hideLoading()
      }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tishi:function(e){
    wx.showModal({
      title: '消息提醒',
      content: '对方太久未回复，咻一下提示对方',
      showCancel: true,
      cancelText: '取消',
      confirmText: '咻一下',
      confirmColor: '#97B2FF',
      success: function(res) {
        wx.showLoading({
          title: '提示中',
        })
        setTimeout(function(){
wx.hideLoading()
          wx.showModal({
            content: '已提示对方及时回复',
            showCancel:false,
            confirmColor: '#97B2FF'
          })
        },1000)
      }
    })
  },
  read:function(e){
    wx.showToast({
      title: '等待回复中',
      icon:'loading',
      duration:1000
    })
  }
})