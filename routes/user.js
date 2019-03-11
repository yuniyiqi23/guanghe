const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("config-lite")(__dirname);
const passport = require('passport');
const UserController = require("../controller/user");

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
			endLoginTime: '1234'
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

// 检查用户名与密码并生成一个accesstoken如果验证通过
router.post('/accesstoken', (req, res, next) => {

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
							expiresIn: 10080
						});
						user.token = token;
						user.save(function (err) {
							if (err) {
								res.send(err);
							}
						});
						res.json({
							success: true,
							message: '验证成功!',
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
router.get('/user_info',
	passport.authenticate('bearer', { session: false }),
	function (req, res) {
		res.json({ username: req.user.name });
	});

module.exports = router;