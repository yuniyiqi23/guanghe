const CoursewareModel = require('../models/courseware');

module.exports = {
    // 创建一条数据
    create: function (courseware) {
        return CoursewareModel.create(courseware);
    },

    /**
     * @Description: 获取最新的数据
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-12 15:34:01
     */
    getCoursewareList: function ({author = null, pageNumber = 1, pageSize = 3}) {
        let query = {};
        if (author) {
			query.author = author;
        }
        // 分页 
		let skipNum = (pageNumber - 1) * pageSize;
        return CoursewareModel
            .find(query)
            .skip(skipNum)
			.limit(pageSize)
            .sort({ _id: -1 });
    },

    // 通过文章 id 获取一条数据
    getCoursewareListById: function (coursewareId) {
        return CoursewareModel
            .findOne({ _id: coursewareId })
            .populate({ path: 'author', model: 'User' });
    },
};