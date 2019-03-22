'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const enumDateStatus = require('../utils/enum').EnumDataStatus;

// CommentSchema
const CommentSchema = new Schema({
  // 用户信息（id、nickName、头像）
  author: { type: Object, required: true},
  content: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, required: true },
  // 数据状态（是否有效）
  dataStatus: { type: String, default: enumDateStatus.Avail },
  // replys: { type: Array, default: [] }
});
// 通过文章 id 获取该文章下所有留言，按留言创建时间升序排列
CommentSchema.index({ postId: 1, _id: 1 });
CommentSchema.plugin(plugins.createdAt);


module.exports = mongoose.model('Courseware', CoursewareSchema);