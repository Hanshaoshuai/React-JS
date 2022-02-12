import React, { ReactElement, useEffect } from 'react';
import { SwitchProps, Route, Redirect, useHistory } from 'react-router-dom';
import { getToken } from '../helpers';

import Router from './routers';
import Spins from '../pages/A-Spin';
import ReactTransitionGroup from './reactTransitionGroup';
const { ReactRouterTransitionPage } = require('react-router-transition-page');

export default function Routers({ location }: SwitchProps): ReactElement {
  const history = useHistory();
  const route = Router.find((r) => r.path === location?.pathname);

  useEffect(() => {
    if (!getToken()) {
      history.push('/login');
    }
    history.listen((route) => {
      // console.log(route); // 这个route里面有当前路由的各个参数信息
      if (
        !getToken() &&
        route.pathname !== '/register' &&
        route.pathname !== '/login' &&
        route.pathname !== '/education'
      ) {
        history.push('/login');
      }
    });
  }, []);

  if (route && route.path) {
    return (
      // <Suspense
      //     fallback={
      //       <Spins styleSize={[65, 33]} color={'#ff7a59'} fontSize={'33px'} />
      //     }
      //   >
      //   <Route path={route.path} exact={true} component={route.component} />
      // </Suspense>

      <ReactRouterTransitionPage
        path={route.path}
        component={route.component}
      />
    );
  }
  return <Redirect to="/" />;
}
