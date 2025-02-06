import { Car } from "./obcar.mjs";

var car = new Car(88);

console.log(car.tank)
console.log(car.capacity)

car.tank = 20;
console.log(car.tank)

car.tank = 500;
console.log(car.tank)