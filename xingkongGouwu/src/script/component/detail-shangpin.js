import React from 'react'

import {Link,browserHistory} from 'react-router'


class Detailshangpin extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
	    	isLogin:"none",
	      	datalist:"sasas"
	    }
	}

	render() {
		return (
			<div className="m-shangpin">
		        <section className="nav">
					<div className="nav-content">
						<div className="nav-content-img">
							<img src="iconfont/02.png"/>
						</div>
						<div className="nav-content1">
							<div className="product-name-box">
				                <div className="product-name-wrapper">
				                    <span className="product-name">
				                        鸭鸭女士加绒户外冲锋衣 L
				                    </span>
				                </div>
				                <div className="product-price-wrapper">
				                    <div className="product-price">
				                        <span className="dollar">¥&nbsp;</span><i>298.00</i>
				                    </div>
				                    <div className="product-accountmoney"><span>星空金币：<i>2</i></span></div>
				                </div>
				
				                <div className="product-skuno-wrapper">
				                    <div className="product-skuno">
				                        商品编号:20325610
				                    </div>     
				                    <div className="product-vendor">
				                        <span ></span>
				                        星空自营
				                    </div>         
				                </div>
			                    <div className="product-desc-wrapper">
			                        <span className="product-desc">
			                            鸭鸭女士加绒户外冲锋衣
			                        </span>
			                    </div>
				            </div>
						</div>
					</div>
					<div className="separator"></div>
					<div className="product-promote">
		                <span className="promote-title">促销</span>
		                <div className="promote-msg">
		                    <span className="promote-item"><span className="promote-mark">首单</span>首次下单优惠30元</span>
		                    <span className="promote-item"><span className="promote-mark">立减</span>网上下单立减10元</span>
		                    <span className="promote-item"><span className="promote-mark">会员专享</span> 您的会员等级暂不享受会员折扣</span>
                		</div>
            		</div>
            		<div className="separator"></div>
            		<div className="product-box">
			            <dl className="product-spec-wrapper">
							<dt id="spec" className="product-spec-name-wrapper">
							    <span className="spectitle">规格</span>
							    <span className="specname specname-more">
							        L&nbsp;
							        <span id="amount">1件</span>
							        <em className="icon-arrow up"></em>
							    </span>
							</dt>
							<div id="specdetail" className="specdetail">
							    <div className="specitem">
								    <p className="specitem1"><span>服装尺寸</span></p>
								    <p className="specitem2">
								    	<a className="selected" href="/detail-20325610.html">L</a>
									    <a className="selected1" href="/detail-20325611.html">XL</a>
									    <a className="selected1" href="/detail-20325612.html">XXL</a>
									    <a className="selected1" href="/detail-20325613.html">M</a>
								    </p>
							    </div>
							    <div className="amount">
							        <p>数量</p>
							        <div >
							            <a className="reduceamount operation-disabled" href="javascript:void(0)">-</a>
							            <input value="1" type="text" className="productamount" id="pro_quantity" autocomplete="off"/>
							            <a className="addamount" href="javascript:void(0)">+</a>
							            <span className="limit-tips hide">（限购 10 件）</span>
							        </div>
							    </div>
							</div>
			            </dl>
			        </div>
            		<div className="separator"></div>
            		<div className="product-box box-delivery">
			            <dl className="product-spec-wrapper">
			                <dt className="product-spec-name-wrapper">
			                    <span className="spectitle">支付方式：</span>
			                    <span className="specname ">
			                        支持货到付款、在线支付
			                    </span>
			                </dt>
			            </dl>
			            <dl className="product-spec-wrapper">
			                <dt className="product-spec-name-wrapper">
			                    <span className="spectitle">配送方式：</span>
		                        <span className="specname "> 
		                        <span className="delivery-type">星空配送</span>&ensp;由&ensp;星空购物&ensp;发货并提供售后服务 </span>
			                </dt>
			            </dl>
			            <dl className="product-spec-wrapper">
			                <dt className="product-spec-name-wrapper">
			                    <span className="spectitle">运&emsp;&emsp;费：</span>
			                    <span className="specname ">
			                        包邮
			                    </span>
			                </dt>
			            </dl>
			        </div>
            		<div className="separator"></div>
            		<div className="product-box box-detail-more">
			            <a href="/Product/ProductDetailMore?skuno=20325610">
			                <dl className="product-spec-wrapper">
			                    <dt className="product-spec-name-wrapper">
			                        <span className="spectitle">商品详情</span>
			                        <em className="icon-up"></em>
			
			                    </dt>
			                </dl>
			            </a>
			        </div>
            		<div className="separator"></div>
            		<div className="product-box box-last">
			            <dl className="product-spec-wrapper">
			                <dt className="product-spec-name-wrapper">
			                    <span className="spectitle">赠&emsp;&emsp;品：</span>
			                    <span className="specname ">
			                        无
			                    </span>
			                </dt>
			            </dl>
			            <dl className="product-spec-wrapper">
			                <dt className="product-spec-name-wrapper">
			                    <span className="spectitle">包装清单：</span>
			                    <span className="specname ">
			                        "主商品名称/件数:鸭鸭加绒户外冲锋衣*1件   女款：玫红  <br/>"配件：无  <br/>赠品:无
			                    </span>
			                </dt>
			            </dl>
			            <dl className="product-spec-wrapper ">
			                <dt className="product-spec-name-wrapper">
			                    <span className="spectitle">售后服务：</span>
			                    <span className="specname ">
			                        如需退/换货请拨打热线电话：400-899-2008（手机）或800-886-2008（座机）
			                    </span>
			                </dt>
			            </dl>
			        </div>
				</section>
			</div>
		)
	}
}

export default Detailshangpin