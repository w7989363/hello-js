//__filename 表示当前正在执行的脚本的文件名。
//它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。
console.log(__filename);

//__dirname 表示当前执行脚本所在的目录。
console.log(__dirname);

//setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。
//setTimeout() 只执行一次指定函数。返回一个代表定时器的句柄值。
function printHello() {
	console.log("hello %s%d", "wentianlin", 1);
}
var t = setTimeout(printHello, 2000);
//clearTimeout( t ) 全局函数用于停止一个之前通过 setTimeout() 创建的定时器。
//参数 t 是通过 setTimeout() 函数创建的定时器。
clearTimeout(t);

//setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。
//返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
//setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
// var t1 = setInterval(printHello,1000);
// setTimeout(function(){
//     clearInterval(t1);
// },4000)

console.trace();

//console.time(label)输出时间，表示计时开始。
//console.timeEnd(label)结束时间，表示计时结束。
console.time("获取数据");
//
// 执行一些代码
//
console.timeEnd('获取数据');

//process用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。
//process属性
// 输出到终端
process.stdout.write("Hello stdout!" + "\n");
// 通过参数读取
process.argv.forEach(function(val, index, array) {
	console.log(index + ': ' + val);
});
// 获取执行路径
console.log(process.execPath);
//架构
console.log(process.arch);
// 平台信息
console.log(process.platform);
//process方法
// 输出当前目录
console.log('当前目录: ' + process.cwd());
// 输出当前版本
console.log('当前版本: ' + process.version);
// 输出内存使用情况
console.log(process.memoryUsage());
