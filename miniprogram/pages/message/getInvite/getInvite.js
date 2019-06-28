// pages/message/getInvite/getInvite.js
const util = require("/../../../utils/util.js")
let that
let resultData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 显示加载更多 loading
    hothidden: true,

    // loading
    hidden: true,
    requestList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      hidden: false
    })
    wx.showLoading({
      title: '数据加载中',
    })
    wx.cloud.callFunction({
      name: 'ypRequestListCURD',
      data: {
        type: 'getMyself'
      },
      success: res => {
        console.log(res)
        let getRequestList = []
        wx.hideLoading()
        if (res.result.data.length == 0) {
          wx.showToast({
            title: '暂未收到约拍邀请',
            icon: 'none',
            duration: 1500
          })
        } else {
          resultData = res.result.data
          for (let i = 0; i < res.result.data.length; ++i) {
            getRequestList.push(res.result.data[i].ypRequestInfo)
          }
          that.setData({
            requestList: getRequestList
          })
          wx.setStorage({
            key: 'getRequestList',
            data: getRequestList,
          })
        }
      }, fail: err => {
        console.log(err)
      },
      complete: res => {

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
wx.hideLoading()
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
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  deleteMessage: function (e) {
    let index = e.currentTarget.dataset.index
    let temp = that.data.requestList
    let _id = resultData[index]._id
    temp.splice(index, 1)
    that.setData({
      requestList: temp
    })
    wx.cloud.callFunction({
      name: 'ypRequestListCURD',
      data: {
        type: 'delete',
        _id: _id
      },
      success: res => {
        console.log(res)
        wx.removeStorage({
          key: 'getRequestList',
          success: function (res) {

          },
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  openDetail: function (e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/message/getInvite/inviteDetail?item=' + JSON.stringify(item),
    })
  }
})