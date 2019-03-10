
module.exports = function (app) {
	//use Get to URL
	app.use('/users', require('./users'));

	// 404 page
	app.use(function (req, res) {
		if (!res.headersSent) {
			res.status(404).render('404');
		}
	});
};

