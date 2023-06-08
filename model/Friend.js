const mongoose = require('mongoose');

//创建集合规则
const friendSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  state: {
    type: Number // 0已为好友，1申请中，2未同意
  },
  markName: {
    type: String
  },
  //创建时间
  createTime: {
    type: Date,
    default: Date.now
  },
  lastTime: {
    type: Date,
  }// 最后通讯时间
}, { versionKey: false });

const Friend = mongoose.model('Friend', friendSchema);

//导出对象
module.exports = {
  Friend,
}