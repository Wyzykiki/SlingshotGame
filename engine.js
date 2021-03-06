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

	clear() {
		this.objects.splice(0, this.objects.length);
	}

	update() {

		let moved = false;

		if (game.playing) {
		for (let i=0; i<this.objects.length; i++) {
			let obj = this.objects[i];

				let gravity = new Vector(0, 1);
				obj.applyForce(gravity);
				let acc = obj.force;
				obj.velocity = obj.velocity.add(acc);
				

				obj.move(obj.velocity);

				/** Collision */
				for (let j=0; j<this.objects.length; j++) {
                    if (i != j) {
                        let other = this.objects[j];

                        if (other instanceof Rect) {
                            if (obj.collisionRect(other)) {
								if(obj instanceof Rect){
									obj.hasCollRect(other);
								} else{
								obj.hasCollRect(other, obj.where(other));
								}
                            }
                        } 
                        if (other instanceof Circle) {
                            if (obj.collisionCircle(other)) {
								obj.hasCollCircle(other);
								if (other instanceof Target)
									this.remove(j);
								}
							}
                    }
                }

				let offset = 0
				if (obj instanceof Circle) {
					offset = obj.radius;
				} else {
					if (obj instanceof Rect) {
						offset = obj.height;
					}
				}
				
				/** limite horizontale */
				if (obj.origin.x < 0 || obj.origin.x + offset > canvas.width) {
					obj.velocity = new Vector(-obj.velocity.x, obj.velocity.y);
				}
				
				/** limite verticale */
				if (obj.origin.y + offset >= canvas.height) {
					obj.velocity = new Vector(obj.velocity.x, -(obj.velocity.y));
					obj.setPosition(obj.origin.x, canvas.height-offset);
				}
				
				/** Freine les objets */
				if (obj.origin.y == canvas.height-offset) {
					if( i == 5)
					console.log(obj.velocity);
					obj.velocity = obj.velocity.mult(0.85);
					if( i == 5)
					console.log(obj.velocity);
				}
				
				
				/** Quelqu'un bouge? */
				if (obj == game.projectiles[0]) {
					if (obj.velocity.x > 0.5 || obj.velocity.y > 0.5 || obj.velocity.x < -0.5 || obj.velocity.y < -0.5) {
						moved = true;
					}
				} else {
					if (obj.velocity.x > 1.5 || obj.velocity.y > 1.5 || obj.velocity.x < -1.5 || obj.velocity.y < -1.5) {
						moved = true;
					}
				}
				
				
			/** On supprime le proj si ça bouge plus */
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

		//personne ne bouge
		if (!moved)
			this.stop();

		//condition sur le debut du level
		if (game.playing && !this.updating) {
			console.log("static!");
		}
	}
}