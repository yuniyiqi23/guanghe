const MyShowLikeModel = require('../models/myShowLike');
const enumDateStatus = require('../utils/enum').EnumDataStatus;

module.exports = {
    /**
     * @Description: 创建一条数据
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-27 10:47:22
     */
    create: function (myShowLike) {
        return MyShowLikeModel.create(myShowLike);
    },

    /**
     * @Description: 通过 id 删除一条数据(delete)
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-27 11:19:31
     */
    deleteMyShowLikeById: function (params) {
        params.dataStatus = enumDateStatus.Avail;
        return MyShowLikeModel
            .findOneAndRemove({ userId: params.userId, myShowId: params.myShowId })
    },
};