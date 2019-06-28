// pages/userCenter/dailySign /dailySign .js
const date = require('../../../utils/date.js');
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curYear: new Date().getFullYear(), // 年份
    curMonth: new Date().getMonth() + 1,// 月份 0-11
    day: new Date().getDate(), // 日期 1-31 若日期超过该月天数，月份自动增加
    header_show: true, // 主标题是否显示
    prev: true, // 上一个月按钮是否显示
    next: true, // 下一个月按钮是否显示，
    switchover:['上一月','下一月'],
    circle_show:false,
    speciallist: [],
    txt_style:'red',
    todaybtn_txt:'今天',
    remark_show:true,
    remark_style:'userdefined',
    sign: 30,
    signed: 0,
    count_txt_user: [
    ],
    mystatus: [],  // 状态  状态  0:未出勤 1:正常出勤 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    var temp = that.data.speciallist;
    temp.push({ date: date.formatTime(new Date()), text: "点击签到" },
    )
    that.setData({
      speciallist: temp,
      count_txt_user: [{ 'count_txt': '本月签到统计', 'count_ber': '' },
        { 'count_txt': '未签到：', 'count_ber': that.data.sign+'天' },
        { 'count_txt': '签到：', 'count_ber': that.data.signed+'天' }]
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
  sign:function(e){
   if(e.detail.date == date.formatTime(new Date())){
     var item = 'speciallist[0].text'
     that.setData({
       [item]: '已签到',
       sign: 29,
       signed: 1
     })
    that.setData({
      count_txt_user: [{ 'count_txt': '本月签到统计', 'count_ber': '' },
      { 'count_txt': '未签到：', 'count_ber': that.data.sign + '天' },
      { 'count_txt': '签到：', 'count_ber': that.data.signed + '天' }]
    })
   }
  },
  nextMonth:function(e){
    const currentMonth = e.detail.currentMonth;
    if (currentMonth != that.data.curMonth) {
      that.setData({
        sign: 0,
        signed: 0
      })
    } else {
      that.setData({
        sign: 29,
        signed: 1
      })
    }
    that.setData({
      count_txt_user: [{ 'count_txt': '本月签到统计', 'count_ber': '' },
      { 'count_txt': '未签到：', 'count_ber': that.data.sign + '天' },
      { 'count_txt': '签到：', 'count_ber': that.data.signed + '天' }]
    })
  },
  prevMonth: function (e) {
    const currentMonth = e.detail.currentMonth;
    if(currentMonth != that.data.curMonth){
      that.setData({
        sign: 0,
        signed: 0
      })
    }else{
      that.setData({
        sign: 29,
        signed: 1
      })
    }
    that.setData({
      count_txt_user: [{ 'count_txt': '本月签到统计', 'count_ber': '' },
      { 'count_txt': '未签到：', 'count_ber': that.data.sign + '天' },
      { 'count_txt': '签到：', 'count_ber': that.data.signed + '天' }]
    })
  }
})