const { fuzzyQuery } = require('../../dao/FriendServer');

module.exports = async (req, res) => { 
  const{ key } = req.query;
  fuzzyQuery(key)
}