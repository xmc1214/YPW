// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.type === 'add') {
    const addResult = await db.collection('authInfo').add({
      data: {
        openId: wxContext.OPENID,
        authInfo: event.authInfo
      }
    })
    return addResult
  }
  if (event.type === 'update') {
    const user = await db.collection('userList').where({
      openId:wxContext.OPENID
    }).get()
    const updateResult = await db.collection('userList').doc(user.data._id).update({
      data: {
        isAuth: true
      }
    })
    return updateResult
  }
}