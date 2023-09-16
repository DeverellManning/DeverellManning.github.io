//Canvas Sizes
const vasX = 500;
const vasY = 500

let ltime, ctime, delta;
let tc=0;

let paused = true;
let doRender = true;
let playmode = false;
let capturemode = false;
let renderMode = 0;

let amx, amy;
let mx, my;

let po=0;
let maxPop=0;
let bestLife=0;
let highScore=0;

let firstPause=true;

function setup() {
  createCanvas(vasX, vasY);
  frameRate(30);
  textAlign(CENTER, CENTER);

  start()
  
}

function start() {
  grid.init(200, 75);
  mana.init(5, 10, 100)
}

function draw() {
  if(!capturemode) {
    ctime = millis();
    delta = ctime - ltime;
    ltime = ctime;
    
    
    amx = mouseX/cam.z+cam.x;
    amy = mouseY/cam.z+cam.y;
    
    mx = floor(amx/gs);
    my = floor(amy/gs);
    

    
    cam.update();
    if(!paused) {
      grid.update();
      mana.update();
      tc++;
    }
  }
  
  background(200);
  push()
  if(doRender || capturemode) {
    switch (renderMode) {
      case 0:
        cam.transform();
        grid.draw();
        mana.draw();
        break;
      case 1:
        scale(0.125)
        translate(0,0);
        push()
        strokeWeight(40)
        grid.drawlight()
        pop()
        mana.draw();
        break;
      case 2:
        break;
    }
  }
  pop()
  push()
  if(!capturemode) {
      drawUI()
  }
  pop()

  


}

function drawUI() {
      textAlign(LEFT, CENTER)
      text(mx + "," + my, 400, 10)
      text(tc, 20, 10)
      text("MaxPop: "+maxPop, 100, 10)
      text("Population: "+po, 200, 10)
      text("HighScore: "+highScore, 300, 10)

      if(mana.selected > -1) {
        text("Selected: "+mana.selected, 100, 25)
        text("Score: "+mana.b[mana.selected].score(), 200, 25)

        text("P"+mana.b[mana.selected].pc+" I"+mana.b[mana.selected].ic, 300, 25)
      }
      circle(mouseX, mouseY, 8)
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 49) {
    //playmode = !playmode;
    //console.log(playmode, "playing")
  }
  if (keyCode == 80) {
    paused = !paused;
    console.log(paused)
  }
  if (keyCode == 48) {
    doRender = !doRender;
    console.log(doRender)
  }
  if (keyCode == 32) {
    mana.update()
    console.log(mana.b.length)
  }
  if (keyCode == 8) {
    mana.killall();
  }
  if (keyCode == 13) {
      start();
  }
  if (keyCode == 67) {
      capture("capture-" + tc)
  }
  if (keyCode == 75) {
      saveJSON(mana.spotStock, "SpotStock"+tc)
  }
  if (keyCode == 9) {
      renderMode++;
      if(renderMode>2) {renderMode=0;}
      if(renderMode==0) {resizeCanvas(vasX, vasY)}
      if(renderMode==1) {resizeCanvas(200*5, 75*5)}
  }
}

function mouseClicked() {
  console.log("clk: " + mx + ", " + my)
  
  mana.click(mx, my)

  grid.set(mx, my, 6)
}

function capture(name) {
  let tmpx = cam.x;
  let tmpy = cam.y;
  let tmpz = cam.z;
  
  resizeCanvas(200*5, 75*5)
  
  cam.x=0;cam.y=0;
  cam.z=0.125
  
  capturemode = true;
  draw()
  saveCanvas(name)
  resizeCanvas(vasX, vasY)
  capturemode = false;
  
  cam.x = tmpx;
  cam.y = tmpy;
  cam.z = tmpz;
  
}