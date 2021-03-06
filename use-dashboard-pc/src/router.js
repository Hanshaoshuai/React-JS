import React from 'react';
import { Router, Route } from 'dva/router';

import IndexPage from './routes/IndexPage';
import Users from "./routes/Users.js";
import Name from "./routes/Name.js";


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/name" component={Name} />
    </Router>
  );
}

export default RouterConfig;
