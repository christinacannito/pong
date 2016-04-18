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
		this.move = function() {
			console.log('inside move')
			$(window).on('keydown', function(e){
				// this inside here refers to the keydown
				if ( e.which == 38 ) {
					console.log('up was pressed');
					// Inside here is where you want the animation to take place
					// animation of the paddles 
					function animate (x, y) { // paddle here is the paddle object
						// (x, y, width, height)
						self.paddleContext.clearRect(self.x, self.y, 55, 400); // needs to clear what was there
						// then redraw the paddles
						self.paddleContext.beginPath(); // WILL NOT CLEAR WITHOUT THIS
						self.paddleContext.rect(self.x, self.y -= 2, 50, 100); // x, y, width, height
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
					console.log('self paddle: ', self) // this you see the paddle object
					animate(self.x, self.y)
				} else if ( e.which == 40 ) {
					console.log('down was pressed');
					function animate (x, y) { // paddle here is the paddle object
						// (x, y, width, height)
						console.log('x: ', x, 'y: ', y)
						// if y == 262 then you can't go down any further

						self.paddleContext.clearRect(self.x, self.y + -100, 55, 400); // needs to clear what was there
						self.paddleContext.beginPath(); // WILL NOT CLEAR WITHOUT THIS
						self.paddleContext.rect(self.x, self.y += 2, 50, 100); // x, y, width, height
						self.paddleContext.stroke();

						counter += 1; // keeps track of the steps

						console.log('counter: ', counter)

						if (counter < 20) { // once counter is equal to 20 it will stop
							id = requestAnimationFrame(animate)
						}

						id = requestAnimationFrame(animate);
						window.cancelAnimationFrame(id);
					}
					console.log('self paddle: ', self) // this you see the paddle object
					animate(self.x, self.y)
				}
			})
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

	function Ball (ballx, bally) {
		// inside here you are just going to draw the ball and place it on the canvas
		this.ballx = ballx;
		this.bally = bally;
		this.render = function(){
			var ball = table[0].getContext('2d');
			ball.beginPath();
			ball.arc(this.ballx, this.bally, 50, 0, 2 * Math.PI) // x, y, radius, s angle, e angle
			ball.stroke();
		}
	}

	// drawing, creating the objects
	var firstBall = new Ball(200, 100);
	firstBall.render(); // draws the ball

	var leftPaddle = new Paddle(20, 0, 100);
	leftPaddle.render(0, 100);
	console.log('leftPaddle: ', leftPaddle)
	leftPaddle.move();
	// next you are going to want to move the paddle

	var rightPaddle = new Paddle(20, 750, 100);
	rightPaddle.render(750, 100);
	rightPaddle.move() // want different keycodes
});