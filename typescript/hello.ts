
/*
d8888b.  .d8b.  .d8888. d888888b  .o88b.      d888888b db    db d8888b. d88888b
88  `8D d8' `8b 88'  YP   `88'   d8P  Y8      `~~88~~' `8b  d8' 88  `8D 88'
88oooY' 88ooo88 `8bo.      88    8P              88     `8bd8'  88oodD' 88ooooo
88~~~b. 88~~~88   `Y8b.    88    8b              88       88    88~~~   88~~~~~
88   8D 88   88 db   8D   .88.   Y8b  d8         88       88    88      88.
Y8888P' YP   YP `8888Y' Y888888P  `Y88P'         YP       YP    88      Y88888P
*/
namespace basicType {
  // 布尔 boolean
  let isDone: boolean = false

  // 数字 number
  let decLiteral: number = 6
  let hexLiteral: number = 0xf00d
  let octalLiteral: number = 0o744
  let binaryLiteral: number = 0b1010

  // 字符串 string
  let name: string = `Gene`

  // 数组 array
  // 元素类型[]
  let list1: number[] = [1, 2, 3]
  // Array<元素类型>
  let list2: Array<number> = [1, 2, 3]
  // ReadonlyArray< T > 只读数组
  let list3: ReadonlyArray<number> = [1, 2, 3]
  // list3[0] = 12 // error!
  // list3.push(5) // error!
  // list3.length = 100 // error!

  // 元组 tuple
  // 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
  // 当访问一个越界的元素，会使用联合类型替代
  let tuple1: [number, string] = [10, 'hello']

  // 枚举 enum
  // 枚举类型可以为一组数值赋予友好的名字，默认从 0 开始编号
  enum Color1 { Red, Green, Blue }  // 0 1 2
  // 也可以指定从某个数字开始编号
  enum Color2 { Red = 2, Green, Blue }  // 2 3 4
  // 也可以全部指定
  enum Color3 { Red = 0, Green = 2, Blue = 5 }  // 0 2 5
  // 由名字获取数值
  let c: Color1 = Color1.Green // 1
  // 知道数值获取名字
  let colorName: string = Color1[1] // Green

  // 不确定类型 any
  // 值来自于动态的内容，我们不希望对这些值进行类型检测，而是直接通过编译阶段
  let notSure: any = 4;
  notSure = 'maybe a string instead'
  notSure = false

  // void 没有任何类型
  // 一般只用于没有返回值的函数
  function warnUser(): void {
    console.log('This is my warning message')
  }
  // 声明一个 void 变量没什么用，只能赋给他 undefined null
  let unusable: void = undefined

  // null 和 undefined
  // 默认情况下 null 和 undefined 是所有类型的子类型
  // 就是说你可以把 null 和 undefined 赋值给任何类型(除了 never 类型)的变量
  // 然而，当你指定了--strictNullChecks标记(鼓励使用)，null 和 undefined 只能赋值给 void 和它们各自
  let u: undefined = undefined
  let n: null = null

  // never
  // never类型表示的是那些永不存在的值的类型
  // never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
  // 变量也可能是 never类型，当它们被永不为真的类型保护所约束时
  // never 是任何类型的子类，可以赋值给任何类型
  // 但是 never 没有任何子类型，所以只有 never 可以赋值给 never
  function error(message: string): never {
    throw new Error(message)
  }
  function infiniteLoop(): never {
    while (true) {}
  }

  // 非原始类型 object
  // 除 number string boolean symbol null undefined 之外的类型
  declare function create(o: object | null): void

  // 断言类型
  // 程序员明确知道某个值的类型，相当于其他语言的类型转换
  let someValue: any = 'this is a string'
  // 尖括号语法
  let strLength1: number = (<string>someValue).length
  // as 语法，当在 ts 中使用 jsx 时，只有 as 语法被允许
  let strLength2: number = (someValue as string).length

}


/*
d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b
  `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'
   88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo
   88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~
  .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.
Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P
*/
namespace interface{
  // 下面描述了一个接口
  // 必须包含 firstName 属性，且为 string 类型
  // 可以包含 middleName 属性，类型为 string
  // 必须包含 lastName 属性，且类型为 string 类型，且该属性只能在对象创建时赋值
  interface Person {
    firstName: string
    // 可选属性
    middleName?: string
    // 只读 只能在对象创建的时候赋值的属性
    readonly lastName: string
  }

  // greeter 接受的参数类型是一个兼容 Person 接口的对象
  function greeter(person: Person) {
    return `hello ${person.firstName} ${person.lastName}`
  }
  // wade 是一个兼容 Person 接口的对象，虽然它包含多余的 age 属性
  const wade = { firstName: 'Dwyane', lastName: 'Wade', age: 18 }
  greeter(wade)
  // 注意，如果直接使用对象字面量传值给 person: Person 时，编译器会做额外属性检查
  // age 为额外属性，会得到一个错误 error: 'age' not expected in type 'Person'
  greeter({ firstName: 'Dwyane', lastName: 'Wade', age: 18 })
  // 绕开这个检查可以使用断言类型
  greeter({ firstName: 'Dwyane', lastName: 'Wade', age: 18 } as Person)
  // 另一种方式是给接口定义 索引签名
  // interface Person {
  //   firstName: string
  //   middleName?: string
  //   readonly lastName: string
  //   // 索引 表明对象会带有任意数量的其它属性
  //   [propName: string]: any
  // }
  // 注意，是否需要绕过这个检查需要视情况而定，一般还是要检查的，因为可能是属性名拼写错误而引进的bug

  // 函数类型
  interface SearchFunc {
    // 指定函数第一个参数和第二个参数都为 string 类型 返回值为 boolean 类型
    (source: string, subString: string): boolean
  }
  // 具体函数实现的参数和返回值可以不指定类型，并且参数名可以任意指定，编译器会自动推断
  let mySearch: SearchFunc = function(src, sub) {
    let result = src.search(sub)
    return result > -1
  }

  // 索引类型
  // 用于描述那些能够“通过索引得到”的类型 例如 aMap['daniel'] aMap.daniel a[10]
  // 中括号里叫 索引签名，它表明了索引的类型，只能是 number 或 string。后面是索引类型的返回值
  // 例如 [index: number]: string 意思是使用 number 类型的索引(例如x[10])返回类型为 string
  // 并且 number 索引类型的返回值类型必须是 string 索引类型返回值类型的子类型
  // 因为内部处理的时候是将 number 类型的索引转为 string 类型的索引来处理的
  interface StringArray {
    [index: number]: string
    [prop: string]: string
    // 以下定义会出错，因为上面规定 string 类型的索引返回值类型为 string
    // age: 18
    // 可以将索引类型设置为只读，以阻止给索引赋值。例如 a.age = '18' 就会出错
    // readonly [prop: string]: string
  }

  // 类接口 class
  interface ClockInterface {
    // 类的接口描述的是类的实例成员，编译器并不会去检查静态成员(即定义在构造函数对象上的)
    currentTime: Date
    setTime (d: Date)
    // 尝试使用构造器签名来限制构造函数会报错
    // new (hour: number, minute: number)
    // 因为构造函数是静态部分，所以接口中不能对类的构造函数进行约束
  }
  // 使用 implements 关键字来强制一个类实现一个接口
  class Clock implements ClockInterface {
    constructor (h: number, m: number) { }
    currentTime: Date
    setTime (d: Date) {
      this.currentTime = d
    }
  }
  // 单独写接口对构造函数进行约束
  interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface
  }
  // 用一个工厂函数代替构造函数
  function createClock(ctor: ClockConstructor, h: number, m: number): ClockInterface {
    return new ctor(h, m)
  }
  let myClock = createClock(Clock, 11, 11)

  // 混合类型
  // 一个对象可以同时作为函数和对象来使用
  interface Counter {
    (start: number): string
    interval: number
    reset(): void
  }
  function getCounter(): Counter {
    // let counter = <Counter>function (start: number) { }
    let counter = <Counter>function (start: number) { return 'ok' }
    counter.interval = 123
    counter.reset = function () { }
    return counter
  }
  let c: Counter = getCounter()
  // c 可以作为函数
  c(10)
  // c 也可以作为对象使用
  c.reset()
  c.interval = 5.0

  // 接口可以继承接口，可以多继承
  interface Shape {
    color: string
  }
  interface PenStroke {
    penWidth: number
  }
  interface Square extends Shape, PenStroke {
    sideLength: number
    // 同时也拥有 color penWidth
  }

  // 接口继承类
  // 当一个接口继承一个类时，他会继承类里成员，但不包括其实现，并且会继承 private protected 成员
  // 当一个接口继承一个拥有 private 或 protected 成员的类时，只能由这个类或其子类来实现这个接口
  class Control {
    // 包含 private 成员 state
    private state: any
  }
  interface SelectableControl extends Control {
    // SelectableControl 接口继承自 Control，并且又定义了一个 select() 方法
    select(): void
  }
  // Button 是 Control 的子类，可以实现 SelectableControl 接口
  // 因为继承自 Control 所以本身有了 state，另外还需要实现 select() 方法
  class Button extends Control implements SelectableControl {
    select() { }
  }
  // 其实 SelectableControl 接口和拥有 select() 方法的 Control 类是一样的

  // 下面是错误的，因为 Image 不是 Control 的子类
  class Image implements SelectableControl {
    // 即使自己再定义一个 private state 也是错误的。error “类型具有私有属性 state 的单独声明”
    private state: any
    select() {}
  }

}


/*
 .o88b. db       .d8b.  .d8888. .d8888.
d8P  Y8 88      d8' `8b 88'  YP 88'  YP
8P      88      88ooo88 `8bo.   `8bo.
8b      88      88~~~88   `Y8b.   `Y8b.
Y8b  d8 88booo. 88   88 db   8D db   8D
 `Y88P' Y88888P YP   YP `8888Y' `8888Y'
*/
namespace myClass {
  // 修饰符 public protected private
  // 成员默认都是 public 公开的
  // private 只能在本类中访问，实例不可访问
  // protected 可以在本类和子类中访问
  // 可以把构造函数定义为 protected，这样的类不能被实例化，因为使用 new 关键字时，在实现中外部调用了构造函数
  // 只能通过子类继承，然后实例化子类

  // TypeScript使用的是结构性类型系统。当我们比较两种不同的类型时，并不在乎它们从何处而来。
  // 如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的
  // 然而，当我们比较带有 private或 protected 成员的类型的时候，他们的声明还需要来自同一个地方
  // Animal 和 Person 定义完全一样，但是含有 private 成员，所以两个类是不兼容的
  class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName }
  }
  class Person {
    private name: string;
    constructor(theName: string) { this.name = theName }
  }
  // Dog 是 Animal 的子类，他们的 private 成员声明都来自 Animal 类，所以他们是兼容的
  class Dog extends Animal {
    constructor() { super('dog') }
    bark() { console.log('wangwangwang') }
  }
  let animal = new Animal('animal')
  let dog = new Dog()
  let person = new Person('person')
  // 不可以把 Animal 给 Dog，因为 Animal 缺少 bark()
  dog = animal
  // 可以把 Dog 赋值给 Animal
  animal = dog
  // 但不可以把 Person 赋值给 Animal，因为两个类型不兼容
  animal = person
  
  // readonly 修饰符
  // 将属性设置为只读的，必须在声明时或构造函数里被初始化
  class Octopus {
    readonly name: string
    readonly numberOfLegs: number = 8
    constructor(theName: string) {
      this.name = theName
    }
  }
  // 可以使用参数属性简化以上写法
  class Octopus1 {
    readonly numberOfLegs: number = 8
    // 直接将构造函数传入的参数给 readonly 实例属性 name
    // 同样可以使用 public private protected 修饰符来直接定义和赋值实例属性
    constructor(readonly name: string) { }
  }

  // 属性存取器 set get
  let passcode = 'secret passcode'
  class Employee {
    // 私有变量 _fullname 作为 fullname 的中转变量
    private _fullname: string
    // 如果一个变量只有 get 没有 set 则认为是 readonly
    get fullname(): string {
      return this._fullname
    }
    // 修改 fullname 属性时先检查 passcode，正确则可以修改
    set fullname(newName: string) {
      if(passcode && passcode === 'secret passcode') {
        this._fullname = newName
      }
      else {
        console.log('Error: Unauthorized update!')
      }
    }
  }
  let employee = new Employee()
  employee.fullname = 'wtl'

  // 静态属性 static
  // 存在于类本身的属性，只能通过 '类名.静态属性名' 来访问
  class Grid {
    // 静态属性 原点
    static origin = { x: 0, y: 0 }
    constructor(public scale: number) { }
    // 计算给定点到原点的距离
    calculateDistanceFromOrigin(point: { x: number; y: number}) {
      // 静态属性 origin 需要加 Grid. 来访问
      return Math.hypot(point.x - Grid.origin.x, point.y - Grid.origin.y) / this.scale
    }
  }

  // 抽象类 抽象方法 abstract
  // 抽象类不能被实例化，只用来作为基类
  abstract class Flower {
    constructor(public name: string) {}
    printName(): void {
      console.log(`Flower name: ${this.name}`)
    }
    // 抽象方法 必须在派生类中实现，抽象方法可以有访问修饰符
    abstract printOdor(): void
  }
  class Rose extends Flower {
    constructor() {
      // 派生类的构造函数中必须先调用 super 以调用父类的构造函数
      super('Rose')
    }
    // 实现抽象方法
    printOdor(): void {
      console.log(`Odor of Rose`)
    }
    // 子类自己的方法
    printHello(): void {
      console.log('hello')
    }
  }
  let rose: Flower
  // rose = new Flower('flower') // Error 无法实例化抽象类
  rose = new Rose() // OK，可以把子类对象赋值给父类型的变量，但类似C++的截断，该变量无法访问子类自己的方法和属性
  rose.printName()
  rose.printOdor()
  // rose.printHello() // Error 类型 Flower 上不存在 printHello
}


/*
d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db
88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88
88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88
88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88
88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888
YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P
*/
namespace myFunction {
  // 为函数指定类型，包括参数类型和返回值类型
  // 匿名函数写法
  // (base: number, increment: number) => number 指定了两个 number 类型的参数，返回值为 number 类型
  // 因为 myAdd 后面有冒号，为了不引起歧义，所以函数的返回值类型前面用箭头符号 =>
  // 等号后面是具体函数实现，根据类型推论，可以不写参数的类型和返回值类型，并且参数的名字可以任取
  let myAdd: (base: number, increment: number) => number = function(x, y) {
    return x+ y
  }
  // 具名函数写法
  function myAdd1(base: number, increment: number): number {
    return base + increment
  }

  // 在 ts 中，如果不对形式参数进行特殊处理，所有声明的参数都是必须的；而在 js 中所有参数都是可选的
  // 如果想设置某些参数为可选，需要加 ? 修饰符。可选参数必须在必须参数之后声明
  // 例如下面的 lastName 就是可选参数，不传入第二个参数的话 lastName 默认为 undefined
  // firstName 拥有默认值，只有第一个参数传入 undefined 时才会使用默认值
  function buildName(firstName: string = 'Dwyane', lastName?: string): string {
    return `${firstName} ${lastName}`
  }
  
  // 剩余参数 ...
  function buildName1(firstName: string, ...restName: string[]): string {
    return `${firstName} ${restName.join(' ')}`
  }

  // 指定 this 的类型
  // 在 js 中 this 是比较棘手的，ts 中我们可以通过在参数里指定 this 的类型来得到友好的错误提示
  // 如果指定 this: void 说明函数中不应该有 this
  interface Card {
    // 一张牌的接口
    // 花色 和 数字
    suit: string
    num: number
  }
  interface Deck {
    // 一副牌的接口
    // 四种花色 和 13 个数字
    suits: string[]
    nums: number[]
    // 取牌器函数，
    // 规定取牌器函数的 this 的类型必须兼容 Deck 接口
    // 并且返回值兼容 Card 类型
    cardPicker: (this: Deck) => Card
    // 下面这种写法是规定调用 createCardPicker 函数时的 this 必须兼容 Deck 接口
    // 并且返回值为一个函数，这个函数的返回值兼容 Card 接口
    // createCardPicker(this: Deck): () => Card
  }
  // 实现一副牌
  let deck: Deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    cardPicker(this: Deck) {
      let pickedSuit = Math.floor(Math.random() * 4)
      let pickedNum = Math.floor(Math.random() * 13)
      return {
        suit: this.suits[pickedSuit],
        num: this.nums[pickedNum]
      }
    }
    // 以下是 createCardPicker 的一种实现
    // 箭头函数的 this 与 createCardPicker 的 this 绑定
    // 而这个 this 必须兼容 Deck 接口，所以一定有 suits nums 属性
    // createCardPirck(this: Deck) {
    //   return () => {
    //     let pickedSuit = Math.floor(Math.random() * 4)
    //     let pickedNum = Math.floor(Math.random() * 13)
    //     return { suit: this.suits[pickedSuit], num: this.nums[pickedNum]}
    //   }
    // }
  }
  // 如下调用 deck 中的 cardPicker 会报错，因为 f 的 this 不兼容 Deck
  let f = deck.cardPicker
  f()

  // 重载
  // 有时我们需要调用同一个函数，根据传入参数的不同来执行不同的操作
  // 也就是说函数的传入参数类型有多个，但不是 any
  function overloadFn(x: string): string
  function overloadFn(x: number): number
  function overloadFn(x): any {
    if (typeof x === 'string') return 'str'
    else if (typeof x === 'number') return 0
  }
  // 前面两个 fn 的声明是重载函数列表，它可以让编译器进行正确的类型检查(只接受 x 为 string 或 number)
  // 检查顺序同定义顺序，因此越精确的类型声明应该越靠前
  // 注意 function fn(x): any 并不是重载列表的一部分，这里是函数实现
  // 如果 x 不是 string 或者 number 来调用 fn 则会报错

}


/*
 d888b  d88888b d8b   db d88888b d8888b. d888888b  .o88b. .d8888.
88' Y8b 88'     888o  88 88'     88  `8D   `88'   d8P  Y8 88'  YP
88      88ooooo 88V8o 88 88ooooo 88oobY'    88    8P      `8bo.
88  ooo 88~~~~~ 88 V8o88 88~~~~~ 88`8b      88    8b        `Y8b.
88. ~8~ 88.     88  V888 88.     88 `88.   .88.   Y8b  d8 db   8D
 Y888P  Y88888P VP   V8P Y88888P 88   YD Y888888P  `Y88P' `8888Y'
*/
namespace generics {
  // 泛型 类型参数 <T>

  // 函数 echo 接受任意类型的变量，变量类型被 T 捕获
  function echo<T>(arg: T): T {
    // 因为 T 可以是任何类型，不一定存在 length 属性，所以下面会报错
    console.log(arg.length)
    return arg
  }
  // 可以指定 arg 为 T 类型的数组，数组有 length 属性
  function loggingLength<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
  }
  // 或者使用泛型约束
  interface Lengthwise {
    length: number
  }
  // 这样传入给 loggingLength1 的参数，必须具有 length 属性
  function loggingLength1<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
  }

  // 泛型函数类型
  let myEcho1: <T>(x: T) => T = echo
  // 可以用大括号括起来，这样就不用使用箭头符号了
  let myEcho2: { <T>(x: T): T } = echo

  // 泛型接口
  interface Echo {
    <T>(arg: T): T
  }
  // myEcho3() 接受一个任意类型的参数
  let myEcho3: Echo = echo
  // 也可以把泛型参数作为整个 interface 的参数
  interface Echo2<T> {
    (arg: T): T
  }
  // myEcho4() 接受一个 string 类型的参数
  let myEcho4: Echo2<string> = echo

  // 泛型类
  class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
  }
  let myGenericNumber = new GenericNumber<number>()
  myGenericNumber.zeroValue = 1
  myGenericNumber.add = function(x, y) { return x + y }
}


/*
 .d8b.  d8888b. db    db  .d8b.  d8b   db  .o88b. d88888b d8888b.      d888888b db    db d8888b. d88888b
d8' `8b 88  `8D 88    88 d8' `8b 888o  88 d8P  Y8 88'     88  `8D      `~~88~~' `8b  d8' 88  `8D 88'
88ooo88 88   88 Y8    8P 88ooo88 88V8o 88 8P      88ooooo 88   88         88     `8bd8'  88oodD' 88ooooo
88~~~88 88   88 `8b  d8' 88~~~88 88 V8o88 8b      88~~~~~ 88   88         88       88    88~~~   88~~~~~
88   88 88  .8D  `8bd8'  88   88 88  V888 Y8b  d8 88.     88  .8D         88       88    88      88.
YP   YP Y8888D'    YP    YP   YP VP   V8P  `Y88P' Y88888P Y8888D'         YP       YP    88      Y88888P
*/
namespace advancedType {
  // 高级类型

  // 交叉类型 &
  // 交叉类型是将多个类型合并为一个类型
  // 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性，相当于并集
  function extend<T, U> (first: T, second: U): T & U {
    // 创建一个类型为 T&U 的空对象
    let res = <T & U>{}
    // 将 first 和 second 的成员添加到 res
    for (let key in first) {
      // 因为 res first 不兼容，需要对其进行类型转换
      (<any>res)[key] = (<any>first)[key]
    }
    for(let key in second) {
      (<any>res)[key] = (<any>second)[key]
    }
    return res
  }
  class A {
    constructor(public name: string) {}
  }
  class B {
    constructor(public age: number) {}
    printAge(this: B) {
      console.log(this.age)
    }
  }
  let ab = extend(new A('wtl'), new B(18))
  ab.printAge()

  // 联合类型 |
  // 表示一个值可能是某些类型之一。例如 x: number | string 表示 x 可以是 string 或者 number 类型
  // 联合类型只能访问他们的共有成员，相当于交集
  class Bird {
    fly() {}
    layEggs() {}
  }
  class Fish {
    swim() {}
    layEggs() {}
  }
  let animal: Bird | Fish
  animal.layEggs() // OK
  animal.swim() // Error swim() 不是公共部分
  // 那如何进行类型保护(即一次性判断类型) 例如就是想判断 animal 是不是 Fish，进而使用 animal.swim()
  // 1.自定义保护类型函数，返回值为类型谓词
  function isFish(pet: Bird | Fish): pet is Fish {
    return (<Fish>pet).swim !== undefined
  }
  // 类型保护判断一次，在作用域内不需要再次判断
  if (isFish(animal)) {
    animal.swim()
  }
  // 在 else 块中 ts 也会知道 animal 是 Bird
  else {
    animal.fly()
  }
  // 2.typeof 类型保护，只适用于 number string boolean symbol
  function padLeft(value: string, padding: number | string) {
    if (typeof padding === 'string') {
      return padding + value
    }
    if (typeof padding === 'number') {
      return Array(padding + 1).join(" ") + value
    }
    throw new Error(`Expected string or number, got '${padding}'.`)
  }
  // 3.instanceof 类型保护，该关键词是通过递归比较 left.__proto__ === right.prototype
  if (animal instanceof Bird) {
    animal.fly()
  }
  else {
    animal.swim()
  }
}


/*
.88b  d88.  .d88b.  d8888b. db    db db      d88888b
88'YbdP`88 .8P  Y8. 88  `8D 88    88 88      88'
88  88  88 88    88 88   88 88    88 88      88ooooo
88  88  88 88    88 88   88 88    88 88      88~~~~~
88  88  88 `8b  d8' 88  .8D 88b  d88 88booo. 88.
YP  YP  YP  `Y88P'  Y8888D' ~Y8888P' Y88888P Y88888P
*/
namespace myModule {
  // 模块 此处的模块指的是以文件形式组织的外部模块(另外还有在代码中的内部模块，现在改称命名空间)
  // 可以直接使用 ES6 的 import export 语法
  // 另外为了兼容 CommonJs(module.exports require) 模块的 exports
  // ts 定义了 export = 和 import name = require('module') 语法

  // ZipCodeValidator.ts
  class ZipCodeValidator {
    printHello() {}
  }
  export = ZipCodeValidator
  // test.ts
  import zip = require('./ZipCodeValidator')
  let validator = new zip()
  validator.printHello()

  // 编译的时候可以根据目标模块类型的不同 给 tsc 不同的参数
  // tsc --module commonjs ZipCodeValidator.ts
  // tsc --module amd ZipCodeValidator.ts

  // 动态模块加载
  // 如果引入一个模块，仅仅在类型注解部分使用，而没有在表达式中使用，则不会引入该模块代码
  declare function require(moduleName: string): any
  import { ZipCodeValidator as Zip } from "./ZipCodeValidator"
  if (needZipValidation) {
    // Zip只用在类型注解，所以上面的 import 语句不会引入模块代码
    // 只有执行到这里才会 require
    let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator")
    let validator = new ZipCodeValidator()
    // ...
  }

  // 引用 JavaScript 库
  // 需要写一个 .d.ts 声明文件为每个引入的第三方库声明用到的内容，类似 C++ 的头文件
  // node.d.ts 在一个综合的声明文件中声明多个模块(url path)时使用 declare module 'moduleName' 形式
  // 引号中是模块名，可以使用通配符
  declare module 'url' {
    export interface Url {
      protocol?: string
      hostname?: string
      pathname?: string
    }
    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
  }
  declare module 'path' {
    export function normalize(p: string): string
    export function join(...paths: any[]): string
    export let sep: string
  }
  // 然后就可以用 三斜线指令 和 import 使用第三方库
  // test.ts
  /// <reference path="node.d.ts"/>
  import * as URL from 'url'
  let myUrl = URL.parse('http://www.typescriptlang.org')

  // .d.ts 声明文件也可以简写，但是类型全都为 any
  declare module 'hot-new-module'

}


/*
d8b   db  .d8b.  .88b  d88. d88888b .d8888. d8888b.  .d8b.   .o88b. d88888b
888o  88 d8' `8b 88'YbdP`88 88'     88'  YP 88  `8D d8' `8b d8P  Y8 88'
88V8o 88 88ooo88 88  88  88 88ooooo `8bo.   88oodD' 88ooo88 8P      88ooooo
88 V8o88 88~~~88 88  88  88 88~~~~~   `Y8b. 88~~~   88~~~88 8b      88~~~~~
88  V888 88   88 88  88  88 88.     db   8D 88      88   88 Y8b  d8 88.
VP   V8P YP   YP YP  YP  YP Y88888P `8888Y' 88      YP   YP  `Y88P' Y88888P
*/
namespace myNamespace {
  // 命名空间 即之前的内部模块
  // 在一个文件中为了更好的组织代码结构，将一部分逻辑相关代码放入命名空间
  // 通过类似模块 export 方法对外暴露接口，然后使用 命名空间.prop 来访问暴露的接口

  namespace Validation {
    export interface StringValidator {
      isAcceptable(s: string): boolean
    }

    const lettersRegexp = /^[A-Za-z]+$/
    const numberRegexp = /^[0-9]+$/

    export class LettersOnlyValidator implements StringValidator {
      isAcceptable(s: string) {
        return lettersRegexp.test(s)
      }
    }

    export class ZipCodeValidator implements StringValidator {
      isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s)
      }
    }
  }
  // 使用 Validation 命名空间中的 validator
  let validators: { [s: string]: Validation.StringValidator } = {}
  validators['ZIP code'] = new Validation.ZipCodeValidator()
  validators['Letters only'] = new Validation.LettersOnlyValidator()

}


/*
d8888b. d88888b  .o88b.  .d88b.  d8888b.  .d8b.  d888888b  .d88b.  d8888b.
88  `8D 88'     d8P  Y8 .8P  Y8. 88  `8D d8' `8b `~~88~~' .8P  Y8. 88  `8D
88   88 88ooooo 8P      88    88 88oobY' 88ooo88    88    88    88 88oobY'
88   88 88~~~~~ 8b      88    88 88`8b   88~~~88    88    88    88 88`8b
88  .8D 88.     Y8b  d8 `8b  d8' 88 `88. 88   88    88    `8b  d8' 88 `88.
Y8888D' Y88888P  `Y88P'  `Y88P'  88   YD YP   YP    YP     `Y88P'  88   YD
*/
namespace decorator {
  // 修饰器
  // 一种特殊类型的声明，能够被附加到类、方法、访问符、属性或参数上，对其进行相应的"装饰"
  // 修饰器使用 @expression 形式，expression 为表达式，求值后必须是一个函数(修饰器)

  // 修饰器定义就是一个函数，被修饰的对象当做参数传入
  function d(target) {
    // do something with "target"
  }
  // 使用 @d

  // 如果要定制一个修饰器如何应用到一个声明上，可以写一个修饰器工厂函数
  // 工厂函数根据不同的传入参数，返回一个修饰器函数，修饰器的行为因工厂函数的传入参数而异
  function color(value: string) { // 修饰器工厂
    return function (target) {  // 返回修饰器
      // do something with "target" and "value"
    }
  }
  // 使用
  // @color('red')

  // 修饰器组合的执行顺序
  // 例如 f() g() 是两个修饰器工厂函数 用来修饰类的方法 method()
  // @f()
  // @g()
  // method() {}
  // 先执行 f() 工厂函数 g() 工厂函数
  // 然后 g 修饰器 f 修饰器
  // 即先由上往下执行工厂函数，再由下往上执行修饰器

  // 类修饰器 class
  // 类修饰器接受类的构造函数为唯一参数
  // 如果类修饰器返回一个值，则会使用返回值来替换构造函数
  function addProp(constructor: Function) {
    // 向类添加静态属性 staticProp
    constructor.staticProp = 'staticProp'
    // 向原型对象添加实例属性 objProp
    constructor.prototype.objProp = 'objProp'
  }
  @addProp
  class A {}

  // 类的方法修饰器 method
  // 修饰器接受三个参数：
  // 1.对于静态方法来说是类的构造函数，对于实例方法来说是类的原型对象
  // 2.方法名
  // 3.方法的属性描述符
  // 如果方法修饰器返回一个值，则会被用作方法的属性描述符
  function log (target: any, name: string, descriptor: PropertyDescriptor) {
    // descriptor 对象的值如下
    // {
    //   value: specifiedFunction,  // 成员的值
    //   enumerable: false,         // 是否可枚举 影响 for...in  Object.keys()
    //   configurable: true,        // 描述符中的 enumerable configurable 是否可更改 属性是否可删除
    //   writable: true             // 是否可以更改初始值
    // }
    let oldMethod = descriptor.value
    descriptor.value = function () {
      console.log(`Calling ${name} with `, arguments)
      return oldMethod.apply(this, arguments)
    }
    return descriptor
  }
  class B {
    @log
    add(a, b) { return a + b }
    // 调用 sayHello() 方法时将会先输出其参数 a b
  }

  // 存取器修饰器 get set
  // 存取器的修饰器不能同时写在 set get 上，只能写在靠前的一个上
  // 因为一个属性的 descriptor 是同时应用于 set get 的
  // 存取器修饰器 和 方法修饰器 基本没有差别，接受的参数和返回值都相同
  function enumerable (value: boolean) {  // 修饰器工厂函数
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
      descriptor.enumerable = value
    }
  }
  class C {
    _myprop: string = 'www'
    @enumerable(false)
    get myprop () { return this._myprop}
  }

  // 属性修饰器
  // 接受两个参数：
  // 1.对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象
  // 2.属性名
  // 属性描述符不会作为参数传入，因为现在没有办法在定义一个原型对象的成员时描述一个实例属性
  // 并且返回值也会被忽略

}


/*
d888888b d8888b. d888888b d8888b. db      d88888b          .d8888. db       .d8b.  .d8888. db   db
`~~88~~' 88  `8D   `88'   88  `8D 88      88'              88'  YP 88      d8' `8b 88'  YP 88   88
   88    88oobY'    88    88oodD' 88      88ooooo          `8bo.   88      88ooo88 `8bo.   88ooo88
   88    88`8b      88    88~~~   88      88~~~~~  C8888D    `Y8b. 88      88~~~88   `Y8b. 88~~~88
   88    88 `88.   .88.   88      88booo. 88.              db   8D 88booo. 88   88 db   8D 88   88
   YP    88   YD Y888888P 88      Y88888P Y88888P          `8888Y' Y88888P YP   YP `8888Y' YP   YP
*/
namespace trpleSlash {
  // 三斜线指令
  // 是指包含单个xml标签的单行注释，注释内容会作为编译器指令
  // 三斜线指令只能放在最顶端，否则会被当做普通注释

  /// <reference path="node.d.ts" />
  // 用于声明文件之间的依赖

  /// <reference types="someLib" />
  // 声明依赖某个全局库

  /// <reference no-default-lib="true"/>
  // 这个指令把一个文件标记成默认库，告诉编译器在编译过程中不要包含这个默认库

}