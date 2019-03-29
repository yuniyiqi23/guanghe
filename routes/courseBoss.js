const express = require('express');
const router = express.Router();
const passport = require('passport');
const CoursewareController = require("../controller/courseware");
const Joi = require('joi');
const log = require('../utils/winston').getDefaultLogger;
const EnumCourseType = require('../utils/enum').EnumCourseType;
require('../utils/passport')(passport);

/**
 * @Description: 获取“Boss说”模块数据，实现按用户搜索和分页功能
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-12 14:13:58
 */
router.get('/list', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    log('courseBoss').info('/list');
    log('courseBoss').info('req.url = ' + req.url);
    const paramSchema = Joi.object().keys({
        pageNumber: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(1).max(30),
    })
    // 验证数据
    Joi.validate({
        pageNumber: parseInt(req.query.pageNumber),
        pageSize: parseInt(req.query.pageSize)
    },
        paramSchema,
        function (err, value) {
            if (err) {
                log('courseBoss').error(err.message);
                return res.send(err.message);
            } else {
                // 测试的参数
                const param = {
                    author: req.query.authorId,
                    courseType: EnumCourseType.BossSay,
                    pageNumber: parseInt(req.query.pageNumber) || 1,
                    pageSize: parseInt(req.query.pageSize) || 3,
                }

                CoursewareController.getCoursewareList(param)
                    .then(function (courseBosses) {
                        // 标记已收藏过的课程
                        courseBosses.map(function (course) {
                            if (course.collectedList instanceof Array) {
                                if (course.collectedList.length > 0) {
                                    course.collectedList.map((collected) => {
                                        if (collected.userId.toString() == req.user.id) {
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
                            courseBosses: courseBosses
                        });
                    })
                    .catch(next);
            }
        }
    );
});

/**
 * @Description: 获取Boss说发布总数
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-28 08:54:36
 */
router.get('/count', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    // 查询参数
    const params = {
        author: req.query.authorId,
        courseType: EnumCourseType.BossSay
    }
    CoursewareController.getCoursewareCount(params)
        .then(function (result) {
            if (!result.errors) {
                res.json({
                    result: 'success',
                    message: '获取数据成功！',
                    courseBossCount: result
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
 * @Description: 上传数据
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-12 14:15:35
 */
router.post('/create', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    // 数据验证
    const authorSchema = Joi.object().keys({
        id: Joi.string().required(),
        avatar: Joi.string().required(),
        nickName: Joi.string().min(3).max(30).required(),
    })
    // const paramSchema = Joi.object().keys({
    //     title: Joi.string().required(),
    //     content: Joi.string().required(),
    // })
    // 测试的老师
    const author = {
        id: req.body.authorId,
        nickName: req.body.nickName,
        avatar: req.body.avatar
    };
    const value = {
        author: author,
        title: req.body.title,
        videoURL: req.body.videoURL,
        cover: req.body.cover,
        content: req.body.content,
        videoPictures: req.body.videoPictures,
        publishTime: req.body.publishTime,
        courseType: EnumCourseType.BossSay
    };

    // 校验参数
    const resultAuthor = Joi.validate(author, authorSchema);
    if (resultAuthor.error !== null) {
        return res.send(resultAuthor.error.message);
    }
    // const resultValue = Joi.validate(value, paramSchema);
    // if (resultValue.error !== null) {
    //     return res.send(resultValue.error.message);
    // }
    CoursewareController.create(value)
        .then(function (result) {
            if (result) {
                res.json({
                    result: 'success',
                    message: '发布信息成功!'
                });
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
router.get('/info', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    const param = {
        courseId: req.query.courseId,
        courseType: EnumCourseType.BossSay,
    }
    if (param.courseId) {
        CoursewareController.getCoursewareById(param)
            .then(function (courseBoss) {
                if (courseBoss) {
                    res.json({
                        result: 'success',
                        message: '获取课程成功!',
                        courseBoss: courseBoss
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
})

module.exports = router;