import React from 'react'
import {Link,browserHistory} from 'react-router'

class User extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user:"",
			password1:"",
			isLogin:"none",
		}
		this.tuichu=this.tuichu.bind(this)
		this.show=this.show.bind(this)
	}
	componentWillMount(){
		var user=localStorage.getItem("userID");
		if(user){
			this.setState({
				user:user
			})
		}else{
			window.location.href="http://localhost:9000/#/login"
		}
		
	}
	tuichu(){
		localStorage.removeItem("userID");
		window.location.href="http://localhost:9000/#/login"
	}
	fanhui(){
		browserHistory.goBack()
	}
	show(){
		
		if(this.state.isLogin=="none"){
			this.setState({
				isLogin:"block"
			})
		}else{
			this.setState({
				isLogin:"none"
			})
		}
	}
	render(){
		return (
			<div className="m-user">
				<header>
			        <div className="yo-header-ab">
			          	<span className="regret_1" onClick={this.fanhui}><img src="iconfont/02.png"/></span>
			            <div className="title">
				            	我的星空
			            </div>
			            <span className="img2" onClick={this.show}><img src="iconfont/03.png"/></span>
			        </div>
		        </header>
		        <div className="nav-s" style={{display:this.state.isLogin}}>
		        	<ul>
			            <li className="active">
			              <Link to="/home"  activeClassName="active">
			                <i className="yo-ico">&#xe83d;</i>
			                <b>首页</b>
			              </Link>
			            </li>
			            <li>
			              <Link to="/kind" activeClassName="active">
			                <i className="yo-ico">&#xe601;</i>
			                <b>分类</b>
			              </Link>
			            </li>
			            <li>
			            <Link to="/cart" activeClassName="active">
			              <i className="yo-ico">&#xe616;</i>
			              <b>购物车</b>
			            </Link>
			            </li>
			            <li>
			            <Link to="/user" activeClassName="active">
			              <i className="yo-ico">&#xe6b7;</i>
			              <b>我的</b>
			            </Link>
			            </li>
		          	</ul>
		        </div>
				<div className="starbox">
					<div className="fullbox">
						<div className="center-head-layout">
					        <div className="mcenter-head" id="top">
					            <div className="customericon">
					                <img width="100" height="100" src="http://m.sctvgo.com/themes/default/images/icon/head_pic.png" />
					            </div>
					            <div className="customer-info">
					                <p className="customer-name">{this.state.user}</p>
					                <p>会员编号：<span>1515155</span></p>
					                <p>会员等级：<span>普通会员</span></p>
					                <p>到期时间：<span>2099-12-31</span></p>
					            </div>
					            
					        </div>
					        <div className="customerorder-layout">
					            <ul className="customerorder">
					                <li>
					                    <a href="/Customer/CustomerOrder?t=3&amp;s=1&amp;pageNo=1">
					                        <span>0</span>
					                        <span>待支付</span>
					                    </a>
					                </li>
					                <li>
					                    <a href="/Customer/CustomerOrder?t=3&amp;s=3&amp;pageNo=1">
					                        <span>0</span>
					                        <span>待收货</span>
					                    </a>
					                </li>
					
					            </ul>
					            <span className="separator">
					
					            </span>
					        </div>
					
					    </div>
					    <div className="customernav">
					        <ul className="customernav-wrapper">
					            <li>
					                <a href="/Customer/CustomerOrder?t=3&amp;s=0&amp;pageNo=1">
					                    我的订单
					                </a>
					            </li>
					            <li>
					                <a href="/Customer/CustomerCollection">
					                    我的收藏
					                </a>
					            </li>
					            <li>
					                <a href="/Customer/CustomerAddress">
					                    地址管理
					                </a>
					            </li>
					            <li>
					                <a href="/Customer/CustomerPassword">
					                    密码修改
					                </a>
					            </li>
					
					            <li>
					                <a href="/Customer/CustomerAccountmoney">
					                    星空金币
					                </a>
					            </li>
					           
					        </ul>
					    </div>
					</div>
				    <div className="footer">
					    <div className="line-up"></div>
					    <ul className="footer-link">
					            <li><Link to="/user">{this.state.user}</Link></li>
					            <li><a onClick={this.tuichu} id="logout">退出</a></li>
					            <li><a href="#top">回到顶部</a></li>
					    </ul>
					</div>
				</div>
			</div>
		)
	}
}

export default User