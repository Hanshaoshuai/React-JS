var myScroll;

function loaded() {
	pullDownFlag = 0;
	pullUpFlag = 0;
	pullDown = document.getElementById("pullDown");
	pullUp = document.getElementById("pullUp");
	myScroll = new IScroll("#wrapper", {
		/*需要使用iscroll-probe.js才能生效probeType：1  滚动不繁忙的时候触发
		probeType：2  滚动时每隔一定时间触发
		probeType：3  每滚动一像素触发一次*/
		probeType: 3,
        momentum: true,//关闭惯性滑动
		mouseWheel: true, //鼠标滑轮开启
		scrollbars: true, //滚动条可见
		fadeScrollbars: true, //滚动条渐隐
		interactiveScrollbars: true, //滚动条可拖动
		shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
		useTransform: true, //CSS转化
		useTransition: true, //CSS过渡
		bounce: true, //反弹
		freeScroll: false, //只能在一个方向上滑动
		startX: 0,
		startY: 0,
//      snap: "li",//以 li 为单位
	});
}
loaded();


document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
//对开始拖动和拖动结束的监听，这是iScroll5的一个坑，positionJudge和action都是function，但是如果直接以function(){}的方式写在里面的话，调用会出问题，所以要单独写在外面