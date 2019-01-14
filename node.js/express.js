var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("hello world");
});

var server = app.listen(1114, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("访问地址: %s:%s", host, port);
});
