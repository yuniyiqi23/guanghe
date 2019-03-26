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
        let query = { dataStatus: enumDateStatus.Avail };
        // 参数：搜索关键字
        if (param.keyword) {
            //全文索引
            query.$text = { $search: param.keyword };
        }
        // 参数：用户昵称
        if (param.author) {
            query.author = param.author;
        }
        // 参数：课程类型
        if (param.courseType) {
            query.courseType = param.courseType;
        }
        // 分页 
        let skipNum = (param.pageNumber - 1) * param.pageSize;
        return CoursewareModel
            .find(query)
            .where('publishTime').lte(new Date().toISOString())
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