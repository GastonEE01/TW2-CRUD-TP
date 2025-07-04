import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller";

const productoRoutes=Router();
const productoController=new ProductoController();

productoRoutes.get('/', productoController.getProductos.bind(productoController));