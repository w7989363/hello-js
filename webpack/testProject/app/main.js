// jshint esversion:6
// main.js


import Greeter from './Greeter.js';

document.querySelector('#root').appendChild(Greeter());

// 懒加载，点击按钮才会加载模块。 /**/注释可以指定chunk的名字
document.querySelector('button').addEventListener('click', e => {
	return import( /* webpackChunkName: "lazyload" */ './lazyload.js').then(module => {
		let print = module.default;
		print();
	});
});



// import React from 'react';
// import {render} from 'react-dom';
// import Greeter from './Greeter';
//
// import './main.css';    //使用require导入css文件
//
// render(<Greeter />, document.getElementById('root'));
