const { unreadMsg } = require('../../dao/FriendServer');

module.exports = async (req, res) => {
  const { uid, fid } = req.body;
  try {
    const result = await unreadMsg(uid, fid);
    res.json({
      msg: result,
      status: 200
    })
  } catch (error) {
    res.status(500).send({
      message: 'server error',
      status: 500
    })
  }
}