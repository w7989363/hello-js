// webpack配置文件
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	// __dirname是node中全局变量，指向当前执行脚本所在目录
	entry: __dirname + '/app/main.js', // 唯一的入口文件
	output: {
		path: __dirname + '/build', // 打包后的文件存放地方
		filename: 'bundle-[hash].js', // 打包后输出文件的文件名
	},

	// 开发环境 or 生产环境
	mode: "development",

	// 小型项目可以使用eval-source-map，大型项目对考虑时间成本的话用cheap-module-eval-source-map
	devtool: 'eval-source-map',

	// 可以安装webpack-dev-server搭建一个基于node的调试服务器
	devServer: {
		contentBase: "./build", // 本地服务器所加载的页面所在的目录
		// historyApiFallback: true, // 单页面 不跳转
		port: 8080, // 端口 默认8080
		inline: true // 实时刷新
	},

	// Loaders可以使webpack有能力调用外部脚本或工具，处理源文件(ES6,jsx,Scss,Less..)
	module: {
		rules: [
			// babel loader
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader"
				},
				exclude: /node_modules/
			},
			// style-loader css-loader
			{
				test: /\.css$/,
				use: [{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							modules: true, // 指定启用css modules
							localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
						}
					},
					{
						loader: "postcss-loader"
					}
				]
			},
		],
	},

	// webpack插件，并不直接操作单个文件，它直接对整个构建过程其作用
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),
		// 根据模板自动生成 index.html 的插件
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"
		}),
		// 自动清理build
		new CleanWebpackPlugin(['build']),
	],

};
