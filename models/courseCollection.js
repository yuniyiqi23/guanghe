'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const enumDateStatus = require('../utils/enum').EnumDataStatus;

// CourseCollectionSchema
const CourseCollectionSchema = new Schema({
    // 用户id
    userId: { type: Schema.Types.ObjectId, required: true },
    // 课程id,连表查询时会返回名为course的课程对象
    course: { type: Schema.Types.ObjectId, required: true },
    // 数据状态（是否有效）
    dataStatus: { type: String, default: enumDateStatus.Avail }
});
// 索引
CourseCollectionSchema.index({ userId: 1});

module.exports = mongoose.model('CourseCollection', CourseCollectionSchema);