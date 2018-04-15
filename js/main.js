function onReady(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var eraserEnable = false;

  autoSetCanvasSize(canvas);
  listenToMouse(canvas);
  navButton();
  

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
 //监听鼠标动作
 
  function listenToMouse(canvas){
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
  
  //画线
  function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(x1, y1);  //起点
    ctx.lineWidth = 5;
    ctx.lineTo(x2, y2);  //终点
    ctx.stroke();
    ctx.closePath();
  }
  //橡皮
  function clearLine(x3,y3){
    ctx.clearRect(x3-5,y3-5,10,10);
  }
  //改变功能
  function navButton(){
    eraser.onclick = function(){
      eraser.className = 'actionsEraser';
      brush.className  ='brush';
      eraserEnable = true;
  }
    brush.onclick = function(){
      brush.className = 'actionsBrush';
      eraser.className = 'Eraser';
      eraserEnable = false;
    }
  }
}


 

