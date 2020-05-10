class Obstacle extends RectSprite {
	constructor(pos, width, height, mass) {
		super(pos, width, height, mass, 0, "blue");
	}
}

class Block extends Obstacle {
	constructor(x, y) {
		super(new Vector(x, y), 50, 50, 1);
	}
}

class Plank extends Obstacle {
	constructor(x, y, horizontal) {
		if (horizontal) {
			super(new Vector(x, y), 100, 20, 5);
		} else {
			super(new Vector(x, y), 20, 100, 5);
		}
	}
}