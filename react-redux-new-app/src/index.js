import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import IndexComponent from './components/index/index.js';
import DetailComponent from './components/detail/index.js';
import ZiDingYi from './components/zidingyi/index.js';
import {createStore} from "redux";
import reducer from "./reducer.js";
import {Provider} from "react-redux";

var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


class Root extends React.Component {

	render() {
		return (
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path='/' component={IndexComponent}></Route>
					<Route path='/detail/:id' component={DetailComponent}></Route>
					<Route path='/zidingyi' component={ZiDingYi}></Route>
				</Router>
			</Provider>
		)
	}

}

ReactDom.render(<Root />, document.querySelector("#root"));