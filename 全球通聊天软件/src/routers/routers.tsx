import { FunctionComponent, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// const Login = lazy(() => import('../pages/login'));
// const Register = lazy(() => import('../pages/register'));
// const ChatRecord = lazy(() => import('../pages/chatRecord'));
// const PersonalInformation = lazy(() => import('../pages/personalInformation'));
// const Chatroom = lazy(() => import('../pages/chatroom'));
// const BuildGroup = lazy(() => import('../pages/buildGroup'));
// const AddBuildingGroup = lazy(() => import('../pages/addBuildingGroup'));
// const AllMembers = lazy(() => import('../pages/allMembers'));
// const Threejs = lazy(() => import('../pages/threejs'));

// const Home = lazy(() => import('../pages/home'));
// const About = lazy(() => import('../pages/about'));

import Login from '../pages/login';
import Register from '../pages/register';
import ChatRecord from '../pages/chatRecord';
import PersonalInformation from '../pages/personalInformation';
import Chatroom from '../pages/chatroom';
import BuildGroup from '../pages/buildGroup';
import AddBuildingGroup from '../pages/addBuildingGroup';
import AllMembers from '../pages/allMembers';
import Threejs from '../pages/threejs';

import Home from '../pages/home';
import About from '../pages/about';
interface FrontEndRoute {
  path: string;
  component: FunctionComponent<RouteComponentProps>;
  auth?: boolean;
  index?: number;
}

const Router: FrontEndRoute[] = [
  { path: '/', component: ChatRecord, index: 0 },
  { path: '/home', component: Home, index: 1 },
  { path: '/login', component: Login, index: 2 },
  { path: '/register', component: Register, index: 3 },
  { path: '/personalInformation', component: PersonalInformation, index: 4 },
  { path: '/chatroom', component: Chatroom, index: 5 },
  { path: '/buildGroup', component: BuildGroup, index: 6 },
  { path: '/addBuildingGroup', component: AddBuildingGroup, index: 7 },
  { path: '/allMembers', component: AllMembers, index: 8 },

  { path: '/about', component: About, index: 9 },
  { path: '/threejs', component: Threejs, index: 10 },
];

export default Router;
