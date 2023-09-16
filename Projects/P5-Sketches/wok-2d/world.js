class WorldProto {
	constructor(worldtype) {
		//object lists
		this.obj = [];
		this.clouds = [];
		//this.physlist = [];
		//this.drawlist = [];
		//this.barriers = [];
		//this.foliage = [];
		
		this.wind = 0.1;
		this.minX = 0;
		this.maxX = 3000;
		this.maxY = 600;
		
		this.time = 0;
		this.sky = 100;
	}
	isWorld() {return true;}
	createWorld() {
		this.time = 0;
		
		this.obj = [];
		for(let i = 0; i <= 10; i++){
			this.add(new Barrierdep(wok, random(100, maxX), ground.y+400), "");
		}
		for(let i = 0; i <= 8; i++){
			wok.add(new boxx(i*40+2000, 100), "boxx" + i);
		}
		
		for(let i = 0; i <= maxX; i=i+20){
			if (random(0,1) < cos(i/100)-0.1) {
				wok.add(new Tree(i+random(-6,6), ground.y));
			}
		}
		
		for(let i = 0; i <= 8; i++){
			this.clouds.push(new Cloud((i*200+random(-10,10))*3,40+random(-20,80),2,1));
		}
	}
	
	add (object, name) {
		if (object.isWorldObj() === true) {
			object.setWorld(this);
			this.obj.push(object);
			
		} else {
		}
	}
	checkCollisions() {
		for (let i = 0; i <= this.obj.length-1; i++){
			this.obj[i];
		}
	}
	update() {
		this.time++;
		this.wind = cos(millis()/8000)*0.45;
		
		for(let i = this.clouds.length - 1; i >= 0; i--){
			this.clouds[i].update();
		}
	
		for (let i = 0; i <= this.obj.length-1; i++){
			this.obj[i].update();
		}
	}
	draw() {
		background(this.sky);
		for (let i = 0; i <= this.clouds.length-1; i++){
			this.clouds[i].draw();
		}
		for (let i = 0; i <= this.obj.length-1; i++){
			if (this.obj[i].doesDraw() && this.obj[i].x < cam.x + screenW*2 && this.obj[i].x + 100 > cam.x ) {
				this.obj[i].draw();
			}
		}
	}
}
