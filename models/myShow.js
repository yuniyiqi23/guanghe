'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const enumDateStatus = require('../utils/enum').EnumDataStatus;

// MyShowSchema
const MyShowSchema = new Schema({
    // 用户id
    userId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    // 图片列表
    pictures: { type: Array, required: false },
    // 点赞数
    likeNumber: { type: Number, default: 0 },
    // 评论数
    commentNumber: { type: Number, default: 0 },
    // 位置信息
    location: { type: String},
    // 数据状态（是否有效）
    dataStatus: { type: String, default: enumDateStatus.Avail }
});
// 通过文章 id 获取该文章下所有留言，按留言创建时间升序排列
MyShowSchema.index({ userId: 1 });

module.exports = mongoose.model('MyShow', MyShowSchema);