// jQuery Code Snippets插件，jq开头显示代码段提示，例如jqclassadd


// $()函数返回jquery对象，该对象有很多方法
// ready在DOM加载完后就可执行，不必像window.onload一样等图片等所有资源都加载完
$(document).ready(function() {
	$("#tab").addClass("tabborder");
	$("#sub_button").click(function() {
		// $("#tab").removeClass("tabborder");
		$('#tab').toggleClass('tabborder');
	});

});


// $()接受选择器作为参数，基本有标签名、id、类，可以组合使用
// $("p");
// $("#id");
// $(".class");
$(document).ready(function() {

	// 属性选择符[]，选择所有包含alt属性的图片
	$("img[alt]");
	// 属性选择符可以使用^$*，意义同re
	$("a[href^='mailto']").addClass("mailto");
	$("a[href$='.html']").addClass("htmlLink");
	// 可以组合使用
	$("a[href*='test'][href^='http']").addClass("className");

	// 带箭头>是选择直接儿子，不带箭头是选择所有子孙
	// 冒号:后面跟自定义选择符，not(selector)否定选择符
	$("#selected-plays > li").addClass("horizontal");
	$("#selected-plays li:not(.horizontal)").addClass("sub_level");
	// 选择集合中标号为1的元素（0开始计数）
	$("p:eq(1)").addClass("className");
	// 选择奇数行偶数行 odd even
	$("tr:odd").addClass("className");
	// :nth-child(n)与:nth-of-type(n)的区别。n也可以为odd或even
	// 首先找到p的父元素，然后看其父元素的所有子元素的集合，如果第三个是p就选择，不是p不选择
	$("p:nth-child(3)").addClass("className");
	// p:nth-of-type(3)，首先找到p的父元素，然后看其父元素的所有p子元素的集合，选择第三个
	$("p:nth-of-type(3)").addClass("className");
	// :contains，基于内容的选择符，选择文本包含“py”的td标签
	$("td:contains(py)").addClass("className");
	// 基于表单的选择符
	// : enabled
	// : disabled
	// : checked
	// : selected
	$("input[type='radio']:checked").addClass("className");
	// filter()方法，传入selector或function
	$("p").filter(":even").addClass("className");
	// DOM遍历
	// .next()      // 筛选下一个最接近的同辈元素
	// .nextAll()   // 筛选该元素后面所有的同辈元素
	// .prev()      // 与next()相反
	// .prevAll()   // 与nextAll()相反
	// .addBack()   // 筛选后又包含本身的元素
	// .parent()    // 获取父类元素
	// .children()  // 获取子类元素
});


// $("document").ready()可以简写为
$(function() {
	$('#switcher-default').addClass('selected');
	// 监听事件on("event",function)，删除监听off("event")
	// 例如监听点击事件click
	$("#switcher button").on("click", function() {
		// #switcher下的所有button移除selected类
		$("#switcher button").removeClass("selected");
		// 被点击的按钮加上selected类
		$(this).addClass("selected");
		// 获取被点击的id名，以便添加class
		var bodyClass = this.id.split("-")[1];
		// 移除所有class，添加相应class
		$("body").removeClass().addClass(bodyClass);
	});
	$("#switcher h3").click(function() {
		// 对类的有无进行切换
		$("#switcher button").toggleClass("hidden");
		$("#somewords").slideToggle('slow');
	});
});


// 事件的传播，默认是冒泡策略，从最具体的元素层层往上传播
$(document).ready(function() {
	$("#test_sj").click(function(e) {
		e.preventDefault();
		// 事件往上传播会造成一些想不到的错误，可以通过一些手段避免
		// 1.通过事件对象的target == this判断是不是自身引发的事件
		if (e.target == this) {
			alert("div");
		}
	});

	$("#test_sj span").click(function(e) {
		e.preventDefault();
		alert("span");
	});

	$("#test_sj a").click(function(e) {
		e.preventDefault();
		alert("a");
		console.log($(this));
		// 2.停止事件传播
		// e.stopPropagation();
	});
});
// 利用冒泡的特性，可以实现事件的委托，委托上层父元素来处理事件
$(document).ready(function() {
	$("#test_sj").click(function(e) {
		console.log(e);
		e.preventDefault();
		// is(selector)
		if ($(e.target).is("#test_sj a")) {
			alert("a委托div显示a1");
		}
	});
	// 事件委托也有内置参数，使用on
	$("#test_sj").on("click", "a", function() {
		alert("a委托div显示a2");
	});
});


// 基于jQuery的Ajax
// 原生的Ajax使用XMLHttpRequest对象浏览器间实现不一致，jquery解决了这个问题

// 最简单的应用是使用load()函数改变元素内容
$(document).ready(function() {
	$("#myinput").keyup(function(e) {
		var txt = $(this).val();
		$("#myspan").load("http://localhost/test.php", {
			key: txt
		}, function(response, status, request) {
			this; // dom element
			if (status == "success") {

			}
		});
	});
});
// 传回的字符串可以用$.getJSON()解析为json对象
/*
$.getJSON("url", data,
    function (data, textStatus, jqXHR) {

    }
);
*/

// $.post();
/*
$.post("url", data,
    function (data, textStatus, jqXHR) {

    },
    "dataType"
);
*/

// $.get();
/*
$.get("url", data,
    function (data, textStatus, jqXHR) {

    },
    "dataType"
);
*/

// $.ajax();
/*
$.ajax({
    type: "method",
    url: "url",
    data: "data",
    dataType: "dataType",
    success: function (response) {

    }
});
*/
