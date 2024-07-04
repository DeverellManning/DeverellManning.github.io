//base.classes.js:
class base {}

class world_obj{
constructor (td, tp, x, y) {
//super()
this.x = x;
this.y = y;
this.w = 0;
this.h = 0;
this.layer = 1;// -1 = hidden, 0 = back layer,
// 1 = main layer, 2 = front layer
}
setWorld(world) {
if (world.isWorld() === true) {
//if (td === true) {}
//if (tp === true) {}
} else {
console.log("Error!");
noLoop();
}
}
isWorldObj() {return true;}
doesCollide() {return true;}
doesDraw() {return true;}
getLeft() {return this.x;}
getRight() {return this.x + this.w;}
getBottom() {return this.y + this.h;}
getTop() {return this.y;}
draw() {
push();
translate(cam.vec());
fill(128);
rect(this.x, this.y, this.w, this.h);
pop();
}
update() {
return true;
}
}
