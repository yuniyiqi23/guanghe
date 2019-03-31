const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const UserController = require("../controller/user");

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
            UserController.getUserByToken(token)
                .then(function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                })
                .catch(function (err) {
                    return done(err);
                })
        }
    ));
};
