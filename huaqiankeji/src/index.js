import "./style/usage/DengLu.scss";
import "./style/usage/PipeiTouzi.scss";
import "./style/usage/RongziLeixing.scss";
import "./style/usage/RongziYaosu.scss";
import "./style/usage/ShoufeiXieyi.scss";
import "./style/usage/WoyaoRongzi.scss";
import "./style/usage/YitouDi.scss";

import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,hashHistory,IndexRedirect,IndexRoute} from 'react-router'

import DengLu from './script/component/DengLu.js'
import PipeiTouzi from './script/component/PipeiTouzi.js'
import RongziLeixing from './script/component/RongziLeixing.js'
import RongziYaosu from './script/component/RongziYaosu.js'
import ShoufeiXieyi from './script/component/ShoufeiXieyi.js'
import WoyaoRongzi from './script/component/WoyaoRongzi.js'
import YitouDi from './script/component/YitouDi.js'


class Root extends React.Component {
	
	dengLu(nextState,replaceState){
		var login=true
		try{
			if(login){
				replaceState({pathname:'/DengLu'})
			}
		}catch(e){
			
		}
	}

	render() {
		return (
			<Router history={hashHistory}>
			    <Route path="/" onEnter={this.dengLu} component={WoyaoRongzi}></Route>
			    <Route path="DengLu" component={DengLu}></Route>
			    <Route path="WoyaoRongzi" component={WoyaoRongzi}></Route>
			    <Route path="PipeiTouzi" component={PipeiTouzi}></Route>
			    <Route path="RongziLeixing" component={RongziLeixing}></Route>
			    <Route path="RongziYaosu" component={RongziYaosu}></Route>
			    <Route path="ShoufeiXieyi" component={ShoufeiXieyi}></Route>
			    <Route path="YitouDi" component={YitouDi}></Route>
			</Router>
		)
	}

}

ReactDOM.render(<Root />, document.querySelector("#root"));

//<IndexRoute component={DengLu}/>默认渲染的子路由
//<Route path="/" component={DengLu}>
//	<IndexRedirect to="/woyaoRongzi"></IndexRedirect>
//</Route>

//ReactDOM.render(
//	
//	<Router history={hashHistory}>
//	    <Route path="/" onEnter={this.dengLu} component={WoyaoRongzi}></Route>
//	    <Route path="DengLu" component={DengLu}></Route>
//	    <Route path="PipeiTouzi" component={PipeiTouzi}></Route>
//	    <Route path="RongziLeixing" component={RongziLeixing}></Route>
//	    <Route path="RongziYaosu" component={RongziYaosu}></Route>
//	    <Route path="ShoufeiXieyi" component={ShoufeiXieyi}></Route>
//	    <Route path="YitouDi" component={YitouDi}></Route>
//	</Router>,
//	document.getElementById("root")
//)
