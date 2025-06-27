import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { EmpresaRest } from './interfaces/empresa.interface.rest';
import { EmpresaMapper } from './mappings/empresa.mapper';
import { Empresa } from '../../../modules/empresas/interfaces/empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  http = inject(HttpClient)

  constructor() { }

  listEmpresas(): Observable<Empresa[]> {
    let headers = new HttpHeaders();

    // headers = headers.append(
    //   'Authorization',
    //   'Bearer ' + localStorage.getItem('token')
    // )

    return this.http.get<EmpresaRest[]>(`${environment.api_url}/empresa`,
      {
        headers: headers
      }
    ).pipe(
      map((res) => {
        return EmpresaMapper.mapRestEmpresaArrayToEmpresaArray(res)
      }),
    )
  }

  eliminarEmpresa(empresa: Empresa) {
    console.log(empresa);
    
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.delete<EmpresaRest>(`${environment.api_url}/empresa/${empresa.id}`,
      {
        headers: headers
      }
    ).pipe(
      map((res) => {
        return res
      }),
    )
  }


  detailEmpresa(id: number | null): Observable<Empresa> {
    let headers = new HttpHeaders();

    // headers = headers.append(
    //   'Authorization',
    //   'Bearer ' + localStorage.getItem('token')
    // )

    return this.http.get<EmpresaRest>(`${environment.api_url}/empresa/${id}`,
      {
        headers: headers
      }
    ).pipe(
      map((res) => {
        return EmpresaMapper.mapRestEmpresaToEmpresa(res)
      }),
    )
  }

  updateEmpresa(empresa: Empresa): Observable<Empresa> {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.put<EmpresaRest>(`${environment.api_url}/empresa/${empresa.id}`, empresa,
      {
        headers: headers
      }
    ).pipe(
      map((res) => {
        return res
      }),
    )
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    let headers = new HttpHeaders();

    // headers = headers.append(
    //   'Authorization',
    //   'Bearer ' + localStorage.getItem('token')
    // )

    return this.http.post<EmpresaRest>(`${environment.api_url}/empresa`, empresa,
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
