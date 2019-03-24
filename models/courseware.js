'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const enumDateStatus = require('../utils/enum').EnumDataStatus;

// CoursewareSchema
const CoursewareSchema = new Schema({
  // 作者信息（id、nickName、头像）
  author: { type: Object, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  // 音频路径
  audioURL: { type: String },
  // 视频路径
  videoURL: { type: String },
  // 视频封面
  cover: { type: String },
  // 视频切片
  videoPictures: { type: String },
  // 课程类型
  courseType: { type: String, required: true },
  // 浏览数
  pv: { type: Number, required: false },
  // 数据状态（是否有效）
  dataStatus: { type: String, default: enumDateStatus.Avail },
  publishTime: { type: String, required: true }
});
// 按创建时间降序查找
CoursewareSchema.index({ author: 1, _id: -1 });
CoursewareSchema.index({ title: 1 });
CoursewareSchema.index({ courseType: 1, _id: 1 });

module.exports = mongoose.model('Courseware', CoursewareSchema);