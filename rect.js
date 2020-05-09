class Rect extends Body {
	constructor(v, width, height, mass, angle) {
        super(v, mass);
        this.orientation = angle*Math.PI/180;
        Object.defineProperty(this, "width", { writable: false, value : width });
        Object.defineProperty(this, "height", { writable: false, value : height });
        
    }


    copy(){
        return new Rect(this.origin,this.width,this.height,this.mass,this.orientation/Math.PI*180);
    }

    rotate(o){
        this.orientation+=o*Math.PI/180;
        

    }

    isInRect(e){
        let A=new Vector (this.origin.x+this.width*Math.cos(this.orientation%(Math.PI*2)),this.origin.y+this.width*Math.sin(this.orientation%(Math.PI*2)));
        let B=new Vector (this.origin.x,this.origin.y);
        let C=new Vector (this.origin.x+this.height*Math.cos((this.orientation+Math.PI/2)%(Math.PI*2)),this.origin.y+this.height*Math.sin((this.orientation+Math.PI/2)%(Math.PI*2)));
        let a=C.x-B.x;
        let b=A.x-B.x;
        let c=C.y-B.y;
        let d=A.y-B.y;
        //this.where ???
        let E=(d/(a*d-b*c))*(e.x-B.x)-(b/(a*d-b*c))*(e.y-B.y);
        let F=(-c/(a*d-b*c))*(e.x-B.x)+(a/(a*d-b*c))*(e.y-B.y);
        return E >= 0 && E<=1 &&  F >= 0 && F<=1;
    }
   
    collisionRect(rect){
        let r1= this.copy();
        let r2 = rect.copy();
        
        
        let A=new Vector (r2.origin.x,r2.origin.y);
        let B=new Vector (r2.origin.x+r2.width*Math.cos(r2.orientation%(Math.PI*2)),r2.origin.y+r2.width*Math.sin(r2.orientation%(Math.PI*2)));
        let C=new Vector (r2.origin.x+r2.height*Math.cos((r2.orientation+Math.PI/2)%(Math.PI*2)),r2.origin.y+r2.height*Math.sin((r2.orientation+Math.PI/2)%(Math.PI*2)));
        let D=new Vector (r2.origin.x+r2.width*Math.cos(r2.orientation%(Math.PI*2))+r2.height*Math.cos((r2.orientation+Math.PI/2)%(Math.PI*2)),r2.origin.y+r2.height*Math.sin((r2.orientation+Math.PI/2)%(Math.PI*2))+r2.width*Math.sin(r2.orientation%(Math.PI*2)));
        
        return r1.isInRect(A)||r1.isInRect(B)||r1.isInRect(C)||r1.isInRect(D);
    }
    
    collisionCircle( circle){
        let A=new Vector (this.origin.x+this.width*Math.cos(this.orientation%(Math.PI*2)),this.origin.y+this.width*Math.sin(this.orientation%(Math.PI*2)));
        let B=new Vector (this.origin.x,this.origin.y);
        let C=new Vector (this.origin.x+this.height*Math.cos((this.orientation+Math.PI/2)%(Math.PI*2)),this.origin.y+this.height*Math.sin((this.orientation+Math.PI/2)%(Math.PI*2)));
        let a=C.x-B.x;
        let b=A.x-B.x;
        let c=C.y-B.y;
        let d=A.y-B.y;
        let Cc=new Vector (0,circle.radius);
        let cx=(d/(a*d-b*c))*(Cc.x-B.x)-(b/(a*d-b*c))*(Cc.y-B.y);
        let cy=(-c/(a*d-b*c))*(Cc.x-B.x)+(a/(a*d-b*c))*(Cc.y-B.y);
        let co=new Vector(cx,cy);
        let Dd=new Vector (this.origin.x+this.width*Math.cos(this.orientation%(Math.PI*2))+this.height*Math.cos((this.orientation+Math.PI/2)%(Math.PI*2)),this.origin.y +this.height*Math.sin((this.orientation+Math.PI/2)%(Math.PI*2))+this.width*Math.sin(this.orientation%(Math.PI*2)));
        let Dx=(d/(a*d-b*c))*(Dd.x-B.x)-(b/(a*d-b*c))*(Dd.y-B.y);
        let Dy=(-c/(a*d-b*c))*(Dd.x-B.x)+(a/(a*d-b*c))*(Dd.y-B.y);
        let D =new Vector(Dx,Dy);
        let Ee=new Vector (this.origin.x+(this.width*Math.cos(this.orientation%(Math.PI*2))+this.height*Math.cos((this.orientation+Math.PI/2)%(Math.PI*2)))/2,this.origin.y+((this.width*Math.sin(this.orientation%(Math.PI*2)))+this.height*Math.sin((this.orientation+Math.PI/2)%(Math.PI*2)))/2);
        let Ex = (d/(a*d-b*c))*(Ee.x-B.x)-(b/(a*d-b*c))*(Ee.y-B.y);
        let Ey=(-c/(a*d-b*c))*(Ee.x-B.x)+(a/(a*d-b*c))*(Ee.y-B.y);
        let E=new Vector(Ex,Ey);
        let Mm=new Vector (circle.origin.x,circle.origin.y);
        let Mx=(d/(a*d-b*c))*(Mm.x-B.x)-(b/(a*d-b*c))*(Mm.y-B.y);
        let My=(-c/(a*d-b*c))*(Mm.x-B.x)+(a/(a*d-b*c))*(Mm.y-B.y);
        let M =new Vector(Mx,My);
        let Fff=new Vector ((Ee.x-Mm.x)*circle.radius/Math.abs(Ee.x-Mm.x),(Ee.y-Mm.y)*circle.radius/Math.abs(Ee.y-Mm.y));
        let Ff=Mm.add(Fff);
        console.log("Ee puis Ff");
        console.log(Ee);
        console.log(Ff);

         let Fx=(d/(a*d-b*c))*(Ff.x-B.x)-(b/(a*d-b*c))*(Ff.y-B.y);
         let Fy=(-c/(a*d-b*c))*(Ff.x-B.x)+(a/(a*d-b*c))*(Ff.y-B.y);
         let F =new Vector(Fx,Fy);
        return this.isInRect(Ff);
         //     let test=M.add(F);
    //     console.log(test);
    //     console.log(test.norm());
    //     let DM = D.sub(M);
    //     let CM = C.sub(M);
    //     let BM = B.sub(M);
    //     let AM = A.sub(M);
        
    //     console.log(M);
    //     console.log(F);
    //     console.log(DM.norm())
    // if (DM.norm()<=test.norm()){return true;}
    // console.log(CM.norm())
    // if (CM.norm()<=test.norm()){return true;}
    // console.log(BM.norm())
    // if (BM.norm()<=test.norm()){return true;}
    
    // if (AM.norm()<=test.norm()){return true;}
    
    // if (F.x>=A.x && F.x<=C.x && F.y<=A.x && F.x>=C.y ){return true;}
    // if (M.x>=A.x && M.x<=C.x && M.y<=A.x && M.x>=C.y ){return true;}
    
    }

    where(cercle){
        let center = new Vector ((this.origin.x+(this.width*Math.cos(this.orientation%(Math.PI*2))+this.height*Math.cos((this.orientation+Math.PI/2)%(Math.PI*2)))/2,this.origin.y+((this.width*Math.sin(this.orientation%(Math.PI*2)))+this.height*Math.sin((this.orientation+Math.PI/2)%(Math.PI*2)))/2));
        let temp=center.sub(cercle.origin);
        if (this.orientation%(Math.PI)==0 ){
            
            if (temp.x>=center.x-this.width/2 && temp.x<=center.x+this.width/2 ){
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

        }else if (this.orientation%(Math.PI/2)==0 ){
            if (temp.x>=center.x-this.height/2 && temp.x<=center.x+this.height/2 ){
                
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
    hasCollCircle(c){
        this.velocity=new Vector(-this.velocity.x/2,-this.velocity.y/2);
        c.velocity=Vector.ZERO.sub(this.velocity);
        
    }


    hasCollRect (b) {

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
                this.velocity.add(n.mult(j  * this.invMass));
                b.velocity.sub(n.mult(j * b.invMass));

                b.setCollision(true);
                this.setCollision(true);

                // this.velocity= new_v; 
                // rect.velocity=new_bv ;

            } else {
                return null;
            }
        
    }
    toNew(){

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
        ctx.rotate(this.orientation);
		ctx.fillRect(0, 0, this.width, this.height);
		
		ctx.restore();
    }
}