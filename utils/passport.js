const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');
const enumDateStatus = require('./enum').EnumDataStatus;

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
            User.findOne({
                token: token,
                dataStatus: enumDateStatus.Avail
            },
                { _id: 1, nickName: 1, avatar: 1 })
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
