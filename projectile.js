class BasicProjectile extends CircleSprite {
	constructor(x, y) {
		super(new Vector(x, y), 20, 50, "red");
	}

	isIn(x, y) {
		return (x - this.origin.x) * (x - this.origin.x) + (y - this.origin.y) * (y - this.origin.y) < this.radius * this.radius;
	}
}