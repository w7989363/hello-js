/*
███    ██ ███████ ██     ██
████   ██ ██      ██     ██
██ ██  ██ █████   ██  █  ██
██  ██ ██ ██      ██ ███ ██
██   ████ ███████  ███ ███
*/

function Student(name, age) {
	// 构造函数中的 this 指向 new 出来的实例对象
	this.name = name // this === s
	this.age = age // this === s
}
Student.prototype = {
	// 使用new时，默认会在prototype中添加constructor来指向构造函数
	// 我们这里重新给prototype赋值一个新的对象，原有的constructor就没了，所以可以手动赋值
	// 如果不想覆盖掉prototype中原有的东西，就要使用Student.prototype.study = function() {} 这种形式赋值
	// 或者使用 Object.assign(Student.prototype, {}) 向原型对象添加成员
	constructor: Student,
	type: 'student',
	study: function() {
		console.log('studing')
	}
}
let s = new Student('wtl', 22)
// new 是一个语法糖，内部实现如下
// 1.创建一个空对象，作为返回的对象实例
// var tempObj = {}
// 2.__proto__指向构造函数的prototype
// tempObj.__proto__ = Student.prototype
// 3.执行构造函数
// constructor.apply(tempObj, arguments)
// 4.返回对象实例
// return tempObj


/*
██████  ██████   ██████  ████████  ██████  ████████ ██    ██ ██████  ███████
██   ██ ██   ██ ██    ██    ██    ██    ██    ██     ██  ██  ██   ██ ██
██████  ██████  ██    ██    ██    ██    ██    ██      ████   ██████  █████
██      ██   ██ ██    ██    ██    ██    ██    ██       ██    ██      ██
██      ██   ██  ██████     ██     ██████     ██       ██    ██      ███████
*/
// 万物皆对象，对象都有__proto__，指向构造该对象的构造函数的prototype，用来构成原型链
// 构造函数，函数是特殊的对象，额外拥有prototype原型对象
// prototype 用于实现基于原型的继承与属性共享，规定了所有实例共享的属性和方法
function Person(name = 'wuming', age = 18) {
	// 函数中的 this 指向 new 出来的实例对象
	this.name = name
	this.age = age
}
// 使用以下方法向prototype中添加属性和函数，不会破坏原型对象中的constructor
Person.prototype.gender = 'DK'
Person.prototype.race = 'DK'
Person.prototype.sayName = function() {
	console.log(`I'm ${this.name}`)
}

// 利用构造函数新建实例对象
let tom = new Person('tom')

// prototype与__proto__:
// 生产环境中不推荐用__proto__ 推荐使用Object.getPrototypeOf(obj)

const obj = {}
// obj直接由Object构造来，所以
obj.__proto__ === Object.prototype

// Object跟Person一样，都是构造函数，因此__proto__指向Function.prototype
Person.__proto__ === Function.prototype
Object.__proto__ === Function.prototype
Function.__proto__ === Function.prototype
// 函数的原型对象就是一个普通对象，因此其__proto__指向Object.prototype 这是原型链的最顶端
Function.prototype.__proto__ === Object.prototype
// tom由Person构造来，因此其__proto__指向Person的原型对象
tom.__proto__ === Person.prototype
// 原型对象有一个constructor属性，指回构造方法
Person.prototype.constructor === Person
// 可以参照proto.jpg理解


// 原型链在更新值时是不起作用的，只有在检索值的时候才会起作用
// 尝试获取某个对象(tom)的属性时，如果该对象自身没有该属性，则会顺着原型链(tom.__proro__)查找其构造函数的原型对象(Person.prototype)中的属性
// 如果构造函数的原型对象也没有该属性，则继续顺着原型链找(Person.prototype.__proto__)，直到终点Object.prototype
// 如果完全不存在于原型链中，则返回undefined
Person.prototype.wen = '111'
Object.prototype.wen = '222'
console.log(tom.wen) // '111'
// tom本身没有this.wen，所以查找tom.__proto__即Person.prototype，找到了111
// 如果还没有，则继续查找tom.__proto__.__proto__即Person.prototype.__proto__即Object.prototype

// 在tom中定义gender，属于实例属性，不影响原型链上的
tom.gender = '男'
// 再查找gender时，直接在自身就找到了，不用访问原型链
// 因此实例对象的gender为男
// 原型对象中的gender仍然是DK
tom.__proto__.gender // DK


// 直接输出，不包括原型链中的内容
console.log(tom) // Person { name: 'tom', age: 18, gender: '男' }
// typeof可以用来检查属性是否存在
typeof tom.xxx === 'undefined' // true
// obj.hasOwnProperty(keyName) 检查当前对象是否有成员 keyName，不会检查原型链
tom.hasOwnProperty('gender') // true 因为前面通过tom.gender定义了
tom.hasOwnProperty('race') // false

// for in 遍历对象，in操作符会查找原型链
for (let k in tom) {
	console.log(`${k}: ${tom[k]}`)
	/*
	name: tom
	age: 18
	gender: 男
	race: DK
	sayName: function() {
	  console.log(`I'm ${this.name}`)
	}
	wen: 111
	*/
}


/*
██ ███    ██ ██   ██ ███████ ██████  ██ ████████
██ ████   ██ ██   ██ ██      ██   ██ ██    ██
██ ██ ██  ██ ███████ █████   ██████  ██    ██
██ ██  ██ ██ ██   ██ ██      ██   ██ ██    ██
██ ██   ████ ██   ██ ███████ ██   ██ ██    ██
*/
// 继承的目的，就是使子类实例拥有父类的实例成员和原型链成员，更进一步还需要继承静态成员(定义在构造函数对象上的成员)
// 其中，父类的实例属性应该是子类的实例属性，所有子类实例不共享
// 父类的原型属性应该是子类之间共享的

// 1.使用 call 改变构造函数的 this 实现继承（只继承了父类的实例属性）
function Parent() {
	this.name = 'parent'
	this.arr = [1, 2, 3]
}
Parent.prototype.sayHello = () => {}
function Child1() {
	Parent.call(this)
	this.type = 'child1'
}
// 只能继承父类实例属性/方法，不能继承原型属性/方法
let child1 = new Child1()  // Child1 { name: 'parent', type: 'child1' }

// 2.子类构造函数 prototype 指向一个父类的实例
// 继承了父类的实例属性和原型属性，但是父类引用类型的实例属性在子类间是共享的
function Child2() {
	this.type = 'child2'
}
// 将子类的原型对象赋值为父类的实例，这样既继承了父类的实例方法又继承了父类的原型方法
Child2.prototype = new Parent()
// 子类实例的 __proto__ 指向构造函数的 prototype，即父类的实例对象，继承了父类的实例属性/方法
// 父类的实例 __proto__ 又指向父类构造函数 prototype，因此也继承了父类的原型属性/方法
let child2 = new Child2()
let child22 = new Child2()
// 这样的缺点是: 父类的实例属性保存在子类的 prototype 中，因此是子类实例之间共享的
// 当修改引用型成员的时候就会影响其他子类实例
// 例如修改 prototype 中的引用类型成员 arr
child22.arr // [ 1, 2, 3 ]
child2.arr.push(4)
child22.arr // [ 1, 2, 3, 4 ]


// 3.组合继承 (组合 1 2 两种方法)
function Child3() {
	// 将父类的实例属性/方法直接放到子类的实例中来，避免了方法2的缺点
	Parent.call(this)
	this.type = 'child3'
}
// 然后再将子类的 prototype 赋值为父类实例，这样虽然原型链中间还有一层，但是这一层的值在子类实例中都有
Child3.prototype = new Parent()
let child3 = new Child3()
// 这样的缺点是: Child3.prototype 中包含父类的实例属性，这些属性是没有必要的
// 因为父类实例属性/方法已经在子类构造函数中继承了


// 4.组合继承优化(1)
function Child4() {
	Parent.call(this)
	this.type = 'child4'
}
// 方法3中我们发现 子类实例的 __proto__ 指向父类实例，但是父类实例的属性/方法我们已经在子类的构造方法中定义了
// 因此这一层 __proto__ 是多余的，所以可以直接将子类实例的 __proto__ 指向父类构造方法的 prototype
// 即 子类构造方法的 prototype 指向父类构造方法的 prototype
Child4.prototype = Parent.prototype
let child4 = new Child4()
// 当然还是有缺陷: 子类构造方法的 prototype 就是父类构造方法的 prototype
// 那子类构造方法的 prototype 中的 constructor 就是 Parent()
// 并且我们不能直接修改 Child4.prototype.constructor，因为会影响到 Parent.prototype.constructor
Child4.prototype.constructor === Child4 // false
Child4.prototype.constructor === Parent // true


// 5.组合继承优化(2)
function Child5() {
	Parent.call(this)
	this.type = 'child5'
}
// 解决子类构造方法的 prototype 和父类构造方法的 prototype 相同的问题
// 用 Object.create() 函数构造一个新的对象，新对象 __proto__ 指向父类构造方法的 prototype
// 并且这个对象中不包含父类的实例属性
Child5.prototype = Object.create(Parent.prototype)
// 然后更改这个新对象的 constructor 属性，指向 Child5
Child5.prototype.constructor = Child5
let child5 = new Child5()
// 这样基本就完成了实例成员和原型链成员的继承
// 但是静态成员始终没得到继承


// 6.ES6 中使用 Class 继承
class Parent6 {
	// 父类构造函数
	constructor(name = 'Parent6') {
		// this 指向实例
		this.name = name
		this.arr = [1, 2, 3]
	}
	// 定义在 class 内的都是原型方法
	sayHello() {
		console.log('hello from parent')
	}
}
// 类名相当于 ES5 的构造函数
typeof Parent6 // function
Parent6.prototype.constructor === Parent6 // true
// 使用 extends 关键字进行继承
class Child6 extends Parent6 {
	constructor(name, age = 20) {
		// ES5实现继承，是先建立子类的this，然后把父类的实例属性/方法添加到该this上
		// ES6则完全不同，ES6必须先调用父类的构造函数来构成 this，然后再对该 this 进行子类的加工
		// 只有调用super之后，才可以使用this关键字
		super(name)
		this.age = age
	}
	sayHi() {
		console.log('hi from child')
	}
}
let child6 = new Child6('Child6')

// extends 内部实现与前5种方法都不同
// 首先 extends 不需要实现构造函数中 Parent.call(this) 这种调用
// 因为 constructor 中调用 super() 的内部实现就是这样的
// 然后考虑原型链的继承
// 由于子类 class 也会在 prototype 中定义属性和方法
// 所以既不能将 Child6.prototype = Parent6.prototype
// 也不能重新构造一个空对象 Child6.prototype = Object.create(Parent6.prototype)
// 于是可以将已有的原型对象的 __proto__ 指向父类的构造函数的 prototype 实现原型链的继承
Child6.prototype.__proto__ === Parent6.prototype		// true
// 由于还是使用的子类自己的 prototype 所以 constructor 的指向是没有问题的
Child6.prototype.constructor === Child6	// true
// 第二步 由于 class 可以定义 static 静态属性/方法，所以还需要实现静态属性/方法的继承
// 静态属性/方法定义在构造函数对象中，不属于原型链，所以直接将子类构造函数对象的 __proto__ 指向父类构造函数对象
Child6.__proto__ === Parent6	// true


// 以上继承方式(除第一种)，使用instanceof运算符判断时，都会认为子类实例对象是父类的实例
// child2~5 instanceof Parent // true
// child6 instanceof Parent6 // true
// left instanceof right 运算符的内部实现：
// 检查left.__proro__ === right.prototype 是则返回true，否则继续
// 继续沿原型链检查 left.__proto__.__proto__ === right.prototype 直到左边为null 返回false

// ps: 由于现代 JavaScript 引擎优化属性访问所带来的特性的关系
// 更改对象的 __proto__ 在各个浏览器和 JavaScript 引擎上都是一个很慢的操作
// 如果关心性能，你应该避免设置一个对象的 __proto__
// 相反你应该使用 Object.create() 来创建带有你想要的 __proto__ 的新对象

/*
██████   ██████  ██   ██    ██ ███    ███  ██████  ██████  ██████  ██   ██ ██  ██████
██   ██ ██    ██ ██    ██  ██  ████  ████ ██    ██ ██   ██ ██   ██ ██   ██ ██ ██
██████  ██    ██ ██     ████   ██ ████ ██ ██    ██ ██████  ██████  ███████ ██ ██
██      ██    ██ ██      ██    ██  ██  ██ ██    ██ ██   ██ ██      ██   ██ ██ ██
██       ██████  ███████ ██    ██      ██  ██████  ██   ██ ██      ██   ██ ██  ██████
*/

// 实现多态:同一个操作作用于不同对象，得到不同的执行方式和结果
// 将“做什么” 和 “谁来做、怎么做” 分开
let shout = function(animal) {
	animal.shout()
}
class Duck {
	shout () {
		console.log('gagaga')
	}
}
class Chicken {
	shout () {
		console.log('jijiji')
	}
}
shout(new Duck()) // gagaga
shout(new Chicken()) // jijiji
