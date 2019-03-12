const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("config-lite")(__dirname);
const passport = require('passport');
const PostController = require("../controller/post");
const moment = require('moment');

/**
 * @Description: 获取最近发布的数据
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-12 14:13:58
 */
router.get('/', function (req, res, next) {
    // 测试的参数
    const value = {
        author: req.body.authorId,
        pageNumber: req.body.nickName,
        pageSize: req.body.avatar
    }

    PostController.getPosts(value)
        .then(function (result) {
            res.json(result);
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
router.post('/create', function (req, res, next) {
    // 测试的老师
    const author = {
        id: req.body.authorId,
        nickName: req.body.nickName,
        avatar: req.body.avatar
    };
    // 测试的图片
    const pictures = [
        config.defaultHeadSculpture,
        config.defaultHeadSculpture,
        config.defaultHeadSculpture
    ];

    let value = {
        author: author,
        title: req.body.title,
        content: content = req.body.content,
        pictures: pictures,
        audioURL: config.defaultRadioURL,
        publishTime: moment().format('YYYY-MM-DD HH:mm')
    };

    PostController.create(value)
        .then(function (result) {
            if (result) {
                res.json({ success: true, message: '成功发布信息!' });
            }
        })
        .catch(next)

});

module.exports = router;