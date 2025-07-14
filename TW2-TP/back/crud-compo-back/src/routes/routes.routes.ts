import { Router } from "express";
import { usuariosRoutes } from "./usuarios/usuarios.routes";
import { productoRoutes } from "./productos/productos.routes"; 
import carritoRoutes from "./carrito/carrito.routes"; 
export class AppRoutes {
    static get routes():Router{

        const router = Router();

        router.use('/api/login', usuariosRoutes);
        router.use('/api/producto', productoRoutes); 
        router.use('/api/carrito', carritoRoutes);
        
        return router;
    }
    
}