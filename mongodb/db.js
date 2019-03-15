'use strict';

const config = require("config-lite")(__dirname);
const mongoose = require("mongoose");
const chalk = require("chalk");
const log = require("../utils/winston").getDefaultLogger;
const moment = require('moment');

mongoose.connect(config.mongodb, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
    log('mongodb').info(moment().format('YYYY-MM-DD HH:mm') + '连接数据库成功!');
    console.log(
        chalk.green('连接数据库成功')
    );
})

db.on('error', function (error) {
    log('mongodb').error(moment().format('YYYY-MM-DD HH:mm') + error);
    console.error(
        chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function () {
    log('mongodb').warn(moment().format('YYYY-MM-DD HH:mm') + '数据库断开，重新连接数据库');
    console.log(
        chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.url, { server: { auto_reconnect: true } });
});

module.exports = mongoose;