const { Friend } = require('../model/Friend');
const { User } = require('../model/User');

// 模糊查询
const fuzzyQuery = async(key) => {
  let whereStr = { $or: [{ 'nickName': { $regex: key } }, { 'email': { $regex: key } }] };
  let out = {
    nackName: '',
    email: '',
    avatar: ''
  }
  try {
    const result = await User.find(whereStr, out);
    console.log(result);
    let token = req.headers.authorization;
    const userRes = await User.findOne({token})
  } catch (error) {
    res.status(500).send({
      message: error,
      status: 500
    })
  }
}

module.exports = {
  fuzzyQuery
}