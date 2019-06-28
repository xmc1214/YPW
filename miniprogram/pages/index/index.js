//index.js
//获取应用实例
let that
const app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    userInfo: {},
    launchTime: '',
    sex: '',
    // 显示加载更多 loading
    hothidden: true,
    // loading
    hidden: true,
    show: false,
    ypList: []
  },
  onLoad: function() {
     that = this
    that.setData({
      show: true,
      hidden: false,
    })
    wx.cloud.callFunction({
      name: 'yuePaiCURD',
      data: {
        type: 'getAll',
      },
      success: res => {
        let ypList = []
        for (let i = 0; i < res.result.data.length; ++i) {
          ypList.push(res.result.data[i].cameraInfo)
        }
        that.setData({
          ypList: ypList
        })
        wx.setStorageSync('ypList', ypList)
      },fail:err=>{
        console.log(err)
        wx.showToast({
          title: '请重新加载',
          icon:'none'
        })
      },complete:res=>{
        setTimeout(function () {
          that.setData({
            hidden: true,
            show: false
          })
        }, 500);
      }
    })
  },
  onReady: function(e) {
    // 页面渲染完成
    wx.cloud.callFunction({
      name: 'getIdInfo',
      data: {},
      success: res => {
        // app.globalData.isAuth = res.result[0].isAuth
        wx.setStorageSync("userInfo", res.result[0])
      }
    })
  },
  onShow: function(e) {
    if(!wx.getStorageSync('ypList')){
      wx.cloud.callFunction({
        name: 'yuePaiCURD',
        data: {
          type: 'getAll',
        },
        success: res => {
          let ypList = []
          for (let i = 0; i < res.result.data.length; ++i) {
            ypList.push(res.result.data[i].cameraInfo)
          }
          that.setData({
            ypList: ypList
          })
          wx.setStorageSync('ypList',ypList)
        }
      })
    }else{
      that.setData({
        ypList: wx.getStorageSync('ypList')
      })
    }
  },
  openHome: function(e) {
    const item = e.currentTarget.dataset.item
    if(item.openId == wx.getStorageSync('userInfo').openId){
      wx.navigateTo({
        url: '/pages/userCenter/personal/personal',
      })
    }else{
      wx.navigateTo({
        url: '/pages/homePage/homePage?item=' + JSON.stringify(item),
      })
    }
  },
  openDetail: function(e) {
    let item = e.currentTarget.dataset.item
    if (item.openId == wx.getStorageSync('userInfo').openId){
      wx.navigateTo({
        url: '/pages/index/detail/myDetail?item=' + JSON.stringify(item),
      })
    }else{
      wx.navigateTo({
        url: '/pages/index/detail/detail?item=' + JSON.stringify(item),
      })
    }
  },
  previewImage: function(e) {
    var src = e.currentTarget.dataset.src
    var imgList = e.currentTarget.dataset.imagelist
    console.log(src)
    wx.previewImage({
      current:src,
      urls: imgList,
      success: function(res) {
        console.log(res)
      },
      fail: function(error) {
      
      },
      complete: function(res) {

      },
    })
  },
  /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '数据加载中',
    })
    wx.cloud.callFunction({
      name: 'yuePaiCURD',
      data: {
        type: 'getAll',
      },
      success: res => {
        let ypList = []
        for (let i = 0; i < res.result.data.length; ++i) {
          ypList.push(res.result.data[i].cameraInfo)
        }
        that.setData({
          ypList: ypList
        })
        wx.setStorageSync('ypList', ypList)
      },
      complete:res=>{
       wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
})