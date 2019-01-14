var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain;charset=utf-8'
	});
	// 输出url对象信息
	res.write(util.inspect(url.parse(req.url, true)));
	//解析参数
	var params = url.parse(req.url, true).query;
	res.write("参数a:" + params.a + "\n");
	res.write("参数b:" + params.b);
	res.end();

}).listen(1114);
