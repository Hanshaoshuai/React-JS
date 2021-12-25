const webpack = require('webpack')
const path = require ('path')
const autoprefixer=require("autoprefixer")
const HtmlWebpackPlugin = require ('html-webpack-plugin')
const ExtractTextPlugin = require ('extract-text-webpack-plugin')
const OpenBrowserPlugin = require ('open-browser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default;


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
			    target: 'http://127.0.0.1:8020/MyDictionary/React-JS1/React-JS/react-redux-new-pc/mock',
			   	pathRewrite: {'^/api': ''},
			   	changeOrigin: true
			}
		   
		}
		
	},
	module: {
		loaders:[
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
	            test: /\.js$/,
	            use: [{
	               loader: 'babel-loader',
	                options: {
	                   presets: ['react','es2015']
	                }
	            }]
	        },
			{
		        test: /\.(woff|svg|ttf|eot|woff2)(\?.*)?$/,
		        loader: 'url-loader',
		        exclude: /node_modules/,
		        query: {
		          limit: 1000,
		          name: "static/font/[name].[hash:8].[ext]"
		        }
		    },
		    {
		        test: /\.(png|jpg|gif|ico)$/,
		        loader: 'url-loader',
		        exclude: /node_modules/,
		        query: {
		          limit: 1000,
		          name: "static/image/[name].[hash:8].[ext]"
		        }
		    }
		]
	},
	resolve: {
    extensions: {'','.js','.css','.jsx'} //后缀名自动补全
  },
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			filename: 'index.html',
			title: 'react-app我来帮助'
		}),
		new ExtractTextPlugin({
			//filename: 'app_[hash].css',
			filename: 'index.css',
			disable: false,
			allChunks:true
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:9000'
		}),
		// 打包图片
    	new ImageminPlugin({
      		pngquant: {
        		quality: '50-60'
      		}
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