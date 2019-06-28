// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.type === 'add') {
    return await db.collection('ypRequestList').add({
      data: {
        ypRequestInfo: event.ypRequestInfo
      }
    })
  }
  if (event.type === 'getOther') {
    const ypRequestList = await db.collection('ypRequestList').orderBy('ypRequestInfo.launchTime', 'desc').where({
      'ypRequestInfo.openId':wxContext.OPENID
    }).get()
    return ypRequestList
  }
  if(event.type === 'delete'){
    const _id = event._id
    try {
      return await db.collection('ypRequestList').doc(_id).remove()
    } catch (e) {
      console.error(e)
    }
  }
  if (event.type === 'getMyself') {
    const ypRequestList = await db.collection('ypRequestList').orderBy('ypRequestInfo.launchTime', 'desc').where({
      'ypRequestInfo.hisOpenId': wxContext.OPENID
    }).get()
    return ypRequestList
  }
  }
