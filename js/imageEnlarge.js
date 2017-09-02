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