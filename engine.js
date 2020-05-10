class Engine {
	constructor() {
		this.objects = [];
		this.updating = false;
	}

	start() {
		this.updating = true;
	}

	stop() {
		this.updating = false;
	}

	add(e) {
		this.objects.push(e);
	}

	remove(index) {
		this.objects.splice(index, 1);
	}

	update() {

		let moved = false;

		if (game.playing) {//TODO: rename
		for (let i=0; i<this.objects.length; i++) {
			let obj = this.objects[i];


				let gravity = new Vector(0, 0.95);
				obj.applyForce(gravity);
				let acc = obj.force;
				obj.velocity = obj.velocity.add(acc);
				let beforeX=obj.origin.x;
				let beforeY=obj.origin.y;
				obj.move(obj.velocity);
				if (obj.origin.x<=beforeX+2 && beforeY<=obj.origin.y+2 && obj.origin.x>=beforeX-2 && beforeY>=obj.origin.y-2){
					obj.velocity=new Vector(0.0,0.0);
				}
				let offset = 0
				if (obj instanceof Circle) {
					offset = obj.radius;
				} else {
					if (obj instanceof Rect) {
						offset = obj.height;
					}
				}
				// console.log("lalalala les schtroumpfh");
				// console.log(canvas.height-offset);
				// console.log(obj.origin.y);
				if (obj.velocity.y > -1 &&  obj.velocity.y < 1 && obj.origin.y>=canvas.height-offset ) {
					obj.velocity=new Vector(obj.velocity.x,0);
				}

			// }
				for (let j=0; j<this.objects.length; j++) {
                    if (i != j) {
                        let other = this.objects[j];

                        if (other instanceof Rect) {
                            if (obj.collisionRect(other)) {
								// console.log("BAAAAAAAAAAAAAM");
								// console.log(obj.where(other));
								// console.log(obj);
								// console.log(other);
								if(obj instanceof Rect){
									obj.hasCollRect(other);
								} else{
								obj.hasCollRect(other, obj.where(other));
								}
                            }
                        } 
                        if (other instanceof Target) {
                            if (obj.collisionCircle(other)) {
								obj.hasCollCircle(other);
								// if (other instanceof Target) {
								// console.log(this.objects[i]);	
								// console.log(this.objects[j]);
								this.remove(j);
									// }
								}
							}
						//console.log(this.objects);
                    }
                }

				// let offset = 0
				// if (obj instanceof Circle) {
				// 	offset = obj.radius;
				// } else {
				// 	if (obj instanceof Rect) {
				// 		offset = obj.height;
				// 	}
				// }
				
				if (obj.origin.x < 0 || obj.origin.x + offset > canvas.width) {
					obj.velocity = new Vector(-obj.velocity.x, obj.velocity.y);
					//this.remove(i);
				}
				
				if (obj.origin.y < 0 || obj.origin.y + offset >= canvas.height) {
					obj.velocity = new Vector(obj.velocity.x, -(obj.velocity.y));
					obj.setPosition(obj.origin.x, canvas.height-offset);
				}
				
				/** Freine les objets */
				if (obj.origin.y == canvas.height-offset) {
					// if( i == 0)
					// console.log(obj.velocity);
					obj.velocity = obj.velocity.mult(0.65);
					// if( i == 0)
					// console.log(obj.velocity);
				}
				
				
				/** bouge? */
				if (obj.velocity.x > 0.001 || obj.velocity.y > 0.001 || obj.velocity.x < -0.001 || obj.velocity.y < -0.001) {
					moved = true;
				}

			// }
				
			/** FIXME: On supprime le proj si ça bouge plu */
			if (obj == game.projectiles[0] && game.playing && !this.updating) {
				console.log(this.objects.length);
				this.remove(i);
				console.log(this.objects.length);
				game.newProjectile();
				game.playing = false;
			console.log("static2!");
			}
		}
	}

		//pêrsonne bouge
		if (!moved)
			this.stop();

		//condition sur le debut du level
		if (game.playing && !this.updating) {
			console.log("static!");
		}
	}
}