import { EmpleadoRest } from "../../empleado/interfaces/empleado.interface.rest";

export interface EmpresaRest {
    id:       number;
    nombre:   string;
    empleados: EmpleadoRest[];
}

