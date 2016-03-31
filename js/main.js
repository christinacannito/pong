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



});