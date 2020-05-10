let canvas, ctx, game;

let lastFrame = performance.now();
let last = performance.now();

let xhr = new XMLHttpRequest();

let lag = 0;


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
	}	

	last=now;
	requestAnimationFrame(loop);
	let proj = document.getElementById("proj");
	proj.innerHTML = "Projectile restants : Basique " + game.nbBasic + " Lourd " + game.nbLourd + " Leger " + game.nbLeger;
	
}

/** Fonction qui s'execute au chargement de la page */
function init() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	xhr.open("GET", "levels.json");
	xhr.onload = () => {
		game = new Game(JSON.parse(xhr.responseText));
	};
	xhr.send();

	requestAnimationFrame(loop);
}

window.addEventListener("load", init);