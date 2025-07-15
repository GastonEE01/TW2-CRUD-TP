import { Router } from "express";
import { 
    getUserCart,             
    addProductToCart,    
    updateQuantity,         
    deleteProductCart,      
    clearCart           
} from "../../controller/carrito.controller";

const router = Router();

router.get("/usuario/:idUsuario", getUserCart);
router.post("/usuario/:idUsuario/agregar", addProductToCart);
router.put("/usuario/:idUsuario/actualizar", updateQuantity);
router.delete("/usuario/:idUsuario/eliminar", deleteProductCart);
router.delete("/usuario/:idUsuario/limpiar", clearCart);

export default router;