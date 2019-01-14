var fs = require("fs");
var str = "111温天麟wentianlin.top:1114";

//创建写入流，写入到output.txt
var writer = fs.createWriteStream("output.txt");
//写入文件(覆盖)
writer.write(str, "UTF8")
//标记文件末尾
writer.end();
//处理输出流
//data
writer.on("data", function() {
	console.log("写入完成.");
});
//error
writer.on("error", function(err) {
	console.log(err.stack);
});

console.log("end of the program");
