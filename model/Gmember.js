const mongoose = require('mongoose');

//创建集合规则
const gMemberSchema = mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String // 群内名称
  },
  tip: {
    type: Number, // 未读信息
    default: 0
  },
  shield: {
    type: Number // 是否屏蔽
  },
  time: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false });

const Gmember = mongoose.model('Gmember', gMemberSchema);

//导出对象
module.exports = {
  Gmember,
}