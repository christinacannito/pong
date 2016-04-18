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

	// requestAnimationFrame for all browsers
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	// variable for the animation
	var counter = 0;
	var id;

	var increment = 2;
	var decrement = -2;

	// the prototype for the paddles
	function Paddle(speed, x, y) {
		this.speed= speed;
		this.paddleContext = table[0].getContext('2d');
		this.x = x;
		this.y = y;
		this.render = function (x, y) {
			this.paddleContext.beginPath(); // WILL NOT CLEAR WITHOUT THIS
			this.paddleContext.rect(this.x, this.y, 50, 100); // x, y, width, height
			this.paddleContext.stroke();
		}
		console.log('outside x:', this.x, 'y: ', this.y)
		var self = this;
		this.move = function(location) {
			console.log('inside move')
			if (location == 'left') {
				$(window).on('keydown', function(e){
					// this inside here refers to the keydown
					if ( e.which == 38 ) {
						console.log('up was pressed');
						// Inside here is where you want the animation to take place
						// animation of the paddles 
						function animate (timestamp) { // paddle here is the paddle object
							// (x, y, width, height)
							self.paddleContext.clearRect(self.x, self.y, 55, 400); // needs to clear what was there
							// then redraw the paddles
							console.log('y: ', self.y)
							// console.log('y += change: ', self.y += change)
							self.paddleContext.beginPath(); // WILL NOT CLEAR WITHOUT THIS
							// self.y += change;
							self.y += decrement; // global var
							self.paddleContext.rect(self.x, self.y, 50, 100); // x, y, width, height
							self.paddleContext.stroke();

							counter += 1; // keeps track of the steps

							console.log('counter: ', counter)

							if (counter < 20) { // once counter is equal to 20 it will stop
								id = requestAnimationFrame(animate)
								console.log('id: ', id)
							}

							id = requestAnimationFrame(animate);
							window.cancelAnimationFrame(id);
						}
						if (self.y >= 0 && self.y < 296) {
 							requestAnimationFrame(animate); // will only animate within these pixels
						} else if (self.y > 294) {
							requestAnimationFrame(animate)
							console.log('self.y: ', self.y)
						}
					} else if ( e.which == 40 ) {
						console.log('down was pressed');
						function animate (timestamp) { // paddle here is the paddle object
							// (x, y, width, height)
							console.log('x: ', self.x, 'y: ', self.y)
							// if y == 262 then you can't go down any further

							self.paddleContext.clearRect(self.x, self.y - 100, 55, 400); // needs to clear what was there
							self.paddleContext.beginPath(); // WILL NOT CLEAR WITHOUT THIS
							self.y += increment; //global var
							self.paddleContext.rect(self.x, self.y, 50, 100); // x, y, width, height
							self.paddleContext.stroke();

							counter += 1; // keeps track of the steps

							console.log('counter: ', counter)

							if (counter < 20) { // once counter is equal to 20 it will stop
								id = requestAnimationFrame(animate)
							}

							id = requestAnimationFrame(animate);
							window.cancelAnimationFrame(id);
						}
						if (self.y >= 0 && self.y < 296) {
 							requestAnimationFrame(animate); // will only animate within these pixels
						} else if (self.y < 0) {
							requestAnimationFrame(animate)
						} else {
							// do not animate
						}
					}
				})
			} else if (location == 'right') {
				$(window).on('keydown', function(e){
					// this inside here refers to the keydown
					if ( e.which == 65 ) {
						console.log('up was pressed');
						// Inside here is where you want the animation to take place
						// animation of the paddles 
						function animate (timestamp) { // paddle here is the paddle object
							// (x, y, width, height)
							self.paddleContext.clearRect(self.x, self.y, 50, 400); // needs to clear what was there
							// then redraw the paddles
							console.log('y: ', self.y)
							// console.log('y += change: ', self.y += change)
							self.paddleContext.beginPath(); // WILL NOT CLEAR WITHOUT THIS
							// self.y += change;
							self.y += decrement; // global var
							self.paddleContext.rect(self.x, self.y, 50, 100); // x, y, width, height
							self.paddleContext.stroke();

							counter += 1; // keeps track of the steps

							console.log('counter: ', counter)

							if (counter < 20) { // once counter is equal to 20 it will stop
								id = requestAnimationFrame(animate)
								console.log('id: ', id)
							}

							id = requestAnimationFrame(animate);
							window.cancelAnimationFrame(id);
						}
						if (self.y >= 0 && self.y < 296) {
 							requestAnimationFrame(animate); // will only animate within these pixels
						} else if (self.y > 294) {
							requestAnimationFrame(animate)
							console.log('self.y: ', self.y)
						}
					} else if ( e.which == 90 ) {
						console.log('down was pressed');
						function animate (timestamp) { // paddle here is the paddle object
							// (x, y, width, height)
							console.log('x: ', self.x, 'y: ', self.y)
							// if y == 262 then you can't go down any further

							self.paddleContext.clearRect(self.x, self.y, 55, 400); // needs to clear what was there
							self.paddleContext.beginPath(); // WILL NOT CLEAR WITHOUT THIS
							self.y += increment; //global var
							self.paddleContext.rect(self.x, self.y, 50, 100); // x, y, width, height
							self.paddleContext.stroke();

							counter += 1; // keeps track of the steps

							console.log('counter: ', counter)

							if (counter < 20) { // once counter is equal to 20 it will stop
								id = requestAnimationFrame(animate)
							}

							id = requestAnimationFrame(animate);
							window.cancelAnimationFrame(id);
						}
						if (self.y >= 0 && self.y < 296) {
 							requestAnimationFrame(animate); // will only animate within these pixels
						} else if (self.y < 0) {
							requestAnimationFrame(animate)
						} else {
							// do not animate
						}
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
		this.ballX = ballX;
		this.ballY = ballY;
		this.speed = 10;
		this.ball = table[0].getContext('2d');
		this.render = function(){
			this.ball.beginPath();
			this.ball.arc(this.ballX, this.ballY, 20, 0, 2 * Math.PI) // x, y, radius, s angle, e angle
			this.ball.stroke();
		}
		// now you want to have the animation for the ball here
		// ideally should have random direction and random speed...
		this.move = function(timestamp) {
			console.log('ball move')
			$(window).on('click', function(){
				function motion (timestamp) {
					// will have to keep deleting then redrawing the ball
					// will start to move in x and y position...those number must increase or decrease by the speed 
					
					this.ballX = Math.floor((Math.random() * 5) + 1);
					this.ballY = Math.floor((Math.random() * 5) + 1); // seeing where the ball will go when the game first start gives you a random number
					// so now the ball has a new location value 


					requestAnimationFrame(motion)
				}
				requestAnimationFrame(motion)
			})
		}
		
	}

	// drawing, creating the objects
	var firstBall = new Ball(200, 100);
	firstBall.render(); // draws the ball
	firstBall.move();

	var leftPaddle = new Paddle(20, 0, 100);
	leftPaddle.render(0, 100);
	console.log('leftPaddle: ', leftPaddle)
	leftPaddle.move('left'); // keycodes up || down
	// next you are going to want to move the paddle

	var rightPaddle = new Paddle(20, 750, 100);
	rightPaddle.render(750, 100);
	rightPaddle.move('right') // want different keycodes...use z||a 
});