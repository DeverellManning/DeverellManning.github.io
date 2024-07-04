let xe;

let mana = { //Manages builders
  //Builder List
  b: [],

  //Manager Variables
  bmax: 200,
  goal: 20,
  selected: -1,
  
  bestSpot: 0,
  spotStock: [],
  
  //Function
  init(x, y, imax) {
    this.b = [];
    this.bmax = imax;
    bestLife = round(bestLife-0.5,1);
    //maxPop = round(maxPop-0.5,1);
    
    for(let i=0;i<5;i++) {
        let v=this.add(x, y+i*15, this.getStock())
        if(v != 0) {this.b[i].mutate(6)}
        //
    }
    
  },
  
  draw() {
    for (let i = 0; i<this.b.length; i++) {
      this.b[i].draw();
    }
  },
  
  update() {
    //Update spots
    for (let i = 0; i<this.b.length; i++) {
      this.b[i].tick();
      let s=this.b[i].score();

      if(s >= highScore) {
        highScore=s;
        if(s > 200 && this.b[i].inSpotStock != true) {
          console.log("New Genetic Breakthrough.  Added to stock at "+tc)
          console.log(this.spotStock.length + " Spots in Stock.")
          this.spotStock.push(this.b[i])
          this.b[i].inSpotStock=true;
        }
        
      }
    }
    
    //Remove dead spots
    for (let i = 0; i<this.b.length; i++) {
      if(this.b[i].dead) {
        if(mana.selected = i) { mana.selected=-1;}
        this.b.splice(i, 1);
      }
    }
    
    //Retreive population
    po=this.b.length;
    
    if(po <= 0) {
      //capture("Restart-"+tc);
      console.log("All Spots Dead.  Restarting at :"+tc);
      
      start()
    } 
    
    /*if(bestLife < 0.1 && this.bestSpot != 0) {
      console.log("Got rid of best spot.")
      this.bestSpot = 0;
    }*/
    
    //Update Max Population
    if(po > maxPop) {
      maxPop = po;
    }
    

    
    if(po > this.goal) {
      //firstPause=false;
      paused=true;
      console.log("Reached Goal: "+this.goal)
      capture("Reached Goal Population: "+this.goal+" - "+tc)
      this.goal *= 2;
    }
      
  },
  
  click(x, y) {
    this.selected = -1;
    for (let i = 0; i<this.b.length; i++) {
      if(this.b[i].x == x && this.b[i].y == y) {
        this.b[i].display()
        this.selected = i;
      }
    }
  },
  add(x, y, parent) {  //Adds builders
    if(this.b.length > this.bmax) {return 0}
    if (x<0||y<0||x>=grid.sx||y>=grid.sy){return 0}
    if (this.isOccupied(x, y)) {return 0}
    
    this.b.push(new spot(x, y, parent))
    //this.testSpot=this.b[this.b.length-1]
    
  },
  getStock() {
    let r=min(random([0,0,0,0,1,1,1,2,2,2,3,3,4,4,5,6,7,8]), this.spotStock.length)
    return this.spotStock[r];
  },
  isOccupied(ix, iy) {
      for (let i = 0; i<this.b.length; i++) {
        if(this.b[i].x == ix && this.b[i].y == iy) {
            return true;
        }
        if(grid.get(ix,iy) == 6) {
          return true;
        }
      }
      return false;
  },
  killall() {
    this.b = [];
  }
}
