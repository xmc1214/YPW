// pages/index/detail/detail.js
var that
var util = require('/../../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd: false,
    launchTime: '',
    ypDetail: {

    },
    disabled: false,
    title:'立即约拍',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.setData({
      ypDetail: JSON.parse(options.item)
    })
    if (wx.getStorageSync("collectList")) {
      wx.getStorage({
        key: 'collectList',
        success: function(res) {
          let flag = false
          res.data.some(item => {
            if (item.launchTime == that.data.ypDetail.launchTime) {
              flag = true;
            }
          })
          if (flag) {
            that.setData({
              isAdd: true
            })
          }
        },
      })
    }
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
    that.setData({
      launchTime: util.formatTime(new Date())
    })
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
  add: function(e) {
    let collectList = []
    if (wx.getStorageSync('collectList')) {
      collectList = wx.getStorageSync('collectList')
    }

    if (!that.data.isAdd) {
      collectList.push(that.data.ypDetail)
      wx.setStorage({
        key: 'collectList',
        data: collectList,
        success: function(res) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 1000
          })
          that.setData({
            isAdd: !that.data.isAdd,
          })
        },
        fail: function(res) {
          wx.showToast({
            title: '收藏失败',
            icon: 'none',
            duration: 1000
          })
        },
        complete: function(res) {

        },
      })
    } else {
      collectList = wx.getStorageSync("collectList")
      for(let i = 0; i < collectList.length; i++){
        if(that.data.ypDetail.launchTime == collectList[i].launchTime){
          collectList.splice(i,1)
          break
        }
      }
      wx.setStorage({
        key: 'collectList',
        data: collectList,
        success: function(res) {
          wx.showToast({
            title: '已取消收藏',
            icon: 'success',
            duration: 1000
          })
          that.setData({
            isAdd: !that.data.isAdd,

          })
        },
        fail: function(res) {
          wx.showToast({
            title: '取消失败',
            icon: 'success',
            duration: 1000
          })
        },
        complete: function(res) {

        },
      })
    }
  },
  previewImage: function(e) {
    var temp = [];
    for (var i = 0; i < that.data.imageList.length; i++) {
      temp.push(that.data.imageList[i].src)
    }

    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: temp,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  af: function(e) {
  //  if (!app.globalData.isAuth) {
  //     wx.showModal({
  //       title: '权限提示',
  //       content: '请先完成实名认证',
  //       showCancel: true,
  //       cancelText: '取消',
  //       confirmText: '去认证',
  //       confirmColor: '#5397ff',
  //       success: function(res) {
  //         if (res.confirm) {
  //           wx.redirectTo({
  //             url: '/pages/userCenter/authenticationCenter/authenticationCenter',
  //           })
  //         } else {

  //         }
  //       }
  //     })
  //   } else {
  //     wx.navigateTo({
  //       url: '/pages/index/pickYou/pickYou?hisOpenId=' + that.data.ypDetail.openId,
  //     })
  //   }
    wx.navigateTo({
        url: '/pages/index/pickYou/pickYou?hisOpenId=' + that.data.ypDetail.openId,
      })

  },
  openHome: function (e) {
    if (that.data.ypDetail.openId == wx.getStorageSync('userInfo').openId) {
      wx.navigateTo({
        url: '/pages/userCenter/personal/personal',
      })
    } else {
      wx.navigateTo({
        url: '/pages/homePage/homePage?item=' + JSON.stringify(that.data.ypDetail),
      })
    }
  },
  
})