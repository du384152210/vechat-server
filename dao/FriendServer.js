const { Friend } = require('../model/Friend');
const { User } = require('../model/User');

// 模糊查询
const fuzzyQuery = async(key) => {
  console.log(key);
  let whereStr = { $or: [{ 'nickName': { $regex: key } }, { 'email': { $regex: key } }] };
  let out = {
    nackName: '',
    email: '',
    avatar: ''
  }
  try {
    const result = await User.find(whereStr);
    console.log(result);
    // const userRes = await User.findOne({token})
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fuzzyQuery
}