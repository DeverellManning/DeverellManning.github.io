//sketch.js:
// This is a simple side scroller
// By Jon Froehlich
// See also:
// - My simple flappy bird:
//https://editor.p5js.org/jonfroehlich/sketches/sFOMDuDaw
// - A more complicated flappy bird:
//https://editor.p5js.org/jonfroehlich/sketches/shtF6XFeY
//
// Extension Ideas
// X Have scrolling background (using parallax)
// - Have pits that you have to jump over
// - have platforms to jump on
// - have different barrier shapes and use
//https://github.com/bmoren/p5.collide2D
// X control x position of player (like SMB)
// - Use animated sprites for character (running and jump)
// - Jump height controlled by how long you hold down space (similar to SMB)
let ground;
let avatar;
let barriers;
let isGameOver = false;
let hasGameBegun = false;
let score = 0;
cam = new Camera(0, 0);
wok = new WorldProto("");
function preload() {
console.log("1");
//arcadeFont = loadFont('arcadefont.ttf');
}
function drawScore() {
	fill(0);
	textAlign(LEFT);
	textSize(15);
	text('Score:' + score, 10, 20);
	textAlign(RIGHT);
	text('Health:' + avatar.health + "\nTime:" + floor(wok.time/10), screenW-55, 20);
	
	if (isGameOver) {
	// dark overlay
	fill(0, 0, 0, 100);
	rect(0, 0, width, height);
	// draw game over text
	textAlign(CENTER);
	textSize(35);
	fill(255);
	text('GAME OVER!', width / 2, height / 3);
	textSize(12);
	text('Press SPACE BAR to play again.', width / 2, height / 2);
	}else if(hasGameBegun == false){
	// if we're here, then the game has yet to begin for the first time
	// dark overlay
	fill(0, 0, 0, 100);
	rect(0, 0, width, height);
	// draw game over text
	textAlign(CENTER);
	textSize(15);
	fill(255);
	text('Press 8 to start!', width / 2, height / 3);
	}
}
//Input
function keyPressed(){
avatar.keyPress(key);
if (key == 'q') {
noLoop();
}
// check for special states (game over or if game hasn't begun)
if (key == 'r') {
resetGame();
}
if (isGameOver == true && key == ' ') {
resetGame();
}else if(hasGameBegun == false){
hasGameBegun = true;
loop();
}
}
function keyReleased(){
avatar.keyRelease(key);
}
function setup() {
createCanvas(screenW, screenH);
resetGame();
// stop game loop until space bar hit to begin
noLoop();
}
function resetGame(){
	console.log("1");
	score = 0;
	isGameOver = false;
	ground = new Ground();
	leftwall = new Wall(0, ground.y);
	rightwall = new Wall(maxX, ground.y);
	table = new Table(100, ground.y);
	wok.createWorld();
	avatar = new Avatar(ground);
	wok.add(new Tree(10, 100));

	barriers = [];
	for(let i = 0; i <= 16; i++){
	barriers.push(new Barrier(random(100, maxX), ground.y+400));
	}

	loop();	
}

//Loop
function Update() {
	cam.update();
	wok.update();
	avatar.update();
	leftwall.update();
	rightwall.update();
	table.update();
	ground.update();

	// loop through all the barriers and update them
	for(let i = barriers.length - 1; i >= 0; i--){
		barriers[i].update();
		//if we hit the barrier, end game
		if(isInvincible != true &&
		barriers[i].checkIfCollision(avatar)){
		isGameOver = true;
		noLoop(); // game is over, stop game loop
		}
		if(barriers[i].hasScoredYet == false && barriers[i].getRight() <
		avatar.x){
		barriers[i].hasScoredYet = true;
		score++;
		}
	}
	if(leftwall.checkIfCollision(avatar)){
	avatar.stopwalking();
	avatar.dx=-avatar.dx;
	avatar.dy=-avatar.dy;
	}
	if(rightwall.checkIfCollision(avatar)){
	avatar.stopwalking();
	avatar.dx=-avatar.dx;
	avatar.dy=-avatar.dy;
	}
	cam.scroll(avatar.x-(screenW/2), 0);
}
function draw() {
	Update();

	//background(220);
	wok.draw();
	for(let i = 0; i <= barriers.length-1; i++){
		barriers[i].draw();
	}
	//let millisecond = millis();
	//text('Milliseconds \nrunning: \n' + millisecond, 140, 0);
	ground.draw();
	leftwall.draw();
	rightwall.draw();
	table.draw();
	avatar.draw();
	//line(0, 0, mouseX, mouseY);
	drawScore();
}
