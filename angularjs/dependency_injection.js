/*

  如果需要一个对象，应该如何处理？自己建一个？从全局注册表里获取？

  依赖注入：系统给你创建好你要求的特定对象，传递给函数

  在前面的例子里，进行数据绑定的$scope对象会自动传递给我们；我们并不需要调用任何函数去创建这个对象
  。只要把$scope对象放在controller的构造函数中，就可以获取它了

  当然,$scope并不是唯一可以获取的东西，如果想把数据绑定到浏览器中的URL地址，可以使用$location对象
  只要把$location对象放到我们的构造函数中即可

  这种效果是通过Angular的依赖注入机制实现的。


  通过JavaScript实现依赖注入的原理，很简单
  核心技术就是Function对象的toString(),它的返回值是函数的源码
  获取了函数源码，然后对函数的声明进行解析，使用正则表达式匹配的方式拿到这个函数的参数列表

*/

var giveMe = function(config) {};
// 已经注册的一些服务，如$scope
var registry = {};
var inject = function(func, thisForFunc) {
	// 获取源码
	var source = func.toString();
	// 用正则表达式解析源码
	var matcher = source.match(/^[^\(]*\(\s*([^\)]*)\)/m);
	// 解析结果是各个参数的名称
	var objectIds = matcher[1].split(',');
	// 查阅出相应的对象，放到数组中准备作为参数传过去
	var objects = [];
	for (var i = 0; i < objectIds.length; ++i)
		objects.push(registry[objectIds[i]]);
	// 调用这个函数，并且把参数传过去
	func.apply(thisForFunc || func, objects)
};

inject(giveMe);
