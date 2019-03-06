/*
* @Author: xieliping
* @Date:   2019-03-06 10:57:59
* @Last Modified by:   xieliping
* @Last Modified time: 2019-03-06 11:15:47
*/

const path = require('path');
const mineTypes = {
	'css': 'text/css',
	'gif': 'image/gif',
	'html': 'text/html',
	'ico': 'image/x-icon',
	'jpeg': 'image/jpeg',
	'jpg':'image/jpeg',
	'js': 'text/javascript',
	'json': 'application/json',
	'pdf': 'application/pdf',
	'png': 'image/png',
	'svg': 'image/svg+xml',
	'swf': 'application/x-shockwave-flash',
	'tiff': 'image/tiff',
	'txt': 'text/plain',
	'wav': 'audio/x-wav',
	'wma': 'audio/x-ms-wma',
	'wmv': 'vedio/x-ms-wmv',
	'xml': 'text/xml'
};

module.exports = (filePath) => {
	let ext = path.extname(filePath)
	    .split('.')
	    .pop()
	    .toLowerCase();
	if (!ext) {
		ext = filePath;
	}
	return mineTypes[ext] || mineTypes['txt'];
}

