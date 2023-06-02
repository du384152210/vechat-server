const {User} = require('../model/User');
//对象规则验证
const Joi = require('joi');
//hash密码
const bcryptjs = require('bcryptjs');

const option = { // option选项及其默认值
  safe: true, // 安全模式
  upsert: false, //如果不存在则创建新纪录
  multi: false,  // 是否更新多个查询记录
  runValidators: null, // 如果值为true，执行Validation验证。
  setDefaultsOnInsert: null, // 如果upsert选项为true，在新建时插入文档定义的默认值。
  strict: null, // 用严格模式跟新
  overwrite: false // 禁用update-only模式，允许覆盖记录。
}

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
    gender: 0,
    birthday: null,
    phone: null,
    token: null,
  });
  return user
}
// 查找用户
async function findOne(body) {
  let user = await User.findOne(body);
  return user
}
// 修改更新
async function findOneAndUpdate(query, update) {
  try {
    const doc = await User.findOneAndUpdate(query, update);
    return doc
  } catch (error) {
    return error
  }
}

module.exports = {
  validateUser,
  createUser,
  findOne,
  findOneAndUpdate
}