$(document).ready(function(){
	$('.pausePlay').on('click', function(){
		console.log('play clicked')
		if($('.fa').hasClass('fa-play')) {
			$('.fa').removeClass('fa-play');
			$('.fa').addClass('fa-pause')
			
			cancelAnimationFrame(animationId);
		} else if ($('.fa').hasClass('fa-pause')) {
			$('.fa').removeClass('fa-pause');
			$('.fa').addClass('fa-play')
			animate();
		} 
	})

    var table = $('#table'); // gets the canvas element
    var tableContext = table[0].getContext('2d');

    var halfWay = table.height() / 2;
    var endPoint = table.width();
    var canvasWidth = table.width();
    var canvasHeight = table.height();

    var leftPaddleScore = 0;
    var rightPaddleScore = 0;

    var animationId;

    function drawCanvas () {
		tableContext.beginPath();
        tableContext.rect(5, 5, canvasWidth - 10, canvasHeight - 10);
        tableContext.fillStyle = "#FAFBE3";
        tableContext.fill();
        tableContext.closePath();

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
                    console.log('paddleObject.y <= canvasHeight - paddleObject.height: ',paddleObject.y <= canvasHeight - paddleObject.height)
                    console.log('canvasHeight - paddleObject.height: ', canvasHeight - paddleObject.height)
                    if (e.which == 90 && (paddleObject.y <= 300)) { // going down 
                        console.log('up was pressed')
                        console.log('paddleObject.y: ', paddleObject.y )     
                        // move up 7 spaces (along Y)
						paddleObject.y += 10;
						// canvasHeight - paddleObject.height is always going to be 300
                    } else if (e.which == 65 && paddleObject.y >= 0) { // this is going up
                        paddleObject.y -= 10; 
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
            tableContext.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            tableContext.fillStyle = "#F2DFCA";
            tableContext.fill();
            tableContext.closePath();

            console.log("ballY: ", this.y, "ballX: ", this.x)
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
                console.log('ballX: ', ballX, 'ballY: ', ballY)
                if ((this.y + this.speedY + 20 <= rightPaddleBottomY) && (this.y + this.speedY + 20 >= rightPaddleTopY)) { // solves for y
                    this.speedX = -this.speedX;
                }
                // hits the paddle  
            } // right side wall 

            // this is ONLY FOR THE WALL
            if (this.x + this.speedX + this.radius > canvasWidth) { // right side wall // FACTOR IN FOR THE PADDLE 
                // left paddle has scored a point
                this.speedX = -this.speedX;
                if (leftPaddleScore == 1) { // points to that the game will go up to
                	tableContext.clearRect(0, 0, canvasWidth, canvasHeight);

                	// tableContext.beginPath();
					tableContext.beginPath();
                	tableContext.rect(20, 20, 760, 360);
                	tableContext.fillStyle = "#B2B6AB";
                	tableContext.fill();
                	tableContext.closePath();

                	tableContext.font = "30px Arial";
                	tableContext.fillStyle = "#FFF";
                	tableContext.textAlign = "center";
                	tableContext.Baseline = "top";
                	if (leftPaddleScore > rightPaddleScore) {
                        tableContext.fillText("Left player won!", 400, 200 );
                    } else if (leftPaddleScore < rightPaddleScore) {
                        tableContext.fillText("Right player won!", 400, 200 );
                    } else {
                        tableContext.fillText("Tie!", 400, 200 );
                    }

                    $('.controls').css('visibility', 'hidden')
                   	$('.winner').css('visibility', 'visible')
                	$('.playagain').on('click', function(){
                		location.reload(); // should create a new game 
                	})

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
                console.log('ballX: ', ballX, 'ballY: ', ballY)
                console.log('leftPaddleTopY: ', leftPaddleTopY, 'leftPaddleBottomY: ', leftPaddleBottomY)
                if ((this.y + this.speedY + 20 <= leftPaddleBottomY + 20) && (this.y + this.speedY + 20 >= leftPaddleTopY + 20)) { // solves for y
                    // needs to be at least at the wall starting point 
                    this.speedX = -this.speedX;
                }
                // hits the paddle  
            } // right side wall 
            if (this.x + this.speedX + this.radius < 0) { // left side // FACTOR IN FOR THE PADDLE
                // right paddle scores
                // rightPaddleScore += 1;
                this.speedX = -this.speedX
                // set up scoring: 
                if (rightPaddleScore == 1) { // points to that the game will go up to
                    tableContext.clearRect(0, 0, canvasWidth, canvasHeight);

                    // tableContext.beginPath();
                    tableContext.beginPath();
                    tableContext.rect(20, 20, 760, 360);
                    tableContext.fillStyle = "#B2B6AB";
                    tableContext.fill();
                    tableContext.closePath();

                    tableContext.font = "30px Arial";
                    tableContext.fillStyle = "#FFF";
                    tableContext.textAlign = "center";
                    tableContext.Baseline = "top";
                    if (leftPaddleScore > rightPaddleScore) {
                        tableContext.fillText("Left player won!", 400, 200 );
                    } else if (leftPaddleScore < rightPaddleScore) {
                        tableContext.fillText("Right player won!", 400, 200 );
                    } else {
                        tableContext.fillText("Tie!", 400, 200 );
                    }

                    $('.controls').css('visibility', 'hidden')
                    $('.winner').css('visibility', 'visible')
                    $('.playagain').on('click', function(){
                        location.reload(); // should create a new game 
                    })

                    cancelAnimationFrame(animationId);
                } else {
                    rightPaddleScore += 1;
                }
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
    var paddleWidth = 50;
    var leftPaddle = new Paddle(0, 10, paddleWidth, paddleHeight, 2, "left");
    var rightPaddle = new Paddle(750, 20, paddleWidth, paddleHeight, 2, "right");
    rightPaddle.move();
    leftPaddle.move();
    var ballRadius = 20;
    var ballX = Math.random() * (800 - 50) + 50;
    var ballY = Math.random() * (400 - 100) + 100;
    var firstBall = new Ball(ballX, ballY, ballRadius, leftPaddle, rightPaddle);


    var requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback) { window.setTimeout(callback, 1000/60) };
 
    function animate() {
    	animationId = requestAnimationFrame(animate);
	    tableContext.clearRect(0, 0, canvasWidth, canvasHeight);
        drawCanvas();
        rightPaddle.render();
        leftPaddle.render();
        firstBall.render()
	    drawScore();
	    
    }

    $('.person').on('click', function(){
        // show users to enter in their names
        $('.controls').css('visibility', 'visible')
        $('.startOfGame').css({'visibility': 'hidden', 'width': '0', 'height': '0'});
        $('.board').css('visibility', 'visible')
        animate();
    })
})