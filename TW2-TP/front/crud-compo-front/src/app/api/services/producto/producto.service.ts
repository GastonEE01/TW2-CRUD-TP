import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../../../modules/productos/interfaces/producto.interface";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor() {}
  http = inject(HttpClient);

  listCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.api_url}/categorias`);
  }

  listProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.api_url}/producto`);  // <- Sin mapper
  }

  listProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.api_url}/producto/categoria/${categoria}`);  // <- Sin mapper
  }
}