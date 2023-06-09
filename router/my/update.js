const { findOneAndUpdate } = require('../../dao/UserServer');
const { User } = require('../../model/User');

module.exports = async (req, res) => {
  let token = req.headers.authorization;
  try {
    await findOneAndUpdate({ token }, { ...req.body });
    res.send({
      message: '修改成功',
      status: 200
    })
  } catch (error) {
    res.status(500).send({
      message: error,
      status: 500
    })
  }
}