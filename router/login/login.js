const { findOne } = require('../../dao/UserServer');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { email, password } = req.fields;
  const row = await findOne({ email: email });
  if (!row) return res.status(400).json({ message: '该用户不存在！', status: 400 });
  let compareResult = bcryptjs.compareSync(password, row.password);
  if (compareResult) {
    res.json({
      message: '登录成功',
      status: 200,
      token: jwt.sign({email: row.email}, 'abc', {
        expiresIn: "3000s"
    }),
    })
  } else {
    res.status(400).json({
      message: '密码错误！',
      status: 400
    })
  }
}