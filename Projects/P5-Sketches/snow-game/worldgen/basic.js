		
let wg_basic = {
	s: [],
	generate(density) {
		this.s = [];
		// Create Ground
		for(let x=0;x<=gX;x++) {
			//#c5cb8e
			this.add(x,5, 174, 191, 110, 1)
			this.add(x,4, 100+CR(), 30, 20, 1)
			this.add(x,3, 80+CR(), 20, 15, 1)
			this.add(x,2, 60+CR(), 15, 15, 1)
			this.add(x,1, 40+CR(), 10, 10, 1)
		}
		
		//Add Features
		let sx = 0
		let sy = 0
		for(let i=0;i<10;i++) {
			sx=floor(floor(random(1,8)) * (vasX/4/9))
			sy=floor(floor(random(1,8)) * (vasX/4/9))
			
			let cr=random(0,256)
			let tr=random(0,256)
			let tg=random(0,256)
			let tb=random(0,256)

			//this.add(sx,sy, tr, tg, tb+CR(), true)
			if (floor(random(0,2)) == 1) {
				this.pool(sx, sy)
			} else {
				this.house(sx, sy)
			}
		}
		
		return this.s;
	},
	pool(sx,sy) {
		let sz=floor(random(5, 12))
		let tr=random(0,256)
		let tg=random(0,256)
		let tb=random(0,256)
		let filled = rbool()
		for (let x=-sz;x<sz;x++) {
			for (let y=-sz;y<1;y++) {
				let d = dist(sx+x,sy+y, sx, sy);
				if(d < (sz) && d > (sz - 3)) {
					this.add(sx+x,sy+y, tr, tg, tb+CR(), 1)
				}
				if(d < (sz-2) && filled) {
					this.add(sx+x,sy+y, 0, 30, 240, 2)
				}
			}
		}
	},
	house(sx,sy) {
		let sz=floor(random(3, 8))
		let tr=random(0,256)
		let tg=random(0,256)
		let tb=random(0,256)
		for (let x=-sz;x<sz;x++) {
					for (let y=-sz;y<sz;y++) {
						let d = dist(sx+x,sy+y, sx, sy);
						//if(d < (sz) && d > (sz - 3)) {
							this.add(sx+x,sy+y, tr, tg, tb+CR(), 1)
						//}
					}
				}
	},
	add(x,y,r,g,b,state) {

		if(x<0||x>vasX/4) {return 2;}
		if(y<0) {return 3;}
		for(let i=0;i<this.s.length;i++) {
			if (x == this.s[i].x && y == this.s[i].y) {
				return 1;
			}
		}
		this.s.push(new particle(x,y,r,g,b,state))
	}
}
