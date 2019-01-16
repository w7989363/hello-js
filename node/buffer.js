// JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
// 但在处理像TCP流或文件流时，必须使用到二进制数据。
// 因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
// Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require('buffer').Buffer
// 一个 Buffer 类似于一个整数数组，但 Buffer 的大小是固定的，它对应于 V8 堆内存之外的一块原始内存。


// 创建Buffer
// 1.Buffer.from(字符串、数组、Buffer)，使用已有数据创建buffer
var buf1 = Buffer.from("hello world", "utf-8");
console.log(buf1.toString()); //hello world
// 2.Buffer.alloc(size[, fill[, encoding]])，安全分配指定大小的buffer，默认初始化为0，不会有历史遗留数据，慢速
var buf2 = Buffer.alloc(15, "k", "utf-8");
console.log(buf2.toString()); //kkkkkkkkkkkkkkk
// 3.Buffer.allocUnsafe(size)，不安全分配指定大小的buffer，未初始化，可能有遗留数据，快速
var buf3 = Buffer.allocUnsafe(64);
// 可使用 buf.fill(0) 进行初始化
buf3.fill(0);
// Buffer 模块会预分配一个大小为 Buffer.poolSize 的内部 Buffer 实例作为快速分配池
// alloc函数永远不会使用该快速内存池
// 当 size 小于或等于 Buffer.poolSize/2 时，allocUnsafe会使用该快速内存池
// 4.Buffer.from(arrayBuffer[, byteOffset [, length]])
// 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer，内容会随原数据改变
var buf4 = Buffer.from(buf2.buffer);
console.log(buf4); //<Buffer 6b 6b 6b 6b 6b 6b 6b 6b 6b 6b 6b 6b 6b 6b 6b>
// buf4与buf2共享一块内存，如果buf2改变，buf4也会改变


// Buffer.byteLength(string[, encoding])
// 返回string的“字节数”。（length返回字符数）

// buf.write(string[, offset[, length]][, encoding])
// 根据 encoding 的字符编码写入 string 到 buf 中，返回写入的字节数
var len = buf2.write("hello world!");
console.log(`写入子字节： ${len}`); //12
// 直接写数据abcdef……xyz
for (var i = 0; i < 26; i++) {
	buf3[i] = i + 97;
}

// buf.toString([encoding[, start[, end]]])
// 根据 encoding 指定的字符编码解码 buf 成一个字符串。
console.log(buf3.toString("utf-8")); //abcdefghijklmnopqrstuvwxyz
console.log(buf3.toString('ascii', 0, 5)); //abcde

// 缓冲区比较，结果类似于strcmp
// 1.Buffer.compare(buf1, buf2)
// 2.buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
console.log(buf1.compare(buf2));

// Buffer.concat(list[, totalLength])
// 缓冲区合并
var buf5 = Buffer.concat([buf1, buf2]);
console.log(`合并: ${buf5}`); //hello worldhello world!aaa

//转换为JSON对象
var json = buf1.toJSON(buf3);
console.log(json);

// buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
// 拷贝 buf 的一个区域的数据到 target 的一个区域

// buf.slice([start[, end]])
// 返回一个指向相同原始内存的新建的 Buffer，但做了偏移且通过 start 和 end 索引进行裁剪。

// Buffer.isBuffer(obj)
// 如果 obj 是一个 Buffer 则返回 true ，否则返回 false

// Buffer.poolSize
// 预分配快速内存池大小，默认8192，可更改

// 迭代器
// buf.entries() : [index, byte] 形式的迭代器
// buf.keys() : buf 键名（索引）的迭代器
// buf.values() : 一个包含 buf 的值（字节）的迭代器。 当 Buffer 使用 for..of 时会自动调用该函数。

// buf.includes(value[, byteOffset][, encoding])
// 如果 buf 找到 value，则返回 true，否则返回 false
// buf.indexOf(value[, byteOffset][, encoding])
// buf.lastIndexOf(value[, byteOffset][, encoding])
