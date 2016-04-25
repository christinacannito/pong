$(document).ready(function(){
    // drawing the table
    var table = $('#table'); // get the canvas element
    // console.log("table: ", table)  
    var line = table[0].getContext('2d'); // getContext ?
    line.beginPath();
    line.moveTo(0, 200);  // starting point
    line.lineTo(800, 200); // end point
    line.strokeStyle = "#EDBBA2";
    line.lineWidth = 5;
    line.stroke(); // draw the line
    // make another class that is called gameboard

    var canvasWidth = $('canvas').width();
    var canvasHeight = $('canvas').height();

    // requestAnimationFrame for all browsers
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // variable for the animation
    var counter = 0;
    var id;

    var increment = 2;
    var decrement = -2;

    var context = table[0].getContext('2d');

    // the prototype for the paddles
    function Paddle(speed, x, y) {
        this.speed= speed;
        this.x = x;
        this.y = y;
        this.paddleHeight = 100;
        this.paddleWidth = 50;
        this.render = function () {
            // this.paddleContext.clearRect(0, 0, 800, 400); // needs to clear what was there
            // paddles
            context.beginPath(); // WILL NOT CLEAR WITHOUT THIS
            context.rect(this.x, this.y, this.paddleWidth, this.paddleHeight); // x, y, width, height
            context.fillStyle="#EDBBA2";
            context.fillRect(this.x, this.y, this.paddleWidth, this.paddleHeight);
        }
        console.log('outside x:', this.x, 'y: ', this.y)
        var self = this;
        this.moveUp = function (moveCB) {
            console.log('up was pressed');
            // Inside here is where you want the animation to take place
            // animation of the paddles
            if (moveCB) {
                moveCB();
                if (moveCB()) {
                     self.y -= 2;
                }
            } else {
                self.y -= 2;
            }
        }
        this.moveDown = function() {
            self.y += 2;
        }
        this.move = function(location) {
            console.log('inside move')
            if (location == 'left') {
                $(window).on('keydown', function(e){
                    // this inside here refers to the keydown
                    if ( e.which == 38) {
                        self.moveUp(function(){
                            if (self.y >= 0 && self.y < 296) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                    } else if ( e.which == 40) {
                        console.log('down was pressed');
                        self.moveDown();
                    }
                })
            } else if (location == 'right') {
                $(window).on('keydown', function(e){
                    // this inside here refers to the keydown
                    if ( e.which == 65 ) {
                        self.moveUp(function(){
                            if (self.y >= 0 && self.y < 296) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                    } else if ( e.which == 90) {
                        console.log('down was pressed');
                        self.moveDown();
                    }
                })
            }
        }
    } // paddle object


    // move animation function outside of the paddle object

    // might change the parameters here
    function Player (paddle) {
        this.paddle = new Paddle(0, 200, 20, 20);
        console.log('paddle btm: ', this.paddle)
    } // player object

    function Computer (paddle) {
        this.paddle = new Paddle(200, 800, 20, 20);
    } // computer object

    function Ball (ballX, ballY) {
        // inside here you are just going to draw the ball and place it on the canvas
        console.log('ball')
        this.ballX = ballX;
        this.ballY = ballY;
        this.ballWidth = 20;
        this.ballHeight = 20;
        this.ballRadius = 20;
        this.ballDX = 5;
        this.ballDY = 5;
        this.speed = 10;
        this.renderBall = function(){
            console.log('render ball: ', this.ballY)
            this.collide();
            this.ball = table[0].getContext('2d');
            this.ball.beginPath();
            this.ball.arc(this.ballX, this.ballY, 20, 0, 2 * Math.PI) // x, y, radius, s angle, e angle
            this.ball.stroke();
        }
        // now you want to have the animation for the ball here
        // ideally should have random direction and random speed...
        var ballThis = this;
        this.move = function(timestamp) { // the ball moves now when you click but now you don't need a click event to trigger the move
        	console.log('ball move')
        	console.log('right paddle: ', rightPaddle)
        	// $(window).on('click', function(){
        	console.log('inside window click in ball move')
	        function motion () { // collision should take in a paddle object as an argument
	            console.log('ballThis.ballHeight + ballThis.ballY: ', ballThis.ballHeight + ballThis.ballY)
	            // will have to keep deleting then redrawing the ball
	            // will start to move in x and y position...those number must increase or decrease by the speed
	            console.log('ballThis.ballX + ballThis.ballWidth : ', ballThis.ballX + ballThis.ballWidth )
	            ballThis.ballX += ballThis.ballDX;
	            ballThis.ballY += ballThis.ballDY; // seeing where the ball will go when the game first start gives you a random number
	            console.log('ballThis.ballY: ', ballThis.ballY)
	            // so now the ball has a new location value
	            // requestAnimationFrame(motion)
	            console.log('rightPaddle.paddleWidth: ', rightPaddle.paddleWidth)
	            // you also have to test for if the ball collides into the paddle

	            if (ballThis.ballX >= canvasWidth - 10 || ballThis.ballX < 10) { // ballThis.ballX == the perimeter of the canvas
	                            console.log('reached the end of canvas')
	                ballThis.ballDX =- ballThis.ballDX
	                // point can be logged in here
	            } else if (ballThis.ballY >= canvasHeight - 10 || ballThis.ballY < 10) {
	                console.log('reached the bottom of canvas')
	                ballThis.ballDY =- ballThis.ballDY;
	                //ballThis.ballX = ballThis.ballY; // instead of resetting to zero it should bouce off of the surface
	            }// this will be for stopping the ball
	        } // requestAnimationFrame(motion)
	        motion()       
    	} // end of move
    	this.collide = function (gameObject) {
    		// ballx + radius = front of the 
            console.log('inside collide')
            console.log('rightPaddle.paddleWidth / 2): ', rightPaddle.paddleWidth + 10)
    	    if (this.ballX <= (leftPaddle.x + 70) 
                && this.ballY <= (leftPaddle.y + 100)
                ) {
                ballThis.ballDY =- ballThis.ballDY;
            }   
        	// if (this.ballX <= (rightPaddle.x + rightPaddle.paddleWidth - 25)
      //           && rightPaddle.x <= (this.ballX + this.ballRadius - 25)
      //           && this.ballY <= (rightPaddle.y + rightPaddle.paddleHeight - 25)
      //           && rightPaddle.y <= (this.ballY + this.ballRadius - 25)) {
      //          console.log('!!!!!!!collision');
      //           ballThis.ballDY =- ballThis.ballDY;
      //          // return true;
      //       } else if (this.ballX <= (leftPaddle.x + leftPaddle.paddleWidth)
      //           && leftPaddle.x <= (this.ballX + this.ballRadius)
      //           && this.ballY <= (leftPaddle.y + leftPaddle.paddleHeight)
      //           && leftPaddle.y <= (this.ballY + this.ballRadius)) {
      //       	return false;
      //       }
    	}
    }

    // drawing, creating the objects
    var firstBall = new Ball(200, 100);
    // firstBall.renderBall(); // draws the ball
   

    var leftPaddle = new Paddle(20, 0, 100);
    leftPaddle.render(0, 100);
    console.log('leftPaddle: ', leftPaddle)
    leftPaddle.move('left'); // keycodes up || down
    // next you are going to want to move the paddle

    var rightPaddle = new Paddle(20, 750, 100);
    rightPaddle.render(750, 100);
    rightPaddle.move('right') // want different keycodes...use z||a
    console.log('rightPaddle: ')

    var animate = function (timestamp) {// paddle here is the paddle object, also have to render the ball here
        // (x, y, width, height)
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        leftPaddle.render(); // then redraw the paddles
        rightPaddle.render();
       
        firstBall.renderBall();
        firstBall.move();

        // line can be broken out into a board object
        var line = table[0].getContext('2d'); // getContext ?
        line.beginPath();
        line.moveTo(0, 200);  // starting point
        line.lineTo(800, 200); // end point
        line.strokeStyle = "#EDBBA2";
        line.lineWidth = 5;
        line.stroke(); // draw the line

        id = requestAnimationFrame(animate)
    }
    animate();
});