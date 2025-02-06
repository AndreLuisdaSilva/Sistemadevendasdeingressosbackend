export class Circus {
    constructor(r){
        this.raio = r;
    }
    area(){
        return Math.PI * this.raio**2;
    }
    
    circus(){
        return 2 * Math.PI * this.raio;
    }
}