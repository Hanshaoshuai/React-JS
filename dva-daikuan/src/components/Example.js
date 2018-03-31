import React,{Component} from "react";
import { Avatar, Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import {Link} from 'dva/router';

class Example extends React.Component {
 state = {
    collapsed: false,
    mode: 'inline',
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
    onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };
  tuichu=()=>{
    sessionStorage.removeItem('username');
    window.location='#/';
  }
  render() {
    return (
      <Layout className="bigbox">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <div className="daibox"><Link to="home">贷款管理系统</Link></div>
         <dl><dd><Avatar shape="square" size="large" icon="user" className="userbox"/></dd><dt><p>您好</p><p ref='username'>超级管理员</p></dt></dl>
              <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
              <div className="navbox">我的信息</div>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="nav-text">个人信息管理</span><Icon type="down" className="icon"/></span>}
            >
              <Menu.Item key="1"><Link to='mydai'>我的贷款</Link></Menu.Item>
            </SubMenu>
             <div className="navbox">系统管理</div>
            <SubMenu
              key="sub2"
              title={<span><Icon type="book" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="nav-text">推送管理</span><Icon type="down" className="icon"/></span>}
            >
              <Menu.Item key="2"><Link to='tuisong'>推送规则设置</Link></Menu.Item>
              <Menu.Item key="3"><Link to="duanxin">短信记录</Link></Menu.Item>
            </SubMenu>
               <SubMenu
              key="sub3"
              title={<span><Icon type="book" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="nav-text">菜单管理</span><Icon type="down" className="icon"/></span>}
            >
              <Menu.Item key="4"><Link to="caidan">菜单管理</Link></Menu.Item>
              <Menu.Item key="5">菜单目录管理</Menu.Item>
            </SubMenu>
             <div className="navbox">贷款管理</div>
               <SubMenu
              key="sub4"
              title={<span><Icon type="book" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="nav-text">贷款管理</span><Icon type="down" className="icon"/></span>}
            >
              <Menu.Item key="6"><Link to='daiguan'>贷款管理</Link></Menu.Item>
            </SubMenu>
               <SubMenu
              key="sub5"
              title={<span><Icon type="book" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="nav-text">统计分析</span><Icon type="down" className="icon"/></span>}
            >
              <Menu.Item key="7"><Link to='hetong'>借款合同分析</Link></Menu.Item>
              <Menu.Item key="8"><Link to='zijin'>借款资金分析</Link></Menu.Item>
              <Menu.Item key="9"><Link to='zonglan'>借款总览</Link></Menu.Item>
            </SubMenu>
             <div className="navbox">员工管理</div>
              <SubMenu
              key="sub6"
              title={<span><Icon type="book" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="nav-text">用户管理</span><Icon type="down" className="icon"/></span>}
            >
              <Menu.Item key="10"><Link to='userall'>用户管理</Link></Menu.Item>
            </SubMenu>
                <SubMenu
              key="sub7"
              title={<span><Icon type="book" />&nbsp;&nbsp;&nbsp;&nbsp;<span className="nav-text">岗位权值管理</span><Icon type="down" className="icon"/></span>}
            >
              <Menu.Item key="11"><Link to='quanzhi'>权值管理</Link></Menu.Item>
              <Menu.Item key="12"><Link to='gangwei'>岗位管理</Link></Menu.Item>
              <Menu.Item key="13"><Link to='xitong'>系统功能管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#ccc', padding: 0 ,}}>
            <div className="tuichubox"><Avatar size="large" icon="user" className="userboxtwo"/>&nbsp;&nbsp;&nbsp;<span ref='username2'>超级管理员</span>&nbsp;&nbsp;&nbsp;<a onClick={this.tuichu}>退出</a></div>
            <div className="weixinbox">微信</div>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
    componentDidMount(){
    this.refs.username.innerHTML=sessionStorage.getItem('username');
    this.refs.username2.innerHTML=sessionStorage.getItem('username');
  }

}
export default Example;


// <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>