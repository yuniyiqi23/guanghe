/*
 * @Description: 全局方法
 * @Author: yep
 * @LastAuthor: Do not edit
 * @since: 2019-03-14 17:12:46
 * @lastTime: 2019-03-27 14:11:35
 */
const config = require('config-lite')(__dirname);
const MyShowController = require("../controller/myShow1");

module.exports = {

    /**
     * @Description: 查找myshow，返回“true”或者“false”
     * @Author: yep
     * @LastEditors: 
     * @LastEditTime: 
     * @since: 2019-03-27 11:00:26
     */
    getMyshowById: function getMyshowById(myShowId) {
        return MyShowController.getMyshowById(myShowId)
            .then(function (myShow) {
                // throw new Error('error');
                if (myShow) {
                    return true;
                } else {
                    return false;
                }
            })
    },

    // 验证Token
    checkToken: function checkToken(req, res, next) {
        passport.authenticate('bearer', { session: false })
        next();
    }

};