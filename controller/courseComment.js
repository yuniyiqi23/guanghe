const CourseCommentModel = require('../models/courseComment');
const enumDateStatus = require('../utils/enum').EnumDataStatus;

module.exports = {
    /**
     * @Description: 创建一条数据
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-25 10:47:22
     */
    create: function (courseComment) {
        return CourseCommentModel.create(courseComment);
    },

    /**
     * @Description: 根据某个课程获取评论数据（实现分页）
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-25 10:34:01
     */
    getCourseCommentList: function (params) {
        let query = {
            courseId: params.courseId,
            dataStatus: enumDateStatus.Avail
        };
        // 实现分页 
        let skipNum = (params.pageNumber - 1) * params.pageSize;
        return CourseCommentModel
            .find(query)
            .skip(skipNum)
            .limit(params.pageSize)
            .populate({
                path: 'user',
                model: 'User',
                select: { 'nickName': 1, 'avatar': 1 }
            })
            .sort({ _id: 1 })
    },

    /**
     * @Description: 通过 id 删除一条数据
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-25 11:19:31
     */
    deleteCourseCommentById: function (params) {
        params.dataStatus = enumDateStatus.Avail;
        return CourseCommentModel
            .findOneAndUpdate(
                params,
                { $set: { dataStatus: enumDateStatus.Delete } }
            )
    },
};