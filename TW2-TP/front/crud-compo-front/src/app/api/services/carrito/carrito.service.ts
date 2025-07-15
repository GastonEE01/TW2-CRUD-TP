import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Carrito } from '../../../modules/carrito/interfaces/carrito.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private http = inject(HttpClient);
  private baseUrl = environment.api_url;

  getCart(idUsuario: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrl}/carrito/usuario/${idUsuario}`);
  }

  addProduct(idUsuario: number, idProducto: number, cantidad: number = 1): Observable<any> {
    return this.http.post(`${this.baseUrl}/carrito/usuario/${idUsuario}/agregar`, {
      idProducto,
      cantidad
    });
  }

  updateQuantity(idUsuario: number, idCarritoProducto: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/carrito/usuario/${idUsuario}/actualizar`, {
      idCarritoProducto,
      cantidad
    });
  }

  deleteProduct(idUsuario: number, idCarritoProducto: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/carrito/usuario/${idUsuario}/eliminar?idCarritoProducto=${idCarritoProducto}`);

  }

  clearCart(idUsuario: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/carrito/usuario/${idUsuario}/limpiar`);
  }
} 