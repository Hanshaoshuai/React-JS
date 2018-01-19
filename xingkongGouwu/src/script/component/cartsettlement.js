import React from 'react'

import {Link,browserHistory} from 'react-router'

//import Cartcontent from './cartcontent'

class Cartsettlement extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      datalist:"sasas",
      isLogin:"none"
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
	    <div className="m-cartsettlement">
	        <header>
	        	<div className="yo-header-ab">
	          		<span className="regret_1" onClick={this.fanhui}><img src="iconfont/02.png"/></span>
		            <div className="title">
			            填写订单
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
	        
	        
	        
	        <div className="cart-section">
				<form id="orderform" method="post">
			        <div class="common-wrapper">
			            <div class="w checkout" >
			                <div class="step1 border-1px">
			                    <a class="s-href" href="">
			                        <div class="m step1-in">
			                            <div class="mt-new">
			                                <div class="s1-name">
			                                    <i></i>
			                                    <span></span>
			                                </div>
			                                <div class="s1-phone">
			                                    <i></i>
			                                    <span></span>
			                                </div>
			                            </div>
			                            <div class="mc step1-in-con"></div>
			                        </div>
			                        <b class="s1-borderT"></b>
			                        <b class="s1-borderB"></b>
			                        <span class="s-point"></span>
			                    </a>
			                </div>
			
			                
			                <div class="step3 border-1px step3-more">
			                    <a class="s-href" href="" id="productls">
			                        <div class="s-item">
			                            <div class="sitem-l">
                                            <div class="sl-img">
                                                <img src=""/>
                                            </div>
                                            <div class="sl-img">
                                                <img src=""/>
                                            </div>
                                            <div class="sl-img">
                                                <img src=""/>
                                            </div>
                                        	<div class="sitem-m"></div>
			                            </div>
			                            <div class="sitem-r">共&nbsp;7&nbsp;件</div>
			                            <span class="s-point"></span>
			                        </div>
			                    </a>
			                </div>
			
			                <div class="step2 border-1px">
			                    <div class="m s-row bdb-1px">
			                        <div class="mt-new">
			                            <label>支付方式</label>
			                            <select class="payment-select order-input" id="paymentSelect">
			                                <option value="0">- 请选择支付方式 -</option>
		                                    <option value="14">货到付款</option>
		                                    <option value="15">在线支付</option>
			                            </select>
			                        </div>
			                    </div>
			                    <div class="m s-row bdb-1px">
			                        <div class="mt-new">
			                            <label>配送方式</label>
			                            <span class="order-input">星空配送</span>
			                        </div>
			                    </div>
			                    <div class="m s-row">
			                        <div class="mt-new">
			                            <label>发票抬头</label>
			                            <input class="order-input" type="text" value="个人" name="invoicetitle" id="invoicetitle" placeholder="请输入发票抬头" />
			                        </div>
			                    </div>
			                </div>
			
			                <div class="step6 border-1px">
			                                    
			                </div>
			                <div class="step5 border-1px">
			                    <div class="s-item">
			                        <div class="sitem-l">商品金额</div>
			                        <div class="sitem-r">¥&nbsp;3011.00</div>
			                    </div>
			                    <div class="s-item">
			                        <div class="sitem-l">运&emsp;&emsp;费</div>
			                        <div class="sitem-r">¥&nbsp;0.00</div>
			                    </div>
			                    <div class="s-item">
			                        <div class="sitem-l">活动金额</div>
			                        <div class="sitem-r">-¥&nbsp;40.00</div>
			                    </div>
			                    <div class="s-item">
			                        <div class="sitem-l">折&ensp;价&ensp;券</div>
			                        <div class="sitem-r">-¥&nbsp;0.00</div>
			                    </div>
			                    <div class="s-item">
			                        <div class="sitem-l">使用金币</div>
			                        <div class="sitem-r" id="useAccountmoneyShow">-¥&nbsp;0.00</div>
			                    </div>
			                </div>
			
			                <div class="step4 border-1px" >
			                    <div class="m s-row">
			                        <div class="mt-new">
			                            <label>备&emsp;&emsp;注</label>
			                            <input class="order-input" />
			                        </div>
			                    </div>
			                </div>
			
			            </div>
			            <div ></div>
			            <div class="pay-bar">
			                <div class="payb-con">
			                    合计：<span id="totalpriceShow"> ¥&nbsp;2971.00</span>
			                </div>
			                <a class="pay-btn">提交订单</a>
			            </div>
			        </div>
			        <input type="hidden" id="transferfee" name="transferfee" value="0.00"/>
			        <input type="hidden" id="vendorId" name="vendorId" value="1"/>
			        <input type="hidden" name="addressId" id="addressId" value="0"/>
			        <input type="hidden" id="deliveryId" name="deliveryId" value="1"/>
			        <input type="hidden" id="paymentId" name="paymentId" value="0"/>
			        <input type="hidden" id="couponDiscount" name="couponDiscount" value="0"/>
			        <input type="hidden" id="useAccountmoney" name="useAccountmoney" value="0.00"/>
			        <input type="hidden" id="totalPrice" name="totalPrice" value="3011"/>
			        <input type="hidden" id="promoteDiscount" name="promoteDsicount" value="40"/>
			        <input type="hidden" name="skuStr" id="skuStr" value="20368810,20403910,20321110,20376810,20333010,20320210,"/>
			        <input type="hidden" id="usedCouponStr" name="usedCouponStr" value=""/>
			    </form>
				
				
				
				
			</div>
	        <div className="cart-list-a">
	        	<div className="cartcontent">
			        <div className="payment-total-bar">
			            <div className="shp-chk">
			                <span className="cart-checkbox-text">合计：</span>
			            </div>
			            <div className="shp-cart-info">
			                <strong className="shp-cart-total">
			                    ¥&nbsp;398.00
			                </strong>
			            </div>
		                <Link to="/" className="btn-right-block">
		                    提交订单
		                </Link>
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
	}
}

export default Cartsettlement
