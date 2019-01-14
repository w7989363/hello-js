//我们把文件比作装水的桶，而水就是文件里的内容，
//我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。

var fs = require("fs");

//创建可读流
var reader = fs.createReadStream("input.txt");
//创建可写流
var writer = fs.createWriteStream("output.txt");

//管道读写操作
//读取input写入到output
reader.pipe(writer);

console.log("end of the program");