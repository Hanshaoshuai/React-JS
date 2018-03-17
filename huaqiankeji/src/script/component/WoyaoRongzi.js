import React from 'react';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class WoyaoRongzi extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: []
    }
  }
  
  rongzi(){
  	window.location.href='#/RongziLeixing';
  }
  
  handleClick(e) {
	  console.log('click', e);
	}
  
  render() {
    return (
      <div id="WoyaoRongzi">
      	<div className="home">
					<div className="header">
						<ul>
							<li  className="header-bottom">
								<div className="header-left">
									<img className="img-left" src=""/>
									<img className="img-right" src="./img/qr-1.png"/>
								</div>
								<div className="header-right">
									<ul>
										<li className="img-top"><img src=""/></li>
										<li className="img-center">
											<p>布罗尔</p>
											<span>此房东</span>
											<font>的是否覆盖</font>
										</li>
										<li className="img-bottom"><img src="./img/qr-2.png"/></li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<div className="box">
						<ul className="box-content">
							<ul className="list">
								<div className="list-top">
									<ol>
										<li className="top-img"><img src=""/></li>
										<li className="top-content">
											<p><span>懂总</span><font>西部证券，东方饭店</font></p>
											<div>
												<span>西部证券</span>
												<font>新三板减肥的</font>
											</div>
										</li>
									</ol>
								</div>
								<p className="rongzi" onClick={this.rongzi.bind(this)}>
									<span>我要融资</span>
								</p>
							</ul>
							<div className="mingcheng">
								<div className="mingcheng-top">
									<span className="top1">项目名称</span>
									<span className="top2">状态</span>
									<span className="top3">已投递人数</span>
									<span className="top4">最新时间</span>
									<span className="top5">编辑</span>
								</div>
								<ul>
									<div className="mingcheng-top mingcheng-bottom">
										<span className="top1">项目名称</span>
										<span className="top2">状态</span>
										<span className="top3">已投递人数</span>
										<span className="top4">最新时间</span>
										<span className="top5">编辑</span>
									</div>
									<div className="mingcheng-top mingcheng-bottom">
										<span className="top1">项目名称</span>
										<span className="top2">状态</span>
										<span className="top3">已投递人数</span>
										<span className="top4">最新时间</span>
										<span className="top5">编辑</span>
									</div>
									<div className="mingcheng-top mingcheng-bottom">
										<span className="top1">项目名称</span>
										<span className="top2">状态</span>
										<span className="top3">已投递人数</span>
										<span className="top4">最新时间</span>
										<span className="top5">编辑</span>
									</div>
								</ul>
							</div>
						</ul>
						<div className="list-bottom">
							<p className="bottom-left"></p>
							<ul>
								<span className="list-span">1</span>
								<span>2</span>
								<span>3</span>
								<span>4</span>
								<span>5</span>
							</ul>
							<p className="bottom-right"></p>
						</div>
					</div>
				</div>
				
				<Menu onClick={this.handleClick.bind(this)} style={{ width: 256 }} mode="vertical">
			    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
			      <MenuItemGroup title="Item 1">
			        <Menu.Item key="1">Option 1</Menu.Item>
			        <Menu.Item key="2">Option 2</Menu.Item>
			      </MenuItemGroup>
			      <MenuItemGroup title="Iteom 2">
			        <Menu.Item key="3">Option 3</Menu.Item>
			        <Menu.Item key="4">Option 4</Menu.Item>
			      </MenuItemGroup>
			    </SubMenu>
			    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
			      <Menu.Item key="5">Option 5</Menu.Item>
			      <Menu.Item key="6">Option 6</Menu.Item>
			      <SubMenu key="sub3" title="Submenu">
			        <Menu.Item key="7">Option 7</Menu.Item>
			        <Menu.Item key="8">Option 8</Menu.Item>
			      </SubMenu>
			    </SubMenu>
			    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
			      <Menu.Item key="9">Option 9</Menu.Item>
			      <Menu.Item key="10">Option 10</Menu.Item>
			      <Menu.Item key="11">Option 11</Menu.Item>
			      <Menu.Item key="12">Option 12</Menu.Item>
			    </SubMenu>
			  </Menu>
				
      </div>
    )
  }

  componentDidMount() {
    
  }
}

export default WoyaoRongzi



