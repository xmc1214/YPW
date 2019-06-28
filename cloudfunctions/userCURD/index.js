// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.type == 'update') {
    const result = await db.collection("userDetail").where({
      openId: wxContext.OPENID
    }).get()
    if (result.data.length > 0) {
      return await db.collection("userDetail").doc(result.data._id).update({
        data: {
          userDetail:event.userDetail
        }
      })
    } else {
      return await db.collection("userDetail").add({
        data: {
          openId: wxContext.OPENID,
          userDetail: event.userDetail
        }
      })
    }
  }
  if (event.type == 'get') {
    return await db.collection("userDetail").where({
      openId: wxContext.OPENID
    }).get()
  }

  if(event.type == 'getOther'){
    return await db.collection("userDetail").where({
      openId: event.openId
    }).get()
  }
}