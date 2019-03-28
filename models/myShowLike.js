'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const enumDateStatus = require('../utils/enum').EnumDataStatus;

// MyShowLikeSchema
const MyShowLikeSchema = new Schema({
    // 用户id
    userId: { type: Schema.Types.ObjectId, required: true },
    // myShowId
    myShowId: { type: Schema.Types.ObjectId, required: true },
    // 数据状态（是否有效）
    dataStatus: { type: String, default: enumDateStatus.Avail }
},
    { safe: true } // 使用安全模式. 表示在写入操作时,如果发生错误,也需要返回信息.
);
MyShowLikeSchema.set('toJSON', { getters: true });
// 索引
MyShowLikeSchema.index({ userId: 1 });
MyShowLikeSchema.index({ myShowId: 1 });

module.exports = mongoose.model('myShowLike', MyShowLikeSchema);