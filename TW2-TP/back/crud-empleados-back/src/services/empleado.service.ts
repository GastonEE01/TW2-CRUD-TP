import { EmpleadoRepository } from "../repository/empleado.repository";

export class EmpleadoService {


    constructor(private empleadoRepository: EmpleadoRepository) {
    }

    async getListEmpleados() {
        return await this.empleadoRepository.getEmpleados();
    }

    async obtenerEmpleadoPorId(id: number) {
        return await this.empleadoRepository.getEmpleadoById(id);
    }

    async crearEmpleado(data: { [key: string]: any }) {

        const { nombre, id_empresa } = data;

        if (!nombre || typeof nombre !== 'string') {
            throw new Error('El nombre es obligatorio y debe ser un string')
        }

        if (id_empresa !== undefined && isNaN(Number(id_empresa))) {
            throw new Error('id_empresa debe ser un número valido')
        }

        return await this.empleadoRepository.create(
            {
                nombre,
                id_empresa: id_empresa !== undefined ? Number(id_empresa) : undefined
            }
        );
    }

    async actualizarEmpleado(id: number, data: { nombre?: string, id_empresa?: number }) {
        return this.empleadoRepository.update(id, data)
    }

    async eliminarEmpleado(id: number) {
        try {
            return await this.empleadoRepository.delete(id)
        } catch (error) {
            if (error.code == 'P2025') {
                throw new Error('EmpleadoNoExiste')
            }
            throw error
        }
    }



}