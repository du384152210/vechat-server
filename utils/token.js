const jwt = require('jsonwebtoken');
const secret = 'pphs';

const createToken = (data) => {
  const res = jwt.sign(data, secret, { expiresIn: "3000s" });
  return 'Bearer ' + res;
}

const varifyToken = (token) => {
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return error
    }
    return decoded
  })
}

module.exports = {
  createToken,
  varifyToken
}