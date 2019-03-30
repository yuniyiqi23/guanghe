const express = require('express');
const router = express.Router();
const Request = require('request');
// 小程序解密库
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');
const getToken = require("../utils/token").getToken;
const moment = require('moment');
const md5 = require('md5-node');
const config = require('config-lite')(__dirname);
const userRole = require('../utils/enum').EnumUserRole;
const UserController = require("../controller/user");

// 小程序参数
const APP_ID = config.wechat.APP_ID;
const APP_SECRET = config.wechat.APP_SECRET;

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

router.get('/signin', function(req, res, next){
  res.json({
    result: '测试微信登录！'
  });
});

/**
 * @Description: 微信登录接口 /wechat/signin
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-19 10:51:45
 */
router.post('/signin', function (req, res, next) {
  const data = {
    code: req.body.code,
    encryptedData: req.body.encryptedData,
    iv: req.body.iv
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
    decrypt(ret.session_key, data.encryptedData, data.iv, (err, wechatUser) => {
      if (err) {
        return res.end(err);
      }
      console.log(wechatUser);

      // 根据 openId 搜索用户，没有创建用户
      UserController.getUserByWechatId(wechatUser.openId)
        .then(function (user) {
          if (user) {
            let token = getToken(user.name);
							user.token = token;
							user.save(function (err) {
								if (err) {
									res.send(err);
								} else {
                  // res.send('success');
									res.json({
                    data : {
                      code: 1,
                      result: 'success',
                      message: '登录成功!',
                      token: 'Bearer ' + token,
                      name: user.name
                    }
									});
								}
							});
          } else {
            let token = getToken(wechatUser.openId);
            const newUser = {
              name: 'user_' + md5(moment()),
              password: 'ResetPassword',
              // 系统生成昵称
              nickName: wechatUser.nickName,
              avatar: wechatUser.avatarUrl || config.defaultHeadSculpture,
              wechatId: wechatUser.openId,
              role: userRole.User,
              token: token,
              // 随机验证码
              checkCode: parseInt(Math.random() * 90000 + 10000),
              endLoginTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
            console.log('newUser :');
            console.log(newUser);
            // 创建用户
            UserController.createUser(newUser)
              .then(function (user) {
                res.json({
                  data : {
                    result: 'success',
                    message: '成功创建新用户!',
                    token: 'Bearer ' + user.token
                  }
                });
              })
              .catch(next)
          }
        })
        .catch(next)
    })
  })

})

module.exports = router;