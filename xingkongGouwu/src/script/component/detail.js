import React from 'react'

import {Link,browserHistory} from 'react-router'


class Detail extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
	    	isLogin:"none",
	      	datalist:"sasas",
	      	yincang:""
	    }
	    this.show=this.show.bind(this)
	    this.yincang=this.yincang.bind(this)
	    this.xianshi=this.xianshi.bind(this)
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
	yincang(){
		this.setState({
			yincang:"none"
		})
	}
	xianshi(){
		this.setState({
			yincang:"block"
		})
	}
	render() {
		return (
			<div className="m-detail">
				<header className="fixed-top">
				    <div className="back-icon" id="backbtn" onClick={this.fanhui}>
				        <img src="iconfont/02.png" />
				    </div>
					<div className="header-title">
					    <ul>
						    <li className="selected">
						        <Link onClick={this.xianshi} to="/detail/detailshangpin" activeClassName="active">商品</Link>
						    </li>
						    <li>
						        <Link onClick={this.yincang} to="/detail/detailxiangqing" activeClassName="active">详情</Link>
						    </li>
					    </ul>
				    </div>
				    <div className="menu" id="morebtn" onClick={this.show}>
				        <img src="iconfont/03.png" />
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
		        <section className="nav">
					{this.props.children}
				</section>
				<footer style={{display:this.state.yincang}}>
					<Link to="/" className="btn-op-icon btn-add-favour">
	                    <p className="guanzhu">
		                    <span className="favor-icon"></span>
		                    关注
		                </p>
	                </Link>
					<Link to="/cart" className="btn-op-icon btn-shopcart">
		              	<p className="gouwuche">
		              		<div className="cartbox">
		              			<em className="cart-num" id="cart-num">0</em>
			                	<span className="cart-icon"></span>
		              		</div>
			              	购物车 
			            </p>
		            </Link>
		            <Link to="/" className="btn-op btn-add-cart">
                    	加入购物车
                	</Link>
				</footer>
			</div>
		)
	}
	
	
	
	
	
}

export default Detail