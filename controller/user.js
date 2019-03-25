const UserModel = require('../models/user');
const enumDateStatus = require('../utils/enum').EnumDataStatus;

module.exports = {
	// 注册一个用户
	createUser: function (user) {
		return UserModel.create(user);
	},

	// 更新一个用户
	updateUser: function (userId, data) {
		return UserModel
			.findOneAndUpdate(
				{ _id: userId, dataStatus: enumDateStatus.Avail },
				{ $set: data, password: 0, endLoginTime: 0, isAdmin: 0, token: 0 },
				{ upsert: true, new: true })
	},

	// 通过微信 OpenId 获取用户信息
	getUserByWechatId: function (wechatId) {
		return UserModel
			.findOne({ wechatId: wechatId });
	},

	// 通过用户名获取用户信息
	getUserByName: function (name) {
		return UserModel
			.findOne({ name: name, dataStatus: enumDateStatus.Avail });
	},

	// 通过昵称获取用户信息
	getUserByNameAndNickName: function ({ name: name, nickName: nickName }) {
		if (!nickName) {
			return UserModel.findOne({ name: name, dataStatus: enumDateStatus.Avail });
		} else {
			return UserModel.findOne({
				$or: [
					{ name: name, dataStatus: enumDateStatus.Avail },
					{ nickName: nickName, dataStatus: enumDateStatus.Avail }
				]
			});
		}
		// return UserModel.find({ nickName: { $regex: nickName, $options: 'i' } });
	},

	// 获取全部用户
	getAllUsers: function () {
		return UserModel.find({ dataStatus: enumDateStatus.Avail });
	},

	// 获取全部老师列表
	getTeacherList: function (role) {
		return UserModel.find({ role: role, dataStatus: enumDateStatus.Avail });
	}

};
