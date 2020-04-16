class Circle extends Body {
    constructor(v, radius, mass) {
        super(v, mass);
        this.radius = radius;
	}
	
    collisionCircle(c) {
        d = (this.origin.x-c.origin.x) * (this.origin.x-c.origin.x) + (this.origin.y-c.origin.y) * (this.origin.y-c.origin.y);
        if (d> ( (this.r+c.r)*( this.r+c.r))) {
            return false;
        } else {
            return true;
        } 
    }
   


}