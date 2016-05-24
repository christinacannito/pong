// to be able to render graphics on the canvas... 
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); // 2D rending context 

// here we are drawing our space 
ctx.beginPath(); // start
ctx.rect(20, 40, 50, 50); // x, y, width, height
ctx.fillStyle = "#CC9476" // stores our color
ctx.fill(); // applys the paint
ctx.closePath(); // finish


ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false); // x, y, arc radius, start angle, end angle, drawing direction
ctx.fillStyle = "#F2A176";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "#B8C7A8";
ctx.stroke();
ctx.closePath();
