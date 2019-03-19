/*
 * @Author: yep
 * @LastAuthor: Do not edit
 * @since: 2019-03-10 19:37:26
 * @lastTime: 2019-03-19 19:07:37
 */

module.exports = function (app) {

	app.get('/', (req, res) => {
		res.json({ message: 'Hello GuangHe!' });
	});

	//use Get to URL
	app.use('/user', require('./user'));
	app.use('/courseware', require('./courseware'));
	app.use('/courseBoss', require('./courseBoss'));
	app.use('/qiniu', require('./qiniu'));
	app.use('/wechat', require('./wechat'));

	// 404 page
	app.use(function (req, res) {
		if (!res.headersSent) {
			res.status(404).end();
		}
	});

};

