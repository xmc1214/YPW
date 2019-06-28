// pages/personal/personal.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('/../../../utils/util.js');
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: [{ name: '约拍', badge: 0 }, { name: '关注', badge: 0 }, { name: '粉丝', badge:0}],
    tabs: ["约拍动态", "个人作品集"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    launchTime: '',
    sex: '',
    ypList: [],
    userInfo:{},
    userDetail:{
      auth:'暂无',
      city:'暂无地区',
      age:0
    },
    workList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
    })
     that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    that.setData({
      userInfo:wx.getStorageSync("userInfo")
    })
    wx.cloud.callFunction({
      name: 'userCURD',
      data: {
        type: 'get'
      },
      success: res => {
        if (res.result.data.length > 0) {
          let userDetail = res.result.data[0].userDetail
          that.setData({
          ['userDetail.auth']:userDetail.auth,
          ['userDetail.city']:userDetail.city,
          ['userDetail.age']:userDetail.age,
          })
        }
      },
      fail: err => {
        console.log(err)
      },complete:res=>{
      }
    })
    wx.cloud.callFunction({
      name: 'yuePaiCURD',
      data: {
        type: 'getOther',
        openId: that.data.userInfo.openId
      }, success: res => {
        let ypList = []
        for (let i = 0; i < res.result.data.length; ++i) {
          ypList.push(res.result.data[i].cameraInfo)
        }
        that.setData({
          ypList: ypList
        })
      },
      fail: err => {

      },
      complete: res => [
        wx.hideLoading()
      ]
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
    that.setData({
      launchTime: util.formatTime(new Date())
    })
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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (that.data.activeIndex == 1) {
        wx.showLoading({
          title: '加载中',
        })
        wx.cloud.callFunction({
          name: 'workListCURD',
          data: {
            type: 'getOther',
            openId: that.data.userInfo.openId
          },
          success: res => {
            let workList = []
            wx.hideLoading()
            if (res.result.data.length == 0) {
              wx.showToast({
                title: '暂无作品集',
                icon: 'none',
                duration: 1500
              })
            } else {
              for (let i = 0; i < res.result.data.length; ++i) {
                workList.push(res.result.data[i].photoInfo)
              }
              that.setData({
                workList: workList
              })
              wx.setStorage({
                key: 'workList',
                data: workList,
              })
            }
          },
          fail: err => {
            wx.hideLoading()
            wx.showToast({
              title: '加载失败',
              icon: 'none',
              duration: 1500
            })
          }
        })
     
    }
  },
  goback:function(e){
    wx.navigateBack({
      
    })
  },
  openHome: function (e) {
    wx.navigateTo({
      url: '/pages/homePage/homePage',
    })
  },
  openDetail: function (e) {
    let item = e.currentTarget.dataset.item
    console.log(item)
    if (item.openId == wx.getStorageSync('userInfo').openId) {
      wx.navigateTo({
        url: '/pages/index/detail/myDetail?item=' + JSON.stringify(item),
      })
    } else {
      wx.navigateTo({
        url: '/pages/index/detail/detail?item=' + JSON.stringify(item),
      })
    }
  
  },
  previewImage: function (e) {
    var src = e.currentTarget.dataset.src
    var imgList = e.currentTarget.dataset.imagelist
    console.log(src)
    wx.previewImage({
      current: src,
      urls: imgList,
      success: function (res) {
        console.log(res)
      },
      fail: function (error) {

      },
      complete: function (res) {

      },
    })
  }
})