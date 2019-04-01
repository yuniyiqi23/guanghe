const express = require('express');
const router = express.Router();
const passport = require('passport');
const Joi = require('joi');

const log = require('../utils/winston').getDefaultLogger;
const EnumCourseType = require('../utils/enum').EnumCourseType;
const CoursewareController = require("../controller/courseware");
const UserController = require("../controller/user");
require('../utils/passport')(passport);

/**
 * @Description: 上传数据
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-12 14:15:35
 */
router.post('/create', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    // 老师的信息
    const author = {
        id: req.body.authorId,
        nickName: req.body.nickName,
        avatar: req.body.avatar
    };
    // 数据验证
    const authorSchema = Joi.object().keys({
        id: Joi.string().required(),
        nickName: Joi.string().min(3).max(30).required(),
        avatar: Joi.string().required()
    })
    // 校验参数
    const resultAuthor = Joi.validate(author, authorSchema);
    if (resultAuthor.error !== null) {
        return res.send(resultAuthor.error.message);
    }
    const value = {
        author: author,
        title: req.body.title,
        content: req.body.content,
        audioURL: req.body.audioURL,
        publishTime: req.body.publishTime,
        courseType: req.body.courseType
    };
    const paramSchema = Joi.object().keys({
        author: Joi.object().required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
        audioURL: Joi.string(),
        publishTime: Joi.string(),
        courseType: Joi.any().valid('1', '3')
    })
    const resultValue = Joi.validate(value, paramSchema);
    if (resultValue.error !== null) {
        return res.send(resultValue.error.message);
    }
    CoursewareController.create(value)
        .then(function (result) {
            if (result) {
                res.json({
                    result: 'success',
                    message: '发布信息成功!'
                });
            } else {
                res.json({
                    result: 'fail',
                    message: '发布信息失败!'
                });
            }
        })
        .catch(next)
});

/**
 * @Description: 获取课件数据，实现按用户搜索和分页功能
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-12 14:13:58
 */
router.get('/list', function (req, res, next) {
    log('courseware').info('/list');
    const paramSchema = Joi.object().keys({
        pageNumber: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(1).max(100),
        courseType: Joi.any().valid('1', '3')
    })
    // 验证数据
    const resultValue = Joi.validate({
        pageNumber: parseInt(req.query.pageNumber),
        pageSize: parseInt(req.query.pageSize),
        courseType: req.query.courseType
    }, paramSchema)
    if (resultValue.error !== null) {
        return res.send(resultValue.error.message);
    } else {
        // 查询参数
        const param = {
            // author: req.query.authorId,
            courseType: req.query.courseType,
            pageNumber: parseInt(req.query.pageNumber) || 1,
            pageSize: parseInt(req.query.pageSize) || 3
        }
        // 查询课程数据
        CoursewareController.getCoursewareList(param)
            .then(function (coursewares) {
                // 判断 Token 是否存在
                const token = req.headers.authorization;
                if (token) {
                    // 验证用户
                    UserController.getUserByToken(token)
                        .then(function (user) {
                            if (user) {
                                // 标记已收藏过的课程
                                coursewares.map(function (course) {
                                    if (course.collectedList instanceof Array) {
                                        if (course.collectedList.length > 0) {
                                            course.collectedList.map((collected) => {
                                                if (collected.userId.toString() == user.id) {
                                                    course.isCollected = true;
                                                }
                                            })
                                        }
                                    }
                                })
                                // 返回数据
                                res.json({
                                    result: 'success',
                                    message: '获取数据成功！',
                                    coursewares: coursewares
                                });
                            }else{
                                res.json({
                                    result: 'success',
                                    message: '获取数据成功！',
                                    coursewares: coursewares
                                });
                            }
                        })
                        .catch(next)
                } else {
                    // 返回数据
                    res.json({
                        result: 'success',
                        message: '获取数据成功！',
                        coursewares: coursewares
                    });
                }

            })
            .catch(next);
    }
});

/**
 * @Description: 获取每日音频发布总数
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-28 08:54:36
 */
router.get('/count', function (req, res, next) {
    // 查询参数
    const params = {
        author: req.query.authorId,
        courseType: EnumCourseType.AudioDaily,
    }
    CoursewareController.getCoursewareCount(params)
        .then(function (result) {
            if (!result.errors) {
                res.json({
                    result: 'success',
                    message: '获取数据成功！',
                    coursewareCount: result
                })
            } else {
                res.json({
                    result: 'fail',
                    message: result.errors.message
                })
            }
        })
        .catch(next)
});

/**
 * @Description: 获取单独一个课程的详情
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-22 13:20:12
 */
router.get('/info', function (req, res, next) {
    const param = {
        courseId: req.query.courseId,
        courseType: EnumCourseType.AudioDaily,
    }
    if (param.courseId) {
        CoursewareController.getCoursewareById(param)
            .then(function (courseware) {
                if (courseware) {
                    res.json({
                        result: 'success',
                        message: '获取课程成功!',
                        courseware: courseware
                    });
                } else {
                    res.json({
                        result: 'fail',
                        message: '无法根据此ID获取到相应的课程!'
                    });
                }
            })
            .catch(next)
    } else {
        res.json({
            result: 'fail',
            message: '参数courseId为空!'
        });
    }
});

/**
 * @Description: 搜索课程（全文搜索模式）
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-26 11:05:16
 */
router.get('/search', function (req, res, next) {
    const value = {
        keyword: req.query.keyword,
        pageNumber: parseInt(req.query.pageNumber),
        pageSize: parseInt(req.query.pageSize)
    };
    const paramSchema = Joi.object().keys({
        keyword: Joi.strict().required(),
        pageNumber: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(1).max(100)
    })
    // 验证数据
    const resultValue = Joi.validate(value, paramSchema)
    if (resultValue.error !== null) {
        return res.send(resultValue.error.message);
    }
    CoursewareController.getCoursewareList(value)
        .then(function (coursewares) {
            res.json({
                result: 'success',
                message: '获取数据成功！',
                coursewares: coursewares
            });
        })
        .catch(next)
});

module.exports = router;