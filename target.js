class BasicTarget extends CircleSprite {
	constructor(x, y) {
		super(new Vector(x, y), 50, 10, 'lightgreen');
	}
}

class StrongTarget extends CircleSprite {
	constructor(x, y) {
		super(new Vector(x, y), 75, 20, 'green');
	}
}