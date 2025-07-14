import { Router } from "express";
import { 
    obtenerCarritoPorUsuario, 
    agregarProductoAlCarrito,
    actualizarCantidad,
    eliminarProductoDelCarrito,
    limpiarCarrito
} from "../../controller/carrito.controller";

const router = Router();

// Cambiar usuarioId por idUsuario en todas las rutas
router.get("/usuario/:idUsuario", obtenerCarritoPorUsuario);
router.post("/usuario/:idUsuario/agregar", agregarProductoAlCarrito);
router.put("/usuario/:idUsuario/actualizar", actualizarCantidad);
router.delete("/usuario/:idUsuario/eliminar", eliminarProductoDelCarrito);
router.delete("/usuario/:idUsuario/limpiar", limpiarCarrito);

export default router;