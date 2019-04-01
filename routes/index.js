/*
 * @Author: yep
 * @LastAuthor: Do not edit
 * @since: 2019-03-10 19:37:26
 * @lastTime: 2019-03-31 14:46:21
 */

module.exports = function (app) {

	app.get('/', (req, res) => {
		// const time =  new Date(parseInt(_id.toString().substring(0, 8), 16) * 1000);
		// res.json({ time: time });
		// throw new Error('啊哦～');
		res.json({ message: 'Hello GuangHe!' });
	});

	//use Get to URL
	app.use('/user', require('./user'));
	app.use('/courseware', require('./courseware'));
	// app.use('/courseBoss', require('./courseBoss'));
	app.use('/courseComment', require('./courseComment'));
	app.use('/courseCollection', require('./courseCollection'));
	app.use('/qiniu', require('./qiniu'));
	app.use('/wechat', require('./wechat'));
	app.use('/myShow', require('./myShow'));
	app.use('/myShowComment', require('./myShowComment'));
	app.use('/myShowLike', require('./myShowLike'));

	// 404 page
	app.use(function (req, res) {
		if (!res.headersSent) {
			res.status(404);
			res.json({
				result: 'fail',
				message: '找不到此页面，请检查请求的地址是否有效！',
			});
		}
	});

};

