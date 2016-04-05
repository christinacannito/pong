$(document).ready(function(){
	// drawing the table
	var table = $('#table'); // get the canvas element
	// console.log("table: ", table)	
	var line = table[0].getContext('2d'); // getContext ?
	line.moveTo(0, 200);  // starting point
	line.lineTo(800, 200); // end point
	line.strokeStyle = "#EDBBA2";
	line.lineWidth = 5;
	line.stroke(); // draw the line

	// the prototype for the paddles
	function Paddle(speed) {
		// this.xpos = xpos;
		// this.ypos = ypos;
		// this.pwidth = pwidth;
		// this.pheight = pheight;
		// this.pcolor = pcolor;
		this.speed= speed;
		this.render = function (x, y, pwidth, pheight) {
			var paddle = table[0].getContext('2d');
			paddle.rect(x, y, pwidth, pheight); // x, y, width, height
			paddle.stroke();
		}
		this.move = function(speed, pheight) {
			console.log('inside move')
			console.log('speed: ', speed)
			$(window).keydown(function(e){
				console.log('inside keydown')
				console.log('e: ', e.which)
				if ( e.which == 38 ) {
					console.log('up was pressed');
					// you will want redraw the paddle up 6pixels every time the up arrow is pressed 
					pheight = pheight + speed; 
					console.log('pheight HERE: ', pheight);
					requestAnimationFrame(animate(pheight)); // then say to animate the paddle
				} else if ( e.which == 40 ) {
					console.log('down was pressed');
					// will want to move the paddle down 6 pixels every time the down arrow is pressed
					pheight = pheight - speed;
					requestAnimationFrame(animate(pheight)); // then say to animate the paddle
				}
			})			
		}
	} // paddle object

	// might change the parameters here
	function Player (paddle) {
		this.paddle = new Paddle(0, 200, 20, 20);
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

	// animating the objects
	var animate = function (step) {
		// console.log('step: ', step)
		// requestAnimationFrame(animate);
		// animate something
		// console.log('inside animate function')

		// then you have to change the paddle coordinates
		leftPaddle.render(0, pheight, 50, 100);
	}

	// requestAnimationFrame(animate); // will get called from the move function

	// drawing, creating the objects
	var firstBall = new Ball(200, 100);
	firstBall.render(); // draws the ball

	var leftPaddle = new Paddle(6);
	leftPaddle.render(0, 100, 50, 100);
	leftPaddle.move(6, 100);

	var rightPaddle = new Paddle(6);
	rightPaddle.render(750, 100, 50, 100);
});