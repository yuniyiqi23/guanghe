// api服务
// const Restify = require('restify')
// const Server = Restify.createServer()
// Server.use(Restify.queryParser())
// Server.use(Restify.bodyParser())

// mongo数据库
// const Mongo = require('mongojs')
// const Db = Mongo('test', ['peoples'])
// const Peoples = Db.peoples

const express = require('express');
const router = express.Router();
// request
const Request = require('request')

// 小程序解密库
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')

// redis
// const Redis = require('redis')
// const RedisClient = Redis.createClient()

// uuid
// const uuid = require('uuid')



// 监听端口号
const PORT = 5301

// 小程序参数
const APP_ID = 'wx5d7d89a5225b109d'
const APP_SECRET = 'd65ecf46e33feeeb3b260d2553a6a6ba'

/********** 业务处理开始 **********/

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
		console.log('decrypted:', data)
		callback(null, data)
	} catch (e) {
		console.log(e)
		callback({
			code: 1,
			message: e
		})
	}
}

// 存储登录状态
// const saveAuth = (peopleId, callback) => {
// 	const token = uuid.v1()	
// 	RedisClient.set('WEAPP_AUTH:'+token, peopleId, (err, ret) => {
// 		console.log(err, ret)
// 		callback(err, token)
// 	})
// }

// 获取登录状态
// const checkAuth = (token, callback) => {
// 	RedisClient.get('WEAPP_AUTH:'+token, (err, ret) => {
// 		callback(err, ret)
// 	})
// }

// 清除登录状态
// const clearAuth = (token, callback) => {
// 	RedisClient.del('WEAPP_AUTH:'+token, (err, ret) => {
// 		callback(err, ret)
// 	})
// }

// 小程序登录
router.get('/signIn', (req, res) => {
	// const data = req.body
	const data = {
		code: '061Gk3TF1gA8090L8QSF19K7TF1Gk3TN',
		encryptedData: 'lEcdlZ4NxEZidiNMnrKrfwRFWIB2dk/04wNEb3e24BWABIGgvh7FpNBOZ3BmCzumb0NXZB+Q+rWwNed27ei+nySTk6gd/BYdR98XMfimrQWKtvEPu/IQBO6xHOZ/x31rM9ZcTKroWGhyXVK8neNRphd6VDJgOONUPXuAb4bMSOAECNCld+mIG5D4pbSbojmZ1aNFy0uFUPePUCvFd7NfYfi3lVt/13oemmuYTf5ux91zmxlLfCkcIGG/Oaud2NWzvk4hhJdlBYZxZZV6JLrg1Cz4aH9ngPLXtadoXFnId35qaFElg+xYy+umQJY+vhA4iKSWIlqKiy+7hY1wwLxj5+H6Sh6BSHEkyFWvzNez9sCcK9qp00v2tO9xthpBSzRQDaws2DjoJzJndmRo5OV92D+Gkhz3SlroDIEXi+e9TFZx+yZLSVMRF7kZXwdHepSXFWrwzZQrMiITQEEF5BwqEeXZiAdMOO6uaCK8lBxroDU=',
		iv: 'tQGApXCr3JB35M9QQq8r5g=='
	}
	console.log('POST：/signIn, 参数：', data)

	if (!data.code) {
		res.send({
			code: 1,
			message: '缺少参数：code'
		})
		return
	} else if (!data.encryptedData) {
		res.send({
			code: 1,
			message: '缺少参数：encryptedData'
		})
		return
	} else if (!data.iv) {
		res.send({
			code: 1,
			message: '缺少参数：iv'
		})
		return
	}

	// 获取sessionkey
	getSessionKey(data.code, (err, ret) => {
		if (err) {
			res.send(err)
			return
		}
		console.log(ret)
		// 解密
		decrypt(ret.session_key, data.encryptedData, data.iv, (err, ret) => {
			if (err) {
				res.end(err)
				return
			}

			console.log(ret)
			// 保存用户信息
			const people = {
				peopleId: uuid.v1(),
				channel: 'wechat',
				unionId: (ret.unionId) ? ret.unionId : ret.openId,
				name: ret.nickName,
				avatar: ret.avatarUrl,
				created: new Date().getTime(),
				updated: new Date().getTime()
			}
			Peoples.findAndModify({
				query: {
					channel: 'wechat',
					unionId: (ret.unionId) ? ret.unionId : ret.openId
				},
				update: {
					"$set": {
						name: ret.nickName,
						avatar: ret.avatarUrl,
						updated: new Date().getTime()
					}
				}
			}, (err, exist) => {
				if (!exist) { // 不存在帐户，创建新帐户
					Peoples.save(people, (err, ret) => {
						// 保存登录状态
						saveAuth(people.peopleId, (err, ret) => {
							res.send({
								code: 0,
								data: {
									token: ret,
									people: people
								}
							})
						})
					})
					return
				} else { // 存在帐户
					// 保存登录状态
					saveAuth(exist.peopleId, (err, ret) => {
						console.log('token:', ret)
						res.send({
							code: 0,
							data: {
								token: ret,
								people: exist
							}
						})
					})
				}
			})
		})
	})

})

// 退出登录
router.post('/signOut', (req, res) => {
	const data = req.body
	console.log('POST：/signOut, 参数：', data)
	if (!data.token) {
		res.send({
			code: 1,
			message: '缺少参数：token'
		})
		return
	}
	clearAuth(data.token, (err, ret) => {
		if (err) {
			res.send({
				code: 1,
				message: '退出出错'
			})
			return
		}
		res.send({
			code: 0,
			data: {}
		})
	})
})

// 发送消息
router.post('/messages', (req, res) => {
	const data = req.body
	console.log('POST: /messages，参数：', data)
	if (!data.token) {
		res.send({
			code: 1,
			message: '缺少参数：token'
		})
		return
	}

	checkAuth(data.token, (err, ret) => {
		console.log('checkAuth', err, ret)
		if (err) {
			res.send({
				code: 1,
				message: '服务器故障'
			})
			return
		} else if (!ret) {
			res.send({
				code: 1,
				message: '授权失败，请重新登录'
			})
			return
		}

		// 这里实现发送逻辑，这里用获取个人信息说明token -> people
		Peoples.findOne({ peopleId: ret }, (err, ret) => {
			console.log('people:', err, ret)
			res.send({
				code: 0,
				data: {
					name: ret.name
				}
			})
		})
	})
})

/********** 业务处理结束 **********/

// 监听端口开启api服务
// Server.listen(PORT, () => {
// 	console.log('开启服务器，端口号：', PORT)
// })

module.exports = router;