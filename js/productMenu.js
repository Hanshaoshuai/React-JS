/**
 * Created by Administrator on 2017/4/10.
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


