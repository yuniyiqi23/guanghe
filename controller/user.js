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
				{ $set: data },
				{
					upsert: true, new: true,
					select: { '_id': 1, 'nickName': 1, 'avatar': 1 }
				})
	},

	// 通过微信 OpenId 获取用户信息
	getUserByWechatId: function (wechatId) {
		return UserModel
			.findOne({ wechatId: wechatId, dataStatus: enumDateStatus.Avail });
	},

	// 通过 Token 获取用户信息
	getUserByToken: function (token) {
		if(token.indexOf('Bearer') != -1){
			return UserModel.findOne({
				token: token.slice(7),
				dataStatus: enumDateStatus.Avail
			},
				{ _id: 1, nickName: 1, avatar: 1 })
		}else{
			return UserModel.findOne({
				token: token,
				dataStatus: enumDateStatus.Avail
			},
				{ _id: 1, nickName: 1, avatar: 1 })
		}
		
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
	},

	// 获取全部用户
	getAllUsers: function () {
		return UserModel.find({ dataStatus: enumDateStatus.Avail });
	},

	// 获取全部老师列表
	getTeacherList: function (params) {
		if (params.teacherName) {
			return UserModel.find({
				role: params.userRole,
				dataStatus: enumDateStatus.Avail,
				nickName: { $regex: params.teacherName, $options: '$i' }
			}, { _id: 1, nickName: 1, avatar: 1 })
		} else {
			return UserModel.find({
				role: params.userRole,
				dataStatus: enumDateStatus.Avail
			}, { _id: 1, nickName: 1, avatar: 1 })
		}
	}

};
