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
	function Paddle(xpos, ypos, pwidth, pheight, pcolor) {
		this.xpos = xpos;
		this.ypos = ypos;
		this.pwidth = pwidth;
		this.pheight = pheight;
		this.pcolor = pcolor;
	} // paddle object

	// might change the parameters here
	function Player (paddle) {
		this.paddle = new Paddle(0, 200, 20, 20, "#F5A999");
	} // player object

	function Computer (paddle) {
		this.paddle = new Paddle(200, 800, 20, 20, "#D3D4C4");
	} // computer object

	function Ball (ballx, bally) {
		// inside here you are just going to draw the ball and place it on the canvas
		this.ballx = ballx;
		this.bally = bally;

		var ball = table[0].getContext('2d');
		ball.beginPath();
		ball.arc(100, 75, 50, 0, 2 * Math.PI)
		ball.stroke();
	}

	function render (object) {
		var object = table[0].getContext('2d');
		
	}

});