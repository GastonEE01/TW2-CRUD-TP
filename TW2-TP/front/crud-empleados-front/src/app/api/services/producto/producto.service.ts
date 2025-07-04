import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../../../modules/productos/interfaces/producto.interface";
import { environment } from "../../../../environments/environment";


export class ProductoService {
  set(data: Producto[]) {
    throw new Error('Method not implemented.');
  }

http = inject(HttpClient);

constructor() {}

  listProductos():Observable<Producto[]> {

     return this.http.get<Producto[]>(`${environment.api_url}/producto`)
  }
 

}