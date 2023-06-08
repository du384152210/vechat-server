const mongoose = require('mongoose');

//创建集合规则
const MessageSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String
  },
  types: {
    type: Number
  },// 状态 （0，已读，1未读）
  state: {
    type: Number
  },
  time: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

const Message = mongoose.model('Message', MessageSchema);

//导出对象
module.exports = {
  Message,
}