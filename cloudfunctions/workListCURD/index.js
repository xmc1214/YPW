// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.type === 'add') {
    return await db.collection('workList').add({
      data: {
        photoInfo: event.photoInfo
      }
    })
  }
  if (event.type === 'getOther') {
    const workList = await db.collection('workList').orderBy('photoInfo.launchTime', 'desc').where({
      'photoInfo.openId': event.openId
    }).get()
    return workList
  }
}