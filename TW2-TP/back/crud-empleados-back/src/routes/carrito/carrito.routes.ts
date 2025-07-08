import { Router } from "express";
import { 
    obtenerCarritoPorUsuario, 
    agregarProductoAlCarrito,
    actualizarCantidad,
    eliminarProductoDelCarrito,
    limpiarCarrito
} from "../../controller/carrito.controller";

const router = Router();


router.get("/usuario/:usuarioId", obtenerCarritoPorUsuario);
router.post("/usuario/:usuarioId/agregar", agregarProductoAlCarrito);
router.put("/usuario/:usuarioId/actualizar", actualizarCantidad);
router.delete("/usuario/:usuarioId/eliminar", eliminarProductoDelCarrito);
router.delete("/usuario/:usuarioId/limpiar", limpiarCarrito);


export default router;