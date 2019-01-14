// Greeter.js
// jshint esversion:6
// 自定义的模块


import config from './config.json';
import styles from './Greeter.css';

export default () => {
	let greet = document.createElement('div');
	greet.textContent = config.greetText;
	greet.className = styles.root;
	return greet;
};


// import React, {Component} from 'react'
// import config from './config.json';
// import styles from './Greeter.css';
//
// class Greeter extends Component{
//   render() {
//     return (
//       <div className={styles.root}>
//         {config.greetText}
//       </div>
//     );
//   }
// }
//
// export default Greeter
