const express = require('express');
const router = express.Router();
const passport = require('passport');
const MyShowController = require('../controller/myShow1');
const Joi = require('joi');
const log = require('../utils/winston').getDefaultLogger;
const UserController = require("../controller/user");
const ObjectId = require('mongoose').Types.ObjectId;
require('../utils/passport')(passport);

/**
 * @Description: 创建 MyShow
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-22 14:15:35
 */
router.post('/create', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    const userId = req.user.id;
    const content = req.body.content;
    const pictures = req.body.pictures;
    const location = req.body.location;
    // 判断数据是否为空
    if (content === undefined && pictures === undefined) {
        res.json({
            result: 'fail',
            message: '参数（内容和图片）都为空!'
        });
    } else {
        const value = {
            user: userId,
            content: content,
            pictures: pictures,
            location: location
        };

        MyShowController.create(value)
            .then(function (result) {
                if (result) {
                    res.json({
                        result: 'success',
                        message: '发布我秀成功!'
                    });
                }
            })
            .catch(next)
    }

});

/**
 * @Description: 获取我秀数据，可根据用户id获取数据，分页获取
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-22 14:13:58
 */
router.get('/list', function (req, res, next) {
    log('myshow').info('/list');
    const paramSchema = Joi.object().keys({
        pageNumber: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(1).max(100),
    })
    // 验证数据
    Joi.validate({
        pageNumber: parseInt(req.query.pageNumber),
        pageSize: parseInt(req.query.pageSize)
    },
        paramSchema,
        function (err, value) {
            if (err) {
                log('myshow').error(err.message);
                return res.send(err.message);
            } else {
                // 参数
                const param = {
                    pageNumber: parseInt(req.query.pageNumber) || 1,
                    pageSize: parseInt(req.query.pageSize) || 3,
                }
                // 判断是否获取“我”的我秀数据
                const myShowself = req.query.self;
                if (myShowself) {
                    log('myshow').info('getMyShowSelf');
                    // 判断 Token 是否存在
                    const token = req.headers.authorization;
                    if (token) {
                        (async () => {
                            try {
                                const userInfo = await UserController.getUserByToken(token);
                                param.userId = ObjectId(userInfo.id);
                                // 查询我秀数据
                                MyShowController.getMyshowList(param)
                                    .then(function (myShowList) {
                                        // 标记已点赞过的我秀
                                        myShowList.map(function (myShow) {
                                            if (myShow.likedUserList instanceof Array) {
                                                if (myShow.likedUserList.length > 0) {
                                                    myShow.likedUserList.map((liked) => {
                                                        if (liked.userId.toString() == userInfo.id) {
                                                            myShow.isLiked = true;
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                        res.json({
                                            result: 'success',
                                            message: '获取数据成功！',
                                            myShowList: myShowList
                                        });
                                    })
                                    .catch(next);
                            } catch (err) {
                                throw new Error(err.message)
                            }
                        })()
                    }
                } else {
                    // 查询我秀数据
                    MyShowController.getMyshowList(param)
                        .then(function (myShowList) {
                            // 判断 Token 是否存在
                            const token = req.headers.authorization;
                            if (token) {
                                // 验证用户
                                UserController.getUserByToken(token)
                                    .then(function (user) {
                                        if (user) {
                                            // 标记已点赞过的我秀
                                            try {
                                                myShowList.map(function (myShow) {
                                                    if (myShow.likedUserList instanceof Array) {
                                                        if (myShow.likedUserList.length > 0) {
                                                            myShow.likedUserList.map((liked) => {
                                                                if (liked.userId.toString() == user.id) {
                                                                    myShow.isLiked = true;
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            } catch (error) {
                                                log('myshow').error(error.message);
                                            }
                                            res.json({
                                                result: 'success',
                                                message: '获取数据成功！',
                                                myShowList: myShowList
                                            });
                                        }else{
                                            res.json({
                                                result: 'success',
                                                message: '获取数据成功！',
                                                myShowList: myShowList
                                            });
                                        }
                                    })
                                    .catch(next)
                            } else {
                                log('myshow').info(' no token !');
                                res.json({
                                    result: 'success',
                                    message: '获取数据成功！',
                                    myShowList: myShowList
                                });
                            }
                        })
                        .catch(next);
                }
            }
        }
    );
});

module.exports = router;