"use strict";
console.log("Hola mamá, estoy en Typescript");
console.log("Olis, ke aasen?");
//Tipos de datos: 
//String: 
let nombre = "Pepe";
nombre = "Firulais";
console.log(nombre);
//Más ejemplos: 
const nacimiento = 1987;
let trabaja = true;
//Objeto: 
const persona = {
    nombre: "Juan",
    edad: 30
};
//Arrays: 
const numeros = [1, 2, 3, 4, 5];
const persons = ["Juan", "Pablo", "Lucas"];
let combinadito = ["Hola", "que", "calor", 100];
const booleanos = [true, false, true];
//Funciones: 
function suma(numeroA, numeroB) {
    return numeroA + numeroB;
}
console.log(suma(100, 50));
//Ejemplo con funciones flecha: 
const restar = (a, b) => a - b;
console.log(restar(200, 100));
//Clases: 
class Perro {
    constructor(raza, edad) {
        this.raza = raza;
        this.edad = edad;
    }
}
//Instancia de clase: 
const firulais = new Perro("Ladrador", 5);
console.log(firulais);
