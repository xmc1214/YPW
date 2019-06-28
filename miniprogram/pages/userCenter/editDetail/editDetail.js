// pages/editDetail/editDetail.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    title: '修改',
    disabled: false,
    userInfo: {},
    region: ['广东省', '广州市', '海珠区'],
    date: '暂无',
    picker: ['摄影师', '摄影爱好者', '摄影工作室'],
    userDetail:{},
    age:21,
    height:182,
    weight:120,
    hobby:'选填',
    phoneNumber:'选填',
    auth:'暂无',
    isShow:'',
    isShow1:'',
    isShow2:'',
    ageValue:0,
    heightValue:0,
    weightValue:0,
    hobbyValue:'',
    phoneNumberValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.setData({
      userInfo: wx.getStorageSync("userInfo")
    })
    wx.cloud.callFunction({
      name:'userCURD',
      data:{
        type:'get'
      },
      success:res=>{
        if (res.result.data.length > 0){
          let userDetail = res.result.data[0].userDetail
          that.setData({
            region: [userDetail.province, userDetail.city, userDetail.area],
            date: userDetail.birthDay,
            auth: userDetail.auth,
            hobby: userDetail.hobby,
            weight: userDetail.weight,
            height: userDetail.height,
            phoneNumber: userDetail.phoneNumber,
            age: userDetail.age
          })
        }
      },
      fail:err=>{
        console.log(err)
      }
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
  openEdit:function(e){
    if(e.currentTarget.dataset.idx == 1){
      that.setData({
        isShow: 'show'
      })
    }
    if (e.currentTarget.dataset.idx == 2) {
      that.setData({
        isShow1: 'show'
      })
    }
    if (e.currentTarget.dataset.idx == 3) {
      that.setData({
        isShow2: 'show'
      })
    }
  },
  hideModal: function (e) {
    if (e.currentTarget.dataset.idx == 1){
      that.setData({
        isShow: '',
        age: that.data.ageValue,
        height: that.data.heightValue,
        weight: that.data.weightValue
      })
    }
    if (e.currentTarget.dataset.idx == 2){
      that.setData({
        isShow1: '',
        hobby:that.data.hobbyValue
      })
    }
    if (e.currentTarget.dataset.idx == 3){
      that.setData({
        isShow2: '',
        phoneNumber: that.data.phoneNumberValue
      })
    }
  },
  goback:function (e) {
    if (e.currentTarget.dataset.idx == 1) {
      that.setData({
        isShow: ''
      })
    }
    if (e.currentTarget.dataset.idx == 2) {
      that.setData({
        isShow1: ''
      })
    }
    if (e.currentTarget.dataset.idx == 3) {
      that.setData({
        isShow2: ''
      })
    }
  },
  getAge:function(e){
    that.setData({
      ageValue:e.detail.value
    })
  },
  getHeight: function (e) {
    that.setData({
      heightValue: e.detail.value
    })
  },
  getWeight: function (e) {
    that.setData({
      weightValue: e.detail.value
    })
  },
  getHobby:function(e){
    that.setData({
      hobbyValue: e.detail.value
    })
  },
  getPhoneNumber:function(e){
    that.setData({
      phoneNumberValue: e.detail.value
    })
  },
  editDetail: function(e) {
    that.setData({
      loading: true,
      title: '正在修改信息',
      disabled: true
    })
    that.setData({
      ['userDetail.birthDay']:that.data.date,
      ['userDetail.province']:that.data.region[0],
      ['userDetail.city']:that.data.region[1],
      ['userDetail.area']:that.data.region[2],
      ['userDetail.auth']:that.data.auth,
      ['userDetail.age']:that.data.age,
      ['userDetail.height']:that.data.height,
      ['userDetail.weight']:that.data.weight,
      ['userDetail.hobby']:that.data.hobby,
      ['userDetail.phoneNumber']:that.data.phoneNumber
    })
    wx.cloud.callFunction({
      name:'userCURD',
      data:{
        type:'update',
        userDetail:that.data.userDetail
      },
      success:res=>{
        console.log(res)
        wx.showToast({
          title: '修改成功',
          icon:'success',
        })
      },
      fail:err=>{
        console.log(err)
        wx.showToast({
          title: '修改失败',
          icon: 'none',
        })
      },
      complete:res=>{
        setTimeout(function () {
          wx.hideToast()
          that.setData({
            loading: false,
            title: '修改',
            disabled: false
          })
        }, 1000)
      }
      
    })
  },
   DateChange(e) {
    that.setData({
      date: e.detail.value
    })
  },
  RegionChange: function (e) {
    that.setData({
      region: e.detail.value
    })
  },
  PickerChange(e) {
    that.setData({
      auth:that.data.picker[e.detail.value]
    })
  },
})