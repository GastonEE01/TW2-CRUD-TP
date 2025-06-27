import { Empresa } from "../../../../modules/empresas/interfaces/empresa.interface";
import { EmpleadoMapper } from "../../empleado/mappings/empleado.mapper";
import { EmpresaRest } from "../interfaces/empresa.interface.rest";

export class EmpresaMapper {

    static mapRestEmpresaToEmpresa(empresaRest: EmpresaRest): Empresa {
        return {
            id: empresaRest.id,
            nombre: empresaRest.nombre,
            empleados : EmpleadoMapper.mapRestEmpleadoRestArrayToEmpleadoArray(empresaRest.empleados)
        };
    }

    static mapRestEmpresaArrayToEmpresaArray(empleadosRest: EmpresaRest[]): Empresa[] {
        return empleadosRest.map(this.mapRestEmpresaToEmpresa)
    }
    
}