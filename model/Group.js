const mongoose = require('mongoose');

//创建集合规则
const groupSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },// 群主id
  name: {
    type: String
  },
  cover: {
    type: String
  },
  notice: {
    type: String
  },
  createTime: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false });

const Group = mongoose.model('Group', groupSchema);

//导出对象
module.exports = {
  Group,
}