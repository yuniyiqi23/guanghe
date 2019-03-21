const express = require('express');
const router = express.Router();
const Request = require('request');
// 小程序解密库
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');
const getToken = require("../utils/token").getToken;
const moment = require('moment');
const md5 = require('md5-node');
const UserController = require("../controller/user");

// 小程序参数
const APP_ID = 'wx5d7d89a5225b109d';
const APP_SECRET = 'd65ecf46e33feeeb3b260d2553a6a6ba';

// 获取解密SessionKey
const getSessionKey = (code, callback) => {
  const url = 'https://api.weixin.qq.com/sns/jscode2session?appid='
    + APP_ID + '&secret=' + APP_SECRET + '&js_code=' + code
    + '&grant_type=authorization_code'
  Request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log('getSessionKey:', body, typeof (body))

      const data = JSON.parse(body)
      if (!data.session_key) {
        callback({
          code: 1,
          message: data.errmsg
        })
        return
      }
      callback(null, data)
    } else {
      callback({
        code: 1,
        message: error
      })
    }
  })
}

// 解密
const decrypt = (sessionKey, encryptedData, iv, callback) => {
  try {
    const pc = new WXBizDataCrypt(APP_ID, sessionKey)
    const data = pc.decryptData(encryptedData, iv)
    // console.log('decrypted:', data)
    callback(null, data)
  } catch (e) {
    console.log(e)
    callback({
      code: 1,
      message: e
    })
  }
}

/**
 * @Description: 微信登录接口 /wecahat/login
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-19 10:51:45
 */
router.get('/signin', function (req, res, next) {
  // let code = req.query.code
  // let code = '011pcuQg1vPTnt0rL7Rg1cPwQg1pcuQ4';
  const data = {
    code: req.query.code,
    encryptedData: req.query.encryptedData,
    iv: req.query.iv
  }

  // 校验参数
  if (!data.code || !data.encryptedData || !data.iv) {
    return res.send({
      code: 1,
      message: '缺少参数：code或者encryptedData或者iv'
    })
  }

  // 获取sessionkey
  getSessionKey(data.code, (err, ret) => {
    if (err) {
      return res.send(err);
    }
    console.log(ret);
    // 解密
    decrypt(ret.session_key, data.encryptedData, data.iv, (err, user) => {
      if (err) {
        return res.end(err);
      }
      console.log(user);

      // 根据 openId 搜索用户，没有创建用户
      UserController.getUserByWechatId(user.openId)
        .then(function (user) {
          if (user) {
            let token = getToken(user.name);
							user.token = token;
							user.save(function (err) {
								log('user').error('user.save.err = ' + err);
								if (err) {
									res.send(err);
								} else {
									res.json({
										result: 'success',
										message: '登录成功!',
										token: 'Bearer ' + token,
										name: user.name
									});
								}
							});
          } else {
            let token = getToken(user.openId);
            const newUser = {
              name: 'user_' + md5(moment()),
              password: 'ResetPassword',
              // 系统生成昵称
              nickName: user.nickName,
              avatar: user.avatarUrl || config.defaultHeadSculpture,
              wechatId: user.openId,
              role: userRole.User,
              token: token,
              // 随机验证码
              checkCode: parseInt(Math.random() * 90000 + 10000),
              endLoginTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
            // 创建用户
            UserController.createUser(newUser)
              .then(function (user) {
                res.json({
                  result: 'success',
                  message: '成功创建新用户!',
                  user: user
                });
              })
              .catch(function (err) {
                return res.end(err);
              })
          }
        })
        .catch(function (err) {
          return res.end(err);
        })


    })
  })

})

module.exports = router;