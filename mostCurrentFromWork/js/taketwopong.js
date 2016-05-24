$(document).ready(function(){
	var table = $('#table');
	var canvaswidth = $('#table').width();
	var canvasheight = $("#table").height();
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	
	function drawTable () {
		var line = table[0].getContext('2d');
		line.beginPath();
		line.moveTo(0, canvasheight / 2);
		line.lineTo(canvaswidth, canvasheight / 2);
		line.strokeStyle = "#EDBBA2";
		line.lineWidth = 3;
		line.stroke();
		line.closePath();
	}

	function Paddle (speed, x, y, width, height) {
		this.speed = speed;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.drawPaddle = function() {
			var paddleContext = table[0].getContext('2d');
			paddleContext.beginPath();
			paddleContext.rect(this.x, this.y, this.width, this.height);
			paddleContext.stroke();
			paddleContext.closePath();
		}
	}

	function Ball (ballX, ballY) {
		this.ballX = ballX;
		this.ballY = ballY;
		this.ballRadius = 20;
		this.dx = 2;
		this.dy = -2;

		this.drawBall = function () {
			var ball = table[0].getContext('2d');
			ball.clearRect(0, 0, canvaswidth, canvasheight)
			console.log(this.ballX)
			ball.beginPath();
			ball.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
			ball.stroke();
			ball.closePath();
			this.ballX += this.dx;
			this.ballY += this.dy;
		}
	}

	// create the objects
	var newball = new Ball(200, 100);
	var newPaddle = new Paddle(20, 0, 100, 50, 100);

	function startGame () {
		drawTable(); // draw the table
		newPaddle.drawPaddle() ; // draw the paddle
		newball.drawBall() // draw the ball
		requestAnimationFrame(startGame);
	}
	startGame();
	// draw the table
	// create and draw the paddle
})