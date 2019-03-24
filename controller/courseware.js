const CoursewareModel = require('../models/courseware');
const enumDateStatus = require('../utils/enum').EnumDataStatus;

module.exports = {
    // 创建一条数据
    create: function (courseware) {
        return CoursewareModel.create(courseware);
    },

    /**
     * @Description: 获取数据，实现按用户搜索和分页功能
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-12 15:34:01
     */
    getCoursewareList: function (param) {
        let query = {
            courseType: param.courseType,
            dataStatus: enumDateStatus.Avail
        };
        if (param.author) {
            query.author = param.author;
        }
        // 分页 
        let skipNum = (param.pageNumber - 1) * param.pageSize;
        return CoursewareModel
            .find(query)
            .skip(skipNum)
            .limit(param.pageSize)
            .sort({ _id: -1 });
    },

    // 通过文章 id 获取一条数据
    getCoursewareById: function (param) {
        let query = {
            _id: param.courseId,
            courseType: param.courseType,
            dataStatus: enumDateStatus.Avail
        };
        return CoursewareModel.findOne(query);
    },
};