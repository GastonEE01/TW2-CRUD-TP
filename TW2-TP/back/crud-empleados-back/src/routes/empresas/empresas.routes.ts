import { Router } from "express";
import { EmpresaController } from "../../controller/empresa.controller";

export const empresasRoutes = Router();

const empresaController = new EmpresaController();


empresasRoutes.get('/', empresaController.getEmpresas.bind(empresaController))
empresasRoutes.get('/:id', empresaController.getEmpresaById.bind(empresaController))
empresasRoutes.post('/', empresaController.createEmpresa.bind(empresaController))
empresasRoutes.put('/:id', empresaController.updateEmpresa.bind(empresaController))
empresasRoutes.delete('/:id', empresaController.deleteEmpresa.bind(empresaController))