'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;

// CoursewareSchema
const CoursewareSchema = new Schema({
    // 用户信息（id、nickName、头像）
    author: { type: Object, required: true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    // 照片的路径
    // pictures: { type: Array, default: [] },
    // 音频路径
    audioURL: { type: String, required: false },
    // 浏览数
    pv: { type: Number, required: false },
    // state: { type: Number, required: false }
    publishTime: { type: String, required: true },
  });
  // 按创建时间降序查看用户的文章列表
  CoursewareSchema.index({ author: 1, _id: -1 });
  CoursewareSchema.index({ title: 1 });

  module.exports = mongoose.model('Courseware', CoursewareSchema);