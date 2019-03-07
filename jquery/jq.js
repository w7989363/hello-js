// jQuery Code Snippets插件，jq开头显示代码段提示，例如jqclassadd


// $(选择器) 函数返回 jquery 对象
// ready 在 DOM 树可用后就可执行，不必像 window.onload 一样等所有脚本、图片等资源都加载完
$(document).ready(function () {})
// 可简写为
$(function() {})

// $('<p></p>') 返回新建的 jquery 元素对象

// window.$ === window.jQuery
// 是 jquery 对象的构造函数
// $()接受选择器作为参数，返回 jquery 对象
// 可以通过 $()[index] 来获取 DOM 对象
// DOM 对象可以通过 $(dom) 来得到 jquery 对象


// 事件
// $(selector).on(event: string, childSelector?: string, data?: any, callback)
// childSelector 选择子元素，为选择的子元素做事件委托，其他子元素触发事件则不会触发回调。选择的子元素可以是未来插入的。
// data 为手动传递给事件方法的参数 可以在回调中通过 event.data 获取
// on() 也可以接受一个 event: callback 的 map 来为一个元素绑定多个事件监听
$('p').on({
	click: function () {},
	mouseenter: function () {}
})
// off(event, selector, callback)
// 只传 event 会移除所有事件处理函数
// 如果移除特定事件处理函数，selector 必须传 on() 中传的值
// off() 也可以接受 callback 中的 event 对象来移除指定事件
// one(event, data, callback) 只运行一次的事件处理函数
// 也可以直接使用特定的事件名作为 action
$('p').click(function (e) {})

// 鼠标事件
// click dbclick mouseenter mouseleave mousedown mouseup
// hover(enterFn[, leaveFn]) 事件接受两个回调，第一个 mouseenter，第二个 mouseleave 可选

// 键盘事件
// keydown keyup 键盘上所有按键都会触发，按住会一直触发
// keypress 控制键不触发，只有能在屏幕上打出来的按键才会触发

// 表单事件
// focus blur
// focusin 该元素或任意子元素获得焦点时触发
// focusout 该元素或任意子元素失去焦点时触发
// submit 用于 form 元素
// change 表单元素值改变，用于 input textarea 元素时失去焦点才触发，用于 select 元素选择即触发

// 文档/窗口事件
// load unload resize scroll

// event
// event.target	返回哪个 DOM 触发的事件
// event.currentTarget	事件冒泡阶段内的当前 DOM 元素，通常等于 this
// event.delegateTarget	返回 on 绑定的元素(委托对象)，在事件委托中非常有用
// event.relatedTarget 只对鼠标移动事件有用，是相对于 currentTarget 相关联的元素。例如 mouseenter，返回离开的元素
// event.data 绑定事件监听函数时传递给事件方法的参数
// event.result 该事件上一个处理函数的返回值
// event.type 事件类型
// event.which 键盘事件的 keyCode
// event.pageX  event.pageY 返回鼠标相对文档左上角的坐标
// event.timeStamp 事假触发时的时间戳

// event.preventDefault() 阻止默认行为
// event.isDefaultPrevented()	是否调用了 event.preventDefault()
// event.stopPropagation() 阻止事件向上冒泡
// event.isPropagationStopped()	是否调用了 event.stopPropagation()
// event.stopImmediatePropagation() 阻止后续事件处理函数执行，并且阻止事件冒泡
// event.isImmediatePropagationStopped()	是否调用了 event.stopImmediatePropagation()




// 显示/隐藏元素 display:none 更改宽高 更改透明度
// time 单位毫秒 callback 为动画完后的回调
// hide(time, callback) show() toggle()

// 淡入淡出 display: none 更改透明度的动画
// fadeIn(time, callback) fadeOut() fadeToggle()
// fadeTo(speed, opacity, callback) 渐变到某个不透明度

// 滑动进入/消失 display: none 更高元素高度的动画
// slideDown(time, callback) slideUp() slideToggle()

// 创建自定义动画
// animate({params}, time, callback)
// 第一个参数描述动画的 css 属性，所有 kebab-case 都要改为 camelCase 命名
// animate 可以链式调用，形成一个动画链
// +=表示在原来基础上+	left right top bottom向各个方向移动的距离，元素需要为 absolute relative fixed
$('p').animate({
	paddingLeft: '+=100px'
}, 500).animate({
	left: '+=100px',
	opacity: '0'
}, 400)
// stop(stopAll = false, goToEnd = false) 停止动画
// 不加任何参数只停止当前动画，后续加入动画队列的仍会继续执行
// stopAll 停止所有动画，阻止后续加入动画队列
// goToEnd 停止当前动画，并且直接变到当前动画结束状态


// 获取内容
// text() 获取元素内所有文字节点的数据
// html() 获取元素内所有数据，包括标签
// val() 获取表单元素的值
// attr(attrName: string) 获取 HTML 特性
// prop(propName: string) 获取 DOM 属性
// 设置内容
// text() html() val() 拥有相同的参数和用法，只是设置的内容不同
// 参数为字符串或者一个函数，函数的返回值为设置的内容，函数第一个参数为对象下标，第二个参数为旧值
// text(content: string | function(i: number, oldVal: string) => string)
// attr() 接受三种形式的参数：只设置一个特性、设置多个特性、设置一个特性(回调函数形式)
attr('href', 'www.wtl.com')
attr({
	href: 'www.wtl.com',
	title: 'my title' 
})
attr('href', (i, oldVal) => 'www.wtl.com')
// prop()  设置 DOM 属性，用法同 attr

// removeAttr(attrName) 删除 HTML 特性
// removeProp(propName) 移除通过 prop() 设置的属性


// 添加/删除元素
// append() 在被选元素的结尾插入内容
// prepend() 在被选元素的开头插入内容
// after() 在被选元素之后插入内容
// before() 在被选元素之前插入内容
// remove() 删除选中元素及其子元素，可以接受一个选择器作为过滤器
// 例如 $("p").remove(".italic") 在所有选中的 p 元素里删除有类 italic 的元素
// empty() 删除选中元素的子元素

// clone() 生成被选元素的副本
// replaceWith(HTML标签 | jqObj | DOM) 替换被选元素
// wrap(HTML标签 | jqObj | DOM) 在每个被选元素外使用传入的元素包裹起来
// unwrap() 去掉被选元素的父元素
// wrapInner(HTML标签 | jqObj | DOM) 再每个被选元素的内容周围使用传入的元素包裹起来



// 样式
addClass('class1 class2')
removeClass('class1 class2')
toggleClass('class1 class2')
// 返回所选第一个元素的 background-color
css('background-color')
// 设置 background-color
css('background-color', 'yellow')
css({
	'background-color': 'yellow',
	'border': '1px solid black'
})

// 尺寸
// height() width() 返回 content 宽高
// height(100) 设置高位 100px
// innerHeight() innerWidth() 返回 content + padding 宽高
// outerHeight() outerWidth() 返回 content + padding + border 宽高
// outerHeight(true) outerWidth(true) 返回 content + padding + border + margin 宽高

// 位置
// position() 返回相对于父元素的位置 { top: number, left: number }
// offset(position: {top: number, left: number}) 设置或返回相对于文档左上角的位置 { top: number, left: number }
// scrollLeft(left?: number) 设置或返回被选元素水平滚动条位置
// scrollTop(top?: number) 设置或返回被选元素垂直滚动条位置


// 遍历
// parent() 返回直接父元素
// parents(选择器) 返回祖先元素，直到 <html>。可以接受一个选择器作为过滤参数
// parentsUntil(选择器) 返回到指定元素之间的所有祖先元素
// children(选择器) 返回所有直接子元素，接受一个选择器作为过滤参数
// contents() 返回所有子节点，包括文字节点、注释节点
// find(选择器) 返回所有后代，接受选择器作为过滤参数
// siblings(选择器) 返回所有兄弟，接受选择器作为过滤参数
// next() 返回下一个兄弟  prev() 返回前一个兄弟
// nextAll() 返回后面的兄弟  prevAll() 返回前面的兄弟
// nextUntil(选择器) 返回两元素之间的兄弟元素		prevUntil(选择器) 返回两元素之间的兄弟元素

// each(callback(index, element)) 为每个所选元素执行回调，回调返回 false 可以停止遍历


// 过滤
// first() last() 返回被选元素的第一个/最后一个元素
// eq(index)	返回被选元素指定索引上的元素  从 0 开始
// filter(选择器)	返回符合选择器规则的元素    not(选择器) 返回不符合选择器规则的元素
// has(选择器)  如果被选元素包含选择器选中的元素，则会被返回
// is(选择器 | callback(index, element)) 被选中元素是否匹配选择器
// slice(start: number, end?: number) 截取所选元素，参数可以为负数


// Ajax
// load() 将返回内容加载到元素文本
// load(url: string, data?: string | object, callback(responseText: string, status: string, jqXHR))
// data 请求参数，可选
// callback 为 load 结束后的回调，第一个参数是 ajax 返回值，第二个参数为状态码，第三个参数时 xhr 对象

// get post 方法参数相同
// $.get(url, data, callback)
// $.load(url, data, callback)

// jsonp 方法
// $.getJSON(url, data, function(json) {})
// 回调函数名用 ? 代替，即为后面的回调函数
$.getJSON('http://example.com/jsonp?callback=?', function(json) {
	console.log(json)
})

// $('form').serialize() 序列化表单值，创建 URL 编码文本字符串
// $('form').serializeArray() 序列化表单值，创建 {name: string, value: any} 对象组成的数组
// $.param(obj) 将 obj 转换为 URL 编码文本字符串


// $.noConflict() 释放 $ 符号对 jQuery 的简写引用，使不与其他框架冲突

// $.fn.extend() 扩展 jquery 的实例属性和方法
$.fn.extend({
	check: function () {
		return this.each(function () {
			this.checked = true
		})
	},
	uncheck: function () {
		return this.each(function () {
			this.checked = false
		})
	}
})

// data(key, value?) 向所选元素存入/取出数据

// $.Callbacks()	一个多用途的回调列表对象，用来管理回调函数列表




