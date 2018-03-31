import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Example from './components/Example';
import Tuisong from './components/Tuisong';
import Caidan from './components/Caidan';
import Mydai from './components/Mydai';
import Daiguan from './components/Daiguan';
import Hetong from './components/Hetong';
import Zijin from './components/Zijin';
import Userall from './components/Userall';
import Duanxin from './components/Duanxin';
import Zonglan from './components/Zonglan';
import Quanzhi from './components/Quanzhi';
import Gangwei from './components/Gangwei';
import Xitong from './components/Xitong';
import Home from './components/Home';
import Huankuanjihua from './components/component/Huankuanjihua';
import Bianji from './components/component/Bianji';
import Chongzhi from './components/component/Chongzhi';
import Rizhi from './components/component/Rizhi';
import 'antd/dist/antd.css';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" title="贷款登陆" component={IndexPage} />
      <Route path="/example" component={Example}>
      <IndexRoute component={Home}/>
      	<Route path="/home" component={Home} />
      	<Route path="/caidan" component={Caidan} />
      	<Route path="/tuisong" component={Tuisong} />
      	<Route path="/mydai" component={Mydai} />
      	<Route path="/hetong" component={Hetong} />
      	<Route path="/userall" component={Userall}>
          <Route path="/chongzhi" component={Chongzhi} />
        </Route>
      	<Route path="/duanxin" component={Duanxin} />
      	<Route path="/daiguan" component={Daiguan} />
      	<Route path="/zonglan" component={Zonglan} />
      	<Route path="/quanzhi" component={Quanzhi} />
      	<Route path="/gangwei" component={Gangwei} />
      	<Route path="/zijin" component={Zijin} />
      	<Route path="/xitong" component={Xitong} />
        <Route path="/huankuanjihua" component={Huankuanjihua} />
        <Route path="/Bianji" component={Bianji} />
        <Route path="/rizhi" component={Rizhi} />
      </Route>
    </Router>
  );
};
