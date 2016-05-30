$(document).ready(function(){
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
        this.move = function (aiType, ball) {
            var self = this;
            if (aiType == 'auto') {
                window.setInterval(function(){
                    if (paddleObject.y >= 0 && paddleObject.y <= canvasHeight - paddleObject.height) {
                        var randomNum = Math.floor((Math.random() * 300) + 1);
                        if (randomNum % 2 == 0) {
                            paddleObject.y += Math.floor((Math.random() * 60) + 1);
                        } else {
                            paddleObject.y -= Math.floor((Math.random() * 60) + 1);
                        }
                    } else {
                        paddleObject.y = 1;
                    }
                   
                }, 200)
            } else if (aiType == 'autoTwo') {
                window.setInterval(function(){
                    self.ball = ball.observe();
                    console.log('self.ball inside the autoTwo: ', self.ball.y)
                    // have access to the ball information
                    if (self.ball.y > 200) { // if self.ball x position is ___ move the paddle
                        // move the paddle to the bottom
                        paddleObject.y = 250;
                    } else if (self.ball.y < 200) {
                        // move the paddle to the top
                        paddleObject.y = 50;
                    }
               }, 200)
            } else {
                // player vs player
                $(window).keydown(function(e){
                    if (paddleObject.paddleSide == "left") {
                        console.log('was left')
                        console.log('paddleObject.y <= canvasHeight - paddleObject.height: ', paddleObject.y <= canvasHeight - paddleObject.height)
                        console.log('canvasHeight - paddleObject.height: ', canvasHeight - paddleObject.height)
                        if (e.which == 90 && (paddleObject.y <= 300)) { // going down
                            console.log('up was pressed')
                            console.log('paddleObject.y: ', paddleObject.y)
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
    }
     // function Ball (x, y, radius, leftPaddle, rightPaddle) (best)
    function Ball (x, y, radius) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.radius = radius;
        this.speedX = 2;
        this.speedY = -2;
        console.log('this.y before inside render: ', this.y);
        this.observe = function() {
            var self = this;
            return {
                x: self.x,
                y: self.y,
                speedX: self.speedX,
                speedY: self.speedY
            };
        };  
        this.render = function() {
            tableContext.beginPath();
            tableContext.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            tableContext.fillStyle = "#F2DFCA";
            tableContext.fill();
            tableContext.closePath();
 
            console.log("ballY: ", Math.floor(this.y), "ballX: ", Math.floor(this.x))
            if ( Math.floor(this.y) + Math.floor(this.speedY) < 0 + this.radius) {
                console.log('inside if for')
                this.speedY = -this.speedY;
                Math.floor(this.speedY)
            } // this is for the top wall
 
            if (Math.floor(this.y) + Math.floor(this.speedY) + this.radius > canvasHeight) {
                this.speedY = -this.speedY;
                Math.floor(this.speedY)
            } // this is for the bottom
 
            // bouncing off left and right
            // if the ball hits these two wall then a point is scored
            var rightPaddleWall = canvasWidth - this.radius - rightPaddle.width;
            var rightPaddleTopY = rightPaddle.y;
            var rightPaddleBottomY = rightPaddle.y + rightPaddle.height;
            if (Math.floor(this.x) + Math.floor(this.speedX) > rightPaddleWall) { // solves for x
                console.log('ballX: ', ballX, 'ballY: ', ballY)
                if ((this.y + this.speedY <= rightPaddleBottomY) && (this.y + this.speedY >= rightPaddleTopY) || (this.y + this.speedY <= rightPaddleBottomY) && (this.y + this.speedY <= 50)) { // solves for y
                    this.speedX = -this.speedX;
                }
                // hits the paddle 
            } // right side wall
 
            // this is ONLY FOR THE WALL
            if (Math.floor(this.x) + Math.floor(this.speedX) + this.radius > canvasWidth) { // right side wall // FACTOR IN FOR THE PADDLE
                // left paddle has scored a point
                this.speedX = -this.speedX;
                Math.floor(this.speedX)
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
            if (Math.floor(this.x) + Math.floor(this.speedX) <= leftPaddleWall) { // solves for x
                // console.log('ballX: ', Math.floor(ballX), 'ballY: ', Math.floor(ballY))
                // console.log('leftPaddleTopY: ', leftPaddleTopY, 'leftPaddleBottomY: ', leftPaddleBottomY)
                if ((Math.floor(this.y) + Math.floor(this.speedY) + this.radius <= leftPaddleBottomY) && (Math.floor(this.y) + Math.floor(this.speedY) + this.radius >= leftPaddleTopY)) { // solves for y
                    // needs to be at least at the wall starting point
                    this.speedX = -this.speedX;
                    Math.floor(this.speedX);
                } else if ( ((Math.floor(this.x) + Math.floor(this.speedX) + this.radius) >= leftPaddle.y) && (Math.floor(this.x) + Math.floor(this.speedX) + this.radius) <= 50) {
                     // hit the top of the paddle
                     console.log('solving for the top of the paddle')
                     this.speedX = -this.speedX;
                     Math.floor(this.speedX);
                } else if ( ((Math.floor(this.y) + Math.floor(this.speedY) + this.radius) <= (leftPaddle.y + leftPaddle.height)) || (Math.floor(this.x) + Math.floor(this.speedX) + this.radius) <= 50) {
                     // hit the BOTTOM of the paddle
                     console.log('ballX: ', this.x, 'ballY: ', this.y)
                     console.log('leftPaddleTopY: ', leftPaddle.y, 'leftPaddleBottomY: ', leftPaddle.y + leftPaddle.height)
                     console.log('solving for the bottom of the paddle')
                     this.speedX = -this.speedX;
                     Math.floor(this.speedX);
                }
                // hits the paddle
            } // right side wall
 
            if (Math.floor(this.x) + Math.floor(this.speedX) < 0 + this.radius) { // left side // FACTOR IN FOR THE PADDLE
                // right paddle scores
                // rightPaddleScore += 1;
                this.speedX = -this.speedX
                console.log('math.floor: ', Math.floor(this.speedX))
                Math.floor(this.speedX)
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
            Math.floor(this.x)
            this.y += this.speedY;
            Math.floor(this.y)
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
    rightPaddle.move('person', firstBall);
    leftPaddle.move('person', firstBall);
    var ballRadius = 20;
    var ballX = Math.random() * (750 - 50) - 50;
    var ballY = Math.random() * (350 - 100) -  50;
    var firstBall = new Ball(ballX, ballY, ballRadius, leftPaddle, rightPaddle);
 
 
    var requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback) { window.setTimeout(callback, 1000/60) };
    $('.pausePlay').on('click', function(){
        console.log('play clicked')
        if($('.fa').hasClass('fa-play')) {
            $('.fa').removeClass('fa-play');
            $('.fa').addClass('fa-pause')
           
            cancelAnimationFrame(animationId);
        } else if ($('.fa').hasClass('fa-pause')) {
            $('.fa').removeClass('fa-pause');
            $('.fa').addClass('fa-play')
            animatePerson();
        }
    })
 
    function animatePerson() {
        animationId = requestAnimationFrame(animatePerson);
        tableContext.clearRect(0, 0, canvasWidth, canvasHeight);
        drawCanvas();
        rightPaddle.render();
        leftPaddle.render();
        firstBall.render()
        drawScore();
    } // this is going to be calling these functions about every 60 frames per second
 
    function animateAi() {
        animationId = requestAnimationFrame(animateAi);
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
        animatePerson();
    })
 
    $('.computer').on('click', function(){
        // show users to enter in their names
        $('.controls').css('visibility', 'visible')
        $('.startOfGame').css({'visibility': 'hidden', 'width': '0', 'height': '0'});
        $('.board').css('visibility', 'visible')
        leftPaddle.move('autoTwo', firstBall);
        // leftPaddle.watch(firstBall)
        animateAi();
    })
})