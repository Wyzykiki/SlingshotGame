let canvas, ctx, game;

let lastFrame = performance.now();
let last = performance.now();

let c1 = null;
let c2 = null;
let c3 = null;
let r1 = null;
let r2 = null;
let r3 = null;

let debug = false;
let debug2 = false;

let xhr = new XMLHttpRequest();

let demo = [
	{
		"obstacles" : [
			{
				"x" : 400,
				"y" : 381,
				"type" : "plank",
				"horizontal" : false
			},
			{
				"x" : 500,
				"y" : 381,
				"type" : "plank",
				"horizontal" : false
			},
			{
				"x" : 410,
				"y" : 361,
				"type" : "plank",
				"horizontal" : true
			},
			{
				"x" : 435,
				"y" : 311,
				"type" : "block"
			}
		],
		"targets" : [
			{
				"x" : 460,
				"y" : 463,
				"type" : "basic"
			},
			{
				"x" : 600,
				"y" : 456,
				"type" : "strong"
			}
		],
		"sling" : {
			"x" : 50,
			"y" : 431,
			"radius" : 35,
			"rappel" : 27
		},
		"projectiles" : ["basic"]
	}
];

let lag = 0;

/** Fonction de debug */
function drawSling() {
	ctx.save();
	ctx.fillStyle = "rgba(0,0,255,0.3)";
	ctx.beginPath();
	ctx.ellipse(game.sling.x, game.sling.y, game.sling.radius, game.sling.radius, 0, 0, 2*Math.PI);
	ctx.fill();
	ctx.closePath();
	
	ctx.restore();
}

/** Boucle appellé 60 fois par seconde */
function loop(now) {

	
	// simule du calcul
	for (let i=0; i<3000000*lag; i++) {

	}

	game.update();
	
	/** Si on a calculer l'image avant le rafraichissement */
	if (now - last < 16.7) {
		
		let fps = Math.round(1000 / (now - lastFrame));
		let div = document.getElementById("fps");
		div.innerHTML = fps + " FPS";

		lastFrame = now;
			
		
		game.render();
		if (debug) {
			drawSling();
			// c1.draw();
			// c2.draw();
			// c3.draw();
		}
	}	

	last=now;
	requestAnimationFrame(loop);
	// let cpt = document.getElementById("cpt");
	// cpt.innerHTML = game.nbBasic;
	
}

/** Fonction qui s'execute au chargement de la page */
function init() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	// xhr.open("GET", "levels.json");
	// xhr.onload = () => {
		game = new Game(demo);
		// game = new Game(JSON.parse(xhr.responseText));
	// };
	// xhr.send();
	// c1 = new RectSprite(new Vector(400,200),20,20,1,30,"rgba(0,255,0,0.5)");
	// c2 = new RectSprite(new Vector(400.5,215),20,20,1,60,"rgba(0,255,0,0.5)");
	// c3 = new RectSprite(new Vector(0,0),200,200,1,45,"rgba(0,255,0,0.5)");

	requestAnimationFrame(loop);
}

window.addEventListener("load", init);