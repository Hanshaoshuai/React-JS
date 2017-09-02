

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
    
    window.location.href = 'native://retur';

});
//点击显示导航栏遮罩层
headerNavigation:$('.right').on('touchend', function () {
    $('.menu').show();
});
//导航栏左部购物车
$('.navigationS_1').on('touchend', function () {
	window.location.href = 'native://shoppingCart';
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
    window.location.href = 'native://homePage';
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
$('#shoppingCart').on('touchend', function  shoppingCart() {
    //alert(0);
    //window.ButtonEvent.marketBtnCarEvent('kkk');
    window.location.href = 'native://shoppingCart';
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
$('#addShoppingCart').on('touchend', function addShoppingCart(){
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
	    $('.Oil_card3').on('touchend',function Oil_card(){
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
		               	window.location.href="http://localhost/addShoppingCart?id_data="+id_data_s+"数量:"+arr.shulian+","+"持卡人:"+arr.ka_txtValue+","+"卡号:"+oil_txtValue;
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
//						console.log(data)
					}
				});
	            window.location.href="http://localhost/addShoppingCart?id_data="+id_data_s+"数量:"+arr.shulian;
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


