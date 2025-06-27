import { Router } from "express";
import { EmpleadoController } from "../../controller/empleado.controller";

export const empleadoRouter = Router();

const empleadoController = new EmpleadoController();


empleadoRouter.get('/', empleadoController.getEmpleados.bind(empleadoController))
empleadoRouter.get('/:id', empleadoController.getEmpleado.bind(empleadoController))
empleadoRouter.post('/', empleadoController.createEmpleado.bind(empleadoController))
empleadoRouter.put('/:id', empleadoController.updateEmpleado.bind(empleadoController))
empleadoRouter.delete('/:id', empleadoController.deleteEmpleado.bind(empleadoController))