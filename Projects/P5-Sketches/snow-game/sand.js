class Sand {
	constructor(_max = 5500) {
		this.s = [];
		this.max = _max;
	}
	reset(genorator, density) {
		this.s = genorator.generate(density);
	}
	update() {
		this.s.sort(function (i1, i2){return i1.y - i2.y});
    
		//Current Sand Array
		let s = this.s;
		  
		//Support
		let cs, ls, rs;
		
		//Current Pos
		let cx, cy;
		
		//Next Pos
		let dx=0;
		let dy=0;
		let cstate;
    
		//Loop through particles
		for(let i=0;i<this.s.length;i++) {
		    //Current X and Y of particle
		    cx = s[i].x;
		    cy = s[i].y;
		    
		    if (cy < 1) { continue; }
		    cstate = s[i].s;
		    
		    //Mouse Distance
		    //md=dist(cx, cy, mx, my)
	  
		    //Case State
		    switch (Number(cstate)) {
		    case 0: //Sand
			if(cy < 1) {
			    cs=true;rs=true;ls=true;
			} else {
			    cs=false;ls=false;rs=false;
			    //Check if against a wall
			    if(cx <= 0) {
				ls = true
			    }
			    if(cx >= gX) {
				rs = true
			    }
			    let iix, iiy
			    //Loop through particles
			    for(let ii=0;ii<s.length;ii++) {
				iix = s[ii].x
				iiy = s[ii].y
				if(iiy > cy) {break;}
				if(iiy < cy - 1) {continue;}
				
				if(iiy == cy - 1) {
				    if (iix == cx) { //Central Support
					  cs = true; continue
				    }
				    if (iix == cx-1) { // Left Support
					  ls = true; continue
				    }
				    if (iix == cx+1) { //Right Support
					  rs = true; continue
				    }
				}
				if(cs&&rs&&ls) {break;}
			    }
			}
			
			dx=0;dy=0;
			if (!cs || !ls || !rs) {	
			    //Missing Total Support
			    dy--;

			    if(!ls && !rs && cs) {
				//Neither Left nor Right support
				if(tk) {
					dx--;
				} else {
					dx++;
				}
			    } else {
				if(!ls) {dx--}
				if(!rs) {dx++}
			    }
			}
			this.s[i].y += dy;
			this.s[i].x += dx;
  
			dp(this.s[i].x, this.s[i].y, this.s[i].r, this.s[i].g, this.s[i].b)
			continue
		    case 1: //Frozen
			//Draw
			dp(this.s[i].x, this.s[i].y, this.s[i].r, this.s[i].g, this.s[i].b)
			continue
		    case 2: //Water

			let sup = this.get_support(cx, cy)
			let side = this.get_support(cx, cy+1)
			
			cs = sup.cs
			ls = sup.ls
			rs = sup.rs
			
			
			
			dx=0;dy=0;
			//dx=0;dy=0;
			if (!cs || !ls || !rs) {	
			    //Missing Total Support
			    dy--
			    if(!cs){}

			    if(!ls && !rs && cs) {
				//Neither Left nor Right support
				if(tk) {
				    dx--;
				} else {
				    dx++;
				}
			    } else {
				if(!ls) {dx--}
				if(!rs) {dx++}
			    }
			}
			if (cs) {
			    if (!side.rs && !side.ls) {
				dx=round(random(-1,1));
			    } else if (!side.rs) {
				dx=round(random(0,1));
			    } else if (!side.ls) {
				dx=round(random(-1,0));
			    }
			}
			
			this.s[i].y += dy;
			this.s[i].x += dx;
			
		    	//Draw
			dp(this.s[i].x, this.s[i].y, 0, this.s[i].g*0.55, this.s[i].b)
			continue
		    
		    }
		    
      
		
		}
		
		for(let i=0;i<min(s.length,200);i++) {
		    cy = s[i].y;
		    if(cy < 1) {this.s.splice(i, 1)}
		    if(cy > 1) {break}
		    
		}
	}
  add(x,y,r,g,b,f=false) {
    if(x<0||x>vasX/4) {return 2;}
    if(y<0) {return 3;}
    for(let i=0;i<this.s.length;i++) {
      if (x == this.s[i].x && y == this.s[i].y) {
        return 1;
      }
    }
    if (this.s.length > this.max) {return 4}
    this.s.push(new particle(x,y,r,g,b,f))
  }
  circle(sx,sy,sz,r,g,b, state) { // z = radius
      for (let x=-sz;x<sz;x++) {
        for (let y=-sz;y<sz;y++) {
          let d = dist(sx+x,sy+y, sx, sy);
          if(d < (sz) && d > (sz - 3)) {
            this.add(sx+x,sy+y, r+CR(), g+CR(), b+CR(), state)
          }
        }
      }
    
  }
  fill_circle(sx,sy,sz,r,g,b,state) { // z = radius
      for (let x=-sz;x<sz;x++) {
        for (let y=-sz;y<sz;y++) {
          let d = dist(sx+x,sy+y, sx, sy);
          if(d < (sz)) {
            this.add(sx+x,sy+y, r+CR(), g+CR(), b+CR(), state)
          }
        }
      }
    
  }
    get_support(cx, cy) {
	let r = {}
	if(cy < 1) {
	    r.cs=true;r.rs=true;r.ls=true;
	} else {
	    r.cs=false;r.ls=false;r.rs=false;
	    //Check if against a wall
	    if(cx <= 0) {
		r.ls = true
	    }
	    if(cx >= gX) {
		r.rs = true
	    }
	    let iix, iiy
	    for(let ii=0;ii<this.s.length;ii++) {
		
		iix = this.s[ii].x
		iiy = this.s[ii].y
		if(iiy > cy) {break;}
		if(iiy < cy - 1) {continue;}

		if(iiy == cy - 1) {
		    if (iix == cx) { //Central Support
			  r.cs = true; continue
		    }
		    if (iix == cx-1) { // Left Support
			  r.ls = true; continue
		    }
		    if (iix == cx+1) { //Right Support
			  r.rs = true; continue
		    }
		}
		if(r.cs&&r.rs&&r.ls) {break;}
	    }
	}
	return r;    
	}
}
