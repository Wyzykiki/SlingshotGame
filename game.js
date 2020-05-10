class Game {
	constructor(levels) {
		this.levels = levels;

		/** Le moteur physique */
		this.engine = new Engine();

		/** Le moteur de rendu */
		this.renderer = new Renderer(this.engine);

		/** Les menus du jeu */
		this.menu = new Menu();

		/** Le lance pierre */
		this.sling = null;

		/** Les projectiles en réserve plus celui qui est actif, le premier du tableau. */
		this.projectiles = [];
		this.nbBasic = 0;

		/** Début et fin du lancer du projectile */
		this.throwStart = null;
		this.throwStop = null;

		/** Level courrant */
		this.curLevel = 0;

		//le lancer a ete fait
		this.playing = false;
	}

	update() {
		this.engine.update();

		// let win = true;
        // for (let i=0; i<this.engine.objects.length; i++) {
        //     let obj = this.engine.objects[i];
        //     if (obj instanceof Target){
        //         win = false;
        //     }
		// }
		
		// if (win && this.curLevel != 0) {
		// 	this.curLevel++;
		// 	this.initLevel(this.curLevel);
		// }
	}

	render() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.renderer.render();
		this.menu.draw();
	}


	/** On change le projectile */
	newProjectile() {
		/** On retire le vieux projectile */
		this.projectiles.slice(0, 1);

		if (this.nbBasic > 0) {
			let projectile = this.projectiles[0];
			this.engine.add(projectile);
			if (projectile instanceof BasicProjectile) {
				this.nbBasic--;
			}
		} else {
			//FIXME: fin de partie
		}
	}

	/** Initialisation des variables de l'environnement pour le niveau sélectionné. */
	initLevel(n) {
		this.curLevel = n;
		let level = this.levels[n];
		this.sling = level.sling;

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

		this.newProjectile();
		let r1 = new RectSprite(new Vector(700,350),50,50,1,0,"rgba(0,255,0,0.5)");
		let r2 = new RectSprite(new Vector(700,220),50,50,1,0,"rgba(0,255,0,0.5)");
		let r3 = new RectSprite(new Vector(550,350),50,50,1,0,"rgba(0,255,0,0.5)");
		this.engine.add(r1);
		this.engine.add(r2);
		// this.engine.add(r3);

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
			this.engine.add(target);
		}
	
		/** Créer les obstacles */
		for (let i=0; i<level.obstacles.length; i++) {
			let obstacle = null;
			switch (level.obstacles[i].type) {
				case "plank":
					obstacle = new Plank(level.obstacles[i].x, level.obstacles[i].y, level.obstacles[i].horizontal);
					break;
				case "block":
					obstacle = new Block(level.obstacles[i].x, level.obstacles[i].y);
					break;
				default:
					break;
			}
			this.engine.add(obstacle);
		}

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

/** Gestion du lacher du projectile */
function throwUpHandler(ev) {
	/** On retire les événements */
	canvas.removeEventListener("mousemove", throwMoveHandler);
	canvas.removeEventListener("mousedown", throwDownHandler);
	canvas.removeEventListener("mouseup", throwUpHandler);

	/** Calcul  */
	game.throwStop = new Vector(game.projectiles[0].origin.x, game.projectiles[0].origin.y);

	let vitesseX = -(game.throwStop.x-game.throwStart.x)/game.sling.radius * game.sling.rappel * game.projectiles[0].invMass;
	let vitesseY = -(game.throwStop.y-game.throwStart.y)/game.sling.radius * game.sling.rappel * game.projectiles[0].invMass;
	game.projectiles[0].applyForce(new Vector(vitesseX, vitesseY));
	
	
	console.log(ev);
	console.log("(" + (game.throwStop.x-game.throwStart.x) + "," + (game.throwStop.y-game.throwStart.y) + ")");
	
	
	game.projectiles[0].on = true;


	/** TODO: Démare le moteur */
	game.engine.start();
	game.playing = true;

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