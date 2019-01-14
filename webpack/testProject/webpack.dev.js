// webpack 开发环境配置文件

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');



module.exports = merge(common, {
	devtool: 'eval-source-map',
	devServer: {
		contentBase: "./build", // 本地服务器所加载的页面所在的目录
		// historyApiFallback: true, // 单页面 不跳转
		port: 8080, // 端口 默认8080
		inline: true, // 实时刷新
		hot: true
	},

	module: {
		rules: [{
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
		}, ]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	mode: "development",

});
