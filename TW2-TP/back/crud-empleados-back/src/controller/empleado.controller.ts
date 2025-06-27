import { Request } from "express";
import { Response } from "express";
import { EmpleadoRepository } from "../repository/empleado.repository";
import { EmpleadoService } from "../services/empleado.service";

const empleadoRepository = new EmpleadoRepository()
const empleadoService = new EmpleadoService(empleadoRepository);

export class EmpleadoController {

    constructor() { }

    public getEmpleados = async (_req: Request, res: Response) => {
        try {
            const empleados = await empleadoService.getListEmpleados();
            res.status(200).json(empleados)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el empleados', error })
        }
    }

    public getEmpleado = async (req: Request, res: Response) => {
        try {

            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID inválido' })
            }

            const empleado = await empleadoService.obtenerEmpleadoPorId(id);

            console.log(empleado);
            
            //CUIDADITOOO WASAUSKi!!!
            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' })
            }

            res.status(200).json(empleado)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el empleado', error })
        }
    }

    public createEmpleado = async (req: Request, res: Response) => {
        try {
            const empleado = await empleadoService.crearEmpleado(req.body)
            res.json(200).json(empleado)
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error al crear el usuario, manda bien los datos crack', error })
        }
    }

    public updateEmpleado = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const { nombre, id_empresa } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' })
        }

        try {
            const actualizado = await empleadoService.actualizarEmpleado(id, { nombre, id_empresa })
            res.json(200).json(actualizado)
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error al actualizar el usuario, manda bien los datos crack', error })
        }
    }

    public deleteEmpleado = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' })
        }

        console.log(id);
        
        try {
            await empleadoService.eliminarEmpleado(id);
            res.status(204).send();
            // const actualizado = await empleadoService.actualizarEmpleado(id, { nombre, id_empresa })
            // res.json(200).json(actualizado)
        } catch (error) {
            if(error.message == 'EmpleadoNoExiste'){
                return res.status(404).json({message: 'Empleado no encontrado'})
            }
            console.log(error);
            res.status(400).json({ message: 'Error al eliminar el usuario, manda bien los datos crack', error })
        }

    }



}