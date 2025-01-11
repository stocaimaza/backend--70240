/** CLASE 2 OPTIMIZACION **/

//1) Compresión.
//2) Manejo personalizado de errores. 

//npm i express-compression

import express from "express";
import compression from "express-compression";
import usuariosRouter from "./routes/usuarios.router.js"; 
import manejadorError from "./middleware/error.js";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Para GZIP usamos el middleware de la siguiente forma: 
//app.use(compression());

//Para Brotli usamos el middleware de la siguiente manera: 
app.use(compression({
    brotli: {
        enabled: true, 
        zlib: {}
    }
}));


//Rutas

// app.get("/", (req, res) => {
//     let string = "Hola comisión, somos programadores y no sabemos arreglar impresoras"; 

//     for(let i = 0; i < 5e4; i++) {
//         string += "Hola comisión, somos programadores y no sabemos arreglar impresoras";
//     }

//     res.send(string); 
// })

app.use("/usuarios", usuariosRouter); 
app.use(manejadorError); 
app.listen(PUERTO, () => console.log("Escuchando en el puerto de Mar del Plata"));

//Comparamos valores: 

//Sin compresión: 3.4mb
//Con compresión GZIP: 11.9 kb
//Con Brotli: 357 b


//¿Por qué es importante comprimir la información?

// Es crucial porque reduce significativamente el tamaño de los archivos transmitidos, lo que mejora la velocidad de carga de las páginas web y la eficiencia del uso del ancho de banda. Esto no solo optimiza la experiencia del usuario final al permitir una navegación más rápida, sino que también reduce los COSTOS de nuestros servicios en la nube, ya que no solo pagamos por almacenamiento, procesador y RAM, sino también por las transferencias realizadas.

//Middleware para el manejo de errores: 
//Vamos a desarrollar nuestra propia gestion interna de errores. 
//Y para lograr esto necesitamos 3 elementos: 

//1) Un middleware de recepción de errores. 
//2) Un generador personalizado de errores.
//3) Un diccionario de errores.  
