var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); // 2D rending context
 
var x = canvas.width / 2;
var y = canvas.height - 30;
 
var dx = 2;
var dy = -2;
 
var ballRadius = 10;
 
// paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2; // the paddles x position - the starting point
 
// variables for the keyboard interactions
var rightPressed = false;
var leftPressed = false;
 
// setting up the bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
 
var bricks = [];
 
var score = 0;
 
var lives = 3;
 
for (c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (r = 0; r < brickRowCount; r++) {
                                bricks[c][r] = {x: 0, y: 0, status: 1};
                }
}
 
// if (y + dy < 0) {
                // y is the y position of the ball
                // dy is the speed of the ball (-2) how the ball is moving
                // we have it less than 0 because 0 represents the top of the canvas
                // this will detect collisions with the whole top of the canvas
                // dy = -dy;
// }
 
// if (y + dy > cavas.height) {
                // if the balls y position is greater than the canvas height we will also want to change position
                // dy = -dy;
// }
 
// collision detection
function collisionDetection() {
                for (c = 0; c < brickColumnCount; c++) {
                                for (r = 0; r < brickRowCount; r++) {
                                                var b = bricks[c][r];
                                                // calculations
                                                if (b.status == 1) {
                                                               if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                                                                               dy = -dy;
                                                                               b.status = 0;
                                                                               score++;
                                                                               if (score == brickRowCount * brickColumnCount) {
                                                                                               alert("You won! Congratulations!");
                                                                                               document.location.reload();
                                                                               }
                                                               }
                                                }
                                }
                }
}
 
function drawScore() {
                ctx.font = "16px Arial";
                ctx.fillStyle = "#DCBDB1";
                ctx.fillText("Score: " + score, 8, 20); // the last two parameters are the x, y for placement
}
 
function drawLives () {
                ctx.font = "16px Arial";
                ctx.fillStyle = "#73A8AF";
                ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
 
// listening for the keyboard keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
 
// the two functions below are storing information about the left or right keys, which we will use to move the paddle
function keyDownHandler(e) {
                console.log('inside key down')
                console.log('e.keycode: ', e.keycode)
                if (e.keycode == 39 || e.which == 39) {
                                rightPressed = true;
                } else if (e.keycode == 37 || e.which == 37) {
                                leftPressed = true;
                }
}
 
function keyUpHandler(e) {
                if (e.keycode == 39 || e.which == 39) {
                                rightPressed = false;
                } else if (e.keycode == 37 || e.which == 37) {
                                leftPressed = false;
                }
}
 
function drawBall () {
                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, Math.PI*2);
                ctx.fillStyle = "#AABEA3";
                ctx.fill();
                ctx.closePath();
}
 
// just like how we drew the ball we have to draw the paddle
function drawPaddle () {
                ctx.beginPath();
                ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
                ctx.fillStyle = "#98847D";
                ctx.fill();
                ctx.closePath();
}
 
function drawBricks() {
                for (c = 0; c < brickColumnCount; c++) {
                                for (r = 0; r < brickRowCount; r++) {
                                                if (bricks[c][r].status == 1) {
                                                                var brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
                                                                var brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
                                                                bricks[c][r].x = brickX;
                                                                bricks[c][r].y = brickY;
                                                                ctx.beginPath();
                                                                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                                                                ctx.fillStyle = "#BDD6D2";
                                                                ctx.fill();
                                                                ctx.closePath();
                                                }             
                               }
                }
}
 
function draw () {
                // drawing code
                ctx.clearRect(0, 0, canvas.width, canvas.height) // x, y for topleft and x, y for bottom right
                drawBricks();
                drawBall();
                drawPaddle();
                drawScore();
                drawLives();
                collisionDetection();
 
                // thinking about the left and right sides of the canvas wall (we are now working with the X position)
                if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { // we use ballRadius so the ball changes direction once the edge of the ball touches the canvas wall
                                dx = -dx;
                }
 
                // we combined the if statements to make them check for multiple conditions
                // below is checking for top and bottom collisions
                if (y + dy < ballRadius) {
                                dy = -dy;
                } else if (y + dy > canvas.height - ballRadius) { // checks to see if the ball is at the bottom
                                if (x > paddleX && x < paddleX + paddleWidth) { // does the ball touch the paddle...
                                                dy = -dy; // if it touches the paddle it bounces
                                } else { // if it missed the padded game ends
                                                lives--;
                                                if (!lives) {
                                                                alert("Game over!")
                                                } else {
                                                                x = canvas.width / 2;
                                                                y = canvas.height - 30;
                                                                dx = 2;
                                                                dy = -2;
                                                                paddleX = (canvas.width - paddleWidth) / 2;
                                                }
                                }
                }
 
                // the rightPress and leftPressed variable are saved to true or false below
                if (rightPressed && paddleX < canvas.width - paddleWidth ) {
                                // in addition to just seeing if the key is pressed we want to make sure it doesn't go off the canvas
                                // to make sure it is not going off the canvas you check the width of the canvas - the width of the paddle
                                paddleX += 7;
                } else if (leftPressed && paddleX > 0) {
                                paddleX -= 7;
                }
                x += dx;
                y += dy;
               
                requestAnimationFrame(draw)
}
 
document.addEventListener("mousemove", mouseMoveHandler, false);
 
function mouseMoveHandler (e) {
                var relativeX = e.clientX - canvas.offsetLeft;
                if (relativeX > 0 && relativeX < canvas.width) {
                                paddleX = relativeX - paddleWidth / 2;
                }
}
 
draw();