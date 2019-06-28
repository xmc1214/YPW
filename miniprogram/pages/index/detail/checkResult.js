// miniprogram/pages/index/detail/checkResult.js
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress_txt: '正在匹配中...', 
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    icon:'loading2',
    isShow:true,
    goodList: [{
      auth: '摄影师',
      sex: '男',
      age: 21,
      college: '江西财经大学', avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/WDfcgiatfYFD9G7tqSCaiawUpUwiapSYILM1U8GuJA1TvTKupPTicWqn1tLFSWJicnCAoHQeurd6ia8ibQBYqhjUpw2tg/132',
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
    }, {
      auth: '摄影师',
      sex: '男',
      age: 21,
      college: '江西财经大学',
      avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/WDfcgiatfYFD9G7tqSCaiawUpUwiapSYILM1U8GuJA1TvTKupPTicWqn1tLFSWJicnCAoHQeurd6ia8ibQBYqhjUpw2tg/132',
      iAdd: false
    }],
    item: {
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
  },
drawProgressbg: function() {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(2);// 设置圆环的宽度
    ctx.setStrokeStyle('white'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#5397ff");
    gradient.addColorStop("0.5", "#9AC2FF");
    gradient.addColorStop("1.0", "#5397ff");

    context.setLineWidth(10);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },

  countInterval: function () {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {
      if (this.data.count <= 40) {
        /* 绘制彩色圆环进度条  
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
        this.drawCircle(this.data.count / (40 / 2))
        this.data.count++;
      } else {
        this.setData({
          progress_txt: "匹配成功",
          icon:'check',
        });
        setTimeout(function(){
          that.setData({
            isShow:false
          })
        },1000)
        setTimeout(function(){
          wx.showModal({
            title: '说明',
            showCancel:false,
            confirmText:'我知道了',
            confirmColor:'#9AC2FF',
            content: '由于用户数据不够，匹配结果为测试数据',
          })
        },1500)
        clearInterval(this.countTimer);
      }
    }, 100)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawProgressbg();
    this.countInterval()
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
  openHomePage: function (e) {
    wx.navigateTo({
      url: '/pages/homePage/homePage?item=' + JSON.stringify(that.data.item),
    })
  },
  yp:function(e){
    wx.showModal({
      title: '邀请提示',
      content: '确定向该用户发送邀请吗',
      showCancel: true,
   
      confirmText: '确定',
      confirmColor: '#9AC2FF',
      success: function(res) {
        if(res.confirm){
          wx.navigateTo({
            url: '/pages/lanuch/yuePai/yuePai',
          })
        }
      },
    })
  }
})