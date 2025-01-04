//Mock: es una imitacion de un dato real. Es una simulacion que generamos en el entorno de desarrollo para no manipular datos reales y para tener herramientas de trabajo de forma rapida. 

//Web Oficial: https://fakerjs.dev

//Instalamos: npm install @faker-js/faker
//Actualmente: 9.3

import express from "express"; 
const app = express(); 
const PUERTO = 8080;
import usuariosRouter from "./routes/usuarios.router.js"; 

//Rutas

app.use("/api/users", usuariosRouter); 

//Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})