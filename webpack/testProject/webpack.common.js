// webpack 公共配置文件

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
	entry: __dirname + '/app/main.js', // 唯一的入口文件
	// output: {
  //   filename: '[name].[hash].js',  // 打包后输出文件的文件名
  //   path: path.resolve(__dirname, 'build'), // 打包后的文件存放地方
	// },
	module: {
		rules: [{
			test: /(\.jsx|\.js)$/,
			use: {
				loader: "babel-loader"
			},
			exclude: /node_modules/
		}, ],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"
		}),

	],
};
