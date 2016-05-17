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
            // inside the render is where you will check for collisions
        } // this will draw the object
        var paddleObject = this;
        console.log('y: ', this.y)
        console.log('paddleObject: ', paddleObject)
        this.move = function () {
            // this will update the position of the paddle
            // paddles only move along the Y axis

            // you want the paddles to not be able to go out side of the canvas
            // since they can only travel along the Y axis just check for top and bottom
            // y is at first set to 10
            // top because top row is at 0
            // as long as the position of the paddle is greater than zero and less than the height of the canvas you can move it
            // you can keep moving the paddle
            $(window).keydown(function(e){
                if (paddleObject.paddleSide  == "left") {
                    console.log('was left')
                    if (e.which == 90 && paddleObject.y >= 0) {
                        console.log('up was pressed')
                        console.log('paddleObject.y: ', paddleObject.y )
                        paddleObject.y -= 10;      
                        // move up 7 spaces (along Y)                                                   
                    } else if (e.which == 65 && paddleObject.y <= canvasHeight - paddleObject.height) {
                        console.log('down was pressed')
                        console.log('paddleObject.y: ', paddleObject.y)
                        paddleObject.y += 10;
                        // move down 7 spaces (along Y)
                    }
                } else if (paddleObject.paddleSide == "right") {
                    if (e.which == 38 && paddleObject.y >= 0) {
                        console.log('up was pressed')
                        console.log('paddleObject.y: ', paddleObject.y )
                        console.log('this.y: ', this.y )
                        paddleObject.y -= 10;      
                        // move up 7 spaces (along Y)                                                   
                    } else if (e.which == 40 && paddleObject.y <= canvasHeight - paddleObject.height) {
                        console.log('down was pressed')
                        console.log('paddleObject.y: ', paddleObject.y)
                        paddleObject.y += 10;
                        // move down 7 spaces (along Y)
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
            // inside the render is where you will check for collisions

            // every time you render you have to check to see if the ball hits a wall
            if ( this.y + this.speedY < 0 ) {
                this.speedY = -this.speedY;
            } // this is for the top wall

            if (this.y + this.speedY > canvasHeight) {
                this.speedY = -this.speedY;
            } // this is for the bottom

            // bouncing off left and right
            // if the ball hits these two wall then a point is scored
            var rightPaddleWall = canvasWidth - this.radius - rightPaddle.width;
            console.log('rightPaddle.y: ', rightPaddle.y, 'rightPaddle.height: ', rightPaddle.height)
            var rightPaddleTopY = rightPaddle.y;
            var rightPaddleBottomY = rightPaddle.y + rightPaddle.height;
            console.log('rightPaddleTopY: ', rightPaddleTopY)
            console.log('rightPaddleBottomY: ', rightPaddleBottomY)
            if (this.x + this.speedX > rightPaddleWall) { // solves for x
                console.log('ball hit paddle')
                if ((this.y + this.speedY < rightPaddleBottomY ) && (this.y + this.speedY > rightPaddleTopY)) { // solves for y
                    this.speedX = - this.speedX;
                } else {
                    // it missed the paddle
                    leftPaddleScore += 1;
                }
                // hits the paddle
                
            } // right side wall 

            if (this.x + this.speedX > canvasWidth - this.radius) { // right side wall // FACTOR IN FOR THE PADDLE 
                // left paddle has scored a point
                this.speedX = - this.speedX
                leftPaddleScore += 1;
                // leftPaddleScore += 1; // left did score because it touched the right side 
                // you can't score if you hit the paddle so point not added when hits paddle
                // where is the paddle on the canvas?
                console.log('leftpaddle inside ball: ', leftPaddle.y);
                console.log('rightpadd inside ball: ', rightPaddle.y); // can get the paddle objects inside the ball 
                // so if it hits the paddle there is no point! 

                // with the paddle object passed into the ball object you can now access that object inside this object
                // console.log('this.x: ', this.x, 'paddle.x: ', Paddle.x) // true
                // console.log('this.x: ', this.x, 'paddle.width + paddle.x: ', paddle.width + paddle.x)
                // paddle.x is always 750 - because that is the first point it is created with
                // so the paddle object has to always be able to keep track of the ball object
            }



            // zero represents the left of the canvas
            if (this.x + this.speedX < 0 + this.radius ) { // left side // FACTOR IN FOR THE PADDLE
                // right paddle scores
                // rightPaddleScore += 1;
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
 
    // creation of the objects
    // variables
    var paddleHeight = 100;
    var leftPaddle = new Paddle(0, 10, 50, paddleHeight, 2, "left");
    var rightPaddle = new Paddle(750, 20, 50, paddleHeight, 2, "right");
    rightPaddle.move();
    leftPaddle.move();
    var firstBall = new Ball(90, 100, 20, leftPaddle, rightPaddle); // should instantiate ball with paddles as inputs
    // var firstBall = new Ball(90, 100, 20, leftPaddle, rightPaddle);

    var requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback) { window.setTimeout(callback, 1000/60) };

    function winner () {
        if (leftPaddleScore == 2) {
            // console.log('left paddle won!')
        } else if (rightPaddleScore == 2) {
            // console.log('right paddle won')
        } else {
            animate();
        }
    }
 
    function animate() {
	    // all the drawing for the game gets done here
	    // first you have to clear the canvas
	    tableContext.clearRect(0, 0, canvasWidth, canvasHeight);
        drawCanvas();
           
        rightPaddle.render();
        leftPaddle.render();
        firstBall.render()
	    drawScore();

        

	    requestAnimationFrame(animate);
    }
    winner();
    

})