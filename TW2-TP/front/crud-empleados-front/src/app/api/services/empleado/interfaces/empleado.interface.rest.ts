import { EmpresaRest } from "../../empresa/interfaces/empresa.interface.rest";

export interface EmpleadoRest {
    id:         number;
    nombre:     string;
    id_empresa?: number;
    empresa?:    EmpresaRest;
}


