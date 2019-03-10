//引入express框架
const express = require('express');
//用于处理目录的对象，提高开发效率
// const path = require('path');
const routes = require('./routes');
const app = express();

// 路由
routes(app);

module.exports = app;

