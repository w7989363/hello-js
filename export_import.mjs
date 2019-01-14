// module_export
// ES6模块设计尽量静态化，在编译阶段执行
// 模块中顶层this为undefined，无意义

let firstName = "wen"
let lastName = "dabei"

function sayName() {
	console.log(`I'm ${firstName} ${lastName}`)
}

export {
	firstName,
	lastName,
	sayName,
	// 可以使用as更换名字
	// sayName as myName,
}

// import时需要知道模块输出的变量名是什么，很不方便
// 用户未必愿意阅读文档去了解模块有哪些属性和方法。
// 用export default命令，为模块指定一个默认输出对象。
// 一个模块只能有一个默认输出，因此export default命令只能使用一次
// import命令后面不用加大括号，因为只可能唯一对应export default命令
export default {
	firstName,
	lastName,
	sayName,
}



// import
// import命令具有提升效果，会提升到整个模块的头部，首先执行
// 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
// import是静态执行，所以不能使用表达式和变量，if语句等运行时才能得到结果的语法结构
import {
	firstName,
	lastName,
	sayName as myName
} from "./module_export"

// 可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面
import * as myModule from "./module_export"

myName() // I'm wen dabei
// 模块输出的是sayName
myModule.sayName() // I'm wen dabei

// import进来的变量都是只读的，不要随意更改


// 引入模块的默认输出，import后面不用加大括号
import defaultObj from "./module_export"
defaultObj.sayName() // I'm wen dabei
defaultObj.lastName // dabei


// 因为import命令是编译阶段执行的，所以无法动态加载
// 提案加入import()函数，类似于Node的require方法
// 前者是异步加载，require是同步加载
// import()返回一个promise对象
// 可以按需加载，条件加载，动态的模块路径
// import()加载成功后，模块会作为一个对象，当做then的参数传入

// let path = "./module_export"
// import(path).then(({firstName, lastName}) => {
//     // ...
//     console.log(`${firstName} ${lastName}`)
// })
