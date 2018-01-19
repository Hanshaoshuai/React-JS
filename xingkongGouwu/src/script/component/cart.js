import React from 'react'

import {Link,browserHistory} from 'react-router'

class Cart extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      datalist:"sasas",
      isLogin:"none",
      isShow:"",
      listData:"",
      ispro:"",
      ziying:"",
      listpro:[]
    }
    this.show=this.show.bind(this)
    this.shanchu=this.shanchu.bind(this)
  }
	componentWillMount(){
		var user=localStorage.getItem("userID");
		if(user){
			this.setState({
				isShow:"none",
				isShow1:"block"
			})
		}else{
			this.setState({
				isShow:"block",
				isShow1:"none"
			})
		}
		
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
	
	shanchu(e){
		
		var keya = e.target.getAttribute("data-key");
		var arr=this.state.listpro;
		//console.log(this.state.listpro)
		arr.splice(keya,1);
		this.setState({
			listpro:arr
		})
		var goodsID = e.target.getAttribute("data-id");
		var userID = localStorage.getItem("userID");
		var number = 0;
		var data = {
			userID:userID,
			goodsID:goodsID,
			number:number
		}
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/updatecar.php",
			data:data,
			success:function(data){
				if(data == "0"){
						alert("error")
					}else{
						//location.reload() 
					}
			}
		})
	}
	
  render() {
    return (
      <div className="m-cart">
         <header>
          <div className="yo-header-ab">
          	<span className="regret_1" onClick={this.fanhui}><img src="iconfont/02.png"/></span>
            <div className="title">
	            	购物车
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
        <div className="cart-list">
        	<div className="cart-content" style={{display:this.state.isShow}}>
        		<span>您的购物车空空如也，快去装满它！</span>
        		<font>如果你已经添加过商品，登录后可查看<Link to="/login">登录</Link></font>
        	</div>
        	<div className="cart-content1" style={{display:this.state.isShow1}}>
        		<div className="null-wrapper" style={{display:this.state.ispro}}>
        			<span className="null-notice1">您的购物车空空如也，快去装满它！</span>
        			<span className="null-notice2">
        				<Link to="/home" className="login-btn">去购物</Link>
        			</span>
        		</div>
        		<div className="listpro">
        			<div className="listbox">
	        		    <div className="cart-wrapper" style={{display:this.state.ziying}}>
	        		    	<div className="cart-vendor">
	        		    		<div className="cart-vendor-name">
	        		    			<div className="vendor-checkbox-wrapper">
	        		    				<img src="iconfont/2_03.png"/>
	        		    			</div>
	        		    			<span>星空自营</span> 
	        		    		</div>
	        		    		<ul id="list">
		        		    		{this.state.listpro}
		        		    	</ul>
	        		    	</div>
	        		    </div>
	        			<div className="payment-total-bar">
				            <div className="shp-chk">
				                <span className="checkbox checked"><img src="iconfont/2_03.png"/></span>
				                <span className="cart-checkbox-text">全选</span>
				            </div>
				            <div className="shp-cart-info">
				                <strong className="shp-cart-total">
				                    合计：
				                    <span className="bottom-bar-price" id="totalPrice">¥&nbsp;398.00</span>
				                </strong>
				            </div>
				                <Link to="/cartsettlement" className="btn-right-block">
				                    去结算(<span id="totalAmount">2</span>)
				                </Link>
				        </div>
				    </div>
        		</div>
        	</div>
        </div>
      </div>
    )
  }
  	componentDidMount() {
		this.setState({
			isLogin:"none"
		})
		var user=localStorage.getItem("userID");
		if(user){
			var that=this;
			var url="http://datainfo.duapp.com/shopdata/getCar.php";
			$.ajax({url:url+"?callback=",
				data:{userID:user},
				dataType:"JSONP",
				success:function(res){
					console.log(res);
					that.setState({
						listData:res
					})
					if(res==0){
						that.setState({
							ispro:"block",
							ziying:"none"
						})
					}else{
						that.setState({
							ispro:"none",
							ziying:"block"
						})
						var liebiao=res.map(function(val,index){
						return(
							<li className="cart-item" id="li_20376810">
								<div className="checkbox-wrapper">
									<img src="iconfont/2_03.png"/>
								</div>
								<div className="cart-pro-wapper">
									<a className="cart-pro-img" href="/Product/ProductDetail?skuno=20376810">
										<Link to="/detail/detailshangpin">
											<img src={val.goodsListImg} />
										</Link>
									</a>
									<div className="cart-pro-info">
										<div className="cart-pro-name">
											<a href="/Product/ProductDetail?skuno=20376810">
												<span>{val.goodsName} </span>
											</a>
										</div> 
										<div className="cart-op"> 
											<div className="cart-pro-price">
												<span id="price_20376810">¥{val.price}</span>
											</div>
											<div className="quantity-wrapper">
												<span className="quantity-decrease quantity-decrease-disable" data-sku="20376810">-</span>
												<input type="text" className="quantity" value={val.number} size="4" id="20376810"/>
												<span className="quantity-increase" data-sku="20376810">+</span>
											</div>
										</div>
									</div>
								</div>
								<div className="cart-del">
									<div className="cart-del-wrapper" data-sku="20376810">
										<span onClick={that.shanchu} data-id={val.goodsID} data-key={index}>删除</span>
									</div>
								</div> 
							</li>
						)
					})
					}
					
					//console.log(liebiao)
					that.setState({
						listpro:liebiao
						
					})
					
				}
			});
		}
		
		
		
		
		
		
		
	}
}

export default Cart
