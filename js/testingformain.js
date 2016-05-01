$(document).ready(function(){
	var table = $('#table'); // gets the canvas element
	var tableContext = table[0].getContext('2d');

	var halfWay = table.height() / 2;
	var endPoint = table.width();
	var canvasWidth = table.width();
	var canvasHeight = table.height();

	function drawCanvas () {
	    tableContext.beginPath();
	    tableContext.moveTo(0, halfWay);  // starting point
	    tableContext.lineTo(endPoint, halfWay); // end point
	    tableContext.strokeStyle = "#EDBBA2";
	    tableContext.lineWidth = 5;
	    tableContext.stroke(); // draw the tableContext
	    tableContext.closePath();
	} // just to draw the actual table

	

	function Paddle (x, y, width, height, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.render = function() {
			tableContext.beginPath();
			tableContext.rect(this.x, this.y, width, height);
			tableContext.fillStyle = "#B2B6AB"
			tableContext.fill();
			tableContext.closePath();
			// inside the render is where you will check for collisions
		} // this will draw the object
		var paddleObject = this;
		console.log('y: ', this.y)
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
				if (e.which == 38 && paddleObject.y >= 0) {
						console.log('up was pressed')
						console.log('paddleObject.y: ', paddleObject.y )
						paddleObject.y -= 2;	
						// move up 7 spaces (along Y)
					
				} else if (e.which == 40 && paddleObject.y <= canvasHeight - paddleObject.height) {
					console.log('down was pressed')
					console.log('paddleObject.y: ', paddleObject.y)
						paddleObject.y += 2;
						// move down 7 spaces (along Y)
					
				}
			})
		}	
	}

	function  Ball (x, y, radius) {
		this.x = x; 
		this.y = y;
		this.radius = radius;
		this.render = function() {
			tableContext.beginPath();
			tableContext.arc(this.x, this.y, this.radius, 0, Math.PI *2);
			tableContext.fillStyle = "#F2DFCA";
			tableContext.fill();
			tableContext.closePath();
			// inside the render is where you will check for collisions
		} // this will draw the object
	}

	var leftPaddle = new Paddle(0, 10, 50, 100, 2);
	

	var rightPaddle = new Paddle(750, 20, 50, 100, 2);
	

	var firstBall = new Ball(90, 100, 20)
	

	var requestAnimationFrame = window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };

    function animate() {
    	// all the drawing for the game gets done here

    	// first you have to clear the canvas 

    	tableContext.clearRect(0, 0, canvasWidth, canvasHeight);
		drawCanvas();
		rightPaddle.move();
		rightPaddle.render();
		leftPaddle.render();
		firstBall.render()
    	

    	requestAnimationFrame(animate);
    }
    animate()
})