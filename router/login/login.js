const { findOne, validateUser } = require('../../dao/UserServer');

module.exports = async(req, res) => {
  try {
    await validateUser(req.fields);
  } catch (error) {
    return res.status(400).json({ message: error.message, status: 400 });
  }
  
  res.status(200).json({
    statusCode: 200,
    msg: 'success'
  });
}