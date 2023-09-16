let cam = {
  x: 0,
  y: 0,
  z: 1, //zoom
  
  s: 10, //speed
  
  transform() {
    scale(this.z)
    translate(-this.x, -this.y);
  },
  
  update() {
    
    if (!playmode) {
      let spd = this.s / this.z;
    
    if (keyIsDown(SHIFT)) {
      spd = spd * 3;
    }
    
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= spd;
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += spd;
    }

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.y -= spd;
    }

    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.y += spd;
    }
    
    if (keyIsDown(69)) { // e - zoom in
      this.z += log(this.z*10)/100;
      
    }
    if (keyIsDown(81)) { // q - zoom out
      this.z -= log(this.z*10)/100;
      
    }
    this.z = max(min(cam.z, 5), 0.55)
    } else {
      this.x = (xe.x-2)*gs;
      this.y = (xe.y-2)*gs;
      this.z = 2
    }
    
  }
}
