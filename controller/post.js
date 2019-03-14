const PostModel = require('../models/post');

module.exports = {
    // 创建一条数据
    create: function (post) {
        return PostModel.create(post);
    },

    /**
     * @Description: 获取最新的数据
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-12 15:34:01
     */
    getPostList: function ({author = null, pageNumber = 1, pageSize = 3}) {
        let query = {};
        if (author) {
			query.author = author;
        }
        // 分页 
		let skipNum = (pageNumber - 1) * pageSize;
        return PostModel
            .find(query)
            .skip(skipNum)
			.limit(pageSize)
            .sort({ _id: -1 });
    },

    // 通过文章 id 获取一条数据
    getPostById: function (postId) {
        return PostModel
            .findOne({ _id: postId })
            .populate({ path: 'author', model: 'User' });
    },


};