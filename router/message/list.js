const { msgList } = require('../../dao/FriendServer');

module.exports = async (req, res) => {
  // const { uid, fid } = req.body;
  try {
    const result = await msgList(req.query);
    res.json({
      list: result,
      status: 200
    })
  } catch (error) {
    res.status(500).send({
      message: 'server error',
      status: 500
    })
  }
}