'use strict';

/**
 * 判断当前指示当前环境的常量返回对应配置
 * 默认返回开发环境的配置
 */
module.exports = {

  // 数据库连接地址
  mongodb: 'mongodb://localhost:27017/guanghe',
  // used when we create and verify JSON Web Tokens
  secret: 'GuangheRestfulApiwithAdam',

  // Token过期时间,授权时效7天
  expiresIn: 60 * 60 * 24 * 7,

  // 默认头像图片
  defaultHeadSculpture: 'http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg',
  // 默认音频URL
  defaultRadioURL: 'http://47.75.8.64/audios/Tiffany Alvord - Baby I Love You.mp3',

  // 七牛云空间配置参数
  qiniu: {
    "AccessKey": "jFLu9_fUvoiMLHbuMxzCvxt6bVU_06soDrJ0523R",
    "SecretKey": "Enx70Rw0HU2tsT3dqz-JiQkaFbXGMiWShevoK0_I",
    "Bucket": "guanghe",
    "Port": 9000,
    "UptokenUrl": "uptoken",
    "Domain": "poaadnrl9.bkt.clouddn.com"
  },

  // 微信登录
  wechat: {
    APP_ID: 'wx5d7d89a5225b109d',
    APP_SECRET: 'd65ecf46e33feeeb3b260d2553a6a6ba'
  }

}

