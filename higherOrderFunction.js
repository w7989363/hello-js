// 高阶函数
// 1.函数作为参数传递
// 2.函数作为返回值

// 1.函数作为参数传递，可以达到策略与机制分离的效果
// 例如sort函数，排序的过程是不变的，只是按照什么策略排序（升序、降序）可以以函数作为参数传入
[1, 5, 30, 6, 4].sort((a, b) => a > b)

// 例如设置回调函数，可以处理异步请求或者实现策略分离
var appendDiv = function (callback) {
	for (var i = 0; i < 10; i++) {
		var div = document.createElement('div')
		div.innerHTML = i
		document.body.appendChild(div)
		// 如果传入参数是function，则对div执行function
		if (typeof callback === 'function') {
			callback(div);
		}
	}
}
// 比如可以添加div并使其隐藏（当这个策略改变时可以随时改变回调函数，比如改变颜色等）
// appendDiv(function(div){
// 	div.style.display = 'none';
// });

// 2.作为返回值
// 判断类型主函数
var isType = function(type) {
	return function(obj) {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === type.toLowerCase()
	}
}
// 构造一个判断string的函数
var isString = isType('string')
console.log(isString('123'))  // true


// 利用高阶函数实现AOP
// 构造一个前置函数
Function.prototype.before = function(beforefn) {
	// 保存调用before的函数对象（主函数），本例中是 mylog
	var that = this
	// 返回一个包装函数，函数内先执行beforefn，然后执行调用before的主函数
	return function() {
		// 先执行beforefn
		beforefn.apply(this, arguments)
		// 执行主函数，可能有返回值，因此用一个return返回调用结果
		return that.apply(this, arguments)
	}
}
// 构造一个后置函数
Function.prototype.after = function(afterfn) {
	// 保存调用after的函数对象，本例中是before返回的包装函数
	var that = this
	// 返回一个包装函数，先执行调用after的函数(本例中为before返回的包装函数)，然后执行afterfn，最后返回返回值
	return function() {
		// 执行调用after的函数
		var ret = that.apply(this, arguments)
		// 执行afterfn
		afterfn.apply(this, arguments)
		return ret
	}
}
// 创建主函数
var mylog = function(str) {
	console.log(str)
};
// 对 mylog 进行包装
mylog = mylog.before(function() {
	console.log('[LOG] ' + Date().toString())
}).after(function() {
	console.log('[/LOG]')
});
// 测试
mylog('hello')
/*
[LOG] Sun Oct 28 2018 15:47:40 GMT+0800 (China Standard Time)
hello
[/LOG]
*/


// 函数柯里化
// 柯里化后的函数，传入参数的时候只是保存参数值，参数足够或不传入参数的时候才执行

// curry1() 是把传入的函数 fn 按照其形参个数进行柯里化，直到传入最后一个参数才调用原函数
let curry1 = function (fn) {
	// 保存参数
	let _args = []
  let curriedFn = function (...args) {
    _args.push(...args)
    if (_args.length >= fn.length) {
			// 参数足够则调用
      return fn.apply(this, _args)
    } else {
      return curriedFn
    }
  }
  return curriedFn
}
// curry2() 直到传入参数为空才调用原函数
let curry2 = function(fn) {
	// 保存参数
	let _args = []
	let curriedFn = function(...args) {
		// 保存参数，可能不止一个
		_args.push(...args)
		// Array.prototype.push.apply(_args, args)
		if (args.length === 0) {
			// 不传参数则调用
			return fn.apply(this, _args)
		} else {
			return curriedFn
		}
	}
	return curriedFn
}

let add = curry2(function(...args) {
	return args.reduce((pre, cur) => pre + cur, 0)
})
add(1)(2,3)(4,5,6)() // 21


// 使用lodash.curry
// let curry1 = require('lodash.curry')
// 策略性地把要操作的数据（String， Array）放到最后一个参数里。
// 传入前面的参数会返回函数，直到传入最后一个参数(一般是需要处理的数据)才会执行回调函数
let match = curry1(function(what, str) {
  return str.match(what)
})
let hasSpaces = match(/\s+/g)
hasSpaces('hello world')		// [ ' ' ]
// 体现了函数式编程的思想



// 防抖
// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
// fn为要执行的回调，wait为触发等待时间
function debounce(fn, wait) {
	// 使用闭包定义内部的 timer
	let timer = null
	return function(...args) {
		// 设置了定时器，说明在wait时间内又触发了一次事件，因此清除定时器，重新设定
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		// wait毫秒后执行fn
		timer = setTimeout(() => fn.apply(this, args), wait)
	}
}

let fn1 = function() {
	console.log('回调函数1')
};

// 设置抖动间隔1000毫秒，如果1秒内重复调用会一直重置定时器，不会执行fn1
var debouncedFn1 = debounce(fn1, 1000)

// 防抖应用：
// DOM 元素的拖拽功能实现（mousemove）
// 射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）
// 计算鼠标移动的距离（mousemove）
// Canvas 模拟画板功能（mousemove）
// 搜索联想（keyup）
// 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部


// 节流
// 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行
// 如果在同一个单位时间内某事件被触发多次，只有一次能生效。
function throttle(fn, gapTime) {
	let _lastTime = null
	return function(...args) {
		let _nowTime = new Date().getTime();
		// 如果没有执行过，或者现在时间到上次时间间隔大于gap，则执行fn
		if (!_lastTime || _nowTime - _lastTime > gapTime) {
			fn.apply(this, args)
			_lastTime = _nowTime
		}
	};
}

let fn2 = function() {
	console.log('回调函数2')
};

let throttledFn2 = throttle(fn2, 1000)

// 设置节流时间1000毫秒，事件每200触发一次，但是最终每一秒只执行一次
setInterval(throttledFn2, 300)

// 节流应用
// 每次 resize/scroll 触发统计事件
// 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证，验证一次就好）
