export function Drag({ mv, box = document.body, slide, onSlideChange }: any) {
  // mv:要移动的dom
  // box: 参照的dom
  // slide：只获取鼠标移动数据  onSlideChange 为回调获取数据
  if (!mv) {
    mv = document.body;
  }
  var startx = 0;
  var starty: any;
  var startLeft: any;
  var startTop: any;
  var clientWidth = box.clientWidth;
  var clientHeight = box.clientHeight;
  var isDown = false;
  var movedown = function (e: any) {
    // console.log(e);
    e = e ? e : window.event;
    if (!window.captureEvents) {
      // this.setCapture();
    } //事件捕获仅支持ie
    //            函数功能：该函数在属于当前线程的指定窗口里设置鼠标捕获。一旦窗口捕获了鼠标，
    //            所有鼠标输入都针对该窗口，无论光标是否在窗口的边界内。同一时刻只能有一个窗口捕获鼠标。
    //            如果鼠标光标在另一个线程创建的窗口上，只有当鼠标键按下时系统才将鼠标输入指向指定的窗口。
    //            非ie浏览器 需要在document上设置事件
    var left = mv.style.left || mv.offsetLeft;
    var top = mv.style.top || mv.offsetTop;
    isDown = true;
    startx = e.clientX || e.touches['0']?.clientX;
    starty = e.clientY || e.touches['0']?.clientY;
    startLeft = parseInt(left);
    startTop = parseInt(top);
    // console.log(left, startx);
  };
  var move = function (e: any) {
    e = e ? e : window.event;
    // console.log(e);
    if (isDown) {
      if (slide) {
        onSlideChange({
          x: (e.clientX || e.touches['0']?.clientX) - startx,
          y: (e.clientY || e.touches['0']?.clientY) - starty,
        });
        return;
      }
      var lefts = (e.clientX || e.touches['0']?.clientX) - (startx - startLeft);
      var tops = (e.clientY || e.touches['0']?.clientY) - (starty - startTop);
      if (lefts <= 0) {
        mv.style.left = '0px';
        if (e.clientX < 0) {
          //		            			that.moveup();
        }
      } else if (lefts + mv.clientWidth >= clientWidth) {
        mv.style.left = clientWidth - mv.clientWidth + 'px';
      } else {
        mv.style.left = lefts + 'px';
      }
      if (tops <= 0) {
        mv.style.top = '0px';
        if (e.clientY < 0) {
          //		            			that.moveup();
        }
      } else if (tops + mv.clientHeight >= clientHeight) {
        mv.style.top = clientHeight - mv.clientHeight + 'px';
      } else {
        mv.style.top = tops + 'px';
      }
    }
  };
  var moveup = function () {
    if (onSlideChange) {
      onSlideChange({
        touchend: true,
      });
    }
    isDown = false;
    if (!window.captureEvents) {
      // releaseCapture();
    } //事件捕获仅支持ie
  };
  if (window.modelName === 'pc') {
    mv.onmousedown = movedown;
    mv.onmousemove = move;
    mv.onmouseup = moveup;
    //非ie浏览器
    document.addEventListener('mousemove', move, true);
  } else if (window.modelName === '平板') {
    console.log('平板');
    mv.ontouchstart = movedown;
    mv.ontouchmove = move;
    mv.ontouchend = moveup;
  } else {
    console.log('手机');
    mv.ontouchstart = movedown;
    mv.ontouchmove = move;
    mv.ontouchend = moveup;
  }

  //   var mover = new Mover(
  //     document.getElementById('title'),
  //     document.getElementById('box'),
  //     document.body
  //   );
  //写两个是为了解决 ie 和非ie 浏览器关于事件捕获 的兼容性问题
}
