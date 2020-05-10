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
				ctx.fillRect(100,170,100,100);
				ctx.fillStyle = "white";
				ctx.font = "50px arial";
				ctx.fillText("1", 135,235);
				ctx.restore();
				ctx.save();
				ctx.fillRect(350,170,100,100);
				ctx.fillStyle = "white";
				ctx.font = "50px arial";
				ctx.fillText("2", 385,235);
				ctx.restore();
				ctx.save();
				ctx.fillRect(600,170,100,100);
				ctx.fillStyle = "white";
				ctx.font = "50px arial";
				ctx.fillText("3", 635,235);
				ctx.restore();
				break;
			case "game" :
				ctx.save();
				ctx.fillRect(755,0,45,20);
				ctx.fillStyle = "white";
				ctx.font = "15px arial";
				ctx.fillText("reset", 760,15);
				ctx.restore();
			default :
				break;
		}
	}

	selec() {
		this.mode = "selec";
		canvas.addEventListener("mouseup", selecHandler);
	}

	game(n) {
		this.mode = "game";
		canvas.addEventListener("mouseup", refreshHandler);
		game.initLevel(n);
	}
};

function titleHandler(ev) {
	let x = ev.offsetX;
	let y = ev.offsetY;
	if (x>=300 && x<500 && y>=150 && y<250) {
		console.log("play");
		canvas.removeEventListener("mouseup", titleHandler);
		game.menu.selec();
	}
}

function selecHandler(ev) {
	let x = ev.offsetX;
	let y = ev.offsetY;
	if (x>=100 && x<200 && y>=170 && y<270) {
		console.log("click");
		canvas.removeEventListener("mouseup", selecHandler);
		game.menu.game(0);
	} else {
		if (x>=350 && x<450 && y>=170 && y<270) {
			console.log("click");
			canvas.removeEventListener("mouseup", selecHandler);
			game.menu.game(1);
		} else {
			if (x>=600 && x<700 && y>=170 && y<270) {
				console.log("click");
				canvas.removeEventListener("mouseup", selecHandler);
				game.menu.game(2);
			}
		}
	}
}

function refreshHandler(ev) {
	let x = ev.offsetX;
	let y = ev.offsetY;
	if (x>=755 && x<800 && y>=0 && y<20) {
		console.log("reset");
		game.reset();
	}
}