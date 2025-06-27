import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Empleado } from '../../../modules/empleados/interfaces/empleado.interface';
import { EmpleadoRest } from './interfaces/empleado.interface.rest';
import { EmpleadoMapper } from './mappings/empleado.mapper';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  empleados = [
    {
      id: 1,
      nombre: "Juan Perez",
      empresa: {
        id: 1,
        nombre: "Perez corporation"
      }
    },
    {
      id: 2,
      nombre: "Camila Perez",
      empresa: {
        id: 1,
        nombre: "Perez corporation"
      }
    },
    {
      id: 3,
      nombre: "Alexis Perez"
    },
    {
      id: 4,
      nombre: "Maria Perez",
      empresa: {
        id: 1,
        nombre: "Perez corporation 2"
      }
    },
    {
      id: 9,
      nombre: "Jota Perez",
      empresa: {
        id: 1,
        nombre: "Perez corporation 2"
      }
    },
  ]

  http = inject(HttpClient)

  constructor() { }

  listEmpleados(): Observable<Empleado[]> {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.get<EmpleadoRest[]>(`${environment.api_url}/empleado/`,
      {
        headers: headers
      }
    ).pipe(
      map((res) => {
        return EmpleadoMapper.mapRestEmpleadoRestArrayToEmpleadoArray(res)
      }),
    )
  }

  getEmpleado(id: number | null): Observable<Empleado> {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.get<EmpleadoRest>(`${environment.api_url}/empleado/${id}`,
      {
        headers: headers
      }
    ).pipe(
      map((res) => {
        return EmpleadoMapper.mapRestEmpleadoToEmpleado(res)
      }),
    )
  }

  createEmpleado(empleado: Empleado) {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.post<EmpleadoRest>(`${environment.api_url}/empleado/`, empleado,
      {
        headers: headers
      }
    ).pipe(
      map((res) => {
        return res
      }),
    )
  }

  updateEmpleado(empleado: Empleado): Observable<Empleado> {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.put<EmpleadoRest>(`${environment.api_url}/empleado/${empleado.id}`, empleado,
      {
        headers: headers
      }
    ).pipe(
      map((res) => {
        return res
      }),
    )
  }

  eliminarEmpleado(empleado: Empleado): Observable<Empleado> {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.delete<EmpleadoRest>(`${environment.api_url}/empleado/${empleado.id}`,
      {
        headers: headers
      }
    ).pipe(
      map((res) => {
        return res
      }),
    )
  }
}
