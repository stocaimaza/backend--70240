import program from "../utils/commander.js";
import dotenv from "dotenv"; 

const { mode } = program.opts(); 

dotenv.config({
    path: mode === "produccion" ? "./.env.produccion" : "./.env.desarrollo"
}); 

const configObject = {
    puerto: process.env.PUERTO, 
    node_env: process.env.NODE_ENV
}

export default configObject;