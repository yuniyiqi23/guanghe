/*
 * @Author: yep
 * @LastAuthor: Do not edit
 * @since: 2019-03-10 19:37:26
 * @lastTime: 2019-03-12 09:57:47
 */

module.exports = function (app) {

	app.get('/', (req, res) => {
		res.json({ message: 'Hello GuangHe!' });
	});

	//use Get to URL
	app.use('/user', require('./user'));

	// 404 page
	app.use(function (req, res) {
		if (!res.headersSent) {
			res.status(404).end();
		}
	});

};

