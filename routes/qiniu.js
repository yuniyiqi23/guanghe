const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
// 七牛存储资源（图片、音频、视频）云空间
const qiniu = require('qiniu');
// const qiniuConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, "qiniuConfig.json")));
const config = require('config-lite')(__dirname);
const qiniuConfig = config.qiniu;
const mac = new qiniu.auth.digest.Mac(qiniuConfig.AccessKey, qiniuConfig.SecretKey);

const putExtra = new qiniu.form_up.PutExtra();
const options = {
	scope: qiniuConfig.Bucket,
	deleteAfterDays: 1,
	// callbackUrl: 'http://api.example.com/qiniu/upload/callback',
	returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
	callbackBodyType: 'application/json'
};

const putPolicy = new qiniu.rs.PutPolicy(options);
const bucketManager = new qiniu.rs.BucketManager(mac, qiniuConfig);

// URL /qiniu/getImg
router.get('/getImg', function (req, res) {
	const options = {
		limit: 5,
		prefix: 'guanghe/image/',
		marker: req.query.marker
	};
	bucketManager.listPrefix(qiniuConfig.Bucket, options, function (err, respBody, respInfo) {
		if (err) {
			console.log(err);
			throw err;
		}

		if (respInfo.statusCode == 200) {
			let nextMarker = respBody.marker || '';
			let items = respBody.items;
			res.json({
				items: items,
				marker: nextMarker
			});
		} else {
			console.log(respInfo.statusCode);
			console.log(respBody);
		}
	});
});

// URL /qiniu/uptoken
router.get('/uptoken', function (req, res) {
	const token = putPolicy.uploadToken(mac);
	res.header("Cache-Control", "max-age=0, private, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	if(token) {
	    res.json({
	        uptoken: token,
	        domain: qiniuConfig.Domain
	    });
	}
});

module.exports = router; 