# clock-by-canvas
用canvas绘制一个时钟，同时可以适应不同的宽度和高度改变，钟面的元素跟着比例改变

>一个圆的弧度就是圆的周长，即`2*Math.PI*r`，每小时之间的弧度是`2*Math.PI*r/12`

>求钟面12个小时数字位置时，可利用数学中`sin`和`cos`求出点与原点连线，还有与水平线垂直线组成的直角三角形，每小时之间弧度是`2*Math.PI*r/12`，求出夹角sin或cos值，求出12个小时分别所在的想对坐标点

