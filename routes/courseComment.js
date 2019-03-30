const express = require('express');
const router = express.Router();
const passport = require('passport');
const CourseCommentController = require("../controller/courseComment");
const Joi = require('joi');
const log = require('../utils/winston').getDefaultLogger;
const ObjectId = require('mongoose').Types.ObjectId;
require('../utils/passport')(passport);

/**
 * @Description: 创建 CourseComment
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-24 14:15:35
 */
router.post('/create', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    const value = {
        user: req.user.id,
        courseId: req.body.courseId,
        content: req.body.content
    };
    const schema = Joi.object().keys({
        user: Joi.string().required(),
        courseId: Joi.string().required(),
        content: Joi.string().required()
    });
    // 校验参数
    const result = Joi.validate(value, schema);
    if (result.error !== null) {
        return res.send(result.error.message);
    } else {
        CourseCommentController.create(value)
            .then(function (result) {
                if (result) {
                    res.json({
                        result: 'success',
                        message: '评论成功!'
                    });
                }
            })
            .catch(next)
    }

});

/**
 * @Description: 获取我秀评论数据（根据我秀id获取数据，分页获取）
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-24 14:13:58
 */
router.get('/list', function (req, res, next) {
    log('courseComment').info('/list');
    // 参数
    const params = {
        courseId: req.query.courseId,
        pageNumber: parseInt(req.query.pageNumber) || 1,
        pageSize: parseInt(req.query.pageSize) || 3
    }
    const schema = Joi.object().keys({
        courseId: Joi.string().required(),
        pageNumber: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(1).max(100)
    })
    // 验证数据
    Joi.validate(params, schema, function (err, value) {
        if (err) {
            return res.send(err.message);
        } else {
            CourseCommentController.getCourseCommentList(params)
                .then(function (courseCommentList) {
                    res.json({
                        result: 'success',
                        message: '获取数据成功！',
                        courseCommentList: courseCommentList
                    });
                })
                .catch(next);
        }
    });
});

/**
 * @Description: 删除一条我秀评论
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-24 14:08:59
 */
router.delete('/', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    log('courseComment').info('delete');
    // 参数
    const params = {
        user: ObjectId(req.user.id),
        _id: req.query.commentId,
    }
    const schema = Joi.object().keys({
        user: Joi.object().required(),
        _id: Joi.string().required()
    })
    // 验证数据
    Joi.validate(params, schema, function (err, value) {
        if (err) {
            return res.send(err.message);
        } else {
            CourseCommentController.deleteCourseCommentById(params)
                .then(function (result) {
                    if(result){
                        res.json({
                            result: 'success',
                            message: '删除成功！',
                        });
                    }else{
                        res.json({
                            result: 'fail',
                            message: '删除失败！',
                        });
                    }
                    
                })
                .catch(next);
        }
    });
});

module.exports = router;