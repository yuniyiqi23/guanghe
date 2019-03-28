'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const enumDateStatus = require('../utils/enum').EnumDataStatus;
const CourseCommentModel = require('./courseComment');

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

/**
 * @Description: 给 courseware 详情添加留言数 commentCount
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-28 10:31:13
 */
// CoursewareSchema.post("find", function (courses) {
//   return Promise.all(
//     courses.map(function (course, next) {
//       return CourseCommentModel.find({
//         courseId: course._id,
//         dataStatus: enumDateStatus.Avail
//       }).then(function (result) {
//         if (!result.errors) {
//           course.commentCount = result.length;
//           return course;
//         } else {
//           throw new Error(result.errors.message)
//         }
//       })
//         .catch(next);
//     })
//   );
// });

/**
 * @Description: 给 courseware 详情添加留言数 commentCount
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-28 10:31:13
 */
CoursewareSchema.post("findOne", function (course) {
  if (course) {
    return CourseCommentModel.find({
      courseId: course._id,
      dataStatus: enumDateStatus.Avail
    })
      .then(function (result) {
        if (result) {
          course.commentCount = result.length;
          return course;
        }
      });
  }
});

module.exports = mongoose.model('Courseware', CoursewareSchema);