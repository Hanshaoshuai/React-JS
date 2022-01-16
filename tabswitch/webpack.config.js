var webpack = require('webpack')
// var path = require ('path').
// var autoprefixer=require("autoprefixer")
// var HtmlWebpackPlugin = require ('html-webpack-plugin')
// var ExtractTextPlugin = require ('extract-text-webpack-plugin')
// var ImageminPlugin = require('imagemin-webpack-plugin').default
// var OpenBrowserPlugin = require ('open-browser-webpack-plugin')

module.exports = {
	// 	entry: './src/index.js',

	// 	output: {
	// 		path: __dirname+'/build',
	// 		//filename:'app_[hash].js'
	// 		filename:'build.js'
	// 	},

	// 	devServer: {
	// 		contentBase: './build',
	// 		host: 'localhost',
	// 		port:8080,
	// 		historyApiFallback: false,
	// 		proxy:{
	// 			'/api1': {
	// 		    	target: 'http://xkgwsj.duapp.com/indexm.php/',
	// 		   		pathRewrite: {'^/api1': ''},
	// 		   		changeOrigin: true
	// 			},
	// 			'/api': {
	// 			    target: 'http://images.sctvgo.com/',
	// 			   	pathRewrite: {'^/api': ''},
	// 			   	changeOrigin: true
	// 			}

	// 		}

	// 	},

	// 	module: {
	// 		loaders: [
	// //			{
	// //				test:/\.css$/,
	// //				loader: 'style-loader!css-loader'
	// //			},
	// //			{
	// //				test:/\.scss$/,
	// //				loader: 'style-loader!css-loader!sass-loader'
	// //			},
	// //			{
	// //			  	test: /\.css$/,
	// //			  	exclude: /node_modules/,
	// //			  	use: [
	// //				    "style-loader",
	// //				    "css-loader?minimize",
	// //			    	{
	// //				      	loader: "postcss-loader",
	// //				      	options: {
	// //				        	plugins: [autoprefixer]
	// //				      	}
	// //				    }
	// //				  ]
	// //			},
	// //			{
	// //			  	test: /\.scss$/,
	// //			  	exclude: /node_modules/,
	// //			  	use: [
	// //				    "style-loader",
	// //				    "css-loader!sass-loader?minimize",
	// //			    	{
	// //				      	loader: "postcss-loader",
	// //				      	options: {
	// //				        	plugins: [autoprefixer]
	// //				      	}
	// //				    }
	// //				  ]
	// //			},

	// //			{
	// //				test:/\.css$/,
	// //				loader: ExtractTextPlugin.extract({
	// //					fallback: 'style-loader',
	// //					use: 'css-loader'
	// //				})
	// //			},
	// 			{
	// 			  	test: /\.css$/,
	// 			  	exclude:[
	// 			  		path.resolve(__dirname,'node_modules/antd')
	// 			  	],
	// //			  	exclude: /node_modules/,
	// 				use: ExtractTextPlugin.extract({
	// 				  	fallback: 'style-loader',
	// 				  	use: [
	// 				    	'css-loader',
	// 				    	{
	// 					      	loader: "postcss-loader",
	// 					      	options: {
	// 					        	plugins: [autoprefixer]
	// 					      	}
	// 				    	}
	// 				  	]
	// 				})
	// 			},
	// //			{
	// //				test:/\.scss$/,
	// //				loader: ExtractTextPlugin.extract({
	// //					fallback: 'style-loader',
	// //					use: 'css-loader!sass-loader'
	// //				})
	// //			},
	// //			{
	// //			  	test: /\.scss$/,
	// //			  	exclude: /node_modules/,
	// //			 	use: ExtractTextPlugin.extract({
	// //				  	fallback: 'style-loader',
	// //				  	use: [
	// //					    'css-loader','sass-loader',
	// //					    {
	// //					      	loader: "postcss-loader",
	// //					      	options: {
	// //					        	plugins: [autoprefixer]
	// //					      	}
	// //					    }
	// //					]
	// //				})
	// //			},
	// 			{
	// 			  	test: /\.less$/,
	// 			  	exclude: /node_modules/,
	// 			 	use: ExtractTextPlugin.extract({
	// 				  	fallback: 'style-loader',
	// 				  	use: [
	// 					    'css-loader','less-loader',
	// 					    {
	// 					      	loader: "postcss-loader",
	// 					      	options: {
	// 					        	plugins: [autoprefixer]
	// 					      	}
	// 					    }
	// 					]
	// 				})
	// 			},
	// //			{
	// //				test:/\.jsx$/,
	// //				exclude:/node_modules/,
	// //				loader:"jsx-loader",
	// //				query: {
	// //					presets: ['react', 'es2015']
	// //				}
	// //			},
	// 			{
	// 	            test: /\.js$/,
	// 	            use: [{
	// 	               loader: 'babel-loader',
	// 	                options: {
	// 	                   presets: ['react','es2015']
	// 	                }
	// 	            }]
	// 	        },
	// //			{
	// //		        test: /\.(png|jpg|gif|svg)$/,		//image在HTML中时用
	// //		        loader: 'file-loader',
	// //		        options: {
	// //		          name: '[name].[ext]?[hash]'
	// //		        }
	// //		   	},
	// 		   	{
	// 				test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, //image背景时用
	// 				loader: [{
	// 						loader: 'url-loader',
	// 						query: {
	// 							limit: 100000,
	// 							name: 'img/[name].[ext]'
	// 						}
	// 					},
	// 					'image-webpack-loader'
	// 				],
	// //				include: path.resolve(__dirname, 'src')
	// 			},
	//       		{
	// 			    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	// 			    use: [{
	// 			      	loader: "url-loader",
	// 			      	options: {
	// 			        	limit: 10000,
	// 			        	name: 'fonts/[name].[hash:7].[ext]'    // 将字体放入fonts文件夹下
	// 			      	}
	// 			    }]
	// 			}
	// 		]
	// 	},


	// 	plugins: [

	// 		new webpack.optimize.UglifyJsPlugin({
	// 			compress: {
	// 				warnings: false
	// 			},
	// 			output: {
	// 				comments: false
	// 			}
	// 		}),
	// 		new webpack.DefinePlugin({
	// 			'process.env':{
	// 				NODE_ENV:JSON.stringify(process.env.NODE_ENV)
	// 			}
	// 		}),
	// 		new HtmlWebpackPlugin({
	// 			template: './src/index.ejs',
	// 			filename: 'index.html',
	// 			title: '华千科技'
	// 		}),
	// 		new ExtractTextPlugin({
	// 			//filename: 'app_[hash].css',
	// 			filename: 'index.css',
	// 			disable: false,
	// 			allChunks:true
	// 		}),
	// 		new OpenBrowserPlugin({
	// 			url: 'http://localhost:8080'
	// 		}),
	// 		new ImageminPlugin({
	// 			disable: process.env.NODE_ENV !== 'production',
	// 			pngquant: {
	// 				quality: '90-100'
	// 			}
	// 		}),

	// 	],

	externals: {
		'$': 'window.jquery',
		// 'react': 'window.React',
		'react-dom': 'window.ReactDOM',
		'react-router': 'window.ReactRouter',
		'redux': 'window.Redux',
		'react-redux': 'window.ReactRedux',
		'react': 'React'
	}
}
