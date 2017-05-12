var clock = document.getElementById('clock');
var ctx = clock.getContext('2d');

//获取canvas的宽和高,半径
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
rem = width / 200;   //设置一个比例，当canvas的width和height改变时，其他元素也跟着改变

//画圆
function drawBackground() {
    ctx.save();
    ctx.translate(r, r);                       //重新定义原点坐标到canvas画布中心点
    ctx.beginPath();                          //起始路径
    ctx.lineWidth = 10 * rem;                       //圆的边框宽度,200/width=10/x
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);  //绘制圆,绘制圆时候，是走圆框的中间绘制，所以边框宽度为10，绘制圆的半径应该是r-5
    ctx.stroke();                             //绘制圆路径

    //定义数组存储小时数
    var hourNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = 20*rem + 'px Arial';         //设置数字的样式
    ctx.textAlign = 'center';       //数字水平居中
    ctx.textBaseline = 'middle'    //数字垂直居中
    hourNumber.forEach(function (number, i) {
        var rad = 2 * Math.PI / 12 * i;  //定义弧度值，一个圆的弧度是2π，i为索引，从3开始，则3小时的弧度为0
        var x = Math.cos(rad) * (r - 35  * rem); //x坐标值，利用直角三角形中余弦值乘以半径等于直角边
        var y = Math.sin(rad) * (r - 35 * rem); //y坐标
        ctx.fillText(number, x, y);
        ctx.fillStyle = '#000';

        //遍历秒针的点，60次
        for (var i = 0; i < 60; i++) {
            var rad = 2 * Math.PI / 60 * i;     //弧度
            var x = Math.cos(rad) * (r - 18 * rem);   //秒的点在小时数和外圆之间，所以半径会大一点r-18,不是r-30
            var y = Math.sin(rad) * (r - 18 * rem);
            ctx.beginPath();
            if (i % 5 === 0) {                //对是否是小时上的点进行判断
                ctx.arc(x, y, 4 * rem, 0, 2 * Math.PI, false);   //如果是小时的点，则绘制大一点的圆圆
                ctx.fillStyle = '#000';
            } else {
                ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);   //不是小时上的点，绘制小圆
                ctx.fillStyle = '#666';
            }
            ctx.fill();
        }

    });
}

//绘制时针
function drawHour(hour, minute) {
    ctx.save();            //保存当前环境的状态
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour   //每个小时的弧度数
    var mrad = 2 * Math.PI / 12 / 60 * minute; //每分钟的弧度数
    ctx.rotate(rad + mrad);    //时针的弧度等于小时的弧度数加上分钟的弧度数,例如4点半，就是4点弧度数和30分钟弧度数
    ctx.lineWidth = 7 * rem;  //定义时针宽度
    ctx.lineCap="round"; //时针两端为圆形
    ctx.moveTo(0, 10 * rem); //直线起点
    ctx.lineTo(0, -r / 2); //直线终点位置,连接
    ctx.stroke();    //绘制已经定义路径
    ctx.restore();    //返回画小时之前保存过的路径状态和属性
}

//绘制分针
function drawMinute(minute) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute   //每个小时的弧度数
    ctx.rotate(rad);
    ctx.lineWidth = 5 * rem;  //定义时针宽度
    ctx.lineCap="round"; //分针两端为圆形
    ctx.moveTo(0, 10 * rem); //直线起点
    ctx.lineTo( 0, -r + 30 * rem ); //直线终点位置,连接
    ctx.stroke();    //绘制已经定义路径
    ctx.restore();
}

//绘制秒针
function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#ff0000';
    var rad = 2 * Math.PI / 60 * second   //每个小时的弧度数
    ctx.rotate(rad);
    ctx.moveTo(-2 * rem, 20 * rem); //直线起点
    ctx.lineTo(2 * rem, 20 * rem);
    ctx.lineTo(1, - r + 18 * rem);
    ctx.lineTo(-1, - r + 18 * rem);
    ctx.fill();   
    ctx.restore();
}

//绘制分针时针秒针交叉的圆点
function drawDot(){
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0, 0, 5 * rem, 2 * Math.PI, false);
    ctx.fill();
}

function draw(){
    ctx.clearRect(0, 0, width, height); //清除canvas，每次绘制完成后原点还原到左上角
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore(); 
}

draw();

setInterval(draw, 1000);
