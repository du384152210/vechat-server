const { fuzzyQuery } = require('../../dao/FriendServer');

module.exports = async (req, res) => { 
  const { key } = req.query;
  const token = req.headers.authorization;
  try {
    const result = await fuzzyQuery(key, token);
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