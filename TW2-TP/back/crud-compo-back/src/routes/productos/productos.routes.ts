import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller";

export const productoRoutes=Router();
const productoController=new ProductoController();

productoRoutes.get('/', productoController.getProductos.bind(productoController));
productoRoutes.get('/categoria/:nombre', productoController.getProductsByCategory.bind(productoController));
