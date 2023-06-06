const { fuzzyQuery } = require('../../dao/FriendServer');

module.exports = async (req, res) => { 
  fuzzyQuery(req.fields)
}