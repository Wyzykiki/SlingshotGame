class Menu {
	constructor() {
		this.mode = "title";
		canvas.addEventListener("mouseup", titleHandler);
	}

	draw() {
		switch (this.mode) {
			case "title" :
				ctx.save();
				ctx.fillRect(300,150,200,100);
				ctx.fillStyle = "white";
				ctx.font = "50px arial";
				ctx.fillText("Play", 350,215);
				ctx.restore();
				break;
			case "selec" :
				ctx.save();
				ctx.fillRect(20,20,100,100);
				ctx.fillStyle = "white";
				ctx.font = "50px arial";
				ctx.fillText("1", 55,85);
				ctx.restore();
				break;
			default :
				break;
		}
	}

	selec() {
		this.mode = "selec";
		canvas.addEventListener("mouseup", selecHandler);
	}

	game() {
		this.mode = "game";
		game.initLevel(0);
	}
};

function titleHandler(ev) {
	let x = ev.offsetX;
	let y = ev.offsetY;
	if (x>=300 && x<500 && y>=150 && y<250) {
		console.log("play");
		canvas.removeEventListener("mouseup", titleHandler);
		menu.selec();
	}
}

function selecHandler(ev) {
	let x = ev.offsetX;
	let y = ev.offsetY;
	if (x>=20 && x<120 && y>=20 && y<120) {
		console.log("click");
		canvas.removeEventListener("mouseup", selecHandler);
		menu.game();
	}
}