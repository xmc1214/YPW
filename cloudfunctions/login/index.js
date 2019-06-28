const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
const db = cloud.database()
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async(event, context) => {
  let openId = event.userInfo.openId
  const result = await db.collection("userList").where({
    openId: openId
  }).get();
  if (result.data.length > 0) {
    return await db.collection("userList").doc(result.data._id).update({
      data: {
        avatarUrl: event.avatarUrl,
        nickName: event.nickName,
        gender: event.gender
      }
    })
  } else {
    return await db.collection("userList").add({
      data: {
        avatarUrl: event.avatarUrl,
        nickName: event.nickName,
        gender: event.gender,
        openId: openId,
        isAuth: false,
        createTime: new Date()
      }
    })
  }
}