const { findOne, findOneAndUpdate } = require('../../dao/UserServer');
const bcryptjs = require('bcryptjs');
const { createToken } = require('../../utils/token');

module.exports = async (req, res) => {
  const { email, password } = req.fields;
  const row = await findOne({ email: email });
  if (!row) return res.status(400).json({ message: '该用户不存在！', status: 400 });
  let compareResult = bcryptjs.compareSync(password, row.password);
  if (compareResult) {
    const token = createToken({ ...email });
    try {
      const doc = await findOneAndUpdate({ email: email }, { token });
    } catch (error) {
      res.status(500).send({
        message: error,
        status: 500
      })
    } 
    res.json({
      message: '登录成功',
      status: 200,
      token
    })
  } else {
    res.status(400).json({
      message: '密码错误！',
      status: 400
    })
  }
}