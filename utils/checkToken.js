/*
 * @Description: 验证Token
 * @Author: yep
 * @LastAuthor: Do not edit
 * @since: 2019-03-14 17:12:46
 * @lastTime: 2019-03-14 17:31:56
 */
const passport = require('passport');
require('./passport')(passport);

module.exports = {
	checkToken: function checkToken(req, res, next) {
		passport.authenticate('bearer', { session: false })
		next();
	}

};