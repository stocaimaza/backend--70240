/** DOCKER - DOCKERHUB - KUBERNETES **/

import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Hola Mundo, bienvenidos a la clase 4"); 
})

app.listen(8080, () => console.log("Servidor funcionando")); 