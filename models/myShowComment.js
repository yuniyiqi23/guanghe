'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const enumDateStatus = require('../utils/enum').EnumDataStatus;

// MyShowCommentSchema
const MyShowCommentSchema = new Schema({
  // 用户id
  userId: { type: Schema.Types.ObjectId, required: true},
  myshowId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  // 数据状态（是否有效）
  dataStatus: { type: String, default: enumDateStatus.Avail },
});
// 索引
MyShowCommentSchema.index({ myshowId: 1});

module.exports = mongoose.model('MyShowComment', MyShowCommentSchema);