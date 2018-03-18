var webpack = require('webpack');
var path = require ('path')
var autoprefixer=require("autoprefixer")
var HtmlWebpackPlugin = require ('html-webpack-plugin')
var ExtractTextPlugin = require ('extract-text-webpack-plugin')
var OpenBrowserPlugin = require ('open-browser-webpack-plugin')


module.exports = {
//	context: __dirname + '/src',
//	entry: "./index.js",
	entry: './src/index.js',
	output: {
		path: __dirname+'/build',
		filename: "build.js"
	},
	devServer: {
		contentBase: './build',
		host: 'localhost',
		port:9000,
		historyApiFallback: false,
		proxy:{
			'/api1': {
		    	target: 'http://xkgwsj.duapp.com/indexm.php/',
		   		pathRewrite: {'^/api1': ''},
		   		changeOrigin: true
			},
			'/api': {
			    target: 'http://images.sctvgo.com/',
			   	pathRewrite: {'^/api': ''},
			   	changeOrigin: true
			}
		   
		}
		
	},
	module: {
		loaders:[
//			{
//				test: /\.js?$/,
//				exclude: /(node_modules)/,
//				loader: 'babel-loader',
//				query: {
//					presets: ['react', 'es2015']
//				}
//			},
			{
			  	test: /\.css$/,
			  	exclude:[
			  		path.resolve(__dirname,'node_modules/antd')
			  	],
//			  	exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
				  	fallback: 'style-loader',
				  	use: [
				    	'css-loader',
				    	{
					      	loader: "postcss-loader",
					      	options: {
					        	plugins: [autoprefixer]
					      	}
				    	}
				  	]
				})
			},
			{
			  	test: /\.less$/,
			  	exclude: /node_modules/,
			 	use: ExtractTextPlugin.extract({
				  	fallback: 'style-loader',
				  	use: [
					    'css-loader','less-loader',
					    {
					      	loader: "postcss-loader",
					      	options: {
					        	plugins: [autoprefixer]
					      	}
					    }
					]
				})
			},
			{
				test:/\.js$/,
				exclude: /node_modules/, 
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
		        test: /\.(png|jpg|gif|svg)$/,
		        loader: 'file-loader',
		        options: {
		          name: '[name].[ext]?[hash]'
		        }
		   	},
      		{
			    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			    use: [{
			      	loader: "url-loader",
			      	options: {
			        	limit: 10000,
			        	name: 'fonts/[name].[hash:7].[ext]'    // 将字体放入fonts文件夹下
			      	}
			    }]
			}
		]
	},
	plugins: [
	
//		new webpack.optimize.UglifyJsPlugin({
//			compress: {
//				warnings: false
//			},
//			output: {
//				comments: false
//			}
//		}),
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			filename: 'index.html',
			title: '我来帮助'
		}),
		new ExtractTextPlugin({
			//filename: 'app_[hash].css',
			filename: 'index.css',
			disable: false,
			allChunks:true
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:9000'
		})
		
	],
	
	externals:{
		'$':'window.jquery',
		'react':'window.React',
		'react-dom' : 'window.ReactDOM',
		'react-router' : 'window.ReactRouter',
		'redux' : 'window.Redux',
		'react-redux' : 'window.ReactRedux'
	} 

}