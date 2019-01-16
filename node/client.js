var http = require("http");

//请求选项
var option = {
	host: "localhost",
	port: "1114",
	path: "/input.txt"
};

//处理响应的回调函数
var callback = function(response) {
	var body = "";
	response.on("data", function(data) {
		body += data;
	});

	response.on("end", function() {
		console.log(body);
		console.log("接收数据完成");
	});
}

//发送请求
var req = http.request(option, callback);
req.end();
