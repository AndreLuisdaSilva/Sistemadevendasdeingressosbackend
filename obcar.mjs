/**
 * Represents a Car with a fuel tank.
 */
export class Car {
    #tank; // Quantidade atual de combustível no tanque.
    #tankCapacity; // Capacidade máxima do tanque de combustível.
  
    /**
     * Creates a new Car instance.
     * @param {number} tankCapacity - The maximum capacity of the fuel tank.
     */
    constructor(tankCapacity) {
      this.#tank = 0; // Initially, the tank is empty.
      this.#tankCapacity = tankCapacity;
    }
  
    /**
     * Gets the current amount of fuel in the tank.
     * @returns {number} The current fuel amount.
     */
    get tank() {
      return this.#tank;
    }
  
    /**
     * Gets the maximum capacity of the fuel tank.
     * @returns {number} The maximum tank capacity.
     */
    get capacity() {
      return this.#tankCapacity;
    }
  
    /**
     * Adds fuel to the tank.
     * @param {number} quantity - The amount of fuel to add.
     */
    set tank(quantity) {
      if (quantity >= 0) {
        if (quantity + this.#tank > this.#tankCapacity) {
          this.#tank = this.#tankCapacity; // Fill the tank to its maximum capacity.
        } else {
          this.#tank += quantity; // Add the specified quantity to the tank.
        }
      }
    }
  }