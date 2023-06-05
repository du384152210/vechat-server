const mongoose = require('mongoose');

//创建集合规则
const gMessageSchema = mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String
  },
  types: {
    type: Number
  },
  time: {
    type: Date,
    default: Date.now 
  }
}, { versionKey: false });

const Gmessage = mongoose.model('Message', gMessageSchema);

//导出对象
module.exports = {
  Gmessage,
}