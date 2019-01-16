var util = require("util");

//util.inherits(constructor, superConstructor)是一个实现对象间原型继承的函数
function Base() {
	this.name = "base";
	this.base = "2017";
	this.sayHello = function() {
		console.log("hello " + this.name);
	}
}
Base.prototype.showName = function() {
	console.log("my name is " + this.name);
};

function Sub() {
	this.name = "sub";
}

//Sub继承Base的原型
util.inherits(Sub, Base);

var objBase = new Base();
objBase.sayHello();
objBase.showName();
//console.log不会输出原型中定义的属性和方法，只能看到name base sayHello()
console.log(objBase);

var objSub = new Sub();
objSub.showName();
//不继承构造函数内部创造的name base属性和sayHello()方法，以下执行错误
//objSub.sayHello();
//console.log不会输出原型中定义的属性和方法
console.log(objSub);


//util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。
//它至少接受一个参数 object，即要转换的对象。
//showHidden 为 true，将会输出更多隐藏信息。
//depth 表示最大递归的层数,默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。
//color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
console.log(util.inspect(objBase));
console.log(util.inspect(objBase, true, 1, true));

//判定对象类型
util.isArray(new Array);
util.isRegExp(/some regexp/);
util.isDate(new Date());
util.isError(new Error());
