let canvas, ctx, menu, game;

let lastLoop = new Date();

let vitX = 0, vitY = 0;//TODO: a virer

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
				"x" : 0,
				"y" : 0,
				"width" : 10,
				"height" : 10
			}
		],
		"targets" : [
			{
				"x" : 400,
				"y" : 100,
				"type" : "basic"
			},
			{
				"x" : 600,
				"y" : 300,
				"type" : "strong"
			}
		],
		"sling" : {
			"x" : 50,
			"y" : 50,
			"radius" : 35,
			"rappel" : 5
		},
		"projectiles" : ["basic"]
	}
];


/** Fonction de debug */
function drawSling() {
	ctx.save();
	ctx.fillStyle = "rgba(0,0,255,0.5)";
	ctx.beginPath();
	ctx.ellipse(game.sling.x, game.sling.y, game.sling.radius, game.sling.radius, 0, 0, 2*Math.PI);
	ctx.fill();
	ctx.closePath();
	
	ctx.restore();
}

/** Boucle appellé 60 fois par seconde */
function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	if (debug) {
		//drawSling();
	

		ctx.save();
		ctx.fillStyle = "rgba(0,255,0,0.3)";
		ctx.beginPath();
		ctx.ellipse(0, 0, 250, 250, 0, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		
		ctx.restore();


		c1.draw();
		c2.draw();
		c3.draw();
		r1.draw();
		//r2.draw();
		r3.draw();

		c1.collisionRect(c2);
	}

	if (debug2) {
		// console.log(cpt + " : " + vitX + ", " + c.x);
		// console.log(vitX);
		
		// vitX += accel;
		game.projectiles[0].move(new Vector(vitX*1000/120, vitY*1000/120));
		
		if (game.projectiles[0].origin.x < 0 || game.projectiles[0].origin.x > canvas.width) {
			vitX = -vitX;
		}
		if (game.projectiles[0].origin.y < 0 || game.projectiles[0].origin.y > canvas.height) {
			vitY = -vitY;
		}
		game.renderer.render();
		
		
	}
	// menu.draw();

    let thisLoop = new Date();
    let fps = 1000 / (thisLoop - lastLoop);
	lastLoop = thisLoop;
	let div = document.getElementById("fps");
	div.innerHTML = fps;

	// let cpt = document.getElementById("cpt");
	// cpt.innerHTML = game.nbBasic;
}

/** Fonction qui s'execute au chargement de la page */
function init() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	// xhr.open("GET", "levels.json");
	// xhr.onload = () => {
		// game = new Game(demo);
		// game = new Game(JSON.parse(xhr.responseText));
		// menu = new Menu();
	// };
	// xhr.send();
	c1= new CircleSprite(new Vector (405,203),10,1,"rgba(0,220,220,123");
	c2= new CircleSprite(new Vector (405,210),10,1,"rgba(0,0,220,123");
	c3= new CircleSprite(new Vector (475,255),10,1,"rgba(0,220,0,123");
	r1 = new RectSprite(new Vector(400,200),20,20,1,30,"rgba(0,255,0,0.5)");
	r2 = new RectSprite(new Vector(400.5,215),20,20,1,60,"rgba(0,255,0,0.5)");
	r3 = new RectSprite(new Vector(0,0),200,200,1,0,"rgba(0,255,0,0.5)");
	window.setInterval(loop, 1000/60);
}

window.addEventListener("load", init);