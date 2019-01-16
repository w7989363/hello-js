var fs = require("fs");
var zlib = require("zlib");

//解压input.txt.gz为文件input1.txt
fs.createReadStream("input.txt.gz")
	.pipe(zlib.createGunzip())
	.pipe(fs.createWriteStream("input1.txt"));
console.log("end of the program");
