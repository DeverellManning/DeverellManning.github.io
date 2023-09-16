//Canvas Sizes
const vasX = 500;
const vasY = 500;

//Grid Space
const gX = vasX/4;
const gY = vasY/4;

let ltime, ctime, delta;
let tc=0;

let paused = true;
let doRender = true;
let playmode = false;
let capturemode = false;
let renderMode = 0;

let amx, amy;
let mx, my;

let s_density = 400;
let s_bsize = 5;

let sand = new Sand(6000);

let firstPause=true;
let tk = false;
let addfrozen = true;

function setup() {
  createCanvas(vasX, vasY);
  frameRate(10);
  //canvas.getContext('2d').willReadFrequently = true
  textAlign(CENTER, CENTER);
  noCursor()
  
  start()
}

function start() {
    toolbox;
    
    sand.reset(wg_basic, s_density);
}

function draw() {

    tk=!tk;
    mx=round(mouseX*0.25)
    my=round(mouseY*-0.25 + vasY/4)

    if(mouseIsPressed && mouseX < vasX && mouseY < vasY && mouseX > 0 && mouseY > 0) {
        action=document.getElementById("Action").value
	brushSize = document.querySelector("#inBrushSize").value
        switch(action) {
        case "0":
            addState = document.getElementById("inState").value
            addColor = hexToRgb(document.getElementById("inColor").value)
            sand.fill_circle(floor(mx), floor(my), brushSize, addColor.r, addColor.g, addColor.b+CR()/10, addState)
            break;
        case "1":
            for(let i=0;i<sand.s.length;i++) {
                //Current X and Y of particle
                cx = sand.s[i].x;
                cy = sand.s[i].y;
                    
                //Mouse Distance
                md=dist(cx, cy, mx, my)
                if (md < brushSize) {
                  sand.s[i].x = DR();
                  sand.s[i].y = 120;
                }
            }
            break;
        case "2":
            for(let i=0;i<sand.s.length;i++) {
                //Current X and Y of particle
                cx = sand.s[i].x;
                cy = sand.s[i].y;
                    
                //Mouse Distance
                md=dist(cx, cy, mx, my)
                if (md < brushSize) {
                  sand.s.splice(i, 1)
                }
            }
            break;
        case "3":
            for(let i=0;i<sand.s.length;i++) {
                //Current X and Y of particle
                cx = sand.s[i].x;
                cy = sand.s[i].y;
                    
                //Mouse Distance
                md=dist(cx, cy, mx, my)
                if (md < brushSize) {
                  sand.s[i].s = 0;
                  //sand.s[i].y = 120;
                }
            }
            break;
        }
    }
  
  background(200);
  
  if (doRender) {
    loadPixels()
    sand.update()
    dp(mx, my)
    updatePixels()
  }

  push()
  drawUI()
  pop()
  

  
  
}

function drawUI() {
      textAlign(LEFT, CENTER)
      text(mx + "," + my, 400, 10)
      text(tc, 20, 10)
      text(floor(frameRate()), 100, 10)
      text(sand.s.length, 200, 10)
      //text("Population: "+po, 200, 10)
      //text("HighScore: "+highScore, 300, 10)

      /*if(mana.selected > -1) {
        text("Selected: "+mana.selected, 100, 25)
        text("Score: "+mana.b[mana.selected].score(), 200, 25)

        text("P"+mana.b[mana.selected].pc+" I"+mana.b[mana.selected].ic, 300, 25)
      }*/
      noStroke()
      fill(128, 128, 200, 120)
      //circle(mouseX, mouseY, s_bsize*8)
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
    sand.update()
    console.log(sand.s.length)
  }
  if (keyCode == 8) {
    //mana.killall();
  }
  if (keyCode == 13) {
      start()
  }
  if (keyCode == 67) {
      capture("capture-" + tc)
  }
}

function mouseClicked() {
  console.log("clk: " + mx + ", " + my)
	//console.log(keyCode)
	
}

function capture(name) {
  let tmpx = cam.x;
  let tmpy = cam.y;
  let tmpz = cam.z;
  
  //resizeCanvas(200*5, 75*5)
  
  //cam.x=0;cam.y=0;
  //cam.z=0.125
  
  capturemode = true;
  draw()
  saveCanvas(name)
  resizeCanvas(vasX, vasY)
  capturemode = false;
  
  //cam.x = tmpx;
  //cam.y = tmpy;
 // c/am.z = tmpz;
  
}
