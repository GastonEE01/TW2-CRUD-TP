import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carrito } from '../../interfaces/carrito.interface';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { LocalStorageService } from '../../../../api/services/localStorage/localStorage.service';

@Component({
  selector: 'app-list-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-carrito.component.html',
  styleUrl: './list-carrito.component.css'
})
export class ListCarritoComponent implements OnInit {
  carrito: Carrito | null = null;
  total: number = 0;
  loading = false;

  private carritoService = inject(CarritoService);
  private localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.cargarCarrito();
  }

  async cargarCarrito() {
    const usuario = this.localStorageService.getUsuario();
    if (usuario && usuario.id) {
      try {
        this.carrito = await this.carritoService.obtenerCarrito(usuario.id).toPromise() || null;
        this.total = this.calcularTotal();
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      }
    }
  }

  async actualizarCantidad(idCarritoProducto: number, nuevaCantidad: number) {
    const usuario = this.localStorageService.getUsuario();
    if (usuario && usuario.id) {
      try {
        await this.carritoService.actualizarCantidad(usuario.id, idCarritoProducto, nuevaCantidad).toPromise();
        this.cargarCarrito(); 
      } catch (error) {
        console.error('Error al actualizar cantidad:', error);
      }
    }
  }

  async eliminarProducto(idCarritoProducto: number) {
    const usuario = this.localStorageService.getUsuario();
    if (usuario && usuario.id) {
      try {
        await this.carritoService.eliminarProducto(usuario.id, idCarritoProducto).toPromise();
        this.cargarCarrito();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  }

  async limpiarCarrito() {
    const usuario = this.localStorageService.getUsuario();
    if (usuario && usuario.id) {
      try {
        await this.carritoService.limpiarCarrito(usuario.id).toPromise();
        this.cargarCarrito(); 
      } catch (error) {
        console.error('Error al limpiar carrito:', error);
      }
    }
  }

  private calcularTotal(): number {
    if (!this.carrito || !this.carrito.CarritoProducto) return 0;
    return this.carrito.CarritoProducto.reduce((total: number, item: any) => {
        return total + (item.Producto.precio || 0) * item.Cantidad;
    }, 0);
  }
}