// miniprogram/pages/divide/divideDetail.js
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    divideName:'',
    goodList:[{
      auth:'摄影师',
      sex:'男',
      age:21,
      college: '江西财经大学',avatarUrl:'https://wx.qlogo.cn/mmopen/vi_32/WDfcgiatfYFD9G7tqSCaiawUpUwiapSYILM1U8GuJA1TvTKupPTicWqn1tLFSWJicnCAoHQeurd6ia8ibQBYqhjUpw2tg/132',
      iAdd:false
    }, {
        auth: '摄影师',
        sex: '男',
        age: 21,
        college:'江西财经大学',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/WDfcgiatfYFD9G7tqSCaiawUpUwiapSYILM1U8GuJA1TvTKupPTicWqn1tLFSWJicnCAoHQeurd6ia8ibQBYqhjUpw2tg/132',
        iAdd: false
      }, {
        auth: '摄影师',
        sex: '男',
        age: 21,
        college: '江西财经大学',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/WDfcgiatfYFD9G7tqSCaiawUpUwiapSYILM1U8GuJA1TvTKupPTicWqn1tLFSWJicnCAoHQeurd6ia8ibQBYqhjUpw2tg/132',
        iAdd: false
      }, {
        auth: '摄影师',
        sex: '男',
        age: 21,
        college: '江西财经大学',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/WDfcgiatfYFD9G7tqSCaiawUpUwiapSYILM1U8GuJA1TvTKupPTicWqn1tLFSWJicnCAoHQeurd6ia8ibQBYqhjUpw2tg/132',
        iAdd: false
      }, {
        auth: '摄影师',
        sex: '男',
        age: 21,
        college: '江西财经大学',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/WDfcgiatfYFD9G7tqSCaiawUpUwiapSYILM1U8GuJA1TvTKupPTicWqn1tLFSWJicnCAoHQeurd6ia8ibQBYqhjUpw2tg/132',
        iAdd: false
      }],
      item:{
        city: "南昌市",
        readNumber: 0.0,
        area: "青山湖区",
      imgList: [
          "cloud://af-63onx.6166-af-63onx-1256477751/1559056710688-4399039.jpg",
          "cloud://af-63onx.6166-af-63onx-1256477751/1559056710692-5532648.jpg",
          "cloud://af-63onx.6166-af-63onx-1256477751/1559056710691-9862490.jpg"
        ],
        getInvite: 0.0,
        price: "愿意付费",
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/WDfcgiatfYFD9G7tqSCaiawUpUwiapSYILM1U8GuJA1TvTKupPTicWqn1tLFSWJicnCAoHQeurd6ia8ibQBYqhjUpw2tg/132",
        launchTime: "2019/05/28 23:18:31",
        explain: "摄影爱好者，想找一个模特练习古风拍摄",
        gender: 1.0,
        cameraArea: "江西财经大学",
        tagList: [
          "汉服",
          "古风",
          "民国",
          "小清新"
        ],
        nickName: "樱空释",
        province: "江西省",
        openId: "owviJ5a0BWsb65vXjdylbPmfOSDI"
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      divideName:options.divideName
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
  add: function (e) {
    let index = e.currentTarget.dataset.index
    let isAdd = 'goodList[' + index + '].isAdd'
    that.setData({
      [isAdd]: !that.data.goodList[index].isAdd
    })
    if (isAdd) {
      wx.showToast({
        title: '关注成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      wx.showToast({
        title: '已取消关注',
        icon: 'none',
        duration: 1000
      })
    }
  },
openHomePage:function(e){
  wx.navigateTo({
    url: '/pages/homePage/homePage?item=' + JSON.stringify(that.data.item),
  })
},
  yp: function (e) {
    wx.showModal({
      title: '邀请提示',
      content: '确定向该用户发送邀请吗',
      showCancel: true,

      confirmText: '确定',
      confirmColor: '#9AC2FF',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/lanuch/yuePai/yuePai',
          })
        }
      },
    })
  }
})