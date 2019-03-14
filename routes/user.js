const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("config-lite")(__dirname);
const passport = require('passport');
const UserController = require("../controller/user");
const moment = require('moment');

require('../passport')(passport);

// 注册账户
router.post('/signup', (req, res, next) => {
	if (!req.body.name || !req.body.password) {
		res.json({ success: false, message: '请输入您的账号密码.' });
	} else {
		// 需要验证数据是否符合要求
		const newUser = {
			name: req.body.name,
			password: req.body.password,
			identifyingCode: '1234',
			endLoginTime: moment().format('YYYY-MM-DD HH:mm'),
			avatar: config.defaultHeadSculpture
		}

		// 保存用户账号
		UserController.createUser(newUser)
			.then(function (result) {
				console.log(result);
				res.json({ success: true, message: '成功创建新用户!' });
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
router.post('/signin', (req, res, next) => {

	UserController.getUserByName(req.body.name)
		.then(function (user) {
			if (!user) {
				res.json({ success: false, message: '认证失败,用户不存在!' });
			} else if (user) {
				// 检查密码是否正确
				user.comparePassword(req.body.password, (err, isMatch) => {
					if (isMatch && !err) {
						console.log('config.secret = ' + config.secret);
						let token = jwt.sign({ name: user.name }, config.secret, {
							expiresIn: 60*60*2// 授权时效2小时
						});
						user.token = token;
						user.save(function (err) {
							if (err) {
								res.send(err);
							}
						});
						res.json({
							success: true,
							message: '登录成功!',
							token: 'Bearer ' + token,
							name: user.name
						});
					} else {
						res.send({ success: false, message: '认证失败,密码错误!' });
					}
				});
			}
		})
		.catch(next)

});

// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.get('/userInfo',
	passport.authenticate('bearer', { session: false }),
	function (req, res) {
		res.json(req.user);
	});

module.exports = router;