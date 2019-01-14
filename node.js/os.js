var os = require("os");

//CPU字节序
console.log("endianness:"+os.endianness());
//操作系统名
console.log("type:"+os.type());
//操作系统名
console.log("platform:"+os.platform());
//系统内存总量
console.log("total mem:"+os.totalmem()+" bytes.");
//操作系统空闲内存
console.log("free mem:"+os.freemem()+" bytes.");