import { Car } from "./obcar.mjs";
export class CarroComPlaca extends Car{
    #_placa
    constructor(umaPlaca){
    super(55) //chama o construtor da classe pai (Carro) e passa o valor 55 como argumento.
    this.#_placa=umaPlaca
    }
    get placa(){
    return this.#_placa
    }
    }