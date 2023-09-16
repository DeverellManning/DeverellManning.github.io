class dirbuilder extends builder {
  constructor(x, y) {
    super(x, y)
    
    
  }
  draw() {
    super.draw()
    
    fill(0)
    let xpos = this.x *gs + gs/2;
    let ypos = this.y *gs + gs/2;
    stroke(256)
    line(xpos, ypos, xpos + this.dx*gs/3, ypos + this.dy*gs/3)
  }

  step(dir) {
        if (this.x<0||this.y<0||this.x>=grid.sx||this.y>=grid.sy){return 0}

      if (dir) {
          if (mana.isOccupied(this.x + this.dx, this.y+this.dy)) {return 0}
          this.x += this.dx
          this.y += this.dy
      } else {
          if (mana.isOccupied(this.x - this.dx, this.y-this.dy)) {return 0}
          this.x -= this.dx
          this.y -= this.dy
      }
  }

    turn(dir) {
        if (dir) {
            let tdx = flipx(this.dx, this.dy)
            this.dy = flipy(this.dx, this.dy)
            this.dx = tdx;
        } else {
            let tdx = flopx(this.dx, this.dy)
            this.dy = flopy(this.dx, this.dy)
            this.dx = tdx;
        }
      
    }

    randomDir() {
        this.dx = 0;
        this.dy = 0;
        if(random([0,1]) == 1) {
        this.dx = random([-1,1])
        } else {
            this.dy = random([-1,1])
        }
    }
}