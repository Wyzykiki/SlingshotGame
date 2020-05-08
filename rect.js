class Rect extends Body {
	constructor(v, width, height, mass, angle) {
        super(v, mass);
        this.orientation = angle;
        Object.defineProperty(this, "width", { writable: false, value : width });
        Object.defineProperty(this, "height", { writable: false, value : height });
        let c = new Vector(this.width/2, this.height/2);
        console.log(c.norm());
        this.center=new Vector (this.origin.x+c.norm()*Math.cos((45+angle)*Math.PI/180),this.origin.y+c.norm()*Math.sin((45+angle)*Math.PI/180));
    }


    copy(){
        return new Rect(this.origin,this.width,this.height,this.mass,this.orientation);
    }

    rotate(o){
        this.orientation+=o;
        this.center=new Vector (this.origin.x+this.origin.norm()*Math.cos(o),this.origin.y+this.origin.norm()*Math.sin(o));

    }

    isInRect(e){
        let A=new Vector (this.origin.x,this.origin.y);
        let B=new Vector (this.origin.x+this.width,this.origin.y);
        let C=new Vector (this.origin.x,this.origin.y+this.height);
        let D=new Vector (this.origin.x+this.width,this.origin.y+this.height);
        let a=C.x-B.x;
        let b=A.x-B.x;
        let c=C.y-B.y;
        let d=A.y-B.y;
        let E=(d/(a*d-b*c))*(e.x-B.x)-(b/(a*d-b*c))*(e.y-B.y);
        let F=(-c/(a*d-b*c))*(e.x-B.x)-(a/(a*d-b*c))*(e.y-B.y);
        return E >= 0 && E<=1 &&  F >= 0 && F<=1;
    }
    collisionRect(rect){
        let r1= this.copy();
        let r2 = rect.copy();
        r2.rotate(-r1.orientation);
        r1.rotate(-r1.orientation);
        let A=new Vector (r1.origin.x,r1.origin.y);
        let B=new Vector (r1.origin.x+r1.width,r1.origin.y);
        let C=new Vector (r1.origin.x,r1.origin.y+r1.height);
        let D=new Vector (r1.origin.x+r1.width,r1.origin.y+r1.height);
        return this.isInRect(A)&&this.isInRect(B)&&this.isInRect(C)&&this.isInRect(D);
    }

    collisionCircle( circle){
        let circleDistance=new Vector(Math.abs(circle.x - this.origin.x),Math.abs(circle.y - this.origin.y));
        

        if (circleDistance.x > (this.origin.width/2 + circle.r)) { return false; }
        if (circleDistance.y > (this.origin.height/2 + circle.r)) { return false; }

        if (circleDistance.x <= (this.origin.width/2)) { return true; } 
        if (circleDistance.y <= (this.origin.height/2)) { return true; }

        let cornerDistance_sq = (circleDistance.x - this.origin.width/2)^2 +
                            (circleDistance.y - this.origin.height/2)^2;

        return (cornerDistance_sq <= (circle.r^2));
    }
    mDiff (r) {
        let orig = new Vector (r.origin.x - this.origin.x - this.width,
			   r.origin.y - this.origin.y - this.height);
        return new Rect(orig, this.width + r.width, this.height + r.height);
    }

    hasOrigin () {
        return (this.origin.x < 0 && this.origin.x + this.width > 0)
        	&& (this.origin.y < 0 && this.origin.y + this.height > 0);
    }
}

class RectSprite extends Rect {
	constructor(pos, width, height, mass, angle, color) {
		super(pos, width, height, mass, angle);
		this.color = color;
	}

	draw() {
		ctx.save();
        
        ctx.translate(this.origin.x,this.origin.y);
        ctx.rotate(this.orientation * Math.PI/180);
		ctx.fillRect(0, 0, this.width, this.height);
		
		ctx.restore();
    }
}