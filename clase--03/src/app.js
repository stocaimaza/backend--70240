/** CLASE 3A - LOGGERS Y TESTING DE PERFORMANCE **/

//Temas de hoy: 

//1) Que son los Logger
//2) Winston
//3) Test de carga de Artillery
//4) Modelo de Performance con Artillery. 

//1) ¿Que son los Loggers?: es una herramienta que registra información importante sobre el funcionamiento de la app mientras se ejecuta. Estos registros son utilies para diagnosticar problemas, rastrear eventos y ver el rendimiento del sistema. 

//2) Winston: es una popular biblioteca de logging (registro) para Node JS. ampliamente utilizada en el desarrollo de aplicaciones backend. 

//Recordemos: 

// - Catalogamos los eventos en niveles. 
// - Podemos utilizar diferentes transportes para enviar la información. 

//Instalamos: npm i winston

import express from "express";
import addLogger from "./utils/ejercicio.js";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(addLogger);

//Rutas
app.get("/", (req, res) => {
    res.send("Olis, ke asen?");
})

//Ruta para testear: 

app.get("/warning", (req, res) => {
    req.logger.warning("¡Cuidado hombre radiactivo!"); 
    //Esto reemplaza al clasico "console.log("tenemos un error")". 
    res.send("Prueba de Warning");
})

app.get("/error", (req, res) => {
    req.logger.error("Error terrible, se suspende el verano"); 
    res.send("Prueba de error");
})

//Endpoint para probar todos los logs
app.get("/loggerTest", (req, res) => {
    req.logger.debug("Mensaje de Debug");
    req.logger.http("Mensaje de HTTP");
    req.logger.info("Mensaje de INFO");
    req.logger.warning("Mensaje de Warning");
    req.logger.error("Mensaje de Error");
    req.logger.fatal("Mensaje de Fatal");
    
    res.send("Logs generados!"); 
})


app.listen(PUERTO, () => console.log("Escuchando en el puerto de Mar del Plata")); 

//TEST DE CARGA CON ARTILLERY: 

//Simulamos algunas operaciones: 

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

//Testeamos operacion simple: 
// artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json  

//Testeamos operacion compleja: 
// artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json