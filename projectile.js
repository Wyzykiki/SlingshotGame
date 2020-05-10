class Projectile extends CircleSprite {
	constructor(pos, radius, mass, color) {
		super(pos, radius, mass, color);
	}

	isIn(x, y) {
		return (x - this.origin.x) * (x - this.origin.x) + (y - this.origin.y) * (y - this.origin.y) < this.radius * this.radius;
	}
}


class BasicProjectile extends Projectile {
	constructor(x, y) {
		super(new Vector(x, y), 20, 1, "red");
	}

}