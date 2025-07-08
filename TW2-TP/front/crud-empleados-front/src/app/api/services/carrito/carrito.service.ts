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

  obtenerCarrito(usuarioId: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrl}/carrito/usuario/${usuarioId}`);
  }

  agregarProducto(usuarioId: number, idProducto: number, cantidad: number = 1): Observable<any> {
    return this.http.post(`${this.baseUrl}/carrito/usuario/${usuarioId}/agregar`, {
      idProducto,
      cantidad
    });
  }

  actualizarCantidad(usuarioId: number, idCarritoProducto: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/carrito/usuario/${usuarioId}/actualizar`, {
      idCarritoProducto,
      cantidad
    });
  }

  eliminarProducto(usuarioId: number, idCarritoProducto: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/carrito/usuario/${usuarioId}/eliminar?idCarritoProducto=${idCarritoProducto}`);

  }

  limpiarCarrito(usuarioId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/carrito/usuario/${usuarioId}/limpiar`);
  }
} 