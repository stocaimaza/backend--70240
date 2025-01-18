/** PRACTICAMOS CON DOCKER **/

import express from "express";
const app = express(); 

app.get("/", (req, res) => {
    res.send("Hola Mundo, estamos trabajando con Docker");
})

app.listen(8080);