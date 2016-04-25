// creating and appending the canvas element
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// adding the background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
}

bgImage.src = "background.png";


// hero image 
var heroReady = false;
var heroImage = new Image(); 
heroImage.onload = function () {
	heroReady = true; 
}
heroImage.src = "hero.png"

// monster image 
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
	monsterReady = true;
};
monsterImage.src = "monster.png"

// game objects 
var hero = {
	speed: 256, 
	x: 0, 
	y: 0
};

var monster = {
	x: 0, 
	y: 0
};

var monstersCaught = 0;


// handle keyboard controls
var keysdown = {};

addEventListener('keydown', function(e){
	keysdown[e.KeyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysdown[e.keyCode];
}, false);


// reset the game when the player catches a monster
var reset = function() {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64))
}


// update the game objects
var update = function (modifier) {
	if (38 in keysdown ) { // player holding up 
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysdown) { // player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysdown) { // player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysdown) { // player holding right
		hero.x += hero.speed * modifier;
	}


	// are they touching
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
		) {
		++monsterCaught;
		reset();
	}
}

// draw everything 
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, heroImage.x, heroImage.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y)
	}

	// score 
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
}


// the main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// request to do this again ASAP
	requestAnimationFrame(main)
}


// to start the game 
var then = Date.now();
reset();
main();
















