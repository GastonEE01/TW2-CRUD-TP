import { Empleado } from "../../../../modules/empleados/interfaces/empleado.interface";
import { EmpleadoRest } from "../interfaces/empleado.interface.rest";

export class EmpleadoMapper {

    static mapRestEmpleadoToEmpleado(empleadoRest: EmpleadoRest): Empleado {
        return {
            id: empleadoRest.id,
            nombre: empleadoRest.nombre,
            id_empresa: empleadoRest.id_empresa,
            empresa : {
                id : empleadoRest.empresa?.id ?? 0,
                nombre : empleadoRest.empresa?.nombre ?? "",
                empleados : []
            }
        };
    }

    static mapRestEmpleadoRestArrayToEmpleadoArray(empleadosRest: EmpleadoRest[]): Empleado[] {
        return empleadosRest.map(this.mapRestEmpleadoToEmpleado)
    }
    
}