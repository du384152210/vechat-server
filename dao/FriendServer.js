const { Friend } = require('../model/Friend');
const { User } = require('../model/User');

// 模糊查询
const fuzzyQuery = async(key, token) => {
  let whereStr = { $or: [{ 'nickName': { $regex: key } }, { 'email': { $regex: key } }] };
  try {
    const result = await User.find(whereStr).select('nackName').select('email').select('avatar').select('gender').select('nickName');
    const userRes = await User.findOne({ token });
    const arr = JSON.parse(JSON.stringify(result));
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

const findById = async (id) => {
  try {
    const result = await User.findById(id).select('nickName').select('avatar').select('email').select('signature').select('gender');
    return result;
  } catch (error) {
    return error;
  }
  
}

const isFriend = async(uid, fid) => {
  try {
    const res = await Friend.findOne({ $and: [{ userId: uid }, { friendId: fid }] }).select('state')
    return res
  } catch (error) {
    return error
  }
}

module.exports = {
  fuzzyQuery,
  findById
}