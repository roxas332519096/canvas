function onReady(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var eraserEnable = false;
  var strokeStyle = 'black';
  var lineWidth = 3;


  autoSetCanvasSize(canvas);
  device(canvas);
  navButton();
  changeColor();
  
  

 ////////////////////////////////////////////
 //自动自适应窗口大小
  function autoSetCanvasSize(canvas){
   setCanvasSize();

   window.onresize = function(){
     setCanvasSize();
   }
  }
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
  //监听设备
  function device(){
    if(document.body.ontouchstart !== undefined){
      listenTotouch();
    }
    else{
      listenToMouse();
    }
  }

 //监听鼠标动作
  function listenToMouse(){
    var using = false;
    var lastPoint = {x:undefined,y:undefined}
    //鼠标按下
    canvas.onmousedown = function(aaa){
      using = true;
      var x = aaa.clientX;
      var y = aaa.clientY;
      if(eraserEnable){
        clearLine(x,y);
      }else{
        lastPoint = {x:x,y:y}
      }
    }
    //鼠标移动
    canvas.onmousemove = function(aaa){
      var x = aaa.clientX;
      var y = aaa.clientY;
      if (!using) {return}
      if(eraserEnable){
        clearLine(x,y);
      }else{
        var newPoint = {x:x,y:y}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint;
      }
    }
    //鼠标松开
    canvas.onmouseup = function(aaa) {
      using = false;
    }
  }

  //监听触屏动作
 
  function listenTotouch(){
    var using = false;
    var lastPoint = {x:undefined,y:undefined}
    //手指按下
    canvas.ontouchstart = function(aaa){
      using = true;
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      if(eraserEnable){
        clearLine(x,y);
      }else{
        lastPoint = {x:x,y:y}
      }
    }
    //鼠标移动
    canvas.ontouchmove = function(aaa){
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      if (!using) {return}
      if(eraserEnable){
        clearLine(x,y);
      }else{
        var newPoint = {x:x,y:y}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint;
      }
    }
    //鼠标松开
    canvas.ontouchend = function(aaa) {
      using = false;
    }
  }
  
  //画线
  function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.moveTo(x1, y1);  //起点
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x2, y2);  //终点
    ctx.stroke();
    ctx.closePath();
  }
  //橡皮
  function clearLine(x3,y3){
    ctx.clearRect(x3-5,y3-5,20,20);
  }
  //改变功能
  function navButton(){
    eraser.onclick = function(){
     eraserEnable = true;
  }
    brush.onclick = function(){
      lineWidth = 10;
      eraserEnable = false;
    }
    pencil.onclick = function(){
      lineWidth = 1;
      eraserEnable = false;
    }
    pen.onclick = function(){
      lineWidth = 3;
      eraserEnable = false;
    }
  }
  //改变画笔颜色
  function changeColor(){
    red.onclick = function(){
      strokeStyle = 'red';
      red.classList.add('act');
      black.classList.remove('act');
      blue.classList.remove('act');
      green.classList.remove('act');
    }
    green.onclick = function(){
      strokeStyle = 'green';
      red.classList.remove('act');
      black.classList.remove('act');
      blue.classList.remove('act');
      green.classList.add('act');
    }
    blue.onclick = function(){
      strokeStyle = 'blue';
      red.classList.remove('act');
      black.classList.remove('act');
      blue.classList.add('act');
      green.classList.remove('act');
    }
    black.onclick = function(){
      strokeStyle = 'black';
      black.classList.add('act');
      red.classList.remove('act');
      blue.classList.remove('act');
      green.classList.remove('act');
    }
  }
}


 

