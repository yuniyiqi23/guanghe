const express = require('express');
const router = express.Router();
const passport = require('passport');
const MyShowLikeController = require("../controller/myShowLike");
const Joi = require('joi');
const log = require('../utils/winston').getDefaultLogger;
const global = require('../utils/global');
const ObjectId = require('mongoose').Types.ObjectId;
require('../utils/passport')(passport);

/**
 * @Description: 创建 MyShowLike
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-24 14:15:35
 */
router.post('/create', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    log('myShowLike').info('create');
    const value = {
        userId: req.user.id,
        myShowId: req.body.myShowId
    };
    const schema = Joi.object().keys({
        userId: Joi.string().required(),
        myShowId: Joi.string().required(),
    });
    // 校验参数
    const result = Joi.validate(value, schema);
    if (result.error !== null) {
        return res.send(result.error.message);
    } else {
        (async () => {
            try {
                // 查找我秀记录，返回“true”或者“false”
                let result = await global.getMyshowById(value.myShowId);
                if (result === true) {
                    MyShowLikeController.create(value)
                        .then(function (result) {
                            if (!result.errors) {
                                res.json({
                                    result: 'success',
                                    message: '点赞成功!'
                                });
                            } else {
                                res.json({
                                    result: 'fail',
                                    message: result.errors.message
                                });
                            }
                        })
                        .catch(next)
                } else if (result === false) {
                    res.json({
                        result: 'fail',
                        message: '点赞失败，无法根据id查找到对应的我秀数据!'
                    });
                }
            } catch (err) {
                res.json({
                    result: 'fail',
                    message: err.message
                });
            }
        })();
    }

});

/**
 * @Description: 删除一条我秀点赞
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-24 14:08:59
 */
router.delete('/', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    log('myShowLike').info('delete');
    // 参数
    const params = {
        userId: ObjectId(req.user.id),
        myShowId: ObjectId(req.query.myShowId)
    }
    const schema = Joi.object().keys({
        userId: Joi.object().required(),
        myShowId: Joi.object().required()
    })
    // 验证数据
    Joi.validate(params, schema, function (err, value) {
        if (err) {
            return res.send(err.message);
        } else {
            (async () => {
                try {
                    // 查找我秀记录，返回“true”或者“false”
                    let result = await global.getMyshowById(value.myShowId);
                    // value.ok && value.n > 0 && value.nModified > 0
                    if (result === true) {
                        MyShowLikeController.deleteMyShowLikeById(params)
                            .then(function (result) {
                                if (!result.errors) {
                                    res.json({
                                        result: 'success',
                                        message: '取消点赞成功！'
                                    });
                                } else {
                                    res.json({
                                        result: 'fail',
                                        message: result.errors.message
                                    });
                                }
                            })
                            .catch(next);
                    } else if (result === false) {
                        res.json({
                            result: 'fail',
                            message: '删除失败，无法根据id查找到对应的我秀数据!'
                        });
                    }
                } catch (err) {
                    res.json({
                        result: 'fail',
                        message: err.message
                    });
                }
            })();
        }
    });
});

module.exports = router;