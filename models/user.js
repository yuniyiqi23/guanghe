'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// UserSchema
const UserSchema = new Schema({
    nickName: { type: String, required: false },
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    gender: { type: String, enum: ["m", "f", "x"], default: "x" },
    bio: { type: String, required: false },
    mobile: { type: Number, required: false },
    //账号可验证的时间期限（注册日期+1）
    // date: { type: Number, required: true },
    //是否通过验证
    // dataStatus: { type: String, default: '0' },
    //验证码
    identifyingCode: { type: String, required: true },
    //最后一次登录时间
    endLoginTime: { type: String, required: true },
    //判断是否是管理员
    isAdmin: { type: Boolean, default: false },
    token: { type: String }
});

UserSchema.index({ name: 1 }, { unique: true });

// 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);