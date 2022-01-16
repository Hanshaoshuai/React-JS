const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css提取
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理

// var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var ImageminPlugin = require('imagemin-webpack-plugin').default
// var OpenBrowserPlugin = require('open-browser-webpack-plugin')

// postcss-preset-env postcss-loader autoprefixer // 添加对现代 css 的loader支持,还会自动对浏览器进行兼容添加前缀等

const isProductionMode = process.env.NODE_ENV === 'production';
// console.log(process.env, isProductionMode)

let mode = "development";

if (isProductionMode) {
	mode = "production";
}

module.exports = {
	entry: './index.js',

	output: {
		path: __dirname + '/build',
		libraryTarget: 'commonjs2',
		filename: 'index.js'
		// filename: 'build.js'
	},
	mode: mode, // 开发环境
	devServer: {
		// contentBase: './build',// 3.旧版本
		static: './build',
		host: 'localhost',
		hot: true,
		port: 9000,
		historyApiFallback: false,
		proxy: {
			'/api1': {
				target: 'http://xkgwsj.duapp.com/indexm.php/',
				pathRewrite: { '^/api1': '' },
				changeOrigin: true
			},
			'/api': {
				target: 'http://images.sctvgo.com/',
				pathRewrite: { '^/api': '' },
				changeOrigin: true
			}

		}

	},

	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/i,
				use: [
					isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
					// "style-loader",
					"css-loader",
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'autoprefixer',
										{
											// 选项
										},
									],
								],

							},
						},
					},
				],
			},
			{
				test: /\.less$/i,
				use: [
					isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
					// {
					// 	loader: 'style-loader',
					// },
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								strictMath: true,
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'autoprefixer',
										{
											// 选项
										},
									],
								],
							},
						},
					},
				],
			},
			// {
			// 	test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
			// 	type: "asset/resource",
			// },
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		]

	},
	resolve: {
		extensions: [" ", ".js", ".jsx", ".css", ".less"], //后缀名自动补全
	},

	plugins: [
		new webpack.ProgressPlugin(), // 进度插件
		new HtmlWebpackPlugin({
			title: 'webpack',
			// template: 'index.ejs', // 引入的模板
			template: './index.html',
			filename: 'index.html', // 输出名字

		}),
		new webpack.HotModuleReplacementPlugin(), // 热模块更换插件
		new MiniCssExtractPlugin({
			filename: isProductionMode ? '[name].[contenthash].css' : '[name].css',
		}),
		new CleanWebpackPlugin(),
		// new webpack.ProvidePlugin({
		// 	"React": "react",
		// })
		// new MiniCssExtractPlugin() // 建议 mini-css-extract-plugin 与 css-loader 一起使用
	],
	// externals: {
	// 	'react': 'React'
	// }
	externals: {
		'$': 'window.jquery',
		'react': 'window.React',
		'react-dom': 'window.ReactDOM',
		'ReactDOM': 'react-dom',
		'react-router': 'window.ReactRouter',
		'redux': 'window.Redux',
		'react-redux': 'window.ReactRedux',
	}
}
