'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const enumDateStatus = require('../utils/enum').EnumDataStatus;

// CourseBossModel
const CourseBossModel = new Schema({
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
    // 数据状态（是否有效）
    dataStatus: { type: String, default: enumDateStatus.Avail },
    publishTime: { type: String, required: true },
  });
  // 按创建时间降序查看用户的文章列表
  CourseBossModel.index({ author: 1, _id: -1 });
  CourseBossModel.index({ title: 1 });

  module.exports = mongoose.model('CourseBoss', CourseBossModel);