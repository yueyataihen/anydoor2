/*
* @Author: xieliping
* @Date:   2019-03-06 14:11:56
* @Last Modified by:   xieliping
* @Last Modified time: 2019-03-06 14:33:46
*/

const {createGzip,createDeflate} = require('zlib');

module.exports = (rs,req,res) => {
	const acceptEncoding = req.headers['accept-encoding'];
	if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
		return rs;
	} else if (acceptEncoding.match(/\bgzip\b/)) {
		res.setHeader('Content-Encoding','gzip');
        return rs.pipe(createGzip());
	} else if (acceptEncoding.match(/\bdeflate\b/)) {
		res.setHeader('Content-Encoding','deflate');
        return rs.pipe(createDeflate());
	}
}