const express = require('express');
const router = express.Router();
const passport = require('passport');
const CourseBossController = require("../controller/courseBoss");
const moment = require('moment');
const Joi = require('joi');
const log = require('../utils/winston').getDefaultLogger;
require('../utils/passport')(passport);

/**
 * @Description: 获取“Boss说”模块数据，实现按用户搜索和分页功能
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-12 14:13:58
 */
// passport.authenticate('bearer', { session: false }),
router.get('/list', function (req, res, next) {
    log('courseBoss').info('/list');
    log('courseBoss').info('req.query = ' + JSON.stringify(req.query));
    log('courseBoss').info('req.params = ' + JSON.stringify(req.params));
    log('courseBoss').info('req.url = ' + req.url);
    const paramSchema = Joi.object().keys({
        pageNumber: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(1),
    })
    // 验证数据
    // Joi.validate({
    //     pageNumber: parseInt(req.query.pageNumber),
    //     pageSize: parseInt(req.query.pageSize)
    // },
    //     paramSchema,
    //     function (err, value) {
    //         if (err) {
    //             log('courseBoss').error(err.message);
    //             return res.send(err.message);
    //         } else {
    // 测试的参数
    const param = {
        author: req.query.authorId,
        pageNumber: parseInt(req.query.pageNumber) || 1,
        pageSize: parseInt(req.query.pageSize) || 3
    }

    CourseBossController.getcourseBossList(param)
        .then(function (courseBosss) {
            res.json({
                result: 'success',
                message: '获取数据成功！',
                courseBosss: courseBosss
            });
        })
        .catch(next);
    //         }
    //     }
    // );
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
        // avatar: Joi.string().required(),
        nickName: Joi.string().min(3).max(30).required(),
    })
    const paramSchema = Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
    })
    // 测试的老师
    const author = {
        id: req.body.authorId,
        nickName: req.body.nickName,
        // avatar: req.body.avatar
    };
    const value = {
        author: author,
        title: req.body.title,
        videoURL: req.body.videoURL,
        cover: req.body.cover,
        content: req.body.content,
        videoPictures: req.body.vodioPictures,
        publishTime: req.body.publishTime
    };

    // 校验参数
    // const resultAuthor = Joi.validate(author, authorSchema);
    // if (resultAuthor.error !== null) {
    //     return res.send(resultAuthor.error.message);
    // }
    // const resultValue = Joi.validate(value, paramSchema);
    // if (resultValue.error !== null) {
    //     return res.send(resultValue.error.message);
    // }
    CourseBossController.create(value)
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

module.exports = router;