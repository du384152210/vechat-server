
const { applyFriend } = require('../../dao/FriendServer');
const { findOne } = require('../../dao/UserServer')

module.exports = async (req, res) => {
  const { fid, msg } = req.body;
  const token = req.headers.authorization;
  try {
    const user = await findOne({ token });
    await applyFriend(user._id, fid, msg);
    res.send({
      message: '发送成功',
      status: 200
    })
  } catch (error) {
    res.status(500).send({
      message: error,
      status: 500
    })
  }
}