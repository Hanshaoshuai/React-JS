import React from 'react';
import {connect} from 'react-redux';
import "./index.css";

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


// UI组件
// 不负责具体业务，所有的参数和方法，都通过props获得
class ContentComponent extends React.Component {
	dianJi() {
		var values=this.refs.values.value
		if(values==''){
			alert('请输入内容')
			return;
		}
//		console.log(this.props.zidingyi)
		var news=this.props.zidingyi;
//		console.log(news)
		var zuiXin=news.concat(values) 
		setTimeout(()=>{
			this.props.handleGetDataSucc(zuiXin);
		},10)
		
	}
	jian(index){
		var news=this.props.zidingyi;
		var arrays=[];
		for(var i=0;i<news.length;i++){
			if(i!==index){
				arrays.push(news[i]);
			}
		}
		this.props.handleGetDataSucc(arrays);
	}
	render() {
		return (
			<div className="index-content">
				<input ref="values"/>
				<button  onClick={this.dianJi.bind(this)}>添加</button>
				<div>
					{
						this.props.zidingyi.map((value, index) => {
							return (
								<div key={index}>
									<p className="article-item" >
										{value}
										<button ref="jian" style={{marginLeft:'10px'}} id={index} onClick={this.jian.bind(this,index)}>减少</button>
									</p>
								</div>
							)
						})
					}
				 </div>
				 <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          Content
        </Content>
      </Layout>
    </Layout>
  </Layout>
			</div>
		)
	}

}

// React-redux 的connect 方法，会把UI组件，自动转化为一个容器组件，容器组件，有点类似以前我们的controller组件

function mapStateToProps(store) {  // state对应的就是全局的store
	console.log(store);
	return { 
		zidingyi: store.zidingyi
	}
}

function mapDispatchToProps(dispatch) {
	return {
		handleGetDataSucc: function(news) {
			var action = {
				type: "FETCH_CONTENT",
				zidingyi: news
			}
			dispatch(action);
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentComponent)