/*
* @Author: xieliping
* @Date:   2019-03-06 21:42:32
* @Last Modified by:   xieliping
* @Last Modified time: 2019-03-06 22:26:27
*/
const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
    .usage('anywhere [options]')
    .option('p',{
   	    alias: 'port',
   	    describe: '端口号',
   	    default: 9527
    })
    .option('h',{
   	    alias: 'hostname',
   	    describe: 'host',
   	    default: '127.0.0.1'
    })
    .option('d',{
   	    alias: 'root',
   	    describe: 'root path',
   	    default: process.cwd()
    })
    .version()
    .alias('v','version')
    .help()
    .argv;

const server = new Server(argv);
server.start();