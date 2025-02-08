console.log("Hola mamá, estoy en Typescript"); 
console.log("Olis, ke aasen?");

//Tipos de datos: 

//String: 
let nombre: string = "Pepe"; 

nombre = "Firulais"; 
console.log(nombre);

//Más ejemplos: 
const nacimiento: number = 1987; 
let trabaja : boolean = true; 

//Objeto: 

const persona: {nombre: string, edad: number} = {
    nombre: "Juan", 
    edad: 30
}

//Arrays: 

const numeros: number[] = [1, 2, 3, 4, 5]; 
const persons: string[] = ["Juan", "Pablo", "Lucas"]; 
let combinadito: (number | string)[] = ["Hola", "que", "calor", 100]; 
const booleanos: boolean[] = [true, false, true]

//Funciones: 

function suma(numeroA: number, numeroB: number): number {
    return numeroA + numeroB;
}

console.log(suma(100, 50)); 

//Ejemplo con funciones flecha: 

const restar = (a: number, b:number) => a - b; 
console.log(restar(200,100)); 

//Clases: 

class Perro {
    raza: string; 
    edad: number;

    constructor(raza: string, edad: number) {
        this.raza = raza;
        this.edad = edad; 
    }
}

//Instancia de clase: 
const firulais = new Perro("Ladrador", 5); 
console.log(firulais); 