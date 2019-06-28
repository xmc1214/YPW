// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.type === 'getOther') {
    const result = await db.collection('userList').where({
      openId: event.openId
    }).get()
    return result.data
  }else{
    const result = await db.collection('userList').where({
      openId: wxContext.OPENID
    }).get()
    return result.data
  }
}