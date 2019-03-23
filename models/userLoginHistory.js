'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;

// UserLoginHistorySchema
const UserLoginHistorySchema = new Schema({
    // 用户id
    userId: { type: Schema.Types.ObjectId, required: true },
    // 最后一次登录时间
    loginTime: { type: String, required: true },
});
// 索引
UserLoginHistorySchema.index({ userId: 1});

module.exports = mongoose.model('UserLoginHistory', UserLoginHistorySchema);