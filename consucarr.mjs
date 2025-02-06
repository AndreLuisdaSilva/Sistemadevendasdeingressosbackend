import { Locadora } from "./locadoracar.mjs";
import { CarroComPlaca } from "./obCareran.mjs";

var locas = new Locadora();

locas.Addcars(new CarroComPlaca("eae-566"))
locas.Addcars(new CarroComPlaca("543543-53454"));

locas.Eyecars();
locas.abasteceCarro(1,30);