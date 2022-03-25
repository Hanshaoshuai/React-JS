import React, { ReactElement, useEffect, useState, useContext } from 'react';
import { SwitchProps, Route, Redirect, useHistory } from 'react-router-dom';
import { getToken, urlParse } from '../helpers';

import { TabBar, Badge } from 'antd-mobile';
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import Router from './routers';
import { MyContext } from '../models/context';
import Spins from '../pages/A-Spin';
import ReactTransitionGroup from './reactTransitionGroup';
import { urlObj } from '../pages/personalInformation/urlObj';
const { ReactRouterTransitionPage } = require('react-router-transition-page');

let urlIndex = 0;
let recordUrlList: any = [];
export default function Routers({ location }: SwitchProps): ReactElement {
  const history = useHistory();
  const route = Router.find((r) => r.path === location?.pathname);
  const [myLocName] = useState<any>(localStorage.getItem('name'));
  const { state, dispatch } = useContext(MyContext);
  const { urlPathname, badge, pathname } = state;
  const { _name, _value } = urlObj(urlPathname);
  useEffect(() => {
    // console.log(getToken());
    if (!getToken() || !myLocName) {
      history.push('/login');
    }
    const url = `${window.location.pathname}${window.location.search}`;
    history.listen((route) => {
      dispatch({
        type: 'pathname',
        pathname:
          window.location.search === '?list'
            ? `/${window.location.search}`
            : route.pathname,
      });
      // if (
      //   route.search !== '?videoPlay=0' &&
      //   route.search !== '?videoPlay=1' &&
      //   route.search !== '?dynamic=1' &&
      //   route.search !== '?dynamic=0' &&
      //   route.search !== '?dynamic=8' &&
      //   route.search !== '?personalVideo=1' &&
      //   route.search !== '?personalVideo=2'
      // ) {
      //   if (urlIndex === 0) {
      //     let time = setTimeout(() => {
      //       urlIndex = 0;
      //       clearTimeout(time);
      //     }, 100);
      //     // console.log(recordUrl); // 这个route里面有当前路由的各个参数信息
      //     const listenUrl = `${route.pathname}${route.search}`;
      //     let index = false;
      //     let list = recordUrlList.filter((term: any) => {
      //       if (term === listenUrl) {
      //         index = true;
      //         // return false;
      //       } else {
      //         return true;
      //       }
      //       return true;
      //     });
      //     // if (!index) {
      //     //   list.push(listenUrl);
      //     // }
      //     if (index) {
      //       list.splice(list.length - 1, 1);
      //     } else {
      //       list.push(listenUrl);
      //     }
      //     recordUrlList = list;
      //     dispatch({
      //       type: 'recordUrl',
      //       recordUrl: {
      //         list: list,
      //         returnTarget: list.length >= 2 ? list[list.length - 2] : '/',
      //       },
      //     });
      //   }
      //   urlIndex += 1;
      dispatch({
        type: 'urlPathname',
        urlPathname: urlParse(),
      });
      // }
      if (
        !getToken() &&
        route.pathname !== '/register' &&
        route.pathname !== '/login' &&
        route.pathname !== '/education'
      ) {
        history.push('/login');
      }

      if (route.search === '?personal=1') {
        dispatch({
          type: 'settings',
          settings: '?personal=1',
        });
      } else if (route.search === '?personal=1&setSettings=1') {
        // console.log('222', route.search);
        dispatch({
          type: 'settings',
          settings: '?personal=1&setSettings=1',
        });
      } else if (route.search === '?dynamic=1') {
        dispatch({
          type: 'settings',
          settings: '?dynamic=1',
        });
      }
    });
    if (
      window.location.search !== '?videoPlay=0' &&
      window.location.search !== '?videoPlay=1' &&
      window.location.search !== '?dynamic=1' &&
      window.location.search !== '?dynamic=0' &&
      window.location.search !== '?dynamic=8' &&
      window.location.search !== '?personalVideo=1' &&
      window.location.search !== '?personalVideo=2'
    ) {
      let listName = recordUrlList.filter((term: any) => {
        if (term !== url) {
          return true;
        } else {
          return false;
        }
      });
      listName.push(url);
      recordUrlList = listName;
      dispatch({
        type: 'recordUrl',
        recordUrl: { list: listName, returnTarget: '/' },
      });
    }
    dispatch({
      type: 'urlPathname',
      urlPathname: urlParse(),
    });
    if (window.location.search) {
      dispatch({
        type: 'settings',
        settings: `${window.location.search}`,
      });
    }
    dispatch({
      type: 'pathname',
      pathname:
        window.location.search === '?list'
          ? `/${window.location.search}`
          : window.location.pathname,
    });
  }, []);
  const tabsList: any = [
    {
      key: '/',
      title: '聊聊',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: badge,
    },
    {
      key: '/?list',
      title: '推荐',
      icon: <UnorderedListOutline />,
      badge: '',
    },
    {
      key: `/dynamic`,
      title: '动态',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: `/personalInformation`,
      title: '我的',
      icon: <UserOutline />,
    },
  ];
  const setActive = (e: string) => {
    if (window.location.search === e) return;
    if (e === '/personalInformation') {
      history.push(
        `/personalInformation?personal=1&my-${new Date().getTime()}=${JSON.stringify(
          {
            name: localStorage.getItem('name') || '',
          }
        )}`
      );
    } else if (e === '/dynamic') {
      history.push(
        `/dynamic?dynamic-${new Date().getTime()}=${JSON.stringify({
          name: localStorage.getItem('name') || '',
        })}`
      );
    } else {
      history.push(e);
    }
  };
  // console.log(_value, myLocName);
  if (route && route.path) {
    return (
      // <Suspense
      //     fallback={
      //       <Spins styleSize={[65, 33]} color={'#ff7a59'} fontSize={'33px'} />
      //     }
      //   >
      <>
        <Route path={route.path} exact={true} component={route.component} />
        {(pathname === '/' ||
          pathname === '/?list' ||
          pathname === '/personalInformation') &&
          _name !== 'dynamic' &&
          (_value ? _value === myLocName : true) &&
          !localStorage.getItem('groupName') &&
          !localStorage.getItem('type') &&
          !localStorage.getItem('addSearchFriends') && (
            <div className="TabBar-list">
              <div className="border-top"></div>
              <TabBar activeKey={pathname} onChange={setActive}>
                {tabsList.map((item: any) => (
                  <TabBar.Item
                    key={item.key}
                    icon={item.icon}
                    title={item.title}
                    badge={item.badge}
                  />
                ))}
              </TabBar>
            </div>
          )}
      </>
      // </Suspense>
      // <ReactRouterTransitionPage
      //   path={route.path}
      //   component={route.component}
      // />
    );
  }
  return <Redirect to="/" />;
}
