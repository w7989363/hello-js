var http = require("http");
var url = require("url");
var fs = require("fs");

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("request for : " + pathname);
		//路由
		route(pathname);
		//输出请求文件名
		fs.readFile(pathname.substr(1), function(err, data) {
			if (err) {
				console.log(err);
				response.writeHead(404, {
					"Content-Type": "text/plain; charset=utf8"
				});
			} else {
				response.writeHead(200, {
					"Content-Type": "text/plain; charset=utf8"
				});
				response.write(data.toString());
			}
			response.end();
		});
	}
	http.createServer(onRequest).listen(1114);
	console.log("Server has started!");
}

exports.start = start;
