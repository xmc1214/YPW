// pages/userCenter/userCenter.js
const app = getApp();
var that;
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    // 显示加载更多 loading
    hothidden: true,
    userInfo: {},
    // loading
    hidden: true,
    iconList: [{
      icon: 'camerafill',
      color: 'red',
      badge: 0,
      name: '我的约拍',
      url: '/pages/userCenter/myLaunch/myLaunch'
    }, {
      icon: 'home',
      color: 'orange',
      badge: 0,
      name: '个人主页',
      url: '/pages/userCenter/personal/personal'
    }, {
      icon: 'writefill',
      color: 'yellow',
      badge: 0,
      name: '编辑资料',
      url: '/pages/userCenter/editDetail/editDetail'
    }, {
      icon: 'card',
      color: 'olive',
      badge: 0,
      name: '发送名片',
      url: ''
    }, {
      icon: 'apps',
      color: 'cyan',
      badge: 0,
      name: '我的收藏',
      url: '/pages/userCenter/collect/collect'
    }, {
      icon: 'edit',
      color: 'blue',
      badge: 0,
      name: '建议反馈',
      url: '/pages/userCenter/advice/advice'
    }],
    gridCol: 3,
    skin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.setData({
      hidden: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 页面渲染完成
    // 数据加载完成后 延迟隐藏loading
    setTimeout(function() {
      that.setData({
        hidden: true
      })
    }, 500);
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (wx.getStorageSync('userInfo').isAuth == undefined || wx.getStorageSync('userInfo').isAuth == false) {
      wx.cloud.callFunction({
        name: 'getIdInfo',
        data: {},
        success: res => {
          that.setData({
            userInfo: res.result[0]
          })
          app.globalData.isAuth = res.result[0].isAuth
          wx.setStorageSync("userInfo", that.data.userInfo)
        }
      })
    } else {
      that.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
      app.globalData.isAuth = wx.getStorageSync('userInfo').isAuth
    }
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
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  gridchange: function(e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function(e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function(e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  menuArrow: function(e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  menuCard: function(e) {
    this.setData({
      menuCard: e.detail.value
    });
  },
  switchSex: function(e) {
    this.setData({
      skin: e.detail.value
    });
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
  openSomething: function(e) {
    if (e.currentTarget.dataset.name == "发送名片") {
      that.setData({
        isShow: true
      })
    }else{
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  },
  hideModal(e) {
    that.setData({
      isShow: false
    })
  },
  openSign: function(e) {
    wx.navigateTo({
      url: '/pages/userCenter/dailySign/dailySign',
    })
  }
})