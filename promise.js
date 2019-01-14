// Promise
// 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件(通常是一个异步操作）的结果。
// 从语法上说，Promise是一个对象，从它可以获取异步操作的消息。

// Promise对象是一个构造函数，用来生成Promise实例
var promist = new Promise(function(resolve, reject) {
	if ("asynchronous success") {
		resolve("value")
	} else {
		reject("error")
	}
})
// resolve函数的作用是将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved）
// 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected）
// 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

// Promise 实例生成以后，可以用then 方法分别指定resolved状态和rejected状态的回调函数
promist.then(function(value) {
	"suucess"
}, function(error) {
	"error"
})
// 或者通过then、catch分别制定resolved和rejected
// .finally(() => {}) 成功失败都会进行的回调，一般用于清理工作
promist.then((val) => {
	'success'
}).catch((err) => {
	'err'
}).finally(() => {
	'always executed'
})


// 最简单的例子
var p = new Promise(function(resolve, reject) {
	var timeout = Math.random() * 2
	if (timeout < 1) {
		resolve(timeout)
	} else {
		reject(timeout)
	}
}).then(function(value) {
	console.log("resolved timeout: " + value)
}, function(value) {
	console.log("rejected timeout: " + value)
})


// 利用Promise执行并行任务
// 例如从两个url获取信息，使用Promise.all实现
var p1 = new Promise(function(resolve, reject) {
	// 利用setTimeout模拟网络请求
	setTimeout(resolve, 3000, "p1 result")
})
var p2 = new Promise(function(resolve, reject) {
	setTimeout(resolve, 2000, "p2 result")
})
// 为两个promise指定resolve
Promise.all([p1, p2]).then(function(result) {
	console.log(result)
	// 获得一个Array: ['p1 result', 'p2 result']
})


// 有时候多个异步任务为了容错，第一个执行完就不需要执行后面的
// 例如从两个url获取相同的信息，只要获得先返回的结果就可以
// Promise.race实现
Promise.race([p1, p2]).then(function(result) {
	console.log("race: ", result) // race: p2 result
})


// 实现同步机制的例子
// p4一秒后变为resoved状态，但是resove传入参数为另一个Promise
// 这时其状态就不由p4决定了，又过了两秒p3变为rejected
// 这样触发的是p4的catch而不是then
const p3 = new Promise(function(resolve, reject) {
	setTimeout(() => reject(new Error('fail')), 3000)
})

const p4 = new Promise(function(resolve, reject) {
	setTimeout(() => resolve(p3), 1000)
})
p4.then(result => console.log(`then : ${result}`))
	.catch(error => console.log(`catch : ${error}`))
// catch : Error: fail

// 对Ajax的封装
const getJSON = function(url) {
	const promise = new Promise(function(resolve, reject) {
		const handler = function() {
			if (this.readyState !== 4) {
				return
			}
			if (this.status === 200) {
				resolve(this.response);
			} else {
				reject(new Error(this.statusText))
			}
		}
		const client = new XMLHttpRequest()
		client.open("GET", url)
		client.onreadystatechange = handler
		client.responseType = "json"
		client.setRequestHeader("Accept", "application/json")
		client.send()
	})
	return promise
};
// 第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
getJSON("/posts.json").then(json => {
	return json.post
}).then(post => {
	console.log(post)
})
// 前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），
// 这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
getJSON("/post/1.json").then(post => {
	// 返回一个promise，后面的then会根据此promise的状态进行调用
	return getJSON(post.commentURL)
}).then(comments => {
	console.log("resolved: ", comments)
}).catch(err => {
	console.log("rejected: ", err)
})
