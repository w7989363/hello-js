var fs = require("fs");
var str = "";

//创建可读流
var reader = fs.createReadStream("input.txt");
//设置utf8编码
reader.setEncoding("UTF8");
//处理read流事件
//data
reader.on("data", function(chunk) {
	str += chunk;
});
//end
reader.on("end", function() {
	console.log(str);
});
//error
reader.on("error", function(err) {
	console.log(err.stack);
});

console.log("end of the progra");
