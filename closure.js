/*
 ██████ ██       ██████  ███████ ██    ██ ██████  ███████
██      ██      ██    ██ ██      ██    ██ ██   ██ ██
██      ██      ██    ██ ███████ ██    ██ ██████  █████
██      ██      ██    ██      ██ ██    ██ ██   ██ ██
 ██████ ███████  ██████  ███████  ██████  ██   ██ ███████
*/
// 函数是 JavaScript 中唯一拥有自身作用域的结构，因此闭包的创建依赖于函数
// 闭包由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量。
// 这意味着当前作用域总是能够访问外部作用域中的变量
// ps: ES6 新增 let const 从而引入了块级作用域的概念，只有 let 和 const 才会形成块级作用域

// add变量可以作为一个函数使用。非常棒的部分是它可以访问函数上一层作用域的计数器。
// 这个叫作 JavaScript 闭包。它使得函数拥有私有变量变成可能。
// 计数器受匿名函数的作用域保护，只能通过 add 方法修改。

let add = (function() {
	// 局部变量
	let counter = 0;
	// 返回一个函数，该函数内可以访问局部变量
	// 即便上一层函数已经执行完毕也会保留执行环境
	return function() {
		counter += 1;
		console.log(counter);
	}
})();
add(); // 1
add(); // 2
add(); // 3
// 只要 add 不指向 null ，add 的执行环境就会一直存在于内存

// 闭包可以对变量进行封装，避免变量重名带来的冲突
// 例如有一个变量cache，只有在一个特定函数内部访问，那就可以利用闭包将其作用域限制在函数内
// 匿名自调用函数，里面定义需要封装的变量，然后返回函数的主体
// mult最终为一个连乘函数
let mult = (function() {
	// cache为函数内部变量，用作缓存
	// 键为数字拼成的字符串，值为结果
	let cache = {};
	// 返回一个连乘函数
	return function(...args) {
		var key = args.join(',');
		if (cache[key]) {
			return cache[key];
		} else {
			var res = 1;
			for (var i = 0, len = args.length; i < len; i++) {
				res = res * args[i];
			}
			cache[key] = res;
			return res;
		}
	};
})();
mult(1, 2, 3, 4)  // 24
// 再次调用就会直接在cache中查找到，不用重新计算
mult(1, 2, 3, 4)  // 24


// for 中的 var 定义的变量属于全局作用域，匿名函数保持对外部变量 i 的引用
// 当 console.log 被调用的时候 for 循环已经结束， i 的值被修改成了 10
// 输出10个10
for(var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 200);
}

// 利用函数形成作用域，保留传入的值。 输出0~9
for(var i = 0; i < 10; i++) {
	((e) => {
		setTimeout(function() {
			console.log(e);
		}, 400);
	})(i)
}

// 利用 let 形成块级作用域，输出0~9
for(let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 600);
}
