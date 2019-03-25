const express = require('express');
const router = express.Router();
const passport = require('passport');
const MyShowController = require('../controller/myShow');
const Joi = require('joi');
const log = require('../utils/winston').getDefaultLogger;
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
    // 判断数据是否为空
    if (content === undefined && pictures === undefined) {
        res.json({
            result: 'fail',
            message: '参数content和pictures都为空!'
        });
    } else {
        const value = {
            userId: userId,
            content: content,
            pictures: pictures,
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
router.get('/list', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    log('myshow').info('/list');
    const paramSchema = Joi.object().keys({
        pageNumber: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(1).max(30),
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

    const userId = req.user.id;
    // 测试的参数
    const param = {
        userId: userId,
        pageNumber: parseInt(req.query.pageNumber) || 1,
        pageSize: parseInt(req.query.pageSize) || 3,
    }

    MyShowController.getMyshowList(param)
        .then(function (myshowList) {
            res.json({
                result: 'success',
                message: '获取数据成功！',
                myshowList: myshowList
            });
        })
        .catch(next);
    //         }
    //     }
    // );
});

module.exports = router;