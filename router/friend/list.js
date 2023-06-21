const { getFirends } = require('../../dao/FriendServer');

module.exports = async (req, res) => {
  const { uid, state } = req.query;
  try {
    const result = await getFirends(uid, state);
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