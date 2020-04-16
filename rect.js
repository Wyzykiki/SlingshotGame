class Rect extends Body {
	constructor(v, width, height, mass, angle) {
        super(v, mass);
        this.orientation = angle;
        Object.defineProperty(this, "width", { writable: false, value : width });
        Object.defineProperty(this, "height", { writable: false, value : height });
        this.center = new Vector(this.origin.x + this.norm() * Math.cos(angle), this.origin.y + this.norm() * Math.sin(angle));
    }

    rotate(o) {
        this.orientation += o;
        this.center = new Vector(this.origin.x + this.norm() * Math.cos(o), this.origin.y + this.norm() * Math.sin(o));
    }

    mDiff(r) {
        let orig = new Vector(r.origin.x - this.origin.x - this.width,
			   r.origin.y - this.origin.y - this.height);
        return new Rect(orig, this.width + r.width, this.height + r.height);
    }

    hasOrigin() {
        return (this.origin.x < 0 && this.origin.x + this.width > 0)
        	&& (this.origin.y < 0 && this.origin.y + this.height > 0);
    }
}