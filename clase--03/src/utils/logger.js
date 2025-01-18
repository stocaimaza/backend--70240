//1) Importamos la libreria: 
import winston from "winston"; 

//2) Creamos la configuracion en la constante "logger": 

// const logger = winston.createLogger({
//     //Le pasamos un objeto como parametro para configurar el Logger. 
//     transports: [
//         new winston.transports.Console({level: "http"}), 

//         //Agregamos un nuevo transporte: 

//         new winston.transports.File({
//             filename: "./errors.log",
//             level: "warn"
//         })
//     ]
// })

//Nuevo ejercicio: Personalizamos nuestros niveles

const niveles = {
    nivel: {
        fatal: 0, 
        error: 1, 
        warning: 2,
        info: 3, 
        http: 4, 
        debug: 5
    }, 

    colores: {
        fatal: "red",
        error: "yellow", 
        warning: "blue", 
        info: "green", 
        http: "magenta", 
        debug: "white"
    }
}

const logger = winston.createLogger({
    levels: niveles.nivel, 
    transports: [
        new winston.transports.Console({
            level: "http", 
            format: 
                winston.format.combine(
                    winston.format.colorize({colors: niveles.colores}), 
                    winston.format.simple()
                )
        }),
        //Agregamos otro transporte más
        new winston.transports.File({
            filename: "./errors.log", 
            level: "warning", 
            format: winston.format.simple()
        })
    ]
})

//3) Creamos el middleware: 

const addLogger = (req, res, next) => {
    req.logger = logger; 
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next(); 
}

export default addLogger;
