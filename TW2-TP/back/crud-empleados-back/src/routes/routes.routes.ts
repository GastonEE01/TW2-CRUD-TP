import { Router } from "express";
import { empleadoRouter } from "./empleado/empleado.routes";
import { empresasRoutes } from "./empresas/empresas.routes";
import { usuariosRoutes } from "./usuarios/usuarios.routes";

export class AppRoutes {
    static get routes():Router{

        const router = Router();

        router.use('/api/empleado',empleadoRouter);
        router.use('/api/empresa',empresasRoutes);
        router.use('/api/login', usuariosRoutes);

        return router;
    }
    
}