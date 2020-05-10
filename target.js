class Target extends CircleSprite {
	constructor(pos, radius, mass, color) {
		super(pos, radius, mass, color);
	}
}

class BasicTarget extends Target {
	constructor(x, y) {
		super(new Vector(x, y), 17, 10, 'lightgreen');
	}
}

class StrongTarget extends Target {
	constructor(x, y) {
		super(new Vector(x, y), 22, 20, 'green');
	}
}