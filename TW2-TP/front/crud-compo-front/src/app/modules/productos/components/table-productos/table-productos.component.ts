import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { Producto } from '../../interfaces/producto.interface';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-productos',
  standalone: true,
  imports: [TableModule, ButtonModule, TooltipModule, CommonModule, ToastModule, FormsModule],
  templateUrl: './table-productos.component.html',
  styleUrl: './table-productos.component.css'
})
export class TableProductosComponent implements OnInit, OnChanges {
  @Input() productos: Producto[] = [];
  @Output() eventEmitterTable = new EventEmitter<void>();
  
  usuarioLogueado: boolean = false;
  cantidades: { [idProducto: number]: number } = {};

  constructor(
    private carritoService: CarritoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.verificarUsuarioLogueado();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productos'] && changes['productos'].currentValue) {
      this.inicializarCantidades();
    }
  }

  inicializarCantidades() {
    this.cantidades = {};
    if (this.productos && this.productos.length > 0) {
      for (const producto of this.productos) {
        this.cantidades[producto.idProducto] = 1;
      }
    }
  }

  verificarUsuarioLogueado() {
    const usuario = localStorage.getItem('usuario');
    this.usuarioLogueado = !!usuario;
  }

  quantityProduct(idProducto: number, value: number) {
    if (value < 1) {
      this.cantidades[idProducto] = 1;
    } else {
      this.cantidades[idProducto] = value;
    }
  }

  addToCart(producto: Producto) {
    let cantidad = this.cantidades[producto.idProducto];
    
    if (!cantidad || cantidad < 1) {
      cantidad = 1;
      this.cantidades[producto.idProducto] = 1;
    }
    
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    if (!usuario.idUsuario) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debes iniciar sesión para agregar productos al carrito'
      });
      return;
    }

    this.carritoService.addProduct(usuario.idUsuario, producto.idProducto, cantidad).subscribe({
      next: (resultado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `${producto.nombre} agregado al carrito`
        });
      },
      error: (error) => {
        console.error('Error completo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al agregar producto al carrito'
        });
      }
    });
  }
}
