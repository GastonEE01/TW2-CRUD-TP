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
    this.loadingCart();
  }

  async loadingCart() {
    const usuario = this.localStorageService.getUsuario();
    if (usuario && usuario.idUsuario) {
      try {
        this.loading = true;
        this.carrito = await this.carritoService.getCart(usuario.idUsuario).toPromise() || null;
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      } finally {
        this.loading = false;
      }
    }
  }

  getPrecio(producto: any): string {
    const precio = Number(producto.precio) || 0;  
    return precio.toFixed(2);
  }

  getSubtotal(item: any): string {
    const precio = Number(item.Producto.precio) || 0; 
    const cantidad = Number(item.cantidad) || 0;       
    const subtotal = precio * cantidad;
    return subtotal.toFixed(2);
  }

  getTotal(): string {
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

  async deleteProduct(idCarritoProducto: number) {
    const usuario = this.localStorageService.getUsuario();
    if (usuario && usuario.idUsuario) {
      try {
        await this.carritoService.deleteProduct(usuario.idUsuario, idCarritoProducto).toPromise();
        this.loadingCart();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  }

  async clearCart() {
    const usuario = this.localStorageService.getUsuario();
    if (usuario && usuario.idUsuario) {
      try {
        await this.carritoService.clearCart(usuario.idUsuario).toPromise();
        this.loadingCart(); 
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