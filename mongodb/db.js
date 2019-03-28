'use strict';

const config = require("config-lite")(__dirname);
const mongoose = require("mongoose");
const chalk = require("chalk");
const log = require("../utils/winston").getDefaultLogger;

// 官方给出了一个建议, 因为在创建字段时, 数据库会自动根据自动排序(ensureIndex). 
// 有可能严重拖慢查询或者创建速度,所以一般而言,我们需要将该option 关闭
mongoose.connect(config.mongodb, { useNewUrlParser: true, config: { autoIndex: false } });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
    log('mongodb').info('连接数据库成功!');
    console.log(
        chalk.green('连接数据库成功')
    );
})

db.on('error', function (error) {
    log('mongodb').error(error);
    console.error(
        chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function () {
    log('mongodb').warn('数据库断开，重新连接数据库');
    console.log(
        chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.url, { server: { auto_reconnect: true } });
});

module.exports = mongoose;