const MyShowCommentModel = require('../models/myShowComment');
const enumDateStatus = require('../utils/enum').EnumDataStatus;

module.exports = {
    /**
     * @Description: 创建一条数据
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-24 10:47:22
     */
    create: function (myShowComment) {
        return MyShowCommentModel.create(myShowComment);
    },

    /**
     * @Description: 根据一条我秀获取评论数据（实现分页）
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-24 10:34:01
     */
    getMyShowCommentList: function (params) {
        let query = {
            myShowId: params.myShowId,
            dataStatus: enumDateStatus.Avail
        };
        // 实现分页 
        let skipNum = (params.pageNumber - 1) * params.pageSize;
        return MyShowCommentModel
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
     * @since: 2019-03-24 11:19:31
     */
    deleteMyShowCommentById: function (params) {
        return MyShowCommentModel
            .findOneAndUpdate(
                params,
                { $set: { dataStatus: enumDateStatus.Delete } }
            )
    },
};