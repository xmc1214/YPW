// pages/activities/activities.js
const app = getApp()
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    swiperList: [{
        id: 1,
        username: '赵丽颖',
      url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg',
      isAdd: false
      }, {
        id: 2,
        username: '杨幂',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg',
        isAdd: false
      }, {
        id: 3,
        username: '王丽坤',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg',
        isAdd: false
      }, {
        id: 4,
        username: '江疏影',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg',
        isAdd:false
      }, {
        id: 5,
        username: '景甜',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg',
        isAdd: false
      }, {
        id: 6,
        username: '唐艺昕',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg',
        isAdd: false
      }, {
        id: 7,
        username: '唐嫣',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg',
        isAdd: false
      },
      {
        id: 8,
        username: '胡歌',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg',
        isAdd: false
      }, {
        id: 9,
        username: '霍建华',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg',
        isAdd: false
      },
      {
        id: 10,
        username: '吴亦凡',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg',
        isAdd: false
      }
    ],
    titleList: [{
        title: '人像',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2Cb6.jpg'
      },
      {
        title: '风景',
        url: 'https://s1.ax1x.com/2018/07/09/Pm2pK1.jpg'
      }, {
        title: '商业',
        url: 'https://s1.ax1x.com/2018/07/09/PmgLUU.jpg'
      },
      {
        title: '写真',
        url: 'https://s1.ax1x.com/2018/07/09/PmgzvR.jpg'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
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
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  add:function(e){
    let index = e.currentTarget.dataset.index
      let isAdd = 'swiperList[' + index + '].isAdd'
      that.setData({
        [isAdd]:!that.data.swiperList[index].isAdd
      })
      if(isAdd){
        wx.showToast({
          title: '关注成功',
          icon:'success',
          duration:1000
        })
      }else{
        wx.showToast({
          title: '已取消关注',
          icon: 'none',
          duration: 1000
        })
      }
  },
  // openHome:function(e){
  //   let item = e.currentTarget.dataset.item
  //   wx.navigateTo({
  //     url: '/pages/homePage/homePage?item=' + item,
  //   })
  // }
  openDetail:function(e){
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/divide/divideDetail?divideName=' + name,
    })
  }
})