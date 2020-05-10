class Circle extends Body {
    constructor(v, radius, mass) {
        super(v, mass);
        this.radius = radius;
	}

	/** detecte si il y a une colision entre un cercle et un rectangle */
    collisionRect( rect){
        let A=new Vector (rect.origin.x+rect.width*Math.cos(rect.orientation%(Math.PI*2)),rect.origin.y+rect.width*Math.sin(rect.orientation%(Math.PI*2)));
        let B=new Vector (rect.origin.x,rect.origin.y);
        let C=new Vector (rect.origin.x+rect.height*Math.cos((rect.orientation+Math.PI/2)%(Math.PI*2)),rect.origin.y+rect.height*Math.sin((rect.orientation+Math.PI/2)%(Math.PI*2)));
        let a=C.x-B.x;
        let b=A.x-B.x;
        let c=C.y-B.y;
        let d=A.y-B.y;
        let Cc=new Vector (0,this.radius);
        let cx=(d/(a*d-b*c))*(Cc.x-B.x)-(b/(a*d-b*c))*(Cc.y-B.y);
        let cy=(-c/(a*d-b*c))*(Cc.x-B.x)+(a/(a*d-b*c))*(Cc.y-B.y);
        let co=new Vector(cx,cy);
        let Dd=new Vector (rect.origin.x+rect.width*Math.cos(rect.orientation%(Math.PI*2))+rect.height*Math.cos((rect.orientation+Math.PI/2)%(Math.PI*2)),rect.origin.y +rect.height*Math.sin((rect.orientation+Math.PI/2)%(Math.PI*2))+rect.width*Math.sin(rect.orientation%(Math.PI*2)));
        let Dx=(d/(a*d-b*c))*(Dd.x-B.x)-(b/(a*d-b*c))*(Dd.y-B.y);
        let Dy=(-c/(a*d-b*c))*(Dd.x-B.x)+(a/(a*d-b*c))*(Dd.y-B.y);
        let D =new Vector(Dx,Dy);
        let Ee=new Vector (rect.origin.x+(rect.width*Math.cos(rect.orientation%(Math.PI*2))+rect.height*Math.cos((rect.orientation+Math.PI/2)%(Math.PI*2)))/2,rect.origin.y+((rect.width*Math.sin(rect.orientation%(Math.PI*2)))+rect.height*Math.sin((rect.orientation+Math.PI/2)%(Math.PI*2)))/2);
        let Ex = (d/(a*d-b*c))*(Ee.x-B.x)-(b/(a*d-b*c))*(Ee.y-B.y);
        let Ey=(-c/(a*d-b*c))*(Ee.x-B.x)+(a/(a*d-b*c))*(Ee.y-B.y);
        let E=new Vector(Ex,Ey);
        let Mm=new Vector (this.origin.x,this.origin.y);
        let Mx=(d/(a*d-b*c))*(Mm.x-B.x)-(b/(a*d-b*c))*(Mm.y-B.y);
        let My=(-c/(a*d-b*c))*(Mm.x-B.x)+(a/(a*d-b*c))*(Mm.y-B.y);
        let M =new Vector(Mx,My);
        let Fff=new Vector ((Ee.x-Mm.x)*this.radius/Math.abs(Ee.x-Mm.x),(Ee.y-Mm.y)*this.radius/Math.abs(Ee.y-Mm.y));
        let Ff=Mm.add(Fff);
         let Fx=(d/(a*d-b*c))*(Ff.x-B.x)-(b/(a*d-b*c))*(Ff.y-B.y);
         let Fy=(-c/(a*d-b*c))*(Ff.x-B.x)+(a/(a*d-b*c))*(Ff.y-B.y);
         let F =new Vector(Fx,Fy);
        return rect.isInRect(Ff);

    }

    /** detecte collision cercle-cercle */
    collisionCircle(c){
        let d = (this.origin.x-c.origin.x)*(this.origin.x-c.origin.x) + (this.origin.y-c.origin.y)*(this.origin.y-c.origin.y);
        if (d> ( (this.radius+c.radius)*( this.radius+c.radius))){
            return false;
        }else{
            return true;
        }
    }

    /** agit après une collision cercle cercle */
    hasCollCircle(c){
        this.velocity=new Vector(-this.velocity.x/2,-this.velocity.y/2);
        c.velocity=Vector.ZERO.sub(this.velocity);
    }

    /** gere une collision rect cercle */
    hasCollRect(Rect,where){
        
        if (where=="top"){
            this.velocity=new Vector(this.velocity.x/4,-this.velocity.y/4);
            Rect.velocity=Rect.velocity.add(Vector.ZERO.sub(this.velocity));
            this.origin = new Vector (this.origin.x,this.origin.y+this.radius);
        }else  if (where=="left"){
            this.velocity=new Vector(-this.velocity.x/4,this.velocity.y/4);
            Rect.velocity=Rect.velocity.add(Vector.ZERO.sub(this.velocity));
            this.origin = new Vector (this.origin.x-this.radius,this.origin.y);
        }else if (where=="right"){
            this.velocity=new Vector(-this.velocity.x/4,this.velocity.y/4);
            Rect.velocity=Rect.velocity.add(Vector.ZERO.sub(this.velocity));
            this.origin = new Vector (this.origin.x+this.radius,this.origin.y);
        }else  if (where=="bot"){
            this.velocity=new Vector(this.velocity.x/4,-this.velocity.y/4);
            Rect.velocity=Rect.velocity.add(Vector.ZERO.sub(this.velocity));
            Rect.origin = new Vector (Rect.origin.x,Rect.origin.y+Rect.height/2);
        }else  if (where=="left-bot"){
            this.velocity=new Vector(-this.velocity.x/4,-this.velocity.y/4);
            Rect.velocity=Rect.velocity.add(Vector.ZERO.sub(this.velocity));
            Rect.origin = new Vector (Rect.origin.x,Rect.origin.y+Rect.height/2);
            this.origin = new Vector (this.origin.x+this.radius,this.origin.y+this.radius);
        }else  if (where=="right-bot"){
            this.velocity=new Vector(-this.velocity.x/4,-this.velocity.y/4);
            Rect.velocity=Rect.velocity.add(Vector.ZERO.sub(this.velocity));
            this.origin = new Vector (this.origin.x-this.radius,this.origin.y+this.radius);
        }else  if (where=="right-top"){
            this.velocity=new Vector(-this.velocity.x/4,-this.velocity.y/4);
            Rect.velocity=Rect.velocity.add(Vector.ZERO.sub(this.velocity));
            this.origin = new Vector (this.origin.x+this.radius,this.origin.y+this.radius);
        }else  if (where=="left-top"){
            this.velocity=new Vector(-this.velocity.x/4,-this.velocity.y/4);
            Rect.velocity=Rect.velocity.add(Vector.ZERO.sub(this.velocity));
            this.origin = new Vector (this.origin.x-this.radius,this.origin.y+this.radius);
        }

    }

    /** detecte ou l'impact a eu leiu entre un cercle et un rectangle */
    where(rect){
        let center = new Vector ((rect.origin.x+(rect.width*Math.cos(rect.orientation%(Math.PI*2))+rect.height*Math.cos((rect.orientation+Math.PI/2)%(Math.PI*2)))/2,rect.origin.y+((rect.width*Math.sin(rect.orientation%(Math.PI*2)))+rect.height*Math.sin((rect.orientation+Math.PI/2)%(Math.PI*2)))/2));
        let temp=center.sub(this.origin);
        if (rect.orientation%(Math.PI)==0 ){
            
            if (temp.x>=center.x-rect.width/2 && temp.x<=center.x+rect.width/2 ){
                if(temps.y<center.y){
                    return "bot";
                } else {
                    return "top";
                }
            }else if(temp.x<center.x){
                return "left"; 
            }else {
                return "right";
            } 

        }else if (rect.orientation%(Math.PI/2)==0 ){
            if (temp.x>=center.x-rect.height/2 && temp.x<=center.x+rect.height/2 ){
                
                if(temps.y<center.y){
                    return "bot";
                } else {
                    return "top";
                }
                    
            }else if(temp.x<center.x){
                return "left"; 
            }else {
                return "right";
            } 
        }else {
            if (temp.y<center.y){
                if (temps.x<center.x){
                    return "left-bot";
                }
                return "right-bot";
            }
            if (temps.x<center.x){
                return "left-top";
            }
            return "right-top";
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