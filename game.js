class Game {
	constructor(levels) {
		this.levels = levels;
		this.renderer = null;

		/** Le lance pierre */
		this.sling = null;

		/** Les projectiles en réserve plus celui qui est actif, le premier du tableau. */
		this.projectiles = [];
		this.nbBasic = 0;

		/** Début et fin du lancer du projectile */
		this.throwStart = null;
		this.throwStop = null;
	}

	/** On change le projectile */
	newProjectile(engine) {
		//FIXME: enlever proj[0] ?
		let projectile = this.projectiles[0];
		engine.add(projectile);
		if (projectile instanceof BasicProjectile) {
			this.nbBasic--;
		}
	}

	/** Initialisation des variables de l'environnement pour le niveau sélectionné. */
	initLevel(n) {
		let level = this.levels[n];
		this.sling = level.sling;
		let engine = new Engine();

		/** Créer les projectiles */
		for (let i=0; i<level.projectiles.length; i++) {
			switch (level.projectiles[i]) {
				case "basic":
					this.projectiles.push(new BasicProjectile(this.sling.x, this.sling.y));
					this.nbBasic++;
					break;
				default:
					break;
			}
		}

		this.newProjectile(engine);

		/** Créer les cibles */
		for (let i=0; i<level.targets.length; i++) {
			let target = null
			switch (level.targets[i].type) {
				case "basic":
					target = new BasicTarget(level.targets[i].x, level.targets[i].y);
					break;
				case "strong":
					target = new StrongTarget(level.targets[i].x, level.targets[i].y);
					break;
				default:
					break;
			}
			engine.add(target);
		}
	
		/** Créer les obstacles */
		for (let i=0; i<level.obstacles.length; i++) {
			
		}

		this.renderer = new Renderer(engine);
		canvas.addEventListener("mousedown", throwDownHandler);
	}
};

function throwDownHandler(ev) {
	if (game.projectiles[0].isIn(ev.offsetX, ev.offsetY)) {
		canvas.addEventListener("mouseup", throwUpHandler);
		canvas.addEventListener("mousemove", throwMoveHandler);

		game.throwStart = new Vector(game.projectiles[0].origin.x, game.projectiles[0].origin.y);

		console.log("Proj");
	} else {
		console.log("canvas");
	}
}

function throwUpHandler(ev) {
	canvas.removeEventListener("mousemove", throwMoveHandler);

	game.throwStop = new Vector(game.projectiles[0].origin.x, game.projectiles[0].origin.y);

	console.log(ev);
	console.log("(" + (game.throwStop.x-game.throwStart.x) + "," + (game.throwStop.y-game.throwStart.y) + ")");
	vitX = -(game.throwStop.x-game.throwStart.x)/game.sling.radius * game.sling.rappel;
	vitY = -(game.throwStop.y-game.throwStart.y)/game.sling.radius * game.sling.rappel;
	canvas.removeEventListener("mousedown", throwDownHandler);
	canvas.removeEventListener("mouseup", throwUpHandler);
}

function throwMoveHandler(ev) {
	if ((ev.offsetX - game.sling.x) * (ev.offsetX - game.sling.x) + (ev.offsetY - game.sling.y) * (ev.offsetY - game.sling.y) <= game.sling.radius * game.sling.radius) {
		game.projectiles[0].setPosition(ev.offsetX, ev.offsetY);
	} else {
		let n = Math.sqrt((ev.offsetX - game.sling.x) * (ev.offsetX - game.sling.x) + (ev.offsetY - game.sling.y) * (ev.offsetY - game.sling.y));
		let alpha = Math.asin((ev.offsetY -game.sling.y) / n);


		console.log("======================");
		console.log(n);
		console.log(ev.offsetX);
		console.log(alpha);
		if (ev.offsetX < game.sling.x) {
			let newX = game.sling.x + game.sling.radius * Math.cos(Math.PI - alpha);
			let newY = game.sling.y + game.sling.radius * Math.sin(Math.PI - alpha);
			game.projectiles[0].setPosition(newX, newY);
		} else {
			let newX = game.sling.x + game.sling.radius * Math.cos(alpha);
			let newY = game.sling.y + game.sling.radius * Math.sin(alpha);
			game.projectiles[0].setPosition(newX, newY);
		}
	}
}

//Creer requete xhr
//tant que pas revenue chargement 
//attendre quel retourne
//construire Game() avec la reponse
//et lancer affichage