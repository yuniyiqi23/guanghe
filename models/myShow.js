'use strict';

const mongoose = require('../mongodb/db.js');
const Schema = mongoose.Schema;
const enumDateStatus = require('../utils/enum').EnumDataStatus;
const MyShowCommentModel = require('./myShowComment');
const MyShowLikeModel = require('./myShowLike');

// MyShowSchema
const MyShowSchema = new Schema({
    // 用户id，连表查询时会返回名为user的用户对象
    user: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    // 图片列表
    pictures: { type: Array, required: false },
    // 点赞数
    // likeNumber: { type: Number, default: 0 },
    // 评论数
    // commentNumber: { type: Number, default: 0 },
    // 位置信息
    location: { type: String },
    // 数据状态（是否有效）
    dataStatus: { type: String, default: enumDateStatus.Avail }
});
// 通过文章 id 获取该文章下所有留言，按留言创建时间升序排列
MyShowSchema.index({ userId: 1 });

/**
 * @Description: 给 myShowList 添加留言数 commentCount
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-28 10:31:13
 */
MyShowSchema.post("find", function (myShows) {
    return Promise.all(
        myShows.map(function (myShow) {
            return MyShowCommentModel.find({ 
                myShowId: myShow._id,
                dataStatus: enumDateStatus.Avail 
            }).then(function (result) {
                if (result) {
                    myShow.commentCount = result.length;
                    // myShow.commentNumber = result.length;
                    return myShow;
                }
            });
        })
    );
});

/**
 * @Description: 给 myShowList 添加点赞数 likeCount
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-28 10:31:23
 */
MyShowSchema.post("find", function (myShows) {
    return Promise.all(
        myShows.map(function (myShow) {
            return MyShowLikeModel.find({ myShowId: myShow._id }).then(function (result) {
                if (result) {
                    myShow.likeCount = result.length;
                    // myShow.likeNumber = result.length;
                    return myShow;
                }
            });
        })
    );
});

// 添加中间件 通过文章 id 获取所有留言()
// MyShowSchema.post("findOne", function (myShow) {
//     if (myShow) {
//         return Comment.find({ myShowId: myShow._id }).then(function (results) {
//             if (results) {
//                 myShow.commentsCount = commentsCount;
//                 return myShow;
//             }
//         });
//     }
// });


module.exports = mongoose.model('MyShow', MyShowSchema);