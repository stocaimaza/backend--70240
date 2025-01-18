//CLUSTERIZACION Y ESCALABILIDAD

//ESCALABILIDAD: Se refiere a la capacidad de un sistema, proceso o recurso para manejar un aumento en la carga de trabajo. 

//ESCALABILIDAD HORIZONTAL VS ESCALABILIDAD VERTICAL. 

//En el escalamiento horizontal cuando necesitamos crecer, no tenemos que agregar más equipos, sion que sumamos otra instancia a nuestro servidor para que se una a la red de nodos y forme parte del cluster. 

//CLUSTERIZAR NUESTRA APP: 

//proceso padre == primary process
//proceso hijo == worker

import express from "express";
import cluster from "cluster"; 
//Modulo nativo de Node JS que me permite generar la clusterizacion. 

//Aprovechemos al maximo la capacidad de nuestra compu: 
import { cpus } from "os";
let numeroDeProcesos = cpus().length; 
console.log(numeroDeProcesos);


if(cluster.isPrimary) {
    console.log("Proceso principal"); 

    for(let i = 0; i < numeroDeProcesos; i++) {
        cluster.fork(); 
    }
} else {
    const app = express(); 

    app.get("/operacionsimple", (req, res) => {
        let suma = 0; 
        for (let i = 0; i < 1000000; i++) {
            suma += i; 
        }
        res.send({suma}); 
    })
    
    
    app.get("/operacioncompleja", (req, res) => {
        let suma = 0; 
        for(let i = 0; i < 5e8; i++) {
            suma += i; 
        }
        res.send({suma}); 
    })
    
    app.listen(8080, () => {
        console.log("Escuchando en el puerto 8080");
    })
}

