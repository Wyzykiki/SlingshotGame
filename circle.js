class Circle extends Body {
    constructor(v, radius, mass) {
        super(v, mass);
        this.radius = radius;
	}

	rotate ( O, angle) {
        angle *= Math.PI / 180;
        let xM = this.origin.x - O.x;
        let yM = this.origin.y - O.y;
        let x = xM * Math.cos (angle) + yM * Math.sin (angle) + O.x;
        let y = - xM * Math.sin (angle) + yM * Math.cos (angle) + O.y;
        return ({x:Math.round (x), y:Math.round (y)});
    }

	collisionRect( rect){
        let circleDistance=new Vector(Math.abs(this.origin.x - rect.origin.x),Math.abs(this.origin.y - rect.origin.y));

        if (circleDistance.x > (rect.width/2 + this.radius)) { return false; }
        if (circleDistance.y > (rect.height/2 + this.radius)) { return false; }

        if (circleDistance.x <= (rect.width/2)) { return true; } 
        if (circleDistance.y <= (rect.height/2)) { return true; }

        let cornerDistance_sq = (circleDistance.x - rect.width/2)^2 +
                            (circleDistance.y - rect.height/2)^2;

        return (cornerDistance_sq <= (this.radius^2));
    }

    collisionCircle(c){
        let d = (this.origin.x-c.origin.x)*(this.origin.x-c.origin.x) + (this.origin.y-c.origin.y)*(this.origin.y-c.origin.y)
        console.log(d);
        console.log(( (this.radius+c.radius)*( this.radius+c.radius)));
        if (d> ( (this.radius+c.radius)*( this.radius+c.radius))){
            return false;
        }else{
            return true;
        }
    }
}

class CircleSprite extends Circle {
	constructor(pos, radius, mass, color) {
		super(pos, radius, mass);
		this.color = color;
	}

	draw() {
		ctx.save();
		
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.ellipse(this.origin.x, this.origin.y, this.radius, this.radius, 0, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		
		ctx.restore();
	}
}