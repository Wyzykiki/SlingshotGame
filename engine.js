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


				let gravity = new Vector(0, 1);
				obj.applyForce(gravity);
				let acc = obj.force;
				obj.velocity = obj.velocity.add(acc);


				// if (i == 1) {
				// 	console.log(obj.origin);
				// 	console.log(obj.velocity);
				// }

			// }
				obj.move(obj.velocity);
				for (let j=0; j<this.objects.length; j++) {
                    if (i != j) {
                        let other = this.objects[j];

                        if (other instanceof Rect) {
                            if (obj.collisionRect(other)) {
								console.log("BAAAAAAAAAAAAAM");
								console.log(obj.where(other));
								console.log(obj.origin.x);
								console.log(other.origin.x);
                                obj.hasCollRect(other, obj.where(other));
                            }
                        } 
                        if (other instanceof Circle) {
                            if (obj.collisionCircle(other)) {
                                obj.hasCollCircle(other);
                            }
                        }
                    }
                }

				
				if (obj.origin.x < 0 || obj.origin.x > canvas.width) {
					obj.velocity = new Vector(-obj.velocity.x, obj.velocity.y);
					//this.remove(i);
				}
				
				if (obj.origin.y < 0 || obj.origin.y >= canvas.height) {
					obj.velocity = new Vector(obj.velocity.x, -(obj.velocity.y));
					obj.setPosition(obj.origin.x, 400);
				}
				
				/** Freine les objets */
				if (obj.origin.y == 400) {
					obj.velocity = obj.velocity.mult(0.8);
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