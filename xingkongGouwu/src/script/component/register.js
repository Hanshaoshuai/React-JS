import React from 'react'
import {Link,browserHistory} from 'react-router'

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user:"",
			password1:"",
			isLogin:"none",
		}
		this.show=this.show.bind(this)
		this.zhuce=this.zhuce.bind(this)
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
	zhuce(){
		var user = this.refs.user.value;
		var password1 = this.refs.password1.value;
		console.log(user,password1)
		var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID="+user+"&password="+password1;
		$.ajax({url,success: function(res){
			console.log(res);
			if(res==1){
				alert("注册成功");
				window.location.href="#/login";
			}
		}
		});
	}
	render(){
		return (
			<div className="m-register">
				<header>
			        <div className="yo-header-ab">
			          	<span className="regret_1" onClick={this.fanhui}><img src="iconfont/02.png"/></span>
			            <div className="title">
				            	会员注册
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
				<section>
					<div className="content">
						<div className="item">
							<input type="text" className="txt-input" placeholder="请输入手机号码" ref="user"/>
						</div>
						<div className="item">
							<input type="password" className="txt-input" placeholder="请设置6-20位密码" ref="password1"/>
						</div>
						<div className="item">
							<input type="text" className="txt-input txt-code" placeholder="请输入验证码" ref="pwd"/>
							<img className="btn-code"  src="data:image/gif;base64,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"/>
						</div>
						<div className="item">
							<input type="text" className="txt-input txt-code" placeholder="请输入手机验证码" ref="pwd1"/>
							<span id="getCodeBtn" className="btn-code">获取短信验证码</span>
						</div>
						<div className="item"> 
			                <a className="sctv-agreement">《星空购物用户协议》</a>
			            </div>
						<div className="item">
							<a  onClick={this.zhuce} className="btn" >同意协议并注册</a>
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default Register