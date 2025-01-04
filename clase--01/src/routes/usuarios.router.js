import { Router } from "express";
import generarUsuarios from "../utils/util.js";
const router = Router(); 

router.get("/", (req, res) => {
    //Generamos un array de usuarios: 
    const usuarios = [];

    for (let i = 0; i < 100; i++) {
        usuarios.push(generarUsuarios());
    }
    res.json(usuarios);
})

export default router; 