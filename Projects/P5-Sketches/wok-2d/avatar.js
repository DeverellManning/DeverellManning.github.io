
class Avatar extends phys{
	constructor(yGround){
		let avatarHeight = 20;
		super(64, yGround.y + avatarHeight, 10, 20);
		this.Height = 20;
		this.fillColor = color(175, 15, 0);
		this.hatColor = color(50, 256, 50);
		this.health = 6;
		this.jumpStrength = 14;
		this.dy = 0;
		this.dx = 0;
		this.walking=0;
		this.speed=3;
		this.curGround = yGround;
		this.onGround=false;
	}
	keyPress(key) {
		if (key == ' ' || this.isOnGround(150)){ // spacebar
		if (keyIsDown(65)) {//a
		this.jump(-1);
		} else if (keyIsDown(68)) {//d
		this.jump(1);
		} else {
		this.jump(0);
		}
		}
		if (key == 'a') {
		this.walkleft();
		}
		if (key == 'd') {
		this.walkright();
		}
	}
	keyRelease(key) {
	if (key == 'a' || key == 'd') {
	this.stopwalking();
	}
	}
	jump(dir){
	if (dir == 0) {
	this.dy += -this.jumpStrength;
	}
	if (dir == 1) {
	this.dy += -this.jumpStrength*1.1;
	this.dx += this.jumpStrength*0.8;
	}
	if (dir == -1) {
	this.dy += -this.jumpStrength*1.1;
	this.dx += this.jumpStrength*-0.8
	}
	}
		walkleft() {
		this.walking=-1;
	}
	walkright() {
		this.walking=1;
	}
	stopwalking() {
		this.walking=0;
	}
	hurt(damage) {
		this.health=this.health-damage;
	}
	setGround(gin){
		this.curGround=gin;
	}
	isOnGround(dev){
		//console.log(this.y + this.Height >= (this.curGround.y - dev), "hey")
		return (this.y + this.Height >= (this.curGround.y - dev));
	}
	updatephys(){
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
		this.dy += gravity;
		this.dy *= 0.9; // some air resistance
		this.dx *= 0.9;
	}
	update() {
		this.updatephys();
		if (this.y > 600) {
		this.hurt(0.5);
		}
		if (this.health < 0) {
		isGameOver = true;
		noLoop(); // game is over, stop game loop
		}
		if (this.isOnGround(5)) {
		// hit the ground
		//console.log("hit")
		this.y = this.curGround.y - this.height + 10;
		this.dy = -floor(this.dy/2);
		}
		if (this.walking == 1 /*&& this.isOnGround(15)*/) {
		this.dx=(this.dx+this.speed)/2;
		}
		if (this.walking == -1 /*&& this.isOnGround(15)*/) {
		this.dx=(this.dx-this.speed)/2;
		}
	}
	draw(){
		push();
		//noStroke();
		fill(this.fillColor);
		rect(this.x - cam.x, this.y - cam.y, this.width, this.height);
		rect(this.x - cam.x, this.y - cam.y, this.width, this.height);
		fill(this.hatColor);
		rect((this.x-3) - cam.x, this.y - cam.y-4, this.width+6, 4);
		pop();
	}
}

