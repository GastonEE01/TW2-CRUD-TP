import express, { Router } from 'express';
import cors from 'cors';

interface Options {
    port: number;
    routes:Router
}

export class Server {

    private app = express()

    private readonly port:number;
    private readonly routes:Router;

    constructor(options:Options){
        const {port,routes} = options
        this.port = port 
        this.routes = routes
    }

    async start() {

        this.app.use(express.json())
        this.app.use(express.urlencoded({extended : true}))

        this.app.use(cors())

        this.app.use((req, res, next) => {
            next();
        });

        this.app.use(this.routes);

        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en el puerto " + this.port);
        })
     }
}

