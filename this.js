/*
████████ ██   ██ ██ ███████
   ██    ██   ██ ██ ██
   ██    ███████ ██ ███████
   ██    ██   ██ ██      ██
   ██    ██   ██ ██ ███████
*/

// 每个函数都有自己的 excution context，和 variable object。
// 这些环境用于储存上下文中的变量，函数声明，参数等。
// 只有函数才能制造作用域。for if else Object不能创造作用域。
// this 既不指向函数自身也不指向函数的词法作用域
// this 代表的是当前行为执行的主体
// this 实际上是在函数被调用时才能确定，它指向什么完全取决于函数在哪里被调用


// 函数有四种调用方式
// 1.方法调用模式：obj.method()
// 2.函数调用模式：不是对象的方法，而直接调用
// 3.apply/call调用模式：其他三种都是语法糖，这才是最初的调用方式

// 1.方法调用模式，通过object.method()调用，this绑定到method前面的对象
var obj = {
	num: 0,
	// 对象属性赋值立即执行，this在执行时确定，此时this为全局window
	num2: this.num,		// undefined
	print1: function() {
		// 普通函数有this，但在调用时才能确定this的指向
		console.log('print1: ' + this.num)
	},
	arrowFunc: () => {
		// 箭头函数没有 this ，他会和定义时外层第一个 this 绑定。
		// 注意，只是绑定，但仍然不确认 this 到底是什么
		// 因为 obj 形不成作用域，没有this，所以绑定的是全局
		console.log('arrowFunc: ' + this.num)
	},
	print2: function() {
		// 返回一个箭头函数，该箭头函数的 this 与 print2 的 this 绑定
		// 而 print2 的 this 需要等调用时才能确定
		return () => {
			console.log('print2: ' + this.num)
		}
	}
}

// 调用时确定普通函数内的 this 为 obj
obj.print1()  // print1: 0
// 箭头函数没有 this，他内部的 this 与外层的 this 绑定，此时外层就是全局作用于，没有 num 所以为 undefined
obj.arrowFunc.call(obj)   // arrowFunc: undefined
// 执行 print2 返回一个箭头函数，该箭头函数的 this 与外层 print2 的 this 绑定
// 执行 obj.print2() 时的 this 为 obj，因此返回的箭头函数 this 指向 obj
let myPrint2 = obj.print2()
myPrint2() // print2: 0

function fn () {
	console.log('this', this)
}
var arr = [fn, obj.print1]
arr[0]() // 这里面的 this 是 arr
arr[1]() // 这里的 this 还是 arr, 输出 print1, this.num: undefined

// obj.child.method(arg)  this 绑定到 obj.child


// 2.函数调用模式下(直接函数名调用)，this绑定到全局对象window
var pt1 = obj.print1
// this 默认指向 window
pt1() // print1: undefined

var af = obj.arrowFunc
// 虽然此处使用 call 指定 this，但是箭头函数的 this 指向定义时的外部 this，也就是window，跟执行时无关
af.call({ num: 4 })  // arrowFunc: undefined

var pt2 = obj.print2
// print2 内部的箭头函数的 this 在定义时与 print2 的 this 绑定
// 此时 print2 的 this 为 { num: 4 }，所以箭头函数的 this 也是他
pt2.call({ num: 4 })  // print2: 4


// 3.call/apply调用模式，第一个参数指定this的值
// call 后面的带多个传入参数
// apply 第二个参数是传入的参数数组
// call 和 apply 如果第一个参数指向 null 或 undefined 时，那么 this 会指向全局对象 global windows
// 可以借助apply或call来把一个方法“借”给别的对象使用
var printPair = function(val) {
	console.log(`${this.key}: ${val}`);
};
printPair.apply({ key: 'age' }, [6]);	// age: 6

// bind(oThis, arg1,arg2...) 方法也可以改变 this 的指向，但是他只进行绑定，不立即执行函数
// 执行 bind 后，会使后面call apply失效



// 给元素的某一个事件绑定方法，当事件触发执行对应的方法，匿名函数中的this是当前的元素
// oDiv.onclick=function(){
// 	// this->oDiv
// };

// oDiv.addEventListener("click",function(){
// 	// this->oDiv
// },false);

// 如果使用箭头函数，则是外层作用域的this，一般是window。
// 不太符合使用习惯，所以尽量不要用箭头函数定义事件监听器
// oDiv.addEventListener('click', e => {
// 	// this->window
// })



// 在构造函数模式中 this 是当前类的一个实例
