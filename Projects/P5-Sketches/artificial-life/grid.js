const gs = 40; //grid size


let grid ={
  a: [],  //y then x
  //Sizes
  sy: 0,
  sx: 0,
  
  t: [], //terrain
  w: [], //water
  
  //Functions
  set: function(x, y, val) {
    if (x<0||y<0||x>=this.sx||y>=this.sy){return 0} else {
      this.a[y][x] = val;
    }
  },
  get: function(x, y) {
    if (x<0||y<0||x>=this.sx||y>=this.sy){return 0}
    return this.a[y][x]
  },
  
  init: function(nsx, nsy) {
    this.sx = nsx;
    this.sy = nsy;
    this.a = [];
    this.t = [];
    this.w = [];
    
    for(let i =0; i<nsy; i++){
      this.a.push([]);
      this.t.push([]);
      this.w.push([]);
    }
    
    for(let y =0; y<this.a.length; y++){
      for(let x =0; x<nsx; x++){
        this.a[y][x] = 1;
        this.t[y][x] = 1;
        this.w[y][x] = 1;

        if(random(-5, nsx*3) < x) {
            this.a[y][x] = 3;
        }
      }
    }

    for(let i=0;i<15; i++){
      let x=floor(random(nsx*0.1,nsx*0.6))
      let y=floor(random(0,nsy))
      for(let ty=-4;ty<=4;ty++) {
        for(let tx=-4;tx<=4;tx++) {
          if(dist(x, y, x+tx,y+ty) < 2.5)
          this.set(x+tx,y+ty, 5)
        }
      }
    }
    
  },
  
  draw: function() {
    noStroke()
    rect(0, 0, this.sx*gs, this.sy*gs)
    let sy = (cam.y/gs);
    let ey = sy + (vasY/gs)*cam.z;
    //console.log(ey)
    sy=max(sy,0);sy=min(sy, this.a.length-1);sy=(floor(sy))
    ey=max(ey,1);ey=min(ey, this.a.length);

    //for(let y = sy+10; y<ey-10; y++){
    for(let y = 0; y<this.a.length; y++){
      if((y*gs - cam.y)*cam.z > vasY ||
        (y*gs - cam.y)*cam.z < -gs) {
          if(!capturemode) {continue}
      }
      for(let x =0; x<this.a[y].length; x++){
        
       if((x*gs - cam.x)*cam.z > vasX ||
          (x*gs - cam.x)*cam.z < -gs) {
          if(!capturemode) {continue}
        }
        
        let xpos = x *gs;
        let ypos = y *gs;
        
        let val = this.a[y][x];
        
        if (val == 1) {continue;}
        fill(map(val, 0, 10, 0, 256))
        switch(val) {
          case 0: fill("#FFE"); break;
          case 3: fill("#45FF85"); break;//Plant
          case 5: fill("#F93"); break; //Lava
          case 6: fill("#3A3632"); break;//Wall
          case 11: fill("#B501FF66"); break;
          case 1: fill("#4A7C7799"); break;//Empty
        }
        if(x == mx && y == my) {
          /*if(cam.z > 0.5 && ! playmode) {
            //let h = map(x*y, 0, 69, 0, 255);
            fill(256);
            noStroke();
            text(val, xpos, ypos, gs,gs); 
          }*/
          fill("#E55")
        }
        rect(xpos, ypos, gs, gs);
        

      }
      

    }
  },

  drawlight: function() {
    fill("FFE")
    rect(0, 0, this.sx*gs, this.sy*gs)
    for(let y = 0; y<this.a.length; y++){
      for(let x =0; x<this.a[y].length; x++){
        let xpos = x *gs;
        let ypos = y *gs;
        
        let val = this.a[y][x];
        
        if (val == 1) {continue;}
        switch(val) {
          case 0: stroke("#FFE"); break;
          case 3: stroke("#45FF85"); break;//Plant
          case 5: stroke("#F93"); break; //Lava
          case 6: stroke("#3A3632"); break;//Wall
          case 11: stroke("#B501FF66"); break;
          case 1: stroke("#4A7C7799"); break;//Empty
        }
        point(xpos, ypos);
        

      }
      

    }
  },

  update: function() {
    for(let y =0; y<4; y++){

      let y=floor(random(0,this.sy))
      let x=floor(random(0,this.sx))
      if(random(-floor(this.sx/5), this.sx*2) < x) {
          if(this.a[y][x] == 1) {
            this.a[y][x] = 3;
          }
      }
    }
  }

}

function toXY(index) {}
function toIndex(x, y) {}
