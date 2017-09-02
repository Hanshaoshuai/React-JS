<template>
	<div class="banners_1">
		<div class="banner">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div v-for="item in bannerlist" class="swiper-slide" style="background-color: #0f0;">
						<img :src="item" />
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
		
		
		<!--头部导航栏-->
		<div id="header" class="head">
		    <div class="navigation">
		        <p class="navigation-back" id="return"><img src="images/dp_btn_return@2x.png" alt="" /></p>
		        <div class="navigationS">
		            <!--<div class="left">-->
		            <!--<a href=""><img src="images/dp_btn_cart-@2x.png" alt=""></a>-->
		            <!--</div>-->
		            <div class="right" id="dropDown-menu">
		                <img src="images/dp_btn_more@2x.png" alt="">
		            </div>
		        </div>
		        <div class="navigationS_1"><img src="images/dp_btn_cart-@2x.png" alt="" /></div>
		        <!--头部下拉菜单-->
		        <div class="menu" id="menu">
		            <div class="menus">
		                <div class="menuS">
		                    <div class="menuSS">
		                        <ul>
		                            <li>
		                                <div class="menuUnderline" id="information">
		                                    <div class="menuContent">
		                                        <div class="img"><img src="images/dp_nav_rightbar_message@2x.png" alt=""/></div>
		                                        <div class="text"><span>消息</span></div>
		                                    </div>
		                                </div>
		                            </li>
		                            <li>
		                                <div class="menuUnderline" id="homePage">
		                                    <div class="menuContent">
		                                        <div class="img"><img src="images/dp_nav_rightbar_home@2x.png" alt=""/></div>
		                                        <div class="text"><span>首页</span></div>
		                                    </div>
		                                </div>
		                            </li>
		                            <li>
		                                <div id="myMaiDou" class="menuUnderline" style="border: none">
		                                    <div class="menuContent">
		                                        <div class="img"><img src="images/dp_nav_rightbar_my@2x.png" alt=""/></div>
		                                        <div class="text"><span>我的麦买购</span></div>
		                                    </div>
		                                </div>
		                            </li>
		                        </ul>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		</div>
		
		
		
		<!--产品参数弹出层-->
		<div class="menu_top"></div>
		<div class="productMenus" style="height:5.1rem;">
		    <div class="menu_content">  
		        <div class="close_buttonS"><img src="images/dp_bottombar_close@2x.png" alt=""></div>
		        <div class="menu_contentTop">
		
		            <div class="left_minImg">
		                <img id="imgId" src="images/evaluateImg9@2x.png" alt=""/>
		            </div>
		
		            <div class="moneyS">
		                <ul>
		                    <li class="money_now" id="money_now">￥3060</li>
		                    <li class="Stock" id="Stock">库存2345件</li>
		                    <li class="Specifications" id="Specifications">
		                    	已选：
		                    	<!--<font></font>
		                    	<span></span>-->
		                    </li>
		                </ul>
		            </div>
		        </div>
				<div class="qqqq">
			        <div class="center1">
			            <!--<div class="colorS"><p>颜色分类</p></div>-->
			
			            <!--<div class="colorS_s">-->
			                <!--<ul class="ul_color" id="ul_scroll">-->
			                    <!--<li class="li_btn"><p>黑色 墨</p></li>-->
			                    <!--<li class="li_btn"><p>红色 墨</p></li>-->
			                    <!--<li class="li_btn"><p>黑色 墨</p></li>-->
			                    <!--<li class="li_btn"><p>黑色 墨</p></li>-->
			                    <!--<li class="li_btn"><p>黄色 墨</p></li>-->
			                <!--</ul>-->
			            <!--</div>-->
			
			        </div>
			
			        <div class="Purchase_quantity">
			            <div class="Purchase_quantityCenter">
			                <div class="text"><p>购买数量</p></div>
			                <div class="textNumber">
			                    <div id="div">
			                        <div class="li3"><img src="images/dp_bottombar_minus_bg3.png" alt=""/></div>
			                        <div class="li2">
			                            <!--<img src="images/dp_bottombar_quantity_bg.png" alt=""/>-->
			                            <span class="subtract">1</span>
			                        </div>
			                        <div class="li1"><img src="images/dp_bottombar_minus_bg1.png" alt=""/></div>
			                    </div>
			                </div>
			            </div>
			        </div>
			        <div class="Oil_card">
			            <div class="Oil_card_text">
			                <div class="Oil_card_text_1"><p>持卡人</p><input id="ka_txt" type="text" onkeyup="value=value.replace(/[\d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))" maxlength=10 name="Numbers"></div>
			                <div class="Oil_card_text_2"><p>油卡号</p><input id="oil_txt" type="text"></div>
			            </div>
			        </div>
			    </div>
		    </div>
		    <div class="Oil_card1">
		        <span class="finish1">完成</span>
		    </div>
		</div>
		
		
		
		<!--产品服务弹出层-->
		<div class="ProductService_menu"></div>
		<div class="ProductService">
		    <div class="menu_content">
		        <div class="menu_contentTop">
		            <div class="menu_topText">
		                <p>产品服务</p>
		            </div>
		            <img src="images/dp_bottombar_close@2x.png" alt="" />
		        </div>
		
		        <div class="center">
		            <!--<ul id="ul">-->
		                <!--<li id="li">
			                <div class="li_text">
				                <div class="li_img"><img src="images/ok.png" alt=""></div>
				                <div class="li_txt"><p id="name">卖家承诺24小时发货</p></div>
			                </div>
			                <div class="small_text">
				                <ul>
					                <li><p id="content1">卖家承诺24小时发货卖家承诺24小时发货卖家承诺24小时发货卖家承诺24小时发货卖家承诺24小时发货卖家承诺24小时发货</p></li>
					                <li><p id="content11">卖家承诺24小时发货卖家承诺24小时发货</p></li>
				                </ul>
			                </div>
		                </li>
		            </ul>
		            <ul>
			            <li>
				            <div class="li_text">
					            <div class="li_img"><img src="images/ok.png" alt=""></div>
					            <div class="li_txt"><p id="name2">假一赔十</p></div>
				            </div>
				            <div class="small_text">
					            <ul>
						            <li><p id="content2">卖家承诺24小时发货卖家承诺24小时发货卖家承诺24小时发货卖家承诺24小时发货卖家承诺24小时发货卖家承诺24小时发货</p></li>
						           	<li><p>卖家承诺24小时发货卖家承诺24小时发货</p></li>
					            </ul>
				            </div>
			            <!--</li>-->
		            <!--</ul>-->
		        </div>
		
		        <div  class="Oil_card">
		            <div class="Oil_card_text">
		                <p class="finish">完成</p>
		            </div>
		        </div>
		    </div>
		</div>
		
		
		
		<div id="wrapper">
		    <div id="scroller">
		        <!--头部-->
		        <header class="header">
		            <!--头部banner图-->
		            <!--<div class="center_img swipe slide" id="slide3">
		                <ul class="img swipe-wrap" id="pro_banner">
		                    <li><a href="#"><img id="bannerImg" src="images/dp_particulars_picture_1@2x.png" alt=""/></a></li>
		                    <li><a href="#"><img src="images/dp_particulars_picture_1@2x.png" alt=""/></a></li>
		                    <li><a href="#"><img src="images/dp_particulars_picture_1@2x.png" alt=""/></a></li>
		                    <li><a href="#"><img src="images/dp_particulars_picture_1@2x.png" alt=""/></a></li>
		                </ul>
		                <div class="dot">
		                    <span></span>
		                    <span></span>
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>-->
		            <!--商品描述-->
		            <div class="shop_class">
		                <div class="shop_class_S">
		                    <div class="text">
		                        <div class="text_top"><p id="description"></p></div>
		                    </div>
		                    <div class="money">
		                        <div class="moneyS">
		                            <div class="money_now"><p id="promotional_price"></p></div>
		                            <div class="money_before"><p id="cost_price"></p></div>
		                        </div>
		                    </div>
		                    <div class="options">
		                        <div class="options_S">
		                            <div class="options_Ss">
		                                <ul>
		                                	<li id="is_hot"><div class="divs"><div class="divS"><p>热卖</p></div></div></li>
		                                    <li id="is_new"><div class="divs"><div class="divS"><p>新品</p></div></div></li>
		                                    <li id="is_overseas"><div class="divs"><div class="divS"><p>海外</p></div></div></li>
		                                    <li id="is_high"><div class="divs"><div class="divS"><p>精品</p></div></div></li>
		                                    <li id="is_sales"><div class="divs"><div class="divS"><p>促销</p></div></div></li>
		                                </ul>
		                            </div>
		                        </div>
		                    </div>
		                    <div class="hint" id="brief_product_serve">
		                        <!--<div class="hint_text">
		                            <div>
		                                <div class="text">
		                                    <ul>
		                                        <li>
		                                            <div class="text_s">
		                                                <span class="text_s_left"><img src="images/ok.png" alt=""/></span>
		                                                <div class="text_s_right"><span>卖家承诺24小时发货</span></div>
		                                            </div>
		                                        </li>
		                                        <li>
		                                            <div class="text_s">
		                                                <div class="text_s_left"><img src="images/ok.png" alt=""/></div>
		                                                <div class="text_s_right"><span>假一赔十</span></div>
		                                            </div>
		                                        </li>
		                                    </ul>
		                                </div>
		                                <div class="icon"><img src="images/RightArrow_2@2x.png" alt=""></div>
		                            </div>
		                        </div>-->
		                    </div>
		                    <div class="productParameter">
		                        <div class="productParameterText">
		                            <div>
		                                <div class="text" id="productParameter"><p>产品参数</p></div>
		                                <div class="icon"><img src="images/RightArrow_2@2x.png" alt=""></div>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		
		                <div class="details">
		                    <div class="details_ico"><img src="images/dp_particulars_title@2x.png" alt=""></div>
		                </div>
		            </div>
		
		        </header>
		
		        <!--主体部分-->
		        <nav class="nav">
		            <!--商品详情部分-->
		            <div class="shop_ss">
		                <ul>
		                    <li>
		                        <div class="shop_img" id="product_content">
		                            <!--<img src="images/dp_productimage@2x.png" alt="">-->
		                        </div>
		                    </li>
		                    <!--<li>-->
		                    <!--<div class="shop_img">-->
		                    <!--<img src="images/dp_particulars_picture_2@2x.png" alt="">-->
		                    <!--</div>-->
		                    <!--</li>-->
		                    <!--<li>-->
		                    <!--<div class="shop_img">-->
		                    <!--<img src="images/dp_particulars_picture_3@2x.png" alt="">-->
		                    <!--</div>-->
		                    <!--</li>-->
		                </ul>
		            </div>
		            <!--评价部分-->
		            <div class="seckill_top">
		                <div class="seckill_img"><img src="images/evaluate_title@2x.png" alt=""></div>
		            </div>
		
		            <section class="product_box">
		                <!--<div class="product_top">-->
		                <!--<div class="product_userinfo">-->
		                <!--<div class="product_userinfo_left">-->
		                <!--<div class="userinfo_leftOne"><img id="usrlogo" src="images/evaluate_avatar@2x.png" alt=""></div>-->
		                <!--<div class="userinfo_leftTwo"><p id="product_comment_phone">181****4789</p></div>-->
		                <!--<div class="userinfo_leftThree">-->
		                <!--<img src="images/dp_evaluate_vip@2x.png" alt="">-->
		                <!--</div>-->
		                <!--</div>-->
		                <!--<div class="product_userinfo_right"><p id="product_comment_ctime">2017-3-31</p></div>-->
		                <!--</div>-->
		                <!--</div>-->
		                <!--<div class="product_bottom">-->
		                <!--<ul>-->
		                <!--<li>-->
		                <!--<div class="evaluateStar">-->
		                <!--<ul class="evaluateStarS" id="appendLi">-->
		                <!--&lt;!&ndash;<li><img src="images/evaluate_star_h@2x.png" alt=""></li>&ndash;&gt;-->
		                <!--&lt;!&ndash;<li><img src="images/evaluate_star_h@2x.png" alt=""></li>&ndash;&gt;-->
		                <!--&lt;!&ndash;<li><img src="images/evaluate_star_h@2x.png" alt=""></li>&ndash;&gt;-->
		                <!--&lt;!&ndash;<li><img src="images/evaluate_star_h2@2x.png" alt=""></li>&ndash;&gt;-->
		                <!--&lt;!&ndash;<li><img src="images/evaluate_star@2x.png" alt=""></li>&ndash;&gt;-->
		                <!--</ul>-->
		                <!--</div>-->
		                <!--</li>-->
		                <!--<li>-->
		                <!--<div class="evaluateContent">-->
		                <!--<div class="evaluateText">-->
		                <!--<p id="product_comment_centent">我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		                <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		                <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		                <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		                <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		                <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		                <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		                <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		                <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		                <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		                <!--</p>-->
		                <!--</div>-->
		
		                <!--<div class="evaluateImg">-->
		                <!--<ul id="product_comment_img">-->
		                <!--<li><img src="images/evaluateImg9@2x.png" alt=""></li>-->
		                <!--<li><img src="images/evaluateImg9@2x.png" alt=""></li>-->
		                <!--<li><img src="images/evaluateImg9@2x.png" alt=""></li>-->
		                <!--</ul>-->
		                <!--</div>-->
		                <!--<div class="commodityParameters">-->
		                <!--<div class="commodityParameters_text"><p id="product_name">浪莎纯棉被套单件秋冬纯棉被套1.8m床双人浪莎纯棉被套单件秋冬纯棉被套1.8m床双人</p></div>-->
		                <!--<div class="commodityParameters_time">-->
		                <!--<p id="product_update_time">购买日期：2017-3.31</p>-->
		                <!--<div class="commodityParameters_imgText"><img src="images/dp_evaluate_like@2x.png" alt=""><p id="number">77</p></div>-->
		                <!--</div>-->
		                <!--</div>-->
		                <!--</div>-->
		                <!--</li>-->
		                <!--</ul>-->
		                <!--</div>-->
		            </section>
		
		            <!--<section class="product_box">-->
		            <!--<div class="product_top">-->
		            <!--<div class="product_userinfo">-->
		            <!--<div class="product_userinfo_left">-->
		            <!--<div class="userinfo_leftOne"><img src="images/evaluate_avatar@2x.png" alt=""></div>-->
		            <!--<div class="userinfo_leftTwo"><p>181****4789</p></div>-->
		            <!--<div class="userinfo_leftThree">-->
		            <!--<img src="images/dp_evaluate_vip@2x.png" alt="">-->
		            <!--</div>-->
		            <!--</div>-->
		            <!--<div class="product_userinfo_right"><p>2017-3-31</p></div>-->
		            <!--</div>-->
		            <!--</div>-->
		            <!--<div class="product_bottom">-->
		            <!--<ul>-->
		            <!--<li>-->
		            <!--<div class="evaluateStar">-->
		            <!--<ul class="evaluateStarS">-->
		            <!--<li><img src="images/evaluate_star_h@2x.png" alt=""></li>-->
		            <!--<li><img src="images/evaluate_star_h@2x.png" alt=""></li>-->
		            <!--<li><img src="images/evaluate_star_h@2x.png" alt=""></li>-->
		            <!--<li><img src="images/evaluate_star_h2@2x.png" alt=""></li>-->
		            <!--<li><img src="images/evaluate_star@2x.png" alt=""></li>-->
		            <!--</ul>-->
		            <!--</div>-->
		            <!--</li>-->
		            <!--<li>-->
		            <!--<div class="evaluateContent">-->
		            <!--<div class="evaluateText">-->
		            <!--<p>我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者
		            我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者
		            我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者
		            我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者
		            我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者
		            我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者
		            我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者
		            我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者
		            我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者
		            我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者
		            </p>-->
		            <!--</div>-->
		
		            <!--<div class="evaluateImg">-->
		            <!--<ul>-->
		            <!--<li><img src="images/evaluateImg9@2x.png" alt=""></li>-->
		            <!--<li><img src="images/evaluateImg9@2x.png" alt=""></li>-->
		            <!--<li><img src="images/evaluateImg9@2x.png" alt=""></li>-->
		            <!--</ul>-->
		            <!--</div>-->
		            <!--<div class="commodityParameters">-->
		            <!--<div class="commodityParameters_text"><p>浪莎纯棉被套单件秋冬纯棉被套1.8m床双人浪莎纯棉被套单件秋冬纯棉被套1.8m床双人</p></div>-->
		            <!--<div class="commodityParameters_time">-->
		            <!--<p>购买日期：2017-3.31</p>-->
		            <!--<div class="commodityParameters_imgText"><img src="images/dp_evaluate_like@2x.png" alt=""><p>77</p></div>-->
		            <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		            <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		            <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		            <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		            <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		            <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		            <!--我能想象当天下午她乘坐那趟开得又慢又久的火车回纽约时，是什么样子。她肯定坐在那里直直地盯着前面，或者-->
		            <!--</div>-->
		            <!--</div>-->
		            <!--</div>-->
		            <!--</li>-->
		            <!--</ul>-->
		            <!--</div>-->
		            <!--</section>-->
		        </nav>
		    </div>
		</div>
		
		
		
		
		<!--底部-->
		<footer id="footer" class="footer">
		    <ul class="footer_ul">
		        <div class="footer_left">
		            <li id="shoppingCart">
		                <a style="text-decoration:none;">
		                    <div class="num"><span id="nm">0</span></div>
		                    <div class="imgs">
		                        <div class="radius"><p>1</p></div>
		                        <img src="images/dp_tab_btn_shoppingcart@2x.png" alt=""/>
		                    </div>
		                    <div class="txt"><div class="txts"><p>购物车</p></div></div>
		                </a>
		            </li>
		            <li id="collect">
		                <a style="text-decoration:none;">
		                    <div class="imgs" id="collectImg"><img src="images/evaluate_star@2x.png" alt=""/></div>
		                    <div class="txt"><div class="txts"><p>收藏</p></div></div>
		                </a>
		            </li>
		        </div>
		        <div class="footer_right">
		        	<input type="hidden" data="" id="product_attr_data" />
		            <li id="addShoppingCart"><a style="text-decoration:none;"><div class="join"><p>加入购物车</p></div></a></li>
		            <!--<li id="nowBuy" style="background: #c11920;"><a><div class="join"><p>立即购买</p></div></a></li>-->
		        </div>
		    </ul>
		    
		    
		    <span id="ball" class="box">
					1
			</span>
		    
		    
		</footer>
		<div class="loding" style="position: fixed;z-index: 999; top: 0;right: 0;bottom: 0;left: 0;background-color: rgba(0,0,0,0.2);display: block;">
		    <div class="loadEffect">
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
			</div>	
		</div>
		<div id="loding" style="position: absolute;z-index: 999; top: 0;right: 0;bottom: 0;left: 0;background-color: rgba(0,0,0,0.2);display: none;">
		    <div id="loadEffect">
		        <span>您好我们的提现日期为每星期的 周三早上: 12:00——21:00</span>
			</div>	
		</div>
		<!--/*购物车动画*/-->
		<div class="m-sidebar">
			<div class="cart"> <i id="end"></i></div>
		</div>
		
		
	</div>
</template>

<script>
//	import {myfun} from '../../js/index.js' //注意路径
//	import Myfun from '../../js/index.js' //注意路径
//	import Myfun_0 from '../../js/imageEnlarge.js' //注意路径
//	import Myfun_1 from '../../js/productMenu.js' //注意路径
	export default {
		
		data () {
			return {
				searchURL:window.location.href,
				url_arr:"",
				ids:"",
				token:"",
				bannerlist:""
			}
		},
		methods:{
			tuichu () {
//				console.log(localStorage.getItem("userID"))
				if(localStorage.getItem("userID")){
					localStorage.setItem("userID",this.userID);
					window.location.href = "#/login";
					alert("你已成功退出登录。。")
				}
			}
		},
		mounted () {
			var sss;
			var yanse="";            //颜色
			var chicun="";           //尺寸
			var fengge="";           //风格
			var fangshui="";         //防水
			var ganxi="";            //干洗
			var zidong="";           //自动
			
			
			
			var yanse_0="";          //颜色字
			var chicun_0="";         //尺寸字
			var attr_id_1="";        //颜色ID
			var attr_id_2="";        //尺寸ID
			var attr_id_3="";        //风格ID
			var attr_id_4="";        //其他ID
			var attr_id_5="";        //其他ID
			var attr_id_6="";        //其他ID
			var arr={};
			var canpin="";           //产品种类参数
			var canpin_1="";           //产品种类参数
			var roductattribute="";  //产品有规格
			var obj=[];              //颜色ID  尺寸ID   风格ID  其他ID
			var keys=[];             //产品种类参数class值
			
			
			
			/**
			 * Created by Administrator on 2017/4/10.
			 */
			$('.evaluateImg').on('tap', function () {
			    //$("ul#test").on("click","li",function(){      //只需要找到你点击的是哪个ul里面的就行
			    //
			    //    alert($(this).text());
			    //});
			
			    //$("#showImg").width(2* $("#img_xx").width()); //放大2倍
			    //$("#showImg").height(2* $("#img_xx").height());
			    //
			    //$("#showImg").show();
			
			
			    $('img',$(this)).css(width='100%', height='100%');
			    //alert(33)
			});
			
			
			
			//公共弹框提示；
			function tanchu(){
				$(".loding").css({"display":"block"}).click(function tiaozhuan(){this.style.display="none";window.location.go(-1)});
			}
			
			
			this.searchURL=this.searchURL.substring(1, this.searchURL.length)
			this.url_arr=this.searchURL.split("&")
			if(this.url_arr.length>=1){
				this.ids = this.searchURL.split("?")[2].split("=")[1];
				this.ids=this.ids.split("&")[0];
			}else{
				this.ids = 1;
			}
			if(this.url_arr.length>=2){
				this.user_id = this.searchURL.split("&")[1].split("=")[1];
			}else{
				this.user_id = 0;
			}
			
			if(this.url_arr.length>=3){
				this.token = this.searchURL.split("&")[2].split("=")[1];
			}else{
				this.token = "";
			}
			
			const url = "http://121.196.218.57/index.php/api/Product/getProduct/?id="+this.ids;
	        console.log(this.ids);
	        var ids=this.ids;
	        var user_id=this.user_id;
	        var token=this.token;
	        
	        
	        if(this.ids=="0"){
				$(".loding").html(
					'<div style="width:2.5rem;height:1.3rem;background:#fff;margin:0 auto;margin-top:2rem;font-size:0.16rem;text-align:center;position:relative;">'+
					'<font style="width:2rem;height:0.5rem;margin:auto;top:0;bottom:0;left:0;right:0;line-height:0.2rem;position:absolute;">五一期间积分限时送，惊喜不断！赶快去逛逛！</font></div>'
				);
				tanchu();
				window.setTimeout(function(){
					$(".loding").css({"display":"none"})
					window.location.go(-1);
				},4000);
			}else{
		        this.$http({
					method:'GET',
	                url:url  //this指data
	//              data:{
	//		            "id":this.ids,
	//					"user_id":this.user_id,
	//					"token":this.token
	//		        }
				}).then(function(data){
					console.log(data.body.data.product);
					var data = data.body.data.product.list_img;
					data=data.split(",")
					var arr = [];
					for(var i=0; i<data.length-1; i++){
						arr.push("http://onlzmxmxz.bkt.clouddn.com/"+data[i]);
					}
					console.log(arr)
					this.bannerlist = arr;
	//				console.log(this.bannerlist)
				},function(err){
					console.log(err)
				})
				
				
				
				
				$.ajax({
			        url: "http://121.196.218.57/index.php/api/Product/getProduct/?",
			        type: "get",
			        async: true,
			        dataType:"json",    //跨域json请求一定是jsonp
			        //跨域请求的参数名，默认是callback
			        data: {
			            id:this.ids,
						user_id:this.user_id,
						token:this.token
			        },
			        success: function(data) {
			            //alert('请求成功');
			                console.log(data.data);
			            //banner
			            var banner=data.data.product.list_img;
			            //console.log(banner);
			            var bannerS = banner.split(",");
			            for(var i = 0 ;i<bannerS.length;i++)
			            {
			                if(bannerS[i] == "" || typeof(bannerS[i]) == "undefined")
			                {
			                    bannerS.splice(i,1);
			                    i= i-1;
			                }
			
			            }
			            //console.log(bannerS);
			            var banner_img=bannerS.length;
			            //console.log(banner_img);
			            //动态追加li节点
			            for(var i=0;i<banner_img;i++){
			                var bannerImg="list_img"+(i+1);
			                var pro_bannerS=
			                    '<li><a href="#"><img id="'+bannerImg+ '" src= "'+'http://onlzmxmxz.bkt.clouddn.com/'+bannerS[i]+'" /></a></li>';
			                $(pro_bannerS).appendTo('#pro_banner');
			
			            }
			            //轮播图下面的小圆点
			            for(var i=1; i<=banner_img;i++){
			                var raduirs =
			                    '<span></span>';
			                $(raduirs).appendTo('.dot');
			            }
			            //轮播图 当ajax请求完成后，再调用swipeSlide插件，避免当动态追加节点时不能轮播及滑动
			            $('#slide3').swipeSlide({
			                //observer:true,
			                continuousScroll:true,
			                speed : 3000,
			                transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
			                firstCallback : function(i,sum,me){
			                    me.find('.dot').children().first().addClass('cur');
			                },
			                callback : function(i,sum,me){
			                    me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
			                }
			            });
			
			
			
			
			            //产品描述
			            $('#description').html(data.data.product.name);
						console.log(data.data.product);
			            //判断是否为3060产品，分别加上￥或“麦豆”
			            if(data.data.product.product_type==3 || data.data.product.product_type==5){
			            	canpin=data.data.product.product_type;                 //3060产品赋值；
			            	canpin_1=data.data.product.is_owner_info;                 //3060产品赋值；
			                var price_text = "<span style='font-size: 0.17rem;'>￥</span>";
			            }else{
			                var price_text = "<span style='font-size: 0.196rem;'>麦豆</span>";
			            }
			            price_text += data.data.product.sell_price;
			            $('#promotional_price').html(price_text);
			
			            //市场价
			            var cost_price = "<span style='font-size: 0.14rem;'>市场价:</span>"
			            if(data.data.product.cost_price!=="0.00"){
			            	cost_price += "<span style='font-size: 0.147rem;'>￥"+data.data.product.cost_price+"</span>";
			            }else{
			            	cost_price = "<span style='font-size: 0.14rem;'></span>"
			            }
			            $('#cost_price').html(cost_price);
			
			            //产品所属类型
			            if(data.data.product.is_hot == 0){
			                $("#is_hot").remove();
			            }
			            if(data.data.product.is_new == 0){
			                $("#is_new").remove();
			            }
			            if(data.data.product.is_overseas == 0){
			                $("#is_overseas").remove();
			            };
			            if(data.data.product.is_high == 0){
			                $("#is_high").remove();
			            };
			            if(data.data.product.is_sales == 0){
			                $("#is_sales").remove();
			            };
			
			            //产品详情 __及参数列表
			              console.log(data.data.product);
			            
			            
			            
			            $('#product_content').html(data.data.product.content);
			            //console.log(product_content);
			            $("#product_content").find("img").each(function () {
			                var height = $(this).height();
			                var width = $(this).width();
			                if (height != width) {
			//                  $(this).css('height', '100%');//如果高度不等于宽度给高度赋值100vw
			                    $(this).css('width', '100%');
			                }
			            });
			
			
			            //卖家承诺(服务)弹出层
			              console.log(data.data.product.product_serve);
			            if(!data.data.product.product_serve){
			                //判断如果product_serv没有值，则删除 .center  节点
			                $(".center").remove();
			            }else {
			                var dat=data.data.product.product_serve;
			                var leng=dat.length;
			                //动态追加li节点 并替换值
			                for(var i=0;i<leng;i++){
			                    var linameid='#'+"name"+(i+1);
			                    var licontentid='#'+"content"+(i+1);
			                    var htl=
			                    	'<ul id="ul">'+
			                        ' <li id="li">'+
			                        '<div class="li_text">'+
			                        ' <div class="li_img"><img src="images/ok.png" alt=""></div>'+
			                        ' <div class="li_txt"><p id='+linameid+""+'>'+dat[i].name+'</p></div>'+
			                        '  </div>'+
			                        '<div class="small_text">'+
			                        '<ul>'+
			                        '<li><p id='+licontentid+""+'>'+dat[i].content+'</p></li>'+
			                        ' </ul>'+
			                        '</div>'+
			                        '</li>'+
			                        '</ul>';
			                    $(htl).appendTo('.center');
			                    console.log(htl);
			                }
							
							//商品服务详情页面展示
							var brief_product_serve_html = 
									'<div class="hint_text">'+
			                            '<div>'+
			                            '<div class="text" ><ul>';
										for(var g in dat){
											brief_product_serve_html += '<li><div class="text_s"><span class="text_s_left"><img src="images/ok.png" alt=""/></span><div class="text_s_right"><span>'+dat[g]['name']+'</span></div></div></li>';
										}
			                            brief_product_serve_html +='</ul></div>'+
			                            '<div class="icon"><img src="images/RightArrow_2@2x.png" alt=""></div>'+
			                            '</div>'+
			                        '</div>';
							console.log(brief_product_serve_html);
							$(brief_product_serve_html).appendTo("#brief_product_serve");
			            }
			
			            //产品参数弹出层
			            //缩略图
						
			            var path = data.data.product.product_img;
						//console.log(data.data);
			            $("#imgId").attr('src',path);
			
			            //销售价----判断是否为3060产品，分别加上￥或“麦豆”
			            if(data.data.product.is_owner_info==1){
			                var price_text = "<span style='font-size: 0.17rem;'>￥</span>";
			                price_text += data.data.product.sell_price;
			            	$('#money_now').html(price_text);
			                //当用户购买的是3060产品时，显示输入油卡
			                $('.Oil_card').show();
			            }else{
				            if(data.data.product.product_type==0 || data.data.product.product_type==1){
				                var price_text = "<span style='font-size: 0.17rem;'>麦豆</span>";
				                price_text += data.data.product.sell_price;
				            	$('#money_now').html(price_text);
				            }
			            }
			
			            //库存
			            var stock = '库存' + data.data.product.stock + '件';
			            $('#Stock').html(stock);
			
			            //颜色分类-尺寸
			            //console.log(data.data.product.stock);
			            roductattribute =data.data.product.roductattribute;     //判断产品是否有规格
			//          console.log(roductattribute);
			            
			            if(roductattribute.length==0){
			            	$(".menu_contentTop").css({"border":"none"});
			            	$(".center1").css({"display":"none"});
			            }else{
				            console.log(roductattribute);
				            var texfont="";
				            for(var z in roductattribute){
				            	texfont+='<font id='+z+'>“'+roductattribute[z]["attr_value_list"][0]['attr_value_name']+'”</font>'  //动态添加   默认颜色//默认尺寸
				            }
				            $(texfont).appendTo('#Specifications');
				            
				            
				            //遍历颜色和尺寸动态添加
				            var htlDiv= "";
				
				            for(var i in roductattribute){
				                htlDiv +=
				                    '<div class="colorS" id="'+roductattribute[i]['attr_id']+'"><p>'+roductattribute[i]['attr_name']+'</p></div>'+
				                    '<div class="colorS_s">'+
				                    '<ul class="ul_color" id="ul_scroll'+ i + '" data-ul="ul'+i+'" attr_id="'+roductattribute[i]['attr_id']+'">';
				                var attr_value_list = roductattribute[i]['attr_value_list'];
				                var htl_li = "";
				                for(var j in attr_value_list){
				                    htl_li +=  '<li class="li_btn'+i+'" id_data='+attr_value_list[j].p_attr_v_id+'  id='+attr_value_list[j].attr_value_id+'><p>'+attr_value_list[j].attr_value_name+'</p></li>';
				                }
				                htlDiv += htl_li+
				                '</ul>'+
				                '</div>'+
				                '</div>';
				//              console.log(roductattribute);
				            }
				//          $(".colorS li")[0].setAttribute("class","another")
				            console.log(htlDiv);
				            $(htlDiv).appendTo('.center1');
				            
				            
				            //用户点击颜色分类
				            var p=0;
				            for(var q in roductattribute){
				            	$(".ul_color .li_btn"+q)[0].setAttribute("class","another li_btn"+q);    //默认颜色添加背景  //默认尺寸添加背景
				            	keys[p]=q;
				            	p++;
				            }
				            
				            var ul_colors=$(".ul_color");				  //规格参数父级DOM元素
				            var li_btn1=$('#Specifications font');        //已选的规格参数DOM元素
				            var s=0;
				            var y=0;
				            for(s; s<ul_colors.length; s++){
				            	ul_colors[s].setAttribute("index",s);
				            	$(ul_colors[s]).children().on('touchend',function(){
				            		var k=$(this).parent("ul").attr("index")
				            		y=this.setAttribute("index",s);
				            		$(this).siblings(y).removeClass('another');       //当点击其他li的时候 删除其他兄弟元素的样式
				                	$(this).addClass("another");                      //为当前点击的li添加样式
				                	li_btn1[k].innerHTML="“"+$(this).text()+"”";      //规格添加
				            		console.log(s)
				            	})
				            }
						}
			            
			
			            //购买数量
			//          $('.subtract').text(data.data.product.stock);
			            if(data.data.product.stock==0){
			                $(".ul_color").find("li").each(function () {
			                    //alert(data.data.product.visit);
			                    //当库存为0时为其设置样式及移除绑定点击事件的类
			                    $(".li_btn").unbind();
			                    $(".ul_color li").addClass("another_visit");
			                });
			            }
			
						//购物车数量
						
						if(data.data.cart_num!==0){
			                $("#shoppingCart").find(".num").find("span").html(data.data.cart_num);
			                $(".num").css({"display":"block"});
			            }else{
			            	$(".num").css({"display":"none"});
			            }
			//          console.log(data.data.cart_num)
			
			            //评论部分
			            //console.log(data.data.product_comment[0].ok_num);
			            var pro=data.data.product_comment;
			//            console.log(pro);
			            var pro_leng=pro.length;
			            //动态追加li节点 并替换值
			            for(var i=0;i<pro_leng;i++) {
			                var pro_usrlogo ="usrlogo" + (i + 1);
			                var pro_phone = "phone" + (i + 1);
			                var pro_ctime = "ctime" + (i + 1);
			                var pro_comment = "comment" + (i + 1);
			                var pro_centent = "centent" + (i + 1);
			                var pro_img1 = "img" + 1;
			                var pro_img2 = "img" + 2;
			                var pro_img3 = "img" + 3;
			                var pro_name = "pro_name" + (i + 1);
			                var pro_otime = "pro_otime" + (i + 1);
			                var product_all = '<div class="product_top">' +
			                    '<div class="product_userinfo">' +
			                    '<div class="product_userinfo_left">' +
			                    '<div class="userinfo_leftOne"><img id="'+pro_usrlogo+ '" src= "'+pro[i].usrlogo+'" ></div>' +
			                    '<div class="userinfo_leftTwo"><p id="product_comment_phone">'+pro[i].phone+'</p></div>' +
			                    '<div class="userinfo_leftThree">' +
			                    '<img src="images/dp_evaluate_vip@2x.png" alt="">' +
			                    '</div>' +
			                    '</div>' +
			                    '<div class="product_userinfo_right"><p id="product_comment_ctime">'+pro[i].ctime+'</p></div>' +
			                    '</div>' +
			                    '<div class="kong">' +
			                    '</div>' +
			                    '</div>' +
			                    '<div class="product_bottom">' +
			                    '<ul>' +
			                    '<li>' +
			                    '<div class="evaluateStar">' +
			                    '<ul class="evaluateStarS" id="appendLi">' +
			                    '</ul>' +
			                    '</div>' +
			                    '</li>' +
			                    '<li>' +
			                    '<div class="evaluateContent">' +
			                    '<div class="evaluateText">' +
			                    '<p id="product_comment_centent">' +pro[i].centent +
			                    '</p>' +
			                    '</div>' +
			                    '<div class="evaluateImg">' +
			                    '<ul id="product_comment_img">' +
			                    '<li><img id="'+pro_img1+ '" src= "'+pro[i].img1+'" ></li>' +
			                    '<li><img id="'+pro_img2+ '" src= "'+pro[i].img2+'" ></li>' +
			                    '<li><img id="'+pro_img3+ '" src= "'+pro[i].img3+'" ></li>' +
			                    '</ul>' +
			                    '</div>' +
			                    '<div class="commodityParameters">' +
			                    '<div class="commodityParameters_text"><p id="product_name">'+pro[i].product_name +'</p></div>' +
			                    '<div class="commodityParameters_time">' +
			                    '<p id="product_update_time"> '+'购买日期：'+ pro[i].otime +'</p>'+
			                    '<div class="commodityParameters_imgText"><img class="Img" src="images/dp_evaluate_like@2x.png" alt=""><p id="number">77</p></div>' +
			                    '</div>' +
			                    '</div>' +
			                    '</div>' +
			                    '</li>' +
			                    '</ul>' +
			                    '</div>';
			                $(product_all).appendTo('.product_box');
			
			            }
			           	var tds = $(".commodityParameters_imgText img");
			            tds.on('touchend', function () {
			               //console.log( $('.Img').attr('src'));
			               //$k = $(this).prop('ddd');
			                if($('.Img').attr('src')=="images/dp_evaluate_like@2x.png"){
			                    alert(0)
			                    //$('.Img').src="images/dp_evaluate_like_h@2x.png";
			                    $(this).attr("src", "images/dp_evaluate_like_h@2x.png");
			                    //$(this).addClass('ddd');
			                }else{
			                    alert(1)
			
			                    //$('.Img').src="images/dp_evaluate_like@2x.png";
			                    $(this).attr("src", "images/dp_evaluate_like@2x.png");
			                    //$(this).removeClass('ddd');
			                    return $('.Img').attr('src');
			                }
			            });
			
			
			
			            ////买家头像
			            console.log(data.data.product_comment);
			            if(data.data.product_comment==false){
			            	
			            }else{
				            $("#usrlogo").attr('src',data.data.product_comment[0].usrlogo);
				            //
				            ////买家手机号
				            $('#product_comment_phone').html( data.data.product_comment[0].phone);
				            ////买家评论时间
				            $('#product_comment_ctime').html( data.data.product_comment[0].ctime);
				            ////好评等级
				            if(data.data.product_comment[0].comment==1){
				                var appendLi = '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>' +
				                    '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>' +
				                    '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>' +
				                    '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>' +
				                    '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>';
				                $(appendLi).appendTo('#appendLi');
				
				            }else {
				               
				            };
				            ////评论内容部分
				            $('#product_comment_centent').html( data.data.product_comment[0].centent);
				            //评论部分买家上传的图片
				              $('#product_comment_img li img').html( data.data.product_comment[0].img1);
				            $("#product_comment_img li:nth-child(1) img").attr ("src", data.data.product_comment[0].img1);
				            $("#product_comment_img li:nth-child(2) img").attr ("src", data.data.product_comment[0].img2);
				            $("#product_comment_img li:nth-child(3) img").attr ("src", data.data.product_comment[0].img3);
				
				            //商品名称
				            $('#product_name').html(data.data.product_comment[0].product_name);
				
				            //评价时间
				            var update_time = '购买日期：' + data.data.product_comment[0].otime;
				            $('#product_update_time').html(update_time);
				        }
			            
			            
			            //判断图片加载完再执行IScroll；
			            var t_img; // 定时器
						var isLoad = true; // 控制变量
						
						// 判断图片加载状况，加载完成后回调
						isImgLoad(function(){
//							loaded ();
							$('.loding').css({"display":"none"});
							$('.loadEffect').removeClass('loadEffect');
						    // 加载完成
						});
						
						// 判断图片加载的函数
						function isImgLoad(callback){
						    // 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
						    // 查找所有封面图，迭代处理
						    $('img').each(function(){
						        // 找到为0就将isLoad设为false，并退出each
						        if(this.height === 0){
						            isLoad = false;
						            return false;
						        }
						    });
						    // 为true，没有发现为0的。加载完毕
						    if(isLoad){
						        clearTimeout(t_img); // 清除定时器
						        // 回调函数
						        callback();
						    // 为false，因为找到了没有加载完成的图，将调用定时器递归
						    }else{
						        isLoad = true;
						        t_img = setTimeout(function(){
						            isImgLoad(callback); // 递归扫描
						        },500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
						    }
						}
//						function loaded () {
//							var myScroll;
//							setTimeout(function(){
//								myScroll = new IScroll('#wrapper', { scrollX: true, freeScroll: true });
//							},300);
//				        }
						
			        }
			    });
			    
			    
			    
			    
			    //index.js;
				//公共弹框提示；
				function tanchu(){
					$("#loding").css({"display":"block"})
					$("#loding").on('touchend', function tiaozhuan(){this.style.display="none"});
				}
				
				
				
				$("#oil_txt").on("input", function(){	            //卡号输入判断
					if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/)){
						this.value="";
						alert('输入格式不正确')
					}
				});
				
				
				
				//头部返回按钮
				$('#return').on('touchend', function retur() {
				    window.history.go(-1);
//				    window.location.href = 'native://retur';
				
				});
				//点击显示导航栏遮罩层
				headerNavigation:$('.right').on('touchend', function () {
				    $('.menu').show();
				});
				//导航栏左部购物车
				$('.navigationS_1').on('touchend', function () {
					window.location.href = '#/cart';
				});
				//消息
				$('#information').on('touchend', function information() {
				    $('.menu').hide();
				    //window.ButtonEvent.messageBtnEvent();
				    window.location.href = 'native://information';
				    //alert(0);
				});
				//首页
				$('#homePage').on('touchend', function homePage() {
				    $('.menu').hide();
				    //window.ButtonEvent.homeBtnEvent();
				    window.location.href = '#/home';
				    //alert(1);
				});
				//我的麦买购
				$('#myMaiDou').on('touchend', function myMaiDou() {
				    $('.menu').hide();
				    //window.webkit.messageHandlers.myMaiDou.postMessage('ddddd');
				    //window.ButtonEvent.myInfoBtnEvent();
				    window.location.href = 'native://myMaiDou';
				
				    //alert(2);
				});
				
				
				//实现触摸div以外的任何位置隐藏该div
				$(document).on('touchstart', function(e) {
				    var e = e || window.event; //浏览器兼容性
				    var elem = e.target || e.srcElement;
				    while (elem) { //循环判断至跟节点，防止点击的是div子元素
				        if (elem.id && elem.id == 'menu') {
				            return;
				        }
				        elem = elem.parentNode;
				    }
				    $('#menu').css('display', 'none'); //点击的不是div或其子元素
				});
				
				
				
				//评论部分
				var lag = 1;
				commodityParameters_imgText:$('.commodityParameters_imgText').on('tap', function () {
				    //替换样式
				    $("img",$(this)).attr("src", "images/dp_evaluate_like_h@2x.png");
				
				    //将取出的字符串转为数值类型并做加减运算
				    var txt = parseInt($('#number').text());
				    txts = txt + 1;
				    //console.log(txts);
				    $('#number').text(txts);
				    lag = 0;
				    if(lag==0){
				        //移除on绑定的tap事件
				        $('.commodityParameters_imgText').off('tap');
				    }
				});
				
				//底部
				//购物车
				$('#shoppingCart').on('click', function  shoppingCart() {
				    //alert(0);
				    //window.ButtonEvent.marketBtnCarEvent('kkk');
				    window.location.href = '#/cart';
				});
				
				//收藏--替换收藏按钮的样式
				//if(localStorage.getItem("userID")){
				//	$("#collect img").attr("src","images/dp_tab_collect_star_h@2x.png");
				//}
				//else{
				//	$("#collect img").attr("src","images/evaluate_star@2x.png");
				//}
				$(document).ready(function(){
				    $("#collect").on('touchend',function collect(){
				//  	if(localStorage.getItem("userID")){
				//			$("#collect img").attr("src","images/evaluate_star@2x.png");
				//			localStorage.removeItem("userID")
				//		}else{
				//			localStorage.setItem("userID",ids);
				//			$("#collect img").attr("src","images/dp_tab_collect_star_h@2x.png");
				//		}
				        if($('#collect img').attr('src')=="images/evaluate_star@2x.png")
				        {	
				            $("#collect img").attr("src","images/dp_tab_collect_star_h@2x.png");
				        }
				        else
				        {
				            $("#collect img").attr("src","images/evaluate_star@2x.png");
				        }
				        //$("#p1").toggle();
				        window.location.href='native://collect';
				        
				    });
				});
				
				
				//移动端fixed和input获取焦点软键盘弹出影响定位或遮住input的问题
				var ua = window.navigator.userAgent.toLowerCase();
				if(ua.indexOf("android")!=-1){
					$("input,textarea").focus(function() {
					var loaclHeight = $(".productMenus").height();//获取可视高度
					var keyboardHeight = loaclHeight - $(".productMenus").height();//获取键盘的高度
					var keyboardY = loaclHeight - keyboardHeight;
					var addBottom = (parseInt($(this).position().top) + parseInt($(this).height()));//文本域的底部
					var offset = addBottom - keyboardY;//计算上滑的距离
					$(".productMenus").scrollTop(offset);
					});
				//	$("#ka_txt").focus(function (){
				//		if(document.activeElement.nodeName == 'INPUT'){
				//		    $(".Oil_card1").css({"position":"static"});
				//		    $(".menu_content").css({"position":"static"});
				//		}
				//	});
				//	$("#oil_txt").focus(function (){
				//		if(document.activeElement.nodeName == 'INPUT'){
				//		    $(".Oil_card1").css({"position":"static"});
				//		    $(".menu_content").css({"position":"static"});
				//		}
				//	});
				//	$("#oil_txt").blur(function (){
				//		$(".Oil_card1").css({"position":"fixed"});
				//		$(".menu_content").css({"position":"fixed"});
				//	});
				//	$("#ka_txt").blur(function (){
				//		$(".Oil_card1").css({"position":"fixed"});
				//		$(".menu_content").css({"position":"fixed"});
				//	});
				}
				
				
				
				//加入购物车
				//var j = 0;
				var hosturl="192.168.10.100";
				$('#addShoppingCart').on('click', function addShoppingCart(){
					var data="";
				//	if(roductattribute.length!==0){
						$(".Oil_card1").addClass("Oil_card3");       //遮罩层添加类名
					// 	$('.Oil_card1').attr({"id":"Oil_card1"});     //遮罩层添加id
					   	$(".Oil_card1").removeClass("Oil_card2");
					    //点击显示产品参数遮罩层
					    $('.menu_top').show();
					    $('.productMenus').show();
					      //禁止遮罩层以下屏幕滑动
					    $("body").css('overflow','hidden');
					    
					    //动画
					    var mnenuTop;
				        $('.productMenus').css({'display':'block'});
				        // 算出距底部的距离
				        var bottom = -$('.productMenus').height();
				        $('.productMenus').css({
				            transition:'all 0.6s ease 0s',
				            transform: 'translateY('+bottom+'px)'
				        })
				        mnenuTop = $(this).find('.productParameter');
				        //设置让.menu_top遮罩层延迟300毫秒显示
				        setTimeout("$('.menu_top').show()",300);
				        //禁止遮罩层以下屏幕滑动
				        //$("body").css('overflow','hidden');
					    
					    
					    //关闭产品参数遮罩层--点击确定按钮
				        var j = parseInt($("#nm").html());                    //购物车数量
					    $('.Oil_card3').on('click',function Oil_card(){
					    	var id_data_s="";           		  //url参数
					    	var guige=$(".colorS p")              //规格字面
						    var fuji=$(".ul_color")				  //规格参数的DOM元素
						    var e=0;
						    var p=0;
						    var ziti_0="";
						    var yanse="";
						    for(e; e<guige.length; e++){
						    	ziti_0=$(guige[e]).text()
						    	yanse=$(fuji[e]).children(".another").attr("id_data");
						    	id_data_s+=ziti_0+":"+yanse+","
						    }
						    console.log(id_data_s)
					    	
					    	
					    	var ka_txtValue=$("#ka_txt").attr("value");              //持卡人 
					    	var oil_txtValue=$("#oil_txt").attr("value");            //卡号
					//          	console.log(oil_txtValue)
							if(roductattribute.length==0){                          //判断产品是否有规格
								var yanse="0";          //颜色参数
						    	var chicun="0";         //尺寸参数
						    	var attr_id_1_1="0";    //颜色值ID
						    	var attr_id_2_1="0";    //尺寸值ID
							}else{
								var attr_id_1_1=$('#Specifications font').attr("id");    //颜色值ID
								var attr_id_2_1=$('#Specifications font').attr("id");    //尺寸值ID
					    	}
					    	var shulian=$('.subtract').text();                  	 //数量参数
					    	var tijiao=yanse+'/'+chicun+'/'+shulian              	 //提交总参数
					    	if((canpin==3 ||canpin==5) && canpin_1==1){
								if(ka_txtValue!==""){            //为3060产品
					    			if(oil_txtValue!==""){
					    				tijiao=tijiao+'/'+ka_txtValue+'/'+oil_txtValue
					        			$('.productMenus').hide();
						                $('.menu_top').hide();
						               	arr={
						               		"yanse_0":yanse_0,
						               		"chicun_0":chicun_0,
						               		"attr_id_1":attr_id_1,
						               		"attr_id_1_1":attr_id_1_1,
					            			"attr_id_2":attr_id_2,
					            			"attr_id_2_1":attr_id_2_1,
						               		"yanse":yanse,
						               		"chicun":chicun,
						               		"shulian":shulian,
						               		"ka_txtValue":ka_txtValue,
						               		"oil_txtValue":oil_txtValue,
						               		"productId":ids
						               	}
						               	$.ajax({                                //ajax后台交互
											type:"post",
											url:"http://"+hosturl+"/index.php/api/shopcart/addCartAjax",
											async:true,
											jsonp:"callbackparam",//跨域
											data:{
												user_id:user_id,
												token:token,
												pid:ids,
												qty:arr.shulian,
												attr_list:id_data_s,
												owner_name:arr.ka_txtValue,
												owner_card_number:oil_txtValue
											},
											dataType:"json",
											success:function(data){
												if(data.code==10000){
													$("#loadEffect span").text("请先登录！");
													tanchu(); 						//弹框提示；
				//									alert("请先登录");
												}
												if(data.code==1000){
													$("#loadEffect span").text("已成功加入购物车！");
													tanchu(); 						//弹框提示；
				//									alert("已成功加入购物车");
													$("#nm").html('1');
						    						$('.num').show();
						    						data=data;
												}
												console.log(data)
											}
										});
//						               	window.location.href="#/cart?id_data="+id_data_s+"数量:"+arr.shulian+","+"持卡人:"+arr.ka_txtValue+","+"卡号:"+oil_txtValue;
					                }else{
					                	$("#loadEffect span").text("请输入卡号！");
										tanchu(); 						//弹框提示；
					        		}
					    		}else{
					    			$("#loadEffect span").text("请输入持卡人！");
									tanchu(); 						//弹框提示；
					    		}
					    	}else{
								$('.productMenus').hide();     //其他产品
					            $('.menu_top').hide()
					            arr={
					            	"yanse_0":yanse_0,
						            "chicun_0":chicun_0,
					            	"attr_id_1":attr_id_1,
					            	"attr_id_1_1":attr_id_1_1,
					            	"attr_id_2":attr_id_2,
					            	"attr_id_2_1":attr_id_2_1,
					           		"yanse":yanse,
					           		"chicun":chicun,
					           		"shulian":shulian,
					           		"productId":ids
					           	}
					            $.ajax({                                //ajax后台交互
									type:"post",
									url:"http://"+hosturl+"/index.php/api/shopcart/addCartAjax",
									async:true,
									jsonp:"callbackparam",//跨域
									data:{
										user_id:user_id,
										token:token,
										pid:ids,
										qty:arr.shulian,
										attr_list:id_data_s,
									},
									dataType:"json",
									success:function(data){
										console.log(id_data_s)
										if(data.code==10000){
											$("#loadEffect span").text("请先登录！");
											tanchu(); 						//弹框提示；
										}
										if(data.code==1000){
											$("#loadEffect span").text("已成功加入购物车！");
											tanchu(); 						//弹框提示；
											shoudao();
											data=data;
										}
									}
								});
//					            window.location.href="#/cart?id_data="+id_data_s+"数量:"+arr.shulian;
					    	}
					    	
				//	    	var speedX = 8;
				//			var speedY = -14;
				//			var x=null;
				//			var y=null;
				//			var t=null;
				//	//		onload = function(){
				//			var ball = document.getElementsByClassName("box")[0];
				////			ball.style.display="none";
				//			ball.style.top=0+"rem"; 
				//			ball.style.left=2.80+"rem";
				//			ball.style.display="block";
				//			clearInterval(t)
				//			t = setInterval(function(){
				//				if(x>=1){
				//					clearInterval(t)
				//					ball.style.display="none";
				//					ball.style.top=0+"px"; 
				//					ball.style.left=280+"px";
				////					j+=1;
				////				    $("#nm").html(j);
				////				    $('.num').show();
				//				}else{
				//					ball.style.top = ball.offsetTop+ speedY++ +"px";
				//					ball.style.left = ball.offsetLeft-speedX+"px";
				//					x=parseInt(ball.style.top)
				//					y=parseInt(ball.style.left)
				//					console.log(x)
				////					console.log(y)
				//				}
				//			},15);
				//			setTimeout(shoudao,500)
				//			shoudao()
					    })
					    function shoudao(){
						    j+=parseInt($(".subtract").text())     //加入购物车数量
						    $("#nm").html(j);
						    $('.num').show();
					    }
				//  }else{
					    
				//		}
				//		j+=1;
				//		var u=10;
				//		u+=1;
				//	    $("#nm").html(j);
				//	    $("#nm")[0].style.zIndex=u;
				//	    $('.num').show();
				//	    $("#nm").css({"font-size":"0.11rem"});
				//	    if($(".u-flyer")[1].style.offsetLeft="42px"){
				//	    	$(".u-flyer")[0].style.display="none"
				//	    }
					     
				//  }
				});
				
				//立即购买
				$('#nowBuy').on('touchend', function nowBuy(){
					$(".Oil_card1").addClass("Oil_card2");       //遮罩层添加类名
				// 	$('.Oil_card1').attr({"id":"Oil_card1"});     //遮罩层添加id
				   	$(".Oil_card1").removeClass("Oil_card3");
				   	//点击显示产品参数遮罩层
				   	$('.menu_top').show()
				    $('.productMenus').show();
				      //禁止遮罩层以下屏幕滑动
				    $("body").css('overflow','hidden');
				    console.log($('#Specifications font').attr("id"))
				    
				    //关闭产品参数遮罩层--点击确定按钮
				    $('.Oil_card2').on('touchend',function Oil_card(){
				    	
				    	
				    	if($(fuji[0]).children(".another").text()){                 //判断  颜色   是否存在
				    		var yanse=$(fuji[0]).children(".another").text();
				    	}else{
				    		var yanse="0";
				    	}
				    	if($(fuji[1]).children(".another").text()){
				    		var chicun=$(fuji[1]).children(".another").text();        //判断  尺寸是否存在
				    	}else{
				    		var chicun="0";
				    	}
				    	if($(fuji[2]).children(".another").text()){
				    		var fengge=$(fuji[2]).children(".another").text();        //判断  风格是否存在
				    	}else{
				    		var fengge="0";
				    	}
				    	if($(fuji[3]).children(".another").text()){
				    		var fangshui=$(fuji[3]).children(".another").text();        //判断  防水是否存在
				    	}else{
				    		var fangshui="0";
				    	}
				    	if($(fuji[4]).children(".another").text()){
				    		var ganxi=$(fuji[4]).children(".another").text();        //判断  干洗是否存在
				    	}else{
				    		var chicun="0";
				    	}
				    	if($(fuji[5]).children(".another").text()){
				    		var zidong=$(fuji[5]).children(".another").text();        //判断  自动是否存在
				    	}else{
				    		var zidong="0";
				    	}
				    	var ka_txtValue=$("#ka_txt").attr("value");              //持卡人 
				    	var oil_txtValue=$("#oil_txt").attr("value");            //卡号
				//          	console.log(chicun)
				    	if(roductattribute.length==0){                          //判断产品是否有规格
							var yanse="0";          //颜色参数
					    	var chicun="0";         //尺寸参数
					    	var attr_id_1_1="0";    //颜色值ID
					    	var attr_id_2_1="0";    //尺寸值ID
						}else{
							var attr_id_1_1=$('#Specifications font').attr("id");    //颜色值ID
							var attr_id_2_1=$('#Specifications font').attr("id");    //尺寸值ID
				    	}
				    	var shulian=$('.subtract').text();                  	 //数量参数
				    	var tijiao=yanse+'/'+chicun+'/'+shulian              	 //提交总参数
				    	if(canpin==2){
							if(ka_txtValue!==""){            //为3060产品
				    			if(oil_txtValue!==""){
				    				tijiao=tijiao+'/'+ka_txtValue+'/'+oil_txtValue
				        			$('.productMenus').hide();
					                $('.menu_top').hide();
					               	arr={
					               		"yanse_0":yanse_0,
					               		"chicun_0":chicun_0,
					               		"attr_id_1":attr_id_1,
					               		"attr_id_1_1":attr_id_1_1,
				            			"attr_id_2":attr_id_2,
				            			"attr_id_2_1":attr_id_2_1,
					               		"yanse":yanse,
					               		"chicun":chicun,
					               		"shulian":shulian,
					               		"ka_txtValue":ka_txtValue,
					               		"oil_txtValue":oil_txtValue,
					               		"productId":ids
					               	}
					               	window.location.href="http://localhost/nowBuy?id_data="+"颜色:"+yanse+","+"尺寸:"+chicun+","+"数量:"+arr.shulian+","+"持卡人:"+arr.ka_txtValue+","+"卡号:"+oil_txtValue;
				                }else{
				        			alert("请输入卡号 ！");
				        		}
				    		}else{
				    			alert("请输入持卡人 ！");
				    		}
				    	}else{
							$('.productMenus').hide();     //其他产品
				            $('.menu_top').hide()
				            arr={
				            	"yanse_0":yanse_0,     //颜色字面
					            "chicun_0":chicun_0,   //尺寸字面
				            	"attr_id_1":attr_id_1, //颜色id
				            	"attr_id_1_1":attr_id_1_1,//颜色参数
				            	"attr_id_2":attr_id_2, //尺寸id
				           		"attr_id_2_1":attr_id_2_1,//尺寸参数
				           		"yanse":yanse,
				           		"chicun":chicun,
				           		"shulian":shulian,
				           		"productId":ids
				           	}
							window.location.href="http://localhost/nowBuy?id_data="+"颜色:"+yanse+","+"尺寸:"+chicun+","+"数量:"+arr.shulian;
				    	}
				    })
				
					
				
				
				});
			    
			    
			    
			    
			    /**
				 * Created by Administrator on 2017/4/10.
				 * 
				 */
				
				(function () {
				    //点击显示产品参数遮罩层
				    productParameterText:$('.productParameterText').on('tap' ,function(){
				    	$(".Oil_card1").addClass("Oil_card4");       //遮罩层添加类名
					// 	$('.Oil_card1').attr({"id":"Oil_card1"});     //遮罩层添加id
					   	$(".Oil_card1").removeClass("Oil_card2");
					   	$(".Oil_card1").removeClass("Oil_card3");
				    	
				        $('.productMenus').show();
				          //禁止遮罩层以下屏幕滑动
				        $("body").css('overflow','hidden');
				        
				        
				        //关闭产品参数遮罩层--点击确定按钮
				        $('.Oil_card4').on('tap',function Oil_card(){
				        	var ka_txtValue=$("#ka_txt").attr("value");              //持卡人 
				        	var oil_txtValue=$("#oil_txt").attr("value");            //卡号
				//          	console.log(oil_txtValue)
				        	if(roductattribute.length==0){                          //判断产品是否有规格
								var yanse="0";          //颜色参数
						    	var chicun="0";         //尺寸参数
						    	
						    	var attr_id_1_1="0";    //颜色值ID
						    	
						    	var attr_id_2_1="0";    //尺寸值ID
							}else{
				//				var yanse=$('#Specifications font').first().text();           //颜色参数
				//				var chicun=$('#Specifications font').last().text();         //尺寸参数
								
								var attr_id_1_1=$('#Specifications font').attr("id");    //颜色值ID
								
								var attr_id_2_1=$('#Specifications font').attr("id");    //尺寸值ID
					    	}
							
							
				        	var shulian=$('.subtract').text();                  	 //数量参数
				        	var tijiao=yanse+'/'+chicun+'/'+shulian              	 //提交总参数
				        	if(canpin==2){
				//				if(yanse!==""){
				//          		if(chicun!==""){
				            			if(ka_txtValue!==""){            //为3060产品
					            			if(oil_txtValue!==""){
					            				tijiao=tijiao+'/'+ka_txtValue+'/'+oil_txtValue
						            			$('.productMenus').hide();
								                $('.menu_top').hide();
				//					                arr["number"] = $('.subtract').text();
				//					                arr['ka_txt'] =$('#ka_txt').val();
				//					                arr['oil_txt'] =$('#oil_txt').val();
				//					                arr.ul2 =arr.ul1+ arr.ul2+$('.subtract').text()+$('#ka_txt').val()+$('#oil_txt').val();
								               	arr={
								               		"yanse":yanse,
								               		"chicun":chicun,
								               		"shulian":shulian,
								               		"ka_txtValue":ka_txtValue,
								               		"oil_txtValue":oil_txtValue,
								               		"productId":ids
								               	}
				//					               	console.log(window.location.href);
							                }else{
						            			alert("请输入卡号 ！");
						            		}
					            		}else{
					            			alert("请输入持卡人 ！");
					            		}
				//          		}else{
				//	            		alert("请选择尺寸！");
				//	            	}
				//          	}else{
				//          		alert("请选择颜色！");
				//          	}
				        	}else{
				//      		if(yanse!==""){
				//          		if(chicun!==""){                   //其他产品
				            			$('.productMenus').hide();
						                $('.menu_top').hide()
				//			                arr["number"] = $('.subtract').text();
				//			                arr['ka_txt'] =$('#ka_txt').val();
				//			                arr['oil_txt'] =$('#oil_txt').val();
				//		                arr.ul2 =arr.ul1+ arr.ul2+$('.subtract').text()+$('#ka_txt').val()+$('#oil_txt').val();
						                arr={
						               		"yanse":yanse,
						               		"chicun":chicun,
						               		"shulian":shulian,
						               		"productId":ids
						               	}
				//			                console.log(window.location.href);
				//          		}else{
				//	            		alert("请选择尺寸！");
				//	            	}
				//          	}else{
				//          		alert("请选择颜色！");
				//          	}
				        	}
				        })
				    });
				
				    //产品参数弹出层动画
				    // console.log($)
				    //   tap封装了移动端的touch事件,如果想要用touch相关的事件,还需要引入touch.js
				    var mnenuTop;
				    $('.productParameter').on('tap',function () {
				
				
				        $('.productMenus').css({'display':'block'});
				
				        // 算出距底部的距离
				        var bottom = -$('.productMenus').height();
				
				        $('.productMenus').css({
				            transition:'all 0.6s ease 0s',
				            transform: 'translateY('+bottom+'px)'
				        })
				
				
				        mnenuTop = $(this).find('.productParameter');
				
				        //设置让.menu_top遮罩层延迟300毫秒显示
				        setTimeout("$('.menu_top').show()",300);
				        //禁止遮罩层以下屏幕滑动
				        //$("body").css('overflow','hidden');
				    })
				    //关闭产品参数遮罩层
				    close_button:$('.close_buttonS').on('tap',function(){
				        $('.productMenus').hide();
				        $('.menu_top').hide()
				        //console.log(1111)
				    })
				    //$('.Oil_card1').on('tap',function(){
				    //    $('.productMenus').hide();
				    //    $('.menu_top').hide()
				    //    //console.log(1111)
				    //})
				
				
				
				    //产品服务弹出层动画
				    // console.log($)
				    //   tap封装了移动端的touch事件,如果想要用touch相关的事件,还需要引入touch.js
				    var mnenuTop;
				    $('.hint').on('tap',function () {
				
				        $('.ProductService').css({'display':'block'});
				
				        // 算出距底部的距离
				        var bottom = -$('.ProductService').height();
				
				        $('.ProductService').css({
				            transition:'all 0.6s ease 0s',
				            transform: 'translateY('+bottom+'px)'
				        })
				
				        mnenuTop = $(this).find('.hint');
				
				        //设置让.menu_top遮罩层延迟300毫秒显示
				        setTimeout("$('.ProductService_menu').show()",300);
				
				        //禁止遮罩层以下屏幕滑动
				        //$("body").css('overflow','hidden');
				    })
				    
				    //产品服务弹出层消失
				    $('.menu_contentTop img').on('tap',function () {
				    	$('.ProductService').css({'display':'none'});
				    	$('.ProductService_menu').css({'display':'none'});
				    });
				    
				    
				
				    //关闭产品参数遮罩层
				    close_button_finish:$('.Oil_card').on('tap',function(){
				        $('.ProductService').hide();
				        $('.ProductService_menu').hide();
				        //console.log(1111)
				    })
				
				})();
				
				
				//购买数量
				$(document).ready(function(){
				    //加的效果
				    $(".li3").click(function(){
				        //当数量大于1时为减号设置样式
				        $('.li3 img').attr("src","images/dp_bottombar_minus_bg3.png");
				        $('.li1 img').attr("src","images/dp_bottombar_minus_bg1.png");
				        var num=parseInt($('.subtract').text())+1;
				        if(num>12){
				            $('.li3 img').attr("src","images/dp_bottombar_minus_bg2.png");
				            return;
				        }
				        $('.subtract').text(num);
				    });
				    //减的效果
				    $(".li1").click(function(){
				        $('.li1 img').attr("src","images/dp_bottombar_minus_bg1.png");
				        $('.li3 img').attr("src","images/dp_bottombar_minus_bg3.png");
				        var num=parseInt($('.subtract').text())-1;
				        if(num==0){
				            $('.li1 img').attr("src","images/dp_bottombar_minus_bg.png");
				            return;
				        }
				        $('.subtract').text(num);
				    });
				})
			    
			    
			    
			};
		},
		updated:function(){
			var swiper = new Swiper(".swiper-container",{
				direction:"horizontal",
				autoplay :3000,
				loop:true,
				autoplayDisableOnInteraction:false,
				pagination:".swiper-pagination"
			})
		},
//		components:{Myfun,Myfun_0,Myfun_1}
	}
</script>






<style>
	/*loding动画图*/
	.loadEffect{
        width: 1.00rem;
        height: 1.00rem;
        position: relative;
        margin: 0 auto;
        margin-top:1.50rem;
    }
    .loadEffect span{
        display: inline-block;
        width: 0.20rem;
        height: 0.20rem;
        border-radius: 50%;
        background: #fff;
        position: absolute;
        -webkit-animation: load 1.04s ease infinite;
    }
    @-webkit-keyframes load{
        0%{
            -webkit-transform: scale(1.2);
            opacity: 1;
        }
        100%{
            -webkit-transform: scale(.3);
            opacity: 0.5;
        }
    }
    .loadEffect span:nth-child(1){
        left: 0;
        top: 50%;
        margin-top:-0.10rem;
        -webkit-animation-delay:0.13s;
    }
    .loadEffect span:nth-child(2){
        left: 0.14rem;
        top: 0.14rem;
        -webkit-animation-delay:0.26s;
    }
    .loadEffect span:nth-child(3){
        left: 50%;
        top: 0;
        margin-left: -0.10px;
        -webkit-animation-delay:0.39s;
    }
    .loadEffect span:nth-child(4){
        top: 0.14rem;
        right:0.14rem;
        -webkit-animation-delay:0.52s;
    }
    .loadEffect span:nth-child(5){
        right: 0;
        top: 50%;
        margin-top:-0.10rem;
        -webkit-animation-delay:0.65s;
    }
    .loadEffect span:nth-child(6){
        right: 0.14rem;
        bottom:0.14rem;
        -webkit-animation-delay:0.78s;
    }
    .loadEffect span:nth-child(7){
        bottom: 0;
        left: 50%;
        margin-left: -0.10px;
        -webkit-animation-delay:0.91s;
    }
    .loadEffect span:nth-child(8){
        bottom: 0.14rem;
        left: 0.14rem;
        -webkit-animation-delay:1.04s;
    }
    #loadEffect{
        width: 3.00rem;
        height: 2.00rem;
        position: relative;
        margin: 0 auto;
        margin-top:1.50rem;
        background: #fff;
    }
    #loadEffect span{
        display: inline-block;
        text-align: center;
        line-height: 0.24rem;
        font-size: 0.16rem;
        width: 2.40rem;
        height: 0.5rem;
        top:0;bottom:0;
        left:0;right:0;
        margin:auto;
        position: absolute;
    }
	
	
	
	
	.banners_1{
		width:100%;
		height:100%;
		position:relative;
		/*display:flex;*/
		flex-direction:column;
		overflow-y:auto;
		/*-webkit-overflow-scrolling: touch;*/
		/*overflow-y:scroll;*/
		font-size: 0.14rem;
	}
	.banners_1 .banner{
		width:100%;
		height:3.6rem;
		overflow:hidden;
	}
	.banners_1 .swiper-container{
		width: 100%;
		height:3.6rem;
		background-color: #00f;
		overflow: hidden;
	}
	.banners_1 .swiper-wrapper{
		width: 100%;
		height:100%;
		margin:0;
		padding:0;
		border:none;
	}
	.banners_1 .swiper-wrapper .swiper-slide{
		width: 100%;
		height:100%;
		margin:0;
		padding:0;
		border:none;
	}
	.banners_1 .swiper-wrapper img{
		width: 100%;
		height:100%;
		margin:0;
		padding:0;
		border:none;
	}
	
	


#scroller .header{
	height: auto;
}
</style>

<!--外部引入样式-->
<style scoped>
	@import '../../css/menu.css';
	@import '../../css/header.css';
	/*@import '../../ogLaVp_data/bootstrap.css';*/
</style>