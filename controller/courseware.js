const CoursewareModel = require('../models/courseware');
const enumDateStatus = require('../utils/enum').EnumDataStatus;

module.exports = {
    // 创建一条数据
    create: function (courseware) {
        return CoursewareModel.create(courseware);
    },

    /**
     * @Description: 
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

    // 获取课程数量
    getCoursewareCount: function (params) {
        let query = { dataStatus: enumDateStatus.Avail };
        // 参数：作者
        if (params.author) {
            query.author = params.author;
        }
        // 参数：课程类型
        if (params.courseType) {
            query.courseType = params.courseType;
        }
        // if (keyword) {
        // 	query = {
        // 		$or: [
        // 			{ title: { $regex: keyword, $options: '$i' } }, //  $options: '$i' 忽略大小写
        // 			{ content: { $regex: keyword, $options: '$i' } },
        // 			{ tags: { $regex: keyword, $options: '$i' } }
        // 		],
        // 	};
        // }
        return CoursewareModel
            .find(query)
            .where('publishTime').lte(new Date().toISOString())
            // .populate({ path: 'author', model: 'User' })
            .count()
    },

    // 通过文章 id 获取一条数据
    getCoursewareById: function (param) {
        const query = {
            _id: param.courseId,
            courseType: param.courseType,
            dataStatus: enumDateStatus.Avail
        };
        return CoursewareModel.findOne(query);
    },

    /**
     * @Description: 转发课程数量 +1
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-04-02 17:30:14
     */
    addForwardNumber: function (param){
        const query = {
            _id: param.courseId,
            dataStatus: enumDateStatus.Avail
        };
        return CoursewareModel.findByIdAndUpdate(query, { $inc: { forwardCount: 1 } });
    },
};