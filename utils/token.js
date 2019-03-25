/*
 * @Description: Token
 * @Author: yep
 * @LastAuthor: Do not edit
 * @since: 2019-03-14 17:12:46
 * @lastTime: 2019-03-25 15:51:52
 */
const jwt = require('jsonwebtoken');
const config = require('config-lite')(__dirname);
const passport = require('passport');
// require('./passport')(passport);

module.exports = {

	// 获取Token
	getToken: function getToken(value) {
		try {
			const token = jwt.sign({ name: value }, config.secret, {
				expiresIn: config.expiresIn// 授权时效7天
			});
			return token;
		} catch (err) {
			return err;
		}

	},

	// 验证Token
	checkToken: function checkToken(req, res, next) {
		passport.authenticate('bearer', { session: false })
		next();
	}

};