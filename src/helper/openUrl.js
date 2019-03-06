/*
* @Author: xieliping
* @Date:   2019-03-06 23:51:01
* @Last Modified by:   xieliping
* @Last Modified time: 2019-03-06 23:56:24
*/
const { exec } = require('child_process');

module.exports = url => {
	switch (process.platform) {
		case 'darwin':
		exec(`open ${url}`);
		break;
		case 'win32':
		exec(`start ${url}`);
		break;
	}
}
