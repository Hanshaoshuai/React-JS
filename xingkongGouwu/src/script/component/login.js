import React from 'react'
import {Link, browserHistory} from 'react-router'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLogin:"none",
		}
		this.login=this.login.bind(this)
		this.show=this.show.bind(this)
	}
	
	
	login(){
		var user = this.refs.user.value;
		var password1 = this.refs.password1.value;
		var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+user+"&password="+password1;
		$.ajax({url,success: function(res){
			console.log(res);
			if(res.body != "0" && res.body != "2"){
				localStorage.setItem("userID",user);
				window.location.href="#/user";
			}
		}
		});
		
	}
	fanhui(){
		window.location.href="http://localhost:9000/#/home";
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
				            	会员登录
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
				<div className="content-wrapper">
					<div className="content">
						<div className="loginbox">
							<div className="item">
								<input type="text" ref="user" className="txt-input" placeholder="请输入手机号"/>
							</div>
							<div className="item">
								<input type="password" ref="password1" className="txt-input" placeholder="请输入密码"/>
							</div>
							<div className="item">
								<button onClick={this.login} className="btn">登录</button>
							</div>
						</div>
						<div className="item item-register">
			                <span className="item-register-new">
			                    <Link to="/find" className="item-register-link">
			                        找回密码
			                    </Link>
			                </span>
			                <span className="item-register-old">
			                    <Link to="/register" className="item-register-link">
			                        用户注册
			                    </Link>
			                </span>
			            </div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login