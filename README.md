# 基于云开发的悦拍屋小程序
## 项目介绍
悦拍屋是一个连接摄影师、摄影爱好者、模特以及普通人的校园摄影 o2o 约拍平台，主要提供全方位、个性化的约拍服务，用户可自主发起约拍或创作需求，通过系统推荐或自主选择符合要求的约拍的对象，与此同时为用户提供自我展示、学习交流、互动娱乐的平台
## 项目目录结构
<pre>
├─cloudfunctions            //云函数文件
│  ├─authInfoCURD
│  ├─getIdInfo
│  ├─IDCardOCR
│  │  └─config
│  ├─login
│  ├─userCURD
│  ├─workListCURD
│  ├─ypRequestListCURD
│  └─yuePaiCURD
└─miniprogram             //项目根目录
    ├─colorui            //ColorUI组件库
    │  └─components
    ├─components        //公共组件
    │  └─ocr
    ├─images           //图片资源
    │  └─icons
    ├─libs            
    │  └─tcb-service-mp-sdk
    ├─pages          //页面文件
    │  ├─activities
    │  ├─divide
    │  ├─homePage
    │  ├─index
    │  │  ├─detail
    │  │  └─pickYou
    │  ├─lanuch
    │  │  ├─work
    │  │  └─yuePai
    │  ├─login
    │  ├─logs
    │  ├─message
    │  │  ├─getInvite
    │  │  └─sendInvite
    │  ├─readme
    │  └─userCenter
    │      ├─activityManage
    │      ├─advice
    │      ├─authenticationCenter
    │      ├─club
    │      ├─collect
    │      ├─dailySign
    │      ├─editDetail
    │      ├─myLaunch
    │      └─personal
    ├─utils         //工具函数目录
    └─weui         //WeUI组件库
</pre>
## 技术实现方案
### 前端技术实现
- 使用墨刀完成产品原型设计
- WeUI + ColorUI 快速构建界面
- 使用腾讯云中的身份证识别完成实名认证
### 后端技术实现
- 云开发中的云函数提供数据库的基本操作，云储存提供文件上传下载
- 使用微信提供的云测试对未上线的小程序进行缺陷测试、性能数据分析、机型覆盖测试
- Swagger生成API文档
## 主界面设计
> 主页和分类页界面设计
![主页和分类页](http://wx3.sinaimg.cn/mw690/006UdlVNgy1g4gkay1oenj30j40gotia.jpg)

> 用户中心和个人主页设计
![用户中心和个人主页](http://wx3.sinaimg.cn/mw690/006UdlVNgy1g4gkayqgcdj30j40g9gs4.jpg)
## 演示链接
[演示视频链接](链接：https://pan.baidu.com/s/1AO2LU74zeb_lyWDI0hQzNA 提取码：ysdv)
## 后续更新
后续将完善智能推荐约拍对象的推荐算法，以及约拍对象的自动评分功能，提供更加智能化的约拍服务