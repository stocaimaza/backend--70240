//CLASE 1 - PARTE B: TDD - TEST Y MOCKS

//TDD: significa "Desarrollo Orientado a Pruebas". 
//Es una metodologia de desarrollo de software que consiste en pensar y escribir las pruebas que debe cumplir determinada función. 

//El TDD se divide en 3 etapas: 
//1) Escribir una prueba fallida. 
//2) hacer que la prueba pase. 
//3) Refactorizar. 

//Ejemplo: desarrollar una función de suma: 

//PASO 1: prueba fallida

// const suma = (a, b) => {
//     // La función debe devolver 0 si no se paso ningun parametro.
//     if( !a || !b) {
//         return 0; 
//     }
    
//     // La función debe devolver null si algun parametro no es numerico.
//     if (typeof a !== "number" || typeof b !== "number") {
//         return null; 
//     }

//     // La funcion debe poder realizar la suma correctamente.
//     let resultado = a + b; 
//     return resultado;

//     //Y el 4???

// }

// PARA RESOLVER EL TEST 4 VAMOS A TENER QUE MODIFICAR TODA LA FUNCIÓN PARA RECIBIR N PARAMETROS: 

// const suma = (...numeros) => {
//     //La función debe devolver 0 si no se paso ningun parametro.
//     if (numeros.length === 0) {
//         return 0; 
//     }

//     //La función debe devolver null si algun parametro no es numerico.
//     let banderita = true; 
//     for( let i = 0; i < numeros.length && banderita; i++ ) {
//         if (typeof numeros[i] !== "number") {
//             banderita = false; 
//         }
//     }

//     if(banderita !== true) {
//         return null; 
//     }

//     //TEST 3 y 4: sumar 2 o mas elementos
//     let resultado = 0; 
//     for(let i = 0; i < numeros.length; i++) {
//         resultado += numeros[i];
//     }

//     return resultado; 
// }

// PASO 3: REFACTORIZAR: 
//Buscamos sintetizar y hacer más legible nuestro código. 

const suma = (...numeros) => {
    if(numeros.length === 0) return 0; 
    if(!numeros.every(num => typeof num === "number")) return null; 
    return numeros.reduce((acumulador, elemento) => acumulador + elemento, 0);
}


//Ahora tenemos que pensar en multiples escenarios para poner a prueba nuestra función. 

//1. La función debe devolver null si algun parametro no es numerico. 
//2. La función debe devolver 0 si no se paso ningun parametro. 
//3. La funcion debe poder realizar la suma correctamente. 
//4. La función debe poder realizar la suma con cualquier cantidad de numeros. 

let testPasados = 0; 
let testTotales = 4; 

//TEST 1: 
console.log("La función debe devolver null si algun parametro no es numerico"); 
let resultado1 = suma("2", 3); 
if (resultado1 === null) {
    console.log("Test 1 pasado!"); 
    testPasados++;
} else {
    console.log("El test 1 no se pasó, se esperaba null pero se recibio: " + resultado1); 
}

console.log("------------------------------------------------------------------------");

//TEST 2: 
console.log("La función debe devolver 0 si no se paso ningun parametro.");
let resultado2 = suma(); 
if (resultado2 === 0) {
    console.log("Test 2 Pasado!"); 
    testPasados++; 
} else {
    console.log("El test 2 no se pasó, se esperaba 0 pero se recibio: " + resultado2); 
}

console.log("------------------------------------------------------------------------");

//TEST 3: 
console.log("La funcion debe poder realizar la suma correctamente.");
let resultado3 = suma(2, 3);
if (resultado3 === 5) {
    console.log("Test 3 pasado!");
    testPasados++;
} else {
    console.log("El test 3 no se paso, se esperaba 5 pero se recibio: " + resultado3); 
}

console.log("------------------------------------------------------------------------");

//TEST 4: 
console.log("La función debe poder realizar la suma con cualquier cantidad de numeros"); 
let resultado4 = suma(1, 2, 3, 4, 5);
if (resultado4 === 15) {
    console.log("Test 4 pasdo!");
    testPasados++;
} else {
    console.log("El test 4 no paso, se esperaba 15 pero recibimos: " + resultado4);
}


console.log("------------------------------------------------------------------------");

if (testPasados === testTotales) {
    console.log("Felicitaciones, todos los test se pasaron con exito!");  
} else{
    console.log("Se pasaron " + testPasados + " de un total de " + testTotales);
}

