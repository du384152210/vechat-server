const { findOne, createUser } = require('../../dao/UserServer');
const { User } = require('../../model/User');

module.exports = async (req, res) => {
  let token = req.headers.authorization;
  const row = await User.findOne({ token }).select('-password').select('-token')
  res.status(200).json({
    msg: 'success',
    data: row
  });
}