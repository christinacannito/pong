$(document).ready(function(){
    var table = $('#table'); // gets the canvas element
    var tableContext = table[0].getContext('2d');
 
    var halfWay = table.height() / 2;
    var endPoint = table.width();
    var canvasWidth = table.width();
    var canvasHeight = table.height();
 
    var leftPaddleScore = 0;
    var rightPaddleScore = 0;
 
    function drawCanvas () {
        tableContext.beginPath();
        tableContext.moveTo(0, halfWay);  // starting point
        tableContext.lineTo(endPoint, halfWay); // end point
        tableContext.strokeStyle = "#EDBBA2";
        tableContext.lineWidth = 5;
        tableContext.stroke(); // draw the tableContext
        tableContext.closePath();
    } // just to draw the actual table
 
    function Paddle (x, y, width, height, speed, paddleSide) {
        this.x = x; // current x
        this.y = y; // current y
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.paddleSide = paddleSide;
        this.render = function() {
            tableContext.beginPath();
            tableContext.rect(this.x, this.y, width, height);
            tableContext.fillStyle = "#B2B6AB";
            tableContext.fill();
            tableContext.closePath();
        } // this will draw the object
        var paddleObject = this;
        this.move = function () {
            $(window).keydown(function(e){
                if (paddleObject.paddleSide  == "left") {
                    console.log('was left')
                    if (e.which == 90 && paddleObject.y >= 0) {
                        console.log('up was pressed')
                        console.log('paddleObject.y: ', paddleObject.y )    
                        // move up 7 spaces (along Y)                                                  
                    } else if (e.which == 65 && paddleObject.y <= canvasHeight - paddleObject.height) {
                        paddleObject.y += 10;
                    }
                } else if (paddleObject.paddleSide == "right") {
                    if (e.which == 38 && paddleObject.y >= 0) {
                        paddleObject.y -= 10;                                               
                    } else if (e.which == 40 && paddleObject.y <= canvasHeight - paddleObject.height) {
                        paddleObject.y += 10;
                    }
                }
            })
        }            
    }
                // function Ball (x, y, radius, leftPaddle, rightPaddle) (best)
    function Ball (x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = 2;
        this.speedY = -2;
        this.render = function() {
            tableContext.beginPath();
            tableContext.arc(this.x, this.y, this.radius, 0, Math.PI *2);
            tableContext.fillStyle = "#F2DFCA";
            tableContext.fill();
            tableContext.closePath();
 
            if ( this.y + this.speedY + this.radius < 0 ) {
                this.speedY = -this.speedY;
            } // this is for the top wall
 
            if (this.y + this.speedY + this.radius > canvasHeight) {
                this.speedY = -this.speedY;
            } // this is for the bottom
 
            // bouncing off left and right
            // if the ball hits these two wall then a point is scored
            var rightPaddleWall = canvasWidth - this.radius - rightPaddle.width;
            var rightPaddleTopY = rightPaddle.y;
            var rightPaddleBottomY = rightPaddle.y + rightPaddle.height;
            if (this.x + this.speedX > rightPaddleWall) { // solves for x
                if ((this.y + this.speedY < rightPaddleBottomY ) && (this.y + this.speedY > rightPaddleTopY)) { // solves for y
                    this.speedX = - this.speedX;
                }
                // hits the paddle 
            } // right side wall
 
            // this is ONLY FOR THE WALL
            if (this.x + this.speedX + this.radius > canvasWidth) { // right side wall // FACTOR IN FOR THE PADDLE
                // left paddle has scored a point
                this.speedX = - this.speedX;
                if (leftPaddleScore == 0) {
                    tableContext.clearRect(0, 0, canvasWidth, canvasHeight);
                    
                    var font = $('#table'); // gets the canvas element
                    var myfont = font[0].getContext('2d');
                    myfont.font = "30px Arial";
                    myfont.fontStyle = "red";
                    myfont.Baseline = "center";
                    myfont.textAlign = "center"
                    myfont.fillText("Hello World",10,50);

                    tableContext.beginPath()
                    tableContext.rect(20, 20, 760, 360);
                    tableContext.fillStyle = "#A7848B";
                    tableContext.fill();
                    tableContext.closePath();

                    cancelAnimationFrame(animationId);
                } else {
                    leftPaddleScore += 1;
                }
            }
 
            // solving for the left side paddle
            var leftPaddleWall = this.radius + leftPaddle.width;
            var leftPaddleTopY = leftPaddle.y;
            var leftPaddleBottomY = leftPaddle.y + leftPaddle.height;
            if (this.x + this.speedX < leftPaddleWall) { // solves for x
                console.log('ball hit paddle')
                if ((this.y + this.speedY < leftPaddleBottomY ) && (this.y + this.speedY > leftPaddleTopY)) { // solves for y
                    this.speedX = - this.speedX;
                }
                // hits the paddle 
            } // right side wall
            if (this.x + this.speedX + this.radius  < 0) { // left side // FACTOR IN FOR THE PADDLE
                // right paddle scores
                // rightPaddleScore += 1;
                rightPaddleScore += 1;
                this.speedX = - this.speedX
             }
 
            this.x += this.speedX;
            this.y += this.speedY;
        } // this will draw the object
    } // end of ball object
    function drawScore () {
        tableContext.beginPath();
        tableContext.font = "30px Trebuchet MS";
        tableContext.fillStyle = "#BD5532";
        tableContext.textAlign = "center";
        tableContext.fillText("Left player score: " + leftPaddleScore, 150, 350);
        tableContext.fillText("Right player score: " + rightPaddleScore, 600, 350);
        tableContext.closePath();
    }
 
    var paddleHeight = 100;
    var leftPaddle = new Paddle(0, 10, 50, paddleHeight, 2, "left");
    var rightPaddle = new Paddle(750, 20, 50, paddleHeight, 2, "right");
    rightPaddle.move();
    leftPaddle.move();
    var firstBall = new Ball(90, 100, 20, leftPaddle, rightPaddle);
 
 
    var requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback) { window.setTimeout(callback, 1000/60) };
    function animate() {
                    tableContext.clearRect(0, 0, canvasWidth, canvasHeight);
        drawCanvas();
        rightPaddle.render();
        leftPaddle.render();
        firstBall.render()
                    drawScore();
                    var animationId = requestAnimationFrame(animate);
    }
    animate();
})