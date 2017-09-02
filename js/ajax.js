/**
 * Created by Administrator on 2017/4/11.
 */
    //获取当前页面的参数值
var searchURL = window.location.search;
searchURL = searchURL.substring(1, searchURL.length);
var url_arr = searchURL.split("&");
console.log(url_arr.length);
if(url_arr.length>=1){
	var ids = searchURL.split("&")[0].split("=")[1];
}else{
	var ids = 1;
}
if(url_arr.length>=2){
	var user_id = searchURL.split("&")[1].split("=")[1];
}else{
	var user_id = 0
}

if(url_arr.length>=3){
	var token = searchURL.split("&")[2].split("=")[1];
}else{
	var token = "";
}

console.log(ids);
//var ids=42;
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
//arr["id"] = ids;
//var ids="0"
//公共弹框提示；
function tanchu(){
	$(".loding").css({"display":"block"}).click(function tiaozhuan(){this.style.display="none";window.location.go(-1)});
}
(function () {
	if(ids=="0"){
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
	    $.ajax({
	        url: "http://121.196.218.57/index.php/api/Product/getProduct/?id="+ids,
	        type: "get",
	        async: true,
	        dataType:"json",    //跨域json请求一定是jsonp
	        //跨域请求的参数名，默认是callback
	        data: {
	            id:ids,
				user_id:user_id,
				token:token
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
				
	            path = data.data.product.product_img;
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
	            stock = '库存' + data.data.product.stock + '件';
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
	            $tds = $(".commodityParameters_imgText img");
	            $tds.on('touchend', function () {
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
					loaded ();
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
				function loaded () {
					var myScroll;
					setTimeout(function(){
						myScroll = new IScroll('#wrapper', { scrollX: true, freeScroll: true });
					},300);
		        }
				
	        }
	    });
   	}
})();