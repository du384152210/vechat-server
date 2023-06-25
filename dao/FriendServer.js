const { Friend } = require('../model/Friend');
const { User } = require('../model/User');
const { Message } = require('../model/Message');

// 模糊查询
const fuzzyQuery = async(key, token) => {
  let whereStr = { $or: [{ 'nickName': { $regex: key } }, { 'email': { $regex: key } }], $nor: [{ 'token': token}] };
  try {
    const result = await User.find(whereStr).select('nackName').select('email').select('avatar').select('gender').select('nickName');
    const userRes = await User.findOne({ token });
    let arr = JSON.parse(JSON.stringify(result));
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const res = await isFriend(userRes._id, arr[i]._id);
        arr[i].state = res ? res.state : 3
      }
    } 
    return arr;
  } catch (error) {
    console.log(error);
  }
}

// 查找好友
const findById = async (id) => {
  try {
    const result = await User.findById(id).select('nickName').select('avatar').select('email').select('signature').select('gender');
    return result;
  } catch (error) {
    return error;
  }
}

// 判断是否为好友
const isFriend = async(uid, fid) => {
  try {
    const res = await Friend.findOne({ $and: [{ userId: uid }, { friendId: fid }] }).select('state')
    return res
  } catch (error) {
    return error
  }
}

// 添加好友
const buildFriend = async (uid, fid, state) => {
  try {
    let data = {
      userId: uid,
      friendId: fid,
      state: state,
      createTime: new Date,
      lastTime: new Date
    }
    let friend = new Friend(data);
    await friend.save();
  } catch (error) {
    return error
  }
}

// 添加信息
const insertMsg = async(uid, fid, msg, types ) => {
  try {
    let data = {
      userId: uid,
      friendId: fid,
      message: msg,
      types: types,
      state: 1,
      time: new Date
    }
    let message = new Message(data);
    await message.save();
  } catch (error) {
    return error
  }
}

// 更新最后通讯时间
const upFriendLastTime = async(uid, fid) => {
  try {
    let whereStr = { 'userId': uid, friendId: fid };
    let upate = { lastTime: new Date };
    await Friend.findOneAndUpdate(whereStr, upate);
  } catch (error) {
    return
  }
}

// 好友申请
const applyFriend = async (uid, fid, msg) => {
  try {
    let whereStr = { 'userId': uid, friendId: fid };
    const result = await Friend.countDocuments(whereStr);
    if (result == 0) {
      buildFriend(uid, fid, 2);
      buildFriend(fid, uid, 1);
    } else {
      upFriendLastTime(uid, fid);
      upFriendLastTime(fid, uid);
    }
    insertMsg(uid, fid, msg, 0)
  } catch (error) {
    return error
  }
}

// 更新好友状态
const updateFriendState = async(uid, fid) => {
  let whereStr = { $or: [{ 'userId': uid, 'friendId': fid }, { 'userId': fid, 'friendId': uid }] };
  try {
    await Friend.updateMany(whereStr, {'state': 0})
  } catch (error) {
    return error
  }
}

// 拒绝好友或删除好友
const deleteFriend = async (uid, fid) => {
  let whereStr = { $or: [{ 'userId': uid, 'friendId': fid }, { 'userId': fid, 'friendId': uid }] };
  try {
    await Friend.deleteMany(whereStr);
  } catch (error) {
    return error
  }
}

// 查找好友
const getFirends = async (uid, state) => {
  try {
    const row = await Friend.find({ 'userId': uid, 'state': state })
      .populate('friendId')
      .sort({ 'lastTime': -1 }).exec()
    const result = row.map(item => {
      return {
        id: item.friendId._id,
        name: item.friendId.nickName,
        avatar: item.friendId.avatar,
        lastTime: item.lastTime
      }
    })
    return result;
  } catch (error) {
    return error;
  }
}

// 获取一对一消息
const getOneMsg = async (uid, fid) => {
  try {
    const row = await Message.findOne({ $or: [{ 'userId': uid, 'friendId': fid }, { 'userId': fid, 'friendId': uid }]})
      .sort({ 'time': -1 }).exec()
    const result = {
        message: row.message,
        time: row.time,
        types: row.types
      }
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// 获取未读信息
const unreadMsg = async (uid, fid) => {
  try {
    let wherestr = { 'userId': uid, 'friendId': fid, state: 1 };
    const count = await Message.countDocuments(wherestr);
    return count;
  } catch (error) {
    return error;
  }
}

// 更新信息状态
const updateMsgState = async (uid, fid) => {
  try {
    let wherestr = { 'userId': uid, 'friendId': fid, 'state': 1 };
    let updatestr = { 'state': 0 };
    Message.updateMany(wherestr, updatestr);
    return true
  } catch (error) {
    return error;
  }
}

// 查找信息列表
const msgList = async (data) => {
  try {
    const friend = await getFirends(data.uid, 0);
    for (let i = 0; i < friend.length; i++) {
      const msg = await getOneMsg(data.uid, friend[i].id);
      switch (msg.types) {
        case 1:
          msg.message = '[图片]'
          break;
        case 2:
          msg.message = '[音频]'
          break;
        case 3:
          msg.message = '[位置]'
          break;
        default:
          break;
      }
      friend[i].msg = msg.message;
      const unreadNum = await unreadMsg(data.uid, friend[i].id);
      friend[i].tip = unreadNum;
    }
    return friend;
  } catch (error) {
    throw error
  }
}


module.exports = {
  fuzzyQuery,
  findById,
  applyFriend,
  updateFriendState,
  deleteFriend,
  getFirends,
  getOneMsg,
  unreadMsg,
  updateMsgState,
  msgList
}