/*
 * @Description: Token
 * @Author: yep
 * @LastAuthor: Do not edit
 * @since: 2019-03-14 17:12:46
 * @lastTime: 2019-03-21 16:49:07
 */
const jwt = require('jsonwebtoken');
const config = require('config-lite')(__dirname);
const passport = require('passport');
// require('./passport')(passport);

module.exports = {

	// 获取Token
	getToken: function getToken(value){
		return jwt.sign({ name: value }, config.secret, {
			expiresIn: 60 * 60 * 24 * 7// 授权时效7天
		});
	},

	// 验证Token
	checkToken: function checkToken(req, res, next) {
		passport.authenticate('bearer', { session: false })
		next();
	}

};