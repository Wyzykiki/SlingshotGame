class Renderer {
	constructor(engine) {
		this.engine = engine;
	}

	drawSling() {
		ctx.save();
		ctx.fillStyle = "rgba(0,0,255,0.3)";
		ctx.beginPath();
		ctx.ellipse(game.sling.x, game.sling.y, game.sling.radius, game.sling.radius, 0, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		
		ctx.restore();
	}

	render() {

		if (game.curLevel != -1)
			this.drawSling();

		for (let i=0; i<this.engine.objects.length; i++) {
			this.engine.objects[i].draw();
		}
	}
}