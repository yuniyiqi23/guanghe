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
    const value = {
        userId: req.user.id,
        course: req.body.courseId
    };
    const schema = Joi.object().keys({
        userId: Joi.string().required(),
        course: Joi.string().required(),
    });
    // 校验参数
    const result = Joi.validate(value, schema);
    if (result.error !== null) {
        return res.send(result.error.message);
    } else {
        CourseCollectionController.create(value)
            .then(function (result) {
                if (result) {
                    res.json({
                        result: 'success',
                        message: '收藏成功!'
                    });
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
        pageSize: Joi.number().integer().min(1).max(30)
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
        _id: req.query.collectionId,
        userId: ObjectId(req.user.id)
    }
    const schema = Joi.object().keys({
        _id: Joi.string().required(),
        userId: Joi.object().required()
    })
    // 验证数据
    Joi.validate(params, schema, function (err, value) {
        if (err) {
            return res.send(err.message);
        } else {
            CourseCollectionController.deleteCourseCollectionById(params)
                .then(function (result) {
                    if(result){
                        res.json({
                            result: 'success',
                            message: '取消收藏成功！',
                        });
                    }else{
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