import { CarroComPlaca } from "./obCareran.mjs";

export class Locadora{
    #cars
    constructor(){
        this.#cars = []
    }
    Addcars(umCar){
        this.#cars.push(umCar);
        console.log(this.#cars.length)
    }
    Eyecars(){
        this.#cars.forEach((car)=> console.log("Carro placa ("+ car.placa+"); tq:"+car.tank ));
    }

    abasteceCarro(index, quanti){
        if(index>=0 && index<this.#cars.length)
        this.#cars[index].tanque=quanti
        }
}