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
    if (usuario && usuario.idUsuario) {
      try {
        this.loading = true;
        this.carrito = await this.carritoService.obtenerCarrito(usuario.idUsuario).toPromise() || null;
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      } finally {
        this.loading = false;
      }
    }
  }

  getPrecioFormateado(producto: any): string {
    const precio = Number(producto.precio) || 0;  
    return precio.toFixed(2);
  }

  getSubtotalFormateado(item: any): string {
    const precio = Number(item.Producto.precio) || 0; 
    const cantidad = Number(item.cantidad) || 0;       
    const subtotal = precio * cantidad;
    return subtotal.toFixed(2);
  }

  getTotalFormateado(): string {
    if (!this.carrito || !this.carrito.CarritoProducto) {
      return '0.00';
    }
    const total = this.carrito.CarritoProducto.reduce((sum: number, item: any) => {
      const precio = Number(item.Producto.precio) || 0;  
      const cantidad = Number(item.cantidad) || 0;      
      return sum + (precio * cantidad);
    }, 0);
    
    return total.toFixed(2);
  }

  async eliminarProducto(idCarritoProducto: number) {
    const usuario = this.localStorageService.getUsuario();
    if (usuario && usuario.idUsuario) {
      try {
        await this.carritoService.eliminarProducto(usuario.idUsuario, idCarritoProducto).toPromise();
        this.cargarCarrito();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  }

  async limpiarCarrito() {
    const usuario = this.localStorageService.getUsuario();
    if (usuario && usuario.idUsuario) {
      try {
        await this.carritoService.limpiarCarrito(usuario.idUsuario).toPromise();
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
    return 'assets/default-product.png';
  }
}