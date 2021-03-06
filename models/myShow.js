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
    likeCount: { type: Number, default: 0 },
    // 是否已点赞
    isLiked: { type: Boolean, default: false},
    // 评论数
    commentCount: { type: Number, default: 0 },
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
MyShowSchema.post("find", function (myShows, next) {
    return Promise.all(
        myShows.map(function (myShow) {
            return MyShowCommentModel.find({
                myShowId: myShow._id,
                dataStatus: enumDateStatus.Avail
            }).then(function (result) {
                if (!result.errors) {
                    myShow.commentCount = result.length;
                    return myShow;
                } else {
                    throw new Error(result.errors.message)
                }
            })
                .catch(next);
        })
    );
});

/**
 * @Description: 给 myShowList 添加点赞数 likeCount，userId数组
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-28 10:31:23
 */
MyShowSchema.post("find", function (myShows, next) {
    return Promise.all(
        myShows.map(function (myShow) {
            return MyShowLikeModel.find({ myShowId: myShow._id })
                // .lean().exec(function (err, result) {
                //     if(err) next(err);
                //     if (!result.errors) {
                //         myShow.likedUserList = result;
                //         myShow.likeCount = result.length;
                //         // myShow.likeNumber = result.length;
                //         return myShow;
                //     } else {
                //         throw new Error(result.errors.message)
                //     }
                // })
                .then(function (result) {
                    // throw new Error('MyShowSchema Test Error!')
                    if (!result.errors) {
                        myShow.likedUserList = result;
                        myShow.likeCount = result.length;
                        return myShow;
                    } else {
                        throw new Error(result.errors.message)
                    }
                })
                .catch(next);
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