// 1.策略模式

// 完成一件工作，可以采取不同的方式、策略，把这些策略封装起来，使用时可以相互替换
// 比如一个压缩文件的程序，既可以选择zip算法,也可以选择gzip算法，这些算法灵活多样，而且可以随意互相替换

// 一个基于策略模式的程序至少由两部分组成
// 第一部分是一组策略类，策略类封装了具体的算法并复杂具体的计算过程。
// 第二部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类

// 以下例子根据绩效等级计算年终奖金
// 策略，可配置部分
var levels = {
	'A': function(salary) {
		return salary * 4
	},
	'B': function(salary) {
		return salary * 3
	},
	'C': function(salary) {
		return salary * 2
	}
}
// 环境，使用方式，基本不变
var calcBonus = function(level, salary) {
	return levels[level](salary)
}



// 2.代理模式：保护代理、虚拟代理

// 代理模式就是为一个对象提供一个代用品或占位符，以便控制它的访问
// 代理的模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，
// 客户实际上访问的是替身对象。替身对象对请求做出一些处理之后再把请求转交给本体对象

// 小明通过代理B、C送花给A
var Flower = function() {}
var xiaoming = {
	sendFlower: function(target) {
		var flower = new Flower()
		target.receiveFlower(flower)
	}
}
// 代理B，当A心情好时才送花，或者送花的人不符合A的要求就不会送花
// B可以帮助A过滤掉一些请求，称为保护代理
var B = {
	receiveFlower: function(flower) {
		A.listenGoodMood(function() {
			A.receiveFlower(flower)
		})
	}
}
// 代理C，会帮忙买花送给A
// 如果new Flower()的代价很大，那等到送的时候才new
// 把一些开销很大的对象，延迟到真正需要它的时候才去创建，称为虚拟代理
var C = {
	receiveFlower: function() {
		A.listenGoodMood(function() {
			var flower = new Flower()
			A.receiveFlower(flower)
		})
	}
}
// 实际对象A
var A = {
	receiveFlower: function(flower) {
		console.log('收到花' + flower)
	},
	listenGoodMood: function(callback) {
		setTimeout(callback(), 10000)
	}
}



// 3.发布-订阅模式（观察者模式）
// 它定义对象间的一种一对多的依赖关系
// 当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
// 在javascript中，我们一般用事件模型来代替传统的发布-订阅模式

// 例如买房者信息登记到销售处，有楼房可以买的时候销售处就通知各个买房者

// 售楼处
var salesOffices = {
	// 监听的事件list
	clientList: {},
	// 添加一个监听事件(例如买80平的房子和100平的房子)
	listen: function(key, fn) {
		// key 监听的对象
		// fn 事件发生时的处理函数
		if (!this.clientList[key]) {
			// 处理函数可以有多个，用数组存储
			this.clientList[key] = []
		}
		// 处理函数推入响应事件的处理函数数组
		this.clientList[key].push(fn)
	},
	// 触发器，触发某个事件时调用
	trigger: function(key, ...args) {
		// arguments第一个参数为key，后面的为处理函数接受的参数
		// 处理函数
		var fns = this.clientList[key]
		// 没有处理函数
		if (!fns || fns.length === 0) {
			return false
		}
		// 调用处理函数
		fns.forEach(fn => fn.apply(this, args))
	},
	// 移除一个监听事件
	remove: function(key, fn) {
		var fns = this.clientList[key]
		// 没有注册的监听事件直接返回
		if (!fns || fns.length === 0) {
			return false
		}
		// 有fn参数，只删除对应的处理函数；fn为空，删除整个key对应的监听事件
		this.clientList[key] = fn ? fns.filter(_fn => _fn !== fn) : undefined
	}
}
