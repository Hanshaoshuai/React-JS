require('../style/app.scss')


import react from 'react'
import ReactDOM from 'react-dom'
import {Router,IndexRedirect,Route,hashHistory,IndexRoute} from 'react-router'

import {Provider} from 'react-redux'
import {store} from './redux/store'

import Index from './component/index'
import Home from './component/home'
import Kind from './component/kind'
import Cart from './component/cart'
import User from './component/user'
import Login from './component/login'
import Detail from './component/detail'
import Find from './component/find'
import Register from './component/register'
import Kindsousuo from './component/kind-sousuo'
import Kindlistchild from './component/kind-list-list'
import Cartsettlement from './component/cartsettlement'
import Detailshangpin from './component/detail-shangpin'
import Detailxiangqing from './component/detail-xiangqing'
import DetailXiangqingJieshao from './component/detail-xiangqing-jieshao'
import DetailXiangqingCanshu from './component/detail-xiangqing-canshu'
import Kindsousuolist from './component/kindsousuo-list'



//<IndexRoute component={DengLu}/>
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
		    <Route path="/" component={Index}>
		      <IndexRedirect to="/home"></IndexRedirect>
		      <Route path="home" title="1" component={Home}></Route>
		      <Route path="kindsousuo" component={Kindsousuo}></Route>
		      <Route path="kind" title="2" component={Kind}></Route>
		      <Route path="cart" title="3" component={Cart}></Route>
		      <Route path="user" title="4" component={User}></Route>
		    </Route>
		    <Route path="login" component={Login}></Route>
		    <Route path="detail" component={Detail}>
		    	<IndexRedirect to="/detail/detailshangpin"></IndexRedirect>
		    	<Route path="detailshangpin" component={Detailshangpin}></Route>
		    	<Route path="detailxiangqing" component={Detailxiangqing}>
		    		<IndexRedirect to="/detail/detailxiangqing/detailXiangqingJieshao"></IndexRedirect>
		    		<Route path="detailXiangqingJieshao" component={DetailXiangqingJieshao}></Route>
		    		<Route path="detailXiangqingCanshu" component={DetailXiangqingCanshu}></Route>
		    	</Route>
		    </Route>
		    <Route path="register" component={Register}></Route>
		    <Route path="find" component={Find}></Route>
		    <Route path="kindlistchild/:type" component={Kindlistchild}></Route>
		    <Route path="cartsettlement" component={Cartsettlement}></Route>
		    <Route path="kindsousuolist" component={Kindsousuolist}></Route>
		</Router>
	</Provider>,
	document.getElementById("root")
)

