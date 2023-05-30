const mongoose = require('mongoose');
//创建用户集合规则
const userSchema = mongoose.Schema({
	nickName: {
		type: String,
		minlength: 2,
		maxlength: 15
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	//头像
	avatar: {
		type: String,
		default: null
	},
	sex: {
		type: Integer,
		default: 0,
	},
	birthday: {
		type: String,
		default: null,
	},
	phone: {
		type: String,
		default: null,
	},
	token: {
		type: String,
		default: null,
	},
	//创建时间
	createTime: {
		type: Date,
		default: Date.now
	}
}, { versionKey: false });

//用户集合类
const User = mongoose.model('User', userSchema);

//导出对象
module.exports = {
	User,
}