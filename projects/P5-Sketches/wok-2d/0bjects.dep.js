//objects.dep.js:
class Ground extends froze{
constructor(){
let yGround = random(height * 0.75, height * 0.9);
let groundHeight = ceil(height - yGround);
super(0, yGround, maxX*1.5, groundHeight);
this.fillColor = color(47);
this.fillColor2 = color(17);
}
updatephys(){
if(this.top_overlap(avatar) ){
//console.log(avatar);
avatar.curGround = this;
//console.log(this);
//onsole.log(avatar);
avatar.dy=-0.1*avatar.dy;
}
}
update(){
this.updatephys();
}
draw(){
push();
noStroke();
fill(this.fillColor);
rect(this.x, this.y, this.width, this.height/2);
fill(this.fillColor2);
rect(this.x, this.y+this.height/2, this.width, this.height/2);
pop();
}
}
class Barrier extends phys{
constructor(x, yIn){
let barrierWidth = random(10, 20);
let barrierHeight = random(10, 60);
let y = yIn - barrierHeight;
super(x, y, barrierWidth, barrierHeight);
this.fillColor = color(128);
this.hasScoredYet = false;
}
checkIfCollision(shape){
return this.overlaps(shape);
}
update(){
this.updatephys();
//this.dy=this.dy-0.8;
}
}
class Wall extends phys{
constructor(x, yGround){
let barrierWidth = 20;
let barrierHeight = 200;
let y = yGround - barrierHeight;
super(x, y, barrierWidth, barrierHeight);
this.fillColor = color(40, 200, 40);
}
checkIfCollision(shape){
return this.overlaps(shape);
}
update(){
this.fillColor = color(cos(millis()/450+30)*100+100,
cos(millis()/510-30)*100+100, cos(millis()/550)*100+100)
}
/*draw(){
push();
noStroke();
fill(this.fillColor);
rect(this.x, this.y, this.width, this.height);
pop();
}*/
}
class Table extends phys{
constructor(x, yIn){
let y = yIn - 60;
super(x, y, 80, 60);
this.leafColor = color(45, 150, 87);
this.trunkColor = color(128);
}
update(){
this.updatephys();
}
draw(){
push();
//noStroke();
translate(cam.vec());
fill(this.trunkColor);
rect(this.x, this.y, this.width, this.height/2);
fill(this.leafColor);
rect(this.x, this.y + this.height/2, 20, this.height/2);
rect(this.x+this.width-20, this.y + this.height/2, 20,
this.height/2);
pop();
}
}
