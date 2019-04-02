const express = require('express');
const router = express.Router();
const config = require('config-lite')(__dirname);
const passport = require('passport');
const moment = require('moment');
const Joi = require('joi');
const md5 = require('md5-node');
const UserController = require("../controller/user");
const getToken = require("../utils/token").getToken;
const log = require('../utils/winston').getDefaultLogger;
const userRole = require('../utils/enum').EnumUserRole;
require('../utils/passport')(passport);

// 验证参数
const schema = Joi.object().keys({
	name: Joi.string().min(3).max(30).required(),
	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
	avatar: Joi.string()
});

/**
 * @Description: 注册普通用户
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-17 22:22:53
 */
router.post('/registerUser', function (req, res, next) {
	// 验证参数
	const schemavalue = Joi.object().keys({
		name: Joi.string().min(3).max(30).required(),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
		mobile: Joi.string().required()
	});
	// 校验参数
	const result = Joi.validate({
		name: req.body.name,
		password: req.body.password,
		mobile: req.body.mobile
	}, schemavalue);

	if (result.error !== null) {
		return res.send(result.error.message);
	} else {
		// 需要验证数据是否符合要求
		const newUser = {
			name: req.body.name,
			password: req.body.password,
			// 系统生成昵称
			nickName: 'user_' + md5(moment()),
			mobile: req.body.mobile,
			avatar: req.body.avatar || config.defaultHeadSculpture,
			role: userRole.User,
			// 随机验证码
			checkCode: parseInt(Math.random() * 90000 + 10000),
			endLoginTime: moment().format('YYYY-MM-DD HH:mm:ss')
		}

		// 创建用户
		UserController.createUser(newUser)
			.then(function (user) {
				if (user) {
					res.json({
						result: 'success',
						message: '成功创建新用户!',
					});
				} else {
					res.json({
						result: 'fail',
						message: '创建新用户失败!',
					});
				}
			})
			.catch(next)
	}
});

/**
 * @Description: 用户登录，检查用户名与密码并生成一个accesstoken
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-12 16:42:15
 */
router.post('/signin', function (req, res, next) {
	log('user').info('/signin');
	// 校验参数
	const result = Joi.validate({
		name: req.body.name,
		password: req.body.password,
	}, schema);
	if (result.error !== null) {
		return res.send(result.error.message);
	} else {
		UserController.getUserByName(req.body.name)
			.then(function (user) {
				if (!user) {
					res.json({ result: 'success', message: '认证失败,用户不存在!' });
				} else if (user) {
					// log('user').info(user);
					// 检查密码是否正确
					user.comparePassword(req.body.password, (err, isMatch) => {
						if (isMatch && !err) {
							let token = getToken(user.name);
							user.token = token;
							user.save(function (err) {
								if (err) {
									log('user').error('user.save.err = ' + err);
									res.send(err);
								} else {
									res.json({
										result: 'success',
										message: '登录成功!',
										username: user.name,
										token: 'Bearer ' + token
									});
								}
							});

						} else {
							res.send({ result: 'fail', message: '认证失败,密码错误!' });
						}
					});
				}
			})
			.catch(function (err) {
				log('user').error('catch error = ' + err);
			})
	}
});

/**
 * @Description: 更新用户信息
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-25 16:03:37
 */
router.put('/info', passport.authenticate('bearer', { session: false }), function (req, res, next) {
	const userId = req.user.id;
	if (!userId) {
		res.json({
			result: 'fail',
			message: '用户Id不存在!'
		});
	}
	const data = {
		nickName: req.body.nickName,
		avatar: req.body.avatar
	};
	// 验证参数
	const schema = Joi.object().keys({
		nickName: Joi.string().required(),
		avatar: Joi.string().required()
	});
	const result = Joi.validate(data, schema);
	if (result.error !== null) {
		return res.send(result.error.message);
	} else {
		// 更新用户信息
		UserController.updateUser(userId, data)
			.then(function (user) {
				if (!user.errors) {
					res.json({
						result: 'success',
						message: '更新用户信息成功!',
						user: user
					});
				} else {
					res.json({
						result: 'fail',
						message: user.errors.message
					});
				}
			})
			.catch(next)
	}

});

/**
 * @Description: 注册老师
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-16 09:26:50
 */
router.post('/registerTeacher', passport.authenticate('bearer', { session: false }), (req, res, next) => {
	log('user').info('/registerTeacher');
	if (!req.body.name || !req.body.nickName) {
		res.json({
			result: 'fail',
			message: '请输入您的昵称、账号、密码！'
		});
	} else {
		// 需要验证数据是否符合要求
		const newUser = {
			nickName: req.body.nickName,
			name: req.body.name,
			// 默认初始密码
			password: '111111',
			avatar: req.body.avatar || config.defaultHeadSculpture,
			// 随机验证码
			checkCode: parseInt(Math.random() * 90000 + 10000),
			role: userRole.Teacher,
			endLoginTime: moment().format('YYYY-MM-DD HH:mm:ss')
		}
		// 校验参数
		// const result = Joi.validate(newUser, schema);
		// if (result.error !== null) {
		// 	return res.send(result.error.message);
		// }
		// 保存用户账号
		// 检查 name 和 nickname 是否有重
		UserController.getUserByNameAndNickName({ name: req.body.name, nickName: req.body.nickName })
			.then(function (user) {
				if (!user) {
					UserController.createUser(newUser)
						.then(function (user) {
							res.json({
								result: 'success',
								message: '成功创建新用户!',
								user: user
							});
						})
						.catch(next)
				} else {
					res.json({
						result: 'fail',
						message: '已存在用户名、昵称相同的用户!',
					});
				}
			})
			.catch(next)
	}
});

/**
 * @Description: 获取全部老师列表
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-16 18:46:56
 */
router.get('/teacherList', passport.authenticate('bearer', { session: false }), function (req, res, next) {
	log('user').info('/teacherList');
	let params = {
		userRole: userRole.Teacher
	}
	const teacherName = req.query.teacherName;
	if (teacherName) {
		params.teacherName = teacherName;
	}
	UserController.getTeacherList(params)
		.then(function (teachers) {
			res.json({
				result: 'success',
				message: '获取老师列表成功!',
				teachers: teachers
			});
		})
		.catch(next)
});

// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.get('/info', passport.authenticate('bearer', { session: false }), function (req, res) {
	res.json({
		result: 'success',
		message: '获取用户信息成功！',
		user: req.user
	});
});

module.exports = router;