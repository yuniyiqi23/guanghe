const CourseCollectionModel = require('../models/courseCollection');
const enumDateStatus = require('../utils/enum').EnumDataStatus;

module.exports = {
    /**
     * @Description: 创建一条数据
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-25 10:47:22
     */
    create: function (courseCollection) {
        return CourseCollectionModel.create(courseCollection);
    },

    /**
     * @Description: 根据某个用户获取收藏数据（实现分页）
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-25 10:34:01
     */
    getCourseCollectionList: function (params) {
        let query = {
            userId: params.userId,
            dataStatus: enumDateStatus.Avail
        };
        // 实现分页 
        let skipNum = (params.pageNumber - 1) * params.pageSize;
        return CourseCollectionModel
            .find(query)
            .skip(skipNum)
            .limit(params.pageSize)
            .populate({
                path: 'course',
                model: 'Courseware',
                // select: { 'nickName': 1, 'avatar': 1 }
            })
            .sort({ _id: -1 })
    },

    /**
     * @Description: 通过 id 删除一条数据
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-25 11:19:31
     */
    deleteCourseCollectionById: function (params) {
        return CourseCollectionModel
            .findOneAndUpdate(
                params,
                { $set: { dataStatus: enumDateStatus.Delete } }
            )
    },
};