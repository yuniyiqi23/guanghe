const CourseBossModel = require('../models/courseBoss');

module.exports = {
    // 创建一条数据
    create: function (courseware) {
        return CourseBossModel.create(courseware);
    },

    /**
     * @Description: 获取数据，实现按用户搜索和分页功能
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-20 10:21:28
     */
    getcourseBossList: function ({author = null, pageNumber = 1, pageSize = 3}) {
        let query = {};
        if (author) {
			query.author = author;
        }
        // 分页 
		let skipNum = (pageNumber - 1) * pageSize;
        return CourseBossModel
            .find(query)
            .skip(skipNum)
			.limit(pageSize)
            .sort({ _id: -1 });
    },

    // 通过文章 id 获取一条数据
    getCoursewareListById: function (coursewareId) {
        return CourseBossModel
            .findOne({ _id: coursewareId })
            .populate({ path: 'author', model: 'User' });
    },
};