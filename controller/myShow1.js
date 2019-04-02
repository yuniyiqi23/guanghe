const MyShowModel = require('../models/myShow');
const enumDateStatus = require('../utils/enum').EnumDataStatus;

module.exports = {
    /**
     * @Description: 创建一条数据
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-22 16:47:22
     */
    create: function (myshow) {
        return MyShowModel.create(myshow);
    },

    /**
     * @Description: 获取数据，实现分页功能
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-12 15:34:01
     */
    getMyshowList: function (params) {
        let query = {
            dataStatus : enumDateStatus.Avail
        };
        if (params.userId) {
            query.user = params.userId;
        }
        // 实现分页 
        let skipNum = (params.pageNumber - 1) * params.pageSize;
        return MyShowModel
            .find(query)
            .skip(skipNum)
            .limit(params.pageSize)
            .populate({
                path: 'user',
                model: 'User',
                select: { 'nickName': 1, 'avatar': 1 }
            })
            .sort({ _id: -1 });
    },

    // 通过文章 id 获取一条数据
    getMyshowById: function (myshowId) {
        return MyShowModel
            .findOne({
                _id: myshowId,
                dataStatus: enumDateStatus.Avail
            })
    },
};