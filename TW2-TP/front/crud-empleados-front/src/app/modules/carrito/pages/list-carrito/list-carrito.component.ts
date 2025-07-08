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
        this.loading = true;
        this.carrito = await this.carritoService.obtenerCarrito(usuario.id).toPromise() || null;
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      } finally {
        this.loading = false;
      }
    }
  }

  private getPrecioProducto(producto: any): number {
    if (producto.precio !== undefined && producto.precio !== null) {
      return producto.precio;
    }
    if (producto.Precio !== undefined && producto.Precio !== null) {
      return producto.Precio;
    }
    return 0;
  }

  getPrecioFormateado(producto: any): string {
    const precio = this.getPrecioProducto(producto);
    return precio.toFixed(2);
  }

  getSubtotalFormateado(item: any): string {
    const precio = this.getPrecioProducto(item.Producto);
    const cantidad = item.Cantidad || 0;
    const subtotal = precio * cantidad;
    return subtotal.toFixed(2);
  }

  getTotalFormateado(): string {
    if (!this.carrito || !this.carrito.CarritoProducto) {
      return '0.00';
    }
    const total = this.carrito.CarritoProducto.reduce((sum: number, item: any) => {
      const precio = this.getPrecioProducto(item.Producto);
      const cantidad = item.Cantidad || 0;
      return sum + (precio * cantidad);
    }, 0);
    
    return total.toFixed(2);
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

  getImagenProducto(producto: any): string {
    if (producto.imagen) {
      return producto.imagen;
    }
    if (producto.Imagen) {
      return producto.Imagen;
    }
    return 'assets/default-product.png';
  }
}