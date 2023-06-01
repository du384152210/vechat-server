const jwt = require('jsonwebtoken');
const secret = 'pphs';

const createToken = (data) => {
  const res = jwt.sign(data, secret, { expiresIn: "3000s" });
  return 'Bearer ' + res;
}

const varifyToken = (token) => {
  try {
    token = token.replace('Bearer ','');
    let decoded = jwt.verify(token, secret);
    return {
      code: 200,
      message: '校验成功',
      decoded
    }
  } catch (error) {
    return {
      code: 500,
      message: '校验失败'
    }
  }
}

module.exports = {
  createToken,
  varifyToken
}