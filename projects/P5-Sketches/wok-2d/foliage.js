//foliage.js:
tree_type = ["Accia",
			 "Oak",
			 "Birch"/*,
			 "none"*/
]

class Decor extends world_obj{
	constructor(x, y, w, h){
		super(true, true, x, y);
		this.w = w;
		this.h = h;
	}
	checkIfCollision(shape){return false;}//can not collide
	left_overlap(shape){return false;}
	right_overlap(shape){return false;}
	bottom_overlap(shape){return false;}
	top_overlap(shape){return false;}
}
class Tree extends Decor{
	constructor(xIn, yIn){
		let type = random(tree_type);
		let y = yIn - 40;
		let x = xIn;
		super(x, y, 4, 40);
		this.leafColor = color(50, 150, 100);
		this.trunkColor = color(50);
		this.leafwidth = random(4,9);
		this.leafheight = 10;
		if (type == "Accia") {
			this.leafColor = color(45, 150, 87);
			this.trunkColor = color(128);
			this.h = random(50, 150);
			this.leafwidth = random(8,50);
		} else if (type == "Oak") {
			this.leafColor = color(35, 100, 77);
			this.trunkColor = color(170,128, 98);
			this.leafheight = random(30,50);
			this.leafwidth = this.leafheight/2+random(-10,10);
			this.h = random(30, 60);
		} else if (type == "Birch") {
			this.leafColor = color(130, 170, 97);
			this.trunkColor = color(250,256, 240);
			this.h = random(40, 90);
			this.leafheight = random(40,this.h);
		} if (type == "none") {} else {
		}
		this.y = yIn - this.h;
	}
	update(){
		//this.updatephys();
	}
	draw(){
		push();
		//noStroke();
		translate(cam.vec());
		fill(this.trunkColor);
		rect(this.x, this.y, this.w, this.h);
		fill(this.leafColor);
		rect(3*wok.wind+this.x-this.leafwidth, this.y - this.leafheight, 3*wok.wind+this.w+this.leafwidth*2, this.leafheight);
		pop();
	}
}
class Cloud extends Decor{
	update() {
	this.x = this.x + wok.wind;
	}
draw(){
	push();
	translate(cam.vec().div(3));
	translate(createVector(this.x, this.y));
	scale(1.8, 1, 2);
	noStroke();
	fill(248, 255, 240);
	beginShape  ();
	vertex(30, 20);
	vertex(60, 10);
	vertex(90, 20);
	vertex(100, 50);
	vertex(85, 80);
	vertex(55, 60);
	vertex(35, 80);
	vertex(20, 50);
	vertex(30, 20);
	endShape();
	pop();
	}
}
