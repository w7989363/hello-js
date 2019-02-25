{
	// 6种原始数据类型 undefined null boolean string number symbol
	// 1种引用数据类型 Object，又区分为Array Function Date RegExp等

	// typeof 可以区别除了 null 之外的其他原始数据类型 以及Object中的Function
	typeof null // object
	typeof undefined // 'undefined'
	typeof true		// boolean
	typeof '1' // string
	typeof 1 // number
	typeof NaN // number
	typeof Symbol() // symbol
	typeof {} // object
	typeof function() {} // function

	// instanceof 可以判断 Object 的类型，不能判断原始数据类型
	// 因为 instanceof 的内部实现是根据原型链来判断的 left.__proto__ === right.prototype 递归直到原型链末端
	new Date() instanceof Date	// true
	new Number() instanceof Number // true
	new String() instanceof String // true

	// Object.prototype.toString()方法 返回 [object 类型] 模式的字符串
	Object.prototype.toString.call(null).slice(8, -1)	// Null
	Object.prototype.toString.call(undefined).slice(8, -1)	// Undefined
	Object.prototype.toString.call(true).slice(8, -1)	// Boolean
	Object.prototype.toString.call(new Number()).slice(8, -1)	// Number
	Object.prototype.toString.call(3).slice(8, -1)	// Number


	NaN === NaN // false

}

/*
███████ ██    ██ ███████ ███    ██ ████████     ██       ██████   ██████  ██████
██      ██    ██ ██      ████   ██    ██        ██      ██    ██ ██    ██ ██   ██
█████   ██    ██ █████   ██ ██  ██    ██        ██      ██    ██ ██    ██ ██████
██       ██  ██  ██      ██  ██ ██    ██        ██      ██    ██ ██    ██ ██
███████   ████   ███████ ██   ████    ██        ███████  ██████   ██████  ██
*/
{
	// Js事件循环

	// Js是单线程的(多线程会造成同步互斥问题)
	// Js是通过事件循环(event loop)机制实现异步的
	// 一个事件循环包括：
	// 1.宏任务入函数栈执行
	// 2.微任务入函数栈执行

	// 当执行一段js代码时，整个代码相当于一个宏任务，所以全局上下文入函数栈执行，执行当前上下文的同步代码
	// 碰到宏任务(setTimeout、setInterval、setImmediate、MessageChannel、postMessage)就将其异步任务分发到下一个loop的相应宏任务队列(setTimeout/setInterval在同一个队列、setImmediate在后面的队列)
	// 碰到微任务(nextTick、Promise、MutationObserver)就将其异步任务(nextTick的参数、Promise.then)分发到本次 loop 相应微任务队列
	// 全局执行完后，本次事件循环没有别的宏任务，去检查微任务队列，从nextTick队列开始，将微任务上下文入函数栈执行，同样碰到宏任务就将其异步任务分发到下次loop宏任务队列，微任务异步任务分发到'当前'循环的微任务队列(也就是说微任务中分发的微任务仍然在本次loop中执行)；nextTick队列执行完再去执行promise队列，同样进行异步任务分发；promise执行完后还会再重新检查微任务队列，因为每当执行完一个异步队列(不论是宏任务队列还是微任务队列)，都会重新检查微任务队列来执行
	// 所有微任务执行完，第一个事件循环就完成了，进入下次事件循环
	// 下次事件循环从setTimeout/setInterval队列开始，同样进行任务分发。执行完当前loop的setTimeout队列后会先检查微任务队列，执行清空所有的微任务；然后再进入 setImmediate 队列，进行异步任务分发，清空 setImmediate 队列后，执行微任务，微任务执行完后结束当前loop，进入下一个loop
	// 以上基于node环境分析，node环境中是清空一个宏队列再去检查微任务，而浏览器中是执行完一个宏任务就去检查微任务


	setImmediate(function() {
		setImmediate(function() {
			console.log('setImmediate2')
		})
		console.log('setImmediate1')
	})
	setTimeout(() => {
		setTimeout(() => {
			console.log('TIMEOUT2')
		})
		console.log('TIMEOUT1')
	})
	new Promise((resolve, reject) => {
		resolve()
		new Promise(resolve2 => {
			resolve2()
		}).then(() => {
			console.log('p1')
		})
	}).then(()=>{
		console.log('p2')
		new Promise(resolve => {
			resolve()
		}).then(()=>{console.log('p3')})
	})
	process.nextTick(() => {
		console.log('nextTick1')
		process.nextTick(() => {
			console.log('nextTick2')
		})
	})



	// nextTick1
	// nextTick2
	// p1
	// p2
	// p3
	// TIMEOUT1
	// setImmediate1
	// TIMEOUT2 和 setImmediate2 不一定
}



/*
██    ██  █████  ██████
██    ██ ██   ██ ██   ██
██    ██ ███████ ██████
 ██  ██  ██   ██ ██   ██
  ████   ██   ██ ██   ██
*/

/*
不使用var let const 声明的变量是全局变量，属于window/global顶层对象，应该避免

var 声明的变量属于当前作用域(全局或函数作用域)，并且执行时会将声明提前，赋值不提前 (变量提升 hoist )
浏览器中 var 声明的全局变量属于顶层对象 window
var a=1
window.a // 1

let 声明的变量属于当前块级作用域，声明不会提前
let 不允许在相同作用域内用 let 声明重名变量
暂时性死区：只要块级作用域内存在let命令，它所声明的变量就“ 绑定” 这个区域，不再受外部作用域内声明的变量的影响，
并且变量在 let 声明前是不可用的

对于简单数据类型的变量（ 数值、 字符串、 布尔值）， 变量对应的内存地址中保存的就是实际值
但对于引用类型的变量（ 主要是对象）， 变量对应的内存地址中保存的只是一个指向实际数据的指针

const 实际上保证的，并不是变量的值不得改动
因此如果const声明一个引用类型的变量，则变量本身不能重新赋值(地址不能改变)，但是其内部的值可以改变
const 特性与let相同
let const class 声明的全局变量不属于顶层变量window/global

*/


// 解构赋值
{
	// 数组的解构赋值
	// 按照位置的对应关系进行解构赋值，解构不成功则等于undefined
	// ...y表示将尾部的所有元素作为数组赋值给y ...y后面不允许有别的变量
	let [x, , ...y] = [1, 2, 3, 4, 5]
	// x  1
	// 2 被跳过
	// y  [3, 4, 5]

	// 默认值，生效条件是严格等于undefined
	let [head = 'a', tail = 'b'] = [1]
	// head 1
	// tail b


	// 对象的解构赋值
	// 按照对象键名来解构，不按顺序。并且可以给变量重命名
	let { foo: bar } = { foo: 'aaa', bar: 'bbb' }
	// 意思是将 foo 重命名为 bar，所以bar的值为aaa
	// 然而左边的foo只是用作模式匹配，所以foo === undefined，这条语句只声明了bar一个变量
	// 也可以指定默认值 {foo = 'abc'} = {foo: undefined}


	// 字符串的解构
	let [a, b, c, d, e] = 'hello'
	// a==='h'   b==='e'  c==='l'  d==='l'  e==='o'
	let { length: len } = 'hello'
	len // 5
	// length // length is not defined


	// 用途
	// 1.交换值
	[x, y] = [y, x]

	// 2.函数返回多个值，一般用对象返回，方便按照名字接受，也方便以后改变返回值不受顺序的影响
	function example() {
		return { foo1: 1, bar1: 2 }
	}
	let { foo1, bar1 } = example()

	// 3.函数传参
	// 参数是一组有次序的值
	function f([x, y, z]) {}
	f([1, 2, 3])
	// 参数是一组无次序的值
	function f({ x, y, z }) {}
	f({ z: 3, y: 2, x: 1 })

	// 4.提取json对象数据

	// 5.遍历map
	const map = new Map()
	map.set('first', 'hello')
	map.set('second', 'world')
	// for iterator of iterableObj
	for (let [key, value] of map) {
		`${key} is ${value}`
		// first is hello
		// second is world
	}

	// 6.加载模块的指定成员
	// const { SourceMapConsumer, SourceNode } = require('source-map')
	// import { mapGetters } from 'vuex'

}


/*
███████ ████████ ██████  ██ ███    ██  ██████
██         ██    ██   ██ ██ ████   ██ ██
███████    ██    ██████  ██ ██ ██  ██ ██   ███
     ██    ██    ██   ██ ██ ██  ██ ██ ██    ██
███████    ██    ██   ██ ██ ██   ████  ██████
*/

// 字符串
{
	/*
	 字符串是基本类型，是不可变的，一旦字符串被创建，就永远无法改变它
	 可以通过“+”来连接字符串，生成一个新的字符串
	 两个字符串包含着完全相同的字符且字符顺序相同，则认为这两个字符串相同
	*/
	//字符串的一些方法
	'helloworld'.charAt(1) // e
	'helloworld'.charCodeAt(1) // 十进制的unicode 101，只能识别16位2字节存储格式
	'𠮷'.codePointAt(0) // 十进制的unicode 134071，可以识别32位4字节存储格式 ES6
	String.fromCharCode(101) // unicode转字符 e，只能识别16位2字节存储格式
	String.fromCodePoint(134071) // unicode转字符 𠮷，可以识别32位4字节存储格式 ES6
	// 一般使用+运算符代替concat
	'hello'.concat(' ', 'world') // hello world
	'helloworld'.indexOf('o', 1) // 4
	// stringObject.lastIndexOf(searchvalue,fromindex) 从fromindex开始往前搜，搜不到返回-1
	'helloworld'.lastIndexOf('l', 5) // 3
	// match返回匹配字符串
	'helloworld'.match(/l/) // ['l']
	'helloworld'.match(/l/g) // ['l', 'l', 'l']
	// search返回第一个匹配的index （只有在使用正则时使用search，否则请使用indexOf，因为indexOf更快）
	'helloworld'.search(/l/) // 2
	'helloworld'.search(/l?o/) //3
	// stringObject.replace(regexp/substr,replacement)
	'helloworld'.replace('w', 'g') //hellogorld
	// stringObject.slice(start[, end])  [start, end) ，不指定 end 则截取到最后
	// start 和 end 可以为负数，表示从尾部开始计数
	'helloworld'.slice(2, 5) // llo
	// substring的参数不能使用负数，推荐使用slice
	'helloworld'.substring(2, 5) //llo
	// stringObject.split(separator[, howmany])  howmany指定返回数组的最大长度，不指定则全部
	'hello,world'.split(',', 2) //['hello', 'world']
	'hello,world'.split(',', 1) //['hello']

	// ES6补充
	'hello'.repeat(2) // hellohello
	'helloworld'.includes('llo') // true  在 chrome 中，indexOf 表现比 includes 快
	'helloworld'.startsWith('llo', 2) // true
	'helloworld'.endsWith('d', 1) // true
	'07-12'.padStart(10, 'YYYY-MM-DD') // 左边补全10长度 'YYYY-07-12'
	'2018'.padEnd(10, 'YYYY-MM-DD') // 左边补全10长度 '2018-MM-DD'

	// 模板字符串 反单引号，简化字符串和变量的拼接  ${表达式} 会转换成值
	// `str: ${s}`
}


/*
███    ██ ██    ██ ███    ███ ██████  ███████ ██████
████   ██ ██    ██ ████  ████ ██   ██ ██      ██   ██
██ ██  ██ ██    ██ ██ ████ ██ ██████  █████   ██████
██  ██ ██ ██    ██ ██  ██  ██ ██   ██ ██      ██   ██
██   ████  ██████  ██      ██ ██████  ███████ ██   ██
*/
// 数值
{
	// 16进制 0x
	0x1F7 === 503
	// 八进制 0o
	0o767 === 503 // true
	// 二进制 0b
	0b111110111 === 503 // true
	// 转换为10进制要用Number
	Number(0o767) // 503

	// 全局方法模块化 Number
	// 如果参数类型不是数值，不会进行自动转换
	Number.isFinite(NaN) // false
	Number.isFinite('foo') // false
	Number.isFinite('15') // false 不会自动转换为数字
	Number.isFinite(Infinity) // false
	Number.isNaN(NaN) // true
	Number.isNaN('NaN') // false
	Number.isNaN('15') // false
	Number.parseInt('12.34') // 12
	Number.parseFloat('123.45#') // 123.45
	Number.isInteger(25) // true
	Number.isInteger(25.0) // true 整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值
	Number.isInteger('15') // false
	Number.EPSILON // js能表示的最小精度，2E-52

	// Math
	Math.trunc(4.9) // 4 去除小数部分
	Math.trunc(-4.9) // -4
	Math.trunc('123.456') // 123
	Math.sqrt(4) // 2 平方根 square root
	Math.cbrt('8') // 2 立方根 cube root
	Math.hypot(3, 4) // 5 计算直角三角形斜边 hypotenuse

}


/*
███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██
██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██
█████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██
██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██
██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████
*/
// 函数
{
	// js函数是传值调用，即先求出参数的值，再将值传入函数体
	// 另一种策略是传名调用，将表达式传入函数体，用到的时候才进行求值


	// 参数默认值，有默认值的参数一般写在后面，如果写在前面根本无法省略
	function foo(x, y = 'world', z = x) {
		// 不能再let const声明x y变量
		// let x  // error
		// const y  // error
		console.log(`${x} ${y} ${z}`)

		// 函数调用的时候会形成一个单独的作用域，把传入的x给z
		// 如果有个全局变量x，也不会使用这个全局变量的值
	}

	// rest参数
	// 收集多余的传入参数
	function mypush(arr, ...values) {
		for (value of values) {
			arr.push(value)
		}
	}
	let arr = []
	mypush(arr, 1, 2, 3) // [ 1, 2, 3 ]

	// Function.length 含义是该函数预期传入的参数个数，即没有默认值的参数个数，不包括rest参数
	foo.length // 1
	mypush.length // 1
	mypush.name // foo 函数名

	// 箭头函数 如果函数多于一条语句，则在箭头后面加大括号，里面写函数语句
	var f = (x, y) => x + y
	// 相当于
	var f = function(x, y) {
		return x + y
	}
	// 箭头函数没有自己的this，箭头函数在定义时其this与外层this绑定
	// 正是因为它没有this，所以也就不能用作构造函数。
	// 除了this，箭头函数也不存在arguments、super、new.target，指向外层函数对应的变量
	function Timer() {
		this.s1 = 1
		this.s2 = 2
		setTimeout(() => {
			// 箭头函数中的this与外层Timer的this绑定
			// 所以无论怎么调用Timer，这里都会输出 arrow 1
			console.log('arrow', this.s1)
		}, 0)
		setTimeout(function () {
			// setTimeout 中的匿名函数 this 指向
			// 浏览器环境中一般指向全局对象 window
			// node 环境中指向一个 Timeout 对象
			console.log('anonymous', this.s2)
		}, 0)
	}
	let timer = new Timer() // arrow 1    anonymous undefined
	// 执行new的时候，构造函数中的this指向实例对象，所以箭头函数的this也指向实例对象，输出 1
	// 而执行构造函数的时候调用setTimeout，里面匿名函数的this指向全局对象或Timeout，输出 undefined

	// 但是如果直接执行 Timer() 函数结果会不一样
	// 因为直接 Timer() 执行的话，Timer 函数中的 this 指向全局对象
	// 因此就会先在全局对象中定义 s1 s2
	// 又因为箭头函数的 this 与 Timer 的 this 绑定，所以箭头函数 this 也指向全局对象，输出 1
	// setTimeout匿名函数中，如果浏览器环境(this 指向全局对象)则输出 2
	// 如果 node 环境(this指向Timeout对象)则输出 undefined


	// 尾调用:A函数的最后一步是调用另一个函数B
	// 尾调用不会保留调用栈中A函数的调用帧，节约栈空间
	// 尾递归:递归最后调用自己
	// 正常递归会形成很大的调用栈，尾递归只有一个调用帧，只在strict模式下生效
	// 下面求n的阶乘的函数，不是尾递归，调用栈会保存n个调用帧
	function factorial(n) {
		if (n === 1) return 1
		return n * factorial(n - 1)
	}
	// 下面的改写是尾递归，调用栈中只有一个调用帧
	function factorial(n, total = 1) {
		if (n === 1) {
			return total
		}
		return factorial(n - 1, n * total)
	}


}


/*
 █████  ██████  ██████   █████  ██    ██
██   ██ ██   ██ ██   ██ ██   ██  ██  ██
███████ ██████  ██████  ███████   ████
██   ██ ██   ██ ██   ██ ██   ██    ██
██   ██ ██   ██ ██   ██ ██   ██    ██
*/
// 数组
{

	// 数组的若干方法
	// let arr1 = 'hello'.split('')
	// 下面这样写可以正确识别四字节的Unicode
	let arr1 = [...'hello']
	arr1.indexOf('h') // 0
	// 截取返回一个新数组 slice(start,end)
	arr1.slice(2, 5) // ['l', 'l', 'o']
	// arrayObject.splice(index, howmany, item1,.....,itemX)
	// 数组中指定位置删除/添加项目，然后返回被删除的项目，改变原有数组 
	// [1, 2, 3].splice(1, 1) // 2  原数组变为 [1, 3]
	arr1.push(' who') // ['h', 'e', 'l', 'l', 'o', ' who']
	arr1.pop() // ' who' ['h', 'e', 'l', 'l', 'o']
	arr1.unshift('t', 'g') // ['t', 'g', 'h', 'e', 'l', 'l', 'o']
	arr1.shift() // 't'   ['g', 'h', 'e', 'l', 'l', 'o']
	arr1.sort() // ['e', 'g', 'h', 'l', 'l', 'o']
	// sort函数有一个缺陷：如果给数字排序并且包含负数例如 [-1, -2, 0, 2]
	// 直接arr.sort()结果为[-1, -2, 0, 2]，因为按照字符串处理
	// -1 -2负号相同，比较后面的数字，1<2所以 -1<-2
	// 可以加比较函数来解决 arr.sort((a,b) => a - b)

	// 扩展运算符 ... 将数组元素分割为一个个变量
	// 用扩展运算符可以大大减少apply函数的使用
	arr1.push(...[1, 2]) // ['e', 'g', 'h', 'l', 'l', 'o', 1, 2]
	// 数组是复合的数据类型，因此变量指向的内存区域存的是数组所在内存的地址
	// 直接复制只是复制了一个指针，指向同一块内存，而不是在内存中克隆一份数组数据
	// 使用扩展运算符可以方便的克隆数组
	let arr2 = [...arr1]
	// 合并数组
	// let arr3 = arr1.concat(arr2)
	let arr3 = [...arr1, ...arr2]
	// concat和...都是浅拷贝，即数组的成员仍然是引用
	let arr4 = [{
		a: 1
	}]
	let arr5 = [...arr4]
	// 由于成员是引用，修改原成员会引起arr5成员的变化
	arr4[0].a = 2
	arr5 // [ { a: 2 } ]
	// ...是浅拷贝，深拷贝使用 JSON.parse(JSON.stringify(arr))

	// 对于实现了Iterator接口的对象，都可用...转换为数组
	// Map Set结构、 Generator函数等

	// Array.from() 用于将类数组数据结构(包含length属性即可)转换为数组
	// 例如操作DOM元素的NodeList、arguments、Set、String
	// 只要实现了Iterator接口的数据结构，都可用Array.from()
	Array.from('hello') // [ 'h', 'e', 'l', 'l', 'o' ]
	// 生成 10 个 undefined 组成的数组
	Array.from({ length: 10 })
	// 再利用 keys() rest 运算符可以快速生成 0~9
	arr6 = [...Array.from({ length: 10 }).keys()] // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]


	// Array.of(arg1, arg2, ...)用来构建新数组，替代Array() new Array()
	// 将每一个参数作为数组的一个元素
	Array.of(...'hello') // [ 'h', 'e', 'l', 'l', 'o' ]
	Array.of('hello') // [ 'hello' ]

	// 修改当前数组，将指定位置的成员复制到其他位置，返回修改后的数组
	// Array.prototype.copyWithin(target, start = 0, end = this.length)
	arr6 = [1, 2, 3, 4, 5]
	arr6.copyWithin(0, 3) // [4, 5, 3, 4, 5]

	// [].find(callback, thisArg) [].findIndex() thisArg用于绑定callback中的this
	// 返回数组中第一个符合回调函数条件的成员(或index)
	arr6 = [1, 5, 10, 15]
	arr6.find(function(value, index, arr) {
		return value > 9
	}) // 10

	let arr7 = [1, 2, 3, 4, 5]

	// [].fill(value, start, end) 用于填充数组
	arr7.fill(7, 4) // [1, 2, 3, 4, 7]

	// [].entries() [].keys() [].values()返回一个迭代器，可用for...of forEach遍历

	arr7.includes(1) // true

	// 遍历 forEach() 比 for 循环快
	arr7.forEach((item, index) => {
		// 只是遍历，不会改变原数组，也没有返回值
	})

	// 筛选
	let arr8 = arr7.filter((item, index) => {
		return item < 7
	}) // [1, 2, 3, 4]
	// 检测数组中元素是否都满足条件
	arr8.every((item, index) => item < 5) // true
	// 检测数组中元素是否有满足条件的 arr.some(callback, thisArg)

	// “累加器” 依次对数组元素处理，最后缩减为一个值
	// reduce(callback, initValue)
	arr8.reduce((sum, item, index) => {
		return item * sum
	}, 1) // 24

	// 将数组中的每个元素进行回调函数的映射，返回一个新的数组(数组长度肯定不变)
	let arr9 = arr8.map((item, index) => {
		return item * item
	})

	
}


/*
 ██████  ██████       ██ ███████  ██████ ████████
██    ██ ██   ██      ██ ██      ██         ██
██    ██ ██████       ██ █████   ██         ██
██    ██ ██   ██ ██   ██ ██      ██         ██
 ██████  ██████   █████  ███████  ██████    ██
*/
// 对象
{
	let birth = '1994-11-14'
	// 允许直接写入变量和函数(不需要加function关键字)，更加简洁
	const person = {
		name: '张三',
		// 等同于birth: birth
		birth,
		// 等同于hello: function ()...
		hello() {
			console.log('我的名字是', this.name)
		},
		// 也可以 [表达式]:值 来定义 等同于'abc':123
		['a' + 'bc']: 123,
	}

	// 获取对象属性值，使用 || 来提供默认值，就不会返回 undefined 了
	const gender = person.gender || '男'		// 男
	// 或者使用解构赋值的默认值
	// const {gender = '男'} = person
	// person.family是undefined，访问其属性会报错，可以使用&&来避免报错
	const son = person.family && person.family.son  // undefined
	// 对象赋值是引用，x和person指向同一片内存
	const x = person


	// 输出模块更加简洁
	// module.exports = { getItem, setItem, clear }


	// Object.create(prototype: object[, descriptors: PropertyDescriptorMap])
	// 创建返回一个新的对象，其 __proto__ 指向 proto ，属性为 propDescriptors 中定义的属性
	// 第二个参数 propDescriptors 可选，是一个对象，里面包含一到多个属性描述符(PropertyDescriptor)：
	/*
	{
		foo: {
			value: 'hello'
			writable: true,
			enumerable: true,
			configurable: true
		},
		bar: {
			// writable 默认为 false，不可写
			// enumerable 默认为 false 不可枚举
			configurable: false,
			get: function () {
				return 10
			},
			set: function (value) {
				console.log('Setting `o.bar` to', value)
			}
		}
	}
	*/

	// Object.assign(target, source) 浅拷贝，将 source 中所有可枚举属性(enumerable)复制到 target
	// 并且只会克隆自身的值，不会克隆原型链上继承的值
	const target = {
		a: 1,
		b: 1
	}
	const source1 = {
		b: 2,
		c: 2
	}
	const source2 = {
		c: 3,
		f() {}
	}
	Object.assign(target, source1, source2)
	// 有同名属性 后面source会覆盖前面
	target // {a:1, b:2, c:3, f: [Function: f]}
	// 如果想要同时克隆原型链，可以用以下方法
	function clone(origin) {
		let originProto = Object.getPrototypeOf(origin)
		return Object.assign(Object.create(originProto), origin)
	}
	// 使用 assign 有一个缺陷：不能拷贝属性的 setter 和 getter
	// 为此 ES6新增两个define函数
	// Object.defineProperty(obj, propName, propDescriptor) 添加单个属性，主要用来添加getter setter函数
	// Object.defineProperties(obj, propDescriptors)				批量添加属性
	// 其中 descriptor 是属性描述符，可以用以下函数获取
	// Object.getOwnPropertyDescriptor(obj, propName)
	// Object.getOwnPropertyDescriptors(obj)
	// 以上的 clone 函数可以改写为以下形式
	function clone2(origin) {
		return Object.create(
			Object.getPrototypeOf(origin),
			Object.getOwnPropertyDescriptors(origin)
		)
	}


	// 深拷贝
	// 1.JSON.parse
	// 只能拷贝自身的可枚举属性，并且不包括 symbol，另外描述符也没有拷贝(只拷贝了值)
	// let newObj = JSON.parse(JSON.stringify(oldObj))
	// 2.自己实现
	// 只考虑自身属性深拷贝，原型链直接继承
	function deepClone(origin) {
		let ret = Object.create(Object.getPrototypeOf(origin))
		// Reflect.ownKeys() 返回的是自身的所有属性，包括不可枚举属性和symbol
		Reflect.ownKeys(origin).forEach(key => {
			if (origin[key] === null || typeof origin[key] !== 'object') {
				// typeof 可以识别6中基本类型(除了null, null 判断为 object)和function
				// 6种基本类型和function都可以直接赋值，所以判断不是 object 的或者 null 都直接赋值
				Object.defineProperty(ret, key, Object.getOwnPropertyDescriptor(origin, key))
			} else {
				// 其他引用类型递归调用深拷贝
				ret[key] = deepClone(origin[key])
			}
		})
		return ret
	}

	// 遍历
	// for...in循环: 遍历对象自身的和原型链上的属性（ Symbol: X  不可枚举属性: X）一般配合obj.hasOwnProperty(prop)使用
	// Object.keys(): 返回对象自身属性的键名数组（ Symbol: X  不可枚举属性: X）
	// Object.getOwnPropertyNames(obj): 返回对象自身的所有普通属性键名，（ Symbol: X  不可枚举属性: √）
	// Object.getOwnPropertySymbols(obj): 返回对象自身的symbol属性键名（ Symbol: √  不可枚举属性: √）
	// Reflect.ownKeys(obj) 返回自身的所有属性键名数组（ Symbol: √  不可枚举属性: √）
	// 我们一般只关心当前对象的属性，所以尽量用Object.keys(obj).forEach(),速度比for...in快很多
	Object.keys(person).forEach((k) => {
		person[k]
	})


	// 属性描述符 PropertyDescriptor
	// {
	// 	// 成员的值
	// 	value: any,
	// 	// 是否可枚举 影响 for...in  Object.keys()
	// 	enumerable: boolean,
	// 	// 如果设置为 false 属性不可删除，descriptor 中除 value writable 之外的其他值不可更改
	// 	configurable: boolean,
	// 	// 是否可以更改初始值
	//   writable: boolean
	// }
	
	// Object.seal(obj)  密封一个对象
	// 密封后的对象不能添加、删除成员，将所有成员的 descriptor.configurable 设置为 false
	// 密封后的对象其属性的值可以修改，descriptor 中的值因 configurable 为 false 而部分无法更改
	// Object.freeze(obj) 冻结一个对象
	// 冻结后的对象不能添加、修改、删除成员，将所有成员 descriptor.configurable descriptor.writable 设置为 false
	// 冻结后的对象其属性的值和 descriptor 都不能修改
}


/*
███████ ██    ██ ███    ███ ██████   ██████  ██
██       ██  ██  ████  ████ ██   ██ ██    ██ ██
███████   ████   ██ ████ ██ ██████  ██    ██ ██
     ██    ██    ██  ██  ██ ██   ██ ██    ██ ██
███████    ██    ██      ██ ██████   ██████  ███████
*/
// Symbol
{
	// 新的原始数据类型Symbol，表示独一无二的值
	// 参数是对实例的描述
	let mySymbol = Symbol('description')
	mySymbol // Symbol(description)

	// Symbol 值可以作为标识符，用于对象的属性名，能保证不会出现同名的属性
	// Symbol 值作为对象属性名时，不能用点运算符
	let a = {
		[mySymbol]: 'Hello!'
	}
	// 第二种写法
	a[mySymbol] = 'Hello!'

	// Symbol 作为属性名，不会被 for...in for...of 循环遍历
	// 也不会被 Object.keys()、Object.getOwnPropertyNames() 返回
	// 可以利用这个特性定义私有的内部方法

	// 如果希望使用同一个symbol，需要使用Symbol.for()定义
	// Symbol.for('foo')会把foo登记在全局环境中，
	// 再次定义'foo'时就会先查找，如果有就返回同一个Symbol
	// 而Symbol('foo')就不会返回同一个
	let s1 = Symbol.for('foo')
	let s2 = Symbol.for('foo')
	s1 === s2 // true

	// 可以利用 Symbol 实现 Singleton 单例模式
	// 单例模式指调用一个类，任何时候返回的都是同一个实例
	// 例如 node 中模块文件可以看成一个类，每次执行这个模块想返回同一个实例，可以将实例放入 global 中
	// mod.js
	/*
	const FOO_KEY = Symbol.for('foo')
	function A() {
	  this.foo = 'hello'
	}
	if (!global[FOO_KEY]) {
	  global[FOO_KEY] = new A()
	}
	module.exports = global[FOO_KEY]
	*/

}


/*
███████ ███████ ████████     ███    ███  █████  ██████
██      ██         ██        ████  ████ ██   ██ ██   ██
███████ █████      ██        ██ ████ ██ ███████ ██████
     ██ ██         ██        ██  ██  ██ ██   ██ ██
███████ ███████    ██        ██      ██ ██   ██ ██
*/
// Set集合 Map映射
{
	// Set类似于数组，但是成员的值都是唯一的，没有重复的值。
	// Set()可以接受数组作为参数，可以用于去掉数组中的重复值
	const s = new Set()
	const arr = [2, 3, 5, 4, 5, 2, 2]
	arr.forEach(x => s.add(x))
	// s // Set { 2, 3, 5, 4 }

	// s.size：返回Set实例的成员总数
	// s.add(value)：添加某个值，返回 Set 结构本身。
	// s.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
	// s.has(value)：返回一个布尔值，表示该值是否为Set的成员。
	// s.clear()：清除所有成员，没有返回值。

	// 遍历Set 遍历顺序就是插入顺序
	// s.keys()：因为Set没有键名，所以同 values() 返回值的遍历器 // for(let item of s.keys())
	// s.values()：返回值的遍历器	// for(let item of s.values())
	// s.entries()：返回键值对的遍历器(键和值一样) // for(let [key, item] of s.entries())
	// s.forEach()：使用回调函数遍历每个成员
	// for of，同 values()

	// WeakSet 只能用来存放对象，并且其成员对象不会计入引用计数，其他地方计数为0即被删除


	// Map，类似于object，但是键可以是任何数据类型，不再局限于字符串
	const m = new Map()
	const o = {
		p: 'Hello World'
	}
	// 添加
	m.set(o, 'content') // Map { { p: 'Hello World' } => 'content' }
	// 读取
	m.get(o) // 'content'
	// 其他方法
	m.has(o) // true
	m.delete(o) // true
	m.has(o) // false
	m.clear()
	// 遍历
	for ([k, v] of m) {
		// ...
	}

	// 利用Object.entries(obj)快速转map
	// const m = new map(Object.entries(obj))

	// WeakMap 键只能是对象，键不计入引用计数

}


/*
██████  ███████ ███████ ██      ███████  ██████ ████████
██   ██ ██      ██      ██      ██      ██         ██
██████  █████   █████   ██      █████   ██         ██
██   ██ ██      ██      ██      ██      ██         ██
██   ██ ███████ ██      ███████ ███████  ██████    ██
*/
// Reflect
{

	// 1.将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty）放到Reflect对象上
	// 2.修改某些Object方法的返回结果，让其变得更合理
	// Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，
	// 而Reflect.defineProperty(obj, name, desc)则会返回false
	/*
	// 老写法
	try {
		Object.defineProperty(target, property, attributes)
		// success
	} catch (e) {
		// failure
	}
	// 新写法
	if (Reflect.defineProperty(target, property, attributes)) {
		// success
	} else {
		// failure
	}
	*/

	// 3.让Object操作都变成函数行为 in => Reflect.has(), delete => Reflect.deleteProperty()
	/*
	// 老写法
	'assign' in Object // true
	// 新写法
	Reflect.has(Object, 'assign') // true
	*/

	// 4.Reflect对象的方法与Proxy对象的方法一一对应。写Proxy时完成默认行为，作为修改行为的基础。
	/*
	Proxy(target, {
		set (target, name, value, receiver) {
			var success = Reflect.set(target, name, value, receiver)
			if (success) {
				console.log('property ' + name + ' on ' + target + ' set to ' + value)
			}
			return success
		}
	})
	*/


	// Reflect的静态方法
	// Reflect.apply(target, thisArg, args)
	// Reflect.construct(target, args)  							相当于 new target(args)
	// Reflect.get(target, name, receiver)  					相当于 obj.name
	// Reflect.set(target, name, value, receiver)  	相当于 obj.name =
	// Reflect.has(target, name)											相当于 name in obj 检查原型链
	// Reflect.deleteProperty(target, name)  				相当于 delete obj[name]
	// Reflect.defineProperty(target, name, desc)
	// Reflect.ownKeys(target) 					基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
	// Reflect.isExtensible(target)			对象是否可扩展，即是否可以在对象上添加新的属性/方法
	// Reflect.preventExtensions(target)
	// Reflect.getOwnPropertyDescriptor(target, name)
	// Reflect.getPrototypeOf(target)
	// Reflect.setPrototypeOf(target, prototype)


}


/*
██████  ██████   ██████  ██   ██ ██    ██
██   ██ ██   ██ ██    ██  ██ ██   ██  ██
██████  ██████  ██    ██   ███     ████
██      ██   ██ ██    ██  ██ ██     ██
██      ██   ██  ██████  ██   ██    ██
*/
// 代理
{
	// Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改
	// var proxy = new Proxy(target, handler)
	// target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
	let handler = {
		set(target, key, value, receiver) {
			// 先调用 Reflet.set 执行默认的 set 行为
			const success = Reflect.set(target, key, value, receiver)
			// 自定义行为
			if (success) {
				console.log('property ' + key + ' on ' + target + ' set to ' + value)
			}
			return success
		}
	}
	let proxyObj = new Proxy({}, handler)
	// 注意，要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。
	proxyObj.a = 'aaa' // 输出 property a on [object Object] set to aaa

	// 用法2
	// 以proxyObj为原型对象创建一个新对象
	let proxyObj2 = Object.create(proxyObj)
	// proxyObj2没有a，所以到原型对象上去，触发proxy操作
	proxyObj2.b = 'bbb' // 输出 property b on [object Object] set to bbb

	// 一共支持13种拦截：
	// get(target, propKey, receiver)
	// 拦截对象属性的读取，比如proxy.foo和proxy['foo']。

	// set(target, propKey, value, receiver)
	// 拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。

	// has(target, propKey)
	// 拦截propKey in proxy的操作，返回一个布尔值。

	// deleteProperty(target, propKey)
	// 拦截delete proxy[propKey]的操作，返回一个布尔值。

	// ownKeys(target)
	// 拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。
	
	// getOwnPropertyDescriptor(target, propKey)
	// 拦截Object.getOwnPropertyDescriptor() Object.getOwnPropertyDescriptors() 返回属性的描述对象。

	// defineProperty(target, propKey, propDesc)
	// 拦截Object.defineProperty(proxy, propKey, propDesc)、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

	// preventExtensions(target)
	// 拦截Object.preventExtensions(proxy)，返回一个布尔值。

	// isExtensible(target)
	// 拦截Object.isExtensible(proxy)，返回一个布尔值。

	// getPrototypeOf(target)
	// 拦截Object.getPrototypeOf(proxy)，返回一个原型对象。

	// setPrototypeOf(target, proto)
	// 拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

	// apply(target, object, args)
	// 拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

	// construct(target, args)
	// 拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
}


/*
██ ████████ ███████ ██████   █████  ████████  ██████  ██████
██    ██    ██      ██   ██ ██   ██    ██    ██    ██ ██   ██
██    ██    █████   ██████  ███████    ██    ██    ██ ██████
██    ██    ██      ██   ██ ██   ██    ██    ██    ██ ██   ██
██    ██    ███████ ██   ██ ██   ██    ██     ██████  ██   ██
*/
// 遍历器
{
	// Iterator 接口
	/*
	// 一个对象如果是可遍历的(for...of)，则应该实现 Iterable 接口
	interface Iterable {
		// 该接口有一个以 Symbol.iterator 为键名的方法，返回值类型为 Iterator 遍历器对象
		[Symbol.iterator](): Iterator,
	}
	interface Iterator {
		// 类型 Iterator 为一个含有 next() 方法的对象
		next(value ? : any): IterationResult,
	}
	// next() 方法的返回值类型为一个对象，该对象拥有 value(值) done(表示是否遍历结束) 成员
	interface IterationResult {
		value: any,
		done: boolean,
	}
	*/

	// 原生具备 Iterator 接口的数据结构如下
	// Array
	// Map
	// Set
	// String
	// TypedArray
	// 函数的 arguments 对象
	// NodeList 对象


	// myDataset 类实现了 iterator 接口，该类实例可以直接使用 for...of 遍历
	class myDataset {
		constructor() {
			this.data = ['hello', 'world']
		}
		// 执行这个函数，就会返回一个遍历器对象
		[Symbol.iterator]() {
			const self = this
			// 利用闭包记录遍历 index
			let index = 0
			// 返回遍历器对象，具有 next() 方法
			return {
				next() {
					if (index < self.data.length) {
						return {
							value: self.data[index++],
							done: false
						}
					} else {
						return {
							value: undefined,
							done: true
						}
					}
				}
			}
		}
		// 因为生成器函数(Generator)返回的是遍历器，所以可以使用 Generator 函数来实现 [Symbol.iterator]
		*[Symbol.iterator]() {
			this.data.forEach(item => {
				yield item
			})
		}
	}

	// 对于类似数组的对象（存在数值index键名和length属性）部署 Iterator 接口，
	// 有一个简便方法，就是直接使用 Array.prototype[Symbol.iterator]
	// obj[Symbol.iterator] = Array.prototype[Symbol.iterator]
	let iterable = {
		0: 'a',
		1: 'b',
		2: 'c',
		length: 3,
		[Symbol.iterator]: Array.prototype[Symbol.iterator]
	}
	for (let res of iterable) {
		res
		// a
		// b
		// c
	}

	// 普通对象没有实现 Iterator 接口，不能使用 for...of 但可以使用 for...in

}


/*
 ██████  ███████ ███    ██ ███████ ██████   █████  ████████  ██████  ██████
██       ██      ████   ██ ██      ██   ██ ██   ██    ██    ██    ██ ██   ██
██   ███ █████   ██ ██  ██ █████   ██████  ███████    ██    ██    ██ ██████
██    ██ ██      ██  ██ ██ ██      ██   ██ ██   ██    ██    ██    ██ ██   ██
 ██████  ███████ ██   ████ ███████ ██   ██ ██   ██    ██     ██████  ██   ██
*/
// 生成器
{
	// function关键字与函数名之间有一个星号，紧跟在function关键字后面
	// Generator 函数可以理解为一个状态机，可以依次遍历其中的"状态"
	// 执行 Generator 函数会返回一个遍历器对象，该对象接口定义如下
	/*
	interface Iterator {
		// 类型 Iterator 为一个含有 next() 方法的对象
		next(value ? : any): IterationResult,
	}
	// next() 方法的返回值类型为一个对象，该对象拥有 value(值) done(表示是否遍历结束) 成员
	interface IterationResult {
		value: any,
		done: boolean,
	}
	*/
	// 使用遍历器的 next() 函数可以依次遍历 Generator 函数内部的每一个状态

	// 调用 Generator 函数后，该函数体并不执行，先返回遍历器对象
	// 调用 iterator.next() 会执行到 yield() 暂停，并返回 yield 后面的值，再次调用 next() 继续执行
	function* helloWorldGenerator() {
		yield 'hello'
		yield 'world'
		return 'ending'
	}
	let it = helloWorldGenerator()
	it.next() // { value: 'hello', done: false }
	it.next() // { value: 'world', done: false }
	it.next() // { value: 'ending', done: true }


	// 如果 next() 不添加任何参数，则 yield 表达式返回值总是为 undefined
	// next()函数的参数可以作为上次yield的返回值
	function* f() {
		for (let i = 0; true; i++) {
			// 如果 next() 传入参数为空，则 reset === undefined
			// 如果传入参数不为空，则 reset === 传入参数
			var reset = yield i
			if (reset) {
				i = -1
			}
		}
	}
	let g = f()
	g.next() // { value: 0, done: false }
	g.next() // { value: 1, done: false }
	// 此时 reset === true 重置 i === -1 所以经过 i++ 输出 0
	g.next(true) // { value: 0, done: false }

	// yield* Generator/Iteratable表示进入后面对象的遍历
	function* foo() {
		yield 'a'
		yield 'b'
	}

	function* bar() {
		yield 'x'
		yield* foo()
		yield 'y'
	}
	// bar的遍历顺序是 x a b y

	function* foobar() {
		yield 'test'
		// 因为 String 原生具有遍历器，会一个字符一个字符的返回
		yield* 'hello'
	}
	// test h e l l o
}


/*
 █████  ███████ ██    ██ ███    ██  ██████
██   ██ ██       ██  ██  ████   ██ ██
███████ ███████   ████   ██ ██  ██ ██
██   ██      ██    ██    ██  ██ ██ ██
██   ██ ███████    ██    ██   ████  ██████
*/
{
	// async 就是 Generator 的语法糖
	// async 表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
	// async 的改进：
	// 1.内置执行器，不用像 Generator 一样使用 co 模块
	// 2.async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）
	// 3.返回值是 Promise。async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖

	// async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。
	// 当函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。


	const fs = require('fs')
	const readFile = function (fileName) {
		return new Promise((resolve, reject) => {
			fs.readFile(fileName, (error, data) => {
				if (error) return reject(error)
				resolve(data)
			})
		})
	}
	// 两个 readFile 可以同时进行，用 Promise.all([...])，返回一个数组
	// async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态，被catch回调函数接收
	const asyncReadFile = async function () {
		const [a, b] = await Promise.all([
			readFile('./.babelrc').catch(err => console.log(err)),
			readFile('./test.js').catch(err => console.log(err))
		])
		// async函数return返回的值会被then方法的回调函数接收到
		return {
			babelrc: a.toString(),
			test: b.toString()
		}
	}
	asyncReadFile().then(res => {
		// console.log(res.babelrc, res.test)
	})

	// 或者用 await asyncReadFile
	// const res = await asyncReadFile()



	// for await 循环，在执行下一步之前会等待每个 Promise 完成
	const promises = [
		new Promise(resolve => resolve('1')),
		new Promise(resolve => resolve('2')),
		new Promise(resolve => resolve('3')),
	]
	async function forawait() {
		for await (const val of promises) {
			console.log(val)
		}
		// 1 2 3
		// 如果直接循环，log出来是三个promise对象
	}

}


/*
 ██████ ██       █████  ███████ ███████
██      ██      ██   ██ ██      ██
██      ██      ███████ ███████ ███████
██      ██      ██   ██      ██      ██
 ██████ ███████ ██   ██ ███████ ███████
*/
// 类
{
	// 用于定义私有方法
	const privateAttr = Symbol('bar')
	// 类的声明不存在变量提升，因为要保证子类在父类之后定义
	// 类可以看做是构造函数的另一种书写方式，语法糖
	class Point {
		// 类中的 this 代表 new 出来的实例对象，所以 this.x 定义的是实例属性
		constructor(x = 0, y = 0) {
			this.x = x
			this.y = y

			// 可以在构造方法中为类内方法绑定this为当前当前实例
			this.toString = this.toString.bind(this)
			// 也可以直接使用箭头函数定义
			// this.toString = () => {}
			// 这样的一个变化是 toString 变成了实例方法，而在类中定义的方法是定义在 prototype 中的

			// new.target，返回当前 Class，如果子类继承则返回子类Class
			// 可以利用这个特性写出不能实例化的类(虚类)
			// if(new.target === Point){
			//     throw new Error('本类不能实例化')
			// }

		}
		// ES6 不能在 class 中直接定义实例属性，以下定义会报错，ts 支持这种语法
		// xy = 41
		
		// 类内直接定义的方法属于原型对象 Point.prototype.toString()
		// 类内定义方法不用加function关键字
		toString() {
			return `(${this.x}, ${this.y})`
		}
		// 如果是私有方法可以在前面加一个下划线标识，这只是一种形式上的标记，仍然可以被外部访问
		_privateFunc() {}
		// 可以使用Symbol来定义私有方法，类作为模块导出时外部就没法访问
		[privateAttr]() {}
		// get set 关键字
		set distence(d) {
			this.d = d
		}
		get distence() {
			return this.d ? this.d : Math.sqrt(this.x ** 2 + this.y ** 2)
		}
		// 类中的Generator函数
		// Symbol.iterator返回类的默认遍历器，下面使用Generator修改类的默认遍历器，可以直接用for of遍历
		*[Symbol.iterator]() {
			yield this.x
			yield this.y
			// for (let v of new Point(2,3)) {
			//   console.log(v) // 2 3
			// }
		}
		// 静态方法 static，直接用类调用，无法通过实例调用
		// 因为 static 定义的方法是定义在构造函数对象中的，不存在于原型链
		static staticFunc() {
			return 'hey'
		}
		// 也可以在外部定义静态方法
		// Point.staticFunc()

		// 静态属性提案，ES6还不支持，ts支持这种语法
		// static staticAttr = 'staticAttr'
		// 也可以在外部定义静态属性
		// Point.six = 6
	}
	// 类的数据类型是函数，因为类本身就指向构造函数
	typeof Point // function
	Point === Point.prototype.constructor // true
	// 类的方法都定义在 prototype 对象上面，新方法可以添加在 prototype 对象上面。
	Point.prototype.fun1 = function() {}
	// Object.assign 方法可以很方便地一次向原型对象添加多个属性/方法
	Object.assign(Point.prototype, {
		protoAttr: 'protoAttr',
		func2() {},
		func3() {}
	})
	// 使用new关键字来实例化对象
	let p = new Point(3, 4)
	// 定义静态属性(static)，只能通过类访问
	Point.six = 6
	Point.six // 6
	// 静态属性不能通过实例访问，因为定义在构造函数对象中，不在原型链中
	p.six // undefined
	// 使用 get 方法
	p.distence // 5
	// 建议使用 Object.getPrototypeOf(obj) 代替 obj.__proto__
	p.__proto__ === Object.getPrototypeOf(p) // true
	// 实例的 __proto__ 指向类(构造函数)的原型对象
	p.__proto__ === Point.prototype // true

	// in 运算符会遍历所有可枚举属性(不包括Symbol)，包括原型链上继承的
	for (var k in p) {
		// hasOwnProperty只检测自身，不检测原型链
		if (p.hasOwnProperty(k)) {
			`${k}`
			// x y toString
		}
	}
	// 可以写出立即执行的class
	let person = new class {
		constructor(name) {
			this.name = name
		}
		sayName() {
			console.log(this.name)
		}
	}('张三')
	person.sayName() // 张三


	// 继承
	class colorPoint extends Point {
		constructor(x, y, color = 'red') {
			// 子类必须在constructor方法中调用super方法，否则新建实例时会报错
			// 只有调用super之后才能在子类中使用this
			// 因为ES6使用父类的构造函数来塑造this，然后再用子类的构造方法修改this
			// super 内部实现为 Point.prototype.constructor.call(this)
			// 所以这一句就相当于使用原型链实现继承时的 Parent.call(this)
			super(x, y)
			// super() 当做函数时代表父类构造函数
			// super 当做对象时，用在不同地方有不同的含义
			// 在普通方法中 super 指向父类的原型对象 prototype，在静态方法中指向父类对象(也就是定义静态属性/方法的对象)
			
			this.color = color
		}
		toString() {
			return `${this.color} ${super.toString()}`
		}
	}
	let cp = new colorPoint(1, 2, 'red')
	cp.toString() // red (1, 2)
	// 继承的内部实现
	// setPrototypeOf(obj, prototype) 等同于 obj.__proto__ = prototype
	// 下面实现了原型链 属性/方法 的继承
	Object.setPrototypeOf(colorPoint.prototype, Point.prototype)
	// 下面实现了静态 属性/方法 的继承
	Object.setPrototypeOf(colorPoint, Point)
	// 具体解释参考 ./prototype.js 继承方法6
}

/*
██████  ███████  ██████  ██████  ██████   █████  ████████  ██████  ██████
██   ██ ██      ██      ██    ██ ██   ██ ██   ██    ██    ██    ██ ██   ██
██   ██ █████   ██      ██    ██ ██████  ███████    ██    ██    ██ ██████
██   ██ ██      ██      ██    ██ ██   ██ ██   ██    ██    ██    ██ ██   ██
██████  ███████  ██████  ██████  ██   ██ ██   ██    ██     ██████  ██   ██
*/
// 修饰器
{
	// 修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。
	// 修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。
	/*
	@testable
	class MyTestableClass {
	    // ...
	}
	function testable(target) {
		// 这是添加的静态属性
		target.isTestable = true
		// 如果想添加实例属性
		target.prototype.isTest = false
	}
	MyTestableClass.isTestable // true
	let t = new MyTestableClass()
	t.isTest // false
	*/

}


/*
 █████  ██████  ██████   █████  ██    ██ ██████  ██    ██ ███████ ███████ ███████ ██████
██   ██ ██   ██ ██   ██ ██   ██  ██  ██  ██   ██ ██    ██ ██      ██      ██      ██   ██
███████ ██████  ██████  ███████   ████   ██████  ██    ██ █████   █████   █████   ██████
██   ██ ██   ██ ██   ██ ██   ██    ██    ██   ██ ██    ██ ██      ██      ██      ██   ██
██   ██ ██   ██ ██   ██ ██   ██    ██    ██████   ██████  ██      ██      ███████ ██   ██
*/
// ArrayBuffer(byteLength)
{
	// ArrayBuffer提供直接操作连续内存的途径，类似于 c 中的 malloc
	// ArrayBuffer本身不能直接操作内存，需要通过在其上建立“视图”
	// 同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）
	// 视图就是如何看待、解析这一片内存，是8位无符号整数还是32位浮点等
	// TypedArray视图，TypedArray(buffer, byteOffset=0, length?)，包括九种类型:
		// Int8Array
		// Uint8Array
		// Uint8ClampedArray	// 同上是8位无符号整数，但是溢出处理不同
		// Int16Array
		// Uint16Array
		// Int32Array
		// Uint32Array
		// Float32Array
		// Float64Array

	
	// 申请8字节的连续内存
	const buffer = new ArrayBuffer(8)
	// 在其上建立视图（可以在一个ArrayBuffer上建立多个视图，但是操作的都是同一片内存）
	const x8 = new Uint8Array(buffer) // 一个元素占8位一个字节，x8.length === 8
	x8 // Uint8Array [0, 0, 0, 0, 0, 0, 0, 0]
	x8[0] = 2 // Uint8Array [ 2, 0, 0, 0, 0, 0, 0, 0 ]
	x8[1] = 1 // Uint8Array [ 2, 1, 0, 0, 0, 0, 0, 0 ]
	const x16 = new Uint16Array(buffer) // 一个元素占16位两个字节，x1.length === 4
	x16 // Uint16Array [ 258, 0, 0, 0 ]
	// 为什么是 258
	// x86体系是小端字节序，即小的数存在前面
	// 第1第2字节表示一个数，存的是2 1，由于是小端字节序，1表示高位
	// 转为2进制就是 00000001 00000010，即 258

	// TypedArray很像普通数组，所有数组方法都可以用
	x8.buffer // 返回视图对应的ArrayBuffer


	// DataView视图，可以自定义复合格式的视图，比如第一个字节是 Uint8，第二、三个字节是 Int16
	// DataView(buffer, byteOffset = 0, length ? )
	// DataView视图的设计目的，是用来处理网络设备传来的数据
	// 大端字节序或小端字节序是可以自行设定的
	// 默认情况下，DataView的get系列方法使用大端字节序解读数据
	// 如果需要使用小端字节序解读，必须在get方法的第二个参数指定true
	const dv = new DataView(buffer) // 内存字节 [ 2, 1, 0, 0, 0, 0, 0, 0 ]
	dv.getUint16(0) // 2 1默认大端序读出来是 513
	// set系列方法，第一个参数指定开始写入的字节序号，第二个参数为写入的数据
	// 第三个参数可选，指定大小端序，默认大端序，true为小端序
	dv.setUint16(0, 512) // 内存字节 [ 2, 0, 4, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]



	// SharedArrayBuffer 在 Web Worker 中的应用
	// 主线程与用户交互，worker线程进行运算。他们之间通过postMessage/onmessage交互
	// 这种数据交互是通过复制实现的，如果有大量数据非常耗时
	// SharedArrayBuffer开辟一片共享内存，实现数据的快速交互
	/*
	// 主线程
	// 新建 1KB 共享内存
	const sharedBuffer = new SharedArrayBuffer(1024)
	// 主线程将共享内存的地址发送出去
	w.postMessage(sharedBuffer)
	// 在共享内存上建立视图，供写入数据
	const sharedArray = new Int32Array(sharedBuffer)

	// Worker 线程
	onmessage = function(ev) {
		// 主线程共享的数据，就是 1KB 的共享内存
		const sharedBuffer = ev.data
		// 在共享内存上建立视图，方便读写
		const sharedArray = new Int32Array(sharedBuffer)
		// ...
	}
	*/

	// 线程间的同步互斥机制可以通过Atomics对象实现
	// Atomics对象的各个方法保证了操作的原子性
	// Atomics.load(sharedArray, index)
	// Atomics.store(sharedArray, index, value)
	// Atomics.add(sharedArray, index, value)
	// Atomics.sub(sharedArray, index, value)
	// Atomics.and(sharedArray, index, value)
	// Atomics.or(sharedArray, index, value)
	// Atomics.xor(sharedArray, index, value)

	// 为实现线程间的同步，提供了 Atomics.wait() Atomics.wake() 方法
	// Atomics.wait(sharedArray, index, value, time)
	// 当满足条件 sharedArray[index] === value 时，在该函数进入休眠
	// 并将线程保存到 index 对应的等待队列
	// time 是可选参数，表示 time 时间后自动唤醒。time 默认为 Infinity，表示无限等待，只能被 wake 唤醒
	// wait() 返回值为字符串
		// 如果未满足条件从而没有进入休眠，直接返回 not-equal
		// 如果被 wake 唤醒，返回 ok
		// 如果 time 时间到了自动唤醒，返回 timed-out


	// Atomics.wake(sharedArray, index, count)
	// 唤醒等待在 sharedArray[index] 队列上的 count 个线程
	// count 默认为 Infinity，表示唤醒所有线程


}



/*
███    ███  ██████  ██████  ██    ██ ██      ███████
████  ████ ██    ██ ██   ██ ██    ██ ██      ██
██ ████ ██ ██    ██ ██   ██ ██    ██ ██      █████
██  ██  ██ ██    ██ ██   ██ ██    ██ ██      ██
██      ██  ██████  ██████   ██████  ███████ ███████
*/
// ES6模块
// 见export_import.mjs
{
	// 浏览器对ES6模块的加载

	// 默认情况下浏览器中加载js脚本，遇到<script>标签就会停止渲染，转而下载执行js脚本
	// js脚本下载完就执行，执行完毕才会继续渲染页面，可能会导致页面加载时间过长
	// 可以添加 defer async 属性加以控制
	// defer属性: 等到DOM结构完全生成，以及其他脚本执行完成，才会执行
	// <script src='path/to/myModule.js' defer></script>
	// async属性: 脚本下载完后当页面继续进行解析，脚本将异步执行
	// <script src='path/to/myModule.js' async></script>

	// 浏览器中加载ES6模块，type属性要设置为module
	// 对于type为module的标签默认打开defer 异步加载
	// <script type='module' src='./module_export.js'>

	// 浏览器还不支持ES6模块，可以用babel进行转码到ES5
	// 或者用es6-module-transpiler转为CommonJS的书写方法
	// 或者使用SystemJS垫片库


	// Node对ES6模块的加载

	// 因为Node有自己的CommonJS模块格式，与ES6模块不兼容
	// ES6模块(export/import 后缀.mjs)与CommonJS(module.exports/require 后缀.js)模块的区别
	// 1.CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
	// CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值
	// ES6 模块import会生成一个只读引用，等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值
	// 2.CommonJS 模块是运行时加载，ES6模块是编译时输出接口

	// 目前，Node 的import命令只支持加载本地模块（file:协议），不支持加载远程模块。加载顺序如下
	// 1.如果模块名不含路径，那么import命令会去node_modules目录寻找这个模块
	// 2.如果模块名包含路径，那么import命令会按照路径去寻找这个名字的脚本文件
	// 3.如果脚本文件省略了后缀名，比如import './foo'，Node 会依次尝试四个后缀名：
	// ./foo.mjs、./foo.js、./foo.json、./foo.node。
	// 4.如果这些脚本文件都不存在，Node 就会去加载./foo/package.json的main字段指定的脚本。
	// 5.如果./foo/package.json不存在或者没有main字段，那么就会依次加载
	// ./foo/index.mjs、./foo/index.js、./foo/index.json、./foo/index.node

	// ES6模块引入CommonJS模块时，直接使用default的格式
	// import defaultObj from './commonjs.js'
	// CommonJS引入ES6模块，使用import()函数
	// const es_namespace = await import('./es6.mjs')




	// CommonJS模块的加载
	// require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象
	/*
	{
		// 模块名
		id: '...',
		// 模块输出的各个接口
		exports: { '...' },
		// 该模块脚本是否执行完毕
		loaded: true,
		// ...
	}
	*/
	// 以后用到该模块时就直接到exports属性中取缓存值，这也就是为什么CommonJS输出后不会反映实时情况

	// CommonJS循环加载的情况：a.js执行一半，中间require('b.js')；b.js执行一半又require('a.js')
	// CommonJS模块是执行到require语句才跳到脚本进行加载的，因此过程如下
	// 假设a.js先执行，a执行到一半，去require('b.js')，这时候跳到b执行
	// b.js执行到一半发现需要加载a，就去内存中找a的缓存
	// 因为此时a只执行了一半，所以exports属性中只有前一半的输出，后面代码的输出是没有的
	// b取到a的缓存后继续执行，直到b执行完，再把执行权交还给a

	// ES6模块的循环加载: a中import from 'b.mjs' b中import from 'a.mjs'
	// ES6模块是引用，加载的变量没有缓存，需要开发者自己保证真正取值的时候能取到值
	// 先执行a，发现需要import from b，于是转去执行b
	// 执行b的时候发现又要import foo from a，发生循环加载，
	// 这时引擎会默认foo接口已经存在了(开发者自己保证，多利用变量/函数提升在import之前)
	// 继续b往下执行，下面用到foo时如果发现没定义就会报错，否则执行完返回a继续执行
	// http://es6.ruanyifeng.com/#docs/module-loader#Node-%E5%8A%A0%E8%BD%BD
}


/*
███████ ███████ ██      ██ ███    ██ ████████
██      ██      ██      ██ ████   ██    ██
█████   ███████ ██      ██ ██ ██  ██    ██
██           ██ ██      ██ ██  ██ ██    ██
███████ ███████ ███████ ██ ██   ████    ██
*/
// 编程风格
{
	// let取代var

	// let和const之间，优先选用const，尤其是在全局环境
	// const提醒这是不能改变的值
	// const符合函数式编程思想，运算不改变值，只是新建值
	// 编译器会对const进行优化

	// 静态字符串一律使用单引号'foo'或反引号`foo`
	// 动态字符串使用反引号`${foo}`

	// 使用数组成员对变量赋值时优先使用解构赋值
	// const arr = [1, 2, 3]
	// const [a, b] = arr
	// 函数参数如果是对象成员，优先使用解构赋值
	// function best({first, second}) {}
	// 如果函数返回多个值，优先使用对象返回，对象解构赋值接收；不推荐数组，便于以后更改顺序等
	// function processInput(input) {
	//     return {first, second, third}
	// }
	// const {third, second} = processInput(input)

	// 单行定义的对象，最后不以逗号结尾；多行定义的对象，最后以逗号结尾
	// 对象尽量静态化，避免动态添加属性，非要添加，使用Object.assign(target, source)
	// 定义时尽量使用简洁表达法（直接使用变量，不带冒号）

	// 使用...运算符拷贝数组(浅拷贝，成员是引用)
	// 使用Array.from()将类数组转换为数组

	// 需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了this。
	// 箭头函数取代Function.prototype.bind()，不应再用 self/_this/that 绑定 this
	// 简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数复杂，还是应该采用传统的函数写法
	// 函数的配置项参数应该集中放在一个对象里，作为最后一个参数；布尔值不可以直接作为参数
	// function divide(a, b, { option = false } = {}) { }
	// 使用...args代替arguments，因为...显示表明想获取参数且提供数组，而arguments是类数组的对象

	// 总是使用class取代需要prototype的操作
	// 使用extends进行继承

	// Module语法是js的标准语法，使用import/export代替require/module.exports
	// 如果模块只有一个输出值，使用export default propName
	// 有多个输出值，使用 export declaration
	// export default 不要与 export 同时使用
	// 如果默认输出一个函数，首字母小写；默认输出一个对象，首字母大写
}



/*
 ██████   ██████
██       ██
██   ███ ██
██    ██ ██
 ██████   ██████
*/
// garbage collector 内存回收
{
	// 哪些内存存在泄漏的风险
  // 1.全局作用域下的变量
  // 2.console.log()的对象不会被回收，在生产环境中不要保留console.log()

  // 3.closure闭包
  // 闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。
  // 如果以后不再使用，会造成内存泄漏
  function f() {
		let str = Array(10).join('#')
		// 未使用，会被回收
  	let foo = {
  		name: 'foo'
  	}
    // 内部函数，没有使用，但是在这个函数中使用了闭包中的 str
  	function unused() {
  		let message = 'it is only a test message'
  		str = 'unused: ' + str
  	}
  	function getData() {
  		return 'data'
  	}
  	return getData
  }
  // bar 是对 getData() 的引用，形成了闭包
  let bar = f()
  // 形成闭包后，作用域中会保留 内部函数引用过的变量 和 内部函数引用过的内部函数
	// 虽然 unused() 没有被外部引用，并且 getData() 没有使用 str 变量，
	// 因此在以上闭包中， str 会被保留， foo 和 unused() 不会保留
  // 如果注释掉 str = 'unused: ' + str 则 str 就不会被保留了

  // 4.DOM元素
  // 当一个DOM多次用到，我们一般用一个变量引用 let e = querySelector('#id')
  // 只调用 removeChild(e) 只会将 e 为根的 DOM 子树从 DOM 中删除，
  // 但是由于存在 e 的引用，内存不会被回收。remove后再添加一局 e = null 解决该问题

  // 另一种情况
  /*
    // refA 为 refB 的父节点
    var refA = document.querySelector('#refA')
    var refB = document.querySelector('#refB')
    // 按照以上方法移除 refA
    document.body.removeChild(refA)
		refA = null
		// 以上操作仍然不能讲 refA 从内存中删除
    // 还存在变量 refB 对 #refA 的间接引用(refB.parent)。
    // 将变量 refB 对 #refB 的引用释放，#refA 就可以被GC回收。
    refB = null
  */

	// 5.setInterval() 注意 clearInterval()
	// 链式调用的 setTimeout() 注意终止逻辑

  // 6.addEventListener()
  // 如果添加监听器的回调是匿名函数，那多次调用addEventListener则会添加多个事件处理回调，事件触发时会执行多个回调
  // 如果回调是命名函数，那多次调用addEventListener只会添加一个事件处理回调，事件触发时只会执行一个回调
  // 因此如果addEventListener会被重复执行多次，回调函数需要使用命名函数
  // 另外，回收DOM一般会自动回收EventListener

}

