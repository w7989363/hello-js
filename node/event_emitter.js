var events = require('events');
var eventEmitter = new events.EventEmitter();

//监听器1，即回调函数
var listener1 = function listener1(arg1, arg2) {
	console.log('监听器1执行。' + arg1 + arg2);
}
//监听器2
var listener2 = function listener2() {
	console.log('监听器2执行。');
}

// addListener 和 on 方法没有区别
// 绑定connection事件 处理函数为listener1
eventEmitter.addListener('connection', listener1);
// 绑定connection事件 处理函数为listener2
eventEmitter.on('connection', listener2);
// once(event, listener)
// 为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器。
eventEmitter.once('connection', function() {
	console.log("只监听一次");
});

// 某事件的监听器个数 静态函数
var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + "个监听器监听connection事件") // 3

// emit(event, [arg1], [arg2], [...])
// 如果事件有注册监听返回 true，否则返回 false
// 触发 connection 事件，后面跟回调参数
eventEmitter.emit('connection', 'hello', 'world');

// removeListener(event, listener)
// 移除listener1
eventEmitter.removeListener('connection', listener1);
console.log('listener1 不再监听');
// removeAllListeners([event])
// 移除所有事件的所有监听器，如果指定事件，则移除指定事件的所有监听器。

// setMaxListeners(n)
// 一般监听超过10个会输出警告信息，该函数可以提高最大监听个数

// listeners(event)
// 返回指定事件的监听器数组。
var eventListeners = eventEmitter.listeners('connection')
// 只剩listener2一个
console.log(eventListeners.length + "个监听器监听connection事件");

console.log('程序执行完毕');
