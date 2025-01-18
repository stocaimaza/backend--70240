import { Command } from "commander";
const program = new Command(); 

//1 - Comando // 2 - La descripcion // 3 - Valor por default

program
    .option("-p <port>", "puerto en donde se ejecuta el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "produccion")
program.parse()
//Finalizamos la configuración. 

export default program; 