class phys extends Shape{
constructor(x, y, width, height){
super(x, y, width, height);
this.y = y;
this.x = x;
this.fillColor = color(100);
this.dx = 0;
this.dy = 0;
}
checkIfCollision(shape){
return this.overlaps(shape);
}
isOnGround(){
return this.y >= this.yGround - this.height;
}
updatephys(){
this.x = this.x + this.dx;
this.y = this.y + this.dy;
this.dy += gravity;
this.dy *= 0.95; // some air resistance
this.dx *= 0.9;
if(this.left_overlap(avatar)){
avatar.stopwalking();
avatar.dx=min(-avatar.dx, -1);
}
if(this.right_overlap(avatar)){
avatar.stopwalking();
avatar.dx=max(-avatar.dx,1);
}
if(this.top_overlap(avatar)){
//console.log(avatar);
avatar.curGround = this;
//console.log(this);
//console.log("true");
//noLoop();
avatar.dy=-0.9*avatar.dy;
} else {
//console.log("false")
avatar.curGround = 0;
}
if (this.y + this.height > ground.y) {
// hit the ground
this.y = ground.y - this.height;
this.dy = -floor(this.dy/2);
}
}
}
class froze extends phys {
updatephys(){
if(this.left_overlap(avatar)){
avatar.stopwalking();
avatar.dx=min(-avatar.dx, -1);
}
if(this.right_overlap(avatar)){
avatar.stopwalking();
avatar.dx=max(-avatar.dx,1);
}
if(this.top_overlap(avatar)){
//console.log(avatar);
avatar.curGround = this;
//console.log(this);
//onsole.log(avatar);
//noLoop();
avatar.dy=-0.9*avatar.dy;
} else {
avatar.curGround = ground;
}
}
}
