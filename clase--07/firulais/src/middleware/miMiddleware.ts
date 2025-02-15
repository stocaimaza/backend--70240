//Importar algunas herramientas de "Express":
import { Request, Response, NextFunction} from "express"; 

//Importamos una herramienta de Nest para el manejo de Middleware que se llama: 
import { NestMiddleware } from "@nestjs/common";

export default class MiMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`${req.method} a la ruta ${req.url}`); 
        next(); 
    }
}