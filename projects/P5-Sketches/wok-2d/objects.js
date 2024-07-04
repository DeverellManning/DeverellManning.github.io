//objects.js:
class Barrierdep extends world_obj{
	constructor(world, x, yIn){
		let barrierWidth = random(10, 20);
		let barrierHeight = random(10, 60);
		super(world, true, true, 0, 0);
		this.y = yIn - barrierHeight;
		this.x = x;
		this.w = 5;
		this.h = 5;
		this.fillColor = color(0);
		this.hasScoredYet = false;
	}
	checkIfCollision(shape){
		return this.overlaps(shape);
	}
	update(){
	//this.updatephys();
	}
}

class boxx extends world_obj{
	constructor(x, y){
		super(true, true, x, y);
		this.w = 5;
		this.h = 5;
	}
	update() {
	this.y = this.y + 1;
	}
}
