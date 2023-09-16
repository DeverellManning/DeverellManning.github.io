//Brain Constants
const pcount = 4;  //Program Count
const icount = 16; //Intructions per Program


//Spot class extends and uses base builder class.

class spot extends dirbuilder {
  constructor(x, y, parent) {
    super(x, y)

    this.b = [] //brain
    if(typeof(parent) == typeof(this)) {
        //Spot has a parent!
        this.hasParent=true;
        this.color = parent.color;

        //Copy parent's brain
        for(let p=0;p<pcount;p++) {
            this.b.push([])
            for(let i=0;i<icount;i++) {
                this.b[p].push(parent.b[p][i])
            }
        }
        
        if(random(50) > 47) {
            console.log("Mutation. Pop. " + po+"-"+tc)
            //capture("Mutation-pop"+po+"-"+tc)
            this.mutate(4)
        }
        
    } else {
        this.hasParent=false;
        //Randomize brain
        for(let p=0;p<pcount;p++) {
            this.b.push([])
            for(let i=0;i<icount;i++) {
                this.b[p].push(floor(random(0, 16)))
            }
        }
        this.color = color(random(0,256), random(0,256), random(0,256))

        //this.b[0] = [0, 0, 1, 1, 2, 2, 3, 1, 4, 1, 0, 0, 5, 6, 0, 0]
    }

    //this.b[0] = [8, 3, 1, 0, 0, 8, 3, 1, 0, 0, 0, 5, 6, 0, 0]

    this.hunger = 180;
    this.children = 0;
    this.age = 0;
    
    

    
    this.dx=1;
    this.dy=0;

    this.ic = -1; //instruction counter
    this.pc = 0; //program counter
    
  }
  
  tick() {
    super.tick()
    this.age++;

    //Execute a Command
    this.ic++;
    if(this.ic == icount) {this.ic = 0}
    
    this.exe(this.b[this.pc][this.ic])


    //Eat Food
    if(grid.get(this.x, this.y) == 3) {
        grid.set(this.x, this.y, 1)
        this.hunger +=130
    } else {
        this.hunger--;
    }

    //Die if starving
    if(this.hunger < 0) {
        this.die();
    }
    //Die if Childless
    if(this.children <= 0 && this.age > 1500) {
        this.die();
    }
    //Die if on lava
    if(grid.get(this.x, this.y) == 5) {
        this.die();
    }
  }

  display() {
    for(let p=0;p<pcount;p++) {
        console.log("Program "+p+":")
        for(let i=0;i<icount;i++) {
            console.log(i+": "+cmdname(this.b[p][i]))
        }
    }
    
    console.log("Hunger:"+this.hunger)
    console.log("Age:"+this.age)
    console.log("Child Count:"+this.children)
  }
  


  exe(ins) {
      //console.log("tick" + ins);
      switch(ins) {
        case 0:
            //do nothing
        break;
        case 1:
            this.hunger -= 1;
            this.step(true) //step forward
            break;
        case 2:
            this.hunger -= 1;
            this.step(false) //step back
            break;
        case 3:
            this.turn(true) //turn left
            break;
        case 4:
            this.turn(false) //turn right
            break;
        case 5:
            //this.randomDir() //turn Random
            break;
        case 6:
            if(this.hunger >= 190) {
                this.children++;
                mana.add(this.x+this.dx, this.y+this.dy, this)
                this.hunger -= 185;
            }
            break;
        case 7:
            grid.set(this.x, this.y, 6)
            this.hunger -= 5;
            break;

        case 8:
            if(mana.isOccupied(this.x+this.dx, this.x+this.dx) ||
                this.x+this.dx<0||this.x+this.dx<0||
                this.x+this.dx>=grid.sx||this.x+this.dx>=grid.sy)
            {
                //Do nothing
            } else {
                this.ic++;
            }
            break;
        case 9:
            this.pc++;
            this.ic=0;
            if(this.pc >= pcount) {this.pc=0}
            break;
        case 10:
            this.pc--;
            this.ic=0;
            if(this.pc <= 0) {this.pc=pcount-1}
            break;
        case 11:
            if(grid.get(this.x+this.dx, this.y+this.dy) == 5) {
                //Do nothing
            } else {
                this.ic++;
            }
            break;
        case 12:
            for(let i=1; i<=5;i++) {
                if(grid.get(this.x+this.dx, this.y+this.dy) == 3) {
                    return;
                }
            }
            this.ic++;
            break;
            
        
      }
  }

    mutate(amt=0) {
        this.color = color(random(0,256), random(0,256), random(0,256))

        for(let i=0;i<amt;i++) {
            this.b[floor(random(0, pcount))][floor(random(0, icount))] =
            floor(random(0, 16))
        }
    }

    score() {
        let bonus=0;
        if(this.children == 0) {return 10}
        if(this.hasParent) {bonus=50}
        return this.children*40 + floor(this.age*0.6) + bonus;
    }
}



function cmdname(ins) {
      //console.log("tick" + ins);
      switch(ins) {
        case 0:
            return "Do Nothing."
        case 1:
            return "Step Forward"
            break;
        case 2:
            return "Step Backward"
            break;
        case 3:
            return "Turn Left"
        case 4:
            return "Turn Right"
        case 5:
            return "5-Do Nothing"
        case 6:
            return "Have a Child"
        case 7:
            return "Build a Wall"
        case 8:
            return "Skip next intruction if space ahead is not occupied"
        case 9:
            return "Switch to next behavior"
        case 10:
            return "Switch to previous behavior"
        case 11:
            return "Skip next intruction if lava is not ahead"
        case 12:
            return "Skip next intruction if I can not see a plant ahead."
            
      }
      return ins;
  }
