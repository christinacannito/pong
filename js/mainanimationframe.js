$(document).ready(function(){
    // nav active states
    $('nav li').on('click', function(){
        console.log('this for nav item: ', $(this))
        if ($(this).hasClass('homeNav')) {
            // clicked on homeNave
            // remove what is there and show homeNav
            // show box1 and hide all other boxes
 
            // what box is currently there?
            $('.box2').animate({
                top: '30%',
                opacity: 0
            }, 2000)
            $('.box3').animate({
                top: '30%',
                opacity: 0
            }, 2000)
            $('.box4').animate({
                top: '30%',
                opacity: 0
            }, 2000, function(){
                $('.box1').animate({
                    top: '30%',
                    opacity: 1
                }, 2000, function(){
 
                })
            })
        } else if ($(this).hasClass('rulesNav')) {
            $('.box1').animate({
                top: '30%',
                opacity: 0
            }, 2000)
            $('.box3').animate({
                top: '30%',
                opacity: 0
            }, 2000)
            $('.box4').animate({
                top: '30%',
                opacity: 0
            }, 2000, function(){
                $('.box2').animate({
                    top: '-10%',
                    opacity: 1
                }, 2000, function(){
 
                })
            })
        } else if ($(this).hasClass('playersNav')) {
            $('.box1').animate({
                top: '30%',
                opacity: 0
            }, 2000)
            $('.box2').animate({
                top: '30%',
                opacity: 0
            }, 2000)
            $('.box4').animate({
                top: '30%',
                opacity: 0
            }, 2000, function(){
                $('.box3').animate({
                    top: '-50%',
                    opacity: 1
                }, 2000, function(){
 
                })
            })
        } else if ($(this).hasClass('boardNav')) {
            $('.box1').animate({
                top: '30%',
                opacity: 0
            }, 2000)
            $('.box2').animate({
                top: '30%',
                opacity: 0
            }, 2000)
            $('.box3').animate({
                top: '30%',
                opacity: 0
            }, 2000, function(){
                leftPaddle.move('autoTwo', firstBall);
                // leftPaddle.watch(firstBall)
                animateAi();
                $('.box4').animate({
                    top: '-85%',
                    opacity: 1
                }, 2000, function(){
 
                })
            })
        }
        $('nav li').removeClass('active');
        $(this).addClass('active');
    });
 
    // when you click on a nav option whatever div is currently being displayed needs to go up and the div that was clicked on needs to appear
 
 
    // box1
    $('.enterBtn').on('click', function(){
        console.log('enter button clicked');
        $('nav li').removeClass('active');
        $('.rulesNav').addClass('active');
        $('.outline').animate({ // leaving
            top: -($('.outline').height() + $('.outline').offset().top + 10),
            opacity: 0
        }, 2000, function(){
            console.log('animation complete')
            // make another div appear
            $('.box2').animate({ // coming in
                opacity: 1,
                top: '-4%'
            }, 2000, function(){
                console.log('rules should be showing');
            })
        });
    })
 
    // box2
    $('.yes').on('click', function(){
        $('nav li').removeClass('active');
        $('.playersNav').addClass('active');
        $('.box2').animate({ //leaving
            top: -($('.box2').height() + $('.box2').offset().top + 10),
            opacity: 0
        }, 2000, function(){
            console.log('animation complete')
            // make another div appear
            $('.box3').animate({
                opacity: 1,
                top: '-50%'
            }, 2000, function(){
                console.log('rules should be showing');
            })
        });
    })
 
    // box3
    $('.personSvg, .computerSvg').on('click', function(){
        $('nav li').removeClass('active');
        $('.boardNav').addClass('active');
        $('.box3').animate({ // leaving
            top: -($('.box3').height() + $('.box3').offset().top + 10),
            opacity: 0
        }, 2000, function(){
            console.log('animation complete')
            // make another div appear
            $('.box4').animate({ // coming in
                opacity: 1,
                top: '-90%'
            }, 2000, function(){
                $('.controls').css({'visibility': 'visible', 'opacity': '1'})
                console.log('rules should be showing');
            })
        });
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
            // var rightPaddleWall = canvasWidth - this.radius - rightPaddle.width;
            // var rightPaddleTopY = rightPaddle.y;
            // var rightPaddleBottomY = rightPaddle.y + rightPaddle.height;
            // if (Math.floor(this.x) + Math.floor(this.speedX) > rightPaddleWall) { // solves for x
            //     // console.log('ballX: ', ballX, 'ballY: ', ballY)
            //     if ((this.y + this.speedY <= rightPaddleBottomY) && (this.y + this.speedY >= rightPaddleTopY) || (this.y + this.speedY <= rightPaddleBottomY) && (this.y + this.speedY <= 50)) { // solves for y
            //         this.speedX = -this.speedX;
            //     }
            //     // hits the paddle
            // } // right side wall
            // // SOLVES FOR RIGHT PADDLE
 
            // SOVLING FOR TOP, BOTTOM, AND FRONT OF RIGHT PADDLE
                       // solving for the left side paddle
            var rightPaddleWall = canvasWidth - this.radius - rightPaddle.width;
            var rightPaddleTopY = rightPaddle.y;
            var rightPaddleBottomY = rightPaddle.y + rightPaddle.height;
            if (Math.floor(this.x) >= rightPaddleWall) { // will detect the RIGHT paddle wall
                // console.log('ballX: ', Math.floor(ballX), 'ballY: ', Math.floor(ballY))
                // console.log('leftPaddleTopY: ', leftPaddleTopY, 'leftPaddleBottomY: ', leftPaddleBottomY)
                if ((this.y + this.speedY + this.radius <= rightPaddleBottomY) && (this.y + this.speedY + this.radius >= rightPaddleTopY)) {
                    // needs to be at least at the wall starting point
                    // solves for the front side of the paddle
                    console.log('RIGHT PADDLE: hitting the front of the paddle')
                    this.speedX = -this.speedX;
                    Math.floor(this.speedX);
                 }
 
                if ( ((Math.floor(this.y) + Math.floor(this.radius)) <= rightPaddle.y) ) {
                    // hit the top of the paddle
                    console.log('RIGHT PADDLE: solving for the top of the paddle')
                    this.speedY = -this.speedY;
                    Math.floor(this.speedY); // ball hitting the top of the paddle
                } 
 
                if ( ((Math.floor(this.y) - this.radius) <= (rightPaddle.y + rightPaddle.height)) ) {
                    console.log('RIGHT PADDLE: solving for the bottom of the paddle')
                    this.speedY = -this.speedY;
                    Math.floor(this.speedY);
                } // ball hitting the bottom of the paddle
                // hits the paddle
            } // RIGHT PADDLE WALL - BALL HITS RIGHT PADDLE
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
            } // right side wall - SCORES POINT FOR LEFT PADDLE
            // solving for the left side paddle
            var leftPaddleWall = this.radius + leftPaddle.width;
            var leftPaddleTopY = leftPaddle.y;
            var leftPaddleBottomY = leftPaddle.y + leftPaddle.height;
            if (Math.floor(this.x) <= leftPaddleWall) { // will detect the left paddle wall
                // console.log('ballX: ', Math.floor(ballX), 'ballY: ', Math.floor(ballY))
                // console.log('leftPaddleTopY: ', leftPaddleTopY, 'leftPaddleBottomY: ', leftPaddleBottomY)
                if ((this.y + this.speedY + this.radius <= leftPaddleBottomY) && (this.y + this.speedY + this.radius >= leftPaddleTopY)) {
                    // needs to be at least at the wall starting point
                    // solves for the front side of the paddle
                    console.log('hitting the front of the paddle')
                    this.speedX = -this.speedX;
                    Math.floor(this.speedX);
                 }
 
                if ( ((Math.floor(this.y) + Math.floor(this.radius)) <= leftPaddle.y) ) {
                    // hit the top of the paddle
                    console.log('solving for the top of the paddle')
                    this.speedY = -this.speedY;
                    Math.floor(this.speedY); // ball hitting the top of the paddle
                } 
 
                if ( ((Math.floor(this.y) - this.radius) <= (leftPaddle.y + leftPaddle.height)) ) {
                    console.log('solving for the bottom of the paddle')
                    this.speedY = -this.speedY;
                    Math.floor(this.speedY);
                } // ball hitting the bottom of the paddle
                // hits the paddle
            } // LEFT PADDLE WALL - BALL HITS LEFT PADDLE
 
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
                } // right paddle gets a point
            } // LEFT SIDE WALL - RIGHT PADDLE SCORES POINT
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
    var ballX = Math.floor(Math.random() * 700) + 60;
    var ballY = Math.floor(Math.random() * 300) + 10;
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
 
    $('.personSvg').on('click', function(){
        // show users to enter in their names
        // $('.rulesOutline').animate({
        //     top: -($('.rulesOutline').height() + $('.rulesOutline').offset().top + 10),
        //     opacity: 0
        // }, 2000, function(){
        //     console.log('now the board should be displayed')
        // });
        // $('.controls').css({'visibility': 'visible', 'opacity': '1'})
        // // $('.startOfGame').css({'visibility': 'hidden', 'width': '0', 'height': '0'});
        // $('.board').css({'visibility': 'visible', 'width': '800', 'height': '400'})
        //    $('.board').animate({
        //     opacity: 1,
        //     top: -200
        // }, 2000, function(){
 
        // })
        animatePerson();
    })
    $('.computerSvg').on('click', function(){
        // show users to enter in their names
        // $('.startOfGame').css({'visibility': 'hidden', 'width': '0', 'height': '0'});
        // $('.board').css('visibility', 'visible')
        // $('.rulesOutline').animate({
        //     top: -($('.rulesOutline').height() + $('.rulesOutline').offset().top + 10),
        //     opacity: 0
        // }, 2000, function(){
        //     console.log('now the board should be displayed')
        // });
        // $('.controls').css({'visibility': 'visible', 'opacity': '1'})
        // // $('.startOfGame').css({'visibility': 'hidden', 'width': '0', 'height': '0'});
        // $('.board').css({'visibility': 'visible', 'width': '800', 'height': '400'})
        //    $('.board').animate({
        //     opacity: 1,
        //     top: -200
        // }, 2000, function(){
 
        // })
        leftPaddle.move('autoTwo', firstBall);
        // leftPaddle.watch(firstBall)
        animateAi();
    })
})