const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');
const mine = require('./mine');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');


const tplPath = path.join(__dirname,'../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
	
module.exports = async function (req,res,filePath) {
	try {
		const stats = await stat(filePath);
		if (stats.isFile()) {
			const contentType = mine(filePath);			
	        res.setHeader('content-type', contentType);
	        if (isFresh(stats,req,res)) {
	        	res.statuscode = 304;
	        	res.end();
	        	return;
	        }
	        let rs;
	        const {code,start,end} = range(stats.size, req, res);
	        if (code === 200) {
	        	res.statuscode = 200;
	        	rs = fs.createReadStream(filePath);
	        } else {
	        	res.statuscode = 206;
	        	rs = fs.createReadStream(filePath,{start, end});
	        }
	        
	        if (filePath.match(config.compress)) {
                rs = compress(rs,req,res);
	        }
	        rs.pipe(res);        
		} else if (stats.isDirectory()) {
			const files = await readdir(filePath);
			res.statuscode = 200;
            res.setHeader('content-type', 'text/html');
            const dir = path.relative(config.root,filePath);
            const data = {
            	title: path.basename(filePath),
            	dir: dir ? `/${dir}`: '',
            	files: files.map(file => {
            		return {
            			file,
            			icon: mine(file)
            		}
            	})

            };

            res.end(template(data));
			// fs.readdir(filePath,(err,files) => {
				
			// })
		}
	} catch (ex) {
		res.statuscode = 404;
        res.setHeader('content-type', 'text/plain');
        res.end(`${filePath} is not a directory or file\n${ex}`);
	}
}







