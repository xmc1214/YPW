// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.type === 'add'){
    return await db.collection('ypList').add({
      data:{
        cameraInfo:event.cameraInfo
      }
    })
  }
  if(event.type === 'getAll'){
    const ypList = await db.collection('ypList').orderBy('cameraInfo.launchTime', 'desc').where({}).get()
    return ypList
  }
  if(event.type === 'getOther'){
    const ypList = await db.collection('ypList').orderBy('cameraInfo.launchTime','desc').where({
      'cameraInfo.openId':event.openId
    }).get()
    return ypList
  }
}