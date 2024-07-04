//camera.js:
class Camera {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.sx = 0;
		this.sy = 0;
		this.speed = 3.1; //scroll speed
		this.zoom = 0;
	}
	scroll(x,y) {
		this.sx = floor(x);
		this.sy = floor(y);
	}
	vec() { //Get the Camera Vector
		return createVector(-this.x, this.y)
	}
	update() {
		//console.log(this.sx)
		if (this.sx > this.x) {
			this.x = this.x + min(this.speed, this.sx - this.x);
		}
		if (this.sx < this.x) {
			this.x = this.x + min(-this.speed, this.sx - this.x);
		}
		if(this.x > -screenW/2) {
			this.x = max(this.x, 0)
		}

		this.x = floor(this.x)
		if (this.sy > 1) {
		this.sy = this.sy - 1;
		this.y = this.y + 1;
		}
	}
}
