/*
 ██    ███████
███    ██
 ██    ███████
 ██         ██
 ██ ██ ███████
*/


// AngularJS 应用组成如下：
//
// View(视图), 即 HTML。
// Model(模型), 当前视图中可用的数据。$scope
// Controller(控制器), 即 JavaScript 函数，可以添加或修改属性。


// scope 是一个 JavaScript 对象，带有属性和方法，这些属性和方法可以在视图和控制器中使用

// $rootScope 全局对象的属性可在所有子作用域中访问，子作用域互相无法访问对方的私有变量，这一点与js的函数作用域完全一致。
// 后面控制器中设置的rootScope不能在前面访问


// 模块module定义了一个应用程序。
// 模块是应用程序中不同部分的容器。
// 模块是应用控制器controller/指令directive/过滤器filter的容器。

// 在模块定义中 [] 参数用于定义模块的依赖关系。
// 中括号[]表示该模块没有依赖，如果有依赖的话会在中括号写上依赖的模块名字。
var app = angular.module("myApp", ["ngAnimate", "ngRoute"]);
app.controller('myCtrl', function($scope) {
	$scope.firstName = "John";
	$scope.lastName = "Doe";
	$scope.fullName = function() {
		return $scope.firstName + " " + $scope.lastName;
	}
});


/*
███████ ██ ██   ████████ ███████ ██████
██      ██ ██      ██    ██      ██   ██
█████   ██ ██      ██    █████   ██████
██      ██ ██      ██    ██      ██   ██
██      ██ ███████ ██    ███████ ██   ██
*/

// 过滤器，一般表达式通过管道符|添加到过滤器中
//
// currency	格式化数字为货币格式。
// filter	从数组项中选择一个子集。
// lowercase    uppercase   格式化字符串为大小写
// orderBy:"id"	根据id字段升序  orderBy:"-id" 根据id字段降序
// date:"yyyy-MM-dd HH:mm:ss" 时间戳格式化
// number:2 保留两位小数
// limitTo :6 截取前六位 limitTo :-4 截取后四位


// 自定义filter
app.filter('reverse', function() { //可以注入依赖
	return function(text) {
		return text.split("").reverse().join("");
	}
});


/*
███████ ███████ ██████  ██    ██ ██  ██████ ███████
██      ██      ██   ██ ██    ██ ██ ██      ██
███████ █████   ██████  ██    ██ ██ ██      █████
     ██ ██      ██   ██  ██  ██  ██ ██      ██
███████ ███████ ██   ██   ████   ██  ██████ ███████
*/

// 服务 Service，是AngularJs内建的函数或对象
app.controller("serviceCtrl", function($scope, $location, $http, $timeout, $interval, myService) {
	// $location，相当于window.location
	$scope.myUrl = $location.absUrl();

	// $http，向服务器发送请求，响应服务器传来的数据
	// $http.get('/someUrl', config).then(successCallback, errorCallback);
	// $http.post('/someUrl', data, config).then(successCallback, errorCallback);
	// $http({
	//     method:string,
	//     url:string,
	//     params:object,
	//     data:string or object,
	//     headers: object,
	//     transformRequest:function transform(data,headersGetter) or an arra of functions,
	//     transformResponse:function transform(data,headersGetter) or an arra of functions,
	//     cache:boolean or Cache object,
	//     timeout:number,
	//     withCredentials: boolean
	// });
	$http.get("http://localhost/test.php").then(function(response) {
		$scope.myResponse = response.data;
	}, function(err) {
		console.log(err);
	});

	// $timeout，对应window.setTimeout函数
	$scope.myTimeout = "init";
	$timeout(function() {
		$scope.myTimeout = "2 secs later";
	}, 2000);

	// $interval, 对应window.setInterval函数
	$scope.myInterval = new Date().toLocaleString();
	$interval(function() {
		$scope.myInterval = new Date().toLocaleString();
	}, 1000);

	// 自定义service
	$scope.myReverse = myService.reverse($scope.myUrl);
});
// 添加自定义service, 并向该服务中添加函数reverse
app.service("myService", function() {
	this.reverse = function(str) {
		return str.split("").reverse().join("");
	};
});


/*
██████  ██ ██████  ███████  ██████ ████████ ██ ██    ██ ███████
██   ██ ██ ██   ██ ██      ██         ██    ██ ██    ██ ██
██   ██ ██ ██████  █████   ██         ██    ██ ██    ██ █████
██   ██ ██ ██   ██ ██      ██         ██    ██  ██  ██  ██
██████  ██ ██   ██ ███████  ██████    ██    ██   ████   ███████
*/
app.controller("directiveCtrl", function($scope) {
	$scope.shout = function() {
		return "shout";
	};
});
/*
我们可以自定义自己的指令

app.directive('namespaceDirectiveName', function(injectables) {
   var directiveDefinitionObject = {
       restrict: string,
       priority: number,
       template: string,
       templateUrl: string,
       replace: bool,
       transclude: bool,
       scope: bool or object,
       controller: function controllerConstructot($scope, $element, $attrs, $transclude),
       require: string,
       link: function postLink(scope, elem, attrs) {},
       compile: function complie(tElement, tAttrs, transclude) {
           return {
               pre: function preLink(scope, elem, attrs, controller) {},
               post: function postLink(scope, elem, attrs, controller) {}
           }
       }
   };
   return directiveDefinitionObject;
});

namespaceDirectiveName : 指令名称，例如ngModel，使用时ng-model
injectables : 需要的服务，比如$rootScope,$http等
restrict : 描述了指令在模板中的使用方式，包括：元素（E），属性（A）、CSS样式类（C）、注释（M）或者以上几种方式的任意组合
priority : 设置指令在模板中的执行顺序，顺序是相对与元素上的其他指令而言的
template : 以字符串的形式编写一个内联模板，如果以URL的方式提供了模板，则此属性会被忽略
templateUrl : 描述加载模板所使用的URL
replace : 如果此指令为true，则使用模板替换指令所在元素，如果为false或者不指定，则在当前指令追加到所在的元素内部
transclude : 把指令元素中原来的子节点移动到新模板内部
scope : 为当前指令创建一个新的作用域，而不是使之继承父作用域
controller : 创建一个控制器，会暴露一个api，利用这个API可以在多个指令之间进行通信
require : 要求必须存在另外一个指令，当前指令才能正确运行
link : 使用编程的方式修改最终生成的DOM元素实例，添加事件监听器，并设置数据绑定。例如ng-bind
compile : 在使用ng-repeat时，用编程的方式修改DOM模板，从而实现同一个指令跨越多个实例的特性。compile函数也可以返回一个link函数，用它来修改产生的元素实例。

*/
app.directive("helloReplace", function() {
	return {
		// 可以作为元素或属性使用<hello-replace /> 或者 <img hello-replace />
		restrict: "EA",
		// replace为true，模板直接替换指令元素
		replace: true,
		template: "<p>hello-replace p元素直接替换掉div</p>"
	};
});

app.directive("helloTransclude", function() {
	return {
		restrict: "A",
		// replace为false，模板插入到指令元素中
		// 指令元素中的子节点插入到ng-transclude指示的节点中
		transclude: true,
		template: "<p>hello-replace p元素直接替换掉div <strong ng-transclude></strong></p>"
	};
});

/*
   指令的作用域scope
   scope对象的类型有三种选择
   1.scope:false(默认) : 指令对应的DOM元素上存在的scope对象。
   2.scope:true : 可以创建一个新的scope对象,它继承了外层控制器的scope。在继承树中，位于当前的scope对象上方的所有scope对象的值都可以被读取。对于DOM元素里面的任何指令，如果需要这种类型的scope，也可以共享这个scope，并且可以用它和树中其它scope进行通信。
   3.scope:{变量名:"绑定方式@=&标签中用于接收的属性名"} : 使用独立的scope对象，它不会从父对象上继承模型的任何属性，当创建可复用的组件并且需要把当前指令的操作和父scope隔离开时，你就需要使用这个选项。
   当需要访问其他scope属性时，可以采取一定的策略:
   @ 把当前属性作为一个字符串传递，可以绑定来自外层的scope的值，在属性值中插入{{}}即可
   = 绑定当前属性 ,带有一个来自父scope的属性
   & 传递一个来自父scope的函数，稍后调用
*/

// @ 单向绑定，必须在标签中先用属性接收
app.directive("helloColor1", function() {
	return {
		restrict: "A",
		template: "@单向绑定 color : {{color1}}",
		// 变量名:"@标签中用于接收的属性名"
		scope: {
			color1: "@colorAttr"
		},
		// elem : 指令元素
		// attrs : 一个包含了指令所在元素的属性的标准化的参数对象
		link: function(scope, elem, attrs) {
			// 绑定click事件
			elem.bind("click", function() {
				// 修改element的css
				elem.css("background-color", "white");
				// 由于是单向绑定，此处不会更改父scope中的color值
				scope.$apply(function() {
					scope.color1 = "white";
				});
			});
			// 绑定mouseover事件
			elem.bind("mouseover", function() {
				// 修改鼠标为pointer
				elem.css("cursor", "pointer");
			});
		},
	};
});

// = 双向绑定
app.directive("helloColor2", function() {
	return {
		restrict: "A",
		template: "=双向绑定 color : {{color2}}",
		// 变量名:"=标签中用于接收的属性名"
		scope: {
			color2: "=colorAttr"
		},
		// elem : 指令元素
		// attrs : 一个包含了指令所在元素的属性的标准化的参数对象
		link: function(scope, elem, attrs) {
			// 绑定click事件
			elem.bind("click", function() {
				// 修改element的css
				elem.css("background-color", "white");
				// 双向绑定，此处修改color2会影响父scope中的值
				scope.$apply(function() {
					scope.color2 = "white";
				});
			});
			// 绑定mouseover事件
			elem.bind("mouseover", function() {
				// 修改鼠标为pointer
				elem.css("cursor", "pointer");
			});
		},
	};
});

// & 调用父scope中的函数
app.directive("helloColor3", function() {
	return {
		restrict: "A",
		template: "&调用父scope中的函数 shout : {{test}}",
		// 函数名:"&标签中用于接收的属性名"
		scope: {
			shout: "&"
		},
		// elem : 指令元素
		// attrs : 一个包含了指令所在元素的属性的标准化的参数对象
		link: function(scope, elem, attrs) {
			// 绑定click事件
			elem.bind("click", function() {
				// 修改element的css
				elem.css("background-color", "white");
				// 双向绑定，此处修改color2会影响父scope中的值
				scope.$apply(function() {
					// 调用父scope中的函数
					scope.test = scope.shout();
				});
			});
			// 绑定mouseover事件
			elem.bind("mouseover", function() {
				// 修改鼠标为pointer
				elem.css("cursor", "pointer");
			});
		},
	};
});

// require
app.directive("outDirective", function() {
	return {
		restrict: "EA",
		scope: {},
		// 如果指令之间需要交互，需要controller
		controller: function($scope) {
			this.func = function(attr) {
				alert("get message from inDirective : " + attr.message);
			}
		},
	};
});
app.directive("inDirective", function() {
	return {
		restrict: "EA",
		scope: {},
		// 告诉angular在元素以及她的父元素中搜索controller，这样找到的controller实例会作为第四个参数传递给link函数
		require: "^outDirective",
		link: function(scope, elem, attr, controller) {
			elem.bind("click", function() {
				scope.message = "hi outer.";
				controller.func(scope);
			});
			elem.css("cursor", "pointer");
		}
	};
});




/*
███████  ██████  ██████  ███    ███
██      ██    ██ ██   ██ ████  ████
█████   ██    ██ ██████  ██ ████ ██
██      ██    ██ ██   ██ ██  ██  ██
██       ██████  ██   ██ ██      ██
*/
app.controller("formCtrl", function($scope) {
	$scope.siteArray = [{
			site: "Google",
			url: "http://www.google.com"
		},
		{
			site: "Runoob",
			url: "https://www.runoob.com"
		},
		{
			site: "Taobao",
			url: "http://www.taobao.com"
		}
	];
	// 默认选择
	$scope.selected1 = $scope.siteArray[0];

	$scope.siteObj = {
		car01: {
			brand: "Ford",
			model: "Mustang",
			color: "red"
		},
		car02: {
			brand: "Fiat",
			model: "500",
			color: "white"
		},
		car03: {
			brand: "Volvo",
			model: "XC90",
			color: "black"
		}
	}
	// 默认选择
	$scope.selected2 = $scope.siteObj.car02;
})


/*
████████  █████  ██████  ██      ███████
   ██    ██   ██ ██   ██ ██      ██
   ██    ███████ ██████  ██      █████
   ██    ██   ██ ██   ██ ██      ██
   ██    ██   ██ ██████  ███████ ███████
*/
app.controller("tableCtrl", function($scope, $http) {
	$scope.tableArray = [{
			"Name": "Alfreds Futterkiste",
			"City": "Berlin",
			"Country": "Germany"
		},
		{
			"Name": "Ana Trujillo Emparedados y helados",
			"City": "México D.F.",
			"Country": "Mexico"
		},
		{
			"Name": "Antonio Moreno Taquería",
			"City": "México D.F.",
			"Country": "Mexico"
		},
		{
			"Name": "Around the Horn",
			"City": "London",
			"Country": "UK"
		},
		{
			"Name": "B's Beverages",
			"City": "London",
			"Country": "UK"
		},
		{
			"Name": "Berglunds snabbköp",
			"City": "Luleå",
			"Country": "Sweden"
		},
		{
			"Name": "Blauer See Delikatessen",
			"City": "Mannheim",
			"Country": "Germany"
		},
		{
			"Name": "Blondel père et fils",
			"City": "Strasbourg",
			"Country": "France"
		},
		{
			"Name": "Bólido Comidas preparadas",
			"City": "Madrid",
			"Country": "Spain"
		},
		{
			"Name": "Bon app'",
			"City": "Marseille",
			"Country": "France"
		},
		{
			"Name": "Bottom-Dollar Marketse",
			"City": "Tsawassen",
			"Country": "Canada"
		},
		{
			"Name": "Cactus Comidas para llevar",
			"City": "Buenos Aires",
			"Country": "Argentina"
		},
		{
			"Name": "Centro comercial Moctezuma",
			"City": "México D.F.",
			"Country": "Mexico"
		},
		{
			"Name": "Chop-suey Chinese",
			"City": "Bern",
			"Country": "Switzerland"
		},
		{
			"Name": "Comércio Mineiro",
			"City": "São Paulo",
			"Country": "Brazil"
		}
	];
});


/*
 ██████ ██      ██  ██████ ██   ██
██      ██      ██ ██      ██  ██
██      ██      ██ ██      █████
██      ██      ██ ██      ██  ██
 ██████ ███████ ██  ██████ ██   ██
*/

app.controller("clickCtrl", function($scope) {
	$scope.myVar = false;
	$scope.toggle = function() {
		$scope.myVar = !$scope.myVar;
	}
})



/*
██████   ██████  ██    ██ ████████ ███████
██   ██ ██    ██ ██    ██    ██    ██
██████  ██    ██ ██    ██    ██    █████
██   ██ ██    ██ ██    ██    ██    ██
██   ██  ██████   ██████     ██    ███████
*/

app.config(function($routeProvider) {
	// $routeProvider.when(url,{
	//     template:string, //在ng-view中插入简单的html内容
	//     templateUrl:string, //在ng-view中插入html模版文件
	//     controller:string,function / array, //在当前模版上执行的controller函数
	//     controllerAs:string, //为controller指定别名
	//     redirectTo:string,function, //重定向的地址
	//     resolve:object<key,function> //指定当前controller所依赖的其他模块
	// });
	$routeProvider.when("/home", {
		template: "Home",
	}).when("/about", {
		template: "About",
	});
})
