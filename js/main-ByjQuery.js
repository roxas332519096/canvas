function onReady(){
    var $canvas = $('#canvas');
    var ctx = $canvas.get(0).getContext('2d');
    var eraserEnable = false;
    var strokeStyle = 'black';
    var lineWidth = 3;
    var changebtn = false;


autoSetCanvasSize($canvas);
device($canvas);
navButton();
changeColor();

////////////////////////////////////////////
 //自动自适应窗口大小
function autoSetCanvasSize($canvas){
setCanvasSize();

window.onresize = function(){
    setCanvasSize();
}
}
function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    $canvas.get(0).width = pageWidth;
    $canvas.get(0).height = pageHeight;
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
    $canvas.on('mousedown',function(aaa){
    using = true;
    var x = aaa.clientX;
    var y = aaa.clientY;
    if(eraserEnable){
        clearLine(x,y);
    }else{
        lastPoint = {x:x,y:y}
    }
    })
    //鼠标移动
    $canvas.on('mousemove',function(aaa){
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
    })
    //鼠标松开
    $canvas.on('mouseup',function(aaa) {
    using = false;
    })
}

//监听触屏动作

function listenTotouch(){
    var using = false;
    var lastPoint = {x:undefined,y:undefined}
    //手指按下
    $canvas.on('touchstart',function(aaa){
    using = true;
    var x = aaa.touches[0].clientX;
    var y = aaa.touches[0].clientY;
    if(eraserEnable){
        clearLine(x,y);
    }else{
        lastPoint = {x:x,y:y}
    }
    })
    //鼠标移动
    $canvas.on('touchmove',function(aaa){
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
    })
    //鼠标松开
    $canvas.on('touchend',function(aaa) {
    using = false;
    })
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
function initnavButton(){
    $('#eraser').removeClass('actvie');
    $('#pen').removeClass('actvie');
    $('#brush').removeClass('actvie');
    $('#pencil').removeClass('actvie');
}
function navButton(){
    $('#eraser').on('click',function(){
        initnavButton();
        $('#eraser').addClass('actvie');
        eraserEnable = true;
    })
    $('#brush').on('click',function(){
        initnavButton();
        $('#brush').addClass('actvie');
        lineWidth = 10;
        eraserEnable = false;
    })
    $('#pencil').on('click',function(){
        initnavButton();
        $('#pencil').addClass('actvie');
        lineWidth = 0.7;
        eraserEnable = false;
    })
    $('#pen').on('click',function(){
        initnavButton();
        $('#pen').addClass('actvie');
        lineWidth = 3;
        eraserEnable = false;
    })
    clear.onclick = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    //保存图片
    downLoad.onclick = function(){
    var url = canvas.toDataURL("image/png");
    var a =document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'canvas_image';
    a.target = '_blank';
    a.click();
    }
}
//改变画笔颜色
    function changeColor(){
        $('#red').on('click',function(){
            strokeStyle = 'red';
            $('#change').removeClass('red green blue black');
            $('#change').addClass('red');
        })
        $('#green').on('click',function(){
            strokeStyle = 'green';
            $('#change').removeClass('red green blue black');
            $('#change').addClass('green');
        })
        $('#blue').on('click',function(){
            strokeStyle = 'blue';
            $('#change').removeClass('red green blue black');
            $('#change').addClass('blue');
        })
        $('#black').on('click',function(){
            strokeStyle = 'black';
            $('#change').removeClass('red green blue black');
            $('#change').addClass('black');
        })
        $('#change').on('click',function(){
            changebtn = !changebtn;
            if(changebtn){
                $('#black').addClass('act');
                $('#red').addClass('act');
                $('#blue').addClass('act');
                $('#green').addClass('act');
            }else{
                $('#black').removeClass('act');
                $('#red').removeClass('act');
                $('#blue').removeClass('act');
                $('#green').removeClass('act');
            }
        })
    }
}