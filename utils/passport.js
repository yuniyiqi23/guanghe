const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');

/**
 * @Description: 通过Token验证用户
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-13 10:12:10
 */
module.exports = function () {
    passport.use(new Strategy(
        function (token, done) {
            User.findOne({ token: token })
                .then(function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    // 删除 password;
                    user.password = null;
                    delete user.password;
                    return done(null, user);
                })
                .catch(function (err) {
                    return done(err);
                })
        }
    ));
};
