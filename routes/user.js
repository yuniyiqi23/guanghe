const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("config-lite")(__dirname);
const passport = require('passport');
const moment = require('moment');
const bcrypt = require('bcrypt');
const UserController = require("../controller/user");
// const checkToken = require("../utils/checkToken").checkToken;
const log = require("../utils/winston").getDefaultLogger;
require('../utils/passport')(passport);

// 注册账户
router.post('/signup', (req, res, next) => {
	if (!req.body.name || !req.body.password) {
		res.json({
			result: 'fail',
			message: '请输入您的账号密码.'
		});
	} else {
		// 需要验证数据是否符合要求
		const newUser = {
			name: req.body.name,
			password: req.body.password,
			identifyingCode: parseInt(Math.random() * 90000 + 10000),// 随机验证码
			endLoginTime: moment().format('YYYY-MM-DD HH:mm:ss'),
			avatar: req.body.avatar || config.defaultHeadSculpture
		}

		// 保存用户账号
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
 * @Description: 模拟用户登录
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-16 09:26:50
 */
router.get('/getToken', (req, res, next) => {
	log('user').info('/getToken');
	const name = 'gh_daom';
	let token = jwt.sign({ name: name }, config.secret, {
		expiresIn: 60 * 60 * 2// 授权时效2小时
	});
	res.json({
		result: 'success',
		message: '登录成功!',
		token: 'Bearer ' + token,
		name: name
	});

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
				validatesPassword(user, req.body.password)
					.then(function (result) {
						if (result) {
							let token = jwt.sign({ name: user.name }, config.secret, {
								expiresIn: 60 * 60 * 2// 授权时效2小时
							});
							// user.token = token;
							UserController.updateUser(user._id, { token: token })
								.then(function (user) {
									if (user) {
										res.json({
											result: 'success',
											message: '登录成功!',
											token: 'Bearer ' + token,
											name: user.name
										})
									} else {
										res.send({ result: 'fail', message: '认证失败,密码错误!' });
									}
								})
								.catch(next)

							// user.comparePassword(req.body.password, (err, isMatch) => {
							// 	log('user').error('err = ' + err);
							// 	if (isMatch && !err) {
							// 		let token = jwt.sign({ name: user.name }, config.secret, {
							// 			expiresIn: 60 * 60 * 2// 授权时效2小时
							// 		});
							// 		user.token = token;
							// 		user.save(function (err) {
							// 			log('user').error('user.save.err = ' + err);
							// 			if (err) {
							// 				res.send(err);
							// 			}
							// 		});
							// 		res.json({
							// 			result: 'success',
							// 			message: '登录成功!',
							// 			token: 'Bearer ' + token,
							// 			name: user.name
							// 		});
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

function validatesPassword(user, password) {
	return Promise.resolve(
		bcrypt.compare(password, user.password)
			.then(function (result) {
				if (result === true) {
					return true;
				} else {
					return false;
					// res.render("signin", {
					//   username: user.name,
					//   error: "密码错误！"
					// });
				}
			})
	);
}

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