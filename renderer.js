class Renderer {
	constructor(engine) {
		this.engine = engine;
	}

	render() {
		for (let i=0; i<this.engine.objects.length; i++) {
			this.engine.objects[i].draw();
		}
	}
}