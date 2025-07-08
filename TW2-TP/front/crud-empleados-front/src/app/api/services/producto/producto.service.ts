import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Producto } from "../../../modules/productos/interfaces/producto.interface";
import { ProductoRest } from "./interfaces/producto.interface.rest";
import { ProductoMapper } from "./mappings/producto.mapper";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  set(data: Producto[]) {
    throw new Error('Method not implemented.');
  }

  http = inject(HttpClient);

  constructor() {}

  listProductos(): Observable<Producto[]> {
    return this.http.get<ProductoRest[]>(`${environment.api_url}/producto`).pipe(
      map((restProductos) => ProductoMapper.mapRestProductoArrayToProductoArray(restProductos))
    );
  }
}