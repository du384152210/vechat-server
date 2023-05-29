const {User} = require('../model/User');
//对象规则验证
const Joi = require('joi');
//hash密码
const bcryptjs = require('bcryptjs');

//注册数据格式验证
const validateUser = user => {
  //定义对象验证规则
  const schema = Joi.object({
      email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱不符合验证规则')),
      password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码不符合验证规则')),
  });
  //验证
  return schema.validateAsync(user, {
      //检测所有错误
      abortEarly: false,
      //允许对象包含被忽略的未知键
      allowUnknown: true
  });
};

// 创建用户
async function createUser(body) {
  //生成盐
  const salt = await bcryptjs.genSalt(10);
  //使用盐对密码进行加密
  const password = await bcryptjs.hash(body.password, salt);

  const user = await User.create({
    nickName: '普通用户',
    email: body.email,
    password: password,
    avatar: null,
    createTime: new Date,
  });
  return user
}
// 查找用户
async function findOne(body) {
  let user = await User.findOne(body);
  return user
}

module.exports = {
  validateUser,
  createUser,
  findOne
}