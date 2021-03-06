const express = require('express');
const router = express.Router();
const passport = require('passport');
const CourseCollectionController = require("../controller/courseCollection");
const Joi = require('joi');
const log = require('../utils/winston').getDefaultLogger;
const ObjectId = require('mongoose').Types.ObjectId;
require('../utils/passport')(passport);

/**
 * @Description: 创建 CourseCollection
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-24 14:15:35
 */
router.post('/create', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    const params = {
        userId: ObjectId(req.user.id),
        course: ObjectId(req.body.courseId)
    };
    const schema = Joi.object().keys({
        userId: Joi.object().required(),
        course: Joi.object().required(),
    });
    // 校验参数
    const result = Joi.validate(params, schema);
    if (result.error !== null) {
        return res.send(result.error.message);
    } else {
        CourseCollectionController.getCourseCollectionByParams(params)
            .then(function (result) {
                if (result.length > 0) {
                    res.json({
                        result: 'fail',
                        message: '用户已经收藏了此课程，无需重复收藏！'
                    });
                } else {
                    CourseCollectionController.create(params)
                        .then(function (result) {
                            if (!result.errors) {
                                res.json({
                                    result: 'success',
                                    message: '收藏成功!'
                                });
                            } else {
                                res.json({
                                    result: 'fail',
                                    message: result.errors.message
                                });
                            }
                        })
                        .catch(next)
                }
            })
            .catch(next)

    }

});

/**
 * @Description: 获取收藏数据（根据用户id获取数据，分页获取）
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-24 14:13:58
 */
router.get('/list', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    log('courseCollection').info('/list');
    // 参数
    const params = {
        userId: req.query.userId,
        pageNumber: parseInt(req.query.pageNumber) || 1,
        pageSize: parseInt(req.query.pageSize) || 3
    }
    const schema = Joi.object().keys({
        userId: Joi.string().required(),
        pageNumber: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(1).max(100)
    })
    // 验证数据
    Joi.validate(params, schema, function (err, value) {
        if (err) {
            return res.send(err.message);
        } else {
            CourseCollectionController.getCourseCollectionList(params)
                .then(function (courseCollectionList) {
                    res.json({
                        result: 'success',
                        message: '获取数据成功！',
                        courseCollectionList: courseCollectionList
                    });
                })
                .catch(next);
        }
    });
});

/**
 * @Description: 删除一条收藏记录
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-24 14:08:59
 */
router.delete('/', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    log('courseCollection').info('delete');
    // 参数
    const params = {
        course: ObjectId(req.query.courseId),
        userId: ObjectId(req.user.id)
    }
    const schema = Joi.object().keys({
        course: Joi.object().required(),
        userId: Joi.object().required()
    })
    log('courseCollection').info('courseId = ' + req.query.courseId);
    log('courseCollection').info('userId = ' + req.user.id);
    // 验证数据
    Joi.validate(params, schema, function (err, value) {
        if (err) {
            return res.send(err.message);
        } else {
            CourseCollectionController.deleteCourseCollectionById(params)
                .then(function (result) {
                    if (result) {
                        res.json({
                            result: 'success',
                            message: '取消收藏成功！',
                        });
                    } else {
                        res.json({
                            result: 'fail',
                            message: '取消收藏失败！',
                        });
                    }

                })
                .catch(next);
        }
    });
});

module.exports = router;