const express = require('express');
const router = express.Router();
const passport = require('passport');
const CoursewareController = require("../controller/courseware");
const moment = require('moment');
require('../utils/passport')(passport);

/**
 * @Description: 获取最近发布的数据
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-12 14:13:58
 */
router.get('/list', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    // 测试的参数
    const param = {
        author: req.query.authorId,
        pageNumber: parseInt(req.query.pageNumber) || 1,
        pageSize: parseInt(req.query.pageSize) || 3
    }

    CoursewareController.getCoursewareList(param)
        .then(function (coursewares) {
            res.json({
                result: 'success',
                message: '获取数据成功！',
                coursewares: coursewares
            });
        })
        .catch(next);

});

/**
 * @Description: 上传数据
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-12 14:15:35
 */
router.post('/create', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    // 测试的老师
    const author = {
        id: req.body.authorId,
        nickName: req.body.nickName,
        avatar: req.body.avatar
    };

    let value = {
        author: author,
        title: req.body.title,
        content: req.body.content,
        audioURL: req.body.radioURL,
        publishTime: moment().format('YYYY-MM-DD HH:mm:ss')
    };

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

module.exports = router;