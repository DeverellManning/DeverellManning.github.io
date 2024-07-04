

const dirl = [1,-1]
function gdir1 () {
  let tmp = random(dirl)
  return random([createVector(0, dirl),
                 createVector(dirl, 0 )])
}


/**/
class builder {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
    this.color=color(256, 180, 180)
    
    this.dead = false;
    this.length = 0;
  }
  
  draw() {
    //if(this.dead) {return}
    let xpos = this.x *gs + gs/2;
    let ypos = this.y *gs + gs/2;
    
    if(this.dead) {
      fill(110, 120, 120)
    } else {
      fill(this.color)
    }
    noStroke()
    circle(xpos, ypos, gs*.75)
  }
  
  tick() { 
    if (this.x < 0 || this.y < 0 ||
      this.x >= grid.sx || this.y >= grid.sy) {
      this.die();
    }
    if(this.dead) {return -1;}
    this.length++;
    return 0;
  }
  die() {
    this.dead = true;
  }
  
}



