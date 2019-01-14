var fs = require("fs");
var zlib = require("zlib");

//压缩input.txt为input.txt.gz
fs.createReadStream("input.txt")
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream("input.txt.gz"));

console.log("end of the program");
