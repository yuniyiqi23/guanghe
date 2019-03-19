const express = require('express');
const router = express.Router();

/**
 * @Description: 微信登录接口 /wecahat/onlogin
 * @Author: yep
 * @LastEditors: 
 * @LastEditTime: 
 * @since: 2019-03-19 10:51:45
 */
router.get('/onlogin', function (req, res, next) {
    let code = req.query.code
  
    request.get({
      uri: 'https://api.weixin.qq.com/sns/jscode2session',
      json: true,
      qs: {
        grant_type: 'authorization_code',
        appid: 'wx5d7d89a5225b109d',
        secret: 'd65ecf46e33feeeb3b260d2553a6a6ba',
        js_code: code
      }
    }, (err, response, data) => {
      if (response.statusCode === 200) {
        console.log("[openid]", data.openid)
        console.log("[session_key]", data.session_key)
  
        //TODO: 生成一个唯一字符串sessionid作为键，将openid和session_key作为值，存入redis，超时时间设置为2小时
        //伪代码: redisStore.set(sessionid, openid + session_key, 7200)
  
        res.json({ sessionid: sessionid })
      } else {
        console.log("[error]", err)
        res.json(err)
      }
    })
  })

  module.exports = router;