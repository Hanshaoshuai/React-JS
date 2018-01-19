import React from 'react'

import { Link, browserHistory } from 'react-router'

import $ from 'jquery'

class Kindsousuolist extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
    	isLogin:"none",
      	listpro:"",
      	classID:""
    }
    this.show=this.show.bind(this)
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
  render() {
    return (
      <div className="m-kindlistchild">
       <header>
          <div className="yo-header-ab">
          	<span className="regret_1" onClick={this.fanhui}><img src="iconfont/02.png"/></span>
            <h2 className="title">
	            <span className="sousuo">
	            	<font className="link_1"><Link to="/kindsousuo">搜索商品名称或商品编号</Link></font>
	            	<font className="img1">
	            		<Link to="/kindsousuo"><img src="./iconfont/3_03.png"/></Link>
	            	</font>
            	</span>
            </h2>
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
        <div className="kind-list">
        	<div className="nav">
        		<span>综合</span>
        		<span>销量</span>
        		<span>价格<img src="./iconfont/3.png"/></span>
        		<span>上架时间</span>
        		<span>筛选</span>
        	</div>
        	<ul className="nav-list">
	        	{this.state.listpro}
	        </ul>
        </div>
    </div>
    )
  }
  componentDidMount(){
  	let classID = this.props.params.type
	console.log(classID)
	this.setState({
		classID:classID
	})
	var that=this;
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{
			classID:classID
		},
		dataType:"JSONP",
		success:function(res){
			console.log(res)
			var list= res.map(function(val){
				return 	<li>
						   <Link to="/detail">
						        <div className="product-img-wrapper">
						            <img className="lazy" src={val.goodsListImg} width="100%"/>
						        </div>
						        <div className="product-msg-wrapper">
						            <div className="productname-wrapper">
						                {val.goodsName}
						            </div>
						            <div className="product-price-wrapper">
						                <span className="product-price">
						                    ¥&ensp;<span>{val.price}</span>
						                </span>
						            </div>
						            <div className="product-skuno-wrapper">       
						                <b className="vendor-icon" ></b>
						                商品编号：<span className="product-skuno">20320210</span>
						            </div>
						        </div>
						    </Link>
						</li>
			})
			that.setState({
				listpro:list
			})
		}
	});
  }
}

export default Kindsousuolist
