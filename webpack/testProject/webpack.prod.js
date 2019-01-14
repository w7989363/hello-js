// webpack 生产环境配置文件

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
	devtool: 'source-map',
	output: {
		filename: '[name].[chunkhash].js', // 打包后输出文件的文件名
		path: path.resolve(__dirname, 'build'), // 打包后的文件存放地方
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
						loader: "css-loader",
						options: {
							modules: true, // 指定启用css modules
							localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
						}
					},
					"postcss-loader"
				]
			}),

		}, ]
	},
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new CleanWebpackPlugin(['build']),
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new ExtractTextPlugin({
			filename: "[name].css"
		}),
		new webpack.optimize.SplitChunksPlugin({
			chunks: "all",
			minSize: 20000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true
		}),
	],
	mode: "production",
});
