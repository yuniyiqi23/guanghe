const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
	res.send('Hello World!');
});


module.exports = router;