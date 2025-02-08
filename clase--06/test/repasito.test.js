//Repasito de test unitarios: 

//assert: modulo nativo de node js que nos permite realizar las validaciones. 

import assert  from "assert";

function suma(a, b) {
    return a + b; 
}

// describe("Funcion suma", () => {
//     it("Debe retornar 3 cuando se suma 1 y 2", () => {
//         assert.strictEqual(suma(1,2), 3); 
//     })

//     it("Debe retornar 0 cuando se suman -1 y 1", () => {
//         assert.strictEqual(suma(-1, 1), 0); 
//     })
// })

describe("Ejemplo de Hooks en Mocha", function() {
   
    before(() => {
        console.log("Este codigo se ejecuta antes de las pruebas totales"); 
    })

    after( () => {
        console.log("Este codigo se ejecuta despues de las pruebas totales"); 
    })

    beforeEach( () => {
        console.log("Este codigo se ejecuta antse de cada prueba indivual");
    })

    afterEach( () => {
        console.log("Este codigo se ejecuta despues de cada prueba individual"); 
    })

    it("Debe retornar 3 cuando se suma 1 y 2", () => {
        assert.strictEqual(suma(1,2), 3); 
    })

    it("Debe retornar 0 cuando se suman -1 y 1", () => {
        assert.strictEqual(suma(-1, 1), 0); 
    })

})