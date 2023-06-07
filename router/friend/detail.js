
const { findById } = require('../../dao/FriendServer');

module.exports = async (req, res) => {
  try {
    const result = await findById(req.query.id);
    res.json({
      detail: result,
      status: 200
    })
  } catch (error) {
    res.status(500).send({
      message: 'server error',
      status: 500
    })
  }
}