class Body  {
    constructor (v, mass) {
        this.mass = mass || 0;
        this.invMass = 1/this.mass;
        this.velocity = Vector.ZERO;
        this.force = Vector.ZERO;
        this.origin = v;
        /* begin en bonus */
        this.hasCollision = false;
        /* end en bonus */
    }
    move (v) {
        this.origin = this.origin.add(v);
    }








    /* begin en bonus */

    setCollision (b) {
        this.hasCollision = b;
    }

    /* end en bonus */



    /* Dectection de collision entre l'objet courrant et l'objet b.

    Renvoie null si pas de collision, sinon renvoie les nouveau vecteur vitesses
    pour l'objet courant et pour b
    */



    collision (b) {

        let mdiff = this.mDiff(b);
        if (mdiff.hasOrigin()) {

            let vectors = [ new Vector (0,mdiff.origin.y),
                new Vector (0,mdiff.origin.y+mdiff.height),
                new Vector (mdiff.origin.x, 0),
                new Vector (mdiff.origin.x + mdiff.width, 0) ];

			let n = vectors[0];

			for (let i = 1; i < vectors.length; i++) {
				if (vectors[i].norm() < n.norm())
				n = vectors[i];
			};

			let norm_v = this.velocity.norm();
			let norm_vb = b.velocity.norm();
			let kv = norm_v / (norm_v + norm_vb);
			let kvb = norm_vb / (norm_v + norm_vb);

			if (norm_v == 0 && norm_vb == 0) {
				if (this.invMass == 0 && b.invMass == 0)
				return null;
				else {
					if (this.mass <= b.mass)
					kv = 1;
					else
					kvb = 1
				}

			};

			this.move(n.mult(kv));
			b.move(n.mult(-kvb));

			n = n.normalize();

			// (2) On calcule l'impulsion j :
			let v = this.velocity.sub(b.velocity);
			let e = Constants.elasticity; // pour les étudiants, juste faire let e = 1;

			let j = -(1 + e) * v.dot(n) / (this.invMass + b.invMass);

			// (3) On calcule les nouvelle vitesse:
			let new_v = this.velocity.add(n.mult(j  * this.invMass));
			let new_bv = b.velocity.sub(n.mult(j * b.invMass));

			b.setCollision(true);
			this.setCollision(true);

			return { velocity1 : new_v, velocity2 : new_bv };

		} else {
			return null;
		}
	}
}