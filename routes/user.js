const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config-lite')(__dirname);
const passport = require('passport');
const moment = require('moment');
const UserController = require("../controller/user");
// const checkToken = require("../utils/checkToken").checkToken;
const log = require('../utils/winston').getDefaultLogger;
const userRole = require('../utils/enum').UserRole;
require('../utils/passport')(passport);

// 测试跨域问题
router.get('/', function (req, res, next) {
	res.send('请求成功！');
})

router.post('/', function (req, res, next) {
	res.json({
		result: '请求成功！',
		message: '成功创建新用户!',
		name: req.body.name
	});
})

/**
 * @Description: 注册普通用户
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-17 22:22:53
 */
router.post('/registerUser', function (req, res, next) {
	if (!req.body.name || !req.body.password) {
		res.json({
			result: 'fail',
			message: '请输入您的账号密码！'
		});
	} else {
		// 需要验证数据是否符合要求
		const newUser = {
			name: req.body.name,
			password: req.body.password,
			avatar: req.body.avatar || config.defaultHeadSculpture,
			identifyingCode: userRole.User,
			// 随机验证码
			checkCode: parseInt(Math.random() * 90000 + 10000),
			endLoginTime: moment().format('YYYY-MM-DD HH:mm:ss')
		}

		// 创建用户
		UserController.createUser(newUser)
			.then(function (user) {
				// console.log(result);
				res.json({
					result: 'success',
					message: '成功创建新用户!',
					user: user
				});
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
router.post('/registerTeacher', (req, res, next) => {
	if (!req.body.name || !req.body.password || !req.body.nickName) {
		res.json({
			result: 'fail',
			message: '请输入您的昵称、账号、密码！'
		});
	} else {
		// 需要验证数据是否符合要求
		const newUser = {
			nickName: req.body.nickName,
			name: req.body.name,
			password: req.body.password,
			avatar: req.body.avatar || config.defaultHeadSculpture,
			// 随机验证码
			checkCode: parseInt(Math.random() * 90000 + 10000),
			identifyingCode: userRole.Teacher,
			endLoginTime: moment().format('YYYY-MM-DD HH:mm:ss')
		}

		// 保存用户账号
		// 检查 name 和 nickname 是否有重
		UserController.createUser(newUser)
			.then(function (user) {
				res.json({
					result: 'success',
					message: '成功创建新用户!',
					user: user
				});
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
	UserController.getUserByName(req.body.name)
		.then(function (user) {
			log('user').info(user);
			if (!user) {
				res.json({ result: 'success', message: '认证失败,用户不存在!' });
			} else if (user) {
				log('user').info(user);
				// 检查密码是否正确
				user.comparePassword(req.body.password, (err, isMatch) => {
					if (isMatch && !err) {
						let token = jwt.sign({ name: user.name }, config.secret, {
							expiresIn: 60 * 60 * 24 * 7// 授权时效7天
						});
						user.token = token;
						user.save(function (err) {
							log('user').error('user.save.err = ' + err);
							if (err) {
								res.send(err);
							}
						});
						res.json({
							result: 'success',
							message: '登录成功!',
							token: 'Bearer ' + token,
							name: user.name
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

/**
 * @Description: 通过昵称获取用户信息（昵称是唯一的）
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-16 18:46:56
 */
router.get('/searchUser', function (req, res, next) {
	log('user').info('/searchUser');
	UserController.getUserByNickName(req.query.nickName)
		.then(function (users) {
			res.json({
				result: 'success',
				message: '搜索用户成功!',
				users: users
			});
		})
		.catch(next)
});

module.exports = router;