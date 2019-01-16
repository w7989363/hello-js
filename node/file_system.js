// 所有的文件系统操作都有异步和同步两种形式。

// 异步形式的最后一个参数都是完成时回调函数。
// 传给回调函数的参数取决于具体方法，但回调函数的第一个参数都会保留给异常。
// 如果操作成功完成，则第一个参数会是 null 或 undefined。
var fs = require("fs");

// 阻塞读
var data = fs.readFileSync("input.txt");
console.log(data.toString());
console.log("end of sync");

// 异步读
fs.readFile('input.txt', function(err, data) {
	if (err) return console.error(err);
	console.log(data.toString());
});
console.log('end of async');


// stream流对象都是 EventEmitter 的实例，常用事件：
// data - 当有数据可读时触发。
// end - 没有更多的数据可读时触发。
// error - 在接收和写入过程中发生错误时触发。
// finish - 所有数据已被写入到底层系统时触发。
var rs = fs.createReadStream("input.txt");
rs.setEncoding("utf-8")

const {
	sep
} = require('path');
console.log(`${sep}`);

fs.stat("input.txt", (err, stats) => {
	console.log(stats);
});
