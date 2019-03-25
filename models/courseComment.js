'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const enumDateStatus = require('../utils/enum').EnumDataStatus;

// CourseCommentSchema
const CourseCommentSchema = new Schema({
  // 用户id，连表查询时会返回名为user的key
  user: { type: Schema.Types.ObjectId, required: true},
  courseId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  // 数据状态（是否有效）
  dataStatus: { type: String, default: enumDateStatus.Avail },
});
// 索引
CourseCommentSchema.index({ courseId: 1});

module.exports = mongoose.model('CourseComment', CourseCommentSchema);