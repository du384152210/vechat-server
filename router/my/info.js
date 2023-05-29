const { findOne, createUser } = require('../../dao/UserServer');

module.exports = async(req, res) => {
  console.log(req.query);
  const row = await findOne(req.query)
  res.status(200).json({
    msg: 'success',
    data: {
      nickName: row.nickName,
      email: row.email,
      avatar: row.avatar,
      createTime: row.createTime
    }
  });
}