//引入express框架
const express = require('express');
// 解析body字段模块
const bodyParser = require('body-parser');
// 命令行log显示
const morgan = require('morgan');
// 用户认证模块passport
const passport = require('passport');
// token验证模块
// const Strategy = require('passport-http-bearer').Strategy;
//用于处理目录的对象，提高开发效率
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');
const cors = require('cors');

const routes = require('./routes');
const app = express();


app.use(cors());// Enable All CORS Requests
//静态文件目录设置,设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());// 初始化passport模块
app.use(morgan('dev'));// 命令行中显示程序运行日志,便于bug调试
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // 调用bodyParser模块以便程序正确解析body传入值

// 正常请求的日志
app.use(expressWinston.logger({
	transports: [
		new winston.transports.File({
			// filename: 'logs/success.log'
			json: true,
			filename: path.join(__dirname, 'logs/success.log'),
			maxsize: 5242880,//5MB
			maxFiles: 10,
			timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss:ss'),
		})
	],
	exitOnError: false, // do not exit on handled exceptions
}));

// 路由
routes(app);

// 错误请求的日志
app.use(expressWinston.errorLogger({
	transports: [
		new winston.transports.File({
			json: true,
			filename: path.join(__dirname, 'logs/error.log'),
			maxsize: 5242880,//5MB
			maxFiles: 10,
			timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss:ss'),
		})
	],
	exitOnError: false, // do not exit on handled exceptions
}));

process.env.NODE_ENV = 'production';
module.exports = app;

