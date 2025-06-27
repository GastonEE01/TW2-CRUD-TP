import { EmpleadoRepository } from "../repository/empleado.repository";
import { EmpresaRepository } from "../repository/empresa.repository";

export class EmpresaService {


    constructor(private empresaRepository: EmpresaRepository) {
    }

    async getEmpresas() {
        return await this.empresaRepository.getEmpresas();
    }

    async obtenerEmpresaPorId(id: number) {
        return await this.empresaRepository.getEmpresaById(id);
    }

    async createEmpresa(empresa:any) {

        const { nombre } = empresa;

        if (!nombre || typeof nombre !== 'string') {
            throw new Error('El nombre es obligatorio y debe ser un string')
        }
   
        return await this.empresaRepository.create(empresa)
    }

    async actualizarEmpresa(empresa: any) {
        return this.empresaRepository.update(empresa)
    }

    async eliminarEmpresa(id: number) {
        try {
            return await this.empresaRepository.delete(id)
        } catch (error) {
            if (error.code == 'P2025') {
                throw new Error('EmpleadoNoExiste')
            }
            throw error
        }
    }



}