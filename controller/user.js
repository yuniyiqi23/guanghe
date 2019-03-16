const UserModel = require('../models/user');
// const DataStateEnum = require('../utils/enum').DataStateEnum;

module.exports = {
	// 注册一个用户
	createUser: function (user) {
		return UserModel.create(user);
	},

	// 更新一个用户
	updateUser: function (userId, data) {
		return UserModel.findOneAndUpdate({ _id: userId }, { $set: data }, { upsert: true, new: true })
	},

	// 通过用户名获取用户信息
	getUserByName: function (name) {
		return UserModel
			.findOne({ name: name });
	},

	// 通过昵称获取用户信息
	getUserByNickName: function (nickName) {
		return UserModel.find({ nickName: { $regex: nickName, $options: 'i' } });
	},

	// 获取全部用户
	getAllUsers: function () {
		return UserModel.find({});
	},

};
