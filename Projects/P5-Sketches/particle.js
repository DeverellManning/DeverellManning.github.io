class particle {
  constructor(_x, _y, _r, _g, _b, state) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.g = _g;
    this.b = _b;
    this.s = state;
  }
}

let d = 1;  //pixelDensity()


function dpo(bx, by, r=0, g=0, b=0) {
	bx=floor(bx)*4
	by=floor(by)*-4 + vasY
	for (var x = 0; x < 4; x++) {
		for (var y = 0; y < 4; y++) {
			set( bx + x, by + y, [r,g,b,256])
		}
	}
}

let _mX=400
function dp(bx, by, r=0, g=0, b=0) {
	bx=floor(min(bx, 124))*4
	by=floor(by)*-4 + vasY
	for (var x = 0; x < 4; x++) {
		for (var y = 0; y < 4; y++) {
			index = 4 * ((by+y) * vasX + bx+x);
			pixels[index] = r;
			pixels[index+1] = g;
			pixels[index+2] = b;
			pixels[index+3] = 256;
		}
	}
}
